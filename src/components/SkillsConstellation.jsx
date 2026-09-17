import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { SKILL_GROUPS } from '../data'
import Reveal from './Reveal'
import './SkillsConstellation.css'

// Deterministic pseudo-random so node positions stay stable across renders.
function seeded(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function GroupNodeMap({ group }) {
  // Small per-card constellation behind the chips: one node per skill.
  const { nodes, links } = useMemo(() => {
    const rand = seeded(group.id.length * 97 + group.items.length * 13 + 7)
    const nodes = group.items.map(() => ({
      x: 12 + rand() * 76,
      y: 14 + rand() * 72,
    }))
    const links = []
    for (let i = 0; i < nodes.length; i++) {
      let best = -1
      let bestD = Infinity
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
        if (d < bestD) {
          bestD = d
          best = j
        }
      }
      if (best > -1) links.push([i, best])
    }
    return { nodes, links }
  }, [group])

  return (
    <svg className="skills__map" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={group.color}
          strokeWidth="0.4"
          strokeOpacity="0.35"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="1.1" fill={group.color} fillOpacity="0.7" />
      ))}
    </svg>
  )
}

export default function SkillsConstellation() {
  const gridRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [lines, setLines] = useState([])
  const [hovered, setHovered] = useState(null)

  // Measure card centers (layout positions, unaffected by reveal transforms)
  // and connect each card to its nearest neighbour — a subtle connected map
  // echoing the hero's neural/star-map lines.
  const measure = useCallback(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll('.skills__card'))
    if (cards.length < 2) {
      setLines([])
      return
    }
    const centers = cards.map((el) => ({
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
    }))

    const seen = new Set()
    const next = []
    for (let i = 0; i < centers.length; i++) {
      let best = -1
      let bestD = Infinity
      for (let j = 0; j < centers.length; j++) {
        if (i === j) continue
        const d = Math.hypot(centers[i].x - centers[j].x, centers[i].y - centers[j].y)
        if (d < bestD) {
          bestD = d
          best = j
        }
      }
      if (best > -1) {
        const key = i < best ? `${i}-${best}` : `${best}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          next.push({ a: i, b: best, ...centersToLine(centers[i], centers[best]) })
        }
      }
    }
    // Also chain consecutive cards so the whole grid reads as one connected map.
    for (let i = 0; i < centers.length - 1; i++) {
      const key = `${i}-${i + 1}`
      if (!seen.has(key)) {
        seen.add(key)
        next.push({ a: i, b: i + 1, ...centersToLine(centers[i], centers[i + 1]) })
      }
    }

    setSize({ w: grid.offsetWidth, h: grid.offsetHeight })
    setLines(next)
  }, [])

  useEffect(() => {
    measure()
    const grid = gridRef.current
    let ro
    if (grid && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure())
      ro.observe(grid)
    }
    window.addEventListener('resize', measure)
    // Re-measure once fonts settle / reveals complete.
    const t = setTimeout(measure, 400)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [measure])

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

      <div className="skills__grid" ref={gridRef}>
        {/* Connective tissue between category cards */}
        {size.w > 0 && (
          <svg
            className="skills__connectors"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
            aria-hidden="true"
          >
            {lines.map((l, i) => {
              const active = hovered !== null && (l.a === hovered || l.b === hovered)
              return (
                <line
                  key={i}
                  className={`skills__connector ${active ? 'is-active' : ''}`}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke={i % 2 === 0 ? 'var(--lavender)' : 'var(--cyan)'}
                />
              )
            })}
          </svg>
        )}

        {SKILL_GROUPS.map((group, i) => (
          <Reveal
            className={`skills__card glass ${group.id === 'aiml' ? 'skills__card--wide' : ''}`}
            key={group.id}
            delay={(i % 3) * 0.08}
            style={{ '--group-color': group.color }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <GroupNodeMap group={group} />
            <div className="skills__card-body">
              <div className="skills__card-head">
                <span className="skills__dot" aria-hidden="true" />
                <h3>{group.label}</h3>
              </div>
              <ul className="skills__chips">
                {group.items.map((item) => (
                  <li className="skills__chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function centersToLine(a, b) {
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
}
