# Natasha Quiz App 🎉

A beautiful memory quiz application for Natasha, featuring a streamlined admin interface for easy content management.

## ✨ Features

- **Streamlined Upload System**: Upload images with questions, answers, and notes all at once
- **Category Management**: Organize questions into different categories
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Management**: Add, view, and delete questions through the admin panel
- **Auto-deployment Ready**: Configured for easy deployment to various platforms

## 🚀 Quick Start

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Access the app**:
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Deployment

The app is ready for deployment to various platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick deploy options**:
- **Railway** (Recommended): https://railway.app
- **Render**: https://render.com
- **Vercel**: https://vercel.com
- **Heroku**: https://heroku.com

## 📁 Project Structure

```
natasha/
├── server.js              # Express server with API endpoints
├── package.json           # Dependencies and scripts
├── index.html             # Main quiz interface
├── admin.html             # Admin panel interface
├── admin.js               # Admin functionality
├── admin-styles.css       # Admin panel styles
├── script.js              # Main quiz functionality
├── styles.css             # Main site styles
├── quiz-data.json         # Quiz data storage
├── uploads/               # Image uploads directory
│   └── quiz-images/       # Quiz images
├── DEPLOYMENT.md          # Deployment guide
├── deploy.sh              # Quick setup script
└── [deployment configs]   # Platform-specific configs
```

## 🎯 How It Works

### Admin Workflow
1. **Upload**: Select an image, write a question, provide the answer, add optional notes, and choose a category
2. **Save**: Everything is saved together - image to `uploads/quiz-images/`, question data to `quiz-data.json`
3. **Manage**: View all questions, filter by category, delete questions (removes both data and image)

### Quiz Experience
1. **Select Category**: Choose from available quiz categories
2. **Answer Questions**: View images and answer questions
3. **See Results**: Get score and review answers

## 🔧 API Endpoints

- `GET /api/quiz-data` - Get all quiz data
- `POST /api/upload-question` - Upload new question with image
- `DELETE /api/question/:category/:questionId` - Delete a question

## 🎨 Customization

### Adding New Categories
Edit `server.js` and add new categories to the `loadQuizData()` function:

```javascript
'new-category': {
    title: 'Your Category Title',
    description: 'Category description',
    icon: 'fas fa-icon-name',
    questions: []
}
```

### Styling
- Main site: Edit `styles.css`
- Admin panel: Edit `admin-styles.css`

## 🔒 Security Notes

For production deployment:
- Add authentication to the admin panel
- Set up HTTPS (automatic on most platforms)
- Consider rate limiting for uploads
- Add input validation

## 🐛 Troubleshooting

### Common Issues

1. **Server won't start**: Check if port 3000 is available or set `PORT` environment variable
2. **Uploads fail**: Ensure `uploads/quiz-images/` directory exists and is writable
3. **Images don't load**: Check file paths and permissions

### Logs
Check your platform's logs for detailed error messages.

## 📝 License

MIT License - feel free to use and modify!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ for Natasha** 