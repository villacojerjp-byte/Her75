/* ============================================================
   TabBar.tsx — animated bottom navigation.
   ============================================================ */

import { motion } from 'framer-motion'
import { Home, Droplets, Users, Heart } from 'lucide-react'
import type { Tab } from '../lib/store'
import { playSound, primeAudio } from '../lib/sound'
import { haptic } from '../lib/haptics'

const TABS: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'today', label: 'Today', icon: Home },
  { id: 'hydrate', label: 'Hydrate', icon: Droplets },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'profile', label: 'You', icon: Heart },
]

export default function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="tabbar">
      <div className="tabbar-inner">
        {TABS.map(({ id, label, icon: Icon }) => {
          const on = active === id
          return (
            <button
              key={id}
              className={`tab ${on ? 'active' : ''}`}
              onClick={() => {
                if (on) return
                primeAudio()
                playSound('tap')
                void haptic('light')
                onChange(id)
              }}
            >
              {on && (
                <motion.span
                  layoutId="tab-ind"
                  className="tab-ind"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <motion.span
                animate={{ y: on ? -1 : 0, scale: on ? 1.06 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                style={{ display: 'grid', placeItems: 'center' }}
              >
                <Icon size={21} strokeWidth={on ? 2.6 : 2} fill={on ? 'rgba(232,95,151,0.18)' : 'none'} />
              </motion.span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
