export interface Project {
  id: string;
  name: string;
  color?: string;
  createdAt: string; // ISO string format
}

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
} 