import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles, X, ExternalLink, CheckCircle } from 'lucide-react';
import { ProgressState, generateShareUrl } from '../utils/progressCodec';

interface ShareModalProps {
  progress: ProgressState;
  stats: {
    total: number;
    completedCount: number;
    inProgressCount: number;
    percent: number;
  };
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  progress,
  stats,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = generateShareUrl(progress);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // 兼容非安全上下文或旧浏览器
      const input = document.createElement('textarea');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-cyan-200 text-xs font-bold border border-cyan-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>个性化状态编码分享</span>
          </div>

          <h3 className="text-xl font-black text-white">
            分享我的学习通关进度
          </h3>
          <p className="text-xs text-indigo-200 mt-1">
            将当前打卡进度编码至 URL Hash，对方打开即刻查看或同步。
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-slate-600">
          
          {/* Status summary banner */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs text-slate-500 font-medium">当前通关成就</div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>已点亮 {stats.completedCount} 项 / 共 {stats.total} 项</span>
              </div>
            </div>
            <div className="text-xl font-black text-indigo-600">
              {stats.percent}%
            </div>
          </div>

          {/* URL box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">专属分享链接：</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 select-all outline-none focus:border-indigo-400"
              />
              <button
                onClick={handleCopy}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制链接</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 space-y-1">
            <div className="font-semibold text-slate-700">💡 使用提示：</div>
            <ul className="list-disc list-inside space-y-0.5">
              <li>可发送给同学或学长汇报自学进度，纯静态零服务器负担；</li>
              <li>可存为浏览器书签或发到手机，轻松跨设备无缝同步；</li>
              <li>无需注册账号或登录，数据安全保存在本地与 URL 编码中。</li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              完成并关闭
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

