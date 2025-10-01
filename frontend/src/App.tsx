import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { NotebookList } from './components/NotebookList';
import { NotebookView } from './components/NotebookView';
import { Notebook } from './types';
import { useFileUpload } from './hooks/useFileUpload';
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

function AppContent() {
  const { upload } = useFileUpload();
  const { setSession, clearSession } = useSession();

  // Initialize notebooks from localStorage
  const [notebooks, setNotebooks] = useState<Notebook[]>(() => {
    const stored = localStorage.getItem('notebooks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((nb: any) => ({
          ...nb,
          createdAt: new Date(nb.createdAt),
          lastAccessed: new Date(nb.lastAccessed),
          messages: (nb.messages || []).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
      } catch (error) {
        console.error('Error parsing notebooks from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);

  // Save notebooks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notebooks', JSON.stringify(notebooks));
  }, [notebooks]);

  const handleNotebookCreate = async (name: string, file: File) => {
    try {
      // Upload the PDF
      const response = await upload(file);
      
      if (response) {
        // Create new notebook
        const newNotebook: Notebook = {
          id: crypto.randomUUID(),
          name,
          pdfFilename: response.filename,
          sessionId: response.session_id,
          numChunks: response.num_chunks,
          createdAt: new Date(),
          lastAccessed: new Date(),
          messages: [],
        };

        // Add to notebooks list
        setNotebooks((prev) => [newNotebook, ...prev]);
      }
    } catch (error) {
      console.error('Failed to create notebook:', error);
      // Re-throw to let the modal handle it
      throw error;
    }
  };

  const handleNotebookSelect = (notebook: Notebook) => {
    // Update last accessed time
    const updatedNotebooks = notebooks.map((nb) =>
      nb.id === notebook.id
        ? { ...nb, lastAccessed: new Date() }
        : nb
    );
    setNotebooks(updatedNotebooks);

    // Set session data
    setSession(notebook.sessionId, notebook.pdfFilename, notebook.numChunks);

    // Select notebook
    setSelectedNotebook(notebook);
  };

  const handleBackToList = () => {
    // Clear session
    clearSession();
    setSelectedNotebook(null);
  };

  const handleNotebookDelete = (notebookId: string) => {
    // Remove from state
    setNotebooks((prev) => prev.filter((nb) => nb.id !== notebookId));
    
    // If currently viewing this notebook, go back to list
    if (selectedNotebook?.id === notebookId) {
      handleBackToList();
    }
  };

  const handleMessagesChange = (notebookId: string, messages: any[]) => {
    // Update messages in the notebooks state
    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId
          ? { ...nb, messages, lastAccessed: new Date() }
          : nb
      )
    );

    // Also update selected notebook if it's the current one
    if (selectedNotebook?.id === notebookId) {
      setSelectedNotebook((prev) =>
        prev ? { ...prev, messages, lastAccessed: new Date() } : null
      );
    }
  };

  return (
    <>
      {!selectedNotebook ? (
        <NotebookList
          notebooks={notebooks}
          onNotebookSelect={handleNotebookSelect}
          onNotebookCreate={handleNotebookCreate}
          onNotebookDelete={handleNotebookDelete}
        />
      ) : (
        <NotebookView
          notebook={selectedNotebook}
          onBack={handleBackToList}
          onMessagesChange={(messages) => handleMessagesChange(selectedNotebook.id, messages)}
        />
      )}
    </>
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
