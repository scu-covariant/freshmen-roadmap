import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Rocket, BookMarked, Terminal, Flame } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-32 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md border border-white/10">
          <Rocket className="w-3.5 h-3.5 text-indigo-400" />
          <span>致计算机大一新生与初学者</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
          告别迷茫与代码焦虑，开启你的极客升级之旅
        </h2>

        <p className="text-indigo-200/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          大学计算机系到底该怎么学？什么时候学 Git？什么是四大件？这个路线图整理了大学四年最具性价比的技能树与优质免费自学资源（包含 B站经典公开课、名校开源 Lab、官方文档），点击任意节点即可直达外链，边学边打卡！
        </p>

        {/* Quick Tips Toggle */}
        <div className="pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>{isExpanded ? '收起大一防坑三原则' : '展开阅读：大一自学防坑三原则'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Tips Panel */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 text-xs animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                <span>1. 拒绝只当“视频收藏家”</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                看10小时视频，不如亲手敲2小时代码、查5次报错。每个节点都附带了“通关实战挑战”，动手才算真正掌握。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>2. 尽早掌握 Git 与 Linux</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                不要等到大三做大作业才学 Git。大一就把平时所有的代码、实验作业 push 到 GitHub，四年后你的仓库就是最好的求职招牌。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <BookMarked className="w-4 h-4" />
                <span>3. 重视计算机专业四大件</span>
              </div>
              <p className="text-indigo-200/80 leading-relaxed">
                各种新框架层出不穷，但底层的数据结构、操作系统、网络三十年未变。学好四大件，学任何新技术都如同降维打击。
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
