export type NodeType = 'tools' | 'language' | 'cs-core' | 'direction' | 'research' | 'growth';
export type ResourceType = 'video' | 'doc' | 'interactive' | 'book' | 'tool';
export type NodeStatus = 'not_started' | 'in_progress' | 'completed';

export interface ResourceLink {
  title: string;
  url: string;
  type: ResourceType;
  tag?: string; // 比如 "B站顶流", "官方中文", "互动练习", "零基础推荐"
  description?: string;
}

export interface MiniQuest {
  title: string;
  description: string;
}

export interface RoadmapNode {
  id: string;
  stageId: string;
  title: string;
  subtitle: string;
  category: NodeType;
  categoryLabel: string;
  iconName: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: string;
  isEssential: boolean; // 是否新生必学必修
  summary: string; // 简介
  whyItMatters: string; // 为什么大一/初学者要学它？
  keyPoints: string[]; // 重点知识清单
  resources: ResourceLink[]; // 推荐学习外链 (视频、教程、文档)
  quests: MiniQuest[]; // 动手实战任务
  prerequisites?: string[]; // 前置依赖节点 id
}

export interface RoadmapStage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  recommendedTime: string; // 建议时间段，如 "大一上·第1-4周"
  colorTheme: {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
  };
}

