from rag.llm.generator import Generator


class Planner:

    def __init__(self):
        self.llm = Generator()

    def invoke(self, question: str):

        prompt = f"""
        You are the planning module of FounderCopilot.

        Your job is to choose the BEST tool.

        Available tools:

        1. rag
        Use when the question is about:
        - Moroccan company creation
        - SARL
        - SAS
        - Taxes
        - Accounting
        - Labor law
        - Legal procedures
        - Investment law
        - Information contained in the internal knowledge base

        2. web_search
        Use when the question requires:
        - Recent news
        - Current events
        - Today's information
        - Live information
        - Government announcements
        - Information that may have changed recently
        - Information not present in the knowledge base

        Return ONLY ONE WORD.

        Allowed answers:

        rag

        or

        web_search

        Question:

        {question}
        """

        decision = self.llm.generate(prompt)

        return decision.strip().lower()