document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const progress = document.getElementById("progress");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", handleNextQuestion);
  restartBtn.addEventListener("click", restartQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    const currentQ = questions[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Shuffle choices
    const shuffledChoices = [...currentQ.choices].sort(() => Math.random() - 0.5);

    choicesList.innerHTML = "";
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(selectedChoice, selectedElement) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const allChoices = document.querySelectorAll("#choices-list li");

    allChoices.forEach((li) => {
      li.style.pointerEvents = "none"; // Disable further selection
      if (li.textContent === correctAnswer) {
        li.style.backgroundColor = "#2e7d32"; // green
      } else if (li.textContent === selectedChoice) {
        li.style.backgroundColor = "#c62828"; // red
      }
    });

    if (selectedChoice === correctAnswer) {
      score++;
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
