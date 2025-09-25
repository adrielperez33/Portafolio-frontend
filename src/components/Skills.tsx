"use client"

import { useState } from "react"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  experience_years: number
  projects_count: number
  learning_progress: number
}

interface SkillsProps {
  data?: {
    skills: Skill[]
    categories: string[]
  }
}

const Skills = ({ data }: SkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const defaultSkills: Skill[] = [
    {
      id: "1",
      name: "React",
      category: "frontend",
      level: 90,
      experience_years: 3,
      projects_count: 15,
      learning_progress: 85,
    },
    {
      id: "2",
      name: "Node.js",
      category: "backend",
      level: 85,
      experience_years: 2.5,
      projects_count: 12,
      learning_progress: 80,
    },
    {
      id: "3",
      name: "TypeScript",
      category: "language",
      level: 88,
      experience_years: 2,
      projects_count: 18,
      learning_progress: 90,
    },
    {
      id: "4",
      name: "PostgreSQL",
      category: "database",
      level: 75,
      experience_years: 2,
      projects_count: 8,
      learning_progress: 70,
    },
    {
      id: "5",
      name: "Docker",
      category: "devops",
      level: 70,
      experience_years: 1.5,
      projects_count: 6,
      learning_progress: 75,
    },
    {
      id: "6",
      name: "Python",
      category: "language",
      level: 80,
      experience_years: 3,
      projects_count: 10,
      learning_progress: 85,
    },
  ]

  const skills = data?.skills || defaultSkills
  const categories = ["all", ...new Set(skills.map((s) => s.category))]

  const filteredSkills = selectedCategory === "all" ? skills : skills.filter((s) => s.category === selectedCategory)

  const getSkillIcon = (category: string) => {
    const icons = {
      frontend: "🎨",
      backend: "⚙️",
      language: "💻",
      database: "🗄️",
      devops: "🚀",
      mobile: "📱",
    }
    return icons[category as keyof typeof icons] || "💡"
  }

  const getSkillColor = (level: number) => {
    if (level >= 85) return "text-success"
    if (level >= 70) return "text-primary"
    if (level >= 50) return "text-warning"
    return "text-muted-foreground"
  }

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life. Constantly learning and evolving with the latest
            industry trends.
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

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="glass-effect rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getSkillIcon(skill.category)}</span>
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{skill.category}</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${getSkillColor(skill.level)}`}>{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>

              {/* Skill Stats */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-primary">{skill.experience_years}y</div>
                  <div className="text-muted-foreground text-xs">Experience</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">{skill.projects_count}</div>
                  <div className="text-muted-foreground text-xs">Projects</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">{skill.learning_progress}%</div>
                  <div className="text-muted-foreground text-xs">Learning</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{skills.length}+</div>
            <div className="text-muted-foreground">Technologies</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {Math.round(skills.reduce((acc, skill) => acc + skill.experience_years, 0) / skills.length)}+
            </div>
            <div className="text-muted-foreground">Avg. Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {skills.reduce((acc, skill) => acc + skill.projects_count, 0)}+
            </div>
            <div className="text-muted-foreground">Total Projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
