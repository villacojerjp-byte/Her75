/* ============================================================
   Friends.tsx — social accountability: live progress + feed.
   ============================================================ */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Flame, UserPlus, MessageCircle } from 'lucide-react'
import { FRIENDS, FEED } from '../lib/data'
import { Tappable, SoundButton } from '../components/ui'
import { Icon } from '../lib/icons'
import { playSound } from '../lib/sound'
import { haptic } from '../lib/haptics'

export default function Friends() {
  const [tab, setTab] = useState<'progress' | 'feed'>('progress')
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  const toggleLike = (id: string) => {
    playSound('pop')
    void haptic('light')
    setLiked((l) => ({ ...l, [id]: !l[id] }))
  }

  return (
    <div className="screen">
      <div className="scroll">
        <div className="row between" style={{ paddingTop: 4, marginBottom: 14 }}>
          <div>
            <span className="eyebrow">Your circle</span>
            <h1 className="display" style={{ fontSize: 30, marginTop: 6 }}>
              Better together
            </h1>
          </div>
          <SoundButton className="sm soft" sound="pop">
            <UserPlus size={16} /> Invite
          </SoundButton>
        </div>

        {/* segmented */}
        <div className="seg" style={{ marginBottom: 18 }}>
          {(['progress', 'feed'] as const).map((t) => {
            const on = tab === t
            return (
              <button
                key={t}
                className={on ? 'active' : ''}
                onClick={() => {
                  playSound('tap')
                  void haptic('light')
                  setTab(t)
                }}
              >
                {on && <motion.span layoutId="friends-seg" className="seg-ind" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                {t === 'progress' ? 'Live progress' : 'Feed'}
              </button>
            )
          })}
        </div>

        {tab === 'progress' ? (
          <div className="stack">
            {FRIENDS.map((f, i) => {
              const pct = f.done / f.total
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card"
                  style={{ padding: 15 }}
                >
                  <div className="row gap-3">
                    <div className="avatar" style={{ width: 50, height: 50, fontSize: 19, background: f.color }}>
                      {f.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="row between">
                        <div style={{ fontWeight: 800, fontSize: 15.5 }}>{f.name}</div>
                        <span className="pill" style={{ padding: '3px 9px', fontSize: 11 }}>
                          <Flame size={12} /> {f.streak}
                        </span>
                      </div>
                      <div className="faint" style={{ fontSize: 12, marginTop: 1 }}>
                        Day {f.day} · {f.challenge} · {f.lastActive}
                      </div>
                      <div className="row gap-2" style={{ marginTop: 9 }}>
                        <div className="bar grow">
                          <motion.i initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 80, damping: 16 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: pct === 1 ? '#5cc99a' : 'var(--text-soft)' }}>
                          {f.done}/{f.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            <p className="faint" style={{ textAlign: 'center', fontSize: 12.5, marginTop: 8 }}>
              You can see their promises in real time.{' '}
              <Icon name="heart-fill" size={12} className="inline-ic" color="var(--accent)" />
            </p>
          </div>
        ) : (
          <div className="stack">
            {FEED.map((post, i) => {
              const isLiked = liked[post.id]
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card"
                  style={{ padding: 15 }}
                >
                  <div className="row gap-3" style={{ alignItems: 'flex-start' }}>
                    <div className="avatar" style={{ width: 42, height: 42, fontSize: 16, background: post.color }}>
                      {post.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="row between">
                        <span style={{ fontWeight: 800, fontSize: 14.5 }}>{post.who}</span>
                        <span className="faint" style={{ fontSize: 12 }}>{post.time}</span>
                      </div>
                      <p style={{ fontSize: 14.5, marginTop: 4, lineHeight: 1.4 }}>{post.text}</p>
                      <div className="row gap-3" style={{ marginTop: 11 }}>
                        <Tappable
                          as="button"
                          sound="pop"
                          haptics={false}
                          onClick={() => toggleLike(post.id)}
                          className="row gap-2"
                          style={{ alignItems: 'center', color: isLiked ? 'var(--accent)' : 'var(--text-faint)', fontWeight: 700, fontSize: 13 }}
                        >
                          <motion.span animate={{ scale: isLiked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }} style={{ display: 'grid', placeItems: 'center' }}>
                            <Heart size={17} fill={isLiked ? 'currentColor' : 'none'} />
                          </motion.span>
                          {post.reactions + (isLiked ? 1 : 0)}
                        </Tappable>
                        <Tappable as="button" sound="tap" haptics={false} className="row gap-2" style={{ alignItems: 'center', color: 'var(--text-faint)', fontWeight: 700, fontSize: 13 }}>
                          <MessageCircle size={16} /> Cheer
                        </Tappable>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
