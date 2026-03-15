import mongoose from 'mongoose';
import User from './models/User.js';
import Employee from './models/Employee.js';
import Inventory from './models/Inventory.js';
import Project from './models/Project.js';
import Transaction from './models/Transaction.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Inventory.deleteMany({});
    await Project.deleteMany({});
    await Transaction.deleteMany({});

    // Seed Users
    const users = await User.create([
      {
        email: 'admin@erp.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      },
      {
        email: 'manager@erp.com',
        password: 'manager123',
        name: 'Manager User',
        role: 'manager'
      },
      {
        email: 'user@erp.com',
        password: 'user123',
        name: 'Regular User',
        role: 'user'
      }
    ]);

    console.log('✓ Users seeded');

    // Seed Employees
    const employees = await Employee.create([
      {
        name: 'Raman Singh',
        department: 'Engineering',
        email: 'raman@example.com',
        phone: '9999999999'
      },
      {
        name: 'Priya Sharma',
        department: 'HR',
        email: 'priya@example.com',
        phone: '8888888888'
      },
      {
        name: 'Ansh',
        department: 'Finance',
        email: 'ansh@example.com',
        phone: '7777777777'
      },
      {
        name: 'Mayank',
        department: 'Marketing',
        email: 'mayank@example.com',
        phone: '6666666666'
      },
      {
        name: 'Rahul Verma',
        department: 'Engineering',
        email: 'rahul@example.com',
        phone: '5555555555'
      }
    ]);

    console.log('✓ Employees seeded');

    // Seed Inventory
    const inventory = await Inventory.create([
      {
        itemName: 'Laptop',
        quantity: 20,
        category: 'Electronics',
        unitPrice: 55000
      },
      {
        itemName: 'Office Chair',
        quantity: 50,
        category: 'Furniture',
        unitPrice: 8000
      },
      {
        itemName: 'Printer',
        quantity: 10,
        category: 'Electronics',
        unitPrice: 15000
      },
      {
        itemName: 'Whiteboard',
        quantity: 15,
        category: 'Office Supplies',
        unitPrice: 3000
      },
      {
        itemName: 'Desk',
        quantity: 30,
        category: 'Furniture',
        unitPrice: 12000
      },
      {
        itemName: 'Monitor',
        quantity: 25,
        category: 'Electronics',
        unitPrice: 18000
      }
    ]);

    console.log('✓ Inventory seeded');

    // Seed Projects
    const projects = await Project.create([
      {
        title: 'Website Redesign',
        client: 'ABC Ltd',
        status: 'In Progress',
        budget: 800000
      },
      {
        title: 'Mobile App Development',
        client: 'XYZ Corporation',
        status: 'In Progress',
        budget: 1500000
      },
      {
        title: 'ERP Implementation',
        client: 'Tech Solutions',
        status: 'Completed',
        budget: 2000000
      },
      {
        title: 'Cloud Migration',
        client: 'Global Industries',
        status: 'Planning',
        budget: 1200000
      },
      {
        title: 'Data Analytics Dashboard',
        client: 'Finance Corp',
        status: 'In Progress',
        budget: 900000
      }
    ]);

    console.log('✓ Projects seeded');

    // Seed Transactions
    const transactions = await Transaction.create([
      {
        type: 'Credit',
        amount: 50000,
        description: 'Client Payment - ABC Ltd',
        date: new Date('2024-11-20')
      },
      {
        type: 'Debit',
        amount: 25000,
        description: 'Office Supplies Purchase',
        date: new Date('2024-11-19')
      },
      {
        type: 'Credit',
        amount: 100000,
        description: 'Project Milestone Payment',
        date: new Date('2024-11-18')
      },
      {
        type: 'Debit',
        amount: 15000,
        description: 'Software Licenses',
        date: new Date('2024-11-17')
      },
      {
        type: 'Credit',
        amount: 75000,
        description: 'Consulting Service Payment',
        date: new Date('2024-11-16')
      },
      {
        type: 'Debit',
        amount: 30000,
        description: 'Salary Payment',
        date: new Date('2024-11-15')
      }
    ]);

    console.log('✓ Transactions seeded');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
