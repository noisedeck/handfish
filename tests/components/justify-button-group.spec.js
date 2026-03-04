import { test, expect } from '@playwright/test'

test.describe('JustifyButtonGroup', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/examples/')
        await page.waitForLoadState('networkidle')
    })

    test('click button selects alignment', async ({ page }) => {
        const group = page.locator('justify-button-group#justify1')

        // Click left button
        await group.locator('[data-value="left"]').click()
        const value = await group.evaluate(el => el.value)
        expect(value).toBe('left')

        // Click right button
        await group.locator('[data-value="right"]').click()
        const value2 = await group.evaluate(el => el.value)
        expect(value2).toBe('right')
    })

    test('change event fires with value', async ({ page }) => {
        const group = page.locator('justify-button-group#justify1')

        const changePromise = group.evaluate(el =>
            new Promise(resolve =>
                el.addEventListener('change', () => resolve(el.value), { once: true })
            )
        )

        await group.locator('[data-value="left"]').click()
        const changedValue = await changePromise
        expect(changedValue).toBe('left')
    })

    test('only one button selected at a time', async ({ page }) => {
        const group = page.locator('justify-button-group#justify1')

        await group.locator('[data-value="left"]').click()

        const selectedCount = await group.locator('.justify-btn.selected').count()
        expect(selectedCount).toBe(1)

        const selectedValue = await group.locator('.justify-btn.selected').getAttribute('data-value')
        expect(selectedValue).toBe('left')
    })

    test('disabled blocks interaction', async ({ page }) => {
        const group = page.locator('justify-button-group[disabled]').first()

        const valueBefore = await group.evaluate(el => el.value)
        await group.locator('[data-value="right"]').click({ force: true })
        const valueAfter = await group.evaluate(el => el.value)

        expect(valueAfter).toBe(valueBefore)
    })

    test('value property reflects selection', async ({ page }) => {
        const group = page.locator('justify-button-group#justify1')

        // Set value programmatically
        await group.evaluate(el => { el.value = 'right' })
        const value = await group.evaluate(el => el.value)
        expect(value).toBe('right')

        // Check the button is visually selected
        const selected = await group.locator('.justify-btn.selected').getAttribute('data-value')
        expect(selected).toBe('right')
    })
})
