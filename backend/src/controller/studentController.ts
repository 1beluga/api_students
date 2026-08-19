import { Request, Response } from "express";
import { StudentService } from "../service/studentService";

export class StudentController {
  private studentService = new StudentService();

  private handleError(error: unknown, res: Response): void {
    const message = error instanceof Error ? error.message : "Internal server error";

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("not found")) {
      res.status(404).json({ error: message });
    } else if (lowerMessage.includes("invalid") || lowerMessage.includes("already used") || lowerMessage.includes("needed")) {
      res.status(400).json({ error: message });
    } else {
      res.status(500).json({ error: message });
    }
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const students = await this.studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(String(req.params.id), 10);
      const student = await this.studentService.getStudentsById(id);
      res.status(200).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(String(req.params.id), 10);
      const student = await this.studentService.updateStudent(id, req.body);
      res.status(200).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(String(req.params.id), 10);
      await this.studentService.deleteStudent(id);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
