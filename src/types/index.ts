export interface SiteConfig {
  name: string;
  displayName: string;
  title: string;
  description: string;
  introduction: string;
  year: number | string;
  email: string;
  githubUrl: string;
  leetCodeUrl: string;
  linkedInUrl: string;
  resumeUrl: string;
  socials: {
    github: string;
    leetcode?: string;
    linkedin: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  visualType: "debatehub" | "memory-allocator" | "placeholder" | string;
  imageSrc?: string;
  isPlaceholder?: boolean;
}
