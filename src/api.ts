import type {
  Product,
  User,
  SignupParams,
  LoginParams,
  CreateProductParams,
} from './types';

const API_BASE_URL = 'http://localhost:3040';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    credentials: 'include',
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const signup = async ({
  name,
  email,
  password,
}: SignupParams): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/authentication/sign-up`, {
    method: 'POST',
    credentials: 'include',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to sign up');
  }

  return response.json();
};

export const login = async ({
  email,
  password,
}: LoginParams): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/authentication/log-in`, {
    method: 'POST',
    credentials: 'include',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to log in');
  }

  return response.json();
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/authentication`, {
    method: 'GET',
    credentials: 'include',
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/authentication/log-out`, {
    method: 'POST',
    credentials: 'include',
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to log out');
  }
};

export const createProduct = async ({
  name,
  price,
  isInStock,
}: CreateProductParams): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ name, price, isInStock }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to create product');
  }

  return response.json();
};
