import React from 'react';
import {
  Box,
  Text,
  VStack,
  useColorMode,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Notebook } from '@/types';

interface NotebookCardProps {
  notebook: Notebook;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const NotebookCard: React.FC<NotebookCardProps> = ({ notebook, onClick, onDelete }) => {
  const { colorMode } = useColorMode();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Box
      p={5}
      borderRadius="lg"
      bg={colorMode === 'dark' ? 'darkBg.secondary' : 'neutral.100'}
      cursor="pointer"
      transition="all 0.15s ease-out"
      _hover={{
        bg: colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.200',
      }}
      onClick={onClick}
      height="160px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
    >
      {/* Three-dot menu */}
      <Box position="absolute" top={2} right={2}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Box>⋮</Box>}
            variant="ghost"
            size="xs"
            onClick={(e) => e.stopPropagation()}
            color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}
            _hover={{
              bg: colorMode === 'dark' ? 'darkBg.primary' : 'neutral.300',
            }}
          />
          <MenuList
            bg={colorMode === 'dark' ? 'darkBg.secondary' : 'white'}
            borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'}
          >
            <MenuItem
              icon={<DeleteIcon />}
              onClick={onDelete}
              color="red.500"
              _hover={{
                bg: colorMode === 'dark' ? 'darkBg.tertiary' : 'red.50',
              }}
            >
              Delete notebook
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <VStack align="flex-start" spacing={2} flex="1">
        <Box fontSize="3xl">
          📄
        </Box>
        <Text 
          fontSize="md" 
          fontWeight="medium" 
          color={colorMode === 'dark' ? 'neutral.100' : 'neutral.900'}
          noOfLines={2}
        >
          {notebook.name}
        </Text>
      </VStack>

      <Flex justify="space-between" align="center" mt={2}>
        <Text fontSize="xs" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}>
          {formatDate(notebook.lastAccessed)}
        </Text>
        <Text fontSize="xs" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}>
          • 1 source
        </Text>
      </Flex>
    </Box>
  );
};

