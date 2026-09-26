import React from 'react';
import {
  Sparkles,
  Terminal,
  GitBranch,
  Code2,
  Cpu,
  Boxes,
  Flame,
  Binary,
  HardDrive,
  Network,
  Layout,
  Server,
  Bot,
  Wrench,
  Trophy,
  GraduationCap,
  CircleDot,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Terminal,
  GitBranch,
  Code2,
  Cpu,
  Boxes,
  Flame,
  Binary,
  HardDrive,
  Network,
  Layout,
  Server,
  Bot,
  Wrench,
  Trophy,
  GraduationCap,
  CircleDot,
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  const IconComponent = ICON_MAP[name] || CircleDot;
  return <IconComponent className={className} size={size} />;
};
