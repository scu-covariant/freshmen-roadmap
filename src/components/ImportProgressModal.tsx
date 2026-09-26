import React from 'react';
import { Download, Sparkles, Layers, RefreshCw, X } from 'lucide-react';
import { ProgressState } from '../utils/progressCodec';

interface ImportProgressModalProps {
  incomingProgress: ProgressState;
  localProgress: ProgressState;
  onApplyOverride: () => void;
  onApplyMerge: () => void;
  onCancel: () => void;
}

export const ImportProgressModal: React.FC<ImportProgressModalProps> = ({
  incomingProgress,
  localProgress,
  onApplyOverride,
  onApplyMerge,
  onCancel,
}) => {
  const incomingCompleted = Object.values(incomingProgress).filter((s) => s === 'completed').length;
  const incomingInProgress = Object.values(incomingProgress).filter((s) => s === 'in_progress').length;

  const localCompleted = Object.values(localProgress).filter((s) => s === 'completed').length;
  const localInProgress = Object.values(localProgress).filter((s) => s === 'in_progress').length;
  const hasLocalData = localCompleted > 0 || localInProgress > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 p-6 text-white relative">
          <button
            onClick={onCancel}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-cyan-200 text-xs font-bold border border-cyan-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>URL 状态编码同步</span>
          </div>

          <h3 className="text-xl font-black text-white">
            检测到分享的学习进度
          </h3>
          <p className="text-xs text-indigo-200 mt-1">
            您通过包含打卡状态的专属链接打开了路线图。
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-slate-600">
          
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <div className="text-xs font-bold text-indigo-900 flex items-center gap-1 mb-1">
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>链接中的进度</span>
              </div>
              <div className="text-lg font-black text-indigo-600">
                {incomingCompleted} <span className="text-xs font-normal text-slate-500">已点亮</span>
              </div>
              {incomingInProgress > 0 && (
                <div className="text-[11px] text-amber-600 font-medium">
                  {incomingInProgress} 项正在学习
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>您本地已有进度</span>
              </div>
              <div className="text-lg font-black text-slate-700">
                {localCompleted} <span className="text-xs font-normal text-slate-400">已点亮</span>
              </div>
              {localInProgress > 0 && (
                <div className="text-[11px] text-amber-600 font-medium">
                  {localInProgress} 项正在学习
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {hasLocalData
              ? '为了防止冲掉您本地原有的打卡记录，请选择您希望的同步方式：'
              : '是否将链接中的打卡进度直接同步到本设备的浏览器中？'}
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {hasLocalData ? (
              <>
                <button
                  onClick={onApplyMerge}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>与本地进度合并（推荐，保留双边最高进度）</span>
                </button>

                <button
                  onClick={onApplyOverride}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>完全覆盖本地进度</span>
                </button>
              </>
            ) : (
              <button
                onClick={onApplyOverride}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>立即同步到本地浏览器</span>
              </button>
            )}

            <button
              onClick={onCancel}
              className="w-full py-2 px-4 rounded-xl font-medium text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              忽略并不做改动
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

