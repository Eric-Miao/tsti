import { DIMENSIONS, QUESTIONS, type Dim } from './questions'
import { DIMENSIONS_EN, QUESTIONS_EN } from './questions.en'
import { TYPES as TYPES_ZH } from './types'
import { TYPES_EN } from './types.en'
import type { TennisType } from './types'
import type { Locale } from '../i18n'

const TYPES_EN_WITH_CODE: Record<string, TennisType> = Object.fromEntries(
  Object.entries(TYPES_EN).map(([code, t]) => [code, { ...t, code }]),
)

export const ALL_CODES = Object.keys(TYPES_ZH)

export function getTypes(locale: Locale): Record<string, TennisType> {
  return locale === 'en' ? TYPES_EN_WITH_CODE : TYPES_ZH
}

export function getQuestions(locale: Locale) {
  return locale === 'en' ? QUESTIONS_EN : QUESTIONS
}

type DimMeta = { name: string; left: string; right: string; leftLabel: string; rightLabel: string; desc: string }

const DIM_META_EN: Record<Dim, DimMeta> = {
  EI: { name: DIMENSIONS_EN.EI.name, left: 'E', right: 'I', leftLabel: DIMENSIONS_EN.EI.leftLabel, rightLabel: DIMENSIONS_EN.EI.rightLabel, desc: DIMENSIONS_EN.EI.desc },
  BN: { name: DIMENSIONS_EN.BN.name, left: 'B', right: 'N', leftLabel: DIMENSIONS_EN.BN.leftLabel, rightLabel: DIMENSIONS_EN.BN.rightLabel, desc: DIMENSIONS_EN.BN.desc },
  SF: { name: DIMENSIONS_EN.SF.name, left: 'S', right: 'F', leftLabel: DIMENSIONS_EN.SF.leftLabel, rightLabel: DIMENSIONS_EN.SF.rightLabel, desc: DIMENSIONS_EN.SF.desc },
  AD: { name: DIMENSIONS_EN.AD.name, left: 'A', right: 'D', leftLabel: DIMENSIONS_EN.AD.leftLabel, rightLabel: DIMENSIONS_EN.AD.rightLabel, desc: DIMENSIONS_EN.AD.desc },
}

export function getDimensions(locale: Locale): Record<Dim, DimMeta> {
  return locale === 'en' ? DIM_META_EN : (DIMENSIONS as unknown as Record<Dim, DimMeta>)
}
