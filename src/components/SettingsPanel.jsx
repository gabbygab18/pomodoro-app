import { useState } from 'react'

const TOGGLES = [
  { key: 'autoBreak',    label: 'Auto-start Breaks',   sub: 'Automatically start break after focus' },
  { key: 'autoPomodoro', label: 'Auto-start Focus',     sub: 'Automatically start focus after break' },
  { key: 'sound',        label: 'Sound Effects',        sub: 'Play a sound when the timer ends' },
  { key: 'notifications',label: 'Notifications',        sub: 'Show browser notifications' },
]

export default function SettingsPanel({ settings, onSave, onClose }) {
  const [local, setLocal] = useState({ ...settings })

  const set = (key, value) => setLocal((prev) => ({ ...prev, [key]: value }))

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="settings-panel">

        {/* Title */}
        <div className="s-title">
          <span>⚙️ Settings</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Duration */}
        <div className="s-section">
          <div className="s-section-title">Duration (minutes)</div>
          <div className="dur-grid">
            {[
              ['pomodoro', 'Focus'],
              ['short',    'Short Break'],
              ['long',     'Long Break'],
            ].map(([key, label]) => (
              <div className="dur-item" key={key}>
                <label>{label}</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={local[key]}
                  onChange={(e) => set(key, Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Behavior toggles */}
        <div className="s-section">
          <div className="s-section-title">Behavior</div>
          {TOGGLES.map(({ key, label, sub }) => (
            <div className="toggle-row" key={key}>
              <div className="toggle-label">
                {label}
                <small>{sub}</small>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={local[key]}
                  onChange={(e) => set(key, e.target.checked)}
                />
                <span className="t-slider" />
              </label>
            </div>
          ))}
        </div>

        <button className="save-btn" onClick={() => onSave(local)}>
          Save Settings
        </button>
      </div>
    </div>
  )
}
