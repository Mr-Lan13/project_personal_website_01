import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const h = React.createElement;

const GridMotion = ({ items = [], gradientColor = '#050607' }) => {
  const rowRefs = useRef([]);
  const mouseXRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth / 2);
  const introStartedAtRef = useRef(0);
  const totalItems = 28;
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);

  useEffect(() => {
    introStartedAtRef.current = performance.now();

    const handleMouseMove = (event) => {
      mouseXRef.current = event.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 185;
      const baseDuration = 0.72;
      const inertiaFactors = [0.42, 0.34, 0.28, 0.22];
      const viewportWidth = Math.max(window.innerWidth, 1);
      const introDuration = 1500;
      const introElapsed = performance.now() - introStartedAtRef.current;
      const introProgress = Math.min(Math.max(introElapsed / introDuration, 0), 1);
      const introDrift = Math.sin(introProgress * Math.PI) * 132;
      const isIntroActive = introProgress < 1;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const mouseMoveAmount = ((mouseXRef.current / viewportWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
        const introMoveAmount = introDrift * direction * (index % 2 === 0 ? 1 : 0.82);
        const moveAmount = isIntroActive ? introMoveAmount : mouseMoveAmount;
        gsap.to(row, {
          x: moveAmount,
          duration: isIntroActive ? 0.36 : baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: isIntroActive ? 'power2.inOut' : 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateMotion);
    };
  }, []);

  return h(
    'div',
    { className: 'noscroll grid-motion-root' },
    h(
      'section',
      { className: 'intro', style: { '--grid-fill': gradientColor } },
      h(
        'div',
        { className: 'gridMotion-container' },
        [0, 1, 2, 3].map((rowIndex) =>
          h(
            'div',
            { className: 'row', key: rowIndex, ref: (element) => { rowRefs.current[rowIndex] = element; } },
            Array.from({ length: 7 }, (_, itemIndex) => {
              const isSolidBlock = rowIndex === 0 || rowIndex === 3 || itemIndex === 0 || itemIndex === 6;
              const itemClassName = `row__item${isSolidBlock ? ' row__item--solid' : ''}`;

              return h(
                'div',
                { className: itemClassName, key: `${rowIndex}-${itemIndex}`, 'aria-hidden': isSolidBlock || undefined },
                h('div', { className: 'row__item-inner' }, isSolidBlock ? null : combinedItems[rowIndex * 7 + itemIndex]),
              );
            }),
          ),
        ),
      ),
    ),
  );
};

export default GridMotion;
