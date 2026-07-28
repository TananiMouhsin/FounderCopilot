from agent.graph import graph


class FounderCopilotService:

    def __init__(self):

        print("Loading FounderCopilot Agent...")

        self.agent = graph

        print("FounderCopilot Agent Ready!")

    def ask(self, question):

        result = self.agent.invoke(
            {
                "question": question
            }
        )

        return result["answer"], result["sources"]