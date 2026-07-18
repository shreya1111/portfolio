import { PROFILE } from '../data'
import { GitHubIcon, LinkedInIcon, ArrowIcon, MailIcon } from './Icons'
import './Hero.css'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <p className="eyebrow hero__eyebrow stagger" style={{ '--i': 0 }}>
          AI/ML ENGINEER · SOFTWARE ENGINEER · PYTHON DEVELOPER
        </p>

        <h1 className="display hero__title stagger" style={{ '--i': 1 }}>
          Building <em>intelligent systems</em>, grounded in real code.
        </h1>

        <p className="hero__sub stagger" style={{ '--i': 2 }}>
          I'm {PROFILE.name}, a software and AI/ML engineer working across Python, DSA, OOP, REST
          APIs, Generative AI, and RAG systems. I build scalable backend applications and AI-enabled
          automation workflows using modern SDLC and Agile practices.
        </p>

        <div className="hero__cta stagger" style={{ '--i': 3 }}>
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowIcon width="16" height="16" />
          </a>
          <a href="#contact" className="btn btn-ghost">
            <MailIcon width="16" height="16" /> Get in Touch
          </a>
        </div>

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
