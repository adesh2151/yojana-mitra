import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { QUESTIONS } from './data/questions'
import { SCHEMES } from './data/schemes'
import { matchSchemes } from './engine/match'
import { LANGS, UI, t } from './i18n'
import { canListen, canSpeak, listen, speak } from './speech'

// Cross-app + distribution links (see also: public hub at HUB_URL).
const HUB_URL = 'https://adesh2151.github.io/'
const APK_URL = 'https://github.com/adesh2151/yojana-mitra/releases/download/apk/YojanaMitra.apk'

const LS_PROFILE = 'ym_profile'
const LS_LANG = 'ym_lang'
const LS_SEEN = 'ym_seen_schemes'

const SCREEN = { WELCOME: 'welcome', QUIZ: 'quiz', RESULTS: 'results', DETAIL: 'detail', BROWSE: 'browse' }

// localStorage helpers — every access guarded (private mode / blocked storage).
function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v == null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}
function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

// Convert Devanagari digits (०-९) to ASCII so spoken numbers parse.
function toAsciiDigits(s) {
  return s.replace(/[०-९]/g, (d) => '०१२३४५६७८९'.indexOf(d))
}

// Map a spoken transcript to an answer for the given question.
function matchVoice(q, transcript, lang) {
  const text = toAsciiDigits(transcript).toLowerCase()
  if (q.type === 'number') {
    const m = text.match(/\d{1,3}/)
    return m ? Math.max(q.min, Math.min(q.max, Number(m[0]))) : undefined
  }
  if (q.type === 'boolean') {
    if (/\b(yes|yeah|हो|होय|हा|हाँ)\b/.test(text)) return true
    if (/\b(no|nope|नाही|ना|नहीं)\b/.test(text)) return false
    return undefined
  }
  const hit = q.options.find((o) => {
    const labels = [t(o.label, lang), o.label.en, o.label.mr, o.label.hi]
      .filter(Boolean)
      .map((x) => x.toLowerCase())
    return labels.some((lab) => text.includes(lab) || lab.includes(text))
  })
  return hit ? hit.value : undefined
}

