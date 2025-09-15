import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Group, Stack, Text } from '@mantine/core';

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
    <Box p={24}>
      <Stack justify="center" align="center" mb={24}>
        <TitleAndNav />
        <Group justify="center" align="center">
          <Button onClick={() => navigate('/new')}>New Declaration</Button>
          <Button onClick={() => navigate('/')}>All Declarations</Button>
        </Group>
      </Stack>
      <Outlet />
    </Box>
  );
};

export { AppLayout };
