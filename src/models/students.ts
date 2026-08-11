export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface createStudent {
  name: string,
  email: string
}

export const students: Student[] = [
  { id: 1, name: "Dahtou", email: "dahtou@gmail.com" },
  { id: 2, name: "Yuta", email: "yuta@gmail.com" },
];
