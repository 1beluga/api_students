import { Request, Response } from "express";
import { students, Student } from "../model/students";

export const getAllStudents = (req: Request, res: Response) => {
  res.status(200).json(students);
}

export const getStudentById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id == id)
  if (!students) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
}

export const createStudent = (req: Request, res: Response) => {
  const newStudent: Student = {
    id: students.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
}

export const updateStudent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id == id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;
  student.email = req.body.email;

  res.status(200).json(student);
}

export const patchStudent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id == id);
  if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

  Object.assign(student, req.body);
  res.status(200).json(student);
}

export const deleteStudent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id == id);

  if (index == - 1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.status(204).send();
}
