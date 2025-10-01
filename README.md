# PDF RAG Full Stack Application

A modern, full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and have intelligent conversations with them. Built with React + Vite and FastAPI, featuring a beautiful Material Design-inspired UI powered by Chakra UI.

## ✨ Features

### Core Functionality
- 📄 **PDF Upload & Processing**: Upload any PDF document for intelligent analysis
- 💬 **AI-Powered Chat**: Ask questions about your document and get accurate answers
- 🌐 **Web Search Fallback**: Automatically searches the web when PDF context is insufficient
- 🔍 **Vector Search**: Uses FAISS for efficient semantic search across document chunks
- 📊 **Source Attribution**: Clear "FROM PDF" or "FROM WEB" badges on every response

### UI/UX Features
- 🎨 **Modern Chat Interface**: User questions on LEFT (blue), AI responses on RIGHT (green)
- 🌓 **Dark/Light Mode**: Toggle between themes with smooth transitions
- 📤 **Realistic Upload Progress**: Visual feedback with 0-100% progress animation
- ✅ **Confirmation Modals**: Safety prompts before clearing chat history
- 🔗 **Clickable Citations**: Web sources open in new tabs with clear visual indicators
- 🎯 **Smooth Scrolling**: Only chat area scrolls, keeping header and input fixed
- 💾 **Session Management**: Maintains chat history and document context
- 👤 **Clean Icons**: User (👤) and AI (🤖) emojis without distracting backgrounds

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
# Create a .env file and add your API keys:
# OPENAI_API_KEY=your-openai-key
# TAVILY_API_KEY=your-tavily-key
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

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

Access the application at: **http://localhost:5173** (or the port shown in terminal)

## 📖 Usage Guide

### 1. Upload a PDF
- Click or drag-and-drop a PDF file into the upload area
- Watch the realistic progress bar animate from 0-100%
- Document will be processed and indexed automatically
- You'll see a success message with the number of chunks indexed

### 2. Ask Questions
- Type your question in the chat input at the bottom
- Press Enter or click the send button
- **Your question** appears on the LEFT in a blue card with 👤
- The AI will analyze your document and provide an answer
- **AI response** appears on the RIGHT in a green card with 🤖

### 3. View Sources
- Each AI response has a clear badge:
  - **📄 FROM PDF**: Answer came from your document
  - **🌐 FROM WEB**: Answer came from web search
- Web responses include:
  - **📚 SOURCES & CITATIONS** section
  - Clickable links that open in new tabs
  - Green-highlighted citation cards

### 4. Manage Your Session
- Click the **"Clear"** button in the chat header
- Confirm the action in the modal dialog (prevents accidental deletion)
- Click the **X button** next to PDF filename to remove document
- Upload a new PDF to start fresh

### 5. Toggle Theme
- Click the moon/sun icon in the top-right corner
- Entire interface adapts to dark or light mode
- Icons, cards, and citations all adjust automatically

## 🎨 Design Philosophy

The UI is inspired by Google's Notebook LM and follows Material Design principles:

- **Clear Conversation Flow**: User LEFT, AI RIGHT for natural chat layout
- **Visual Hierarchy**: Blue for user input, green for AI responses
- **Clean & Minimal**: No cluttered backgrounds, just clean emoji icons
- **Spacious Layout**: Generous padding and margins for comfortable reading
- **Consistent Components**: Rounded corners, smooth shadows, elegant transitions
- **Accessible**: High contrast, keyboard navigation, clear focus states
- **Professional**: Suitable for academic research and enterprise use

## 📁 Project Structure

