import { useState, useEffect, useRef } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const fileInputRef = useRef(null);
  const mainFileInputRef = useRef(null);

  // Load available quizzes  from manifest
  useEffect(() => {
    const loadAvailableQuizzes = async () => {
      setIsLoadingQuizzes(true);
      try {
        const response = await fetch('/quizzes/quiz-manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          setAvailableQuizzes(manifest.quizzes || []);
        }
      } catch (error) {
        console.error('Error loading quiz manifest:', error);
      } finally {
        setIsLoadingQuizzes(false);
      }
    };

    loadAvailableQuizzes();
  }, []);

  const isUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateQuizData = (data) => {
    return (
      data &&
      data.questions &&
      Array.isArray(data.questions) &&
      data.questions.length > 0 &&
      data.questions.every(q =>
        q.question &&
        q.options &&
        q.correct_answer &&
        typeof q.options === 'object'
      )
    );
  };

  const handleFile = (file) => {
    if (file.type !== 'application/json') {
      setErrorMessage('Please select a valid JSON file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (validateQuizData(data)) {
          loadQuizData(data);
        } else {
          setErrorMessage('Invalid quiz data format. Please check your JSON file structure.');
        }
      } catch (error) {
        setErrorMessage('Error parsing JSON file. Please check if the file is valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  // Load quiz from available quizzes
  const loadPresetQuiz = async (quizFile) => {
    setIsLoadingQuiz(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`/quizzes/${quizFile}`);
      if (response.ok) {
        const data = await response.json();
        if (validateQuizData(data)) {
          loadQuizData(data);
        } else {
          setErrorMessage('Invalid quiz data format in the selected file.');
        }
      } else {
        setErrorMessage('Error loading the selected quiz file.');
      }
    } catch (error) {
      setErrorMessage('Error fetching quiz data. Please try again.');
      console.error('Error loading preset quiz:', error);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const loadQuizData = (data) => {
    const transformedQuestions = data.questions.map(q => ({
      id: q.id || Math.random(),
      question: q.question,
      questionImage: q.Question_image || q.question_image || null,
      options: Object.entries(q.options).map(([key, value]) => ({
        key: key,
        text: isUrl(value) ? '' : value,
        image: isUrl(value) ? value : null
      })),
      correct: Object.keys(q.options).indexOf(q.correct_answer),
      explanation: q.explanation || '',
      explanationImage: q.explanation_image || q.Explanation_image || null
    }));

    setQuizData(data);
    setQuestions(transformedQuestions);
    setUserAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setErrorMessage('');
  };

  const handleSelectOption = (questionIndex, optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitQuiz = () => {
    if (questions.length === 0) {
      setErrorMessage('Please load a quiz first.');
      return;
    }
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const toggle = document.querySelector('.mobile-toggle');
      
      if (window.innerWidth <= 768 &&
          sidebar && !sidebar.contains(event.target) &&
          toggle && !toggle.contains(event.target) &&
          isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);

  const answeredCount = Object.keys(userAnswers).length;
  const remainingCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen relative z-[2]">
      <button 
        className="hidden max-md:block fixed top-5 left-5 z-[1000] bg-white/90 border-none rounded-lg p-2.5 cursor-pointer text-xl"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-5"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl max-h-screen">
            <span 
              className="absolute top-[15px] right-[35px] text-white text-4xl font-bold cursor-pointer hover:opacity-70"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <img 
              src={modalImage} 
              alt="Modal view" 
              className="max-w-full max-h-[80vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="flex min-h-screen relative z-[2]">
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
          <div className="sidebar-header">
            <h2>{quizData?.title || 'Interactive Quiz'}</h2>
            <p>{quizData?.description || 'Select a quiz to start'}</p>
          </div>

          <div className="file-import-section">
            <h3>📁 Import Quiz</h3>
            <div className="w-full">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleFileSelect}
              />
              <label
                className="file-input-label"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose JSON File
              </label>
            </div>
          </div>

          <div className="question-nav">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`question-nav-item ${
                  userAnswers.hasOwnProperty(index) ? 'answered' : ''
                } ${index === currentQuestion ? 'current' : ''}`}
                onClick={() => handleQuestionClick(index)}
              >
                Q{index + 1}
              </div>
            ))}
          </div>

          <div className="progress-summary">
            <h3>Progress Summary</h3>
            <div className="progress-stats">
              <div className="text-center">
                <div className="stat-number">{answeredCount}</div>
                <div className="stat-label">Answered</div>
              </div>
              <div className="text-center">
                <div className="stat-number">{remainingCount}</div>
                <div className="stat-label">Remaining</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 ml-0 md:ml-[280px] p-5 md:p-10">
          {questions.length === 0 ? (
            <div className="welcome-screen">
              <h1>🎯 Interactive MCQ Quiz</h1>
              <p>Select from available quizzes or upload your custom JSON file to start</p>

              {/* Available Quizzes Section - Now on Welcome Screen */}
              <div className="welcome-quiz-library">
                <h2>📚 Available Quizzes</h2>
                {isLoadingQuizzes ? (
                  <div className="welcome-loading-spinner">
                    Loading available quizzes...
                  </div>
                ) : availableQuizzes.length > 0 ? (
                  <div className="welcome-quiz-grid">
                    {availableQuizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="welcome-quiz-item"
                        onClick={() => loadPresetQuiz(quiz.file)}
                      >
                        <div className="welcome-quiz-item-header">
                          <div className="welcome-quiz-icon">{quiz.icon}</div>
                          <h3 className="welcome-quiz-title">{quiz.title}</h3>
                        </div>
                        <div className="welcome-quiz-description">{quiz.description}</div>
                        <div className="welcome-quiz-meta">
                          <div className="welcome-quiz-category">{quiz.category}</div>
                          <div className="welcome-quiz-stats">
                            <span>{quiz.questions} questions</span>
                            <span>{quiz.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-white/70 py-8">
                    <p>No quizzes available at the moment</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="divider"></div>

              {/* Loading indicator for quiz loading */}
              {isLoadingQuiz && (
                <div className="text-white text-center my-8">
                  <div className="text-2xl">Loading quiz...</div>
                </div>
              )}

              <div 
                className={`upload-area ${isDragOver ? 'dragover' : ''}`}
                onClick={() => mainFileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-icon">📄</div>
                <h2 className="text-2xl mb-2">Click here or drag & drop your JSON file</h2>
                <p>Upload your custom quiz questions and images</p>
              </div>
              
              <input
                ref={mainFileInputRef}
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleFileSelect}
              />
              
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="header">
                <h1>{quizData?.title || 'Imported Quiz'}</h1>
                <p>{quizData?.description || `Complete all ${questions.length} questions and submit to see your results`}</p>
              </div>

              <div className="flex flex-col gap-[30px]">
                {questions.map((question, qIndex) => (
                  <div key={qIndex} className="question-card" id={`question-${qIndex}`}>
                    <div className="question-header">
                      <div className="question-number">{qIndex + 1}</div>
                      <div className="question-content">
                        <div className="question-text">{question.question}</div>
                        {question.questionImage && (
                          <img 
                            src={question.questionImage} 
                            alt="Question" 
                            className="question-image"
                            onClick={() => handleImageClick(question.questionImage)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid gap-0 mb-5">
                      {question.options.map((option, optionIndex) => {
                        const letter = String.fromCharCode(65 + optionIndex);
                        const isSelected = userAnswers[qIndex] === optionIndex;
                        const showFeedback = userAnswers.hasOwnProperty(qIndex);
                        const isCorrect = optionIndex === question.correct && showFeedback;
                        const isIncorrect = isSelected && optionIndex !== question.correct && showFeedback;
                        
                        let optionClasses = "option";
                        if (isSelected && !showFeedback) {
                          optionClasses += " selected";
                        } else if (isCorrect) {
                          optionClasses += " correct";
                        } else if (isIncorrect) {
                          optionClasses += " incorrect";
                        }

                        return (
                          <div
                            key={optionIndex}
                            className={optionClasses}
                            onClick={() => !showFeedback && handleSelectOption(qIndex, optionIndex)}
                          >
                            <div className="option-letter">{letter}</div>
                            <div className="option-content">
                              {option.text && (
                                <div className="option-text">{option.text}</div>
                              )}
                              {option.image && (
                                <img 
                                  src={option.image} 
                                  alt={`Option ${letter}`} 
                                  className="option-image"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleImageClick(option.image);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {userAnswers.hasOwnProperty(qIndex) && (
                      <div className={`feedback show ${
                        userAnswers[qIndex] === question.correct ? 'correct' : 'incorrect'
                      }`}>
                        <div>
                          {userAnswers[qIndex] === question.correct ? '✅ Correct!' : '❌ Incorrect'}
                          {userAnswers[qIndex] !== question.correct && (
                            <span>
                              {'. The correct answer is: '}
                              {String.fromCharCode(65 + question.correct)}) {question.options[question.correct].text || 'See image above'}
                            </span>
                          )}
                        </div>
                        {question.explanation && (
                          <div className="mt-3">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                        {question.explanationImage && (
                          <img 
                            src={question.explanationImage} 
                            alt="Explanation" 
                            className="explanation-image"
                            onClick={() => handleImageClick(question.explanationImage)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!showResults && (
                <div className="submit-section">
                  <button
                    onClick={handleSubmitQuiz}
                    className="submit-btn"
                  >
                    Submit Quiz
                  </button>
                </div>
              )}

              {showResults && (
                <div className="results">
                  <div className="score">
                    {Math.round((Object.keys(userAnswers).filter(key => 
                      userAnswers[key] === questions[key].correct
                    ).length / questions.length) * 100)}%
                  </div>
                  <div className="score-details">
                    <div className="score-item">
                      <div className="score-item-number">
                        {Object.keys(userAnswers).filter(key => 
                          userAnswers[key] === questions[key].correct
                        ).length}
                      </div>
                      <div className="score-item-label">Correct</div>
                    </div>
                    <div className="score-item">
                      <div className="score-item-number">
                        {Object.keys(userAnswers).filter(key => 
                          userAnswers[key] !== questions[key].correct
                        ).length}
                      </div>
                      <div class Name="score-item-label">Incorrect</div>
                    </div>
                    <div className="score-item">
                      <div className="score-item-number">
                        {questions.length - Object.keys(userAnswers).length}
                      </div>
                      <div className="score-item-label">Unanswered</div>
                    </div>
                  </div>
                  <button
                    onClick={handleRestartQuiz}
                    className="submit-btn"
                  >
                    Take Quiz Again
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
