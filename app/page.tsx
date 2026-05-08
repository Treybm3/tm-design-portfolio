'use client'

import { useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Phone, ChevronRight, ChevronDown } from 'lucide-react'
import ChatWidget from './components/ChatWidget'

function IconFacebook({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconInstagram({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
}

const SKILLS = [
  { name: 'Analytics Dashboard',    why: 'See exactly who is visiting, what they are clicking, and where you are losing customers. Make decisions based on real data, not guesses.' },
  { name: 'Custom Websites',        why: 'A site built around your brand, not a template someone else already has. Every page is designed to turn visitors into paying customers the moment they land.' },
  { name: 'Social Media Marketing', why: 'Get your business in front of people in your area who are already looking for what you offer. Not random traffic, the right people.' },
  { name: 'AI Chat',                why: 'Never miss a customer again. Your AI handles questions and captures leads 24/7, even when you are closed. Clients get answers instantly.' },
  { name: 'Booking Integration',    why: 'Clients book in one tap. No phone tag, no back and forth texts. More confirmed appointments on your calendar, automatically.' },
  { name: 'SEO Optimization',       why: 'Show up on Google when people in your area search for your service. Be the first business they find, not buried on page five.' },
  { name: 'Live Instagram Feed',    why: 'Every time you post on Instagram, your website updates automatically. Fresh content with zero extra effort on your end.' },
  { name: 'Photography',            why: 'People decide whether to trust your business before they ever walk in. Professional photos make them choose you over the competition.' },
]

const WORKS = [
  {
    name: 'Kris Professional Cuts',
    url: 'https://krisprofessionalcuts.com',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.7)',
    border: 'rgba(59,130,246,0.5)',
    tag: 'Barbershop · Lansing, MI',
    desc: 'A 20-year Lansing institution built to match its reputation. One-tap Booksy booking, a 24/7 AI assistant that handles client questions around the clock, and SEO so new clients find the shop the moment they search. First-time visitors convert to regulars.',
  },
  {
    name: 'Another Planet Barbershop',
    url: 'https://another-planet-barbershop.vercel.app',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.7)',
    border: 'rgba(249,115,22,0.5)',
    tag: 'Barbershop · Lansing, MI',
    desc: 'One of Lansing\'s highest-rated shops. Live availability toggle so walk-in clients always know when to show up. AI chat running around the clock. Booksy built directly into the site. Over 600 five-star reviews and a site that earns every one of them.',
  },
]

const LINE1 = 'TM Design'
const LINE2 = 'Where your thoughts become reality'

const pillBase: CSSProperties = {
  background: 'linear-gradient(135deg, #6d28d9, #9333ea)',
  color: '#fff',
  borderRadius: '100px',
  boxShadow: '0 0 24px rgba(124,58,237,0.5), 0 4px 16px rgba(0,0,0,0.35)',
}

export default function Page() {
  const [line1,     setLine1]     = useState('')
  const [line2,     setLine2]     = useState('')
  const [phase,     setPhase]     = useState(0)
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    if (phase === 0) {
      let i = 0
      const id = setInterval(() => { i++; setLine1(LINE1.slice(0, i)); if (i >= LINE1.length) { clearInterval(id); setPhase(1) } }, 90)
      return () => clearInterval(id)
    }
    if (phase === 1) {
      const id = setTimeout(() => setPhase(2), 1000)
      return () => clearTimeout(id)
    }
    if (phase === 2) {
      let i = 0
      const id = setInterval(() => { i++; setLine2(LINE2.slice(0, i)); if (i >= LINE2.length) { clearInterval(id); setPhase(3) } }, 50)
      return () => clearInterval(id)
    }
    if (phase === 3) {
      const id = setTimeout(() => { setLine1(''); setLine2(''); setPhase(0) }, 3200)
      return () => clearTimeout(id)
    }
  }, [phase])

  useEffect(() => {
    if (!showPhone) return
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-phone-reveal]')) setShowPhone(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [showPhone])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', paddingBottom: '72px' }} className="sm:pb-0">

      {/* Galaxy background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <GalaxyCanvas />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(6,5,13,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={scrollTop} className="flex flex-col leading-none text-left hover:opacity-80 transition-opacity">
            <span className="font-black text-lg tracking-tight"
              style={{ background: 'linear-gradient(90deg, #a855f7, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TM Design
            </span>
            <span className="text-[9px] tracking-[0.14em]" style={{ color: 'var(--dim)' }}>Where your thoughts become reality</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={scrollTop}
              className="hidden sm:block text-sm font-medium px-3 py-1.5 transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              Home
            </button>
            <a href="#about"
              className="hidden sm:block text-sm font-medium px-3 py-1.5 transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              About
            </a>
            <a href="#work"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold transition-all"
              style={{ borderRadius: '100px', border: '1.5px solid rgba(124,58,237,0.5)', color: 'rgba(200,185,255,0.88)', background: 'rgba(124,58,237,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.18)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.7)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.07)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.color = 'rgba(200,185,255,0.88)' }}>
              My Work
            </a>
            <a href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-black transition-all"
              style={{ ...pillBase }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 38px rgba(124,58,237,0.75)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'none' }}>
              Contact Trey
            </a>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Atmospheric glow blobs */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 42%, rgba(109,40,217,0.3) 0%, rgba(76,29,149,0.08) 55%, transparent 75%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 30% at 12% 78%, rgba(217,119,6,0.12) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 35% 25% at 88% 20%, rgba(124,58,237,0.12) 0%, transparent 55%)' }} />

        <div className="relative text-center max-w-3xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center gap-8">

          {/* Eyebrow badge */}
          <div className="text-xs font-semibold tracking-[0.45em] uppercase px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(124,58,237,0.38)', color: 'var(--muted)', background: 'rgba(124,58,237,0.07)' }}>
            Web &amp; AI Solutions for Local Business
          </div>

          {/* Typing animation */}
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-black leading-none text-center"
              style={{ fontSize: 'clamp(48px, 9vw, 92px)', background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 45%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', minHeight: '1.1em' }}>
              {line1}
              {phase <= 1 && line1.length > 0 && (
                <span className="inline-block w-[3px] align-middle ml-1 rounded"
                  style={{ height: '0.82em', background: '#a855f7', animation: 'type-cursor 1s step-end infinite' }} />
              )}
            </h1>
            <p className="font-semibold text-center"
              style={{ fontSize: 'clamp(15px, 2.8vw, 24px)', color: 'rgba(237,232,223,0.72)', letterSpacing: '0.01em', minHeight: '1.8rem' }}>
              {line2}
              {phase === 2 && (
                <span className="inline-block w-[2px] align-middle ml-0.5 rounded"
                  style={{ height: '0.8em', background: 'rgba(237,232,223,0.72)', animation: 'type-cursor 1s step-end infinite' }} />
              )}
            </p>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--muted)' }}>
            Custom websites and AI-powered tools for local businesses in Lansing, MI.
            Fast builds. Sharp design. Built to convert visitors into customers.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-row gap-3 flex-wrap justify-center">
            <a href="#work"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-black text-sm transition-all whitespace-nowrap"
              style={{ ...pillBase }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(124,58,237,0.75)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'none' }}>
              See My Work <ChevronRight size={15} />
            </a>
            <a href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-bold text-sm transition-all whitespace-nowrap"
              style={{ borderRadius: '100px', border: '1.5px solid rgba(124,58,237,0.48)', color: 'rgba(237,232,223,0.85)', background: 'rgba(124,58,237,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.75)'; e.currentTarget.style.background = 'rgba(124,58,237,0.18)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.48)'; e.currentTarget.style.background = 'rgba(124,58,237,0.07)'; e.currentTarget.style.color = 'rgba(237,232,223,0.85)' }}>
              Get in Touch
            </a>
          </div>

          {/* Contact row: phone dropdown + socials */}
          <div className="flex items-center gap-4 flex-wrap justify-center">

            {/* Phone reveal */}
            <div className="relative" data-phone-reveal>
              <button onClick={() => setShowPhone(p => !p)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.35)', color: 'var(--muted)', boxShadow: '0 0 12px rgba(124,58,237,0.18)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'; e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; e.currentTarget.style.color = 'var(--muted)' }}>
                <Phone size={12} />
                Phone Number
                <ChevronDown size={11} style={{ transform: showPhone ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
              </button>
              {showPhone && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-6 py-4 rounded-2xl z-50 text-center whitespace-nowrap"
                  style={{ background: 'rgba(12,10,26,0.97)', border: '1px solid rgba(124,58,237,0.42)', boxShadow: '0 0 32px rgba(124,58,237,0.35), 0 10px 28px rgba(0,0,0,0.55)', backdropFilter: 'blur(18px)' }}>
                  <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--dim)' }}>Call or Text</p>
                  <a href="tel:7253770241" className="font-black text-xl block"
                    style={{ color: '#f97316', textShadow: '0 0 18px rgba(249,115,22,0.65)', letterSpacing: '-0.01em' }}>
                    725-377-0241
                  </a>
                </div>
              )}
            </div>

            {/* Facebook */}
            <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.38)', color: '#c4b5fd', boxShadow: '0 0 12px rgba(124,58,237,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 26px rgba(124,58,237,0.65)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 12px rgba(124,58,237,0.25)'; e.currentTarget.style.color = '#c4b5fd' }}
              aria-label="Facebook"><IconFacebook size={16} /></a>

            {/* Instagram */}
            <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(217,119,6,0.12)', border: '1px solid rgba(217,119,6,0.38)', color: '#fbbf24', boxShadow: '0 0 12px rgba(217,119,6,0.22)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 26px rgba(217,119,6,0.55)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 12px rgba(217,119,6,0.22)'; e.currentTarget.style.color = '#fbbf24' }}
              aria-label="Instagram"><IconInstagram size={16} /></a>
          </div>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <section id="work" className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.42em] uppercase font-semibold mb-3" style={{ color: '#9333ea' }}>Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-black">My Work</h2>
          </div>

          <div className="flex flex-col xl:flex-row gap-14 items-center xl:items-start">

            {/* Left: Both site previews side by side */}
            <div className="flex items-center shrink-0">

              {/* Kris */}
              <div className="relative flex flex-col items-center gap-3">
                <div className="absolute pointer-events-none" style={{
                  width: '310px', height: '370px', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.65) 0%, rgba(59,130,246,0.28) 35%, transparent 68%)',
                  animation: 'lightsaber-pulse 3s ease-in-out infinite',
                  borderRadius: '50%', zIndex: 0,
                }} />
                <p className="relative z-10 text-[10px] font-bold tracking-[0.22em] uppercase"
                  style={{ color: '#3b82f6', textShadow: '0 0 12px rgba(59,130,246,0.8)' }}>
                  Kris Professional Cuts
                </p>
                <a href="https://krisprofessionalcuts.com" target="_blank" rel="noopener noreferrer"
                  className="relative z-10 rounded-2xl overflow-hidden"
                  style={{
                    display: 'block', width: '220px', height: '260px',
                    border: '1.5px solid rgba(59,130,246,0.5)',
                    background: '#060a12', padding: '8px',
                    boxShadow: '0 0 40px rgba(59,130,246,0.38)',
                    animation: 'gentle-shake 2.5s linear infinite',
                  }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                    <iframe src="https://krisprofessionalcuts.com" title="Kris Professional Cuts"
                      style={{ width: '880px', height: '1040px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                      loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-black tracking-[0.22em] uppercase"
                        style={{ color: '#4ade80', textShadow: '0 0 14px rgba(74,222,128,1), 0 0 28px rgba(74,222,128,0.7)', animation: 'click-pulse 2.4s ease-in-out infinite' }}>
                        Visit Site
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Center divider */}
              <div className="flex flex-col items-center gap-3 px-5 self-stretch justify-center" style={{ minHeight: '300px' }}>
                <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.5), transparent)' }} />
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(168,85,247,0.4)', boxShadow: '0 0 20px rgba(124,58,237,0.55)' }}>
                  <span style={{ color: '#a855f7', fontSize: '11px' }}>✦</span>
                </div>
                <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.5), transparent)' }} />
              </div>

              {/* Another Planet */}
              <div className="relative flex flex-col items-center gap-3">
                <div className="absolute pointer-events-none" style={{
                  width: '310px', height: '370px', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.65) 0%, rgba(249,115,22,0.28) 35%, transparent 68%)',
                  animation: 'lightsaber-pulse 3s ease-in-out infinite',
                  animationDelay: '1.5s',
                  borderRadius: '50%', zIndex: 0,
                }} />
                <p className="relative z-10 text-[10px] font-bold tracking-[0.22em] uppercase"
                  style={{ color: '#f97316', textShadow: '0 0 12px rgba(249,115,22,0.8)' }}>
                  Another Planet Barbershop
                </p>
                <a href="https://another-planet-barbershop.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="relative z-10 rounded-2xl overflow-hidden"
                  style={{
                    display: 'block', width: '220px', height: '260px',
                    border: '1.5px solid rgba(249,115,22,0.5)',
                    background: '#060a12', padding: '8px',
                    boxShadow: '0 0 40px rgba(249,115,22,0.38)',
                    animation: 'gentle-shake 2.5s linear infinite',
                    animationDelay: '1.25s',
                  }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                    <iframe src="https://another-planet-barbershop.vercel.app" title="Another Planet Barbershop"
                      style={{ width: '880px', height: '1040px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                      loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-black tracking-[0.22em] uppercase"
                        style={{ color: '#4ade80', textShadow: '0 0 14px rgba(74,222,128,1), 0 0 28px rgba(74,222,128,0.7)', animation: 'click-pulse 2.4s ease-in-out infinite' }}>
                        Visit Site
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Description */}
            <div className="flex-1 flex flex-col gap-7">
              <div>
                <p className="text-xs font-semibold tracking-[0.38em] uppercase mb-3" style={{ color: '#9333ea' }}>What These Sites Do</p>
                <h3 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: 'var(--text)' }}>
                  Built to Make Businesses More Money
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Both sites are built around one goal: making the business more revenue without the owner doing extra work. Clients book themselves, questions get answered automatically, and Google rankings handle the marketing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {WORKS.map((w, i) => (
                  <div key={i} className="flex-1 flex flex-col gap-3 p-5 rounded-2xl"
                    style={{
                      border: `1px solid ${w.color}30`,
                      background: `linear-gradient(145deg, ${w.color}0e 0%, rgba(10,8,22,0.65) 100%)`,
                      backdropFilter: 'blur(12px)',
                    }}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: w.color, boxShadow: `0 0 8px ${w.color}` }} />
                      <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: w.color }}>{w.name}</p>
                    </div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--dim)' }}>{w.tag}</p>
                    <div className="h-px w-full" style={{ background: `${w.color}22` }} />
                    <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>{w.desc}</p>
                  </div>
                ))}
              </div>

              <a href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-black text-sm transition-all self-start whitespace-nowrap"
                style={{ ...pillBase }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 42px rgba(124,58,237,0.72)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'none' }}>
                Get a Site Like This <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.42em] uppercase font-semibold mb-3" style={{ color: '#9333ea' }}>What I Build</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">My Skillset</h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--muted)' }}>
              Every service solves a real problem your business has right now.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {SKILLS.map((s, i) => (
              <div key={i} className="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(18,15,36,0.78) 0%, rgba(8,7,20,0.65) 100%)',
                  border: '1px solid rgba(124,58,237,0.16)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
                  transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(168,85,247,0.42)'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.18)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(124,58,237,0.16)'; el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.22)'; el.style.transform = 'translateY(0)' }}
              >
                <div className="flex items-center gap-2.5">
                  <SkillRing delay={`${i * 0.45}s`} />
                  <h3 className="font-black text-sm" style={{ color: 'var(--text)' }}>{s.name}</h3>
                </div>
                <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.14)' }} />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(168,85,247,0.55)' }}>
                    Why it helps you
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="relative py-28 px-6 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.42em] uppercase font-semibold mb-3" style={{ color: '#9333ea' }}>The Builder</p>
            <h2 className="text-4xl sm:text-5xl font-black">About Trey</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* Photo */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="absolute pointer-events-none" style={{
                width: '290px', height: '290px', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(124,58,237,0.38) 0%, transparent 70%)',
                filter: 'blur(26px)', borderRadius: '50%',
              }} />
              <div className="relative z-10 overflow-hidden rounded-3xl"
                style={{ width: '240px', height: '300px', border: '1px solid rgba(124,58,237,0.32)', boxShadow: '0 0 50px rgba(124,58,237,0.25)', background: 'var(--card)' }}>
                {/* Replace /aboutme.jpg with your suit photo */}
                <img src="/aboutme.jpg" alt="Trey Macklin"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '68% top', transform: 'scale(1.05)', transformOrigin: 'center top' }}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-6 flex-1">
              <div className="text-base leading-relaxed flex flex-col gap-4" style={{ color: 'var(--muted)' }}>
                <p>
                  My name is Trey. I am a college student at Michigan State University pursuing
                  my master degree, and I have been around computers my whole life. From gaming
                  and building Minecraft servers in Java as a kid, to teaching myself web development
                  long before AI tools were even a thing.
                </p>
                <p>
                  Over time I started noticing the same problems in local businesses. No real online
                  presence, no efficient way to handle clients, nothing that made them stand out. So
                  I started building the solution. Custom websites and automation tools that take
                  that stress off your plate and let your business run smoother, look sharper, and grow faster.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '✦',    label: 'Multiple Sites Launched' },
                  { value: '1 wk', label: 'Avg. Launch Time' },
                  { value: '< />',  label: 'Custom + AI Code' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border"
                    style={{ borderColor: 'rgba(217,119,6,0.24)', background: 'rgba(217,119,6,0.07)' }}>
                    <span className="text-2xl font-black" style={{ color: '#f59e0b', textShadow: '0 0 18px rgba(245,158,11,0.85), 0 0 40px rgba(251,191,36,0.5)' }}>{s.value}</span>
                    <span className="text-[10px] text-center leading-tight" style={{ color: 'rgba(251,191,36,0.6)' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3 flex-wrap">
                <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.32)', color: 'rgba(196,181,253,0.82)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.22)'; e.currentTarget.style.color = '#c4b5fd' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; e.currentTarget.style.color = 'rgba(196,181,253,0.82)' }}>
                  <IconFacebook size={14} /> Facebook
                </a>
                <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.32)', color: 'rgba(251,191,36,0.82)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.22)'; e.currentTarget.style.color = '#fbbf24' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.1)'; e.currentTarget.style.color = 'rgba(251,191,36,0.82)' }}>
                  <IconInstagram size={14} /> @treybm3
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="relative py-28 px-6 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#9333ea' }} />
            <span className="text-xs tracking-[0.38em] uppercase font-semibold" style={{ color: '#9333ea' }}>Contact Me</span>
            <div className="h-px w-8" style={{ background: '#9333ea' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-14">
            Let&apos;s Talk About Your Business
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — what we'll cover */}
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Not sure what you need? That is exactly why you should reach out. I will tell you straight what makes sense for your business — no upsell, no fluff.
              </p>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: 'rgba(237,232,223,0.28)' }}>What we will cover</p>
                <div className="flex flex-col gap-4">
                  {[
                    'What your business actually needs online',
                    'What a site like this could realistically do for your revenue',
                    'Whether AI chat would make a difference for you',
                    'How long it takes and what it costs, honestly',
                    'What the process looks like from day one to launch',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex items-center mt-[5px] shrink-0">
                        <div className="w-2 h-2 rounded-full" style={{ background: '#f97316', boxShadow: '0 0 8px rgba(249,115,22,0.9), 0 0 16px rgba(249,115,22,0.5)' }} />
                        <div className="h-[2px] w-5" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.6), transparent)', marginLeft: '-1px' }} />
                      </div>
                      <span className="text-sm leading-relaxed font-medium" style={{ color: '#fb923c', textShadow: '0 0 10px rgba(249,115,22,0.25)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact card */}
            <div className="lg:w-[360px] shrink-0 w-full rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(124,58,237,0.5)',
                boxShadow: '0 0 70px rgba(124,58,237,0.42), 0 0 140px rgba(124,58,237,0.16)',
                background: 'linear-gradient(160deg, rgba(109,40,217,0.2) 0%, rgba(8,6,26,0.82) 100%)',
                backdropFilter: 'blur(22px)',
              }}>

              <div className="relative flex flex-col items-center gap-3 px-8 py-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 65% at 50% 0%, rgba(168,85,247,0.25) 0%, transparent 70%)' }} />
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-black text-lg"
                  style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.9), rgba(168,85,247,0.55))', border: '1.5px solid rgba(168,85,247,0.6)', boxShadow: '0 0 32px rgba(124,58,237,0.8), 0 0 64px rgba(124,58,237,0.32)', color: '#fff' }}>
                  TM
                </div>
                <p className="relative z-10 text-xs tracking-[0.38em] uppercase font-bold" style={{ color: 'rgba(168,85,247,0.88)' }}>TM Design</p>
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.32)' }} />

              <div className="px-8 py-6 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: 'rgba(237,232,223,0.28)' }}>Call or Text</p>
                <a href="tel:7253770241" className="block font-black transition-all leading-none"
                  style={{ fontSize: '30px', letterSpacing: '-0.01em', color: '#f97316', textShadow: '0 0 22px rgba(249,115,22,0.82), 0 0 48px rgba(249,115,22,0.38)' }}
                  onMouseEnter={e => { e.currentTarget.style.textShadow = '0 0 30px rgba(249,115,22,1), 0 0 65px rgba(249,115,22,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.textShadow = '0 0 22px rgba(249,115,22,0.82), 0 0 48px rgba(249,115,22,0.38)' }}>
                  725-377-0241
                </a>
                <p className="text-xs mt-2" style={{ color: 'rgba(237,232,223,0.26)' }}>Lansing, MI — Available daily</p>
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.22)' }} />

              <div className="grid grid-cols-3">
                {[{ value: '2 wk', label: 'Avg Launch' }, { value: '24/7', label: 'AI Always On' }, { value: '100%', label: 'Custom Built' }].map((s, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1.5 py-5 ${i < 2 ? 'border-r' : ''}`}
                    style={{ borderColor: 'rgba(124,58,237,0.22)' }}>
                    <span className="text-xl font-black" style={{ color: '#f97316', textShadow: '0 0 16px rgba(249,115,22,0.78)' }}>{s.value}</span>
                    <span className="text-[9px] tracking-[0.12em] uppercase text-center leading-tight px-1" style={{ color: 'rgba(237,232,223,0.28)' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.22)' }} />

              <div className="px-8 py-6 flex flex-col gap-3">
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl transition-all text-sm font-semibold"
                    style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.26)', color: 'rgba(196,181,253,0.75)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; e.currentTarget.style.color = '#c4b5fd'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.08)'; e.currentTarget.style.color = 'rgba(196,181,253,0.75)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.26)' }}>
                    <IconFacebook size={14} /> Facebook
                  </a>
                  <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl transition-all text-sm font-semibold"
                    style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.22)', color: 'rgba(251,191,36,0.75)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.18)'; e.currentTarget.style.color = '#fbbf24'; e.currentTarget.style.borderColor = 'rgba(217,119,6,0.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.08)'; e.currentTarget.style.color = 'rgba(251,191,36,0.75)'; e.currentTarget.style.borderColor = 'rgba(217,119,6,0.22)' }}>
                    <IconInstagram size={14} /> @treybm3
                  </a>
                </div>
                <a href="tel:7253770241"
                  className="flex items-center justify-center gap-2 w-full py-4 font-black text-sm transition-all"
                  style={{ ...pillBase }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(124,58,237,0.75)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'none' }}>
                  <Phone size={16} /> Contact Trey
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />

      {/* ── Footer ── */}
      <footer className="relative z-10 py-8 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={scrollTop} className="flex flex-col leading-none text-left hover:opacity-75 transition-opacity">
            <span className="font-black text-sm" style={{ background: 'linear-gradient(90deg, #a855f7, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TM Design</span>
            <span className="text-[9px]" style={{ color: 'var(--dim)' }}>Where your thoughts become reality</span>
          </button>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.28)', color: '#c4b5fd' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.24)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.1)')}
              aria-label="Facebook"><IconFacebook size={13} /></a>
            <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.28)', color: '#fbbf24' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(217,119,6,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(217,119,6,0.1)')}
              aria-label="Instagram"><IconInstagram size={13} /></a>
          </div>
          <p className="text-xs" style={{ color: 'var(--dim)' }}>Lansing, MI · 2025</p>
        </div>
      </footer>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        style={{ background: 'rgba(6,5,13,0.96)', backdropFilter: 'blur(22px)', borderTop: '1px solid rgba(124,58,237,0.28)' }}>
        <div className="px-4 py-3">
          <a href="tel:7253770241"
            className="flex items-center justify-center gap-2 w-full py-3.5 font-black text-sm transition-all"
            style={{ ...pillBase }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = pillBase.boxShadow as string)}>
            <Phone size={16} /> Contact Trey
          </a>
        </div>
      </div>

    </main>
  )
}

// ── Skill Ring ────────────────────────────────────────────────────────────────
function SkillRing({ delay = '0s' }: { delay?: string }) {
  const r = 7
  const circ = +(2 * Math.PI * r).toFixed(2) // 43.98
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{ overflow: 'visible', flexShrink: 0 }}>
      {/* Track */}
      <circle cx="11" cy="11" r={r} fill="none" stroke="rgba(168,85,247,0.16)" strokeWidth="1.5" />
      {/* Animated fill ring */}
      <circle cx="11" cy="11" r={r} fill="none" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray={`${circ} ${circ}`}
        transform="rotate(-90 11 11)"
        style={{ animation: `ring-fill 3.2s ease-in-out infinite`, animationDelay: delay }} />
      {/* Center dot */}
      <circle cx="11" cy="11" r="3.2" fill="#e9d5ff"
        style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.9))' }} />
    </svg>
  )
}

// ── Galaxy Canvas ──────────────────────────────────────────────────────────────
function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let raf: number

    type Star    = { x:number; y:number; r:number; a:number; twinkle:number; speed:number; hue:number }
    type Shooter = { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; tail:number; width:number }

    const stars: Star[] = []
    const shooters: Shooter[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars.length = 0
      for (let i = 0; i < 320; i++) {
        const roll = Math.random()
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.15,
          a: Math.random() * 0.7 + 0.15,
          twinkle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.018 + 0.004,
          hue: roll < 0.12 ? 270 : roll < 0.22 ? 210 : roll < 0.3 ? 35 : -1,
        })
      }
    }
    resize(); window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        s.twinkle += s.speed
        const alpha = s.a * (0.5 + 0.5 * Math.sin(s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        if      (s.hue === 270) ctx.fillStyle = `rgba(210,170,255,${alpha})`
        else if (s.hue === 210) ctx.fillStyle = `rgba(160,215,255,${alpha})`
        else if (s.hue === 35)  ctx.fillStyle = `rgba(255,220,150,${alpha})`
        else                    ctx.fillStyle = `rgba(255,252,245,${alpha})`
        ctx.fill()
      }
      if (Math.random() < 0.022 && shooters.length < 10) {
        const angle = (Math.random() * 40 + 15) * Math.PI / 180
        const spd = Math.random() * 9 + 5
        shooters.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height * 0.7, vx: spd * Math.cos(angle), vy: spd * Math.sin(angle), life: 0, maxLife: 40 + Math.random() * 45, tail: 12 + Math.random() * 14, width: Math.random() * 1.4 + 0.8 })
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]
        const alpha = Math.sin((s.life / s.maxLife) * Math.PI)
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.tail, s.y - s.vy * s.tail)
        grad.addColorStop(0, `rgba(255,252,245,${alpha})`)
        grad.addColorStop(0.35, `rgba(210,185,255,${alpha * 0.65})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * s.tail, s.y - s.vy * s.tail)
        ctx.strokeStyle = grad; ctx.lineWidth = s.width; ctx.stroke()
        ctx.beginPath(); ctx.arc(s.x, s.y, s.width, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,252,245,${alpha})`; ctx.fill()
        s.x += s.vx; s.y += s.vy; s.life++
        if (s.life >= s.maxLife || s.x > canvas.width + 80 || s.y > canvas.height + 80) shooters.splice(i, 1)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}
