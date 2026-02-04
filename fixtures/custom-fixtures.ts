import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserController } from '../pages/UserController';

type CustomFixtures = {
  // UI / Web / E2E
  loginPage: LoginPage;
  // API
  userController: UserController;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  userController: async ({ request }, use) => {
    const controller = new UserController(request);
    await use(controller);
  },
});

export { expect } from '@playwright/test';
