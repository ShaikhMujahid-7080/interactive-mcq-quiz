const WelcomeScreen = ({ onFileSelect, errorMessage }) => {
  return (
    <div className="text-center py-20 px-10 text-white">
      <h1 className="text-5xl mb-5 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">
        🎯 Interactive MCQ Quiz
      </h1>
      <p className="text-xl mb-10 opacity-90">
        Upload your JSON file to start an interactive quiz experience
      </p>

      <div 
        className="border-3 border-dashed border-white/30 rounded-3xl p-15 my-10 transition-all duration-300 cursor-pointer hover:border-blue-400 hover:bg-blue-400/10"
        onClick={() => document.getElementById('mainJsonFile').click()}
      >
        <div className="text-6xl mb-5 opacity-70">📄</div>
        <h2 className="text-2xl mb-2">Click here or drag & drop your JSON file</h2>
        <p>Supports .json files with quiz questions and images</p>
      </div>
      
      <input
        type="file"
        id="mainJsonFile"
        className="hidden"
        accept=".json"
        onChange={onFileSelect}
      />
      
      {errorMessage && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg my-5 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
