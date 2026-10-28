export interface SiteConfig {
  name: string;
  displayName: string;
  title: string;
  description: string;
  introduction: string;
  year: number | string;
  email: string;
  githubUrl: string;
  linkedInUrl: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}
