from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router, set_service
from api.services import FounderCopilotService


app = FastAPI(
    title="FounderCopilot API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # later replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


service = FounderCopilotService()

set_service(service)

app.include_router(router)