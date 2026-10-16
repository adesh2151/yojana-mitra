// UI strings in English + Marathi. Scheme-specific text lives in the data files.

export const LANGS = [
  { code: 'mr', label: 'मराठी' },
  { code: 'en', label: 'English' },
]

// Voice language codes for the browser's text-to-speech.
export const TTS_LANG = { mr: 'mr-IN', en: 'en-IN' }

export const UI = {
  appName: { en: 'Yojana Mitra', mr: 'योजना मित्र' },
  tagline: {
    en: 'Find the government help you deserve.',
    mr: 'तुमच्या हक्काची सरकारी मदत शोधा.',
  },
  start: { en: 'Start', mr: 'सुरू करा' },
  next: { en: 'Next', mr: 'पुढे' },
  back: { en: 'Back', mr: 'मागे' },
  seeResults: { en: 'See my schemes', mr: 'माझ्या योजना पाहा' },
  yes: { en: 'Yes', mr: 'होय' },
  no: { en: 'No', mr: 'नाही' },
  skip: { en: 'Skip', mr: 'वगळा' },
  listen: { en: 'Listen', mr: 'ऐका' },
  tellAboutYou: { en: 'Tell us about you', mr: 'तुमच्याबद्दल सांगा' },
  resultsTitle: { en: 'Schemes for you', mr: 'तुमच्यासाठी योजना' },
  youQualify: { en: 'You qualify', mr: 'तुम्ही पात्र आहात' },
  likelyQualify: { en: 'Likely — please verify', mr: 'शक्यता आहे — खात्री करा' },
  noMatches: {
    en: 'No clear matches yet. Try changing your answers.',
    mr: 'सध्या स्पष्ट योजना नाही. उत्तरे बदलून पाहा.',
  },
  benefit: { en: 'Benefit', mr: 'लाभ' },
  whoQualifies: { en: 'Why you may qualify', mr: 'तुम्ही का पात्र असू शकता' },
  documents: { en: 'Documents needed', mr: 'लागणारी कागदपत्रे' },
  howToApply: { en: 'How to apply', mr: 'अर्ज कसा करायचा' },
  applyOnline: { en: 'Open official website', mr: 'अधिकृत संकेतस्थळ उघडा' },
  updated: { en: 'Updated', mr: 'अद्यतनित' },
  startOver: { en: 'Start over', mr: 'पुन्हा सुरू करा' },
  disclaimer: {
    en: 'This is a free helper. Final eligibility is decided by the government. Always confirm on the official website.',
    mr: 'हे एक मोफत साधन आहे. अंतिम पात्रता सरकार ठरवते. नेहमी अधिकृत संकेतस्थळावर खात्री करा.',
  },
}

export function t(entry, lang) {
  if (!entry) return ''
  return entry[lang] ?? entry.en ?? ''
}
