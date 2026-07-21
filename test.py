from embeddings.loader import ChunkLoader
from embeddings.embedder import Embedder

loader = ChunkLoader("data/chunks/byarticle")

chunks = loader.load()

embedder = Embedder()

embeddings = embedder.embed_chunks(chunks)

print(len(embeddings))
print(len(embeddings[0]))