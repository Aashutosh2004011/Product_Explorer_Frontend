'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import api from '@/lib/api'

interface ViewHistoryContextType {
  sessionId: string
  trackView: (path: string, data: Record<string, any>) => void
  history: any[]
}

const ViewHistoryContext = createContext<ViewHistoryContextType | undefined>(undefined)

export function ViewHistoryProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string>('')
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    // Get or create session ID
    let sid = localStorage.getItem('sessionId')
    if (!sid) {
      sid = uuidv4()
      localStorage.setItem('sessionId', sid)
    }
    setSessionId(sid)

    // Load history from localStorage
    const savedHistory = localStorage.getItem('viewHistory')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to parse view history:', e)
      }
    }
  }, [])

  const trackView = useCallback(async (path: string, data: Record<string, any>) => {
    if (!sessionId) return

    const viewData = {
      sessionId,
      pathJson: { path, ...data },
      page: path,
    }

    // Update local history using functional update to avoid dependency on history
    setHistory(prevHistory => {
      const newHistory = [viewData, ...prevHistory.slice(0, 49)]
      localStorage.setItem('viewHistory', JSON.stringify(newHistory))
      return newHistory
    })

    // Send to backend (fire and forget)
    try {
      await api.post('/view-history', viewData)
    } catch (error) {
      console.error('Failed to save view history:', error)
    }
  }, [sessionId])

  return (
    <ViewHistoryContext.Provider value={{ sessionId, trackView, history }}>
      {children}
    </ViewHistoryContext.Provider>
  )
}

export function useViewHistory() {
  const context = useContext(ViewHistoryContext)
  if (!context) {
    throw new Error('useViewHistory must be used within ViewHistoryProvider')
  }
  return context
}
