// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
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
{   question: 'Which of these events occurred first?',
    choiceA: 'The French Revolution',
    choiceB: 'The Industrial Revolution',
    choiceC: 'The American Revolution',
    choiceD: 'The Enlightenment',
    correct: 'D'
}
 
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 15s
const gaugeWidth = 300; // 300px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}