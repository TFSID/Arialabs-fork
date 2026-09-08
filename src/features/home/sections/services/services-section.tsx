'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge/badge'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useLanguage } from '@/contexts/language-context'
import styles from './services-section.module.css'

const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    descId: 'Website modern, cepat, dan scalable, dibangun dengan teknologi terkini untuk mendukung pertumbuhan bisnis digital Anda secara berkelanjutan.',
    descEn: 'Fast, modern, and scalable websites built with the latest tech to support your digital business growth sustainably.',
    image: '/assets/images/characters/aria-service/aria-web.webp',
    href: '/layanan/web-development',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    descId: 'Identitas visual yang kuat dan konsisten, dari logo hingga brand guideline yang mencerminkan nilai dan karakter unik bisnis Anda.',
    descEn: 'Strong and consistent visual identities, from logos to brand guidelines, that reflect your business\'s unique values and character.',
    image: '/assets/images/characters/aria-service/aria-brand.webp',
    href: '/layanan/brand-identity',
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design',
    descId: 'Desain antarmuka yang intuitif dan berpusat pada pengguna, menciptakan pengalaman digital yang nyaman, menarik, dan berdampak.',
    descEn: 'Intuitive, user-centered interface designs that create comfortable, engaging, and impactful digital experiences.',
    image: '/assets/images/characters/aria-service/aria-uiux.webp',
    href: '/layanan/uiux-design',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    descId: 'Konten visual yang memukau, dari poster dan banner hingga social media kit yang siap pakai dan meningkatkan engagement brand Anda.',
    descEn: 'Stunning visual content, from posters and banners to ready-to-use social media kits designed to boost your brand engagement.',
    image: '/assets/images/characters/aria-service/aria-graphic.webp',
    href: '/layanan/graphic-design',
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    descId: 'Pengelolaan akun media sosial Anda secara profesional, mulai dari strategi konten, desain visual, copywriter, hingga moderasi audiens.',
    descEn: 'Professional social media management, covering everything from content strategy, visual design, and copywriting to audience moderation.',
    image: '/assets/images/characters/aria-service/aria-sosmed.webp',
    href: '/layanan/social-media-management',
  },
  {
    id: 'photo-video',
    title: 'Photo & Video',
    descId: 'Produksi fotografi dan videografi profesional untuk produk, brand, event, hingga konten media sosial dengan hasil visual sinematik berkualitas tinggi.',
    descEn: 'Professional photography and videography production for products, brands, events, and social media content with cinematic, high quality visuals.',
    image: '/assets/images/characters/aria-service/aria-photo%26video.webp',
    href: '/layanan/photo-video',
  },
]

export function ServicesSection() {
  const [openId, setOpenId] = useState<string>('')
  const ref = useScrollReveal<HTMLElement>()
  const { lang, t } = useLanguage()

  return (
    <section ref={ref} className={`reveal ${styles.section}`}>
      <div className="container">
        <Badge>{t.services.badge}</Badge>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            What <span className={styles.blue}>{t.services.headingBlue}</span>
          </h2>
          <p className={styles.sub}>{t.services.sub}</p>
        </div>

        <div className={styles.list}>
          {/* scrolling background ticker, sits behind the rows */}
          <div className={styles.ticker} aria-hidden="true">
            <div className={styles.tickerTrack}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>ARIA LABS SERVICES</span>
              ))}
            </div>
          </div>

          {SERVICES.map(s => {
            const isOpen = openId === s.id
            const desc = lang === 'en' ? s.descEn : s.descId
            return (
              <div
                key={s.id}
                className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}
                onClick={() => setOpenId(isOpen ? '' : s.id)}
              >
                <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

                <div className={styles.rowMid}>
                  <div className={styles.rowBrand}>
                    <span className={`${styles.rowTitle} ${isOpen ? styles.rowTitleOpen : ''}`}>{s.title}</span>
                  </div>
                  {isOpen && (
                    <>
                      <p className={styles.rowDesc}>{desc}</p>
                      <Link
                        href={s.href}
                        className={styles.viewMore}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t.services.viewMore}
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                          <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </>
                  )}
                </div>

                <div className={styles.rowImage}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    quality={90}
                    className={styles.rowImg}
                    sizes="(max-width: 480px) 44vw, (max-width: 768px) 46vw, 350px"
                  />
                </div>

                <span className={styles.rowTrigger}>{isOpen ? t.services.close : t.services.open}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
