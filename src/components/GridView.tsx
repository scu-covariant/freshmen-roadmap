import React from 'react';
import { RoadmapNode, NodeStatus, NodeType } from '../types';
import { NodeCard } from './NodeCard';
import { Terminal, Cpu, Binary, Layout, Trophy, Microscope } from 'lucide-react';

interface GridViewProps {
  nodes: RoadmapNode[];
  progress: Record<string, NodeStatus>;
  onSelectNode: (node: RoadmapNode) => void;
  onToggleStatus: (nodeId: string) => void;
}

interface CategoryGroup {
  id: NodeType;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badgeColor: string;
}

const CATEGORIES: CategoryGroup[] = [
  {
    id: 'tools',
    title: '开发环境与极客工具',
    subtitle: '命令行、Git、VS Code、打字与检索',
    icon: <Terminal className="w-5 h-5 text-blue-600" />,
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'language',
    title: '核心编程语言基石',
    subtitle: 'C/C++、Python、面向对象与 STL',
    icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'cs-core',
    title: '计算机内功四大件',
    subtitle: '数据结构与算法、计组、操作系统、计网',
    icon: <Binary className="w-5 h-5 text-purple-600" />,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'direction',
    title: '工业界赛道与项目实战',
    subtitle: 'Web 前端、服务端后端、AI 大模型、嵌入式',
    icon: <Layout className="w-5 h-5 text-amber-600" />,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'research',
    title: '学术科研与论文启蒙（智锐特色）',
    subtitle: '文献检索、Zotero、LaTeX 排版、实验复现与大创申报',
    icon: <Microscope className="w-5 h-5 text-cyan-600" />,
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  {
    id: 'growth',
    title: '竞赛保研与自学宝库',
    subtitle: '蓝桥杯/ACM、名校开源课程实验、开源社区',
    icon: <Trophy className="w-5 h-5 text-rose-600" />,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
];

export const GridView: React.FC<GridViewProps> = ({
  nodes,
  progress,
  onSelectNode,
  onToggleStatus,
}) => {
  return (
    <div className="space-y-10 py-4">
      {CATEGORIES.map((cat) => {
        const catNodes = nodes.filter((node) => node.category === cat.id);
        if (catNodes.length === 0) return null;

        const completedCount = catNodes.filter((n) => progress[n.id] === 'completed').length;

        return (
          <div key={cat.id} className="space-y-4">
            {/* Category Section Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">{cat.title}</h2>
                    <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
                      ({completedCount} / {catNodes.length} 已掌握)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{cat.subtitle}</p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${cat.badgeColor}`}>
                  {catNodes.length} 个知识点
                </span>
              </div>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {catNodes.map((node) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  status={progress[node.id] || 'not_started'}
                  onSelect={onSelectNode}
                  onToggleStatus={onToggleStatus}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

