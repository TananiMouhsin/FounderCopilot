from dataclasses import dataclass, field
from typing import List


@dataclass
class SectionNode:

    title: str

    level: int

    page_start: int

    page_end: int

    block_index: int

    text: str = ""

    children: List["SectionNode"] = field(default_factory=list)

class HierarchyBuilder:

    def __init__(self, headings, blocks):

        self.headings = headings

        self.blocks = blocks

    def build(self):

        root = SectionNode(
            title="ROOT",
            level=0,
            page_start=1,
            page_end=1,
            block_index=-1
        )

        stack = [root]

        for heading in self.headings:

            node = SectionNode(

                title=heading.title,

                level=heading.level,

                page_start=heading.page,

                page_end=heading.page,

                block_index=heading.block_index
            )
            while stack[-1].level >= node.level:
                stack.pop()

            stack[-1].children.append(node)

            stack.append(node)

        return root