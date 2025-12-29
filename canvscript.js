/* BINARY BACKGROUND */
// const canvas = document.getElementById('c');
// const ctx = canvas.getContext('2d');

// let fontSize = 18;
// let cols, drops;
// const charSet = ["0","1"];

// function resizeBg() {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
//   ctx.font = fontSize + "px monospace";
//   cols = Math.floor(innerWidth / fontSize);
//   drops = Array(cols).fill(0).map(() => ({
//     y: Math.random() * -200,
//     speed: 1 + Math.random() * 1.2
//   }));
// }

// function drawBg() {
//   const isDark = document.body.classList.contains("dark");
//   ctx.fillStyle = isDark ? "#000" : "#fff";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   drops.forEach((drop, i) => {
//     const x = i * fontSize;
//     const trail = 5 + Math.floor(Math.random() * 6);

//     for (let t = 0; t < trail; t++) {
//       const yPos = drop.y - t * fontSize;
//       if (yPos < -fontSize || yPos > canvas.height) continue;

//       let alpha = 1 - t / (trail + 1);

//       ctx.fillStyle = isDark
//         ? `rgba(255,255,255,${alpha})`
//         : `rgba(20,20,20,${alpha})`;

//       ctx.fillText(charSet[Math.random() < 0.5 ? 0 : 1], x, yPos);
//     }

//     drop.y += drop.speed * fontSize * 0.3;
//     if (drop.y > canvas.height + 50) {
//       drop.y = Math.random() * -200;
//       drop.speed = 1 + Math.random() * 1.2;
//     }
//   });

//   requestAnimationFrame(drawBg);
// }

// resizeBg();
// drawBg();
// onresize = resizeBg;




// const canvas = document.getElementById('c');
// const ctx = canvas.getContext('2d');

// let fontSize = 18;
// let cols;
// let drops;
// const charSet = ["0", "1"];

// function resizeBg() {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
//   ctx.font = fontSize + "px monospace";
//   cols = Math.floor(innerWidth / fontSize);

//   // Initialize drops for all columns
//   drops = Array(cols).fill(0).map((_, i) => {
//     if (i % 2 === 0) { // even columns → bottom→top
//       return {
//         y: Math.random() * canvas.height,
//         speed: 1 +  Math.random() * 1.2,
//         direction: -1 // upward
//       };
//     } else { // odd columns → top→bottom
//       return {
//         y: Math.random() * -200,
//         speed: 1+ Math.random() * 1.2,
//         direction: 1 // downward
//       };
//     }
//   });
// }

// function drawBg() {
//   const isDark = document.body.classList.contains("dark");
//   ctx.fillStyle = isDark ? "#000" : "#fff";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   drops.forEach((drop, i) => {
//     const x = i * fontSize;
//     const trail = 7 + Math.floor(Math.random() * 6);

//     for (let t = 0; t < trail; t++) {
//       const yPos = drop.y - t * fontSize * drop.direction;
//       if (yPos < -fontSize || yPos > canvas.height) continue;
//       const alpha = 1 - t / (trail + 1);

//       ctx.fillStyle = isDark
//         ? `rgba(255,255,255,${alpha})`
//         : `rgba(20,20,20,${alpha})`;

//       ctx.fillText(charSet[Math.random() < 0.5 ? 0 : 1], x, yPos);
//     }

//     drop.y += drop.speed * fontSize * 0.4 * drop.direction;

//     // Reset drops when out of bounds
//     if (drop.direction === 1 && drop.y > canvas.height + 50) {
//       drop.y = Math.random() * -200;
//       drop.speed = 1 + Math.random() * 1.2;
//     } else if (drop.direction === -1 && drop.y < -50) {
//       drop.y = canvas.height + Math.random() * 200;
//       drop.speed = 1 + Math.random() * 1.2;
//     }
//   });

//   requestAnimationFrame(drawBg);
// }

// resizeBg();
// drawBg();
// window.onresize = resizeBg;




// const canvas = document.getElementById("c");
// const ctx = canvas.getContext("2d");
// canvas.width = innerWidth;
// canvas.height = innerHeight;

// function rand(a, b) { return Math.random() * (b - a) + a; }
// function make8Bit(){ return Array.from({length:8},()=>Math.random()>0.5?"1":"0").join(""); }

// function makeParticle(){
//   const dir = Math.floor(Math.random() * 4); // 0=down, 1=up, 2=right, 3=left
//   let x, y;

