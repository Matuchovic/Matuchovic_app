'use client'

import { useEffect, useState } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

let toastListeners: Array<(toast: Toast) => void> = []

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  const toast: Toast = { id: Date.now().toString(), message, type }
  toastListeners.forEach(listener => listener(toast))
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, 4000)
    }
    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener)
    }
  }, [])

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide
            border backdrop-blur-[24px] shadow-2xl
            animate-fade-up
            ${toast.type === 'success'
              ? 'bg-gold/10 border-gold/30 text-gold'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
            }
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
