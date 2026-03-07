export const API_URL = import.meta.env.VITE_API_URL as string

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_URL}${path}`, { credentials: 'include', ...init })
}
