import React from 'react';
import { 
  Map, 
  RotateCcw, 
  Github, 
  CheckCircle,
  BookMarked,
  Microscope,
  Globe,
  ExternalLink,
  Share2
} from 'lucide-react';
import { ASSOCIATION_INFO } from '../data/roadmapData';

interface HeaderProps {
  viewMode: 'adventure' | 'grid';
  onViewModeChange: (mode: 'adventure' | 'grid') => void;
  stats: {
    total: number;
    completedCount: number;
    inProgressCount: number;
    percent: number;
  };
  onResetProgress: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  stats,
  onResetProgress,
  onOpenShare,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Main Title: Clickable link to Association Website */}
          <a
            href="https://unicov.cn/scu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            title="点击访问四川大学智锐科创计算机协会官网 (unicov.cn/scu)"
          >
            <img
              src="./zhirui-logo.png"
              alt="智锐科创"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl object-contain bg-white p-1 border border-indigo-100 shadow-md shadow-indigo-100 shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-extrabold bg-indigo-600 text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
                  {ASSOCIATION_INFO.shortName}
                </span>
                <h1 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors leading-tight">
                  <span className="sm:hidden">CS 技能路线图</span>
                  <span className="hidden sm:inline">CS 技能与科研通关路线图</span>
                </h1>
                <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
                  <Microscope className="w-3 h-3 text-cyan-600" />
                  工程+科研双轨
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {ASSOCIATION_INFO.name} 出品 · 实用工具链 / 语言筑基 / CS四大件 / 前沿科研 / 竞赛自学
              </p>
            </div>
          </a>

          {/* Right Action Area */}
          <div className="flex items-center gap-1 sm:gap-3">
            
            {/* Direct Link to Association Official Site */}
            <a
              href="https://unicov.cn/scu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/80 transition-all shadow-xs"
              title="访问四川大学智锐科创计算机协会官网"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden md:inline">官网</span>
              <ExternalLink className="w-3 h-3 text-indigo-400 hidden sm:inline" />
            </a>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => onViewModeChange('adventure')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'adventure'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="关卡闯关流视图"
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden md:inline">闯关</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="分类技能树视图"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span className="hidden md:inline">全景</span>
              </button>
            </div>

            {/* Overall Progress Widget (Desktop only) */}
            <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="w-28 space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-500">
                  <span>点亮进度</span>
                  <span className="text-indigo-600 font-bold">{stats.percent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{stats.completedCount} / {stats.total}</span>
                </div>
                <span className="text-[10px] text-slate-400">已点亮技能</span>
              </div>

              {stats.completedCount > 0 && (
                <button
                  onClick={onResetProgress}
                  title="重置学习打卡记录"
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Share Progress Button */}
            <button
              type="button"
              onClick={onOpenShare}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-xs"
              title="生成并复制我的专属学习进度分享链接（URL Hash）"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">分享</span>
            </button>

            {/* GitHub Link */}
            <a
              href={ASSOCIATION_INFO.repo || 'https://github.com/scu-covariant/freshmen-roadmap'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              title="在 GitHub 查看 freshmen-roadmap 仓库源码"
            >
              <Github className="w-4 h-4" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
