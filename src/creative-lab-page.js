import React from 'react';
import ReactDOM from 'react-dom';
import GridMotion from './GridMotion.js';
import { labSlotMap } from './creative-lab-data.js';
import './creative-lab-page.css';

const h = React.createElement;

function createWorkCard(work) {
  const isWaiting = work.id.startsWith('waiting-');
  const cover = work.image || (Array.isArray(work.images) ? work.images[0] : '');

  return h(
    'a',
    {
      className: `grid-project-link${isWaiting ? ' grid-project-link--pending' : ''}`,
      href: `./creative-work.html?id=${encodeURIComponent(work.id)}`,
      title: isWaiting ? '点击后显示等待中' : work.desc,
      'aria-label': isWaiting ? `${work.title}，点击后显示等待中` : `查看作品 ${work.title}`,
    },
    cover
      ? h('img', {
        src: cover,
        alt: `${work.title} 创意实验项目封面`,
        loading: 'lazy',
        decoding: 'async',
      })
      : h(
        'span',
        { className: 'grid-project-placeholder', 'aria-hidden': true },
        h('b', null, work.number),
        h('small', null, 'OPEN'),
      ),
    h(
      'span',
      { className: 'grid-project-label' },
      h('strong', null, work.title),
      h('span', null, work.type),
    ),
  );
}

function CreativeLabPage() {
  const gridItems = Array.from({ length: 28 }, (_, index) => {
    const work = labSlotMap[index];
    return work ? createWorkCard(work) : null;
  });

  return h(
    'main',
    { className: 'creative-lab-page' },
    h('div', { className: 'creative-lab-grid', 'aria-hidden': false }, h(GridMotion, { items: gridItems, gradientColor: '#45e0cc' })),
    h('a', { className: 'creative-lab-back', href: './index.html', 'aria-label': '返回首页' }, h('img', { src: './assets/icon-back.png', alt: '返回', className: 'creative-lab-back-icon' })),
    h(
      'section',
      { className: 'creative-lab-heading' },
      h('p', null, 'Creative Lab'),
      h('h1', null, '创意实验室'),
      h('span', null, '不要让想法死在清晨，不要让创意隐于表达。'),
    ),
  );
}

ReactDOM.render(h(CreativeLabPage), document.getElementById('creative-lab-root'));
