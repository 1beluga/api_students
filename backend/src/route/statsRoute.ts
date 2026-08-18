import { Router } from 'express';
import { getStudentStats } from '../controller/statsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/students', authenticateToken, getStudentStats);

export default router;
