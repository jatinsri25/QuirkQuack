# Deployment Guide for Vercel

This guide will help you deploy your QuirkQuack chat application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Database**: You'll need a PostgreSQL database (recommended: Supabase, Railway, or Neon)

## Step 1: Set Up Database

### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your database connection string from Settings > Database
3. Note down the connection string for later use

### Option B: Railway
1. Go to [railway.app](https://railway.app) and create a new project
2. Add a PostgreSQL database
3. Get the connection string from the database service

### Option C: Neon
1. Go to [neon.tech](https://neon.tech) and create a new project
2. Get your connection string from the dashboard

## Step 2: Deploy Backend

1. **Push your code to GitHub** if you haven't already
2. **Go to Vercel Dashboard** and click "New Project"
3. **Import your GitHub repository**
4. **Configure the project**:
   - **Framework Preset**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

6. **Deploy** and note down the backend URL

## Step 3: Deploy Frontend

1. **Create a new Vercel project** for the frontend
2. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   VITE_SOCKET_URL=https://your-backend-url.vercel.app
   ```

4. **Deploy** and note down the frontend URL

## Step 4: Update Configuration

1. **Update Backend CORS**: In `backend/src/index.ts`, replace `"https://your-frontend-domain.vercel.app"` with your actual frontend URL

2. **Update Frontend Vercel Config**: In `frontend/vercel.json`, replace `"https://your-backend-url.vercel.app"` with your actual backend URL

3. **Redeploy both projects** after making these changes

## Step 5: Database Setup

1. **Run Prisma Migrations**:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Try to sign up/login
3. Test sending messages
4. Check if real-time features work

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your frontend URL is in the backend's CORS configuration
2. **Database Connection**: Verify your DATABASE_URL is correct and the database is accessible
3. **Socket Connection**: Ensure your socket URL is correct in the frontend environment variables
4. **Build Errors**: Check the build logs in Vercel dashboard

### Environment Variables Checklist:

**Backend**:
- `DATABASE_URL`
- `JWT_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL`

**Frontend**:
- `VITE_API_URL`
- `VITE_SOCKET_URL`

## Security Notes

1. **JWT Secret**: Use a strong, random string for JWT_SECRET
2. **Database**: Use connection pooling in production
3. **CORS**: Only allow your frontend domain
4. **Environment Variables**: Never commit sensitive data to your repository

## Performance Optimization

1. **Enable Vercel Analytics** for monitoring
2. **Use Vercel Edge Functions** for better performance
3. **Enable caching** where appropriate
4. **Monitor database performance**

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with production environment variables
4. Check database connectivity 