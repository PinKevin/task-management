import { redirect } from 'react-router';

export function guestLoader() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    throw redirect('/');
  }
  return null;
}

export function protectedLoader() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw redirect('/login');
  }
  return null;
}
