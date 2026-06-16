/* ============================================================
   haptics.ts — light haptic feedback.
   Uses the Capacitor Haptics plugin when running natively,
   and falls back to the web Vibration API in the browser.
   ============================================================ */

import { Capacitor } from '@capacitor/core'

type Style = 'light' | 'medium' | 'heavy' | 'success'

export async function haptic(style: Style = 'light') {
  try {
    if (Capacitor.isNativePlatform()) {
      const { Haptics, ImpactStyle, NotificationType } = await import('@capacitor/haptics')
      if (style === 'success') {
        await Haptics.notification({ type: NotificationType.Success })
      } else {
        const map = {
          light: ImpactStyle.Light,
          medium: ImpactStyle.Medium,
          heavy: ImpactStyle.Heavy,
        } as const
        await Haptics.impact({ style: map[style] })
      }
      return
    }
  } catch {
    /* fall through to web vibration */
  }

  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    const pattern = style === 'success' ? [10, 40, 18] : style === 'heavy' ? 24 : style === 'medium' ? 14 : 8
    try {
      navigator.vibrate(pattern as number | number[])
    } catch {
      /* ignore */
    }
  }
}
