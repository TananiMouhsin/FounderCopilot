from chromadb import PersistentClient

from rag.embeddings.embedder import Embedder

from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]

DB_PATH = ROOT / "data" / "chroma"
class Retriever:

    def __init__(
        self,
        embedder,
        db_path="data/chroma",
        collection_name="foundercopilot",
    ):
        self.embedder = embedder

        self.client = PersistentClient(path=str(DB_PATH))

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