from agent.graph import graph

result = graph.invoke(
    {
        "question": "Comment créer une SARL au Maroc ?"
    }
)

print(result["answer"])