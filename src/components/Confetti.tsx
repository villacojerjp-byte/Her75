/* ============================================================
   Confetti.tsx — a little celebration burst.
   ============================================================ */

import { motion } from 'framer-motion'

const COLORS = ['#f48fb6', '#e85f97', '#c3a9f2', '#ffc785', '#84d6ae', '#f6c453']

export default function Confetti({ show }: { show: boolean }) {
  if (!show) return null
  const pieces = Array.from({ length: 26 })
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 40 }}>
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2
        const dist = 120 + (i % 5) * 30
        const x = Math.cos(angle) * dist
        const y = Math.sin(angle) * dist - 40
        const color = COLORS[i % COLORS.length]
        return (
          <motion.span
            key={i}
            className="confetti-dot"
            style={{ background: color }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x, y, opacity: 0, rotate: 360 + i * 20, scale: 0.6 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}
