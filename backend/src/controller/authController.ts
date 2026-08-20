import { Request, Response } from "express";
import bcrypt from "bcrypt";
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
      'SELECT id, first_name, last_name, email, password_hash FROM professors WHERE email = $1',
      [email.trim().toLowerCase()]
    );
    const professor = result.rows[0];

    if (!professor) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, professor.password_hash);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ id: professor.id, email: professor.email });
    const { password_hash, ...professorWithoutPassword } = professor;

    res.status(200).json({
      message: "Login successful",
      token,
      professor: professorWithoutPassword
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Database connection error" });
  }
};
