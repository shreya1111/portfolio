import { PROJECTS } from '../data'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import './Projects.css'

export default function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <Reveal className="section-head">
        <p className="eyebrow">04 · Projects</p>
        <h2 id="projects-title">Systems I've shipped</h2>
        <p className="section-lead">
          RAG platforms, medical AI assistants, and intelligent query systems — built end to end
          with production concerns in mind.
        </p>
      </Reveal>

      <div className="projects__grid">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.name} delay={(i % 2) * 0.08}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
