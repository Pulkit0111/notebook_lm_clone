import React, { useEffect, useRef } from 'react';
import { Box, VStack, Text, useColorMode } from '@chakra-ui/react';
import { Message } from './Message';
import { LoadingIndicator } from './LoadingIndicator';
import { Message as MessageType } from '@/types';

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Box
      h="full"
      overflowY="auto"
      px={6}
      py={4}
    >
      {messages.length === 0 ? (
        <Box
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={2}>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}
            >
              No messages yet
            </Text>
            <Text
              fontSize="xs"
              color={colorMode === 'dark' ? 'neutral.500' : 'neutral.500'}
            >
              Start by asking a question about your PDF
            </Text>
          </VStack>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={bottomRef} />
        </VStack>
      )}
    </Box>
  );
};
