"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt_1 = require("../utils/jwt");
const db_1 = require("../config/db");
const login = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    try {
        const result = await db_1.pool.query('SELECT id, first_name, last_name, email, status FROM students WHERE email = $1', [email]);
        const student = result.rows[0];
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        if (student.status !== 'ACTIVE') {
            res.status(403).json({ message: "Student account is inactive" });
            return;
        }
        const token = (0, jwt_1.generateToken)({ id: student.id, email: student.email });
        res.status(200).json({
            message: "Login successful",
            token,
            student
        });
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ message: "Database connection error" });
    }
};
exports.login = login;
