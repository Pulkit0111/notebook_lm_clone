import React from 'react';
import {
  Box,
  VStack,
  Button,
  Text,
  useColorMode,
  Icon,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
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
    <Card
      h="full"
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      boxShadow="lg"
      borderRadius="xl"
    >
      <CardBody>
        <VStack spacing={4} align="stretch" h="full">
          <Box>
            <Text fontSize="lg" fontWeight="600" mb={1}>
              Document Source
            </Text>
            <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
              Upload a PDF to start chatting
            </Text>
          </Box>

          <Divider />

          {!pdfFilename ? (
            <Box
              {...getRootProps()}
              border="2px dashed"
              borderColor={
                isDragActive
                  ? 'brand.500'
                  : colorMode === 'dark'
                  ? 'gray.600'
                  : 'gray.300'
              }
              borderRadius="lg"
              p={8}
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              bg={
                isDragActive
                  ? colorMode === 'dark'
                    ? 'gray.700'
                    : 'brand.50'
                  : 'transparent'
              }
              _hover={{
                borderColor: 'brand.500',
                bg: colorMode === 'dark' ? 'gray.700' : 'brand.50',
              }}
            >
              <input {...getInputProps()} />
              <VStack spacing={3}>
                <Icon
                  as={AttachmentIcon}
                  w={12}
                  h={12}
                  color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
                />
                {isDragActive ? (
                  <Text fontWeight="500" color="brand.500">
                    Drop your PDF here
                  </Text>
                ) : (
                  <>
                    <Text fontWeight="500">
                      Drag & drop a PDF here
                    </Text>
                    <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                      or click to browse
                    </Text>
                  </>
                )}
              </VStack>
            </Box>
          ) : (
            <VStack spacing={4} align="stretch">
              <Alert
                status="success"
                variant="subtle"
                borderRadius="lg"
                bg={colorMode === 'dark' ? 'green.900' : 'green.50'}
              >
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle fontSize="sm">Document Loaded</AlertTitle>
                  <AlertDescription fontSize="xs">
                    Ready to answer questions
                  </AlertDescription>
                </Box>
              </Alert>

              <Card
                bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                borderRadius="lg"
              >
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between">
                      <Text fontSize="sm" fontWeight="500" noOfLines={1} flex="1">
                        {pdfFilename}
                      </Text>
                      <HStack spacing={1}>
                        <Icon as={CheckCircleIcon} color="green.500" />
                        <Tooltip label="Remove document" placement="top">
                          <IconButton
                            aria-label="Remove document"
                            icon={<CloseIcon />}
                            size="xs"
                            variant="ghost"
                            colorScheme="red"
                            onClick={handleRemovePDF}
                          />
                        </Tooltip>
                      </HStack>
                    </HStack>
                    {numChunks && (
                      <HStack spacing={2}>
                        <Badge colorScheme="brand" fontSize="xs">
                          {numChunks} chunks
                        </Badge>
                        <Text fontSize="xs" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                          indexed
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          )}

          {isUploading && (
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="500">
                  Uploading...
                </Text>
                <Text fontSize="sm" color="brand.500" fontWeight="600">
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
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle fontSize="sm">Upload Failed</AlertTitle>
                <AlertDescription fontSize="xs">
                  {error.message || 'Failed to upload PDF'}
                </AlertDescription>
              </Box>
            </Alert>
          )}

          <Box mt="auto" pt={4}>
            <Text fontSize="xs" color={colorMode === 'dark' ? 'gray.500' : 'gray.500'}>
              💡 Upload a PDF document to enable AI-powered conversations about its content
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};
