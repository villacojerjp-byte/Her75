/* ============================================================
   data.ts — challenge presets, default habits, seed friends.
   ============================================================ */

export type Task = {
  id: string
  emoji: string
  title: string
  sub: string
}

export type Challenge = {
  id: string
  name: string
  tagline: string
  days: number
  intensity: 'soft' | 'medium' | 'hard'
  gradient: string
  emoji: string
  tasks: Task[]
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'soft',
    name: '75 Soft',
    tagline: 'Gentle, sustainable, kind to your body.',
    days: 75,
    intensity: 'soft',
    emoji: '🌸',
    gradient: 'linear-gradient(135deg, #ffd9e7 0%, #ffb3d1 100%)',
    tasks: [
      { id: 'move', emoji: '🧘‍♀️', title: 'Move your body', sub: '45 min · 1 rest day / week' },
      { id: 'water', emoji: '💧', title: 'Hydrate', sub: 'Scaled to your phase' },
      { id: 'read', emoji: '📖', title: 'Read 10 pages', sub: 'Any book you love' },
      { id: 'eat', emoji: '🥗', title: 'Eat with intention', sub: 'Nourish, don’t restrict' },
      { id: 'photo', emoji: '📸', title: 'One daily photo', sub: 'Track your glow' },
    ],
  },
  {
    id: 'medium',
    name: '75 Medium',
    tagline: 'The balanced middle path to your goals.',
    days: 75,
    intensity: 'medium',
    emoji: '🌷',
    gradient: 'linear-gradient(135deg, #e2c6ff 0%, #b894f5 100%)',
    tasks: [
      { id: 'move', emoji: '🏃‍♀️', title: '45 min workout', sub: 'Daily movement' },
      { id: 'water', emoji: '💧', title: 'Drink 3 L water', sub: 'Cycle-aware target' },
      { id: 'read', emoji: '📖', title: 'Read 10 pages', sub: 'Growth or fiction' },
      { id: 'eat', emoji: '🥑', title: 'Follow your diet', sub: 'One mindful treat ok' },
      { id: 'photo', emoji: '📸', title: 'Progress photo', sub: 'Same time daily' },
    ],
  },
  {
    id: 'hard',
    name: '75 Hard',
    tagline: 'No compromises. Become unrecognizable.',
    days: 75,
    intensity: 'hard',
    emoji: '🔥',
    gradient: 'linear-gradient(135deg, #ffb199 0%, #ff6f91 100%)',
    tasks: [
      { id: 'move1', emoji: '💪', title: 'Two 45-min workouts', sub: 'One must be outdoors' },
      { id: 'water', emoji: '💧', title: 'Drink 1 gallon', sub: 'No exceptions' },
      { id: 'read', emoji: '📚', title: 'Read 10 pages', sub: 'Non-fiction only' },
      { id: 'eat', emoji: '🍓', title: 'Strict diet', sub: 'No alcohol, no cheats' },
      { id: 'photo', emoji: '📸', title: 'Progress photo', sub: 'Every single day' },
    ],
  },
  {
    id: 'glow',
    name: 'Glow Within',
    tagline: 'Radiance from the inside out.',
    days: 75,
    intensity: 'soft',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #ffe9c7 0%, #ffc785 100%)',
    tasks: [
      { id: 'skin', emoji: '🧴', title: 'Skincare ritual', sub: 'AM + PM' },
      { id: 'water', emoji: '💧', title: 'Hydrate', sub: '2.5 L water' },
      { id: 'move', emoji: '🚶‍♀️', title: 'Walk 8k steps', sub: 'Fresh air bonus' },
      { id: 'sleep', emoji: '😴', title: '8 hours sleep', sub: 'Screens off by 10' },
      { id: 'grat', emoji: '💛', title: 'Gratitude note', sub: 'Three good things' },
    ],
  },
  {
    id: 'better',
    name: 'Better Me',
    tagline: 'Small promises, big transformation.',
    days: 75,
    intensity: 'medium',
    emoji: '🦋',
    gradient: 'linear-gradient(135deg, #c7f0ff 0%, #86c5f5 100%)',
    tasks: [
      { id: 'move', emoji: '🏋️‍♀️', title: 'Move 30 min', sub: 'Anything counts' },
      { id: 'water', emoji: '💧', title: 'Drink 2.5 L', sub: 'Stay hydrated' },
      { id: 'learn', emoji: '🧠', title: 'Learn something', sub: '15 min / day' },
      { id: 'eat', emoji: '🍵', title: 'Eat mindfully', sub: 'No late snacking' },
      { id: 'journal', emoji: '📝', title: 'Journal', sub: 'Reflect on the day' },
    ],
  },
  {
    id: 'sugarfree',
    name: 'Sugar Free',
    tagline: 'Break up with refined sugar.',
    days: 75,
    intensity: 'medium',
    emoji: '🍓',
    gradient: 'linear-gradient(135deg, #ffd1e8 0%, #ff8fb8 100%)',
    tasks: [
      { id: 'nosugar', emoji: '🚫', title: 'No refined sugar', sub: 'Read the labels' },
      { id: 'water', emoji: '💧', title: 'Drink 2.5 L', sub: 'Crush cravings' },
      { id: 'move', emoji: '🤸‍♀️', title: 'Move your body', sub: '30 min daily' },
      { id: 'fruit', emoji: '🍎', title: 'Whole foods', sub: 'Nature’s candy' },
      { id: 'photo', emoji: '📸', title: 'Progress photo', sub: 'Watch the glow' },
    ],
  },
  {
    id: 'mental',
    name: 'Mental Wellness',
    tagline: 'A calmer, clearer, softer mind.',
    days: 75,
    intensity: 'soft',
    emoji: '🕊️',
    gradient: 'linear-gradient(135deg, #d8f5e3 0%, #93dcc0 100%)',
    tasks: [
      { id: 'med', emoji: '🧘‍♀️', title: 'Meditate', sub: '10 min stillness' },
      { id: 'water', emoji: '💧', title: 'Hydrate', sub: '2 L water' },
      { id: 'walk', emoji: '🌿', title: 'Mindful walk', sub: 'Phone-free' },
      { id: 'grat', emoji: '💗', title: 'Gratitude', sub: 'Three things' },
      { id: 'sleep', emoji: '🌙', title: 'Wind-down ritual', sub: 'No screens at night' },
    ],
  },
]

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export const CYCLE: Record<CyclePhase, { label: string; emoji: string; water: number; note: string; color: string }> = {
  menstrual: { label: 'Menstrual', emoji: '🌹', water: 3.0, note: 'Rest is productive. Water target raised to 3 L.', color: '#f07aa0' },
  follicular: { label: 'Follicular', emoji: '🌱', water: 2.5, note: 'Energy is rising — a great day to move.', color: '#9bd6b0' },
  ovulation: { label: 'Ovulation', emoji: '☀️', water: 2.7, note: 'Peak energy. Push a little harder today.', color: '#f0c46a' },
  luteal: { label: 'Luteal', emoji: '🌙', water: 2.8, note: 'Slow down, be gentle. Extra hydration helps.', color: '#b49ae8' },
}

