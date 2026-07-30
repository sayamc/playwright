import { test, expect } from '@playwright/test'

test('Login', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.getByText('Welcome back, user@email.com')).toBeVisible()
})

/*  Link Refferent "https://www.checklyhq.com/docs/learn/playwright/login-automation/"
# Run command
 USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 npx playwright test login.spec.ts  # --ui for ui mode
 user : user@mail.com
 pass : supersecure1
 for web site "https://danube-web.shop/"
 */
