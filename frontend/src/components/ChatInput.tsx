import React, { useState, KeyboardEvent } from 'react';
import {
  Box,
  Textarea,
  IconButton,
  HStack,
  useColorMode,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const { colorMode } = useColorMode();

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <HStack spacing={3} align="flex-end">
      <Box flex="1" position="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your document..."
          size="lg"
          resize="none"
          rows={1}
          maxRows={4}
          disabled={isLoading}
          bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
          _hover={{
            borderColor: colorMode === 'dark' ? 'gray.500' : 'gray.400',
          }}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: `0 0 0 1px var(--chakra-colors-brand-500)`,
          }}
          _disabled={{
            opacity: 0.6,
            cursor: 'not-allowed',
          }}
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colorMode === 'dark' ? 'gray.600' : 'gray.400',
              borderRadius: '2px',
            },
          }}
        />
      </Box>
      <Tooltip label="Send message (Enter)" placement="top">
        <IconButton
          aria-label="Send message"
          icon={<ArrowUpIcon />}
          onClick={handleSend}
          isDisabled={!input.trim() || isLoading}
          isLoading={isLoading}
          colorScheme="brand"
          size="lg"
          borderRadius="xl"
          boxShadow="md"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        />
      </Tooltip>
    </HStack>
  );
};

