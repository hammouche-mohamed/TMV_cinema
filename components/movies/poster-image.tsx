'use client'

import { useState } from 'react'

type PosterImageProps = {
  src: string
  alt: string
  className?: string
  fallbackLabel?: string
  loading?: 'eager' | 'lazy'
}

export function PosterImage({ src, alt, className = '', fallbackLabel = 'TMV CINEMAS', loading = 'lazy' }: PosterImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span role="img" aria-label={alt} className={`poster-fallback ${className}`}><span className="font-heading max-w-[85%] text-center text-xs font-extrabold uppercase tracking-[.16em] text-white/55">{fallbackLabel}</span></span>
  return <img src={src} alt={alt} loading={loading} className={className} onError={() => setFailed(true)} />
}
