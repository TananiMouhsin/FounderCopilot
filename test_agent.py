from agent.graph import graph

result = graph.invoke({
    "question": "who is tanani mouhsin ?"
})

print(result["answer"])