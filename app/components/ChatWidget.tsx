'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What do you build?',
  'How much does a site cost?',
  'How long does it take?',
  'Do you add AI to sites?',
]

export default function ChatWidget() {
  const [open,      setOpen]      = useState(false)
  const [messages,  setMessages]  = useState<Message[]>([])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [showLabel, setShowLabel] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => {
    if (open) { setShowLabel(false); setTimeout(() => inputRef.current?.focus(), 120) }
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    const next: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next); setInput(''); setLoading(true)
    setMessages(m => [...m, { role: 'assistant', content: '' }])
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      })
      if (!res.body) throw new Error()
      const reader = res.body.getReader(); const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        const chunk = decoder.decode(value)
        setMessages(m => { const c = [...m]; c[c.length-1] = { ...c[c.length-1], content: c[c.length-1].content + chunk }; return c })
      }
    } catch {
      setMessages(m => { const c = [...m]; c[c.length-1] = { ...c[c.length-1], content: 'Something went wrong. Reach Trey at 725-377-0241.' }; return c })
    } finally { setLoading(false) }
  }

  function handleKey(e: React.KeyboardEvent) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-5 z-50 flex items-end gap-3">
        {showLabel && !open && (
          <div className="text-xs font-semibold px-3 py-2 rounded-full mb-1 whitespace-nowrap"
            style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#c4b5fd', boxShadow: '0 0 14px rgba(124,58,237,0.25)' }}>
            Ask me anything
          </div>
        )}
        <div className="relative">
          <button onClick={() => setOpen(o => !o)} aria-label="Chat"
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))', boxShadow: '0 0 24px rgba(124,58,237,0.55), 0 4px 15px rgba(0,0,0,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(168,85,247,0.75), 0 4px 20px rgba(0,0,0,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.55), 0 4px 15px rgba(0,0,0,0.4)' }}
          >
            {open
              ? <X size={20} color="#fff" />
              : <span className="text-white font-black text-sm tracking-tight">TM</span>
            }
          </button>
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[400px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ height: 'min(500px, calc(100dvh-180px))', background: 'var(--bg)', border: '1px solid rgba(124,58,237,0.3)', boxShadow: '0 0 60px rgba(124,58,237,0.2), 0 25px 50px rgba(0,0,0,0.6)' }}>

          {/* Gradient header bar */}
          <div className="relative shrink-0 px-4 py-3.5 flex items-center gap-3 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.9) 0%, rgba(124,58,237,0.7) 50%, rgba(6,182,212,0.3) 100%)' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.15), transparent)', backdropFilter: 'blur(10px)' }} />
            <div className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}>
              TM
            </div>
            <div className="relative z-10">
              <div className="text-sm font-bold text-white leading-tight">TM Design AI</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>Online · replies instantly</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto relative z-10 transition" style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col gap-3">
                <div className="text-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] leading-relaxed"
                  style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--muted)' }}>
                  Hey! I&apos;m Trey&apos;s AI. Ask me about web design, pricing, or what TM Design can build for your business.
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full transition"
                      style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: 'var(--muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; e.currentTarget.style.color = '#c4b5fd' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; e.currentTarget.style.color = 'var(--muted)' }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="text-sm px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-wrap"
                  style={m.role === 'user'
                    ? { background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))', color: '#fff', borderRadius: '1rem 1rem 0.25rem 1rem', boxShadow: '0 0 16px rgba(124,58,237,0.3)' }
                    : { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--muted)', borderRadius: '0.25rem 1rem 1rem 1rem' }
                  }>{m.content}</div>
              </div>
            ))}
            {loading && messages[messages.length-1]?.content === '' && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
                  style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  {[0,150,300].map(d => <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--purple-mid)', animationDelay: `${d}ms` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 shrink-0 flex gap-2 items-center border-t" style={{ borderColor: 'rgba(124,58,237,0.2)', background: 'rgba(12,14,26,0.95)' }}>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder="Ask anything…" disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full focus:outline-none disabled:opacity-50 transition"
              style={{ fontSize: '16px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', color: 'var(--text)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)')}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full disabled:opacity-40 flex items-center justify-center transition-all shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px rgba(168,85,247,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            ><Send size={14} color="#fff" /></button>
          </div>
        </div>
      )}
    </>
  )
}
