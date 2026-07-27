import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, MessageSquare, Settings, Github, Trash2, Zap } from 'lucide-react'

export default function MobileSidebar({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}) {
  const handleSelect = (id) => {
    onSelectConversation(id)
    onClose()
  }

  const handleNewChat = () => {
    onNewChat()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-100 z-50 flex flex-col md:hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="font-semibold text-slate-800">
                  Founder<span className="text-primary-600">Copilot</span>
                </span>
              </div>
              <button onClick={onClose} className="btn-icon">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* New Chat */}
            <div className="p-3">
              <button
                onClick={handleNewChat}
                className="btn-primary w-full"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-thin">
              {conversations.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">
                  No conversations yet
                </p>
              )}
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    conv.id === activeConversationId
                      ? 'bg-primary-50 border border-primary-100'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                  onClick={() => handleSelect(conv.id)}
                >
                  <MessageSquare
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      conv.id === activeConversationId ? 'text-primary-500' : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`flex-1 text-sm truncate ${
                      conv.id === activeConversationId
                        ? 'text-primary-700 font-medium'
                        : 'text-slate-600'
                    }`}
                  >
                    {conv.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteConversation(conv.id)
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-100 flex items-center gap-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
              >
                <Github className="w-4 h-4" />
              </a>
              <button className="btn-icon">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
