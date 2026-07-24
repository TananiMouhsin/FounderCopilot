import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'

function ScoreBar({ score }) {
  const pct = Math.round(score * 100)
  const color =
    pct >= 85 ? 'bg-emerald-400' : pct >= 65 ? 'bg-amber-400' : 'bg-slate-300'

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
      <span className="text-xs font-medium text-slate-500 tabular-nums w-9 text-right">
        {pct}%
      </span>
    </div>
  )
}

export default function SourceCard({ source, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.07 }}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(31,38,135,0.12)' }}
      className="group flex flex-col gap-2.5 p-3.5 bg-white border border-slate-100 rounded-xl shadow-message cursor-default hover:border-primary-100 transition-all duration-200"
    >
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
          <FileText className="w-3.5 h-3.5 text-primary-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-primary-700 transition-colors">
            {source.title}
          </p>
          <p className="text-xs text-slate-400 truncate mt-0.5 flex items-center gap-1">
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
            {source.source}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
          pp. {source.page_start}–{source.page_end}
        </span>
        <div className="flex-1 max-w-[120px]">
          <ScoreBar score={source.score} />
        </div>
      </div>
    </motion.div>
  )
}
