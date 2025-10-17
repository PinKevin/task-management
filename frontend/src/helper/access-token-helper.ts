export function getToken() {
  const token = localStorage.getItem('accessToken');
  return token;
}

export function setToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function removeToken() {
  localStorage.removeItem('accessToken');
}
