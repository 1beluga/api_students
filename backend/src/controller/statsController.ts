import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getStudentStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const totalQuery = pool.query('SELECT COUNT(*)::int AS total_students FROM students');


    const statusQuery = pool.query(`
      SELECT status, COUNT(*)::int AS count
      FROM students
      GROUP BY status
    `);

    const [totalResult, statusResult] = await Promise.all([totalQuery, statusQuery]);

    res.status(200).json({totalStudents: totalResult.rows[0].total_students,byStatus: statusResult.rows,});
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Failed to fetch student statistics" });
  }
};
