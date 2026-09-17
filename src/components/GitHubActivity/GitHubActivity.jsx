import { useEffect, useMemo, useState } from 'react'
import { PROFILE, FEATURED_PROJECT, PROJECTS } from '../../data'
import { GitHubIcon, ArrowIcon, StarIcon, ForkIcon } from '../Icons'
import Reveal from '../Reveal'
import './GitHubActivity.css'

const USERNAME = PROFILE.githubUsername

// Portfolio-facing tagline shown instead of the raw GitHub bio. This only
// changes how the profile is *presented* here — it never touches the
// actual GitHub account.
const PORTFOLIO_TAGLINE = 'AI/ML Engineer · Generative AI · Python · Backend · Open Source'

// Curation order — a portfolio decision, not GitHub's "last updated" sort.
// If a name isn't found in the real fetched repos, it's simply skipped;
// nothing is invented to fill its slot.
const EKOS_NAME = 'EKOS-Enterprise-Knowledge-Operating-System'
const MEDNEXUS_NAME = 'MedNexus-AI'
const AEGIS_NAME = 'Aegis-Research-OS'
const UNIQUERY_NAME = 'university-query-system'
const DSA_NAME = 'DSA'
const MORE_PRIORITY = []
// Repos explicitly excluded from the "More on GitHub" list, by name
// (case-insensitive). Excluded, not just deprioritized — never shown.
// Their real GitHub repositories are untouched; this only affects display.
const EXCLUDED_REPOS = [
  'Ultimate-AI-Recruiter',
  'Movie-Recommendation-System',
  'portfolio',
  'Netflix_sql_Project',
  'shreya1111',
]

// Already-vetted portfolio project data, reused only as a fallback source
// of real technologies/description when a repo has no GitHub topics of
// its own — never invented for repos with no matching project entry.
const PROJECT_BY_REPO = {
  [EKOS_NAME.toLowerCase()]: FEATURED_PROJECT,
  [MEDNEXUS_NAME.toLowerCase()]: PROJECTS.find((p) => /mednexus/i.test(p.name)),
  [AEGIS_NAME.toLowerCase()]: PROJECTS.find((p) => /aegis/i.test(p.name)),
  [UNIQUERY_NAME.toLowerCase()]: PROJECTS.find((p) => /uniquery|university/i.test(p.name)),
}

function findRepo(repos, name) {
  return repos.find((r) => r.name.toLowerCase() === name.toLowerCase()) || null
}

function pluralize(n, singular, plural) {
  return `${n} ${n === 1 ? singular : plural}`
}

function formatUpdated(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return `Updated ${d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`
}

function techFor(repo) {
  if (repo?.topics?.length) return repo.topics
  const project = PROJECT_BY_REPO[repo?.name?.toLowerCase()]
  return project?.stack || []
}

function descriptionFor(repo) {
  if (repo?.description) return repo.description
  const project = PROJECT_BY_REPO[repo?.name?.toLowerCase()]
  return project?.tagline || project?.points?.[0] || null
}

function RepoMeta({ repo }) {
  const updated = formatUpdated(repo.updated_at)
  return (
    <div className="gh-meta">
      {repo.language && <span className="gh-meta__lang">{repo.language}</span>}
      <span className="gh-meta__stat">
        <StarIcon width="12" height="12" /> {repo.stargazers_count}
      </span>
      {typeof repo.forks_count === 'number' && repo.forks_count > 0 && (
        <span className="gh-meta__stat">
          <ForkIcon width="12" height="12" /> {repo.forks_count}
        </span>
      )}
      {updated && <span className="gh-meta__updated">{updated}</span>}
    </div>
  )
}

