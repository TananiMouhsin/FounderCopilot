from embeddings.embedder import Embedder
from retrieval.retriever import Retriever
from retrieval.context_builder import ContextBuilder
from llm.prompt_builder import PromptBuilder
from llm.generator import Generator


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