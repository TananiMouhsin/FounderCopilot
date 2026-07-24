from fastapi import APIRouter

from api.schemas import QuestionRequest, QuestionResponse, Source


router = APIRouter()

service = None


def set_service(s):

    global service

    service = s


@router.post("/ask", response_model=QuestionResponse)
def ask(request: QuestionRequest):

    answer, chunks = service.ask(request.question)

    sources = []

    for chunk in chunks:

        sources.append(
            Source(
                title=chunk.get("title"),
                source=chunk.get("source"),
                page_start=chunk.get("page_start"),
                page_end=chunk.get("page_end"),
            )
        )

    return QuestionResponse(
        answer=answer,
        sources=sources,
    )


@router.get("/health")
def health():

    return {"status": "ok"}