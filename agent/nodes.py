from tools.rag_tool import RagTool


rag_tool = RagTool()


def rag_node(state):
    result = rag_tool.invoke(state["question"])

    return {
        "answer": result["answer"],
        "chunks": result["chunks"],
        "context": result["context"],
        "prompt": result["prompt"],
        "tool": "rag"
    }

