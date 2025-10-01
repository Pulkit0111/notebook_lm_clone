import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Grid,
  useColorMode,
  VStack,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Notebook } from '@/types';
import { NotebookCard } from './NotebookCard';
import { CreateNotebookModal } from './CreateNotebookModal';
import { DeleteNotebookModal } from './DeleteNotebookModal';

interface NotebookListProps {
  notebooks: Notebook[];
  onNotebookSelect: (notebook: Notebook) => void;
  onNotebookCreate: (name: string, file: File) => Promise<void>;
  onNotebookDelete: (notebookId: string) => void;
}

export const NotebookList: React.FC<NotebookListProps> = ({
  notebooks,
  onNotebookSelect,
  onNotebookCreate,
  onNotebookDelete,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [notebookToDelete, setNotebookToDelete] = useState<Notebook | null>(null);

  const handleDeleteClick = (notebook: Notebook) => {
    setNotebookToDelete(notebook);
    onDeleteOpen();
  };

  const handleDeleteConfirm = () => {
    if (notebookToDelete) {
      onNotebookDelete(notebookToDelete.id);
      setNotebookToDelete(null);
      onDeleteClose();
    }
  };

  return (
    <Flex direction="column" h="100vh" bg={colorMode === 'dark' ? 'darkBg.primary' : 'white'}>
      {/* Header */}
      <Box
        h="64px"
        borderBottom="1px"
        borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
        px={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexShrink={0}
      >
        <Flex align="center" gap={2}>
          <Icon viewBox="0 0 24 24" boxSize={5} color="brand.500">
            <path
              fill="currentColor"
              d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
            />
          </Icon>
          <Text fontSize="lg" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
            Progression LM
          </Text>
        </Flex>
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            size="sm"
            variant="ghost"
            color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}
            _hover={{
              bg: colorMode === 'dark' ? 'darkBg.secondary' : 'neutral.200',
            }}
          />
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            onClick={onOpen}
            bg="brand.500"
            color="white"
            _hover={{
              bg: 'brand.600',
            }}
            _active={{
              bg: 'brand.700',
            }}
          >
            Create Notebook
          </Button>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box flex="1" overflowY="auto" px={6} py={6}>
        <VStack align="stretch" spacing={6}>
          {/* Recent Notebooks Section */}
          <Box>
            <Text 
              fontSize="md" 
              fontWeight="medium" 
              color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}
              mb={4}
            >
              Recent Notebooks
            </Text>
            
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              }}
              gap={4}
            >
              {/* Create New Notebook Card */}
              <Box
                p={5}
                borderRadius="lg"
                bg={colorMode === 'dark' ? 'darkBg.secondary' : 'neutral.100'}
                cursor="pointer"
                transition="all 0.15s ease-out"
                _hover={{
                  bg: colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.200',
                }}
                onClick={onOpen}
                height="160px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={3}>
                  <Box
                    borderRadius="full"
                    bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.200'}
                    p={3}
                  >
                    <AddIcon boxSize={6} color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'} />
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}
                  >
                    Create new notebook
                  </Text>
                </VStack>
              </Box>

              {/* Existing Notebooks */}
              {notebooks.map((notebook) => (
                <NotebookCard
                  key={notebook.id}
                  notebook={notebook}
                  onClick={() => onNotebookSelect(notebook)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(notebook);
                  }}
                />
              ))}
            </Grid>
          </Box>
        </VStack>
      </Box>

      {/* Create Notebook Modal */}
      <CreateNotebookModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onNotebookCreate}
      />

      {/* Delete Notebook Modal */}
      <DeleteNotebookModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleDeleteConfirm}
        notebookName={notebookToDelete?.name || ''}
      />
    </Flex>
  );
};

