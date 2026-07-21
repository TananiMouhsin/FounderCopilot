from pathlib import Path
from dataclasses import dataclass
from typing import List
import fitz  # PyMuPDF


# -----------------------------
# DATA CLASSES
# -----------------------------




@dataclass
class TextBlock:
    text: str
    page: int
    font_size: float
    is_bold: bool
    bbox: tuple


@dataclass
class BlockMapEntry:
    block_index: int
    page: int
    start_char: int
    end_char: int


@dataclass
class PDFDocument:
    filename: str
    filepath: str
    category: str

    blocks: List[TextBlock]

    full_text: str
    block_map: List[BlockMapEntry]

# -----------------------------
# PDF LOADER
# -----------------------------

class PDFLoader:

    def __init__(self, data_folder: str):
        self.data_folder = Path(data_folder)

    def load_all(self) -> List[PDFDocument]:

        documents = []

        for category in ["byarticle", "guides"]:

            folder = self.data_folder / category

            if not folder.exists():
                continue

            for pdf in folder.glob("*.pdf"):

                print(f"Loading {pdf.name}")

                doc = self.load_pdf(pdf, category)

                documents.append(doc)

        return documents

    def load_pdf(self, pdf_path: Path, category: str):

        pdf = fitz.open(pdf_path)

        blocks = []
        full_text = ""
        block_map = []

        current_position = 0
        for page_number, page in enumerate(pdf):

            page_dict = page.get_text("dict")

            for block in page_dict["blocks"]:

                if "lines" not in block:
                    continue

                text = ""
                max_font = 0
                bold = False

                for line in block["lines"]:

                    for span in line["spans"]:

                        span_text = span["text"].strip()

                        if span_text == "":
                            continue

                        text += span_text + " "

                        max_font = max(max_font, span["size"])

                        font_name = span["font"].lower()

                        if "bold" in font_name:
                            bold = True

                text = text.strip()

                if len(text) == 0:
                    continue

                new_block = TextBlock(
                    text=text,
                    page=page_number + 1,
                    font_size=max_font,
                    is_bold=bold,
                    bbox=block["bbox"]
                )

                blocks.append(new_block)
                start = current_position

                full_text += text + "\n\n"

                current_position = len(full_text)

                block_map.append(
                    BlockMapEntry(
                        block_index=len(blocks) - 1,
                        page=page_number + 1,
                        start_char=start,
                        end_char=current_position
                    )
)

        pdf.close()

        return PDFDocument(
            filename=pdf_path.name,
            filepath=str(pdf_path),
            category=category,

            blocks=blocks,

            full_text=full_text,
            block_map=block_map
        )