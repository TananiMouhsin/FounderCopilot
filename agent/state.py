from typing import TypedDict, List


class AgentState(TypedDict):
    question: str

    answer: str

    tool: str

    chunks: List[dict]

    context: str

    prompt: str