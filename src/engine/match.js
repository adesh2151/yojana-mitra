// The matching engine — the brain of Yojana Mitra.
//
// Given a user profile, it runs every scheme's rules and returns three lists:
//   qualify  — all hard rules passed
//   likely   — nothing failed, but a fuzzy/unknown rule means "please verify"
//   notEligible — at least one hard rule failed (hidden by default in the UI)
//
// Being honest about the "likely" bucket is the whole point: government rules
// are often vague, so we never promise eligibility we can't check.

export const RESULT = {
  QUALIFY: 'qualify',
  LIKELY: 'likely',
  NOT_ELIGIBLE: 'notEligible',
}

const PASS = 'pass'
const FAIL = 'fail'
const UNKNOWN = 'unknown'

function evaluateRule(rule, profile) {
  const actual = profile[rule.field]

  // Missing answer → can't decide this rule.
  if (actual === undefined || actual === null || actual === '') return UNKNOWN

  let ok
  switch (rule.op) {
    case 'eq':
      ok = actual === rule.value
      break
    case 'in':
      ok = Array.isArray(rule.value) && rule.value.includes(actual)
      break
    case 'gte':
      ok = Number(actual) >= Number(rule.value)
      break
    case 'lte':
      ok = Number(actual) <= Number(rule.value)
      break
    case 'has':
      ok = Array.isArray(actual) && actual.includes(rule.value)
      break
    default:
      return UNKNOWN
  }

  if (!ok) return FAIL
  // Rule passes, but if the real govt rule is fuzzy we only claim "likely".
  return rule.verify ? UNKNOWN : PASS
}

export function classifyScheme(scheme, profile) {
  let sawUnknown = false
  for (const rule of scheme.rules) {
    const r = evaluateRule(rule, profile)
    if (r === FAIL) return RESULT.NOT_ELIGIBLE
    if (r === UNKNOWN) sawUnknown = true
  }
  return sawUnknown ? RESULT.LIKELY : RESULT.QUALIFY
}

export function matchSchemes(schemes, profile) {
  const out = { qualify: [], likely: [], notEligible: [] }
  for (const scheme of schemes) {
    out[classifyScheme(scheme, profile)].push(scheme)
  }
  return out
}
