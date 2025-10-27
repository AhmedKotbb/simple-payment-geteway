export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  documents: T[];
  totalItems: number;
  page: number;
  totalPages: number;
}

export interface UserCreateDto {
    name: string;
    email: string;
    role: 'admin' | 'partner' | 'merchant';
    password: string;
    confiremPassword: string; 
}

export interface listAllUsers {
  page: number;
  limit: number
}