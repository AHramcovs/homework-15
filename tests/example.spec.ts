import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('verify GitHub link is visible', async ({ page }) => {
  const githubLink = page.getByRole('link', { name: 'GitHub repository' });

  await expect(githubLink).toBeVisible();
});

test('verify Discord link is visible', async ({ page }) => {
  const discordLink = page.getByRole('link', { name: 'Discord server' });

  await expect(discordLink).toBeVisible();
});

test('verify dark mode switch is visible', async ({ page }) => {
  const darkModeSwitch = page.getByRole('button', {
    name: /Switch between dark and light mode/,
  });

  await expect(darkModeSwitch).toBeVisible();
});
