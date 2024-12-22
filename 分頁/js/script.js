const btns = document.querySelectorAll(".btn");
const slide = document.querySelectorAll(".slide");
const slideRow = document.getElementById("slide-wrapper");
const main = document.querySelector(".slider-container");
const imgBtn = document.querySelectorAll(".img-wrapper a");
const tocBtn = document.querySelectorAll("table-of-contents a");

let currentIndex = 0;

function updateSlide() {
  const mainWidth = main.offsetWidth;
  const translateValue = currentIndex * -mainWidth;
  slideRow.style.transform = `translateX(${translateValue}px)`;

  btns.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentIndex);
  });

  slide.forEach((sl, index) => {
    if (index === currentIndex) {
      sl.style.opacity = "1"; // 當前幻燈片顯示
      sl.style.transition = "opacity 0.5s ease"; // 加入漸變效果
    } else {
      sl.style.opacity = "0"; // 其他幻燈片隱藏
    }
  });
}

// 綁定按鈕的點擊事件
btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentIndex = index;
    updateSlide();
  });
});

// 圖片按鈕的點擊事件
imgBtn.forEach((e) => {
  const linkValue = e.getAttribute("href");
  if (typeof linkValue === "string" && linkValue.startsWith("#")) {
    const targetId = linkValue.substring(1);
    const targetIndex = [...slide].findIndex((sl) => sl.id === targetId); // 根據 ID 查找對應幻燈片索引
    e.addEventListener("click", (event) => {
      event.preventDefault(); // 防止默認跳轉行為
      if (targetIndex !== -1) {
        currentIndex = targetIndex;
        updateSlide();
        window.scrollTo({
          top: 860,
          behavior: "smooth",
        });
      }
    });
  }
});

// 當視窗大小改變時，更新滑動位置
window.addEventListener("resize", () => {
  updateSlide();
});

// 頁面目錄的點擊事件
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".table-of-contents .toc"); // 獲取所有鏈接

  links.forEach((link) => {
    // 使用 forEach 遍歷所有鏈接
    link.addEventListener("click", (event) => {
      event.preventDefault(); // 防止默認跳轉行為

      const id = link.getAttribute("data-id"); // 使用 link 來獲取 data-id
      const targetElement = document.getElementById("area" + id);
      const targetTop =
        targetElement.getBoundingClientRect().top + window.scrollY; // 取得目標區塊的 y 座標

      if (window.innerWidth < 1920) {
        // 1440
        if (targetElement) {
          // 檢查 targetElement 是否存在
          window.scrollTo({
            // 平滑滾動到目標位置
            top: targetTop - 150,
            behavior: "smooth",
          });
        }
      } else if (window.innerWidth < 2000) {
        // 1990
        if (targetElement) {
          // 檢查 targetElement 是否存在
          window.scrollTo({
            // 平滑滾動到目標位置
            top: targetTop - 270,
            behavior: "smooth",
          });
        }
      }
    });
  });
});

const menuBtn = document.querySelector(".menuBtn");
const menuList = document.querySelector(".menuList");
menuBtn.addEventListener("click", displayMenu);
function displayMenu() {
  menuList.classList.toggle("show");
}

const question = document.querySelectorAll(".question");
question.forEach((e) => e.addEventListener("click", displayFAQ));

function displayFAQ(e) {
  const currentQuestion = e.currentTarget;
  console.log(currentQuestion);
  const arrow = currentQuestion.querySelector(".arrow");
  const ans = currentQuestion
    .closest(".question")
    .querySelector(".question .ans");
  if (ans.classList.contains("hidden")) {
    arrow.style.transform = "rotate(180deg)";
    ans.classList.remove("closeAnimation");
    ans.classList.add("openAnimation");
    ans.classList.remove("hidden");
  } else {
    arrow.style.transform = "rotate(0deg)";
    ans.classList.add("closeAnimation");
    ans.classList.remove("openAnimation");
    ans.classList.add("hidden");
  }
}

gsap.from(".banner-title", {
  x: -window.innerWidth,
  opacity: 0,
  duration: 2,
});
gsap.from(".banner-content", {
  x: -window.innerWidth,
  opacity: 0,
  duration: 2,
});

gsap.from(".bannerImg", {
  scale: 0,
  opacity: 0,
  duration: 2,
});

gsap.registerPlugin(ScrollTrigger);

let timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".feature",
    start: "top 80%",
    end: "top 30%",
    scrub: 4,
    stagger: 0.4,
    markers: false,
  },
});

timeline
  .from(".feature-title", {
    y: 100,
    opacity: 0,
    duration: 1,
  })
  .from(".feature-content", {
    y: 100,
    opacity: 0,
    duration: 1,
  })
  .from(".card1", {
    scale: 0,
    y: 100,
    opacity: 0,
    duration: 1,
  })
  .from(".card2", {
    scale: 0,
    y: 100,
    opacity: 0,
    duration: 1,
  })
  .from(".card3", {
    scale: 0,
    y: 100,
    opacity: 0,
    duration: 1,
  });

timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".support",
    start: "top 80%",
    end: "top 40%",
    scrub: 4,
  },
});

timeline.from(".support-card", {
  y: 100,
  scale: 0.4,
  opacity: 0,
  duration: 1,
});

timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".question-wrapper",
    start: "top 50%",
    end: "top 80%",
    scrub: 4,
    stagger: 0.4,
    // markers: true,
  },
});

timeline
  .from(".question1", {
    x: window.innerWidth,
    opacity: 0,
    duration: 1,
  })
  .from(".question2", {
    x: -window.innerWidth,
    opacity: 0,
    duration: 1,
  })
  .from(".question3", {
    x: window.innerWidth,
    opacity: 0,
    duration: 1,
  })
  .from(".question4", {
    x: -window.innerWidth,
    opacity: 0,
    duration: 1,
  })
  .from(".question5", {
    x: window.innerWidth,
    opacity: 0,
    duration: 1,
  });
