export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'ai-iot' | 'ai-vision' | 'clean-tech' | 'web-fullstack' | 'mobile-logistics';
  categoryLabel: string;
  awardBadge?: {
    text: string;
    event: string;
    year: string;
    isChampion?: boolean;
  };
  description: string;
  longDescription: string;
  metrics: ProjectMetric[];
  techStack: string[];
  features: string[];
  architectureSummary: string;
  demoLink: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  githubRepoName?: string;
  gradient?: {
    from: string;
    to: string;
    accent: string;
  };
  interactiveType: 'biogas-telemetry' | 'lontar-scanner' | 'vander-scada' | 'pangan-map' | 'sigap-telemetry' | 'obatku-inventory';
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    iconName: string;
    description: string;
    tags: string[];
  }[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  roleType: 'education' | 'organization' | 'achievement';
  location: string;
  description: string;
  highlights: string[];
  badge?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
