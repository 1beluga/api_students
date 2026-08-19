import { pool } from "../config/db";
import { CreateStudentDTO } from "../model/students";

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

export class StudentRepository {

  async findAll() {
    const result = await pool.query(`${SELECT_STUDENTS} ORDER BY id ASC`);
    return result.rows;
  }

  async findById(id: number) {
    const result = await pool.query(`${SELECT_STUDENTS} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async findByEmail(email: string) {
    const result = await pool.query(`${SELECT_STUDENTS} WHERE email = $1`, [email]);
    return result.rows[0];
  }

  async updatePut(id: number, data: CreateStudentDTO) {
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
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updatePatch(id: number, data: Partial<CreateStudentDTO>) {
    const fields: string[] = [];
    const values: any[] = [];
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

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async create(data: CreateStudentDTO) {
    const query = `
      INSERT INTO students (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
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

    const values = [data.firstName, data.lastName, data.email, data.password];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
    return result.rowCount;
  }
}
