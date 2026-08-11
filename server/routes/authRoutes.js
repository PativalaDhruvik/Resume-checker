import express from 'express';
import { registerUser, loginUser, getMe, upgradeUserPlan } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register
router.post('/auth/register', registerUser);

// POST /api/auth/login
router.post('/auth/login', loginUser);

// GET /api/auth/me
router.get('/auth/me', verifyToken, getMe);

// POST /api/auth/upgrade-plan
router.post('/auth/upgrade-plan', verifyToken, upgradeUserPlan);

export default router;
