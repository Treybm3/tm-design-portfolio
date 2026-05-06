'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, ChevronRight } from 'lucide-react'
import ChatWidget from './components/ChatWidget'

function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

// ── Skill icons ───────────────────────────────────────────────────────────────
const SkillIcons = {
  code:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  bot:       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
  chart:     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  megaphone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  link:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  camera:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  seo:       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
}

const SKILLS = [
  { icon: SkillIcons.code,      name: 'Custom Websites',          desc: 'Built from scratch around your brand. No templates — every detail designed to match your vision and turn visitors into paying customers.' },
  { icon: SkillIcons.bot,       name: 'AI Chat',                  desc: 'A 24/7 AI assistant on your site that answers questions, handles inquiries, and keeps customers engaged even when you\'re closed.' },
  { icon: SkillIcons.chart,     name: 'Analytics Dashboard',      desc: 'See who\'s visiting your site, where they\'re coming from, and what they\'re clicking. Real data so you can make real decisions.' },
  { icon: SkillIcons.megaphone, name: 'Social Media Marketing',   desc: 'Get your business in front of the right people across Facebook, Instagram, and more. Consistent content that builds your brand over time.' },
  { icon: SkillIcons.link,      name: 'Social Media Sync',        desc: 'Your Instagram and Facebook connected directly to your website. Your latest posts show up live — always fresh, always relevant.' },
  { icon: SkillIcons.camera,    name: 'Photography',              desc: 'Professional photos that make your site and social pages stand out. We handle the shoot so your business always looks its best.' },
  { icon: SkillIcons.seo,       name: 'SEO Optimization',         desc: 'Built-in search tags and structure so your business shows up on Google first — not buried on page five where nobody looks.' },
]

const WORKS = [
  {
    name:     'Kris Professional Cuts',
    url:      'https://krisprofessionalcuts.com',
    sunColor: 'rgba(59,130,246,0.5)',
    border:   'rgba(59,130,246,0.35)',
    accent:   '#3b82f6',
    tag:      'Barbershop · Lansing, MI',
    desc:     'A fully custom site built for Kris Professional Cuts. Clients tap once to book through Booksy, browse all services and pricing, meet the team, and get real-time answers from an AI chat — 24/7. SEO-optimized so new clients find the shop first on Google. Clean, fast, and professional from every angle.',
  },
  {
    name:     'Another Planet Barbershop',
    url:      'https://another-planet-barbershop.vercel.app',
    sunColor: 'rgba(249,115,22,0.5)',
    border:   'rgba(249,115,22,0.35)',
    accent:   '#f97316',
    tag:      'Barbershop · Lansing, MI',
    desc:     'Built for Another Planet Barbershop — a sharp, modern site with a live availability toggle so clients always know when to walk in. AI chat answers questions around the clock, Booksy booking is one click away, and the site even tracks local event participation. Built to keep the shop visible and the chairs full.',
  },
]

const FULL_TEXT = 'TM Design'

