/* DARK MODE */
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

/* BINARY BACKGROUND */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

let fontSize = 18;
let cols, drops;
const charSet = ["0","1"];

function resizeBg() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  ctx.font = fontSize + "px monospace";
  cols = Math.floor(innerWidth / fontSize);
  drops = Array(cols).fill(0).map(() => ({
    y: Math.random() * -200,
    speed: 1 + Math.random() * 1.2
  }));
}

function drawBg() {
  const isDark = document.body.classList.contains("dark");
  ctx.fillStyle = isDark ? "#000" : "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drops.forEach((drop, i) => {
    const x = i * fontSize;
    const trail = 5 + Math.floor(Math.random() * 6);

    for (let t = 0; t < trail; t++) {
      const yPos = drop.y - t * fontSize;
      if (yPos < -fontSize || yPos > canvas.height) continue;

      let alpha = 1 - t / (trail + 1);

      ctx.fillStyle = isDark
        ? `rgba(255,255,255,${alpha})`
        : `rgba(20,20,20,${alpha})`;

      ctx.fillText(charSet[Math.random() < 0.5 ? 0 : 1], x, yPos);
    }

    drop.y += drop.speed * fontSize * 0.3;
    if (drop.y > canvas.height + 50) {
      drop.y = Math.random() * -200;
      drop.speed = 1 + Math.random() * 1.2;
    }
  });

  requestAnimationFrame(drawBg);
}

resizeBg();
drawBg();
onresize = resizeBg;