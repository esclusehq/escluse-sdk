import { BaseResource } from './base';
import type {
  User,
  ApiKey,
  LoginCredentials,
  RegisterData,
  AuthTokens,
  ApiResponse,
} from '@escluse/types';

export class UsersResource extends BaseResource {
  async me(): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/users/me');
  }

  async updateProfile(data: { name?: string; avatar?: string }): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async apiKeys(): Promise<ApiResponse<ApiKey[]>> {
    return this.request<ApiResponse<ApiKey[]>>('/users/me/keys');
  }

  async createApiKey(name: string): Promise<ApiResponse<ApiKey>> {
    return this.request<ApiResponse<ApiKey>>('/users/me/keys', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async deleteApiKey(keyId: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/users/me/keys/${keyId}`, {
      method: 'DELETE',
    });
  }

  static async login(
    baseUrl: string,
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthTokens>> {
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  static async register(
    baseUrl: string,
    data: RegisterData
  ): Promise<ApiResponse<AuthTokens>> {
    const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}