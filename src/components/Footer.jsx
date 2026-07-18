import { PROFILE } from '../data'
import { GitHubIcon, LinkedInIcon } from './Icons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">© 2026 {PROFILE.name}</p>
        <p className="footer__credit">
          Designed & built with React · dreamy glassmorphism, hand-coded.
        </p>
        <div className="footer__socials">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <GitHubIcon width="18" height="18" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon width="18" height="18" />
          </a>
        </div>
      </div>
    </footer>
  )
}
