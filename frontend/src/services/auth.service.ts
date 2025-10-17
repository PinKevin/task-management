import { getToken } from '@/helper/access-token-helper';
import type {
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
} from '@/interfaces/auth.interface';
import { BASE_URL } from '@/lib/api';

export async function loginUser(loginDto: LoginDto): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

export async function registerUser(registerDto: RegisterDto): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerDto),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

export async function getProfile() {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
