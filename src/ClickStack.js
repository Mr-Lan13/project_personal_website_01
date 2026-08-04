import React from 'react';

const h = React.createElement;

export default function ClickStack({ items, renderIcon }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = items.length;

  const moveTo = (index) => {
    setActiveIndex(index);
  };

  const handleCardClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex((current) => (current + 1) % total);
      return;
    }

    moveTo(index);
  };

  return h(
    'div',
    { className: 'click-stack-shell' },
    h(
      'div',
      { className: 'click-stack-stage', 'aria-label': '个人优势点击卡片堆' },
      items.map((item, index) => {
        const stackStep = (index - activeIndex + total) % total;
        const isActive = stackStep === 0;

        return h(
          'button',
          {
            type: 'button',
            key: item.title,
            className: `click-stack-card${isActive ? ' is-active' : ''}`,
            style: {
              '--stack-step': stackStep,
              '--stack-z': total - stackStep,
            },
            onClick: () => handleCardClick(index),
            'aria-pressed': isActive,
            'aria-label': `查看第 ${index + 1} 项优势：${item.title}`,
          },
          h('span', { className: 'click-stack-card-number' }, String(index + 1).padStart(2, '0')),
          h('span', { className: 'click-stack-card-icon' }, renderIcon(item.icon, 28)),
          h('span', { className: 'click-stack-card-title' }, item.title),
          h('span', { className: 'click-stack-card-body' }, item.body),
        );
      }),
    ),
    h(
      'div',
      { className: 'click-stack-dial', 'aria-label': '切换优势模块' },
      items.map((item, index) =>
        h(
          'button',
          {
            type: 'button',
            key: item.title,
            className: index === activeIndex ? 'is-active' : '',
            onClick: () => moveTo(index),
            'aria-label': `切换到 ${item.title}`,
          },
          h('span', null, String(index + 1).padStart(2, '0')),
          h('i', null),
        ),
      ),
    ),
  );
}
