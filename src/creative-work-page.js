import React from 'react';
import ReactDOM from 'react-dom';
import labWorks, { getLabWorkById } from './creative-lab-data.js';
import './creative-work-page.css';

const h = React.createElement;

function getCurrentWork() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return getLabWorkById(id) || labWorks[0];
}

function CreativeWorkPage() {
  const work = getCurrentWork();
  const hasImage = Boolean(work.image);

  return h(
    'main',
    { className: `creative-work-page${hasImage ? '' : ' creative-work-page--waiting'}` },
    h('a', { className: 'creative-work-back', href: './creative-lab.html', 'aria-label': '返回创意实验室' }, '←'),
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
        hasImage
          ? h('img', { src: work.image, alt: `${work.title} 作品展示图` })
          : h(
              'div',
              { className: 'creative-work-waiting', role: 'status', 'aria-live': 'polite' },
              h('b', null, '等待中'),
              h('span', null, '这张作品图还没有放入，补图后会自动作为展示页打开。'),
            ),
      ),
    ),
  );
}

ReactDOM.render(h(CreativeWorkPage), document.getElementById('creative-work-root'));
