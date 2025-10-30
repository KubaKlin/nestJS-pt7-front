const API_BASE_URL = 'http://localhost:3040';

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const signup = async ({ name, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/authentication/sign-up`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to sign up');
  }
  return response.json().catch(() => ({}));
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/authentication/log-in`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
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

export const createProduct = async ({ name, price, isInStock }, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `${token}`;
  }
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ name, price, isInStock }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to create product');
  }
  return response.json();
};
