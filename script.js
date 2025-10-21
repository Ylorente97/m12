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
