import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30_000,

  fullyParallel: false,

  reporter: [['html',{open: 'never'}]], // always, never, on-failure increase report option.
  use: {
    trace: 'on',        /* change to 'on' */
    screenshot: 'on',    /* Increase screenshot to 'on' */
    headless: false,    /* Increase this line show browser default = true  */
  },
});
