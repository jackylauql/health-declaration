import { expect, test, type Page } from '@playwright/test';

test.describe('Create Declaration', () => {
  test('should be able to submit new form', async ({ page }) => {
    await page.goto('http://localhost:5173/new');
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Temperature (°C)').fill('36.5');
    await page.getByLabel('Cough', { exact: true }).check();
    await page.getByLabel('Yes').check();
    await page.getByRole('button', { name: 'Submit Declaration' }).click();
    await expect(page.getByText('Successfully created new declaration')).toBeVisible();
  });

  test('should show error when submitting empty form', async ({ page }) => {
    await page.goto('http://localhost:5173/new');
    await page.getByRole('button', { name: 'Submit Declaration' }).click();
    await expect(page.getByText('Full name is required')).toBeVisible();
    await expect(
      page.getByText('Please enter a valid temperature in degree Celsius (e.g. 36.5)')
    ).toBeVisible();
    await expect(page.getByText('Please select an option')).toBeVisible();
  });
});
