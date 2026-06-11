
/* ── CARD INTERACTIONS ──────────────────────────── */
  const cards   = document.querySelectorAll('.card-wrap');
  const timers  = new Map();

  cards.forEach(card => {
    card.addEventListener('click', e => {
      const id = card.dataset.src;

      /* ripple */
      const el   = card.querySelector('.ripple-el');
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const span = document.createElement('span');
      span.style.left = x + 'px';
      span.style.top  = y + 'px';
      el.appendChild(span);
      span.addEventListener('animationend', () => span.remove());

      /* double-click → lightbox */
      if (timers.has(id)) {
        clearTimeout(timers.get(id));
        timers.delete(id);
        openLb(card.dataset.src, card.dataset.name);
        return;
      }

      /* single-click → flip */
      timers.set(id, setTimeout(() => {
        timers.delete(id);
        card.classList.toggle('flipped');
      }, 240));
    });
  });

  /* ── LIGHTBOX ───────────────────────────────────── */
  function openLb(src, cap) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lb-cap').textContent = cap;
    document.getElementById('lb').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lb').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLb();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });