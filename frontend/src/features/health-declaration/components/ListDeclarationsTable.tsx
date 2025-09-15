import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { Badge, Group, Pagination, Select, Stack, Table, Text } from '@mantine/core';
import { useListDeclarations } from '../hooks/useListDeclarations';
import { useListSymptomOptions } from '../hooks/useListSymptomOptions';

const YesBadge = () => (
  <Badge miw={50} color="red">
    Yes
  </Badge>
);
const NoBadge = () => (
  <Badge miw={50} color="green">
    No
  </Badge>
);

const ListDeclarationTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useListDeclarations(searchParams);
  const { data: symptomOptions } = useListSymptomOptions();
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Full Name</Table.Th>
            <Table.Th ta="center">Temperature (°C)</Table.Th>
            {symptomOptions?.data.map((symptom) => (
              <Table.Th ta="center">{symptom.symptom_name}</Table.Th>
            ))}
            <Table.Th ta="center">Close Contact</Table.Th>
            <Table.Th ta="center">Created At</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.data.results.map((d) => (
            <Table.Tr key={d.full_name}>
              <Table.Td>{d.full_name}</Table.Td>
              <Table.Td align="center">{d.temperature}</Table.Td>
              {symptomOptions?.data.map((symptom) => (
                <Table.Td align="center">
                  {d.symptom_ids.includes(symptom.id) ? <YesBadge /> : <NoBadge />}
                </Table.Td>
              ))}
              <Table.Td align="center">
                {d.close_contact_with_covid ? <YesBadge /> : <NoBadge />}
              </Table.Td>
              <Table.Td align="center">{dayjs(d.createdAt).format('DD/MM/YYYY HH:MM')}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Stack gap={8} mt={16}>
        <Stack>
          <Group justify="end">
            <Text size="sm" fw={700}>
              {data?.data.meta.total_count
                ? `Total Results: ${data.data.meta.total_count}`
                : `No Results found`}
            </Text>
          </Group>
        </Stack>

        {data?.data.meta.total_pages ? (
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
        ) : (
          ''
        )}
      </Stack>
    </>
  );
};

export { ListDeclarationTable };
