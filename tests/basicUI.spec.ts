import { expect, test } from '@playwright/test';

test.describe('Basic UI tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://basic-ui.tl-academy.ee/');
  });

  test('TL-16-1 create order button test', async ({ page }) => {
    const createOrderButton = page.getByTestId('create-order-button');

    await expect(createOrderButton).toBeDisabled();

    await page.getByTestId('first-name-input').fill('Test');
    await expect(createOrderButton).toBeDisabled();

    await page.getByTestId('last-name-input').fill('User');
    await expect(createOrderButton).toBeDisabled();

    await page.getByTestId('email-input').fill('test@example.com');
    await expect(createOrderButton).toBeDisabled();

    await page.getByTestId('address-input').fill('Test address');
    await expect(createOrderButton).toBeEnabled();

    await createOrderButton.click();
    await expect(page.getByTestId('order-success')).toBeVisible();
    await expect(page.getByTestId('order-customer')).toHaveText('Test User');
    await expect(page.getByTestId('order-number')).toHaveText(/^#\d+$/);
  });

  test('TL-16-2 change language', async ({ page }) => {
    const heading = page.getByTestId('page-title');
    const createOrderButton = page.getByTestId('create-order-button');

    await expect(heading).toHaveText('Создать заказ');
    await page.getByTestId('language-en').click();
    await expect(heading).toHaveText('Create order');
    await expect(createOrderButton).toHaveText('Create order');

    await page.getByTestId('language-et').click();
    await expect(heading).toHaveText('Loo tellimus');
    await expect(createOrderButton).toHaveText('Loo tellimus');

    await page.getByTestId('language-ru').click();
    await expect(heading).toHaveText('Создать заказ');
    await expect(createOrderButton).toHaveText('Создать заказ');
  });

  test('TL-16-3 incorrect email blocks create button and shows error', async ({ page }) => {
    const emailInput = page.getByTestId('email-input');
    const emailError = page.getByTestId('email-error');
    const createOrderButton = page.getByTestId('create-order-button');

    await page.getByTestId('first-name-input').fill('Test');
    await page.getByTestId('last-name-input').fill('User');
    await page.getByTestId('address-input').fill('Test address');
    await emailInput.fill('test@test');
    await emailInput.blur();

    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText('Неверный формат email');
    await expect(createOrderButton).toBeDisabled();

    await emailInput.fill('test@example.com');
    await expect(emailError).toBeHidden();
    await expect(createOrderButton).toBeEnabled();
  });
});
