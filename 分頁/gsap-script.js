//卷軸
gsap.from(".animal-intro-section", {
    y: 200,
    opacity: 1,
    duration: 100,
    scrollTrigger: {
      trigger: ".img-bg",
      start: "top 100%",
      end: "top -50%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".data-garbage-section", {
    y: 200,
    opacity: 1,
    duration: 100,
    scrollTrigger: {
      trigger: ".indicator",
      start: "top 100%",
      end: "top -50%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".decoration-img-2", {
    y: 500,
    opacity: 1,
    duration: 100,
    scrollTrigger: {
      trigger: ".decoration-img",
      start: "top 100%",
      end: "top -50%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".decoration-img-3", {
    y: 300,
    opacity: 1,
    duration: 10,
    scrollTrigger: {
      trigger: ".decoration-img-3",
      start: "top 100%",
      end: "top -50%",
      scrub: 1,
      markers: false,
    },
  });
  
  //浮現
  gsap.from(".slider", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".slider",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from("#plasticbag-link", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: "#plasticbag-link",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from("#microplastic-link", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: "#microplastic-link",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });
  
  //data
  const dataColor = document.querySelector('.data-color');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // 如果元素进入视口
        // 执行动画
        gsap.fromTo(".data-color", 
          { 
            width: 0,  
          },
          { 
            width: "100%", 
            duration: 4, 
          }
        );
        
        gsap.from(".data-num", {
          textContent: 0 + "%",
          duration: 4,
          snap: { textContent: 1 }
        });
       
        observer.unobserve(entry.target); // 停止观察这个元素
      }
    });
  }, {
    threshold: 0.5  // 50% 的元素可见时触发
  });
  observer.observe(dataColor);// 观察目标元素