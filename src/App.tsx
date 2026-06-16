/* ============================================================
   App.tsx — shell, routing between screens, page transitions.
   ============================================================ */

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp, type Tab } from './lib/store'
import { StatusBar } from './components/ui'
import TabBar from './components/TabBar'
import Onboarding from './screens/Onboarding'
import ChallengeSelect from './screens/ChallengeSelect'
import Today from './screens/Today'
import Hydrate from './screens/Hydrate'
import Friends from './screens/Friends'
import Profile from './screens/Profile'
import { primeAudio } from './lib/sound'

export default function App() {
  const { state, challenge } = useApp()
  const [tab, setTab] = useState<Tab>('today')

  // unlock audio on first interaction (iOS requirement)
  useEffect(() => {
    const unlock = () => primeAudio()
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  // decide which top-level flow we're in
  const flow: 'onboarding' | 'choose' | 'app' = !state.onboarded
    ? 'onboarding'
    : !challenge
      ? 'choose'
      : 'app'

  return (
    <div className="app-root">
      <div className="phone">
        <StatusBar />

        <AnimatePresence mode="wait">
          {flow === 'onboarding' && (
            <motion.div key="onb" {...fade} className="screen">
              <Onboarding />
            </motion.div>
          )}

          {flow === 'choose' && (
            <motion.div key="choose" {...fade} className="screen">
              <ChallengeSelect />
            </motion.div>
          )}

          {flow === 'app' && (
            <motion.div key="app" {...fade} className="screen">
              {/* A keyed motion.div (no inner AnimatePresence) guarantees the
                  incoming tab always mounts — avoids a nested mode="wait" stall. */}
              <motion.div key={tab} {...slide} className="screen">
                {tab === 'today' && <Today goHydrate={() => setTab('hydrate')} />}
                {tab === 'hydrate' && <Hydrate />}
                {tab === 'friends' && <Friends />}
                {tab === 'profile' && <Profile />}
              </motion.div>
              <TabBar active={tab} onChange={setTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const fade = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const },
}

const slide = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -18 },
  transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] as const },
}
