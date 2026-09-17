import { useState } from 'react'
import { CERTIFICATION_CATEGORY_COLOR } from '../data'
import { BadgeIcon, ArrowIcon } from './Icons'
import Reveal from './Reveal'

export default function CertCard({ cert, onOpen, delayIndex = 0 }) {
  const [showCourses, setShowCourses] = useState(false)
  const [showId, setShowId] = useState(false)
  const accent = CERTIFICATION_CATEGORY_COLOR[cert.category] || 'var(--cyan)'

  return (
    <Reveal className="cert-card glass" delay={(delayIndex % 4) * 0.06} style={{ '--cert-accent': accent }}>
      <button
        type="button"
        className="cert-card__header"
        onClick={() => onOpen(cert)}
        aria-haspopup="dialog"
        aria-label={`View details for ${cert.name}`}
      >
        <span className="cert-card__icon" aria-hidden="true">
          <BadgeIcon width="18" height="18" />
        </span>
        <div className="cert-card__text">
          <h3 className="cert-card__name">{cert.name}</h3>
          <p className="cert-card__issuer">
            {cert.issuer} · {cert.issuedDate}
          </p>
          {cert.skills?.length > 0 && (
            <p className="cert-card__skills">{cert.skills.slice(0, 3).join(' · ')}</p>
          )}
        </div>
        <span className="cert-card__arrow" aria-hidden="true">
          <ArrowIcon width="16" height="16" />
        </span>
      </button>

      <div className="cert-card__actions">
        {cert.credentialUrl ? (
          <a
            className="cert-card__action-link"
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            View Credential <ArrowIcon width="13" height="13" />
          </a>
        ) : (
          <span className="cert-card__unavailable">Credential link unavailable</span>
        )}

        {cert.courseCertificates?.length > 0 && (
          <button
            type="button"
            className="cert-card__action-btn"
            onClick={(e) => {
              e.stopPropagation()
              setShowCourses((v) => !v)
            }}
            aria-expanded={showCourses}
          >
            Course Certificates
            <ArrowIcon width="13" height="13" className={showCourses ? 'cert-card__caret cert-card__caret--up' : 'cert-card__caret'} />
          </button>
        )}
      </div>

      {showCourses && (
        <ul className="cert-card__courses">
          {cert.courseCertificates.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}

      {cert.credentialId && (
        <button
          type="button"
          className="cert-card__id-toggle"
          onClick={(e) => {
            e.stopPropagation()
            setShowId((v) => !v)
          }}
          aria-expanded={showId}
        >
          {showId ? 'Hide credential ID' : 'Show credential ID'}
        </button>
      )}
      {showId && <p className="cert-card__id">{cert.credentialId}</p>}
    </Reveal>
  )
}
