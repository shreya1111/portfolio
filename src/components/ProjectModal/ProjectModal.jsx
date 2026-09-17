import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CodeIcon, ArrowIcon } from '../Icons'
import ArchitectureDiagram from './ArchitectureDiagram'
import './ProjectModal.css'

/**
 * Rendered via a portal directly into document.body.
 *
 * Why: project cards (and the featured/EKOS card) sit inside elements that
 * carry `transform` (hover lift) or a permanent `will-change: transform`
 * (the .reveal scroll-in animation). Per the CSS spec, any ancestor with a
 * transform/will-change/filter becomes the containing block for
 * `position: fixed` descendants — so a modal nested inside those cards
 * gets clipped to the card's box instead of covering the viewport, which
 * is what caused the "stuck"/embedded-in-page look. Portaling to
 * document.body removes the modal from that ancestor chain entirely, so
 * `position: fixed; inset: 0` behaves as a true full-viewport overlay
 * regardless of what the trigger card is doing.
 */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeBtnRef.current?.focus()

    // Lock background scroll but remember the prior inline value so we
    // restore exactly what was there before (not just "unset"), and mark
    // the body so floating widgets (Ask Shreya AI, Recruiter CTA, Back to
    // Top) can hide themselves for as long as any project modal is open.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('has-open-modal')

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('has-open-modal')
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="pmodal-overlay" onClick={onClose}>
      <div
        className="pmodal glass"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pmodal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="pmodal__header">
          <p className="eyebrow">Project Overview</p>
          <h3 id="pmodal-title" className="pmodal__title">{project.name}</h3>
          {project.tagline && <p className="pmodal__tagline">{project.tagline}</p>}
          <button
            ref={closeBtnRef}
            type="button"
            className="pmodal__close"
            onClick={onClose}
            aria-label="Close project details"
          >
            ✕
          </button>
        </header>

        <div className="pmodal__body">
          <section className="pmodal__section">
            <h4>Approach &amp; Engineering</h4>
            <ul className="pmodal__points">
              {project.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>

          {project.pipeline && (
            <section className="pmodal__section">
              <h4>Architecture</h4>
              <ArchitectureDiagram pipeline={project.pipeline} />
            </section>
          )}

          <section className="pmodal__section">
            <h4>Technology Stack</h4>
            <ul className="pmodal__stack">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>

          <a className="btn btn-primary pmodal__repo" href={project.url} target="_blank" rel="noopener noreferrer">
            <CodeIcon width="16" height="16" /> View Repository <ArrowIcon width="15" height="15" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
