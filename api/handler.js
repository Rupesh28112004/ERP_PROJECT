import express from 'express';
import cors from 'cors';
import { connectDB } from '../project/backend/config/db.js';
import authRoutes from '../project/backend/routes/authRoutes.js';
import employeeRoutes from '../project/backend/routes/employeeRoutes.js';
import inventoryRoutes from '../project/backend/routes/inventoryRoutes.js';
import projectRoutes from '../project/backend/routes/projectRoutes.js';
import financeRoutes from '../project/backend/routes/financeRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/finance', financeRoutes);

export default app;
