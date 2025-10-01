import time
import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional

from app.models.response import UploadResponse, ErrorResponse
from app.services.session_service import session_service
from app.services.pdf_service import pdf_service

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/upload", response_model=UploadResponse, responses={400: {"model": ErrorResponse}, 413: {"model": ErrorResponse}})
async def upload_pdf(
    file: UploadFile = File(..., description="PDF file to upload"),
    session_id: Optional[str] = Form(None, description="Optional session ID")
):
    """
    Upload and process a PDF document.
    
    Creates a new session if session_id is not provided.
    Processes the PDF by extracting text, chunking, and creating embeddings.
    """
    start_time = time.time()
    
    try:
        # Read file content
        content = await file.read()
        file_size = len(content)
        
        logger.info(f"Received file: {file.filename}, size: {file_size} bytes")
        
        # Validate file
        is_valid, error_msg = pdf_service.validate_pdf_file(content, file.filename, file_size)
        if not is_valid:
            logger.warning(f"File validation failed: {error_msg}")
            if "size exceeds" in error_msg:
                raise HTTPException(status_code=413, detail=error_msg)
            else:
                raise HTTPException(status_code=400, detail=error_msg)
        
        # Create or get session
        if not session_id:
            session_id = session_service.create_session()
        else:
            session = session_service.get_session(session_id)
            if not session:
                session_id = session_service.create_session()
        
        # Save file
        file_path = await pdf_service.save_uploaded_file(content, file.filename)
        
        # Process PDF
        logger.info(f"Processing PDF for session {session_id}")
        vector_store, num_chunks = pdf_service.process_pdf(file_path)
        
        # Update session
        session_service.update_session(
            session_id=session_id,
            vector_store=vector_store,
            pdf_filename=file.filename,
            num_chunks=num_chunks,
            pdf_path=file_path
        )
        
        processing_time = time.time() - start_time
        logger.info(f"PDF processed successfully in {processing_time:.2f}s: {num_chunks} chunks")
        
        return UploadResponse(
            success=True,
            message="PDF processed successfully",
            session_id=session_id,
            filename=file.filename,
            num_chunks=num_chunks,
            processing_time=round(processing_time, 2)
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading PDF: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")

