import axios, { AxiosInstance } from 'axios';
import type {
  UploadResponse,
  QueryResponse,
  SessionStatusResponse,
  ErrorResponse,
} from '@/types';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: '/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          throw error.response.data as ErrorResponse;
        }
        throw {
          success: false,
          error: error.message || 'Network error occurred',
          error_code: 'NETWORK_ERROR',
        } as ErrorResponse;
      }
    );
  }

  async uploadPDF(file: File, sessionId?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (sessionId) {
      formData.append('session_id', sessionId);
    }

    const { data } = await this.client.post<UploadResponse>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  }

  async queryPDF(
    sessionId: string,
    question: string
  ): Promise<QueryResponse> {
    const { data } = await this.client.post<QueryResponse>('/query', {
      session_id: sessionId,
      question,
      stream: false,
    });

    return data;
  }

  async getSessionStatus(
    sessionId: string
  ): Promise<SessionStatusResponse> {
    const { data } = await this.client.get<SessionStatusResponse>(
      `/session/${sessionId}`
    );

    return data;
  }

  async clearSession(sessionId: string): Promise<{ success: boolean }> {
    const { data } = await this.client.delete(`/session/${sessionId}`);
    return data;
  }

  async healthCheck(): Promise<{ status: string }> {
    const { data } = await this.client.get('/health');
    return data;
  }
}

export const apiClient = new APIClient();

