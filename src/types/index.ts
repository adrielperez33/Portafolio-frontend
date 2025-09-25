export interface Portfolio {
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string
  website: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  bio: string
  experience: number
  education: string[]
  certifications: string[]
  languages: string[]
  interests: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: string
  status: string
  startDate?: string
  endDate?: string
  github_url?: string
  live_url?: string
  image_url?: string
  featured?: boolean
  metrics: {
    views: number
    likes: number
    shares?: number
    comments?: number
    performance_score: number
  }
  performance?: {
    loadTime: number
    uptime: number
    responseTime: number
  }
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  experience_years: number
  projects_count: number
  learning_progress: number
  certifications?: string[]
  lastUsed?: string
  trending?: boolean
}

export interface PortfolioData {
  portfolio: Portfolio
  projects: {
    projects: Project[]
    total: number
  }
  skills: {
    skills: Skill[]
    categories: string[]
  }
}

export interface InteractionData {
  likes: number
  favorites: number
  views: number
  shares: number
  comments: number
}
