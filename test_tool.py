from tools.rag_tool import RagTool

rag = RagTool()

result = rag.invoke(
    "Comment créer une SARL au Maroc ?"
)

print("=" * 80)
print(result["answer"])
print("=" * 80)

print(f"Retrieved {len(result['chunks'])} chunks")