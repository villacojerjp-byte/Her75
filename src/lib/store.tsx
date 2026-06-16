/* ============================================================
   store.tsx — global app state with localStorage persistence.
   ============================================================ */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CHALLENGES, type Challenge, type CyclePhase } from './data'

const KEY = 'her75:state:v1'

export type Screen = 'onboarding' | 'choose' | 'app'
export type Tab = 'today' | 'hydrate' | 'friends' | 'profile'

type Persisted = {
  onboarded: boolean
  challengeId: string | null
  currentDay: number
  startedISO: string | null
  name: string
  cycle: CyclePhase
  waterMl: number
  waterGoalMl: number
  history: Record<number, string[]> // day -> completed task ids
}

const DEFAULT: Persisted = {
  onboarded: false,
  challengeId: null,
  currentDay: 12,
  startedISO: null,
  name: 'Beautiful',
  cycle: 'menstrual',
  waterMl: 900,
  waterGoalMl: 3000,
  history: { 12: [] },
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return DEFAULT
}

type Ctx = {
  state: Persisted
  challenge: Challenge | null
  todayDone: string[]
  setName: (n: string) => void
  setCycle: (c: CyclePhase) => void
  startChallenge: (id: string) => void
  finishOnboarding: () => void
  toggleTask: (taskId: string) => void
  addWater: (ml: number) => void
  resetWater: () => void
  resetAll: () => void
  reset: () => void
}

const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  const challenge = useMemo(
    () => CHALLENGES.find((c) => c.id === state.challengeId) ?? null,
    [state.challengeId],
  )

  const todayDone = state.history[state.currentDay] ?? []

  const value: Ctx = {
    state,
    challenge,
    todayDone,
    setName: (n) => setState((s) => ({ ...s, name: n })),
    setCycle: (c) => setState((s) => ({ ...s, cycle: c })),
    finishOnboarding: () => setState((s) => ({ ...s, onboarded: true })),
    startChallenge: (id) =>
      setState((s) => ({
        ...s,
        challengeId: id,
        startedISO: s.startedISO ?? '2026-06-05',
      })),
    toggleTask: (taskId) =>
      setState((s) => {
        const done = s.history[s.currentDay] ?? []
        const next = done.includes(taskId)
          ? done.filter((t) => t !== taskId)
          : [...done, taskId]
        return { ...s, history: { ...s.history, [s.currentDay]: next } }
      }),
    addWater: (ml) =>
      setState((s) => ({ ...s, waterMl: Math.max(0, Math.min(s.waterGoalMl + 1000, s.waterMl + ml)) })),
    resetWater: () => setState((s) => ({ ...s, waterMl: 0 })),
    resetAll: () => setState(DEFAULT),
    reset: () => setState(DEFAULT),
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
