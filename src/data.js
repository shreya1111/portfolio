// Central content source — real resume + LinkedIn data for Shreya Srivastava.
// Do not fabricate additional projects, employers, dates, or metrics.
// AIChat (src/services/portfolioAssistant.js) reads from these same objects,
// so this file is the single source of truth for the whole site.

export const PROFILE = {
  name: 'Shreya Srivastava',
  title: 'AI/ML Engineer · Software Engineer · Python Developer',
  headline:
    'Building Intelligent Solutions with AI & Data Science | Python Developer | Open Source Enthusiast',
  location: 'Lucknow, Uttar Pradesh, India',
  email: 'shreyasrivastava739@gmail.com',
  github: 'https://github.com/shreya1111',
  githubUsername: 'shreya1111',
  linkedin: 'https://www.linkedin.com/in/shreyasrivastava739/',
}

// Google Drive share link — opens in a new tab everywhere it's used.
// Not downloaded or copied into the repo.
export const RESUME_URL = 'https://drive.google.com/file/d/1H4yr0LWZtxemBAe-HFzd1U5Wod6aUZrm/view?usp=sharing'

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github-activity' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume', isResume: true },
  { label: 'Contact', href: '#contact' },
]

// Single verified higher-education record plus two school records. No
// second/ambiguous university entry and no CGPA — both were explicitly
// removed at the person's request and must not be re-added. School
// entries intentionally omit passing years/percentages/stream, since
// none were supplied — never invent them.
export const EDUCATION = [
  {
    id: 'srmcem',
    level: 'degree',
    degree: 'Bachelor of Technology (B.Tech), Computer Science Engineering',
    school: 'Shri Ramswaroop Memorial College of Engineering and Management, Lucknow',
    timeline: 'September 2023 – September 2027',
  },
  {
    id: 'class-12',
    level: 'school',
    degree: 'Class 12 — Senior Secondary',
    school: 'SKD Academy',
    board: 'ISC Board',
    timeline: null,
  },
  {
    id: 'class-10',
    level: 'school',
    degree: 'Class 10 — Secondary',
    school: 'SKD Academy',
    board: 'ICSE Board',
    timeline: null,
  },
]

// Compact capability strip directly under the Hero. Labels only — no
// fabricated metrics, user counts, or performance numbers.
export const SNAPSHOT = [
  {
    id: 'aiml',
    index: '01',
    label: 'AI / ML',
    detail: 'Machine Learning · Deep Learning · NLP · Generative AI',
    accent: 'cyan',       // drives per-card color token
    decoration: 'neural', // drives SVG decoration variant
  },
  {
    id: 'llm',
    index: '02',
    label: 'LLM Engineering',
    detail: 'RAG · LangChain · LangGraph · Prompt Engineering',
    accent: 'lavender',
    decoration: 'nodes',
  },
  {
    id: 'agentic',
    index: '03',
    label: 'Agentic AI',
    detail: 'Agentic AI Development · Automation Workflows',
    accent: 'pink',
    decoration: 'flow',
  },
  {
    id: 'backend',
    index: '04',
    label: 'Backend',
    detail: 'Python · FastAPI · Django · REST APIs',
    accent: 'cyan',
    decoration: 'grid',
  },
  {
    id: 'data',
    index: '05',
    label: 'Data & Infrastructure',
    detail: 'SQL · PostgreSQL · Redis · ChromaDB · Docker',
    accent: 'lavender',
    decoration: 'stack',
  },
  {
    id: 'oss',
    index: '06',
    label: 'Open Source',
    detail: 'GSSoC 2026 · Git workflows · Code review',
    accent: 'pink',
    decoration: 'branch',
  },
]

