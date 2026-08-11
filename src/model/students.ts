export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  status: string;
  createdAt: Date;
}

export interface CreateStudentDTO {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
}
