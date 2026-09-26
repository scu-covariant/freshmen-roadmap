import React from 'react';
import { X, Sparkles, Microscope, Code2, Bot, Cpu, Heart, ExternalLink, Award, Globe, Github } from 'lucide-react';
import { ASSOCIATION_INFO } from '../data/roadmapData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const departmentIcons: Record<string, React.ReactNode> = {
    '科研学术部': <Microscope className="w-5 h-5 text-cyan-600" />,
    '软件工程部': <Code2 className="w-5 h-5 text-indigo-600" />,
    '人工智能部': <Bot className="w-5 h-5 text-purple-600" />,
    '硬件物联部': <Cpu className="w-5 h-5 text-amber-600" />,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-cyan-950 text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src="./zhirui-logo.png"
                alt="智锐科创官方标志"
                className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg shadow-black/20 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold backdrop-blur-md border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{ASSOCIATION_INFO.badge}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {ASSOCIATION_INFO.name}
                </h2>
                <p className="text-xs sm:text-sm text-cyan-100/90 font-medium">
                  {ASSOCIATION_INFO.slogan}
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>关于我们</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {ASSOCIATION_INFO.description}
              </p>
              
              {/* Quick Official Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="https://unicov.cn/scu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>社团主页 (unicov.cn/scu)</span>
                  <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
                <a
                  href="https://github.com/scu-covariant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub 组织 (@scu-covariant)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href="https://github.com/scu-covariant/CSGuidance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-50 text-cyan-800 hover:bg-cyan-100 transition-colors border border-cyan-200"
                >
                  <span>CSGuidance 资料索引</span>
                  <ExternalLink className="w-3 h-3 text-cyan-500" />
                </a>
              </div>
            </div>

            {/* Departments */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800">社团特色方向与部门</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ASSOCIATION_INFO.departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white shadow-xs">
                        {departmentIcons[dept.name] || <Sparkles className="w-4 h-4 text-indigo-500" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{dept.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500 pl-8 leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision statement */}
            <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs text-cyan-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-cyan-900">
                <Microscope className="w-4 h-4 text-cyan-600" />
                研产并进特色
              </span>
              <p className="leading-relaxed text-cyan-900/80">
                智锐科创不仅注重软件项目开发与工程交付，更设有专门的科研学术引导机制。鼓励大一新生尽早接触顶会论文精读、LaTeX 写作、学术规范与科研实验，为大创立项、保研与深造打下最坚实的学术底座。
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>四川大学智锐科创计算机协会 · 欢迎每一位新同学</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              开始探索路线图
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
