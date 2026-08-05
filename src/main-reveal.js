const revealGroups = [
  { selector: '.video-backdrop', effect: 'reveal-hero-video', baseDelay: 0 },
  { selector: '.nav', effect: 'reveal-from-top', baseDelay: 80 },
  {
    selector: '.hero .eyebrow, .hero-title-solid, .hero-title-outline, .hero-copy, .hero-actions > a',
    effect: 'reveal-hero-mosaic',
    baseDelay: 160,
    step: 110,
  },
  {
    selector: '.experience .section-kicker, .experience h2, .portrait-frame, .palette-card',
    effect: 'reveal-up',
    step: 55,
  },
  {
    selector: '.strengths .section-kicker, .strengths h2, .strength-lede, .click-stack-shell',
    effect: 'reveal-up',
    step: 70,
  },
  {
    selector: '.contact-inner > .section-kicker, .contact-inner > h2, .contact-inner > p, .contact-actions > a',
    effect: 'reveal-up',
    step: 80,
  },
];

function setupRevealAnimations() {
  const elements = new Set();

  revealGroups.forEach(({ selector, effect, baseDelay = 0, step = 0 }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (elements.has(element)) return;

      element.classList.add('reveal-item', effect);
      element.style.setProperty('--reveal-delay', `${Math.min(baseDelay + index * step, 520)}ms`);
      elements.add(element);
    });
  });

  const reveal = (element) => {
    element.classList.add('is-visible');
    element.addEventListener(
      'animationend',
      () => element.classList.add('reveal-complete'),
      { once: true },
    );
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible', 'reveal-complete'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px',
    },
  );

  elements.forEach((element) => observer.observe(element));
}

function startRevealAnimations() {
  if (!document.querySelector('.hero')) {
    window.requestAnimationFrame(startRevealAnimations);
    return;
  }

  setupRevealAnimations();
}

function setupHeroDesignFill() {
  const hero = document.querySelector('.hero');
  const designTitle = document.querySelector('.hero-title-outline');
  if (!hero || !designTitle) {
    window.requestAnimationFrame(setupHeroDesignFill);
    return;
  }

  let animationFrame = 0;

  const updateFill = () => {
    animationFrame = 0;
    const heroHeight = Math.max(hero.offsetHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.86), 0), 1);
    const easedProgress = 1 - Math.pow(1 - progress, 2.4);

    designTitle.style.setProperty('--hero-design-fill', (easedProgress * 0.92).toFixed(3));
  };

  const scheduleFillUpdate = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(updateFill);
  };

  updateFill();
  window.addEventListener('scroll', scheduleFillUpdate, { passive: true });
  window.addEventListener('resize', scheduleFillUpdate);
}

startRevealAnimations();
setupHeroDesignFill();
