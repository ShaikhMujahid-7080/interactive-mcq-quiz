const Results = ({ questions, userAnswers, onRestart }) => {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question, index) => {
    if (userAnswers.hasOwnProperty(index)) {
      if (userAnswers[index] === question.correct) {
        correct++;
      } else {
        incorrect++;
      }
    } else {
      unanswered++;
    }
  });

  const percentage = Math.round((correct / questions.length) * 100);

  return (
    <div className="text-center p-12 glass-white rounded-3xl mt-8 border border-white/20">
      <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-5 animate-score-appear">
        {percentage}%
      </div>
      <div className="flex justify-center gap-10 my-8 flex-wrap">
        <div className="text-center p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 min-w-[120px]">
          <div className="text-3xl font-bold text-blue-400">{correct}</div>
          <div className="text-gray-600 text-sm mt-1">Correct</div>
        </div>
        <div className="text-center p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 min-w-[120px]">
          <div className="text-3xl font-bold text-blue-400">{incorrect}</div>
          <div className="text-gray-600 text-sm mt-1">Incorrect</div>
        </div>
        <div className="text-center p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 min-w-[120px]">
          <div className="text-3xl font-bold text-blue-400">{unanswered}</div>
          <div className="text-gray-600 text-sm mt-1">Unanswered</div>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-12 py-5 rounded-full text-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40"
      >
        Take Quiz Again
      </button>
    </div>
  );
};

export default Results;
