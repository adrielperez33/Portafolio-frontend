"use client"

import { useState } from "react"
import { useInteractions } from "../hooks/useInteractions"

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

interface InteractiveProjectCardProps {
  project: Project
  onProjectClick?: (project: Project) => void
}

const InteractiveProjectCard = ({ project, onProjectClick }: InteractiveProjectCardProps) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const { interactions, loading, toggleLike, toggleFavorite, shareProject } = useInteractions(project.id)

  const handleShare = async (platform: string) => {
    const url = project.live_url || window.location.href
    const text = `Check out this amazing project: ${project.title}`

    await shareProject(platform)

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case "copy":
        navigator.clipboard.writeText(url)
        // You could add a toast notification here
        break
    }
  }

  return (
    <div
      className="group glass-effect rounded-xl p-6 hover-lift cursor-pointer relative"
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      onClick={() => onProjectClick?.(project)}
    >
      {/* Project Image/Preview */}
      <div className="relative mb-6 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {project.category === "web"
              ? "🌐"
              : project.category === "ai"
                ? "🤖"
                : project.category === "mobile"
                  ? "📱"
                  : "💻"}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              project.status === "completed" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Interactive Overlay */}
        <div
          className={`absolute inset-0 bg-background/90 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            hoveredProject === project.id ? "opacity-100" : "opacity-0"
          }`}
        >
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}

          {/* Share Button */}
          <div className="relative group/share">
            <button className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>

            {/* Share Dropdown */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/share:opacity-100 transition-opacity bg-background border border-border rounded-lg p-2 shadow-lg">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare("twitter")
                  }}
                  className="p-2 hover:bg-muted rounded text-xs"
                >
                  Twitter
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare("linkedin")
                  }}
                  className="p-2 hover:bg-muted rounded text-xs"
                >
                  LinkedIn
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare("copy")
                  }}
                  className="p-2 hover:bg-muted rounded text-xs"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded font-mono">
              {tech}
            </span>
          ))}
        </div>

        {/* Interactive Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleLike()
              }}
              disabled={loading}
              className={`flex items-center gap-1 text-xs transition-colors ${
                interactions.userInteractions.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
              }`}
            >
              <svg
                className={`w-4 h-4 ${interactions.userInteractions.liked ? "fill-current" : ""}`}
                fill={interactions.userInteractions.liked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {interactions.likes}
            </button>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite()
              }}
              disabled={loading}
              className={`flex items-center gap-1 text-xs transition-colors ${
                interactions.userInteractions.favorited
                  ? "text-yellow-500"
                  : "text-muted-foreground hover:text-yellow-500"
              }`}
            >
              <svg
                className={`w-4 h-4 ${interactions.userInteractions.favorited ? "fill-current" : ""}`}
                fill={interactions.userInteractions.favorited ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              {interactions.favorites}
            </button>

            {/* Views */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {interactions.views}
            </span>
          </div>

          {/* Performance Score */}
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">{project.metrics.performance_score}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveProjectCard
