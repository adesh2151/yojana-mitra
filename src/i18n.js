// UI strings in Marathi + Hindi + English. Scheme text lives in the data files.

export const LANGS = [
  { code: 'mr', label: 'मराठी' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
]

// Voice language codes for the browser's speech engine.
export const TTS_LANG = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' }

export const UI = {
  appName: { en: 'Yojana Mitra', mr: 'योजना मित्र', hi: 'योजना मित्र' },
  tagline: {
    en: 'Find the government help you deserve.',
    mr: 'तुमच्या हक्काची सरकारी मदत शोधा.',
    hi: 'अपने हक़ की सरकारी मदद खोजें.',
  },
  start: { en: 'Start', mr: 'सुरू करा', hi: 'शुरू करें' },
  next: { en: 'Next', mr: 'पुढे', hi: 'आगे' },
  back: { en: 'Back', mr: 'मागे', hi: 'पीछे' },
  seeResults: { en: 'See my schemes', mr: 'माझ्या योजना पाहा', hi: 'मेरी योजनाएँ देखें' },
  yes: { en: 'Yes', mr: 'होय', hi: 'हाँ' },
  no: { en: 'No', mr: 'नाही', hi: 'नहीं' },
  skip: { en: 'Skip', mr: 'वगळा', hi: 'छोड़ें' },
  listen: { en: 'Listen', mr: 'ऐका', hi: 'सुनें' },
  tellAboutYou: { en: 'Tell us about you', mr: 'तुमच्याबद्दल सांगा', hi: 'अपने बारे में बताएं' },
  resultsTitle: { en: 'Schemes for you', mr: 'तुमच्यासाठी योजना', hi: 'आपके लिए योजनाएँ' },
  youQualify: { en: 'You qualify', mr: 'तुम्ही पात्र आहात', hi: 'आप पात्र हैं' },
  likelyQualify: { en: 'Likely — please verify', mr: 'शक्यता आहे — खात्री करा', hi: 'संभावना है — पुष्टि करें' },
  noMatches: {
    en: 'No clear matches yet. Try changing your answers.',
    mr: 'सध्या स्पष्ट योजना नाही. उत्तरे बदलून पाहा.',
    hi: 'अभी कोई स्पष्ट योजना नहीं. उत्तर बदलकर देखें.',
  },
  benefit: { en: 'Benefit', mr: 'लाभ', hi: 'लाभ' },
  whoQualifies: { en: 'Why you may qualify', mr: 'तुम्ही का पात्र असू शकता', hi: 'आप क्यों पात्र हो सकते हैं' },
  documents: { en: 'Documents needed', mr: 'लागणारी कागदपत्रे', hi: 'ज़रूरी दस्तावेज़' },
  howToApply: { en: 'How to apply', mr: 'अर्ज कसा करायचा', hi: 'आवेदन कैसे करें' },
  applyOnline: { en: 'Open official website', mr: 'अधिकृत संकेतस्थळ उघडा', hi: 'आधिकारिक वेबसाइट खोलें' },
  updated: { en: 'Updated', mr: 'अद्यतनित', hi: 'अपडेट' },
  startOver: { en: 'Start over', mr: 'पुन्हा सुरू करा', hi: 'फिर से शुरू करें' },
  newBadge: { en: 'NEW', mr: 'नवीन', hi: 'नया' },
  browseAll: { en: 'Browse all schemes', mr: 'सर्व योजना पाहा', hi: 'सभी योजनाएँ देखें' },
  search: { en: 'Search schemes…', mr: 'योजना शोधा…', hi: 'योजनाएँ खोजें…' },
  loading: { en: 'Loading…', mr: 'लोड होत आहे…', hi: 'लोड हो रहा है…' },
  catalogNote: {
    en: 'Full catalogue of government schemes (needs internet the first time).',
    mr: 'सरकारी योजनांची संपूर्ण यादी (पहिल्यांदा इंटरनेट लागते).',
    hi: 'सरकारी योजनाओं की पूरी सूची (पहली बार इंटरनेट चाहिए).',
  },
  getAndroid: { en: 'Get the Android app', mr: 'अँड्रॉइड अ‍ॅप मिळवा', hi: 'एंड्रॉइड ऐप पाएं' },
  moreApps: { en: 'More free apps by Adesh', mr: 'अदेशचे आणखी मोफत अ‍ॅप्स', hi: 'अदेश के और मुफ़्त ऐप्स' },
  disclaimer: {
    en: 'This is a free helper. Final eligibility is decided by the government. Always confirm on the official website.',
    mr: 'हे एक मोफत साधन आहे. अंतिम पात्रता सरकार ठरवते. नेहमी अधिकृत संकेतस्थळावर खात्री करा.',
    hi: 'यह एक मुफ़्त साधन है. अंतिम पात्रता सरकार तय करती है. हमेशा आधिकारिक वेबसाइट पर पुष्टि करें.',
  },
  source: {
    en: 'Scheme information from myScheme (Government of India).',
    mr: 'योजनांची माहिती myScheme (भारत सरकार) कडून.',
    hi: 'योजना जानकारी myScheme (भारत सरकार) से.',
  },
}

export function t(entry, lang) {
  if (!entry) return ''
  return entry[lang] ?? entry.en ?? ''
}
