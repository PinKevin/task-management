import { BASE_URL } from '@/lib/api';

interface LoginDto {
  username?: string;
  password?: string;
}

interface LoginResponse {
  accessToken: string;
}

export async function loginUser(loginDto: LoginDto): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    throw new Error('Email atau password salah');
  }

  return response.json();
}
