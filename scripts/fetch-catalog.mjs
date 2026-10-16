// Live-data sync: build a compact, browseable catalogue of ALL government
// schemes from the open Apache-2.0 dataset (gov-myscheme-dataset, itself derived
// from the Government of India's myScheme platform with attribution).
//
// The full dataset is ~16 MB — far too big to bundle in an offline PWA. This
// script slims every scheme down to the few fields the "Browse all" screen
// needs (name, state, level, tags, official link) and writes public/catalog.json.
//
// Run:  npm run sync:catalog
// The curated ~40 schemes in src/data/schemes.js (with real eligibility rules)
// stay the matching engine; this catalogue is browse-only.

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC =
  'https://raw.githubusercontent.com/Aryan-Pardeshi/gov-myscheme-dataset/main/gov_myscheme_data.json'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'catalog.json')

function clean(s) {
  return (s || '').toString().replace(/\s+/g, ' ').trim()
}

const main = async () => {
  console.log('Downloading full dataset…')
  const res = await fetch(SRC)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)
  const rows = await res.json()
  console.log(`Got ${rows.length} schemes. Slimming…`)

  const catalog = rows
    .map((r) => {
      const slug = clean(r['Scheme Slug'])
      return {
        name: clean(r['Scheme Name']),
        state: clean(r['State / UT / Ministry']),
        level: clean(r['Level']).startsWith('Central') ? 'central' : 'state',
        tags: clean(r['Tags / Categories']),
        url: clean(r['Official Link']) || (slug ? `https://www.myscheme.gov.in/schemes/${slug}` : ''),
      }
    })
    .filter((s) => s.name)
    .sort((a, b) => a.name.localeCompare(b.name))

  const payload = {
    source: 'myScheme (Government of India) via gov-myscheme-dataset (Apache-2.0)',
    generated: new Date().toISOString().slice(0, 10),
    count: catalog.length,
    schemes: catalog,
  }

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, JSON.stringify(payload))
  console.log(`Wrote ${catalog.length} schemes to ${OUT}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
