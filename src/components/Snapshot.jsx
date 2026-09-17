import { SNAPSHOT } from '../data'
import Reveal from './Reveal'
import './Snapshot.css'

/**
 * Compact capability strip directly under the Hero. Cards use capability
 * labels rather than invented metrics — see data.js SNAPSHOT.
 */
export default function Snapshot() {
  return (
    <section className="snapshot" aria-labelledby="snapshot-title">
      <h2 id="snapshot-title" className="sr-only">
        Engineering Snapshot
      </h2>
      <div className="snapshot__grid">
        {SNAPSHOT.map((item, i) => (
          <Reveal className="snapshot__card glass" key={item.id} delay={(i % 3) * 0.06}>
            <p className="snapshot__label">{item.label}</p>
            <p className="snapshot__detail">{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