// Sorted with the current role first. `status: 'current'` drives the
// visual "Current" indicator on the Experience timeline.
export const EXPERIENCE = [
  {
    id: 'flyrank',
    status: 'past',
    badge: 'Completed',
    role: 'Machine Learning Intern',
    org: 'FlyRank.ai',
    location: 'Remote',
    period: 'Jul 1 – Sep 16, 2026',
    link: {
      label: 'Verify Credential · FR-D11-A6201-B55C0',
      url: 'https://internship.flyrank.ai/verify/FR-D11-A6201-B55C0?first_name=Shreya',
    },
    points: [
      'Completed a Machine Learning Internship at FlyRank.ai, building intelligence layers on real-world data with a measurable quality bar and clear business impact.',
      'Handled real-world data wrangling challenges — join constraints, anonymized rows, nested JSON structures, and aggregation strategy.',
      'Worked with embeddings and clustering to group queries and pages by meaning, mapping clusters to content coverage gaps and cannibalization.',
      'Built intent and opportunity models, connecting model output to specific, actionable recommendations.',
    ],
  },
  {
    id: 'gssoc',
    status: 'current',
    badge: 'Open Source',
    role: 'Contributor',
    org: 'GirlScript Summer of Code (GSSoC) 2026',
    location: 'India',
    period: 'May 2026 – Present',
    link: {
      label: 'GSSoC Profile',
      url: 'https://gssoc.girlscript.org/profile/546a176a-529d-4774-91e9-8aed994bcfe5',
    },
    points: [
      'Selected as a Contributor for GSSoC 2026 under the Open Source and AI/Agents tracks.',
      'Contributing to community-driven open-source projects while exploring AI-powered applications, intelligent automation systems, and scalable software solutions.',
      'Strengthening Python, Git, GitHub, version control, pull requests, and collaborative workflows.',
      'Working with mentors and developers to build foundations in AI/ML, backend systems, and modern development practices.',
    ],
  },
  {
    id: 'coding-blocks',
    status: 'past',
    badge: 'AI',
    role: 'AI Engineer Intern',
    org: 'Coding Blocks School of Technology',
    location: 'Lucknow',
    period: 'June 1 – July 14, 2026',
    link: {
      label: 'Internship Certificate',
      url: 'https://drive.google.com/file/d/1vnsebMhw5kKeMbcy8V0-krZlBTuRxcXl/view?usp=sharing',
    },
    points: [
      'Worked as an AI Engineer Intern, gaining hands-on experience in Artificial Intelligence and Generative AI.',
      'Built and experimented with AI-powered applications using modern AI tools and frameworks, implementing real-world AI use cases.',
      'Collaborated with mentors and peers on AI workflows, prompt engineering, and emerging Generative AI technologies.',
      'Successfully completed the internship, earning Gen AI certification.',
    ],
  },
  {
    id: 'srdt',
    status: 'past',
    badge: 'Software',
    role: 'Summer Intern',
    org: 'SRDT Pvt. Ltd.',
    location: 'Remote, India',
    period: 'September 2025 – October 2025',
    link: {
      label: 'Internship Certificate',
      url: 'https://drive.google.com/file/d/1AqvBBQ3XHDlStTt51dTgGI3BZy3JzbGt/view?usp=sharing',
    },
    technologies: ['Django', 'Python', 'REST APIs', 'Git', 'Agile'],
    points: [
      'Designed and developed extensible Django web application modules using MVC architecture and RESTful principles.',
      'Delivered maintainable code through version-controlled Git workflows in an Agile environment.',
      'Contributed to requirement analysis, estimation, progress tracking, backend architecture, and structured code review.',
    ],
  },
]

// Each skill carries a group used for color-coding in the constellation.
export const SKILL_GROUPS = [
  {
    id: 'languages',
    label: 'Languages',
    color: 'var(--lavender)',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    color: 'var(--cyan)',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: 'var(--pink)',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'REST APIs', 'Spring Boot'],
  },
  {
    id: 'databases',
    label: 'Databases',
    color: 'var(--cyan)',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j', 'ChromaDB', 'Redis', 'SQLite'],
  },
  {
    id: 'aiml',
    label: 'AI / ML',
    color: 'var(--lavender)',
    items: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Generative AI',
      'Agentic AI Development',
      'RAG',
      'LangChain',
      'LLM Orchestration',
      'Prompt Engineering',
      'TensorFlow',
      'PyTorch',
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations & Open Source',
    color: 'var(--pink)',
    items: ['Data Structures & Algorithms', 'OOP', 'SDLC', 'Agile', 'Open Source'],
  },
  {
    id: 'mlops',
    label: 'MLOps & Cloud',
    color: 'var(--pink)',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: 'var(--cyan)',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'OpenAI API', 'Hugging Face'],
  },
]

