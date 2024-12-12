/*questions*/
let questions = [
    {
        numb: 1,
        question: "According to current statistics, which type of debris is most common in the ocean?",
        answer: "A. Plastic",
        options : [
            "A. Plastic",
            "B. Nylon",
            "C. Fishing nets / Fishing gear",
            "D. Styrofoam"
        ]
    },{
        numb:2,
        question: "The purpose of the fundraising event we organized is:",
        answer: "D. All of the above",
        options:[
            "A. Support research projects",
            "B. Organize cleanup activities",
            "C. Used for waste cleanup",
            "D. All of the above"
        ]
    },{
        numb:3,
        question: "Based on the statistics shown on our iOcean website, which type of plastic waste is the most abundant?",
        answer: "B. PET bottles",
        options:[
            "A. Straws",
            "B. PET bottles",
            "C. Plastic bags",
            "D. Plastic bottle caps"
        ]
    },{
        numb:4,
        question: "The hazards of plastic microplastics include which of the following?",
        answer: "D. All of the above",
        options:[
            "A. Paint",
            "B. Construction",
            "C. Food",
            "D. All of the above"
        ]
    },{
        numb:5,
        question: "In the experimental tests, what is the proportion of animal and plant proteins containing plastic microplastics?",
        answer: "D. 90%",
        options:[
            "A. 30%",
            "B. 50%",
            "C. 70%",
            "D. 90%"
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