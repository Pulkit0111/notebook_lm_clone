import logging
from fastapi import APIRouter, HTTPException

from app.models.response import SessionStatusResponse, SessionClearResponse
from app.services.session_service import session_service

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/session/{session_id}", response_model=SessionStatusResponse)
async def get_session_status(session_id: str):
    """
    Get the status of a session.
    
    Returns information about the session including uploaded PDF details.
    """
    try:
        session = session_service.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return SessionStatusResponse(
            success=True,
            session_id=session.session_id,
            has_pdf=session.vector_store is not None,
            pdf_filename=session.pdf_filename,
            num_chunks=session.num_chunks,
            created_at=session.created_at.isoformat(),
            last_activity=session.last_activity.isoformat()
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting session status: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to get session status")


@router.delete("/session/{session_id}", response_model=SessionClearResponse)
async def clear_session(session_id: str):
    """
    Clear a session and its associated data.
    
    Deletes the vector store and uploaded PDF file.
    """
    try:
        success = session_service.clear_session(session_id)
        if not success:
            raise HTTPException(status_code=404, detail="Session not found")
        
        logger.info(f"Session cleared: {session_id}")
        return SessionClearResponse(
            success=True,
            message="Session cleared successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error clearing session: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to clear session")

