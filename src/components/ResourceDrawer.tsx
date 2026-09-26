import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Video, 
  BookOpen, 
  Terminal, 
  Gamepad2, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Star, 
  Sparkles, 
  Target, 
  ArrowRight,
  HelpCircle,
  Search
} from 'lucide-react';
import { RoadmapNode, NodeStatus, ResourceType, ResourceLink } from '../types';
import { IconRenderer } from './IconRenderer';

interface ResourceDrawerProps {
  node: RoadmapNode | null;
  status: NodeStatus;
  onClose: () => void;
  onSetStatus: (nodeId: string, status: NodeStatus) => void;
  onSelectNode: (nodeId: string) => void;
  allNodes: RoadmapNode[];
}

export const ResourceDrawer: React.FC<ResourceDrawerProps> = ({
  node,
  status,
  onClose,
  onSetStatus,
  onSelectNode,
  allNodes,
}) => {
  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-rose-500" />;
      case 'doc':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'interactive':
        return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
      case 'book':
        return <Bookmark className="w-4 h-4 text-purple-500" />;
      case 'tool':
        return <Terminal className="w-4 h-4 text-amber-500" />;
      default:
        return <ExternalLink className="w-4 h-4 text-slate-500" />;
    }
  };

  const getResourceTypeLabel = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return '视频教程';
      case 'doc':
        return '文档/专栏';
      case 'interactive':
        return '交互训练';
      case 'book':
        return '经典书籍';
      case 'tool':
        return '工具/平台';
      default:
        return '教程外链';
    }
  };

  const getNoUrlBadge = (res: ResourceLink) => {
    if (res.note) return res.note;
    switch (res.type) {
      case 'book':
        return '📚 纸质书目 / 馆藏借阅';
      case 'video':
        return '🎬 推荐搜索相关视频';
      case 'tool':
        return '🛠️ 建议自行检索配置';
      case 'interactive':
        return '💻 建议在线实操体验';
      case 'doc':
      default:
        return '💡 经验参考 / 检索学习';
    }
  };

  const getSearchLink = (res: ResourceLink) => {
    const prefixes = ['小红书等平台搜索', '小红书', 'B站', '知乎', 'Google', '百度'];
    let cleanTitle = res.title;
    for (const p of prefixes) {
      if (cleanTitle.startsWith(p)) {
        cleanTitle = cleanTitle.slice(p.length).replace(/^[\s\-:—·]+/, '');
        break;
      }
    }
    const query = encodeURIComponent(cleanTitle || res.title);
    if (res.title.includes('小红书')) {
      return `https://www.xiaohongshu.com/search_result?keyword=${query}`;
    }
    if (res.type === 'video' || res.title.includes('B站')) {
      return `https://search.bilibili.com/all?keyword=${query}`;
    }
    if (res.type === 'book') {
      return `https://search.douban.com/book/subject_search?search_text=${query}`;
    }
    return `https://www.bing.com/search?q=${query}`;
  };

  const prerequisiteNodes = (node.prerequisites || [])
    .map((preId) => allNodes.find((n) => n.id === preId))
    .filter(Boolean) as RoadmapNode[];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-50/80 border-b border-slate-200 flex items-start justify-between">
            <div className="space-y-1.5 pr-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {node.categoryLabel}
                </span>
                {node.isEssential && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                    ★ 核心推荐
                  </span>
                )}
                <div className="flex items-center text-amber-400 text-xs pl-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < node.difficulty ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-slate-400 text-xs ml-1">难度 {node.difficulty}/5</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100 shrink-0">
                  <IconRenderer name={node.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">{node.title}</h2>
                  <p className="text-sm text-slate-500">{node.subtitle}</p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="关闭详情"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Bar */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>建议投入：<strong className="text-slate-700">{node.estimatedTime}</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSetStatus(node.id, 'not_started')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  status === 'not_started'
                    ? 'bg-slate-200 text-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                未开始
              </button>
              <button
                type="button"
                onClick={() => onSetStatus(node.id, 'in_progress')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  status === 'in_progress'
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                学习中
              </button>
              <button
                type="button"
                onClick={() => onSetStatus(node.id, 'completed')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium flex items-center gap-1 transition-all ${
                  status === 'completed'
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-200'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                已掌握
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            
            {/* Why it matters callout */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-900 font-semibold text-sm">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>为什么初学者一定要学它？</span>
              </div>
              <p className="text-sm text-indigo-950/80 leading-relaxed">
                {node.whyItMatters}
              </p>
            </div>

            {/* Prerequisites */}
            {prerequisiteNodes.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  推荐前置知识 / 先修项
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prerequisiteNodes.map((pre) => (
                    <button
                      key={pre.id}
                      onClick={() => onSelectNode(pre.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg border border-slate-200 transition-colors"
                    >
                      <span>{pre.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Learning Points */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>核心知识要点</span>
              </div>
              <ul className="space-y-2">
                {node.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curated External Resources (The core requirement) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>精选优质自学链接与视频</span>
                </div>
                <span className="text-xs text-slate-400">点击直达外链学习</span>
              </div>

              <div className="space-y-2.5">
                {node.resources.map((res, index) => {
                  const hasUrl = Boolean(res.url && res.url.trim() && res.url !== '#');

                  if (!hasUrl) {
                    return (
                      <div
                        key={index}
                        className="block p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0 mt-0.5 border border-amber-200/60">
                              {getResourceTypeIcon(res.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-semibold text-slate-900">
                                  {res.title}
                                </h4>
                                {res.tag && (
                                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-amber-100 text-amber-800">
                                    {res.tag}
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400">
                                  {getResourceTypeLabel(res.type)}
                                </span>
                              </div>
                              {res.description && (
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                  {res.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0 mt-0.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 bg-white border border-slate-200 shadow-2xs">
                              {getNoUrlBadge(res)}
                            </span>
                            <a
                              href={getSearchLink(res)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200/60 transition-colors"
                              title={`在对应平台检索：“${res.title}”`}
                            >
                              <Search className="w-3 h-3" />
                              <span>快捷搜索</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={index}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 bg-white transition-all shadow-sm hover:shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white text-slate-600 group-hover:text-indigo-600 transition-colors mt-0.5">
                            {getResourceTypeIcon(res.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {res.title}
                              </h4>
                              {res.tag && (
                                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700">
                                  {res.tag}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">
                                {getResourceTypeLabel(res.type)}
                              </span>
                            </div>
                            {res.description && (
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {res.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0 mt-1" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quests / Mini Tasks */}
            {node.quests.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>通关实战挑战（动手做才算学会）</span>
                </div>

                <div className="space-y-2">
                  {node.quests.map((quest, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                    >
                      <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
                          {index + 1}
                        </span>
                        {quest.title}
                      </h5>
                      <p className="text-xs text-slate-600 pl-5.5 leading-relaxed">
                        {quest.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors font-medium"
            >
              返回路线图
            </button>
            <button
              onClick={() => {
                onSetStatus(node.id, status === 'completed' ? 'not_started' : 'completed');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                status === 'completed'
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{status === 'completed' ? '取消打卡 (标记未完成)' : '打卡本技能 (标记已掌握)'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

