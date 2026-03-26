import { useState, useEffect, useRef } from 'react'

export default function Toast({ msg, visible }) {
  const [phase, setPhase] = useState('')
  const prev = useRef('')

  useEffect(() => {
    if (visible && msg) {
      setPhase('in')
      prev.current = msg
    } else if (!visible && prev.current) {
      setPhase('out')
    }
  }, [visible, msg])

  if (!prev.current) return null

  return (
    <div className={`toast ${phase}`}>
      {prev.current}
    </div>
  )
}
