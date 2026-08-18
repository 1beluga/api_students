import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { pool } from "../config/db";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, status FROM students WHERE email = $1',
      [email]
    );

    const student = result.rows[0];

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    if (student.status !== 'ACTIVE') {
      res.status(403).json({ message: "Student account is inactive" });
      return;
    }

    const token = generateToken({ id: student.id, email: student.email });

    res.status(200).json({
      message: "Login successful",
      token,
      student
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Database connection error" });
  }
};
