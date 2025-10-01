import { ChakraProvider, Box, Flex, Container, useColorMode, IconButton, Heading, Text, HStack } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { PDFUpload } from './components/PDFUpload';
import { ChatInterface } from './components/ChatInterface';
import { useSession } from './hooks/useSession';
import theme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
    />
  );
}

function AppContent() {
  const { pdfFilename } = useSession();
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" h="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      {/* Header */}
      <Box
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        borderBottom="1px"
        borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        px={6}
        py={4}
      >
        <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
          <HStack spacing={3}>
            <Box
              bg="brand.500"
              color="white"
              p={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize="xl"
            >
              📄
            </Box>
            <Box>
              <Heading size="md" fontWeight="600">
                PDF RAG Assistant
              </Heading>
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                Chat with your documents, powered by AI
              </Text>
            </Box>
          </HStack>
          <ColorModeToggle />
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="1400px" flex="1" py={6} overflow="hidden">
        <Flex gap={6} h="full">
          {/* Left Panel - PDF Upload & Info */}
          <Box
            w={pdfFilename ? '320px' : '400px'}
            flexShrink={0}
            transition="width 0.3s"
          >
            <PDFUpload />
          </Box>

          {/* Right Panel - Chat */}
          <Box flex="1" minW="0" h="full">
            <ChatInterface />
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
