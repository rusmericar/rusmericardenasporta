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
});