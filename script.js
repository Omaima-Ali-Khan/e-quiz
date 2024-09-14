// Array of questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 0
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["William Shakespeare", "J.K. Rowling", "Mark Twain", "Charles Dickens"],
    correctAnswer: 0
  },
  {
    question: "What is the largest planet in our Solar System?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Oxygen", "Osmium", "Oganesson", "Oxonium"],
    correctAnswer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionBtns = document.querySelectorAll('.option-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');

// Load a question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  optionBtns.forEach((button, index) => {
    button.textContent = currentQuestion.choices[index];
    button.disabled = false;
    button.style.backgroundColor = '#3498db'; // Reset color
  });
  resultEl.textContent = '';
  nextBtn.style.display = 'none'; // Hide Next button until an option is clicked
}

// Check the user's answer and color the buttons accordingly
function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correctAnswer;

  if (selectedIndex === correctIndex) {
    optionBtns[selectedIndex].style.backgroundColor = 'green'; // Change to green if correct
    resultEl.textContent = 'Correct!';
    resultEl.style.color = 'green';
    score++;
  } else {
    optionBtns[selectedIndex].style.backgroundColor = 'red'; // Change to red if incorrect
    optionBtns[correctIndex].style.backgroundColor = 'green'; // Show the correct answer
    resultEl.textContent = 'Try Again!';
    resultEl.style.color = 'red';
  }

  optionBtns.forEach((button) => button.disabled = true); // Disable buttons after selection
  scoreEl.textContent = `Score: ${score}`; // Update the score
  nextBtn.style.display = 'block'; // Show "Next Question" button
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(); // Load the next question
  } else {
    endGame(); // End the game if no more questions
  }
}

// End the game and display score
function endGame() {
  questionEl.textContent = `Game Over! Your final score is ${score}.`;
  nextBtn.textContent = 'Play Again';
  nextBtn.addEventListener('click', () => window.location.reload()); // Reload page to play again
  optionBtns.forEach(button => button.style.display = 'none'); // Hide option buttons
}

// Add event listeners to the option buttons
optionBtns.forEach((button, index) => {
  button.addEventListener('click', () => checkAnswer(index));
});

// Add event listener to the "Next Question" button
nextBtn.addEventListener('click', nextQuestion);

// Initial load
loadQuestion();
