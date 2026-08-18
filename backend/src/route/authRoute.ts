import { Router } from "express";
import { login } from "../controller/authController";
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

router.post('/login', login);

router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.status(200).json({ message: "Access granted, token is valid", studentData: req.user });
});

export default router;
