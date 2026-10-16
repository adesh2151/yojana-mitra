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
