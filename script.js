/* ============================================================
   SOURADEEP DE — PORTFOLIO SCRIPTS
   Navbar scroll, mobile menu, scroll reveal, active nav, form
   ============================================================ */

(function () {
  'use strict';

  // ---- DOM References ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navHamburger = document.getElementById('navHamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const contactForm = document.getElementById('contactForm');

  // ---- Navbar: glass blur on scroll ----
  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initial check

  // ---- Mobile Menu ----
  function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('open');
    navHamburger.classList.toggle('open', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    navHamburger.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navHamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + sectionId) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Stagger reveal delays for grids ----
  function addStaggerDelays(gridSelector, cardSelector) {
    document.querySelectorAll(gridSelector).forEach(function (grid) {
      grid.querySelectorAll(cardSelector).forEach(function (card, i) {
        card.style.transitionDelay = (i * 0.1) + 's';
      });
    });
  }

  addStaggerDelays('.skills-grid', '.skill-card');
  addStaggerDelays('.education-grid', '.education-card');
  addStaggerDelays('.projects-grid', '.project-card');

  // ---- Contact Form: Validation + Submit ----
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    const formSuccess = document.getElementById('formSuccess');

    // Clear error on input
    function clearFieldError(input, errorEl) {
      input.addEventListener('input', function () {
        input.classList.remove('invalid');
        errorEl.classList.remove('active');
        errorEl.textContent = '';
      });
    }

    clearFieldError(nameInput, errorName);
    clearFieldError(emailInput, errorEmail);
    clearFieldError(messageInput, errorMessage);

    function showError(input, errorEl, msg) {
      input.classList.add('invalid');
      errorEl.textContent = msg;
      errorEl.classList.add('active');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      let isValid = true;

      // Validate Name
      if (!name) {
        showError(nameInput, errorName, 'Please enter your name.');
        isValid = false;
      }

      // Validate Email
      if (!email) {
        showError(emailInput, errorEmail, 'Please enter your email.');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError(emailInput, errorEmail, 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Message
      if (!message) {
        showError(messageInput, errorMessage, 'Please enter a message.');
        isValid = false;
      }

      if (!isValid) return;

      // Build mailto and open
      const subject = encodeURIComponent('Portfolio Inquiry from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
      );
      window.location.href = 'mailto:souradeepde2021@gmail.com?subject=' + subject + '&body=' + body;

      // Show success message
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');

      // Reset form and restore after 6 seconds
      setTimeout(function () {
        contactForm.reset();
        formSuccess.classList.remove('show');
        contactForm.style.display = '';
      }, 6000);
    });
  }

  // ---- Smooth scroll for anchor links (polyfill-safe) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
