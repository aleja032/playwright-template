import { test, expect } from '../fixtures/custom-fixtures';
import testData from '../data-driven/test-data.json';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('/login');
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    const { email, password } = testData.users.validUser;
    
    await loginPage.login(email, password);
    
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    const { email, password } = testData.users.invalidUser;
    
    await loginPage.login(email, password);
    
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
