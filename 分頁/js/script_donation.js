const dropdownBtn1 = document.querySelector(".dropdownBtn1");
const arrow = document.querySelector(".donation-drop");

let donateCount = 0;
dropdownBtn1.addEventListener("click", donateDropdownShow);

function donateDropdownShow() {
  if (donateCount % 2 == 0) {
    gsap.to(".ri-arrow-down-s-line", {
      rotate: 180,
    });
    donateCount++;
  } else {
    gsap.to(".ri-arrow-down-s-line", {
      rotate: 0,
    });
    donateCount++;
  }

  const dropdown = document.getElementById("dropdownNavbar");
  dropdown.classList.toggle("dropdownNavbarshow"); // 切換 show 類別
}
