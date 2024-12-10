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
  gsap.from(".decoration-img-1", {
    y: 300,
    opacity: 1,
    duration: 10,
    scrollTrigger: {
      trigger: ".decoration-img-1",
      start: "top 100%",
      end: "top -50%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".decoration-img-2", {
    y: 200,
    opacity: 1,
    duration: 100,
    scrollTrigger: {
      trigger: ".decoration-img-2",
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
  gsap.from(".indicator", {
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
  gsap.from(".news-intro-section", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".data",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".marine-creature-1-news", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".marine-creature-1-news",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".marine-creature-2-news", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".marine-creature-2-news",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });
  gsap.from(".marine-creature-3-news", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".marine-creature-3-news",
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
  gsap.from("#fishingnet-link", {
    y: 100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: "#fishingnet-link",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
      markers: false,
    },
  });

  //data
  const dataColor = document.querySelector('.data-color-1');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // 如果元素进入视口
        // 执行动画
        gsap.fromTo(".data-color-1", 
          { 
            width: 0,  
          },
          { 
            width: "95%", 
            duration: 4, 
          }
        );
        gsap.fromTo(".data-color-2", 
          { 
            width: 0,  
          },
          { 
            width: "85%", 
            duration: 4, 
          }
        );
        gsap.fromTo("#page-2 .data-color-2", 
          { 
            width: 0,  
          },
          { 
            width: "80%", 
            duration: 4, 
          }
        );
        gsap.fromTo(".data-color-3", 
          { 
            width: 0,  
          },
          { 
            width: "60%", 
            duration: 4, 
          }
        );
        gsap.fromTo("#page-2 .data-color-3", 
          { 
            width: 0,  
          },
          { 
            width: "40%", 
            duration: 4, 
          }
        );
        gsap.fromTo("#page-2 .data-color-4", 
          { 
            width: 0,  
          },
          { 
            width: "35%", 
            duration: 4, 
          }
        );
        
        gsap.from(".data-num", {
          textContent: 0,
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