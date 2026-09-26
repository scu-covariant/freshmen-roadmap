import React from 'react';
import { CheckCircle2, Circle, Clock, Star, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { RoadmapNode, NodeStatus } from '../types';
import { IconRenderer } from './IconRenderer';

interface NodeCardProps {
  node: RoadmapNode;
  status: NodeStatus;
  onSelect: (node: RoadmapNode) => void;
  onToggleStatus: (nodeId: string) => void;
}

export const NodeCard: React.FC<NodeCardProps> = ({
  node,
  status,
  onSelect,
  onToggleStatus,
}) => {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';

  return (
    <div
      onClick={() => onSelect(node)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between p-5 hover:shadow-lg hover:-translate-y-0.5 ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/20 shadow-sm'
          : isInProgress
          ? 'border-blue-200 bg-blue-50/20 shadow-sm'
          : 'border-slate-200 hover:border-indigo-300'
      }`}
    >
      {/* Top Banner & Status Checkbox */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : isInProgress
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white'
              }`}
            >
              <IconRenderer name={node.iconName} className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {node.categoryLabel}
                </span>
                {node.isEssential && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                    必修
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {node.title}
              </h3>
            </div>
          </div>

          {/* Quick Toggle Status Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(node.id);
            }}
            title={isCompleted ? '已掌握（点击取消）' : '点击标记已掌握'}
            className="p-1 rounded-lg text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 transition-colors shrink-0"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
            ) : (
              <Circle className="w-6 h-6 text-slate-300 hover:text-emerald-500" />
            )}
          </button>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {node.summary}
        </p>
      </div>

      {/* Card Footer: Metadata and external resource count */}
      <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {/* Difficulty stars */}
          <div className="flex items-center text-amber-400">
            {[...Array(node.difficulty)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-slate-400">· {node.estimatedTime}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 group-hover:text-indigo-600 font-medium text-[11px]">
          <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
          <span>{node.resources.length} 篇教程/视频</span>
          <span className="text-indigo-500 group-hover:translate-x-0.5 transition-transform">→</span>
        </div>
      </div>

    </div>
  );
};

