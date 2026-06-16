/* ============================================================
   App.tsx — shell, routing between screens, page transitions.
   ============================================================ */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

        {/* A single keyed motion.div (no AnimatePresence) makes flow changes
            bulletproof: the new flow always mounts immediately instead of
            waiting for the previous screen's exit animation — which could stall
            when the exiting screen (e.g. Onboarding) has its own nested
            AnimatePresence, leaving the app stuck on a blank screen. */}
        <motion.div key={flow} {...enter} className="screen">
          {flow === 'onboarding' && <Onboarding />}

          {flow === 'choose' && <ChallengeSelect />}

          {flow === 'app' && (
            <>
              {/* Same pattern for tabs: keyed motion.div, always mounts. */}
              <motion.div key={tab} {...slide} className="screen">
                {tab === 'today' && <Today goHydrate={() => setTab('hydrate')} />}
                {tab === 'hydrate' && <Hydrate />}
                {tab === 'friends' && <Friends />}
                {tab === 'profile' && <Profile />}
              </motion.div>
              <TabBar active={tab} onChange={setTab} />
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Flow-level enter animation (no exit needed without AnimatePresence).
const enter = {
  initial: { opacity: 0, scale: 0.985 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
}

// Tab-level enter animation.
const slide = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] as const },
}
