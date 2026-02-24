import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Scene({ scene, index, effect }) {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const overlayRef = useRef(null)
  const chapterRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const quoteRef = useRef(null)
  const effectRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Single master timeline scrubbed to scroll — clean, no conflicts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 0.8,
        }
      })

      // --- PHASE 1: Enter (0% → 25%) — Fade in + slide up ---
      tl.fromTo(imgRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'none' },
        0
      )
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'none' },
        0
      )
      tl.fromTo(chapterRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'none' },
        0.08
      )
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'none' },
        0.12
      )
      tl.fromTo(bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'none' },
        0.16
      )
      tl.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.75, y: 0, duration: 0.12, ease: 'none' },
        0.20
      )
      tl.fromTo(effectRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'none' },
        0.15
      )

      // --- PHASE 2: Hold (25% → 70%) — Gentle parallax, everything visible ---
      tl.to(imgRef.current,
        { y: -30, duration: 0.45, ease: 'none' },
        0.25
      )

      // --- PHASE 3: Exit (70% → 100%) — Fade out + drift up ---
      tl.to(imgRef.current,
        { opacity: 0, y: -60, duration: 0.30, ease: 'none' },
        0.70
      )
      tl.to(overlayRef.current,
        { opacity: 0, duration: 0.25, ease: 'none' },
        0.70
      )
      tl.to(chapterRef.current,
        { opacity: 0, y: -20, duration: 0.20, ease: 'none' },
        0.72
      )
      tl.to(titleRef.current,
        { opacity: 0, y: -25, duration: 0.20, ease: 'none' },
        0.74
      )
      tl.to(bodyRef.current,
        { opacity: 0, y: -20, duration: 0.20, ease: 'none' },
        0.76
      )
      tl.to(quoteRef.current,
        { opacity: 0, y: -15, duration: 0.18, ease: 'none' },
        0.78
      )
      tl.to(effectRef.current,
        { opacity: 0, duration: 0.20, ease: 'none' },
        0.75
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const isReverse = scene.layout === 'reverse'

  return (
    <section
      ref={sectionRef}
      className={`scene ${scene.mood}`}
      data-scene={scene.id}
    >
      <div className="scene-mood-bg" />
      <div className="scene-vignette" />

      <div className={`scene-content ${isReverse ? 'scene-content--reverse' : ''}`}>
        <div className="scene-image-wrap" ref={imgRef}>
          <img
            src={scene.image}
            alt={scene.title}
            className="scene-image"
            loading="lazy"
            draggable="false"
          />
        </div>

        <div className="scene-text-block" ref={overlayRef}>
          <span className="scene-chapter" ref={chapterRef}>{scene.chapter}</span>
          <h2 className="scene-title" ref={titleRef}>{scene.title}</h2>
          <p className="scene-body" ref={bodyRef}>{scene.body}</p>
          <p className="scene-quote" ref={quoteRef}>{scene.quote}</p>
        </div>
      </div>

      <div className="scene-effect-layer" ref={effectRef}>
        {effect}
      </div>
    </section>
  )
}
