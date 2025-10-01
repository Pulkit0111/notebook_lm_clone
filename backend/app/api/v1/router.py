from fastapi import APIRouter

from app.api.v1.endpoints import upload, query, session, health

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(upload.router, tags=["upload"])
api_router.include_router(query.router, tags=["query"])
api_router.include_router(session.router, tags=["session"])
api_router.include_router(health.router, tags=["health"])

