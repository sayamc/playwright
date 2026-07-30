import { test } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test('Verify clean search behavior via POM', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.navigateToHome('https://example-shopping-site.com');
  await searchPage.searchForProduct('Wireless Headphones');
  await searchPage.verifyFirstResultText('Wireless Headphones');
});

