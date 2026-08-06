import React from 'react';

const h = React.createElement;

const visualPalette = [
  { name: '深黑底', hex: '#050708', role: '背景 / 空间 / 对比', tone: 'dark' },
  { name: '主青色', hex: '#4EAA9C', role: '强调 / 光效 / 交互', tone: 'mint' },
  { name: '暖白字', hex: '#F5F5EE', role: '标题 / 正文 / 高亮', tone: 'light' },
  { name: '柔紫灰', hex: '#BDA8FF', role: '辅助层级 / AI 情绪', tone: 'violet' },
];

const workflowNodes = [
  { label: '了解需求', note: '确认目标、身份与页面边界' },
  { label: '项目背景', note: '整理个人作品集的表达重点' },
  { label: '调研与灵感', note: '参考视觉方向与交互形式' },
  { label: '信息梳理', note: '拆分 Hero、经历、优势与联系' },
  { label: '视觉方向', note: '确定暗色、青色、克制科技感' },
  { label: '开始制作', note: 'React + Vite 组件化落地' },
  { label: 'AI 协作', note: '快速迭代动效、布局与内容' },
  { label: '测试与优化', note: '构建、预览、检查与提交' },
];

const structureModules = [
  { label: '信息架构', value: 'IA' },
  { label: '交互路径', value: 'UX' },
  { label: '组件规范', value: 'UI' },
  { label: '体验骨架', value: 'PX' },
];

const deliverySteps = [
  { label: '抽象创意', tag: 'Idea' },
  { label: '设计标准', tag: 'Rule' },
  { label: '页面方案', tag: 'Page' },
  { label: '交付资产', tag: 'Ship' },
];

const pages = [
  {
    number: '01',
    theme: '视觉设计',
    visual: 'palette',
    caption: '以颜色定义网站的视觉层级与情绪，并以这些统一的视觉元素建立页面之间的交互联系。',
  },
  {
    number: '02',
    theme: '产品工作流',
    visual: 'workflow',
    caption: '从需求、背景、灵感到制作、AI 协作与测试优化，形成清晰的项目制作路径。',
  },
  {
    number: '03',
    theme: '产品结构',
    visual: 'structure',
    caption: '将信息架构、交互路径与组件规范收束成可阅读、可扩展的体验骨架。',
  },
  {
    number: '04',
    theme: '跨职能协作',
    visual: 'delivery',
    caption: '把抽象创意翻译成团队可执行的设计标准、页面方案与交付资产。',
  },
];

const coverCard = {
  key: 'cover',
  type: 'cover',
  theme: '个人优势',
};

const advantageTransformItems = [
  { name: '创意输入', hex: '#050708', role: '想法 / 概念 / 判断', tone: 'dark' },
  { name: '审美判断', hex: '#4EAA9C', role: '风格 / 秩序 / 情绪', tone: 'mint' },
  { name: '网页表达', hex: '#F5F5EE', role: '页面 / 视觉 / 体验', tone: 'light' },
  { name: '产品原型', hex: '#BDA8FF', role: 'AI 应用 / 产品表达', tone: 'violet' },
];

const insightNodes = [
  { label: '表面观点', note: '先接住直接表达出来的想法' },
  { label: '真实冲突', note: '识别观点背后的矛盾与卡点' },
  { label: '理念厘清', note: '把模糊判断变成团队共识' },
  { label: '品牌方向', note: '确认气质、边界和表达策略' },
  { label: '关键问题', note: '找到最需要解决的核心问题' },
  { label: '下一步', note: '把洞察转成可执行任务' },
];

const launchModules = [
  { label: '从想法开始', value: 'Idea' },
  { label: '真实网站', value: 'Web' },
  { label: '域名备案', value: 'ICP' },
  { label: '上线结果', value: 'Live' },
];

const communicationSteps = [
  { label: '善于交流', tag: 'Talk' },
  { label: '耐心倾听', tag: 'Listen' },
  { label: '情绪稳定', tag: 'Stable' },
  { label: '快速适应', tag: 'Adapt' },
];

