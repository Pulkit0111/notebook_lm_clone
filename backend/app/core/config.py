from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: str
    TAVILY_API_KEY: str
    
    # Application Settings
    MAX_FILE_SIZE_MB: int = 50
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    TOP_K_CHUNKS: int = 3
    SESSION_TIMEOUT_MINUTES: int = 30
    
    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    WORKERS: int = 4
    
    # CORS Settings
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    # Computed Properties
    @property
    def max_file_size_bytes(self) -> int:
        return self.MAX_FILE_SIZE_MB * 1024 * 1024
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

