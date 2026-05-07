'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Phone, ChevronRight } from 'lucide-react'
import ChatWidget from './components/ChatWidget'

function IconFacebook({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconInstagram({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
}

const SkillIcons: Record<string, React.ReactElement> = {
  code:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  bot:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>,
  chart:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  megaphone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  link:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  camera:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  seo:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
}

const SKILLS = [
  { key: 'code',      name: 'Custom Websites',        desc: 'Built from scratch around your brand. No templates — designed to convert visitors into paying customers.' },
  { key: 'bot',       name: 'AI Chat',                desc: 'A 24/7 AI assistant that answers questions and keeps customers engaged even when you\'re closed.' },
  { key: 'chart',     name: 'Analytics Dashboard',    desc: 'See who\'s visiting, where they\'re from, and what they\'re clicking. Real data for real decisions.' },
  { key: 'megaphone', name: 'Social Media Marketing', desc: 'Get your business in front of the right people on Facebook, Instagram, and more.' },
  { key: 'link',      name: 'Social Media Sync',      desc: 'Your Instagram and Facebook connected directly to your site — always fresh, always relevant.' },
  { key: 'camera',    name: 'Photography',            desc: 'Professional photos that make your site stand out. We handle the shoot.' },
  { key: 'seo',       name: 'SEO Optimization',       desc: 'Built-in search tags so your business shows up on Google first — not buried on page five.' },
]

const WORKS = [
  { name: 'Kris Professional Cuts',   url: 'https://krisprofessionalcuts.com',               sunColor: 'rgba(59,130,246,0.6)',  border: 'rgba(59,130,246,0.45)', accent: '#3b82f6', tag: 'Barbershop · Lansing, MI' },
  { name: 'Another Planet Barbershop', url: 'https://another-planet-barbershop.vercel.app',  sunColor: 'rgba(249,115,22,0.6)',  border: 'rgba(249,115,22,0.45)', accent: '#f97316', tag: 'Barbershop · Lansing, MI' },
]

const LINE1 = 'TM Design'
const LINE2 = 'Where your thoughts become reality'
const PHOTOS = ['/aboutme.jpg', '/msufan.jpg', '/ship.jpg']

export default function Page() {
  const [line1,    setLine1]    = useState('')
  const [line2,    setLine2]    = useState('')
  const [phase,    setPhase]    = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [photoVis, setPhotoVis] = useState(true)

  // Two-line typing: "TM Design" pause then "Where your thoughts become reality"
  useEffect(() => {
    if (phase === 0) {
      let i = 0
      const id = setInterval(() => { i++; setLine1(LINE1.slice(0, i)); if (i >= LINE1.length) { clearInterval(id); setPhase(1) } }, 90)
      return () => clearInterval(id)
    }
    if (phase === 1) {
      const id = setTimeout(() => setPhase(2), 1300)
      return () => clearTimeout(id)
    }
    if (phase === 2) {
      let i = 0
      const id = setInterval(() => { i++; setLine2(LINE2.slice(0, i)); if (i >= LINE2.length) { clearInterval(id); setPhase(3) } }, 48)
      return () => clearInterval(id)
    }
  }, [phase])

  // Photo carousel with fade
  useEffect(() => {
    const id = setInterval(() => {
      setPhotoVis(false)
      setTimeout(() => { setPhotoIdx(i => (i + 1) % PHOTOS.length); setPhotoVis(true) }, 400)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* Fixed particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <ParticleCanvas />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? 'rgba(5,6,15,0.94)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tight"
              style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TM Design
            </span>
            <span className="text-[9px] tracking-[0.15em]" style={{ color: 'var(--dim)' }}>Where your thoughts become reality</span>
          </div>
          <div className="flex items-center gap-6">
            {[['Work','#work'],['Skills','#skills'],['About','#about'],['Contact','#contact']].map(([l,h]) => (
              <a key={l} href={h} className="text-sm font-medium transition-colors hidden sm:block" style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{l}</a>
            ))}
            <a href="#contact"
              className="text-sm font-bold px-5 py-2 rounded-full transition-all"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))', color: '#fff', boxShadow: '0 0 18px rgba(124,58,237,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(168,85,247,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(124,58,237,0.4)' }}
            >Contact</a>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 40%, rgba(109,40,217,0.42) 0%, rgba(76,29,149,0.2) 45%, transparent 72%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 15%, rgba(124,58,237,0.25) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 45% 40% at 15% 80%, rgba(6,182,212,0.15) 0%, transparent 65%)' }} />

        <div className="relative text-center max-w-3xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center gap-7">
          <div className="text-xs font-semibold tracking-[0.4em] uppercase px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(124,58,237,0.45)', color: 'var(--muted)', background: 'rgba(124,58,237,0.1)' }}>
            Web &amp; AI Solutions for Local Business
          </div>

          <div className="flex flex-col items-center gap-3">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none"
              style={{ background: 'linear-gradient(135deg, var(--purple-mid) 0%, var(--cyan) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {line1}
              {phase <= 1 && <span className="inline-block w-[3px] align-middle ml-1 rounded" style={{ height: '0.85em', background: 'var(--cyan)', animation: 'type-cursor 1s step-end infinite' }} />}
            </h1>
            <div className="text-xl sm:text-2xl font-semibold min-h-[2rem]"
              style={{ color: 'rgba(200,190,255,0.85)', letterSpacing: '0.01em' }}>
              {line2}
              {phase === 2 && <span className="inline-block w-[2px] align-middle ml-0.5 rounded" style={{ height: '0.8em', background: 'rgba(200,190,255,0.85)', animation: 'type-cursor 1s step-end infinite' }} />}
            </div>
          </div>

          <p className="text-lg sm:text-xl font-light leading-relaxed" style={{ color: 'rgba(220,215,255,0.75)', maxWidth: '480px' }}>
            Custom websites and AI-powered tools for local businesses in Lansing, MI.
            Fast. Sharp. Built to convert.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <a href="#work"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wide transition-all"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))', color: '#fff', borderRadius: '10px', boxShadow: '0 0 30px rgba(124,58,237,0.5), 0 4px 15px rgba(0,0,0,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 42px rgba(168,85,247,0.65), 0 4px 20px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.5), 0 4px 15px rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >See My Work <ChevronRight size={15} /></a>
            <a href="#contact"
              className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-sm transition-all border"
              style={{ borderRadius: '10px', borderColor: 'rgba(124,58,237,0.5)', color: 'rgba(220,215,255,0.85)', background: 'rgba(124,58,237,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.8)'; e.currentTarget.style.background = 'rgba(124,58,237,0.18)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.background = 'rgba(124,58,237,0.08)'; e.currentTarget.style.color = 'rgba(220,215,255,0.85)' }}
            >Get in Touch</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:7253770241"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.4)', color: 'rgba(220,215,255,0.85)', boxShadow: '0 0 14px rgba(124,58,237,0.28)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 14px rgba(124,58,237,0.28)' }}
            ><Phone size={13} /> 725-377-0241</a>
            <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(124,58,237,0.22)', border: '1px solid rgba(124,58,237,0.5)', color: '#c4b5fd', boxShadow: '0 0 18px rgba(124,58,237,0.38)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.7)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(124,58,237,0.38)' }}
              aria-label="Facebook"><IconFacebook size={16} /></a>
            <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(6,182,212,0.18)', border: '1px solid rgba(6,182,212,0.45)', color: '#67e8f9', boxShadow: '0 0 18px rgba(6,182,212,0.32)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(6,182,212,0.65)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(6,182,212,0.32)' }}
              aria-label="Instagram"><IconInstagram size={16} /></a>
          </div>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <section id="work" className="relative py-24 px-6 z-10" style={{ background: 'rgba(12,14,26,0.88)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-black">Live Sites I Built</h2>
          </div>

          {/* Cards LEFT + Description RIGHT */}
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Two cards with divider */}
            <div className="flex flex-row items-center gap-0 shrink-0">
              {WORKS.map((w, i) => (
                <div key={i} className="flex flex-row items-center">
                  {/* Card */}
                  <div className="relative flex items-center justify-center">
                    {/* Sun glow — bigger */}
                    <div className="absolute" style={{ width: '320px', height: '320px', background: `radial-gradient(circle, ${w.sunColor} 0%, transparent 62%)`, filter: 'blur(28px)', borderRadius: '50%', zIndex: 0 }} />
                    <div className="flex flex-col items-center gap-3 relative z-10">
                      <a href={w.url} target="_blank" rel="noopener noreferrer"
                        className="relative overflow-hidden rounded-2xl"
                        style={{ width: '200px', height: '200px', display: 'block', border: `1.5px solid ${w.border}`, background: 'var(--card)', boxShadow: `0 0 30px ${w.sunColor}` }}
                      >
                        <iframe src={w.url} title={w.name}
                          style={{ width: '800px', height: '800px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                          loading="lazy"
                        />
                        {/* Always-pulsing Click Me */}
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3"
                          style={{ background: 'linear-gradient(to top, rgba(5,6,15,0.85) 0%, transparent 70%)' }}>
                          <span className="text-[10px] font-black tracking-[0.25em] uppercase"
                            style={{ color: 'var(--purple-mid)', textShadow: '0 0 14px rgba(168,85,247,1), 0 0 30px rgba(168,85,247,0.6)', animation: 'click-pulse 2.4s ease-in-out infinite' }}>
                            Click Me
                          </span>
                        </div>
                      </a>
                      <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-center" style={{ color: w.accent }}>{w.tag}</p>
                      <p className="text-xs font-black text-center">{w.name}</p>
                    </div>
                  </div>

                  {/* Vertical divider between cards */}
                  {i === 0 && (
                    <div className="flex flex-col items-center gap-2 px-5 self-stretch justify-center">
                      <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.55), transparent)' }} />
                      <span style={{ color: 'rgba(168,85,247,0.8)', fontSize: '14px', textShadow: '0 0 12px rgba(168,85,247,0.9)' }}>✦</span>
                      <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.55), transparent)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Description on the RIGHT */}
            <div className="flex flex-col gap-5 flex-1 text-center lg:text-left">
              <div>
                <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--purple-mid)' }}>What These Sites Do</p>
                <h3 className="text-2xl font-black mb-4">Built for Real Businesses</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Fully custom and automated — built with the business owner in mind. Clients can
                  book appointments in one tap, get answers from an AI assistant 24/7, and find
                  the shop instantly on Google thanks to built-in SEO. No templates, no shortcuts.
                  Every site is unique and designed to make the business look like the best option
                  in the room.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {['One-tap Booksy booking','24/7 AI chat assistant','SEO — ranks on Google','Custom design, zero templates','Mobile-first, lightning fast'].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span style={{ color: 'var(--purple-mid)', textShadow: '0 0 8px rgba(168,85,247,0.7)' }}>✦</span>
                    <span className="text-sm" style={{ color: 'var(--muted)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="relative py-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">

          {/* Centered header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: 'var(--purple-mid)' }} />
              <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color: 'var(--purple-mid)' }}>My Skills</span>
              <div className="h-px w-10" style={{ background: 'var(--purple-mid)' }} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">What I Bring to the Table</h2>
            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Every service is built around one goal — making your business run smoother,
              look sharper, and grow faster.
            </p>
          </div>

          {/* Symmetric 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((s, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border transition-all"
                style={{ borderColor: 'rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.05)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(168,85,247,0.5)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(124,58,237,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.2)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(124,58,237,0.05)' }}
              >
                <div className="relative w-12 h-12 flex items-center justify-center" style={{ color: 'var(--purple-mid)' }}>
                  <span className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: '1.5px solid var(--purple-mid)', borderLeft: '1.5px solid var(--purple-mid)' }} />
                  <span className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: '1.5px solid var(--purple-mid)', borderRight: '1.5px solid var(--purple-mid)' }} />
                  <span className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: '1.5px solid var(--purple-mid)', borderLeft: '1.5px solid var(--purple-mid)' }} />
                  <span className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: '1.5px solid var(--purple-mid)', borderRight: '1.5px solid var(--purple-mid)' }} />
                  {SkillIcons[s.key]}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>{s.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="flex justify-center mt-12">
            <a href="#contact"
              className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))', color: '#fff', boxShadow: '0 0 24px rgba(124,58,237,0.45)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(168,85,247,0.65)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.45)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Get Started</a>
          </div>

        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="relative py-24 px-6 z-10" style={{ background: 'rgba(12,14,26,0.88)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>About</p>
            <h2 className="text-4xl sm:text-5xl font-black">The Person Behind It</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo — cropped to right side where Trey is */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="absolute" style={{ width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)', filter: 'blur(22px)', borderRadius: '50%' }} />
              <div className="relative z-10 overflow-hidden rounded-2xl"
                style={{ width: '210px', height: '260px', border: '1px solid rgba(124,58,237,0.4)', boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}>
                <img src={PHOTOS[photoIdx]} alt="Trey"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '75% center', transform: 'scale(1.15)', transformOrigin: 'right center', opacity: photoVis ? 1 : 0, transition: 'opacity 0.4s ease' }}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-6 flex-1">
              <div className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                <p>
                  My name is Trey. I&apos;m a college student at Michigan State University pursuing
                  my master&apos;s degree, and I&apos;ve been around computers my whole life — from gaming
                  and building Minecraft servers in Java as a kid, to teaching myself web development
                  long before AI tools were even a thing.
                </p>
                <p className="mt-4">
                  Over time I started noticing the same problems in local businesses — no real online
                  presence, no efficient way to handle clients, nothing that made them stand out. So
                  I started building the solution. Custom websites and automation tools that take
                  that stress off your plate and let your business run smoother, look sharper, and
                  grow faster.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ value: '2+', label: 'Sites Launched' }, { value: 'AI', label: 'Chat Built In' }, { value: '$0', label: 'Templates Used' }].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border" style={{ borderColor: 'rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.07)' }}>
                    <div className="text-2xl font-black" style={{ color: '#f59e0b', textShadow: '0 0 18px rgba(245,158,11,0.9), 0 0 40px rgba(251,191,36,0.55), 0 0 70px rgba(245,158,11,0.25)' }}>{s.value}</div>
                    <div className="text-[11px] text-center leading-tight" style={{ color: 'rgba(251,191,36,0.65)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="relative py-24 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>Contact Me</p>
            <h2 className="text-4xl sm:text-5xl font-black">Let&apos;s Build Something</h2>
            <p className="text-sm mt-4" style={{ color: 'var(--muted)' }}>Ready to get your business online? Here&apos;s how it works.</p>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { n: '01', title: 'Reach Out', desc: 'Call, text, or DM. We talk about what your business needs.' },
              { n: '02', title: 'We Plan It', desc: 'I design around your brand. No templates, no guessing.' },
              { n: '03', title: 'You Launch', desc: 'Site goes live in ~2 weeks. I stay on to keep it sharp.' },
            ].map(s => (
              <div key={s.n} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ borderColor: 'var(--border)', background: 'rgba(17,20,40,0.6)' }}>
                <div className="text-2xl font-black" style={{ background: 'linear-gradient(135deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                <div className="font-bold text-sm">{s.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Contact buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <a href="tel:7253770241"
              className="flex items-center justify-center gap-3 px-6 py-4 font-bold text-sm tracking-wide transition-all flex-1"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--purple-mid))', color: '#fff', borderRadius: '10px', boxShadow: '0 0 26px rgba(124,58,237,0.45)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(168,85,247,0.65)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 26px rgba(124,58,237,0.45)'; e.currentTarget.style.transform = 'translateY(0)' }}
            ><Phone size={16} /> Call / Text</a>
            <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition-all flex-1"
              style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)', color: '#c4b5fd', borderRadius: '10px', boxShadow: '0 0 18px rgba(124,58,237,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(124,58,237,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}
            ><IconFacebook /> Facebook</a>
            <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition-all flex-1"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.35)', color: '#67e8f9', borderRadius: '10px', boxShadow: '0 0 18px rgba(6,182,212,0.18)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(6,182,212,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(6,182,212,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
            ><IconInstagram /> Instagram</a>
          </div>
        </div>
      </section>

      <ChatWidget />

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm" style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TM Design</span>
            <span className="text-[9px]" style={{ color: 'var(--dim)' }}>Where your thoughts become reality</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--dim)' }}>Lansing, MI · 2025</p>
        </div>
      </footer>

    </main>
  )
}

// ── Particle Canvas ────────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let raf: number
    const pts: { x:number; y:number; vx:number; vy:number; r:number; a:number }[] = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    for (let i = 0; i < 110; i++) pts.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-.5)*.28, vy: (Math.random()-.5)*.28, r: Math.random()*1.4+.4, a: Math.random()*.6+.2 })
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      for (const p of pts) {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0
        if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(168,85,247,${p.a})`; ctx.fill()
      }
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(124,58,237,${.28*(1-d/115)})`;ctx.lineWidth=.7;ctx.stroke()}
      }
      raf=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])
  return <canvas ref={canvasRef} style={{width:'100%',height:'100%'}} />
}
