/*questions*/
let questions = [
    {
        numb: 1,
        question: "oneWhat does ... ?",
        answer: "A. oneOption A text",
        options : [
            "A. oneOption A text",
            "B. oneOption B text",
            "C. oneOption C text",
            "D. oneOption D text"
        ]
    },{
        numb:2,
        question: "twoWhat does ... ?",
        answer: "A. twoOption A text",
        options:[
            "A. twoOption A text",
            "B. twoOption B text",
            "C. twoOption C text",
            "D. twoOption D text"
        ]
    },{
        numb:3,
        question: "threeWhat does ... ?",
        answer: "A. threeOption A text",
        options:[
            "A. threeOption A text",
            "B. threeOption B text",
            "C. threeOption C text",
            "D. threeOption D text"
        ]
    },{
        numb:4,
        question: "fourWhat does ... ?",
        answer: "A. fourOption A text",
        options:[
            "A. fourOption A text",
            "B. fourOption B text",
            "C. fourOption C text",
            "D. fourOption D text"
        ]
    },{
        numb:5,
        question: "fiveWhat does ... ?",
        answer: "A. fiveOption A text",
        options:[
            "A. fiveOption A text",
            "B. fiveOption B text",
            "C. fiveOption C text",
            "D. fiveOption D text"
        ]
    }
]

const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupInfo.classList.add('popup-info-active');
    main.classList.add('main-active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('popup-info-active');
    main.classList.remove('main-active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('quiz-section-active');
    popupInfo.classList.remove('popup-info-active');
    main.classList.remove('main-active');
    quizBox.classList.add('quiz-box-active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('quiz-box-active');
    nextBtn.classList.remove('next-btn-active');
    resultBox.classList.remove('result-box-active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('quiz-section-active');
    nextBtn.classList.remove('next-btn-active');
    resultBox.classList.remove('result-box-active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
const nextBtn = document.querySelector('.next-btn');

nextBtn.classList.add('nextbtn-disabled');
nextBtn.onclick = () =>{
    nextBtn.classList.add('nextbtn-disabled');
    if(questionCount < questions.length-1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
    }
    else{
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

//getting question and options from array
function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    nextBtn.classList.remove('nextbtn-disabled');
    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        //selected correct answer
        for(let i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('option-disabled');
    }
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('box-active');
    resultBox.classList.add('result-box-active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStarValue = 0;
    let progressEndValue = (userScore / questions.length) * 100; 
    let speed = 20;

    let progress = setInterval(() =>{
        progressStarValue++;

        progressValue.textContent = `${progressStarValue}%`;
        circularProgress.style.background = `conic-gradient(#90ee90 ${progressStarValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if(progressStarValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}