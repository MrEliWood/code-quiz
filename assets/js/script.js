// global variables
var header = document.querySelector("header");
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var intro = document.querySelector("#intro");
var quiz = document.querySelector("#quiz");
var over = document.querySelector("#over");
var timeout = document.querySelector("#timeout");
var retry = document.querySelector("#retry");
var timeSpan = document.querySelector("#timeSpan");
var complete = document.querySelector("#complete");
var minus = document.querySelector(".hidden");

var timerInterval;

// question and answer variables
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var answer1 = document.querySelector("#a1");
var answer2 = document.querySelector("#a2");
var answer3 = document.querySelector("#a3");

// score variables
var player = document.querySelector("#player");
var submitScore = document.querySelector("#submitScore");
var leaderboard = document.querySelector("#leaderboard");

// hide quiz and game over
quiz.style.display = "none";
over.style.display = "none";
timeout.style.display = "none";


// countdown timer
var secondsLeft = 60;
timer.textContent = secondsLeft;

function countdown() {

    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;
        
        if (secondsLeft <= 0) {
            timer.textContent = 0;
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000);

}

// questions and answers
var questions = [
    {
        ask: "What does JS stand for?",
        correct: `JavaScript`,
        incorrectA: `Orange Julius`,
        incorrectB: `Java`
    },

    {
        ask: "What does CSS stand for?",
        correct: `Cascading Style Sheets`,
        incorrectA: `Cool Styling System`,
        incorrectB: `Code Software Styling`
    },

    {
        ask: "What does HTML stand for?",
        correct: `Hypertext Markup Language`,
        incorrectA: `Hello There Mister Leroy`,
        incorrectB: `Hypothermal Mountain Layers`
    },

    {
        ask: "What year was javaScript invented?",
        correct: `1995`,
        incorrectA: `2007`,
        incorrectB: `1984`
    },

    {
        ask: "what is the correct syntax for linking a JavaScript file to an HTML file?",
        correct: `<script src="./assets/js/script.js"></script>`,
        incorrectA: `<script src="script.javascript"></script>`,
        incorrectB: `<java src="./assets/js/script.js"></java>`
    },

    {
        ask: "How do you properly call a function?",
        correct: `functionName()`,
        incorrectA: `function functionName()`,
        incorrectB: `functionName(call)`
    }
]

// render a question on the page
var lastQuestion = questions.length
var currentQuestion = -1;
var chosenQuestion = questions[currentQuestion]

function renderQuestion() {
    if (currentQuestion === lastQuestion - 1) {
        gameOver();
    } else {

        currentQuestion++;
        chosenQuestion = questions[currentQuestion]

        // question
        question.textContent = chosenQuestion.ask

        // answers
        chosenAnswers = [chosenQuestion.correct, chosenQuestion.incorrectA, chosenQuestion.incorrectB]

        // shuffle answers
        var a1 = chosenAnswers[Math.floor(Math.random() * 3)]

        if (a1 === chosenAnswers[0]) {
            var a2 = chosenAnswers[1];
            var a3 = chosenAnswers[2]
        } else if (a1 === chosenAnswers[1]) {
            var a2 = chosenAnswers[2];
            var a3 = chosenAnswers[0]
        } else if (a1 === chosenAnswers[2]) {
            var a2 = chosenAnswers[0];
            var a3 = chosenAnswers[1]
        }

        // place answers on the page
        answer1.textContent = a1
        answer2.textContent = a2
        answer3.textContent = a3

    };
};

// minus ten animation
function minusTen() {

    minus.setAttribute("id","visible");
    var OneSecond = 1;

    minusInterval = setInterval(function() {
        OneSecond--;
        
        if (OneSecond === 0) {
            clearInterval(minusInterval);
            minus.setAttribute("id","");
        }

    }, 500);

}

// listen for answers
answers.addEventListener("click", function(event) {

    // correct answer
    if (event.target.textContent === chosenQuestion.correct) {
        renderQuestion();

    // incorrect with less than ten seconds on the clock
    } else if ((event.target.textContent === chosenQuestion.incorrectA || event.target.textContent === chosenQuestion.incorrectB) && secondsLeft <= 10) {
        minusTen()
        secondsLeft -= 10;
        timer.textContent = secondsLeft;
        gameOver()

    // incorrect with more than 10 seconds on the clock
    } else if (event.target.textContent === chosenQuestion.incorrectA || event.target.textContent === chosenQuestion.incorrectB) {
        minusTen()
        secondsLeft -= 10;
        timer.textContent = secondsLeft;
        renderQuestion();
    
    // clicks on non-answers
    } else {
        return;
    }
});

// game over message
function gameOver() {

    quiz.style.display = "none";

    if (secondsLeft <= 0) {
        timeout.style.display = "block";
    } else {
        over.style.display = "block";
        clearInterval(timerInterval);
    }
};

// start playing
start.addEventListener("click", function() {
    intro.style.display = "none";
    quiz.style.display = "block";
    countdown();
    renderQuestion();
});

// load saved scores from local storage
var savedScores = localStorage.getItem("playerScores");
if (savedScores) {
    leaderboard.innerHTML = savedScores;
}

// save new score to local storage
submitScore.addEventListener("click", function(event) {

    // force player to save score with name
    // if (player.value.length < 1) {
    //     event.preventDefault();
    //     return;
    // };

    leaderboard.innerHTML += `<li style="order: ${secondsLeft}"><h3>${player.value}</h3><h3>${secondsLeft}</h3></li>`;
    localStorage.setItem("playerScores", leaderboard.innerHTML);

}, false);