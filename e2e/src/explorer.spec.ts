import {test, expect} from '@playwright/test';

test('home page lists characters', async ({page}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {name: /explore the multiverse/i}),
  ).toBeVisible();

  const firstCard = page.getByRole('link', {name: /rick sanchez/i}).first();
  await expect(firstCard).toBeVisible();
});

test('search filters the list through the API', async ({page}) => {
  await page.goto('/');

  await page.getByRole('searchbox', {name: /search characters/i}).fill('morty');

  await expect(page).toHaveURL(/name=morty/);
  await expect(
    page.getByRole('link', {name: /morty smith/i}).first(),
  ).toBeVisible();
});

test('opens a character detail page', async ({page}) => {
  await page.goto('/');

  await page
    .getByRole('link', {name: /rick sanchez/i})
    .first()
    .click();

  await expect(page).toHaveURL(/\/character\/\d+/);
  await expect(
    page.getByRole('heading', {level: 1, name: /rick sanchez/i}),
  ).toBeVisible();
  await expect(page.getByRole('heading', {name: /episodes/i})).toBeVisible();
});
