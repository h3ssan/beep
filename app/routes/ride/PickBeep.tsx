import React, { useEffect } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { printStars } from "../../components/Stars";
import { Unpacked } from "../../utils/constants";
import { FlatList, RefreshControl, useColorScheme } from "react-native";
import { Container } from "../../components/Container";
import { Avatar } from "../../components/Avatar";
import { useLocation } from "../../utils/useLocation";
import { client } from "../../utils/apollo";
import { InitialRiderStatus } from "./FindBeep";
import { ResultOf, VariablesOf, graphql } from "gql.tada";
import { LinearGradient } from "tamagui/linear-gradient";
import {
  Text,
  Spinner,
  XStack,
  Stack,
  Card,
  Heading
} from "@beep/ui";

const GetBeepers = graphql(`
  query GetBeepers($latitude: Float!, $longitude: Float!, $radius: Float) {
    getBeepers(latitude: $latitude, longitude: $longitude, radius: $radius) {
      id
      name
      first
      isStudent
      singlesRate
      groupRate
      capacity
      queueSize
      photo
      role
      rating
      venmo
      cashapp
      payments {
        id
        productId
      }
    }
  }
`);

export const ChooseBeep = graphql(`
  mutation ChooseBeep(
    $beeperId: String!
    $origin: String!
    $destination: String!
    $groupSize: Float!
  ) {
    chooseBeep(
      beeperId: $beeperId
      input: {
        origin: $origin
        destination: $destination
        groupSize: $groupSize
      }
    ) {
      id
      position
      origin
      destination
      status
      groupSize
      beeper {
        id
        first
        name
        singlesRate
        groupRate
        isStudent
        role
        venmo
        cashapp
        username
        phone
        photo
        capacity
        queueSize
        location {
          longitude
          latitude
        }
        cars {
          id
          photo
          make
          color
          model
        }
      }
    }
  }
`);

type Props = StaticScreenProps<Omit<VariablesOf<typeof ChooseBeep>, 'beeperId'>>;

export function PickBeepScreen({ route }: Props) {
  const colorMode = useColorScheme();
  const { location } = useLocation();
  const navigation = useNavigation();

  const { data, loading, error, refetch } = useQuery(
    GetBeepers,
    {
      variables: {
        latitude: location?.coords.latitude ?? 0,
        longitude: location?.coords.longitude ?? 0,
        radius: 20,
      },
      skip: !location,
      notifyOnNetworkStatusChange: true,
    }
  );


  const [getBeep, { loading: isPickBeeperLoading }] = useMutation(ChooseBeep);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => isPickBeeperLoading ? <Spinner /> : null
    });
  }, [isPickBeeperLoading]);

  const chooseBeep = async (beeperId: string) => {
    if (isPickBeeperLoading) {
      return;
    }
    try {
      const { data } = await getBeep({
        variables: {
          ...route.params,
          beeperId,
        },
      });

      if (data) {
        client.writeQuery({
          query: InitialRiderStatus,
          data: { getRiderStatus: { ...data.chooseBeep } },
        });
        navigation.goBack();
      }
    } catch (error) {
      alert((error as ApolloError).message);
    }
  };

  const beepers = data?.getBeepers;
  const isRefreshing = Boolean(data) && loading;

  const renderItem = ({ item }: { item: Unpacked<ResultOf<typeof GetBeepers>['getBeepers']>; index: number; }) => {
    const isPremium = item.payments?.some(p => p.productId.startsWith("top_of_beeper_list")) ?? false;

    const InnerCard = (
      <Card
        onPress={() => chooseBeep(item.id)}
        hoverTheme
        pressTheme
        borderRadius="$4"
        p="$3"
        m={isPremium ? "$1" : "$2"}
      >
        <XStack alignItems="center" jc="space-between">
          <Stack flexShrink={1}>
            <XStack alignItems="center" mb="$2">
              <Avatar className="mr-2" src={item.photo ?? undefined} />
              <Stack>
                <Text fontWeight="bold">
                  {item.name}
                </Text>
                {item.rating && (
                  <Text fontSize="$2">{printStars(item.rating)}</Text>
                )}
              </Stack>
            </XStack>
            <Stack>
              <Text>
                <Text fontWeight="bold">Rider Capacity </Text>
                <Text>{item.capacity}</Text>
              </Text>
              <Text>
                <Text fontWeight="bold">Rates </Text>
                <Text>
                  ${item.singlesRate} singles / ${item.groupRate} group
                </Text>
              </Text>
            </Stack>
          </Stack>
          <XStack gap="$3" ai="center">
            <Heading fontSize="$9" lineHeight="$9" fontWeight="bold">
              {item.queueSize}
            </Heading>
            <Text fontWeight="bold">rider{item.queueSize === 1 ? "" : "s"}</Text>
          </XStack>
        </XStack>
      </Card>
    );

    if (isPremium) {
      return (
        <LinearGradient
          colors={['$pink10', '$yellow10']}
          start={[0, 0]}
          end={[1, 0]}
          borderRadius="$4"
          m="$2"
        >
          {InnerCard}
        </LinearGradient>
      )
    }

    return InnerCard;
  };

  if ((!data && loading) || location === undefined) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Heading>Error</Heading>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  return (
    <Container h="100%">
      <FlatList
        data={beepers}
        renderItem={renderItem}
        keyExtractor={(beeper) => beeper.id}
        contentContainerStyle={
          beepers?.length === 0
            ? { flex: 1, alignItems: "center", justifyContent: "center" }
            : undefined
        }
        ListEmptyComponent={
          <>
            <Heading fontWeight="bold" key="title">Nobody is beeping</Heading>
            <Text key="message">
              There are no drivers within 20 miles of you
            </Text>
          </>
        }
        refreshControl={
          <RefreshControl
            tintColor={colorMode === "dark" ? "#cfcfcf" : undefined}
            refreshing={isRefreshing}
            onRefresh={refetch}
          />
        }
      />
    </Container>
  );
}
