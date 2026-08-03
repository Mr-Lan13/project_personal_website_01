import React from 'react';
import ReactDOM from 'react-dom';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.js';
import BadgeCheck from 'lucide-react/dist/esm/icons/badge-check.js';
import BrainCircuit from 'lucide-react/dist/esm/icons/brain-circuit.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import Component from 'lucide-react/dist/esm/icons/component.js';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle.js';
import MoveUpRight from 'lucide-react/dist/esm/icons/move-up-right.js';
import Palette from 'lucide-react/dist/esm/icons/palette.js';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.js';
import Workflow from 'lucide-react/dist/esm/icons/workflow.js';
import Grainient from './Grainient.js';
import GridMotion from './GridMotion.js';
import './styles.css';

const h = React.createElement;

const metrics = [
  { value: '6+', label: '精选项目占位' },
  { value: '3', label: '核心设计方向' },
  { value: '0-1', label: '产品体验搭建' },
  { value: 'AI', label: '设计流程增强' },
];

const projects = [
  {
    title: 'AI Design System',
    type: 'AI 产品 / 视觉系统',
    image: './assets/project-ai-system.png',
    href: 'mailto:lan.design@email.com?subject=AI%20Design%20System',
    desc: '围绕智能生成、参数控制与多端一致性建立产品视觉语言。',
  },
  {
    title: 'Creative Campaign Lab',
    type: '品牌视觉 / 内容生成',
    image: './assets/project-campaign.png',
    href: 'mailto:lan.design@email.com?subject=Creative%20Campaign%20Lab',
    desc: '将视觉策略、AIGC 资产生产和创意落地流程组合成高效工作台。',
  },
  {
    title: 'Product Experience Console',
    type: '产品设计 / 交互体验',
    image: './assets/project-product.png',
    href: 'mailto:lan.design@email.com?subject=Product%20Experience%20Console',
    desc: '面向复杂信息场景，设计克制、清晰且适合长期使用的界面系统。',
  },
];

const strengths = [
  {
    icon: Palette,
    title: '视觉判断',
    body: '能在品牌气质、界面秩序和传播张力之间找到稳定的表达方式。',
  },
  {
    icon: BrainCircuit,
    title: 'AI 工作流',
    body: '擅长把 AI 工具接入设计流程，从概念生成到资产变体保持可控输出。',
  },
  {
    icon: Component,
    title: '产品结构',
    body: '理解从信息架构、交互路径到组件规范的完整体验设计链路。',
  },
  {
    icon: Workflow,
    title: '跨职能协作',
    body: '能把抽象创意转译成团队可执行的设计标准、页面和交付物。',
  },
];

function Icon(IconComponent, size = 18) {
  return h(IconComponent, { size, 'aria-hidden': true });
}

function VideoBackdrop() {
  return h(
    'div',
    { className: 'video-backdrop', 'aria-hidden': true },
    h('video', {
      src: './assets/hero-background.mp4',
      poster: './assets/project-ai-system.png',
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      preload: 'auto',
    }),
  );
}

function Nav() {
  return h(
    'header',
    { className: 'nav' },
    h(
      'a',
      { className: 'brand', href: '#top', 'aria-label': 'Lan Portfolio 首页' },
      h('span', null, 'LAN'),
      h('small', null, 'Design Portfolio'),
    ),
    h(
      'nav',
      { 'aria-label': '主导航' },
      h('a', { href: '#experience' }, '经历'),
      h('a', { href: '#projects' }, '项目'),
      h('a', { href: '#strengths' }, '优势'),
      h('a', { href: '#contact' }, '联系'),
    ),
    h('a', { className: 'contact-button', href: 'mailto:lan.design@email.com' }, Icon(Mail), '联系我'),
  );
}

function Hero() {
  return h(
    'section',
    { className: 'hero', id: 'top' },
    h(VideoBackdrop),
    h(Nav),
    h(
      'div',
      { className: 'hero-inner page-shell' },
      h('p', { className: 'eyebrow' }, 'Visual Designer / AI Designer / Product Designer'),
      h(
        'h1',
        { className: 'hero-title' },
        h('span', { className: 'hero-title-solid' }, 'Lan'),
        h('span', { className: 'hero-title-outline' }, 'DESIGNXAI'),
      ),
      h(
        'div',
        { className: 'hero-details' },
        h('p', { className: 'hero-copy' }, '用克制的视觉语言、AI 增强的创意流程和产品化思维，构建更清晰、更有质感的数字体验。'),
        h(
          'div',
          { className: 'hero-actions' },
          h('a', { className: 'primary-action', href: '#projects' }, '查看作品', Icon(ArrowUpRight, 19)),
          h('a', { className: 'secondary-action', href: '#experience' }, '了解经历', Icon(ChevronRight)),
        ),
      ),
    ),
    h('div', { className: 'scroll-note' }, h('span'), 'Scroll'),
  );
}

