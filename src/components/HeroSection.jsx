import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HeroSection() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Entrance: no scroll dependency — plays once on mount
      const enter = gsap.timeline({ delay: 3.4 })
      enter.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      )
      enter.fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )
      enter.fromTo(scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      // Pulsing arrow
      gsap.to(scrollHintRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut',
        delay: 4.5
      })

      // Scroll exit — only transform + opacity, NO filter
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        }
      })
      .to(titleRef.current, { y: -80, opacity: 0, duration: 1, ease: 'none' }, 0)
      .to(taglineRef.current, { y: -50, opacity: 0, duration: 1, ease: 'none' }, 0.05)
      .to(scrollHintRef.current, { opacity: 0, duration: 0.5, ease: 'none' }, 0)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" />
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>FIYAAR</h1>
        <p className="hero-tagline" ref={taglineRef}>a story told in frames</p>
        <div className="hero-scroll-hint" ref={scrollHintRef}>
          <span>scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
