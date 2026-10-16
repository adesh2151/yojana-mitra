// The profile questions asked on the "Tell us about you" screen.
// Answers build a flat profile object that the matching engine reads.
// Keep this short — under ~8 questions — so a first-time rural user can
// finish in about a minute with big-button choices (no typing).

export const QUESTIONS = [
  {
    id: 'age',
    type: 'number',
    label: { en: 'Your age', mr: 'तुमचे वय' },
    min: 0,
    max: 120,
    default: 35,
  },
  {
    id: 'gender',
    type: 'single',
    label: { en: 'Gender', mr: 'लिंग' },
    options: [
      { value: 'female', label: { en: 'Female', mr: 'स्त्री' }, icon: '👩' },
      { value: 'male', label: { en: 'Male', mr: 'पुरुष' }, icon: '👨' },
      { value: 'other', label: { en: 'Other', mr: 'इतर' }, icon: '🧑' },
    ],
  },
  {
    id: 'state',
    type: 'single',
    label: { en: 'Your state', mr: 'तुमचे राज्य' },
    options: [
      { value: 'maharashtra', label: { en: 'Maharashtra', mr: 'महाराष्ट्र' }, icon: '📍' },
      { value: 'other', label: { en: 'Other state', mr: 'इतर राज्य' }, icon: '🗺️' },
    ],
  },
  {
    id: 'occupation',
    type: 'single',
    label: { en: 'What do you do?', mr: 'तुम्ही काय करता?' },
    options: [
      { value: 'farmer', label: { en: 'Farmer', mr: 'शेतकरी' }, icon: '🌾' },
      { value: 'student', label: { en: 'Student', mr: 'विद्यार्थी' }, icon: '📚' },
      { value: 'worker', label: { en: 'Daily-wage / worker', mr: 'मजूर / कामगार' }, icon: '🔨' },
      { value: 'business', label: { en: 'Small business', mr: 'छोटा व्यवसाय' }, icon: '🏪' },
      { value: 'homemaker', label: { en: 'Homemaker', mr: 'गृहिणी' }, icon: '🏠' },
      { value: 'none', label: { en: 'None / other', mr: 'काहीही नाही / इतर' }, icon: '🙂' },
    ],
  },
  {
    id: 'incomeBand',
    type: 'single',
    label: { en: 'Yearly family income', mr: 'कुटुंबाचे वार्षिक उत्पन्न' },
    options: [
      { value: 'below1L', label: { en: 'Below ₹1 lakh', mr: '₹1 लाखाखाली' }, icon: '🟢' },
      { value: '1to2L', label: { en: '₹1–2 lakh', mr: '₹1–2 लाख' }, icon: '🟡' },
      { value: '2to5L', label: { en: '₹2–5 lakh', mr: '₹2–5 लाख' }, icon: '🟠' },
      { value: 'above5L', label: { en: 'Above ₹5 lakh', mr: '₹5 लाखांवर' }, icon: '🔴' },
    ],
  },
  {
    id: 'category',
    type: 'single',
    label: { en: 'Social category', mr: 'सामाजिक प्रवर्ग' },
    options: [
      { value: 'general', label: { en: 'General', mr: 'खुला' }, icon: '⚪' },
      { value: 'obc', label: { en: 'OBC', mr: 'ओबीसी' }, icon: '🟤' },
      { value: 'sc', label: { en: 'SC', mr: 'अनुसूचित जाती' }, icon: '🔵' },
      { value: 'st', label: { en: 'ST', mr: 'अनुसूचित जमाती' }, icon: '🟣' },
    ],
  },
  {
    id: 'special',
    type: 'multi',
    label: { en: 'Any of these apply? (optional)', mr: 'यापैकी काही लागू आहे का? (ऐच्छिक)' },
    options: [
      { value: 'widow', label: { en: 'Widow', mr: 'विधवा' }, icon: '🕊️' },
      { value: 'disabled', label: { en: 'Disabled', mr: 'अपंग' }, icon: '♿' },
      { value: 'minority', label: { en: 'Minority community', mr: 'अल्पसंख्याक' }, icon: '🤝' },
    ],
  },
  {
    id: 'hasGirlChild',
    type: 'boolean',
    label: { en: 'Do you have a girl child under 10?', mr: 'तुम्हाला 10 वर्षांखालील मुलगी आहे का?' },
  },
]
