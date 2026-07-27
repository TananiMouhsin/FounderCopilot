import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import {
  Copy,
  Check,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  User,
} from 'lucide-react'
import SourceCard from './SourceCard'

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="btn-icon"
      title="Copy"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Copy className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function MessageActions({ content, onRegenerate }) {
  const [liked, setLiked] = useState(null)

  return (
    <div className="flex items-center gap-1 mt-2">
      <CopyButton text={content} />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRegenerate}
        className="btn-icon"
        title="Regenerate"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </motion.button>
      <div className="w-px h-4 bg-slate-200 mx-1" />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLiked(true)}
        className={`btn-icon ${liked === true ? 'text-emerald-500 bg-emerald-50' : ''}`}
        title="Good response"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLiked(false)}
        className={`btn-icon ${liked === false ? 'text-red-500 bg-red-50' : ''}`}
        title="Bad response"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  )
}

function Sources({ sources }) {
  const [expanded, setExpanded] = useState(true)

  // Remove invalid sources
  const validSources = (sources || []).filter(
    (src) =>
      src &&
      src.source &&
      src.source !== "Unknown" &&
      src.source !== "unknown"
  )

  if (validSources.length === 0) return null

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors mb-2 group"
      >
        <BookOpen className="w-3.5 h-3.5 text-primary-400 group-hover:text-primary-500 transition-colors" />
        <span>
          {validSources.length} source{validSources.length > 1 ? "s" : ""}
        </span>

        {expanded ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden"
          >
            {validSources.map((src, i) => (
              <SourceCard key={i} source={src} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ChatMessage({ message, onRegenerate }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex justify-end"
      >
        <div className="flex items-end gap-2.5 max-w-[75%]">
          <div className="flex flex-col items-end gap-1">
            <div className="px-4 py-3 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl rounded-br-sm shadow-sm">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
            <span className="text-xs text-slate-400 pr-1">{formatTime(message.timestamp)}</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mb-5">
            <User className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
        <Zap className="w-4 h-4 text-white" fill="white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-message px-4 py-3.5">
          <div className="prose-chat">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1.5 px-1">
          <MessageActions content={message.content} onRegenerate={onRegenerate} />
          <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
        </div>

        <Sources sources={message.sources} />
      </div>
    </motion.div>
  )
}
