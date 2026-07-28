from agent.graph import graph

result = graph.invoke({
    "question": "hi what is the minimum wage in morocco "
})

print(result["answer"])