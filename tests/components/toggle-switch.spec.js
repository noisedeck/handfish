import { test, expect } from '@playwright/test'

test.describe('ToggleSwitch', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/examples/')
        await page.waitForLoadState('networkidle')
    })

    test('click toggles checked state', async ({ page }) => {
        const toggle = page.locator('toggle-switch#toggle1')
        const track = toggle.locator('.ts-track')

        // Starts unchecked
        await expect(track).toHaveAttribute('aria-checked', 'false')

        // Click to check
        await track.click()
        await expect(track).toHaveAttribute('aria-checked', 'true')

        // Click to uncheck
        await track.click()
        await expect(track).toHaveAttribute('aria-checked', 'false')
    })

    test('Space key toggles', async ({ page }) => {
        const toggle = page.locator('toggle-switch#toggle1')
        const track = toggle.locator('.ts-track')

        await track.focus()
        await expect(track).toHaveAttribute('aria-checked', 'false')

        await track.press('Space')
        await expect(track).toHaveAttribute('aria-checked', 'true')

        await track.press('Space')
        await expect(track).toHaveAttribute('aria-checked', 'false')
    })

    test('Enter key toggles', async ({ page }) => {
        const toggle = page.locator('toggle-switch#toggle1')
        const track = toggle.locator('.ts-track')

        await track.focus()
        await track.press('Enter')
        await expect(track).toHaveAttribute('aria-checked', 'true')
    })

    test('change event fires with correct checked value', async ({ page }) => {
        const toggle = page.locator('toggle-switch#toggle1')
        const track = toggle.locator('.ts-track')

        // Set up listener (non-blocking)
        await toggle.evaluate(el => {
            el._testFired = false
            el._testChecked = null
            el.addEventListener('change', () => {
                el._testFired = true
                el._testChecked = el.checked
            }, { once: true })
        })

        await track.click()

        const result = await toggle.evaluate(el => ({ fired: el._testFired, checked: el._testChecked }))
        expect(result.fired).toBe(true)
        expect(result.checked).toBe(true)
    })

    test('disabled state blocks interaction', async ({ page }) => {
        const toggle = page.locator('toggle-switch[disabled]').first()
        const track = toggle.locator('.ts-track')

        const wasChecked = await toggle.evaluate(el => el.checked)

        await track.click({ force: true })

        const stillSame = await toggle.evaluate(el => el.checked)
        expect(stillSame).toBe(wasChecked)
    })

    test('ARIA: role="switch" and aria-checked updates', async ({ page }) => {
        const toggle = page.locator('toggle-switch#toggle1')
        const track = toggle.locator('.ts-track')

        await expect(track).toHaveAttribute('role', 'switch')
        await expect(track).toHaveAttribute('aria-checked', 'false')

        await track.click()
        await expect(track).toHaveAttribute('aria-checked', 'true')
    })
})
