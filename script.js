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
            } else {
                // Fallback to default data if API doesn't work
                this.quizData = {
                    quizzes: {
                        'missing-parts': {
                            title: 'Guess the Missing Picture Parts',
                            questions: [
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Missing+Part+1',
                                    question: 'What was missing from this photo?',
                                    options: ['A person', 'A landmark', 'A car', 'A building'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Missing+Part+2',
                                    question: 'Which part of the scene was cut off?',
                                    options: ['The sky', 'The ground', 'The left side', 'The right side'],
                                    correct: 2
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Missing+Part+3',
                                    question: 'What object was missing from this picture?',
                                    options: ['A tree', 'A sign', 'A person', 'A window'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Missing+Part+4',
                                    question: 'Which detail was not visible in the original?',
                                    options: ['The background', 'The foreground', 'The middle ground', 'The lighting'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Missing+Part+5',
                                    question: 'What was missing from the composition?',
                                    options: ['Color', 'Texture', 'Depth', 'All of the above'],
                                    correct: 3
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Missing+Part+6',
                                    question: 'Which element was incomplete in this shot?',
                                    options: ['The subject', 'The setting', 'The mood', 'The story'],
                                    correct: 1
                                }
                            ]
                        },
                        'tenerife-croatia': {
                            title: 'Tenerife or Croatia?',
                            questions: [
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Beach+1',
                                    question: 'Where was this beach photo taken?',
                                    options: ['Tenerife', 'Croatia', 'Both', 'Neither'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Beach+2',
                                    question: 'Which country has this coastline?',
                                    options: ['Tenerife', 'Croatia', 'Spain', 'Italy'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Beach+3',
                                    question: 'Where did we see this sunset?',
                                    options: ['Tenerife', 'Croatia', 'Greece', 'Portugal'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Beach+4',
                                    question: 'Which destination had this architecture?',
                                    options: ['Tenerife', 'Croatia', 'Both', 'Neither'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Beach+5',
                                    question: 'Where was this food photo taken?',
                                    options: ['Tenerife', 'Croatia', 'Spain', 'Mediterranean'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Beach+6',
                                    question: 'Which place had this view?',
                                    options: ['Tenerife', 'Croatia', 'Both', 'Neither'],
                                    correct: 1
                                }
                            ]
                        },
                        'restaurants': {
                            title: 'Restaurants Where You Weren\'t Present',
                            questions: [
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Restaurant+1',
                                    question: 'What did I eat at this restaurant?',
                                    options: ['Pizza', 'Pasta', 'Sushi', 'Burger'],
                                    correct: 2
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Restaurant+2',
                                    question: 'Which cuisine was this?',
                                    options: ['Italian', 'Japanese', 'Mexican', 'Thai'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Restaurant+3',
                                    question: 'What was the main dish here?',
                                    options: ['Steak', 'Fish', 'Chicken', 'Vegetarian'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Restaurant+4',
                                    question: 'Where was this restaurant located?',
                                    options: ['City center', 'Suburbs', 'Airport', 'Hotel'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Restaurant+5',
                                    question: 'What was the dessert?',
                                    options: ['Ice cream', 'Cake', 'Fruit', 'Chocolate'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Restaurant+6',
                                    question: 'How much did this meal cost?',
                                    options: ['€10-20', '€20-30', '€30-40', '€40+'],
                                    correct: 2
                                }
                            ]
                        },
                        'funny-moments': {
                            title: 'Funniest Moments - Who Took This Picture?',
                            questions: [
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Funny+1',
                                    question: 'Who captured this embarrassing moment?',
                                    options: ['You', 'Me', 'A stranger', 'Both of us'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Funny+2',
                                    question: 'Who was behind the camera for this shot?',
                                    options: ['You', 'Me', 'A friend', 'Self-timer'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Funny+3',
                                    question: 'Who took this candid photo?',
                                    options: ['You', 'Me', 'A passerby', 'A waiter'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Funny+4',
                                    question: 'Who was the photographer here?',
                                    options: ['You', 'Me', 'A tourist', 'A local'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Funny+5',
                                    question: 'Who snapped this moment?',
                                    options: ['You', 'Me', 'A stranger', 'Both'],
                                    correct: 1
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Funny+6',
                                    question: 'Who was responsible for this photo?',
                                    options: ['You', 'Me', 'A friend', 'A family member'],
                                    correct: 0
                                }
                            ]
                        },
                        'others': {
                            title: 'Other Special Moments',
                            questions: [
                                {
                                    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Other+1',
                                    question: 'What was happening in this moment?',
                                    options: ['Celebration', 'Travel', 'Work', 'Relaxation'],
                                    correct: 0
                                },
                                {
                                    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Other+2',
                                    question: 'Where were we in this photo?',
                                    options: ['Home', 'Abroad', 'Work', 'Outdoors'],
                                    correct: 1
                                }
                            ]
                        }
                    }
                };
            }
        } catch (error) {
            console.error('Error loading quiz data:', error);
            // Use fallback data if API fails
            this.quizData = {
                quizzes: {
                    'missing-parts': {
                        title: 'Guess the Missing Picture Parts',
                        questions: []
                    },
                    'tenerife-croatia': {
                        title: 'Tenerife or Croatia?',
                        questions: []
                    },
                    'restaurants': {
                        title: 'Restaurants Where You Weren\'t Present',
                        questions: []
                    },
                    'funny-moments': {
                        title: 'Funniest Moments - Who Took This Picture?',
                        questions: []
                    },
                    'others': {
                        title: 'Other Special Moments',
                        questions: []
                    }
                }
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
                    this.startQuiz(quizType);
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
        
        // Handle different question formats
        let options = [];
        if (question.options) {
            // Old format with options array
            options = question.options;
        } else if (question.answer) {
            // New format - create options from the answer
            options = [question.answer, 'I don\'t remember', 'Maybe...', 'Not sure'];
        } else {
            // Fallback
            options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
        }
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            
            // Check if this option was previously selected
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => this.selectOption(index));
            quizOptions.appendChild(optionElement);
        });
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    selectOption(optionIndex) {
        // Remove previous selection
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        
        // Select new option
        options[optionIndex].classList.add('selected');
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
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
        const results = [];
        
        quiz.questions.forEach((question, index) => {
            let isCorrect = false;
            let userAnswer = '';
            let correctAnswer = '';
            
            if (question.options) {
                // Old format with options array
                isCorrect = this.userAnswers[index] === question.correct;
                userAnswer = question.options[this.userAnswers[index] || 0];
                correctAnswer = question.options[question.correct];
            } else if (question.answer) {
                // New format with single answer
                const selectedOption = this.userAnswers[index];
                if (selectedOption === 0) {
                    // First option is the correct answer
                    isCorrect = true;
                    userAnswer = question.answer;
                    correctAnswer = question.answer;
                } else {
                    isCorrect = false;
                    userAnswer = ['I don\'t remember', 'Maybe...', 'Not sure'][selectedOption - 1] || 'No answer';
                    correctAnswer = question.answer;
                }
            }
            
            if (isCorrect) correctAnswers++;
            
            results.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer,
                isCorrect: isCorrect
            });
        });
        
        const score = Math.round((correctAnswers / quiz.questions.length) * 100);
        this.showResults(score, results);
    }

    showResults(score, results) {
        const resultsModal = document.getElementById('resultsModal');
        const scorePercentage = document.getElementById('scorePercentage');
        const scoreMessage = document.getElementById('scoreMessage');
        const resultsSummary = document.getElementById('resultsSummary');
        
        scorePercentage.textContent = `${score}%`;
        
        // Set score message based on performance
        if (score >= 90) {
            scoreMessage.textContent = 'Excellent! You have an amazing memory!';
        } else if (score >= 70) {
            scoreMessage.textContent = 'Great job! You remember well!';
        } else if (score >= 50) {
            scoreMessage.textContent = 'Good effort! Some memories are fuzzy.';
        } else {
            scoreMessage.textContent = 'Time to refresh those memories!';
        }
        
        // Create results summary
        resultsSummary.innerHTML = '<h4>Question Summary:</h4>';
        results.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <span>Question ${index + 1}: ${result.question}</span>
                <span class="result-status ${result.isCorrect ? 'correct' : 'incorrect'}">
                    ${result.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
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
}

// Initialize quiz system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new QuizSystem();
}); 