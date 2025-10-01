import React from 'react';
import {
  Box,
  VStack,
  Text,
  useColorMode,
  Icon,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Badge,
  Divider,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { AttachmentIcon, CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useSession } from '@/hooks/useSession';

export const PDFUpload: React.FC = () => {
  const { upload, isUploading, uploadProgress, error, reset } = useFileUpload();
  const { pdfFilename, numChunks, clearSession } = useSession();
  const { colorMode } = useColorMode();

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        reset();
        upload(acceptedFiles[0]);
      }
    },
    [upload, reset]
  );

  const handleRemovePDF = () => {
    clearSession();
    reset();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <Box p={4} h="full">
      <VStack spacing={4} align="stretch" h="full">
        <Box>
          <Text fontSize="sm" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'} mb={1}>
            Sources
          </Text>
          <Text fontSize="xs" color={colorMode === 'dark' ? 'neutral.500' : 'neutral.600'}>
            Upload documents to get started
          </Text>
        </Box>

        <Divider borderColor={colorMode === 'dark' ? 'neutral.800' : 'neutral.300'} />

        {!pdfFilename ? (
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
          <VStack spacing={3} align="stretch">
            <Alert
              status="success"
              variant="subtle"
              borderRadius="md"
              bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.100'}
              border="1px solid"
              borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'}
            >
              <AlertIcon color="green.500" />
              <Box flex="1">
                <AlertTitle fontSize="xs" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
                  Document Loaded
                </AlertTitle>
                <AlertDescription fontSize="2xs" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}>
                  Ready to chat
                </AlertDescription>
              </Box>
            </Alert>

            <Box
              bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'white'}
              borderRadius="md"
              p={3}
              border="1px solid"
              borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'}
            >
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text fontSize="xs" fontWeight="medium" noOfLines={1} flex="1" color={colorMode === 'dark' ? 'neutral.200' : 'neutral.900'}>
                    {pdfFilename}
                  </Text>
                  <HStack spacing={1}>
                    <Icon as={CheckCircleIcon} color="green.500" boxSize={3} />
                    <Tooltip label="Remove document" placement="top">
                      <IconButton
                        aria-label="Remove document"
                        icon={<CloseIcon />}
                        size="xs"
                        variant="ghost"
                        onClick={handleRemovePDF}
                      />
                    </Tooltip>
                  </HStack>
                </HStack>
                {numChunks && (
                  <HStack spacing={2}>
                    <Badge 
                      fontSize="2xs"
                      borderRadius="full"
                      px={2}
                      py={0.5}
                      bg={colorMode === 'dark' ? 'brand.900' : 'brand.50'}
                      color={colorMode === 'dark' ? 'brand.300' : 'brand.700'}
                      fontWeight="medium"
                    >
                      {numChunks} chunks
                    </Badge>
                    <Text fontSize="2xs" color={colorMode === 'dark' ? 'neutral.500' : 'neutral.600'}>
                      indexed
                    </Text>
                  </HStack>
                )}
              </VStack>
            </Box>
          </VStack>
        )}

        {isUploading && (
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="xs" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}>
                Uploading...
              </Text>
              <Text fontSize="xs" color={colorMode === 'dark' ? 'brand.300' : 'brand.500'} fontWeight="medium">
                {uploadProgress}%
              </Text>
            </HStack>
            <Progress
              value={uploadProgress}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
              hasStripe
              isAnimated
            />
          </VStack>
        )}

        {error && (
          <Alert status="error" borderRadius="md" fontSize="xs">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle fontSize="xs">Upload Failed</AlertTitle>
              <AlertDescription fontSize="2xs">
                {error.message || 'Failed to upload PDF'}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Box mt="auto" pt={4}>
          <Text fontSize="2xs" color={colorMode === 'dark' ? 'neutral.600' : 'neutral.500'}>
            Upload a PDF document to start chatting
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
