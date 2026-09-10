from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Dr. Mauro Cezar Advocacia API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS Origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://maurocezar.adv.br",
        "https://www.maurocezar.adv.br",
        "https://msadvocaciaonline.adv.br",
        "https://www.msadvocaciaonline.adv.br"
    ]
    
    # Database
    DATABASE_URL: str = "sqlite:///./contacts.db"
    
    # Email notifications (Simulated or Real)
    OFFICE_EMAIL: str = "contato@maurocezar.adv.br"
    
    class Config:
        case_sensitive = True

settings = Settings()
