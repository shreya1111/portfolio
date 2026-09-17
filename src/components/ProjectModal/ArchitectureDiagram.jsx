import { useState } from 'react'
import { ArrowIcon } from '../Icons'
import './ArchitectureDiagram.css'

// Short, generic explanations of common pipeline-stage concepts. These
// describe what a stage of this *type* typically does in a RAG/AI system —
// not invented, project-specific claims. If a stage name doesn't match any
// known concept, only its name is shown (no explanation is fabricated).
const STAGE_NOTES = {
  documents: 'Raw source material entering the system.',
  'ocr / processing': 'Extracts and normalizes text from source documents.',
  'chunking / embeddings': 'Splits text into chunks and converts them into vector embeddings.',
  'hybrid retrieval (bm25 + vector)': 'Combines keyword search (BM25) with semantic vector search.',
  reranking: 'Reorders retrieved results by relevance before they reach the model.',
  'langgraph agent workflow': 'Coordinates multi-step reasoning and tool use via LangGraph.',
  llm: 'The language model that generates a response from retrieved context.',
  'grounded answer': 'A final answer backed by citations from the retrieved source material.',
  'react frontend': 'The web interface users interact with, built in React.',
  fastapi: 'The backend API layer that receives requests and coordinates the pipeline.',
  'semantic chunking': 'Splits source documents into semantically coherent chunks for retrieval.',
  'sentence transformer embeddings': 'Converts text chunks into vector embeddings using Sentence Transformers.',
  'chromadb retrieval': 'Retrieves the most relevant chunks from the ChromaDB vector store.',
  'citation-grounded answer': 'A generated response backed by citations from retrieved source material.',
  'next.js': 'The web interface users interact with, built in Next.js.',
  'langgraph multi-agent workflow': 'Coordinates multiple specialized agents through LangGraph.',
  'fact checker / critic': 'Agents that verify claims and critique generated content for accuracy.',
  'citation validation': 'Confirms that generated claims are properly backed by cited sources.',
  'research artifact (pdf / docx / latex)': 'The final cited research output, exportable to PDF, DOCX, or LaTeX.',
  'streamlit interface': 'The web interface users interact with, built in Streamlit.',
  'intent classification': 'Classifies an incoming query so it can be routed correctly.',
  'chromadb retrieval (rag)': 'Retrieves relevant knowledge-base chunks from ChromaDB to ground the response.',
  'sambanova llm': 'The language model, served via SambaNova, that generates the response.',
  'grounded answer / ticket routing': 'A grounded answer or an automated ticket-routing decision, depending on the query.',
}

function noteFor(stage) {
  return STAGE_NOTES[stage.toLowerCase()] || null
}

export default function ArchitectureDiagram({ pipeline }) {
  const [active, setActive] = useState(null)

  return (
    <div className="arch-diagram">
      <div
        className="arch-diagram__flow"
        role="img"
        aria-label={`Architecture pipeline: ${pipeline.join(' to ')}`}
      >
        {pipeline.map((stage, i) => (
          <div className="arch-diagram__step" key={stage}>
            <button
              type="button"
              className={`arch-node ${active === stage ? 'is-active' : ''}`}
              onClick={() => setActive((prev) => (prev === stage ? null : stage))}
            >
              {stage}
            </button>
            {i < pipeline.length - 1 && (
              <ArrowIcon className="arch-diagram__arrow" width="16" height="16" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <div className="arch-diagram__detail glass" aria-live="polite">
        {active ? (
          <>
            <p className="arch-diagram__detail-title">{active}</p>
            <p className="arch-diagram__detail-text">
              {noteFor(active) || 'A stage in this project\u2019s pipeline.'}
            </p>
          </>
        ) : (
          <p className="arch-diagram__detail-hint">Select a stage above to see what it does.</p>
        )}
      </div>
    </div>
  )
}
