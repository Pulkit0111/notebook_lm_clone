# Progression LM - PDF RAG Full Stack Application

A modern, full-stack Retrieval-Augmented Generation (RAG) application inspired by Google's Notebook LM. Upload PDF documents, organize them into notebooks, and have intelligent conversations with persistent chat history. Built with React + Vite and FastAPI, featuring a beautiful Material Design-inspired UI powered by Chakra UI.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python)

## ✨ Features

### 📚 Multi-Notebook System
- **Notebook Management**: Create, organize, and manage multiple PDF notebooks
- **Landing Page**: Clean notebook grid view similar to Google Notebook LM
- **Per-Notebook Sessions**: Each PDF gets its own isolated chat session
- **Last Accessed**: Notebooks show when they were last opened
- **Quick Actions**: Delete notebooks with confirmation modal

### 💬 Intelligent Conversations
- **AI-Powered Chat**: Ask questions about your documents using GPT-3.5-turbo
- **Chat History Persistence**: Conversations are saved per notebook
- **Web Search Fallback**: Automatically searches the web when PDF context is insufficient
- **Source Attribution**: Clear "FROM PDF" or "FROM WEB" badges on every response
- **Vector Search**: Uses FAISS for efficient semantic search across document chunks

### 🎨 NotebookLM-Inspired UI
- **Material Design**: Clean, minimal, professional aesthetic
- **Dark/Light Mode**: Full theme support with smooth transitions on all pages
- **Sticky Navigation**: Header and input area always visible
- **Independent Scrolling**: Chat area scrolls independently
- **Responsive Layout**: Works seamlessly across desktop and mobile
- **Confirmation Modals**: Safety prompts for destructive actions

### 🚀 User Experience
- **Drag-and-Drop Upload**: Easy PDF upload with visual feedback
- **Progress Indicators**: Real-time upload progress and processing status
- **Back Navigation**: Seamless navigation between notebooks and chat
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Error Handling**: Clear error messages with helpful guidance

## 🏗️ Architecture

### Frontend (React + Vite + Chakra UI)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Chakra UI v2 for component system and theming
- **State Management**: 
  - Zustand for session management
  - React useState for notebook state
  - localStorage for persistence
- **Data Fetching**: TanStack Query (React Query) for server state
- **File Upload**: React Dropzone for drag-and-drop functionality
- **Markdown Rendering**: React Markdown for formatted AI responses

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
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at: **http://localhost:5173** (or the port shown in terminal)

## 📖 Usage Guide

### 1. Create a Notebook
- On the landing page, click **"Create Notebook"** or the **"Create new notebook"** card
- Enter a notebook name (auto-filled from PDF filename)
- Drag-and-drop or click to upload a PDF file
- Click **"Create Notebook"** to process
- Watch the progress indicator as your document is indexed

### 2. Chat with Your PDF
- Click on any notebook to open it
- Type your question in the input field at the bottom
- Press **Enter** or click the send button
- The AI analyzes your document and provides an answer
- Each response shows whether it came from your PDF or the web

### 3. Manage Chat History
- All conversations are automatically saved
- Navigate back to the notebook list and reopen to see your history
- Click **"Clear"** in the chat header to delete chat history
- Confirm the action in the modal (prevents accidental deletion)

### 4. Manage Notebooks
- Click the **back arrow** to return to the notebook list
- Click the **three-dot menu (⋮)** on any notebook card
- Select **"Delete notebook"** to remove it
- Confirm deletion in the modal

### 5. Switch Themes
- Click the **moon/sun icon** in the header
- Available on both notebook list and chat pages
- Entire interface adapts to dark or light mode
- Theme preference is saved automatically

## 🎨 Design Philosophy

Progression LM is inspired by **Google's Notebook LM** and follows **Material Design** principles:

### Core Principles
- **Clarity**: Clean, uncluttered interface with clear visual hierarchy
- **Consistency**: Unified design language across all pages
- **Minimalism**: Focus on content, not decorative elements
- **Professionalism**: Suitable for academic research and enterprise use

