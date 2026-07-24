import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatMessage from '../components/ChatMessage'
import ThinkingBubble from '../components/ThinkingBubble'
import EmptyState from '../components/EmptyState'
import ErrorBanner from '../components/ErrorBanner'
import ChatInput from '../components/ChatInput'

export default function ChatPage({
  messages,
  isLoading,
  error,
  activeConversationId,
  onSend,
  onSuggestionClick,
  onClearError,
}) {
  const bottomRef = useRef(null)
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleRegenerate = () => {
    if (lastUserMessage) {
      onSend(lastUserMessage.content)
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Error banner */}
      <ErrorBanner
        message={error}
        onDismiss={onClearError}
        onRetry={lastUserMessage ? handleRegenerate : null}
      />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {messages.length === 0 && !isLoading ? (
          <EmptyState onSuggestionClick={onSuggestionClick} />
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onRegenerate={
                    message.role === 'assistant' ? handleRegenerate : undefined
                  }
                />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isLoading && <ThinkingBubble />}
            </AnimatePresence>

            <div ref={bottomRef} className="h-1" />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSend}
        isLoading={isLoading}
        disabled={false}
      />
    </div>
  )
}
