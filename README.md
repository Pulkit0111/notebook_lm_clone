# PDF RAG Full Stack Application

A modern, full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and have intelligent conversations with them. Built with React + Vite and FastAPI, featuring a beautiful Material Design-inspired UI powered by Chakra UI.

## ✨ Features

### Core Functionality
- 📄 **PDF Upload & Processing**: Upload any PDF document for intelligent analysis
- 💬 **AI-Powered Chat**: Ask questions about your document and get accurate answers
- 🌐 **Web Search Fallback**: Automatically searches the web when PDF context is insufficient
- 🔍 **Vector Search**: Uses FAISS for efficient semantic search across document chunks
- 📊 **Source Attribution**: Shows whether answers came from the PDF or web sources

### UI/UX Features
- 🎨 **Modern Material Design**: Clean, minimalist interface inspired by Google's Notebook LM
- 🌓 **Dark/Light Mode**: Toggle between themes with smooth transitions
- 📤 **Realistic Upload Progress**: Visual feedback with percentage-based progress bar
- ✅ **Confirmation Modals**: Safety prompts before clearing chat history
- 📱 **Responsive Layout**: 2-panel design optimized for desktop use
- 🎯 **Smooth Scrolling**: Auto-scroll to new messages with smooth animations
- 💾 **Session Management**: Maintains chat history and document context

## 🏗️ Architecture

### Frontend (React + Vite + Chakra UI)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Chakra UI v2 for component system and theming
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query) for server state
- **File Upload**: React Dropzone for drag-and-drop functionality
- **Markdown Rendering**: React Markdown for formatted responses

### Backend (FastAPI + Python)
- **Framework**: FastAPI for high-performance async API
- **AI/ML**: 
  - LangChain for RAG orchestration
  - OpenAI GPT-3.5-turbo for language generation
  - OpenAI text-embedding-3-large for embeddings
- **Vector Store**: FAISS for efficient similarity search
- **PDF Processing**: PyMuPDF for document parsing
- **Web Search**: Tavily API for external information retrieval
- **Session Management**: In-memory session store with cleanup

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- OpenAI API key
- Tavily API key

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd pdf-rag-full-stack
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your API keys:
# OPENAI_API_KEY=your-openai-key
# TAVILY_API_KEY=your-tavily-key
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

#### Option 1: Local Development (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at: **http://localhost:5173**

#### Option 2: Docker (Production)

```bash
docker-compose up --build
```

Access the application at: **http://localhost:5173**

## 📖 Usage Guide

### 1. Upload a PDF
- Click or drag-and-drop a PDF file into the upload area
- Wait for the upload progress to complete (shows 0-100%)
- Document will be processed and indexed automatically
- You'll see a success message with the number of chunks indexed

### 2. Ask Questions
- Type your question in the chat input at the bottom
- Press Enter or click the send button
- The AI will analyze your document and provide an answer
- If the answer isn't in the PDF, it will search the web automatically

### 3. View Sources
- Each AI response shows its source (PDF or Web)
- PDF answers show the number of chunks used
- Web answers include clickable source links

### 4. Manage Your Session
- Click the "Clear" button to clear chat history
- Confirm the action in the modal dialog
- Upload a new PDF to start a fresh session

### 5. Toggle Theme
- Click the moon/sun icon in the top-right corner
- Theme preference is saved automatically

## 🎨 Design Philosophy

The UI is inspired by Google's Notebook LM and follows Material Design principles:

- **Clean & Minimal**: Neutral color palette with strategic use of accent colors
- **Spacious Layout**: Generous whitespace for reduced cognitive load
- **Consistent Components**: Rounded corners, subtle shadows, smooth transitions
- **Accessible**: High contrast ratios, keyboard navigation support
- **Professional**: Suitable for both academic and enterprise use cases

## 📁 Project Structure

```
pdf-rag-full-stack/
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── PDFUpload.tsx   # File upload interface
│   │   │   ├── ChatInterface.tsx # Main chat container
│   │   │   ├── MessageList.tsx # Message display
│   │   │   ├── Message.tsx     # Individual message
│   │   │   ├── ChatInput.tsx   # Message input field
│   │   │   ├── LoadingIndicator.tsx # Loading state
│   │   │   └── ClearChatModal.tsx # Confirmation dialog
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useChat.ts     # Chat functionality
│   │   │   ├── useFileUpload.ts # Upload handling
│   │   │   └── useSession.ts  # Session state
│   │   ├── services/          # API client
│   │   ├── types/             # TypeScript definitions
│   │   ├── theme.ts           # Chakra UI theme
│   │   ├── App.tsx            # Root component
│   │   └── main.tsx           # Entry point
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   └── routes/
│   │   ├── services/          # Business logic
│   │   │   ├── pdf_service.py # PDF processing
│   │   │   ├── rag_service.py # RAG logic
│   │   │   └── session_manager.py # Session handling
│   │   ├── core/              # Core configuration
│   │   └── main.py            # FastAPI app
│   ├── uploads/               # Uploaded PDFs (gitignored)
│   └── requirements.txt
├── docs/
│   ├── understanding.md       # Technical documentation
│   └── prd.md                 # Product requirements
└── docker-compose.yml
```

## 🔧 Configuration

### Backend Environment Variables
```env
# OpenAI API Key
OPENAI_API_KEY=your-key-here

# Tavily API Key
TAVILY_API_KEY=your-key-here

# Application Settings
MAX_FILE_SIZE_MB=50
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
TOP_K_CHUNKS=3
SESSION_TIMEOUT_MINUTES=30

# Server Settings
HOST=0.0.0.0
PORT=8000
WORKERS=4

# CORS Settings
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

### Frontend Configuration
Edit `frontend/src/services/api.ts` to change the API endpoint:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] PDF upload with drag-and-drop
- [ ] PDF upload with file picker
- [ ] Progress bar shows 0-100% smoothly
- [ ] Chat messages scroll automatically
- [ ] Questions answered from PDF context
- [ ] Web search fallback works
- [ ] Source attribution displayed correctly
- [ ] Clear chat shows confirmation modal
- [ ] Dark/light mode toggle works
- [ ] Session persists across refreshes

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url`

### Backend (Railway/Render/AWS)
1. Deploy from Git repository
2. Set environment variables from `.env`
3. Ensure `uploads/` directory is writable
4. Configure CORS_ORIGINS to include frontend URL

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Chakra UI** for the excellent component library
- **LangChain** for RAG orchestration
- **OpenAI** for language models and embeddings
- **Tavily** for web search capabilities
- **Google Notebook LM** for design inspiration

## 📞 Support

For issues and questions:
- Check the documentation in `/docs`
- Review closed issues on GitHub
- Open a new issue with detailed information

---

Built with ❤️ using React, FastAPI, and AI
