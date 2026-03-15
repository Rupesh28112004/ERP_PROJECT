# MongoDB Atlas Setup Guide for ERP Project

## Steps to Set Up MongoDB Atlas

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Click "Start Free"
- Create an account or sign in

### 2. Create a Cluster
- After logging in, click "Create" to create a new project
- Name your project (e.g., "ERP-Project")
- Click "Create Project"
- Click "Create a Deployment"
- Choose "Free" tier (M0)
- Select your cloud provider and region
- Click "Create Cluster"
- Wait for the cluster to be created (usually 3-5 minutes)

### 3. Create Database User
- Click on "Security" > "Database Access"
- Click "Add new database user"
- Username: `erp_user` (or any name you prefer)
- Password: Create a strong password
- Database User Privileges: Select "Atlas admin" for testing
- Click "Add User"

### 4. Allow Access
- Go to "Security" > "Network Access"
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (or add your IP for security)
- Click "Confirm"

### 5. Get Connection String
- Click "Clusters" in the left sidebar
- Click "Connect" on your cluster
- Choose "Drivers"
- Select "Node.js" and version 3.6+
- Copy the connection string

### 6. Update .env File
Replace the MONGODB_URI in `/project/backend/.env`:

```
MONGODB_URI=mongodb+srv://erp_user:YOUR_PASSWORD@cluster-name.mongodb.net/erp_database?retryWrites=true&w=majority
```

**Important:** Replace:
- `erp_user` with your database username
- `YOUR_PASSWORD` with your database password
- `cluster-name` with your actual cluster name

### 7. Seed Database with Initial Data
```bash
cd project/backend
npm run seed
```

This will populate your database with:
- 3 test users (admin, manager, regular user)
- 5 employees
- 6 inventory items
- 5 projects
- 6 transactions

### 8. Run Backend Server
```bash
npm start
```

Your backend will be running at `http://localhost:5000`

## Available API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/register` - Register a new user

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

### Finance/Transactions
- `GET /api/finance` - Get all transactions
- `GET /api/finance/:id` - Get transaction by ID
- `POST /api/finance` - Create new transaction

## Test Users

After seeding, you can login with:

1. **Admin Account**
   - Email: admin@erp.com
   - Password: admin123

2. **Manager Account**
   - Email: manager@erp.com
   - Password: manager123

3. **Regular User**
   - Email: user@erp.com
   - Password: user123

## Troubleshooting

### Connection Timeout
- Check if your IP is whitelisted in MongoDB Atlas
- Verify the connection string is correct
- Ensure `.env` file is in the correct location

### Authentication Failed
- Double-check username and password in the connection string
- Verify the database user exists in MongoDB Atlas

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 5000

## What Was Changed

All hardcoded data has been replaced with MongoDB:
- ✅ User authentication with password hashing (bcrypt)
- ✅ All CRUD operations now use MongoDB
- ✅ Environment variables for secure configuration
- ✅ Seed data for quick testing
- ✅ Proper error handling

Enjoy your MongoDB-powered ERP system! 🚀
