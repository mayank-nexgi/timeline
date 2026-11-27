const timeline = document.getElementById('timeline');
const segs = Array.from(document.querySelectorAll('.seg'));
const reveals = Array.from(document.querySelectorAll('.item, .year-banner, .whats-next, .resources'));
const scrollIndicator = document.getElementById('scrollIndicator');

const clamp01 = (val) => Math.min(Math.max(val, 0), 1);

segs.forEach((seg) => {
  const dir = seg.dataset.dir;
  const left = parseFloat(seg.style.left) || 0;
  const top = parseFloat(seg.style.top) || 0;
  const size = parseFloat(seg.dataset.size) || 0;

  seg.dataset.baseLeft = left;
  seg.dataset.baseTop = top;
  seg.dataset.size = size;

  if (dir === 'l') seg.style.left = `${left + size}px`;
  if (dir === 'u') seg.style.top = `${top + size}px`;
});

function setSegmentProgress(seg, progress) {
  const dir = seg.dataset.dir;
  const baseLeft = Number(seg.dataset.baseLeft);
  const baseTop = Number(seg.dataset.baseTop);
  const size = Number(seg.dataset.size);
  const len = size * progress;

  if (seg.classList.contains('v-seg')) {
    seg.style.height = `${len}px`;
    if (dir === 'u') seg.style.top = `${baseTop + size - len}px`;
  } else {
    seg.style.width = `${len}px`;
    if (dir === 'l') seg.style.left = `${baseLeft + size - len}px`;
  }
}

function updateTimeline() {
  const scrollY = window.scrollY || window.pageYOffset;
  const rect = timeline.getBoundingClientRect();
  const vh = window.innerHeight;
  const penY = vh * 0.62 - rect.top;

  if (scrollIndicator) {
    scrollIndicator.style.opacity = scrollY > 30 ? '0' : '1';
  }

  segs.forEach((seg) => {
    const baseTop = Number(seg.dataset.baseTop);
    const size = Number(seg.dataset.size);

    const progress = seg.classList.contains('v-seg')
      ? clamp01((penY - baseTop) / Math.max(size, 1))
      : clamp01((penY - (baseTop - 25)) / 55);

    setSegmentProgress(seg, progress);
  });

  reveals.forEach((el) => {
    const elTop = parseFloat(el.style.top) || 0;
    el.classList.toggle('show', penY >= elTop - 30);
  });
}

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();