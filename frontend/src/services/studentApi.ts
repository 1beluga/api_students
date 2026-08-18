// frontend/src/services/studentApi.ts

const API_BASE_URL = 'http://localhost:3000/api/students';

interface StudentPayload {
  firstName: string;
  lastName: string;
  email: string;
}

interface Student extends StudentPayload {
  id: string;
  // Assuming a normalized email field might be returned by the backend
  normalizedEmail?: string; 
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<Student>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const getAllStudents = async (): Promise<ApiResponse<Student[]>> => {
  try {
    const response = await fetch(API_BASE_URL);
    return handleResponse<Student[]>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const getStudentById = async (id: string): Promise<ApiResponse<Student>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse<Student>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const deleteStudent = async (id: string): Promise<ApiResponse<{}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<{}>(response);
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};
