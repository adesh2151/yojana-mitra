# 🪔 Yojana Mitra (योजना मित्र)

**Find the government help you deserve — in your own language.**

A voice-first, offline-first app that tells an ordinary Indian which government
schemes and benefits they qualify for. Answer a few simple questions (big
buttons, no typing needed), and get a clear list of matching schemes with the
benefit, documents needed, and where to apply — read aloud in Marathi or English.

Built in the same spirit as [Shetkari Mitra](https://github.com/adesh2151/shetkari-mitra):
for the people the system was meant to help but accidentally left out.

## Why this exists

Every year, thousands of crores in pensions, scholarships, farmer subsidies and
welfare go **unclaimed** — because people don't know a scheme exists, can't tell
if they qualify, or can't read the English forms. The data is public but
unusable for a normal villager. Yojana Mitra turns it into a plain-language
answer anyone can act on.

## How it works

1. **Tell us about you** — age, work, income, category, etc. (one minute, tap-only).
2. **Matching engine** runs your profile against each scheme's rules and sorts
   them into: ✅ *You qualify*, 🟡 *Likely — please verify*, or hidden.
3. **Scheme detail** — benefit, who qualifies, documents, official apply link,
   with a 🔊 Listen button in your language.

## Tech

- React 18 + Vite 5 (PWA — installable, works offline)
- Capacitor 6 for Android
- Browser SpeechSynthesis for voice output (free, on-device)
- Scheme data is a local JSON-like file (`src/data/schemes.js`) — no backend in v1

## Data

v1 ships a hand-cleaned seed of major Maharashtra + national schemes. The larger
goal is ~40 top schemes, then live sync from the official
[myScheme](https://www.myscheme.gov.in) catalogue / data.gov.in open data
(Government Open Data Licence – India, reuse with attribution).

> This is a free helper. **Final eligibility is decided by the government** —
> always confirm on the official website linked in each scheme.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the build

# Android (Capacitor)
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
```

## Roadmap

- [ ] Expand seed to ~40 schemes
- [ ] Voice *input* (speak your situation instead of tapping)
- [ ] Live data sync from myScheme / data.gov.in
- [ ] More languages (Hindi, then others)
- [ ] Save profile + notify when new matching schemes appear
