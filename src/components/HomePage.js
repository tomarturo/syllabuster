import React from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="4" align="center" justify="center" style={{ minHeight: '100vh' }}>
      <Text size="5" weight="bold">Choose an Option</Text>
      <Flex gap="4">
        <Button onClick={() => navigate('/upload')} variant="solid">
          Upload Document
        </Button>
        <Button onClick={() => navigate('/scan')} variant="outline">Scan Document</Button>
      </Flex>
    </Flex>
  );
};

export default HomePage;