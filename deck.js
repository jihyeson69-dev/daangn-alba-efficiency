(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.getElementById('dots');
  const current = document.getElementById('current');
  const total = document.getElementById('total');
  const progress = document.getElementById('progress');
  let index = 0;
  total.textContent = String(slides.length).padStart(2, '0');

  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot-button';
    dot.type = 'button';
    dot.setAttribute('aria-label', `${i + 1}번 슬라이드로 이동`);
    dot.addEventListener('click', () => go(i));
    dots.append(dot);
  });

  const dotButtons = [...dots.querySelectorAll('button')];

  function go(nextIndex) {
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dotButtons.forEach((dot, i) => {
      dot.classList.toggle('selected', i === index);
      dot.setAttribute('aria-current', i === index ? 'step' : 'false');
    });
    current.textContent = String(index + 1).padStart(2, '0');
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    document.title = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · ${slides[index].getAttribute('aria-label')} | 당근알바 데이터 스토리`;
  }

  document.getElementById('prev').addEventListener('click', () => go(index - 1));
  document.getElementById('next').addEventListener('click', () => go(index + 1));
  document.addEventListener('keydown', (event) => {
    if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      go(index + 1);
    } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      go(index - 1);
    } else if (event.key.toLowerCase() === 'f') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    } else if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(slides.length - 1);
  });


  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (event) => {
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
  }, { passive: true });

  go(0);
})();
