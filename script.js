const dropdownBtn = document.querySelector(".dropdownBtn");
const arrow = document.querySelector(".home-drop");

let homeCount = 0;
dropdownBtn.addEventListener("click", homeDropdownShow);

function homeDropdownShow() {
  if (homeCount % 2 == 0) {
    gsap.to(".ri-arrow-down-s-line", {
      rotate: 180,
    });
    homeCount++;
  } else {
    gsap.to(".ri-arrow-down-s-line", {
      rotate: 0,
    });
    homeCount++;
  }

  const dropdown = document.getElementById("dropdownNavbar1");
  dropdown.classList.toggle("dropdownNavbarshow1"); // 切換 show 類別
}

const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Discarded", "Incinerated", "Still in use", "Recycled"],
    datasets: [
      {
        label: "million tons",
        data: [5300, 1000, 2900, 700],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// Menu
// let navTrigger = document.querySelector(".navTrigger");
// const menu = document.querySelector(".menu");
// menuBtn.addEventListener("click", menuOpen);

// let isMenuOpen = true;
// let tl = gsap.timeline();

// function menuOpen() {
//   menu.classList.add("menu-open");

//   if (isMenuOpen) {
//     hamburgerLine.classList.add("hamburger-animation-1");
//     hamburgerLine.classList.add("hamburger-animation-2");
//     tl.fromTo(
//       ".menu",
//       { right: "-100vw", opacity: 0.5, scale: 0 },
//       { right: "0", opacity: 1, scale: 1, duration: 2 }
//     );

//     tl.fromTo(
//       ".menu-item",
//       { right: "-100vw", opacity: 0.5, scale: 0 },
//       { right: "0", opacity: 1, scale: 1, duration: 1, stagger: 0.2 }
//     );
//   } else {
//     hamburgerLine.classList.remove("hamburger-animation-1");
//     hamburgerLine.classList.remove("hamburger-animation-2");
//     tl.fromTo(
//       ".menu-item",
//       { right: "0", opacity: 1, scale: 1 },
//       { right: "-100vw", opacity: 0.5, scale: 0, duration: 1, stagger: 0.2 }
//     );
//     tl.fromTo(
//       ".menu",
//       { right: "0", opacity: 1, scale: 1 },
//       { right: "-100vw", opacity: 0.5, scale: 0, duration: 2 },
//       "-=1"
//     );
//   }
//   isMenuOpen = !isMenuOpen;
// }

// function scrollToSection(id) {
//   tl.fromTo(
//     ".menu-item",
//     { right: "0", opacity: 1, scale: 1 },
//     { right: "-100vw", opacity: 0.5, scale: 0, duration: 1, stagger: 0.2 }
//   );
//   tl.fromTo(
//     ".menu",
//     { right: "0", opacity: 1, scale: 1 },
//     { right: "-100vw", opacity: 0.5, scale: 0, duration: 2 },
//     "-=1.2"
//   );
//   hamburgerLine.classList.remove("hamburger-animation-1");
//   hamburgerLine.classList.remove("hamburger-animation-2");
//   isMenuOpen = !isMenuOpen;
//   const element = document.getElementById(id);
//   //console.log(element.id);
//   if (element.id == "humanity") {
//     let offset = 580;
//     let elementPosition = element.getBoundingClientRect().top + window.scrollY;
//     let offsetPosition = elementPosition - offset;
//     window.scrollTo({
//       top: offsetPosition,
//       behavior: "smooth",
//     });
//   } else {
//     element.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// }

//SDGS
gsap.from(".sdgs-txt", {
  y: 100,
  opacity: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".sdgs-txt-wrapper",
    start: "top 80%",
    end: "top 50%",
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
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
    markers: false,
  },
});

//Perpetrators

gsap.registerPlugin(ScrollTrigger);

let timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#perpetrator",
    start: "top 90%",
    end: "top -40%",
    scrub: 4,
    markers: false,
  },
});

timeline
  .from(".carousel-item1", {
    x: window.innerWidth,
    opacity: 0,
    duration: 2,
  })
  .from(".carousel-item2", {
    x: -window.innerWidth,
    opacity: 0,
    duration: 2,
  })
  .from(".carousel-item3", {
    x: window.innerWidth,
    opacity: 0,
    duration: 1.5,
  });

// chart

timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".pollution",
    start: "top 90%",
    end: "top 50%",
    scrub: 4,
    markers: false,
  },
});

timeline.from(".chart-wrapper", {
  opacity: 0,
  scale: 0,
  duration: 2,
  ease: "power2.out",
});

timeline.from(".pollution-title", {
  x: 100,
  opacity: 0,
  duration: 2,
  ease: "power2.out",
});

timeline.from(".pollution-list li", {
  x: 100,
  opacity: 0,
  stagger: 0.4,
  duration: 2,
  // ease: "power2.out",
});

timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".humanity",
    start: "top 70%",
    end: "top 50%",
    scrub: 4,
    markers: false,
  },
});

timeline.from(".section-title", {
  y: 100,
  opacity: 0,
  duration: 2,
});

timeline.from(".antialiased", {
  y: 100,
  opacity: 0,
  duration: 2,
});
// Humanity Section
const panes = document.querySelectorAll(".pane");
let activePaneIndex = 0;

panes.forEach((pane, index) => {
  pane.addEventListener("click", () => {
    panes[activePaneIndex].classList.remove("active");
    activePaneIndex = index;
    panes[activePaneIndex].classList.add("active");
  });
});
