// Text-to-speech helper using the browser's built-in SpeechSynthesis.
// Free, offline on most Android devices, and supports Marathi/Hindi/English.
// Falls back silently if the device has no voice for the language.

import { TTS_LANG } from './i18n'

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speak(text, lang) {
  if (!canSpeak() || !text) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = TTS_LANG[lang] || 'en-IN'
    u.rate = 0.95
    const match = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang === u.lang)
    if (match) u.voice = match
    window.speechSynthesis.speak(u)
  } catch {
    // No voice available — stay silent rather than crash.
  }
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel()
}

// ---- Voice input (speech recognition) ----------------------------------
// Uses the browser's SpeechRecognition (Chrome / Android WebView). Lets a user
// speak their answer instead of tapping. Returns the raw transcript; the caller
// maps it to an option. Degrades gracefully where unsupported.

function getRecognition() {
  if (typeof window === 'undefined') return null
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  return SR ? new SR() : null
}

export function canListen() {
  if (typeof window === 'undefined') return false
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

// Start listening once. onResult(transcript) fires with lowercased text;
// onEnd() always fires when the session closes. Returns a stop() function.
export function listen(lang, onResult, onEnd) {
  const rec = getRecognition()
  if (!rec) {
    onEnd && onEnd()
    return () => {}
  }
  rec.lang = TTS_LANG[lang] || 'en-IN'
  rec.interimResults = false
  rec.maxAlternatives = 3
  rec.onresult = (e) => {
    const transcript = Array.from(e.results[0])
      .map((r) => r.transcript)
      .join(' ')
      .toLowerCase()
      .trim()
    onResult && onResult(transcript)
  }
  rec.onerror = () => onEnd && onEnd()
  rec.onend = () => onEnd && onEnd()
  try {
    rec.start()
  } catch {
    onEnd && onEnd()
  }
  return () => {
    try {
      rec.stop()
    } catch {
      /* ignore */
    }
  }
}