// The flagship project gets a larger card with a visual pipeline —
// stages are drawn directly from EKOS's real architecture in data above.
export const FEATURED_PROJECT = {
  name: 'Enterprise Knowledge Operating System (EKOS)',
  tagline: 'A Turborepo monorepo for citation-grounded enterprise search.',
  url: 'https://github.com/shreya1111/EKOS-Enterprise-Knowledge-Operating-System',
  stack: [
    'React',
    'TypeScript',
    'Node.js',
    'FastAPI',
    'PostgreSQL',
    'Redis',
    'ChromaDB',
    'LangGraph',
    'Docker',
  ],
  points: [
    'Engineered an AI-powered enterprise knowledge platform integrating RAG, hybrid retrieval (BM25 + vector search), reranking, and multi-agent workflows for citation-grounded document intelligence and semantic enterprise search.',
    'Built an end-to-end OCR-to-LLM pipeline and scalable multi-tenant architecture with RBAC, REST APIs, LangGraph orchestration, PostgreSQL, Redis, and Dockerized deployment.',
  ],
  pipeline: [
    'Documents',
    'OCR / Processing',
    'Chunking / Embeddings',
    'Hybrid Retrieval (BM25 + Vector)',
    'Reranking',
    'LangGraph Agent Workflow',
    'LLM',
    'Grounded Answer',
  ],
}

export const PROJECTS = [
  {
    name: 'MedNexus-AI — Intelligent Medical RAG Assistant',
    url: 'https://github.com/shreya1111/MedNexus-AI',
    stack: [
      'Python',
      'FastAPI',
      'LangChain',
      'ChromaDB',
      'Sentence Transformers',
      'React',
      'Tailwind CSS',
      'Docker',
    ],
    points: [
      'Engineered a medical RAG assistant using semantic chunking, Sentence Transformer embeddings, ChromaDB retrieval, and citation-grounded LLM generation for context-aware search across medical document chunks.',
      'Built a production-oriented FastAPI and React platform with modular retrieval pipelines, conversational context management, REST APIs, and Dockerized services.',
    ],
    pipeline: [
      'React Frontend',
      'FastAPI',
      'Semantic Chunking',
      'Sentence Transformer Embeddings',
      'ChromaDB Retrieval',
      'LLM',
      'Citation-Grounded Answer',
    ],
  },
  {
    name: 'Aegis Research OS',
    tagline: 'Autonomous multi-agent AI research assistant.',
    url: 'https://github.com/shreya1111/Aegis-Research-OS',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'LangGraph',
      'Docker Compose',
    ],
    points: [
      'An autonomous multi-agent AI research assistant where users create project workspaces, upload sources, ask research-grade questions, retrieve evidence, verify claims, and generate cited research artifacts exportable to PDF, DOCX, or LaTeX.',
      'Multi-agent pipeline highlights: Fact Checker, Critic, Citation Validation, and Reasoning Trace.',
    ],
    pipeline: [
      'Next.js',
      'FastAPI',
      'LangGraph Multi-Agent Workflow',
      'Fact Checker / Critic',
      'Citation Validation',
      'Research Artifact (PDF / DOCX / LaTeX)',
    ],
  },
  {
    name: 'UniQuery — AI-Powered University Query Management System',
    url: 'https://github.com/shreya1111/university-query-system',
    stack: [
      'Python',
      'Streamlit',
      'Scikit-Learn',
      'LangChain',
      'ChromaDB',
      'Sentence Transformers',
      'SambaNova',
    ],
    points: [
      'Built and deployed an AI-powered university helpdesk combining LangChain, ChromaDB, Sentence Transformers, and SambaNova-powered RAG to deliver grounded answers from institutional knowledge documents.',
      'Developed intent classification, sentiment analysis, and priority prediction models to automate ticket routing, query prioritization, and intelligent workflows across Student, Faculty, and Administrator roles.',
    ],
    pipeline: [
      'Student / Faculty / Administrator',
      'Streamlit Interface',
      'Intent Classification',
      'ChromaDB Retrieval (RAG)',
      'SambaNova LLM',
      'Grounded Answer / Ticket Routing',
    ],
  },
]

