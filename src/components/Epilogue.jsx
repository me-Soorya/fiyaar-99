import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sparkles from './effects/Sparkles'
import Confetti from './effects/Confetti'

export default function Epilogue() {
  const sectionRef = useRef(null)
  const crownRef = useRef(null)
  const happyRef = useRef(null)
  const birthdayRef = useRef(null)
  const nameRef = useRef(null)
  const dividerRef = useRef(null)
  const messageRef = useRef(null)
  const emojiRowRef = useRef(null)
  const tagRef = useRef(null)
  const sparkleRef = useRef(null)
  const confettiRef = useRef(null)
  const orbsRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Scroll-scrubbed entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 0.8,
        }
      })

      tl.fromTo(orbsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
        0
      )
      tl.fromTo(sparkleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
        0.05
      )
      tl.fromTo(confettiRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
        0.05
      )
      tl.fromTo(crownRef.current,
        { opacity: 0, y: 30, scale: 0.6 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'none' },
        0.1
      )
      tl.fromTo(happyRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'none' },
        0.15
      )
      tl.fromTo(birthdayRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'none' },
        0.25
      )
      tl.fromTo(nameRef.current,
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'none' },
        0.38
      )
      tl.fromTo(dividerRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 0.4, scaleX: 1, duration: 0.15, ease: 'none' },
        0.45
      )
      tl.fromTo(messageRef.current,
        { opacity: 0, y: 25 },
        { opacity: 0.75, y: 0, duration: 0.2, ease: 'none' },
        0.50
      )
      tl.fromTo(emojiRowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'none' },
        0.60
      )
      tl.fromTo(tagRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.15, ease: 'none' },
        0.70
      )

      // Gentle floating for the name after it appears
      gsap.to(nameRef.current, {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
        delay: 1,
      })

      // Crown gentle bob
      gsap.to(crownRef.current, {
        y: -4,
        rotation: 3,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
        delay: 1.2,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="epilogue" ref={sectionRef}>
      <div className="epilogue-bg" />

      {/* Floating light orbs */}
      <div className="epilogue-orbs" ref={orbsRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`epilogue-orb epilogue-orb--${i + 1}`} />
        ))}
      </div>

      {/* Sparkles + confetti */}
      <div className="epilogue-sparkles" ref={sparkleRef}>
        <Sparkles />
      </div>
      <div className="epilogue-confetti" ref={confettiRef}>
        <Confetti />
      </div>

      {/* Main content */}
      <div className="epilogue-content">
        <div className="epilogue-crown" ref={crownRef}>👑</div>

        <div className="epilogue-hero-text">
          <span className="epilogue-happy" ref={happyRef}>Happy</span>
          <span className="epilogue-birthday" ref={birthdayRef}>Birthday</span>
        </div>

        <h2 className="epilogue-name" ref={nameRef}>Ashly</h2>

        <div className="epilogue-divider" ref={dividerRef}>
          <span className="epilogue-divider-star">✦</span>
          <span className="epilogue-divider-line" />
          <span className="epilogue-divider-star">✦</span>
        </div>

        <p className="epilogue-message" ref={messageRef}>
          Here's to a year filled with the same warmth, laughter,
          and light you bring to everyone around you.
          You're not just a chapter in this story — you're the reason it's worth telling.
        </p>

        <div className="epilogue-emoji-row" ref={emojiRowRef}>
          <span>🎂</span>
          <span>🎁</span>
          <span>🎈</span>
          <span>🥳</span>
          <span>🎉</span>
        </div>

        <span className="epilogue-tag" ref={tagRef}>And the Story Continues...Adding chapters !!!</span>
      </div>
    </section>
  )
}
