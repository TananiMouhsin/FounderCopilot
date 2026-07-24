from retrieval.retriever import Retriever
from retrieval.context_builder import ContextBuilder
from llm.prompt_builder import PromptBuilder


retriever = Retriever()
context_builder = ContextBuilder()
prompt_builder = PromptBuilder()


question = "Comment créer une SARL au Maroc ?"

chunks = retriever.search(question, top_k=5)

context = context_builder.build(chunks)

prompt = prompt_builder.build(question, context)


print("=" * 100)
print("CONTEXT")
print("=" * 100)
print(context)

print("\n\n")

print("=" * 100)
print("PROMPT")
print("=" * 100)
print(prompt)