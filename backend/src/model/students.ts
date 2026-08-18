export interface Student {
    id: string;
    firstName?: string;
    lastName?: string;
    first_name?: string;
    last_name?: string;
    name?: string;
    email: string;
    normalizedEmail?: string;
}

export interface CreateStudentDTO {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
}
