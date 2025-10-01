import React from 'react';
import {
  Box,
  useColorMode,
  Text,
  Flex,
  Button,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Message as MessageComponent } from './Message';
import { LoadingIndicator } from './LoadingIndicator';
import { ChatInput } from './ChatInput';
import { ClearChatModal } from './ClearChatModal';
import { useChat } from '@/hooks/useChat';
import { Message as MessageType } from '@/types';

interface ChatInterfaceProps {
  initialMessages?: MessageType[];
  onMessagesChange?: (messages: MessageType[]) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  initialMessages = [], 
  onMessagesChange 
}) => {
  const { messages, sendMessage, isLoading, clearMessages } = useChat({
    initialMessages,
    onMessagesChange,
  });
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClearChat = () => {
    clearMessages();
    onClose();
  };

  return (
    <>
      <Box position="relative" h="full" display="flex" flexDirection="column">
        {/* Minimal Chat Header - Sticky */}
        <Flex
          h="48px"
          px={6}
          borderBottom="1px"
          borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
          justify="space-between"
          align="center"
          flexShrink={0}
          bg={colorMode === 'dark' ? 'darkBg.primary' : 'white'}
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Text fontSize="sm" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
            Chat
          </Text>
          {messages.length > 0 && (
            <Button
              size="xs"
              variant="ghost"
              onClick={onOpen}
              fontSize="xs"
              color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}
            >
              Clear
            </Button>
          )}
        </Flex>

        {/* Messages - Scrollable Area */}
        <Box 
          flex="1" 
          overflowY="auto"
          minH={0}
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '3px',
            },
          }}
        >
          <Box px={6} py={4}>
            {messages.length === 0 ? (
              <Flex
                h="full"
                minH="400px"
                align="center"
                justify="center"
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
              </Flex>
            ) : (
              <VStack spacing={4} align="stretch">
                {messages.map((message) => (
                  <MessageComponent key={message.id} message={message} />
                ))}
                {isLoading && <LoadingIndicator />}
              </VStack>
            )}
          </Box>
        </Box>

        {/* Input - Sticky */}
        <Box
          px={6}
          py={4}
          borderTop="1px"
          borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
          flexShrink={0}
          bg={colorMode === 'dark' ? 'darkBg.primary' : 'white'}
          position="sticky"
          bottom={0}
          zIndex={10}
        >
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </Box>
      </Box>

      <ClearChatModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleClearChat}
      />
    </>
  );
};
