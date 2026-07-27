from tools.rag_tool import RagTool
from tools.web_search_tool import WebSearchTool
from agent.planner import Planner

planner = Planner()
rag_tool = RagTool()
web_tool = WebSearchTool()


def planner_node(state):
    """
    Decide which tool should answer the question.
    """

    tool = planner.invoke(state["question"])

    return {
        "tool": tool
    }


def rag_node(state):
    """
    Execute the RAG pipeline.
    """

    result = rag_tool.invoke(state["question"])

    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "context": result["context"],
        "prompt": result["prompt"]
    }


def web_search_node(state):
    """
    Execute the Web Search pipeline.
    """

    result = web_tool.invoke(state["question"])

    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "context": result["context"],
        "prompt": result["prompt"]
    }


def router(state):
    """
    Tell LangGraph which node to execute next.
    """

    return state["tool"]