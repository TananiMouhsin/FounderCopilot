from pydantic import BaseModel


class QuestionRequest(BaseModel):
    question: str


class Source(BaseModel):
    title: str | None = None
    source: str | None = None
    page_start: int | None = None
    page_end: int | None = None


class QuestionResponse(BaseModel):
    answer: str
    sources: list[Source]