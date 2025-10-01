import uuid
from datetime import datetime, timedelta
from typing import Dict, Optional
from dataclasses import dataclass, field
import logging

logger = logging.getLogger(__name__)


@dataclass
class SessionData:
    """Data stored for each session."""
    session_id: str
    vector_store: Optional[any] = None
    pdf_filename: Optional[str] = None
    num_chunks: Optional[int] = None
    pdf_path: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)
    last_activity: datetime = field(default_factory=datetime.now)


class SessionService:
    """Service for managing user sessions."""
    
    def __init__(self, timeout_minutes: int = 30):
        self.sessions: Dict[str, SessionData] = {}
        self.timeout_minutes = timeout_minutes
        logger.info(f"SessionService initialized with timeout: {timeout_minutes} minutes")
    
    def create_session(self) -> str:
        """Create a new session and return its ID."""
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = SessionData(session_id=session_id)
        logger.info(f"Created new session: {session_id}")
        return session_id
    
    def get_session(self, session_id: str) -> Optional[SessionData]:
        """Get session data by ID."""
        session = self.sessions.get(session_id)
        if session:
            session.last_activity = datetime.now()
        return session
    
    def update_session(
        self,
        session_id: str,
        vector_store=None,
        pdf_filename: Optional[str] = None,
        num_chunks: Optional[int] = None,
        pdf_path: Optional[str] = None
    ):
        """Update session data."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")
        
        if vector_store is not None:
            session.vector_store = vector_store
        if pdf_filename is not None:
            session.pdf_filename = pdf_filename
        if num_chunks is not None:
            session.num_chunks = num_chunks
        if pdf_path is not None:
            session.pdf_path = pdf_path
        
        session.last_activity = datetime.now()
        logger.info(f"Updated session: {session_id}")
    
    def clear_session(self, session_id: str) -> bool:
        """Clear a session and its data."""
        if session_id in self.sessions:
            session = self.sessions[session_id]
            
            # Clean up PDF file if exists
            if session.pdf_path:
                try:
                    import os
                    if os.path.exists(session.pdf_path):
                        os.remove(session.pdf_path)
                        logger.info(f"Deleted PDF file: {session.pdf_path}")
                except Exception as e:
                    logger.error(f"Error deleting PDF file: {e}")
            
            # Remove session
            del self.sessions[session_id]
            logger.info(f"Cleared session: {session_id}")
            return True
        return False
    
    def cleanup_expired_sessions(self):
        """Remove expired sessions."""
        now = datetime.now()
        timeout_delta = timedelta(minutes=self.timeout_minutes)
        expired_sessions = []
        
        for session_id, session in self.sessions.items():
            if now - session.last_activity > timeout_delta:
                expired_sessions.append(session_id)
        
        for session_id in expired_sessions:
            self.clear_session(session_id)
            logger.info(f"Cleaned up expired session: {session_id}")
        
        return len(expired_sessions)


# Global session service instance
session_service = SessionService()

