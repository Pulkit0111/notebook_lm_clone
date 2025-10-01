import React from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  Link,
  useColorMode,
  Divider,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import { Message as MessageType } from '@/types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { colorMode } = useColorMode();
  const isUser = message.type === 'user';

  if (isUser) {
    // USER MESSAGE - LEFT SIDE
    return (
      <HStack align="flex-start" spacing={3} justify="flex-start" w="full">
        <Text fontSize="xs" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'} mt={1} flexShrink={0}>
          You
        </Text>
        <Box maxW="600px">
          <Box
            bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'brand.50'}
            color={colorMode === 'dark' ? 'neutral.100' : 'neutral.900'}
            px={4}
            py={3}
            borderRadius="lg"
            boxShadow="sm"
          >
            <Text fontSize="sm" wordBreak="break-word" whiteSpace="pre-wrap">{message.content}</Text>
          </Box>
        </Box>
      </HStack>
    );
  }

  // AI MESSAGE - RIGHT SIDE
  return (
    <HStack align="flex-start" spacing={3} justify="flex-end" w="full">
      <Box maxW="600px">
        <Box
          bg={colorMode === 'dark' ? 'darkBg.secondary' : 'neutral.100'}
          color={colorMode === 'dark' ? 'neutral.100' : 'neutral.900'}
          px={4}
          py={3}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Box
            sx={{
              '& p': {
                marginBottom: '0.75rem',
                fontSize: 'sm',
                wordBreak: 'break-word',
                '&:last-child': {
                  marginBottom: 0,
                },
              },
              '& ul, & ol': {
                marginLeft: '1.5rem',
                marginBottom: '0.75rem',
                fontSize: 'sm',
              },
              '& code': {
                backgroundColor: colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.200',
                color: colorMode === 'dark' ? 'brand.300' : 'brand.600',
                padding: '0.125rem 0.375rem',
                borderRadius: 'sm',
                fontSize: 'xs',
                wordBreak: 'break-word',
              },
              '& pre': {
                backgroundColor: colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.200',
                padding: '0.75rem',
                borderRadius: 'md',
                overflowX: 'auto',
                marginBottom: '0.75rem',
              },
            }}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Box>

          {message.source && (
            <>
              <Divider my={3} borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'} />
              <VStack align="stretch" spacing={3}>
                {/* Source Badge */}
                <HStack spacing={2} flexWrap="wrap">
                  <Badge
                    fontSize="2xs"
                    borderRadius="full"
                    px={2}
                    py={0.5}
                    bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'white'}
                    color={colorMode === 'dark' ? 'neutral.300' : 'neutral.700'}
                    border="1px solid"
                    borderColor={colorMode === 'dark' ? 'neutral.700' : 'neutral.300'}
                    fontWeight="medium"
                    textTransform="none"
                  >
                    {message.source === 'pdf' ? 'From PDF' : 'From Web'}
                  </Badge>
                </HStack>

                {/* Web Sources */}
                {message.webSources && message.webSources.length > 0 && (
                  <VStack align="stretch" spacing={2} mt={2}>
                    <Text 
                      fontSize="xs" 
                      fontWeight="medium" 
                      color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}
                    >
                      Sources
                    </Text>
                    {message.webSources.map((source, idx) => (
                      <Box
                        key={idx}
                        p={2}
                        bg={colorMode === 'dark' ? 'darkBg.tertiary' : 'neutral.50'}
                        borderRadius="md"
                        borderLeft="2px solid"
                        borderColor="brand.500"
                        transition="all 0.15s ease-out"
                        _hover={{
                          bg: colorMode === 'dark' ? 'neutral.800' : 'white',
                        }}
                      >
                        <Link
                          href={source.url}
                          isExternal
                          fontSize="xs"
                          color={colorMode === 'dark' ? 'brand.300' : 'brand.600'}
                          fontWeight="medium"
                          _hover={{ 
                            textDecoration: 'underline',
                          }}
                        >
                          <HStack spacing={2} align="center">
                            <Text flex="1">{source.title || 'Source Link'}</Text>
                            <ExternalLinkIcon boxSize={3} />
                          </HStack>
                        </Link>
                        {source.snippet && (
                          <Text
                            fontSize="xs"
                            color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'}
                            mt={1}
                            noOfLines={2}
                          >
                            {source.snippet}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </VStack>
                )}
              </VStack>
            </>
          )}
        </Box>
      </Box>
      <Text fontSize="xs" fontWeight="medium" color={colorMode === 'dark' ? 'neutral.400' : 'neutral.600'} mt={1} flexShrink={0}>
        AI
      </Text>
    </HStack>
  );
};
