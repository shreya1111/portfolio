// Central content source — real resume data for Shreya Srivastava.
// Do not fabricate additional projects, employers, or metrics.

export const PROFILE = {
  name: 'Shreya Srivastava',
  title: 'Software Engineer | AI/ML Engineer | Python Developer',
  location: 'Lucknow, Uttar Pradesh, India',
  email: 'shreyasrivastava739@gmail.com',
  github: 'https://github.com/shreya1111',
  linkedin: 'https://www.linkedin.com/in/shreyasrivastava739/',
}

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const EDUCATION = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Shri Ramswaroop Memorial College of Engineering and Management',
  timeline: 'Expected July 2027',
  cgpa: '7.5 / 10.0',
}

export const EXPERIENCE = [
  {
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code (GSSoC) 2026',
    meta: 'Open Source AI/Agents Track · Remote, India',
    period: 'May 2026 – Present',
    link: {
      label: 'GSSoC Profile',
      url: 'https://gssoc.girlscript.org/profile/546a176a-529d-4774-91e9-8aed994bcfe5',
    },
    points: [
      'Contributed production-ready features across open-source repositories through Git branching, pull requests, and structured code reviews; implemented specification-aligned modules and resolved edge-case bugs.',
      'Applied Agile/Scrum and SDLC practices across collaborative workflows; earned the Official Cloudinary Creator Badge for API integration and platform development.',
    ],
  },
  {
    role: 'Summer Internship Trainee, Full Stack Python',
    org: 'SRDT Pvt. Ltd.',
    meta: 'Remote, India',
    period: 'Sep 2025',
    link: {
      label: 'Internship Certificate',
      url: 'https://drive.google.com/file/d/1AqvBBQ3XHDlStTt51dTgGI3BZy3JzbGt/view?usp=sharing',
    },
    points: [
      'Designed and developed extensible Django web application modules using MVC architecture and RESTful principles, delivering maintainable code through version-controlled Git workflows.',
      'Collaborated in an Agile environment on requirement analysis, estimation, and progress tracking while contributing to backend architecture and code review cycles.',
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
      'Agentic AI',
      'RAG',
      'LangChain',
      'LLM Orchestration',
      'Prompt Engineering',
      'TensorFlow',
      'PyTorch',
    ],
  },
  {
    id: 'mlops',
    label: 'MLOps & Cloud',
    color: 'var(--pink)',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Agile'],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: 'var(--cyan)',
    items: ['Git', 'Postman', 'VS Code', 'OpenAI API', 'Hugging Face'],
  },
]

export const PROJECTS = [
  {
    name: 'Enterprise Knowledge Operating System (EKOS)',
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
  },
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
  },
]

// `url` points to the official course/specialization page for each credential.
// Swap in personal verification/credential URLs if you have them.
export const CERTIFICATIONS = [
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Stanford Online — Andrew Ng',
    url: 'https://learn.deeplearning.ai/certificates/4e15902f-0d6e-43aa-9731-d9205a254819?usp=sharing',
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    url: 'https://learn.deeplearning.ai/certificates/f34ed38d-cbd6-4c4b-a37c-3c65be9560f9?usp=sharing',
  },
  {
    name: 'Natural Language Processing Specialization',
    issuer: 'DeepLearning.AI',
    url: 'https://learn.deeplearning.ai/certificates/3cecf18b-9c28-4ebe-8be9-7b764cc41ae8?usp=sharing',
  },
  {
    name: 'PyTorch for Deep Learning',
    issuer: 'DeepLearning.AI',
    url: 'https://learn.deeplearning.ai/certificates/7286360f-8027-4a36-a033-9da61dc5e0ff?usp=sharing',
  },
  {
    name: 'Data Analytics',
    issuer: 'Certification',
    url: 'https://drive.google.com/file/d/1lQVw_1wxpMKBjtRgqKheV_jHF3MqzeIB/view?usp=sharing',
  },
  {
    name: 'Mathematics for Machine Learning and Data Science',
    issuer: 'DeepLearning.AI',
    url: 'https://learn.deeplearning.ai/certificates/ca701830-26f7-4c16-bff8-166e33b9b8bf?usp=sharing',
  },
  {
    name: 'TensorFlow Developer Professional Certificate',
    issuer: 'DeepLearning.AI',
    url: 'https://learn.deeplearning.ai/certificates/300668b3-cb72-4296-a9e4-2cd6b31ebd8b?usp=sharing',
  },
  {
    name: 'Generative AI for Software Development',
    issuer: 'DeepLearning.AI',
    url: 'https://learn.deeplearning.ai/certificates/de2ab5b9-1751-4eb9-9952-db6e6e8b8ab3?usp=sharing',
  },
]
