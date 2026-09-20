// ============================================================
// Portfolio Assistant — local knowledge-based response engine
// ============================================================
// This module is intentionally framework-free and has no dependency on
// React. It reads only from src/data.js (the single source of truth for
// resume content) and never fabricates information.
//
// Pipeline:
//   User Query -> normalizeQuery -> matchIntent -> buildAnswer -> Chat UI
//
// To connect a real LLM later: keep `getAssistantResponse` as the public
// entry point, and inside it, first attempt a call to your backend/LLM
// proxy (never call an LLM API directly from the client with a secret
// key), falling back to `getLocalAnswer` below if that call fails or is
// not configured. Nothing else in the UI needs to change.

import {
  PROFILE,
  EDUCATION,
  EXPERIENCE,
  SKILL_GROUPS,
  FEATURED_PROJECT,
  PROJECTS,
  CERTIFICATIONS,
  CERTIFICATION_CATEGORIES,
  RESUME_URL,
} from '../data'

/** Lowercases, strips punctuation, collapses whitespace. */
function normalizeQuery(raw) {
  return raw
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const ALL_PROJECTS = [FEATURED_PROJECT, ...PROJECTS]

/** Finds a project whose name (or a distinctive word of it) appears in the query. */
function findProjectMatch(query) {
  for (const project of ALL_PROJECTS) {
    const nameWords = project.name
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2)

    if (query.includes(project.name.toLowerCase())) return project
    if (nameWords.some((w) => query.includes(w))) return project
  }
  return null
}

function findSkillGroupMatch(query) {
  return SKILL_GROUPS.find((group) => {
    if (query.includes(group.label.toLowerCase())) return true
    return group.items.some((item) => query.includes(item.toLowerCase()))
  })
}

// Distinctive keyword(s) per certification — deliberately excludes generic
// words like "certificate", "professional", "developer", "specialization"
// so a certification only matches on a genuinely distinctive mention.
const CERT_KEYWORDS = {
  rag: ['rag', 'retrieval augmented generation', 'retrieval-augmented generation'],
  'genai-swe': ['generative ai for software development'],
  'tensorflow-dev': ['tensorflow'],
  'ml-specialization': ['machine learning specialization'],
  'dl-specialization': ['deep learning specialization'],
  'nlp-specialization': ['natural language processing specialization', 'nlp specialization'],
  'pytorch-dl': ['pytorch'],
  'ai-medicine': ['ai for medicine'],
  'ai-good': ['ai for good'],
  'math-ml': ['mathematics for machine learning', 'math for ml and data science'],
  'oracle-weblogic': ['oracle', 'weblogic'],
  'forage-genai-analytics': ['forage'],
  'cloudinary-media-iq': ['cloudinary', 'media iq'],
  'srdt-fullstack-python': ['srdt training', 'full stack python training'],
}

/** Finds a certification whose name or a distinctive keyword is directly mentioned. */
function findCertificationMatch(query) {
  for (const cert of CERTIFICATIONS) {
    const keywords = CERT_KEYWORDS[cert.id] || []
    if (keywords.some((k) => query.includes(k))) return cert
  }
  return null
}

/** Finds a certification-category question, e.g. "certifications in NLP". */
function findCertCategoryMatch(query) {
  return CERTIFICATION_CATEGORIES.find(
    (c) => c.id !== 'all' && query.includes(c.label.toLowerCase())
  )
}

const INTENTS = [
  { id: 'greeting', patterns: ['hello', 'hi', 'hey', 'yo', "what's up"] },
  { id: 'linkedin-headline', patterns: ['headline', 'linkedin headline', 'linkedin summary'] },
  { id: 'location', patterns: ['where is she', 'where does she live', 'located', 'based', 'her location'] },
  { id: 'about', patterns: ['about', 'who is', 'who are you', 'introduce', 'tell me about shreya', 'summary'] },
  { id: 'education', patterns: ['education', 'college', 'degree', 'university', 'study', 'cgpa', 'b.tech', 'btech'] },
  { id: 'current-internship', patterns: ['current internship', 'current role', 'currently interning', 'current position', 'flyrank', 'what is she doing now', 'working on right now'] },
  { id: 'internships-completed', patterns: ['internships has', 'internships completed', 'past internship', 'completed internship', 'previous internship', 'what internships'] },
  { id: 'ai-certifications', patterns: ['ai certification', 'ai cert', 'machine learning certification', 'ml certification'] },
  { id: 'certifications', patterns: ['cert', 'course', 'credential', 'specialization'] },
  { id: 'experience', patterns: ['experience', 'internship', 'work history', 'job', 'gssoc', 'srdt', 'coding blocks', 'open source contributor'] },
  { id: 'skills', patterns: ['skill', 'technolog', 'stack', 'tools', 'language', 'tech she use', 'know'] },
  { id: 'projects', patterns: ['project', 'built', 'ekos', 'mednexus', 'uniquery', 'university-query'] },
  { id: 'contact', patterns: ['contact', 'email', 'reach', 'hire', 'linkedin', 'get in touch'] },
  { id: 'rag', patterns: ['rag', 'retrieval', 'langchain', 'langgraph', 'vector', 'embedding', 'chromadb'] },
  { id: 'resume', patterns: ['resume', 'cv'] },
]

