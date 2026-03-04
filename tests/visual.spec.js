import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
    test('examples page - dark mode', async ({ page }) => {
        await page.goto('/examples/')
        // Wait for fonts and icons to load
        await page.waitForLoadState('networkidle')
        // Small delay for any CSS transitions to settle
        await page.waitForTimeout(500)
        await expect(page).toHaveScreenshot('examples-dark.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
        })
    })

    test('examples page - light mode', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' })
        await page.goto('/examples/')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(500)
        await expect(page).toHaveScreenshot('examples-light.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
        })
    })

    for (const theme of ['cyberpunk', 'earthy', 'corporate', 'organic', 'terminal']) {
        test(`examples page - ${theme} theme`, async ({ page }) => {
            await page.goto('/examples/')
            await page.waitForLoadState('networkidle')
            await page.evaluate((t) => {
                document.documentElement.dataset.theme = t
            }, theme)
            await page.waitForTimeout(500)
            await expect(page).toHaveScreenshot(`examples-${theme}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01,
            })
        })
    }
})
