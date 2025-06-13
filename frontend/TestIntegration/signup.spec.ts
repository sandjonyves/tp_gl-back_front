import { test, expect } from '@playwright/test';

test.describe('SignUp Page - Tests Essentiels', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signup');
    await page.waitForSelector('h1');
  });

  test('devrait permettre l’envoi quand les mots de passe correspondent', async ({ page }) => {
    // Remplir le formulaire
    const uniqueName = 'Test' + Date.now();
    await page.fill('#name', uniqueName);
    await page.fill('#password', 'abc123');
    await page.fill('#confirmPassword', 'abc123');

    // Vérifier les valeurs saisies avant soumission
    const nameValue = await page.inputValue('#name');
    expect(nameValue).toBe(uniqueName);

    // Soumettre le formulaire et capturer la réponse
    const [response] = await Promise.all([
      page.waitForResponse('http://localhost:3001/users/register'),
      page.click('button[type="submit"]'),
    ]);

    // Loguer la réponse pour diagnostic
    console.log('Réponse serveur :', {
      status: response.status(),
      body: await response.json(),
      headers: response.headers(),
    });

    // Vérifier que la réponse est 201
    expect(response.status()).toBe(201);

    // Vérifier que les cookies sont définis
    const cookies = await page.context().cookies();
    console.log('Cookies définis :', cookies);
    const accessTokenCookie = cookies.find((cookie) => cookie.name === 'accessToken');
    const refreshTokenCookie = cookies.find((cookie) => cookie.name === 'refreshToken');
    expect(cookies.some((cookie) => cookie.name === 'accessToken')).toBe(true);
    expect(cookies.some((cookie) => cookie.name === 'refreshToken')).toBe(true);

    // Vérifier la redirection après l'inscription
    
    await expect(page).toHaveURL('http://localhost:3000/vehicles', { timeout: 15000 });

    // Loguer l'URL actuelle pour diagnostic
    console.log('URL actuelle :', page.url());
  });

  // test('devrait empêcher l’envoi si les mots de passe ne correspondent pas', async ({ page }) => {
  //   await page.fill('#name', 'Test');
  //   await page.fill('#password', 'abc123');
  //   await page.fill('#confirmPassword', 'different');
  //   await page.click('button[type="submit"]');
  //   await expect(page).toHaveURL(/\/auth\/signup$/);
  //   await expect(page.locator('.text-red-500')).toContainText('Les mots de passe ne correspondent pas');
  // });

  test('devrait afficher une erreur si l’utilisateur existe déjà', async ({ page }) => {
    await page.route('http://localhost:3001/users/register', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'User already exists' }),
      });
    });

    await page.fill('#name', 'Test');
    await page.fill('#password', 'abc123');
    await page.fill('#confirmPassword', 'abc123');

    await Promise.all([
      page.waitForResponse('http://localhost:3001/users/register'),
      page.click('button[type="submit"]'),
    ]);

    await expect(page).toHaveURL(/\/auth\/signup$/);
    await expect(page.locator('.text-red-500')).toContainText('User already exists');
  });
});