import { Router } from "express";
import { StudentController } from "../controller/StudentController";

const router = Router();
const studentController = new StudentController();

router.get('/', studentController.getAll);
router.get('/id', studentController.getById);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.patch('/:id', studentController.update);
router.delete('/:id', studentController.delete);

export default router;
