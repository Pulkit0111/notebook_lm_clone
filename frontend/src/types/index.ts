export interface UploadResponse {
  success: boolean;
  message: string;
  session_id: string;
  filename: string;
  num_chunks: number;
  processing_time: number;
}

export interface WebSource {
  title: string;
  url: string;
  snippet: string;
}

export interface QueryMetadata {
  model: string;
  tokens_used?: number;
}

export interface QueryResponse {
  success: boolean;
  answer: string;
  source: 'pdf' | 'web';
  chunks_used?: number;
  web_sources?: WebSource[];
  processing_time: number;
  metadata: QueryMetadata;
}

export interface SessionStatusResponse {
  success: boolean;
  session_id: string;
  has_pdf: boolean;
  pdf_filename?: string;
  num_chunks?: number;
  created_at: string;
  last_activity: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  error_code: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  source?: 'pdf' | 'web';
  webSources?: WebSource[];
}

export interface Notebook {
  id: string;
  name: string;
  pdfFilename: string;
  sessionId: string;
  numChunks: number;
  createdAt: Date;
  lastAccessed: Date;
  messages: Message[];
}

