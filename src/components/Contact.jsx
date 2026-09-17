import { useState } from 'react'
import { PROFILE } from '../data'
import { GitHubIcon, LinkedInIcon, MailIcon, LocationIcon, ArrowIcon } from './Icons'
import Reveal from './Reveal'
import './Contact.css'

/**
 * Two-column contact section. There's no backend/email service wired up,
 * so the "form" composes a mailto: link from what's typed and hands off
 * to the person's own email client — real functionality, not a faked
 * "message sent" confirmation.
 */
export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const canSend = name.trim() && email.trim() && message.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSend) return
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <Reveal className="section-head">
        <p className="eyebrow">08 · Get in Touch</p>
        <h2 id="contact-title">
          Let's build something <em>intelligent</em> together.
        </h2>
        <p className="section-lead">
          Have an opportunity, collaboration, or interesting idea? Let's connect.
        </p>
      </Reveal>

      <div className="contact__grid">
        <Reveal className="contact__info">
          <a className="contact__info-row" href={`mailto:${PROFILE.email}`}>
            <span className="contact__info-icon">
              <MailIcon width="17" height="17" />
            </span>
            <span>{PROFILE.email}</span>
          </a>
          <a
            className="contact__info-row"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact__info-icon">
              <LinkedInIcon width="17" height="17" />
            </span>
            <span>LinkedIn</span>
          </a>
          <a
            className="contact__info-row"
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact__info-icon">
              <GitHubIcon width="17" height="17" />
            </span>
            <span>GitHub</span>
          </a>
          <div className="contact__info-row contact__info-row--static">
            <span className="contact__info-icon">
              <LocationIcon width="17" height="17" />
            </span>
            <span>{PROFILE.location}</span>
          </div>
        </Reveal>

        <Reveal className="contact__form-wrap" delay={0.08}>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary contact__submit" disabled={!canSend}>
              Send Message <ArrowIcon width="15" height="15" />
            </button>
            <p className="contact__form-note">Opens your email client with this message pre-filled.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
