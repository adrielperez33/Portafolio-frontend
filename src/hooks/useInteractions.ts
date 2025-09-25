"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_BASE_URL = "https://portafolio-backend-9d99.onrender.com"

interface InteractionData {
  likes: number
  views: number
  favorites: number
  comments: number
  shares: number
  userInteractions: {
    liked: boolean
    favorited: boolean
    viewed: boolean
  }
}

export const useInteractions = (projectId: string) => {
  const [interactions, setInteractions] = useState<InteractionData>({
    likes: 0,
    views: 0,
    favorites: 0,
    comments: 0,
    shares: 0,
    userInteractions: {
      liked: false,
      favorited: false,
      viewed: false,
    },
  })
  const [loading, setLoading] = useState(false)

  // Generate a simple session ID for demo purposes
  const getSessionId = () => {
    let sessionId = localStorage.getItem("portfolio_session_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("portfolio_session_id", sessionId)
    }
    return sessionId
  }

  const sessionId = getSessionId()

  useEffect(() => {
    // Track view when component mounts
    trackView()
    fetchInteractions()
  }, [projectId])

  const fetchInteractions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/interactions/${projectId}/stats`)
      setInteractions(response.data)
    } catch (error) {
      console.error("Error fetching interactions:", error)
    }
  }

  const trackView = async () => {
    if (interactions.userInteractions.viewed) return

    try {
      await axios.post(`${API_BASE_URL}/api/interactions/view`, {
        projectId,
        sessionId,
      })
      setInteractions((prev) => ({
        ...prev,
        views: prev.views + 1,
        userInteractions: { ...prev.userInteractions, viewed: true },
      }))
    } catch (error) {
      console.error("Error tracking view:", error)
    }
  }

  const toggleLike = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/interactions/like`, {
        projectId,
        sessionId,
      })

      setInteractions((prev) => ({
        ...prev,
        likes: response.data.likes,
        userInteractions: { ...prev.userInteractions, liked: response.data.liked },
      }))
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/interactions/favorite`, {
        projectId,
        sessionId,
      })

      setInteractions((prev) => ({
        ...prev,
        favorites: response.data.favorites,
        userInteractions: { ...prev.userInteractions, favorited: response.data.favorited },
      }))
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setLoading(false)
    }
  }

  const shareProject = async (platform: string) => {
    try {
      await axios.post(`${API_BASE_URL}/api/interactions/share`, {
        projectId,
        sessionId,
        platform,
      })

      setInteractions((prev) => ({
        ...prev,
        shares: prev.shares + 1,
      }))
    } catch (error) {
      console.error("Error tracking share:", error)
    }
  }

  return {
    interactions,
    loading,
    toggleLike,
    toggleFavorite,
    shareProject,
    trackView,
  }
}
