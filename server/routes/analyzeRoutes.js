import express from 'express';
import { analyzeResume } from '../controllers/analyzeController.js';
import { upload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/analyze-score
router.post('/analyze-score', verifyToken, upload.single('resume'), analyzeResume);

export default router;
