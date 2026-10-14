// ============================================================
// PORTFOLIO DATA — src/data/portfolio.ts
// ============================================================
// Replace all placeholder values marked with [REPLACE] with your real info.
// Images in public/assets/ are referenced as "/assets/filename"
// ============================================================

import type {
  Profile,
  Project,
  SkillCategory,
  Achievement,
  JourneySeason,
  IntroSlide,
  ViewerProfile,
  SocialLink,
  FeaturedPick,
} from '../types/portfolio'

// ── Personal Info ─────────────────────────────────────────────
export const personalInfo = {
  name: 'Vardhan Boddapati',
  nameShort: 'Vardhan',
  nameFull: 'VARDHAN BODDAPATI',
  title: 'Full Stack Java Developer',
  subtitle: 'Computer Science Undergraduate',
  tagline: 'Building robust web applications — one endpoint at a time.',
  summary:
    'Computer Science undergraduate with hands-on experience as a Java Full Stack Developer Intern. Proficient in Java, Spring Boot, Spring MVC, REST APIs, MySQL, HTML, CSS, and JavaScript. Passionate about building scalable web applications, learning new technologies, and delivering quality results through the software development lifecycle.',
  email: 'vardhanboddapati1662004@gmail.com',
  phone: '+91 7013269686',
  location: 'Narasaraopeta, India',
  portrait: '/assets/portrait.jpg',
  resumePdf: '/assets/resume.pdf', // [REPLACE] — Place your resume PDF in public/assets/
  studioLabel: 'VARDHAN STUDIOS',
  seriesTitle: 'THE SERIES',
  currentRole: 'Java Full Stack Intern @ Magnex Software',
  openToWork: true,
} as const

// ── Social Links ──────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/boddapatiyardhan/chowdary', // [REPLACE if needed]
    icon: 'Github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/vardhan-boddapati-920632255',
    icon: 'Linkedin',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:vardhanboddapati1662004@gmail.com',
    icon: 'Mail',
  },
  {
    id: 'portfolio',
    label: 'Live Portfolio',
    url: 'https://portfolio-intro-vardhan.vercel.app',
    icon: 'Globe',
  },
]

// ── Viewer Profiles ───────────────────────────────────────────
export const viewerProfiles: ViewerProfile[] = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    emoji: '🎯',
    description: 'Find the perfect candidate',
    focusSections: ['hero', 'skills', 'experience', 'achievements', 'contact'],
  },
  {
    id: 'developer',
    label: 'Developer',
    emoji: '💻',
    description: 'Explore the technical depth',
    focusSections: ['hero', 'projects', 'skills', 'journey', 'contact'],
  },
  {
    id: 'creative',
    label: 'Creative',
    emoji: '🎨',
    description: 'See the story unfold',
    focusSections: ['hero', 'projects', 'journey', 'achievements', 'contact'],
    url: new URL('../../jai.mp4', import.meta.url).href,
  },
]

// ── Intro Slides ──────────────────────────────────────────────
export const introSlides: IntroSlide[] = [
  {
    id: 1,
    title: 'Who Am I?',
    subtitle: 'A Builder at Heart',
    body: 'Computer Science undergraduate from Narasaraopeta Institute of Technology, passionate about building robust, scalable web applications that solve real-world problems.',
    accent: '#e50914',
    bg: 'from-black to-zinc-900',
  },
  {
    id: 2,
    title: 'Technical Expertise',
    subtitle: 'Full Stack Java Developer',
    body: 'Proficient in Java, Spring Boot, Spring MVC, REST APIs on the backend. Comfortable with HTML, CSS, JavaScript on the frontend. MySQL as my go-to database.',
    accent: '#e50914',
    bg: 'from-zinc-900 to-black',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'JavaScript'],
  },
  {
    id: 3,
    title: 'Best Projects',
    subtitle: 'Work That Matters',
    body: 'Built a Chatbot Song Recommendation System for my final year project and an Online Medication Prescription Tracker during my Infosys internship.',
    accent: '#e50914',
    bg: 'from-black to-zinc-900',
  },
  {
    id: 4,
    title: 'Career Goals',
    subtitle: 'What Drives Me',
    body: 'Currently interning at Magnex Software as a Java Full Stack Intern. Eager to grow into a senior full stack developer role, contributing to enterprise-scale systems.',
    accent: '#e50914',
    bg: 'from-zinc-900 to-black',
  },
  {
    id: 5,
    title: "Let's Connect",
    subtitle: 'Open to Opportunities',
    body: 'Available for full-time roles, internships, and collaborations. Reach out on LinkedIn or drop an email — I respond promptly!',
    accent: '#e50914',
    bg: 'from-black to-zinc-900',
    cta: { label: 'Contact Me', href: '#contact' },
  },
]

