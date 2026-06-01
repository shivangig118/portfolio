import { Project, ExperienceItem, SkillGroup } from './types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'Software Trainee',
    company: 'Qyrus',
    duration: 'August 2025 - Present',
    bullets: [
      'Developed core features for enterprise automated testing platform.',
      'Optimized backend microservices leading to a 20% reduction in response time.'
    ],
    type: 'work'
  },
  {
    id: 'exp2',
    role: 'Intern',
    company: 'smartShift Technologies',
    duration: 'January 2025 - June 2025',
    bullets: [
      'Assisted in cloud migration projects for enterprise clients.'
    ],
    type: 'internship'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'SummAIze',
    category: 'AI Product',
    description:
      'Turn long PDFs and reports into clear, structured summaries in seconds — with export to Markdown, PDF, or plain text.',
    longDescription:
      'SummAIze transforms massive PDFs and documents into precise, human-grade text summaries in seconds. Built with server-side processing, caching, and semantic layout parsing so document hierarchy is preserved while the model extracts what matters.',
    tags: ['React', 'Python', 'OpenAI API'],
    type: 'code',
    highlights: ['Large-file support', 'Multiple summary styles', 'Markdown / PDF export'],
    codeSnippet: `import { AIService } from '@summaize/core';\n\nconst summary = await AIService.process(data);`,
    features: [
      'Semantic document structural parsing',
      'Intelligent core takeaway extraction via OpenAI models',
      'Configurable summaries (bulleted lists, executive summaries, short abstract)',
      'Export results directly into Markdown, PDF, or Plain Text format',
      'Optimized server-side pagination for extremely large files',
    ],
    githubUrl: 'https://github.com/shivangig118/SummAIze',
  },
  {
    id: 'proj2',
    title: 'DataDash',
    category: 'Observability',
    description:
      'Real-time analytics dashboard for microservice health — latency, errors, and infra metrics in one place.',
    longDescription:
      'DataDash gives SRE and platform teams live infrastructure telemetry: aggregated logs, service dependency maps, and precise charts for CPU, memory, and database latency — with alerting when thresholds are crossed.',
    tags: ['Next.js', 'PostgreSQL', 'Node.js'],
    type: 'chart',
    highlights: ['Sub-second queries', 'Slack & email alerts', 'Modular metric panels'],
    features: [
      'High-throughput time-series database architecture',
      'Dynamic charts for service latency, error rates, and network load',
      'Custom alerting thresholds via email and Slack webhooks',
      'Responsive, configurable metric card layouts',
      'Fast historical audit trails on system events',
    ],
    githubUrl: 'https://github.com/shivangig118/DataDash',
  },
];

export const SKILLS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Languages',
    description: 'Core languages for web, backend, and scripting.',
    skills: ['JavaScript', 'Python', 'Java'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    description: 'Interfaces, routing, and design systems.',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    category: 'Backend',
    description: 'APIs, services, and enterprise frameworks.',
    skills: ['Node.js', 'Express', 'Spring Boot'],
  },
  {
    id: 'databases',
    category: 'Databases',
    description: 'Relational and document data stores.',
    skills: ['PostgreSQL', 'MongoDB'],
  },
  {
    id: 'ai-tools',
    category: 'AI / Tools',
    description: 'LLM workflows, containers, and version control.',
    skills: ['LangChain', 'Docker', 'Git'],
  },
];
