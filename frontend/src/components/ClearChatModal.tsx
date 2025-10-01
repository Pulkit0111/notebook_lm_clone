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

interface ClearChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearChatModal: React.FC<ClearChatModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        borderRadius="xl"
        boxShadow="2xl"
      >
        <ModalHeader
          borderBottom="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          Clear Chat History
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={4} align="center">
            <Icon
              as={WarningIcon}
              w={12}
              h={12}
              color="orange.400"
            />
            <VStack spacing={2}>
              <Text fontSize="lg" fontWeight="500" textAlign="center">
                Are you sure you want to clear?
              </Text>
              <Text
                fontSize="sm"
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                textAlign="center"
              >
                This will remove all messages and reset your session. This action cannot be undone.
              </Text>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter
          borderTop="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
          gap={3}
        >
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Clear Chat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

