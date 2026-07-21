import re
from copy import deepcopy
from typing import List

from models.chunk import Chunk


class ChunkOptimizer:

    def __init__(

        self,

        max_words=350,

        overlap_words=50

    ):

        self.max_words = max_words

        self.overlap_words = overlap_words

    # -----------------------------------------------------

    def optimize(self, chunks: List[Chunk]) -> List[Chunk]:

        optimized = []

        for chunk in chunks:

            chunk = self.normalize(chunk)

            chunk = self.remove_headers(chunk)

            chunk = self.fix_line_breaks(chunk)

            optimized.extend(

                self.split_if_needed(chunk)

            )

        return optimized

    # -----------------------------------------------------

    def normalize(self, chunk: Chunk):

        chunk.text = chunk.text.replace("\xa0", " ")

        chunk.text = re.sub(r"[ \t]+", " ", chunk.text)

        chunk.text = re.sub(r"\n{3,}", "\n\n", chunk.text)

        chunk.text = chunk.text.strip()

        return chunk

    # -----------------------------------------------------

    def remove_headers(self, chunk: Chunk):

        patterns = [

            r"BULLETIN OFFICIEL",

            r"N[º°]\s*\d+",

            r"\b20\d{2}\b",

            r"Page\s+\d+"

        ]

        lines = []

        for line in chunk.text.split("\n"):

            keep = True

            for p in patterns:

                if re.search(p, line, flags=re.IGNORECASE):

                    keep = False

                    break

            if keep:

                lines.append(line)

        chunk.text = "\n".join(lines)

        return chunk

    # -----------------------------------------------------

    def fix_line_breaks(self, chunk: Chunk):

        lines = []

        for line in chunk.text.split("\n"):

            line = line.strip()

            if line:

                lines.append(line)

        text = "\n".join(lines)

        text = re.sub(r"(?<!\n)\n(?!\n)", " ", text)

        text = re.sub(r"\n{2,}", "\n\n", text)

        chunk.text = text

        return chunk

    # -----------------------------------------------------

    def split_if_needed(self, chunk: Chunk):

        words = chunk.text.split()

        if len(words) <= self.max_words:

            return [chunk]

        chunks = []

        start = 0

        index = 1

        while start < len(words):

            end = min(

                start + self.max_words,

                len(words)

            )

            new_chunk = deepcopy(chunk)

            new_chunk.id = f"{chunk.id}_{index}"

            new_chunk.text = " ".join(

                words[start:end]

            )

            new_chunk.metadata["chunk_index"] = index

            chunks.append(new_chunk)

            if end == len(words):

                break

            start = end - self.overlap_words

            index += 1

        total = len(chunks)

        for c in chunks:

            c.metadata["total_chunks"] = total

        return chunks