import React, { useMemo } from 'react'

export default function Rain() {
  const drops = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${15 + Math.random() * 30}px`,
      duration: `${0.4 + Math.random() * 0.4}s`,
      delay: `${Math.random() * 2}s`,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  }, [])

  return (
    <div className="rain-container">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: drop.left,
            height: drop.height,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  )
}
