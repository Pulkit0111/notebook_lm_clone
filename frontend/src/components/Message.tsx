import React from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  Link,
  useColorMode,
  Card,
  CardBody,
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

  // USER MESSAGES: LEFT SIDE (flex-start) with BLUE
  // AI MESSAGES: RIGHT SIDE (flex-end) with GREEN
  
  if (isUser) {
    // USER MESSAGE - LEFT SIDE
    return (
      <HStack align="flex-start" spacing={3} justify="flex-start" w="full">
        <Box fontSize="2xl">👤</Box>
        <Box maxW="65%">
          <Card
            bg={colorMode === 'dark' ? 'blue.600' : 'blue.500'}
            color="white"
            boxShadow="lg"
            borderRadius="2xl"
          >
            <CardBody py={3} px={4}>
              <Text fontSize="md">{message.content}</Text>
            </CardBody>
          </Card>
        </Box>
      </HStack>
    );
  }

  // AI MESSAGE - RIGHT SIDE
  return (
    <HStack align="flex-start" spacing={3} justify="flex-end" w="full">
      <Box maxW="70%">
        <Card
          bg={colorMode === 'dark' ? 'green.700' : 'green.500'}
          color="white"
          boxShadow="lg"
          borderRadius="2xl"
        >
          <CardBody py={3} px={4}>
            <Box
              sx={{
                '& p': {
                  marginBottom: '0.75rem',
                  '&:last-child': {
                    marginBottom: 0,
                  },
                },
                '& ul, & ol': {
                  marginLeft: '1.5rem',
                  marginBottom: '0.75rem',
                },
                '& code': {
                  backgroundColor: colorMode === 'dark' ? 'green.800' : 'green.600',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  color: 'white',
                },
                '& pre': {
                  backgroundColor: colorMode === 'dark' ? 'green.800' : 'green.600',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  overflowX: 'auto',
                  marginBottom: '0.75rem',
                },
              }}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </Box>

            {message.source && (
              <>
                <Divider my={3} borderColor="whiteAlpha.400" opacity={0.6} />
                <VStack align="stretch" spacing={3}>
                  {/* Source Badge */}
                  <HStack spacing={2} flexWrap="wrap">
                    <Badge
                      colorScheme={message.source === 'pdf' ? 'yellow' : 'cyan'}
                      fontSize="xs"
                      borderRadius="md"
                      px={3}
                      py={1}
                      fontWeight="700"
                      textTransform="uppercase"
                      color="gray.800"
                    >
                      {message.source === 'pdf' ? '📄 FROM PDF' : '🌐 FROM WEB'}
                    </Badge>
                  </HStack>

                  {/* Web Sources */}
                  {message.webSources && message.webSources.length > 0 && (
                    <VStack align="stretch" spacing={2} mt={2}>
                      <Text 
                        fontSize="xs" 
                        fontWeight="700" 
                        color="whiteAlpha.900"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        📚 SOURCES & CITATIONS
                      </Text>
                      {message.webSources.map((source, idx) => (
                        <Box
                          key={idx}
                          p={3}
                          bg={colorMode === 'dark' ? 'green.800' : 'green.600'}
                          borderRadius="lg"
                          borderLeft="4px solid"
                          borderColor="yellow.300"
                          transition="all 0.2s"
                          _hover={{
                            bg: colorMode === 'dark' ? 'green.900' : 'green.700',
                            transform: 'translateX(-4px)',
                          }}
                        >
                          <Link
                            href={source.url}
                            isExternal
                            fontSize="sm"
                            color="yellow.200"
                            fontWeight="700"
                            _hover={{ 
                              textDecoration: 'underline',
                              color: 'yellow.100',
                            }}
                          >
                            <HStack spacing={2} align="center">
                              <Text flex="1">{source.title || 'Source Link'}</Text>
                              <ExternalLinkIcon boxSize={4} />
                            </HStack>
                          </Link>
                          {source.snippet && (
                            <Text
                              fontSize="xs"
                              color="whiteAlpha.800"
                              mt={2}
                              noOfLines={2}
                              fontStyle="italic"
                            >
                              "{source.snippet}"
                            </Text>
                          )}
                        </Box>
                      ))}
                    </VStack>
                  )}
                </VStack>
              </>
            )}
          </CardBody>
        </Card>
      </Box>
      <Box fontSize="2xl">🤖</Box>
    </HStack>
  );
};
