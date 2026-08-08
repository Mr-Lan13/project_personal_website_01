import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import labWorks, { getLabWorkById, getWorkImages } from './creative-lab-data.js';
import './creative-work-page.css';

const h = React.createElement;

function getCurrentWork() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return getLabWorkById(id) || labWorks[0];
}

function clampIndex(index, length) {
  if (length <= 0) return 0;
  return (index + length) % length;
}

function CreativeWorkPage() {
  const work = getCurrentWork();
  const isWaiting = work.id.startsWith('waiting-');
  const slides = useMemo(() => (isWaiting ? [] : getWorkImages(work)), [work, isWaiting]);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [work.id]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((current) => clampIndex(current - 1, slides.length));
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((current) => clampIndex(current + 1, slides.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const goToSlide = (index) => {
    setActiveIndex(clampIndex(index, slides.length));
  };

  const goPrev = () => {
    if (slides.length <= 1) return;
    setActiveIndex((current) => clampIndex(current - 1, slides.length));
  };

  const goNext = () => {
    if (slides.length <= 1) return;
    setActiveIndex((current) => clampIndex(current + 1, slides.length));
  };

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    if (!start || slides.length <= 1) return;

    const touch = event.changedTouches?.[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartRef.current = null;
  };

  const currentSlide = slides[activeIndex] || work.image || '';
  const canSlide = slides.length > 1;

  return h(
    'main',
    { className: `creative-work-page${isWaiting ? ' creative-work-page--waiting' : ''}` },
    h('a', { className: 'creative-work-back', href: './creative-lab.html', 'aria-label': '返回创意实验室' }, h('img', { src: './assets/icon-back.png', alt: '返回', className: 'creative-work-back-icon' })),
    h(
      'section',
      { className: 'creative-work-shell' },
      h(
        'aside',
        { className: 'creative-work-meta' },
        h('p', null, 'Creative Work'),
        h('h1', null, work.title),
        h('span', null, work.type),
        h('small', null, work.desc),
      ),
      h(
        'div',
        { className: 'creative-work-stage' },
        isWaiting
          ? h(
            'div',
            { className: 'creative-work-waiting', role: 'status', 'aria-live': 'polite' },
            h('b', null, '等待中'),
            h('span', null, '这张作品图还没有放入，补图后会自动作为展示页打开。'),
          )
          : h(
            'div',
            { className: 'creative-work-carousel' },
            h(
              'div',
              {
                className: 'creative-work-frame',
                onTouchStart: handleTouchStart,
                onTouchEnd: handleTouchEnd,
                onTouchCancel: () => {
                  touchStartRef.current = null;
                },
                style: { touchAction: 'pan-y' },
              },
              h(
                'button',
                {
                  type: 'button',
                  className: 'creative-work-frame-nav creative-work-frame-nav--prev',
                  onClick: goPrev,
                  disabled: !canSlide,
                  'aria-label': '上一张图片',
                },
                h('img', { src: './assets/icon-nav.png', alt: '上一张', className: 'creative-work-frame-nav-icon' }),
              ),
              h('img', {
                className: 'creative-work-image',
                src: currentSlide,
                alt: `${work.title} 第 ${activeIndex + 1} 张作品图`,
                loading: 'lazy',
                decoding: 'async',
              }),
              h(
                'button',
                {
                  type: 'button',
                  className: 'creative-work-frame-nav creative-work-frame-nav--next',
                  onClick: goNext,
                  disabled: !canSlide,
                  'aria-label': '下一张图片',
                },
                h('img', { src: './assets/icon-nav.png', alt: '下一张', className: 'creative-work-frame-nav-icon creative-work-frame-nav-icon--flip' }),
              ),
            ),
            canSlide
              ? h(
                  'div',
                  { className: 'creative-work-progress', role: 'progressbar', 'aria-label': `图片进度 ${activeIndex + 1} / ${slides.length}`, 'aria-valuemin': 0, 'aria-valuemax': slides.length - 1, 'aria-valuenow': activeIndex },
                  slides.map((slide, index) =>
                    h('button', {
                      type: 'button',
                      key: slide + index,
                      className: `creative-work-progress-dot${index === activeIndex ? ' is-active' : ''}`,
                      onClick: () => goToSlide(index),
                      'aria-label': `切换到第 ${index + 1} 张图片`,
                    }),
                  ),
                )
              : null,
          ),
      ),
    ),
  );
}

ReactDOM.render(h(CreativeWorkPage), document.getElementById('creative-work-root'));
