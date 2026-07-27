from tavily import TavilyClient
from dotenv import load_dotenv
import os

from rag.llm.generator import Generator

load_dotenv()


class WebSearchTool:

    def __init__(self):

        self.client = TavilyClient(
            api_key=os.getenv("TAVILY_API_KEY")
        )

        self.generator = Generator()

    def invoke(self, question: str):

        search_results = self.client.search(
            query=question,
            search_depth="advanced",
            max_results=5
        )

        context = ""

        sources = []

        for result in search_results["results"]:

            context += f"""
Title: {result['title']}

Content:
{result['content']}

URL:
{result['url']}

=========================================
"""

            sources.append(
                {
                    "title": result["title"],
                    "url": result["url"]
                }
            )

        prompt = f"""
You are FounderCopilot.

Answer the user's question using ONLY the search results.

Question:
{question}

Search Results:

{context}
"""

        answer = self.generator.generate(prompt)

        return {

            "question": question,

            "answer": answer,

            "sources": sources,

            "context": context,

            "prompt": prompt

        }