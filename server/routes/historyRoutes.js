import express from 'express';
import { getHistory, getHistoryById, deleteHistoryRecord } from '../controllers/historyController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/history
router.get('/history', verifyToken, getHistory);

// GET /api/history/:id
router.get('/history/:id', verifyToken, getHistoryById);

// DELETE /api/history/:id
router.delete('/history/:id', verifyToken, deleteHistoryRecord);

export default router;
