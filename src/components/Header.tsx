import React, { useState } from 'react';
import { 
  Compass, 
  Map, 
  RotateCcw, 
  Sparkles, 
  Github, 
  CheckCircle,
  BookMarked,
  Microscope,
  Info
} from 'lucide-react';
import { ASSOCIATION_INFO } from '../data/roadmapData';
import { AboutModal } from './AboutModal';

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
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  stats,
  onResetProgress,
}) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Main Title with Association Identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
                <Compass className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-indigo-600 text-white shadow-xs">
                    {ASSOCIATION_INFO.shortName}
                  </span>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    CS 新生技能与科研路线图
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
            </div>

            {/* Right Action Area */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* About Association Button */}
              <button
                type="button"
                onClick={() => setIsAboutOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 border border-slate-200 transition-colors"
                title="了解智锐科创协会"
              >
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">关于协会</span>
              </button>

              {/* View Mode Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => onViewModeChange('adventure')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'adventure'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="关卡闯关流视图"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">关卡闯关</span>
                  <span className="md:hidden">闯关</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewModeChange('grid')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="分类技能树视图"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">模块全景</span>
                  <span className="md:hidden">全景</span>
                </button>
              </div>

              {/* Overall Progress Widget */}
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

              {/* GitHub Link */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                title="在 GitHub 查看路线图源码"
              >
                <Github className="w-4 h-4" />
              </a>

            </div>

          </div>
        </div>
      </header>

      {/* About Association Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};
