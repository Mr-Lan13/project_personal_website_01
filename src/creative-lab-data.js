const labWorks = [
  {
    id: 'waiting-00',
    title: '等待-00',
    type: '等待作品放入中',
    image: './assets/project-ai-system.png',
    images: [],
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'personal-website-01',
    title: 'Personal website',
    type: '个人作品 / 旧版网站',
    image: './assets/personal_website1.png',
    images: [
      './assets/personal_website1.png',
      './assets/personal_website2.png',
      './assets/personal_website3.png',
    ],
    desc: '以个人视觉探索为核心的作品展示。',
  },
  {
    id: 'python_bug-02',
    title: 'Python bug',
    type: '爬虫/数据处理',
    image: './assets/guling1.png',
    images: ['./assets/guling1.png'],
    desc: '抓取最新话题信息和热点，进行分析整理。',
  },
  {
    id: 'waiting-03',
    title: '等待-03',
    type: '等待作品放入中',
    image: './assets/project-product.png',
    images: [],
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: '3D-modeling-04',
    title: '3D modeling',
    type: '场景设计 / 3D建模',
    image: './assets/3D_modling.png',
    images: ['./assets/3D_modling.png'],
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
    image: './assets/ai_interview1.png',
    images: [
      './assets/ai_interview1.png',
      './assets/ai_interview2.png',
      './assets/ai_interview3.png',
    ],
    desc: 'AI interview 作品展示。',
  },
  {
    id: 'rain_night-08',
    title: 'Rain night',
    type: '场景设计/概念宣传',
    image: './assets/rain_night1.png',
    images: [
      './assets/rain_night1.png',
      './assets/rain_night2.png'
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

export const labSlotIndexes = [8, 9, 10, 11, 12, 15, 16, 17, 18, 19];

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
