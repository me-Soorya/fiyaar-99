import React from 'react'

export default function SceneNav({ scenes, activeScene, sceneRefs, lenis }) {
  const scrollToScene = (index) => {
    if (lenis?.current && sceneRefs.current[index]) {
      lenis.current.scrollTo(sceneRefs.current[index], {
        offset: -100,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else if (sceneRefs.current[index]) {
      sceneRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <nav className="scene-counter">
      {scenes.map((scene, index) => (
        <div
          key={scene.id}
          className={`scene-dot ${activeScene === index ? 'active' : ''}`}
          data-label={scene.label}
          onClick={() => scrollToScene(index)}
        />
      ))}
    </nav>
  )
}
