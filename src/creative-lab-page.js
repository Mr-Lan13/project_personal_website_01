import React from 'react';
import ReactDOM from 'react-dom';
import GridMotion from './GridMotion.js';
import { labSlotMap } from './creative-lab-data.js';
import './creative-lab-page.css';

const h = React.createElement;

function createWorkCard(work) {
  const isWaiting = work.id.startsWith('waiting-');
  const hasDetailImage = Boolean(work.image) && !isWaiting;
  const thumbnail = work.thumbnail || work.image;
  const hasThumbnail = Boolean(thumbnail);

  return h(
    'a',
    {
      className: `grid-project-link${hasDetailImage ? '' : ' grid-project-link--pending'}`,
      href: `./creative-work.html?id=${encodeURIComponent(work.id)}`,
      title: hasDetailImage ? work.desc : '点进展示页后显示等待中',
      'aria-label': hasDetailImage ? `查看作品 ${work.title}` : `${work.title}，点进后等待中`,
    },
    hasThumbnail
      ? h('img', { src: thumbnail, alt: `${work.title} 创意实验项目封面` })
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
