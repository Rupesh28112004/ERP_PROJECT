# 🚀 Deploy on Railway (Recommended)

## Step 1: Prepare Your Code
Your code is already pushed to GitHub! ✅

## Step 2: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (easiest)

## Step 3: Deploy Backend

### Option A: Via Web Dashboard (Easy)
1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Authorize GitHub & select `ERP_PROJECT` repository
4. Select branch: `main`
5. Railway auto-detects Node.js

### Option B: Via Railway CLI (Advanced)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Step 4: Configure Backend Service

In Railway Dashboard → Your Project → Backend Service:

### Build Settings:
- **Root Directory:** `project/backend`
- **Install Command:** `npm install`
- **Build Command:** (leave empty for Node)
- **Start Command:** `npm start`

### Environment Variables:
Click "Variables" and add:

```
MONGODB_URI = mongodb+srv://yadavrupesh4117_db_user:9LV3OhNc0FtStK0M@cluster0.j0a8vws.mongodb.net/erp_production?retryWrites=true&w=majority
JWT_SECRET = (generate random: openssl rand -base64 32)
NODE_ENV = production
PORT = 5000
FRONTEND_URL = https://your-frontend-railway.app
```

### Network:
- Railway auto-generates a public URL
- Example: `https://your-project-backend.railway.app`
- Copy this URL for frontend configuration

## Step 5: Deploy Frontend

1. Create new service in same project
2. Connect same GitHub repo
3. Select branch: `main`

### Build Settings:
- **Root Directory:** `project`
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Start Command:** `npm run preview`

### Environment Variables:
```
VITE_API_URL = https://your-project-backend.railway.app/api
NODE_ENV = production
```

## Step 6: Seed Database (Important!)

Once backend is deployed:

### Option A: Via Railway Shell
```bash
# In Railway Dashboard, open backend service
# Click "Connect" → "Shell"
cd project/backend
npm run seed
# Output should show ✅ Database seeded successfully!
```

### Option B: Via API Call (After seeding)
Make a test request:
```bash
curl -X POST https://your-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@erp.com","password":"admin123"}'
```

## Step 7: Verify Everything Works

### Test API Endpoints:
```bash
# 1. Register New User
curl -X POST https://your-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newuser@example.com",
    "password":"Password@123",
    "name":"New User"
  }'

# 2. Login
curl -X POST https://your-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"Password@123"}'

# 3. Get Employees (use token from login response)
curl -X GET https://your-backend.railway.app/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Visit Frontend:
```
https://your-frontend.railway.app
```

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
1. Check MONGODB_URI is correct in Railway
2. Verify IP whitelist in MongoDB Atlas
3. Click "Seed Database" to initialize data

### "CORS Error in Browser"
1. Update FRONTEND_URL in backend env
2. Restart backend service
3. Clear browser cache

### "401 Unauthorized"
1. Verify JWT_SECRET matches in env
2. Check `Authorization: Bearer TOKEN` header format
3. Make sure Bearer token is not expired

### "Port already in use"
Railway handles this automatically - ignore if running locally

## 📊 Monitor Your Deployment

In Railway Dashboard:
- **Logs:** See real-time server logs
- **Metrics:** CPU, Memory, Network usage
- **Deployments:** View deploy history
- **Environment:** Manage variables

## 🎉 You're Live!

Your ERP app is now:
- ✅ Running on the internet
- ✅ Using MongoDB Atlas
- ✅ Secured with JWT
- ✅ Protected with CORS
- ✅ Scalable & production-ready

**Share your URLs:**
- Frontend: `https://your-frontend.railway.app`
- Backend API: `https://your-backend.railway.app/api`

---

## Next Steps (Optional Enhancements)

1. **Add Rate Limiting:** Prevent API abuse
2. **Add Logging:** Track application usage
3. **Add Monitoring:** Uptime monitoring with UptimeRobot
4. **Add Backups:** Automated MongoDB backups
5. **Add SSL:** Already included by Railway
6. **Add Custom Domain:** Purchase domain & point to Railway

**Congratulations on deploying your ERP! 🚀**
