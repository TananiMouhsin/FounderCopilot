# FounderCopilot

FounderCopilot is an AI-powered assistant that helps entrepreneurs navigate the legal and administrative process of creating and managing a business in Morocco.

The project is built using a Retrieval-Augmented Generation (RAG) architecture. Instead of relying solely on an LLM's internal knowledge, FounderCopilot retrieves relevant information from official Moroccan legal documents and guides before generating an answer.

---

## Features

- 🇲🇦 Specialized in Moroccan entrepreneurship
- 📚 Knowledge base built from official laws and guides
- 🔍 Semantic search using ChromaDB
- 🤖 AI-generated answers using Gemini
- ⚡ FastAPI backend
- 💬 Modern chat interface

---

## Tech Stack

### Backend

- FastAPI
- ChromaDB
- Sentence Transformers
- Google Gemini API

### AI

- multilingual-e5-small (Embeddings)
- Gemini 3.6 Flash (Generation)

### Database

- ChromaDB

---

## Project Structure

```
FounderCopilot/

├── api/
├── chunking/
├── data/
│   ├── chunks/
│   └── chroma/
├── embeddings/
├── llm/
├── parsers/
├── retrieval/
├── vectordb/
├── frontend/
├── .env        
├── requirements.txt
└── README.md
```

---

## RAG Pipeline

```
User Question
        │
        ▼
Embed Question
        │
        ▼
ChromaDB Retrieval
        │
        ▼
Top-k Documents
        │
        ▼
Context Builder
        │
        ▼
Prompt Builder
        │
        ▼
Gemini 3.6 Flash
        │
        ▼
Final Answer
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/FounderCopilot.git

cd FounderCopilot
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GEMINI_API_KEY=your_api_key
```

Run the API

```bash
uvicorn api.app:app --reload
```

The API will be available at

```
http://127.0.0.1:8000
```

Swagger documentation

```
http://127.0.0.1:8000/docs
```

---

## Knowledge Base

The current knowledge base contains official Moroccan documents, including:

- Moroccan Commercial Laws
- Tax Code (CGI)
- Labor Code
- Company Creation Guides
- Investment Charter
- Accounting Standards
- Circular Notes
- OMPIC Guides

These documents are parsed, chunked, embedded, and indexed in ChromaDB.

---

## Architecture

```
PDFs
 │
 ▼
Parsers
 │
 ▼
Chunk Optimizer
 │
 ▼
JSON Chunks
 │
 ▼
Embeddings
 │
 ▼
ChromaDB
 │
 ▼
Retriever
 │
 ▼
Context Builder
 │
 ▼
Prompt Builder
 │
 ▼
Gemini
```

---

## Future Improvements

- Source citations
- Cross-encoder reranking
- Hybrid Search (Semantic + BM25)
- Conversation memory
- Agentic RAG
- Multi-document reasoning
- OCR support
- Deployment with Docker

---

## Author

**Tanani Mouhsin**

Computer Science Student

AI & Data Science Enthusiast

Morocco

---