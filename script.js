// SYED & SONS motion interactions
const revealItems = document.querySelectorAll('.reveal, .section-kicker, .product, .campaign-copy h2');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

const menuButton = document.querySelector('.menu-toggle');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.innerHTML = open ? 'MENU <span>＋</span>' : 'CLOSE <span>×</span>';
  if (!open) {
    const target = document.querySelector('#clothing');
    target?.scrollIntoView({ behavior: 'smooth' });
  }
});

// Subtle cursor-driven liquid parallax on desktop; falls back gracefully on touch.
if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('[data-distort]').forEach((panel) => {
    panel.addEventListener('pointermove', (event) => {
      const r = panel.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      panel.style.setProperty('--mx', `${x * 14}px`);
      panel.style.setProperty('--my', `${y * 14}px`);
      panel.style.filter = `hue-rotate(${x * 4}deg)`;
    });
    panel.addEventListener('pointerleave', () => {
      panel.style.removeProperty('--mx');
      panel.style.removeProperty('--my');
      panel.style.removeProperty('filter');
    });
  });
}

// When local MP4 files are not supplied, use the designed poster treatment.
document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('error', () => video.classList.add('video-unavailable'));
  const source = video.querySelector('source');
  if (source) {
    video.addEventListener('loadeddata', () => {
      const placeholder = video.parentElement.querySelector('.campaign-placeholder');
      if (placeholder) placeholder.style.display = 'none';
    });
  }
});
