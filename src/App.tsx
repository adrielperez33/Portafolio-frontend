"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Hero from "./components/Hero"
import Navigation from "./components/Navigation"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import LiveStats from "./components/LiveStats"
import AnalyticsDashboard from "./components/AnalyticsDashboard"
import type { PortfolioData } from "./types"

const API_BASE_URL = "https://portafolio-backend-9d99.onrender.com"

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [portfolioRes, projectsRes, skillsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/portfolio`),
          axios.get(`${API_BASE_URL}/api/projects`),
          axios.get(`${API_BASE_URL}/api/skills`),
        ])

        setPortfolioData({
          portfolio: portfolioRes.data,
          projects: {
            projects: Array.isArray(projectsRes.data) ? projectsRes.data : projectsRes.data.projects || [],
            total: Array.isArray(projectsRes.data) ? projectsRes.data.length : projectsRes.data.total || 0,
          },
          skills: {
            skills: Array.isArray(skillsRes.data) ? skillsRes.data : skillsRes.data.skills || [],
            categories: Array.isArray(skillsRes.data)
              ? [...new Set(skillsRes.data.map((skill: any) => skill.category))]
              : skillsRes.data.categories || [],
          },
        })
      } catch (error) {
        console.error("Error fetching portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault()
        setShowAnalytics(!showAnalytics)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showAnalytics])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero data={portfolioData?.portfolio} />
        <Projects data={portfolioData?.projects} />
        <Skills data={portfolioData?.skills} />
        <Contact />
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <LiveStats />
          </div>
        </section>
      </main>
      <Footer />

      {showAnalytics && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6 sticky top-4 bg-background/80 backdrop-blur-sm rounded-lg p-4">
                <div>
                  <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                  <p className="text-muted-foreground">Press Ctrl+A to toggle • ESC to close</p>
                </div>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <AnalyticsDashboard />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
