export interface Product {
  id?: number;
  name: string;
  price: number;
  isInStock: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
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

export interface CreateProductParams {
  name: string;
  price: number;
  isInStock: boolean;
}