### Visual Design
- **Color Palette**: Google Blue (#1A73E8) for primary actions
- **Typography**: Inter font family for excellent readability
- **Spacing**: 8px grid system for consistent layout
- **Shadows**: Minimal, preferring borders for separation
- **Borders**: Subtle neutral borders for component definition
- **Transitions**: 150ms ease-out for smooth interactions

### Layout
- **Two-Panel Design**: Sidebar and main content area
- **Fixed Header**: 64px height with logo, title, and actions
- **Sticky Elements**: Header and input area always visible
- **Independent Scrolling**: Chat messages scroll independently

## 📁 Project Structure

```
pdf-rag-full-stack/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NotebookList.tsx        # Landing page with notebook grid
│   │   │   ├── NotebookCard.tsx        # Individual notebook card
│   │   │   ├── NotebookView.tsx        # Notebook chat view
│   │   │   ├── CreateNotebookModal.tsx # Notebook creation modal
│   │   │   ├── DeleteNotebookModal.tsx # Deletion confirmation
│   │   │   ├── ChatInterface.tsx       # Main chat container
│   │   │   ├── Message.tsx             # Individual message component
│   │   │   ├── ChatInput.tsx           # Message input field
│   │   │   ├── LoadingIndicator.tsx    # "Thinking..." state
│   │   │   └── ClearChatModal.tsx      # Clear chat confirmation
│   │   ├── hooks/
│   │   │   ├── useChat.ts              # Chat with persistence
│   │   │   ├── useFileUpload.ts        # Upload handling
│   │   │   └── useSession.ts           # Session state (Zustand)
│   │   ├── services/
│   │   │   └── api.ts                  # API client (Axios)
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript definitions
│   │   ├── theme.ts                    # Chakra UI theme config
│   │   ├── index.css                   # Global styles
│   │   ├── App.tsx                     # Root component
│   │   └── main.tsx                    # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── upload.py       # PDF upload & processing
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
│   ├── logs/                           # Application logs
│   ├── requirements.txt
│   └── .env                            # Environment variables
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
The frontend uses Vite proxy for API calls. Configuration is in `vite.config.ts`:

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

## 🎯 Key Features Explained

### Multi-Notebook System
Each notebook is a self-contained unit with:
- **Unique ID**: Generated using `crypto.randomUUID()`
- **Session ID**: Backend session for PDF context
- **Messages Array**: Complete chat history
- **Metadata**: Name, filename, chunk count, timestamps
- **localStorage**: Persistent storage across browser sessions

### Chat History Persistence
Messages are stored in the notebook object:
```typescript
interface Notebook {
  id: string;
  name: string;
  pdfFilename: string;
  sessionId: string;
  numChunks: number;
  createdAt: Date;
  lastAccessed: Date;
  messages: Message[];  // Persisted chat history
}
```

When you:
1. **Send a message** → Added to messages array
2. **Get a response** → Added to messages array
3. **Change notebooks** → Messages saved to localStorage
4. **Reopen notebook** → Messages loaded from localStorage

### Message Layout
- **User Messages**: 
  - Aligned left, max width 600px
  - Light: Blue background, dark: Dark gray background
  - Label: "You"
  
- **AI Messages**: 
  - Aligned right, max width 600px
  - Light: Gray background, dark: Dark gray background
  - Label: "AI"
  - Markdown support for formatted responses
  
- **Source Badges**:
  - Pill-shaped badges with subtle colors
  - "FROM PDF" (yellow) or "FROM WEB" (cyan)
  - Web sources include clickable citation links

### Sticky Navigation
- **Header** (64px): Fixed at top with `position: sticky; top: 0`
- **Chat Area**: Scrollable with `flex: 1; overflow-y: auto`
- **Input Area**: Fixed at bottom with `position: sticky; bottom: 0`

This ensures the navigation and input are always accessible, while the chat scrolls independently.

## 🧪 Testing Checklist

### Notebook Management
- [ ] Create notebook with PDF upload
- [ ] Notebook appears in grid on landing page
- [ ] Click notebook to open chat interface
- [ ] Back button returns to notebook list
- [ ] Delete notebook with confirmation modal
- [ ] Deleted notebook removed from list and localStorage

### Chat Functionality
- [ ] Ask question and receive answer
- [ ] User messages appear on left
- [ ] AI responses appear on right
- [ ] "Thinking..." indicator shows while loading
- [ ] Source badges display correctly (FROM PDF / FROM WEB)
- [ ] Web citations are clickable and open in new tab
- [ ] Markdown formatting works in AI responses

### Chat Persistence
- [ ] Send messages in a notebook
- [ ] Navigate back to list
- [ ] Reopen same notebook
- [ ] **Chat history is restored**
- [ ] Switch between multiple notebooks
- [ ] Each notebook maintains its own history

### UI/UX
- [ ] Theme toggle works on notebook list page
- [ ] Theme toggle works on chat page
- [ ] Theme preference persists across pages
- [ ] Chat area scrolls independently
- [ ] Header stays fixed at top
- [ ] Input area stays fixed at bottom
- [ ] Long messages wrap correctly (no overflow)
- [ ] Buttons have hover effects and correct colors
- [ ] All modals display correctly

### Error Handling
- [ ] Upload fails gracefully with error message
- [ ] Network errors display in modal
- [ ] Invalid PDF shows error
- [ ] API errors are caught and displayed

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url`
5. Deploy

**Note**: Vite proxy is only for development. In production, set `VITE_API_URL`.

### Backend (Railway/Render/Heroku/AWS)
1. Deploy from Git repository
2. Set all environment variables from `.env`
3. Ensure `uploads/` directory is writable
4. Configure `CORS_ORIGINS` to include your frontend URL
5. Use Python 3.9+ runtime
6. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Production Considerations
- **File Storage**: Consider cloud storage (S3, GCS) for uploaded PDFs
- **Session Management**: Use Redis for distributed sessions
- **Database**: Add PostgreSQL for persistent notebook storage
- **Authentication**: Implement user authentication and authorization
- **Rate Limiting**: Add rate limiting to prevent abuse
- **Monitoring**: Set up logging and monitoring (Sentry, DataDog)

## 📝 API Documentation

Once running, visit **http://localhost:8000/docs** for interactive API documentation (Swagger UI).

### Main Endpoints:

#### PDF Management
- `POST /api/v1/upload` - Upload and process PDF
  ```json
  {
    "file": "<binary>",
    "session_id": "optional-existing-session"
  }
  ```

#### Chat
- `POST /api/v1/query` - Ask questions about PDF
  ```json
  {
    "session_id": "session-uuid",
    "question": "What is this document about?",
    "stream": false
  }
  ```

#### Session Management
- `GET /api/v1/session/{session_id}` - Get session info
- `DELETE /api/v1/session/{session_id}` - Clear session

#### Health
- `GET /api/v1/health` - Health check and service status

## 🔒 Security Considerations

- API keys are stored in `.env` and never committed to Git
- CORS is configured to only allow specified origins
- File uploads are validated for PDF type and size
- Sessions have timeout to prevent memory leaks
- Input validation on all endpoints
- Error messages don't expose sensitive information

## 🎓 Learning Resources

- **Chakra UI**: https://chakra-ui.com/docs
- **LangChain**: https://python.langchain.com/docs
- **FastAPI**: https://fastapi.tiangolo.com
- **React Query**: https://tanstack.com/query/latest
- **Zustand**: https://github.com/pmndrs/zustand
- **FAISS**: https://github.com/facebookresearch/faiss
- **Material Design**: https://m3.material.io

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript/Python best practices
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Test across light/dark modes
- Ensure responsive design

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Notebook LM** - Design inspiration and UX patterns
- **Chakra UI** - Beautiful, accessible component library
- **LangChain** - RAG orchestration framework
- **OpenAI** - GPT-3.5-turbo and text embeddings
- **Tavily** - Web search API for fallback
- **FAISS** - Efficient vector similarity search
- **Material Design** - Design system and guidelines
- **React Community** - Excellent ecosystem and tools

## 📞 Support & Contact

For issues and questions:
- Check documentation in `/docs` folder
- Review the PRD: `docs/prd.md`
- Check UI guidelines: `docs/UI_IMPROVEMENTS.md`
- Open a GitHub issue with:
  - Detailed description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots (if applicable)
  - Browser/OS information

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Multi-notebook system
- ✅ Chat history persistence
- ✅ NotebookLM-inspired UI
- ✅ Dark/light mode

### Phase 2 (Planned)
- [ ] User authentication
- [ ] Cloud storage for PDFs
- [ ] Notebook sharing
- [ ] Export chat history
- [ ] Mobile app

### Phase 3 (Future)
- [ ] Collaborative notebooks
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] API for third-party integrations

---

**Built with ❤️ using React, TypeScript, Chakra UI, FastAPI, and AI**

*Progression LM - Your intelligent document companion inspired by Google's Notebook LM*

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)
