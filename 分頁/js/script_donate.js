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

  const db = firebase.firestore();

  /*donate*/
  const $btn = $("#btndonate");
  const $nameField = $("#name-field");
  const $name2Field = $("#name2-field");
  const $nicknameField = $("#nickname-field");
  const $emailField = $("#email-field");
  const $moneyField = $("#money-field");
  const $cardField = $("#card");
  const $expiration = $("#expiration");
  const $code = $("#code");
  const money_donate_Ref = db.collection("money_donate");
  const user_money_Ref = money_donate_Ref.doc("user_money");
  const total_money_Ref = money_donate_Ref.doc("total_money");
  const donate = document.querySelector(".donate");
  const closeBtn = document.querySelector(".close-btn");
  const donateBtn = document.querySelector(".donate-btn");
  let x = 0;
  let total = 0;
  let orgintotal = total;
  let goal = 50000;
  let datanum = "data-" + x;

  /*page*/
  let currentSection = 0;
  let sections = document.querySelectorAll(".section");
  let sectionButtons = document.querySelectorAll(".nav > li");
  let nextButton = document.querySelector("#next1");
  let nextButton1 = document.querySelector("#next2");
  let nextButton2 = document.querySelector("#btndonate");
  let previousButton = document.querySelector("#previous");
  let previousButton1 = document.querySelector("#previous1");
  let previousButton2 = document.querySelector("#return");

  /*money-selection*/
  let $selection01 = $("#selection-1");
  let $selection02 = $("#selection-2");
  let $selection03 = $("#selection-3");

  let moneysel = 0;
  let flag = -1;

  var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: "easeInOut",
    duration: 1400,
    color: "#FFEA82",
    trailColor: "#eee",
    trailWidth: 1,
    svgStyle: { width: "100%", height: "100%" },
    text: {
      style: {
        color: "#999",
        position: "absolute",
        right: "0",
        top: "8px",
        padding: 0,
        margin: 0,
        transform: null,
      },
      autoStyleContainer: false,
    },
    from: { color: "#FFEA82" },
    to: { color: "#ED6A5A" },
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + " %");
    },
  });

  donateBtn.addEventListener("click", show);
  function show() {
    donate.classList.remove("hidden");
    donate.classList.add("flex");
  }

  closeBtn.addEventListener("click", close);
  function close() {
    donate.classList.remove("flex");
    donate.classList.add("hidden");
  }

  function IsEmail(email) {
    const regex =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  function Iscard(card) {
    const regex = /^[0-9]{12}(?:[0-9]{3})?$/gm;
    if (!regex.test(card)) {
      return false;
    } else {
      return true;
    }
  }

  function Isdate(date) {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const match = date.match(regex);
    console.log(match);
    if (!regex.test(date)) {
      return false;
    } else {
      var d = new Date();

      var getmonth = d.getMonth() + 1;
      var getYear = d.getFullYear();
      console.log("Month:", getmonth);
      console.log("Year:", getYear);
      const month = match[1]; // 抓取第 1 組 (月份)
      const year = match[2]; // 抓取第 2 組 (年份)
      console.log("Month:", month);
      console.log("Year:", year);
      if (year > getYear) {
        return true;
      } else if (year == getYear) {
        if (month >= getmonth) return true;
        else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  function Iscode(code) {
    const regex = /^[0-9]{4}$/;
    if (!regex.test(code)) {
      return false;
    } else {
      return true;
    }
  }

  $selection01.click(function (e) {
    if (flag != 0) {
      moneysel = 500;
      flag = 0;
      $("#selection-1").css("background-color", "#8EB4D9");
      $("#selection-3").css("background-color", "#DEDEDE");
      $("#selection-2").css("background-color", "#DEDEDE");
      $("#money-field").prop("disabled", true);
    } else if (flag == 0) {
      $("#selection-1").css("background-color", "#DEDEDE");
      flag = 0;
      moneysel = 0;
      $("#money-field").prop("disabled", false);
    }
  });

  $selection02.click(function (e) {
    if (flag != 1) {
      flag = 1;
      moneysel = 2000;
      $("#selection-2").css("background-color", "#8EB4D9");
      $("#selection-3").css("background-color", "#DEDEDE");
      $("#selection-1").css("background-color", "#DEDEDE");
      $("#money-field").prop("disabled", true);
    } else if (flag == 1) {
      $("#selection-2").css("background-color", "#DEDEDE");
      flag = 0;
      moneysel = 0;
      $("#money-field").prop("disabled", false);
    }
  });

  $selection03.click(function (e) {
    if (flag != 2) {
      flag = 2;
      moneysel = 5000;
      $("#selection-3").css("background-color", "#8EB4D9");
      $("#selection-1").css("background-color", "#DEDEDE");
      $("#selection-2").css("background-color", "#DEDEDE");
      $("#money-field").prop("disabled", true);
    } else if (flag == 2) {
      $("#selection-3").css("background-color", "#DEDEDE");
      flag = 0;
      moneysel = 0;
      $("#money-field").prop("disabled", false);
    }
  });

  /*-----donate-----*/
  //非同步指令 then, totalmoney計算, 捐款次數計算(重刷網頁也不會喪失之前紀錄的紀錄方式)
  total_money_Ref.get().then(function (doc) {
    total = doc.data().money; // 將 money 欄位的數字存入 num
    x = doc.data().total_user;
    $(".total_money").html(total);
    orgintotal = total;

    let progress = Math.min(total / goal, 1);
    bar.animate(progress);
  });

  // email正則驗證
  $emailField.on("input", function () {
    const emailValue = $(this).val();
    if (IsEmail(emailValue)) {
      $(this).css("background-color", "white");
    } else {
      $(this).css("background-color", "#FFECEC");
    }
  });

  $cardField.on("input", function () {
    const cardValue = $(this).val();
    if (Iscard(cardValue)) {
      $(this).css("background-color", "white");
    } else {
      $(this).css("background-color", "#FFECEC");
    }
  });

  $expiration.on("input", function () {
    const expiration = $(this).val();
    if (Isdate(expiration)) {
      $(this).css("background-color", "white");
    } else {
      $(this).css("background-color", "#FFECEC");
    }
  });

  $code.on("input", function () {
    const code = $(this).val();
    if (Iscode(code)) {
      $(this).css("background-color", "white");
    } else {
      $(this).css("background-color", "#FFECEC");
    }
  });

  //按鈕送出資料
  $btn.click(function (e) {
    //FIELD VALUES
    let senderName = $nameField.val() + " " + $name2Field.val();
    let sendernickName = $nicknameField.val();
    let sendemail = $emailField.val();
    let sendmoney = "";
    let sendCreditCard = $cardField.val();
    let sendExpirarion = $expiration.val();
    let securityCode = $code.val();

    if (moneysel != 0) {
      sendmoney = moneysel;
    } else {
      sendmoney = $moneyField.val();
    }

    sendmoney = parseInt(sendmoney);
    if (sendmoney > 999999) {
      currentSection = currentSection - 1;
      window.alert("Donation limit 999999");
    } else if (sendmoney < 100) {
      currentSection = currentSection - 1;
      window.alert("Minimum donation limit 100");
    } else if (
      senderName == "" ||
      sendernickName == "" ||
      ($moneyField.val() == "" && moneysel == 0) ||
      (IsEmail(sendemail) === false && sendemail != "") ||
      (Iscard(sendCreditCard) === false && sendCreditCard != "") ||
      (Isdate(sendExpirarion) === false && sendExpirarion != "") ||
      (Iscode(securityCode) === false && securityCode != "")
    ) {
      currentSection = currentSection - 1;
      window.alert("Please confirm your input is correct.");
      //錯誤輸入
      if ($nameField.val() == "") {
        $nameField.css("background-color", "#FFECEC");
      }
      if ($name2Field.val() == "") {
        $name2Field.css("background-color", "#FFECEC");
      }
      if ($nicknameField.val() == "") {
        $nicknameField.css("background-color", "#FFECEC");
      }
      if (IsEmail(sendemail) === false || $emailField.val() == "") {
        $emailField.css("background-color", "#FFECEC");
      }
      if ($moneyField.val() == "" && moneysel == 0) {
        $moneyField.css("background-color", "#FFECEC");
      }
      if (Iscard(sendCreditCard) === false || sendCreditCard == "") {
        console.log("sendCreditCard");
        $cardField.css("background-color", "#FFECEC");
      }
      if (Isdate(sendExpirarion) === false || sendExpirarion == "") {
        console.log("sendExpirarion");
        $expiration.css("background-color", "#FFECEC");
      }
      if (Iscode(securityCode) === false || securityCode == "") {
        console.log("securityCode");
        $code.css("background-color", "#FFECEC");
      }
    }
    //SAVE DATA TO FIREBASE
    else {
      datanum = "data-" + x;
      user_money_Ref.update({
        [datanum]: {
          Name: senderName,
          nickName: sendernickName,
          email: sendemail,
          money: sendmoney,
          "credit card": {
            "card number": sendCreditCard,
            "security code": securityCode,
          },
          timeStamp: Date.now(),
        },
      });
      x++;

      total = total + sendmoney;
      total_money_Ref
        .update({
          money: total,
          total_user: x,
          timeStamp: Date.now(),
        })
        .then(() => {
          let progress = Math.min(total / goal, 1);
          bar.animate(progress);
        });

      // EMPTY INPUT FIELD
      $nameField.val("");
      $name2Field.val("");
      $nicknameField.val("");
      $emailField.val("");
      $moneyField.val("");
      $cardField.val("");
      $expiration.val("");
      $code.val("");
      $nameField.css("background-color", "white");
      $name2Field.css("background-color", "white");
      $nicknameField.css("background-color", "white");
      $emailField.css("background-color", "white");
      $moneyField.css("background-color", "white");
      $("#selection-3").css("background-color", "#DEDEDE");
      $("#selection-1").css("background-color", "#DEDEDE");
      $("#selection-2").css("background-color", "#DEDEDE");

      $(".total_money").html(total);
      gsap.from(".total_money", {
        textContent: orgintotal,
        duration: 3,
        snap: { textContent: 10 },
      });
    }
  });

  /*-----page-----*/
  for (let i = 0; i < sectionButtons.length; i++) {
    sectionButtons[i].addEventListener("click", function () {
      sections[currentSection].classList.remove("active");
      sectionButtons[currentSection].classList.remove("active");
      sections[(currentSection = i)].classList.add("active");
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

  nextButton.addEventListener("click", function () {
    if (currentSection < sectionButtons.length - 1) {
      sectionButtons[currentSection + 1].click();
      console.log(currentSection);
    }
  });

  nextButton1.addEventListener("click", function () {
    if (currentSection < sectionButtons.length - 1) {
      sectionButtons[currentSection + 1].click();
      console.log(currentSection);
    }
  });

  nextButton2.addEventListener("click", function () {
    console.log(true);
    if (currentSection < sectionButtons.length - 1) {
      sectionButtons[currentSection + 1].click();
    }
  });

  previousButton.addEventListener("click", function () {
    if (currentSection > 0) {
      sectionButtons[currentSection - 1].click();
    }
  });

  previousButton1.addEventListener("click", function () {
    if (currentSection > 0) {
      sectionButtons[currentSection - 1].click();
    }
  });

  previousButton2.addEventListener("click", function () {
    if (currentSection > 0) {
      sectionButtons[currentSection - 3].click();
    }
  });

  if (currentSection == 2) {
    let path = document.querySelector(".tick");
    let length = path.getTotalLength();

    console.log(length);
  }
});
