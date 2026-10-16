// Yojana Mitra — scheme database (v1).
//
// DATA SOURCE & ATTRIBUTION
// Scheme information is based on the Government of India's myScheme platform
// (https://www.myscheme.gov.in), Digital India Corporation / MeitY. Per the
// myScheme Copyright Policy, material may be reproduced free of charge provided
// it is accurate, not misleading, and the source is acknowledged. Eligibility
// here is SIMPLIFIED for quick guidance — every scheme links to its official
// page, which decides final eligibility.
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

export const SCHEMES = [
  // ---------------------------------------------------------------- Farmers
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
    id: 'namo-shetkari',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Namo Shetkari Mahasanman Nidhi', mr: 'नमो शेतकरी महासन्मान निधी' },
    benefit: {
      en: 'Extra ₹6,000 per year to Maharashtra farmers, on top of PM-KISAN.',
      mr: 'पीएम-किसान व्यतिरिक्त महाराष्ट्रातील शेतकऱ्यांना दरवर्षी अतिरिक्त ₹6,000.',
    },
    why: {
      en: 'You are a PM-KISAN-eligible farmer in Maharashtra.',
      mr: 'तुम्ही महाराष्ट्रातील पीएम-किसान पात्र शेतकरी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'farmer' },
      { field: 'state', op: 'eq', value: 'maharashtra' },
    ],
    documents: {
      en: ['Aadhaar card', 'PM-KISAN registration', 'Land papers', 'Bank passbook'],
      mr: ['आधार कार्ड', 'पीएम-किसान नोंदणी', 'जमिनीची कागदपत्रे', 'बँक पासबुक'],
    },
    applyUrl: 'https://nsmny.mahait.org',
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
    rules: [{ field: 'occupation', op: 'eq', value: 'farmer' }],
    documents: {
      en: ['Aadhaar card', 'Land papers', 'Bank passbook', 'Sowing certificate'],
      mr: ['आधार कार्ड', 'जमिनीची कागदपत्रे', 'बँक पासबुक', 'पेरणी दाखला'],
    },
    applyUrl: 'https://pmfby.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'kisan-credit-card',
    level: 'central',
    name: { en: 'Kisan Credit Card (KCC)', mr: 'किसान क्रेडिट कार्ड (KCC)' },
    benefit: {
      en: 'Low-interest crop loans and a credit card for farming needs.',
      mr: 'शेतीच्या गरजांसाठी कमी व्याजाचे पीक कर्ज व क्रेडिट कार्ड.',
    },
    why: {
      en: 'You are a farmer who needs credit for cultivation.',
      mr: 'तुम्ही शेतीसाठी कर्जाची गरज असलेले शेतकरी आहात.',
    },
    rules: [{ field: 'occupation', op: 'eq', value: 'farmer' }],
    documents: {
      en: ['Aadhaar card', 'Land papers', 'Bank passbook', 'Passport photo'],
      mr: ['आधार कार्ड', 'जमिनीची कागदपत्रे', 'बँक पासबुक', 'पासपोर्ट फोटो'],
    },
    applyUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    updated: '2026-10-16',
  },
  {
    id: 'pm-kisan-maandhan',
    level: 'central',
    name: { en: 'PM Kisan Maandhan Yojana', mr: 'पीएम किसान मानधन योजना' },
    benefit: {
      en: 'Pension of ₹3,000 per month after age 60 for small farmers.',
      mr: 'अल्पभूधारक शेतकऱ्यांना वय 60 नंतर दरमहा ₹3,000 निवृत्तीवेतन.',
    },
    why: {
      en: 'You are a small farmer aged 18–40 who can join a pension scheme.',
      mr: 'तुम्ही 18–40 वयाचे अल्पभूधारक शेतकरी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'farmer' },
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 40 },
    ],
    documents: {
      en: ['Aadhaar card', 'Land papers', 'Bank passbook'],
      mr: ['आधार कार्ड', 'जमिनीची कागदपत्रे', 'बँक पासबुक'],
    },
    applyUrl: 'https://maandhan.in',
    updated: '2026-10-16',
  },
  {
    id: 'gopinath-munde-accident',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Gopinath Munde Farmer Accident Insurance', mr: 'गोपीनाथ मुंडे शेतकरी अपघात विमा' },
    benefit: {
      en: 'Insurance cover to a farmer family in case of accidental death or disability.',
      mr: 'अपघाती मृत्यू किंवा अपंगत्व झाल्यास शेतकरी कुटुंबाला विमा संरक्षण.',
    },
    why: {
      en: 'You are a farmer in Maharashtra.',
      mr: 'तुम्ही महाराष्ट्रातील शेतकरी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'farmer' },
      { field: 'state', op: 'eq', value: 'maharashtra' },
    ],
    documents: {
      en: ['Aadhaar card', '7/12 land extract', 'Bank passbook'],
      mr: ['आधार कार्ड', '7/12 उतारा', 'बँक पासबुक'],
    },
    applyUrl: 'https://www.myscheme.gov.in',
    updated: '2026-10-16',
  },

  // ---------------------------------------------------------- Women & girls
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
    id: 'ujjwala',
    level: 'central',
    name: { en: 'PM Ujjwala Yojana (free LPG)', mr: 'पंतप्रधान उज्ज्वला योजना (मोफत गॅस)' },
    benefit: {
      en: 'Free LPG gas connection to women from low-income households.',
      mr: 'कमी उत्पन्न कुटुंबातील महिलांना मोफत एलपीजी गॅस जोडणी.',
    },
    why: {
      en: 'You are a woman from a low-income family without an LPG connection.',
      mr: 'तुम्ही एलपीजी जोडणी नसलेल्या कमी उत्पन्न कुटुंबातील महिला आहात.',
    },
    rules: [
      { field: 'gender', op: 'eq', value: 'female' },
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Ration card', 'Bank passbook'],
      mr: ['आधार कार्ड', 'रेशन कार्ड', 'बँक पासबुक'],
    },
    applyUrl: 'https://www.pmuy.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'matru-vandana',
    level: 'central',
    name: { en: 'PM Matru Vandana Yojana', mr: 'पंतप्रधान मातृ वंदना योजना' },
    benefit: {
      en: 'Cash support to pregnant and lactating mothers for the first child.',
      mr: 'पहिल्या मुलासाठी गर्भवती व स्तनदा मातांना रोख मदत.',
    },
    why: {
      en: 'You are a woman who is pregnant or a new mother.',
      mr: 'तुम्ही गर्भवती किंवा नवमाता महिला आहात.',
    },
    rules: [
      { field: 'gender', op: 'eq', value: 'female' },
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 49, verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'MCP card', 'Bank passbook'],
      mr: ['आधार कार्ड', 'एमसीपी कार्ड', 'बँक पासबुक'],
    },
    applyUrl: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana',
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
    rules: [{ field: 'hasGirlChild', op: 'eq', value: true, verify: true }],
    documents: {
      en: ["Girl child's birth certificate", "Parent's Aadhaar / ID", 'Address proof'],
      mr: ['मुलीचा जन्म दाखला', 'पालकाचे आधार / ओळखपत्र', 'पत्त्याचा पुरावा'],
    },
    applyUrl: 'https://www.india.gov.in/sukanya-samriddhi-yojana',
    updated: '2026-10-16',
  },
  {
    id: 'lek-ladki',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Lek Ladki Yojana', mr: 'लेक लाडकी योजना' },
    benefit: {
      en: 'Staged cash benefit for a girl child in low-income Maharashtra families.',
      mr: 'महाराष्ट्रातील कमी उत्पन्न कुटुंबातील मुलीसाठी टप्प्याटप्प्याने रोख लाभ.',
    },
    why: {
      en: 'You have a girl child in a low-income family in Maharashtra.',
      mr: 'तुम्हाला महाराष्ट्रातील कमी उत्पन्न कुटुंबातील मुलगी आहे.',
    },
    rules: [
      { field: 'state', op: 'eq', value: 'maharashtra' },
      { field: 'hasGirlChild', op: 'eq', value: true },
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true },
    ],
    documents: {
      en: ["Girl child's birth certificate", 'Income certificate', 'Aadhaar card', 'Bank passbook'],
      mr: ['मुलीचा जन्म दाखला', 'उत्पन्न दाखला', 'आधार कार्ड', 'बँक पासबुक'],
    },
    applyUrl: 'https://www.myscheme.gov.in',
    updated: '2026-10-16',
  },

  // --------------------------------------------------- Seniors, widows, PwD
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
    id: 'shravan-bal',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Shravanbal Seva Rajya Pension', mr: 'श्रावणबाळ सेवा राज्य निवृत्तीवेतन' },
    benefit: {
      en: 'Monthly state pension for senior citizens in Maharashtra.',
      mr: 'महाराष्ट्रातील ज्येष्ठ नागरिकांना दरमहा राज्य निवृत्तीवेतन.',
    },
    why: {
      en: 'You are a senior citizen (65+) in Maharashtra from a low-income family.',
      mr: 'तुम्ही महाराष्ट्रातील कमी उत्पन्न कुटुंबातील ज्येष्ठ नागरिक (65+) आहात.',
    },
    rules: [
      { field: 'age', op: 'gte', value: 65 },
      { field: 'state', op: 'eq', value: 'maharashtra' },
      { field: 'incomeBand', op: 'in', value: ['below1L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Age proof', 'Income certificate', 'Domicile', 'Bank passbook'],
      mr: ['आधार कार्ड', 'वयाचा पुरावा', 'उत्पन्न दाखला', 'रहिवासी दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://aaplesarkar.mahaonline.gov.in',
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
    id: 'sanjay-gandhi-niradhar',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Sanjay Gandhi Niradhar Anudan Yojana', mr: 'संजय गांधी निराधार अनुदान योजना' },
    benefit: {
      en: 'Monthly support for destitute, widows, orphans and disabled in Maharashtra.',
      mr: 'महाराष्ट्रातील निराधार, विधवा, अनाथ व अपंगांना दरमहा मदत.',
    },
    why: {
      en: 'You are a destitute / widow / disabled person in a low-income family in Maharashtra.',
      mr: 'तुम्ही महाराष्ट्रातील कमी उत्पन्न कुटुंबातील निराधार / विधवा / अपंग व्यक्ती आहात.',
    },
    rules: [
      { field: 'state', op: 'eq', value: 'maharashtra' },
      { field: 'incomeBand', op: 'in', value: ['below1L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Income certificate', 'Age proof', 'Domicile', 'Bank passbook'],
      mr: ['आधार कार्ड', 'उत्पन्न दाखला', 'वयाचा पुरावा', 'रहिवासी दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://aaplesarkar.mahaonline.gov.in',
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
    id: 'family-benefit',
    level: 'central',
    name: { en: 'National Family Benefit Scheme', mr: 'राष्ट्रीय कुटुंब लाभ योजना' },
    benefit: {
      en: 'One-time financial help to a BPL family on death of the main breadwinner.',
      mr: 'कमावत्या व्यक्तीच्या मृत्यूनंतर दारिद्र्यरेषेखालील कुटुंबाला एकरकमी आर्थिक मदत.',
    },
    why: {
      en: 'Your low-income family has lost its primary earner.',
      mr: 'तुमच्या कमी उत्पन्न कुटुंबातील मुख्य कमावती व्यक्ती गमावली आहे.',
    },
    rules: [{ field: 'incomeBand', op: 'in', value: ['below1L'], verify: true }],
    documents: {
      en: ['Aadhaar card', 'Death certificate of breadwinner', 'Income certificate', 'Bank passbook'],
      mr: ['आधार कार्ड', 'कमावत्याचा मृत्यू दाखला', 'उत्पन्न दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://nsap.nic.in',
    updated: '2026-10-16',
  },

  // --------------------------------------------------------------- Health
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
    rules: [{ field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true }],
    documents: {
      en: ['Aadhaar card', 'Ration card', 'Mobile number'],
      mr: ['आधार कार्ड', 'रेशन कार्ड', 'मोबाईल नंबर'],
    },
    applyUrl: 'https://pmjay.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'ayushman-vay-vandana',
    level: 'central',
    name: { en: 'Ayushman Vay Vandana (70+)', mr: 'आयुष्मान वय वंदना (70+)' },
    benefit: {
      en: 'Free health cover for all senior citizens aged 70 and above.',
      mr: '70 व त्यावरील सर्व ज्येष्ठ नागरिकांना मोफत आरोग्य संरक्षण.',
    },
    why: {
      en: 'You are 70 or older (income no bar for this one).',
      mr: 'तुमचे वय 70 किंवा जास्त आहे (उत्पन्नाची अट नाही).',
    },
    rules: [{ field: 'age', op: 'gte', value: 70 }],
    documents: {
      en: ['Aadhaar card', 'Age proof', 'Mobile number'],
      mr: ['आधार कार्ड', 'वयाचा पुरावा', 'मोबाईल नंबर'],
    },
    applyUrl: 'https://pmjay.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'mjpjay',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Mahatma Phule Jan Arogya Yojana', mr: 'महात्मा फुले जन आरोग्य योजना' },
    benefit: {
      en: 'Cashless hospital treatment for families in Maharashtra.',
      mr: 'महाराष्ट्रातील कुटुंबांना कॅशलेस रुग्णालय उपचार.',
    },
    why: {
      en: 'You are a resident of Maharashtra.',
      mr: 'तुम्ही महाराष्ट्राचे रहिवासी आहात.',
    },
    rules: [{ field: 'state', op: 'eq', value: 'maharashtra' }],
    documents: {
      en: ['Aadhaar card', 'Ration card', 'Maharashtra domicile'],
      mr: ['आधार कार्ड', 'रेशन कार्ड', 'महाराष्ट्र रहिवासी दाखला'],
    },
    applyUrl: 'https://www.jeevandayee.gov.in',
    updated: '2026-10-16',
  },

  // --------------------------------------------------------------- Housing
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
    rules: [{ field: 'incomeBand', op: 'in', value: ['below1L', '1to2L'], verify: true }],
    documents: {
      en: ['Aadhaar card', 'Job card (MGNREGA)', 'Bank passbook', 'SECC verification'],
      mr: ['आधार कार्ड', 'जॉब कार्ड (मनरेगा)', 'बँक पासबुक', 'SECC पडताळणी'],
    },
    applyUrl: 'https://pmayg.nic.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-awas-urban',
    level: 'central',
    name: { en: 'PM Awas Yojana (Urban)', mr: 'पंतप्रधान आवास योजना (शहरी)' },
    benefit: {
      en: 'Interest subsidy / help to buy or build a house for urban low & middle income families.',
      mr: 'शहरी कमी व मध्यम उत्पन्न कुटुंबांना घर घेण्यासाठी व्याज सवलत / मदत.',
    },
    why: {
      en: 'You are an urban family without a pucca house.',
      mr: 'तुम्ही पक्के घर नसलेले शहरी कुटुंब आहात.',
    },
    rules: [{ field: 'incomeBand', op: 'in', value: ['below1L', '1to2L', '2to5L'], verify: true }],
    documents: {
      en: ['Aadhaar card', 'Income certificate', 'Bank passbook'],
      mr: ['आधार कार्ड', 'उत्पन्न दाखला', 'बँक पासबुक'],
    },
    applyUrl: 'https://pmay-urban.gov.in',
    updated: '2026-10-16',
  },

  // ---------------------------------------------------------- Students
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
    id: 'post-matric-scholarship',
    level: 'central',
    name: { en: 'Post-Matric Scholarship (SC/ST/OBC)', mr: 'मॅट्रिकोत्तर शिष्यवृत्ती (SC/ST/OBC)' },
    benefit: {
      en: 'Scholarship covering fees & allowances for class 11 to college students.',
      mr: 'इयत्ता 11 ते महाविद्यालयीन विद्यार्थ्यांसाठी फी व भत्त्यांसह शिष्यवृत्ती.',
    },
    why: {
      en: 'You are a reserved-category student in higher studies from a low-income family.',
      mr: 'तुम्ही उच्च शिक्षण घेणारे आरक्षित प्रवर्गातील कमी उत्पन्न कुटुंबातील विद्यार्थी आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'student' },
      { field: 'category', op: 'in', value: ['sc', 'st', 'obc'] },
      { field: 'incomeBand', op: 'in', value: ['below1L', '1to2L', '2to5L'], verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Caste certificate', 'Income certificate', 'Marksheet', 'Bank passbook'],
      mr: ['आधार कार्ड', 'जातीचा दाखला', 'उत्पन्न दाखला', 'गुणपत्रिका', 'बँक पासबुक'],
    },
    applyUrl: 'https://scholarships.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-vidyalakshmi',
    level: 'central',
    name: { en: 'PM Vidyalaxmi Education Loan', mr: 'पीएम विद्यालक्ष्मी शैक्षणिक कर्ज' },
    benefit: {
      en: 'Collateral-free education loan with interest help for meritorious students.',
      mr: 'गुणवंत विद्यार्थ्यांना तारणमुक्त शैक्षणिक कर्ज व व्याज सवलत.',
    },
    why: {
      en: 'You are a student who needs a loan for higher education.',
      mr: 'तुम्ही उच्च शिक्षणासाठी कर्जाची गरज असलेले विद्यार्थी आहात.',
    },
    rules: [{ field: 'occupation', op: 'eq', value: 'student' }],
    documents: {
      en: ['Aadhaar card', 'Admission letter', 'Income certificate', 'Marksheet'],
      mr: ['आधार कार्ड', 'प्रवेश पत्र', 'उत्पन्न दाखला', 'गुणपत्रिका'],
    },
    applyUrl: 'https://www.vidyalakshmi.co.in',
    updated: '2026-10-16',
  },
  {
    id: 'kaushal-vikas',
    level: 'central',
    name: { en: 'PM Kaushal Vikas Yojana (skills)', mr: 'पंतप्रधान कौशल्य विकास योजना' },
    benefit: {
      en: 'Free skill training and certification to help you get a job.',
      mr: 'नोकरी मिळवण्यासाठी मोफत कौशल्य प्रशिक्षण व प्रमाणपत्र.',
    },
    why: {
      en: 'You are a young person looking for skills or work.',
      mr: 'तुम्ही कौशल्य किंवा कामाच्या शोधात असलेले तरुण आहात.',
    },
    rules: [
      { field: 'age', op: 'gte', value: 15 },
      { field: 'age', op: 'lte', value: 45, verify: true },
    ],
    documents: {
      en: ['Aadhaar card', 'Bank passbook', 'Passport photo'],
      mr: ['आधार कार्ड', 'बँक पासबुक', 'पासपोर्ट फोटो'],
    },
    applyUrl: 'https://www.pmkvyofficial.org',
    updated: '2026-10-16',
  },

  // -------------------------------------------- Workers & small business
  {
    id: 'e-shram',
    level: 'central',
    name: { en: 'e-Shram Card', mr: 'ई-श्रम कार्ड' },
    benefit: {
      en: 'National ID for unorganised workers with accident insurance and scheme access.',
      mr: 'असंघटित कामगारांसाठी राष्ट्रीय ओळखपत्र, अपघात विमा व योजनांचा लाभ.',
    },
    why: {
      en: 'You are a daily-wage / unorganised worker.',
      mr: 'तुम्ही मजूर / असंघटित कामगार आहात.',
    },
    rules: [
      { field: 'occupation', op: 'in', value: ['worker', 'farmer'] },
      { field: 'age', op: 'gte', value: 16 },
      { field: 'age', op: 'lte', value: 59 },
    ],
    documents: {
      en: ['Aadhaar card', 'Mobile linked to Aadhaar', 'Bank passbook'],
      mr: ['आधार कार्ड', 'आधारशी जोडलेला मोबाईल', 'बँक पासबुक'],
    },
    applyUrl: 'https://eshram.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'shram-yogi-maandhan',
    level: 'central',
    name: { en: 'PM Shram Yogi Maandhan', mr: 'पीएम श्रम योगी मानधन' },
    benefit: {
      en: 'Pension of ₹3,000 per month after 60 for unorganised workers.',
      mr: 'असंघटित कामगारांना वय 60 नंतर दरमहा ₹3,000 निवृत्तीवेतन.',
    },
    why: {
      en: 'You are an unorganised worker aged 18–40 with low income.',
      mr: 'तुम्ही 18–40 वयाचे कमी उत्पन्न असलेले असंघटित कामगार आहात.',
    },
    rules: [
      { field: 'occupation', op: 'eq', value: 'worker' },
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 40 },
    ],
    documents: {
      en: ['Aadhaar card', 'Bank passbook (savings)', 'Mobile number'],
      mr: ['आधार कार्ड', 'बँक पासबुक (बचत)', 'मोबाईल नंबर'],
    },
    applyUrl: 'https://maandhan.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-svanidhi',
    level: 'central',
    name: { en: 'PM SVANidhi (street vendors)', mr: 'पीएम स्वनिधी (फेरीवाले)' },
    benefit: {
      en: 'Collateral-free working-capital loan for street vendors.',
      mr: 'फेरीवाल्यांना तारणमुक्त खेळते भांडवल कर्ज.',
    },
    why: {
      en: 'You run a small street vending business.',
      mr: 'तुम्ही छोटा फेरीवाला व्यवसाय करता.',
    },
    rules: [{ field: 'occupation', op: 'in', value: ['business', 'worker'] }],
    documents: {
      en: ['Aadhaar card', 'Vending certificate / ID', 'Bank passbook'],
      mr: ['आधार कार्ड', 'विक्री प्रमाणपत्र / ओळखपत्र', 'बँक पासबुक'],
    },
    applyUrl: 'https://pmsvanidhi.mohua.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-mudra',
    level: 'central',
    name: { en: 'PM Mudra Yojana (business loan)', mr: 'पीएम मुद्रा योजना (व्यवसाय कर्ज)' },
    benefit: {
      en: 'Loans up to ₹10 lakh for small / micro non-farm businesses.',
      mr: 'लहान / सूक्ष्म बिगरशेती व्यवसायांसाठी ₹10 लाखांपर्यंत कर्ज.',
    },
    why: {
      en: 'You run or want to start a small business.',
      mr: 'तुम्ही छोटा व्यवसाय करता किंवा सुरू करू इच्छिता.',
    },
    rules: [{ field: 'occupation', op: 'in', value: ['business', 'worker', 'none'] }],
    documents: {
      en: ['Aadhaar card', 'Business proof / plan', 'Bank passbook'],
      mr: ['आधार कार्ड', 'व्यवसायाचा पुरावा / आराखडा', 'बँक पासबुक'],
    },
    applyUrl: 'https://www.mudra.org.in',
    updated: '2026-10-16',
  },
  {
    id: 'pm-vishwakarma',
    level: 'central',
    name: { en: 'PM Vishwakarma (artisans)', mr: 'पीएम विश्वकर्मा (कारागीर)' },
    benefit: {
      en: 'Toolkit help, training stipend and cheap loans for traditional artisans.',
      mr: 'पारंपरिक कारागिरांना साधन मदत, प्रशिक्षण भत्ता व स्वस्त कर्ज.',
    },
    why: {
      en: 'You are a traditional artisan or craftsperson (carpenter, tailor, potter, etc.).',
      mr: 'तुम्ही पारंपरिक कारागीर आहात (सुतार, शिंपी, कुंभार इ.).',
    },
    rules: [{ field: 'occupation', op: 'in', value: ['business', 'worker'] }],
    documents: {
      en: ['Aadhaar card', 'Trade / skill proof', 'Bank passbook'],
      mr: ['आधार कार्ड', 'व्यवसाय / कौशल्य पुरावा', 'बँक पासबुक'],
    },
    applyUrl: 'https://pmvishwakarma.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'annasaheb-patil-loan',
    level: 'state',
    state: 'maharashtra',
    name: { en: 'Annasaheb Patil Loan (interest-free)', mr: 'अण्णासाहेब पाटील कर्ज (बिनव्याजी)' },
    benefit: {
      en: 'Interest refund on business loans for economically weaker youth in Maharashtra.',
      mr: 'महाराष्ट्रातील आर्थिकदृष्ट्या दुर्बल तरुणांना व्यवसाय कर्जावर व्याज परतावा.',
    },
    why: {
      en: 'You are a young entrepreneur from an economically weaker section in Maharashtra.',
      mr: 'तुम्ही महाराष्ट्रातील आर्थिकदृष्ट्या दुर्बल घटकातील तरुण उद्योजक आहात.',
    },
    rules: [
      { field: 'state', op: 'eq', value: 'maharashtra' },
      { field: 'occupation', op: 'in', value: ['business', 'none', 'worker'] },
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 60 },
    ],
    documents: {
      en: ['Aadhaar card', 'Income certificate', 'Domicile', 'Business plan', 'Bank passbook'],
      mr: ['आधार कार्ड', 'उत्पन्न दाखला', 'रहिवासी दाखला', 'व्यवसाय आराखडा', 'बँक पासबुक'],
    },
    applyUrl: 'https://udyog.mahaswayam.gov.in',
    updated: '2026-10-16',
  },

  // ------------------------------------------- Everyone: banking & security
  {
    id: 'jan-dhan',
    level: 'central',
    name: { en: 'PM Jan Dhan Yojana (bank account)', mr: 'पीएम जन धन योजना (बँक खाते)' },
    benefit: {
      en: 'Zero-balance bank account with free accident insurance and overdraft.',
      mr: 'शून्य शिल्लक बँक खाते, मोफत अपघात विमा व ओव्हरड्राफ्टसह.',
    },
    why: {
      en: 'Anyone without a bank account can open one.',
      mr: 'बँक खाते नसलेली कोणतीही व्यक्ती खाते उघडू शकते.',
    },
    rules: [{ field: 'age', op: 'gte', value: 10 }],
    documents: {
      en: ['Aadhaar card', 'Passport photo'],
      mr: ['आधार कार्ड', 'पासपोर्ट फोटो'],
    },
    applyUrl: 'https://pmjdy.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'pmsby',
    level: 'central',
    name: { en: 'PM Suraksha Bima Yojana', mr: 'पीएम सुरक्षा विमा योजना' },
    benefit: {
      en: 'Accident insurance of ₹2 lakh for just ₹20 per year.',
      mr: 'फक्त ₹20 प्रतिवर्षात ₹2 लाखांचा अपघात विमा.',
    },
    why: {
      en: 'You have a bank account and are aged 18–70.',
      mr: 'तुमचे बँक खाते आहे व वय 18–70 आहे.',
    },
    rules: [
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 70 },
    ],
    documents: {
      en: ['Aadhaar card', 'Bank account'],
      mr: ['आधार कार्ड', 'बँक खाते'],
    },
    applyUrl: 'https://www.jansuraksha.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'pmjjby',
    level: 'central',
    name: { en: 'PM Jeevan Jyoti Bima Yojana', mr: 'पीएम जीवन ज्योती विमा योजना' },
    benefit: {
      en: 'Life insurance of ₹2 lakh at a low yearly premium.',
      mr: 'कमी वार्षिक हप्त्यात ₹2 लाखांचा जीवन विमा.',
    },
    why: {
      en: 'You have a bank account and are aged 18–50.',
      mr: 'तुमचे बँक खाते आहे व वय 18–50 आहे.',
    },
    rules: [
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 50 },
    ],
    documents: {
      en: ['Aadhaar card', 'Bank account'],
      mr: ['आधार कार्ड', 'बँक खाते'],
    },
    applyUrl: 'https://www.jansuraksha.gov.in',
    updated: '2026-10-16',
  },
  {
    id: 'atal-pension',
    level: 'central',
    name: { en: 'Atal Pension Yojana', mr: 'अटल पेन्शन योजना' },
    benefit: {
      en: 'Guaranteed monthly pension of ₹1,000–₹5,000 after age 60.',
      mr: 'वय 60 नंतर दरमहा ₹1,000–₹5,000 हमी निवृत्तीवेतन.',
    },
    why: {
      en: 'You are aged 18–40 and want a guaranteed pension.',
      mr: 'तुमचे वय 18–40 आहे व तुम्हाला हमी निवृत्तीवेतन हवे आहे.',
    },
    rules: [
      { field: 'age', op: 'gte', value: 18 },
      { field: 'age', op: 'lte', value: 40 },
    ],
    documents: {
      en: ['Aadhaar card', 'Bank account', 'Mobile number'],
      mr: ['आधार कार्ड', 'बँक खाते', 'मोबाईल नंबर'],
    },
    applyUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    updated: '2026-10-16',
  },
]
