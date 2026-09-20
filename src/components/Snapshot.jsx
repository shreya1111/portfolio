import { SNAPSHOT } from '../data'
import Reveal from './Reveal'
import './Snapshot.css'

/**
 * Capability strip directly under the Hero.
 * Each card has: decorative index, accent rule, title, and detail stack.
 */
function CapabilityCard({ index, label, detail, delay }) {
  // Split the dot-separated detail string into individual items so they
  // can be rendered as separate lines rather than one long run-on string.
  const items = detail.split(' · ')

  return (
    <Reveal className="snap-card" delay={delay}>
      {/* Top row: index (decorative) + accent dot */}
      <div className="snap-card__header">
        <span className="snap-card__index" aria-hidden="true">{index}</span>
        <span className="snap-card__dot" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="snap-card__title">{label}</h3>

      {/* Accent rule */}
      <div className="snap-card__rule" aria-hidden="true" />

      {/* Skill items */}
      <ul className="snap-card__items" aria-label={`${label} skills`}>
        {items.map((item) => (
          <li key={item} className="snap-card__item">{item}</li>
        ))}
      </ul>
    </Reveal>
  )
}

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
            delay={(i % 3) * 0.07}
          />
        ))}
      </div>
    </section>
  )
}
