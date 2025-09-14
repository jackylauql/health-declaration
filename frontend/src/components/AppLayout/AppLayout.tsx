import { Outlet } from 'react-router-dom';
import { Flex, Stack, Text } from '@mantine/core';

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
  return (
    <Flex justify="center" align="center" direction="column" p={24}>
      <TitleAndNav />
      <Outlet />
    </Flex>
  );
};

export { AppLayout };
