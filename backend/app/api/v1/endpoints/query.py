import time
import logging
from fastapi import APIRouter, HTTPException

from app.models.request import QueryRequest
from app.models.response import QueryResponse, QueryMetadata, WebSource
from app.services.session_service import session_service
from app.services.rag_service import rag_service

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/query", response_model=QueryResponse)
async def query_pdf(request: QueryRequest):
    """
    Query the uploaded PDF document.
    
    Retrieves relevant content from the PDF and generates an answer.
    Falls back to web search if PDF doesn't contain sufficient information.
    """
    start_time = time.time()
    
    try:
        # Get session
        session = session_service.get_session(request.session_id)
        if not session:
            raise HTTPException(
                status_code=404,
                detail="Session not found. Please upload a PDF first."
            )
        
        if not session.vector_store:
            raise HTTPException(
                status_code=404,
                detail="No PDF found for this session. Please upload a PDF first."
            )
        
        logger.info(f"Processing query for session {request.session_id}")
        
        # Query using RAG service
        result = rag_service.query_pdf(
            vector_store=session.vector_store,
            question=request.question
        )
        
        processing_time = time.time() - start_time
        
        # Prepare response
        response_data = {
            "success": True,
            "answer": result["answer"],
            "source": result["source"],
            "processing_time": round(processing_time, 2),
            "metadata": QueryMetadata(
                model="gpt-3.5-turbo",
                tokens_used=None  # Can be added if needed
            )
        }
        
        # Add source-specific data
        if result["source"] == "pdf":
            response_data["chunks_used"] = result["chunks_used"]
            response_data["web_sources"] = None
        else:  # web
            response_data["chunks_used"] = None
            response_data["web_sources"] = [
                WebSource(**source) for source in result["web_sources"]
            ] if result["web_sources"] else []
        
        logger.info(f"Query processed successfully from {result['source']} in {processing_time:.2f}s")
        
        return QueryResponse(**response_data)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing query: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to process query. Please try again."
        )

