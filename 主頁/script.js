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
    scrub: 3,
    end: "+=3200",
    snap: 1 / (sections.length - 1),
    markers: true,
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
    duration: 5,
    ease: "elastic",
    stagger: 0.5,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: "left center",
      markers: true,
    },
  });
});
