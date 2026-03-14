import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import financeRoutes from './routes/financeRoutes.js';

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/finance', financeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ERP Backend API is running' });
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});
