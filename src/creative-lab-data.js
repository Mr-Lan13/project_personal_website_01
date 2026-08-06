const labWorks = [
  {
    id: 'zp-visual-01',
    title: 'ZP Visual 01',
    type: '个人作品 / 视觉实验',
    image: './assets/zp1.png',
    desc: '以个人视觉探索为核心的作品展示。',
  },
  {
    id: 'ai-design-system',
    title: 'AI Design System',
    type: 'AI 产品 / 视觉系统',
    image: './assets/project-ai-system.png',
    desc: '围绕智能生成、参数控制与多端一致性建立产品视觉语言。',
  },
  {
    id: 'creative-campaign-lab',
    title: 'Creative Campaign Lab',
    type: '品牌视觉 / 内容生成',
    image: './assets/project-campaign.png',
    desc: '将视觉策略、AI 资产生产和创意落地流程组合成高效工作台。',
  },
  {
    id: 'product-experience-console',
    title: 'Product Experience Console',
    type: '产品设计 / 交互体验',
    image: './assets/project-product.png',
    desc: '面向复杂信息场景，设计克制、清晰且适合长期使用的界面系统。',
  },
  {
    id: 'zp-visual-02',
    title: 'ZP Visual 02',
    type: '个人作品 / 视觉实验',
    image: './assets/zp2.png',
    desc: 'ZP 系列视觉作品展示。',
  },
  {
    id: 'waiting-01',
    title: 'Waiting 01',
    type: '作品整理中',
    image: '',
    desc: '作品图还没有放入，页面会先显示等待中。',
  },
  {
    id: 'waiting-02',
    title: 'Waiting 02',
    type: '作品整理中',
    image: '',
    desc: '作品图还没有放入，页面会先显示等待中。',
  },
  {
    id: 'zp-visual-03',
    title: 'ZP Visual 03',
    type: '个人作品 / 视觉实验',
    image: './assets/zp3.png',
    desc: 'ZP 系列视觉作品展示。',
  },
  {
    id: 'waiting-03',
    title: 'Waiting 03',
    type: '作品整理中',
    image: '',
    desc: '作品图还没有放入，页面会先显示等待中。',
  },
  {
    id: 'waiting-04',
    title: 'Waiting 04',
    type: '作品整理中',
    image: '',
    desc: '作品图还没有放入，页面会先显示等待中。',
  },
];

export const labSlotIndexes = [8, 9, 10, 11, 12, 15, 16, 17, 18, 19];

export const labSlotMap = labSlotIndexes.reduce((map, slotIndex, workIndex) => {
  map[slotIndex] = {
    ...labWorks[workIndex],
    slotIndex,
    number: String(workIndex + 1).padStart(2, '0'),
  };
  return map;
}, {});

export function getLabWorkById(id) {
  return labWorks.find((work) => work.id === id) || null;
}

export default labWorks;
