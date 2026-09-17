import { RESUME_URL, PROFILE } from '../../data'
import { ArrowIcon } from '../Icons'
import './ResumeViewer.css'

export default function ResumeViewer({ variant = 'button' }) {
  if (!RESUME_URL) {
    // Graceful fallback — no fabricated resume link. GitHub covers the
    // same ground until a real resume link is added at RESUME_URL in data.js.
    return (
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noopener noreferrer"
        className={variant === 'button' ? 'btn btn-ghost' : 'resume-fallback-link'}
        title="Resume coming soon — see GitHub for now"
      >
        Resume coming soon · View GitHub <ArrowIcon width="15" height="15" />
      </a>
    )
  }

  // RESUME_URL points to an external host (e.g. Google Drive), which can't
  // be embedded in an iframe or fetched via the `download` attribute — so
  // this opens it directly in a new tab instead.
  return (
    <a className="btn btn-ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
      View Resume
    </a>
  )
}
