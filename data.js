/* ==========================================================================
   data.js — portfolio content. Add or edit content here; no HTML changes needed.
   ========================================================================== */

const SITE = {
  name: "Iyaaz Muhammad Shabaz",
  shortName: "Iyaaz",
  role: "Software Engineer",
  rotator: ["Full-Stack Developer", "AI Researcher", "Backend Developer", "Software Engineer"],
  tagline: "I build practical software and explore ways to make AI systems more efficient, useful and privacy-aware.",
  bioShort: "Computer Science engineering student at P.A. College of Engineering, exploring full-stack development, backend systems and applied AI research.",
  bioLong: [
    "I'm Iyaaz Muhammad Shabaz, a Computer Science engineering student at P.A. College of Engineering, Mangaluru, graduating in 2028.",
    "My work brings together software development and research. I enjoy turning ideas into working applications, understanding how systems behave behind the interface, and exploring how AI tools can become more efficient and privacy-aware.",
    "I'm currently building my foundations across frontend and backend development while exploring AI assistants, context management, token efficiency and privacy-preserving agents.",
    "Outside coursework, I contribute to peer learning through CodeNexus Club and take part in technical workshops, collaborative projects and problem-solving activities."
  ],
  location: "Mangaluru, Karnataka, India",
  email: "iyaazms1@gmail.com",
  phone: "",
  resumeUrl: "resume.pdf",
  photo: "",
  availability: "Open to internships and research collaborations",
  links: {
    linkedin: "https://www.linkedin.com/in/iyaaz-muhammad-shabaz09/",
    github: "https://github.com/iyaazms1"
  },
  // Add a Formspree endpoint later for direct form delivery.
  // Without one, the form opens the visitor's email app with the message prefilled.
  contactFormEndpoint: ""
};

const STATS = [
  { label: "CGPA", value: "9.1", color: "lime" },
  { label: "Projects", count: 5, color: "violet" },
  { label: "SIH ideas", count: 2, color: "orange" },
  { label: "Certificates", value: null, color: "sky", auto: "certs" }
];

const TIMELINE = [
  {
    type: "education",
    title: "B.E. — Computer Science and Engineering",
    org: "P.A. College of Engineering, Mangaluru",
    period: "January 2024 – Present",
    detail: "Undergraduate engineering studies. Current CGPA: 9.1."
  },
  {
    type: "work",
    title: "DSA Lead",
    org: "CodeNexus Club",
    period: "December 2025 – Present",
    detail: "Lead DSA learning initiatives, guide students through coding problems, organize practice sessions and discussions, curate practice resources, and support peer learning."
  },
  {
    type: "event",
    title: "Smart India Hackathon 2026",
    org: "Team project contributions",
    period: "2026",
    detail: "Contributed to two proposed solutions: PrivAgent (PS SIH26171) and the Interactive Quantum Algorithm Learning Platform (PS SIH26140)."
  }
];

const SKILLS = [
  {
    group: "Programming & Development",
    color: "lime",
    items: [
      { name: "Python" },
      { name: "Java" },
      { name: "C" },
      { name: "JavaScript" },
      { name: "React.js" },
      { name: "HTML & CSS" },
      { name: "Node.js and Express" },
      { name: "REST API development" },
      { name: "Tailwind CSS" },
      { name: "Data Structures and Algorithms" }
    ]
  },
  {
    group: "Research & AI",
    color: "violet",
    items: [
      { name: "LLM context management and token efficiency" },
      { name: "Literature review and technical research" },
      { name: "Privacy-aware AI system concepts" },
      { name: "Context compression and summarization concepts" }
    ]
  },
  {
    group: "Tools & Platforms",
    color: "orange",
    items: [
      { name: "Git and GitHub" },
      { name: "MongoDB and MySQL" },
      { name: "Firebase" },
      { name: "Google Gemini API" },
      { name: "Visual Studio Code" },
      { name: "Canva" },
      { name: "Vercel" }
    ]
  },
  {
    group: "Professional Skills",
    color: "sky",
    items: [
      { name: "Team collaboration" },
      { name: "Problem solving" },
      { name: "Technical documentation" },
      { name: "Peer learning and coordination" }
    ]
  }
];

