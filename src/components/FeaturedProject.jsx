import { useRef, useState } from 'react'
import { FEATURED_PROJECT } from '../data'
import { CodeIcon, ArrowIcon } from './Icons'
import Reveal from './Reveal'
import ProjectModal from './ProjectModal/ProjectModal'
import './FeaturedProject.css'

/**
 * Larger, flagship treatment for EKOS. Includes a visual pipeline
 * (documents → OCR → chunking → hybrid retrieval → rerank → agent
 * workflow → LLM → grounded answer) built from data.js — no invented steps.
 */
export default function FeaturedProject() {
  const cardRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const project = FEATURED_PROJECT

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Reveal className="featured glass">
      <div ref={cardRef} className="featured__inner" onMouseMove={handleMove}>
        <div className="featured__glow" aria-hidden="true" />
        <div className="featured__content">
          <div className="featured__top">
            <span className="featured__badge">Flagship Project</span>
            <a
              className="icon-btn"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.name}`}
            >
              <CodeIcon />
            </a>
          </div>

          <h3 className="featured__name">{project.name}</h3>
          <p className="featured__tagline">{project.tagline}</p>

          <ul className="featured__points">
            {project.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          {/* Visual architecture pipeline */}
          <div className="pipeline" role="img" aria-label={`Architecture pipeline: ${project.pipeline.join(' to ')}`}>
            {project.pipeline.map((stage, i) => (
              <div className="pipeline__stage" key={stage}>
                <span className="pipeline__node">{stage}</span>
                {i < project.pipeline.length - 1 && (
                  <ArrowIcon className="pipeline__arrow" width="16" height="16" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <ul className="featured__stack">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="project__actions">
            <button type="button" className="project__link project__link--btn" onClick={() => setShowModal(true)}>
              Explore Architecture <ArrowIcon width="15" height="15" />
            </button>
            <a className="project__link" href={project.url} target="_blank" rel="noopener noreferrer">
              View Code <ArrowIcon width="15" height="15" />
            </a>
          </div>
        </div>
      </div>

      {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
    </Reveal>
  )
}
