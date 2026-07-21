import re
from collections import Counter
from dataclasses import dataclass
from typing import List, Optional
from copy import deepcopy


# --------------------------------------------------
# OUTPUT
# --------------------------------------------------


@dataclass
class Heading:

    title: str

    level: int

    page: int

    block_index: int

    font_size: float

    is_bold: bool

# --------------------------------------------------
# DETECTOR
# --------------------------------------------------

class HeadingDetector:

    KEYWORDS = {

        "LIVRE": 1,
        "TITRE": 2,
        "PARTIE": 2,
        "CHAPITRE": 3,
        "SECTION": 4,
        "SOUS-SECTION": 5,
        "ANNEXE": 2,
        "PREAMBULE": 2,
        "INTRODUCTION": 2,
        "CONCLUSION": 2,

    }

    # ------------------------------------------------

    def __init__(self, blocks):

        self.blocks = blocks

        self.body_font = self.detect_body_font()

    # ------------------------------------------------

    def detect_body_font(self):

        """
        Detect the most common font size in the document.
        """

        fonts = []

        for block in self.blocks:

            if block.text.strip():

                fonts.append(round(block.font_size, 1))

        if not fonts:

            return 11

        return Counter(fonts).most_common(1)[0][0]

    # ------------------------------------------------

    def is_all_caps(self, text):

        letters = [c for c in text if c.isalpha()]

        if not letters:

            return False

        return all(c.isupper() for c in letters)

    # ------------------------------------------------

    def score(self, block):

        score = 0

        text = block.text.strip()

        words = len(text.split())

        # ------------------------

        if block.is_bold:

            score += 2

        # ------------------------

        if block.font_size > self.body_font:

            score += 3

        # ------------------------

        if self.is_all_caps(text):

            score += 2

        # ------------------------

        upper = text.upper()

        for keyword in self.KEYWORDS:

            if upper.startswith(keyword):

                score += 5

        # ------------------------

        if text.endswith(":"):

            score += 1

        # ------------------------

        if words <= 15:

            score += 1

        if words > 30:

            score -= 3

        return score

    # ------------------------------------------------

    def infer_level(self, block):

        upper = block.text.upper()

        for keyword, level in self.KEYWORDS.items():

            if upper.startswith(keyword):

                return level

        # typography-based fallback

        diff = block.font_size - self.body_font

        if diff >= 6:

            return 1

        elif diff >= 4:

            return 2

        elif diff >= 2:

            return 3

        else:

            return 4

    # ------------------------------------------------

# ------------------------------------------------

    def merge_split_headings(self):

        merged = []

        i = 0

        while i < len(self.blocks):

            current = deepcopy(self.blocks[i])

            # If current block is not likely a heading,
            # keep it as it is.
            if self.score(current) < 5:

                merged.append(current)
                i += 1
                continue

            # Merge consecutive heading blocks
            while i + 1 < len(self.blocks):

                nxt = self.blocks[i + 1]

                if self.score(nxt) < 5:
                    break

                same_page = current.page == nxt.page
                same_bold = current.is_bold == nxt.is_bold
                same_font = abs(current.font_size - nxt.font_size) <= 0.5

                if not (same_page and same_bold and same_font):
                    break

                current.text += " " + nxt.text.strip()

                i += 1

            merged.append(current)

            i += 1

        return merged

    def detect(self) -> List[Heading]:

        headings = []

        blocks = self.merge_split_headings()

        for i, block in enumerate(blocks):

            if self.score(block) < 5:

                continue

            headings.append(

                Heading(

                    title=block.text.strip(),

                    level=self.infer_level(block),

                    page=block.page,

                    block_index=i,

                    font_size=block.font_size,

                    is_bold=block.is_bold

                )

            )

        return headings