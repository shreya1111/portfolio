import { useCallback, useRef } from 'react'
import { SNAPSHOT } from '../data'
import Reveal from './Reveal'
import './Snapshot.css'

/* ─── Accent token map ───────────────────────────────────────
 * Maps data.accent → CSS custom property value so each card
 * can carry a single --card-accent variable used throughout.
 * ─────────────────────────────────────────────────────────── */
const ACCENT_MAP = {
  cyan:     'var(--cyan)',
  lavender: 'var(--lavender)',
  pink:     'var(--pink)',
}

/* ─── Micro SVG decorations ──────────────────────────────────
 * Each variant is a small abstract geometric SVG rendered at
 * low opacity behind the card content. They are aria-hidden
 * and purely decorative.
 * ─────────────────────────────────────────────────────────── */
function Decoration({ variant }) {
  switch (variant) {
    case 'neural':
      // Neural-network: two connected layers of dots with lines
      return (
        <svg className="snap-deco" viewBox="0 0 80 56" aria-hidden="true" focusable="false">
          <circle cx="12" cy="10" r="2.5" />
          <circle cx="12" cy="28" r="2.5" />
          <circle cx="12" cy="46" r="2.5" />
          <circle cx="40" cy="19" r="2.5" />
          <circle cx="40" cy="37" r="2.5" />
          <circle cx="68" cy="28" r="3" />
          <line x1="14.5" y1="10" x2="37.5" y2="19" />
          <line x1="14.5" y1="10" x2="37.5" y2="37" />
          <line x1="14.5" y1="28" x2="37.5" y2="19" />
          <line x1="14.5" y1="28" x2="37.5" y2="37" />
          <line x1="14.5" y1="46" x2="37.5" y2="19" />
          <line x1="14.5" y1="46" x2="37.5" y2="37" />
          <line x1="42.5" y1="19" x2="65"   y2="28"  />
          <line x1="42.5" y1="37" x2="65"   y2="28"  />
        </svg>
      )

    case 'nodes':
      // Token / connected-node: hexagonal cluster
      return (
        <svg className="snap-deco" viewBox="0 0 80 56" aria-hidden="true" focusable="false">
          <circle cx="40" cy="28" r="3.5" />
          <circle cx="20" cy="16" r="2.5" />
          <circle cx="60" cy="16" r="2.5" />
          <circle cx="20" cy="40" r="2.5" />
          <circle cx="60" cy="40" r="2.5" />
          <circle cx="10" cy="28" r="2"   />
          <circle cx="70" cy="28" r="2"   />
          <line x1="40" y1="28" x2="20" y2="16" />
          <line x1="40" y1="28" x2="60" y2="16" />
          <line x1="40" y1="28" x2="20" y2="40" />
          <line x1="40" y1="28" x2="60" y2="40" />
          <line x1="40" y1="28" x2="10" y2="28" />
          <line x1="40" y1="28" x2="70" y2="28" />
          <line x1="20" y1="16" x2="10" y2="28" />
          <line x1="60" y1="16" x2="70" y2="28" />
          <line x1="20" y1="40" x2="10" y2="28" />
          <line x1="60" y1="40" x2="70" y2="28" />
        </svg>
      )

    case 'flow':
      // Workflow / agentic: path with decision nodes
      return (
        <svg className="snap-deco" viewBox="0 0 80 56" aria-hidden="true" focusable="false">
          <rect x="6"  y="22" width="14" height="12" rx="3" strokeWidth="1.2" fill="none" />
          <rect x="33" y="10" width="14" height="12" rx="3" strokeWidth="1.2" fill="none" />
          <rect x="33" y="34" width="14" height="12" rx="3" strokeWidth="1.2" fill="none" />
          <rect x="60" y="22" width="14" height="12" rx="3" strokeWidth="1.2" fill="none" />
          <line x1="20" y1="28"  x2="28" y2="16"  />
          <line x1="28" y1="16"  x2="33" y2="16"  />
          <line x1="20" y1="28"  x2="28" y2="40"  />
          <line x1="28" y1="40"  x2="33" y2="40"  />
          <line x1="47" y1="16"  x2="52" y2="28"  />
          <line x1="47" y1="40"  x2="52" y2="28"  />
          <line x1="52" y1="28"  x2="60" y2="28"  />
          <circle cx="28" cy="28" r="2.5" />
          <circle cx="52" cy="28" r="2.5" />
        </svg>
      )

    case 'grid':
      // API / backend: circuit-like grid
      return (
        <svg className="snap-deco" viewBox="0 0 80 56" aria-hidden="true" focusable="false">
          <line x1="0"  y1="14" x2="80" y2="14" strokeWidth="0.8" />
          <line x1="0"  y1="28" x2="80" y2="28" strokeWidth="0.8" />
          <line x1="0"  y1="42" x2="80" y2="42" strokeWidth="0.8" />
          <line x1="16" y1="0"  x2="16" y2="56" strokeWidth="0.8" />
          <line x1="40" y1="0"  x2="40" y2="56" strokeWidth="0.8" />
          <line x1="64" y1="0"  x2="64" y2="56" strokeWidth="0.8" />
          <circle cx="16" cy="14" r="2.5" />
          <circle cx="40" cy="28" r="3"   />
          <circle cx="64" cy="14" r="2.5" />
          <circle cx="16" cy="42" r="2.5" />
          <circle cx="64" cy="42" r="2.5" />
        </svg>
      )

    case 'stack':
      // Database / data-stack: layered horizontal slabs
      return (
        <svg className="snap-deco" viewBox="0 0 80 56" aria-hidden="true" focusable="false">
          <ellipse cx="40" cy="12" rx="28" ry="7"  strokeWidth="1.2" fill="none" />
          <ellipse cx="40" cy="28" rx="28" ry="7"  strokeWidth="1.2" fill="none" />
          <ellipse cx="40" cy="44" rx="28" ry="7"  strokeWidth="1.2" fill="none" />
          <line x1="12" y1="12" x2="12" y2="44" />
          <line x1="68" y1="12" x2="68" y2="44" />
          <circle cx="40" cy="12" r="2.5" />
          <circle cx="40" cy="28" r="2.5" />
          <circle cx="40" cy="44" r="2.5" />
        </svg>
      )

    case 'branch':
      // Git / open-source: branching path
      return (
        <svg className="snap-deco" viewBox="0 0 80 56" aria-hidden="true" focusable="false">
          <circle cx="16" cy="44" r="3"   />
          <circle cx="16" cy="12" r="3"   />
          <circle cx="48" cy="12" r="3"   />
          <circle cx="64" cy="28" r="3"   />
          <circle cx="48" cy="44" r="2.5" />
          <line x1="16" y1="41"  x2="16" y2="15"  />
          <line x1="16" y1="18"  x2="45" y2="12"  />
          <line x1="51" y1="12"  x2="61" y2="25"  />
          <line x1="64" y1="31"  x2="51" y2="42"  />
          <line x1="16" y1="30"  x2="45" y2="44"  />
        </svg>
      )

    default:
      return null
  }
}

