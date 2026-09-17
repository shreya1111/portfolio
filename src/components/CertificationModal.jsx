import { useEffect, useRef } from 'react'
import { BadgeIcon, ArrowIcon, CheckIcon } from './Icons'

export default function CertificationModal({ cert, onClose }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'

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
      document.body.style.overflow = ''
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  return (
    <div className="cmodal-overlay" onClick={onClose}>
      <div
        className="cmodal glass"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cmodal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="cmodal__close"
          onClick={onClose}
          aria-label="Close certification details"
        >
          ✕
        </button>

        <div className="cmodal__icon" aria-hidden="true">
          <BadgeIcon width="22" height="22" />
        </div>
        <p className="cmodal__verified">
          <CheckIcon width="13" height="13" /> Verified Credential
        </p>
        <h3 id="cmodal-title" className="cmodal__title">{cert.name}</h3>
        <p className="cmodal__issuer">{cert.issuer}</p>

        <dl className="cmodal__meta">
          <div>
            <dt>Issued</dt>
            <dd>{cert.issuedDate}</dd>
          </div>
          {cert.credentialId && (
            <div>
              <dt>Credential ID</dt>
              <dd className="cmodal__cred-id">{cert.credentialId}</dd>
            </div>
          )}
        </dl>

        {cert.description && <p className="cmodal__description">{cert.description}</p>}

        {cert.skills?.length > 0 && (
          <div className="cmodal__section">
            <p className="cmodal__section-label">Skills</p>
            <ul className="cmodal__tags">
              {cert.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {cert.courseCertificates?.length > 0 && (
          <div className="cmodal__section">
            <p className="cmodal__section-label">Course Certificates</p>
            <ul className="cmodal__courses">
              {cert.courseCertificates.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {cert.credentialUrl ? (
          <a
            className="btn btn-primary cmodal__cta"
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Credential <ArrowIcon width="15" height="15" />
          </a>
        ) : (
          <p className="cmodal__cta-unavailable">Credential link unavailable</p>
        )}
      </div>
    </div>
  )
}
