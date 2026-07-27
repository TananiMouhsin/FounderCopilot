import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  MessageSquare,
  Trash2,
  Settings,
  Github,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm flex-shrink-0">
        <Zap className="w-4 h-4 text-white" fill="white" />
      </div>
      <span className="font-semibold text-slate-800 text-base tracking-tight">
        Founder<span className="text-primary-600">Copilot</span>
      </span>
    </div>
  )
}

function ConversationItem({ conversation, isActive, onSelect, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
        isActive
          ? 'bg-primary-50 border border-primary-100'
          : 'hover:bg-slate-50 border border-transparent'
      }`}
      onClick={() => onSelect(conversation.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MessageSquare
        className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-primary-500' : 'text-slate-400'}`}
      />
      <span
        className={`flex-1 text-sm truncate ${
          isActive ? 'text-primary-700 font-medium' : 'text-slate-600'
        }`}
      >
        {conversation.title}
      </span>
      <AnimatePresence>
        {(hovered || isActive) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(conversation.id)
            }}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors flex-shrink-0"
          >
            <Trash2 className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}) {
  const [collapsed, setCollapsed] = useState(false)

  const todayConvs = conversations.filter(c => {
    const today = new Date()
    const cDate = new Date(c.createdAt)
    return cDate.toDateString() === today.toDateString()
  })

  const olderConvs = conversations.filter(c => {
    const today = new Date()
    const cDate = new Date(c.createdAt)
    return cDate.toDateString() !== today.toDateString()
  })

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 260 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden md:flex flex-col glass-sidebar h-full flex-shrink-0 overflow-hidden relative z-10"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && <Logo />}
            {collapsed && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* New Chat Button */}
          <div className={`px-3 pb-3 ${collapsed ? 'flex justify-center' : ''}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNewChat}
              className={`btn-primary ${collapsed ? 'w-10 h-10 p-0' : 'w-full'}`}
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>New Chat</span>}
            </motion.button>
          </div>

          {/* Conversations */}
          {!collapsed && (
            <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin space-y-4">
              {conversations.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6 px-2">
                  Your conversations will appear here
                </p>
              )}

              {todayConvs.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 px-1">
                    Today
                  </p>
                  <AnimatePresence mode="popLayout">
                    {todayConvs.map(conv => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={conv.id === activeConversationId}
                        onSelect={onSelectConversation}
                        onDelete={onDeleteConversation}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {olderConvs.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 px-1">
                    Earlier
                  </p>
                  <AnimatePresence mode="popLayout">
                    {olderConvs.map(conv => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={conv.id === activeConversationId}
                        onSelect={onSelectConversation}
                        onDelete={onDeleteConversation}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className={`p-3 border-t border-slate-100 ${collapsed ? 'flex flex-col items-center gap-2' : 'flex items-center gap-1'}`}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button className="btn-icon" title="Settings">
              <Settings className="w-4 h-4" />
            </button>
            {!collapsed && (
              <span className="ml-auto text-xs text-slate-400">v1.0</span>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile sidebar overlay handled in App.jsx */}
    </>
  )
}
