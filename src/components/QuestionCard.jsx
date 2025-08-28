const QuestionCard = ({ 
  question, 
  questionIndex, 
  userAnswer, 
  onSelectOption, 
  onImageClick, 
  showFeedback 
}) => {
  return (
    <div className="glass-white rounded-3xl p-8 shadow-xl border border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-start gap-4 mb-5">
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white min-w-[40px] h-10 rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-400/30 flex-shrink-0">
          {questionIndex + 1}
        </div>
        <div className="flex-1">
          <div className="text-xl text-gray-800 leading-relaxed font-medium mb-5">
            {question.question}
          </div>
          {question.questionImage && (
            <img 
              src={question.questionImage} 
              alt="Question" 
              className="max-w-full h-auto rounded-xl my-4 shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => onImageClick(question.questionImage)}
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 mb-5">
        {question.options.map((option, optionIndex) => {
          const letter = String.fromCharCode(65 + optionIndex);
          const isSelected = userAnswer === optionIndex;
          const isCorrect = optionIndex === question.correct && showFeedback;
          const isIncorrect = isSelected && optionIndex !== question.correct && showFeedback;
          
          let optionClasses = "bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-start";
          
          if (isSelected && !showFeedback) {
            optionClasses = "bg-gradient-to-r from-blue-400 to-cyan-400 border-blue-400 text-white transform scale-105 shadow-lg shadow-blue-400/40 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-start";
          } else if (isCorrect) {
            optionClasses = "bg-gradient-to-r from-green-500 to-green-600 border-green-500 text-white rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-start";
          } else if (isIncorrect) {
            optionClasses = "bg-gradient-to-r from-red-500 to-red-600 border-red-500 text-white rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-start";
          } else if (!showFeedback) {
            optionClasses += " hover:bg-blue-100 hover:border-blue-400 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-400/20";
          }

          return (
            <div
              key={optionIndex}
              className={optionClasses}
              onClick={() => !showFeedback && onSelectOption(questionIndex, optionIndex)}
            >
              <div className={`font-bold mr-5 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 flex-shrink-0 ${
                isSelected || isCorrect || isIncorrect 
                  ? 'bg-white/30 text-white' 
                  : 'bg-blue-400/10'
              }`}>
                {letter}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {option.text && (
                  <div className="leading-relaxed">{option.text}</div>
                )}
                {option.image && (
                  <img 
                    src={option.image} 
                    alt={`Option ${letter}`} 
                    className="max-w-[200px] h-auto rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick(option.image);
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mt-4 p-5 rounded-xl font-medium transition-all duration-300 ${
          userAnswer === question.correct
            ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-l-4 border-green-500'
            : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-l-4 border-red-500'
        }`}>
          <div className="mb-2">
            {userAnswer === question.correct ? '✅ Correct!' : '❌ Incorrect'}
            {userAnswer !== question.correct && (
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
              className="max-w-full h-auto rounded-lg mt-3 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => onImageClick(question.explanationImage)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
