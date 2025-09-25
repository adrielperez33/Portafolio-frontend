"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_BASE_URL = "https://portafolio-backend-9d99.onrender.com"

interface LiveStatsData {
  totalViews: number
  totalLikes: number
  totalProjects: number
  activeUsers: number
  topProject: {
    title: string
    views: number
  }
  recentActivity: Array<{
    type: string
    project: string
    timestamp: string
  }>
}

const LiveStats = () => {
  const [stats, setStats] = useState<LiveStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/analytics/live-stats`)
        setStats(response.data)
      } catch (error) {
        console.error("Error fetching live stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    // Update stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="glass-effect rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-8 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Live Portfolio Stats</h3>
        <div className="flex items-center gap-2 text-xs text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          Live
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalViews.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalLikes.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Likes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
          <div className="text-xs text-muted-foreground">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.activeUsers}</div>
          <div className="text-xs text-muted-foreground">Active Users</div>
        </div>
      </div>

      {stats.topProject && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium">Top Project</div>
          <div className="text-xs text-muted-foreground">
            {stats.topProject.title} • {stats.topProject.views} views
          </div>
        </div>
      )}

      {stats.recentActivity.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Recent Activity</div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {stats.recentActivity.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {activity.type} on {activity.project}
                </span>
                <span className="text-muted-foreground">{new Date(activity.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveStats
