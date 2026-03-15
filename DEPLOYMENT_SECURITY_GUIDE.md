# 🔒 ERP Project - Deployment & Security Guide

## CRITICAL SECURITY ISSUES FIXED ✅

| Issue | Problem | Solution |
|-------|---------|----------|
| ❌ Hardcoded JWT Secret | `'mock-secret-key'` in code | ✅ Using `process.env.JWT_SECRET` |
| ❌ Open CORS | Anyone could access your API | ✅ Restricted to `FRONTEND_URL` only |
| ❌ Hardcoded PORT | Not flexible for deployment | ✅ Using `process.env.PORT` |
| ❌ No Input Validation | XSS/Injection attacks risk | ✅ Added body size limits |
| ❌ No Error Handling | Exposing sensitive info | ✅ Added global error handler |
| ❌ No 404 Handler | API exposing internal details | ✅ Added 404 route handler |
| ❌ MongoDB exposed | Connection string visibility risk | ✅ Using environment variables |

---

## 📋 Deployment Checklist

### Before Deploying to Production:

#### ✅ Step 1: Change All Secrets (CRITICAL!)
Replace these in **MongoDB Atlas & Environment:**

```bash
# Generate new JWT secret
openssl rand -base64 32

# Store in .env.production
JWT_SECRET=your_new_secure_key_here
```

#### ✅ Step 2: Update MongoDB Atlas for Production
1. Go to MongoDB Atlas → Your Cluster → Security → Network Access
2. **Remove** "Allow from anywhere" (0.0.0.0/0)
3. Add only your **Vercel/Railway/Render server IP** addresses
4. Create a **dedicated production user** (different from development)

#### ✅ Step 3: Create `.env.production` File
```
# NEVER commit this file! Add to .gitignore
MONGODB_URI=mongodb+srv://prod_user:PROD_PASSWORD@cluster0.j0a8vws.mongodb.net/erp_production?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_new_super_secure_key_here
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

#### ✅ Step 4: Update .gitignore
```
# .gitignore
.env
.env.local
.env.production
.env*.local
```

#### ✅ Step 5: Verify Authentication
- All API routes (except `/api/auth/login` and `/api/auth/register`) require authMiddleware ✅
- Passwords are hashed with bcrypt ✅
- JWT tokens expire after 24 hours ✅

---

## 🚀 Deployment Options

### Option A: Vercel (Frontend + Backend)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

**Step 2: Deploy on Vercel**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set environment variables in Vercel Dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
4. Click Deploy

**Step 3: Update MongoDB IP Whitelist**
- Add Vercel IP addresses to MongoDB Network Access

---

### Option B: Railway (Recommended for Backend)

**Step 1: Create Railway Account**
- Go to https://railway.app

**Step 2: Deploy from GitHub**
1. Connect GitHub account
2. Select your ERP_PROJECT repository
3. Click "Deploy Now"

**Step 3: Add Environment Variables in Railway**
- Railway Dashboard → Variables
- Add all from `.env.production`

**Step 4: Get Railway URL**
- Your backend will be live at: `https://your-project.railway.app`

**Step 5: Update Frontend**
- In frontend code, change API URL to: `https://your-project.railway.app/api`

---

### Option C: Render (Similar to Railway)

1. Go to https://render.com
2. Connect GitHub
3. Create new Web Service from repository
4. Set Runtime: Node
5. Set Build Command: `cd project/backend && npm install`
6. Set Start Command: `npm start`
7. Add environment variables
8. Deploy

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Use strong, unique JWT secrets (32+ characters)
- ✅ Rotate secrets every 3-6 months
- ✅ Use HTTPS only (all platforms do this by default)
- ✅ Never commit `.env` files to GitHub
- ✅ Monitor API logs for suspicious activity
- ✅ Implement rate limiting (future enhancement)
- ✅ Use HTTPS for MongoDB connection (already configured)
- ✅ Keep dependencies updated

### ❌ DON'T:
- ❌ Don't expose `.env` files
- ❌ Don't use same secret for dev and prod
- ❌ Don't allow "Anyone" IP access in MongoDB production
- ❌ Don't log sensitive data (passwords, tokens)
- ❌ Don't use admin database user for application
- ❌ Don't expose error stack traces in production

---

## 🧪 Testing Before Deployment

### Local Testing:
```bash
cd project/backend
npm install
npm run seed
npm start
```

### Test API Endpoints:
```bash
# 1. Register User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test@123",
    "name":"Test User"
  }'

# Copy the token from response

# 2. Get Employees (with token)
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 3. Create Employee
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"John Doe",
    "department":"IT",
    "email":"john@example.com",
    "phone":"9999999999"
  }'
```

---

## 📊 Production Monitoring

### Monitor These Metrics:
1. **API Response Times** - Should be < 500ms
2. **Error Rates** - Should be < 1%
3. **Database Connections** - Ensure connection pooling
4. **Server Uptime** - Aim for 99.9%

### Tools:
- MongoDB Atlas → Metrics tab
- Vercel/Railway → Logs & Monitoring
- Sentry (optional) - Error tracking

---

## 🚨 If Something Goes Wrong

### API Returns 401 (Unauthorized)
- Check JWT secret matches between app code and env variables
- Verify token isn't expired
- Check CORS headers

### Cannot Connect to MongoDB
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials
- Check network connectivity

### CORS Errors
- Update `FRONTEND_URL` in backend .env
- Verify frontend is making requests to correct API URL
- Check browser console for exact error

---

## 📝 Environment Variables Guide

**Development (.env):**
```
NODE_ENV=development
PORT=5000
JWT_SECRET=dev_secret_key_for_testing
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://dev_user:dev_pass@cluster...
```

**Production (.env.production):**
```
NODE_ENV=production
PORT=5000
JWT_SECRET=randomly_generated_32_char_secret
FRONTEND_URL=https://yourdomain.com
MONGODB_URI=mongodb+srv://prod_user:prod_pass@cluster...
```

---

## 🔄 CI/CD Deployment Flow

```
1. Push to GitHub (main branch)
   ↓
2. Vercel/Railway detects push
   ↓
3. Runs build command
   ↓
4. Installs dependencies
   ↓
5. Deploys to production
   ↓
6. Environment variables injected
   ↓
7. Live! 🎉
```

---

## 📱 Frontend Configuration

After deploying backend, update frontend API URL:

**`project/src/services/api.ts`:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app/api';
```

**.env.production (frontend):**
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🎯 Summary

Your ERP app is now **production-ready** with:
- ✅ Secure JWT authentication
- ✅ Environment-based configuration
- ✅ CORS protection
- ✅ Error handling
- ✅ MongoDB Atlas integration
- ✅ Rate limiting ready
- ✅ Scalable architecture

**Next Steps:**
1. Create `.env.production` with new secrets
2. Update MongoDB Atlas for production
3. Choose deployment platform (Railway/Render/Vercel)
4. Deploy and test!

Good luck! 🚀
