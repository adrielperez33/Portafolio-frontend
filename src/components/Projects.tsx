"use client"

import { useState } from "react"
import InteractiveProjectCard from "./InteractiveProjectCard"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  status: string
  github_url?: string
  live_url?: string
  image_url?: string
  metrics: {
    views: number
    likes: number
    performance_score: number
  }
}

interface ProjectsProps {
  data?: {
    projects: Project[]
    total: number
  }
}

const Projects = ({ data }: ProjectsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI and robust backend",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      category: "web",
      status: "completed",
      github_url: "https://github.com",
      live_url: "https://example.com",
      metrics: { views: 1250, likes: 89, performance_score: 95 },
    },
    {
      id: "2",
      title: "AI Chat Application",
      description: "Real-time chat app with AI integration and smart responses",
      technologies: ["Next.js", "OpenAI", "WebSocket", "Redis"],
      category: "ai",
      status: "completed",
      github_url: "https://github.com",
      live_url: "https://example.com",
      metrics: { views: 890, likes: 67, performance_score: 92 },
    },
    {
      id: "3",
      title: "Mobile Fitness Tracker",
      description: "Cross-platform mobile app for fitness tracking and analytics",
      technologies: ["React Native", "Firebase", "Chart.js"],
      category: "mobile",
      status: "in-progress",
      github_url: "https://github.com",
      metrics: { views: 456, likes: 34, performance_score: 88 },
    },
  ]

  const projects = data?.projects || defaultProjects
  const categories = ["all", ...new Set(projects.map((p) => p.category))]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="section-padding bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development, AI integration, and modern web
            technologies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <InteractiveProjectCard key={project.id} project={project} onProjectClick={handleProjectClick} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
            View All Projects
          </button>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-effect rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button onClick={closeProjectModal} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Project Image */}
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  {selectedProject.image_url ? (
                    <img
                      src={selectedProject.image_url || "/placeholder.svg"}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-6xl">
                      {selectedProject.category === "web"
                        ? "🌐"
                        : selectedProject.category === "ai"
                          ? "🤖"
                          : selectedProject.category === "mobile"
                            ? "📱"
                            : "💻"}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
