from langgraph.graph import StateGraph, START, END

from .state import AgentState
from .nodes import rag_node

builder = StateGraph(AgentState)
builder.add_node("rag", rag_node)

builder.add_edge(START, "rag")
builder.add_edge("rag", END)

graph = builder.compile()