import { Request, Response } from "express";
import { generateToken } from "../security/jwt";
import { pool } from "../config/db";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, status, password_hash FROM students WHERE email = $1',
      [email.trim().toLowerCase()]
    );

    const student = result.rows[0];

    if (!student) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (student.status !== 'ACTIVE') {
      res.status(403).json({ message: "Student account is inactive" });
      return;
    }

    if (password !== student.password_hash) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ id: student.id, email: student.email });
    const { password_hash, ...studentWithoutPassword } = student;

    res.status(200).json({
      message: "Login successful",
      token,
      student: studentWithoutPassword
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Database connection error" });
  }
};
