document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Smooth scroll for nav links ---------- */
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = document.querySelector('.main-header').offsetHeight + 20;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Current year in footer ---------- */
  document.getElementById('current-year').textContent = new Date().getFullYear();

  /* ---------- Reveal-on-scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach(el => observer.observe(el));

  /* ---------- Scroll-to-top button ---------- */
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact form (demo) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
    });
  }
});