from langgraph.graph import StateGraph, START, END

from agent.state import AgentState
from agent.nodes import (
    planner_node,
    rag_node,
    web_search_node,
    router
)

builder = StateGraph(AgentState)

# Nodes
builder.add_node("planner", planner_node)
builder.add_node("rag", rag_node)
builder.add_node("web_search", web_search_node)

# Start
builder.add_edge(START, "planner")

# Planner decides where to go
builder.add_conditional_edges(
    "planner",
    router,
    {
        "rag": "rag",
        "web_search": "web_search"
    }
)

# End
builder.add_edge("rag", END)
builder.add_edge("web_search", END)

graph = builder.compile()