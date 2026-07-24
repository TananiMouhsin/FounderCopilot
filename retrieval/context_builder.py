class ContextBuilder:

    def build(self, chunks):

        sections = []

        for chunk in chunks:

            title = chunk.get("title", "Unknown")
            source = chunk.get("source", "Unknown")
            page_start = chunk.get("page_start", "Unknown")
            page_end = chunk.get("page_end", page_start)

            section = (
                f"Source: {source}\n"
                f"Title: {title}\n"
                f"Pages: {page_start}-{page_end}\n\n"
                f"{chunk['text']}"
            )

            sections.append(section)

        separator = "\n\n" + "=" * 80 + "\n\n"

        return separator.join(sections)