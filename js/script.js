document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav ul li a");
  const header = document.querySelector("header");
  const navToggle = document.querySelector(".nav-toggle");

  // Rolagem suave considerando header fixo
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const top =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          12;
        window.scrollTo({ top, behavior: "smooth" });
      }
      // fecha menu mobile se estiver aberto
      if (header.classList.contains("open")) header.classList.remove("open");
    });
  });

  // Toggle de navegação para mobile
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      header.classList.toggle("open");
    });
  }

  // Submissão do formulário: pequeno feedback
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      // deixamos a submissão seguir (ex: Formspree) mas desabilitamos botão para evitar múltiplos envios
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Enviando...";
      }
    });
  }

  // --- Novas Funcionalidades ---

  // 1. Ano Dinâmico no Rodapé
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Animação de Scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.15, // Dispara quando 15% do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Para de observar após animar
      }
    });
  }, observerOptions);

  // Seleciona elementos para animar: Cards, Títulos e Imagens
  const elementsToAnimate = document.querySelectorAll(
    ".card, h2, #sobre img, #sobre p",
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in-element");
    observer.observe(el);
  });
});
