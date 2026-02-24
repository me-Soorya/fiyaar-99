import React, { useMemo } from 'react'

const COLORS = ['#ff6b9d', '#c084fc', '#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#fff']

export default function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
      size: `${4 + Math.random() * 8}px`,
      shape: Math.random() > 0.5 ? '50%' : '0',
    }))
  }, [])

  return (
    <div className="confetti-container">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            background: piece.color,
            borderRadius: piece.shape,
            animationDuration: piece.duration,
            animationDelay: piece.delay,
          }}
        />
      ))}
    </div>
  )
}
