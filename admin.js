class QuizAdmin {
    constructor() {
        this.quizData = {};
        // Auto-detect server URL for both local and deployed environments
        this.serverUrl = window.location.origin;
        this.selectedFile = null;
        
        this.init();
    }

    async init() {
        await this.loadQuizData();
        this.bindEvents();
        this.renderQuestions();
    }

    async loadQuizData() {
        try {
            const response = await fetch(`${this.serverUrl}/api/quiz-data`);
            if (response.ok) {
                this.quizData = await response.json();
            } else {
                throw new Error('Failed to load quiz data');
            }
        } catch (error) {
            console.error('Error loading quiz data:', error);
            this.showStatus('Error loading quiz data. Please check if the server is running.', 'error');
        }
    }

    bindEvents() {
        // Form submission
        document.getElementById('uploadForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetForm());
        
        // Image upload
        const imageUpload = document.getElementById('imageUpload');
        const uploadArea = document.getElementById('imageUploadArea');
        
        imageUpload.addEventListener('change', (e) => this.handleImageSelect(e));
        
        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleImageDrop(e);
        });

        // Click to upload
        document.getElementById('uploadPlaceholder').addEventListener('click', () => {
            imageUpload.click();
        });

        // Remove image
        document.getElementById('removeImage').addEventListener('click', () => {
            this.removeSelectedImage();
        });

        // Category filter
        document.getElementById('filterCategory').addEventListener('change', () => {
            this.renderQuestions();
        });
    }

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.processSelectedImage(file);
        }
    }

    handleImageDrop(event) {
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            this.processSelectedImage(file);
        }
    }

    processSelectedImage(file) {
        this.selectedFile = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('uploadPlaceholder').style.display = 'none';
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeSelectedImage() {
        this.selectedFile = null;
        document.getElementById('imageUpload').value = '';
        document.getElementById('uploadPlaceholder').style.display = 'block';
        document.getElementById('imagePreview').style.display = 'none';
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        
        if (!this.selectedFile) {
            this.showStatus('Please select an image first.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('question', document.getElementById('questionText').value);
        formData.append('answer', document.getElementById('answerText').value);
        formData.append('notes', document.getElementById('notesText').value);
        formData.append('category', document.getElementById('categorySelect').value);

        // Disable submit button
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

        try {
            const response = await fetch(`${this.serverUrl}/api/upload-question`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showStatus('Question uploaded successfully!', 'success');
                this.resetForm();
                await this.loadQuizData();
                this.renderQuestions();
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            this.showStatus(`Upload failed: ${error.message}`, 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    resetForm() {
        document.getElementById('uploadForm').reset();
        this.removeSelectedImage();
        this.showStatus('Form reset successfully.', 'info');
    }

    renderQuestions() {
        const questionsList = document.getElementById('questionsList');
        const filterCategory = document.getElementById('filterCategory').value;
        
        questionsList.innerHTML = '';

        let allQuestions = [];
        
        // Collect all questions from all categories
        Object.keys(this.quizData.quizzes).forEach(categoryKey => {
            const category = this.quizData.quizzes[categoryKey];
            category.questions.forEach(question => {
                allQuestions.push({
                    ...question,
                    categoryKey: categoryKey,
                    categoryTitle: category.title
                });
            });
        });

        // Filter by category if selected
        if (filterCategory) {
            allQuestions = allQuestions.filter(q => q.categoryKey === filterCategory);
        }

        // Sort by ID (newest first)
        allQuestions.sort((a, b) => b.id - a.id);

        if (allQuestions.length === 0) {
            questionsList.innerHTML = '<div class="no-questions">No questions found.</div>';
            return;
        }

        allQuestions.forEach(question => {
            const questionElement = this.createQuestionElement(question);
            questionsList.appendChild(questionElement);
        });
    }

    createQuestionElement(question) {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.innerHTML = `
            <div class="question-header">
                <div class="question-category">
                    <i class="fas fa-tag"></i> ${question.categoryTitle}
                </div>
                <div class="question-actions">
                    <button class="delete-btn" onclick="quizAdmin.deleteQuestion('${question.categoryKey}', '${question.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="question-content">
                <div class="question-image">
                    <img src="${this.serverUrl}/${question.image}" alt="Question image" onerror="this.style.display='none'">
                </div>
                <div class="question-details">
                    <div class="question-text">
                        <strong>Question:</strong> ${this.escapeHtml(question.question)}
                    </div>
                    <div class="answer-text">
                        <strong>Answer:</strong> ${this.escapeHtml(question.answer)}
                    </div>
                    ${question.notes ? `<div class="notes-text">
                        <strong>Notes:</strong> ${this.escapeHtml(question.notes)}
                    </div>` : ''}
                </div>
            </div>
        `;
        return div;
    }

    async deleteQuestion(category, questionId) {
        if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`${this.serverUrl}/api/question/${category}/${questionId}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                this.showStatus('Question deleted successfully!', 'success');
                await this.loadQuizData();
                this.renderQuestions();
            } else {
                throw new Error(result.error || 'Delete failed');
            }
        } catch (error) {
            console.error('Delete error:', error);
            this.showStatus(`Delete failed: ${error.message}`, 'error');
        }
    }

    showStatus(message, type = 'info') {
        const statusElement = document.getElementById('statusMessage');
        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'status-message';
        }, 5000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the admin interface
const quizAdmin = new QuizAdmin(); 