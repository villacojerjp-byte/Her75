import { chromium } from 'playwright'
const BASE = process.env.BASE || 'http://localhost:4181'
const KEY = 'her75:state:v1'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 430, height: 880 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate((args) => localStorage.setItem(args.k, args.v), {
  k: KEY,
  v: JSON.stringify({ onboarded: true, challengeId: 'soft', currentDay: 12, name: 'Sofia', cycle: 'menstrual', waterMl: 1500, history: { 12: ['move', 'read'] } }),
})
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(700)
await page.locator('.tab').nth(3).click()
await page.waitForTimeout(1200)
await page.locator('.scroll').last().evaluate((el) => el.scrollTo({ top: el.scrollHeight, behavior: 'instant' }))
await page.waitForTimeout(900)
await page.screenshot({ path: 'shots/06b-profile-settings.png' })
await browser.close()
console.log('done')
