const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
 const progressText = document.getElementById('progressText')
 const scoreText = document.getElementById ('score')
const progressBarFull = document.getElementById ('progressBarFull');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is a Array in javascript?",
        choice1: "it is a single variable to store different elements",
        choice2: "a reference to multiple variable",
        choice3: "a ray of sunshine",
        choice4: "A read only variable",
        answer: 1,
    },
    {
        question: "what is the difference between JavaScript and Java code?",
        choice1: "Java is run on a web browser and JS is run in a virtual machine",
        choice2: "they are the same code",
        choice3: "Java code are run on virtual machine or web browser JS is run on a web browser",
        choice4: "bears, beets, battlestar galatica!",
        answer: 3,
    },
    {
        question: "how do you write an IF statement for executing some code IF i is NOT equal to 5?" ,
        choice1: "if i <> 5",
        choice2: "if (i != 5)",
        choice3: "if (i <> 5 ",
        choice4: "if i =!5 then",
        answer: 2,
    },
];


var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");


var secondsLeft = 90;

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left till time's up.";
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        sendMessage();
       
      }
  
   }, 1000);
  }

    function sendMessage() {
        timeEl.textContent = " ";
        return window.location.assign('end.html');
  }
    setTime();


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }

    questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

         if (classToApply === "correct") {
             incrementScore(CORRECT_BONUS);
            }

            if (classToApply === "incorrect") {
                secondsLeft = secondsLeft - 10;
                timerInterval = secondsLeft;
            }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);
    }); 
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

startGame();