import { useMemo, useState } from 'react'
import './App.css'
import { QUESTIONS } from './data/questions'
import { SCHEMES } from './data/schemes'
import { matchSchemes } from './engine/match'
import { LANGS, UI, t } from './i18n'
import { canSpeak, speak } from './speech'

const SCREEN = { WELCOME: 'welcome', QUIZ: 'quiz', RESULTS: 'results', DETAIL: 'detail' }

export default function App() {
  const [lang, setLang] = useState('mr')
  const [screen, setScreen] = useState(SCREEN.WELCOME)
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState({})
  const [activeScheme, setActiveScheme] = useState(null)

  const results = useMemo(
    () => (screen === SCREEN.RESULTS ? matchSchemes(SCHEMES, profile) : null),
    [screen, profile],
  )

  function restart() {
    setProfile({})
    setStep(0)
    setActiveScheme(null)
    setScreen(SCREEN.WELCOME)
  }

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">🪔 {t(UI.appName, lang)}</span>
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
          <Welcome lang={lang} onStart={() => setScreen(SCREEN.QUIZ)} />
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
            onOpen={(s) => {
              setActiveScheme(s)
              setScreen(SCREEN.DETAIL)
            }}
            onRestart={restart}
          />
        )}

        {screen === SCREEN.DETAIL && activeScheme && (
          <Detail
            lang={lang}
            scheme={activeScheme}
            onBack={() => setScreen(SCREEN.RESULTS)}
          />
        )}
      </main>

      <footer className="disclaimer">{t(UI.disclaimer, lang)}</footer>
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

function Welcome({ lang, onStart }) {
  return (
    <div className="welcome">
      <div className="hero">🪔</div>
      <h1>{t(UI.appName, lang)}</h1>
      <p className="tagline">{t(UI.tagline, lang)}</p>
      <SpeakBtn text={t(UI.tagline, lang)} lang={lang} />
      <button className="cta" onClick={onStart}>
        {t(UI.start, lang)} →
      </button>
    </div>
  )
}

function Quiz({ lang, step, setStep, profile, setProfile, onDone, onBackToStart }) {
  const q = QUESTIONS[step]
  const total = QUESTIONS.length
  const value = profile[q.id]

  function set(v) {
    setProfile({ ...profile, [q.id]: v })
  }

  function toggleMulti(v) {
    const cur = Array.isArray(value) ? value : []
    set(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v])
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
      <SpeakBtn text={t(q.label, lang)} lang={lang} />

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

function Results({ lang, results, onOpen, onRestart }) {
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
            <SchemeCard key={s.id} scheme={s} lang={lang} onOpen={onOpen} tone="ok" />
          ))}
        </section>
      )}

      {likely.length > 0 && (
        <section>
          <h3 className="band maybe">🟡 {t(UI.likelyQualify, lang)}</h3>
          {likely.map((s) => (
            <SchemeCard key={s.id} scheme={s} lang={lang} onOpen={onOpen} tone="maybe" />
          ))}
        </section>
      )}

      <button className="ghost wide" onClick={onRestart}>
        ↺ {t(UI.startOver, lang)}
      </button>
    </div>
  )
}

function SchemeCard({ scheme, lang, onOpen, tone }) {
  return (
    <button className={`card ${tone}`} onClick={() => onOpen(scheme)}>
      <div className="cardtop">
        <span className="cardname">{t(scheme.name, lang)}</span>
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
