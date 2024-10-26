gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0 });

const animation = gsap.to(".photo:not(:first-child)", {
  opacity: 1,
  scale: 1,
  duration: 1,
  stagger: 1,
});

ScrollTrigger.create({
  trigger: ".gallery",
  start: "top -160rem",
  end: "bottom bottom",
  pin: ".gallery-right",
  animation: animation,
  scrub: true,
  markers: true,
});
