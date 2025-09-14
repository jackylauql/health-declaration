import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { Group, Pagination, Select, Stack, Table, Text } from '@mantine/core';
import { useListDeclarations } from '../hooks/useListDeclarations';

const ListDeclarationTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useListDeclarations(searchParams);
  return (
    <Stack gap={8}>
      <Stack>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Full Name</Table.Th>
              <Table.Th>Temperature (°C)</Table.Th>
              <Table.Th>Close Contact</Table.Th>
              <Table.Th>Created At</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.data.results.map((d) => (
              <Table.Tr key={d.full_name}>
                <Table.Td>{d.full_name}</Table.Td>
                <Table.Td>{d.temperature}</Table.Td>
                <Table.Td>{d.close_contact_with_covid ? 'Yes' : 'No'}</Table.Td>
                <Table.Td>{dayjs(d.createdAt).format('DD/MM/YYYY hh:mm')}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="end">
          <Text size="sm">
            {data?.data.meta.total_count
              ? `Total Results: ${data.data.meta.total_count}`
              : `No Results found`}
          </Text>
        </Group>
      </Stack>

      {data?.data.meta.total_pages && (
        <Group justify="end" align="center">
          <Group gap={4}>
            <Text size="sm">Page Size: </Text>
            <Select
              style={{ width: 80 }}
              value={searchParams.get('pageSize') || '10'}
              onChange={(v) =>
                setSearchParams({
                  pageSize: v || '10',
                  page: searchParams.get('page') || '1',
                })
              }
              data={['10', '20', '50']}
            />
          </Group>
          <Pagination
            total={data?.data.meta.total_pages}
            value={Number(searchParams.get('page')) || 1}
            onChange={(v) =>
              setSearchParams({
                pageSize: searchParams.get('pageSize') || '10',
                page: v.toString(),
              })
            }
          />
        </Group>
      )}
    </Stack>
  );
};

export { ListDeclarationTable };
