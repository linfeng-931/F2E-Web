$(document).ready(function(){
  // 初始化 Firebase
firebase.initializeApp({
  apiKey: "AIzaSyByU9jZMSzKyxOw2QETKwpd5FkBiUFd8vA",
  authDomain: "f2e01-donate.firebaseapp.com",
  projectId: "f2e01-donate",
  storageBucket: "f2e01-donate.firebasestorage.app",
  messagingSenderId: "553423823090",
  appId: "1:553423823090:web:3edd79e9bd2615fc5e706b",
  measurementId: "G-9LT6VJLKM9"
});

const db = firebase.firestore();

/*donate*/
const $btn = $('#btndonate');
const $nameField = $('#name-field');
const $name2Field = $('#name2-field');
const $nicknameField = $('#nickname-field');
const $emailField = $('#email-field');
const $moneyField = $('#money-field');
const money_donate_Ref = db.collection("money_donate");
const user_money_Ref = money_donate_Ref.doc("user_money");
const total_money_Ref = money_donate_Ref.doc("total_money");
let x = 0;
let total = 0;
let orgintotal = total;
let datanum = "data-" + x;

/*page*/
let currentSection = 0;
let sections = document.querySelectorAll(".section");
let sectionButtons = document.querySelectorAll(".nav > li");
let nextButton = document.querySelector(".next");
let nextButton2 = document.querySelector("#btndonate");
let previousButton = document.querySelector("#previous");
let previousButton2 = document.querySelector("#return");

/*money-selection*/
let $selection01 = $('#selection-1');
let $selection02 = $('#selection-2');
let $selection03 = $('#selection-3');
let moneysel = 0;
let flag = -1;

$selection01.click(function (e) {
  if(flag != 0){
    moneysel = 500;
    flag = 0;
    $("#selection-1").css("background-color", "#8EB4D9");
    $("#selection-3").css("background-color", "#DEDEDE");
    $("#selection-2").css("background-color", "#DEDEDE");
    $("#money-field").prop("disabled", true);
  }
  else if(flag == 0){
    $("#selection-1").css("background-color", "#DEDEDE");
    flag = 0;
    moneysel = 0;
    $("#money-field").prop("disabled", false);
  }
});

$selection02.click(function (e) {
  if(flag != 1){
    flag = 1;
    moneysel = 2000;
    $("#selection-2").css("background-color", "#8EB4D9");
    $("#selection-3").css("background-color", "#DEDEDE");
    $("#selection-1").css("background-color", "#DEDEDE");
    $("#money-field").prop("disabled", true);
  }
  else if(flag == 1){
    $("#selection-2").css("background-color", "#DEDEDE");
    flag = 0;
    moneysel = 0;
    $("#money-field").prop("disabled", false);
  }
});

$selection03.click(function (e) {
  if(flag != 2){
    flag = 2;
    moneysel = 5000;
    $("#selection-3").css("background-color", "#8EB4D9");
    $("#selection-1").css("background-color", "#DEDEDE");
    $("#selection-2").css("background-color", "#DEDEDE");
    $("#money-field").prop("disabled", true);
  }
  else if(flag == 2){
    $("#selection-3").css("background-color", "#DEDEDE");
    flag = 0;
    moneysel = 0;
    $("#money-field").prop("disabled", false);
  }
});

/*-----donate-----*/
//非同步指令 then, totalmoney計算, 捐款次數計算(重刷網頁也不會喪失之前紀錄的紀錄方式)
total_money_Ref.get().then(
  function (doc) {
    total = doc.data().money; // 將 money 欄位的數字存入 num
    x = doc.data().total_user;
    $('.total_money').html(total);
    orgintotal = total;
  }
);

//按鈕送出資料
$btn.click(function (e) {
  //FIELD VALUES
  let senderName = $nameField.val() +' '+ $name2Field.val();
  let sendernickName = $nicknameField.val();
  let sendemail = $emailField.val();
  let sendmoney = '';

  if(moneysel != 0){
    sendmoney = moneysel;
  }
  else{
    sendmoney = $moneyField.val();
  }

  sendmoney = parseInt(sendmoney);
  if (sendmoney > 999999){
    currentSection = 0;
    window.alert("Donation limit 999999");
  }
  else if(sendmoney< 100){
    currentSection = 0;
    window.alert("Minimum donation limit 100");
  }
  else if(senderName == '' || sendernickName == '' || sendemail == '' || sendmoney == ''){
    currentSection = 0;
    window.alert("Please confirm your input is correct.");
    //錯誤輸入
    if($nameField.val() == ''){
      $nameField.css("background-color", "#FFECEC");
    }
    if($name2Field.val() == ''){
      $name2Field.css("background-color", "#FFECEC");
    }
    if($nicknameField.val() == ''){
      $nicknameField.css("background-color", "#FFECEC");
    }
    if($emailField.val() == ''){
      $emailField.css("background-color", "#FFECEC");
    }
    if($moneyField.val() == '' && moneysel == 0){
      $moneyField.css("background-color", "#FFECEC");
    }
  }
  //SAVE DATA TO FIREBASE
  else{
    datanum = "data-" + x;
    user_money_Ref.update({
      [datanum]:{
        "Name": senderName,
        "nickName": sendernickName,
        "email": sendemail,
        "money": sendmoney,
        timeStamp: Date.now(),
      }
    });
    x++;

    total = total + sendmoney;
    total_money_Ref.update({
      money: total,
      total_user: x,
      timeStamp: Date.now(),
    });

    $('.total_money').html(total);
    gsap.from(".total_money", {
      textContent: orgintotal,
      duration: 3,
      snap: { textContent: 10 }
    });

     // EMPTY INPUT FIELD
    $nameField.val(null);
    $name2Field.val(null);
    $nicknameField.val(null);
    $emailField.val(null);
    $moneyField.val(null);
    $nameField.css("background-color", "white");
    $name2Field.css("background-color", "white");
    $nicknameField.css("background-color", "white");
    $emailField.css("background-color", "white");
    $moneyField.css("background-color", "white");
    $("#selection-3").css("background-color", "#DEDEDE");
    $("#selection-1").css("background-color", "#DEDEDE");
    $("#selection-2").css("background-color", "#DEDEDE");
}
  
 
  $("#money-field").on("input", function() {
    var moneyValue = $(this).val();  // 获取输入框的值
    
    // 如果输入框为空，禁用按钮；如果有内容，启用按钮
    if (moneyValue === '') {
        $("#btndonate").prop("disabled", true);
    } else {
        $("#btndonate").prop("disabled", false);
    }
  });
});

/*-----page-----*/
for (let i = 0; i < sectionButtons.length; i++) {
    sectionButtons[i].addEventListener("click", function() {
        sections[currentSection].classList.remove("active");
        sectionButtons[currentSection].classList.remove("active");
        sections[currentSection = i].classList.add("active");
        sectionButtons[currentSection].classList.add("active");
        if (i === 0) {
            if (previousButton.className.split(" ").indexOf("disable") < 0) {
                previousButton.classList.add("disable");
            }
        } else {
            if (previousButton.className.split(" ").indexOf("disable") >= 0) {
                previousButton.classList.remove("disable");
            }
        }
        if (i === sectionButtons.length - 1) {
            if (nextButton.className.split(" ").indexOf("disable") < 0) {
                nextButton.classList.add("disable");
            }
        } else {
            if (nextButton.className.split(" ").indexOf("disable") >= 0) {
                nextButton.classList.remove("disable");
            }
        }
    });
}

nextButton.addEventListener("click", function() {
    if (currentSection < sectionButtons.length - 1) {
        sectionButtons[currentSection + 1].click();
    }
});

nextButton2.addEventListener("click", function() {
    if (currentSection < sectionButtons.length - 1) {
        sectionButtons[currentSection + 1].click();
    }
});

previousButton.addEventListener("click", function() {
    if (currentSection > 0) {
        sectionButtons[currentSection - 1].click();
    }
});

previousButton2.addEventListener("click", function() {
    if (currentSection > 0) {
        sectionButtons[currentSection - 2].click();
    }
});

if(currentSection == 2){
  let path = document.querySelector(".tick");
  let length = path.getTotalLength();

  console.log(length); 
}
});
      