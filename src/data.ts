import { Project, ExperienceItem, SkillGroup } from './types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'Software Engineer',
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
    description: 'An AI-powered document summarization tool designed to extract key insights from lengthy reports instantly.',
    longDescription: 'SummAIze transforms massive PDFs and documents into precise, human-grade text summaries in seconds. Architected with robust server-side processing, caching strategies, and semantic layout parsing to maintain document hierarchy while mining essential insights and core deliverables.',
    tags: ['React', 'Python', 'OpenAI API'],
    type: 'code',
    codeSnippet: `import { AIService } from '@summaize/core';\n\nconst summary = await AIService.process(data);`,
    features: [
      'Semantic document structural parsing',
      'Intelligent core takeaway extraction via OpenAI models',
      'Configurable summaries (bulleted lists, executive summaries, short abstract)',
      'Export results directly into Markdown, PDF, or Plain Text format',
      'Optimized server-side pagination for extremely large files'
    ],
    githubUrl: 'https://github.com/shivangig118/SummAIze'
  },
  {
    id: 'proj2',
    title: 'DataDash',
    description: 'Real-time analytics dashboard for monitoring microservice health.',
    longDescription: 'DataDash supplies site reliability and SRE teams with live, high-resolution infrastructure telemetry metrics. It aggregates live log collections, maps cluster node dependency relationships, and provides microsecond-precise graphs reflecting CPU, memory, and database latencies.',
    tags: ['Next.js', 'PostgreSQL'],
    type: 'chart',
    features: [
      'High-throughput time-series database architecture',
      'Dynamic charts visualizing service latency, error frequencies, and network loads',
      'Custom user-defined alerting thresholds via email and Slack webhooks',
      'Configurable metrics view matching responsive modular card panels',
      'Sub-second query latencies on historical system audit trails'
    ],
    githubUrl: 'https://github.com/shivangig118/DataDash'
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['JavaScript', 'Python', 'Java']
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Spring Boot']
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB']
  },
  {
    category: 'AI / Tools',
    skills: ['LangChain', 'Docker', 'Git']
  }
];
