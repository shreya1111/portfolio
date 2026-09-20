import { useRef, useState, useEffect, useCallback } from 'react'
import { SKILL_GROUPS } from '../data'
import Reveal from './Reveal'
import './SkillsConstellation.css'

// ─── Inter-card connector lines ──────────────────────────────────────────────
// Measures card centers after layout, draws nearest-neighbour lines as a subtle
// connective tissue between categories. Lines are intentionally low-opacity so
// they read as atmospheric rather than structural.
function SkillConnectors({ gridRef, hovered }) {
  const [state, setState] = useState({ w: 0, h: 0, lines: [] })

  const measure = useCallback(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll('.sk-card'))
    if (cards.length < 2) { setState({ w: 0, h: 0, lines: [] }); return }

    const centers = cards.map((el) => ({
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
    }))

    const seen = new Set()
    const lines = []

    // Nearest-neighbour per card
    for (let i = 0; i < centers.length; i++) {
      let best = -1, bestD = Infinity
      for (let j = 0; j < centers.length; j++) {
        if (i === j) continue
        const d = Math.hypot(centers[i].x - centers[j].x, centers[i].y - centers[j].y)
        if (d < bestD) { bestD = d; best = j }
      }
      if (best > -1) {
        const key = i < best ? `${i}-${best}` : `${best}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          lines.push({ a: i, b: best, ...centers[i], x2: centers[best].x, y2: centers[best].y })
        }
      }
    }
    // Also chain consecutive so the whole grid forms one connected map
    for (let i = 0; i < centers.length - 1; i++) {
      const key = `${i}-${i + 1}`
      if (!seen.has(key)) {
        seen.add(key)
        lines.push({ a: i, b: i + 1, ...centers[i], x2: centers[i + 1].x, y2: centers[i + 1].y })
      }
    }

    setState({ w: grid.offsetWidth, h: grid.offsetHeight, lines })
  }, [gridRef])

  useEffect(() => {
    measure()
    const grid = gridRef.current
    let ro
    if (grid && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure)
      ro.observe(grid)
    }
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 420)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [measure, gridRef])

  if (!state.w) return null
  return (
    <svg
      className="sk-connectors"
      width={state.w}
      height={state.h}
      viewBox={`0 0 ${state.w} ${state.h}`}
      aria-hidden="true"
    >
      {state.lines.map((l, i) => {
        const active = hovered !== null && (l.a === hovered || l.b === hovered)
        return (
          <line
            key={i}
            className={`sk-connector${active ? ' is-active' : ''}`}
            x1={l.x}  y1={l.y}
            x2={l.x2} y2={l.y2}
            stroke={i % 2 === 0 ? 'var(--lavender)' : 'var(--cyan)'}
          />
        )
      })}
    </svg>
  )
}

// ─── Single skill category card ───────────────────────────────────────────────
function SkillCard({ group, index, onMouseEnter, onMouseLeave }) {
  const isFeatured = group.id === 'aiml'
  return (
    <Reveal
      className={`sk-card${isFeatured ? ' sk-card--featured' : ''}`}
      delay={(index % 3) * 0.07}
      style={{ '--group-color': group.color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Category header */}
      <div className="sk-card__head">
        <span className="sk-card__dot" aria-hidden="true" />
        <h3 className="sk-card__title">{group.label}</h3>
      </div>

      {/* Accent rule */}
      <div className="sk-card__rule" aria-hidden="true" />

      {/* Skill chips */}
      <ul className="sk-card__chips" aria-label={`${group.label} skills`}>
        {group.items.map((item) => (
          <li key={item} className="sk-card__chip">{item}</li>
        ))}
      </ul>
    </Reveal>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function SkillsConstellation() {
  const gridRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Reveal className="section-head">
        <p className="eyebrow">04 · Skills</p>
        <h2 id="skills-title">A connected map of what I work with</h2>
        <p className="section-lead">
          Each cluster is a domain I build in — languages, frontend, backend, data, AI/ML, MLOps,
          and tooling — wired together the way real systems are.
        </p>
      </Reveal>

      <div className="sk-grid" ref={gridRef}>
        <SkillConnectors gridRef={gridRef} hovered={hovered} />

        {SKILL_GROUPS.map((group, i) => (
          <SkillCard
            key={group.id}
            group={group}
            index={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </section>
  )
}
