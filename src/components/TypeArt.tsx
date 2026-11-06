import { useState } from 'react'
import { useLocale } from '../i18n'
import { typeArtUrl } from './Ball'

export function TypeArt({
  code,
  className = '',
  alt,
}: {
  code: string
  className?: string
  alt?: string
}) {
  const { locale } = useLocale()
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-green/10 ${className}`}
        aria-label={alt ?? code}
      >
        <span className="font-display text-[2.5rem] text-green/40">{code}</span>
      </div>
    )
  }

  return (
    <img
      src={typeArtUrl(code)}
      alt={alt ?? (locale === 'zh' ? `${code} 类型插图` : `${code} illustration`)}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
