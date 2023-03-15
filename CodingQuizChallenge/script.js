//Start
const startSection = document.getElementById("start-section");
const allQuiz = document.querySelectorAll(".quiz-section");
const startBtn = document.getElementById("start-btn");

//Quiz questions
const quizzes = document.getElementById("quizzes");
const remainingTime = document.getElementById("remaining-time");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const answerStatus = document.querySelectorAll(".answer-status");
const correctStatus = document.getElementById("correct-answer");
const wrongStatus = document.getElementById("wrong-answer");

//End
const endSection = document.getElementById("end-section");
const endTitle = document.getElementById("end-title");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submitScore = document.getElementById("score-form");
const errorMessage = document.getElementById("error-message");

//Question structure
class Question {
  constructor(question, options, answerOptionIndex) {
    this.question = question;
    this.options = options;
    this.answerOptionIndex = answerOptionIndex;
  }
}

// Questions array
const questions = [
  new Question(
    "Commonly used data types DO NOT include: ",
    ["Strings", "Booleans", "Alerts", "Numbers"],
    2
  ),
  new Question(
    "The condition in an if / else statement is enclosed within ____.",
    ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    2
  ),
  new Question(
    "Arrays in JavaScript can be used to store ____.",
    ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
    3
  ),
  new Question(
    "String values must be enclosed within ____ when being assigned to variables.",
    ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    2
  ),
  new Question(
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    ["JavaScript", "Terminal / Bash", "For loops", "Console.log"],
    3
  ),
];
let currentQuestion = 0;

let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout;

// Event listeners
startBtn.addEventListener("click", startQuiz);
answers.addEventListener("click", checkAnswer);
submitScore.addEventListener("submit", checkScore);

// Functions implementation
function startQuiz() {
  toggleElement(allQuiz, quizzes);
  showTime();
  showQuestion();
  startTimer();
}

// toggle element visibility (show/hide)
function toggleElement(siblingList, toggleElement) {
  for (element of siblingList) {
    hideElement(element);
  }
  toggleElement.classList.remove("hide");
}

function hideElement(element) {
  if (!element.classList.contains("hide")) {
    element.classList.add("hide");
  }
}

function showTime() {
  remainingTime.textContent = totalTime;
}

function startTimer() {
  totalTimeInterval = setInterval(function () {
    totalTime--;
    showTime();
    checkTime();
  }, 1000);
}

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endQuiz();
  } else {
    showTime();
  }
}

function showQuestion() {
  question.textContent = questions[currentQuestion].question;

  ShowMultipleChoices();
}

function ShowMultipleChoices() {
  answers.innerHTML = "";

  questions[currentQuestion].options.forEach(function (answer, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = index + 1 + ". " + answer;
    li.appendChild(button);
    answers.appendChild(li);
  });
}

// validate answers when user clicks
function checkAnswer(event) {
  const userChoice = parseInt(event.target.parentElement.dataset.index);

  resetChoiceStatusEffects();
  checkChoice(userChoice);
  nextQuestion();
}

//Displaying choice statuses
function resetChoiceStatusEffects() {
  clearTimeout(choiceStatusTimeout);
}

function checkChoice(userChoice) {
  if (isChoiceCorrect(userChoice)) {
    showCorrectChoiceEffects();
  } else {
    showWrongChoiceEffects();
  }
}

function isChoiceCorrect(choice) {
  return choice === questions[currentQuestion].answerOptionIndex;
}

function showWrongChoiceEffects() {
  decrementTime(10);
  toggleElement(answerStatus, wrongStatus);

  choiceStatusTimeout = setTimeout(function () {
    hideElement(wrongStatus);
  }, 1000);
}

function decrementTime(seconds) {
  totalTime -= seconds;
  checkTime();
  showTime();
}

function showCorrectChoiceEffects() {
  toggleElement(answerStatus, correctStatus);

  choiceStatusTimeout = setTimeout(function () {
    hideElement(correctStatus);
  }, 1000);
}

// Get next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

function endQuiz() {
  clearInterval(totalTimeInterval);

  toggleElement(allQuiz, endSection);
  showScore();
  setEndHeading();
}

function showScore() {
  finalScore.textContent = totalTime;
}

function setEndHeading() {
  if (totalTime === 0) {
    endTitle.textContent = "Sorry! time out!";
  } else {
    endTitle.textContent = "Congrats! Your done!";
  }
}

function checkScore(event) {
  event.preventDefault();

  const initials = document.getElementById("initials").value.trim();

  if (isValid(initials)) {
    const score = totalTime;
    const highscoreEntry = registerNewScore(initials, score);
    saveHighscore(highscoreEntry);
    window.location.href = "scores.html";
  }
}

function registerNewScore(initials, score) {
  const entry = {
    initials: initials,
    score: score,
  };
  return entry;
}

function isValid(initials) {
  let errorMessage = "";
  if (initials === "") {
    errorMessage = "You can't submit empty initials!";
    showFormError(errorMessage);
    return false;
  } else if (initials.match(/[^a-z]/gi)) {
    errorMessage = "Initials may only include letters.";
    showFormError(errorMessage);
    return false;
  } else {
    return true;
  }
}

function showFormError(errorMessage) {
  errorMessage.textContent = errorMessage;
  if (!initials.classList.contains("error")) {
    initials.classList.add("error");
  }
}

function saveHighscore(highscoreEntry) {
  const currentScores = getScores();
  appendScore(highscoreEntry, currentScores);
  localStorage.setItem("scores", JSON.stringify(currentScores));
}

function getScores() {
  const currentScores = localStorage.getItem("scores");
  if (currentScores) {
    return JSON.parse(currentScores);
  } else {
    return [];
  }
}

function appendScore(newEntry, scores) {
  const newScoreIndex = getNewScoreIndex(newEntry, scores);
  scores.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scores) {
  if (scores.length > 0) {
    for (let i = 0; i < scores.length; i++) {
      if (scores[i].score <= newEntry.score) {
        return i;
      }
    }
  }
  return scores.length;
}
