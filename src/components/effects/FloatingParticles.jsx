import React, { useMemo } from 'react'

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 3}px`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 8}s`,
      color: `rgba(255, 255, 255, ${0.05 + Math.random() * 0.15})`,
    }))
  }, [])

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
