import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MobileSidebar from './components/MobileSidebar'
import Header from './components/Header'
import ChatPage from './pages/ChatPage'
import { useChat } from './hooks/useChat'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const {
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
  } = useChat()

  const handleSend = (question) => {
    sendMessage(question, activeConversationId)
  }

  const handleSuggestionClick = (question) => {
    sendMessage(question, null)
  }

  const handleNewChat = () => {
    createNewConversation()
  }

  return (
    <div className="flex h-full w-full bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 min-h-0 flex flex-col">
          <ChatPage
            messages={messages}
            isLoading={isLoading}
            error={error}
            activeConversationId={activeConversationId}
            onSend={handleSend}
            onSuggestionClick={handleSuggestionClick}
            onClearError={clearError}
          />
        </main>
      </div>
    </div>
  )
}
