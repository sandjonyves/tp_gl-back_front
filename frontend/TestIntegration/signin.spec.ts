import { test, expect } from '@playwright/test';

test.describe('SignIn Page - Tests Essentiels', () => {
  test.beforeEach(async ({ page }) => {
    // Nettoyer les cookies avant chaque test pour éviter les interférences
    await page.context().clearCookies();
    await page.goto('http://localhost:3000/auth/signin');
    await page.waitForSelector('h1');
  });

  test('devrait permettre la connexion avec un utilisateur existant', async ({ page, request }) => {
    // Créer un utilisateur pour le test
    const uniqueName = 'TestUser' + Date.now();
    const password = 'abc123';
    await request.post('http://localhost:3001/users/register', {
      data: {
        name: uniqueName,
        password: password,
        confirmPassword: password,
        role: 'user',
      },
      headers: { 'Content-Type': 'application/json' },
    });

    // Remplir le formulaire de connexion
    await page.fill('#name', uniqueName);
    await page.fill('#password', password);

    // Vérifier les valeurs saisies avant soumission
    expect(await page.inputValue('#name')).toBe(uniqueName);

    // Soumettre le formulaire et capturer la réponse
    const [response] = await Promise.all([
      page.waitForResponse('http://localhost:3001/users/login'),
      page.click('button[type="submit"]'),
    ]);

    // Loguer la réponse pour diagnostic
    console.log('Réponse serveur :', {
      status: response.status(),
      body: await response.json(),
      headers: response.headers(),
    });

    // Vérifier que la réponse est 200
    expect(response.status()).toBe(200);

    // Vérifier que les cookies sont définis
    const cookies = await page.context().cookies();
    console.log('Cookies définis :', cookies);
    expect(cookies.some((cookie) => cookie.name === 'accessToken')).toBe(true);
    expect(cookies.some((cookie) => cookie.name === 'refreshToken')).toBe(true);

    // Vérifier la redirection après la connexion
    await expect(page).toHaveURL('http://localhost:3000/vehicles', { timeout: 15000 });

    // Loguer l'URL actuelle pour diagnostic
    console.log('URL actuelle :', page.url());
  });

  test('devrait permettre la connexion avec un admin', async ({ page, request }) => {
    // Créer un admin pour le test
    const uniqueName = 'AdminUser' + Date.now();
    const password = 'abc123';
    await request.post('http://localhost:3001/users/register', {
      data: {
        name: uniqueName,
        password: password,
        confirmPassword: password,
        role: 'admin',
      },
      headers: { 'Content-Type': 'application/json' },
    });

    // Remplir le formulaire de connexion
    await page.fill('#name', uniqueName);
    await page.fill('#password', password);

    // Vérifier les valeurs saisies avant soumission
    expect(await page.inputValue('#name')).toBe(uniqueName);

    // Soumettre le formulaire et capturer la réponse
    const [response] = await Promise.all([
      page.waitForResponse('http://localhost:3001/users/login'),
      page.click('button[type="submit"]'),
    ]);

    // Loguer la réponse pour diagnostic
    console.log('Réponse serveur :', {
      status: response.status(),
      body: await response.json(),
      headers: response.headers(),
    });

    // Vérifier que la réponse est 200
    expect(response.status()).toBe(200);

    // Vérifier que les cookies sont définis
    const cookies = await page.context().cookies();
    console.log('Cookies définis :', cookies);
    expect(cookies.some((cookie) => cookie.name === 'accessToken')).toBe(true);
    expect(cookies.some((cookie) => cookie.name === 'refreshToken')).toBe(true);

    // Vérifier la redirection après la connexion
    await expect(page).toHaveURL('http://localhost:3000/dashboard', { timeout: 15000 });

    // Loguer l'URL actuelle pour diagnostic
    console.log('URL actuelle :', page.url());
  });

  // test('devrait afficher une erreur avec un mot de passe incorrect', async ({ page }) => {
  //   // Simuler une réponse d'erreur pour mot de passe incorrect
  //   await page.route('http://localhost:3001/users/login', async (route) => {
  //     await route.fulfill({
  //       status: 401,
  //       contentType: 'application/json',
  //       body: JSON.stringify({ message: 'Authentication failed: Password is not valid' }),
  //     });
  //   });

  //   // Remplir le formulaire
  //   await page.fill('#name', 'TestUser');
  //   await page.fill('#password', 'wrongpassword');

  //   // Vérifier les valeurs saisies avant soumission
  //   expect(await page.inputValue('#name')).toBe('TestUser');

  //   // Soumettre le formulaire
  //   await Promise.all([
  //     page.waitForResponse('http://localhost:3001/users/login'),
  //     page.click('button[type="submit"]'),
  //   ]);

  //   // Vérifier que la page reste sur /auth/signin
  //   await expect(page).toHaveURL(/\/auth\/signin$/);

  //   // Vérifier le message d'erreur
  //   await expect(page.locator('.bg-red-50.text-red-500')).toContainText('Authentication failed: Password is not valid');
  // });

  // test('devrait afficher une erreur avec un utilisateur inexistant', async ({ page }) => {
  //   // Simuler une réponse d'erreur pour utilisateur inexistant
  //   await page.route('http://localhost:3001/users/login', async (route) => {
  //     await route.fulfill({
  //       status: 404,
  //       contentType: 'application/json',
  //       body: JSON.stringify({ message: 'Authentication failed: User not found' }),
  //     });
  //   });

  //   // Remplir le formulaire
  //   await page.fill('#name', 'NonExistentUser');
  //   await page.fill('#password', 'abc123');

  //   // Vérifier les valeurs saisies avant soumission
  //   expect(await page.inputValue('#name')).toBe('NonExistentUser');

  //   // Soumettre le formulaire
  //   await Promise.all([
  //     page.waitForResponse('http://localhost:3001/users/login'),
  //     page.click('button[type="submit"]'),
  //   ]);

  //   // Vérifier que la page reste sur /auth/signin
  //   await expect(page).toHaveURL(/\/auth\/signin$/);

  //   // Vérifier le message d'erreur
  //   await expect(page.locator('.bg-red-50.text-red-500')).toContainText('Authentication failed: User not found');
  // });

  // test('devrait afficher une erreur si les champs sont vides', async ({ page }) => {
  //   // Simuler une réponse d'erreur pour champs manquants
  //   await page.route('http://localhost:3001/users/login', async (route) => {
  //     await route.fulfill({
  //       status: 400,
  //       contentType: 'application/json',
  //       body: JSON.stringify({ message: 'Authentication failed: Name is required' }),
  //     });
  //   });

  //   // Soumettre le formulaire sans remplir les champs
  //   await Promise.all([
  //     page.waitForResponse('http://localhost:3001/users/login'),
  //     page.click('button[type="submit"]'),
  //   ]);

  //   // Vérifier que la page reste sur /auth/signin
  //   await expect(page).toHaveURL(/\/auth\/signin$/);

  //   // Vérifier le message d'erreur
  //   await expect(page.locator('.bg-red-50.text-red-500')).toContainText('Authentication failed: Name is required');
  // });
});