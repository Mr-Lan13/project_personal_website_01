import React from 'react';
import ReactDOM from 'react-dom';
import GridMotion from './GridMotion.js';
import { labSlotMap } from './creative-lab-data.js';
import './creative-lab-page.css';

const h = React.createElement;

function createWorkCard(work) {
  const hasImage = Boolean(work.image);

  return h(
    'a',
    {
      className: `grid-project-link${hasImage ? '' : ' grid-project-link--pending'}`,
      href: `./creative-work.html?id=${encodeURIComponent(work.id)}`,
      title: hasImage ? work.desc : '作品图等待放入',
      'aria-label': hasImage ? `查看作品 ${work.title}` : `${work.title}，等待中`,
    },
    hasImage
      ? h('img', { src: work.image, alt: `${work.title} 创意实验项目封面` })
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
    h('a', { className: 'creative-lab-back', href: './index.html', 'aria-label': '返回首页' }, '←'),
    h(
      'section',
      { className: 'creative-lab-heading' },
      h('p', null, 'Creative Lab'),
      h('h1', null, '创意实验室'),
      h('span', null, '点击任意作品框进入独立展示页，未放入图片的作品会先显示等待中。'),
    ),
  );
}

ReactDOM.render(h(CreativeLabPage), document.getElementById('creative-lab-root'));
