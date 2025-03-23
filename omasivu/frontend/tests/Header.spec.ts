import { test, expect } from '@playwright/test'; //will show as error because playwright is not in codespace

// Define the base URL for the application
const appAddress = 'http://localhost:5173';

/**
 * Test Case: The app should display the title
 * - Opens the application in the browser
 * - Verifies that the main title (`<h1>`) contains "User Management"
 * - Pauses execution (for debugging purposes if running in headed mode)
 */
test('The app should display the title', async ({ page }) => {
    // Navigate to the application's home page
    await page.goto(appAddress);

    // Find the <h1> element and check if it contains the expected text "User Management"
    await expect(page.locator('h1')).toHaveText('User Management');

    // Pause execution for debugging when running Playwright in headed mode
    // Allows manual inspection of the browser state
    await page.pause();
});ö