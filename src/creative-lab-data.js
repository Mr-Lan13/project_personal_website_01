const labWorks = [
  {
    id: 'personal-website-00',
    title: 'Personal website',
    type: '个人作品 / 旧版网站',
    image: './assets/zp1.png',
    desc: '以个人视觉探索为核心的作品展示。',
  },
  {
    id: 'waiting-01',
    title: 'waiting-01',
    type: '等待作品放入中',
    image: './assets/project-ai-system.png',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-02',
    title: 'waiting-02',
    type: '等待作品放入中',
    image: './assets/project-campaign.png',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-03',
    title: 'waiting-03',
    type: '等待作品放入中',
    image: './assets/project-product.png',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: '3D-modeling-04',
    title: '3D modeling',
    type: '场景设计 / 3D建模',
    image: './assets/zp2.png',
    desc: '3D建模作品展示。',
  },
  {
    id: 'waiting-05',
    title: 'waiting-05',
    type: '等待作品放入中',
    thumbnail: './assets/project-ai-system.png',
    image: '',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-06',
    title: 'waiting-06',
    type: '等待作品放入中',
    thumbnail: './assets/project-campaign.png',
    image: '',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-07',
    title: 'waiting-07',
    type: '等待作品放入中',
    thumbnail: './assets/project-product.png',
    image: '',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-08',
    title: 'waiting-08',
    type: '等待作品放入中',
    thumbnail: './assets/project-product.png',
    image: '',
    desc: '这里还没有作品，你来的太早了。',
  },
  {
    id: 'waiting-09',
    title: 'waiting-09',
    type: '等待作品放入中',
    thumbnail: './assets/project-ai-system.png',
    image: '',
    desc: '这里还没有作品，你来的太早了。',
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
