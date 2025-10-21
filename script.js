const hamburger = document.getElementById("hamburger");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

// Abrir menú
hamburger.addEventListener("click", () => {
  menuOverlay.classList.add("open");
});

// Cerrar menú
menuClose.addEventListener("click", () => {
  menuOverlay.classList.remove("open");
});

// Cerrar al hacer click fuera del menú
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove("open");
  }
});

// Animación suave al cambiar de página
const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith('#')) {
      e.preventDefault();
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  });
});

// ---------- THEME TOGGLE (integrado, persistente) ----------

// 1) Aplicar tema guardado inmediatamente (evita flash visual si script se ejecuta pronto)
(function() {
  try {
    const saved = localStorage.getItem('theme'); // 'light' o 'dark'
    if (saved === 'light') document.body.classList.add('light');
    else document.body.classList.remove('light');
  } catch (err) {
    console.warn('No se pudo leer theme en localStorage', err);
  }
})();

// 2) Crear / inicializar botón y comportamiento (flotante)
(function() {
  // Si ya existe un botón con id theme-toggle, lo usamos
  let btn = document.getElementById('theme-toggle');

  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    btn.className = 'btn-theme';
    btn.setAttribute('aria-label', 'Cambiar tema');
    btn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';

    // Insertarlo en body (flotante) para no afectar layout
    document.body.appendChild(btn);
  }

  // Asegurar estado visual correcto al cargar
  function updateButtonUI() {
    const isLight = document.body.classList.contains('light');
    btn.textContent = isLight ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }
  updateButtonUI();

  // Handler click: alterna clase y guarda en localStorage
  btn.addEventListener('click', () => {
    const isNowLight = document.body.classList.toggle('light');
    try {
      localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
    } catch (err) {
      console.warn('No se pudo guardar theme en localStorage', err);
    }
    updateButtonUI();
  });

})();
