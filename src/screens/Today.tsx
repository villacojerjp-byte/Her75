/* ============================================================
   Today.tsx — the daily home screen: progress ring, day counter,
   cycle note, and the 5 daily promises checklist.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Flame, ChevronRight } from 'lucide-react'
import { useApp } from '../lib/store'
import { CYCLE } from '../lib/data'
import { ProgressRing, IconButton } from '../components/ui'
import { Icon } from '../lib/icons'
import Confetti from '../components/Confetti'
import { playSound } from '../lib/sound'
import { haptic } from '../lib/haptics'

export default function Today({ goHydrate }: { goHydrate: () => void }) {
  const { state, challenge, todayDone, toggleTask } = useApp()
  const [celebrate, setCelebrate] = useState(false)
  const prevAll = useRef(false)

  if (!challenge) return null

  const total = challenge.tasks.length
  const done = todayDone.length
  const progress = done / total
  const cycle = CYCLE[state.cycle]
  const allDone = done === total

  useEffect(() => {
    if (allDone && !prevAll.current) {
      setCelebrate(true)
      playSound('success')
      void haptic('success')
      const t = setTimeout(() => setCelebrate(false), 1300)
      return () => clearTimeout(t)
    }
    prevAll.current = allDone
  }, [allDone])

  const greeting = (() => {
    const h = 9 // faux fixed morning for demo
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  })()

  return (
    <div className="screen">
      <Confetti show={celebrate} />
      <div className="scroll">
        {/* header */}
        <div className="row between" style={{ marginBottom: 18 }}>
          <div>
            <div className="muted" style={{ fontSize: 14, fontWeight: 600 }}>
              {greeting},
            </div>
            <h1 className="display" style={{ fontSize: 28 }}>
              {state.name} <Icon name={challenge.icon} size={22} className="inline-ic" color="var(--accent)" />
            </h1>
          </div>
          <div className="pill" style={{ background: 'var(--accent-grad)', color: '#fff', border: 'none', boxShadow: 'var(--shadow-glow)' }}>
            <Flame size={14} /> {state.currentDay} day streak
          </div>
        </div>

        {/* hero progress card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', position: 'relative' }}
        >
          <div className="eyebrow" style={{ marginBottom: 4 }}>
            {challenge.name}
          </div>
          <ProgressRing progress={progress} size={196} stroke={15}>
            <div>
              <div className="display" style={{ fontSize: 17, color: 'var(--text-soft)', fontWeight: 500 }}>
                Day
              </div>
              <div className="display" style={{ fontSize: 64, lineHeight: 0.95, margin: '2px 0' }}>
                {state.currentDay}
              </div>
              <div className="muted" style={{ fontSize: 13, fontWeight: 700 }}>
                of {challenge.days}
              </div>
            </div>
          </ProgressRing>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {done}/{total} promises kept
            </div>
            <div className="muted" style={{ fontSize: 13.5, marginTop: 2 }}>
              {allDone ? (
                <>
                  <Icon name="trophy" size={13} className="inline-ic" color="var(--accent)" /> You did it all today — proud of you!
                </>
              ) : (
                `${Math.round(progress * 100)}% · keep going, you've got this`
              )}
            </div>
          </div>
        </motion.div>

        {/* cycle awareness banner */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card"
          style={{ marginTop: 14, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12, background: `linear-gradient(135deg, ${cycle.color}22, rgba(255,255,255,0.6))` }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 13, display: 'grid', placeItems: 'center', background: `${cycle.color}30` }}>
            <Icon name={cycle.icon} size={21} color={cycle.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 13.5 }}>
              {cycle.label} phase
            </div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 1, lineHeight: 1.35 }}>
              {cycle.note}
            </div>
          </div>
        </motion.div>

        {/* daily promises */}
        <div className="row between" style={{ margin: '24px 4px 12px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>Today&apos;s promises</h2>
          <span className="faint" style={{ fontSize: 13, fontWeight: 700 }}>
            {done}/{total}
          </span>
        </div>

        <div className="stack" style={{ marginTop: 0 }}>
          {challenge.tasks.map((task, i) => {
            const isDone = todayDone.includes(task.id)
            const isWater = task.id === 'water'
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.05 }}
              >
                <div
                  className={`task ${isDone ? 'done' : ''}`}
                  onClick={() => {
                    playSound(isDone ? 'tap' : 'pop')
                    void haptic(isDone ? 'light' : 'medium')
                    toggleTask(task.id)
                  }}
                  role="button"
                >
                  <div className="task-emoji">
                    <Icon name={task.icon} size={22} />
                  </div>
                  <div className="task-body">
                    <div className="task-title">{task.title}</div>
                    <div className="task-sub">{task.sub}</div>
                  </div>
                  {isWater && (
                    <IconButton
                      ariaLabel="Open hydration"
                      onClick={() => goHydrate()}
                      className=""
                    >
                      <ChevronRight size={18} />
                    </IconButton>
                  )}
                  <motion.div className={`check ${isDone ? 'on' : ''}`} whileTap={{ scale: 0.8 }}>
                    <AnimatePresence>
                      {isDone && (
                        <motion.span
                          initial={{ scale: 0, rotate: -40 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                          style={{ display: 'grid', placeItems: 'center' }}
                        >
                          <Check size={17} strokeWidth={3.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="faint" style={{ textAlign: 'center', fontSize: 12.5, marginTop: 22, lineHeight: 1.5 }}>
          Five small promises. No streaks-as-shame, no judgment.
          <br />
          The challenge adapts to you.{' '}
          <Icon name="heart-fill" size={12} className="inline-ic" color="var(--accent)" />
        </p>
      </div>
    </div>
  )
}
