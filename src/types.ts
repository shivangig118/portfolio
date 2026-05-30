export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  type: 'code' | 'chart';
  codeSnippet?: string;
  features: string[];
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
  type: 'work' | 'internship';
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
