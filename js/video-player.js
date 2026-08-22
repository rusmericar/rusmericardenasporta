const videos = document.querySelectorAll('.video-portafolio');

  videos.forEach(video => {
    // 1. INYECCIÓN AUTOMÁTICA DEL OVERLAY DE ICONOS
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.innerHTML = `
      <button class="video-control" type="button" aria-label="Reproducir video">
        <span class="icono-circulo">
        <svg viewBox="0 0 24 24">
          <path class="ruta-icono" d="M8 5v14l11-7z"/>
        </svg>
        </span>
        <span class="video-control-label">Toca para reproducir</span>
      </button>
    `;
    video.parentElement.appendChild(overlay);

    const control = overlay.querySelector('.video-control');
    const pathIcono = overlay.querySelector('.ruta-icono');
    const label = overlay.querySelector('.video-control-label');
    const dPlay = "M8 5v14l11-7z";
    const dPause = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

    // Funciones para cambiar los iconos dinámicamente
    function ponerPlay() {
      pathIcono.setAttribute('d', dPlay);
      control.setAttribute('aria-label', 'Reproducir video');
      label.textContent = 'Toca para reproducir';
      overlay.classList.remove('reproduciendo');
    }

    function ponerPausaConEfecto() {
      pathIcono.setAttribute('d', dPause);
      control.setAttribute('aria-label', 'Pausar video');
      label.textContent = 'Toca para pausar';
      overlay.classList.remove('reproduciendo');
      
      // Tras 400 milisegundos se desvanece suavemente para que vean el video completo
      setTimeout(() => {
        if (!video.paused) {
          overlay.classList.add('reproduciendo');
        }
      }, 400);
    }

    // --- COMPORTAMIENTO EN COMPUTADORA ---
    video.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        video.volume = 1;
        video.play();
        overlay.classList.add('reproduciendo');
      }
    });

    video.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        video.pause();
        ponerPlay();
      }
    });

    control.addEventListener('click', () => {
      if (video.paused) {
        video.volume = 1;
        video.play().catch(() => {});
        ponerPausaConEfecto();
      } else {
        video.pause();
        ponerPlay();
      }
    });
  });