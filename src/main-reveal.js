const revealGroups = [
  { selector: '.video-backdrop', effect: 'reveal-scale', baseDelay: 0 },
  { selector: '.nav', effect: 'reveal-from-top', baseDelay: 80 },
  {
    selector: '.hero .eyebrow, .hero-title-solid, .hero-title-outline, .hero-copy, .hero-actions > a, .scroll-note',
    effect: 'reveal-up',
    baseDelay: 140,
    step: 75,
  },
  {
    selector: '.experience .section-kicker, .experience h2, .profile-summary > p, .contact-row > a, .portrait-frame, .metric',
    effect: 'reveal-up',
    step: 55,
  },
  {
    selector: '.strengths .section-kicker, .strengths h2, .strength-card',
    effect: 'reveal-up',
    step: 70,
  },
  {
    selector: '.contact-inner > .section-kicker, .contact-inner > h2, .contact-inner > p, .contact-actions > a',
    effect: 'reveal-up',
    step: 80,
  },
  { selector: '.floating-contact', effect: 'reveal-from-right', baseDelay: 500 },
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

function setupHeroDesignArrow() {
  const hero = document.querySelector('.hero');
  const designTitle = document.querySelector('.hero-title-outline');
  if (!hero || !designTitle) {
    window.requestAnimationFrame(setupHeroDesignArrow);
    return;
  }

  let animationFrame = 0;
  let hasScrollIntent = window.scrollY > 2;
  let arrowRevealProgress = hasScrollIntent ? 1 : 0;
  let arrowRevealFrame = 0;

  const updateArrow = () => {
    animationFrame = 0;
    const heroHeight = Math.max(hero.offsetHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.86), 0), 1);
    const visualProgress = hasScrollIntent ? Math.max(progress, arrowRevealProgress) : progress;
    const opacity = hasScrollIntent ? Math.max(Math.min(progress * 5, 1), 0.95) : 0;

    designTitle.style.setProperty('--hero-arrow-progress', visualProgress.toFixed(3));
    designTitle.style.setProperty('--hero-arrow-y', `${2 + visualProgress * 96}%`);
    designTitle.style.setProperty('--hero-arrow-opacity', opacity.toFixed(3));
  };

  const scheduleArrowUpdate = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(updateArrow);
  };

  const activateArrow = () => {
    if (hasScrollIntent && arrowRevealProgress >= 1) {
      return;
    }

    hasScrollIntent = true;
    if (arrowRevealFrame) {
      window.cancelAnimationFrame(arrowRevealFrame);
    }

    const startTime = performance.now();
    const duration = 300;
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);

    const animateArrowReveal = (time) => {
      const elapsed = Math.min((time - startTime) / duration, 1);
      arrowRevealProgress = easeOut(elapsed);
      scheduleArrowUpdate();

      if (elapsed < 1) {
        arrowRevealFrame = window.requestAnimationFrame(animateArrowReveal);
      } else {
        arrowRevealProgress = 1;
        arrowRevealFrame = 0;
        scheduleArrowUpdate();
      }
    };

    arrowRevealFrame = window.requestAnimationFrame(animateArrowReveal);
  };

  updateArrow();
  window.addEventListener('wheel', activateArrow, { passive: true });
  window.addEventListener('scroll', scheduleArrowUpdate, { passive: true });
  window.addEventListener('resize', scheduleArrowUpdate);
}

startRevealAnimations();
setupHeroDesignArrow();
