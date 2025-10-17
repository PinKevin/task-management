import { getToken } from '@/helper/access-token-helper';
import type { User } from '@/interfaces/user.interface';
import { BASE_URL } from '@/lib/api';

export async function getAllUsers(): Promise<User[]> {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const url = `${BASE_URL}/users`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<User[]>;
}
