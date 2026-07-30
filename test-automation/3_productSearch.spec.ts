import { test, expect } from '@playwright/test';

test.describe('E-commerce Product Search Functional Tests', () => {
  
  test('Should search for a product and verify visible results', async ({ page }) => {
    // 1. Navigate to the application homepage
    await page.goto('https://amazon.com');

    // 2. Locate the search input box using user-facing semantic queries
    const searchBox = page.getByPlaceholder('Search Amazon');
    const searchButton = page.getByRole('button', { name: 'Go', exact: true });

    // 3. Perform the search action
    await searchBox.fill('Laptop');
    await searchButton.click();

    // 4. Validate the search result URL and headers
    await expect(page).toHaveURL(/.*k=Laptop/);
    
    // 5. Ensure at least one product card card is visible in the grid
    const firstProduct = page.locator('[data-component-type="s-search-result"]').first();
    await expect(firstProduct).toBeVisible();

    // 6. Verify that the product title actually contains the searched keyword
    const productTitle = firstProduct.locator('h2');
    await expect(productTitle).toContainText('Laptop', { ignoreCase: true });
