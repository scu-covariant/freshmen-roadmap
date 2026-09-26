import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { NodeStatus } from '../types';
import { decodeProgress, mergeProgress, ProgressState } from '../utils/progressCodec';

const STORAGE_KEY = 'freshmen_cs_roadmap_progress';

export function useProgress(allNodeIds: string[]) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return {};
  });

  const [incomingProgress, setIncomingProgress] = useState<ProgressState | null>(null);

  // 页面初次加载时，检测 URL Hash 是否带有 #p= 状态编码
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash && (hash.includes('p=') || hash.startsWith('#p='))) {
      const decoded = decodeProgress(hash);
      if (decoded && Object.keys(decoded).length > 0) {
        // 判断当前设备是否已经有打卡记录
        const hasExisting = Object.values(progress).some(
          (s) => s === 'completed' || s === 'in_progress'
        );

        if (hasExisting) {
          // 本地已有进度，唤起确认弹窗（提供覆盖/合并/忽略选项）
          setIncomingProgress(decoded);
        } else {
          // 本地无进度，直接自动同步
          setProgress(decoded);
          // 清除 URL 中的 hash，保持地址栏清爽
          try {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          } catch {
            // ignore
          }
        }
      }
    }
  }, []);

  // 持久化保存至 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
      });
    } catch {
      // ignore
    }
  }, []);

  const setNodeStatus = useCallback((nodeId: string, status: NodeStatus) => {
    setProgress((prev) => {
      const next = { ...prev, [nodeId]: status };
      if (status === 'completed' && prev[nodeId] !== 'completed') {
        triggerCelebration();
      }
      return next;
    });
  }, [triggerCelebration]);

  const toggleNodeCompleted = useCallback((nodeId: string) => {
    setProgress((prev) => {
      const current = prev[nodeId] || 'not_started';
      const nextStatus: NodeStatus = current === 'completed' ? 'not_started' : 'completed';
      if (nextStatus === 'completed') {
        triggerCelebration();
      }
      return { ...prev, [nodeId]: nextStatus };
    });
  }, [triggerCelebration]);

  const resetProgress = useCallback(() => {
    if (window.confirm('确定要重置所有学习打卡进度吗？此操作无法撤销。')) {
      setProgress({});
    }
  }, []);

  const applyIncomingProgress = useCallback((mode: 'override' | 'merge') => {
    if (!incomingProgress) return;
    if (mode === 'override') {
      setProgress(incomingProgress);
    } else {
      setProgress((prev) => mergeProgress(prev, incomingProgress));
    }
    setIncomingProgress(null);
    try {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch {
      // ignore
    }
  }, [incomingProgress]);

  const dismissIncomingProgress = useCallback(() => {
    setIncomingProgress(null);
    try {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch {
      // ignore
    }
  }, []);

  const total = allNodeIds.length;
  const completedCount = allNodeIds.filter((id) => progress[id] === 'completed').length;
  const inProgressCount = allNodeIds.filter((id) => progress[id] === 'in_progress').length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return {
    progress,
    setNodeStatus,
    toggleNodeCompleted,
    resetProgress,
    incomingProgress,
    applyIncomingProgress,
    dismissIncomingProgress,
    stats: {
      total,
      completedCount,
      inProgressCount,
      percent,
    },
  };
}
