import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { BottomSheet } from "../../components/BottomSheet";
import { Logger } from "../../utils/Logger";
import { useUser } from "../../utils/useUser";
import { isAndroid, Unpacked } from "../../utils/constants";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { client } from "../../utils/Apollo";
import { Navigation } from "../../utils/Navigation";
import { LocationActivityType } from "expo-location";
import { Container } from "../../components/Container";
import { Alert } from "../../utils/Alert";
import { QueueItem } from "./QueueItem";
import { Alert as NativeAlert, AppState, AppStateStatus } from "react-native";
import {
  GetInitialQueueQuery,
  UpdateBeepSettingsMutation,
} from "../../generated/graphql";
import {
  Input,
  Switch,
  Text,
  Checkbox,
  Heading,
  FormControl,
  Stack,
  FlatList,
  Box,
  Spacer,
  HStack,
  Avatar,
  Center,
  Button,
  Flex,
} from "native-base";
import { BottomSheetModalRef } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import ActionButton from "../../components/ActionButton";
import { printStars } from "../../components/Stars";
import { GradietnButton } from "../../components/GradientButton";

interface Props {
  navigation: Navigation;
}

let unsubscribe: any = null;

const LocationUpdate = gql`
  mutation LocationUpdate(
    $latitude: Float!
    $longitude: Float!
    $altitude: Float!
    $accuracy: Float
    $altitideAccuracy: Float
    $heading: Float!
    $speed: Float!
  ) {
    setLocation(
      location: {
        latitude: $latitude
        longitude: $longitude
        altitude: $altitude
        accuracy: $accuracy
        altitideAccuracy: $altitideAccuracy
        heading: $heading
        speed: $speed
      }
    )
  }
`;

const GetInitialQueue = gql`
  query GetInitialQueue {
    getQueue {
      id
      isAccepted
      groupSize
      origin
      destination
      state
      start
      rider {
        id
        name
        first
        last
        venmo
        cashapp
        phone
        photoUrl
        isStudent
        rating
      }
    }
  }
`;

const GetQueue = gql`
  subscription GetQueue($id: String!) {
    getBeeperUpdates(id: $id) {
      id
      isAccepted
      groupSize
      origin
      destination
      state
      start
      rider {
        id
        name
        first
        last
        venmo
        cashapp
        phone
        photoUrl
        isStudent
        rating
      }
    }
  }
`;

const UpdateBeepSettings = gql`
  mutation UpdateBeepSettings($input: BeeperSettingsInput!) {
    setBeeperStatus(input: $input)
  }
`;

export const LOCATION_TRACKING = "location-tracking";

