window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide");

  setTimeout(() => {
    preloader.remove();
  }, 700);
});


/* TOGGLE THEME */
const toggle = document.getElementById("toggleTheme");
toggle.onclick = () => {
    const icon = document.getElementById("toggleIcon");
    
    // Toggle Font Awesome classes
    if (icon.classList.contains("fa-moon")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun", "active");
    } else {
        icon.classList.remove("fa-sun", "active");
        icon.classList.add("fa-moon");
    }
  document.body.classList.toggle("dark");
};


/* TYPING EFFECT */
const roles = [
  "Frontend Developer",
  "App Developer",
  "Game Developer",
  "Tech Enthusiast"
];

let i = 0, j = 0;
const typing = document.getElementById("typing");

function type() {
  if (j < roles[i].length) {
    typing.textContent = roles[i].substring(0, j + 1);
    j++;
    setTimeout(type, 120);
  } else {
    setTimeout(erase, 900);
  }
}

function erase() {
  if (j > 0) {
    typing.textContent = roles[i].substring(0, j - 1);
    j--;
    setTimeout(erase, 60);
  } else {
    i = (i + 1) % roles.length;
    setTimeout(type, 200);
  }
}
type();


/* PAGE SWITCHING */
let currentPage = document.querySelector(".page.active");

function showSection(id, element) {
  const nextPage = document.getElementById(id);

  if (nextPage === currentPage) return;

  // NAV ACTIVE
  document.querySelectorAll(".nav-link").forEach(n => n.classList.remove("active"));
  element.classList.add("active");

  // FADE OUT
  currentPage.classList.remove("active");

  setTimeout(() => {
    // FADE IN
    nextPage.classList.add("active");
    currentPage = nextPage;
    resetReveal();
  }, 400);
}

/* SCROLL REVEAL (still works without scroll) */
const reveals = document.querySelectorAll(".reveal");

function resetReveal() {
  reveals.forEach(el => el.classList.remove("active"));
  setTimeout(() => {
    reveals.forEach(el => el.classList.add("active"));
  }, 100);
}

resetReveal();



function resetReveal() {
  reveals.forEach(el => el.classList.remove("active"));
  setTimeout(revealOnScroll, 100);
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
