const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL not found');
}

export { BASE_URL };
