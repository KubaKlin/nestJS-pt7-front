const API_BASE_URL = 'http://localhost:3040';
const headers: Record<string, string> = { 'Content-Type': 'application/json' };

interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  data: Record<string, unknown>;
  token: string | null;
}

interface CreateProductParams {
  name: string;
  price: number;
  isInStock: boolean;
}

interface Product {
  name: string;
  price: number;
  isInStock: boolean;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const signup = async ({ name, email, password }: SignupParams): Promise<Record<string, unknown>> => {
  const response = await fetch(`${API_BASE_URL}/authentication/sign-up`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to sign up');
  }
  return response.json().catch(() => ({}));
};

export const login = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/authentication/log-in`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to log in');
  }
  const data = await response.json().catch(() => ({}));
  const token = data.token || data.accessToken || data.access_token || null;
  return { data, token };
};

export const createProduct = async ({ name, price, isInStock }: CreateProductParams, token: string | null): Promise<Product> => {
  const requestHeaders = { ...headers };
  if (token) {
    requestHeaders.Authorization = `${token}`;
  }
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({ name, price, isInStock }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to create product');
  }
  return response.json();
};

