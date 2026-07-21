import re
from dataclasses import dataclass
from typing import List, Optional

from parsers.pdf_loader import PDFDocument

from models.chunk import Chunk
# -------------------------------------------------
# OUTPUT CHUNK
# -------------------------------------------------

# @dataclass
# class LawChunk:

#     article: Optional[str]

#     title: str

#     text: str

#     source: str

#     page_start: int

#     page_end: int


# -------------------------------------------------
# PARSER
# -------------------------------------------------

class LawParser:

    ARTICLE_PATTERN = re.compile(
        r"(?im)^Article\s+(Premier|\d+\s*(?:bis|ter|quater)?)(?:\s*:|\s*\.-|\s*)"
    )

    def __init__(self, document: PDFDocument):

        self.document = document

        self.text = document.full_text

        self.block_map = document.block_map

    # ---------------------------------------------

    def get_page(self, char_position):

        """
        Convert a character position into a page number.
        """

        for entry in self.block_map:

            if entry.start_char <= char_position <= entry.end_char:

                return entry.page

        return self.block_map[-1].page

    # ---------------------------------------------

    def parse(self) -> List[Chunk]:

        matches = list(self.ARTICLE_PATTERN.finditer(self.text))

        chunks = []

        # -----------------------------------------
        # PREAMBLE
        # -----------------------------------------

        if matches:

            if matches[0].start() > 0:

                preamble = self.text[:matches[0].start()].strip()

                if preamble:

                    chunks.append(

                        Chunk(

                            id=f"{self.document.filename}_Preamble",

                            text=preamble,

                            source=self.document.filename,

                            document_type="law",

                            title="Préambule",

                            page_start=1,

                            page_end=self.get_page(matches[0].start()),

                            metadata={
                                "article": None
                            }

                        )

                    )

        # -----------------------------------------
        # ARTICLES
        # -----------------------------------------

        for i, match in enumerate(matches):

            start = match.start()

            end = (

                matches[i + 1].start()

                if i + 1 < len(matches)

                else len(self.text)

            )

            article_text = self.text[start:end].strip()

            article_name = match.group(1)

            chunks.append(

                Chunk(

                    id=f"{self.document.filename}_Article_{article_name}",

                    text=article_text,

                    source=self.document.filename,

                    document_type="law",

                    title=f"Article {article_name}",

                    page_start=self.get_page(start),

                    page_end=self.get_page(end),

                    metadata={

                        "article": article_name

                    }

                )

            )

        return chunks