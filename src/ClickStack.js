import React from 'react';

const h = React.createElement;

const defaultDetails = [
  {
    eyebrow: 'Visual System',
    detail: '从品牌气质、版式秩序到界面情绪，建立稳定且可延展的视觉表达。',
    tags: ['品牌视觉', '界面质感', '版式秩序'],
  },
  {
    eyebrow: 'AI Pipeline',
    detail: '把 AI 工具接入灵感、草图、资产变体和落地文件，保持创意速度与输出可控。',
    tags: ['生成流程', '资产变体', '效率系统'],
  },
  {
    eyebrow: 'Product Logic',
    detail: '在信息架构、交互路径和组件规范之间搭建清晰的产品体验骨架。',
    tags: ['信息架构', '交互路径', '组件规范'],
  },
  {
    eyebrow: 'Team Delivery',
    detail: '把抽象创意翻译成团队可执行的页面、规范、节奏和交付物。',
    tags: ['设计协作', '交付标准', '跨职能沟通'],
  },
];

const coverCard = {
  key: 'cover',
  type: 'cover',
  title: '个人优势',
  cardTitle: '点击开始了解我',
  eyebrow: 'Capability Deck',
  detail: '一组围绕视觉判断、AI 工作流、产品结构和协作交付展开的能力卡片。',
  tags: ['Click', 'Explore', 'Lan'],
};

export default function ClickStack({ items, renderIcon }) {
  const cards = React.useMemo(
    () => [
      coverCard,
      ...items.map((item, index) => ({
        ...item,
        key: item.title,
        type: 'content',
        number: String(index + 1).padStart(2, '0'),
        eyebrow: item.eyebrow || defaultDetails[index]?.eyebrow || 'Capability',
        detail: item.detail || defaultDetails[index]?.detail || item.body,
        tags: item.tags || defaultDetails[index]?.tags || [],
      })),
    ],
    [items],
  );

  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = cards.length;
  const activeCard = cards[activeIndex];

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
      { className: 'click-stack-copy', key: activeCard.key },
      h('p', { className: 'section-kicker' }, activeCard.type === 'cover' ? 'Capability' : activeCard.eyebrow),
      h('h2', null, activeCard.title),
      h('p', { className: 'strength-lede' }, activeCard.type === 'cover' ? '点击封面卡片，查看 Lan 的 01 / 02 / 03 / 04 核心能力。' : activeCard.detail),
    ),
    h(
      'div',
      { className: 'click-stack-stage', 'aria-label': '个人优势点击卡片堆' },
      cards.map((item, index) => {
        const stackStep = (index - activeIndex + total) % total;
        const isActive = stackStep === 0;
        const isCover = item.type === 'cover';

        return h(
          'button',
          {
            type: 'button',
            key: item.key,
            className: `click-stack-card${isActive ? ' is-active' : ''}${isCover ? ' click-stack-card--cover' : ''}`,
            style: {
              '--stack-step': stackStep,
              '--stack-z': total - stackStep,
            },
            onClick: () => handleCardClick(index),
            'aria-pressed': isActive,
            'aria-label': isCover ? '点击开始了解我' : `查看第 ${item.number} 项优势：${item.title}`,
          },
          h('span', { className: 'click-stack-card-number' }, isCover ? '00' : item.number),
          h('span', { className: 'click-stack-card-icon' }, isCover ? 'LAN' : renderIcon(item.icon, 28)),
          h('span', { className: 'click-stack-card-eyebrow' }, item.eyebrow),
          h('span', { className: isCover ? 'click-stack-cover-title' : 'click-stack-card-body' }, isCover ? item.cardTitle : item.detail),
          h(
            'span',
            { className: 'click-stack-card-tags' },
            item.tags.map((tag) => h('i', { key: tag }, tag)),
          ),
        );
      }),
    ),
    h(
      'div',
      { className: 'click-stack-dial', 'aria-label': '切换优势模块' },
      cards.map((item, index) =>
        h(
          'button',
          {
            type: 'button',
            key: item.key,
            className: index === activeIndex ? 'is-active' : '',
            onClick: () => moveTo(index),
            'aria-label': item.type === 'cover' ? '切换到封面卡片' : `切换到 ${item.title}`,
          },
          h('span', null, item.type === 'cover' ? '00' : item.number),
          h('i', null),
        ),
      ),
    ),
  );
}
