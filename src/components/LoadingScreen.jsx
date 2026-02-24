import React, { useState, useEffect } from 'react'

export default function LoadingScreen({ visible }) {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    if (!visible) {
      setTimeout(() => setHide(true), 1200)
    }
  }, [visible])

  if (hide) return null

  return (
    <div className={`loading-screen ${!visible ? 'hidden' : ''}`}>
      <div className="loading-title">FIYAAR</div>
      <div className="loading-subtitle">a story in frames</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
    </div>
  )
}
