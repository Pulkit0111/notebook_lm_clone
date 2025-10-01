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
    <HStack spacing={2} align="flex-end">
      <Box flex="1" position="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your document..."
          size="md"
          resize="none"
          rows={1}
          maxRows={4}
          disabled={isLoading}
          fontSize="sm"
          bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'white'}
          borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'}
          borderWidth="1px"
          borderRadius="md"
          _hover={{
            borderColor: colorMode === 'dark' ? 'neutral.600' : 'neutral.400',
          }}
          _focus={{
            borderColor: colorMode === 'dark' ? 'brand.300' : 'brand.500',
            boxShadow: `0 0 0 1px ${colorMode === 'dark' ? '#8AB4F8' : '#1A73E8'}`,
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
              background: colorMode === 'dark' ? 'neutral.700' : 'neutral.400',
              borderRadius: '2px',
            },
          }}
        />
      </Box>
      <Tooltip label="Send (Enter)" placement="top">
        <IconButton
          aria-label="Send message"
          icon={<ArrowUpIcon />}
          onClick={handleSend}
          isDisabled={!input.trim() || isLoading}
          isLoading={isLoading}
          size="md"
          borderRadius="full"
          bg="brand.500"
          color="white"
          _hover={{
            bg: 'brand.600',
          }}
          _active={{
            bg: 'brand.700',
          }}
          transition="all 0.15s ease-out"
        />
      </Tooltip>
    </HStack>
  );
};

