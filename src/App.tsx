import React, { useState, useMemo } from 'react';
import { ROADMAP_STAGES, ROADMAP_NODES, ASSOCIATION_INFO } from './data/roadmapData';
import { RoadmapNode, NodeType } from './types';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { AdventureView } from './components/AdventureView';
import { GridView } from './components/GridView';
import { ResourceDrawer } from './components/ResourceDrawer';
import { ShareModal } from './components/ShareModal';
import { ImportProgressModal } from './components/ImportProgressModal';
import { Sparkles, HelpCircle, Code, Heart, SearchX } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'adventure' | 'grid'>('adventure');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | NodeType>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const allNodeIds = useMemo(() => ROADMAP_NODES.map((n) => n.id), []);
  const {
    progress,
    setNodeStatus,
    toggleNodeCompleted,
    resetProgress,
    incomingProgress,
    applyIncomingProgress,
    dismissIncomingProgress,
    stats,
  } = useProgress(allNodeIds);

  // Filter nodes based on query, status, and category
  const filteredNodes = useMemo(() => {
    return ROADMAP_NODES.filter((node) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = node.title.toLowerCase().includes(q);
        const matchesSubtitle = node.subtitle.toLowerCase().includes(q);
        const matchesSummary = node.summary.toLowerCase().includes(q);
        const matchesKeyPoints = node.keyPoints.some((p) => p.toLowerCase().includes(q));
        const matchesResources = node.resources.some(
          (r) => r.title.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q))
        );
        if (!matchesTitle && !matchesSubtitle && !matchesSummary && !matchesKeyPoints && !matchesResources) {
          return false;
        }
      }

      // 2. Status Filter
      const currentStatus = progress[node.id] || 'not_started';
      if (statusFilter === 'completed' && currentStatus !== 'completed') {
        return false;
      }
      if (statusFilter === 'uncompleted' && currentStatus === 'completed') {
        return false;
      }

      // 3. Category Filter
      if (categoryFilter !== 'all' && node.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter, categoryFilter, progress]);

  const selectedNode = useMemo(() => {
    return ROADMAP_NODES.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        stats={stats}
        onResetProgress={resetProgress}
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
        
        {/* Hero Introduction */}
        <HeroBanner />

        {/* Filter and Search Controller */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          stats={stats}
        />

        {/* Main View Area */}
        {filteredNodes.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">没有找到匹配的技能或教程</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              尝试更换关键词，或者重置筛选条件来浏览全部路线图。
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              清空搜索与筛选条件
            </button>
          </div>
        ) : viewMode === 'adventure' ? (
          <AdventureView
            stages={ROADMAP_STAGES}
            nodes={filteredNodes}
            progress={progress}
            onSelectNode={(node) => setSelectedNodeId(node.id)}
            onToggleStatus={toggleNodeCompleted}
          />
        ) : (
          <GridView
            nodes={filteredNodes}
            progress={progress}
            onSelectNode={(node) => setSelectedNodeId(node.id)}
            onToggleStatus={toggleNodeCompleted}
          />
        )}
      </main>

      {/* Detail & Resource Drawer */}
      <ResourceDrawer
        node={selectedNode}
        status={selectedNode ? progress[selectedNode.id] || 'not_started' : 'not_started'}
        onClose={() => setSelectedNodeId(null)}
        onSetStatus={setNodeStatus}
        onSelectNode={(id) => setSelectedNodeId(id)}
        allNodes={ROADMAP_NODES}
      />

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal
          progress={progress}
          stats={stats}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* URL Hash Import Progress Modal */}
      {incomingProgress && (
        <ImportProgressModal
          incomingProgress={incomingProgress}
          localProgress={progress}
          onApplyOverride={() => applyIncomingProgress('override')}
          onApplyMerge={() => applyIncomingProgress('merge')}
          onCancel={dismissIncomingProgress}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-10 text-center text-xs text-slate-400 space-y-2.5">
        <div className="flex flex-wrap items-center justify-center gap-2 text-slate-700 font-semibold">
          <a
            href="https://unicov.cn/scu/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-[11px] border border-indigo-200 transition-colors inline-flex items-center gap-1"
            title="访问四川大学智锐科创计算机协会官网"
          >
            <span>{ASSOCIATION_INFO.name}</span>
            <span>↗</span>
          </a>
        </div>
        <div className="flex items-center justify-center gap-1 text-slate-500 font-medium">
          <span>用最优秀的理论，做最出色的工程</span>
        </div>
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto px-4">
          所有教程链接精选自 B站顶流公开课、名校开源 Lab、CCF 与官方文档，若有侵权请联系删除。本站仅为自学交流使用。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
          <span>内容协议：</span>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-sky-600 font-medium underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
          >
            <span>CC BY-NC-SA 4.0 国际许可</span>
            <span>↗</span>
          </a>
          <span>·</span>
          <span>© 2026 四川大学智锐科创计算机协会 (SCU Covariant)</span>
        </div>
      </footer>
    </div>
  );
}
export default App;