// ── About / Biography ─────────────────────────────────────────
export const about = {
  bio: `I'm Vardhan Boddapati, a Computer Science undergraduate from Narasaraopeta Institute of Technology, graduating in 2026. My journey in software development began with a fascination for how applications work under the hood — what happens between a button click and a database update.

That curiosity led me to specialize in Java full-stack development, where I've had the opportunity to work with Spring Boot at Infosys Springboard and Magnex Software. I enjoy building well-structured REST APIs, designing clean database schemas, and integrating responsive frontends with robust backend logic.

Outside academics, I invest time in certifications — from Infosys Springboard's Java program to Board Infinity's Full Stack course — because I believe continuous learning is what separates good developers from great ones.`,
  strengths: [
    'Backend Architecture — REST API design and MVC patterns',
    'Database Design — Relational schemas with MySQL',
    'Quick Learner — Certified across multiple platforms',
    'Team Player — Collaborated on intern and team projects',
    'Attention to Detail — High academic scores (99.8% in SSC)',
  ],
  interests: [
    'Java Ecosystem (Spring, Hibernate)',
    'Web Application Development',
    'API Design & Integration',
    'Open Source Contribution',
    'AI / ML Integration in Web Apps',
  ],
  currentLearning: [
    'Advanced Spring Security & JWT',
    'Docker & Containerization',
    'React & Modern Frontend Frameworks',
    'System Design Principles',
  ],
  careerObjective:
    'To secure a full-stack developer role where I can leverage my Java and Spring Boot expertise to build scalable, maintainable web applications — while continuing to grow as an engineer.',
}

