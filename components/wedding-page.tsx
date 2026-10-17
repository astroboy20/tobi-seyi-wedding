'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Copy, MapPin, X } from 'lucide-react'
import { allStoryImages, galleryImages, heroImage, storyChapters } from '@/data/gallery'

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.visible = 'true'
        observer.disconnect()
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export type WeddingPageKind = 'home' | 'venue' | 'giving' | 'gallery'

export default function WeddingPage({ page = 'home' }: { page?: WeddingPageKind }) {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const lastFocused = useRef<HTMLElement | null>(null)
  const touchStart = useRef<number | null>(null)

  const copyText = async (text: string) => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(text)
      setCopyStatus('success')
    } catch {
      setCopyStatus('error')
    }
    window.setTimeout(() => setCopyStatus('idle'), 2400)
  }

  useEffect(() => {
    if (activeImage === null) return
    lastFocused.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null)
      if (event.key === 'ArrowRight') setActiveImage((index) => index === null ? 0 : (index + 1) % galleryImages.length)
      if (event.key === 'ArrowLeft') setActiveImage((index) => index === null ? 0 : (index - 1 + galleryImages.length) % galleryImages.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocused.current?.focus()
    }
  }, [activeImage])

  return (
    <main>
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="Tobi and Seyi home">T <span>&</span> S</a>
        <nav aria-label="Primary navigation">
          {([['home', 'Home', '/'], ['venue', 'Venue', '/venue'], ['giving', 'Giving', '/giving'], ['gallery', 'Gallery', '/gallery']] as const).map(([key, label, href]) => <a key={key} href={href} className={page === key ? 'active' : ''} aria-current={page === key ? 'page' : undefined}>{label}</a>)}
        </nav>
        <span className="header-note">Since 2019</span>
      </header>

      {page === 'home' && <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <Reveal><p className="eyebrow">A story that started in 2019</p></Reveal>
          <Reveal className="hero-title-wrap"><h1>Tobi <em>&</em><br />Seyi</h1></Reveal>
          <Reveal><p className="hero-subtitle">From friendship<br /><em>to forever.</em></p></Reveal>
          <Reveal><a className="text-link" href="#story">Discover our story <ArrowDown size={15} strokeWidth={1.5} /></a></Reveal>
        </div>
        <Reveal className="hero-image-wrap">
          <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 700px) 100vw, 58vw" className="cover-image" />
          <span className="image-index">01 <span>/</span> {String(galleryImages.length).padStart(2, '0')}</span>
        </Reveal>
        <div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><ArrowDown size={15} /></div>
      </section>}

      {page === 'home' && <section id="story" className="story section-pad">
        <div className="section-intro">
          <p className="eyebrow sage">Our love story</p>
          <h2>It started with<br /><em>a conversation.</em></h2>
          <p className="intro-copy">Somewhere between the everyday conversations, laughter, and growing friendship, something beautiful blossomed.</p>
        </div>
        <div className="chapters">
          {storyChapters.map((chapter, index) => (
            <article className={`chapter ${index % 2 ? 'chapter-reverse' : ''}`} key={chapter.number}>
              <Reveal className="chapter-image">
                <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="(max-width: 700px) 100vw, 48vw" className="cover-image" />
                <span className="chapter-index">{chapter.number}</span>
              </Reveal>
              <Reveal className="chapter-copy">
                <p className="eyebrow sage">{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
                <span className="chapter-rule" />
              </Reveal>
            </article>
          ))}
        </div>
      </section>}

      {page !== 'home' && <section className="page-intro section-pad"><p className="eyebrow sage">{page === 'venue' ? 'Where we celebrate' : page === 'giving' ? 'A little gift of love' : 'A visual archive'}</p><h1>{page === 'venue' ? <>The wedding<br /><em>venue.</em></> : page === 'giving' ? <>Your presence is<br /><em>the greatest gift.</em></> : <>The moments that<br /><em>became forever.</em></>}</h1></section>}

      {(page === 'home' || page === 'gallery') && <section id="gallery" className="gallery section-pad">
        <div className="gallery-heading">
          <Reveal><p className="eyebrow sage">A visual archive</p><h2>The moments that<br /><em>became forever.</em></h2></Reveal>
          <Reveal><p>From the first reconnection to all the little moments in between. A collection of the memories that made the story theirs.</p></Reveal>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} className={`gallery-item ${image.className}`}>
              <button onClick={() => setActiveImage(index)} aria-label={`Open photo ${index + 1}`}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 50vw, 33vw" className="cover-image" loading={index < 3 ? 'eager' : 'lazy'} />
                <span className="gallery-hover"><ArrowUpRight size={17} /></span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>}

      {(page === 'home' || page === 'venue') && <section className="venue-section section-pad" aria-labelledby="venue-title">
        <Reveal className="venue-inner">
          <div className="venue-label"><MapPin size={18} strokeWidth={1.25} aria-hidden="true" /><p className="eyebrow sage">Where we celebrate</p></div>
          <div className="venue-copy">
            <h2 id="venue-title">Whitestone<br /><em>Event Centre.</em></h2>
            <p>Billings Road, Ikeja,<br />Lagos, Nigeria</p>
            <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Whitestone%20Event%20Centre%2C%20Billings%20Road%2C%20Ikeja%2C%20Lagos%2C%20Nigeria" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} strokeWidth={1.5} /></a>
          </div>
        </Reveal>
      </section>}

      {(page === 'home' || page === 'giving') && <section className="gift-section section-pad" aria-labelledby="gift-title">
        <Reveal className="gift-inner">
          <div className="gift-copy">
            <p className="eyebrow sage">A little gift of love</p>
            <h2 id="gift-title">Your presence is<br /><em>the greatest gift.</em></h2>
            <p>For those who would like to bless us further, we are grateful for every thoughtful gesture.</p>
          </div>
          <div className="gift-details">
            <dl>
              <div><dt>Bank</dt><dd>Access Bank</dd></div>
              <div><dt>Account number</dt><dd className="account-number">0767137861 <button className="icon-button" type="button" onClick={() => copyText('0767137861')} aria-label="Copy account number"><Copy size={15} /></button></dd></div>
              <div><dt>Account name</dt><dd>Oluwatobi Glory Ajiboye</dd></div>
            </dl>
            <button className="copy-details" type="button" onClick={() => copyText('Access Bank\nAccount Number: 0767137861\nAccount Name: Oluwatobi Glory Ajiboye')}><Copy size={14} /> Copy account details</button>
            <p className={`copy-feedback ${copyStatus}`} role="status" aria-live="polite">{copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Copy unavailable — please select and copy manually.' : ''}</p>
            {page === 'giving' && <button className="hashtag-button" type="button" onClick={() => copyText('#ATimelessPromise')} aria-label="Copy wedding hashtag">#ATimelessPromise <Copy size={14} /></button>}
          </div>
        </Reveal>
      </section>}

      {page === 'home' && <section className="closing section-pad">
        <div className="closing-mark">T <span>&</span> S</div>
        <Reveal><p className="eyebrow sage">The next chapter</p><h2>Turns out, some of the best<br /><em>love stories begin with the</em><br />simplest conversations.</h2></Reveal>
        <Reveal><p className="signature">Tobi <span>&</span> Seyi</p><p className="closing-detail">From friendship to forever.</p><button className="hashtag-button" type="button" onClick={() => copyText('#ATimelessPromise')} aria-label="Copy wedding hashtag">#ATimelessPromise <Copy size={14} /></button><p className={`copy-feedback hashtag-feedback ${copyStatus}`} role="status" aria-live="polite">{copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Copy unavailable.' : 'Tap to copy our wedding hashtag'}</p></Reveal>
      </section>}

      <footer className="site-footer"><span>Tobi & Seyi</span><span>From friendship to forever.</span><nav aria-label="Footer navigation"><a href="/">Home</a><a href="/venue">Venue</a><a href="/giving">Giving</a><a href="/gallery">Gallery</a></nav></footer>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setActiveImage(null)} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null }} onTouchEnd={(event) => { const start = touchStart.current; const end = event.changedTouches[0]?.clientX; touchStart.current = null; if (start === null || end === undefined || Math.abs(end - start) < 44) return; setActiveImage((index) => index === null ? 0 : end < start ? (index + 1) % galleryImages.length : (index - 1 + galleryImages.length) % galleryImages.length) }}>
          <button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Close photo viewer"><X size={20} /></button>
          <button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + galleryImages.length) % galleryImages.length) }} aria-label="Previous photo"><ArrowLeft size={22} /></button>
          <div className="lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image src={allStoryImages[activeImage].src} alt={allStoryImages[activeImage].alt} fill sizes="90vw" className="contain-image" priority />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % galleryImages.length) }} aria-label="Next photo"><ArrowRight size={22} /></button>
          <p className="lightbox-count">{String(activeImage + 1).padStart(2, '0')} <span>/</span> {String(galleryImages.length).padStart(2, '0')}</p>
        </div>
      )}
    </main>
  )
}
