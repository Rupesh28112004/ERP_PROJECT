# ERP System - Full Stack Application

A production-ready ERP (Enterprise Resource Planning) system built with React frontend and Node.js + Express backend.

## Features

- **Authentication**: Mock JWT-based login system
- **Dashboard**: KPI metrics and recent activity overview
- **Employee Management**: Full CRUD operations for employee data
- **Inventory Management**: Track and manage inventory items
- **Project Management**: Monitor projects, clients, and budgets
- **Finance**: Track income and expenses with transaction history

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- Mock JWT authentication
- In-memory data storage (arrays)
- CORS enabled
- RESTful API architecture

## Project Structure

```
project/
├── backend/
│   ├── config/
│   │   └── db.js (placeholder for real DB)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   ├── inventoryController.js
│   │   ├── projectController.js
│   │   └── financeController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── projectRoutes.js
│   │   └── financeRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── data/
│   │   ├── users.js
│   │   ├── employees.js
│   │   ├── inventory.js
│   │   ├── projects.js
│   │   └── finance.js
│   ├── package.json
│   └── server.js
│
└── src/
    ├── components/
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   ├── Card.tsx
    │   ├── Table.tsx
    │   ├── Modal.tsx
    │   ├── Navbar.tsx
    │   └── Sidebar.tsx
    ├── pages/
    │   ├── Login.tsx
    │   ├── Dashboard.tsx
    │   ├── Employees.tsx
    │   ├── Inventory.tsx
    │   ├── Projects.tsx
    │   └── Finance.tsx
    ├── services/
    │   ├── api.ts
    │   ├── employeeService.ts
    │   ├── inventoryService.ts
    │   ├── projectService.ts
    │   └── financeService.ts
    ├── App.tsx
    └── main.tsx
```

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd ..
npm install
```

### Running the Application

1. **Start Backend Server** (Terminal 1)
```bash
cd backend
npm start
```
Server runs on: http://localhost:5000

2. **Start Frontend** (Terminal 2)
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

### Test Credentials

```
Email: admin@erp.com
Password: admin123
```

Other test accounts:
- manager@erp.com / manager123
- user@erp.com / user123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get item by ID
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Finance
- `GET /api/finance` - Get all transactions
- `GET /api/finance/:id` - Get transaction by ID
- `POST /api/finance` - Create new transaction

## Database Integration

The application currently uses in-memory mock data. To integrate a real database:

1. Replace `backend/config/db.js` with your actual database connection
2. Update controllers to use database queries instead of array operations
3. Install required database driver (e.g., `pg` for PostgreSQL, `mysql2` for MySQL)
4. Update the data models in the `/data` folder to use your ORM/query builder

## Features Overview

### Dashboard
- Total employees count
- Total projects count
- Pending tasks (mock value)
- Total revenue from transactions
- Recent activity feed

### Employee Management
- View all employees in table format
- Add new employees
- Edit existing employee information
- Delete employees
- Fields: Name, Department, Email, Phone

### Inventory Management
- View all inventory items
- Add new items
- Edit item details
- Delete items
- Fields: Item Name, Quantity, Category, Unit Price

### Project Management
- View all projects
- Add new projects
- Edit project details
- Delete projects
- Fields: Title, Client, Status, Budget

### Finance
- View all transactions
- Add new transactions (Credit/Debit)
- Summary cards showing Total Credit, Total Debit, and Balance
- Fields: Type, Amount, Description, Date

## Development Notes

- All API calls require authentication (except login)
- JWT token is stored in localStorage
- All CRUD operations update data in real-time
- Responsive design with TailwindCSS
- Clean, modular code architecture
- TypeScript for type safety on frontend

## Production Deployment

Before deploying to production:

1. Replace mock authentication with proper auth system
2. Integrate real database
3. Add proper error handling and logging
4. Implement rate limiting
5. Add input validation and sanitization
6. Set up proper environment variables
7. Enable HTTPS
8. Add monitoring and analytics

## License

This project is open source and available under the MIT License.
