// Yojana Mitra — scheme database (v1 seed).
//
// Each scheme carries plain-language text in English + Marathi and a set of
// machine-checkable `rules`. The matching engine (src/engine/match.js) runs a
// user's profile against these rules and sorts every scheme into one of three
// buckets: QUALIFY (all hard rules pass), LIKELY (some rule is fuzzy / unknown,
// user should verify) or NOT_ELIGIBLE (a hard rule fails).
//
// Rule shape: { field, op, value, verify? }
//   field  — a key from the user profile (see src/data/questions.js)
//   op     — 'eq' | 'in' | 'gte' | 'lte' | 'has'   ('has' = value is in an array field)
//   value  — the value / list to compare against
//   verify — true when the real govt rule is fuzzy and we can only say "likely"
//
// v1 goal: ~40 top Maharashtra + national schemes. This seed has the biggest
// ones; add more in the same shape. Eligibility is simplified on purpose and
// always points the user to the official link to confirm.

export const SCHEMES = [
  {
    id: 'pm-kisan',
    level: 'central',
    name: { en: 'PM-KISAN', mr: 'पीएम-किसान' },
    benefit: {
      en: '₹6,000 per year, paid in 3 installments directly to your bank account.',
      mr: 'दरवर्षी ₹6,000, तीन हप्त्यांत थेट तुमच्या बँक खात्यात.',
    },
    why: {
      en: 'You are a farmer with small land holding.',
      mr: 'तुम्ही अल्पभूधारक शेतकरी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'farmer' },
      { field: 'landHectares', op: 'lte', value: 2, verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Land ownership papers', 'Bank passbook'],
      mr: ['आधार कार्ड', 'जमिनीची कागदपत्रे', 'बँक पासबुक'],
    },
    applyUrl: 'https://pmkisan.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'ladki-bahin',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Mukhyamantri Majhi Ladki Bahin Yojana', mr: 'मुख्यमंत्री माझी लाडकी बहीण योजना' },
    benefit: {
      en: '₹1,500 per month to eligible women aged 21–65 (Maharashtra).',
      mr: 'पात्र महिलांना (वय 21–65) दरमहा ₹1,500 (महाराष्ट्र).',
    },
    why: {
      en: 'You are a woman in Maharashtra within the eligible age and income limit.',
      mr: 'तुम्ही महाराष्ट्रातील पात्र वयाच्या व उत्पन्न मर्यादेतील महिला आहात.',
    },
    rules: [
      { field: 'gender', op: 'eq', value: 'female' },
      { field: 'state', op: 'eq', value: 'maharashtra' },
      { field: 'age', op: 'gte', value: 21 },
      { field: 'age', op: 'lte', value: 65 },
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Maharashtra domicile proof', 'Income certificate', 'Bank passbook'],
      mr: ['आधार कार्ड', 'महाराष्ट्र रहिवासी दाखला', 'उत्पन्न दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://ladakibahin.maharashtra.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'old-age-pension',
    level: 'central',
    name: { en: 'Old Age Pension (IGNOAPS)', mr: 'वृद्धापकाळ निवृत्तीवेतन (IGNOAPS)' },
    benefit: {
      en: 'Monthly pension for senior citizens from Below Poverty Line families.',
      mr: 'दारिद्र्यरेषेखालील ज्येष्ठ नागरिकांना दरमहा निवृत्तीवेतन.',
    },
    why: {
      en: 'You are 60 or older and from a low-income family.',
      mr: 'तुमचे वय 60 किंवा जास्त आहे आणि कुटुंब कमी उत्पन्न गटातील आहे.',
    },
    rules: [
      { field: 'age', op: 'gte', value: 60 },
      { field: 'incomeBand', op: 'in', value: ['below1L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Age proof', 'BPL card / income certificate', 'Bank passbook'],
      mr: ['आधार कार्ड', 'वयाचा पुरावा', 'बीपीएल कार्ड / उत्पन्न दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://nsap.nic.in',
    updated: '2026-10-16',
  },
  {
    id: 'widow-pension',
    level: 'central',
    name: { en: 'Widow Pension (IGNWPS)', mr: 'विधवा निवृत्तीवेतन (IGNWPS)' },
    benefit: {
      en: 'Monthly pension for widows aged 40 and above from BPL families.',
      mr: 'दारिद्र्यरेषेखालील 40 व त्यावरील वयाच्या विधवा महिलांना दरमहा निवृत्तीवेतन.',
    },
    why: {
      en: 'You are a widow aged 40 or above from a low-income family.',
      mr: 'तुम्ही कमी उत्पन्न गटातील 40 वर्षांवरील विधवा आहात.',
    },
    rules: [
      { field: 'gender', op: 'eq', value: 'female' },
      { field: 'special', op: 'has', value: 'widow' },
      { field: 'age', op: 'gte', value: 40 },
      { field: 'incomeBand', op: 'in', value: ['below1L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Death certificate of husband', 'Income certificate', 'Bank passbook'],
      mr: ['आधार कार्ड', 'पतीचा मृत्यू दाखला', 'उत्पन्न दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://nsap.nic.in',
    updated: '2026-10-16',
  },
  {
    id: 'disability-pension',
    level: 'central',
    name: { en: 'Disability Pension (IGNDPS)', mr: 'अपंगत्व निवृत्तीवेतन (IGNDPS)' },
    benefit: {
      en: 'Monthly pension for persons with severe disability from BPL families.',
      mr: 'दारिद्र्यरेषेखालील गंभीर अपंगत्व असलेल्या व्यक्तींना दरमहा निवृत्तीवेतन.',
    },
    why: {
      en: 'You have a disability and are from a low-income family.',
      mr: 'तुम्हाला अपंगत्व आहे आणि कुटुंब कमी उत्पन्न गटातील आहे.',
    },
    rules: [
      { field: 'special', op: 'has', value: 'disabled' },
      { field: 'incomeBand', op: 'in', value: ['below1L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Disability certificate', 'Income certificate', 'Bank passbook'],
      mr: ['आधार कार्ड', 'अपंगत्व प्रमाणपत्र', 'उत्पन्न दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://nsap.nic.in',
    updated: '2026-10-16',
  },
  {
    id: 'ayushman-bharat',
    level: 'central',
    name: { en: 'Ayushman Bharat (PM-JAY)', mr: 'आयुष्मान भारत (PM-JAY)' },
    benefit: {
      en: 'Free hospital treatment up to ₹5 lakh per family per year.',
      mr: 'दरवर्षी प्रति कुटुंब ₹5 लाखांपर्यंत मोफत रुग्णालय उपचार.',
    },
    why: {
      en: 'Your family is in a low-income group eligible for health cover.',
      mr: 'तुमचे कुटुंब आरोग्य संरक्षणासाठी पात्र कमी उत्पन्न गटातील आहे.',
    },
    rules: [
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Ration card', 'Mobile number'],
      mr: ['आधार कार्ड', 'रेशन कार्ड', 'मोबाईल नंबर'],
    },
    applyUrl: 'https://pmjay.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-awas-gramin',
    level: 'central',
    name: { en: 'PM Awas Yojana (Gramin)', mr: 'पंतप्रधान आवास योजना (ग्रामीण)' },
    benefit: {
      en: 'Financial help to build a pucca house for rural homeless / kutcha-house families.',
      mr: 'ग्रामीण बेघर / कच्चे घर असलेल्या कुटुंबांना पक्के घर बांधण्यासाठी आर्थिक मदत.',
    },
    why: {
      en: 'You are from a rural low-income family without a pucca house.',
      mr: 'तुम्ही पक्के घर नसलेल्या ग्रामीण कमी उत्पन्न कुटुंबातील आहात.',
    },
    rules: [
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Job card (MGNREGA)', 'Bank passbook', 'SECC verification'],
      mr: ['आधार कार्ड', 'जॉब कार्ड (मनरेगा)', 'बँक पासबुक', 'SECC पडताळणी'],
    },
    applyUrl: 'https://pmayg.nic.in',
    updated: '2026-10-16',
  },
  {
    id: 'sukanya-samriddhi',
    level: 'central',
    name: { en: 'Sukanya Samriddhi Yojana', mr: 'सुकन्या समृद्धी योजना' },
    benefit: {
      en: 'High-interest savings account for a girl child under 10, with tax benefits.',
      mr: '10 वर्षांखालील मुलीसाठी जास्त व्याजाचे बचत खाते, करसवलतीसह.',
    },
    why: {
      en: 'You have a girl child who can benefit from this savings scheme.',
      mr: 'तुम्हाला मुलगी आहे जिला या बचत योजनेचा लाभ होऊ शकतो.',
    },
    rules: [
      { field: 'hasGirlChild', op: 'eq', value: true, verify: true },
    ],
    documents: {
      en: ["Girl child's birth certificate", "Parent's Aadhaar / ID", 'Address proof'],
      mr: ['मुलीचा जन्म दाखला', 'पालकाचे आधार / ओळखपत्र', 'पत्त्याचा पुरावा'],
    },
    applyUrl: 'https://www.india.gov.in/sukanya-samriddhi-yojana',
    updated: '2026-10-16',
  },
  {
    id: 'pre-matric-scholarship',
    level: 'central',
    name: { en: 'Pre-Matric Scholarship (SC/ST/OBC)', mr: 'मॅट्रिकपूर्व शिष्यवृत्ती (SC/ST/OBC)' },
    benefit: {
      en: 'Scholarship for students of class 9–10 from SC/ST/OBC low-income families.',
      mr: 'SC/ST/OBC कमी उत्पन्न कुटुंबातील इयत्ता 9–10 च्या विद्यार्थ्यांसाठी शिष्यवृत्ती.',
    },
    why: {
      en: 'You are a student from a reserved-category low-income family.',
      mr: 'तुम्ही आरक्षित प्रवर्गातील कमी उत्पन्न कुटुंबातील विद्यार्थी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'student' },
      { field: 'category', op: 'in', value: ['sc', 'st', 'obc'] },
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Caste certificate', 'Income certificate', 'School bonafide', 'Bank passbook'],
      mr: ['आधार कार्ड', 'जातीचा दाखला', 'उत्पन्न दाखला', 'शाळेचा बोनाफाईड', 'बँक पासबुक'],
    },
    applyUrl: 'https://scholarships.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-fasal-bima',
    level: 'central',
    name: { en: 'PM Fasal Bima Yojana', mr: 'पंतप्रधान पीक विमा योजना' },
    benefit: {
      en: 'Crop insurance against natural calamity, pest and disease losses.',
      mr: 'नैसर्गिक आपत्ती, कीड व रोगामुळे होणाऱ्या पीक नुकसानीसाठी विमा.',
    },
    why: {
      en: 'You are a farmer who grows notified crops.',
      mr: 'तुम्ही अधिसूचित पिके घेणारे शेतकरी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'farmer' },
    ],
    documents: {
      en: ['Aadhaar card', 'Land papers', 'Bank passbook', 'Sowing certificate'],
      mr: ['आधार कार्ड', 'जमिनीची कागदपत्रे', 'बँक पासबुक', 'पेरणी दाखला'],
    },
    applyUrl: 'https://pmfby.gov.in',
    updated: '2026-10-16',
  },
]
