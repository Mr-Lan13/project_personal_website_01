import React from 'react';
import ReactDOM from 'react-dom';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.js';
import BadgeCheck from 'lucide-react/dist/esm/icons/badge-check.js';
import BrainCircuit from 'lucide-react/dist/esm/icons/brain-circuit.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import Component from 'lucide-react/dist/esm/icons/component.js';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle.js';
import Palette from 'lucide-react/dist/esm/icons/palette.js';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.js';
import Workflow from 'lucide-react/dist/esm/icons/workflow.js';
import ClickStack from './ClickStack.js';
import Grainient from './Grainient.js';
import './styles.css';

const h = React.createElement;

const paletteItems = [
  { value: '#4EAA9C', label: '主青色' },
  { value: '#050708', label: '深黑底' },
  { value: '#F5F5EE', label: '暖白字' },
  { value: '#BDA8FF', label: '柔紫灰' },
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
  const [isTextOnly, setIsTextOnly] = React.useState(false);
  const [labGlow, setLabGlow] = React.useState(0);

  React.useEffect(() => {
    let animationFrame = 0;

    const updateNavMode = () => {
      animationFrame = 0;
      const hero = document.querySelector('.hero');
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

      setIsTextOnly(Boolean(hero && hero.getBoundingClientRect().bottom <= 112));
      setLabGlow(Math.pow(progress, 1.25));
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateNavMode);
      }
    };

    updateNavMode();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return h(
    'header',
    { className: `nav${isTextOnly ? ' is-text-only' : ''}`, style: { '--lab-glow': labGlow.toFixed(3) } },
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
      h('a', { href: '#strengths' }, '优势'),
      h('a', { href: '#contact' }, '联系'),
      h('a', { className: 'creative-lab-link', href: './creative-lab.html' }, '创意实验室'),
    ),
    h('a', { className: 'contact-button', href: 'mailto:lan.design@email.com' }, Icon(Mail), '联系我'),
  );
}

function Hero() {
  return h(
    'section',
    { className: 'hero', id: 'top' },
    h(VideoBackdrop),
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
          h('a', { className: 'primary-action', href: './creative-lab.html' }, '进入实验室', Icon(ArrowUpRight, 19)),
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
      ),
      h(
        'div',
        { className: 'experience-showcase' },
        h(
          'div',
          { className: 'portrait-frame' },
          h('img', { src: './assets/portrait-lan.png', alt: 'Lan 人像' }),
          h(
            'div',
            { className: 'atelier-messages', 'aria-label': '设计流程消息' },
            h('p', null, h('b', null, '01'), 'AdventureX-筑梦者'),
            h('p', null, h('b', null, '02'), 'AI Hacker House-第四名'),
            h('p', null, h('b', null, '03'), 'SingleQuest-产品设计'),
          ),
        ),
        h(
          'div',
          { className: 'palette-grid' },
          paletteItems.map((item) =>
            h(
              'div',
              { className: 'palette-card', key: item.label },
              h('i', { style: { '--swatch': item.value } }),
              h('strong', null, item.value),
              h('span', null, item.label),
            ),
          ),
        ),
      ),
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
      h(
        'div',
        { className: 'section-heading strength-heading' },
        h(
          'div',
          null,
          h('p', { className: 'section-kicker' }, 'Capability'),
          h('h2', null, '个人优势'),
          h('p', { className: 'strength-lede' }, '点击卡片或右侧序号，查看 Lan 的 01 / 02 / 03 / 04 核心能力。'),
        ),
      ),
      h(ClickStack, { items: strengths, renderIcon: Icon }),
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
        h('a', { className: 'primary-action', href: 'mailto:lancelot13wdyx@163.com' }, Icon(Mail, 19), 'lancelot13wdyx@163.com'),
        h('a', { className: 'secondary-action', href: 'https://www.linkedin.com', target: '_blank', rel: 'noreferrer' }, Icon(BadgeCheck), 'LinkedIn'),
      ),
    ),
  );
}

const aphorisms = [
  'Patience is the key in life - Not by Lan',
  "Change is only thing that won't change - Not by Lan",
  'Salvation lies within - Not by Lan',
];

function FooterAphorism() {
  const [aphorismIndex] = React.useState(() => Math.floor(Math.random() * aphorisms.length));
  const [isVisible, setIsVisible] = React.useState(false);
  const aphorismRef = React.useRef(null);

  React.useEffect(() => {
    const node = aphorismRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return h(
    'div',
    { ref: aphorismRef, className: `footer-aphorism${isVisible ? ' is-visible' : ''}` },
    h('p', null, aphorisms[aphorismIndex]),
  );
}

function SiteFooter() {
  return h(
    'footer',
    { className: 'site-footer', role: 'contentinfo' },
    h('div', { className: 'site-footer-line', 'aria-hidden': true }),
    h(
      'div',
      { className: 'site-footer-inner' },
      h(FooterAphorism),
      h(
        'div',
        { className: 'beian-links', 'aria-label': '备案信息' },
        h('a', { href: 'https://beian.miit.gov.cn/', target: '_blank', rel: 'noreferrer' }, '陕ICP备2026018973号-1'),
        h(
          'a',
          { href: 'https://www.beian.gov.cn/portal/registerSystemInfo', target: '_blank', rel: 'noreferrer' },
          h('img', { src: './assets/beian-icon.png', alt: '', 'aria-hidden': true }),
          '陕公网安备61010402001074号',
        ),
      ),
    ),
  );
}

function App() {
  return h(
    React.Fragment,
    null,
    h(Nav),
    h(Hero),
    h(
      'main',
      { className: 'content-main' },
      h('div', { className: 'grainient-layer', 'aria-hidden': true }, h(Grainient)),
      h('div', { className: 'content-main-inner' }, h(Experience), h(Strengths), h(Contact)),
      h(SiteFooter),
    ),
    h('a', { className: 'floating-contact', href: 'mailto:lancelot13wdyx@163.com', 'aria-label': '发送邮件联系 Lan' }, Icon(Sparkles), 'Offer'),
  );
}

ReactDOM.render(h(App), document.getElementById('root'));

