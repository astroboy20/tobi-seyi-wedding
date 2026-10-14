'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { allStoryImages, galleryImages, heroImage, storyChapters } from '@/data/gallery'

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function WeddingPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

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
        <a href="#top" className="wordmark" aria-label="Tobi and Seyi home">T <span>&</span> S</a>
        <nav aria-label="Primary navigation">
          <a href="#story">Our story</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <span className="header-note">Since 2019</span>
      </header>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <Reveal><p className="eyebrow">A story that started in 2019</p></Reveal>
          <Reveal className="hero-title-wrap"><h1>Tobi <em>&</em><br />Seyi</h1></Reveal>
          <Reveal><p className="hero-subtitle">From friendship<br /><em>to forever.</em></p></Reveal>
          <Reveal><a className="text-link" href="#story">Discover our story <ArrowDown size={15} strokeWidth={1.5} /></a></Reveal>
        </div>
        <Reveal className="hero-image-wrap">
          <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 700px) 100vw, 58vw" className="cover-image" />
          <span className="image-index">01 <span>/</span> 13</span>
        </Reveal>
        <div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><ArrowDown size={15} /></div>
      </section>

      <section id="story" className="story section-pad">
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
      </section>

      <section id="gallery" className="gallery section-pad">
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
      </section>

      <section className="closing section-pad">
        <div className="closing-mark">T <span>&</span> S</div>
        <Reveal><p className="eyebrow sage">The next chapter</p><h2>Turns out, some of the best<br /><em>love stories begin with the</em><br />simplest conversations.</h2></Reveal>
        <Reveal><p className="signature">Tobi <span>&</span> Seyi</p><p className="closing-detail">From friendship to forever.</p></Reveal>
      </section>

      <footer className="site-footer"><span>Tobi & Seyi</span><span>From friendship to forever.</span><a href="#top">Back to top <ArrowUpRight size={13} /></a></footer>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setActiveImage(null)}>
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
