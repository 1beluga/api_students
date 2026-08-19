import { getStoredToken } from "../context/AuthContext";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/students`;

interface StudentPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Added password for creation
}

interface Student extends StudentPayload {
  id: string;
  normalizedEmail?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

const getAuthHeaders = (): Record<string, string> => {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return { success: false, message: error, errors: data?.errors };
  }
  return { success: true, data };
};

export const createStudent = async (payload: StudentPayload): Promise<ApiResponse<Student>> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<Student>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const getAllStudents = async (): Promise<ApiResponse<Student[]>> => {
  try {
    const response = await fetch(API_BASE_URL, {
      headers: getAuthHeaders(),
    });
    return handleResponse<Student[]>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const getStudentById = async (id: string): Promise<ApiResponse<Student>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<Student>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const deleteStudent = async (id: string): Promise<ApiResponse<{}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse<{}>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};
