'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge/badge'
import { Button } from '@/components/ui/button/button'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useLanguage } from '@/contexts/language-context'
import styles from './pricing-section.module.css'

const CATEGORIES = ['Web Development', 'Brand Identity', 'UI/UX Design', 'Graphic Design', 'Social Media', 'Photo & Video'] as const
type Category = typeof CATEGORIES[number]

type PlanItem = {
  name: string
  priceLabelId?: string
  priceLabelEn?: string
  oldPrice?: string
  price: string
  periodId: string
  periodEn: string
  descriptionId: string
  descriptionEn: string
  featuresId: string[]
  featuresEn: string[]
  featured?: boolean
}

const PLANS_BY_CATEGORY: Record<Category, PlanItem[]> = {
  'Web Development': [
    {
      name: 'Starter',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp2.699.000',
      price: 'Rp998.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Ideal untuk bisnis kecil yang baru memulai kehadiran digital.',
      descriptionEn: 'Ideal for small businesses starting their digital presence.',
      featuresId: ['Landing page design', 'Mobile responsive', 'Basic SEO', '1x revisi', 'Delivery 7 hari'],
      featuresEn: ['Landing page design', 'Mobile responsive', 'Basic SEO', '1x revision', '7-day delivery'],
    },
    {
      name: 'Professional',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp9.899.000',
      price: 'Rp5.098.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Untuk bisnis yang berkembang dan butuh solusi digital lengkap.',
      descriptionEn: 'For growing businesses in need of complete digital solutions.',
      featuresId: ['Multi-page website', 'Custom UI/UX design', 'CMS integration', 'Advanced SEO', 'Analytics setup', '3x revisi'],
      featuresEn: ['Multi-page website', 'Custom UI/UX design', 'CMS integration', 'Advanced SEO', 'Analytics setup', '3x revisions'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      periodId: '',
      periodEn: '',
      descriptionId: 'Solusi terukur untuk brand yang sudah mapan dengan kebutuhan kompleks.',
      descriptionEn: 'Scalable solutions for established brands with complex needs.',
      featuresId: ['Full-stack development', 'Sistem terintegrasi', 'Dedicated team', 'Priority support', 'Maintenance', 'Unlimited revisi'],
      featuresEn: ['Full-stack development', 'Integrated systems', 'Dedicated team', 'Priority support', 'Maintenance', 'Unlimited revisions'],
    },
  ],
  'Brand Identity': [
    {
      name: 'Starter',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp1.198.000',
      price: 'Rp698.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Fondasi identitas visual untuk brand yang baru mulai.',
      descriptionEn: 'Visual identity foundation for new brands.',
      featuresId: ['Logo design', 'Color palette', 'Typography guide', '1x revisi', 'Delivery 5 hari'],
      featuresEn: ['Logo design', 'Color palette', 'Typography guide', '1x revision', '5-day delivery'],
    },
    {
      name: 'Professional',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp9.989.000',
      price: 'Rp5.098.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Identitas brand lengkap untuk kehadiran yang lebih matang.',
      descriptionEn: 'Complete brand identity for a mature presence.',
      featuresId: ['Logo & brand mark', 'Brand guideline lengkap', 'Business card & stationery', 'Social media kit', '3x revisi'],
      featuresEn: ['Logo & brand mark', 'Full brand guideline', 'Business card & stationery', 'Social media kit', '3x revisions'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      periodId: '',
      periodEn: '',
      descriptionId: 'Rebranding menyeluruh untuk organisasi berskala besar.',
      descriptionEn: 'Comprehensive rebranding for large-scale organizations.',
      featuresId: ['Brand strategy', 'Sistem identitas multi-platform', 'Brand book lengkap', 'Dedicated team', 'Unlimited revisi'],
      featuresEn: ['Brand strategy', 'Multi-platform identity system', 'Full brand book', 'Dedicated team', 'Unlimited revisions'],
    },
  ],
  'UI/UX Design': [
    {
      name: 'Starter',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp1.298.000',
      price: 'Rp498.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Desain antarmuka untuk produk digital skala kecil.',
      descriptionEn: 'Interface design for small-scale digital products.',
      featuresId: ['Wireframe', 'UI design (up to 10 screens)', 'Basic prototype', '1x revisi', 'Delivery 10 hari'],
      featuresEn: ['Wireframe', 'UI design (up to 10 screens)', 'Basic prototype', '1x revision', '10-day delivery'],
    },
    {
      name: 'Professional',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp12.898.000',
      price: 'Rp7.198.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Riset dan desain pengalaman pengguna secara menyeluruh.',
      descriptionEn: 'Comprehensive user research and experience design.',
      featuresId: ['User research', 'Wireframe & UI design lengkap', 'Interactive prototype', 'Design system', '3x revisi'],
      featuresEn: ['User research', 'Full wireframe & UI design', 'Interactive prototype', 'Design system', '3x revisions'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      periodId: '',
      periodEn: '',
      descriptionId: 'Desain produk kompleks dengan tim yang berdedikasi.',
      descriptionEn: 'Complex product design with a dedicated team.',
      featuresId: ['End-to-end product design', 'Usability testing', 'Design system skala besar', 'Dedicated team', 'Unlimited revisi'],
      featuresEn: ['End-to-end product design', 'Usability testing', 'Large-scale design system', 'Dedicated team', 'Unlimited revisions'],
    },
  ],
  'Graphic Design': [
    {
      name: 'Starter',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp119.000',
      price: 'Rp69.000',
      periodId: '/ paket',
      periodEn: '/ package',
      descriptionId: 'Materi visual untuk kebutuhan promosi sederhana.',
      descriptionEn: 'Visual materials for simple promotional needs.',
      featuresId: ['Social media assets (5 desain)', 'Basic banner/poster', '1x revisi', 'Delivery 3 hari'],
      featuresEn: ['Social media assets (5 designs)', 'Basic banner/poster', '1x revision', '3-day delivery'],
    },
    {
      name: 'Professional',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp3.188.000',
      price: 'Rp2.689.000',
      periodId: '/ paket',
      periodEn: '/ package',
      descriptionId: 'Paket materi visual untuk kampanye yang lebih luas.',
      descriptionEn: 'Visual material package for broader marketing campaigns.',
      featuresId: ['Social media assets (20 desain)', 'Marketing collateral', 'Presentation deck', 'Print-ready files', '3x revisi'],
      featuresEn: ['Social media assets (20 designs)', 'Marketing collateral', 'Presentation deck', 'Print-ready files', '3x revisions'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      periodId: '',
      periodEn: '',
      descriptionId: 'Dukungan desain berkelanjutan untuk kebutuhan skala besar.',
      descriptionEn: 'Ongoing design support for large-scale requirements.',
      featuresId: ['Monthly design retainer', 'Multi-channel campaign assets', 'Dedicated designer', 'Priority turnaround', 'Unlimited revisi'],
      featuresEn: ['Monthly design retainer', 'Multi-channel campaign assets', 'Dedicated designer', 'Priority turnaround', 'Unlimited revisions'],
    },
  ],
  'Social Media': [
    {
      name: 'Starter',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp3.299.000',
      price: 'Rp2.898.000',
      periodId: '/ bulan',
      periodEn: '/ month',
      descriptionId: 'Cocok untuk brand yang baru merintis kehadiran di media sosial.',
      descriptionEn: 'Great for brands just starting their social media presence.',
      featuresId: ['10 konten feed per bulan', 'Copywriting caption', 'Riset tagar dasar', 'Laporan performa bulanan', '1x revisi per konten'],
      featuresEn: ['10 feed posts per month', 'Caption copywriting', 'Basic hashtag research', 'Monthly performance report', '1x revision per post'],
    },
    {
      name: 'Professional',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp8.589.000',
      price: 'Rp7.499.000',
      periodId: '/ bulan',
      periodEn: '/ month',
      descriptionId: 'Untuk brand yang ingin serius bertumbuh dan aktif di media sosial.',
      descriptionEn: 'For brands ready to grow seriously and stay active on social.',
      featuresId: ['20 konten feed per bulan', '6 reels atau story motion', 'Kalender konten bulanan', 'Community management', 'Laporan analytics lengkap'],
      featuresEn: ['20 feed posts per month', '6 reels or motion stories', 'Monthly content calendar', 'Community management', 'Full analytics report'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      periodId: '',
      periodEn: '',
      descriptionId: 'Strategi menyeluruh multi platform dengan tim media sosial khusus.',
      descriptionEn: 'End to end multi platform strategy with a dedicated social team.',
      featuresId: ['Konten tanpa batas', 'Strategi multi platform', 'Ads campaign management', 'Tim social media dedicated', 'Priority support 24 jam'],
      featuresEn: ['Unlimited content output', 'Multi platform strategy', 'Ads campaign management', 'Dedicated social media team', '24 hour priority support'],
    },
  ],
  'Photo & Video': [
    {
      name: 'Starter',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp3.499.000',
      price: 'Rp2.989.000',
      periodId: '/ sesi',
      periodEn: '/ session',
      descriptionId: 'Sesi ringkas untuk kebutuhan foto produk atau konten sederhana.',
      descriptionEn: 'Compact session for product photography or simple content needs.',
      featuresId: ['Sesi foto 2 jam', '15 foto hasil editing', '1 video pendek 30 detik', 'Basic color grading', 'Delivery 5 hari'],
      featuresEn: ['2 hour photo session', '15 edited photos', 'One 30 second short video', 'Basic color grading', '5 day delivery'],
    },
    {
      name: 'Professional',
      priceLabelId: 'Mulai Dari',
      priceLabelEn: 'Starting From',
      oldPrice: 'Rp9.000.000',
      price: 'Rp7.799.000',
      periodId: '/ proyek',
      periodEn: '/ project',
      descriptionId: 'Paket produksi lengkap untuk brand campaign dan konten sosial media.',
      descriptionEn: 'Complete production package for brand campaigns and social content.',
      featuresId: ['Sesi produksi 1 hari', '40 foto hasil editing', '2 video reels sinematik', 'Konsep dan storyboard', 'Color grading premium'],
      featuresEn: ['One day production session', '40 edited photos', '2 cinematic reel videos', 'Concept and storyboard', 'Premium color grading'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      periodId: '',
      periodEn: '',
      descriptionId: 'Produksi berskala besar untuk campaign, event, atau company profile.',
      descriptionEn: 'Large scale production for campaigns, events, or company profiles.',
      featuresId: ['Multi day production', 'Tim kreatif dedicated', 'Video sinematik full frame', 'Behind the scenes coverage', 'Retainer bulanan opsional'],
      featuresEn: ['Multi day production', 'Dedicated creative team', 'Full frame cinematic video', 'Behind the scenes coverage', 'Optional monthly retainer'],
    },
  ],
}

export function PricingSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [category, setCategory] = useState<Category>('Web Development')
  const { lang, t } = useLanguage()
  const plans = PLANS_BY_CATEGORY[category]

  return (
    <section ref={ref} className={`reveal ${styles.section}`} id="pricing">
      <div className="container">
        <div className={styles.top}>
          <div>
            <Badge>{t.pricing.badge}</Badge>
            <h2 className={styles.heading}>{t.pricing.heading} <span className={styles.blue}>{t.pricing.headingBlue}</span></h2>
          </div>
          <div className={styles.filter}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`${styles.filterBtn} ${category === c ? styles.filterBtnActive : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {plans.map(plan => {
            const desc = lang === 'en' ? plan.descriptionEn : plan.descriptionId
            const period = lang === 'en' ? plan.periodEn : plan.periodId
            const features = lang === 'en' ? plan.featuresEn : plan.featuresId
            const priceLabel = lang === 'en' ? plan.priceLabelEn : plan.priceLabelId

            return (
              <div
                key={plan.name}
                className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
              >
                <p className={styles.planName}>{plan.name}</p>
                {priceLabel && <p className={styles.priceLabel}>{priceLabel}</p>}
                {plan.oldPrice && <p className={styles.oldPrice}>{plan.oldPrice}</p>}
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  {period && <span className={styles.period}>{period}</span>}
                </div>
                <p className={styles.desc}>{desc}</p>
                <hr className={styles.divider} />
                <ul className={styles.features}>
                  {features.map(f => (
                    <li key={f} className={styles.featureItem}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                        <path
                          d="M12.5 4L6 10.5L2.5 7"
                          stroke={plan.featured ? '#fff' : '#2FA8FA'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="/kontak" variant={plan.featured ? 'outline' : 'primary'} arrow>
                  {t.pricing.getStarted}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
