// display score, record score to high score, input high score initials

let startBtn = document.querySelector('.startbutton')
let hideStartPage = document.querySelector('.initial-container')
let loadQuestionPage = document.querySelector('.questions-container')
let answerButton = document.querySelectorAll('.answer');
let highScoreBtn = document.querySelector('.highscore')
let questionEl = document.querySelector('.askquestion');
let timerEl = document.querySelector('.timeleft')
let finalScoreEl = document.querySelector('#final-score')
let finalFormEl = document.querySelector('#final-form')
let currQuestion
let score = 0;
let questionIdx = 0;
let timeLeft = 60;
let timeInterval
let highScores = JSON.parse(localStorage.getItem("highScore")) || []

console.log(highScores)
const questions = [
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      "<sript>",
      "<sripting>",
      "<js>",
      "<javascript>",
    ],
    correct: "<sript>"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      "The <body> section",
      "The <head> section",
      "The <footer> section",
      "The <sports> section",
    ],
    correct: "The <body> section"
  },
  {
    question: "What is the correct syntax for referring to an external script called xxx.js?",
    answers: [
      "<sript href=xxx.js>",
      "<sript src=xxx.js>",
      "<sript name=xxx.js>",
      "<sript img=xxx.js>",
    ],
    correct: "<sript src=xxx.js>"
  }
]

// beginning of functions
function gameOver() {
  localStorage.setItem('recentScore', score);
  
  clearInterval(timeInterval);
  const finishEl = document.createElement('h2')
  // finsihEl.textContent = 'The quiz is over. Your score is ' + score
  finishEl.textContent = `The quiz is over. Your score is ${score}`
  const inputEl = document.createElement('input')
  inputEl.classList.add("initials")
  const btnEl = document.createElement('button')
  btnEl.textContent = 'Submit'
  console.log(finalScoreEl)
  finalFormEl.appendChild(finishEl)
  finalFormEl.appendChild(inputEl)
  finalFormEl.appendChild(btnEl)
  finalFormEl.addEventListener('submit', saveScore)
}

  function displayScore(){
    console.log(highScores)
  }

function saveScore(e) {
  const inputEl = document.querySelector('.initials');
  const initialHighScore = {
    initials: inputEl.value,
    score: score
  }
  highScores.push(initialHighScore);
  localStorage.setItem("highScore", JSON.stringify(highScores));
  alert(inputEl.value);
}

function quizTimer() {

  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function renderQuestion(event) {
  if (questionIdx >= questions.length) {
    gameOver();
    return
  } else {
    currQuestion = questions[questionIdx]
    var h2Tag = document.querySelector(".askquestion");
    h2Tag.textContent = currQuestion.question;
    for (var i = 0; i < answerButton.length; i++) {
      answerButton[i].textContent = currQuestion.answers[i];
    }
  }
}

function checkAnswer(event){
  console.log(currQuestion.correct + "|" + event.target.textContent) 
  if (currQuestion.correct == event.target.textContent) {
    alert("correct")
    
    // answerButton.textContent = "Correct";
    score++;
  } else {
    alert("incorret")
    timeLeft -= 5;
  }
  questionIdx++
  renderQuestion()
}


function start() {
  hideStartPage.classList.add("hidden");
  loadQuestionPage.classList.remove("hidden");
  quizTimer()
  renderQuestion()
  //displayAnswer() // should go in renderquestions since we are inserting questions wit answe choice there?
}

for (var i = 0; i < answerButton.length; i++) {
  answerButton[i].addEventListener("click", checkAnswer)
}
// event listeners
startBtn.addEventListener("click", start)
