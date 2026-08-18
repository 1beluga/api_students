"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const db_1 = require("../config/db");
// Common SELECT clause mapping PostgreSQL snake_case to frontend camelCase
const SELECT_STUDENTS = `
  SELECT
    id,
    first_name AS "firstName",
    last_name AS "lastName",
    email,
    address,
    phone_number AS "phoneNumber",
    status,
    created_at AS "createdAt"
  FROM students
`;
class StudentRepository {
    async findAll() {
        const result = await db_1.pool.query(`${SELECT_STUDENTS} ORDER BY id ASC`);
        return result.rows;
    }
    async findById(id) {
        const result = await db_1.pool.query(`${SELECT_STUDENTS} WHERE id = $1`, [id]);
        return result.rows[0];
    }
    async findByEmail(email) {
        const result = await db_1.pool.query(`${SELECT_STUDENTS} WHERE email = $1`, [email]);
        return result.rows[0];
    }
    async updatePut(id, data) {
        const query = `
      UPDATE students
      SET first_name = $1, last_name = $2, email = $3
      WHERE id = $4
      RETURNING
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        address,
        phone_number AS "phoneNumber",
        status,
        created_at AS "createdAt"
    `;
        const values = [data.firstName, data.lastName, data.email, id];
        const result = await db_1.pool.query(query, values);
        return result.rows[0];
    }
    async updatePatch(id, data) {
        const fields = [];
        const values = [];
        let index = 1;
        if (data.firstName !== undefined) {
            fields.push(`first_name = $${index}`);
            values.push(data.firstName);
            index++;
        }
        if (data.lastName !== undefined) {
            fields.push(`last_name = $${index}`);
            values.push(data.lastName);
            index++;
        }
        if (data.email !== undefined) {
            fields.push(`email = $${index}`);
            values.push(data.email);
            index++;
        }
        if (fields.length === 0) {
            return this.findById(id);
        }
        values.push(id);
        const query = `
      UPDATE students
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        address,
        phone_number AS "phoneNumber",
        status,
        created_at AS "createdAt"
    `;
        const result = await db_1.pool.query(query, values);
        return result.rows[0];
    }
    async create(data) {
        const query = `
      INSERT INTO students (first_name, last_name, email)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        address,
        phone_number AS "phoneNumber",
        status,
        created_at AS "createdAt"
    `;
        const values = [data.firstName, data.lastName, data.email];
        const result = await db_1.pool.query(query, values);
        return result.rows[0];
    }
    async delete(id) {
        const result = await db_1.pool.query("DELETE FROM students WHERE id = $1", [id]);
        return result.rowCount;
    }
}
exports.StudentRepository = StudentRepository;
