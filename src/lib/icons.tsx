/* ============================================================
   icons.tsx — Bootstrap Icons registry.
   Maps stable string keys (used in data) to react-bootstrap-icons
   components, and exposes a small <Icon name="..." /> renderer.
   Named imports keep the bundle tree-shaken to only what's used.
   ============================================================ */

import type { CSSProperties } from 'react'
import {
  Flower1,
  Flower2,
  Flower3,
  Fire,
  Stars,
  Gem,
  CupStraw,
  Peace,
  PersonArmsUp,
  PersonWalking,
  Activity,
  Bicycle,
  Tree,
  Droplet,
  DropletHalf,
  Book,
  EggFried,
  Egg,
  Basket,
  Basket2,
  Camera,
  Moisture,
  MoonStars,
  Heart,
  HeartFill,
  HeartPulse,
  Lightbulb,
  JournalText,
  SlashCircle,
  BrightnessHigh,
  Cup,
  CupHot,
  ArrowRepeat,
  Magic,
  Trophy,
} from 'react-bootstrap-icons'

export const ICONS = {
  flower1: Flower1,
  flower2: Flower2,
  flower3: Flower3,
  fire: Fire,
  stars: Stars,
  gem: Gem,
  'cup-straw': CupStraw,
  peace: Peace,
  'person-arms-up': PersonArmsUp,
  'person-walking': PersonWalking,
  activity: Activity,
  bicycle: Bicycle,
  tree: Tree,
  droplet: Droplet,
  'droplet-half': DropletHalf,
  book: Book,
  'egg-fried': EggFried,
  egg: Egg,
  basket: Basket,
  basket2: Basket2,
  camera: Camera,
  moisture: Moisture,
  'moon-stars': MoonStars,
  heart: Heart,
  'heart-fill': HeartFill,
  'heart-pulse': HeartPulse,
  lightbulb: Lightbulb,
  'journal-text': JournalText,
  'slash-circle': SlashCircle,
  'brightness-high': BrightnessHigh,
  cup: Cup,
  'cup-hot': CupHot,
  'arrow-repeat': ArrowRepeat,
  magic: Magic,
  trophy: Trophy,
} as const

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  size = 24,
  color,
  className,
  style,
}: {
  name: IconName
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
}) {
  const C = ICONS[name]
  if (!C) return null
  return <C size={size} color={color} className={className} style={style} aria-hidden />
}
