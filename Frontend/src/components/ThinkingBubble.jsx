import { motion } from 'framer-motion'

export default function ThinkingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
        <span className="text-white text-xs font-bold">FC</span>
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-1.5 px-4 py-3.5 bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-message">
        <span className="thinking-dot w-2 h-2 rounded-full bg-primary-400 inline-block" />
        <span className="thinking-dot w-2 h-2 rounded-full bg-primary-400 inline-block" />
        <span className="thinking-dot w-2 h-2 rounded-full bg-primary-400 inline-block" />
      </div>
    </motion.div>
  )
}
