import { useEffect, useState } from 'react'
import { ArrowIcon } from '../Icons'
import './RecruiterCTA.css'

export default function RecruiterCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Appear once the visitor has scrolled well past the hero.
      setVisible(window.scrollY > window.innerHeight * 1.1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type="button"
      className="recruiter-cta glass"
      onClick={scrollToContact}
      aria-label="Scroll to contact section"
    >
      Let's Talk <ArrowIcon width="14" height="14" aria-hidden="true" />
    </button>
  )
}
