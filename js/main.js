// ============================================
// PORTFOLIO RUSMERI CÁRDENAS
// main.js — Solo lo que funciona en TODAS las páginas
// ============================================

// ── ANIMACIONES DE SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  observer.observe(el);
});

// Hero: dispara en cuanto la estructura HTML esté lista
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero-left .reveal, .hero-right').forEach(el => {
    el.classList.add('visible');
  });
  document.querySelectorAll('.media-carousel-wrapper, .carrusel-track').forEach(setupCarousel);
});

function setupCarousel(track) {
  if (track.closest('.carousel-shell')) return;

  const shell = document.createElement('div');
  shell.className = 'carousel-shell';
  track.parentNode.insertBefore(shell, track);
  shell.appendChild(track);

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.setAttribute('aria-label', 'Navegación del carrusel');
  controls.innerHTML = `
    <button class="carousel-control carousel-control-prev" type="button" aria-label="Ver contenido anterior">←</button>
    <button class="carousel-control carousel-control-next" type="button" aria-label="Ver contenido siguiente">→</button>
  `;
  shell.appendChild(controls);

  const previousButton = controls.querySelector('.carousel-control-prev');
  const nextButton = controls.querySelector('.carousel-control-next');
  const getStep = () => {
    const item = track.querySelector('.media-card, .carrusel-item');
    if (!item) return track.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return item.getBoundingClientRect().width + gap;
  };

  const updateControls = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    previousButton.disabled = track.scrollLeft <= 1;
    nextButton.disabled = track.scrollLeft >= maxScroll;
    controls.hidden = maxScroll <= 0;
  };

  previousButton.addEventListener('click', () => {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });
  nextButton.addEventListener('click', () => {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  });

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  track.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    isDragging = true;
    startX = event.clientX;
    startScrollLeft = track.scrollLeft;
    track.classList.add('is-dragging');
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener('pointermove', event => {
    if (isDragging) track.scrollLeft = startScrollLeft - (event.clientX - startX);
  });

  const stopDragging = event => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  };

  track.addEventListener('pointerup', stopDragging);
  track.addEventListener('pointercancel', stopDragging);
  track.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
}