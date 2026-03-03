'use client'
import { Link } from "@/navigation"
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FileText, PartyPopper } from 'lucide-react'

export default function HotelRegisterPage() {
  const t = useTranslations()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    email: '',
    city: 'Beijing',
    address: '',
    licenseNo: '',
    hasElevator: false,
    hasWifi: false,
    hasWesternToilet: false,
    basePrice: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API integration
    console.log('Submitting:', formData)
    setStep(3) // Success
  }

  // City options with translation keys
  const cityOptions = [
    { value: 'Beijing', key: 'common.cities.beijing' },
    { value: 'Shanghai', key: 'common.cities.shanghai' },
    { value: 'Xi\'an', key: 'common.cities.xian' },
    { value: 'Chengdu', key: 'common.cities.chengdu' },
  ]

  // Facility options
  const facilityOptions = [
    { key: 'hasElevator', labelKey: 'partner.register.form.facilities.elevator', descKey: 'partner.register.form.facilities.elevatorDesc' },
    { key: 'hasWifi', labelKey: 'partner.register.form.facilities.wifi', descKey: 'partner.register.form.facilities.wifiDesc' },
    { key: 'hasWesternToilet', labelKey: 'partner.register.form.facilities.westernToilet', descKey: 'partner.register.form.facilities.toiletDesc' },
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('partner.register.title', { defaultValue: 'List Your Property' })}</h1>
          <p className="text-muted-foreground">
            {t('partner.register.subtitle', { defaultValue: 'Join our platform and reach international travelers' })}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              }`}>
                {s}
              </div>
              {s < 3 && <div className="w-16 h-0.5 bg-border mx-2" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('partner.register.steps.basicInfo.title', { defaultValue: 'Basic Information' })}</CardTitle>
              <CardDescription>{t('partner.register.steps.basicInfo.description', { defaultValue: 'Tell us about your property' })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t('partner.register.form.hotelNameZh', { defaultValue: 'Hotel Name (Chinese)' })}</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('partner.register.form.hotelNameZhPlaceholder', { defaultValue: 'e.g., 胡同里精品酒店' })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('partner.register.form.hotelNameEn', { defaultValue: 'Hotel Name (English)' })}</label>
                <Input
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder={t('partner.register.form.hotelNameEnPlaceholder', { defaultValue: 'e.g., Hutong Boutique Hotel' })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('partner.register.form.contactEmail', { defaultValue: 'Contact Email' })}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('partner.register.form.emailPlaceholder', { defaultValue: 'manager@hotel.com' })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('partner.register.form.city', { defaultValue: 'City' })}</label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    {cityOptions.map((city) => (
                      <option key={city.value} value={city.value}>
                        {t(city.key, { defaultValue: city.value })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('partner.register.form.basePrice', { defaultValue: 'Base Price (CNY)' })}</label>
                  <Input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    placeholder={t('partner.register.form.pricePlaceholder', { defaultValue: '450' })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('partner.register.form.fullAddress', { defaultValue: 'Full Address' })}</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="北京市东城区..."
                />
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>
                {t('common.continue', { defaultValue: 'Continue' })}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('partner.register.steps.license.title', { defaultValue: 'License & Facilities' })}</CardTitle>
              <CardDescription>{t('partner.register.steps.license.description', { defaultValue: 'Required for foreign guest accommodation' })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('partner.register.form.licenseNo', { defaultValue: 'Special Industry License No.' })}
                  <Badge variant="secondary" className="ml-2">{t('common.validation.required', { defaultValue: 'Required' })}</Badge>
                </label>
                <Input
                  value={formData.licenseNo}
                  onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                  placeholder={t('partner.register.form.licenseNoPlaceholder', { defaultValue: '京特旅字第20240001号' })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('partner.register.form.licenseNoHelper', { defaultValue: '特种行业许可证号 - Required for hosting foreign guests' })}
                </p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-2"><FileText className="w-8 h-8 text-muted-foreground" /></div>
                <p className="text-sm font-medium">{t('partner.register.form.uploadLicense', { defaultValue: 'Upload License Photo' })}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('partner.register.form.uploadHelp', { defaultValue: 'JPG, PNG or PDF. Max 10MB.' })}
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  {t('common.actions.selectFile', { defaultValue: 'Select File' })}
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">{t('partner.register.form.facilities.title', { defaultValue: 'Facilities' })}</label>
                <div className="space-y-3">
                  {facilityOptions.map((item) => (
                    <label key={item.key} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50">
                      <input
                        type="checkbox"
                        checked={formData[item.key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium">{t(item.labelKey, { defaultValue: item.key.replace('has', '') })}</p>
                        <p className="text-xs text-muted-foreground">{t(item.descKey, { defaultValue: '' })}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  {t('common.back', { defaultValue: 'Back' })}
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  {t('partner.register.actions.submit', { defaultValue: 'Submit Application' })}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="text-center py-12">
            <div className="flex justify-center mb-4"><PartyPopper className="w-16 h-16 text-green-500" /></div>
            <CardTitle className="text-2xl mb-2">{t('partner.register.success.title', { defaultValue: 'Application Submitted!' })}</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              {t('partner.register.success.message', { defaultValue: "We'll review your license and property details within 2 business days. You'll receive an email notification once approved." })}
            </CardDescription>
            <div className="mt-6">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                {t('common.actions.backToHome', { defaultValue: 'Back to Home' })}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
