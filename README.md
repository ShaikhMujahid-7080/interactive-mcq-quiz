# 🎯 Interactive MCQ Quiz Application

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**A beautiful, interactive, and responsive MCQ Quiz Application built with modern web technologies**

[Live Demo](https://shaikhmujahid-7080.github.io/interactive-mcq-quiz/) • [Report Bug](https://github.com/shaikhmujahid-7080/interactive-mcq-quiz/issues) • [Request Feature](https://github.com/shaikhmujahid-7080/interactive-mcq-quiz/issues)

</div>

---

## ✨ Features

### 📚 **Preloaded Quiz Library**
- Browse and select from a curated collection of quizzes
- Dynamically loads quiz metadata (title, description, category, difficulty, question count)
- Beautiful card-based interface for quiz selection

### 📁 **Custom Quiz Import**
- Upload your own JSON quiz files with drag-and-drop support
- Support for complex quiz structures with rich media
- Instant validation and error handling

### 🎨 **Stunning User Interface**
- Modern glassmorphism design with gradients and blur effects
- Smooth animations and hover effects
- Fully responsive design for all devices

### 🖼️ **Rich Media Support**
- Images in questions, options, and explanations
- Full-screen image modal viewer
- Automatic URL detection for image content

### ⚡ **Real-time Feedback**
- Instant answer validation with visual feedback
- Detailed explanations for each question
- Progress tracking with sidebar navigation

### 📊 **Comprehensive Results**
- Detailed score breakdown (correct/incorrect/unanswered)
- Animated score presentation
- Option to retake quizzes

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```
git clone https://github.com/shaikhmujahid-7080/interactive-mcq-quiz.git
cd interactive-mcq-quiz
```

2. **Install dependencies**
```
npm install
```

3. **Start the development server**
```
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Building for Production

```
npm run build
npm run preview
```

---

## 🎮 How to Use

1. **Select a Quiz**: Choose from the available quizzes on the welcome screen
2. **Upload Custom Quiz**: Drag and drop your JSON file or click to browse
3. **Answer Questions**: Click on options to select answers
4. **Get Feedback**: Receive instant feedback with explanations
5. **View Results**: Submit to see your detailed performance
6. **Retake**: Start over anytime with the restart option

---

## 📋 Quiz JSON Format

Create your custom quizzes using this JSON structure:

```
{
  "title": "Your Quiz Title",
  "description": "Brief description of the quiz",
  "subject": "Subject/Category",
  "total_mcqs": 5,
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "question_image": "https://example.com/question-image.jpg",
      "options": {
        "a": "London",
        "b": "Berlin", 
        "c": "Paris",
        "d": "Madrid"
      },
      "correct_answer": "c",
      "explanation": "Paris is the capital and most populous city of France.",
      "explanation_image": "https://example.com/explanation-image.jpg"
    }
  ]
}
```

### Supported Features:
- **Text Questions**: Standard text-based questions
- **Image Questions**: Add images to questions with `Question_image`
- **Image Options**: Use image URLs directly in options
- **Rich Explanations**: Include detailed explanations with optional images
- **Flexible Structure**: Support for various question types and formats

---

## 🏗️ Project Structure

```
interactive-mcq-quiz/
├── public/
│   ├── quizzes/
│   │   ├── quiz-manifest.json
│   │   ├── ai-basics.json
│   │   ├── machine-learning.json
│   │   └── data-structures.json
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🎨 Technology Stack

- **⚛️ React 18** - Modern React with hooks
- **⚡ Vite** - Lightning-fast build tool
- **🎨 TailwindCSS** - Utility-first CSS framework
- **🎭 Custom CSS** - Advanced animations and effects
- **📱 Responsive Design** - Mobile-first approach

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Ideas for Contributions:
- 🎨 New quiz templates
- 📊 Advanced analytics
- 🔊 Audio support
- 🌐 Internationalization
- ♿ Accessibility improvements

<!-- ---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the blazing-fast build tool
- **TailwindCSS Team** for the utility-first approach
- **Community Contributors** for inspiration and feedback

---

## 📞 Support

If you like this project, please give it a ⭐ on GitHub!

For support, email shaikhmujahid7080@gmail.com or open an issue.

---

<div align="center">

**Built with ❤️ by [Shaikh Mujahid](https://github.com/ShaikhMujahid-7080)**

**Happy Learning! 🎉**

</div>