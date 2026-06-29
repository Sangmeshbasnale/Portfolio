  // Smooth scroll
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('mobile-menu').classList.remove('open');
    });
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuIcon.innerHTML = mobileMenu.classList.contains('open')
      ? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
      : '<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>';
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Count-up stats
  const countEls = document.querySelectorAll('[data-countup]');
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.countup);
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 900;
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const val = progress * target;
          el.textContent = isDecimal ? val.toFixed(2) : Math.floor(val);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = isDecimal ? target.toFixed(2) : target;
        }
        requestAnimationFrame(step);
        countIo.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  countEls.forEach(el => countIo.observe(el));

  // Nav scroll state + active link
  const nav = document.getElementById('nav');
  const sections = ['home','about','education','projects','skills','certifications','contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  const backTop = document.getElementById('back-top');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 16);
    backTop.classList.toggle('show', window.scrollY > 700);

    let current = 'home';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) current = id;
    }
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.scroll === current));
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  backTop.addEventListener('click', () => document.getElementById('home').scrollIntoView({ behavior: 'smooth' }));