function matchIntent(query) {
  // Direct project mention takes priority over generic "projects" intent.
  const project = findProjectMatch(query)
  if (project) return { id: 'project-detail', project }

  // Direct certification mention (e.g. "RAG certification", "TensorFlow")
  // takes priority over generic certification/skill intents.
  const cert = findCertificationMatch(query)
  if (cert) return { id: 'certification-detail', cert }

  // "certifications does she have in NLP" / "DeepLearning.AI certifications"
  const isCertQuestion = /cert|credential/.test(query)
  if (isCertQuestion) {
    if (query.includes('deeplearning')) return { id: 'cert-issuer-detail', issuer: 'DeepLearning.AI' }
    const certCategory = findCertCategoryMatch(query)
    if (certCategory) return { id: 'cert-category-detail', category: certCategory }
  }

  const skillGroup = findSkillGroupMatch(query)

  for (const intent of INTENTS) {
    if (intent.patterns.some((p) => query.includes(p))) {
      if (intent.id === 'skills' && skillGroup) {
        return { id: 'skill-group-detail', group: skillGroup }
      }
      return { id: intent.id }
    }
  }

  if (skillGroup) return { id: 'skill-group-detail', group: skillGroup }

  return { id: 'fallback' }
}

function projectAnswer(project) {
  const stageLine = project.pipeline
    ? ` Its pipeline runs: ${project.pipeline.join(' → ')}.`
    : ''
  return (
    `${project.name}${project.tagline ? ` — ${project.tagline}` : ''}\n\n` +
    `${project.points.join(' ')}${stageLine}\n\n` +
    `Stack: ${project.stack.join(', ')}.\n` +
    `Repo: ${project.url}`
  )
}

function certAnswer(cert) {
  const lines = [`Yes — she holds "${cert.name}" from ${cert.issuer}, issued ${cert.issuedDate}.`]
  if (cert.credentialId) lines.push(`Credential ID: ${cert.credentialId}.`)
  if (cert.skills?.length) lines.push(`Skills: ${cert.skills.join(', ')}.`)
  if (cert.courseCertificates?.length) {
    lines.push(`Course certificates: ${cert.courseCertificates.join(', ')}.`)
  }
  lines.push(
    cert.credentialUrl
      ? 'You can view the credential from the Certifications section.'
      : 'A public credential link isn\u2019t attached for this one yet.'
  )
  return lines.join(' ')
}

