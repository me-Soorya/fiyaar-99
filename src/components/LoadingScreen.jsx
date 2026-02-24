import React, { useState, useEffect } from 'react'

export default function LoadingScreen({ visible, onEnter }) {
  const [ready, setReady] = useState(false)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    // Show "click to enter" after a brief delay
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) {
      setTimeout(() => setHide(true), 1000)
    }
  }, [visible])

  if (hide) return null

  const handleClick = () => {
    if (ready && onEnter) onEnter()
  }

  return (
    <div
      className={`loading-screen ${!visible ? 'hidden' : ''}`}
      onClick={handleClick}
      style={{ cursor: ready ? 'pointer' : 'default' }}
    >
      <div className="loading-title">FIYAAR</div>
      <div className="loading-subtitle">a story in frames</div>
      {!ready ? (
        <div className="loading-bar">
          <div className="loading-bar-fill" />
        </div>
      ) : (
        <div className="loading-enter">
          <span>tap anywhere to enter</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  )
}
