from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health", summary="Health Check do Backend")
async def health_check():
    return {
        "status": "healthy",
        "service": "Dr. Mauro Cezar Advocacia API",
        "timestamp": datetime.now().isoformat()
    }
