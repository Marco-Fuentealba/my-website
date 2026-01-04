document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const NAV_OFFSET = 80; // altura aproximada de la navbar

  // ===== Scroll suave manual con offset para la navbar fija =====
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');

      // Solo manejar enlaces que vayan a secciones (#hero, #services, etc.)
      if (targetId && targetId.startsWith('#')) {
        event.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const targetPosition = targetSection.offsetTop - NAV_OFFSET;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== Función para activar el link según la sección visible =====
  const setActiveLinkOnScroll = () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // Punto de referencia aprox: 120px desde arriba
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentSectionId = section.id;
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  // Marcar activo al cargar y al hacer scroll
  setActiveLinkOnScroll();
  window.addEventListener('scroll', setActiveLinkOnScroll);

  // =================================================================
  // ==========   ENVÍO DEL FORMULARIO DE CONTACTO   ==================
  // =================================================================

  const contactForm = document.getElementById('contact-form');
  const statusText = document.getElementById('form-status-text');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        tipoProyecto: formData.get('tipoProyecto'),
        mensaje: formData.get('mensaje')
      };

      // Feedback al usuario
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      statusText.textContent = 'Enviando tu mensaje...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.ok) {
          statusText.textContent = '✅ Mensaje enviado correctamente. Te responderé pronto.';
          contactForm.reset();
        } else {
          statusText.textContent = '⚠️ Hubo un problema al enviar el mensaje. Intenta nuevamente.';
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        statusText.textContent = '⚠️ Error de conexión. Revisa tu internet o intenta más tarde.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
      }
    });
  }
});
