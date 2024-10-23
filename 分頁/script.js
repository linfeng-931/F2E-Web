/*const main = document.querySelector(".slider-container");
const slideWrapper = document.querySelector(".slide-wrapper");
const slides = document.querySelector(".slider");
const btns = document.querySelector(".btn");

let currentIndex = 0;

function initializeSlide(){
    slides[0].style.opacity = "1";
    slides[0].classList.add("active");
}
function updateSlide(){
    const mainWidth = main.offsetWidth;
    const translateValue = currentIndex * -mainWidth;
    slideWrapper.style.transform = `translateX(${translateValue}px)`

    btns.forEach((btn, index) => {
        btn.classList.toggle("active", index === currentIndex);
      });

    slides.forEach((slide, index) => {
        slide.style.opacity = index === currentIndex ? "1" : "0";
        slide.classList.toggle("active", index === currentIndex);
    });
}

btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentIndex = index;
      updateSlide();
    });
  });

window.addEventListener("resize", () => {
    updateSlide();
}); */

const btns = document.querySelectorAll(".btn");
const slide = document.querySelectorAll(".slide");
const slideRow = document.getElementById("slide-wrapper");
const main = document.querySelector(".slider-container");


let currentIndex = 0;

function updateSlide() {
  const mainWidth = main.offsetWidth;
  const translateValue = currentIndex * -mainWidth;
  slideRow.style.transform = `translateX(${translateValue}px)`;

  btns.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentIndex);
  });
  slide.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentIndex);
  });
}

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentIndex = index;
    updateSlide();
  });
});
slide.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentIndex = index;
        updateSlide();
    });
});


window.addEventListener("resize", () => {
  updateSlide();
});
