import express from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction
} from '../controllers/financeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllTransactions);
router.get('/:id', authMiddleware, getTransactionById);
router.post('/', authMiddleware, createTransaction);

export default router;
