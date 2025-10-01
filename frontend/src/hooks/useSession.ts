import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  sessionId: string | null;
  pdfFilename: string | null;
  numChunks: number | null;
  setSession: (sessionId: string, pdfFilename: string, numChunks: number) => void;
  clearSession: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      pdfFilename: null,
      numChunks: null,
      setSession: (sessionId, pdfFilename, numChunks) =>
        set({ sessionId, pdfFilename, numChunks }),
      clearSession: () =>
        set({ sessionId: null, pdfFilename: null, numChunks: null }),
    }),
    {
      name: 'pdf-rag-session',
    }
  )
);

