export interface Product {
  id?: string;
  name: string;
  price: number;
  isInStock: boolean;
}

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: Record<string, unknown>;
  token: string | null;
}

export interface CreateProductParams {
  name: string;
  price: number;
  isInStock: boolean;
}
