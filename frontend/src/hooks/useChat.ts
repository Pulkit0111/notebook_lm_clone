import { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { useSession } from './useSession';
import type { Message, ErrorResponse } from '@/types';

interface UseChatOptions {
  initialMessages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
}

export const useChat = (options: UseChatOptions = {}) => {
  const { initialMessages = [], onMessagesChange } = options;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { sessionId } = useSession();

  // Update messages when initialMessages change (e.g., switching notebooks)
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Notify parent component when messages change
  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  const queryMutation = useMutation({
    mutationFn: async (question: string) => {
      if (!sessionId) {
        throw new Error('No session ID available');
      }
      return await apiClient.queryPDF(sessionId, question);
    },
    onSuccess: (data, question) => {
      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString() + '-assistant',
        type: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        source: data.source,
        webSources: data.web_sources || [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (error: ErrorResponse) => {
      console.error('Query error:', error);
      // Optionally add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        type: 'assistant',
        content: `Error: ${error.error}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || !sessionId) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString() + '-user',
        type: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send query
      queryMutation.mutate(content.trim());
    },
    [sessionId, queryMutation]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading: queryMutation.isPending,
    error: queryMutation.error as ErrorResponse | null,
  };
};

