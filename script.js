// Basic interactivity: mobile nav, lazy-loading images, simple reveal on scroll
document.addEventListener('DOMContentLoaded', function () {
  // Header nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Reveal elements on scroll & lazy-load images with IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const lazyImages = document.querySelectorAll('img.lazy');

  const observerOptions = { root: null, rootMargin: '0px 0px 120px 0px', threshold: 0.05 };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // reveal
        if (entry.target.classList.contains('reveal')) {
          entry.target.classList.add('visible');
        }
        // lazy image
        if (entry.target.tagName === 'IMG' && entry.target.dataset && entry.target.dataset.src) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => io.observe(el));
  lazyImages.forEach(img => io.observe(img));

  // Contact form: demo behavior (no backend)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      alert('Message sent (demo). The form is a front-end demo — connect to a backend to receive messages.');
      btn.textContent = original;
      btn.disabled = false;
      contactForm.reset();
    }, 900);
  });

  // Accessibility: enable keyboard focus for nav links
  document.querySelectorAll('a').forEach(a => {
    a.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') a.click();
    });
  });
});