function buildAnswer(intent, query) {
  switch (intent.id) {
    case 'greeting':
      return `Hi! I'm the portfolio assistant for ${PROFILE.name}. Ask me about her projects, skills, experience, education, or how to get in touch.`

    case 'linkedin-headline':
      return `Her LinkedIn headline: "${PROFILE.headline}"`

    case 'location':
      return `She's based in ${PROFILE.location}.`

    case 'about':
      return `${PROFILE.name} is a ${PROFILE.title}, based in ${PROFILE.location}. ${PROFILE.headline} — ask me about a specific project, skill, or role for more detail.`

    case 'education': {
      const lines = EDUCATION.map((edu) => {
        const parts = [`${edu.degree} — ${edu.school}`]
        if (edu.board) parts.push(edu.board)
        if (edu.timeline) parts.push(edu.timeline)
        return `• ${parts.join(', ')}`
      }).join('\n')
      return `Here's her education history:\n${lines}`
    }

    case 'current-internship': {
      const completed = EXPERIENCE.find((job) => job.org.toLowerCase().includes('flyrank'))
      if (!completed) return buildAnswer({ id: 'experience' })
      return `Her most recent internship: ${completed.role} at ${completed.org} (${completed.period}), ${completed.location}. Completed — Credential ID: FR-D11-A6201-B55C0. ${completed.points.join(' ')}`
    }

    case 'internships-completed': {
      const completed = EXPERIENCE.filter((job) => job.status !== 'current')
      if (completed.length === 0) return `She doesn't have any completed internships listed yet — check the Experience section for her current roles.`
      const lines = completed.map((job) => `• ${job.role} — ${job.org} (${job.period})`).join('\n')
      return `Completed internships:\n${lines}\n\nAsk me about a specific one for more detail.`
    }

    case 'experience': {
      const lines = EXPERIENCE.map(
        (job) => `• ${job.role} — ${job.org} (${job.period})${job.status === 'current' ? ' · Current' : ''}`
      ).join('\n')
      return `Here's her experience:\n${lines}\n\nAsk me about a specific role for more detail.`
    }

    case 'skills': {
      const groups = SKILL_GROUPS.map((g) => `${g.label}: ${g.items.slice(0, 5).join(', ')}${g.items.length > 5 ? '…' : ''}`)
      return `Her core technical areas:\n${groups.join('\n')}\n\nAsk about a specific category (e.g. "RAG technologies" or "backend skills") for the full list.`
    }

    case 'skill-group-detail':
      return `${intent.group.label}: ${intent.group.items.join(', ')}.`

    case 'rag':
      return `For RAG / LLM engineering she works with: ${SKILL_GROUPS.find((g) => g.id === 'aiml').items.filter((i) => /rag|langchain|nlp|generative|agentic|orchestration|prompt/i.test(i)).join(', ')}, plus ChromaDB for vector storage. Her flagship project, ${FEATURED_PROJECT.name}, uses hybrid retrieval (BM25 + vector search), reranking, and LangGraph agent workflows.`

    case 'projects': {
      const names = ALL_PROJECTS.map((p) => `• ${p.name}`).join('\n')
      return `Projects she's shipped:\n${names}\n\nAsk "What is EKOS?" or name any project for details.`
    }

    case 'project-detail':
      return projectAnswer(intent.project)

    case 'ai-certifications': {
      const aiCerts = CERTIFICATIONS.filter((c) =>
        ['ai-ml', 'genai', 'nlp', 'deep-learning'].includes(c.category)
      )
      const names = aiCerts.slice(0, 8).map((c) => `• ${c.name} (${c.issuer})`).join('\n')
      return `Her AI/ML-related certifications:\n${names}\n\nSee the Certifications section to filter and search the full library.`
    }

    case 'certification-detail':
      return certAnswer(intent.cert)

    case 'cert-issuer-detail': {
      const matches = CERTIFICATIONS.filter((c) => c.issuer === intent.issuer)
      const names = matches.map((c) => `• ${c.name} (${c.issuedDate})`).join('\n')
      return `Certifications from ${intent.issuer}:\n${names}`
    }

    case 'cert-category-detail': {
      const matches = CERTIFICATIONS.filter((c) => c.category === intent.category.id)
      if (matches.length === 0) return `She doesn't have any certifications listed under ${intent.category.label} yet.`
      const names = matches.map((c) => `• ${c.name} — ${c.issuer} (${c.issuedDate})`).join('\n')
      return `${intent.category.label} certifications:\n${names}`
    }

    case 'certifications': {
      const names = CERTIFICATIONS.slice(0, 6).map((c) => `• ${c.name} — ${c.issuer}`).join('\n')
      const more = CERTIFICATIONS.length > 6 ? `\n…and ${CERTIFICATIONS.length - 6} more.` : ''
      return `She has ${CERTIFICATIONS.length} certifications on record, including:\n${names}${more}\n\nOpen the Certifications section to search and filter the full library.`
    }

    case 'contact':
      return `You can reach her at ${PROFILE.email}, or connect on LinkedIn: ${PROFILE.linkedin}. Her GitHub is ${PROFILE.github}.`

    case 'resume':
      return RESUME_URL
        ? `You can view or download her resume from the Resume section above.`
        : `A downloadable resume isn't attached to this build yet — in the meantime, her GitHub (${PROFILE.github}) and the Experience/Projects sections cover the same ground in detail.`

    default:
      return `I couldn't find a direct match for that in her portfolio data. Try asking about her Projects (e.g. "What is EKOS?"), Skills, Experience, Education, Certifications, or how to Contact her.`
  }
}

/**
 * Public entry point used by the Chat UI.
 * Synchronous today (pure local search); kept async so a future LLM-backed
 * implementation can be dropped in without changing call sites.
 */
export async function getAssistantResponse(rawQuery) {
  const query = normalizeQuery(rawQuery)
  if (!query) {
    return "Ask me anything about Shreya's work — projects, skills, experience, or how to get in touch."
  }
  const intent = matchIntent(query)
  return buildAnswer(intent, query)
}

export const QUICK_QUESTIONS = [
  'What is her current internship?',
  'Tell me about EKOS',
  'What are her core skills?',
  'What AI certifications does she have?',
  'Tell me about her experience',
  'How can I contact her?',
]
