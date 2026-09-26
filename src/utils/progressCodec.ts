import { NodeStatus } from '../types';

export interface ProgressState {
  [nodeId: string]: NodeStatus;
}

/**
 * 将进度编码为 URL-Safe Base64 字符串
 * 仅编码已完成(2)或进行中(1)的节点，避免冗余
 */
export function encodeProgress(progress: ProgressState): string {
  const activeEntries = Object.entries(progress).filter(
    ([, status]) => status === 'in_progress' || status === 'completed'
  );

  if (activeEntries.length === 0) {
    return '';
  }

  // 格式：nodeId:code，多个以逗号分隔 (1: in_progress, 2: completed)
  const compact = activeEntries
    .map(([id, status]) => `${id}:${status === 'completed' ? '2' : '1'}`)
    .join(',');

  try {
    const utf8Bytes = encodeURIComponent(compact);
    const base64 = btoa(utf8Bytes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64;
  } catch (err) {
    console.error('Failed to encode progress to hash', err);
    return '';
  }
}

/**
 * 从 URL-Safe Base64 字符串解析进度
 */
export function decodeProgress(hashStr: string): ProgressState | null {
  if (!hashStr) return null;

  // 提取 #p= 或 p= 后的内容
  let raw = hashStr.trim();
  if (raw.startsWith('#')) {
    raw = raw.slice(1);
  }
  if (raw.startsWith('p=')) {
    raw = raw.slice(2);
  } else if (raw.includes('p=')) {
    const match = raw.match(/[?&#]p=([^&]+)/);
    if (match) {
      raw = match[1];
    }
  }

  if (!raw) return null;

  try {
    // 还原标准 Base64 补齐
    let base64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    const compact = decodeURIComponent(atob(base64));
    const result: ProgressState = {};
    const parts = compact.split(',');

    for (const part of parts) {
      const [id, code] = part.split(':');
      if (id && (code === '1' || code === '2')) {
        result[id] = code === '2' ? 'completed' : 'in_progress';
      }
    }

    return Object.keys(result).length > 0 ? result : null;
  } catch (err) {
    console.warn('Invalid progress hash string', err);
    return null;
  }
}

/**
 * 合并两个进度状态，相同节点取最高等级 (completed > in_progress > not_started)
 */
export function mergeProgress(
  local: ProgressState,
  incoming: ProgressState
): ProgressState {
  const merged: ProgressState = { ...local };

  for (const [id, incomingStatus] of Object.entries(incoming)) {
    const current = merged[id] || 'not_started';
    if (incomingStatus === 'completed' || current !== 'completed') {
      merged[id] = incomingStatus;
    }
  }

  return merged;
}

/**
 * 生成当前进度的专属分享 URL
 */
export function generateShareUrl(progress: ProgressState): string {
  const encoded = encodeProgress(progress);
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return encoded ? `${baseUrl}#p=${encoded}` : baseUrl;
}

