import React from 'react';
import {
  Box,
  VStack,
  Card,
  CardBody,
  useColorMode,
  Text,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ClearChatModal } from './ClearChatModal';
import { useChat } from '@/hooks/useChat';
import { useSession } from '@/hooks/useSession';

export const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isLoading, clearMessages } = useChat();
  const { pdfFilename, clearSession } = useSession();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClearChat = () => {
    clearMessages();
    clearSession();
    onClose();
  };

  if (!pdfFilename) {
    return (
      <Card
        h="full"
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        boxShadow="lg"
        borderRadius="xl"
      >
        <CardBody>
          <Flex
            h="full"
            align="center"
            justify="center"
            direction="column"
            gap={4}
          >
            <Box textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="600"
                color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                mb={2}
              >
                Welcome to PDF RAG Assistant
              </Text>
              <Text
                fontSize="md"
                color={colorMode === 'dark' ? 'gray.500' : 'gray.600'}
              >
                Upload a PDF document to start an intelligent conversation
              </Text>
            </Box>
            <Box
              fontSize="6xl"
              opacity={0.5}
              filter={colorMode === 'dark' ? 'grayscale(1)' : 'none'}
            >
              💬
            </Box>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <Card
        h="full"
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        boxShadow="lg"
        borderRadius="xl"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <CardBody p={0} display="flex" flexDirection="column" h="full" overflow="hidden">
          {/* Chat Header */}
          <Flex
            px={6}
            py={4}
            borderBottom="1px"
            borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
            justify="space-between"
            align="center"
            flexShrink={0}
          >
            <Box>
              <Text fontSize="lg" fontWeight="600">
                Chat
              </Text>
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                Ask questions about your document
              </Text>
            </Box>
            {messages.length > 0 && (
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={onOpen}
              >
                Clear
              </Button>
            )}
          </Flex>

          {/* Messages */}
          <Box flex="1" overflow="hidden" minH="0">
            <MessageList messages={messages} isLoading={isLoading} />
          </Box>

          {/* Input */}
          <Box
            px={6}
            py={4}
            borderTop="1px"
            borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
            flexShrink={0}
          >
            <ChatInput onSend={sendMessage} isLoading={isLoading} />
          </Box>
        </CardBody>
      </Card>

      <ClearChatModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleClearChat}
      />
    </>
  );
};
