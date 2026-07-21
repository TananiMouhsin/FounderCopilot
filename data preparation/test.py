from parsers.pdf_loader import PDFLoader
from parsers.guide_parser import GuideParser

from optimizer.chunk_optimizer import ChunkOptimizer
from parsers.save_chunks import ChunkSaver
def propagate_parent_titles(chunks):

    pending_titles = []

    final_chunks = []

    for chunk in chunks:

        # Parent heading with no content
        if not chunk.text.strip():

            pending_titles.append(chunk.title)
            continue

        # Add all pending parent headings
        if pending_titles:

            chunk.title = " > ".join(pending_titles + [chunk.title])

            pending_titles.clear()

        final_chunks.append(chunk)

    return final_chunks


loader = PDFLoader("data")

optimizer = ChunkOptimizer()

saver = ChunkSaver()

documents = loader.load_all()

for doc in documents:

    if doc.category != "guides":
        continue

    parser = GuideParser(doc)

    chunks = parser.parse()

    chunks = optimizer.optimize(chunks)
    chunks = propagate_parent_titles(chunks)
    saver.save(doc.filename, chunks)