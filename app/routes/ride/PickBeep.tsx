import React, { useEffect, useState } from 'react';
import { Layout, Text, Divider, List, ListItem, Button, TopNavigation, TopNavigationAction, Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { BackIcon, MinusIcon, PlusIcon } from '../../utils/Icons';
import ProfilePicture from '../../components/ProfilePicture';
import { gql, useQuery } from '@apollo/client';
import { printStars } from '../../components/Stars';
import { GetBeeperListQuery, User } from '../../generated/graphql';
import { Navigation } from '../../utils/Navigation';

interface Props {
    navigation: Navigation;
    route: any;
}

const GetBeepers = gql`
  query GetBeeperList($latitude: Float!, $longitude: Float!, $radius: Float) {
    getBeeperList(
      input: {
        latitude: $latitude,
        longitude: $longitude
        radius: $radius
    }) {
      id
      first
      last
      isStudent
      singlesRate
      groupRate
      capacity
      queueSize
      photoUrl
      role
      masksRequired
      rating
      venmo
      cashapp
      location {
          latitude
          longitude
      }
    }
  }
`;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1); 
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return d * 0.621371;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}

export function PickBeepScreen(props: Props): JSX.Element {
  const { navigation, route } = props;
  const [radius, setRadius] = useState<number>(10);

  const { data, previousData, refetch, loading, error, startPolling, stopPolling } = useQuery<GetBeeperListQuery>(GetBeepers, {
    variables: {
      latitude: route.params.latitude,
      longitude: route.params.longitude,
      radius
    }
  });

  useEffect(() => {
      if (previousData) refetch();
    startPolling(6000);
    return () => {
      stopPolling();
    };
  }, []);

  function getSubtitle(): string {
    if (loading) return `Loading...`;
    if (error) return `Unable to get beeper list`;
    return (data?.getBeeperList.length == 1) ? `${data.getBeeperList.length} beeper in ${radius} miles` : `${data?.getBeeperList.length} beepers in ${radius} miles`;
  }

  function goBack(id: string): void {
    route.params.handlePick(id);
    navigation.goBack();
  }

  function getDescription(user: User): string {
      let distance = 0;
      if (user.location) {
          distance = getDistance(route.params.latitude, route.params.longitude, user.location?.latitude, user.location?.longitude);
      }
      return `${user.rating ? printStars(user.rating) + "\n" : ""}${user.queueSize} in ${user.first}'s queue\nCapacity: ${user.capacity} riders\nSingles: $${user.singlesRate}\nGroups: $${user.groupRate}\nDistance from you: ${distance.toFixed(2)} mi`;
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const decreseRadius = () => {
    if (radius - 5 <= 0) return;

    setRadius(oldRadius => oldRadius - 5);
  };

  const increaseRadius = () => {
    if (radius + 5 > 30) return;

    setRadius(oldRadius => oldRadius + 5);
  };

  const MileAction = () => (
    <>
      <TopNavigationAction icon={MinusIcon} onPress={decreseRadius} />
      <TopNavigationAction icon={PlusIcon} onPress={increaseRadius} />
    </>
  );

  const renderItem = ({ item }: { item: User }) => (
    <ListItem
      onPress={() => goBack(item.id)}
      title={`${item.first} ${item.last}`}
      description={getDescription(item)}
      accessoryRight={() => {
        return (
          <View style={styles.row}>
            {item.role === "admin" ? <Button size='tiny' status='danger'>Founder</Button> : null}
            {item.masksRequired ? <Button status="basic" size='tiny' style={{ marginRight: 4 }}>Masks</Button> : null}
            {item.venmo ? <Button status="info" size='tiny' style={{ marginRight: 4 }}>Venmo</Button> : null}
            {item.cashapp ? <Button status="success" size='tiny' style={{ marginRight: 4 }}>Cash App</Button> : null}
          </View>
        );
      }}
      accessoryLeft={() => {
        return (
          <ProfilePicture
            size={50}
            url={item.photoUrl || ''}
          />
        );
      }}
    />
  );

  return (
    <>
      <TopNavigation title='Beeper List'
        alignment='center'
        subtitle={getSubtitle()}
        accessoryLeft={BackAction}
        accessoryRight={MileAction}
      />
      {loading ?
        <Layout style={styles.container}>
          <Spinner size='large' />
        </Layout>
        : null
      }
      {error ?
        <Layout style={styles.container}>
          <Text category='h5'>Error</Text>
          <Text appearance='hint'>{error.message}</Text>
        </Layout>
        : null
      }
      {data?.getBeeperList && data.getBeeperList.length === 0 ?
        <Layout style={styles.container}>
          <Text category='h5'>Nobody is beeping!</Text>
          <Text appearance='hint' style={{ width: '85%' }}>Nobody is beeping right now! Use the + - buttons to change your beeper range</Text>
        </Layout>
        : null
      }
      {data?.getBeeperList && data.getBeeperList.length > 0 ?
        <List
          data={data.getBeeperList as User[]}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        : null
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '99%',
    alignItems: "center",
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: "row-reverse",
  }
});
