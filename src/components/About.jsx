import { PROFILE } from '../data'
import { LocationIcon } from './Icons'
import Reveal from './Reveal'
import './About.css'

const CURRENT_FOCUS = [
  'Python',
  'AI / ML',
  'Data Science',
  'Generative AI',
  'Agentic AI',
  'Open Source',
]

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <Reveal className="section-head">
        <p className="eyebrow">01 · About</p>
        <h2 id="about-title">
          Building intelligent solutions at the intersection of AI, data, and software engineering.
        </h2>
      </Reveal>

      <div className="about__grid">
        <Reveal className="about__bio">
          <p>
            I'm a software engineer and AI/ML developer who enjoys turning fuzzy problems into
            reliable systems. My core toolkit spans Python, data structures and algorithms, OOP,
            and REST API design, with a growing focus on Generative AI and
            retrieval-augmented generation.
          </p>
          <p>
            I build scalable backend applications and AI-enabled automation workflows through
            hands-on learning, open-source contribution, and real-world problem solving. I was
            selected as a Contributor for GirlScript Summer of Code (GSSoC) 2026 under the Open
            Source and AI/Agents tracks, working alongside mentors and developers on
            community-driven projects.
          </p>
          <p className="about__loc">
            <LocationIcon width="18" height="18" aria-hidden="true" /> {PROFILE.location}
          </p>
        </Reveal>

        <Reveal className="about__card glass" delay={0.1}>
          <p className="eyebrow">Current Focus</p>
          <ul className="about__focus" aria-label="Current focus areas">
            {CURRENT_FOCUS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
