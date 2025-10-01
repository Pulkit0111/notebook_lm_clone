import os
import tempfile
from pathlib import Path
import logging
from typing import Tuple

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

from app.core.config import settings

logger = logging.getLogger(__name__)


class PDFService:
    """Service for processing PDF files."""
    
    def __init__(self):
        self.embedding_model = OpenAIEmbeddings(
            model="text-embedding-3-large",
            openai_api_key=settings.OPENAI_API_KEY
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )
        logger.info("PDFService initialized with OpenAI embeddings")
    
    async def save_uploaded_file(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file to uploads directory."""
        # Create uploads directory if it doesn't exist
        uploads_dir = Path("uploads")
        uploads_dir.mkdir(exist_ok=True)
        
        # Create unique filename
        file_path = uploads_dir / f"{os.urandom(8).hex()}_{filename}"
        
        # Save file
        with open(file_path, "wb") as f:
            f.write(file_content)
        
        logger.info(f"Saved uploaded file to: {file_path}")
        return str(file_path)
    
    def process_pdf(self, file_path: str) -> Tuple[any, int]:
        """
        Process PDF file and create vector store.
        
        Returns:
            Tuple of (vector_store, num_chunks)
        """
        try:
            # Load PDF
            logger.info(f"Loading PDF from: {file_path}")
            loader = PyMuPDFLoader(file_path)
            docs = loader.load()
            logger.info(f"Loaded {len(docs)} pages from PDF")
            
            # Split into chunks
            chunks = self.text_splitter.split_documents(docs)
            num_chunks = len(chunks)
            logger.info(f"Split PDF into {num_chunks} chunks")
            
            # Create vector store
            logger.info("Creating FAISS vector store...")
            vector_store = FAISS.from_documents(chunks, self.embedding_model)
            logger.info("Vector store created successfully")
            
            return vector_store, num_chunks
            
        except Exception as e:
            logger.error(f"Error processing PDF: {e}")
            raise
    
    def validate_pdf_file(self, content: bytes, filename: str, file_size: int) -> Tuple[bool, str]:
        """
        Validate PDF file.
        
        Returns:
            Tuple of (is_valid, error_message)
        """
        # Check file size
        if file_size > settings.max_file_size_bytes:
            return False, f"File size exceeds {settings.MAX_FILE_SIZE_MB}MB limit"
        
        # Check file extension
        if not filename.lower().endswith('.pdf'):
            return False, "Invalid file type. Only PDF files are allowed"
        
        # Check PDF magic bytes (PDF files start with %PDF)
        if not content.startswith(b'%PDF'):
            return False, "Invalid PDF file format"
        
        return True, ""


# Global PDF service instance
pdf_service = PDFService()