//   if(dir===0) { x = rand(0, innerWidth); y = rand(-60, -10); }         // down
//   if(dir===1) { x = rand(0, innerWidth); y = rand(innerHeight+10, innerHeight+60); } // up
//   if(dir===2) { x = rand(-60, -10); y = rand(0, innerHeight); }        // right
//   if(dir===3) { x = rand(innerWidth+10, innerWidth+60); y = rand(0, innerHeight); } // left

//   return {
//     x, y,
//     size: rand(12,26),
//     speed: rand(40,120),
//     text: make8Bit(),
//     wobble: rand(0.5,2.2),
//     age: 0,
//     life: rand(2,4), // shorter life for faster fade
//     dir,
//     alpha: 0 // initial transparency
//   };
// }

// let parts = Array.from({length:100}, makeParticle);
// let last = 0;

// function loop(t){
//   const dt = (t - last) / 1000;
//   last = t;

//   const isDark = document.body.classList.contains("dark");
//   ctx.clearRect(0,0,canvas.width,canvas.height);
//   ctx.textBaseline = "middle";
//   ctx.textAlign = "center";

//   for(const p of parts){
//     p.age += dt;

//     if(Math.random() < 0.02) p.text = make8Bit();

//     // Move particle in its direction
//     if(p.dir===0) p.y += p.speed * dt; // down
//     if(p.dir===1) p.y -= p.speed * dt; // up
//     if(p.dir===2) p.x += p.speed * dt; // right
//     if(p.dir===3) p.x -= p.speed * dt; // left

//     // Optional wobble
//     p.x += Math.sin(p.age * p.wobble) * 0.6;

//     // Fade in/out using sine wave over life
//     p.alpha = Math.sin((p.age / p.life) * Math.PI);

//     ctx.font = `bold ${Math.round(p.size)}px 'Courier New', monospace`;
//     ctx.fillStyle = isDark
//       ? `rgba(160,160,160,${p.alpha})`
//       : `rgba(105,105,105,${p.alpha})`;

//     ctx.fillText(p.text, p.x, p.y);

//     // Reset particle when it goes out of bounds
//     if(p.y < -80 || p.y > innerHeight+80 || p.x < -80 || p.x > innerWidth+80){
//       Object.assign(p, makeParticle());
//     }
//   }

//   requestAnimationFrame(loop);
// }

// requestAnimationFrame(loop);

// window.addEventListener("resize", ()=>{
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
// });




const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* EXTENSION ZONE (important) */
const PADDING = 260;

/* SETTINGS */
const MAX_DIST = 170;
const NODE_COUNT = Math.min(300, (w * h) / 2000);

/* CREATE NODES (beyond viewport) */
const nodes = Array.from({ length: NODE_COUNT }, () => ({
  x: Math.random() * (w + PADDING * 2) - PADDING,
  y: Math.random() * (h + PADDING * 2) - PADDING,
  vx: (Math.random() - 0.5) * 0.08,
  vy: (Math.random() - 0.5) * 0.08,
  r: Math.random() * 1.4 + 0.6,
  dark: Math.random() > 0.65
}));

function cssVar(v){
  return getComputedStyle(document.body).getPropertyValue(v);
}

/* FADE BASED ON DISTANCE FROM VIEWPORT */
function viewportFade(x, y){
  const fx = Math.min(
    Math.max(x, 0),
    w
  );
  const fy = Math.min(
    Math.max(y, 0),
    h
  );

  const d = Math.hypot(x - fx, y - fy);
  return Math.max(0, 1 - d / PADDING);
}

function draw(){
  ctx.clearRect(0,0,w,h);
  const isDark = document.body.classList.contains("dark");

  /* LINES */
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);

      if(dist < MAX_DIST){
        const fade =
          (1 - dist / MAX_DIST) *
          viewportFade((a.x + b.x)/2, (a.y + b.y)/2);

        if(fade <= 0) continue;

        ctx.strokeStyle =
          isDark
            ? cssVar("--line-dark")
            : cssVar("--line-light");

        ctx.globalAlpha = fade;
        ctx.lineWidth = isDark ? 0.5 : 0.6;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;

  /* NODES */
  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;

    if(n.x < -PADDING || n.x > w + PADDING) n.vx *= -1;
    if(n.y < -PADDING || n.y > h + PADDING) n.vy *= -1;

    const fade = viewportFade(n.x, n.y);
    if(fade <= 0) return;

    ctx.globalAlpha = fade;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = n.dark
      ? cssVar("--node-dark")
      : cssVar("--node-light");
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

draw();
