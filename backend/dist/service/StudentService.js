"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const StudentRepository_1 = require("../repository/StudentRepository");
class StudentService {
    studentRepo = new StudentRepository_1.StudentRepository();
    async getAllStudents() {
        return await this.studentRepo.findAll();
    }
    async getStudentsById(id) {
        if (id <= 0) {
            throw new Error("The given ID is invalid");
        }
        const student = await this.studentRepo.findById(id);
        if (!student) {
            throw new Error("Student not found");
        }
        return student;
    }
    async createStudent(data) {
        if (!data.lastName || !data.firstName || !data.email) {
            throw new Error("All fields are needed");
        }
        const existingEmail = await this.studentRepo.findByEmail(data.email);
        if (existingEmail) {
            throw new Error("This email is already used");
        }
        const correctEmail = data.email.trim().toLowerCase();
        if (!correctEmail.includes("@") || !correctEmail.endsWith(".com") || correctEmail.indexOf("@") == 0) {
            throw new Error("Invalid email format");
        }
        return await this.studentRepo.create(data);
    }
    async updateStudent(id, data) {
        if (id <= 0) {
            throw new Error("The given ID is invalid.");
        }
        const existingStudent = await this.studentRepo.findById(id);
        if (!existingStudent) {
            throw new Error("Student not found");
        }
        if (data.email && data.email !== existingStudent.email) {
            const emailOwner = await this.studentRepo.findByEmail(data.email);
            if (emailOwner) {
                throw new Error("This email is already used");
            }
        }
        return await this.studentRepo.updatePatch(id, data);
    }
    async deleteStudent(id) {
        if (id <= 0) {
            throw new Error("The given ID is invalid");
        }
        const deleteCount = await this.studentRepo.delete(id);
        if (deleteCount == 0) {
            throw new Error("Student not found");
        }
        return { message: "Student deleted succesfully" };
    }
}
exports.StudentService = StudentService;
