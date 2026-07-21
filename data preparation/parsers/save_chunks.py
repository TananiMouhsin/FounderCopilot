import json
import os


class ChunkSaver:

    def __init__(self, output_folder="output/chunks"):
        self.output_folder = output_folder
        os.makedirs(output_folder, exist_ok=True)

    def save(self, filename, chunks):

        data = []

        for chunk in chunks:

            data.append({
                "id": chunk.id,
                "title": chunk.title,
                "text": chunk.text,
                "source": chunk.source,
                "document_type": chunk.document_type,
                "page_start": chunk.page_start,
                "page_end": chunk.page_end,
                "metadata": chunk.metadata
            })

        output_file = os.path.join(
            self.output_folder,
            filename.replace(".pdf", ".json")
        )

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

        print(f"Saved {len(chunks)} chunks -> {output_file}")