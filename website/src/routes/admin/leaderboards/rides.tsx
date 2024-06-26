import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react"
import { useQuery } from '@apollo/client';
import { TdUser } from '../../../components/TdUser';
import { Error } from '../../../components/Error';
import { Loading } from '../../../components/Loading';
import { Pagination } from '../../../components/Pagination';
import { leaderboardsRoute } from '.';
import { useNavigate } from '@tanstack/react-router';
import { graphql } from 'gql.tada';

export const UsersWithRides = graphql(`
  query getUsersWithRides($show: Int, $offset: Int) {
    getUsersWithRides(show: $show, offset: $offset) {
      items {
        user {
          id
          photo
          name
        }
        rides
      }
      count
    }
  }
`);

const pageLimit = 20;

export function Rides() {
  const { page } = leaderboardsRoute.useSearch();
  const navigate = useNavigate({ from: leaderboardsRoute.id });

  const { loading, error, data, previousData } = useQuery(UsersWithRides, {
    variables: {
      show: pageLimit,
      offset: (page - 1) * pageLimit,
    }
  });

  const setCurrentPage = (page: number) => {
    navigate({ search: { page } });
  };

  if (error) {
    return <Error error={error} />;
  }

  const users = data?.getUsersWithRides.items ?? previousData?.getUsersWithRides.items;
  const count = data?.getUsersWithRides.count ?? previousData?.getUsersWithRides.count;

  return (
    <Box>
      <Pagination
        resultCount={count}
        limit={pageLimit}
        currentPage={page}
        setCurrentPage={setCurrentPage}
      />
      <Box overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Beeps</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map(({ user, rides }) => (
              <Tr key={user.id}>
                <TdUser user={user} />
                <Td>{rides}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {loading && <Loading />}
      <Pagination
        resultCount={count}
        limit={pageLimit}
        currentPage={page}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
