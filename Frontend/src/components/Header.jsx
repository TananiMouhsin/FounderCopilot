import { Zap, Menu } from 'lucide-react'
import { useHealth } from '../hooks/useHealth'

const statusConfig = {
  online: {
    dot: 'bg-emerald-400',
    ring: 'bg-emerald-400/30',
    label: 'Online',
    text: 'text-emerald-600',
  },
  offline: {
    dot: 'bg-red-400',
    ring: 'bg-red-400/30',
    label: 'Offline',
    text: 'text-red-600',
  },
  checking: {
    dot: 'bg-amber-400',
    ring: 'bg-amber-400/30',
    label: 'Checking…',
    text: 'text-amber-600',
  },
  degraded: {
    dot: 'bg-amber-400',
    ring: 'bg-amber-400/30',
    label: 'Degraded',
    text: 'text-amber-600',
  },
}

function HealthBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.checking

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
      <span className={`relative flex h-2 w-2`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.ring} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`} />
      </span>
      <span className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</span>
    </div>
  )
}

export default function Header({ onMenuClick }) {
  const { status } = useHealth()

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-14 bg-white/80 backdrop-blur-sm border-b border-slate-100 flex-shrink-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden btn-icon"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo + name (mobile only) */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <span className="font-semibold text-slate-800 text-sm">
            Founder<span className="text-primary-600">Copilot</span>
          </span>
        </div>

        {/* Desktop title */}
        <div className="hidden md:flex items-center gap-2">
          <h1 className="font-semibold text-slate-800">FounderCopilot</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Model badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100">
          <Zap className="w-3 h-3 text-primary-500" />
          <span className="text-xs font-medium text-primary-600">RAG · Moroccan Law</span>
        </div>

        <HealthBadge status={status} />
      </div>
    </header>
  )
}
