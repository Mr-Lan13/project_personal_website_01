import React from 'react';
import ReactDOM from 'react-dom';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import GridMotion from './GridMotion.js';
import projects from './project-data.js';
import './projects-page.css';

const h = React.createElement;

function Icon(IconComponent, size = 18) {
  return h(IconComponent, { size, 'aria-hidden': true });
}

function ProjectsPage() {
  const gridItems = Array.from({ length: 28 }, (_, index) => {
    const project = projects[index % projects.length];
    return h(
      'a',
      {
        className: 'grid-project-link',
        href: project.href,
        title: project.desc,
        'aria-label': `联系我咨询 ${project.title}`,
      },
      h('img', { src: project.image, alt: `${project.title} 项目封面` }),
      h('span', { className: 'grid-project-label' }, h('strong', null, project.title), h('span', null, project.type)),
    );
  });

  return h(
    'main',
    { className: 'projects-page' },
    h('div', { className: 'projects-page-grid', 'aria-hidden': false }, h(GridMotion, { items: gridItems, gradientColor: '#061315' })),
    h('div', { className: 'projects-page-shade', 'aria-hidden': true }),
    h(
      'header',
      { className: 'projects-page-nav' },
      h('a', { className: 'projects-back', href: './index.html' }, Icon(ArrowLeft), h('span', null, 'LAN'), h('small', null, '返回首页')),
      h('span', { className: 'projects-page-count' }, '03 PROJECTS / 28 VIEWS'),
      h('a', { className: 'projects-contact', href: 'mailto:lan.design@email.com' }, Icon(Mail), '联系我'),
    ),
    h(
      'section',
      { className: 'projects-page-heading' },
      h('p', null, 'Selected Work'),
      h('h1', null, '精选项目'),
      h('span', null, '移动鼠标浏览作品，点击任意项目进入咨询。'),
    ),
  );
}

ReactDOM.render(h(ProjectsPage), document.getElementById('projects-root'));
