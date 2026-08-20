const AUTH_BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

export interface Professor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface LoginResult {
  success: boolean;
  token?: string;
  professor?: Professor;
  message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Login failed' };
    }
    return { success: true, token: data.token, professor: data.professor };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error' };
  }
};
