from retrieval.retriever import Retriever
from retrieval.context_builder import ContextBuilder

from llm.prompt_builder import PromptBuilder
from llm.generator import Generator


question = "Comment créer une SARL au Maroc ?"

retriever = Retriever()
context_builder = ContextBuilder()
prompt_builder = PromptBuilder()
generator = Generator()


chunks = retriever.search(question)

context = context_builder.build(chunks)

prompt = prompt_builder.build(question, context)

answer = generator.generate(prompt)

print(answer)