import React from 'react';
import { Box, Flex, useColorMode, IconButton, Text, Icon, Tooltip } from '@chakra-ui/react';
import { ArrowBackIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ChatInterface } from './ChatInterface';
import { Notebook, Message } from '@/types';

interface NotebookViewProps {
  notebook: Notebook;
  onBack: () => void;
  onMessagesChange: (messages: Message[]) => void;
}

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
    />
  );
}

export const NotebookView: React.FC<NotebookViewProps> = ({ notebook, onBack, onMessagesChange }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" h="100vh" bg={colorMode === 'dark' ? 'darkBg.primary' : 'white'}>
      {/* Header */}
      <Box
        h="64px"
        borderBottom="1px"
        borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
        px={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexShrink={0}
      >
        <Flex align="center" gap={3}>
          <Tooltip label="Back to notebooks" placement="bottom">
            <IconButton
              aria-label="Back to notebooks"
              icon={<ArrowBackIcon />}
              onClick={onBack}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
          <Flex align="center" gap={2}>
            <Icon viewBox="0 0 24 24" boxSize={5} color="brand.500">
              <path
                fill="currentColor"
                d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
              />
            </Icon>
            <Text fontSize="lg" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
              {notebook.name}
            </Text>
          </Flex>
        </Flex>
        <ColorModeToggle />
      </Box>

      {/* Chat Interface */}
      <Box flex="1" h="full" bg={colorMode === 'dark' ? 'darkBg.primary' : 'white'}>
        <ChatInterface 
          initialMessages={notebook.messages}
          onMessagesChange={onMessagesChange}
        />
      </Box>
    </Flex>
  );
};

