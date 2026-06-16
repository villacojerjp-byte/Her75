import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:4173'
const KEY = 'her75:state:v1'

const seed = (extra) =>
  JSON.stringify({
    onboarded: true,
    challengeId: 'soft',
    currentDay: 12,
    name: 'Sofia',
    cycle: 'menstrual',
    waterMl: 1500,
    waterGoalMl: 3000,
    history: { 12: ['move', 'read'] },
    ...extra,
  })

async function waitForServer(page) {
  for (let i = 0; i < 40; i++) {
    try {
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 2000 })
      return true
    } catch {
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  throw new Error('server never came up')
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 430, height: 880 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

await waitForServer(page)

// 1) Onboarding (fresh)
await page.evaluate((k) => localStorage.removeItem(k), KEY)
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: 'shots/01-onboarding.png' })

// 2) Challenge select
await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ onboarded: true })), KEY)
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1100)
await page.screenshot({ path: 'shots/02-challenges.png' })

// 2b) pick a card to reveal sticky CTA
await page.getByText('Glow Within').click().catch(() => {})
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/02b-challenge-picked.png' })

// 3) Today
await page.evaluate((args) => localStorage.setItem(args.k, args.v), { k: KEY, v: seed() })
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: 'shots/03-today.png' })

const tabs = page.locator('.tab')

// add some water first so the glass shows a fill
// 4) Hydrate (tab index 1)
await tabs.nth(1).click()
await page.waitForTimeout(1500)
await page.screenshot({ path: 'shots/04-hydrate.png' })

// 5) Friends (tab index 2)
await tabs.nth(2).click()
await page.waitForTimeout(1500)
await page.screenshot({ path: 'shots/05-friends.png' })

// 5b) Friends feed tab
await page.getByText('Feed', { exact: true }).click().catch(() => {})
await page.waitForTimeout(900)
await page.screenshot({ path: 'shots/05b-friends-feed.png' })

// 6) Profile (tab index 3)
await tabs.nth(3).click()
await page.waitForTimeout(1500)
await page.screenshot({ path: 'shots/06-profile.png' })

await browser.close()
console.log('done')
