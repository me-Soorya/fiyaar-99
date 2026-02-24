import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Scene from './components/Scene'
import HeroSection from './components/HeroSection'
import Epilogue from './components/Epilogue'
import SceneNav from './components/SceneNav'
import LoadingScreen from './components/LoadingScreen'
import Rain from './components/effects/Rain'
import Confetti from './components/effects/Confetti'
import MusicNotes from './components/effects/MusicNotes'
import FloatingParticles from './components/effects/FloatingParticles'
import Sparkles from './components/effects/Sparkles'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL

const scenes = [
  {
    id: 1,
    chapter: 'Chapter I',
    title: '99.9% Impossible',
    body: 'Late nights and a glowing screen. Soorya sat in the stillness of his room — the world outside fading behind rain-streaked glass. The phone call which said, "Sorry to say Soorya...99.9% it\'s not possible"',
    quote: '"Some stories begin in silence..."',
    image: BASE + 'scenes/scene1.png',
    mood: 'mood-lonely-night',
    effect: 'rain',
    layout: 'default',
    label: 'The Quiet'
  },
  {
    id: 2,
    chapter: 'Chapter II',
    title: 'Bus Bay !',
    body: 'A sea of unfamiliar faces. Soorya, quiet and unsure. Ashly, bright and Positive. And two friends who would witness it all. Soorya Seeking the chance to talk to Ms. Sebu...Sereng noticing everything with the eyes of a hawk...And Ashly, just being her radiant self.',
    quote: '"...before the universe conspires."',
    image: BASE + 'scenes/scene2.png',
    mood: 'mood-first-meeting',
    effect: 'particles',
    layout: 'reverse',
    label: 'First Sight'
  },
  {
    id: 3,
    chapter: 'Chapter III',
    title: 'Soorya..Are You Really Okay??',
    body: 'Soorya...Are You Okay??..The Concern was a lifeline.!!',
    quote: '"Sometimes, it takes just one question to change everything."',
    image: BASE + 'scenes/scenecross.png',
    mood: 'mood-classroom-hype',
    effect: 'rain',
    layout: 'default',
    label: 'Are You Okay?'
  },
  {
    id: 4,
    chapter: 'Chapter IV',
    title: 'The Classroom Erupts',
    body: 'Word travels fast. "SOORYA!!!!" from one corner. "ASHLY! AASHLY AASHLY!" from another. The classroom became a stage they never auditioned for — chaos in their hearts.',
    quote: '"Fame found them with Work."',
    image: BASE + 'scenes/scene3.png',
    mood: 'mood-classroom-hype',
    effect: 'confetti',
    layout: 'reverse',
    label: 'The Hype'
  },
  {
    id: 5,
    chapter: 'Chapter V',
    title: 'The One He Can\'t Stop Talking About',
    body: '"Sebu is just... the best! She\'s so cool, and smart ! !" Soorya rambled on, eyes lit up like fairy lights. Ashly walked beside him, hand on her forehead. "Oh my god... not again."',
    quote: '"Some obsessions are just... inevitable."',
    image: BASE + 'scenes/scene4.png',
    mood: 'mood-comedy',
    effect: 'particles',
    layout: 'default',
    label: 'The Obsession'
  },
  {
    id: 6,
    chapter: 'Chapter VI',
    title: 'Confluence 2.0',
    body: 'The Academia meet of the year. Balloons, banners, and a hundred things to organize. Ashly Running around ! !.',
    quote: '"Some events are just... unforgettable. but WORK ! !"',
    image: BASE + 'scenes/scene5.png',
    mood: 'mood-confluence',
    effect: 'particles',
    layout: 'reverse',
    label: 'The Fest'
  },
  {
    id: 7,
    chapter: 'Chapter VII',
    title: 'Fiyaar🔥',
    body: 'She watched from her screen, phone glowing in the dark. "Fiyaaar!"',
    quote: '"Some moments are just... pure fire??"',
    image: BASE + 'scenes/scene6.png',
    mood: 'mood-fiyaar',
    effect: 'music',
    layout: 'default',
    label: 'Fiyaar'
  },
  {
    id: 8,
    chapter: 'Chapter VIII',
    title: 'Kunnimani Cheppu',
    body: 'She said, She couldn\'t...But she can !!',
    quote: '"Kunnimani Cheppu Thurannenni Nokkum Neram..."',
    image: BASE + 'scenes/scene7.png',
    mood: 'mood-romantic',
    effect: 'music',
    layout: 'reverse',
    label: 'The Song'
  },
  {
    id: 9,
    chapter: 'Chapter IX',
    title: 'Happy Birthday, Ashly',
    body: 'Happy Birthday, Ashly! I was looking back at everything we\'ve been through, and I honestly don\'t know how I would\'ve made it without you. From holding me together after Ms. Sebu\'s Rejection to being one among the minions who could make me laugh after getting thrashed and mocked, you\'ve been my absolute rock. Thank you for always being in my corner and cheering the loudest for me. You deserve the world today!',
    quote: '"The best gifts aren\'t wrapped. They\'re felt.(Something i learnt from an important person)..Did you felt??"',
    image: BASE + 'scenes/scene8.png',
    mood: 'mood-birthday',
    effect: 'sparkles',
    layout: 'default',
    label: 'Birthday'
  }
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeScene, setActiveScene] = useState(0)
  const sceneRefs = useRef([])
  const lenisRef = useRef(null)
  const progressRef = useRef(null)
  const audioRef = useRef(null)

  // Lenis smooth scroll — starts stopped, enabled after loading
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis
    // Lock scroll during loading
    lenis.stop()
    document.body.style.overflow = 'hidden'
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => { lenis.raf(time * 1000) }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  // Unlock scroll + play audio when loading finishes
  useEffect(() => {
    if (!loading) {
      // Unlock scroll
      document.body.style.overflow = ''
      if (lenisRef.current) lenisRef.current.start()
      // Play audio (hidden)
      if (audioRef.current) {
        audioRef.current.volume = 0.5
        audioRef.current.play().catch(() => {})
      }
    }
  }, [loading])

  // Preload images
  useEffect(() => {
    const promises = scenes.map(s =>
      new Promise(r => { const img = new Image(); img.onload = img.onerror = r; img.src = s.image })
    )
    Promise.all(promises).then(() => setTimeout(() => setLoading(false), 3000))
    setTimeout(() => setLoading(false), 5000)
  }, [])

  // ScrollTrigger: progress bar + active scene
  useEffect(() => {
    if (loading) return
    const t = setTimeout(() => {
      ScrollTrigger.refresh()

      // Progress bar via transform scaleX — GPU only, no layout/paint
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`
          }
        }
      })

      // Active scene
      sceneRefs.current.forEach((ref, i) => {
        if (!ref) return
        ScrollTrigger.create({
          trigger: ref,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveScene(i),
          onEnterBack: () => setActiveScene(i),
        })
      })
    }, 200)
    return () => { clearTimeout(t); ScrollTrigger.getAll().forEach(st => st.kill()) }
  }, [loading])

  const getEffect = (type) => {
    switch (type) {
      case 'rain': return <Rain />
      case 'confetti': return <Confetti />
      case 'music': return <MusicNotes />
      case 'sparkles': return <Sparkles />
      case 'particles': return <FloatingParticles />
      default: return <FloatingParticles />
    }
  }

  return (
    <>
      <audio ref={audioRef} src={BASE + 'Audio.mp3'} loop preload="auto" style={{ display: 'none' }} />
      <LoadingScreen visible={loading} />
      <div className="film-grain" />
      <div className="cinema-bars">
        <div className="cinema-bar-top" />
        <div className="cinema-bar-bottom" />
      </div>
      <div className="progress-bar" ref={progressRef} />
      <SceneNav scenes={scenes} activeScene={activeScene} sceneRefs={sceneRefs} lenis={lenisRef} />
      <HeroSection />
      {scenes.map((scene, index) => (
        <React.Fragment key={scene.id}>
          {index > 0 && (
            <div className="scene-divider">
              <div className="divider-line" />
              <span className="divider-text">· · ·</span>
            </div>
          )}
          <div ref={el => sceneRefs.current[index] = el}>
            <Scene scene={scene} index={index} effect={getEffect(scene.effect)} />
          </div>
        </React.Fragment>
      ))}
      <Epilogue />
    </>
  )
}