function Experience() {
  return h(
    'section',
    { className: 'section experience', id: 'experience' },
    h(
      'div',
      { className: 'page-shell' },
      h(
        'div',
        { className: 'section-intro-row' },
        h('div', { className: 'section-intro-title' }, h('p', { className: 'section-kicker' }, 'Profile'), h('h2', null, '在视觉表达、AI 生成与产品体验之间建立清晰秩序。')),
        h(
          'div',
          { className: 'profile-summary' },
          h(
            'p',
            null,
            '我是 Lan，视觉设计师 / AI 设计师 / 产品设计师。首版页面先以可替换内容承载你的个人经历：后续拿到简历、项目截图和参考站点后，可以继续细化真实履历、项目叙事、视觉资产和动效节奏。',
          ),
          h(
            'div',
            { className: 'contact-row' },
            h('a', { href: 'mailto:lan.design@email.com' }, Icon(Mail), 'lan.design@email.com'),
            h('a', { href: '#contact' }, Icon(MessageCircle), '预约沟通'),
          ),
        ),
      ),
      h(
        'div',
        { className: 'experience-showcase' },
        h('div', { className: 'portrait-frame' }, h('img', { src: './assets/portrait-lan.png', alt: 'Lan 人像' })),
        h(
          'div',
          { className: 'metrics-grid' },
          metrics.map((item) => h('div', { className: 'metric', key: item.label }, h('strong', null, item.value), h('span', null, item.label))),
        ),
      ),
    ),
  );
}

function Projects() {
  const gridItems = Array.from({ length: 28 }, (_, index) => {
    const project = projects[index % projects.length];
    return h(
      'a',
      {
        className: 'grid-project-link',
        href: project.href,
        'aria-label': `联系我咨询 ${project.title}`,
      },
      h('img', { src: project.image, alt: `${project.title} 项目封面` }),
      h('span', { className: 'grid-project-label' }, h('strong', null, project.title), h('span', null, project.type)),
    );
  });

  return h(
    'section',
    { className: 'section projects', id: 'projects' },
    h(
      'div',
      { className: 'page-shell' },
      h(
        'div',
        { className: 'section-heading' },
        h('div', null, h('p', { className: 'section-kicker' }, 'Selected Work'), h('h2', null, '精选项目')),
        h('a', { href: 'mailto:lan.design@email.com' }, '获取完整作品集', Icon(MoveUpRight)),
      ),
      h('div', { className: 'grid-motion-shell' }, h(GridMotion, { items: gridItems, gradientColor: '#071b1d' })),
    ),
  );
}

function Strengths() {
  return h(
    'section',
    { className: 'section strengths', id: 'strengths' },
    h(
      'div',
      { className: 'page-shell' },
      h('div', { className: 'section-heading strength-heading' }, h('div', null, h('p', { className: 'section-kicker' }, 'Capability'), h('h2', null, '个人优势'))),
      h(
        'div',
        { className: 'strength-grid' },
        strengths.map((item, index) =>
          h(
            'article',
            { className: 'strength-card', key: item.title },
            h('span', { className: 'strength-number' }, String(index + 1).padStart(2, '0')),
            h('div', { className: 'icon-box' }, Icon(item.icon, 24)),
            h('h3', null, item.title),
            h('p', null, item.body),
          ),
        ),
      ),
    ),
  );
}

function Contact() {
  return h(
    'section',
    { className: 'contact-section', id: 'contact' },
    h(
      'div',
      { className: 'page-shell contact-inner' },
      h('p', { className: 'section-kicker' }, 'Contact'),
      h('h2', null, '让作品、产品和 AI 创意流程进入下一轮迭代。'),
      h('p', null, '当前联系方式为占位内容，可替换为你的真实邮箱、微信、LinkedIn 或作品集 PDF。'),
      h(
        'div',
        { className: 'contact-actions' },
        h('a', { className: 'primary-action', href: 'mailto:lan.design@email.com' }, Icon(Mail, 19), 'lan.design@email.com'),
        h('a', { className: 'secondary-action', href: 'https://www.linkedin.com', target: '_blank', rel: 'noreferrer' }, Icon(BadgeCheck), 'LinkedIn'),
      ),
    ),
  );
}

function App() {
  return h(
    React.Fragment,
    null,
    h(Hero),
    h(
      'main',
      { className: 'content-main' },
      h('div', { className: 'grainient-layer', 'aria-hidden': true }, h(Grainient)),
      h('div', { className: 'content-main-inner' }, h(Experience), h(Projects), h(Strengths), h(Contact)),
    ),
    h('a', { className: 'floating-contact', href: 'mailto:lan.design@email.com', 'aria-label': '发送邮件联系 Lan' }, Icon(Sparkles), 'Offer'),
  );
}

ReactDOM.render(h(App), document.getElementById('root'));
