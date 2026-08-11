import { Router } from "express";
import { getAllStudents, getStudentById, createStudent, updateStudent, patchStudent, deleteStudent } from "../controller/studentContoller";

const router = Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.patch('/:id', patchStudent);
router.delete('/:id', deleteStudent);

export default router;
