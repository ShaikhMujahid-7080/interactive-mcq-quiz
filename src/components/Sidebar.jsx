import { useState } from 'react';

const Sidebar = ({ 
  quizTitle, 
  quizDescription, 
  questions, 
  userAnswers, 
  currentQuestion, 
  onFileSelect, 
  onQuestionClick 
}) => {
  const answeredCount = Object.keys(userAnswers).length;
  const remainingCount = questions.length - answeredCount;

  return (
    <div className="w-70 glass p-5 fixed h-screen overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 -translate-x-full z-50" id="sidebar">
      <div className="text-center mb-8 pb-5 border-b border-white/20">
        <h2 className="text-white text-xl mb-2 drop-shadow-lg">{quizTitle}</h2>
        <p className="text-white/80 text-sm">{quizDescription}</p>
      </div>

      <div className="mb-8 p-5 glass rounded-2xl border border-white/20">
        <h3 className="text-white mb-4 text-lg">📁 Import Quiz</h3>
        <div className="w-full">
          <input
            type="file"
            id="jsonFile"
            className="hidden"
            accept=".json"
            onChange={onFileSelect}
          />
          <label
            htmlFor="jsonFile"
            className="block p-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-lg cursor-pointer text-center font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/30"
          >
            Choose JSON File
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`glass p-3 cursor-pointer transition-all duration-300 text-white text-center font-semibold rounded-xl border-2 ${
              userAnswers.hasOwnProperty(index)
                ? 'bg-green-500/30 border-green-400'
                : index === currentQuestion
                ? 'bg-gradient-to-r from-blue-400 to-cyan-400 border-blue-400 shadow-lg shadow-blue-400/50'
                : 'border-white/20 hover:bg-blue-400/30 hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/30'
            }`}
            onClick={() => onQuestionClick(index)}
          >
            Q{index + 1}
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-5 text-white text-center">
        <h3 className="mb-4 text-blue-400">Progress Summary</h3>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{answeredCount}</div>
            <div className="text-sm opacity-80">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{remainingCount}</div>
            <div className="text-sm opacity-80">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
