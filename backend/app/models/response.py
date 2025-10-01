from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class UploadResponse(BaseModel):
    """Response model for PDF upload."""
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Status message")
    session_id: str = Field(..., description="Session ID for this upload")
    filename: str = Field(..., description="Name of the uploaded file")
    num_chunks: int = Field(..., description="Number of chunks created from the PDF")
    processing_time: float = Field(..., description="Time taken to process the PDF in seconds")


class WebSource(BaseModel):
    """Web search result source."""
    title: str = Field(..., description="Title of the web page")
    url: str = Field(..., description="URL of the source")
    snippet: str = Field(..., description="Relevant snippet from the source")


class QueryMetadata(BaseModel):
    """Metadata about the query processing."""
    model: str = Field(..., description="LLM model used")
    tokens_used: Optional[int] = Field(None, description="Number of tokens used")


class QueryResponse(BaseModel):
    """Response model for query."""
    success: bool = Field(..., description="Whether the operation was successful")
    answer: str = Field(..., description="Answer to the question")
    source: str = Field(..., description="Source of the answer: 'pdf' or 'web'")
    chunks_used: Optional[int] = Field(None, description="Number of PDF chunks used (if source is pdf)")
    web_sources: Optional[List[WebSource]] = Field(None, description="Web sources (if source is web)")
    processing_time: float = Field(..., description="Time taken to process the query in seconds")
    metadata: QueryMetadata = Field(..., description="Metadata about the query processing")


class SessionStatusResponse(BaseModel):
    """Response model for session status."""
    success: bool = Field(..., description="Whether the operation was successful")
    session_id: str = Field(..., description="Session ID")
    has_pdf: bool = Field(..., description="Whether a PDF is uploaded for this session")
    pdf_filename: Optional[str] = Field(None, description="Name of the uploaded PDF")
    num_chunks: Optional[int] = Field(None, description="Number of chunks in the vector store")
    created_at: str = Field(..., description="Session creation timestamp")
    last_activity: str = Field(..., description="Last activity timestamp")


class SessionClearResponse(BaseModel):
    """Response model for session clear."""
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Status message")


class HealthResponse(BaseModel):
    """Response model for health check."""
    status: str = Field(..., description="Health status")
    version: str = Field(..., description="API version")
    services: Dict[str, str] = Field(..., description="Status of external services")


class ErrorResponse(BaseModel):
    """Response model for errors."""
    success: bool = Field(default=False, description="Always false for errors")
    error: str = Field(..., description="Error message")
    error_code: str = Field(..., description="Error code for programmatic handling")

