import { lazy, Suspense } from 'react'
import ConstellationCanvas from './components/ConstellationCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Snapshot from './components/Snapshot'
import About from './components/About'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import BackToTop from './components/BackToTop/BackToTop'
import CommandPalette from './components/CommandPalette/CommandPalette'
import AIChat from './components/AIChat/AIChat'

// Lazy-load below-the-fold sections to keep the initial payload light.
// Order matches the required IA hierarchy:
//   Hero → Snapshot → About → Experience → Education → Skills →
//   Projects → GitHub → Certifications → Contact → Footer
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education/Education'))
const SkillsConstellation = lazy(() => import('./components/SkillsConstellation'))
const Projects = lazy(() => import('./components/Projects'))
const GitHubActivity = lazy(() => import('./components/GitHubActivity/GitHubActivity'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const RecruiterCTA = lazy(() => import('./components/RecruiterCTA/RecruiterCTA'))

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <ConstellationCanvas />
      <Nav />
      <main id="main">
        <Hero />
        <Snapshot />
        <About />
        <Suspense fallback={null}>
          {/* 02 */}
          <Experience />
          {/* 03 */}
          <Education />
          {/* 04 */}
          <SkillsConstellation />
          {/* 05 */}
          <Projects />
          {/* 06 */}
          <GitHubActivity />
          {/* 07 */}
          <Certifications />
          {/* 08 */}
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Secondary / floating UI — rendered outside <main> so they don't
          affect document flow; z-index stacking order:
          ScrollProgress (100) < BackToTop (100, bottom-left) <
          RecruiterCTA (100, bottom-right above toggle) <
          AIChat toggle (100, bottom-right) < AIChat panel (101) <
          CommandPalette (110) */}
      <CommandPalette />
      <BackToTop />
      <Suspense fallback={null}>
        <RecruiterCTA />
      </Suspense>
      <AIChat />
    </>
  )
}