```
pdf-rag-full-stack/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PDFUpload.tsx           # File upload interface
│   │   │   ├── ChatInterface.tsx       # Main chat container
│   │   │   ├── MessageList.tsx         # Message display area
│   │   │   ├── Message.tsx             # Individual message component
│   │   │   ├── ChatInput.tsx           # Message input field
│   │   │   ├── LoadingIndicator.tsx    # "Thinking..." state
│   │   │   └── ClearChatModal.tsx      # Confirmation dialog
│   │   ├── hooks/
│   │   │   ├── useChat.ts              # Chat functionality
│   │   │   ├── useFileUpload.ts        # Upload handling
│   │   │   └── useSession.ts           # Session state
│   │   ├── services/
│   │   │   └── api.ts                  # API client
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript definitions
│   │   ├── theme.ts                    # Chakra UI theme
│   │   ├── App.tsx                     # Root component
│   │   └── main.tsx                    # Entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/          # API endpoints
│   │   │       │   ├── upload.py       # PDF upload
│   │   │       │   ├── query.py        # Chat queries
│   │   │       │   ├── session.py      # Session management
│   │   │       │   └── health.py       # Health check
│   │   │       └── router.py           # API router
│   │   ├── services/
│   │   │   ├── pdf_service.py          # PDF processing
│   │   │   ├── rag_service.py          # RAG logic
│   │   │   └── session_service.py      # Session handling
│   │   ├── core/
│   │   │   ├── config.py               # Configuration
│   │   │   └── logging_config.py       # Logging setup
│   │   ├── models/
│   │   │   ├── request.py              # Request models
│   │   │   └── response.py             # Response models
│   │   └── main.py                     # FastAPI app
│   ├── uploads/                        # Uploaded PDFs (gitignored)
│   ├── requirements.txt
│   └── .env                            # Environment variables
├── docs/
│   ├── understanding.md                # Technical documentation
│   └── prd.md                          # Product requirements
└── README.md
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
# API Keys (Required)
OPENAI_API_KEY=your-openai-key-here
TAVILY_API_KEY=your-tavily-key-here

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

# CORS Settings (Update with your frontend port)
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

### Frontend Configuration
The frontend automatically detects the backend URL. To override:

Edit `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

## 🎯 Key Features Explained

### Message Layout
- **User Messages**: 
  - Position: LEFT side
  - Color: Blue background
  - Icon: 👤 (user emoji)
  
- **AI Messages**: 
  - Position: RIGHT side
  - Color: Green background
  - Icon: 🤖 (robot emoji)
  
- **Thinking Indicator**: 
  - Appears on RIGHT (where AI messages go)
  - Green background with spinner
  - Shows "Thinking..." text

### Source Attribution
Every AI response clearly shows where the information came from:

**PDF Source:**
```
📄 FROM PDF
```
- Yellow badge
- Shows chunk count if available

**Web Source:**
```
🌐 FROM WEB

📚 SOURCES & CITATIONS
┃ Wikipedia - Article Title 🔗
┃ Official Website - Page Name 🔗
┃ News Source - Article Title 🔗
```
- Cyan badge
- Citation cards with green left border
- Clickable links that open in new tabs
- Snippet previews for context

## 🧪 Testing Checklist

- [ ] PDF upload with drag-and-drop
- [ ] PDF upload with file picker
- [ ] Progress bar animates from 0-100%
- [ ] User questions appear LEFT in blue
- [ ] AI responses appear RIGHT in green
- [ ] "Thinking..." appears RIGHT in green
- [ ] Chat area scrolls properly (not entire page)
- [ ] Questions answered from PDF show "FROM PDF"
- [ ] Web search shows "FROM WEB" with citations
- [ ] Citation links open in new tabs
- [ ] Clear chat shows confirmation modal
- [ ] Dark/light mode toggle works
- [ ] Remove PDF button (X) works

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url`

### Backend (Railway/Render/Heroku/AWS)
1. Deploy from Git repository
2. Set all environment variables from `.env`
3. Ensure `uploads/` directory is writable
4. Configure CORS_ORIGINS to include your frontend URL
5. Use Python 3.9+ runtime

## 📝 API Documentation

Once running, visit **http://localhost:8000/docs** for interactive API documentation (Swagger UI).

### Main Endpoints:
- `POST /api/v1/upload` - Upload and process PDF
- `POST /api/v1/query` - Ask questions
- `GET /api/v1/session/{session_id}` - Get session info
- `DELETE /api/v1/session/{session_id}` - Clear session
- `GET /` - Health check

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Chakra UI** - Beautiful, accessible component library
- **LangChain** - RAG orchestration framework
- **OpenAI** - GPT-3.5-turbo and embeddings
- **Tavily** - Web search API
- **FAISS** - Efficient vector similarity search
- **Google Notebook LM** - Design inspiration

## 📞 Support

For issues and questions:
- Check documentation in `/docs`
- Review the PRD: `docs/prd.md`
- Open a GitHub issue with details

---

**Built with ❤️ using React, Chakra UI, FastAPI, and AI**

*A modern RAG application for intelligent document conversations*