// ── Journey Seasons ───────────────────────────────────────────
export const journeySeasons: JourneySeason[] = [
  {
    id: 'season-1',
    season: 1,
    title: 'The Foundation',
    subtitle: 'Education',
    episodes: [
      {
        id: 'ep-1',
        episode: 1,
        title: 'The Beginning — SSC',
        organization: 'Tiny Tots High School',
        duration: '2019 – 2020',
        location: 'Narasaraopeta, India',
        description:
          'Completed secondary school with an exceptional score of 99.8%, setting the academic foundation for a career in technology.',
        skills: ['Mathematics', 'Science', 'Foundation Academics'],
        badge: '99.8%',
        type: 'education',
      },
      {
        id: 'ep-2',
        episode: 2,
        title: 'Intermediate — Science Stream',
        organization: 'VIT Junior College',
        duration: '2020 – 2022',
        location: 'Narasaraopeta, India',
        description:
          'Pursued MPC (Mathematics, Physics, Chemistry) stream with a score of 73.6%, preparing for engineering entrance examinations.',
        skills: ['Mathematics', 'Physics', 'Chemistry', 'Analytical Thinking'],
        badge: '73.6%',
        type: 'education',
      },
      {
        id: 'ep-3',
        episode: 3,
        title: 'B.Tech — Computer Science & Engineering',
        organization: 'Narasaraopeta Institute of Technology',
        duration: '2022 – 2026',
        location: 'Narasaraopeta, India',
        description:
          'Pursuing B.Tech in Computer Science and Engineering with a CGPA of 6.76. Gained strong foundations in data structures, algorithms, databases, operating systems, and software engineering.',
        skills: [
          'Data Structures',
          'Algorithms',
          'DBMS',
          'OS',
          'Software Engineering',
          'Java',
          'OOP',
        ],
        badge: '67.6%',
        type: 'education',
      },
    ],
  },
  {
    id: 'season-2',
    season: 2,
    title: 'The Experience',
    subtitle: 'Professional Journey',
    episodes: [
      {
        id: 'ep-4',
        episode: 1,
        title: 'Java Full Stack Developer Intern',
        organization: 'Infosys Springboard',
        duration: '12/2025 – 02/2026',
        location: 'Remote',
        description:
          'Built an Online Medication Tracking System using Java, Spring Boot, HTML/CSS/JavaScript. Designed the database structure, implemented MVC architecture, and built REST API endpoints. Completed all internship deliverables under the Infosys Springboard program.',
        skills: [
          'Java',
          'Spring Boot',
          'HTML/CSS/JavaScript',
          'MySQL',
          'REST APIs',
          'MVC Architecture',
        ],
        type: 'internship',
      },
      {
        id: 'ep-5',
        episode: 2,
        title: 'Java Full Stack Intern',
        organization: 'Magnex Software',
        duration: '01/2026 – Present',
        location: 'On-site',
        description:
          'Developing and maintaining web applications using Java and Spring Boot. Building responsive frontend interfaces with HTML, CSS, and JavaScript. Working with REST APIs, integrating frontend with backend, and managing MySQL databases. Supporting the full development lifecycle including coding, testing, and deployment.',
        skills: [
          'Java',
          'Spring Boot',
          'HTML/CSS',
          'JavaScript',
          'MySQL',
          'REST APIs',
          'Testing',
          'Deployment',
        ],
        type: 'internship',
        isCurrent: true,
      },
    ],
  },
  {
    id: 'season-3',
    season: 3,
    title: 'The Credentials',
    subtitle: 'Certifications & Achievements',
    episodes: [
      {
        id: 'ep-6',
        episode: 1,
        title: 'Programming Using Java',
        organization: 'Infosys Springboard',
        duration: '2025',
        description:
          'Completed comprehensive Java programming course covering OOP concepts, collections, exception handling, and core Java fundamentals.',
        skills: ['Java', 'OOP', 'Collections', 'Exception Handling'],
        type: 'certification',
      },
      {
        id: 'ep-7',
        episode: 2,
        title: 'Java Programming Certification',
        organization: 'Board Infinity',
        duration: '2025',
        description:
          'Industry-recognized Java programming certification validating proficiency in Java development practices and paradigms.',
        skills: ['Java', 'Programming Fundamentals'],
        type: 'certification',
      },
      {
        id: 'ep-8',
        episode: 3,
        title: 'Frontend Development & Java Full Stack',
        organization: 'Board Infinity',
        duration: '2025',
        description:
          'Comprehensive full-stack certification covering frontend development with HTML/CSS/JavaScript and Java backend development.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'Full Stack'],
        type: 'certification',
      },
      {
        id: 'ep-9',
        episode: 4,
        title: 'TCS ION — Group Discussion & Communication Skills',
        organization: 'TCS ION',
        duration: '2024',
        description:
          "Developed professional communication, group discussion, and interpersonal skills through TCS's industry-aligned training program.",
        skills: ['Communication', 'Teamwork', 'Leadership'],
        type: 'certification',
      },
      {
        id: 'ep-10',
        episode: 5,
        title: 'TCS ION Career Edge — Young Professional',
        organization: 'TCS ION',
        duration: '2024',
        description:
          'Career readiness program covering professional etiquette, resume building, and industry best practices for young professionals.',
        skills: ['Professionalism', 'Career Skills', 'Industry Readiness'],
        type: 'certification',
      },
    ],
  },
]

