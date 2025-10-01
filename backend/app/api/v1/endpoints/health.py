import logging
from fastapi import APIRouter

from app.models.response import HealthResponse
from app.core.config import settings

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    
    Returns the status of the API and external services.
    """
    # Check OpenAI API
    openai_status = "connected" if settings.OPENAI_API_KEY else "not configured"
    
    # Check Tavily API
    tavily_status = "connected" if settings.TAVILY_API_KEY else "not configured"
    
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        services={
            "openai": openai_status,
            "tavily": tavily_status
        }
    )

