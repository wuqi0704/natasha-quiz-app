// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const timelineSection = document.querySelector('.timeline-section');
            timelineSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Intersection Observer for timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Photo placeholder click handlers
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // Create a file input for photo upload
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Replace placeholder with actual image
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '100%';
                        img.style.height = '200px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '8px';
                        
                        placeholder.innerHTML = '';
                        placeholder.appendChild(img);
                        placeholder.style.padding = '0';
                        placeholder.style.border = 'none';
                        placeholder.style.background = 'transparent';
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add hover effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add counter animation to celebration stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue === '10') {
                    animateCounter(target, 0, 10, 2000);
                } else if (finalValue === '∞') {
                    // For infinity symbol, just add a pulse effect
                    target.style.animation = 'pulse 2s infinite';
                } else if (finalValue === '❤️') {
                    // For heart, add a heartbeat effect
                    target.style.animation = 'heartbeat 1.5s infinite';
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Counter animation function
    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Add CSS animations for new effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.05); }
        }
        
        .timeline-item.visible .timeline-marker {
            animation: markerPulse 0.6s ease-out;
        }
        
        @keyframes markerPulse {
            0% { transform: translateX(-50%) scale(0); }
            50% { transform: translateX(-50%) scale(1.2); }
            100% { transform: translateX(-50%) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });

    // Add keyboard navigation for timeline
    document.addEventListener('keydown', function(e) {
        const visibleItems = document.querySelectorAll('.timeline-item.visible');
        const currentIndex = Array.from(visibleItems).findIndex(item => 
            item.getBoundingClientRect().top > 0 && item.getBoundingClientRect().top < window.innerHeight
        );
        
        if (e.key === 'ArrowDown' && currentIndex < visibleItems.length - 1) {
            visibleItems[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            visibleItems[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Quiz System
class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizData = {};

        this.init();
    }

    async init() {
        await this.loadQuizData();
        this.bindEvents();
    }

    async loadQuizData() {
        try {
            // Auto-detect server URL for both local and deployed environments
            const serverUrl = window.location.origin;
            const response = await fetch(`${serverUrl}/api/quiz-data`);
            if (response.ok) {
                this.quizData = await response.json();
                console.log('Quiz data loaded successfully:', this.quizData);
            } else {
                throw new Error('Failed to load quiz data from API');
            }
        } catch (error) {
            console.error('Error loading quiz data:', error);
            // Fallback to default data structure if API doesn't work
            this.quizData = {
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

    bindEvents() {
        // Memory card click events
        const memoryCards = document.querySelectorAll('.memory-card');
        memoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const quizType = card.getAttribute('data-quiz');
                if (quizType && this.quizData.quizzes && this.quizData.quizzes[quizType]) {
                    const quiz = this.quizData.quizzes[quizType];
                    if (quiz.questions && quiz.questions.length > 0) {
                        this.startQuiz(quizType);
                    } else {
                        // Show message if no questions available
                        this.showStatus(`No questions available for ${quiz.title} yet. Add some questions in the admin panel!`, 'info');
                    }
                }
            });
        });

        // Quiz modal events
        const closeQuizBtn = document.getElementById('closeQuiz');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        closeQuizBtn.addEventListener('click', () => this.closeQuiz());
        prevBtn.addEventListener('click', () => this.previousQuestion());
        nextBtn.addEventListener('click', () => this.nextQuestion());
        submitBtn.addEventListener('click', () => this.submitQuiz());

        // Results modal events
        const closeResultsBtn = document.getElementById('closeResults');
        const retryBtn = document.getElementById('retryBtn');
        const closeResultsBtn2 = document.getElementById('closeResultsBtn');

        closeResultsBtn.addEventListener('click', () => this.closeResults());
        retryBtn.addEventListener('click', () => this.retryQuiz());
        closeResultsBtn2.addEventListener('click', () => this.closeResults());

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            const quizModal = document.getElementById('quizModal');
            const resultsModal = document.getElementById('resultsModal');
            
            if (e.target === quizModal) {
                this.closeQuiz();
            }
            if (e.target === resultsModal) {
                this.closeResults();
            }
        });
    }

    startQuiz(quizType) {
        this.currentQuiz = quizType;
        this.currentQuestionIndex = 0;
        const quiz = this.quizData.quizzes[quizType];
        this.userAnswers = new Array(quiz.questions.length).fill(null);
        
        const quizModal = document.getElementById('quizModal');
        const quizTitle = document.getElementById('quizTitle');
        
        quizTitle.textContent = quiz.title;
        quizModal.style.display = 'block';
        
        this.displayQuestion();
    }

    displayQuestion() {
        const quiz = this.quizData.quizzes[this.currentQuiz];
        const question = quiz.questions[this.currentQuestionIndex];
        
        // Update progress
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const progress = ((this.currentQuestionIndex + 1) / quiz.questions.length) * 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${this.currentQuestionIndex + 1} / ${quiz.questions.length}`;
        
        // Update image and question
        const quizImage = document.getElementById('quizImage');
        const quizQuestion = document.getElementById('quizQuestion');
        const quizOptions = document.getElementById('quizOptions');
        
        // Handle image URL - check if it's a relative path or full URL
        let imageUrl = question.image;
        if (question.image && !question.image.startsWith('http') && !question.image.startsWith('data:')) {
            // It's a relative path, make it absolute
            imageUrl = `${window.location.origin}/${question.image}`;
        }
        
        quizImage.src = imageUrl;
        quizQuestion.textContent = question.question;
        
        // Clear and populate options
        quizOptions.innerHTML = '';
        
        // Add scoring options first
        const scoringLabel = document.createElement('div');
        scoringLabel.className = 'scoring-label';
        scoringLabel.textContent = 'How did they do?';
        quizOptions.appendChild(scoringLabel);
        
        // Create options for manual scoring
        const options = [
            'Correct!',
            'Incorrect',
            'Partially Correct',
            'Skip'
        ];
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            
            // Check if this option was previously selected
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => this.selectOption(index, question));
            quizOptions.appendChild(optionElement);
        });
        
        // Create answer display area (initially hidden)
        const answerDisplay = document.createElement('div');
        answerDisplay.className = 'answer-display';
        answerDisplay.id = 'answerDisplay';
        answerDisplay.style.display = 'none';
        answerDisplay.innerHTML = `
            <div class="answer-label">Correct Answer:</div>
            <div class="answer-text">${question.answer}</div>
            ${question.notes ? `<div class="answer-notes">Note: ${question.notes}</div>` : ''}
        `;
        quizOptions.appendChild(answerDisplay);
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    selectOption(optionIndex, question) {
        // Remove previous selection
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        
        // Select new option
        options[optionIndex].classList.add('selected');
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
        // Show the answer after selection
        const answerDisplay = document.getElementById('answerDisplay');
        if (answerDisplay) {
            answerDisplay.style.display = 'block';
            answerDisplay.innerHTML = `
                <div class="answer-label">Correct Answer:</div>
                <div class="answer-text">${question.answer}</div>
                ${question.notes ? `<div class="answer-notes">Note: ${question.notes}</div>` : ''}
            `;
        }
        
        // Enable next button if not on last question
        const nextBtn = document.getElementById('nextBtn');
        if (this.currentQuestionIndex < this.quizData.quizzes[this.currentQuiz].questions.length - 1) {
            nextBtn.disabled = false;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.quizData.quizzes[this.currentQuiz].questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.quizData.quizzes[this.currentQuiz].questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    submitQuiz() {
        const quiz = this.quizData.quizzes[this.currentQuiz];
        let correctAnswers = 0;
        let partiallyCorrectAnswers = 0;
        let skippedAnswers = 0;
        const results = [];
        
        quiz.questions.forEach((question, index) => {
            const selectedOption = this.userAnswers[index];
            let isCorrect = false;
            let isPartiallyCorrect = false;
            let userAnswer = '';
            let correctAnswer = question.answer;
            let score = 0;
            
            if (selectedOption === 0) {
                // Correct
                isCorrect = true;
                userAnswer = 'Correct!';
                score = 1;
                correctAnswers++;
            } else if (selectedOption === 1) {
                // Incorrect
                isCorrect = false;
                isPartiallyCorrect = false;
                userAnswer = 'Incorrect';
                score = 0;
            } else if (selectedOption === 2) {
                // Partially correct
                isCorrect = false;
                isPartiallyCorrect = true;
                userAnswer = 'Partially Correct';
                score = 0.5;
                partiallyCorrectAnswers++;
            } else if (selectedOption === 3) {
                // Skip
                isCorrect = false;
                isPartiallyCorrect = false;
                userAnswer = 'Skipped';
                score = 0;
                skippedAnswers++;
            }
            
            results.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer,
                isCorrect: isCorrect,
                isPartiallyCorrect: isPartiallyCorrect,
                score: score,
                notes: question.notes || ''
            });
        });
        
        const totalQuestions = quiz.questions.length - skippedAnswers;
        const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        this.showResults(score, results, correctAnswers, partiallyCorrectAnswers, totalQuestions);
    }

    showResults(score, results, correctCount, partiallyCorrectCount, totalQuestions) {
        const resultsModal = document.getElementById('resultsModal');
        const scorePercentage = document.getElementById('scorePercentage');
        const scoreMessage = document.getElementById('scoreMessage');
        const resultsSummary = document.getElementById('resultsSummary');
        
        scorePercentage.textContent = `${score}%`;
        
        // Set score message based on performance
        if (score >= 90) {
            scoreMessage.textContent = 'Excellent! Amazing memory!';
        } else if (score >= 70) {
            scoreMessage.textContent = 'Great job! Good memory!';
        } else if (score >= 50) {
            scoreMessage.textContent = 'Good effort! Some memories are fuzzy.';
        } else {
            scoreMessage.textContent = 'Time to refresh those memories!';
        }
        
        // Create results summary
        resultsSummary.innerHTML = `
            <h4>Question Summary:</h4>
            <div class="score-breakdown">
                <div class="breakdown-item correct">
                    <span class="breakdown-label">Correct:</span>
                    <span class="breakdown-count">${correctCount}</span>
                </div>
                <div class="breakdown-item partial">
                    <span class="breakdown-label">Partially Correct:</span>
                    <span class="breakdown-count">${partiallyCorrectCount}</span>
                </div>
                <div class="breakdown-item total">
                    <span class="breakdown-label">Total Questions:</span>
                    <span class="breakdown-count">${totalQuestions}</span>
                </div>
            </div>
        `;
        
        results.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            // Determine status class and text
            let statusClass = 'incorrect';
            let statusText = '✗ Incorrect';
            
            if (result.isCorrect) {
                statusClass = 'correct';
                statusText = '✓ Correct';
            } else if (result.isPartiallyCorrect) {
                statusClass = 'partial';
                statusText = '~ Partially Correct';
            }
            
            resultItem.innerHTML = `
                <div class="result-question">
                    <strong>Question ${index + 1}:</strong> ${result.question}
                </div>
                <div class="result-answers">
                    <span class="your-answer">Your judgment: ${result.userAnswer}</span>
                    <span class="correct-answer">Correct answer: ${result.correctAnswer}</span>
                </div>
                <span class="result-status ${statusClass}">
                    ${statusText}
                </span>
                ${result.notes ? `<div class="result-notes">Note: ${result.notes}</div>` : ''}
            `;
            resultsSummary.appendChild(resultItem);
        });
        
        // Close quiz modal and show results
        this.closeQuiz();
        resultsModal.style.display = 'block';
    }

    closeQuiz() {
        const quizModal = document.getElementById('quizModal');
        quizModal.style.display = 'none';
    }

    closeResults() {
        const resultsModal = document.getElementById('resultsModal');
        resultsModal.style.display = 'none';
    }

    retryQuiz() {
        this.closeResults();
        this.startQuiz(this.currentQuiz);
    }

    showStatus(message, type = 'info') {
        // Create a temporary status message
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-message ${type}`;
        statusDiv.textContent = message;
        statusDiv.style.position = 'fixed';
        statusDiv.style.top = '20px';
        statusDiv.style.left = '50%';
        statusDiv.style.transform = 'translateX(-50%)';
        statusDiv.style.zIndex = '10000';
        statusDiv.style.padding = '12px 20px';
        statusDiv.style.borderRadius = '8px';
        statusDiv.style.fontWeight = '500';
        statusDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        
        // Set colors based on type
        switch(type) {
            case 'success':
                statusDiv.style.background = '#dcfce7';
                statusDiv.style.color = '#166534';
                statusDiv.style.border = '1px solid #bbf7d0';
                break;
            case 'error':
                statusDiv.style.background = '#fef2f2';
                statusDiv.style.color = '#dc2626';
                statusDiv.style.border = '1px solid #fecaca';
                break;
            case 'warning':
                statusDiv.style.background = '#fef3c7';
                statusDiv.style.color = '#d97706';
                statusDiv.style.border = '1px solid #fde68a';
                break;
            default:
                statusDiv.style.background = '#dbeafe';
                statusDiv.style.color = '#1d4ed8';
                statusDiv.style.border = '1px solid #bfdbfe';
        }
        
        document.body.appendChild(statusDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.parentNode.removeChild(statusDiv);
            }
        }, 5000);
    }
}

// Initialize quiz system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new QuizSystem();
}); 