/* ============================================================
   Onboarding.tsx — welcome slides.
   ============================================================ */

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SoundButton } from '../components/ui'
import { useApp } from '../lib/store'
import { playSound } from '../lib/sound'
import { Icon, type IconName } from '../lib/icons'

const SLIDES: { icon: IconName; title: string; body: string; art: string }[] = [
  {
    icon: 'flower1',
    title: 'Her 75',
    body: 'A 75-day wellness journey, built for women. Soft on the soul, strong on results.',
    art: 'linear-gradient(135deg,#ffd9e7,#f7b6cf)',
  },
  {
    icon: 'moon-stars',
    title: 'Cycle-aware',
    body: 'Your habits adapt to where you are in your cycle — not the other way around.',
    art: 'linear-gradient(135deg,#e9e2fb,#c3a9f2)',
  },
  {
    icon: 'heart',
    title: 'Better together',
    body: 'See your friends’ daily promises in real time. No streaks-as-shame. Just support.',
    art: 'linear-gradient(135deg,#cdeede,#a5e0c6)',
  },
]

export default function Onboarding() {
  const { finishOnboarding } = useApp()
  const [i, setI] = useState(0)
  const last = i === SLIDES.length - 1
  const slide = SLIDES[i]

  return (
    <div className="screen">
      <div className="scroll no-tab" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 12 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -14 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 210,
                  height: 210,
                  borderRadius: '46% 54% 52% 48% / 54% 46% 54% 46%',
                  background: slide.art,
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 30px 70px -20px rgba(150,60,110,0.4)',
                  marginBottom: 40,
                }}
              >
                <Icon name={slide.icon} size={88} color="#ffffff" />
              </motion.div>
              <h1 className="display" style={{ fontSize: 42, marginBottom: 14, textAlign: 'center' }}>
                {slide.title}
              </h1>
              <p className="muted" style={{ fontSize: 17, lineHeight: 1.5, textAlign: 'center', maxWidth: 300 }}>
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="row center gap-2" style={{ marginBottom: 26 }}>
          {SLIDES.map((_, idx) => (
            <motion.span
              key={idx}
              animate={{ width: idx === i ? 26 : 8, opacity: idx === i ? 1 : 0.4 }}
              style={{ height: 8, borderRadius: 999, background: 'var(--accent)', display: 'block' }}
            />
          ))}
        </div>

        <div className="stack">
          <SoundButton
            className="block xl"
            sound={last ? 'success' : 'pop'}
            haptics={last ? 'success' : 'light'}
            onClick={() => (last ? finishOnboarding() : setI((v) => v + 1))}
          >
            {last ? 'Begin my journey' : 'Continue'}
          </SoundButton>
          {!last && (
            <button
              className="muted"
              style={{ fontWeight: 600, fontSize: 14, padding: 6 }}
              onClick={() => {
                playSound('tap')
                finishOnboarding()
              }}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
