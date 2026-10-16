// The profile questions asked on the "Tell us about you" screen.
// Answers build a flat profile object that the matching engine reads.
// Marathi + Hindi + English, big-button choices (no typing), ~1 minute.

export const QUESTIONS = [
  {
    id: 'age',
    type: 'number',
    label: { en: 'Your age', mr: 'तुमचे वय', hi: 'आपकी उम्र' },
    min: 0,
    max: 120,
    default: 35,
  },
  {
    id: 'gender',
    type: 'single',
    label: { en: 'Gender', mr: 'लिंग', hi: 'लिंग' },
    options: [
      { value: 'female', label: { en: 'Female', mr: 'स्त्री', hi: 'महिला' }, icon: '👩' },
      { value: 'male', label: { en: 'Male', mr: 'पुरुष', hi: 'पुरुष' }, icon: '👨' },
      { value: 'other', label: { en: 'Other', mr: 'इतर', hi: 'अन्य' }, icon: '🧑' },
    ],
  },
  {
    id: 'state',
    type: 'single',
    label: { en: 'Your state', mr: 'तुमचे राज्य', hi: 'आपका राज्य' },
    options: [
      { value: 'maharashtra', label: { en: 'Maharashtra', mr: 'महाराष्ट्र', hi: 'महाराष्ट्र' }, icon: '📍' },
      { value: 'other', label: { en: 'Other state', mr: 'इतर राज्य', hi: 'अन्य राज्य' }, icon: '🗺️' },
    ],
  },
  {
    id: 'occupation',
    type: 'single',
    label: { en: 'What do you do?', mr: 'तुम्ही काय करता?', hi: 'आप क्या करते हैं?' },
    options: [
      { value: 'farmer', label: { en: 'Farmer', mr: 'शेतकरी', hi: 'किसान' }, icon: '🌾' },
      { value: 'student', label: { en: 'Student', mr: 'विद्यार्थी', hi: 'विद्यार्थी' }, icon: '📚' },
      { value: 'worker', label: { en: 'Daily-wage / worker', mr: 'मजूर / कामगार', hi: 'मज़दूर / कामगार' }, icon: '🔨' },
      { value: 'business', label: { en: 'Small business', mr: 'छोटा व्यवसाय', hi: 'छोटा व्यवसाय' }, icon: '🏪' },
      { value: 'homemaker', label: { en: 'Homemaker', mr: 'गृहिणी', hi: 'गृहिणी' }, icon: '🏠' },
      { value: 'none', label: { en: 'None / other', mr: 'काहीही नाही / इतर', hi: 'कुछ नहीं / अन्य' }, icon: '🙂' },
    ],
  },
  {
    id: 'incomeBand',
    type: 'single',
    label: { en: 'Yearly family income', mr: 'कुटुंबाचे वार्षिक उत्पन्न', hi: 'परिवार की वार्षिक आय' },
    options: [
      { value: 'below1L', label: { en: 'Below ₹1 lakh', mr: '₹1 लाखाखाली', hi: '₹1 लाख से कम' }, icon: '🟢' },
      { value: '1to2L', label: { en: '₹1–2 lakh', mr: '₹1–2 लाख', hi: '₹1–2 लाख' }, icon: '🟡' },
      { value: '2to5L', label: { en: '₹2–5 lakh', mr: '₹2–5 लाख', hi: '₹2–5 लाख' }, icon: '🟠' },
      { value: 'above5L', label: { en: 'Above ₹5 lakh', mr: '₹5 लाखांवर', hi: '₹5 लाख से ऊपर' }, icon: '🔴' },
    ],
  },
  {
    id: 'category',
    type: 'single',
    label: { en: 'Social category', mr: 'सामाजिक प्रवर्ग', hi: 'सामाजिक वर्ग' },
    options: [
      { value: 'general', label: { en: 'General', mr: 'खुला', hi: 'सामान्य' }, icon: '⚪' },
      { value: 'obc', label: { en: 'OBC', mr: 'ओबीसी', hi: 'ओबीसी' }, icon: '🟤' },
      { value: 'sc', label: { en: 'SC', mr: 'अनुसूचित जाती', hi: 'अनुसूचित जाति' }, icon: '🔵' },
      { value: 'st', label: { en: 'ST', mr: 'अनुसूचित जमाती', hi: 'अनुसूचित जनजाति' }, icon: '🟣' },
    ],
  },
  {
    id: 'special',
    type: 'multi',
    label: {
      en: 'Any of these apply? (optional)',
      mr: 'यापैकी काही लागू आहे का? (ऐच्छिक)',
      hi: 'इनमें से कोई लागू है? (वैकल्पिक)',
    },
    options: [
      { value: 'widow', label: { en: 'Widow', mr: 'विधवा', hi: 'विधवा' }, icon: '🕊️' },
      { value: 'disabled', label: { en: 'Disabled', mr: 'अपंग', hi: 'दिव्यांग' }, icon: '♿' },
      { value: 'minority', label: { en: 'Minority community', mr: 'अल्पसंख्याक', hi: 'अल्पसंख्यक' }, icon: '🤝' },
    ],
  },
  {
    id: 'hasGirlChild',
    type: 'boolean',
    label: {
      en: 'Do you have a girl child under 10?',
      mr: 'तुम्हाला 10 वर्षांखालील मुलगी आहे का?',
      hi: 'क्या आपकी 10 साल से छोटी बेटी है?',
    },
  },
]