export default function Page() {
  const [typed,    setTyped]    = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

      {/* ── Fixed particle canvas — visible on ALL sections ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <ParticleCanvas />
      </div>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:     scrolled ? 'rgba(5,6,15,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom:   scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span
              className="font-black text-lg tracking-tight"
              style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              TM Design
            </span>
            <span className="text-[9px] font-medium tracking-[0.15em]" style={{ color: 'var(--dim)' }}>
              Where your thoughts become reality
            </span>
          </div>
          <div className="flex items-center gap-5">
            {[['Work','#work'],['Skills','#skills'],['About','#about'],['Contact','#contact']].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm font-medium transition-colors hidden sm:block"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >{label}</a>
            ))}
            <a href="#contact"
              className="text-sm font-bold px-4 py-2 rounded-full transition"
              style={{ background: 'var(--purple)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple-mid)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
            >Hire Me</a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">

        {/* Big purple immersive bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(109,40,217,0.38) 0%, rgba(76,29,149,0.18) 45%, transparent 75%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(124,58,237,0.22) 0%, transparent 65%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 40% at 20% 75%, rgba(6,182,212,0.13) 0%, transparent 65%)',
        }} />

        <div className="relative text-center max-w-3xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center gap-7">

          <div className="text-xs font-semibold tracking-[0.4em] uppercase px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(124,58,237,0.45)', color: 'var(--muted)', background: 'rgba(124,58,237,0.12)' }}>
            Web &amp; AI Solutions for Local Business
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none"
            style={{ background: 'linear-gradient(135deg, var(--purple-mid) 0%, var(--cyan) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', minHeight: '1.2em' }}>
            {typed}
            <span className="inline-block w-[3px] align-middle ml-1 rounded"
              style={{ height: '0.85em', background: 'var(--cyan)', animation: 'type-cursor 1s step-end infinite' }} />
          </h1>

          <p className="text-lg sm:text-xl font-light leading-relaxed" style={{ color: 'rgba(220,215,255,0.75)', maxWidth: '500px' }}>
            I build custom websites and AI-powered tools for local businesses in Lansing, MI.
            Fast. Sharp. Built to convert.
          </p>

          {/* Buttons — Another Planet style */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-1">
            <a href="#work"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wide transition"
              style={{ background: 'var(--purple)', color: '#fff', borderRadius: '8px', boxShadow: '0 0 28px rgba(124,58,237,0.45)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--purple-mid)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(168,85,247,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--purple)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.45)' }}
            >
              See My Work <ChevronRight size={15} />
            </a>
            <a href="#contact"
              className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-sm border transition"
              style={{ borderRadius: '8px', borderColor: 'rgba(124,58,237,0.5)', color: 'rgba(220,215,255,0.8)', background: 'rgba(124,58,237,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.9)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(124,58,237,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.color = 'rgba(220,215,255,0.8)'; e.currentTarget.style.background = 'rgba(124,58,237,0.08)' }}
            >
              Get in Touch
            </a>
          </div>

          {/* Beamy social icons */}
          <div className="flex items-center gap-3 pt-1">
            <a href="tel:7253770241"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition"
              style={{ background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.4)', color: 'rgba(220,215,255,0.8)', boxShadow: '0 0 14px rgba(124,58,237,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.3)'; e.currentTarget.style.boxShadow = '0 0 22px rgba(124,58,237,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.18)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(124,58,237,0.25)' }}
            >
              <Phone size={13} /> 725-377-0241
            </a>

            {/* Facebook — beamy purple */}
            <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition"
              style={{ background: 'rgba(124,58,237,0.22)', border: '1px solid rgba(124,58,237,0.5)', color: '#c4b5fd', boxShadow: '0 0 16px rgba(124,58,237,0.35), 0 0 6px rgba(124,58,237,0.2) inset' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.38)'; e.currentTarget.style.boxShadow = '0 0 26px rgba(124,58,237,0.65), 0 0 10px rgba(124,58,237,0.3) inset' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.22)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.35), 0 0 6px rgba(124,58,237,0.2) inset' }}
              aria-label="Facebook"
            >
              <IconFacebook size={16} />
            </a>

            {/* Instagram — beamy cyan */}
            <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition"
              style={{ background: 'rgba(6,182,212,0.18)', border: '1px solid rgba(6,182,212,0.45)', color: '#67e8f9', boxShadow: '0 0 16px rgba(6,182,212,0.3), 0 0 6px rgba(6,182,212,0.15) inset' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.32)'; e.currentTarget.style.boxShadow = '0 0 26px rgba(6,182,212,0.55), 0 0 10px rgba(6,182,212,0.25) inset' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(6,182,212,0.3), 0 0 6px rgba(6,182,212,0.15) inset' }}
              aria-label="Instagram"
            >
              <IconInstagram size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          WORK
      ══════════════════════════════════════════ */}
      <section id="work" className="relative py-24 px-6 z-10" style={{ background: 'rgba(12,14,26,0.85)', backdropFilter: 'blur(2px)' }}>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-6">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-black">Live Sites I Built</h2>
          </div>

          {/* Shared description */}
          <p className="text-sm leading-relaxed text-center mb-14 mx-auto" style={{ color: 'var(--muted)', maxWidth: '560px' }}>
            Fully custom, automated sites built with real business needs in mind. Easy navigation for clients,
            all the info they need upfront, AI chat available 24/7, and SEO tags so your business ranks on
            Google first. No templates. No shortcuts.
          </p>

          {/* Horizontal cards with vertical divider */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0">

            {/* Kris */}
            <div className="relative flex items-center justify-center flex-1">
              <div className="absolute" style={{ width: '300px', height: '300px', background: `radial-gradient(circle, ${WORKS[0].sunColor} 0%, transparent 68%)`, filter: 'blur(22px)', borderRadius: '50%', zIndex: 0 }} />
              <div className="flex flex-col items-center gap-4 relative z-10">
                <a href={WORKS[0].url} target="_blank" rel="noopener noreferrer"
                  className="overflow-hidden rounded-2xl group"
                  style={{ width: '220px', height: '220px', display: 'block', border: `1px solid ${WORKS[0].border}`, background: 'var(--card)' }}
                >
                  <iframe src={WORKS[0].url} title={WORKS[0].name}
                    style={{ width: '880px', height: '880px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(5,6,15,0.8) 0%, transparent 60%)' }}>
                    <span className="text-xs font-black tracking-widest uppercase"
                      style={{ color: 'var(--purple-mid)', textShadow: '0 0 12px rgba(168,85,247,0.9)' }}>Click Me</span>
                  </div>
                </a>
                <div className="text-center">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-0.5" style={{ color: WORKS[0].accent }}>{WORKS[0].tag}</p>
                  <p className="text-sm font-black">{WORKS[0].name}</p>
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="flex flex-col items-center gap-3 px-6 py-8">
              <div className="w-px flex-1 min-h-[80px]" style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.5), transparent)' }} />
              <span style={{ color: 'rgba(168,85,247,0.7)', fontSize: '16px', textShadow: '0 0 10px rgba(168,85,247,0.8)' }}>✦</span>
              <div className="w-px flex-1 min-h-[80px]" style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.5), transparent)' }} />
            </div>

            {/* Another Planet */}
            <div className="relative flex items-center justify-center flex-1">
              <div className="absolute" style={{ width: '300px', height: '300px', background: `radial-gradient(circle, ${WORKS[1].sunColor} 0%, transparent 68%)`, filter: 'blur(22px)', borderRadius: '50%', zIndex: 0 }} />
              <div className="flex flex-col items-center gap-4 relative z-10">
                <a href={WORKS[1].url} target="_blank" rel="noopener noreferrer"
                  className="overflow-hidden rounded-2xl group"
                  style={{ width: '220px', height: '220px', display: 'block', border: `1px solid ${WORKS[1].border}`, background: 'var(--card)' }}
                >
                  <iframe src={WORKS[1].url} title={WORKS[1].name}
                    style={{ width: '880px', height: '880px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(5,6,15,0.8) 0%, transparent 60%)' }}>
                    <span className="text-xs font-black tracking-widest uppercase"
                      style={{ color: 'var(--purple-mid)', textShadow: '0 0 12px rgba(168,85,247,0.9)' }}>Click Me</span>
                  </div>
                </a>
                <div className="text-center">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-0.5" style={{ color: WORKS[1].accent }}>{WORKS[1].tag}</p>
                  <p className="text-sm font-black">{WORKS[1].name}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════ */}
      <section id="skills" className="relative py-24 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>What I Offer</p>
            <h2 className="text-4xl sm:text-5xl font-black">Everything Your<br />Business Needs</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {SKILLS.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="relative flex items-center justify-center" style={{ width: '68px', height: '68px' }}>
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.15))', filter: 'blur(8px)', transform: 'scale(1.3)' }} />
                  <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center border"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)', borderColor: 'rgba(124,58,237,0.35)', color: 'var(--purple-mid)' }}>
                    {s.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>{s.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="relative py-24 px-6 z-10" style={{ background: 'rgba(12,14,26,0.85)', backdropFilter: 'blur(2px)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--purple-mid)' }}>About</p>
            <h2 className="text-4xl sm:text-5xl font-black">The Person Behind It</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Photo */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="absolute" style={{ width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)', filter: 'blur(20px)', borderRadius: '50%' }} />
              <img
                src="/aboutme.jpg"
                alt="Trey Macklin"
                className="relative z-10 rounded-2xl object-cover"
                style={{ width: '220px', height: '260px', border: '1px solid rgba(124,58,237,0.35)', boxShadow: '0 0 40px rgba(124,58,237,0.25)' }}
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-6 flex-1">
              <div className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                <p>
                  My name is Trey Macklin. I&apos;m a college student at Michigan State University
                  pursuing my master&apos;s degree, and I&apos;ve been around computers my whole life — from
                  gaming and building Minecraft servers in Java as a kid, to teaching myself web
                  development long before AI tools were even a thing.
                </p>
                <p className="mt-4">
                  Over time I started noticing the same problems showing up in local businesses — no
                  real online presence, no efficient way to handle clients, nothing that made them
                  stand out. So I started building the solution. Custom websites and automation tools
                  that take that stress off your plate and let your business run smoother, look
                  sharper, and grow faster.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '2+', label: 'Sites Launched' },
                  { value: 'AI',  label: 'Chat Built In' },
                  { value: '$0',  label: 'Templates Used' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border"
                    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                    <div className="text-2xl font-black"
                      style={{ background: 'linear-gradient(135deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {s.value}
                    </div>
                    <div className="text-[11px] text-center leading-tight" style={{ color: 'var(--muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 px-6 z-10">
        <div className="max-w-md mx-auto text-center flex flex-col items-center gap-8">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase" style={{ color: 'var(--purple-mid)' }}>Contact</p>
          <h2 className="text-4xl sm:text-5xl font-black">Let&apos;s Build Something</h2>
          <p className="text-base" style={{ color: 'var(--muted)', maxWidth: '360px' }}>
            Ready to get your business online? Reach out and we&apos;ll talk about what I can build for you.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <a href="tel:7253770241"
              className="flex items-center justify-center gap-3 px-6 py-4 font-bold text-sm tracking-wide transition"
              style={{ background: 'var(--purple)', color: '#fff', borderRadius: '8px', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--purple-mid)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(168,85,247,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--purple)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.4)' }}
            >
              <Phone size={16} /> 725-377-0241
            </a>

            <a href="https://www.facebook.com/linton.macklin.3" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition"
              style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)', color: '#c4b5fd', borderRadius: '8px', boxShadow: '0 0 16px rgba(124,58,237,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.22)'; e.currentTarget.style.boxShadow = '0 0 26px rgba(124,58,237,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.2)' }}
            >
              <IconFacebook /> Facebook
            </a>

            <a href="https://www.instagram.com/treybm3/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.35)', color: '#67e8f9', borderRadius: '8px', boxShadow: '0 0 16px rgba(6,182,212,0.18)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.2)'; e.currentTarget.style.boxShadow = '0 0 26px rgba(6,182,212,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(6,182,212,0.18)' }}
            >
              <IconInstagram /> @treybm3
            </a>
          </div>
        </div>
      </section>

      <ChatWidget />

      {/* ── Footer ── */}
      <footer className="relative z-10 py-6 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm"
              style={{ background: 'linear-gradient(90deg, var(--purple-mid), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TM Design
            </span>
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
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []

    function resize() { canvas!.width = window.innerWidth; canvas!.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 120; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 1.5 + 0.5,
        a:  Math.random() * 0.65 + 0.2,
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
          if (d < 120) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(124,58,237,${0.28 * (1 - d / 120)})`
            ctx!.lineWidth = 0.7
            ctx!.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}
