import { motion } from 'framer-motion'
import { Zap, ArrowRight } from 'lucide-react'

const SUGGESTIONS = [
  {
    question: 'How to create a SARL in Morocco?',
    icon: '🏢',
    description: 'Step-by-step company formation guide',
  },
  {
    question: 'What is the minimum capital required for a SARL?',
    icon: '💰',
    description: 'Capital requirements and regulations',
  },
  {
    question: 'What taxes will my startup pay in Morocco?',
    icon: '📊',
    description: 'Tax obligations for new businesses',
  },
]

export default function EmptyState({ onSuggestionClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg mb-6"
      >
        <Zap className="w-8 h-8 text-white" fill="white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-2xl font-bold text-slate-800 mb-2"
      >
        Founder<span className="gradient-text">Copilot</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="text-slate-500 text-sm max-w-sm mb-10 leading-relaxed"
      >
        Your AI advisor for creating and managing companies in Morocco. Powered by official legal and administrative documents.
      </motion.p>

      {/* Suggestion cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s.question}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(31,38,135,0.12)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSuggestionClick(s.question)}
            className="flex flex-col items-start gap-2 p-4 bg-white border border-slate-100 rounded-2xl text-left hover:border-primary-100 hover:bg-primary-50/30 transition-all duration-200 shadow-message group"
          >
            <span className="text-xl">{s.icon}</span>
            <p className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors leading-snug">
              {s.question}
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-primary-500 transition-colors mt-auto">
              <span>{s.description}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
