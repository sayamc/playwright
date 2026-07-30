// tests/registration.spec.ts
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../page-objects/RegistrationPage';

test.describe('User Registration Flow', () => {
  
  test('should successfully register a new user with valid data', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    // Generate unique user data dynamically
    const uniqueId = Date.now();
    const testUsername = `user_${uniqueId}`;
    const testEmail = `qa_test_${uniqueId}@example.com`;
    const testPassword = 'SecurePassword123!';

    // Navigate to registration page
    await registrationPage.navigate();

    // Fill out and submit the form
    await registrationPage.registerUser(testUsername, testEmail, testPassword);

    // Assert that user registration was successful
    await expect(registrationPage.successMessage).toBeVisible();
    await expect(registrationPage.successMessage).toHaveText('Account created successfully!');
    
    // Assert that the page redirected to the dashboard or login page
    await expect(page).toHaveURL(/\/dashboard|\/login/);
  });

  test('should display an error message for invalid email formatting', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    await registrationPage.navigate();
    
    // Attempt registration with invalid email format
    await registrationPage.registerUser('testuser', 'invalid-email-format', 'Password123!');
    
    // Assert HTML5 validation message or UI error block appears
    const emailValidity = await registrationPage.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(emailValidity).toBeFalsy();
  });
});


/* under folder tests
$   cd tests

Run the script in headless mode across all configured browsers:
$ npx playwright test registration.spec.ts

Run the script in headed mode (shows the browser UI) with a specific browser:
$ npx playwright test registration.spec.ts --headed --project=chromium

View the generated visual HTML execution report after running:
$ npx playwright show-report
*/
