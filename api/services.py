from rag.embeddings.embedder import Embedder
from rag.retrieval.retriever import Retriever
from rag.retrieval.context_builder import ContextBuilder
from rag.llm.prompt_builder import PromptBuilder
from rag.llm.generator import Generator


class FounderCopilotService:

    def __init__(self):

        print("Loading FounderCopilot...")

        self.embedder = Embedder()

        self.retriever = Retriever(self.embedder)

        self.context_builder = ContextBuilder()

        self.prompt_builder = PromptBuilder()

        self.generator = Generator()

        print("FounderCopilot Ready!")

    def ask(self, question):

        chunks = self.retriever.search(question)

        context = self.context_builder.build(chunks)

        prompt = self.prompt_builder.build(question, context)

        answer = self.generator.generate(prompt)

        return answer, chunks