export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export type Status = 'active' | 'inactive' | 'pending' | 'error';

export interface IdName {
  id: string;
  name: string;
}