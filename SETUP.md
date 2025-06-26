# Setup Guide - Fixing Upload Errors

## Problem
The quiz application was showing "data uploading errors" because it was trying to save files client-side only, which doesn't work in web browsers for security reasons.

## Solution
I've created a Node.js server to handle file uploads and data persistence properly.

## Setup Instructions

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

### 3. Access the Application
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin.html

## What's Fixed

### Before (Client-side only):
- ❌ Images couldn't be saved to filesystem
- ❌ Quiz data only downloaded as JSON file
- ❌ No persistent storage
- ❌ Upload errors

### After (With Server):
- ✅ Images are properly saved to `uploads/quiz-images/` folder
- ✅ Quiz data is saved to `quiz-data.json`
- ✅ Proper error handling and user feedback
- ✅ File uploads work correctly

## Server Features

- **Image Upload**: Handles file uploads with proper validation
- **Data Persistence**: Saves quiz data to JSON file
- **File Management**: Deletes images when removed from quiz
- **Error Handling**: Proper error messages and fallbacks
- **CORS Support**: Allows cross-origin requests
- **File Size Limits**: 10MB limit per image
- **Image Validation**: Only accepts image files

## API Endpoints

- `POST /api/upload-image` - Upload an image
- `POST /api/save-quiz-data` - Save quiz data
- `GET /api/quiz-data` - Load quiz data
- `DELETE /api/delete-image/:imageId` - Delete an image

## Troubleshooting

If you still see upload errors:

1. **Check if server is running**: Make sure you see "Server running on http://localhost:3000" in the terminal
2. **Check browser console**: Look for any JavaScript errors
3. **Check file permissions**: Make sure the `uploads/` folder is writable
4. **Restart server**: Stop the server (Ctrl+C) and run `npm start` again

## File Structure

```
natasha/
├── server.js          # Node.js server
├── package.json       # Dependencies
├── admin.js          # Updated admin interface
├── admin.html        # Admin panel
├── quiz-data.json    # Quiz data (auto-created)
├── uploads/
│   └── quiz-images/  # Uploaded images
└── ... (other files)
``` 