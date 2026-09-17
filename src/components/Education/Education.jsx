import { EDUCATION } from '../../data'
import Reveal from '../Reveal'
import './Education.css'

/**
 * Standalone Education section — extracted from About so it gets its own
 * scroll anchor, nav entry, and section heading. B.Tech entry is rendered
 * as the primary (larger) node; school entries as secondary.
 */
export default function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <Reveal className="section-head">
        <p className="eyebrow">03 · Education</p>
        <h2 id="education-title">Academic background</h2>
      </Reveal>

      <div className="edu-timeline-wrap">
        <ol className="edu-timeline">
          {EDUCATION.map((edu, i) => (
            <Reveal
              as="li"
              className={`edu-timeline__item ${edu.level === 'degree' ? 'edu-timeline__item--primary' : ''}`}
              key={edu.id}
              delay={i * 0.08}
            >
              <span className="edu-timeline__index">{String(i + 1).padStart(2, '0')}</span>
              <span
                className={`edu-timeline__node ${edu.level === 'degree' ? 'edu-timeline__node--primary' : ''}`}
                aria-hidden="true"
              />
              <div className="edu-timeline__content">
                <h3 className="edu-timeline__degree">{edu.degree}</h3>
                <p className="edu-timeline__school">{edu.school}</p>
                {edu.board && <p className="edu-timeline__board">{edu.board}</p>}
                {edu.timeline && <p className="edu-timeline__dates">{edu.timeline}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
