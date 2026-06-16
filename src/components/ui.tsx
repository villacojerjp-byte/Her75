/* ============================================================
   ui.tsx — reusable building blocks with built-in sound + haptics.
   ============================================================ */

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { playSound, primeAudio } from '../lib/sound'
import { haptic } from '../lib/haptics'

type SoundName = Parameters<typeof playSound>[0]

/* ---- SoundButton: every button click plays a sound + haptic ---- */
export function SoundButton({
  children,
  onClick,
  className = '',
  sound = 'click',
  haptics = 'light',
  style,
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  sound?: SoundName
  haptics?: 'light' | 'medium' | 'heavy' | 'success' | false
  style?: React.CSSProperties
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`btn ${className}`}
      style={style}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (disabled) return
        primeAudio()
        playSound(sound)
        if (haptics) void haptic(haptics)
        onClick?.()
      }}
    >
      {children}
    </motion.button>
  )
}

/* ---- Tappable: any element that should click with sound ---- */
export function Tappable({
  children,
  onClick,
  className = '',
  sound = 'tap',
  haptics = 'light',
  style,
  as = 'div',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  sound?: SoundName
  haptics?: 'light' | 'medium' | 'heavy' | 'success' | false
  style?: React.CSSProperties
  as?: 'div' | 'button'
}) {
  const Comp: any = as === 'button' ? motion.button : motion.div
  return (
    <Comp
      className={className}
      style={style}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        primeAudio()
        playSound(sound)
        if (haptics) void haptic(haptics)
        onClick?.()
      }}
    >
      {children}
    </Comp>
  )
}

/* ---- IconButton ---- */
export function IconButton({
  children,
  onClick,
  sound = 'tap',
  className = '',
  ariaLabel,
}: {
  children: ReactNode
  onClick?: () => void
  sound?: SoundName
  className?: string
  ariaLabel?: string
}) {
  return (
    <motion.button
      aria-label={ariaLabel}
      className={`icon-btn ${className}`}
      whileTap={{ scale: 0.88 }}
      onClick={() => {
        primeAudio()
        playSound(sound)
        void haptic('light')
        onClick?.()
      }}
    >
      {children}
    </motion.button>
  )
}

/* ---- ProgressRing: gradient circular progress ---- */
export function ProgressRing({
  progress,
  size = 188,
  stroke = 14,
  children,
  trackColor = 'rgba(214,63,126,0.13)',
}: {
  progress: number // 0..1
  size?: number
  stroke?: number
  children?: ReactNode
  trackColor?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, progress))
  const offset = c * (1 - clamped)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9a8c9" />
            <stop offset="55%" stopColor="#e85f97" />
            <stop offset="100%" stopColor="#b463c8" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', stiffness: 60, damping: 16 }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ---- Faux iOS status bar for the phone frame ---- */
export function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <div className="dots">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
      <path d="M8.5 11.5l2.2-2.7a3.4 3.4 0 00-4.4 0l2.2 2.7zM8.5 5.2c1.8 0 3.5.66 4.8 1.85l1.6-1.95A9.6 9.6 0 008.5 2.4 9.6 9.6 0 002.1 5.1l1.6 1.95A7.2 7.2 0 018.5 5.2z" />
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity="0.45" />
      <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
      <rect x="24" y="4" width="2" height="5" rx="1" fill="currentColor" opacity="0.45" />
    </svg>
  )
}
