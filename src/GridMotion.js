import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const h = React.createElement;

const GridMotion = ({ items = [], gradientColor = '#050607' }) => {
  const rowRefs = useRef([]);
  const mouseXRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth / 2);
  const totalItems = 28;
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseXRef.current = event.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 150;
      const baseDuration = 1.25;
      const inertiaFactors = [0.9, 0.75, 0.65, 0.55];
      const viewportWidth = Math.max(window.innerWidth, 1);

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount = ((mouseXRef.current / viewportWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
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
            Array.from({ length: 7 }, (_, itemIndex) =>
              h(
                'div',
                { className: 'row__item', key: `${rowIndex}-${itemIndex}` },
                h('div', { className: 'row__item-inner' }, combinedItems[rowIndex * 7 + itemIndex]),
              ),
            ),
          ),
        ),
      ),
    ),
  );
};

export default GridMotion;
