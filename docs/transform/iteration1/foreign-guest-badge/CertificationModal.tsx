import { ShieldCheck, X, Check, AlertCircle, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { CertificationConfig } from './ForeignGuestBadge';

// ============================================
// Certification Modal Component
// 外宾资质认证说明弹窗
// ============================================

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  certification: CertificationConfig;
}

/**
 * 认证能力列表
 */
const certificationFeatures = [
  { 
    en: 'Accept foreign passport holders', 
    cn: '接待外国护照持有者入住',
    icon: Globe,
  },
  { 
    en: 'Handle police registration', 
    cn: '协助办理境外人员住宿登记',
    icon: Check,
  },
  { 
    en: 'Provide English support', 
    cn: '提供英语沟通支持',
    icon: Check,
  },
];

/**
 * 根据认证类型获取弹窗配置
 */
function getModalConfig(certificationType: CertificationConfig['certificationType']) {
  const configs = {
    official: {
      gradient: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-500',
      title: 'Official Foreign Guest License',
      subtitle: '官方外宾接待资质认证',
      verifiedText: 'Police Registration Verified',
      verifiedSubtext: '已向当地公安机关报备',
      verifiedBg: 'bg-green-50 border-green-100',
      verifiedTextColor: 'text-green-900',
      verifiedSubtextColor: 'text-green-700',
      verifiedIconBg: 'bg-green-500',
    },
    verified: {
      gradient: 'from-emerald-500 to-emerald-600',
      iconColor: 'text-emerald-500',
      title: 'Verified Foreign Guest Friendly',
      subtitle: '已验证可接待外宾',
      verifiedText: 'Platform Verified',
      verifiedSubtext: '平台已验证外宾接待能力',
      verifiedBg: 'bg-emerald-50 border-emerald-100',
      verifiedTextColor: 'text-emerald-900',
      verifiedSubtextColor: 'text-emerald-700',
      verifiedIconBg: 'bg-emerald-500',
    },
    self_reported: {
      gradient: 'from-gray-500 to-gray-600',
      iconColor: 'text-gray-500',
      title: 'Accepts Foreign Guests',
      subtitle: '商家自报可接待外宾',
      verifiedText: 'Self-Reported',
      verifiedSubtext: '商家自行申报，尚未验证',
      verifiedBg: 'bg-gray-50 border-gray-100',
      verifiedTextColor: 'text-gray-900',
      verifiedSubtextColor: 'text-gray-600',
      verifiedIconBg: 'bg-gray-500',
    },
  };
  
  return configs[certificationType];
}

/**
 * CertificationModal
 * 
 * 使用示例:
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <CertificationModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   hotelName="Cozy Hutong Courtyard"
 *   certification={{
 *     acceptsForeignGuests: true,
 *     certificationType: 'official',
 *     policeRegistration: true,
 *   }}
 * />
 * ```
 */
export function CertificationModal({ 
  isOpen, 
  onClose, 
  hotelName,
  certification,
}: CertificationModalProps) {
  const config = getModalConfig(certification.certificationType);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0 gap-0">
        {/* Header - 渐变背景 */}
        <div className={`relative bg-gradient-to-r ${config.gradient} px-6 py-8 text-center`}>
          {/* 关闭按钮 */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center 
                       bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* 大图标 */}
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full 
                          flex items-center justify-center shadow-lg">
            <ShieldCheck className={`w-8 h-8 ${config.iconColor}`} />
          </div>
          
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            {config.title}
          </DialogTitle>
          <p className="text-white/80">{config.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 验证状态 */}
          <div className={`flex items-center gap-3 p-4 rounded-xl border ${config.verifiedBg}`}>
            <div className={`w-10 h-10 ${config.verifiedIconBg} rounded-full flex 
                            items-center justify-center flex-shrink-0`}>
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`font-semibold ${config.verifiedTextColor}`}>
                {config.verifiedText}
              </p>
              <p className={`text-sm ${config.verifiedSubtextColor}`}>
                {config.verifiedSubtext}
              </p>
            </div>
          </div>

          {/* 酒店名称 */}
          <div className="text-center py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Hotel</p>
            <p className="font-semibold text-gray-900">{hotelName}</p>
          </div>

          {/* 能力列表 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">This hotel can:</h4>
            <ul className="space-y-3">
              {certificationFeatures.map((item) => (
                <li key={item.en} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex 
                                  items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{item.en}</p>
                    <p className="text-sm text-gray-500">{item.cn}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 重要提示 */}
          {certification.policeRegistration && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">
                    Important for your stay
                  </p>
                  <p className="text-sm text-amber-800 mt-1">
                    Upon arrival, your passport will be registered with local 
                    police within 24 hours as required by Chinese law. The hotel 
                    staff will assist you with this process.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 底部按钮 */}
          <Button 
            onClick={onClose}
            className="w-full py-3 h-auto bg-gray-900 hover:bg-gray-800 text-white 
                       font-semibold rounded-xl transition-colors"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 简化的资质说明（用于内联展示）
 */
interface InlineCertificationInfoProps {
  certification: CertificationConfig;
  className?: string;
}

export function InlineCertificationInfo({ 
  certification,
  className,
}: InlineCertificationInfoProps) {
  if (!certification.acceptsForeignGuests) {
    return (
      <div className={`p-3 bg-red-50 rounded-lg border border-red-100 ${className}`}>
        <p className="text-sm text-red-700">
          This hotel does not accept foreign guests.
        </p>
      </div>
    );
  }
  
  const isOfficial = certification.certificationType === 'official';
  const isVerified = certification.certificationType === 'verified';
  
  return (
    <div className={`p-3 ${isOfficial ? 'bg-blue-50 border-blue-100' : isVerified ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100'} rounded-lg border ${className}`}>
      <div className="flex items-center gap-2">
        <ShieldCheck className={`w-4 h-4 ${isOfficial ? 'text-blue-500' : isVerified ? 'text-emerald-500' : 'text-gray-500'}`} />
        <p className={`text-sm font-medium ${isOfficial ? 'text-blue-900' : isVerified ? 'text-emerald-900' : 'text-gray-900'}`}>
          {isOfficial ? 'Official Foreign Guest License' : isVerified ? 'Verified: Accepts Foreigners' : 'Foreign Guest OK'}
        </p>
      </div>
      {certification.policeRegistration && (
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Police registration service available
        </p>
      )}
    </div>
  );
}
