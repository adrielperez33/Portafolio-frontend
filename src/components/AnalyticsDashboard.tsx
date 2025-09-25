"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_BASE_URL = "https://portafolio-backend-9d99.onrender.com"

interface AnalyticsData {
  overview: {
    totalViews: number
    totalLikes: number
    totalShares: number
    totalComments: number
    avgEngagementRate: number
    topPerformingProject: string
  }
  trends: {
    daily: Array<{ date: string; views: number; likes: number; shares: number }>
    weekly: Array<{ week: string; views: number; engagement: number }>
    monthly: Array<{ month: string; views: number; projects: number }>
  }
  projects: Array<{
    id: string
    title: string
    views: number
    likes: number
    shares: number
    engagementRate: number
    category: string
  }>
  insights: Array<{
    type: string
    title: string
    description: string
    impact: string
    recommendation: string
  }>
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [selectedView, setSelectedView] = useState("overview")

  useEffect(() => {
    fetchAnalyticsData()
  }, [selectedTimeRange])

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analytics/dashboard?range=${selectedTimeRange}`)
      setAnalyticsData(response.data)
    } catch (error) {
      console.error("Error fetching analytics data:", error)
      // Mock data for demo
      setAnalyticsData({
        overview: {
          totalViews: 12450,
          totalLikes: 892,
          totalShares: 234,
          totalComments: 156,
          avgEngagementRate: 7.2,
          topPerformingProject: "E-Commerce Platform",
        },
        trends: {
          daily: [
            { date: "2025-01-20", views: 245, likes: 18, shares: 5 },
            { date: "2025-01-21", views: 312, likes: 24, shares: 8 },
            { date: "2025-01-22", views: 189, likes: 15, shares: 3 },
            { date: "2025-01-23", views: 456, likes: 32, shares: 12 },
            { date: "2025-01-24", views: 378, likes: 28, shares: 9 },
            { date: "2025-01-25", views: 523, likes: 41, shares: 15 },
            { date: "2025-01-26", views: 612, likes: 48, shares: 18 },
          ],
          weekly: [
            { week: "Week 1", views: 1250, engagement: 6.8 },
            { week: "Week 2", views: 1456, engagement: 7.2 },
            { week: "Week 3", views: 1789, engagement: 8.1 },
            { week: "Week 4", views: 2134, engagement: 7.9 },
          ],
          monthly: [
            { month: "Oct", views: 3245, projects: 8 },
            { month: "Nov", views: 4567, projects: 10 },
            { month: "Dec", views: 5234, projects: 12 },
            { month: "Jan", views: 6789, projects: 15 },
          ],
        },
        projects: [
          {
            id: "1",
            title: "E-Commerce Platform",
            views: 2456,
            likes: 189,
            shares: 45,
            engagementRate: 9.5,
            category: "web",
          },
          {
            id: "2",
            title: "AI Chat Application",
            views: 1890,
            likes: 156,
            shares: 32,
            engagementRate: 8.2,
            category: "ai",
          },
          {
            id: "3",
            title: "Mobile Fitness Tracker",
            views: 1234,
            likes: 98,
            shares: 21,
            engagementRate: 7.9,
            category: "mobile",
          },
        ],
        insights: [
          {
            type: "trend",
            title: "Growing Mobile Interest",
            description: "Mobile projects are gaining 23% more engagement this month",
            impact: "positive",
            recommendation: "Consider developing more mobile-focused projects",
          },
          {
            type: "performance",
            title: "Peak Engagement Hours",
            description: "Most engagement occurs between 2-4 PM EST",
            impact: "neutral",
            recommendation: "Schedule content updates during peak hours",
          },
          {
            type: "opportunity",
            title: "AI Project Potential",
            description: "AI projects show 15% higher conversion rates",
            impact: "positive",
            recommendation: "Expand AI project portfolio for better engagement",
          },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
  ]

  const views = [
    { value: "overview", label: "Overview" },
    { value: "projects", label: "Projects" },
    { value: "insights", label: "Insights" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-effect rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!analyticsData) return null

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your portfolio performance and engagement metrics</p>
        </div>

        <div className="flex gap-4">
          {/* View Selector */}
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
          >
            {views.map((view) => (
              <option key={view.value} value={view.value}>
                {view.label}
              </option>
            ))}
          </select>

          {/* Time Range Selector */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Section */}
      {selectedView === "overview" && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {analyticsData.overview.totalViews.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
              <div className="text-xs text-success mt-1">+12.5% vs last period</div>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {analyticsData.overview.totalLikes.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
              <div className="text-xs text-success mt-1">+8.3% vs last period</div>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {analyticsData.overview.totalShares.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Shares</div>
              <div className="text-xs text-success mt-1">+15.7% vs last period</div>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {analyticsData.overview.totalComments.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Comments</div>
              <div className="text-xs text-warning mt-1">-2.1% vs last period</div>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{analyticsData.overview.avgEngagementRate}%</div>
              <div className="text-sm text-muted-foreground">Engagement Rate</div>
              <div className="text-xs text-success mt-1">+5.2% vs last period</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Daily Trends Chart */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Trends</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {analyticsData.trends.daily.map((day, index) => {
                  const maxViews = Math.max(...analyticsData.trends.daily.map((d) => d.views))
                  const height = (day.views / maxViews) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center gap-1 mb-2">
                        <div
                          className="w-full bg-primary rounded-t"
                          style={{ height: `${height * 0.6}%` }}
                          title={`Views: ${day.views}`}
                        ></div>
                        <div
                          className="w-full bg-accent rounded-t"
                          style={{
                            height: `${(day.likes / Math.max(...analyticsData.trends.daily.map((d) => d.likes))) * 40}%`,
                          }}
                          title={`Likes: ${day.likes}`}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground transform -rotate-45 origin-center">
                        {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span>Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded"></div>
                  <span>Likes</span>
                </div>
              </div>
            </div>

            {/* Top Projects */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performing Projects</h3>
              <div className="space-y-4">
                {analyticsData.projects.slice(0, 5).map((project, index) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{project.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">{project.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{project.views.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{project.engagementRate}% engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Projects Section */}
      {selectedView === "projects" && (
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Project Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Project</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-right py-3 px-4 font-medium">Views</th>
                  <th className="text-right py-3 px-4 font-medium">Likes</th>
                  <th className="text-right py-3 px-4 font-medium">Shares</th>
                  <th className="text-right py-3 px-4 font-medium">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.projects.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <div className="font-medium">{project.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded capitalize">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">{project.views.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{project.likes.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{project.shares.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${
                          project.engagementRate >= 8
                            ? "text-success"
                            : project.engagementRate >= 6
                              ? "text-warning"
                              : "text-muted-foreground"
                        }`}
                      >
                        {project.engagementRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Insights Section */}
      {selectedView === "insights" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
          {analyticsData.insights.map((insight, index) => (
            <div key={index} className="glass-effect rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    insight.impact === "positive"
                      ? "bg-success/10 text-success"
                      : insight.impact === "negative"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  {insight.type === "trend" ? "📈" : insight.type === "performance" ? "⚡" : "💡"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        insight.impact === "positive"
                          ? "bg-success/10 text-success"
                          : insight.impact === "negative"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{insight.description}</p>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-sm font-medium mb-1">Recommendation:</div>
                    <div className="text-sm text-muted-foreground">{insight.recommendation}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AnalyticsDashboard
