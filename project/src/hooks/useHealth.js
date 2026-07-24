import { useState, useEffect, useCallback } from 'react'
import { checkHealth } from '../services/api'

export function useHealth() {
  const [status, setStatus] = useState('checking')

  const check = useCallback(async () => {
    try {
      const data = await checkHealth()
      setStatus(data.status === 'ok' ? 'online' : 'degraded')
    } catch {
      setStatus('offline')
    }
  }, [])

  useEffect(() => {
    check()
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [check])

  return { status, refetch: check }
}
