import { useRef } from 'react'

const starData = Array.from({ length: 110 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5,
  d: 2 + Math.random() * 4,
  dl: Math.random() * 5,
  op: 0.2 + Math.random() * 0.7,
}))

export default function Stars() {
  return (
    <div className="stars">
      {starData.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            '--d': `${s.d}s`,
            '--dl': `${s.dl}s`,
            '--op': s.op,
          }}
        />
      ))}
    </div>
  )
}
