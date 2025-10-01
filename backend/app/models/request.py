from pydantic import BaseModel, Field


class QueryRequest(BaseModel):
    """Request model for querying the PDF."""
    session_id: str = Field(..., description="Session ID associated with the uploaded PDF")
    question: str = Field(..., min_length=1, description="Question to ask about the PDF")
    stream: bool = Field(default=False, description="Whether to stream the response")
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "123e4567-e89b-12d3-a456-426614174000",
                "question": "What is the main topic of this document?",
                "stream": False
            }
        }

