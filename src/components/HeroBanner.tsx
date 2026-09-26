import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Terminal, Flame, Microscope, Sparkles, BookMarked } from 'lucide-react';
import { ASSOCIATION_INFO } from '../data/roadmapData';

export const HeroBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-900/50">
      
      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-40 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-cyan-200 text-xs font-bold backdrop-blur-md border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>{ASSOCIATION_INFO.name} · 自学通关与科研指南</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-indigo-300/80">
            {ASSOCIATION_INFO.slogan}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
          从代码萌新到极客与科研新秀，开启你的通关之旅
        </h2>

        <p className="text-indigo-200/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          大学计算机系到底该怎么学？什么时候学 Git？学术科研怎么入门？这个路线图由<strong>智锐科创协会</strong>整理，涵盖工具链、核心语言、专业四大件、工业界赛道与学术科研启蒙，点击任意节点即可直达外链，边学边打卡！
        </p>

        {/* Quick Tips Toggle */}
        <div className="pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>{isExpanded ? '收起智锐自学防坑四原则' : '展开阅读：智锐科创自学与科研防坑四原则'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Tips Panel */}
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-3 text-xs animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 shrink-0" />
                <span>1. 拒绝只当“视频收藏家”</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                看10小时视频，不如亲手敲2小时代码、查5次报错。每个节点都附带了“通关实战挑战”，动手才算真正掌握。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 shrink-0" />
                <span>2. 尽早掌握 Git 与 Linux</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                尽早把平时所有的代码、实验作业 push 到 GitHub，日后你的 GitHub 绿格子就是求职与面试最硬核的招牌。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 shrink-0" />
                <span>3. 重视计算机专业四大件</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                各种新框架层出不穷，但底层的数据结构、操作系统、网络三十年未变。内功深厚，学任何新技术都如同降维打击。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Microscope className="w-4 h-4 shrink-0" />
                <span>4. 建立科研意识</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                提前建立科研学术意识，学会看顶会论文、用 LaTeX 排版、参加大创，将让你在保研和深造中拥有压倒性优势。
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
