import React from 'react';
import ReactDOM from 'react-dom';
import GridMotion from './GridMotion.js';
import projects from './project-data.js';
import './creative-lab-page.css';

const h = React.createElement;

function CreativeLabPage() {
  const gridItems = Array.from({ length: 28 }, (_, index) => {
    const project = projects[index % projects.length];
    return h(
      'a',
      {
        className: 'grid-project-link',
        href: project.href,
        title: project.desc,
        'aria-label': `查看并咨询 ${project.title}`,
      },
      h('img', { src: project.image, alt: `${project.title} 创意实验项目封面` }),
      h('span', { className: 'grid-project-label' }, h('strong', null, project.title), h('span', null, project.type)),
    );
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
      h('span', null, '不要让创意死于清晨，不要让技术隐于表达'),
    ),
  );
}

ReactDOM.render(h(CreativeLabPage), document.getElementById('creative-lab-root'));
