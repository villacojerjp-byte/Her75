/* ============================================================
   Profile.tsx — personalization, stats, settings, sound toggle.
   ============================================================ */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, ChevronRight, Sparkles, RefreshCw, Bell, Lock } from 'lucide-react'
import { useApp } from '../lib/store'
import { FOOD_INSPO, BOOK_WISHLIST } from '../lib/data'
import { Tappable, SoundButton } from '../components/ui'
import { isSoundEnabled, setSoundEnabled, playSound } from '../lib/sound'
import { haptic } from '../lib/haptics'

export default function Profile() {
  const { state, challenge, todayDone, reset } = useApp()
  const [soundOn, setSoundOn] = useState(isSoundEnabled())

  const totalDone = Object.values(state.history).reduce((a, b) => a + b.length, 0)
  const completionPct = challenge ? Math.round((state.currentDay / challenge.days) * 100) : 0

  const stats = [
    { label: 'Current day', value: `${state.currentDay}`, sub: `of ${challenge?.days ?? 75}` },
    { label: 'Promises kept', value: `${totalDone}`, sub: 'all-time' },
    { label: 'Journey', value: `${completionPct}%`, sub: 'complete' },
  ]

  return (
    <div className="screen">
      <div className="scroll">
        {/* profile header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', paddingTop: 14, marginBottom: 18 }}>
          <div
            className="avatar"
            style={{ width: 92, height: 92, fontSize: 38, margin: '0 auto 12px', background: 'var(--accent-grad)', boxShadow: 'var(--shadow-glow)' }}
          >
            {state.name?.[0]?.toUpperCase() ?? '🌸'}
          </div>
          <h1 className="display" style={{ fontSize: 28 }}>{state.name}</h1>
          <div className="pill" style={{ marginTop: 8 }}>
            {challenge?.emoji} {challenge?.name ?? 'No challenge yet'} · Day {state.currentDay}
          </div>
        </motion.div>

        {/* stats */}
        <div className="row gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card"
              style={{ flex: 1, padding: '15px 8px', textAlign: 'center' }}
            >
              <div className="display" style={{ fontSize: 27 }}>{s.value}</div>
              <div className="faint" style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
                {s.label}
              </div>
              <div className="faint" style={{ fontSize: 10.5 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* food inspo */}
        <div className="row between" style={{ margin: '24px 4px 12px' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800 }}>Food inspo 🥗</h2>
          <span className="faint" style={{ fontSize: 12.5, fontWeight: 700 }}>Curate</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {FOOD_INSPO.map((emoji, i) => (
            <Tappable
              key={i}
              sound="tap"
              className="card"
              style={{ aspectRatio: '1', display: 'grid', placeItems: 'center', fontSize: 34, background: `linear-gradient(135deg, ${['#ffe3ee','#eee3ff','#e3f5ee'][i % 3]}, rgba(255,255,255,0.6))` }}
            >
              {emoji}
            </Tappable>
          ))}
        </div>

        {/* book wishlist */}
        <h2 style={{ fontSize: 17, fontWeight: 800, margin: '24px 4px 12px' }}>Books wishlist 📚</h2>
        <div className="stack">
          {BOOK_WISHLIST.map((b, i) => (
            <Tappable key={i} sound="tap" className="card" style={{ padding: 13, display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 22, background: 'rgba(255,255,255,0.8)' }}>
                {b.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>{b.title}</div>
                <div className="faint" style={{ fontSize: 12.5 }}>{b.author}</div>
              </div>
              <ChevronRight size={18} className="faint" />
            </Tappable>
          ))}
        </div>

        {/* settings */}
        <h2 style={{ fontSize: 17, fontWeight: 800, margin: '24px 4px 12px' }}>Settings</h2>
        <div className="card" style={{ padding: 6 }}>
          {/* sound toggle */}
          <div className="row between" style={{ padding: '12px 12px' }}>
            <div className="row gap-3">
              <div style={{ width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center', background: 'var(--accent-grad-soft)', color: 'var(--blush-600)' }}>
                {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>Button sounds</div>
                <div className="faint" style={{ fontSize: 12 }}>Satisfying taps & pops</div>
              </div>
            </div>
            <Toggle
              on={soundOn}
              onChange={(v) => {
                setSoundEnabled(v) // plays a confirmation blip when turning on
                setSoundOn(v)
                void haptic('light')
              }}
            />
          </div>

          <Row icon={<Bell size={18} />} title="Reminders" sub="Gentle nudges, never naggy" onClick={() => playSound('tap')} />
          <Row icon={<Sparkles size={18} />} title="Her 75 Pro" sub="Friend feeds & advanced reminders" badge="Upgrade" onClick={() => playSound('chime')} />
          <Row icon={<Lock size={18} />} title="Privacy" sub="You control what friends see" onClick={() => playSound('tap')} />
        </div>

        {/* reset / restart */}
        <SoundButton
          className="ghost block"
          sound="whoosh"
          haptics="medium"
          style={{ marginTop: 16, color: 'var(--blush-600)' }}
          onClick={() => reset()}
        >
          <RefreshCw size={17} /> Restart onboarding
        </SoundButton>

        <p className="faint" style={{ textAlign: 'center', fontSize: 12, marginTop: 18 }}>
          Her 75 · Made with 💗 for women
        </p>
      </div>
    </div>
  )
}

function Row({ icon, title, sub, badge, onClick }: { icon: React.ReactNode; title: string; sub: string; badge?: string; onClick?: () => void }) {
  return (
    <Tappable sound="tap" onClick={onClick} className="row between" style={{ padding: '12px 12px', borderTop: '1px solid rgba(160,110,140,0.1)' }}>
      <div className="row gap-3">
        <div style={{ width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.8)', color: 'var(--plum-700)' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14.5 }}>{title}</div>
          <div className="faint" style={{ fontSize: 12 }}>{sub}</div>
        </div>
      </div>
      {badge ? (
        <span className="pill" style={{ background: 'var(--accent-grad)', color: '#fff', border: 'none', padding: '5px 11px', fontSize: 11 }}>
          {badge}
        </span>
      ) : (
        <ChevronRight size={18} className="faint" />
      )}
    </Tappable>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <motion.button
      onClick={() => onChange(!on)}
      whileTap={{ scale: 0.92 }}
      style={{
        width: 52,
        height: 31,
        borderRadius: 999,
        padding: 3,
        display: 'flex',
        justifyContent: on ? 'flex-end' : 'flex-start',
        background: on ? 'var(--accent-grad)' : 'rgba(160,110,140,0.22)',
        transition: 'background 0.25s',
      }}
    >
      <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} style={{ width: 25, height: 25, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
    </motion.button>
  )
}
