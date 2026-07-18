import { lazy, Suspense } from 'react'
import ConstellationCanvas from './components/ConstellationCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'

// Lazy-load below-the-fold sections to keep the initial payload light.
const Experience = lazy(() => import('./components/Experience'))
const SkillsConstellation = lazy(() => import('./components/SkillsConstellation'))
const Projects = lazy(() => import('./components/Projects'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ConstellationCanvas />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Experience />
          <SkillsConstellation />
          <Projects />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
