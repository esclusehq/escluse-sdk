import type { EscluseConfig } from '../config';
import { resolveConfig } from '../config';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@escluse/types';

export abstract class BaseResource {
  protected readonly config: Required<EscluseConfig>;
  protected readonly baseUrl: string;

  constructor(config: EscluseConfig) {
    this.config = resolveConfig(config);
    this.baseUrl = `${this.config.baseUrl}/api/v1`;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new EscluseApiError(response.status, error.message || response.statusText, endpoint);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof EscluseApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new EscluseApiError(408, 'Request timeout', endpoint);
      }
      throw error;
    }
  }

  protected buildQueryString(params?: Record<string, unknown>): string {
    if (!params) return '';
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    return qs ? `?${qs}` : '';
  }
}

export class EscluseApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly endpoint: string
  ) {
    super(message);
    this.name = 'EscluseApiError';
  }
}

export { BaseResource };
export type { ApiResponse, PaginatedResponse, PaginationParams };