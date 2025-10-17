import { redirect } from 'react-router';
import { getToken } from './access-token-helper';

export function guestLoader() {
  const token = getToken();
  if (token) {
    throw redirect('/');
  }
  return null;
}

export function protectedLoader() {
  const token = getToken();
  if (!token) {
    throw redirect('/login');
  }
  return null;
}
