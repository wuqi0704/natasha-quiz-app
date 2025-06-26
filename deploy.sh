#!/bin/bash

echo "🚀 Natasha Quiz App Deployment Script"
echo "====================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
fi

# Check if all dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads/quiz-images" ]; then
    echo "📁 Creating uploads directory..."
    mkdir -p uploads/quiz-images
    echo "✅ Uploads directory created"
fi

echo ""
echo "🎉 Setup complete! Your app is ready for deployment."
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin <your-github-repo-url>"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to your preferred platform:"
echo "   • Railway: https://railway.app"
echo "   • Render: https://render.com"
echo "   • Vercel: https://vercel.com"
echo "   • Heroku: https://heroku.com"
echo ""
echo "3. For local testing, run:"
echo "   npm start"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 