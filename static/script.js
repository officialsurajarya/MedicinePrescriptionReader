// ----- Menu Toggle -----
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle?.addEventListener("click", () => {
  navbar?.classList.toggle("open");
});

// ----- Navigation Links: Set Active and Close Navbar -----
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(el => el.classList.remove("active"));
    this.classList.add("active");
    navbar?.classList.remove("open");
  });
});

// ----- Swiper: Hero Section (if exists) -----
if (document.querySelector(".heroSwiper")) {
  new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

// ----- Swiper: Developer Cards -----
new Swiper(".mySwiper", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 30,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// ----- Glow Bubble Trail Effect -----
let lastTime = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTime < 30) return;
  lastTime = now;

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.random() * 10 + 8;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${e.clientX - size / 2}px`;
  bubble.style.top = `${e.clientY - size / 2}px`;

  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1000);
});