// ── Projects ──────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Chatbot Song Recommendation System',
    slug: 'chatbot-song-recommender',
    shortDescription:
      'An AI-powered chatbot that recommends songs based on user preferences and mood using Python Flask.',
    overview:
      'A final-year B.Tech team project that delivers personalized song recommendations through a conversational chatbot interface. Users interact naturally to receive curated music suggestions stored and served from a SQLite database.',
    problem:
      'Music discovery is overwhelming. This system simplifies the experience by using a chatbot-driven interface to narrow down song suggestions based on user mood, genre preferences, and listening history.',
    features: [
      'Conversational chatbot interface for music discovery',
      'Mood and preference-based filtering algorithm',
      'SQLite-backed recommendation and user data storage',
      'Clean HTML5/CSS3 responsive frontend',
      'RESTful request handling via Python Flask',
    ],
    techStack: ['Python', 'Flask', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    category: 'AI / Web Application',
    github: 'https://github.com/boddapatiyardhan/chowdary', // [REPLACE] with actual repo
    demo: '', // [REPLACE] if deployed
    thumbnail: '', // [REPLACE] with screenshot
    screenshots: [],
    highlights: [
      'Final Year B.Tech Project',
      'Team collaboration & agile workflow',
      'Backend-driven recommendation engine',
    ],
    isFeatured: true,
    tags: ['Python', 'Flask', 'AI', 'Backend'],
  },
  {
    id: 'project-2',
    title: 'Online Medication Prescription Tracker',
    slug: 'medication-tracker',
    shortDescription:
      'A full-stack Spring Boot application for managing and tracking patient medication prescriptions.',
    overview:
      'Built during the Infosys Springboard internship, this application enables healthcare providers to manage patient medication records and schedules digitally. Features a Spring Boot REST API backend and a responsive HTML/CSS/JavaScript frontend.',
    problem:
      'Manual prescription management in clinics leads to errors and inefficiency. This system digitizes the process, allowing easy tracking of patient medication schedules and prescription records.',
    features: [
      'Patient registration and profile management',
      'Medication schedule creation and tracking',
      'Prescription record CRUD operations',
      'REST API with Spring Boot backend',
      'MySQL database with normalized schema',
      'MVC architecture for clean separation of concerns',
    ],
    techStack: [
      'Java',
      'Spring Boot',
      'Spring MVC',
      'REST API',
      'MySQL',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    category: 'Full Stack Web Application',
    github: 'https://github.com/boddapatiyardhan/chowdary', // [REPLACE] with actual repo
    demo: '',
    thumbnail: '',
    screenshots: [],
    highlights: [
      'Infosys Springboard Internship Project',
      'Complete MVC architecture implementation',
      'Secure REST API design',
      'Full CRUD with MySQL',
    ],
    isFeatured: true,
    tags: ['Java', 'Spring Boot', 'MySQL', 'Full Stack'],
  },
]

