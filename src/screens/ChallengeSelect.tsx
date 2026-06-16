/* ============================================================
   ChallengeSelect.tsx — browse & pick a challenge.
   ============================================================ */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { CHALLENGES } from '../lib/data'
import { useApp } from '../lib/store'
import { SoundButton, Tappable } from '../components/ui'
import { playSound } from '../lib/sound'
import { haptic } from '../lib/haptics'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'soft', label: 'Soft' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
] as const

export default function ChallengeSelect() {
  const { startChallenge } = useApp()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')
  const [picked, setPicked] = useState<string | null>(null)

  const list = CHALLENGES.filter((c) => filter === 'all' || c.intensity === filter)

  return (
    <div className="screen">
      <div className="scroll no-tab">
        <div style={{ paddingTop: 6, marginBottom: 18 }}>
          <span className="eyebrow">Choose your path</span>
          <h1 className="display" style={{ fontSize: 34, marginTop: 8 }}>
            Pick a challenge
            <br />
            that fits <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>your</em> season
          </h1>
          <p className="muted" style={{ marginTop: 10, fontSize: 15 }}>
            Start gentle or go all-in — you can switch any time.
          </p>
        </div>

        {/* filter segmented control */}
        <div className="seg" style={{ marginBottom: 18 }}>
          {FILTERS.map((f) => {
            const on = filter === f.id
            return (
              <button
                key={f.id}
                className={on ? 'active' : ''}
                onClick={() => {
                  playSound('tap')
                  void haptic('light')
                  setFilter(f.id)
                }}
              >
                {on && <motion.span layoutId="seg-ind" className="seg-ind" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                {f.label}
              </button>
            )
          })}
        </div>

        {/* challenge cards */}
        <div className="stack" style={{ paddingBottom: 96 }}>
          {list.map((c, idx) => {
            const on = picked === c.id
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Tappable
                  sound="pop"
                  onClick={() => setPicked(c.id)}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    outline: on ? '2.5px solid var(--accent)' : '2.5px solid transparent',
                    boxShadow: on ? 'var(--shadow-lg)' : 'var(--shadow-md)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <div
                      style={{
                        width: 92,
                        flexShrink: 0,
                        background: c.gradient,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 40,
                      }}
                    >
                      {c.emoji}
                    </div>
                    <div style={{ flex: 1, padding: '15px 16px' }}>
                      <div className="row between" style={{ alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 17 }}>{c.name}</div>
                          <div className="faint" style={{ fontSize: 12.5, marginTop: 2 }}>
                            {c.days} days · {c.tasks.length} daily promises
                          </div>
                        </div>
                        <motion.div animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }} className="check on" style={{ width: 26, height: 26 }}>
                          <Check size={15} strokeWidth={3.5} />
                        </motion.div>
                      </div>
                      <p className="muted" style={{ fontSize: 13.5, marginTop: 7, lineHeight: 1.4 }}>
                        {c.tagline}
                      </p>
                      <div className="row gap-2 wrap" style={{ marginTop: 10 }}>
                        {c.tasks.slice(0, 4).map((t) => (
                          <span key={t.id} style={{ fontSize: 17 }}>
                            {t.emoji}
                          </span>
                        ))}
                        <span className="pill" style={{ padding: '4px 10px', fontSize: 10.5, textTransform: 'capitalize' }}>
                          {c.intensity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Tappable>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* sticky CTA */}
      <motion.div
        initial={false}
        animate={{ y: picked ? 0 : 130 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '14px 22px calc(22px + var(--safe-bottom))',
          background: 'linear-gradient(to top, var(--bg) 55%, transparent)',
          zIndex: 10,
        }}
      >
        <SoundButton
          className="block xl"
          sound="success"
          haptics="success"
          onClick={() => picked && startChallenge(picked)}
        >
          <Sparkles size={19} />
          Start {picked ? CHALLENGES.find((c) => c.id === picked)?.name : ''}
          <ArrowRight size={19} />
        </SoundButton>
      </motion.div>
    </div>
  )
}