/** Hero treatment for EKOS — 2x visual area, with a compact pipeline visual. */
function HeroCard({ repo }) {
  const tech = techFor(repo)
  const desc = descriptionFor(repo)
  return (
    <a
      className="gh-hero"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Explore ${repo.name} on GitHub`}
    >
      <div className="gh-hero__content">
        <span className="gh-hero__index">01</span>
        <h3 className="gh-hero__name">
          EKOS
          <span className="gh-hero__subname">Enterprise Knowledge Operating System</span>
        </h3>
        {desc && <p className="gh-hero__desc">{desc}</p>}
        {tech.length > 0 && (
          <ul className="gh-hero__tech">
            {tech.slice(0, 7).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        <RepoMeta repo={repo} />
        <span className="gh-hero__cta">
          Explore repository <ArrowIcon width="14" height="14" />
        </span>
      </div>

      {FEATURED_PROJECT.pipeline && (
        <div className="gh-hero__pipeline" aria-hidden="true">
          {FEATURED_PROJECT.pipeline.map((stage, i) => (
            <div className="gh-hero__stage" key={stage}>
              <span className="gh-hero__stage-dot" />
              <span className="gh-hero__stage-label">{stage}</span>
              {i < FEATURED_PROJECT.pipeline.length - 1 && <span className="gh-hero__stage-line" />}
            </div>
          ))}
        </div>
      )}
    </a>
  )
}

/** Medium-weight card for secondary featured projects (MedNexus, Aegis, UniQuery). */
function SecondaryCard({ repo, index, displayName }) {
  const tech = techFor(repo)
  const desc = descriptionFor(repo)
  return (
    <a
      className="gh-secondary"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${repo.name} on GitHub`}
    >
      <div className="gh-secondary__top">
        <span className="gh-secondary__index">{index}</span>
        <span className="gh-secondary__name">{displayName || repo.name}</span>
      </div>
      {desc && <p className="gh-secondary__desc">{desc}</p>}
      {tech.length > 0 && (
        <ul className="gh-secondary__tech">
          {tech.slice(0, 4).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      <RepoMeta repo={repo} />
      <span className="gh-secondary__cta">
        View Repository <ArrowIcon width="12" height="12" />
      </span>
    </a>
  )
}

/** Flat, compact horizontal row for "More on GitHub" and the DSA problem-solving entry. */
function CompactRow({ repo, tag }) {
  const updated = formatUpdated(repo.updated_at)
  return (
    <a className="gh-row" href={repo.html_url} target="_blank" rel="noopener noreferrer">
      <div className="gh-row__main">
        {tag && <span className="gh-row__tag">{tag}</span>}
        <p className="gh-row__name">{repo.name}</p>
        {repo.description && <p className="gh-row__desc">{repo.description}</p>}
        <div className="gh-row__meta">
          {repo.language && <span>{repo.language}</span>}
          {repo.fork && <span className="gh-row__forked">Forked repository</span>}
          {updated && <span>{updated}</span>}
        </div>
      </div>
      <span className="gh-row__cta">
        View <ArrowIcon width="12" height="12" />
      </span>
    </a>
  )
}

export default function GitHubActivity() {
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [languageBytes, setLanguageBytes] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`),
        ])
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const userData = await userRes.json()
        const reposData = await reposRes.json()
        const allRepos = Array.isArray(reposData) ? reposData : []

        if (cancelled) return
        setProfile(userData)
        setRepos(allRepos)
        setStatus('ready')

        // Best-effort real language breakdown across the repos actually
        // shown on the page (capped to limit API calls). Omitted entirely
        // if calls fail — never replaced with invented percentages.
        const forLanguages = allRepos.filter((r) => !r.fork).slice(0, 12)
        try {
          const results = await Promise.all(
            forLanguages.map((r) =>
              fetch(`https://api.github.com/repos/${r.full_name}/languages`).then((res) =>
                res.ok ? res.json() : null
              )
            )
          )
          if (cancelled) return
          const totals = {}
          let any = false
          for (const langs of results) {
            if (!langs) continue
            any = true
            for (const [lang, bytes] of Object.entries(langs)) {
              totals[lang] = (totals[lang] || 0) + bytes
            }
          }
          setLanguageBytes(any ? totals : null)
        } catch {
          if (!cancelled) setLanguageBytes(null)
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const languages = useMemo(() => {
    if (!languageBytes) return []
    const total = Object.values(languageBytes).reduce((sum, v) => sum + v, 0)
    if (total === 0) return []
    return Object.entries(languageBytes)
      .map(([name, bytes]) => ({ name, pct: (bytes / total) * 100 }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5)
  }, [languageBytes])

  const curated = useMemo(() => {
    const ekos = findRepo(repos, EKOS_NAME)
    const mednexus = findRepo(repos, MEDNEXUS_NAME)
    const aegis = findRepo(repos, AEGIS_NAME)
    const uniquery = findRepo(repos, UNIQUERY_NAME)
    const dsa = findRepo(repos, DSA_NAME)

    const featuredSet = new Set([ekos, mednexus, aegis, uniquery, dsa].filter(Boolean).map((r) => r.id))
    const excludedNames = new Set(EXCLUDED_REPOS.map((n) => n.toLowerCase()))
    const rest = repos.filter((r) => !featuredSet.has(r.id) && !excludedNames.has(r.name.toLowerCase()))

    const orderedMore = []
    for (const name of MORE_PRIORITY) {
      const match = rest.find((r) => r.name.toLowerCase() === name.toLowerCase())
      if (match) orderedMore.push(match)
    }
    for (const r of rest) {
      if (!orderedMore.includes(r)) orderedMore.push(r)
    }

    return { ekos, mednexus, aegis, uniquery, dsa, more: orderedMore }
  }, [repos])

  const hasFeatured = curated.ekos || curated.mednexus || curated.aegis || curated.uniquery

  return (
    <section className="section" id="github-activity" aria-labelledby="github-activity-title">
      <Reveal className="section-head">
        <p className="eyebrow">06 · GitHub</p>
        <h2 id="github-activity-title">Open source &amp; engineering work</h2>
        <p className="section-lead">Selected repositories from my public GitHub — RAG platforms, AI assistants, and problem-solving practice.</p>
      </Reveal>

      {status === 'error' && (
        <Reveal className="gh-fallback">
          <GitHubIcon width="22" height="22" />
          <p>GitHub data is temporarily unavailable.</p>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Visit GitHub Profile <ArrowIcon width="15" height="15" />
          </a>
        </Reveal>
      )}

      {status === 'loading' && (
        <div aria-live="polite" aria-busy="true">
          <span className="sr-only">Loading GitHub activity…</span>
          <div className="gh-skeleton gh-skeleton--profile" />
          <div className="gh-skeleton-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="gh-skeleton" key={i} />
            ))}
          </div>
        </div>
      )}

      {status === 'ready' && profile && (
        <Reveal>
          <div className="gh-profile">
            <img
              src={profile.avatar_url}
              alt=""
              className="gh-profile__avatar"
              width="52"
              height="52"
              loading="lazy"
            />
            <div className="gh-profile__id">
              <p className="gh-profile__name">{profile.name || profile.login}</p>
              <p className="gh-profile__tagline">{PORTFOLIO_TAGLINE}</p>
            </div>
            <div className="gh-profile__stats">
              <span className="gh-profile__stat-primary">
                {pluralize(profile.public_repos, 'Repository', 'Repositories')}
              </span>
              <span className="gh-profile__stat-secondary">
                {pluralize(profile.followers, 'Follower', 'Followers')}
              </span>
            </div>
            <a
              className="btn btn-ghost gh-profile__link"
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Profile <ArrowIcon width="14" height="14" />
            </a>
          </div>

          {hasFeatured && (
            <div className="gh-featured">
              <p className="gh-section-label">Featured Engineering</p>

              {curated.ekos && <HeroCard repo={curated.ekos} />}

              {(curated.mednexus || curated.aegis) && (
                <div className="gh-secondary-row">
                  {curated.mednexus && (
                    <SecondaryCard repo={curated.mednexus} index="02" displayName="MedNexus-AI" />
                  )}
                  {curated.aegis && <SecondaryCard repo={curated.aegis} index="03" displayName="Aegis-Research-OS" />}
                </div>
              )}

              {curated.uniquery && (
                <SecondaryCard
                  repo={curated.uniquery}
                  index="04"
                  displayName="university-query-system"
                />
              )}
            </div>
          )}

          {curated.dsa && (
            <div className="gh-problem-solving">
              <p className="gh-section-label">Problem Solving</p>
              <CompactRow repo={curated.dsa} />
            </div>
          )}

          {curated.more.length > 0 && (
            <div className="gh-more">
              <p className="gh-section-label">More on GitHub</p>
              <div className="gh-row-list">
                {curated.more.map((repo) => (
                  <CompactRow repo={repo} key={repo.id} />
                ))}
              </div>
            </div>
          )}

          {!hasFeatured && !curated.dsa && curated.more.length === 0 && (
            <p className="gh-empty">No public repositories to show yet.</p>
          )}

          <div className="gh-panels">
            {languages.length > 0 && (
              <div className="gh-panel">
                <p className="gh-panel__title">Languages</p>
                <ul className="gh-lang-list">
                  {languages.map((lang) => (
                    <li key={lang.name}>
                      <span className="gh-lang-list__name">{lang.name}</span>
                      <span className="gh-lang-list__track">
                        <span className="gh-lang-list__fill" style={{ width: `${lang.pct}%` }} />
                      </span>
                      <span className="gh-lang-list__pct">{lang.pct.toFixed(0)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="gh-panel gh-panel--flat">
              <p className="gh-panel__title">GitHub Activity</p>
              <p className="gh-panel__text">Explore my latest repositories and activity.</p>
              <a
                className="gh-panel__link"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub <ArrowIcon width="13" height="13" />
              </a>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  )
}
