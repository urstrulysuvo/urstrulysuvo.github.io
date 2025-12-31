const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function cssVar(v){
  return getComputedStyle(document.body).getPropertyValue(v);
}

let animationId = null;
let currentEngine = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function stopCanvas() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentEngine = null;
}
function startBinaryBackground() {
    stopCanvas();
    currentEngine = "binary";

    let fontSize = Math.min(canvas.width, canvas.height) * 0.026;
    let cols, drops;
    const charSet = ["0","1"];

    function resizeBg() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.font = `${fontSize}px monospace`;;
    cols = Math.floor(innerWidth / fontSize);
    drops = Array(cols).fill(0).map(() => ({
    y: Math.random() * -200,
    speed: 1 + Math.random() * 1.2
    }));
    }

    function drawBg() {
    const isDark = document.body.classList.contains("dark");
    ctx.fillStyle = cssVar("--bg");
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
}

function startNetworkBackground() {
    stopCanvas();
    currentEngine = "network";

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
    function drawNet(){
    ctx.clearRect(0,0,w,h);
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
            ctx.strokeStyle = cssVar("--line-color");
            ctx.globalAlpha = fade;
            ctx.lineWidth = 0.6;
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
        ctx.fillStyle = cssVar("--node-color");
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawNet);
    }
    drawNet();
}

function startParticleBackground() {
    stopCanvas();
    currentEngine = "particles";

    let cols, rows;
    let grid = [];
    /* RESPONSIVE FONT SIZE */
    let FONT_SIZE;
    let COL_WIDTH;
    let ROW_HEIGHT;
    function updateMetrics(w, h){
    FONT_SIZE = Math.min(w, h) * 0.025;
    COL_WIDTH  = FONT_SIZE + 6;
    ROW_HEIGHT = FONT_SIZE + 8;
    }
    function initGrid(){
    grid = [];
    for(let c = 0; c < cols; c++){
    const density = Math.random() * 0.6 + 0.3;
    const baseAlpha = Math.random() * 0.45 + 0.15;
    for(let r = 0; r < rows; r++){
        if(Math.random() > density) continue;

        grid.push({
            c, r,
            value: Math.random() > 0.5 ? "1" : "0",
            alpha: baseAlpha * (Math.random() * 0.8 + 0.4),
            fade: Math.random() < 0.15
        });
    }
    }
    }
    function resizeGrid(){
    const dpr = window.devicePixelRatio || 1;
    const w = innerWidth;
    const h = innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    updateMetrics(w, h);
    cols = Math.ceil(w / COL_WIDTH);
    rows = Math.ceil(h / ROW_HEIGHT);
    initGrid();
    }
    window.addEventListener("resize", resizeGrid);
    resizeGrid();
    setInterval(() => {
    grid.forEach(cell => {
    if(Math.random() < 0.04){
        cell.value = cell.value === "1" ? "0" : "1";
    }
    if(cell.fade && Math.random() < 0.05){
        cell.alpha = Math.random() * 0.15 + 0.05;
    }
    });
    }, 100);
    function drawBinaryGrid(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    ctx.font = `${FONT_SIZE}px monospace`;
    ctx.fillStyle = cssVar("--c-text-main");
    grid.forEach(cell => {
    ctx.globalAlpha = cell.alpha;
    ctx.fillText(
        cell.value,
        cell.c * COL_WIDTH + 3,
        cell.r * ROW_HEIGHT + FONT_SIZE
    );
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawBinaryGrid);
    }
    drawBinaryGrid();
}

function setBackground(type) {
  // ===== BACKGROUND SWITCH (your existing logic can stay here) =====
  if (type === "bg-1") startBinaryBackground();
  if (type === "bg-2") startNetworkBackground();
  if (type === "bg-3") startParticleBackground();

  localStorage.setItem("canvasBackground", type);

  // ===== ACCENT COLOR SWITCH =====
  const btn = document.querySelector(
    `.mac-btn[onclick="setBackground('${type}')"]`
  );

  if (btn && btn.dataset.accent) {
    document.documentElement.style.setProperty(
      "--c-accent",
      btn.dataset.accent
    );

    // persist accent
    localStorage.setItem("accentColor", btn.dataset.accent);
  }
}

const saved = localStorage.getItem("canvasBackground") || "bg-1";
setBackground(saved);

// Restore accent
const savedAccent = localStorage.getItem("accentColor");
if (savedAccent) {
  document.documentElement.style.setProperty("--c-accent", savedAccent);
}
