import React, { useMemo } from 'react'

const NOTES = ['♪', '♫', '♬', '♩', '🎵', '🎶']

export default function MusicNotes() {
  const notes = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      note: NOTES[Math.floor(Math.random() * NOTES.length)],
      left: `${10 + Math.random() * 80}%`,
      bottom: `${Math.random() * 40}%`,
      duration: `${3 + Math.random() * 3}s`,
      delay: `${Math.random() * 5}s`,
      fontSize: `${1 + Math.random() * 1.5}rem`,
    }))
  }, [])

  return (
    <div className="music-notes">
      {notes.map(note => (
        <span
          key={note.id}
          className="music-note"
          style={{
            left: note.left,
            bottom: note.bottom,
            fontSize: note.fontSize,
            animationDuration: note.duration,
            animationDelay: note.delay,
          }}
        >
          {note.note}
        </span>
      ))}
    </div>
  )
}