/* ─── Single capability card ─────────────────────────────────
 * Pointer-reactive: on mousemove we update CSS custom properties
 * --mx / --my (0–1 range) so the radial spotlight follows the cursor.
 * This uses no React state — only a ref for the DOM node — so it
 * causes zero re-renders while remaining smooth.
 * ─────────────────────────────────────────────────────────── */
function CapabilityCard({ index, label, detail, accent, decoration, delay }) {
  const cardRef = useRef(null)
  const items = detail.split(' · ')
  const accentValue = ACCENT_MAP[accent] ?? 'var(--cyan)'

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width).toFixed(4)
    const y = ((e.clientY - rect.top)  / rect.height).toFixed(4)
    el.style.setProperty('--mx', x)
    el.style.setProperty('--my', y)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    // Reset to center so the glow fades symmetrically
    el.style.setProperty('--mx', '0.5')
    el.style.setProperty('--my', '0.5')
  }, [])

  return (
    <Reveal
      className="snap-card"
      delay={delay}
      style={{
        '--card-accent': accentValue,
        '--mx': '0.5',
        '--my': '0.5',
      }}
      ref={undefined} /* Reveal manages its own ref; we attach ours to the inner wrapper */
    >
      {/*
       * Inner wrapper carries the pointer handlers and our ref.
       * Reveal's own div is the grid item / animation host.
       */}
      <div
        className="snap-card__inner"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pointer-reactive radial spotlight */}
        <div className="snap-card__spotlight" aria-hidden="true" />

        {/* Abstract SVG decoration — behind content */}
        <div className="snap-card__deco" aria-hidden="true">
          <Decoration variant={decoration} />
        </div>

        {/* ── Card content ── */}
        <div className="snap-card__body">
          {/* Header: index + accent dot */}
          <div className="snap-card__header">
            <span className="snap-card__index" aria-hidden="true">{index}</span>
            <span className="snap-card__dot" aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className="snap-card__title">{label}</h3>

          {/* Accent divider */}
          <div className="snap-card__rule" aria-hidden="true" />

          {/* Skill rows */}
          <ul className="snap-card__items" aria-label={`${label} skills`}>
            {items.map((item) => (
              <li key={item} className="snap-card__item">
                <span className="snap-card__item-bullet" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

/* ─── Section ────────────────────────────────────────────── */
export default function Snapshot() {
  return (
    <section className="snapshot" aria-labelledby="snapshot-title">
      <h2 id="snapshot-title" className="sr-only">Engineering Snapshot</h2>
      <div className="snapshot__grid">
        {SNAPSHOT.map((item, i) => (
          <CapabilityCard
            key={item.id}
            index={item.index}
            label={item.label}
            detail={item.detail}
            accent={item.accent}
            decoration={item.decoration}
            delay={(i % 3) * 0.08}
          />
        ))}
      </div>
    </section>
  )
}
