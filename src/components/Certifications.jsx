import { CERTIFICATIONS } from '../data'
import { CheckIcon, ArrowIcon } from './Icons'
import Reveal from './Reveal'
import './Certifications.css'

export default function Certifications() {
  return (
    <section className="section" id="certifications" aria-labelledby="certifications-title">
      <Reveal className="section-head">
        <p className="eyebrow">05 · Certifications</p>
        <h2 id="certifications-title">Credentials & continuous learning</h2>
        <p className="section-lead">
          Specializations across machine learning, deep learning, NLP, and applied AI engineering.
        </p>
      </Reveal>

      <div className="certs__grid">
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal
            as="a"
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="certs__badge glass"
            key={cert.name}
            delay={(i % 4) * 0.06}
            aria-label={`${cert.name} — opens in a new tab`}
          >
            <span className="certs__check" aria-hidden="true">
              <CheckIcon width="16" height="16" />
            </span>
            <div className="certs__text">
              <h3 className="certs__name">{cert.name}</h3>
              <p className="certs__issuer">{cert.issuer}</p>
            </div>
            <span className="certs__arrow" aria-hidden="true">
              <ArrowIcon width="16" height="16" />
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
