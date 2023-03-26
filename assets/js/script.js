// create elements from HTML
const start = document.getElementById("start");
const outerBox = document.getElementById("outer-container");
const quiz = document.getElementById("quiz-container");
const question = document.getElementById("question-text");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const choiceD = document.getElementById("choiceD");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// questions array
let questions = [{
        question: 'The earliest humans first appear in what epoch?',
        choiceA: 'Oligocene',
        choiceB: 'Paleocene',
        choiceC: 'Miocene',
        choiceD: 'Pliocene',
        correct: 'C'
    },
    {
        question: 'In most small-scale, non-industrial societies, social organization is based largely on.....?',
        choiceA: 'Occupation',
        choiceB: 'Education',
        choiceC: 'Social class',
        choiceD: 'Kinship affiliation',
        correct: 'D'
    },
    {
        question: "What is a ritual held at a certain point in a person's life to mark the end of one stage and the beginning of another called?",
        choiceA: 'Quartering',
        choiceB: 'Ceremony',
        choiceC: 'Rite of passage',
        choiceD: 'Sanction',
        correct: 'C'
    },
    {
        question: 'What is learned, and shared behaviors and beliefs?',
        choiceA: 'Culture',
        choiceB: 'Food',
        choiceC: 'Language',
        choiceD: 'Enthnicity',
        correct: 'A'
    },
    {
        question: 'What is the term for the process of creating a new culture by combining elements from different cultures?',
        choiceA: 'Cultural fusion',
        choiceB: 'Globalization',
        choiceC: 'Cultural appropriation',
        choiceD: 'Cultural-hybridization',
        correct: 'D'
    },
    {
        question: 'What animals did Jane Goodall study?',
        choiceA: 'Gorillas',
        choiceB: 'Chimpanzees',
        choiceC: 'Orangutans',
        choiceD: 'Baboons',
        correct: 'B'
    },
    {
        question: 'How many languages are currently spoken in the world?',
        choiceA: 'Over 10,000',
        choiceB: 'Around 1,000',
        choiceC: 'Around 7,000 ',
        choiceD: 'Around 3,000',
        correct: 'C'
    },
    {
        question: 'What is the revolution from hunting and gathering to food production called?',
        choiceA: 'The Pastoral Revolution',
        choiceB: 'The Organic Revolution',
        choiceC: 'The Neolithic Revolution',
        choiceD: 'The Cultivation Revolution',
        correct: 'C'
    },
    {
        question: 'What did Jetro Tull invent?',
        choiceA: 'The steam engine',
        choiceB: 'The seed drill',
        choiceC: 'The spinning jenny',
        choiceD: 'A rock band',
        correct: 'B'
    },
    {
        question: 'The Sentinelese, a famous uncontacted tribe, can be found where?',
        choiceA: 'The Andaman Islands',
        choiceB: 'Senegal',
        choiceC: 'The Amazon Rainforest',
        choiceD: 'Papa New Guinea',
        correct: 'A'
    },
    {
        question: 'How many bones in the human body?',
        choiceA: '206',
        choiceB: '106',
        choiceC: '706',
        choiceD: '1,006',
        correct: 'A'
    },
    {
        question: 'Which of these events occurred first?',
        choiceA: 'The French Revolution',
        choiceB: 'The Industrial Revolution',
        choiceC: 'The American Revolution',
        choiceD: 'The Enlightenment',
        correct: 'D'
    }
];

// variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
const gaugeWidth = 300; // 300px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// show question
function showQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", beginQuiz);

// begin quiz
function beginQuiz() {
    start.classList.add("hide");
    quiz.classList.remove("hide");

    showQuestion();
    quiz.style.display = "block";
    showProgress();
    showCounter();
    TIMER = setInterval(showCounter, 1000); // 1000ms = 1s
}

// show progress
function showProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// time bar

function showCounter() {
    if (count <= questionTime) {

        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            showQuestion();
        } else {

            showScore();
        }
    }
}

// checkAnwer
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        showQuestion();
    } else {
        clearInterval(TIMER);
        showScore();
    }
}
// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = " rgb(106, 194, 105)";
}
// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "rgb(210, 4, 45)";
}
// show score
function showScore() {
    scoreDiv.style.display = "block";
    quiz.style.display = "none";
     const scorePerCent = Math.round(100 * score / questions.length);
    scoreDiv.innerHTML += "<p>Your score is " + scorePerCent + "%</p>";
}