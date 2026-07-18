import { EXPERIENCE } from '../data'
import { ArrowIcon } from './Icons'
import Reveal from './Reveal'
import './Experience.css'

export default function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <Reveal className="section-head">
        <p className="eyebrow">02 · Experience</p>
        <h2 id="experience-title">Where I've been building</h2>
        <p className="section-lead">
          Open-source contribution and full-stack Python work, delivered through Git workflows,
          code reviews, and Agile collaboration.
        </p>
      </Reveal>

      <ol className="timeline">
        {EXPERIENCE.map((job, i) => (
          <Reveal as="li" className="timeline__item" key={job.org} delay={i * 0.08}>
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__card glass">
              <div className="timeline__top">
                <div>
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__org">{job.org}</p>
                  <p className="timeline__meta">{job.meta}</p>
                </div>
                <span className="timeline__period">{job.period}</span>
              </div>
              <ul className="timeline__points">
                {job.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              {job.link && (
                <a
                  className="timeline__link"
                  href={job.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {job.link.label} <ArrowIcon width="15" height="15" />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
