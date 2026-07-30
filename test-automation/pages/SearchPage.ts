import { Locator, Page, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly productResultsGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    // Defining semantic locators following 
