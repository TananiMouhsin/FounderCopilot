import json
from pathlib import Path


class ChunkLoader:

    def __init__(self, chunks_folder: str):

        self.chunks_folder = Path(chunks_folder)

    def load(self):

        chunks = []

        for json_file in sorted(self.chunks_folder.glob("*.json")):

            print(f"Loading {json_file.name}")

            with open(json_file, "r", encoding="utf-8") as f:

                data = json.load(f)

                chunks.extend(data)

        print(f"\nLoaded {len(chunks)} chunks.\n")

        return chunks