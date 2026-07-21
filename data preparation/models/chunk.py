from dataclasses import dataclass, field
from typing import Dict


@dataclass
class Chunk:
    id: str

    text: str

    source: str

    document_type: str

    title: str

    page_start: int
    page_end: int

    metadata: Dict = field(default_factory=dict)