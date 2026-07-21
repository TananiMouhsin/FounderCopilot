from embeddings.loader import ChunkLoader
from embeddings.embedder import Embedder
from vectordb.vector_db import VectorDB

loader = ChunkLoader("data/chunks")

chunks = loader.load()

embedder = Embedder()

embeddings = embedder.embed_chunks(chunks)

db = VectorDB()

db.reset()

db.add_chunks(chunks, embeddings)

print(db.count())