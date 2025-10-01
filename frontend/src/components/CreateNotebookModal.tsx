import React, { useState, useCallback } from 'react';
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
  Input,
  FormControl,
  FormLabel,
  Box,
  Icon,
  Progress,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { AttachmentIcon } from '@chakra-ui/icons';

interface CreateNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, file: File) => Promise<void>;
}

export const CreateNotebookModal: React.FC<CreateNotebookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { colorMode } = useColorMode();
  const [notebookName, setNotebookName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      // Auto-fill notebook name from filename if empty
      if (!notebookName) {
        const nameWithoutExt = file.name.replace('.pdf', '');
        setNotebookName(nameWithoutExt);
      }
    }
  }, [notebookName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    disabled: isSubmitting,
  });

  const handleSubmit = async () => {
    if (!notebookName.trim() || !selectedFile) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(notebookName.trim(), selectedFile);
      // Reset form
      setNotebookName('');
      setSelectedFile(null);
      setError(null);
      onClose();
    } catch (error: any) {
      console.error('Error creating notebook:', error);
      const errorMessage = error?.message || error?.detail || 'Failed to create notebook. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setNotebookName('');
      setSelectedFile(null);
      setError(null);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
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
          Create New Notebook
        </ModalHeader>
        <ModalCloseButton isDisabled={isSubmitting} />
        <ModalBody py={5}>
          <VStack spacing={4} align="stretch">
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertDescription fontSize="sm">{error}</AlertDescription>
              </Alert>
            )}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}>
                Notebook Name
              </FormLabel>
              <Input
                value={notebookName}
                onChange={(e) => setNotebookName(e.target.value)}
                placeholder="Enter notebook name"
                size="md"
                fontSize="sm"
                isDisabled={isSubmitting}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}>
                PDF Document
              </FormLabel>
              {!selectedFile ? (
                <Box
                  {...getRootProps()}
                  border="1px solid"
                  borderColor={
                    isDragActive
                      ? colorMode === 'dark' ? 'brand.300' : 'brand.500'
                      : colorMode === 'dark'
                      ? 'neutral.700'
                      : 'neutral.300'
                  }
                  borderRadius="md"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  transition="all 0.15s ease-out"
                  bg={
                    isDragActive
                      ? colorMode === 'dark'
                        ? 'darkBg.tertiary'
                        : 'brand.50'
                      : 'transparent'
                  }
                  _hover={{
                    borderColor: colorMode === 'dark' ? 'brand.300' : 'brand.500',
                    bg: colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.100',
                  }}
                >
                  <input {...getInputProps()} />
                  <VStack spacing={2}>
                    <Icon
                      as={AttachmentIcon}
                      w={8}
                      h={8}
                      color={colorMode === 'dark' ? 'neutral.500' : 'neutral.400'}
                    />
                    {isDragActive ? (
                      <Text fontWeight="medium" fontSize="sm" color={colorMode === 'dark' ? 'brand.300' : 'brand.500'}>
                        Drop your PDF here
                      </Text>
                    ) : (
                      <>
                        <Text fontWeight="medium" fontSize="sm" color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}>
                          Drag & drop a PDF here
                        </Text>
                        <Text fontSize="xs" color={colorMode === 'dark' ? 'neutral.500' : 'neutral.600'}>
                          or click to browse
                        </Text>
                      </>
                    )}
                  </VStack>
                </Box>
              ) : (
                <Box
                  p={3}
                  border="1px solid"
                  borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'}
                  borderRadius="md"
                  bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.50'}
                >
                  <VStack align="stretch" spacing={2}>
                    <Text fontSize="sm" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
                      {selectedFile.name}
                    </Text>
                    <Text fontSize="xs" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                    {!isSubmitting && (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => setSelectedFile(null)}
                        fontSize="xs"
                      >
                        Remove
                      </Button>
                    )}
                  </VStack>
                </Box>
              )}
            </FormControl>

            {isSubmitting && (
              <Box>
                <Text fontSize="xs" mb={2} color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}>
                  Creating notebook...
                </Text>
                <Progress
                  size="xs"
                  isIndeterminate
                  colorScheme="brand"
                  borderRadius="full"
                />
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter
          borderTop="1px"
          borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'}
          gap={2}
        >
          <Button variant="ghost" onClick={handleClose} size="sm" isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            size="sm"
            isDisabled={!notebookName.trim() || !selectedFile || isSubmitting}
            isLoading={isSubmitting}
            bg="brand.500"
            color="white"
            _hover={{
              bg: 'brand.600',
            }}
            _active={{
              bg: 'brand.700',
            }}
            _disabled={{
              bg: colorMode === 'dark' ? 'neutral.700' : 'neutral.300',
              color: colorMode === 'dark' ? 'neutral.500' : 'neutral.500',
              opacity: 0.6,
              cursor: 'not-allowed',
            }}
          >
            Create Notebook
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

