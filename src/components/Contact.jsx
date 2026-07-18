import { PROFILE } from '../data'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import Reveal from './Reveal'
import './Contact.css'

export default function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact__card glass">
        <p className="eyebrow">06 · Contact</p>
        <h2 id="contact-title" className="display contact__title">
          Let's build something <em>intelligent</em> together.
        </h2>
        <p className="contact__lead">
          I'm open to software engineering roles at AI-first, cloud-driven organizations. Reach out
          and let's talk.
        </p>

        <div className="contact__actions">
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
            <MailIcon width="16" height="16" /> {PROFILE.email}
          </a>
        </div>

        <div className="contact__socials">
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
        </div>
      </Reveal>
    </section>
  )
}
