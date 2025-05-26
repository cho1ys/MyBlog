export interface MenuItem {
    id: number;
    title: string;
    path: string;
    description: string;
    icon: string;
    color: string;
    category?: string;
    tech?: string[];
  }
  
  export interface TechStackItem {
    name: string;
    level: number;
    color: string;
  }
  
  export interface GitHubStats {
    totalCommits: number;
    totalRepos: number;
    techStack: TechStackItem[];
    createdAt: string | null;
    loading: boolean;
  }