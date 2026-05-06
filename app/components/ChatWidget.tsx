'use client'

import { useState, useRef, useEffect } from 'react'
import { X, MessageCircle, Send } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What do you build?',
  'How much does a site cost?',
  'How long does it take?',
  'Can you add AI to my site?',
]

export default function ChatWidget() {
  const [open,      setOpen]      = useState(false)
  const [messages,  setMessages]  = useState<Message[]>([])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [showLabel, setShowLabel] = useState(true)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setShowLabel(false)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const next: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setLoading(true)
    setMessages(m => [...m, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      })

      if (!res.body) throw new Error('No stream')
      const reader  = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setMessages(m => {
          const copy = [...m]
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: copy[copy.length - 1].content + chunk }
          return copy
        })
      }
    } catch {
      setMessages(m => {
        const copy = [...m]
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: "Something went wrong. Reach Trey directly at 725-377-0241." }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-3">
        {showLabel && !open && (
          <div
            className="text-sm font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap border"
            style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            Ask about my services
          </div>
        )}
        <div className="relative">
          {!open && (
            <span className="absolute inset-0 rounded-full opacity-30 animate-ping" style={{ background: 'var(--purple)' }} />
          )}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Open chat"
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'var(--purple)' }}
          >
            {open ? <X size={20} color="#fff" /> : <MessageCircle size={22} color="#fff" strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-3 md:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[340px] md:w-[380px] max-w-[400px] rounded-2xl overflow-hidden shadow-2xl flex flex-col border"
          style={{ height: 'min(480px, calc(100dvh - 180px))', background: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 border-b shrink-0"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
              style={{ background: 'var(--purple)', color: '#fff' }}
            >
              TM
            </div>
            <div>
              <div className="text-sm font-bold leading-tight" style={{ color: 'var(--text)' }}>TM Design</div>
              <div className="text-[11px]" style={{ color: 'var(--muted)' }}>AI Assistant · replies instantly</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto transition" style={{ color: 'var(--dim)' }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col gap-3">
                <div
                  className="text-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] leading-relaxed"
                  style={{ background: 'var(--surface)', color: 'var(--muted)' }}
                >
                  Hey! I&apos;m Trey&apos;s assistant. Ask me anything about web design, pricing, or what TM Design can build for your business.
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full transition border"
                      style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)', color: 'var(--muted)' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="text-sm px-4 py-2.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap"
                  style={
                    m.role === 'user'
                      ? { background: 'var(--purple)', color: '#fff', borderRadius: '1rem 1rem 0.25rem 1rem' }
                      : { background: 'var(--surface)', color: 'var(--muted)', borderRadius: '0.25rem 1rem 1rem 1rem' }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl flex gap-1 items-center" style={{ background: 'var(--surface)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--muted)', animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--muted)', animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--muted)', animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="px-3 py-3 border-t shrink-0 flex gap-2 items-center"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything…"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full focus:outline-none disabled:opacity-50 transition border"
              style={{
                fontSize: '16px',
                background: 'var(--bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full disabled:opacity-40 flex items-center justify-center transition shrink-0"
              style={{ background: 'var(--purple)' }}
            >
              <Send size={14} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
