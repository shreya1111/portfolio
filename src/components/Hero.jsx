import { PROFILE } from '../data'
import { GitHubIcon, LinkedInIcon, ArrowIcon, MailIcon } from './Icons'
import ResumeViewer from './ResumeViewer/ResumeViewer'
import './Hero.css'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <p className="eyebrow hero__eyebrow stagger" style={{ '--i': 0 }}>
          AI/ML ENGINEER · SOFTWARE ENGINEER · PYTHON DEVELOPER
        </p>

        <h1 className="display hero__title stagger" style={{ '--i': 1 }}>
          Building <em>intelligent solutions</em> with AI &amp; Data Science.
        </h1>

        <p className="hero__sub stagger" style={{ '--i': 2 }}>
          I'm {PROFILE.name}, a software and AI/ML engineer working across Python, Data
          Structures &amp; Algorithms, SQL, and REST API design — with a growing focus on
          Generative AI, Agentic AI, and retrieval-augmented generation. I build scalable
          backend applications and AI-enabled automation through hands-on learning, open-source
          contribution, and real-world problem solving.
        </p>

        <div className="hero__cta stagger" style={{ '--i': 3 }}>
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowIcon width="16" height="16" />
          </a>
          <ResumeViewer />
          <a href="#contact" className="btn btn-ghost">
            <MailIcon width="16" height="16" /> Get in Touch
          </a>
        </div>

        <p className="hero__stackline stagger" style={{ '--i': 3.5 }}>
          Python · RAG · Agentic AI · FastAPI · React
        </p>

        <div className="hero__socials stagger" style={{ '--i': 4 }}>
          <a
            className="icon-btn"
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <GitHubIcon />
          </a>
          <a
            className="icon-btn"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon />
          </a>
          <span className="hero__loc">{PROFILE.location}</span>
        </div>
      </div>

      <a href="#about" className="hero__scroll stagger" style={{ '--i': 5 }} aria-label="Scroll to about">
        <span className="hero__scroll-dot" />
        <span className="hero__scroll-label">scroll</span>
      </a>
    </header>
  )
}