// Full certification library sourced from LinkedIn. Only fields with real,
// supplied data are populated — credentialUrl/badgeUrl/certificateUrl are
// left null (never fabricated) when no URL was provided, and the UI only
// renders a button when the corresponding URL exists.
function dlaiUrl(id) {
  return `https://learn.deeplearning.ai/certificates/${id}?usp=sharing`
}

export const CERTIFICATIONS = [
  {
    id: 'rag',
    name: 'Retrieval Augmented Generation (RAG)',
    issuer: 'DeepLearning.AI',
    issuedDate: 'June 2026',
    credentialId: 'f110ce8c-f62a-4bd2-b191-efb86fb0924c',
    credentialUrl: dlaiUrl('f110ce8c-f62a-4bd2-b191-efb86fb0924c'),
    skills: ['Artificial Intelligence', 'Retrieval-Augmented Generation'],
    courseCertificates: [],
    category: 'genai',
    featured: true,
  },
  {
    id: 'genai-swe',
    name: 'Generative AI for Software Development',
    issuer: 'DeepLearning.AI',
    issuedDate: 'July 2026',
    credentialId: 'de2ab5b9-1751-4eb9-9952-db6e6e8b8ab3',
    credentialUrl: dlaiUrl('de2ab5b9-1751-4eb9-9952-db6e6e8b8ab3'),
    skills: ['Artificial Intelligence', 'Generative AI'],
    courseCertificates: [
      'Introduction to Generative AI for Software Development',
      'Team Software Engineering with AI',
      'AI-Powered Software and System Design',
    ],
    category: 'genai',
    featured: false,
  },
  {
    id: 'tensorflow-dev',
    name: 'TensorFlow Developer Professional Certificate',
    issuer: 'DeepLearning.AI',
    issuedDate: 'July 2026',
    credentialId: '300668b3-cb72-4296-a9e4-2cd6b31ebd8b',
    credentialUrl: dlaiUrl('300668b3-cb72-4296-a9e4-2cd6b31ebd8b'),
    skills: ['TensorFlow'],
    courseCertificates: [
      'Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning',
      'Convolutional Neural Networks in TensorFlow',
      'Sequences, Time Series and Prediction',
    ],
    category: 'deep-learning',
    featured: true,
  },
  {
    id: 'ml-specialization',
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
    issuedDate: 'May 2026',
    credentialId: '4e15902f-0d6e-43aa-9731-d9205a254819',
    credentialUrl: dlaiUrl('4e15902f-0d6e-43aa-9731-d9205a254819'),
    skills: ['Machine Learning', 'Deep Learning'],
    courseCertificates: [
      'Supervised Machine Learning',
      'Advanced Learning Algorithms',
      'Unsupervised Learning, Recommenders, Reinforcement Learning',
    ],
    category: 'ai-ml',
    featured: true,
  },
  {
    id: 'dl-specialization',
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    issuedDate: 'June 2026',
    credentialId: 'f34ed38d-cbd6-4c4b-a37c-3c65be9560f9',
    credentialUrl: dlaiUrl('f34ed38d-cbd6-4c4b-a37c-3c65be9560f9'),
    skills: ['Deep Learning', 'Machine Learning'],
    courseCertificates: [
      'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization',
      'Structuring Machine Learning Projects',
      'Convolutional Neural Networks',
    ],
    category: 'deep-learning',
    featured: true,
  },
  {
    id: 'nlp-specialization',
    name: 'Natural Language Processing Specialization',
    issuer: 'DeepLearning.AI',
    issuedDate: 'June 2026',
    credentialId: '3cecf18b-9c28-4ebe-8be9-7b764cc41ae8',
    credentialUrl: dlaiUrl('3cecf18b-9c28-4ebe-8be9-7b764cc41ae8'),
    skills: ['Natural Language Processing', 'Python'],
    courseCertificates: [
      'Natural Language Processing with Classification and Vector Spaces',
      'Natural Language Processing with Sequence Models',
      'Natural Language Processing with Attention Models',
    ],
    category: 'nlp',
    featured: true,
  },
  {
    id: 'pytorch-dl',
    name: 'PyTorch for Deep Learning',
    issuer: 'DeepLearning.AI',
    issuedDate: 'June 2026',
    credentialId: '7286360f-8027-4a36-a033-9da61dc5e0ff',
    credentialUrl: dlaiUrl('7286360f-8027-4a36-a033-9da61dc5e0ff'),
    skills: ['PyTorch', 'Deep Learning'],
    courseCertificates: [
      'PyTorch: Fundamentals',
      'PyTorch: Techniques and Ecosystem Tools',
      'PyTorch: Advanced Architectures and Deployment',
    ],
    category: 'deep-learning',
    featured: true,
  },
  {
    id: 'ai-medicine',
    name: 'AI for Medicine',
    issuer: 'DeepLearning.AI',
    issuedDate: 'July 2026',
    credentialId: 'af88af7d-e73c-49df-8e39-5faf84c608f9',
    credentialUrl: dlaiUrl('af88af7d-e73c-49df-8e39-5faf84c608f9'),
    skills: ['Artificial Intelligence'],
    courseCertificates: ['AI for Medical Diagnosis', 'AI For Medical Treatment', 'AI for Medical Prognosis'],
    category: 'ai-ml',
    featured: false,
  },
  {
    id: 'ai-good',
    name: 'AI for Good',
    issuer: 'DeepLearning.AI',
    issuedDate: 'July 2026',
    credentialId: 'f7c1759b-4612-438e-8b8f-c7a70ab0991a',
    credentialUrl: dlaiUrl('f7c1759b-4612-438e-8b8f-c7a70ab0991a'),
    skills: ['Artificial Intelligence'],
    courseCertificates: ['AI and Disaster Management', 'AI and Climate Change', 'AI and Public Health'],
    category: 'ai-ml',
    featured: false,
  },
  {
    id: 'math-ml',
    name: 'Mathematics for Machine Learning and Data Science',
    issuer: 'DeepLearning.AI',
    issuedDate: 'May 2026',
    credentialId: 'ca701830-26f7-4c16-bff8-166e33b9b8bf',
    credentialUrl: dlaiUrl('ca701830-26f7-4c16-bff8-166e33b9b8bf'),
    skills: ['Machine Learning', 'Deep Learning'],
    courseCertificates: [
      'Linear Algebra for Machine Learning and Data Science',
      'Probability & Statistics for Machine Learning & Data Science',
      'Calculus for Machine Learning and Data Science',
    ],
    category: 'data',
    featured: false,
  },
  {
    id: 'oracle-weblogic',
    name: 'Oracle Certified Associate, Oracle WebLogic Server 11g System Administrator',
    issuer: 'Oracle',
    issuedDate: 'August 2026',
    credentialId: '103495179AAI26OFA',
    credentialUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9209F04B94095CE9810BAC04D28F5BD726AAFF2149CE8B2DF7C10A07AECF02F9',
    skills: ['Artificial Intelligence (AI)', 'Agentic AI Development'],
    courseCertificates: [],
    category: 'cloud',
    featured: false,
  },
  {
    id: 'forage-genai-analytics',
    name: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Forage',
    issuedDate: 'May 2026',
    credentialId: '68da4ce7890ba2dde43d2c23',
    credentialUrl: 'https://drive.google.com/file/d/1lQVw_1wxpMKBjtRgqKheV_jHF3MqzeIB/view?usp=sharing',
    skills: ['Exploratory Data Analysis & Risk Profiling', 'Generative AI'],
    courseCertificates: [
      'Exploratory Data Analysis and Risk Profiling',
      'Predicting Delinquency with AI',
      'Business Report and Data Storytelling for Collections Strategy',
      'Implementing an AI-Driven Collections Strategy',
    ],
    category: 'data',
    featured: false,
  },
  {
    id: 'cloudinary-media-iq',
    name: 'Cloud to Crowd: Introduction to Media IQ for Developers',
    issuer: 'Cloudinary',
    issuedDate: 'May 2026',
    credentialId: 'cldacad-yun9645fkp',
    credentialUrl:
      'https://training.cloudinary.com/c/s/SVcBwtpcpan-Wzxt9sURfFDU9KqD2yfnYrak3nMNLFTAU5htuh3HhBQmRnpwwmy9',
    skills: [],
    courseCertificates: [],
    category: 'cloud',
    featured: false,
  },
  {
    id: 'srdt-fullstack-python',
    name: 'Summer Internship Training Program – Full Stack Python',
    issuer: 'SRDT Pvt. Ltd.',
    issuedDate: 'September 2025',
    credentialId: null,
    credentialUrl: 'https://drive.google.com/file/d/1AqvBBQ3XHDlStTt51dTgGI3BZy3JzbGt/view?usp=sharing',
    skills: ['Full Stack Python', 'Django'],
    courseCertificates: [],
    category: 'backend',
    featured: false,
    description:
      'Completed a 2-week Summer Internship Training Program focused on Full Stack Development using Python at SRDT Pvt. Ltd.',
  },
  {
    id: 'fcc-python',
    name: 'Python',
    issuer: 'freeCodeCamp',
    issuedDate: 'August 2026',
    credentialId: null,
    credentialUrl:
      'https://www.freecodecamp.org/certification/fcc-4d7bb53a-e753-43b4-bc6e-169361b7a3d1/python-v9',
    skills: ['Python'],
    courseCertificates: [],
    category: 'backend',
    featured: false,
  },
  {
    id: 'fcc-responsive-web-design',
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    issuedDate: 'August 2026',
    credentialId: null,
    credentialUrl:
      'https://www.freecodecamp.org/certification/fcc-4d7bb53a-e753-43b4-bc6e-169361b7a3d1/responsive-web-design-v9',
    skills: ['HTML', 'CSS', 'Responsive Design'],
    courseCertificates: [],
    category: 'web',
    featured: false,
  },
]

