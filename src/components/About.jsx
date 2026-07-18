import { EDUCATION, PROFILE } from '../data'
import { LocationIcon } from './Icons'
import Reveal from './Reveal'
import './About.css'

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <Reveal className="section-head">
        <p className="eyebrow">01 · About</p>
        <h2 id="about-title">
          Engineering intelligence with intent
        </h2>
      </Reveal>

      <div className="about__grid">
        <Reveal className="about__bio">
          <p>
            I'm a software engineer and AI/ML developer who enjoys turning fuzzy problems into
            reliable systems. My core toolkit spans Python, data structures and algorithms, OOP,
            and REST API design, with a growing focus on Generative AI and retrieval-augmented
            generation.
          </p>
          <p>
            I build scalable backend applications and AI-enabled automation workflows, leaning on
            modern SDLC and Agile practices to keep code maintainable and shippable. Right now I'm
            looking for software engineering roles at AI-first, cloud-driven technology
            organizations where I can keep learning and building at depth.
          </p>
          <p className="about__loc">
            <LocationIcon width="18" height="18" /> {PROFILE.location}
          </p>
        </Reveal>

        <Reveal className="about__card glass" delay={0.1}>
          <p className="eyebrow">Education</p>
          <h3 className="about__degree">{EDUCATION.degree}</h3>
          <p className="about__school">{EDUCATION.school}</p>
          <div className="about__stats">
            <div>
              <span className="about__stat-label">Timeline</span>
              <span className="about__stat-value">{EDUCATION.timeline}</span>
            </div>
            <div>
              <span className="about__stat-label">CGPA</span>
              <span className="about__stat-value">{EDUCATION.cgpa}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
