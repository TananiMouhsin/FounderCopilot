from sentence_transformers import SentenceTransformer


class Embedder:

    def __init__(
        self,
        model_name="intfloat/multilingual-e5-small"
    ):

        print("Loading embedding model...")

        self.model = SentenceTransformer(model_name)

        print("Embedding model loaded.\n")

    def build_embedding_text(self, chunk):

        title = chunk.get("title", "")
        text = chunk.get("text", "")
        metadata = chunk.get("metadata", {})

        source = metadata.get("source", "")

        content = f"""
Document: {source}

Title: {title}

Content:
{text}
"""

        # E5 models expect "passage:"
        return "passage: " + content.strip()

    def embed_chunks(self, chunks, batch_size=64):

        texts = [
            self.build_embedding_text(chunk)
            for chunk in chunks
        ]

        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            show_progress_bar=True,
            normalize_embeddings=True,
            convert_to_numpy=True
        )

        return embeddings.tolist()

    def embed_query(self, query):

        return self.model.encode(
            "query: " + query,
            normalize_embeddings=True
        ).tolist()