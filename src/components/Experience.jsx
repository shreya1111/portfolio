import { EXPERIENCE } from '../data'
import { ArrowIcon, LocationIcon } from './Icons'
import Reveal from './Reveal'
import './Experience.css'

// Capability labels only — no invented counts. Mirrors the roles/skills
// actually reflected across the Experience entries above.
const EXPERIENCE_SNAPSHOT = [
  'AI Engineering',
  'Machine Learning',
  'Generative AI',
  'Open Source',
  'Backend Development',
  'Python Development',
]

export default function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <Reveal className="section-head">
        <p className="eyebrow">02 · Experience</p>
        <h2 id="experience-title">Where I've been building</h2>
        <p className="section-lead">
          AI/ML internships and open-source contribution, delivered through hands-on
          engineering, Git workflows, and collaboration with mentors and teams.
        </p>
      </Reveal>

      <Reveal className="exp-snapshot" delay={0.05}>
        {EXPERIENCE_SNAPSHOT.map((label) => (
          <span className="exp-snapshot__chip" key={label}>
            {label}
          </span>
        ))}
      </Reveal>

      <ol className="timeline">
        {EXPERIENCE.map((job, i) => (
          <Reveal as="li" className="timeline__item" key={job.id} delay={i * 0.08}>
            <span
              className={`timeline__dot ${job.status === 'current' ? 'timeline__dot--current' : ''}`}
              aria-hidden="true"
            />
            <div className={`timeline__card glass ${job.status === 'current' ? 'timeline__card--current' : ''}`}>
              <div className="timeline__top">
                <div>
                  {job.badge && (
                    <span className={`timeline__badge ${job.status === 'current' ? 'timeline__badge--current' : ''}`}>
                      {job.badge}
                    </span>
                  )}
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__org">{job.org}</p>
                  {job.location && (
                    <p className="timeline__meta">
                      <LocationIcon width="13" height="13" /> {job.location}
                    </p>
                  )}
                </div>
                <span className="timeline__period">{job.period}</span>
              </div>

              <ul className="timeline__points">
                {job.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              {job.technologies && (
                <ul className="timeline__tech">
                  {job.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}

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
