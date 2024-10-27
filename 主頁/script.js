// Menu

//SDGS
gsap.from(".sdgs-txt", {
  y: 100,
  opacity: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".sdgs-txt-wrapper",
    start: "top 60%",
    end: "top 30%",
    scrub: 1,
    markers: false,
  },
});

gsap.from(".sdgs-source", {
  y: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".sdgs-txt-wrapper",
    start: "top 60%",
    end: "top 30%",
    scrub: 1,
    markers: false,
  },
});

// Perpetrators section
const container = document.querySelector(".container");
const sections = gsap.utils.toArray(".container section");
const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask");

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 4,
    end: "+=3200",
    snap: 1 / (sections.length - 1),
    markers: false,
  },
});

gsap.to(mask, {
  width: "100%",
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top left",
    scrub: 3,
  },
});

sections.forEach((section) => {
  let text = section.querySelectorAll(".anim");

  if (text.length === 0) return;

  gsap.from(text, {
    opacity: 0,
    duration: 2,
    ease: "elastic",
    stagger: 0.5,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: "left center",
      markers: false,
    },
  });
});

// Humanity Section
gsap.registerPlugin(ScrollTrigger);
const revealType = document.querySelectorAll(".reveal-type");

revealType.forEach((char, i) => {
  const bg = char.dataset.bgColor; // 背景色
  const fg = char.dataset.fgColor; // 文字顯示顏色

  const text = new SplitType(char, { type: "chars" }); // 字串分割

  gsap.from(text.chars, {
    opacity: 0.2,
    duration: 1,
    stagger: 0.1,
    ease: "elastic",
    scrollTrigger: {
      trigger: char,
      start: "top 80%",
      end: "top 35%",
      scrub: true,
      markers: false,
      toggleActions: "play play reverse reverse",
    },
  });
});

//平滑滾動
const lenis = new lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
