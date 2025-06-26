const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/quiz-images';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Load quiz data
function loadQuizData() {
    try {
        const data = fs.readFileSync('quiz-data.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading quiz data:', error);
        return {
            quizzes: {
                'missing-parts': {
                    title: 'Guess the Missing Picture Parts',
                    description: 'whaaaat waaaas miiiising?',
                    icon: 'fas fa-heart',
                    questions: []
                },
                'tenerife-croatia': {
                    title: 'Tenerife or Croatia?',
                    description: 'Beach holidays, so confusing, where did we go?',
                    icon: 'fas fa-plane',
                    questions: []
                },
                'restaurants': {
                    title: 'Restaurants or food where you weren\'t present?',
                    description: 'We always eat together, but sometimes not, so, what did you eat without me???',
                    icon: 'fas fa-laugh',
                    questions: []
                },
                'funny-moments': {
                    title: 'Funniest moments of Natasha - who took this picture?',
                    description: 'I\'m not sure, but I\'m sure it\'s not me.',
                    icon: 'fas fa-star',
                    questions: []
                },
                'others': {
                    title: 'Other Special Moments',
                    description: 'Other special memories',
                    icon: 'fas fa-star',
                    questions: []
                }
            },
            images: {}
        };
    }
}

// Save quiz data
function saveQuizData(data) {
    try {
        fs.writeFileSync('quiz-data.json', JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving quiz data:', error);
        return false;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/api/quiz-data', (req, res) => {
    const quizData = loadQuizData();
    res.json(quizData);
});

app.post('/api/upload-question', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image file provided' });
        }

        const { question, answer, notes, category } = req.body;
        
        if (!question || !answer || !category) {
            return res.status(400).json({ 
                success: false, 
                error: 'Question, answer, and category are required' 
            });
        }

        // Load current quiz data
        const quizData = loadQuizData();
        
        // Generate unique ID for the question
        const questionId = Date.now().toString();
        
        // Create question object
        const questionObj = {
            id: questionId,
            image: `uploads/quiz-images/${req.file.filename}`,
            question: question,
            answer: answer,
            notes: notes || '',
            category: category
        };

        // Add question to the appropriate category
        if (quizData.quizzes[category]) {
            quizData.quizzes[category].questions.push(questionObj);
        } else {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid category' 
            });
        }

        // Save updated quiz data
        if (saveQuizData(quizData)) {
            res.json({
                success: true,
                question: questionObj,
                message: 'Question uploaded successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to save quiz data'
            });
        }

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error during upload'
        });
    }
});

app.delete('/api/question/:category/:questionId', (req, res) => {
    try {
        const { category, questionId } = req.params;
        const quizData = loadQuizData();

        if (!quizData.quizzes[category]) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }

        const questionIndex = quizData.quizzes[category].questions.findIndex(q => q.id === questionId);
        if (questionIndex === -1) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }

        const question = quizData.quizzes[category].questions[questionIndex];
        
        // Delete image file
        if (question.image && fs.existsSync(question.image)) {
            fs.unlinkSync(question.image);
        }

        // Remove question from array
        quizData.quizzes[category].questions.splice(questionIndex, 1);

        if (saveQuizData(quizData)) {
            res.json({ success: true, message: 'Question deleted successfully' });
        } else {
            res.status(500).json({ success: false, error: 'Failed to save quiz data' });
        }

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, error: 'Server error during deletion' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Main site: http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
}); 