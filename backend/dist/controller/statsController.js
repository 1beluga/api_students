"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentStats = void 0;
const db_1 = require("../config/db");
const getStudentStats = async (_req, res) => {
    try {
        const totalQuery = db_1.pool.query('SELECT COUNT(*)::int AS total_students FROM students');
        const statusQuery = db_1.pool.query(`
      SELECT status, COUNT(*)::int AS count
      FROM students
      GROUP BY status
    `);
        const [totalResult, statusResult] = await Promise.all([totalQuery, statusQuery]);
        res.status(200).json({ totalStudents: totalResult.rows[0].total_students, byStatus: statusResult.rows, });
    }
    catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ message: "Failed to fetch student statistics" });
    }
};
exports.getStudentStats = getStudentStats;
