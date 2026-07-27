from rag.embeddings.embedder import Embedder
from rag.retrieval.retriever import Retriever
from rag.retrieval.context_builder import ContextBuilder
from rag.llm.prompt_builder import PromptBuilder
from rag.llm.generator import Generator


class RagTool:
    def __init__(self):
        print("Loading RAG Tool...")
        self.embedder = Embedder()
        self.retriever = Retriever(self.embedder )
        self.context_builder = ContextBuilder()
        self.prompt_builder = PromptBuilder()
        self.generator = Generator()

        print("RAG Tool Ready!")

    def run(self, question: str, top_k: int = 5) -> dict:
        # 1. Retrieve relevant chunks
        chunks = self.retriever.search(question, top_k)

        # 2. Build context
        context = self.context_builder.build(chunks)

        # 3. Build prompt
        prompt = self.prompt_builder.build(
            question=question,
            context=context
        )

        # 4. Generate answer
        answer = self.generator.generate(prompt)

        return {
            "question": question,
            "answer": answer,
            "chunks": chunks,
            "context": context,
            "prompt": prompt,
        }