const PROJECTS = [
  {
    id: "cloud-hybrid-ai",
    title: "Cloud Hybrid AI Assistant",
    category: "AI / Full-Stack",
    status: "In progress",
    role: "Team member — research and backend",
    year: "2026",
    color: "lime",
    summary: "A context-aware AI assistant concept that combines local conversation-history management with cloud-based language model providers.",
    details: [
      "Explores ways to retain useful conversation context while managing long chat histories.",
      "The proposed workflow includes automatic migration, on-demand compression, summarization and selective deletion.",
      "Research direction includes Layered Relevance-Coherence Pruning (LRCP) for selecting useful conversation turns and reducing context size.",
      "The project explores privacy-conscious storage and multi-provider inference."
    ],
    stack: ["JavaScript", "Node.js", "Express", "LLM APIs", "Context management"],
    links: [
      { label: "Live demo", url: "https://cloud-ai-black.vercel.app" },
      { label: "Project repository", url: "https://github.com/mohd-Affan16/Cloud-ai" }
    ],
    image: ""
  },
  {
    id: "privagent",
    title: "PrivAgent — Privacy-Preserving Browser Agent",
    category: "AI / Privacy",
    status: "Idea submitted",
    role: "Team member — research and design",
    year: "2026",
    color: "violet",
    summary: "A Smart India Hackathon 2026 proposal (PS SIH26171) exploring a browser agent that protects sensitive information while interacting with web pages.",
    details: [
      "The concept explores detecting sensitive information in page content before it is shared with a remote model.",
      "Sensitive values can be represented using semantic placeholders rather than exposing the original data.",
      "The design emphasizes validating model-suggested browser actions locally and restricting the actions an agent can perform.",
      "The proposal explores on-device processing for privacy-sensitive tasks."
    ],
    stack: ["Browser agents", "Privacy-aware AI", "ONNX Runtime Web", "Transformers.js"],
    links: [],
    image: ""
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker — Full-Stack Web Application",
    category: "Web Development",
    status: "Completed",
    role: "Developer",
    year: "2026",
    color: "sky",
    summary: "A responsive expense-tracking application built with Python and Flask to record daily spending and review expenses over time.",
    details: [
      "Implemented the ability to add and delete daily expenses.",
      "Added automatic total-spending calculations and category-wise expense summaries.",
      "Created month and year filters to review historical expenses.",
      "Designed a responsive interface for mobile and desktop and deployed the application on Render."
    ],
    stack: ["Python", "Flask", "SQLite", "HTML", "CSS"],
    links: [],
    image: ""
  },
  {
    id: "ai-project-evaluator",
    title: "AI-Powered Student Project Evaluator",
    category: "AI / Full-Stack",
    status: "Completed",
    role: "Team project",
    year: "2026",
    color: "orange",
    summary: "A full-stack application that evaluates student projects and provides scores and feedback across multiple project-quality dimensions.",
    details: [
      "Supports project submissions through text, files and GitHub links.",
      "Provides category-wise evaluation for innovation, technical depth, clarity and impact.",
      "Includes Firebase authentication and an interactive results dashboard.",
      "Built with React, Node.js, Express, Tailwind CSS, Google Gemini API and Firebase."
    ],
    stack: ["React.js", "Node.js", "Express", "Tailwind CSS", "Google Gemini API", "Firebase"],
    links: [],
    image: ""
  },
  {
    id: "quantum-platform",
    title: "Interactive Quantum Algorithm Learning Platform",
    category: "AI / Education",
    status: "Idea submitted",
    role: "Team member",
    year: "2026",
    color: "orange",
    summary: "A Smart India Hackathon 2026 proposal (PS SIH26140, Egreen Quanta) for an interactive learning experience that helps students understand quantum algorithms step by step.",
    details: [
      "The proposed platform focuses on making quantum algorithm concepts easier to explore through guided, interactive learning.",
      "The idea combines educational content with AI-assisted explanations and a learner-oriented experience."
    ],
    stack: ["Quantum computing education", "Interactive learning", "AI-assisted tutoring"],
    links: [],
    image: ""
  }
];

const RESEARCH = [
  {
    title: "Layered Relevance-Coherence Pruning (LRCP) for LLM Context Reduction",
    type: "Research direction",
    year: "2026",
    abstract: "An exploratory approach to reducing the context carried by long AI conversations. It considers relevance, recency and coherence when identifying useful turns, with the broader goal of retaining meaningful context while reducing token usage.",
    tags: ["LLMs", "Context compression", "Token efficiency"],
    links: []
  },
  {
    title: "Literature Review: Context Compression and Memory in Language Models",
    type: "Literature review",
    year: "2026",
    abstract: "A literature review exploring approaches to context compression, memory organization and dynamic context selection in language-model assistants.",
    tags: ["Literature review", "LLM memory", "Context management"],
    links: []
  }
];

const CERTS = [
  {
    title: "Introduction to HTML",
    issuer: "SoloLearn",
    date: "August 2025",
    category: "Web Development",
    credentialId: "",
    url: "",
    image: "cert-html.jpg",
    skills: ["HTML"]
  },
  {
    title: "Introduction to CSS",
    issuer: "SoloLearn",
    date: "August 2025",
    category: "Web Development",
    credentialId: "",
    url: "",
    image: "cert-css.jpg",
    skills: ["CSS", "Web styling"]
  },
  {
    title: "CodeNexus Season 1 Challenge — Certificate of Completion",
    issuer: "P.A. College of Engineering & CodeNexus PACE",
    date: "Date not specified",
    category: "Programming",
    credentialId: "",
    url: "",
    image: "cert-codenexus.jpg",
    skills: ["Problem solving", "Data structures and algorithms"]
  },
  {
    title: "Chakravyuha Youth Carnival — Participant",
    issuer: "Srinivas University, ASHVA — Department of MCA",
    date: "Date not specified",
    category: "Participation",
    credentialId: "",
    url: "",
    image: "cert-chakravyuha.jpg",
    skills: ["Participation", "Team engagement"]
  }
];

const ACHIEVEMENTS = [
  "DSA Lead at CodeNexus, serving since December 2025.",
  "Led DSA learning initiatives, practice sessions and peer problem-solving activities through CodeNexus.",
  "Achieved #2 position on the CodeNexus DSA leaderboard.",
  "Participated in the CodeNexus 30 Days Challenge.",
  "Secured 1st place in the IoT workshop Kahoot quiz.",
  "Contributed to two Smart India Hackathon 2026 solution proposals.",
  "Participated in the IoT Application Design Workshop and college community activities."
];
