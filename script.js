/* ============================================================
   Juwenalia Tarnów 2026 — script.js
   ============================================================ */

// ============ CUSTOM CURSOR ============
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .play-ring, .mosaic-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
})();


// ============ PARTICLES ============
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#f5e60b', '#ff1f6d', '#00ffe0', '#7c2fdb', '#ffffff'];

  for (let i = 0; i < 55; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 6 + 2;

    p.style.cssText = `
      width:              ${size}px;
      height:             ${size}px;
      left:               ${Math.random() * 100}%;
      background:         ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay:    ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
})();


// ============ COUNTDOWN ============
(function initCountdown() {
  const TARGET_DATE = new Date('2026-05-15T17:00:00');

  const els = {
    days:    document.getElementById('cd-days'),
    hours:   document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  // Bail if elements are missing (e.g. page loaded without countdown section)
  if (!els.days) return;

  const prev = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n, len) {
    return String(n).padStart(len, '0');
  }

  function flashFlip(el) {
    el.classList.remove('flip');
    void el.offsetWidth; // force reflow so animation restarts
    el.classList.add('flip');
  }

  function tick() {
    const now  = new Date();
    const diff = Math.max(0, TARGET_DATE - now);

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    if (days    !== prev.days)    { els.days.textContent    = pad(days, 3);    flashFlip(els.days);    prev.days    = days;    }
    if (hours   !== prev.hours)   { els.hours.textContent   = pad(hours, 2);   flashFlip(els.hours);   prev.hours   = hours;   }
    if (minutes !== prev.minutes) { els.minutes.textContent = pad(minutes, 2); flashFlip(els.minutes); prev.minutes = minutes; }
    if (seconds !== prev.seconds) { els.seconds.textContent = pad(seconds, 2); flashFlip(els.seconds); prev.seconds = seconds; }
  }

  tick();
  setInterval(tick, 1000);
})();


// ============ SCROLL REVEAL — PROGRAMME ROWS ============
(function initScrollReveal() {
  const rows = document.querySelectorAll('.event-row');
  if (!rows.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  rows.forEach(row => io.observe(row));
})();


// ============ PARALLAX HERO ============
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const grid   = document.querySelector('.grid-overlay');
  if (!heroBg && !grid) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroBg) heroBg.style.transform = `translateY(${y * 0.3}px)`;
    if (grid)   grid.style.transform   = `translateY(${y * 0.15}px)`;
  }, { passive: true });
})();


// ============ NAV — SCROLL STYLE ============
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background      = 'rgba(13,6,24,0.97)';
      nav.style.backdropFilter  = 'blur(20px)';
    } else {
      nav.style.background      = '';
      nav.style.backdropFilter  = 'blur(8px)';
    }
  }, { passive: true });
})();


// ============ MARQUEE — PAUSE ON HOVER ============
(function initMarquee() {
  const wrap   = document.querySelector('.marquee-wrap');
  const inner  = document.querySelector('.marquee-inner');
  if (!wrap || !inner) return;

  wrap.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
  wrap.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
})();


// ============ VIDEO PLACEHOLDER DISMISS ============
(function initVideoPlaceholder() {
  const placeholder = document.getElementById('video-placeholder');
  const ring        = placeholder ? placeholder.querySelector('.play-ring') : null;
  if (!ring) return;

  ring.addEventListener('click', () => {
    placeholder.style.display = 'none';
  });
})();