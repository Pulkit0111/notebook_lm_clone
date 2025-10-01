import React from 'react';
import {
  Box,
  HStack,
  Text,
  useColorMode,
  Spinner,
} from '@chakra-ui/react';

export const LoadingIndicator: React.FC = () => {
  const { colorMode } = useColorMode();

  // AI Thinking - RIGHT SIDE to match AI responses
  return (
    <HStack align="flex-start" spacing={3} justify="flex-end" w="full">
      <Box maxW="70%">
        <Box
          bg={colorMode === 'dark' ? 'darkBg.secondary' : 'neutral.100'}
          color={colorMode === 'dark' ? 'neutral.100' : 'neutral.900'}
          px={4}
          py={3}
          borderRadius="lg"
          boxShadow="sm"
        >
          <HStack spacing={2}>
            <Spinner 
              size="sm" 
              color={colorMode === 'dark' ? 'brand.300' : 'brand.500'} 
              speed="0.8s"
              thickness="2px"
            />
            <Text fontSize="sm" fontWeight="medium">
              Thinking...
            </Text>
          </HStack>
        </Box>
      </Box>
      <Text fontSize="xs" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'} mt={1}>
        AI
      </Text>
    </HStack>
  );
};
