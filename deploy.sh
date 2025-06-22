#!/bin/bash

echo "🚀 QuirkQuack Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git and push to GitHub first."
    exit 1
fi

# Check if changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    git status --short
    echo ""
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📋 Deployment Checklist:"
echo "1. ✅ Code is in GitHub repository"
echo "2. ⏳ Set up PostgreSQL database (Supabase/Railway/Neon)"
echo "3. ⏳ Deploy backend to Vercel"
echo "4. ⏳ Deploy frontend to Vercel"
echo "5. ⏳ Configure environment variables"
echo "6. ⏳ Test the application"
echo ""

echo "🔧 Pre-deployment Setup:"
echo ""

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. You'll need to create it with:"
    echo "   DATABASE_URL=your_database_connection_string"
    echo "   JWT_SECRET=your_jwt_secret_key"
    echo "   NODE_ENV=production"
    echo "   FRONTEND_URL=https://your-frontend-domain.vercel.app"
    echo ""
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env not found. You'll need to create it with:"
    echo "   VITE_API_URL=https://your-backend-url.vercel.app"
    echo "   VITE_SOCKET_URL=https://your-backend-url.vercel.app"
    echo ""
fi

echo "📚 Next Steps:"
echo "1. Set up a PostgreSQL database (recommended: Supabase)"
echo "2. Deploy backend to Vercel:"
echo "   - Go to vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables"
echo "3. Deploy frontend to Vercel:"
echo "   - Create new Vercel project"
echo "   - Set root directory to 'frontend'"
echo "   - Add environment variables"
echo "4. Update CORS configuration with actual URLs"
echo "5. Test the application"
echo ""

echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""

read -p "Press Enter to continue..." 