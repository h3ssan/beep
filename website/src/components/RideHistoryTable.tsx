import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Card } from './Card';
import { gql, useQuery } from '@apollo/client';
import { GetRideHistoryQuery } from '../generated/graphql';
import Pagination from './Pagination';
import React, { useState } from 'react';
import { Box, Center, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import TdUser from './TdUser';

dayjs.extend(duration);

interface Props {
  userId: string;
}

const Hisory = gql`
    query GetRideHistory($id: String!, $show: Int, $offset: Int) {
        getRideHistory(id: $id, show: $show, offset: $offset) {
            items {
                id
                origin
                destination
                start
                end
                groupSize
                beeper {
                    id
                    photoUrl
                    username
                    first
                    last
                    name
                }
            }
            count
        }
    }
`;

function RideHistoryTable(props: Props) {
  const pageLimit = 5;
  const { data, loading, refetch } = useQuery<GetRideHistoryQuery>(Hisory, { variables: { id: props.userId, offset: 0, show: pageLimit } });
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function fetchHistory(page: number) {
    refetch({
      id: props.userId,
      offset: page
    })
  }

  if (data?.getRideHistory && data.getRideHistory.items.length === 0) {
    return (
      <Center h="100px">
        This user's queue is empty.
      </Center>
    );
  }

  if (loading) {
    return (
      <Center h="100px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Pagination
        resultCount={data?.getRideHistory?.count}
        limit={pageLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChange={fetchHistory}
      />
      <Card>
        <Table>
          <Thead>
            <Tr>
              <Th>Beeper</Th>
              <Th>Origin</Th>
              <Th>Destination</Th>
              <Th>Group Size</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.getRideHistory && (data.getRideHistory.items).map(ride => {
              return (
                <Tr key={ride.id}>
                  <TdUser user={ride.beeper} />
                  <Td>{ride.origin}</Td>
                  <Td>{ride.destination}</Td>
                  <Td>{ride.groupSize}</Td>
                  <Td>{dayjs().to(ride.start)}</Td>
                  <Td>{dayjs().to(ride.end)}</Td>
                  <Td>{dayjs.duration(new Date(ride.end).getTime() - new Date(ride.start).getTime()).humanize()}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Card>
      <Pagination
        resultCount={data?.getRideHistory?.count}
        limit={pageLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChange={fetchHistory}
      />
    </Box>
  );
}

export default RideHistoryTable;
