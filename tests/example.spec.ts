import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://final-project-flame-beta.vercel.app/');

  
  await expect(page).toHaveTitle(/Financiamento/);

  const getStarted = page.getByText('SIMULAR')
  
  await getStarted.click()
});

