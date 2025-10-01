import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { useSession } from './useSession';
import type { ErrorResponse } from '@/types';

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setSession } = useSession();
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const simulateProgress = () => {
    let progress = 0;
    progressInterval.current = setInterval(() => {
      progress += Math.random() * 15;
      if (progress < 90) {
        setUploadProgress(Math.min(progress, 90));
      }
    }, 300);
  };

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadProgress(0);
      
      // Start simulating progress
      simulateProgress();
      
      const response = await apiClient.uploadPDF(file);
      
      // Clear interval and set to 100%
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setUploadProgress(100);
      
      return response;
    },
    onSuccess: (data) => {
      setSession(data.session_id, data.filename, data.num_chunks);
    },
    onError: (error: ErrorResponse) => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setUploadProgress(0);
      console.error('Upload error:', error);
    },
  });

  return {
    upload: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    uploadProgress: Math.round(uploadProgress),
    error: uploadMutation.error as ErrorResponse | null,
    reset: () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setUploadProgress(0);
      uploadMutation.reset();
    },
  };
};

