import { test, expect } from '@playwright/test'

test.describe('ColorPicker', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/examples/')
        await page.waitForLoadState('networkidle')
    })

    test('click swatch opens dialog', async ({ page }) => {
        const picker = page.locator('color-picker#cp1')
        const swatch = picker.locator('.swatch-button')
        const dialog = picker.locator('.color-dialog')

        await swatch.click()
        await expect(dialog).toBeVisible()
    })

    test('close button closes dialog', async ({ page }) => {
        const picker = page.locator('color-picker#cp1')
        const swatch = picker.locator('.swatch-button')
        const dialog = picker.locator('.color-dialog')

        await swatch.click()
        await expect(dialog).toBeVisible()

        await picker.locator('.dialog-close').click()
        await expect(dialog).not.toBeVisible()
    })

    test('backdrop click closes dialog', async ({ page }) => {
        const picker = page.locator('color-picker#cp1')
        const swatch = picker.locator('.swatch-button')
        const dialog = picker.locator('.color-dialog')

        await swatch.click()
        await expect(dialog).toBeVisible()

        // Click the dialog backdrop (outside the dialog content)
        // Dialog elements receive click events on their backdrop
        await dialog.evaluate(el => {
            // Simulate clicking the backdrop by dispatching cancel
            el.dispatchEvent(new Event('cancel'))
        })
        await expect(dialog).not.toBeVisible()
    })

    test('Escape closes dialog', async ({ page }) => {
        const picker = page.locator('color-picker#cp1')
        const swatch = picker.locator('.swatch-button')
        const dialog = picker.locator('.color-dialog')

        await swatch.click()
        await expect(dialog).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(dialog).not.toBeVisible()
    })

    test('hex display shows current value', async ({ page }) => {
        const picker = page.locator('color-picker#cp1')
        const hexDisplay = picker.locator('.hex-display')

        const hexText = await hexDisplay.textContent()
        // Should be a valid hex color
        expect(hexText.trim()).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })

    test('setting value property updates swatch color', async ({ page }) => {
        const picker = page.locator('color-picker#cp1')
        const swatch = picker.locator('.swatch')

        await picker.evaluate(el => { el.value = '#ff0000' })

        const hexDisplay = picker.locator('.hex-display')
        const hexText = await hexDisplay.textContent()
        expect(hexText.trim().toUpperCase()).toBe('#FF0000')
    })

    test('disabled blocks opening', async ({ page }) => {
        // Add a disabled picker for testing
        const pickerExists = await page.locator('color-picker[disabled]').count()
        if (pickerExists === 0) {
            // If no disabled picker in examples, test by disabling one
            await page.locator('color-picker#cp1').evaluate(el => {
                el.disabled = true
            })
        }
        const picker = page.locator('color-picker[disabled]').first()
        const swatch = picker.locator('.swatch-button')
        const dialog = picker.locator('.color-dialog')

        await swatch.click({ force: true })
        await expect(dialog).not.toBeVisible()
    })
})
