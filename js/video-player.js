const videos = document.querySelectorAll('.video-portafolio');

  videos.forEach(video => {
    // 1. INYECCIÓN AUTOMÁTICA DEL OVERLAY DE ICONOS
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.innerHTML = `
      <div class="icono-circulo">
        <svg viewBox="0 0 24 24">
          <path class="ruta-icono" d="M8 5v14l11-7z"/> </svg>
      </div>
    `;
    video.parentElement.appendChild(overlay);

    const pathIcono = overlay.querySelector('.ruta-icono');
    const dPlay = "M8 5v14l11-7z";
    const dPause = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

    // Funciones para cambiar los iconos dinámicamente
    function ponerPlay() {
      pathIcono.setAttribute('d', dPlay);
      overlay.classList.remove('reproduciendo');
    }

    function ponerPausaConEfecto() {
      pathIcono.setAttribute('d', dPause);
      overlay.classList.remove('reproduciendo'); // Se hace visible un instante
      
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

    // --- COMPORTAMIENTO EN CELULAR (Un toque alterna, da feedback visual) ---
    video.addEventListener('touchstart', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Evita clics fantasmas
        
        if (video.paused) {
          video.play();
          ponerPausaConEfecto();
        } else {
          video.pause();
          ponerPlay();
        }
      }
    });
  });