from chromadb import PersistentClient

from embeddings.embedder import Embedder


class Retriever:

    def __init__(
        self,
        db_path="data/chroma",
        collection_name="foundercopilot",
    ):
        self.embedder = Embedder()

        self.client = PersistentClient(path=db_path)

        self.collection = self.client.get_collection(collection_name)

    def search(self, query: str, top_k: int = 5):

        query_embedding = self.embedder.embed_query(query)

        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )

        retrieved_chunks = []

        ids = results["ids"][0]
        documents = results["documents"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]

        for chunk_id, document, metadata, distance in zip(
            ids,
            documents,
            metadatas,
            distances
        ):

            retrieved_chunks.append({
                "id": chunk_id,
                "text": document,
                "metadata": metadata,
                "score": 1 - distance
            })

        return retrieved_chunks