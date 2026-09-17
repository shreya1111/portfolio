import { useMemo, useState } from 'react'
import { CERTIFICATIONS, CERTIFICATION_CATEGORIES, FEATURED_CERT_IDS, certIssuedTimestamp } from '../data'
import { ArrowIcon, SearchIcon } from './Icons'
import Reveal from './Reveal'
import CertCard from './CertCard'
import CertificationModal from './CertificationModal'
import './Certifications.css'

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'alphabetical', label: 'A–Z' },
]

function sortCerts(list, sortBy) {
  const copy = [...list]
  if (sortBy === 'alphabetical') return copy.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === 'oldest') return copy.sort((a, b) => certIssuedTimestamp(a) - certIssuedTimestamp(b))
  return copy.sort((a, b) => certIssuedTimestamp(b) - certIssuedTimestamp(a)) // newest first (default)
}

export default function Certifications() {
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [activeCert, setActiveCert] = useState(null)

  // Explicit curated order (see FEATURED_CERT_IDS in data.js), not raw
  // array order — this is a portfolio curation decision.
  const featured = useMemo(
    () => FEATURED_CERT_IDS.map((id) => CERTIFICATIONS.find((c) => c.id === id)).filter(Boolean),
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = CERTIFICATIONS.filter((c) => {
      const matchesCategory = category === 'all' || c.category === category
      if (!matchesCategory) return false
      if (!q) return true
      const haystack = [c.name, c.issuer, c.category, ...(c.skills || []), ...(c.courseCertificates || [])]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
    return sortCerts(matches, sortBy)
  }, [query, category, sortBy])

  return (
    <section className="section" id="certifications" aria-labelledby="certifications-title">
      <Reveal className="section-head">
        <p className="eyebrow">07 · Certifications</p>
        <h2 id="certifications-title">Credentials &amp; continuous learning</h2>
        <p className="section-lead">
          {CERTIFICATIONS.length} certifications across machine learning, deep learning, NLP,
          generative AI, and applied AI engineering.
        </p>
      </Reveal>

      <div className="certs__grid">
        {featured.map((cert, i) => (
          <CertCard cert={cert} onOpen={setActiveCert} delayIndex={i} key={cert.id} />
        ))}
      </div>

      <div className="certs__toggle-row">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="certs-library"
        >
          {expanded ? 'Hide full library' : `View all ${CERTIFICATIONS.length} certifications`}
          <ArrowIcon
            width="15"
            height="15"
            className={expanded ? 'certs__toggle-arrow certs__toggle-arrow--up' : ''}
          />
        </button>
      </div>

      {expanded && (
        <div id="certs-library" className="certs-library">
          <div className="certs-library__controls">
            <div className="certs-library__search">
              <SearchIcon width="16" height="16" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search certifications"
              />
            </div>

            <label className="certs-library__sort">
              <span className="sr-only">Sort certifications</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
                {SORT_OPTIONS.map((opt) => (
                  <option value={opt.id} key={opt.id}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="certs-library__filters" role="group" aria-label="Filter by category">
            {CERTIFICATION_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`certs-library__filter ${category === c.id ? 'is-active' : ''}`}
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="certs-library__empty">No certifications match your search.</p>
          ) : (
            <div className="certs-library__grid">
              {filtered.map((cert, i) => (
                <CertCard cert={cert} onOpen={setActiveCert} delayIndex={i} key={cert.id} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeCert && <CertificationModal cert={activeCert} onClose={() => setActiveCert(null)} />}
    </section>
  )
}
