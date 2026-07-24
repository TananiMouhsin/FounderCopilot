import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Square, Loader2 } from 'lucide-react'

const MAX_CHARS = 2000

export default function ChatInput({ onSend, isLoading, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const canSend = value.trim().length > 0 && !isLoading && !disabled && value.length <= MAX_CHARS

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend(value.trim())
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [canSend, onSend, value])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isLoading])

  const charsLeft = MAX_CHARS - value.length
  const isOverLimit = charsLeft < 0
  const isNearLimit = charsLeft < 100 && !isOverLimit

  return (
    <div className="sticky bottom-0 z-10 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent pt-4 pb-4 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={false}
          animate={{
            boxShadow: value
              ? '0 0 0 2px rgba(59,130,246,0.25), 0 4px 24px rgba(0,0,0,0.08)'
              : '0 2px 16px rgba(0,0,0,0.06)',
          }}
          transition={{ duration: 0.15 }}
          className="relative flex items-end gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-primary-300 transition-colors duration-200"
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || disabled}
            placeholder="Ask anything about entrepreneurship in Morocco..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none leading-relaxed max-h-40 overflow-y-auto no-scrollbar disabled:opacity-60"
            style={{ minHeight: '24px' }}
          />

          <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
            {/* Char counter */}
            <AnimatePresence>
              {(isNearLimit || isOverLimit) && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`text-xs font-medium tabular-nums ${
                    isOverLimit ? 'text-red-500' : 'text-amber-500'
                  }`}
                >
                  {charsLeft}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Send / Stop button */}
            <motion.button
              whileHover={canSend ? { scale: 1.05 } : {}}
              whileTap={canSend ? { scale: 0.95 } : {}}
              onClick={handleSend}
              disabled={!canSend && !isLoading}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                canSend
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
                  : isLoading
                  ? 'bg-primary-100 text-primary-400 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-400 mt-2">
          Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-medium">Enter</kbd> to send &middot;{' '}
          <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-medium">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}
