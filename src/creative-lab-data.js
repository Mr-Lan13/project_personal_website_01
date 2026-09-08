const labWorks = [
  {
    id: 'nap-world-builder',
    title: 'NAP',
    type: '世界生成器 / 随机地图',
    image: './assets/lab-optimized/nap.webp',
    images: [
      './assets/lab-optimized/nap.webp',
      './assets/lab-optimized/nap1.webp',
    ],
    desc: '用随机地形与地块规则生成可编辑地图，帮助小说、游戏和世界观设定从一张地图开始。',
  },
  {
    id: 'personal-website-01',
    title: 'Personal website',
    type: '个人作品 / 旧版网站',
    image: './assets/lab-optimized/personal_website1.webp',
    images: [
      './assets/lab-optimized/personal_website1.webp',
      './assets/lab-optimized/personal_website2.webp',
      './assets/lab-optimized/personal_website3.webp',
    ],
    desc: '以个人视觉探索为核心的作品展示。',
  },
  {
    id: 'python_bug-02',
    title: 'Python bug',
    type: '爬虫/数据处理',
    image: './assets/lab-optimized/guling1.webp',
    images: ['./assets/lab-optimized/guling1.webp'],
    desc: '抓取最新话题信息和热点，进行分析整理。',
  },
  {
    id: 'lens-style-vault',
    title: 'LENS',
    type: '风格提取 / 创作卡片',
    image: './assets/lab-optimized/lens1.webp',
    images: [
      './assets/lab-optimized/lens1.webp',
      './assets/lab-optimized/lens2.webp',
      './assets/lab-optimized/lens3.webp',
      './assets/lab-optimized/lens.webp',
    ],
    desc: '从参考图中提取色彩、构图与质感，整理为可分享、可继续用于生成创作的风格卡。',
  },
  {
    id: '3D-modeling-04',
    title: '3D modeling',
    type: '场景设计 / 3D建模',
    image: './assets/lab-optimized/3D_modling.webp',
    images: ['./assets/lab-optimized/3D_modling.webp'],
    desc: '3D建模作品展示。',
  },
  {
    id: 'waiting-05',
    title: '等待-05',
    type: '等待作品放入中',
    image: './assets/project-ai-system.png',
    images: [],
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-06',
    title: '等待-06',
    type: '等待作品放入中',
    image: './assets/project-campaign.png',
    images: [],
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'ai-interview-07',
    title: 'AI interview',
    type: 'AI 设计 / 面试流程',
    image: './assets/lab-optimized/ai_interview1.webp',
    images: [
      './assets/lab-optimized/ai_interview1.webp',
      './assets/lab-optimized/ai_interview2.webp',
      './assets/lab-optimized/ai_interview3.webp',
    ],
    desc: 'AI interview 作品展示。',
  },
  {
    id: 'rain_night-08',
    title: 'Rain night',
    type: '场景设计/概念宣传',
    image: './assets/lab-optimized/rain_night1.webp',
    images: [
      './assets/lab-optimized/rain_night1.webp',
      './assets/lab-optimized/rain_night2.webp'
    ],
    desc: '场景设计作品展示。',
  },
  {
    id: 'waiting-09',
    title: '等待-09',
    type: '等待作品放入中',
    image: './assets/project-ai-system.png',
    images: [],
    desc: '这里还没有作品，你来的太早了。',
  },
];

export const labSlotIndexes = [16, 9, 10, 11, 12, 15, 8, 17, 18, 19];

export const labSlotMap = labSlotIndexes.reduce((map, slotIndex, workIndex) => {
  const work = labWorks[workIndex];
  map[slotIndex] = {
    ...work,
    slotIndex,
    number: String(workIndex + 1).padStart(2, '0'),
  };
  return map;
}, {});

export function getLabWorkById(id) {
  return labWorks.find((work) => work.id === id) || null;
}

export function getWorkImages(work) {
  if (!work) return [];
  if (Array.isArray(work.images) && work.images.length > 0) return work.images;
  if (work.image) return [work.image];
  return [];
}

export default labWorks;
