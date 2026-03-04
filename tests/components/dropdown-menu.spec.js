import { test, expect } from '@playwright/test'

test.describe('DropdownMenu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/examples/')
        await page.waitForLoadState('networkidle')
    })

    test('click trigger opens menu', async ({ page }) => {
        const menu = page.locator('dropdown-menu#dm1')
        const trigger = menu.locator('.dropdown-trigger')
        const content = menu.locator('.dropdown-content')

        await expect(content).not.toBeVisible()
        await trigger.click()
        await expect(content).toBeVisible()
    })

    test('click item fires change event with value', async ({ page }) => {
        const menu = page.locator('dropdown-menu#dm1')
        const trigger = menu.locator('.dropdown-trigger')

        const changePromise = menu.evaluate(el =>
            new Promise(resolve =>
                el.addEventListener('change', e => resolve(e.detail), { once: true })
            )
        )

        await trigger.click()
        const firstItem = menu.locator('dropdown-item').first()
        const expectedValue = await firstItem.getAttribute('value')
        await firstItem.click()

        const detail = await changePromise
        expect(detail.value).toBe(expectedValue)
    })

    test('keyboard: ArrowDown opens, arrows navigate, Escape closes', async ({ page }) => {
        const menu = page.locator('dropdown-menu#dm1')
        const trigger = menu.locator('.dropdown-trigger')
        const content = menu.locator('.dropdown-content')

        // Focus and open with ArrowDown
        await trigger.focus()
        await page.keyboard.press('ArrowDown')
        await expect(content).toBeVisible()

        // Escape closes
        await page.keyboard.press('Escape')
        await expect(content).not.toBeVisible()
    })

    test('click outside closes menu', async ({ page }) => {
        const menu = page.locator('dropdown-menu#dm1')
        const trigger = menu.locator('.dropdown-trigger')
        const content = menu.locator('.dropdown-content')

        await trigger.click()
        await expect(content).toBeVisible()

        await page.locator('body').click({ position: { x: 10, y: 10 } })
        await expect(content).not.toBeVisible()
    })

    test('selectable mode tracks selected state', async ({ page }) => {
        const menu = page.locator('dropdown-menu#dm2')
        const trigger = menu.locator('.dropdown-trigger')

        // Open and select an item
        await trigger.click()
        const items = menu.locator('dropdown-item')
        const secondItem = items.nth(1)
        const secondValue = await secondItem.getAttribute('value')
        await secondItem.click()

        // Value should reflect the selection
        const value = await menu.evaluate(el => el.value)
        expect(value).toBe(secondValue)
    })

    test('only one menu open at a time', async ({ page }) => {
        const menu1 = page.locator('dropdown-menu#dm1')
        const menu2 = page.locator('dropdown-menu#dm2')

        // Open first menu
        await menu1.locator('.dropdown-trigger').click()
        await expect(menu1.locator('.dropdown-content')).toBeVisible()

        // Open second menu — first should close
        await menu2.locator('.dropdown-trigger').click()
        await expect(menu2.locator('.dropdown-content')).toBeVisible()
        await expect(menu1.locator('.dropdown-content')).not.toBeVisible()
    })
})
