# Deployment Guide for Natasha Quiz App

This guide will help you deploy the quiz app so others can access it online.

## Quick Deploy Options

### Option 1: Railway (Recommended - Free & Easy)

1. **Sign up for Railway**: Go to [railway.app](https://railway.app) and create an account
2. **Connect your repository**: 
   - Push your code to GitHub/GitLab
   - Connect Railway to your repository
3. **Deploy**: Railway will automatically detect the Node.js app and deploy it
4. **Get your URL**: Railway will provide you with a public URL like `https://your-app-name.railway.app`

### Option 2: Render (Free & Easy)

1. **Sign up for Render**: Go to [render.com](https://render.com) and create an account
2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Choose "Web Service"
   - Set build command: `npm install`
   - Set start command: `node server.js`
3. **Deploy**: Render will automatically deploy your app
4. **Get your URL**: Render will provide you with a public URL

### Option 3: Heroku (Free tier discontinued, but still popular)

1. **Install Heroku CLI**: Download from [heroku.com](https://heroku.com)
2. **Login and create app**:
   ```bash
   heroku login
   heroku create your-app-name
   ```
3. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```
4. **Get your URL**: `https://your-app-name.herokuapp.com`

### Option 4: Vercel (Free & Easy)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com)
2. **Import your repository**: Connect your GitHub repository
3. **Configure**: Vercel will auto-detect it's a Node.js app
4. **Deploy**: Vercel will automatically deploy your app
5. **Get your URL**: Vercel will provide you with a public URL

## Local Development

To run the app locally:

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or directly
node server.js
```

The app will be available at:
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## Environment Variables

The app uses these environment variables:
- `PORT`: The port to run on (default: 3000)
- `NODE_ENV`: Set to 'production' for production deployments

## File Structure

```
natasha/
├── server.js          # Main server file
├── package.json       # Dependencies
├── index.html         # Main quiz interface
├── admin.html         # Admin panel
├── admin.js           # Admin functionality
├── admin-styles.css   # Admin styles
├── quiz-data.json     # Quiz data storage
├── uploads/           # Image uploads directory
│   └── quiz-images/   # Quiz images
└── [deployment files]
```

## Security Considerations

For production deployment:

1. **Add authentication** to the admin panel
2. **Set up HTTPS** (most platforms do this automatically)
3. **Add rate limiting** for uploads
4. **Consider using a database** instead of JSON files for larger scale
5. **Add input validation** and sanitization

## Troubleshooting

### Common Issues:

1. **Port already in use**: Change the PORT environment variable
2. **Upload directory not found**: The app will create it automatically
3. **CORS errors**: The app includes CORS middleware, but you might need to configure it for your domain
4. **File size limits**: The app limits uploads to 10MB

### Logs:

Check your platform's logs for error messages:
- Railway: Dashboard → Your app → Deployments → View logs
- Render: Dashboard → Your service → Logs
- Heroku: `heroku logs --tail`

## Support

If you encounter issues:
1. Check the logs for error messages
2. Ensure all dependencies are installed (`npm install`)
3. Verify the server is running on the correct port
4. Check that the uploads directory is writable

## Next Steps

Once deployed, you can:
1. Share the admin URL with trusted users to add questions
2. Share the main URL with users to take the quiz
3. Monitor usage through your platform's dashboard
4. Set up custom domains if needed 