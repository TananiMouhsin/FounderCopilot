import { useState, useCallback } from 'react'
import { askQuestion } from '../services/api'

export function useChat() {
  const [conversations, setConversations] = useState([])
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null
  const messages = activeConversation?.messages || []

  const createNewConversation = useCallback(() => {
    const id = Date.now().toString()
    const newConv = {
      id,
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
    }
    setConversations(prev => [newConv, ...prev])
    setActiveConversationId(id)
    setError(null)
    return id
  }, [])

  const sendMessage = useCallback(async (question, conversationId) => {
    let convId = conversationId

    if (!convId) {
      convId = Date.now().toString()
      const newConv = {
        id: convId,
        title: question.slice(0, 50) + (question.length > 50 ? '…' : ''),
        messages: [],
        createdAt: new Date(),
      }
      setConversations(prev => [newConv, ...prev])
      setActiveConversationId(convId)
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date(),
    }

    setConversations(prev =>
      prev.map(c => {
        if (c.id !== convId) return c
        const updatedMessages = [...c.messages, userMessage]
        return {
          ...c,
          title: c.messages.length === 0
            ? question.slice(0, 50) + (question.length > 50 ? '…' : '')
            : c.title,
          messages: updatedMessages,
        }
      })
    )

    setIsLoading(true)
    setError(null)

    try {
      const data = await askQuestion(question)

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date(),
      }

      setConversations(prev =>
        prev.map(c =>
          c.id === convId
            ? { ...c, messages: [...c.messages, assistantMessage] }
            : c
        )
      )
    } catch (err) {
      const errorMessage = err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')
        ? 'Unable to connect to the server. Please make sure the backend is running on port 8000.'
        : err.response?.data?.detail || err.message || 'An unexpected error occurred.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const selectConversation = useCallback((id) => {
    setActiveConversationId(id)
    setError(null)
  }, [])

  const deleteConversation = useCallback((id) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    setActiveConversationId(prev => {
      if (prev === id) return null
      return prev
    })
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {
    conversations,
    activeConversationId,
    messages,
    isLoading,
    error,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
    clearError,
  }
}
