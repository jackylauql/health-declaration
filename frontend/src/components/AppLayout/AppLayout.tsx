import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Flex, Group, Stack, Tabs, Text } from '@mantine/core';

const TitleAndSubtitle = () => {
  return (
    <Stack gap={0} align="center">
      <Text fw={700} size="2rem">
        Health Declaration System
      </Text>
      <Text size="md">COVID-19 Health Screen Form</Text>
    </Stack>
  );
};

const TitleAndNav = () => {
  return (
    <Stack>
      <TitleAndSubtitle />
    </Stack>
  );
};

const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <Flex justify="center" align="center" direction="column" p={24}>
      <TitleAndNav />
      <Group mt={16} mb={16}>
        <Button onClick={() => navigate('/new')}>New Declaration</Button>
        <Button onClick={() => navigate('/')}>All Declarations</Button>
      </Group>
      <Outlet />
    </Flex>
  );
};

export { AppLayout };
