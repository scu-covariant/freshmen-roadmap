import React from 'react';
import { RoadmapStage, RoadmapNode, NodeStatus } from '../types';
import { NodeCard } from './NodeCard';
import { Calendar, CheckCircle2, ChevronDown } from 'lucide-react';

interface AdventureViewProps {
  stages: RoadmapStage[];
  nodes: RoadmapNode[];
  progress: Record<string, NodeStatus>;
  onSelectNode: (node: RoadmapNode) => void;
  onToggleStatus: (nodeId: string) => void;
}

export const AdventureView: React.FC<AdventureViewProps> = ({
  stages,
  nodes,
  progress,
  onSelectNode,
  onToggleStatus,
}) => {
  return (
    <div className="space-y-12 py-4">
      {stages.map((stage, stageIndex) => {
        const stageNodes = nodes.filter((node) => node.stageId === stage.id);
        if (stageNodes.length === 0) return null;

        const stageCompletedCount = stageNodes.filter(
          (n) => progress[n.id] === 'completed'
        ).length;
        const stagePercent = Math.round((stageCompletedCount / stageNodes.length) * 100);

        return (
          <div key={stage.id} className="relative">
            
            {/* Timeline connector line between stages */}
            {stageIndex < stages.length - 1 && (
              <div className="hidden lg:block absolute left-8 top-28 bottom-0 w-0.5 -mb-12 bg-gradient-to-b from-indigo-200 via-indigo-100 to-transparent z-0" />
            )}

            {/* Stage Header Block */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-6">
              <div className="flex items-start gap-4">
                {/* Stage Step Number Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stage.colorTheme.gradient} text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0`}
                >
                  {stage.order}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{stage.title}</h2>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${stage.colorTheme.badgeBg} ${stage.colorTheme.badgeText}`}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 max-w-2xl">{stage.description}</p>
                </div>
              </div>

              {/* Stage Meta & Progress Pill */}
              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{stage.recommendedTime}</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      stagePercent === 100 ? 'text-emerald-500' : 'text-slate-400'
                    }`}
                  />
                  <div className="text-xs font-bold text-slate-700">
                    {stageCompletedCount} / {stageNodes.length}
                  </div>
                  <span className="text-[10px] text-slate-400">({stagePercent}%)</span>
                </div>
              </div>
            </div>

            {/* Stage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 pl-0 lg:pl-10">
              {stageNodes.map((node) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  status={progress[node.id] || 'not_started'}
                  onSelect={onSelectNode}
                  onToggleStatus={onToggleStatus}
                />
              ))}
            </div>

            {/* Visual Flow Arrow between stages */}
            {stageIndex < stages.length - 1 && (
              <div className="flex justify-center my-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-medium border border-slate-200">
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>进阶下一关</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
