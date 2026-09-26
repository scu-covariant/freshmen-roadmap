import React, { useState, useMemo } from 'react';
import { ROADMAP_STAGES, ROADMAP_NODES } from './data/roadmapData';
import { RoadmapNode, NodeType } from './types';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { AdventureView } from './components/AdventureView';
import { GridView } from './components/GridView';
import { ResourceDrawer } from './components/ResourceDrawer';
import { Sparkles, HelpCircle, Code, Heart, SearchX } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'adventure' | 'grid'>('adventure');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | NodeType>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const allNodeIds = useMemo(() => ROADMAP_NODES.map((n) => n.id), []);
  const {
    progress,
    setNodeStatus,
    toggleNodeCompleted,
    resetProgress,
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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-1 text-slate-600">
          <span>用</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>与开源精神为大学新生打造 · 始于代码，忠于热爱</span>
        </div>
        <p>
          所有教程链接均精选自 B站优质公开课、名校开源项目及官方文档 · 纯静态网页，支持一键部署到 GitHub Pages
        </p>
      </footer>
    </div>
  );
}
export default App;
