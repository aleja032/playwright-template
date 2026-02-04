import { APIRequestContext, APIResponse } from '@playwright/test';

// Controlador de API para operaciones sobre usuarios.
// Se usa como "Page Object" de API en fixtures y tests.
export class UserController {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(userData: Record<string, unknown>): Promise<APIResponse> {
    return await this.request.post('/api/users', {
      data: userData,
    });
  }

  async getUser(id: string): Promise<APIResponse> {
    return await this.request.get(`/api/users/${id}`);
  }
}