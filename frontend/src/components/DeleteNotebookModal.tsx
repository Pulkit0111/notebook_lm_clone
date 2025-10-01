import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useColorMode,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

interface DeleteNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  notebookName: string;
}

export const DeleteNotebookModal: React.FC<DeleteNotebookModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  notebookName,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        bg={colorMode === 'dark' ? 'darkBg.secondary' : 'white'}
        borderRadius="lg"
        boxShadow="md"
      >
        <ModalHeader
          borderBottom="1px"
          borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
          fontSize="md"
          fontWeight="medium"
          color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}
        >
          Delete Notebook
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={5}>
          <VStack spacing={3} align="center">
            <Icon
              as={WarningIcon}
              w={10}
              h={10}
              color="red.400"
            />
            <VStack spacing={2}>
              <Text fontSize="sm" fontWeight="medium" textAlign="center" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
                Delete "{notebookName}"?
              </Text>
              <Text
                fontSize="xs"
                color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}
                textAlign="center"
              >
                This notebook and all its data will be permanently deleted. This action cannot be undone.
              </Text>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter
          borderTop="1px"
          borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
          gap={2}
        >
          <Button variant="ghost" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            size="sm"
            bg={colorMode === 'dark' ? 'red.600' : 'red.500'}
            color="white"
            _hover={{
              bg: colorMode === 'dark' ? 'red.700' : 'red.600',
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

