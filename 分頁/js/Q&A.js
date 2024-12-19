$(document).ready(function () {
// 初始化 Firebase
firebase.initializeApp({
  apiKey: "AIzaSyByU9jZMSzKyxOw2QETKwpd5FkBiUFd8vA",
  authDomain: "f2e01-donate.firebaseapp.com",
  projectId: "f2e01-donate",
  storageBucket: "f2e01-donate.firebasestorage.app",
  messagingSenderId: "553423823090",
  appId: "1:553423823090:web:3edd79e9bd2615fc5e706b",
  measurementId: "G-9LT6VJLKM9",
});

/*questions*/
let questions = [
    {
        numb: 1,
        question: "According to current statistics, which type of debris can ve seen most commonly in the ocean?",
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
            "C. waste cleanup",
            "D. All of the above"
        ]
    },{
        numb:3,
        question: "Based on the statistics shown on our iOcean website, which type of plastic waste is the most discard?",
        answer: "B. PET bottles",
        options:[
            "A. Straws",
            "B. PET bottles",
            "C. Plastic bags",
            "D. Plastic bottle caps"
        ]
    },{
        numb:4,
        question: "Which of the following may be negatively affected by microplastics?",
        answer: "D. All of the above",
        options:[
            "A. Paint",
            "B. Construction",
            "C. Food",
            "D. All of the above"
        ]
    },{
        numb:5,
        question: "In the experimental tests, which is the proportion of microplastics contained in animal and plant proteins?",
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
const popupInfo2 = document.querySelector('.popup-info2');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const info_backBtn = document.querySelector('.info-backbtn');
const info_nextBtn = document.querySelector('.info-nextbtn');

const $nicknameField = $('#nickname');
const db = firebase.firestore();
const quiz_Ref = db.collection("quiz");
const data_Ref = quiz_Ref.doc("data");


let x = 1;
let point = 0;
let flag = 0;
let total = 0;

data_Ref.get().then(function (doc) {
    x = doc.data().total_data;
    x++;
});

startBtn.onclick = () => {
    popupInfo.classList.add('popup-info-active');
    main.classList.add('main-active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('popup-info-active');
    main.classList.remove('main-active');
}

info_nextBtn.onclick = () => {
    popupInfo2.classList.add('popup-info2-active');
    popupInfo.classList.remove('popup-info-active');
}

info_backBtn.onclick = () => {
    popupInfo2.classList.remove('popup-info2-active');
    popupInfo.classList.add('popup-info-active');
}

continueBtn.onclick = () => {
    if($nicknameField.val() == ''){
        window.alert("Please enter your nickname!");
    }
    else{
        quizSection.classList.add('quiz-section-active');
        popupInfo2.classList.remove('popup-info2-active');
        main.classList.remove('main-active');
        quizBox.classList.add('quiz-box-active');

        showQuestions(0);
        questionCounter(1);
        headerScore();
    }   
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
    popupInfo2.classList.remove('popup-info2-active');
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
        option[i].addEventListener('click', function() {
            optionSelected(this);
        });
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
        point += 1;
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


//main-page show data
let list_of_data = [];
let sub_list_of_data;

async function fetchData() {
    list_of_data = [];
  for (let y = 0; y < 11; y++) {
    try {
        const doc = await data_Ref.get();  // 等待 Firestore 獲取文檔
        let datanum = "data-" + (x - y);  // 計算屬性名稱
        const data = doc.data() && doc.data()[datanum];  // 確保 doc.data() 和 doc.data()[datanum] 存在
  
        if (data) {
          list_of_data.push(data);    // 將整個 data 物件加入 list_of_data 陣列
        } else {
          console.log(`No data found for ${datanum}`);
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }
    console.log(list_of_data);  // 打印所有獲取的資料

    showData(); 
  }
sub_list_of_data = list_of_data;
fetchData();  // 呼叫函數來執行

function showData(){
    const data_num = document.querySelector('.data_num');
    const data_name = document.querySelector('.list_name');
    const data_point = document.querySelector('.list_point_container');
    data_num.innerHTML = ``;
    data_name.innerHTML = ``;
    data_point.innerHTML = ``;
    
    let y = 0;
    while(y<list_of_data.length){
       data_num.innerHTML += `<li class="number">${list_of_data[y].number}</li>`;
       data_name.innerHTML += `<li>${list_of_data[y].nickName}</li>`;
       data_point.innerHTML += `<li><span class="list_point">${list_of_data[y].point}</span><span>point</span></li>`;

       y++;
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
    interdata(userScore);
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
  
   //SAVE DATA TO FIREBASE

function interdata(user_point){
    let sendernickName = $nicknameField.val();
    datanum = "data-" + x;
    data_Ref.update({
        [datanum]: {
            nickName: sendernickName,
            point: user_point,
            number: x,
            timeStamp: Date.now(),
        },
    });
    data_Ref.update({
        total_data: x,
    });
    x++;
    point = 0;
    $nicknameField.val("");
    fetchData();
}

})