export type Friend = {
  id: string
  name: string
  avatar: string
  color: string
  day: number
  done: number
  total: number
  challenge: string
  streak: number
  lastActive: string
}

export const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Sofia', avatar: 'S', color: 'linear-gradient(135deg,#f7a8c4,#e85f97)', day: 14, done: 5, total: 5, challenge: '75 Soft', streak: 14, lastActive: 'just now' },
  { id: 'f2', name: 'Maya', avatar: 'M', color: 'linear-gradient(135deg,#c3a9f2,#8a6fe0)', day: 12, done: 3, total: 5, challenge: '75 Medium', streak: 9, lastActive: '20m ago' },
  { id: 'f3', name: 'Aria', avatar: 'A', color: 'linear-gradient(135deg,#ffc6a0,#ff8f6b)', day: 31, done: 4, total: 5, challenge: 'Glow Within', streak: 31, lastActive: '1h ago' },
  { id: 'f4', name: 'Lena', avatar: 'L', color: 'linear-gradient(135deg,#9be0c0,#5cc99a)', day: 8, done: 2, total: 5, challenge: 'Mental Wellness', streak: 8, lastActive: '3h ago' },
  { id: 'f5', name: 'Priya', avatar: 'P', color: 'linear-gradient(135deg,#f6c453,#e7a020)', day: 22, done: 5, total: 5, challenge: '75 Hard', streak: 22, lastActive: '5h ago' },
]

export type FeedItem = {
  id: string
  who: string
  avatar: string
  color: string
  text: string
  time: string
  reactions: number
  kind: 'win' | 'milestone' | 'photo' | 'note'
}

export const FEED: FeedItem[] = [
  { id: 'a1', who: 'Aria', avatar: 'A', color: 'linear-gradient(135deg,#ffc6a0,#ff8f6b)', text: 'Hit Day 31! Halfway glow is real ✨', time: '1h', reactions: 12, kind: 'milestone' },
  { id: 'a2', who: 'Sofia', avatar: 'S', color: 'linear-gradient(135deg,#f7a8c4,#e85f97)', text: 'Completed all 5 promises today 🥹💪', time: '2h', reactions: 8, kind: 'win' },
  { id: 'a3', who: 'Priya', avatar: 'P', color: 'linear-gradient(135deg,#f6c453,#e7a020)', text: 'Outdoor workout done before sunrise 🌅', time: '5h', reactions: 15, kind: 'photo' },
  { id: 'a4', who: 'Maya', avatar: 'M', color: 'linear-gradient(135deg,#c3a9f2,#8a6fe0)', text: '“Discipline is choosing what you want most.” 📖', time: '8h', reactions: 6, kind: 'note' },
]

export const FOOD_INSPO = ['🥗', '🍓', '🥑', '🍵', '🫐', '🥥', '🍑', '🥒', '🍋']
export const BOOK_WISHLIST = [
  { title: 'Atomic Habits', author: 'James Clear', emoji: '⚛️' },
  { title: 'The Body Keeps the Score', author: 'B. van der Kolk', emoji: '🧠' },
  { title: 'Big Magic', author: 'E. Gilbert', emoji: '✨' },
  { title: 'Untamed', author: 'Glennon Doyle', emoji: '🦋' },
]
