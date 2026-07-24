from retrieval.retriever import Retriever

retriever = Retriever()

results = retriever.search(
    "how can i create a sarl in morocco?",
    top_k=5
)

for i, chunk in enumerate(results, 1):

    print("=" * 80)

    print(f"Result {i}")
    print(f"Score : {chunk['score']:.4f}")
    print(f"Title : {chunk['metadata'].get('title')}")
    print(f"Source: {chunk['metadata'].get('source')}")
    print(f"Page  : {chunk['metadata'].get('page')}")

    print("-" * 80)

    print(chunk["text"][:500])