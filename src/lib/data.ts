/* ============================================================
   data.ts — challenge presets, default habits, seed friends.
   Icons are Bootstrap Icon names (see lib/icons.tsx).
   ============================================================ */

import type { IconName } from './icons'

export type Task = {
  id: string
  icon: IconName
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
  icon: IconName
  tasks: Task[]
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'soft',
    name: '75 Soft',
    tagline: 'Gentle, sustainable, kind to your body.',
    days: 75,
    intensity: 'soft',
    icon: 'flower1',
    gradient: 'linear-gradient(135deg, #ffd9e7 0%, #ffb3d1 100%)',
    tasks: [
      { id: 'move', icon: 'person-arms-up', title: 'Move your body', sub: '45 min · 1 rest day / week' },
      { id: 'water', icon: 'droplet', title: 'Hydrate', sub: 'Scaled to your phase' },
      { id: 'read', icon: 'book', title: 'Read 10 pages', sub: 'Any book you love' },
      { id: 'eat', icon: 'egg-fried', title: 'Eat with intention', sub: 'Nourish, don’t restrict' },
      { id: 'photo', icon: 'camera', title: 'One daily photo', sub: 'Track your glow' },
    ],
  },
  {
    id: 'medium',
    name: '75 Medium',
    tagline: 'The balanced middle path to your goals.',
    days: 75,
    intensity: 'medium',
    icon: 'flower2',
    gradient: 'linear-gradient(135deg, #e2c6ff 0%, #b894f5 100%)',
    tasks: [
      { id: 'move', icon: 'person-walking', title: '45 min workout', sub: 'Daily movement' },
      { id: 'water', icon: 'droplet', title: 'Drink 3 L water', sub: 'Cycle-aware target' },
      { id: 'read', icon: 'book', title: 'Read 10 pages', sub: 'Growth or fiction' },
      { id: 'eat', icon: 'egg-fried', title: 'Follow your diet', sub: 'One mindful treat ok' },
      { id: 'photo', icon: 'camera', title: 'Progress photo', sub: 'Same time daily' },
    ],
  },
  {
    id: 'hard',
    name: '75 Hard',
    tagline: 'No compromises. Become unrecognizable.',
    days: 75,
    intensity: 'hard',
    icon: 'fire',
    gradient: 'linear-gradient(135deg, #ffb199 0%, #ff6f91 100%)',
    tasks: [
      { id: 'move1', icon: 'activity', title: 'Two 45-min workouts', sub: 'One must be outdoors' },
      { id: 'water', icon: 'droplet', title: 'Drink 1 gallon', sub: 'No exceptions' },
      { id: 'read', icon: 'book', title: 'Read 10 pages', sub: 'Non-fiction only' },
      { id: 'eat', icon: 'basket', title: 'Strict diet', sub: 'No alcohol, no cheats' },
      { id: 'photo', icon: 'camera', title: 'Progress photo', sub: 'Every single day' },
    ],
  },
  {
    id: 'glow',
    name: 'Glow Within',
    tagline: 'Radiance from the inside out.',
    days: 75,
    intensity: 'soft',
    icon: 'stars',
    gradient: 'linear-gradient(135deg, #ffe9c7 0%, #ffc785 100%)',
    tasks: [
      { id: 'skin', icon: 'moisture', title: 'Skincare ritual', sub: 'AM + PM' },
      { id: 'water', icon: 'droplet', title: 'Hydrate', sub: '2.5 L water' },
      { id: 'move', icon: 'person-walking', title: 'Walk 8k steps', sub: 'Fresh air bonus' },
      { id: 'sleep', icon: 'moon-stars', title: '8 hours sleep', sub: 'Screens off by 10' },
      { id: 'grat', icon: 'heart', title: 'Gratitude note', sub: 'Three good things' },
    ],
  },
  {
    id: 'better',
    name: 'Better Me',
    tagline: 'Small promises, big transformation.',
    days: 75,
    intensity: 'medium',
    icon: 'gem',
    gradient: 'linear-gradient(135deg, #c7f0ff 0%, #86c5f5 100%)',
    tasks: [
      { id: 'move', icon: 'activity', title: 'Move 30 min', sub: 'Anything counts' },
      { id: 'water', icon: 'droplet', title: 'Drink 2.5 L', sub: 'Stay hydrated' },
      { id: 'learn', icon: 'lightbulb', title: 'Learn something', sub: '15 min / day' },
      { id: 'eat', icon: 'cup-hot', title: 'Eat mindfully', sub: 'No late snacking' },
      { id: 'journal', icon: 'journal-text', title: 'Journal', sub: 'Reflect on the day' },
    ],
  },
  {
    id: 'sugarfree',
    name: 'Sugar Free',
    tagline: 'Break up with refined sugar.',
    days: 75,
    intensity: 'medium',
    icon: 'cup-straw',
    gradient: 'linear-gradient(135deg, #ffd1e8 0%, #ff8fb8 100%)',
    tasks: [
      { id: 'nosugar', icon: 'slash-circle', title: 'No refined sugar', sub: 'Read the labels' },
      { id: 'water', icon: 'droplet', title: 'Drink 2.5 L', sub: 'Crush cravings' },
      { id: 'move', icon: 'activity', title: 'Move your body', sub: '30 min daily' },
      { id: 'fruit', icon: 'basket', title: 'Whole foods', sub: 'Nature’s candy' },
      { id: 'photo', icon: 'camera', title: 'Progress photo', sub: 'Watch the glow' },
    ],
  },
  {
    id: 'mental',
    name: 'Mental Wellness',
    tagline: 'A calmer, clearer, softer mind.',
    days: 75,
    intensity: 'soft',
    icon: 'peace',
    gradient: 'linear-gradient(135deg, #d8f5e3 0%, #93dcc0 100%)',
    tasks: [
      { id: 'med', icon: 'peace', title: 'Meditate', sub: '10 min stillness' },
      { id: 'water', icon: 'droplet', title: 'Hydrate', sub: '2 L water' },
      { id: 'walk', icon: 'tree', title: 'Mindful walk', sub: 'Phone-free' },
      { id: 'grat', icon: 'heart', title: 'Gratitude', sub: 'Three things' },
      { id: 'sleep', icon: 'moon-stars', title: 'Wind-down ritual', sub: 'No screens at night' },
    ],
  },
]

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export const CYCLE: Record<CyclePhase, { label: string; icon: IconName; water: number; note: string; color: string }> = {
  menstrual: { label: 'Menstrual', icon: 'flower1', water: 3.0, note: 'Rest is productive. Water target raised to 3 L.', color: '#f07aa0' },
  follicular: { label: 'Follicular', icon: 'flower3', water: 2.5, note: 'Energy is rising — a great day to move.', color: '#9bd6b0' },
  ovulation: { label: 'Ovulation', icon: 'brightness-high', water: 2.7, note: 'Peak energy. Push a little harder today.', color: '#f0c46a' },
  luteal: { label: 'Luteal', icon: 'moon-stars', water: 2.8, note: 'Slow down, be gentle. Extra hydration helps.', color: '#b49ae8' },
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
  { id: 'a1', who: 'Aria', avatar: 'A', color: 'linear-gradient(135deg,#ffc6a0,#ff8f6b)', text: 'Hit Day 31! The halfway glow is real.', time: '1h', reactions: 12, kind: 'milestone' },
  { id: 'a2', who: 'Sofia', avatar: 'S', color: 'linear-gradient(135deg,#f7a8c4,#e85f97)', text: 'Completed all 5 promises today. So proud.', time: '2h', reactions: 8, kind: 'win' },
  { id: 'a3', who: 'Priya', avatar: 'P', color: 'linear-gradient(135deg,#f6c453,#e7a020)', text: 'Outdoor workout done before sunrise.', time: '5h', reactions: 15, kind: 'photo' },
  { id: 'a4', who: 'Maya', avatar: 'M', color: 'linear-gradient(135deg,#c3a9f2,#8a6fe0)', text: '“Discipline is choosing what you want most.”', time: '8h', reactions: 6, kind: 'note' },
]

export const FOOD_INSPO: IconName[] = ['egg-fried', 'cup-hot', 'basket', 'cup-straw', 'egg', 'flower1', 'cup', 'basket2', 'droplet']

export const BOOK_WISHLIST: { title: string; author: string; icon: IconName }[] = [
  { title: 'Atomic Habits', author: 'James Clear', icon: 'arrow-repeat' },
  { title: 'The Body Keeps the Score', author: 'B. van der Kolk', icon: 'heart-pulse' },
  { title: 'Big Magic', author: 'E. Gilbert', icon: 'stars' },
  { title: 'Untamed', author: 'Glennon Doyle', icon: 'magic' },
]
