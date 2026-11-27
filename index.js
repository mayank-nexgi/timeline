const timeline = document.getElementById("timeline");
const lines = document.querySelectorAll(".seg");
const boxes = document.querySelectorAll(".item, .year-banner, .whats-next, .resources",);
const hint = document.getElementById("scrollIndicator");
// Number ko 0 aur 1 ke beech rakhne ka chhota function
const clamp01 = (n) => Math.min(Math.max(n, 0), 1);
function update() {
  const scrollY = window.innerHeight * 0.62 - timeline.getBoundingClientRect().top;
  if (hint) hint.style.opacity = window.scrollY > 30 ? "0" : "1";   
  // Lines draw karo
  for (const line of lines) {
    const top = parseFloat(line.style.top) || 0;
    const size = parseFloat(line.dataset.size) || 0;
    const isV = line.classList.contains("v-seg");
    const p = clamp01((scrollY - top) / (isV ? size : 55));  
    const sizePx = `${size * p}px`;
    if (isV) line.style.height = sizePx;
    else line.style.width = sizePx;
  }
  // Boxes dikhao ya chhupao
  for (const box of boxes) {
    const boxTop = parseFloat(box.style.top) || 0;
    box.classList.toggle("show", scrollY >= boxTop - 30);
  }
}
window.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", update);
update();