import React from 'react';
import { Search, X, Filter, CheckCircle2 } from 'lucide-react';
import { NodeType, NodeStatus } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: 'all' | 'uncompleted' | 'completed';
  onStatusFilterChange: (status: 'all' | 'uncompleted' | 'completed') => void;
  categoryFilter: 'all' | NodeType;
  onCategoryFilterChange: (cat: 'all' | NodeType) => void;
  stats: {
    total: number;
    completedCount: number;
    percent: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  stats,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3.5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索技能、知识点或外链（如：Git、指针、Linux、力扣、B站教程...）"
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => onStatusFilterChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            全部技能 ({stats.total})
          </button>
          <button
            onClick={() => onStatusFilterChange('uncompleted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'uncompleted'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            待学习 ({stats.total - stats.completedCount})
          </button>
          <button
            onClick={() => onStatusFilterChange('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            已点亮 ({stats.completedCount})
          </button>
        </div>

      </div>

      {/* Category Filter Pills & Mobile Progress */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>分类：</span>
          </span>

          {[
            { id: 'all', label: '全部' },
            { id: 'tools', label: '极客工具' },
            { id: 'language', label: '语言筑基' },
            { id: 'cs-core', label: 'CS四大件' },
            { id: 'direction', label: '赛道探索' },
            { id: 'research', label: '学术科研' },
            { id: 'growth', label: '竞赛自学' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryFilterChange(cat.id as 'all' | NodeType)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile-only Progress indicator */}
        <div className="flex sm:hidden items-center justify-between w-full pt-1 text-slate-500">
          <span>总进度：{stats.completedCount} / {stats.total} ({stats.percent}%)</span>
          <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

