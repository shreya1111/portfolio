import { useRef, useState } from 'react'
import { PROFILE } from '../data'
import { CodeIcon, ArrowIcon } from './Icons'
import ProjectModal from './ProjectModal/ProjectModal'

/**
 * Glass project card with a cursor-tracked radial glow and lift-on-hover.
 * "View Code" links to the project's own GitHub repository. "Explore
 * Architecture" opens the case-study modal with the project's own data.
 */
export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const repoUrl = project.url || PROFILE.github

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <article
      className="project glass"
      ref={cardRef}
      onMouseMove={handleMove}
    >
      <div className="project__glow" aria-hidden="true" />
      <div className="project__content">
        <div className="project__head">
          <span className="project__index">{String(index).padStart(2, '0')}</span>
          <a
            className="icon-btn project__code-icon"
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.name}`}
          >
            <CodeIcon />
          </a>
        </div>

        <h3 className="project__name">{project.name}</h3>

        <ul className="project__points">
          {project.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <ul className="project__stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project__actions">
          <button type="button" className="project__link project__link--btn" onClick={() => setShowModal(true)}>
            Explore Architecture <ArrowIcon width="15" height="15" />
          </button>
          <a
            className="project__link"
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code <ArrowIcon width="15" height="15" />
          </a>
        </div>
      </div>

      {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
    </article>
  )
}