const advantagePages = [
  {
    number: '01',
    theme: '创意 | 审美转化',
    visual: 'palette',
    caption: '不仅有创意，还会把创意转化成网页、视觉作品和产品表达，适合产品原型与人工智能应用设计。',
  },
  {
    number: '02',
    theme: '问题洞察 | 需求分析',
    visual: 'workflow',
    caption: '能发现表面观点背后的真实冲突，并帮助团队厘清理念、品牌方向和关键问题。',
  },
  {
    number: '03',
    theme: '独立行动 | 从零落地',
    visual: 'structure',
    caption: '能够把长期停留在脑中的想法做成真实网站，完成域名、备案和上线，具备从想法到结果的行动能力。',
  },
  {
    number: '04',
    theme: '沟通表达 | 适应能力',
    visual: 'delivery',
    caption: '善于交流、耐心、情绪稳定，能够理解他人，也能快速适应新环境、新工具和不确定的任务。',
  },
];

function PaletteBoard() {
  return h(
    'div',
    { className: 'stack-palette-board' },
    advantageTransformItems.map((color) =>
      h(
        'span',
        { className: `stack-color-card stack-color-card--${color.tone}`, key: color.hex, style: { '--color': color.hex } },
        h('i', null),
        h('b', null, color.name),
        h('em', null, color.hex),
        h('small', null, color.role),
      ),
    ),
  );
}

function WorkflowBoard() {
  return h(
    'div',
    { className: 'stack-workflow' },
    insightNodes.map((node, index) =>
      h(
        'span',
        { className: 'stack-workflow-node', key: node.label },
        h('b', null, String(index + 1).padStart(2, '0')),
        h('i', null),
        h('strong', null, node.label),
        h('small', null, node.note),
      ),
    ),
  );
}

function StructureBoard() {
  return h(
    'div',
    { className: 'stack-structure-map' },
    h('span', { className: 'stack-structure-core' }, 'Product', h('small', null, 'Logic')),
    launchModules.map((node, index) =>
      h(
        'span',
        { className: `stack-structure-node stack-structure-node--${index + 1}`, key: node.label },
        h('b', null, node.value),
        h('small', null, node.label),
      ),
    ),
  );
}

function DeliveryBoard() {
  return h(
    'div',
    { className: 'stack-delivery-path' },
    communicationSteps.map((step, index) =>
      h(
        'span',
        { className: 'stack-delivery-step', key: step.label },
        h('b', null, step.tag),
        h('i', null, String(index + 1).padStart(2, '0')),
        h('small', null, step.label),
      ),
    ),
  );
}

function PageVisual({ visual }) {
  if (visual === 'palette') return h(PaletteBoard);
  if (visual === 'workflow') return h(WorkflowBoard);
  if (visual === 'structure') return h(StructureBoard);
  return h(DeliveryBoard);
}

export default function ClickStack() {
  const cards = React.useMemo(() => [coverCard, ...advantagePages.map((page) => ({ ...page, key: page.number, type: 'content' }))], []);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = cards.length;
  const activeCard = cards[activeIndex];
  const isCoverActive = activeCard.type === 'cover';

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
    { className: `click-stack-shell${isCoverActive ? ' is-cover-active' : ''}` },
    !isCoverActive &&
      h(
        'div',
        { className: 'click-stack-copy', key: activeCard.key },
        h('span', { className: 'click-stack-page-number' }, activeCard.number),
        h('h2', null, activeCard.theme),
        h('p', { className: 'strength-lede' }, activeCard.caption),
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
            'aria-label': isCover ? '点击开始了解我' : `查看第 ${item.number} 页：${item.theme}`,
          },
          isCover
            ? h(
                React.Fragment,
                null,
                h('span', { className: 'click-stack-click-word' }, 'CLICK'),
                h('span', { className: 'click-stack-cover-note' }, 'Lan-个人优势'),
              )
            : h(
                React.Fragment,
                null,
                h('span', { className: 'click-stack-visual-shell' }, h(PageVisual, { visual: item.visual })),
              ),
        );
      }),
    ),
    !isCoverActive &&
      h(
        'div',
        { className: 'click-stack-dial', 'aria-label': '切换优势模块' },
        advantagePages.map((page, index) =>
          h(
            'button',
            {
              type: 'button',
              key: page.number,
              className: index + 1 === activeIndex ? 'is-active' : '',
              onClick: () => moveTo(index + 1),
              'aria-label': `切换到第 ${page.number} 页`,
            },
            h('span', null, page.number),
            h('i', null),
          ),
        ),
      ),
  );
}
