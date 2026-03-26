export const CIRC = 2 * Math.PI * 95

export const DEFAULT_SETTINGS = {
  pomodoro: 25,
  short: 5,
  long: 15,
  autoBreak: true,
  autoPomodoro: false,
  sound: true,
  notifications: true,
}

export const MESSAGES = {
  pomodoro: [
    "Hoot hoot! You've got this 🦉",
    "Eyes on the prize, wise owl!",
    "No distractions, only wisdom.",
    "The wise owl hunts with patience.",
    "Your focus lights the night!",
  ],
  break: [
    "Rest your wings, wise one.",
    "Even owls need to blink!",
    "Stretch those feathers a little.",
    "A refreshed owl thinks sharper.",
    "Hoot-hoot! Breathe in, breathe out.",
  ],
  done: [
    "Session complete! 🌟 Great work!",
    "Another feather in your cap!",
    "The owl prevails once more!",
    "You earned that break, scholar!",
  ],
  paused: [
    "Paused — the owl waits for you.",
    "Take your time, wise one.",
    "Whenever you're ready, the night awaits.",
  ],
}

export const MODE_LABELS = {
  pomodoro: 'Focus Session',
  short: 'Short Break',
  long: 'Long Break',
}

export const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)]
