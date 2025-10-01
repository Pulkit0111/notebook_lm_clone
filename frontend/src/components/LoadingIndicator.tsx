import React from 'react';
import {
  Box,
  HStack,
  Text,
  Card,
  CardBody,
  useColorMode,
  Spinner,
} from '@chakra-ui/react';

export const LoadingIndicator: React.FC = () => {
  const { colorMode } = useColorMode();

  // AI Thinking - RIGHT SIDE to match AI responses
  return (
    <HStack align="flex-start" spacing={3} justify="flex-end" w="full">
      <Box maxW="70%">
        <Card
          bg={colorMode === 'dark' ? 'green.700' : 'green.500'}
          color="white"
          boxShadow="lg"
          borderRadius="2xl"
        >
          <CardBody py={3} px={4}>
            <HStack spacing={2}>
              <Spinner size="sm" color="white" speed="0.8s" />
              <Text fontSize="sm" color="white" fontWeight="500">
                Thinking...
              </Text>
            </HStack>
          </CardBody>
        </Card>
      </Box>
      <Box fontSize="2xl">🤖</Box>
    </HStack>
  );
};
