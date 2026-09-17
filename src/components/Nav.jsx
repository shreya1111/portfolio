import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS, PROFILE, RESUME_URL } from '../data'
import { GitHubIcon, LinkedInIcon } from './Icons'
import './Nav.css'

const resumeHref = RESUME_URL || PROFILE.github
const SECTION_IDS = NAV_LINKS.filter((l) => !l.isResume).map((l) => l.href.slice(1))

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active-section indicator. Some section ids are nested inside another
  // section's DOM (e.g. #education sits inside #about), so this can't
  // just walk sections in top-to-bottom order and take the last one whose
  // top has crossed the trigger line — that lets a nested section (whose
  // top, being higher up the page, crosses first) keep "winning" even
  // after the user has scrolled well past it into the next real section.
  // Instead: on every scroll frame, find every section whose own bounding
  // box currently contains the trigger line, and pick the smallest one.
  // That's always the most specific section actually on screen at the
  // trigger line — correct whether or not sections are nested.
  useEffect(() => {
    let sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return
    // Sort by actual document position for the above/below fallback pass.
    sections = sections.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)

    let ticking = false

    const computeActive = () => {
      ticking = false
      const navHeight = navRef.current ? navRef.current.offsetHeight : 0
      const triggerLine = navHeight + 24 // just under the fixed navbar

      let best = null
      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= triggerLine && rect.bottom > triggerLine) {
          if (!best || rect.height < best.height) {
            best = { id: el.id, height: rect.height }
          }
        }
      }

      let current = best ? best.id : null

      if (!current) {
        // Trigger line isn't inside any section (e.g. still above the
        // first one). Fall back to the closest section above the line.
        for (const el of sections) {
          if (el.getBoundingClientRect().top - triggerLine <= 0) {
            current = el.id
          } else {
            break
          }
        }
      }

      // Only snap to first section once it has actually crossed the trigger
      // line — not on initial load while the user is still in the hero.
      if (!current) {
        const firstRect = sections[0].getBoundingClientRect()
        if (firstRect.top < triggerLine) current = sections[0].id
      }

      // Near the bottom of the page, the last section may never fully
      // reach the trigger line (e.g. a short Contact section) — force it
      // active once the page is essentially fully scrolled.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (scrolledToBottom) current = sections[sections.length - 1].id

      setActiveId(current)
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(computeActive)
    }

    computeActive()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)
  // Instant feedback on click, ahead of the scroll-computed value settling
  // once the (smooth) scroll finishes.
  const goTo = (id) => () => setActiveId(id)

  return (
    <nav ref={navRef} className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Primary">
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={closeMenu}>
          <span className="nav__mark" aria-hidden="true">✦</span>
          <span className="nav__name">Shreya Srivastava</span>
        </a>

        <ul className="nav__links">
          {NAV_LINKS.map((link) =>
            link.isResume ? (
              <li key={link.href}>
                <a href={resumeHref} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={goTo(link.href.slice(1))}
                  aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
                  className={activeId === link.href.slice(1) ? 'is-active' : ''}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        <div className="nav__socials">
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

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`nav__mobile ${open ? 'is-open' : ''}`}>
        <ul>
          {NAV_LINKS.map((link) =>
            link.isResume ? (
              <li key={link.href}>
                <a href={resumeHref} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    goTo(link.href.slice(1))()
                    closeMenu()
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>
        <div className="nav__mobile-socials">
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
      </div>
    </nav>
  )
}
