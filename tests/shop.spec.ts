import { expect, test } from '@playwright/test';

test.describe('Shop tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');
  });

  test('TL-16-4 place order button test with delivery check + validation', async ({ page }) => {
    const emailInput = page.getByTestId('email-input');
    const nameInput = page.getByTestId('name-input');
    const parcelLockerRadio = page.getByTestId('delivery-parcel-locker-radio');
    const homeRadio = page.getByTestId('delivery-home-radio');
    const deliveryCost = page.getByTestId('summary-delivery');
    const total = page.getByTestId('summary-total');
    const placeOrderButton = page.getByTestId('place-order-button');

    await expect(parcelLockerRadio).toBeChecked();
    await expect(deliveryCost).toHaveText('€3.99');
    await expect(total).toHaveText('€82.99');
    await expect(placeOrderButton).toBeDisabled();

    await page.getByTestId('delivery-home-option').click();
    await expect(homeRadio).toBeChecked();
    await expect(parcelLockerRadio).not.toBeChecked();
    await expect(deliveryCost).toHaveText('€5.99');
    await expect(total).toHaveText('€84.99');

    await nameInput.fill('Test User');
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    await expect(page.getByTestId('email-error')).toHaveText('Enter a valid email address');
    await expect(placeOrderButton).toBeDisabled();

    await emailInput.fill('test@example.com');
    await expect(page.getByTestId('email-error')).toBeEmpty();
    await expect(placeOrderButton).toBeEnabled();

    await page.getByTestId('delivery-parcel-locker-option').click();
    await expect(parcelLockerRadio).toBeChecked();
    await expect(homeRadio).not.toBeChecked();
    await expect(deliveryCost).toHaveText('€3.99');
    await expect(total).toHaveText('€82.99');
    await expect(placeOrderButton).toBeEnabled();

    await placeOrderButton.click();
    await expect(page.getByTestId('order-message')).toHaveText('Order placed. Thank you!');
  });
});
