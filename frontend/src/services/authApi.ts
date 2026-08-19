const AUTH_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

interface LoginResult {
  success: boolean;
  token?: string;
  student?: Student;
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

    return { success: true, token: data.token, student: data.student };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error' };
  }
};
