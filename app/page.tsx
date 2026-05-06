'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, ExternalLink, ChevronRight } from 'lucide-react'

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}
import ChatWidget from './components/ChatWidget'

// ── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []

    function resize() {
      canvas!.width  = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 90; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 1.2 + 0.3,
        a:  Math.random() * 0.5 + 0.1,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas!.width
        if (p.x > canvas!.width) p.x = 0
        if (p.y < 0) p.y = canvas!.height
        if (p.y > canvas!.height) p.y = 0
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(168,85,247,${p.a})`
        ctx!.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(124,58,237,${0.18 * (1 - d / 100)})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ── Works data ────────────────────────────────────────────────────────────────
const WORKS = [
  {
    name:    'Kris Professional Cuts',
    url:     'https://krisprofessionalcuts.com',
    glow:    '0 0 60px 12px rgba(59,130,246,0.3)',
    border:  'rgba(59,130,246,0.45)',
    tag:     'Barbershop · AI Chat · Booking',
    accent:  '#3b82f6',
  },
  {
    name:    'Another Planet Barbershop',
    url:     'https://another-planet-barbershop.vercel.app',
    glow:    '0 0 60px 12px rgba(249,115,22,0.3)',
    border:  'rgba(249,115,22,0.45)',
    tag:     'Barbershop · Live Toggle · AI Chat',
    accent:  '#f97316',
  },
]

const FULL_TEXT = 'TM Design'

export default function Page() {
  const [typed,    setTyped]    = useState('')
  const [scrolled, setScrolled] = useState(false)

  // Typing animation
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
  }, [])

  // Navbar scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:     scrolled ? 'rgba(5,6,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom:   scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-black text-lg tracking-tight"
            style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            TM Design
          </span>
          <div className="flex items-center gap-6">
            {['Work', 'About', 'Contact'].map(s => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="text-sm font-medium transition-colors hidden sm:block"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {s}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-bold px-4 py-2 rounded-full transition"
              style={{ background: 'var(--purple)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple-mid)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />

        {/* Gradient orbs */}
        <div className="absolute pointer-events-none" style={{
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          top: '15%', left: '60%', filter: 'blur(40px)',
        }} />
        <div className="absolute pointer-events-none" style={{
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          top: '55%', left: '5%', filter: 'blur(40px)',
        }} />

        <div className="relative text-center max-w-3xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center gap-6">

          <div
            className="text-xs font-semibold tracking-[0.4em] uppercase px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(124,58,237,0.4)', color: 'var(--muted)', background: 'rgba(124,58,237,0.08)' }}
          >
            Web &amp; AI Solutions for Local Business
          </div>

          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none"
            style={{
              background:           'linear-gradient(135deg, var(--purple-mid) 0%, var(--cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              minHeight:            '1.2em',
            }}
          >
            {typed}
            <span
              className="inline-block w-[3px] align-middle ml-1 rounded"
              style={{ height: '0.85em', background: 'var(--cyan)', animation: 'type-cursor 1s step-end infinite' }}
            />
          </h1>

          <p className="text-lg sm:text-xl font-light leading-relaxed" style={{ color: 'var(--muted)', maxWidth: '520px' }}>
            I build custom websites and AI-powered tools for local businesses in Lansing, MI.
            Fast. Sharp. Built to convert.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition"
              style={{ background: 'var(--purple)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple-mid)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
            >
              See My Work <ChevronRight size={14} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Works ── */}
      <section id="work" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-black">Live Sites I Built</h2>
            <p className="text-sm mt-3" style={{ color: 'var(--muted)', maxWidth: '400px', margin: '12px auto 0' }}>
              Real businesses. Real results. Click to visit.
            </p>
          </div>

          <div className="flex flex-col gap-20">
            {WORKS.map((w, i) => (
              <div key={i} className="flex flex-col gap-6">
                {/* Label row */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-1" style={{ color: w.accent }}>{w.tag}</p>
                    <h3 className="text-2xl font-black">{w.name}</h3>
                  </div>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition"
                    style={{ borderColor: w.border, color: w.accent }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${w.border}33`)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    Visit Site <ExternalLink size={13} />
                  </a>
                </div>

                {/* iframe preview */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio:  '16/10',
                    border:       `1px solid ${w.border}`,
                    boxShadow:    w.glow,
                    background:   'var(--card)',
                  }}
                >
                  {/* Clickable overlay */}
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`Visit ${w.name}`}
                  />
                  <iframe
                    src={w.url}
                    title={w.name}
                    className="w-full h-full border-0 pointer-events-none"
                    style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase" style={{ color: 'var(--purple-mid)' }}>About</p>
          <h2 className="text-4xl sm:text-5xl font-black">Built for the Local Grind</h2>

          <div className="text-base leading-relaxed" style={{ color: 'var(--muted)', maxWidth: '560px' }}>
            <p>
              I&apos;m Trey Macklin, a web developer based in Lansing, MI. I specialize in building clean,
              high-converting websites and AI-powered tools for local businesses — barbershops,
              salons, real estate agents, you name it.
            </p>
            <p className="mt-4">
              Every site I build is custom, fast, and designed to make your business look like the
              best option in the room. No templates. No fluff.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-sm pt-4">
            {[
              { value: '2+', label: 'Sites Launched' },
              { value: 'AI', label: 'Chat Built In' },
              { value: '$0', label: 'Templates Used' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-4 rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                <div
                  className="text-3xl font-black"
                  style={{ background: 'linear-gradient(135deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-center" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-8">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase" style={{ color: 'var(--purple-mid)' }}>Contact</p>
          <h2 className="text-4xl sm:text-5xl font-black">Let&apos;s Build Something</h2>
          <p className="text-base" style={{ color: 'var(--muted)' }}>
            Ready to get your business online? Reach out and we&apos;ll talk about what I can build for you.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <a
              href="tel:7253770241"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition border"
              style={{ background: 'var(--purple)', color: '#fff', border: '1px solid rgba(124,58,237,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple-mid)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
            >
              <Phone size={16} />
              725-377-0241
            </a>

            <a
              href="https://www.facebook.com/linton.macklin.3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm transition border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--card)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
            >
              <IconFacebook />
              Facebook
            </a>

            <a
              href="https://www.instagram.com/treybm3/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm transition border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--card)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
            >
              <IconInstagram />
              @treybm3
            </a>
          </div>
        </div>
      </section>

      <ChatWidget />

      {/* ── Footer ── */}
      <footer className="py-6 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span
            className="font-black text-sm"
            style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            TM Design
          </span>
          <p className="text-xs" style={{ color: 'var(--dim)' }}>Lansing, MI</p>
        </div>
      </footer>

    </main>
  )
}
