// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav');

  mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('show');
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('show');
    });
  });

  // Smooth scrolling para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Cambio de pestañas en el menú
  if (document.querySelector('.menu-tabs')) {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuSections = document.querySelectorAll('.menu-section');

    menuTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remover clase active de todas las pestañas y secciones
        menuTabs.forEach(t => t.classList.remove('active'));
        menuSections.forEach(s => s.classList.remove('active'));

        // Agregar clase active a la pestaña clickeada
        this.classList.add('active');

        // Mostrar la sección correspondiente
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  // Filtro de galería
  if (document.querySelector('.gallery-filter')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Agregar clase active al botón clickeado
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox para galería
  if (document.querySelector('.gallery-item')) {
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        const imgTitle = this.querySelector('.gallery-overlay h3').textContent;
        const imgDesc = this.querySelector('.gallery-overlay p').textContent;

        lightboxImg.setAttribute('src', imgSrc);
        lightboxCaption.querySelector('h3').textContent = imgTitle;
        lightboxCaption.querySelector('p').textContent = imgDesc;

        lightboxModal.style.display = 'flex';
      });
    });

    closeLightbox.addEventListener('click', function() {
      lightboxModal.style.display = 'none';
    });

    lightboxModal.addEventListener('click', function(e) {
      if (e.target === this) {
        lightboxModal.style.display = 'none';
      }
    });
  }

  // Formulario de reservación
  if (document.getElementById('reservationForm')) {
    const reservationForm = document.getElementById('reservationForm');

    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validación básica
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;

      if (!name || !email || !phone || !date || !time || !guests) {
        alert('Por favor complete todos los campos obligatorios.');
        return;
      }

      // Simular envío del formulario
      alert('¡Reserva enviada con éxito! Nos pondremos en contacto para confirmar.');
      reservationForm.reset();
    });
  }

  // Animación al hacer scroll
  window.addEventListener('scroll',
    function() {
      const scrollPosition = window.scrollY;

      // Header más pequeño al hacer scroll
      if (scrollPosition > 100) {
        document.querySelector('header').style.padding = '10px 0';
        document.querySelector('.logo').style.fontSize = '1.5rem';
      } else {
        document.querySelector('header').style.padding = '20px 0';
        document.querySelector('.logo').style.fontSize = '1.8rem';
      }

      // Animación de elementos al aparecer
      const animatedElements = document.querySelectorAll('.dish-card, .philosophy-card, .testimonial-card, .gallery-item');

      animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    });

  // Inicializar animaciones
  const animatedElements = document.querySelectorAll('.dish-card, .philosophy-card, .testimonial-card, .gallery-item');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Forzar evento scroll al cargar la página para animaciones iniciales
  window.dispatchEvent(new Event('scroll'));
});
