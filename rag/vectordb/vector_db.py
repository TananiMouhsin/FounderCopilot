import chromadb
from chromadb.config import Settings


class VectorDB:

    def __init__(
        self,
        db_path="data/chroma",
        collection_name="foundercopilot"
    ):

        self.client = chromadb.PersistentClient(path=db_path)

        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={
                "description": "FounderCopilot Knowledge Base"
            }
        )

    def add_chunks(self, chunks, embeddings):

        ids = []
        documents = []
        metadatas = []

        for i, chunk in enumerate(chunks):

            ids.append(f"chunk_{i}")

            documents.append(chunk["text"])

            metadata = {}

            for key, value in chunk["metadata"].items():

                if value is None:
                    continue

                if isinstance(value, (str, int, float, bool)):
                    metadata[key] = value

                else:
                    metadata[key] = str(value)

            metadata["title"] = chunk["title"]

            metadata["title"] = chunk["title"]

            metadatas.append(metadata)

        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )

    def count(self):

        return self.collection.count()

    def reset(self):

        self.client.delete_collection(self.collection.name)

        self.collection = self.client.get_or_create_collection(
            name=self.collection.name
        )