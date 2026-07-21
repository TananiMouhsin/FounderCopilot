from models.chunk import Chunk
from parsers.heading_detector import HeadingDetector


class GuideParser:

    def __init__(self, document):

        self.document = document

    # --------------------------------------------------------

    def parse(self):

        detector = HeadingDetector(self.document.blocks)

        merged_blocks = detector.merge_split_headings()

        detector.blocks = merged_blocks

        headings = detector.detect()

        chunks = []

        for i, heading in enumerate(headings):

            start = heading.block_index + 1

            if i == len(headings) - 1:
                end = len(merged_blocks)
            else:
                end = headings[i + 1].block_index

            text = []

            for block in merged_blocks[start:end]:

                if block.text.strip():

                    text.append(block.text.strip())

            chunk = Chunk(

                id=f"{self.document.filename}_{i}",

                text="\n".join(text),

                source=self.document.filename,

                document_type="guide",

                title=heading.title,

                page_start=heading.page,

                page_end=headings[i + 1].page if i + 1 < len(headings) else merged_blocks[-1].page,

                metadata={

                    "level": heading.level

                }

            )

            chunks.append(chunk)

        return chunks