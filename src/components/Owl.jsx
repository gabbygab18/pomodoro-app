import { useState, useEffect, useRef } from 'react'

export default function Owl({ blinkKey }) {
  const [blink, setBlink] = useState(false)
  const blinkRef = useRef(null)

  // Random blink every 3–7.5 seconds
  useEffect(() => {
    const schedule = () => {
      blinkRef.current = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 220)
        schedule()
      }, 3000 + Math.random() * 4500)
    }
    schedule()
    return () => clearTimeout(blinkRef.current)
  }, [])

  // Forced blink triggered from parent (e.g. on session finish / reset)
  useEffect(() => {
    if (!blinkKey) return
    setBlink(true)
    setTimeout(() => setBlink(false), 300)
  }, [blinkKey])

  const lidH = blink ? 10 : 0

  return (
    <svg className="owl-svg" width="100" height="100" viewBox="0 0 110 110">
      {/* Body */}
      <ellipse cx="55" cy="70" rx="30" ry="33" fill="#6b4c2a" />
      {/* Belly */}
      <ellipse cx="55" cy="76" rx="18" ry="22" fill="#c49a5e" />
      {/* Belly texture lines */}
      <path d="M48 68 Q55 72 62 68" stroke="#b8894e" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M45 74 Q55 78 65 74" stroke="#b8894e" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M47 80 Q55 84 63 80" stroke="#b8894e" strokeWidth="1.2" fill="none" opacity="0.5" />
      {/* Head */}
      <ellipse cx="55" cy="42" rx="26" ry="25" fill="#5a3e1c" />
      {/* Ear tufts */}
      <polygon points="35,22 31,8 40,18" fill="#5a3e1c" />
      <polygon points="75,22 79,8 70,18" fill="#5a3e1c" />
      <polygon points="35,22 33,10 41,20" fill="#7a5c30" />
      <polygon points="75,22 77,10 69,20" fill="#7a5c30" />
      {/* Facial disc */}
      <ellipse cx="55" cy="44" rx="20" ry="19" fill="#8c6230" opacity="0.5" />
      {/* Left eye */}
      <circle cx="43" cy="42" r="10" fill="#f2d879" />
      <circle cx="43" cy="42" r="7"  fill="#2a1800" />
      <circle cx="43" cy="42" r="4.5" fill="#1a0f00" />
      <circle cx="46" cy="39" r="2"  fill="white" opacity="0.9" />
      <rect x="33" y="37" width="20" height={lidH} rx="5" fill="#5a3e1c" style={{ transition: 'height .12s' }} />
      {/* Right eye */}
      <circle cx="67" cy="42" r="10" fill="#f2d879" />
      <circle cx="67" cy="42" r="7"  fill="#2a1800" />
      <circle cx="67" cy="42" r="4.5" fill="#1a0f00" />
      <circle cx="70" cy="39" r="2"  fill="white" opacity="0.9" />
      <rect x="57" y="37" width="20" height={lidH} rx="5" fill="#5a3e1c" style={{ transition: 'height .12s' }} />
      {/* Beak */}
      <polygon points="55,49 51,55 59,55" fill="#e0a030" />
      <line x1="51" y1="52" x2="59" y2="52" stroke="#c07018" strokeWidth="0.8" />
      {/* Wings */}
      <ellipse cx="28" cy="72" rx="11" ry="20" fill="#4a3010" transform="rotate(-15 28 72)" />
      <ellipse cx="82" cy="72" rx="11" ry="20" fill="#4a3010" transform="rotate(15 82 72)" />
      <path d="M22 62 Q28 74 26 88" stroke="#6b4c2a" strokeWidth="1.5" fill="none" />
      <path d="M88 62 Q82 74 84 88" stroke="#6b4c2a" strokeWidth="1.5" fill="none" />
      {/* Feet */}
      <g fill="#e0a030">
        <ellipse cx="44" cy="100" rx="6" ry="3" transform="rotate(-10 44 100)" />
        <ellipse cx="66" cy="100" rx="6" ry="3" transform="rotate(10 66 100)" />
        <line x1="39" y1="100" x2="35" y2="106" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
        <line x1="43" y1="101" x2="42" y2="107" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
        <line x1="47" y1="100" x2="49" y2="106" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
        <line x1="61" y1="100" x2="59" y2="106" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="101" x2="66" y2="107" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
        <line x1="69" y1="100" x2="73" y2="106" stroke="#e0a030" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Scarf */}
      <path d="M35 60 Q55 55 75 60 Q73 67 55 63 Q37 67 35 60Z" fill="#e05c5c" opacity="0.85" />
      <path d="M55 62 Q58 72 56 82" stroke="#e05c5c" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}
