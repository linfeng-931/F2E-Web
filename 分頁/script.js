const btns = document.querySelectorAll(".btn");
const slide = document.querySelectorAll(".slide");
const slideRow = document.getElementById("slide-wrapper");
const main = document.querySelector(".slider-container");
const imgBtn = document.querySelectorAll(".img-wrapper a");

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
          top: 950,
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