// ── Skills ────────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend Development',
    icon: 'Server',
    skills: [
      { id: 'java', name: 'Java', usedIn: ['Medication Tracker', 'Infosys Intern', 'Magnex Intern'] },
      { id: 'spring-boot', name: 'Spring Boot', usedIn: ['Medication Tracker', 'Magnex Intern'] },
      { id: 'spring-mvc', name: 'Spring MVC', usedIn: ['Medication Tracker', 'Infosys Intern'] },
      { id: 'rest-api', name: 'REST APIs', usedIn: ['Both Internships', 'All Projects'] },
      { id: 'python', name: 'Python', usedIn: ['Chatbot Song Recommender'] },
      { id: 'flask', name: 'Flask', usedIn: ['Chatbot Song Recommender'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    icon: 'Monitor',
    skills: [
      { id: 'html', name: 'HTML5', usedIn: ['All Projects', 'Both Internships'] },
      { id: 'css', name: 'CSS3', usedIn: ['All Projects', 'Both Internships'] },
      { id: 'javascript', name: 'JavaScript', usedIn: ['Medication Tracker', 'Magnex Intern'] },
      { id: 'responsive', name: 'Responsive Design', usedIn: ['Magnex Intern'] },
    ],
  },
  {
    id: 'database',
    label: 'Databases',
    icon: 'Database',
    skills: [
      { id: 'mysql', name: 'MySQL', usedIn: ['Medication Tracker', 'Both Internships'] },
      { id: 'jdbc', name: 'JDBC', usedIn: ['Java Projects'] },
      { id: 'sqlite', name: 'SQLite', usedIn: ['Chatbot Song Recommender'] },
    ],
  },
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'Code2',
    skills: [
      { id: 'java-core', name: 'Core Java', usedIn: ['All Java Projects'] },
      { id: 'oop', name: 'OOP Principles', usedIn: ['All Projects'] },
      { id: 'collections', name: 'Java Collections', usedIn: ['Java Projects'] },
      { id: 'exception', name: 'Exception Handling', usedIn: ['Java Projects'] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: 'Wrench',
    skills: [
      { id: 'git', name: 'Git', usedIn: ['All Projects'] },
      { id: 'github', name: 'GitHub', usedIn: ['All Projects'] },
      { id: 'postman', name: 'Postman', usedIn: ['API Testing'] },
      { id: 'intellij', name: 'IntelliJ IDEA', usedIn: ['Java Development'] },
      { id: 'eclipse', name: 'Eclipse IDE', usedIn: ['Java Development'] },
      { id: 'vscode', name: 'VS Code', usedIn: ['Frontend Development'] },
    ],
  },
]

// ── Achievements & Certifications ─────────────────────────────
export const achievements: Achievement[] = [
  {
    id: 'cert-1',
    title: 'Programming Using Java',
    issuer: 'Infosys Springboard',
    date: '2025',
    type: 'certification',
    description: 'Comprehensive Java programming certification from Infosys Springboard covering OOP, collections, and exception handling.',
    verifyUrl: '', // [REPLACE] with credential URL
    badge: '☕',
    color: '#e50914',
  },
  {
    id: 'cert-2',
    title: 'Java Programming Certification',
    issuer: 'Board Infinity',
    date: '2025',
    type: 'certification',
    description: 'Industry-recognized Java programming certification validating core development skills.',
    verifyUrl: '', // [REPLACE] with credential URL
    badge: '🎓',
    color: '#c0392b',
  },
  {
    id: 'cert-3',
    title: 'Frontend Development & Java Full Stack',
    issuer: 'Board Infinity',
    date: '2025',
    type: 'certification',
    description: 'Full stack development certification covering HTML/CSS/JS frontend and Java backend technologies.',
    verifyUrl: '', // [REPLACE] with credential URL
    badge: '🚀',
    color: '#e50914',
  },
  {
    id: 'cert-4',
    title: 'Group Discussion & Communication Skills',
    issuer: 'TCS ION',
    date: '2024',
    type: 'achievement',
    description: 'Professional communication and group discussion skills certification from TCS ION.',
    verifyUrl: '', // [REPLACE] with credential URL
    badge: '💬',
    color: '#a93226',
  },
  {
    id: 'cert-5',
    title: 'Career Edge — Young Professional',
    issuer: 'TCS ION',
    date: '2024',
    type: 'achievement',
    description: 'Career readiness and professional development program for young engineering graduates.',
    verifyUrl: '', // [REPLACE] with credential URL
    badge: '⭐',
    color: '#c0392b',
  },
]

// ── Featured Picks ────────────────────────────────────────────
export const featuredPicks: FeaturedPick[] = [
  {
    id: 'pick-1',
    rank: 1,
    title: 'Chatbot Song Recommender',
    category: 'AI + Web',
    description: 'Flask-powered music AI chatbot with SQLite recommendations',
    tags: ['Python', 'Flask', 'AI'],
    projectId: 'project-1',
  },
  {
    id: 'pick-2',
    rank: 2,
    title: 'Medication Tracker',
    category: 'Full Stack',
    description: 'Spring Boot MVC app for prescription management',
    tags: ['Java', 'Spring Boot', 'MySQL'],
    projectId: 'project-2',
  },
  {
    id: 'pick-3',
    rank: 3,
    title: 'Infosys Internship',
    category: 'Professional',
    description: 'Remote full stack Java internship — built production-ready MVC application',
    tags: ['Internship', 'Java', 'Spring Boot'],
  },
  {
    id: 'pick-4',
    rank: 4,
    title: 'Magnex Software Intern',
    category: 'Current Role',
    description: 'On-site Java Full Stack Intern building enterprise web applications',
    tags: ['Current', 'Java', 'Full Stack'],
  },
  {
    id: 'pick-5',
    rank: 5,
    title: 'Board Infinity — Full Stack',
    category: 'Certification',
    description: 'Certified in Frontend Development & Java Full Stack by Board Infinity',
    tags: ['Certification', 'Full Stack'],
  },
]

// ── Profiles ──────────────────────────────────────────────────
export const profiles: Profile[] = [
  {
    id: 'profile-1',
    type: 'recruiter',
    name: 'For Recruiters',
    description: 'See skills, experience, and certifications at a glance.',
  },
  {
    id: 'profile-2',
    type: 'developer',
    name: 'For Developers',
    description: 'Explore the technical stack and project implementations.',
  },
  {
    id: 'profile-3',
    type: 'creative',
    name: 'For Creatives',
    description: 'Experience the journey and story behind the developer.',
  },
]
