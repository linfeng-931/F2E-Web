gsap.set(".photo img", { opacity: 0, scale: 0.5 });
gsap.set(".photo:first-child img", { opacity: 1, scale: 1 }); // 第一張圖預設顯示

const animation = gsap.timeline({
  scrollTrigger: {
    trigger: ".gallery",
    start: "top -1.5rem",
    end: "bottom bottom",
    pin: ".gallery-right", // 固定右側容器
    scrub: true,
    markers: false,
  },
});

// 每一張圖片逐次淡入淡出，上一張圖片會逐漸淡出
animation
  .to(".photo:nth-child(1) img", { opacity: 0, scale: 0.5, duration: 1 })
  .to(".photo:nth-child(2) img", { opacity: 1, scale: 1, duration: 1 })
  .to(".photo:nth-child(2) img", { opacity: 0, scale: 0.5, duration: 1 })
  .to(".photo:nth-child(3) img", { opacity: 1, scale: 1, duration: 1 });
