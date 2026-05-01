// ============================================
// PORTFOLIO RUSMERI CÁRDENAS
// main.js — Animaciones e interacciones
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

// Hero: dispara inmediatamente al cargar
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-left .reveal, .hero-right').forEach(el => {
    el.classList.add('visible');
  });
});

// ── SISTEMA DE PÁGINAS DE PROYECTO ──

function abrirProyecto(id) {
  // Ocultar página principal
  document.getElementById('page-main').style.display = 'none';

  // Mostrar la página del proyecto
  const pagina = document.getElementById(id);
  pagina.style.display = 'block';

  // Volver al inicio de la página
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function cerrarProyecto() {
  // Ocultar todas las páginas de proyecto
  document.querySelectorAll('.project-page').forEach(p => {
    p.style.display = 'none';
  });

  // Mostrar página principal
  document.getElementById('page-main').style.display = 'block';

  // Hacer scroll a la sección proyectos
  setTimeout(() => {
    document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// ── LINKS DEL MENÚ: si hay proyecto abierto, ciérralo primero ──
document.querySelectorAll('.nav-main-link').forEach(link => {
  link.addEventListener('click', () => {
    const hayProyectoAbierto = [...document.querySelectorAll('.project-page')]
      .some(p => p.style.display === 'block');

    if (hayProyectoAbierto) {
      document.querySelectorAll('.project-page').forEach(p => {
        p.style.display = 'none';
      });
      document.getElementById('page-main').style.display = 'block';
    }
  });
});

// Logo también vuelve al inicio
document.getElementById('nav-logo').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.project-page').forEach(p => {
    p.style.display = 'none';
  });
  document.getElementById('page-main').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