export default function App() {
  const [lang, setLang] = useState(() => lsGet(LS_LANG, 'mr'))
  const [screen, setScreen] = useState(SCREEN.WELCOME)
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState(() => lsGet(LS_PROFILE, {}))
  const [activeScheme, setActiveScheme] = useState(null)

  useEffect(() => lsSet(LS_LANG, lang), [lang])
  useEffect(() => lsSet(LS_PROFILE, profile), [profile])

  const results = useMemo(
    () => (screen === SCREEN.RESULTS ? matchSchemes(SCHEMES, profile) : null),
    [screen, profile],
  )

  // Mark schemes the user hasn't seen before as NEW, then remember them.
  const seen = lsGet(LS_SEEN, [])
  const newIds = useMemo(() => {
    if (!results) return new Set()
    const shown = [...results.qualify, ...results.likely].map((s) => s.id)
    return new Set(shown.filter((id) => !seen.includes(id)))
  }, [results])
  useEffect(() => {
    if (!results) return
    const shown = [...results.qualify, ...results.likely].map((s) => s.id)
    lsSet(LS_SEEN, Array.from(new Set([...seen, ...shown])))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  function restart() {
    setProfile({})
    setStep(0)
    setActiveScheme(null)
    setScreen(SCREEN.WELCOME)
  }

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand" onClick={() => setScreen(SCREEN.WELCOME)}>
          🪔 {t(UI.appName, lang)}
        </span>
        <div className="langs">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`lang ${lang === l.code ? 'active' : ''}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <main className="screen">
        {screen === SCREEN.WELCOME && (
          <Welcome
            lang={lang}
            onStart={() => setScreen(SCREEN.QUIZ)}
            onBrowse={() => setScreen(SCREEN.BROWSE)}
          />
        )}

        {screen === SCREEN.QUIZ && (
          <Quiz
            lang={lang}
            step={step}
            setStep={setStep}
            profile={profile}
            setProfile={setProfile}
            onDone={() => setScreen(SCREEN.RESULTS)}
            onBackToStart={restart}
          />
        )}

        {screen === SCREEN.RESULTS && results && (
          <Results
            lang={lang}
            results={results}
            newIds={newIds}
            onOpen={(s) => {
              setActiveScheme(s)
              setScreen(SCREEN.DETAIL)
            }}
            onRestart={restart}
            onBrowse={() => setScreen(SCREEN.BROWSE)}
          />
        )}

        {screen === SCREEN.DETAIL && activeScheme && (
          <Detail lang={lang} scheme={activeScheme} onBack={() => setScreen(SCREEN.RESULTS)} />
        )}

        {screen === SCREEN.BROWSE && (
          <BrowseAll lang={lang} onBack={() => setScreen(SCREEN.WELCOME)} />
        )}
      </main>

      <footer className="disclaimer">
        <div className="footlinks">
          <a href={APK_URL}>📱 {t(UI.getAndroid, lang)}</a>
          <a href={HUB_URL} target="_blank" rel="noreferrer">
            🧩 {t(UI.moreApps, lang)}
          </a>
        </div>
        {t(UI.disclaimer, lang)}
        <br />
        <a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer">
          {t(UI.source, lang)}
        </a>
      </footer>
    </div>
  )
}

function SpeakBtn({ text, lang }) {
  if (!canSpeak()) return null
  return (
    <button className="speak" onClick={() => speak(text, lang)} aria-label="listen">
      🔊 {t(UI.listen, lang)}
    </button>
  )
}

function Welcome({ lang, onStart, onBrowse }) {
  return (
    <div className="welcome">
      <div className="hero">🪔</div>
      <h1>{t(UI.appName, lang)}</h1>
      <p className="tagline">{t(UI.tagline, lang)}</p>
      <SpeakBtn text={t(UI.tagline, lang)} lang={lang} />
      <button className="cta" onClick={onStart}>
        {t(UI.start, lang)} →
      </button>
      <button className="ghost wide" onClick={onBrowse}>
        🔎 {t(UI.browseAll, lang)}
      </button>
    </div>
  )
}

function Quiz({ lang, step, setStep, profile, setProfile, onDone, onBackToStart }) {
  const q = QUESTIONS[step]
  const total = QUESTIONS.length
  const value = profile[q.id]
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('')

  function set(v) {
    setProfile({ ...profile, [q.id]: v })
  }
  function toggleMulti(v) {
    const cur = Array.isArray(value) ? value : []
    set(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v])
  }
  function startVoice() {
    setHeard('')
    setListening(true)
    listen(
      lang,
      (transcript) => {
        setHeard(transcript)
        const v = matchVoice(q, transcript, lang)
        if (v === undefined) return
        if (q.type === 'multi') toggleMulti(v)
        else set(v)
      },
      () => setListening(false),
    )
  }
  function next() {
    if (step + 1 < total) setStep(step + 1)
    else onDone()
  }
  function back() {
    if (step === 0) onBackToStart()
    else setStep(step - 1)
  }

  const answered =
    q.type === 'multi' ||
    (q.type === 'number' && value !== undefined) ||
    (q.type === 'boolean' && value !== undefined) ||
    (q.type === 'single' && value !== undefined)

  return (
    <div className="quiz">
      <div className="progress">
        <div className="bar" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <p className="stepcount">
        {step + 1} / {total}
      </p>

      <h2 className="question">{t(q.label, lang)}</h2>
      <div className="voicerow">
        <SpeakBtn text={t(q.label, lang)} lang={lang} />
        {canListen() && (
          <button
            className={`mic ${listening ? 'on' : ''}`}
            onClick={startVoice}
            aria-label="speak answer"
          >
            {listening ? '🎙️…' : '🎤'}
          </button>
        )}
      </div>
      {heard && <p className="heard">“{heard}”</p>}

      <div className="choices">
        {q.type === 'number' && (
          <div className="numberpick">
            <button onClick={() => set(Math.max(q.min, (value ?? q.default) - 1))}>−</button>
            <span className="num">{value ?? q.default}</span>
            <button onClick={() => set(Math.min(q.max, (value ?? q.default) + 1))}>+</button>
          </div>
        )}

        {q.type === 'single' &&
          q.options.map((o) => (
            <button
              key={o.value}
              className={`choice ${value === o.value ? 'sel' : ''}`}
              onClick={() => set(o.value)}
            >
              <span className="ic">{o.icon}</span>
              {t(o.label, lang)}
            </button>
          ))}

        {q.type === 'multi' &&
          q.options.map((o) => (
            <button
              key={o.value}
              className={`choice ${Array.isArray(value) && value.includes(o.value) ? 'sel' : ''}`}
              onClick={() => toggleMulti(o.value)}
            >
              <span className="ic">{o.icon}</span>
              {t(o.label, lang)}
            </button>
          ))}

        {q.type === 'boolean' && (
          <div className="yesno">
            <button className={`choice ${value === true ? 'sel' : ''}`} onClick={() => set(true)}>
              ✅ {t(UI.yes, lang)}
            </button>
            <button className={`choice ${value === false ? 'sel' : ''}`} onClick={() => set(false)}>
              ❌ {t(UI.no, lang)}
            </button>
          </div>
        )}
      </div>

      <div className="navrow">
        <button className="ghost" onClick={back}>
          ← {t(UI.back, lang)}
        </button>
        <button className="cta" onClick={next}>
          {step + 1 === total ? t(UI.seeResults, lang) : answered ? t(UI.next, lang) : t(UI.skip, lang)} →
        </button>
      </div>
    </div>
  )
}

function Results({ lang, results, newIds, onOpen, onRestart, onBrowse }) {
  const { qualify, likely } = results
  const empty = qualify.length === 0 && likely.length === 0

  return (
    <div className="results">
      <h2>{t(UI.resultsTitle, lang)}</h2>

      {empty && <p className="empty">{t(UI.noMatches, lang)}</p>}

      {qualify.length > 0 && (
        <section>
          <h3 className="band ok">✅ {t(UI.youQualify, lang)}</h3>
          {qualify.map((s) => (
            <SchemeCard key={s.id} scheme={s} lang={lang} onOpen={onOpen} tone="ok" isNew={newIds.has(s.id)} />
          ))}
        </section>
      )}

      {likely.length > 0 && (
        <section>
          <h3 className="band maybe">🟡 {t(UI.likelyQualify, lang)}</h3>
          {likely.map((s) => (
            <SchemeCard key={s.id} scheme={s} lang={lang} onOpen={onOpen} tone="maybe" isNew={newIds.has(s.id)} />
          ))}
        </section>
      )}

      <button className="ghost wide" onClick={onBrowse}>
        🔎 {t(UI.browseAll, lang)}
      </button>
      <button className="ghost wide" onClick={onRestart}>
        ↺ {t(UI.startOver, lang)}
      </button>
    </div>
  )
}

function SchemeCard({ scheme, lang, onOpen, tone, isNew }) {
  return (
    <button className={`card ${tone}`} onClick={() => onOpen(scheme)}>
      <div className="cardtop">
        <span className="cardname">
          {isNew && <span className="newtag">{t(UI.newBadge, lang)}</span>}
          {t(scheme.name, lang)}
        </span>
        <span className="chev">›</span>
      </div>
      <span className="cardbenefit">{t(scheme.benefit, lang)}</span>
    </button>
  )
}

function Detail({ lang, scheme, onBack }) {
  const docs = scheme.documents[lang] ?? scheme.documents.en ?? []
  const readAloud = `${t(scheme.name, lang)}. ${t(scheme.benefit, lang)}. ${t(scheme.why, lang)}`

  return (
    <div className="detail">
      <button className="ghost" onClick={onBack}>
        ← {t(UI.back, lang)}
      </button>

      <h2>{t(scheme.name, lang)}</h2>
      <SpeakBtn text={readAloud} lang={lang} />

      <div className="block">
        <h4>{t(UI.benefit, lang)}</h4>
        <p>{t(scheme.benefit, lang)}</p>
      </div>

      <div className="block">
        <h4>{t(UI.whoQualifies, lang)}</h4>
        <p>{t(scheme.why, lang)}</p>
      </div>

      <div className="block">
        <h4>{t(UI.documents, lang)}</h4>
        <ul>
          {docs.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="block">
        <h4>{t(UI.howToApply, lang)}</h4>
        <a className="cta link" href={scheme.applyUrl} target="_blank" rel="noreferrer">
          🌐 {t(UI.applyOnline, lang)}
        </a>
      </div>

      <p className="updated">
        {t(UI.updated, lang)}: {scheme.updated}
      </p>
    </div>
  )
}

function BrowseAll({ lang, onBack }) {
  const [catalog, setCatalog] = useState(null)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let alive = true
    fetch(`${import.meta.env.BASE_URL}catalog.json`)
      .then((r) => r.json())
      .then((d) => alive && setCatalog(d))
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
  }, [])

  const list = useMemo(() => {
    if (!catalog) return []
    const q = query.trim().toLowerCase()
    const items = q
      ? catalog.schemes.filter(
          (s) => s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q) || s.tags.toLowerCase().includes(q),
        )
      : catalog.schemes
    return items.slice(0, 200) // cap render for performance
  }, [catalog, query])

  return (
    <div className="browse">
      <button className="ghost" onClick={onBack}>
        ← {t(UI.back, lang)}
      </button>
      <h2>{t(UI.browseAll, lang)}</h2>
      <p className="catnote">{t(UI.catalogNote, lang)}</p>

      <input
        className="searchbox"
        placeholder={t(UI.search, lang)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {error && <p className="empty">{t(UI.noMatches, lang)}</p>}
      {!catalog && !error && <p className="empty">{t(UI.loading, lang)}</p>}

      {catalog && (
        <>
          <p className="stepcount">
            {list.length}
            {query ? '' : ` / ${catalog.count}`}
          </p>
          {list.map((s, i) => (
            <a
              key={i}
              className="card ok catlink"
              href={s.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="cardtop">
                <span className="cardname">{s.name}</span>
                <span className="chev">›</span>
              </div>
              <span className="cardbenefit">
                {s.state} · {s.level === 'central' ? '🇮🇳' : '📍'}
              </span>
            </a>
          ))}
        </>
      )}
    </div>
  )
}
