import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, RefreshCw } from 'lucide-react'

export default function ErrorBanner({ message, onDismiss, onRetry }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="mx-4 mt-3 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl"
        >
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="flex-1 text-sm text-red-700 leading-relaxed">{message}</p>
          <div className="flex items-center gap-1 flex-shrink-0">
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800 px-2 py-1 hover:bg-red-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            )}
            <button
              onClick={onDismiss}
              className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
