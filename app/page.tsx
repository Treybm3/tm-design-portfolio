'use client'

import { useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Phone, ChevronRight } from 'lucide-react'
import ChatWidget from './components/ChatWidget'

function IconFacebook({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconInstagram({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
}

const SKILLS = [
  { name: 'Analytics Dashboard',    desc: 'See who is visiting your site, where they are from, and what they are clicking in real time. Compare stats and track growth with real numbers, not guesses.' },
  { name: 'Live Instagram Feed',    desc: 'Your latest Instagram posts automatically appear on your website. Every time you post, your site updates too. Fresh content without lifting a finger.' },
  { name: 'Custom Websites',        desc: 'Built from scratch around your brand. No templates. Every line of code designed to convert visitors into paying customers.' },
  { name: 'AI Chat',                desc: 'A 24/7 AI assistant that answers questions and keeps customers engaged even when you are closed.' },
  { name: 'SEO Optimization',       desc: 'Search tags built in so your business shows up on Google first. Not buried on page five.' },
  { name: 'Social Media Marketing', desc: 'Get your business in front of the right people on Facebook, Instagram, and more.' },
  { name: 'Booking Integration',    desc: 'Booksy, Calendly, or any platform. Built seamlessly into your site so clients can book in one tap.' },
  { name: 'Photography',            desc: 'Professional photos that make your site stand out. Real images of your business, your way.' },
]

const WORKS = [
  { name: 'Kris Professional Cuts',    url: 'https://krisprofessionalcuts.com',              color: '#3b82f6', border: 'rgba(59,130,246,0.4)',  tag: 'Barbershop · Lansing, MI', delay: '0s' },
  { name: 'Another Planet Barbershop', url: 'https://another-planet-barbershop.vercel.app', color: '#f97316', border: 'rgba(249,115,22,0.4)',   tag: 'Barbershop · Lansing, MI', delay: '1.3s' },
]

const FEATURES = ['One-tap booking', '24/7 AI chat', 'SEO built in', 'Zero templates', 'Mobile-first', 'Custom design']

const LINE1 = 'TM Design'
const LINE2 = 'Where your thoughts become reality'
const PHOTOS = ['/aboutme.jpg', '/msufan.jpg', '/ship.jpg']

const pillBase: CSSProperties = {
  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  color: '#fff',
  borderRadius: '100px',
  boxShadow: '0 0 28px rgba(124,58,237,0.5), 0 4px 16px rgba(0,0,0,0.3)',
}

export default function Page() {
  const [line1,    setLine1]    = useState('')
  const [line2,    setLine2]    = useState('')
  const [phase,    setPhase]    = useState(0)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [photoVis, setPhotoVis] = useState(true)

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
    if (phase === 3) {
      const id = setTimeout(() => { setLine1(''); setLine2(''); setPhase(0) }, 2800)
      return () => clearTimeout(id)
    }
  }, [phase])

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoVis(false)
      setTimeout(() => { setPhotoIdx(i => (i + 1) % PHOTOS.length); setPhotoVis(true) }, 400)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', paddingBottom: '72px' }} className="sm:pb-0">

      {/* Fixed galaxy background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <GalaxyCanvas />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(4,5,14,0.92)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={scrollTop} className="flex flex-col leading-none text-left hover:opacity-80 transition-opacity">
            <span className="font-black text-lg tracking-tight"
              style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TM Design
            </span>
            <span className="text-[9px] tracking-[0.15em]" style={{ color: 'var(--dim)' }}>Where your thoughts become reality</span>
          </button>
          <div className="flex items-center gap-6">
            <button onClick={scrollTop} className="text-sm font-medium transition-colors hidden sm:block" style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Home</button>
            {[['Work','#work'],['Skills','#skills'],['About','#about']].map(([l,h]) => (
              <a key={l} href={h} className="text-sm font-medium transition-colors hidden sm:block" style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{l}</a>
            ))}
            <a href="#contact"
              className="text-sm font-black px-6 py-2.5 transition-all hidden sm:block"
              style={{ ...pillBase }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(168,85,247,0.7)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'translateY(0)' }}
            >Contact Trey</a>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 35%, rgba(109,40,217,0.35) 0%, rgba(76,29,149,0.12) 55%, transparent 75%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 10%, rgba(124,58,237,0.18) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 35% at 10% 85%, rgba(6,182,212,0.1) 0%, transparent 65%)' }} />

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
            <div className="text-xl sm:text-2xl font-semibold min-h-[2rem]" style={{ color: 'rgba(200,190,255,0.85)', letterSpacing: '0.01em' }}>
              {line2}
              {phase === 2 && <span className="inline-block w-[2px] align-middle ml-0.5 rounded" style={{ height: '0.8em', background: 'rgba(200,190,255,0.85)', animation: 'type-cursor 1s step-end infinite' }} />}
            </div>
          </div>

          <p className="text-lg sm:text-xl font-light leading-relaxed" style={{ color: 'rgba(220,215,255,0.75)', maxWidth: '480px' }}>
            Custom websites and AI-powered tools for local businesses in Lansing, MI.
            Fast. Sharp. Built to convert.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#work"
              className="flex items-center justify-center gap-2 px-10 py-4 font-black text-sm tracking-wide transition-all"
              style={{ ...pillBase }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(168,85,247,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'translateY(0)' }}
            >See My Work <ChevronRight size={15} /></a>
            <a href="#contact"
              className="flex items-center justify-center gap-2 px-10 py-4 font-bold text-sm transition-all"
              style={{ borderRadius: '100px', border: '1px solid rgba(124,58,237,0.5)', color: 'rgba(220,215,255,0.85)', background: 'rgba(124,58,237,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.8)'; e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; e.currentTarget.style.color = '#fff' }}
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
      <section id="work" className="relative py-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 flex-wrap mb-14">
            <span className="text-xs tracking-[0.35em] uppercase font-bold px-3 py-1.5 rounded-full"
              style={{ color: 'var(--purple-mid)', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)' }}>Portfolio</span>
            <h2 className="text-4xl sm:text-5xl font-black">Sites I&apos;ve Built for People</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Cards */}
            <div className="flex flex-row items-center gap-0 shrink-0">
              {WORKS.map((w, i) => (
                <div key={i} className="flex flex-row items-center">
                  <div className="relative flex items-center justify-center">
                    {/* Lightsaber-pulsing glow */}
                    <div className="absolute" style={{
                      width: '340px', height: '340px',
                      background: `radial-gradient(circle, ${w.color}99 0%, ${w.color}33 45%, transparent 68%)`,
                      borderRadius: '50%', zIndex: 0,
                      animation: `lightsaber-pulse 2.8s ease-in-out infinite`,
                      animationDelay: w.delay,
                    }} />
                    <div className="flex flex-col items-center gap-3 relative z-10">
                      <div className="text-center">
                        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-1" style={{ color: w.color }}>{w.tag}</p>
                        <p className="text-sm font-black">{w.name}</p>
                      </div>
                      <a href={w.url} target="_blank" rel="noopener noreferrer"
                        className="relative overflow-hidden rounded-2xl"
                        style={{
                          width: '240px', height: '240px', display: 'block',
                          border: `1.5px solid ${w.border}`, background: 'var(--card)',
                          boxShadow: `0 0 30px ${w.color}55`,
                          padding: '8px',
                          animation: `site-shake 5s ease-in-out infinite`,
                          animationDelay: i === 0 ? '1.2s' : '3.8s',
                        }}
                      >
                        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                          <iframe src={w.url} title={w.name}
                            style={{ width: '896px', height: '896px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                            loading="lazy"
                          />
                          {/* Click Me — green glow, no box */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-black tracking-[0.25em] uppercase"
                              style={{ color: '#4ade80', textShadow: '0 0 16px rgba(74,222,128,1), 0 0 32px rgba(74,222,128,0.8), 0 0 60px rgba(74,222,128,0.4)', animation: 'click-pulse 2.4s ease-in-out infinite' }}>
                              Click Me
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="flex flex-col items-center gap-2 px-6 self-stretch justify-center">
                      <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.5), transparent)' }} />
                      <span style={{ color: 'rgba(168,85,247,0.8)', fontSize: '14px', textShadow: '0 0 12px rgba(168,85,247,0.9)' }}>✦</span>
                      <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.5), transparent)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Description + horizontal feature list */}
            <div className="flex flex-col gap-5 flex-1 text-center lg:text-left">
              <div>
                <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--purple-mid)' }}>What These Sites Do</p>
                <h3 className="text-2xl font-black mb-4">Built for Real Businesses</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Fully custom and automated, built with the business owner in mind. Clients book in one tap,
                  get answers from an AI assistant around the clock, and find the shop instantly on Google.
                  No templates, no shortcuts. Every site is designed to make the business look like the best option in the room.
                </p>
              </div>
              {/* Horizontal feature chips */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {FEATURES.map(f => (
                  <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.28)' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#a855f7', boxShadow: '0 0 6px rgba(168,85,247,0.9)' }} />
                    <span className="text-xs font-medium" style={{ color: 'rgba(200,190,255,0.8)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-14 items-start">

            {/* Left — description */}
            <div className="lg:w-[300px] shrink-0 lg:sticky lg:top-24 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl sm:text-4xl font-black leading-tight">My Skillset</h2>
                <div style={{ width: '36px', height: '3px', background: 'linear-gradient(to right, var(--purple-mid), var(--cyan))', borderRadius: '2px' }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Every service is built around one goal: making your business run smoother, look sharper, and grow faster. Real tools for real problems, and I am always learning the newest ways to make that happen.
              </p>
            </div>

            {/* Right — 2-col grid */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {SKILLS.map((s, i) => (
                <div key={i}
                  className="flex flex-col items-start gap-4 p-4 sm:p-6 rounded-3xl border"
                  style={{
                    borderColor: 'rgba(124,58,237,0.22)',
                    background: 'linear-gradient(145deg, rgba(28,16,58,0.7) 0%, rgba(12,8,38,0.6) 100%)',
                    backdropFilter: 'blur(14px)',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.25)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(168,85,247,0.5)'; el.style.boxShadow = '0 8px 36px rgba(124,58,237,0.22)'; el.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(124,58,237,0.22)'; el.style.boxShadow = '0 6px 28px rgba(0,0,0,0.25)'; el.style.transform = 'translateY(0)' }}
                >
                  {/* Skill name row + star rating */}
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: 'radial-gradient(circle, #e9d5ff, #a855f7)', boxShadow: '0 0 8px rgba(168,85,247,1), 0 0 16px rgba(168,85,247,0.5)' }} />
                      <h3 className="font-black text-sm" style={{ color: 'var(--text)' }}>{s.name}</h3>
                    </div>
                    <span className="text-xs font-black shrink-0" style={{ color: '#a855f7', textShadow: '0 0 8px rgba(168,85,247,0.8)', letterSpacing: '1px' }}>★★★★★</span>
                  </div>
                  {/* Game stat bar — maxed out */}
                  <div className="w-full">
                    <div className="h-[6px] rounded-full w-full mb-1" style={{ background: 'rgba(124,58,237,0.15)' }}>
                      <div className="h-full rounded-full" style={{
                        width: '100%',
                        background: 'linear-gradient(to right, #7c3aed 0%, #a855f7 55%, #06b6d4 100%)',
                        boxShadow: '0 0 8px rgba(168,85,247,0.9), 0 0 18px rgba(168,85,247,0.45)',
                      }} />
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[10px] font-black" style={{ color: 'rgba(168,85,247,0.7)', letterSpacing: '0.05em' }}>100%</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed w-full" style={{ color: 'rgba(200,195,230,0.62)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="relative py-24 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 flex-wrap mb-14">
            <span className="text-xs tracking-[0.35em] uppercase font-bold px-3 py-1.5 rounded-full"
              style={{ color: 'var(--purple-mid)', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)' }}>About</span>
            <h2 className="text-4xl sm:text-5xl font-black">About Trey</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
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

            <div className="flex flex-col gap-6 flex-1">
              <div className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                <p>
                  My name is Trey. I am a college student at Michigan State University pursuing
                  my master&apos;s degree, and I have been around computers my whole life. From gaming
                  and building Minecraft servers in Java as a kid, to teaching myself web development
                  long before AI tools were even a thing.
                </p>
                <p className="mt-4">
                  Over time I started noticing the same problems in local businesses. No real online
                  presence, no efficient way to handle clients, nothing that made them stand out. So
                  I started building the solution. Custom websites and automation tools that take
                  that stress off your plate and let your business run smoother, look sharper, and grow faster.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '∞',    label: 'Always Evolving' },
                  { value: '2 wk', label: 'Avg Launch' },
                  { value: '24/7', label: 'AI Always On' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border" style={{ borderColor: 'rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.07)' }}>
                    <div className="text-2xl font-black" style={{ color: '#f59e0b', textShadow: '0 0 18px rgba(245,158,11,0.9), 0 0 40px rgba(251,191,36,0.55)' }}>{s.value}</div>
                    <div className="text-[11px] text-center leading-tight" style={{ color: 'rgba(251,191,36,0.65)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="relative py-28 px-6 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: 'var(--purple-mid)' }} />
            <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color: 'var(--purple-mid)' }}>Contact Me</span>
            <div className="h-px w-8" style={{ background: 'var(--purple-mid)' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-14">Let&apos;s Talk About Your Business</h2>

          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — description + what we'll cover */}
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Not sure what you need? That is exactly why you should reach out. I will tell you straight what makes sense for your business — no upsell, no fluff.
              </p>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: 'rgba(240,240,255,0.3)' }}>What we will cover</p>
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
                      <span className="text-sm leading-relaxed font-medium" style={{ color: '#fb923c', textShadow: '0 0 10px rgba(249,115,22,0.3)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — featured contact card (inspired by Another Planet's logo+stats card) */}
            <div className="lg:w-[360px] shrink-0 w-full rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(124,58,237,0.55)',
                boxShadow: '0 0 70px rgba(124,58,237,0.45), 0 0 140px rgba(124,58,237,0.18)',
                background: 'linear-gradient(160deg, rgba(109,40,217,0.22) 0%, rgba(10,6,32,0.8) 100%)',
                backdropFilter: 'blur(20px)',
              }}>

              {/* Top: TM monogram + brand name */}
              <div className="relative flex flex-col items-center gap-3 px-8 py-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(168,85,247,0.28) 0%, transparent 70%)' }} />
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-black text-lg"
                  style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.9), rgba(168,85,247,0.6))', border: '1.5px solid rgba(168,85,247,0.65)', boxShadow: '0 0 32px rgba(124,58,237,0.8), 0 0 64px rgba(124,58,237,0.35)', color: '#fff' }}>
                  TM
                </div>
                <p className="relative z-10 text-xs tracking-[0.38em] uppercase font-bold" style={{ color: 'rgba(168,85,247,0.9)' }}>TM Design</p>
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.35)' }} />

              {/* Phone number */}
              <div className="px-8 py-6 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: 'rgba(240,240,255,0.3)' }}>Call or Text</p>
                <a href="tel:7253770241" className="block font-black transition-all leading-none"
                  style={{ fontSize: '30px', letterSpacing: '-0.01em', color: '#f97316', textShadow: '0 0 24px rgba(249,115,22,0.85), 0 0 50px rgba(249,115,22,0.4)' }}
                  onMouseEnter={e => { e.currentTarget.style.textShadow = '0 0 32px rgba(249,115,22,1), 0 0 70px rgba(249,115,22,0.65)' }}
                  onMouseLeave={e => { e.currentTarget.style.textShadow = '0 0 24px rgba(249,115,22,0.85), 0 0 50px rgba(249,115,22,0.4)' }}
                >725-377-0241</a>
                <p className="text-xs mt-2" style={{ color: 'rgba(240,240,255,0.28)' }}>Lansing, MI — Available daily</p>
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.25)' }} />

              {/* Stats row — like Another Planet's 600+ / 2000+ / #1 */}
              <div className="grid grid-cols-3">
                {[
                  { value: '2 wk', label: 'Avg Launch' },
                  { value: '24/7', label: 'AI Always On' },
                  { value: '100%', label: 'Custom Built' },
                ].map((s, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1.5 py-5 ${i < 2 ? 'border-r' : ''}`}
                    style={{ borderColor: 'rgba(124,58,237,0.25)' }}>
                    <span className="text-xl font-black" style={{ color: '#f97316', textShadow: '0 0 18px rgba(249,115,22,0.8)' }}>{s.value}</span>
                    <span className="text-[9px] tracking-[0.12em] uppercase text-center leading-tight px-1" style={{ color: 'rgba(240,240,255,0.3)' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="h-px w-full" style={{ background: 'rgba(124,58,237,0.25)' }} />

              {/* Social links + CTA */}
              <div className="px-8 py-6 flex flex-col gap-3">
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl transition-all text-sm font-semibold"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.28)', color: 'rgba(200,190,255,0.75)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.22)'; e.currentTarget.style.color = '#c4b5fd'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; e.currentTarget.style.color = 'rgba(200,190,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.28)' }}>
                    <IconFacebook size={14} /> Facebook
                  </a>
                  <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl transition-all text-sm font-semibold"
                    style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.22)', color: 'rgba(103,232,249,0.75)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; e.currentTarget.style.color = '#67e8f9'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.color = 'rgba(103,232,249,0.75)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.22)' }}>
                    <IconInstagram size={14} /> @treybm3
                  </a>
                </div>
                <a href="tel:7253770241"
                  className="flex items-center justify-center gap-2 w-full py-4 font-black text-sm transition-all"
                  style={{ ...pillBase }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(168,85,247,0.75)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string; e.currentTarget.style.transform = 'translateY(0)' }}
                ><Phone size={16} /> Contact Trey</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ChatWidget />

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={scrollTop} className="flex flex-col leading-none text-left hover:opacity-80 transition-opacity">
            <span className="font-black text-sm" style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TM Design</span>
            <span className="text-[9px]" style={{ color: 'var(--dim)' }}>Where your thoughts become reality</span>
          </button>
          <p className="text-xs" style={{ color: 'var(--dim)' }}>Lansing, MI · 2025</p>
        </div>
      </footer>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        style={{ background: 'rgba(4,5,14,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(124,58,237,0.3)' }}>
        <div className="px-4 py-3">
          <a href="tel:7253770241"
            className="flex items-center justify-center gap-2 w-full py-3.5 font-black text-sm transition-all"
            style={{ ...pillBase }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(168,85,247,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = pillBase.boxShadow as string }}
          ><Phone size={16} /> Contact Trey</a>
        </div>
      </div>

    </main>
  )
}

// ── Galaxy Canvas ─────────────────────────────────────────────────────────────
function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let raf: number

    type Star = { x:number; y:number; r:number; a:number; twinkle:number; speed:number; hue:number }
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
          a: Math.random() * 0.75 + 0.15,
          twinkle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.004,
          hue: roll < 0.12 ? 270 : roll < 0.22 ? 210 : -1,
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
        ctx.fillStyle = s.hue === 270 ? `rgba(210,170,255,${alpha})` : s.hue === 210 ? `rgba(160,215,255,${alpha})` : `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
      if (Math.random() < 0.022 && shooters.length < 10) {
        const angle = (Math.random() * 40 + 15) * Math.PI / 180
        const spd = Math.random() * 9 + 5
        shooters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          vx: spd * Math.cos(angle),
          vy: spd * Math.sin(angle),
          life: 0,
          maxLife: 40 + Math.random() * 45,
          tail: 12 + Math.random() * 14,
          width: Math.random() * 1.4 + 0.8,
        })
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]
        const alpha = Math.sin((s.life / s.maxLife) * Math.PI)
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.tail, s.y - s.vy * s.tail)
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
        grad.addColorStop(0.35, `rgba(210,185,255,${alpha * 0.65})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * s.tail, s.y - s.vy * s.tail)
        ctx.strokeStyle = grad; ctx.lineWidth = s.width; ctx.stroke()
        ctx.beginPath(); ctx.arc(s.x, s.y, s.width, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill()
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
