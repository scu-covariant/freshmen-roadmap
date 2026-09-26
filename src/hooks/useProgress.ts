import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { NodeStatus } from '../types';

const STORAGE_KEY = 'freshmen_cs_roadmap_progress';

export interface ProgressState {
  [nodeId: string]: NodeStatus;
}

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

  const total = allNodeIds.length;
  const completedCount = allNodeIds.filter((id) => progress[id] === 'completed').length;
  const inProgressCount = allNodeIds.filter((id) => progress[id] === 'in_progress').length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return {
    progress,
    setNodeStatus,
    toggleNodeCompleted,
    resetProgress,
    stats: {
      total,
      completedCount,
      inProgressCount,
      percent,
    },
  };
}
