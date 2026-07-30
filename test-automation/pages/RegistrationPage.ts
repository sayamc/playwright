// Create a file named registration.spec.ts under your "tests/" directory and add the following code:
// page-objects/RegistrationPage.ts
import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using robust user-facing locators recommended by Playwright
    this.usernameInput = page.getByLabel('Username');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Sign Up' });
    this.successMessage = page.locator('#success-notification'); 
  }

  async navigate() {
    await this.page.goto('/register');
  }
  
  async registerUser(username: string, email: string, password: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