// Explicit display-priority order for the homepage's 6 featured
// certifications — a curation decision, independent of array order.
// Falls back gracefully if an id is ever missing from CERTIFICATIONS.
export const FEATURED_CERT_IDS = [
  'ml-specialization',
  'dl-specialization',
  'nlp-specialization',
  'pytorch-dl',
  'tensorflow-dev',
  'rag',
]

export const CERTIFICATION_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'genai', label: 'Generative AI' },
  { id: 'nlp', label: 'NLP' },
  { id: 'deep-learning', label: 'Deep Learning' },
  { id: 'backend', label: 'Backend' },
  { id: 'web', label: 'Web' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'data', label: 'Data' },
]

// Subtle per-category accent, drawn only from existing design tokens.
export const CERTIFICATION_CATEGORY_COLOR = {
  'ai-ml': 'var(--lavender)',
  genai: 'var(--pink)',
  nlp: 'var(--cyan)',
  'deep-learning': 'var(--lavender)',
  backend: 'var(--pink)',
  web: 'var(--cyan)',
  cloud: 'var(--cyan)',
  data: 'var(--lavender)',
}

// "Month YYYY" strings (e.g. "July 2026") parse natively via Date — used
// for Newest/Oldest sorting without hardcoding order.
export function certIssuedTimestamp(cert) {
  const t = Date.parse(cert.issuedDate)
  return Number.isNaN(t) ? 0 : t
}
