import os

from dotenv import load_dotenv
from google import genai

load_dotenv()


class Generator:

    def __init__(self):

        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

        self.model = "gemini-3.6-flash"

    def generate(self, prompt: str):

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )

        return response.text