import { useState, useEffect, useRef, useCallback } from 'react'
import Stars from './components/Stars.jsx'
import Owl from './components/Owl.jsx'
import Toast from './components/Toast.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import { CIRC, DEFAULT_SETTINGS, MESSAGES, MODE_LABELS, rnd } from './constants.js'
import { fmt, beep } from './utils.js'

export default function App() {
  const [settings, setSettings]       = useState(DEFAULT_SETTINGS)
  const [mode, setModeState]          = useState('pomodoro')
  const [timeLeft, setTimeLeft]       = useState(DEFAULT_SETTINGS.pomodoro * 60)
  const [totalTime, setTotalTime]     = useState(DEFAULT_SETTINGS.pomodoro * 60)
  const [running, setRunning]         = useState(false)
  const [pomoCount, setPomoCount]     = useState(0)
  const [message, setMessage]         = useState("Hoot hoot! Ready to focus? 🦉")
  const [showSettings, setShowSettings] = useState(false)
  const [blinkKey, setBlinkKey]       = useState(0)
  const [toast, setToast]             = useState({ msg: '', visible: false })

  // Refs so callbacks always see current values
  const intervalRef   = useRef(null)
  const settingsRef   = useRef(settings)
  const modeRef       = useRef(mode)
  const pomoRef       = useRef(pomoCount)
  settingsRef.current = settings
  modeRef.current     = mode
  pomoRef.current     = pomoCount

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000)
  }, [])

  const applyMode = useCallback((m, overrideSettings) => {
    const s = overrideSettings || settingsRef.current
    const t = s[m] * 60
    setModeState(m)
    setTimeLeft(t)
    setTotalTime(t)
    setRunning(false)
    clearInterval(intervalRef.current)
    setMessage(m === 'pomodoro' ? rnd(MESSAGES.pomodoro) : rnd(MESSAGES.break))
  }, [])

  const finish = useCallback(() => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setBlinkKey((k) => k + 1)
    setMessage(rnd(MESSAGES.done))

    if (settingsRef.current.sound) beep()

    const curMode = modeRef.current

    if (curMode === 'pomodoro') {
      const next = pomoRef.current + 1
      const completed = next >= 4
      setPomoCount(completed ? 0 : next)
      const nextMode = completed ? 'long' : 'short'
      showToast('🦉 Session complete! Time for a break.')
      if (settingsRef.current.autoBreak) {
        setTimeout(() => { applyMode(nextMode); setRunning(true) }, 1200)
      } else {
        setTimeout(() => applyMode(nextMode), 1200)
      }
    } else {
      showToast('🌟 Break over! Back to the grind.')
      if (settingsRef.current.autoPomodoro) {
        setTimeout(() => { applyMode('pomodoro'); setRunning(true) }, 1200)
      } else {
        setTimeout(() => applyMode('pomodoro'), 1200)
      }
    }
  }, [applyMode, showToast])

  // Timer tick
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { finish(); return 0 }
          return t - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, finish])

  const toggle = () => {
    setRunning((r) => {
      if (!r) setMessage(mode === 'pomodoro' ? rnd(MESSAGES.pomodoro) : rnd(MESSAGES.break))
      else setMessage(rnd(MESSAGES.paused))
      return !r
    })
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    const t = settings[mode] * 60
    setTimeLeft(t)
    setTotalTime(t)
    setMessage('Hoot hoot! Ready to focus? 🦉')
    setBlinkKey((k) => k + 1)
  }

  const skip = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    applyMode(mode === 'pomodoro' ? 'short' : 'pomodoro')
  }

  const saveSettings = (s) => {
    setSettings(s)
    setShowSettings(false)
    applyMode(mode, s)
    showToast('✅ Settings saved!')
  }

  // Derived display values
  const isBreak    = mode !== 'pomodoro'
  const strokeColor = isBreak ? '#4ecdc4' : '#f2a64a'
  const glowColor   = isBreak ? 'rgba(78,205,196,.5)' : 'rgba(242,166,74,.5)'
  const offset      = CIRC * (1 - timeLeft / (totalTime || 1))
  const danger      = !isBreak && timeLeft <= 60 && running
  const timerColor  = danger ? '#f2a64a' : isBreak ? '#4ecdc4' : '#f5ede0'
  const timerShadow = `0 0 36px ${isBreak ? 'rgba(78,205,196,.2)' : 'rgba(242,166,74,.2)'}`

  return (
    <div className="layout">
      <Stars />
      <div className="moon" />

      {/* Decorative tree branch */}
      <svg className="branch" viewBox="0 0 340 260" fill="none">
        <path d="M10 260 Q60 200 90 160 Q110 130 140 120" stroke="#3d2e1a" strokeWidth="22" strokeLinecap="round" />
        <path d="M90 160 Q70 110 40 80"                   stroke="#3d2e1a" strokeWidth="14" strokeLinecap="round" />
        <path d="M120 135 Q150 100 130 60 Q120 40 100 30" stroke="#3d2e1a" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="38" cy="75" rx="22" ry="14" fill="#2a4a2a" transform="rotate(-20 38 75)" />
        <ellipse cx="98" cy="27" rx="18" ry="12" fill="#2a4a2a" transform="rotate(10 98 27)" />
        <ellipse cx="60" cy="55" rx="16" ry="10" fill="#1e3a1e" transform="rotate(-35 60 55)" />
      </svg>

      <div className="card">
        {/* Header */}
        <div className="header-row">
          <div className="logo">Owl<span>Focus</span></div>
          <button className="gear-btn" onClick={() => setShowSettings(true)}>⚙</button>
        </div>

        {/* Mode tabs */}
        <div className="modes">
          {[['pomodoro', 'Focus'], ['short', 'Short Break'], ['long', 'Long Break']].map(([m, label]) => (
            <button
              key={m}
              className={`mode-btn${mode === m ? ' active' : ''}`}
              onClick={() => applyMode(m)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Progress ring + Owl + Timer */}
        <div className="ring-wrap">
          <svg className="progress-svg" viewBox="0 0 200 200">
            <circle className="progress-bg" cx="100" cy="100" r="95" />
            <circle
              className="progress-ring"
              cx="100" cy="100" r="95"
              stroke={strokeColor}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
            />
          </svg>
          <div className="center-stack">
            <Owl blinkKey={blinkKey} />
            <div className="session-label">{MODE_LABELS[mode]}</div>
            <div
              className="timer-display"
              style={{
                color: timerColor,
                textShadow: timerShadow,
                animation: danger ? 'timerPulse 1s ease-in-out infinite' : 'none',
              }}
            >
              {fmt(timeLeft)}
            </div>
          </div>
        </div>

        {/* Pomo dots */}
        <div className="pomo-dots">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`dot${i < pomoCount ? ' done' : ''}`} />
          ))}
        </div>

        {/* Controls */}
        <div className="controls">
          <button className="btn-icon" onClick={reset} title="Reset">↺</button>
          <button className={`btn-main${running ? ' playing' : ''}`} onClick={toggle}>
            {running ? '⏸' : '▶'}
          </button>
          <button className="btn-icon" onClick={skip} title="Skip">⏭</button>
        </div>

        <div className="message">{message}</div>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  )
}
