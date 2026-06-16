/* ============================================================
   Hydrate.tsx — cycle-aware water tracker with fill animation.
   ============================================================ */

import { motion } from 'framer-motion'
import { Plus, RotateCcw, Droplet } from 'lucide-react'
import { useApp } from '../lib/store'
import { CYCLE } from '../lib/data'
import { SoundButton, Tappable } from '../components/ui'
import { playSound } from '../lib/sound'
import { haptic } from '../lib/haptics'

const QUICK = [
  { ml: 250, label: 'Glass', emoji: '🥛' },
  { ml: 500, label: 'Bottle', emoji: '🍶' },
  { ml: 750, label: 'Flask', emoji: '🧴' },
]

export default function Hydrate() {
  const { state, addWater, resetWater, setCycle } = useApp()
  const cycle = CYCLE[state.cycle]
  const goal = Math.round(cycle.water * 1000)
  const pct = Math.max(0, Math.min(1, state.waterMl / goal))
  const liters = (state.waterMl / 1000).toFixed(2)

  const drink = (ml: number) => {
    playSound('water')
    void haptic('medium')
    addWater(ml)
  }

  return (
    <div className="screen">
      <div className="scroll">
        <div style={{ paddingTop: 4, marginBottom: 16 }}>
          <span className="eyebrow">Hydration</span>
          <h1 className="display" style={{ fontSize: 30, marginTop: 6 }}>
            Drink up, gorgeous 💧
          </h1>
        </div>

        {/* glass fill visual */}
        <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              position: 'relative',
              width: 116,
              height: 168,
              flexShrink: 0,
              borderRadius: '18px 18px 26px 26px',
              background: 'rgba(255,255,255,0.55)',
              border: '3px solid rgba(255,255,255,0.9)',
              boxShadow: 'inset 0 2px 12px rgba(120,80,150,0.12)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={false}
              animate={{ height: `${pct * 100}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, #8fd3ff 0%, #5fb6f5 60%, #4f97e8 100%)',
              }}
            >
              {/* wave top */}
              <svg viewBox="0 0 120 12" preserveAspectRatio="none" style={{ position: 'absolute', top: -10, left: 0, width: '100%', height: 12 }}>
                <motion.path
                  d="M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 V12 H0 Z"
                  fill="#8fd3ff"
                  animate={{ d: ['M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 V12 H0 Z', 'M0 6 Q 15 12 30 6 T 60 6 T 90 6 T 120 6 V12 H0 Z', 'M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 V12 H0 Z'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <Droplet size={30} color={pct > 0.5 ? '#fff' : '#7fc1f0'} fill={pct > 0.5 ? 'rgba(255,255,255,0.5)' : 'none'} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 44, lineHeight: 1 }}>
              {liters}
              <span style={{ fontSize: 19, color: 'var(--text-soft)' }}> L</span>
            </div>
            <div className="muted" style={{ fontSize: 14, marginTop: 2, fontWeight: 600 }}>
              of {cycle.water} L goal
            </div>
            <div className="bar" style={{ marginTop: 14 }}>
              <motion.i animate={{ width: `${pct * 100}%` }} transition={{ type: 'spring', stiffness: 90, damping: 18 }} />
            </div>
            <div className="faint" style={{ fontSize: 12.5, marginTop: 8 }}>
              {pct >= 1 ? '🎉 Goal smashed!' : `${Math.round(goal - state.waterMl)} ml to go`}
            </div>
          </div>
        </div>

        {/* quick add */}
        <h2 style={{ fontSize: 16, fontWeight: 800, margin: '22px 4px 12px' }}>Quick add</h2>
        <div className="row gap-3">
          {QUICK.map((q) => (
            <Tappable
              key={q.ml}
              sound="water"
              haptics="medium"
              onClick={() => drink(q.ml)}
              className="card"
              style={{ flex: 1, padding: '16px 10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            >
              <div style={{ fontSize: 28 }}>{q.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>+{q.ml}ml</div>
              <div className="faint" style={{ fontSize: 11.5 }}>{q.label}</div>
            </Tappable>
          ))}
        </div>

        <div className="row gap-3" style={{ marginTop: 14 }}>
          <SoundButton className="block" sound="water" haptics="medium" onClick={() => drink(100)}>
            <Plus size={18} /> Add 100ml
          </SoundButton>
          <SoundButton
            className="ghost"
            sound="tap"
            onClick={() => {
              playSound('whoosh')
              resetWater()
            }}
            style={{ flexShrink: 0 }}
          >
            <RotateCcw size={18} />
          </SoundButton>
        </div>

        {/* cycle selector — drives the goal */}
        <h2 style={{ fontSize: 16, fontWeight: 800, margin: '26px 4px 12px' }}>Your cycle phase</h2>
        <p className="muted" style={{ fontSize: 13, margin: '0 4px 12px', lineHeight: 1.4 }}>
          We raise or lower your water goal to match your body’s needs.
        </p>
        <div className="row gap-2 wrap">
          {(Object.keys(CYCLE) as (keyof typeof CYCLE)[]).map((key) => {
            const c = CYCLE[key]
            const on = state.cycle === key
            return (
              <Tappable
                key={key}
                sound="tap"
                onClick={() => setCycle(key)}
                className="card"
                style={{
                  flex: '1 1 44%',
                  padding: '13px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  outline: on ? `2px solid ${c.color}` : '2px solid transparent',
                  background: on ? `linear-gradient(135deg, ${c.color}26, rgba(255,255,255,0.6))` : 'var(--card)',
                }}
              >
                <span style={{ fontSize: 22 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13.5 }}>{c.label}</div>
                  <div className="faint" style={{ fontSize: 11.5 }}>{c.water} L goal</div>
                </div>
              </Tappable>
            )
          })}
        </div>
      </div>
    </div>
  )
}
