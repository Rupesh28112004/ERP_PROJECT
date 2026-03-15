# 🚀 Complete Setup & Deployment Guide

## Quick Start (Local Testing)

### Step 1: Seed Database
Since local seeding has SSL issues, use MongoDB Compass to seed:

**Option A: MongoDB Compass (Easy)**
1. Download: https://www.mongodb.com/products/compass
2. Open Compass
3. Connection String: Paste from `.env`
4. Click "Connect"
5. Create documents manually OR use the provided seed data

**Option B: Server-Side Seeding (Better)**
When deployed to Vercel/Railway, run seed once:
```bash
vercel env pull  # Pull environment variables
npm run seed
```

### Step 2: Start Backend Locally
```bash
cd project/backend
npm start
```

You should see:
```
[dotenv] injecting env (5) from .env
MongoDB connected successfully
Server is running on port 5000
```

### Step 3: Test API
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123","name":"Test"}'

# Should return JWT token
```

---

## 🌐 Deployment Steps

### Using Railway (Recommended)

#### Step 1: Prepare Code
```bash
cd /c/Users/Dell/Downloads/ERP_PROJECT
git add .
git commit -m "Add security fixes and production configuration"
git push origin main
```

#### Step 2: Deploy on Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize GitHub & select your repository
5. Select `main` branch
6. Railway auto-detects Node.js

#### Step 3: Configure Backend Service

In Railway Dashboard → Variables:

```
DATABASE_URL=mongodb+srv://yadavrupesh4117_db_user:9LV3OhNc0FtStK0M@cluster0.j0a8vws.mongodb.net/erp_production?retryWrites=true&w=majority
JWT_SECRET=(generate new one - use: openssl rand -base64 32)
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.railway.app
```

#### Step 4: Set Build & Start Commands

In Railway → Settings:

```
Build Command: cd project/backend && npm install
Start Command: cd project/backend && npm start
```

#### Step 5: Deploy Frontend
1. Go to Railway → New Service
2. Select same GitHub repo
3. Configure for React:

```
Build Command: cd project && npm install && npm run build
Start Command: npx serve -s dist -l 3000
```

Set Environment Variable:
```
VITE_API_URL=https://your-backend.railway.app/api
```

#### Step 6: Get URLs
- Backend: `https://your-backend.railway.app`
- Frontend: `https://your-frontend.railway.app`

#### Step 7: Seed Database on Railway
```bash
# SSH into Railway pod
railway shell

# Run seed
npm run seed

# Done! Data is now in MongoDB
```

---

## Using Vercel (Frontend Only)

### For Frontend Deployment:
1. Go to https://vercel.com/new
2. Import GitHub repo
3. Configure:
   - Framework: Vite
   - Root Directory: `project`
   - Build: `npm run build`
   - Output: `dist`

4. Environment Variables:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

5. Deploy!

---

## 📊 MongoDB Setup for Production

### Create Production Database User:
1. MongoDB Atlas → Database Access
2. Click "Add New Database User"
3. Username: `erp_user_prod`
4. Password: Generate strong one
5. Privileges: "Atlas admin" (or select specific DB)
6. Click "Add User"

### Restrict Network Access:
1. MongoDB Atlas → Network Access
2. Remove "Allow from Anywhere"
3. Add Railway IP: Railway will show during setup
4. Or allow these IP ranges:
   - Railway: Let them auto-add
   - Vercel: `76.76.19.0/24`

---

## ✅ Verification Checklist

Before going live:

- [ ] All environment variables set correctly
- [ ] MongoDB Atlas IP whitelist configured
- [ ] JWT secret is strong & random
- [ ] Frontend FRONTEND_URL updated
- [ ] Backend responding to API requests
- [ ] Authentication working (login/register)
- [ ] Database seeded with initial data
- [ ] CORS errors resolved
- [ ] No sensitive data in code/Git
- [ ] SSL/HTTPS working (platforms default)

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- [ ] Check MONGODB_URI is correct
- [ ] Verify IP is whitelisted in MongoDB Atlas
- [ ] Confirm database user exists
- [ ] Check network connectivity

### "CORS Error"
- [ ] Update FRONTEND_URL in backend env
- [ ] Verify frontend making requests to correct URL
- [ ] Check Authorization header format: `Bearer TOKEN`

### "401 Unauthorized"
- [ ] Verify JWT_SECRET matches
- [ ] Check token isn't expired
- [ ] Confirm authMiddleware is applied to routes

### "Cannot load .env"
- [ ] Ensure .env file exists in project/backend
- [ ] Check .env is not in .gitignore
- [ ] Verify file permissions

---

## 📝 Files to Review

1. **DEPLOYMENT_SECURITY_GUIDE.md** - Complete security guide
2. **MONGODB_SETUP.md** - Database configuration
3. **SECURITY_FIXES_SUMMARY.md** - What was fixed

---

## 🎯 Next Actions

1. **Decide deployment platform** (Railway/Render/Vercel)
2. **Generate new JWT secret** for production
3. **Create production MongoDB user**
4. **Update Network Access** in MongoDB Atlas
5. **Deploy backend** first
6. **Update frontend VITE_API_URL**
7. **Deploy frontend**
8. **Seed database** on production
9. **Test end-to-end**

---

## 📞 Support

If you encounter issues:

1. Check MongoDB Atlas Logs
2. Check Railway/Render Logs
3. Verify environment variables are set
4. Test API locally first
5. Check browser console for CORS errors

**Your app is ready to go live!** 🚀
