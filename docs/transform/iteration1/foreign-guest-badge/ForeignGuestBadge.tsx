import { ShieldCheck, BadgeCheck, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// Foreign Guest Badge Component
// 外宾资质认证徽章组件
// ============================================

export interface CertificationConfig {
  acceptsForeignGuests: boolean;
  certificationType: 'official' | 'verified' | 'self_reported';
  policeRegistration: boolean;
}

interface ForeignGuestBadgeProps {
  certification: CertificationConfig;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  showPoliceReg?: boolean;
}

/**
 * 认证类型配置
 * - official: 官方认证（已向公安机关报备）
 * - verified: 平台验证（已确认接待外宾）
 * - self_reported: 商家自报（未经验证）
 */
const badgeConfig = {
  official: {
    icon: ShieldCheck,
    bg: 'bg-blue-500',
    hoverBg: 'hover:bg-blue-600',
    activeBg: 'active:bg-blue-700',
    text: 'Verified Foreign Guest',
    description: '官方认证',
  },
  verified: {
    icon: BadgeCheck,
    bg: 'bg-emerald-500',
    hoverBg: 'hover:bg-emerald-600',
    activeBg: 'active:bg-emerald-700',
    text: 'Accepts Foreigners',
    description: '平台验证',
  },
  self_reported: {
    icon: Globe,
    bg: 'bg-gray-500',
    hoverBg: 'hover:bg-gray-600',
    activeBg: 'active:bg-gray-700',
    text: 'Foreign Guest OK',
    description: '商家自报',
  },
};

/**
 * 尺寸配置
 */
const sizeConfig = {
  sm: { 
    padding: 'px-2 py-1', 
    text: 'text-xs', 
    icon: 'w-3 h-3',
    gap: 'gap-1',
  },
  md: { 
    padding: 'px-2.5 py-1', 
    text: 'text-xs', 
    icon: 'w-3.5 h-3.5',
    gap: 'gap-1.5',
  },
  lg: { 
    padding: 'px-3 py-1.5', 
    text: 'text-sm', 
    icon: 'w-4 h-4',
    gap: 'gap-2',
  },
};

/**
 * ForeignGuestBadge
 * 
 * 使用示例:
 * ```tsx
 * <ForeignGuestBadge
 *   certification={{
 *     acceptsForeignGuests: true,
 *     certificationType: 'official',
 *     policeRegistration: true,
 *   }}
 *   size="md"
 *   onClick={() => openModal()}
 * />
 * ```
 */
export function ForeignGuestBadge({ 
  certification, 
  size = 'md', 
  onClick,
  className,
  showPoliceReg = true,
}: ForeignGuestBadgeProps) {
  // 不接待外宾时不显示
  if (!certification.acceptsForeignGuests) return null;
  
  const config = badgeConfig[certification.certificationType];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;
  const isClickable = !!onClick;
  
  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={cn(
        // 基础样式
        'inline-flex items-center font-semibold rounded-full text-white',
        'transition-all duration-200 ease-out',
        
        // 阴影效果
        'shadow-[0_2px_8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)]',
        
        // 颜色
        config.bg,
        isClickable && config.hoverBg,
        isClickable && config.activeBg,
        isClickable && 'cursor-pointer',
        !isClickable && 'cursor-default',
        
        // 尺寸
        sizeStyles.padding,
        sizeStyles.text,
        sizeStyles.gap,
        
        className
      )}
      aria-label={`Foreign guest certification: ${config.text}`}
    >
      <Icon className={sizeStyles.icon} aria-hidden="true" />
      <span>{config.text}</span>
      
      {/* 公安报备标识 */}
      {showPoliceReg && certification.policeRegistration && size !== 'sm' && (
        <span className="text-white/70 text-[10px] ml-0.5">
          (Police Reg.)
        </span>
      )}
    </button>
  );
}

/**
 * 仅展示徽章（不可点击）
 */
export function ForeignGuestBadgeStatic(props: Omit<ForeignGuestBadgeProps, 'onClick'>) {
  return <ForeignGuestBadge {...props} />;
}

/**
 * 获取认证状态的辅助函数
 */
export function getCertificationStatus(config: CertificationConfig): {
  label: string;
  color: string;
  isVerified: boolean;
} {
  if (!config.acceptsForeignGuests) {
    return {
      label: 'Does not accept foreign guests',
      color: 'text-red-500',
      isVerified: false,
    };
  }
  
  const typeConfig = badgeConfig[config.certificationType];
  return {
    label: typeConfig.description,
    color: config.certificationType === 'official' ? 'text-blue-500' 
         : config.certificationType === 'verified' ? 'text-emerald-500'
         : 'text-gray-500',
    isVerified: config.certificationType === 'official' || config.certificationType === 'verified',
  };
}
