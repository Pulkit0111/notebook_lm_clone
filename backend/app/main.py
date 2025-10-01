import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import asyncio

from app.core.config import settings
from app.core.logging_config import setup_logging
from app.api.v1.router import api_router
from app.services.session_service import session_service

# Setup logging
logger = setup_logging(settings.LOG_LEVEL)


# Background task for session cleanup
async def cleanup_sessions_periodically():
    """Background task to cleanup expired sessions."""
    while True:
        try:
            await asyncio.sleep(300)  # Run every 5 minutes
            expired_count = session_service.cleanup_expired_sessions()
            if expired_count > 0:
                logger.info(f"Cleaned up {expired_count} expired sessions")
        except Exception as e:
            logger.error(f"Error in session cleanup task: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown events."""
    # Startup
    logger.info("Starting PDF RAG API...")
    logger.info(f"CORS origins: {settings.cors_origins_list}")
    
    # Start background task for session cleanup
    cleanup_task = asyncio.create_task(cleanup_sessions_periodically())
    
    yield
    
    # Shutdown
    logger.info("Shutting down PDF RAG API...")
    cleanup_task.cancel()
    try:
        await cleanup_task
    except asyncio.CancelledError:
        pass


# Create FastAPI app
app = FastAPI(
    title="PDF RAG API",
    description="API for PDF document querying with RAG and web search fallback",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "PDF RAG API",
        "version": "1.0.0",
        "docs": "/docs"
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler for unhandled errors."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "error_code": "INTERNAL_ERROR"
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True,
        log_level=settings.LOG_LEVEL.lower()
    )