export function StartBeepingScreen(props: Props): JSX.Element {
  const { user } = useUser();

  const [isBeeping, setIsBeeping] = useState(user?.isBeeping);
  const [masksRequired, setMasksRequired] = useState(user?.masksRequired);
  const [singlesRate, setSinglesRate] = useState<string>(
    String(user?.singlesRate)
  );
  const [groupRate, setGroupRate] = useState<string>(String(user?.groupRate));
  const [capacity, setCapacity] = useState<string>(String(user?.capacity));

  const { subscribeToMore, data, refetch } = useQuery<GetInitialQueueQuery>(
    GetInitialQueue,
    { notifyOnNetworkStatusChange: true }
  );

  const [updateBeepSettings] =
    useMutation<UpdateBeepSettingsMutation>(UpdateBeepSettings);

  const queue = data?.getQueue;

  // ref
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);

  // variables
  const snapPoints = useMemo(() => ["20%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      refetch();
    }
  };

  function toggleSwitchWrapper(): void {
    if (isAndroid && !isBeeping) {
      NativeAlert.alert(
        "Background Location Notice",
        "Ride Beep App collects location data to enable ETAs for riders when your are beeping and the app is closed or not in use",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => toggleSwitch() },
        ],
        { cancelable: true }
      );
    } else {
      toggleSwitch();
    }
  }

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Switch
          mr={3}
          isChecked={isBeeping}
          onToggle={() => toggleSwitchWrapper()}
        />
      ),
    });
  }, [
    props.navigation,
    isBeeping,
    capacity,
    singlesRate,
    groupRate,
    masksRequired,
  ]);

  async function getBeepingLocationPermissions(): Promise<boolean> {
    try {
      //Temporary fix for being able to toggle beeping in dev
      if (__DEV__ || Constants.appOwnership === "expo") return true;

      const { status: fgStatus } =
        await Location.requestForegroundPermissionsAsync();
      const { status: bgStatus } =
        await Location.requestBackgroundPermissionsAsync();

      if (fgStatus !== "granted" || bgStatus !== "granted") {
        return false;
      }

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  async function toggleSwitch(): Promise<void> {
    const willBeBeeping = !isBeeping;

    setIsBeeping((value) => !value);

    const hasLoactionPermission = await getBeepingLocationPermissions();

    if (willBeBeeping && !hasLoactionPermission) {
      setIsBeeping((value) => !value);
      alert("You must allow background location to start beeping!");
      return;
    }

    let lon = undefined;
    let lat = undefined;

    if (willBeBeeping) {
      let lastKnowLocation = await Location.getLastKnownPositionAsync({
        maxAge: 180000,
        requiredAccuracy: 800,
      });

      if (!lastKnowLocation) {
        lastKnowLocation = await Location.getCurrentPositionAsync();
      }

      lon = lastKnowLocation.coords.longitude;
      lat = lastKnowLocation.coords.latitude;
    }

    updateBeepSettings({
      variables: {
        input: {
          isBeeping: willBeBeeping,
          singlesRate: Number(singlesRate),
          groupRate: Number(groupRate),
          masksRequired: masksRequired,
          capacity: Number(capacity),
          latitude: lat,
          longitude: lon,
        },
      },
    })
      .then(() => {
        if (willBeBeeping) {
          sub();
          startLocationTracking();
        } else {
          if (unsubscribe) unsubscribe();
          stopLocationTracking();
        }
      })
      .catch((error: ApolloError) => {
        setIsBeeping((value) => !value);
        Alert(error);
      });
  }

  async function startLocationTracking(): Promise<void> {
    if (!__DEV__) {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 15 * 1000,
        distanceInterval: 6,
        activityType: LocationActivityType.AutomotiveNavigation,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "Ride Beep App",
          notificationBody: "You are currently beeping!",
          notificationColor: "#e8c848",
        },
      });

      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
      );

      if (!hasStarted)
        Logger.error("User was unable to start location tracking");
    }
  }

  async function stopLocationTracking(): Promise<void> {
    if (!__DEV__) {
      Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    }
  }

  useEffect(() => {
    const init = async () => {
      if (user?.isBeeping) {
        if (!(await getBeepingLocationPermissions())) {
          alert("You must allow background location to start beeping!");
          return;
        }
        startLocationTracking();
        sub();
      }
    };

    init();
  }, []);

  function sub(): void {
    unsubscribe = subscribeToMore({
      document: GetQueue,
      variables: {
        id: user?.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        // @ts-expect-error This works so I'm leaving it as is
        const newQueue = subscriptionData.data.getBeeperUpdates;
        return Object.assign({}, prev, {
          getQueue: newQueue,
        });
      },
    });
  }
  if (!isBeeping) {
    return (
      <Container keyboard alignItems="center" height="100%">
        <Stack space={4} w="90%" mt={4}>
          <FormControl>
            <FormControl.Label>Max Rider Capacity</FormControl.Label>
            <Input
              size="lg"
              placeholder="Max Capcity"
              keyboardType="numeric"
              value={String(capacity)}
              onChangeText={(value) => setCapacity(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Singles Rate</FormControl.Label>
            <Input
              size="lg"
              placeholder="Singles Rate"
              keyboardType="numeric"
              value={String(singlesRate)}
              onChangeText={(value) => setSinglesRate(value)}
              InputLeftElement={
                <Text pl={3} pr={1}>
                  $
                </Text>
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Group Rate</FormControl.Label>
            <Input
              size="lg"
              placeholder="Group Rate"
              keyboardType="numeric"
              value={String(groupRate)}
              onChangeText={(value) => setGroupRate(value)}
              InputLeftElement={
                <Text pl={3} pr={1}>
                  $
                </Text>
              }
            />
          </FormControl>
          <Checkbox
            isChecked={masksRequired}
            onChange={(value: boolean) => setMasksRequired(value)}
            value="Masks?"
          >
            Require riders to have a mask
          </Checkbox>
        </Stack>
      </Container>
    );
  } else {
    if (queue && queue?.length > 0) {
      return (
        <Container alignItems="center">
          {queue[0] && (
            <Flex w="100%" height="80%" px={6} py={4}>
              <HStack alignItems="center" space={4}>
                <Stack>
                  <Heading fontWeight="extrabold" size="xl">
                    {queue[0].rider.name}
                  </Heading>
                  <Text fontSize="xs">
                    {queue[0].rider.rating !== null &&
                    queue[0].rider.rating !== undefined
                      ? printStars(queue[0].rider.rating)
                      : null}
                  </Text>
                </Stack>
                <Spacer />
                <Avatar size="xl" source={{ uri: queue[0].rider.photoUrl }} />
              </HStack>
              <Stack space={2} mt={4}>
                <Box>
                  <Heading size="sm" fontWeight="extrabold">
                    Group Size
                  </Heading>
                  <Text>{queue[0].groupSize}</Text>
                </Box>
                <Box>
                  <Heading size="sm" fontWeight="extrabold">
                    Pick Up
                  </Heading>
                  <Text>{queue[0].origin}</Text>
                </Box>
                <Box>
                  <Heading size="sm" fontWeight="extrabold">
                    Destination
                  </Heading>
                  <Text>{queue[0].destination}</Text>
                </Box>
              </Stack>
              <Spacer />
              <Stack space={3}>
                <Button
                  colorScheme="red"
                  backgroundColor="red.400"
                  _pressed={{ backgroundColor: "red.500" }}
                >
                  Cancel Beep
                </Button>
                <GradietnButton onPress={() => null}>I'm here</GradietnButton>
              </Stack>
            </Flex>
          )}
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <Box pt={1} px={4}>
              <HStack alignItems="center" mb={2}>
                <Heading fontWeight="extrabold" size="2xl">
                  Queue
                </Heading>
                <Spacer />
                {queue &&
                  queue.length > 0 &&
                  queue.some((entry) => !entry.isAccepted) && (
                    <Box borderRadius="50%" bg="blue.400" w={4} h={4} mr={2} />
                  )}
              </HStack>
            </Box>
            <BottomSheetFlatList
              data={queue.filter(
                (entry) => queue[0]?.isAccepted && entry.id !== queue[0]?.id
              )}
              keyExtractor={(item) => item.id}
              renderItem={({
                item,
                index,
              }: {
                item: Unpacked<GetInitialQueueQuery["getQueue"]>;
                index: number;
              }) => (
                <QueueItem
                  item={item}
                  index={index}
                  navigation={props.navigation}
                />
              )}
            />
          </BottomSheet>
        </Container>
      );
    } else {
      return (
        <Container alignItems="center" justifyContent="center">
          <Stack space={2} w="90%" alignItems="center">
            <Heading fontWeight="extrabold">Your queue is empty</Heading>
            <Text textAlign="center">
              If someone wants you to beep them, it will appear here. If your
              app is closed, you will recieve a push notification.
            </Text>
          </Stack>
        </Container>
      );
    }
  }
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    return Logger.error(error);
  }

  if (data) {
    // @ts-expect-error dumb
    const { locations } = data;
    try {
      await client.mutate({
        mutation: LocationUpdate,
        variables: locations[0].coords,
      });
    } catch (e) {
      Logger.error(e);
    }
  }
});
