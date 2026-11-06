import {MotionConfig, motion, useReducedMotion} from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Layers,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import {Component, Suspense, lazy, useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode} from 'react';

import {drawPage, type PageContent} from './three/pageArt';

/**
 * The WebGL demo is the only heavy dependency on the page, so it ships as its
 * own chunk and is only fetched once the product sheet is actually in view.
 */
const PageCurl = lazy(() => import('./three/PageCurl'));

type Language = 'tr' | 'en';
type Theme = 'gunduz' | 'gece';
type LocalizedString = Record<Language, string>;

type Experience = {
  title: LocalizedString;
  company: string;
  date: LocalizedString;
  location?: LocalizedString;
  description: LocalizedString;
  /** The role held today; it is marked active. */
  current?: boolean;
};

/** 'live' is reachable by anyone; 'building' is real but not yet publicly deployed. */
type ProductStatus = 'live' | 'building';

type Shot = {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
};

type Product = {
  title: string;
  kicker: LocalizedString;
  description: LocalizedString;
  status: ProductStatus;
  year: string;
  /** Short, checkable facts — no usage numbers, only what the build itself proves. */
  facts: LocalizedString[];
  tech: string[];
  highlights: LocalizedString[];
  liveUrl?: string;
  shots?: Shot[];
};

type ArchiveProject = {
  title: LocalizedString;
  date?: string;
  tech: string[];
  description: LocalizedString;
  links: {label: string; url: string}[];
};

type SkillGroup = {
  title: LocalizedString;
  items: string[];
};

const CONTACT = {
  email: 'anil.karabulut.dev@gmail.com',
  phone: '+90 505 818 71 62',
  github: 'https://github.com/anilkrblt',
  linkedin: 'https://linkedin.com/in/anilkarabulut',
};

/** The CV is served per language so a recruiter always gets the one they can read. */
const CV_URL: Record<Language, string> = {
  tr: '/ANIL_KARABULUT_CV.pdf',
  en: '/ANIL_KARABULUT_CV_ENG.pdf',
};

const COPY = {
  tr: {
    metaTitle: 'Anıl Karabulut | Full-stack Yazılım Mühendisi',
    metaDescription:
      'Fikirden üretim dağıtımına kadar uçtan uca full-stack ürünler geliştiren yazılım mühendisi Anıl Karabulut.',
    skip: 'Ana içeriğe geç',
    navLabel: 'Ana menü',
    nav: {
      products: 'Ürünler',
      process: 'Yöntem',
      skills: 'Yetkinlik',
      experience: 'Deneyim',
      archive: 'Arşiv',
      contact: 'İletişim',
    },
    menu: 'Menü',
    menuClose: 'Kapat',
    languageLabel: 'Dil seçimi',
    themeLabel: 'Tema seçimi',
    themes: {gunduz: 'Gündüz', gece: 'Gece'},
    hero: {
      role: 'Full-stack Yazılım Mühendisi',
      title: 'Fikirden canlı ürüne, uçtan uca.',
      subtitle:
        'Kullanıcı deneyiminden backend mimarisine, otomasyondan üretim dağıtımına kadar ürünün tamamını geliştiriyorum.',
      summary:
        'Spring Boot, Python/FastAPI, Node.js, React ve React Native ekosistemlerinde; güvenilir, ölçülebilir ve gerçek kullanıcıya ulaşan yazılımlar üretiyorum.',
      primaryCta: 'Canlı ürünü incele',
      cvCta: 'CV indir (PDF)',
      secondaryCta: 'GitHub profili',
      location: 'Edirne, Türkiye',
      status: 'Uzaktan ve hibrit çalışmaya açık',
      portraitAlt: 'Anıl Karabulut, beyaz bir duvarın önünde',
      closing: 'Tanışmaktan memnuniyet duyarım.',
      regards: 'Saygılarımla,',
      enclosures: 'Ekler',
      enclosure: 'Ek',
    },
    facts: {
      status: 'Durum',
      location: 'Konum',
      languages: 'Diller',
      file: 'Özet',
    },
    stats: [
      {value: '10', label: 'ürün ve proje'},
      {value: '01', label: 'yayındaki ürün'},
      {value: '03', label: 'otonom döngüyle geliştirilen ürün'},
    ],
    sections: {
      products: 'Ürün vitrini',
      productsLead: 'Yayına alınan ve ürünleşme odağıyla geliştirilen güncel çalışmalar.',
      process: 'Çalışma yöntemi',
      skills: 'Yetkinlik alanları',
      experience: 'İş deneyimi',
      archive: 'Proje arşivi',
      archiveLead: 'Daha önce geliştirdiğim seçili web, mobil ve yapay zekâ projeleri.',
      education: 'Eğitim',
      languages: 'Diller',
    },
    product: {
      live: 'Yayında',
      building: 'Geliştiriliyor',
      visit: 'Canlı siteyi aç',
      highlights: 'Öne çıkanlar',
      stack: 'Teknoloji',
      facts: 'Künye',
      preview: 'Ekran görüntüleri',
      shotHint: 'Tam boyut için tıklayın.',
      year: 'Yıl',
      address: 'Adres',
      status: 'Durum',
    },
    demo: {
      label: 'Düzen korumalı çeviri',
      page: 'Örnek belge · 03 / 12',
      original: 'Kaynak · EN',
      translated: 'Çeviri · TR',
      sourceTitle: 'Quarterly performance',
      targetTitle: 'Çeyreklik performans',
      sourceFootnote: 'Annual report · 2025',
      targetFootnote: 'Yıllık rapor · 2025',
      sourceLede: 'Revenue rose in all four quarters, and the strongest gain was recorded in the second quarter.',
      targetLede: 'Gelir dört çeyreğin tamamında yükseldi; en güçlü artış ikinci çeyrekte kaydedildi.',
      sourceCaption: 'FIG. 1 — QUARTERLY REVENUE',
      targetCaption: 'ŞEKİL 1 — ÇEYREKLİK GELİR',
      sourceUnits: ['Q1', 'Q2', 'Q3', 'Q4'],
      targetUnits: ['Ç1', 'Ç2', 'Ç3', 'Ç4'],
      folio: '03 / 12',
      preserved: 'Düzen korundu',
      report: 'Sayfa bazlı rapor',
      hint: 'Sayfayı sürükleyin',
      peel: 'Çeviriyi göster',
      restore: 'Kaynağa dön',
      description:
        'Kaynak sayfa kıvrılarak kalkıyor ve altındaki boş sayfaya çeviri satır satır yazılıyor: başlık, paragraf düzeni, grafik ve sayfa numarası aynı yerde kalıyor, yalnızca dil değişiyor.',
    },
    process: {
      eyebrow: 'AI destekli otonom geliştirme döngüsü',
      body: 'Ürün geliştirme akışını makine tarafından doğrulanabilir kabul kriterleriyle başlatıyorum. Kritik davranışları donmuş golden testlerle sabitliyor; derleme, test ve kalite kontrollerini otomatik kapılardan geçiriyorum. Ürün ve mimari kararları belirlenmiş insan onay noktalarında netleşiyor. TranslateYourPDF, EAA Monitor ve Randevai bu yöntemle geliştirildi.',
      steps: [
        {title: 'Doğrulanabilir kriterler', note: 'Kabul koşulları makine tarafından okunabilir biçimde yazılır.'},
        {title: 'Golden testler', note: 'Kritik davranış dondurulur, regresyon sessizce geçemez.'},
        {title: 'Otomatik kalite kapıları', note: 'Derleme, test ve statik analiz zorunlu geçiş noktasıdır.'},
        {title: 'İnsan onayı', note: 'Ürün ve mimari kararlar belirlenmiş noktalarda onaylanır.'},
      ],
      matrixTitle: 'Döngü pratikte',
      matrixLead: 'Her üründe kapıyı tutan somut mekanizma:',
      matrix: [
        {
          product: 'TranslateYourPDF',
          gate: 'Dondurulmuş PDF fixture’ları; sayfa bazlı çıktı farkı ve font/ToUnicode korunumu kontrol edilir.',
        },
        {
          product: 'EAA Monitor',
          gate: 'Playwright + axe-core taraması dondurulmuş fixture sitesinde koşar; rapor çıktısı beklenenle karşılaştırılır.',
        },
        {
          product: 'Randevai',
          gate: 'Testcontainers ile gerçek PostgreSQL/pgvector üzerinde entegrasyon testleri; bilgi bankası dışı yanıt üretimi engellenir.',
        },
        {
          product: 'Bu portföy',
          gate: 'GitHub Actions üzerinde her push ve PR’da tsc --noEmit ve üretim derlemesi koşar.',
        },
      ],
    },
    experience: {
      current: 'Aktif',
    },
    contactLabels: {
      email: 'E-posta',
      phone: 'Telefon',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cv: 'Özgeçmiş',
      cvValue: 'PDF indir',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      copyAria: 'E-posta adresini kopyala',
    },
    education: {
      school: 'Trakya Üniversitesi',
      degree: 'Bilgisayar Mühendisliği Lisans Eğitimi',
      location: 'Edirne, Türkiye',
      date: '09/2021 – 06/2025',
      gpa: 'GNO 3.21',
    },
    languages: [
      {name: 'Türkçe', level: 'Anadil'},
      {name: 'İngilizce', level: 'C1 Seviye'},
    ],
    footerNote: 'React, TypeScript ve Tailwind ile kuruldu. Yazı: Spectral ve Hanken Grotesk.',
    footer: 'Tüm hakları saklıdır.',
  },
  en: {
    metaTitle: 'Anıl Karabulut | Full-stack Software Engineer',
    metaDescription:
      'Software engineer Anıl Karabulut builds and ships end-to-end full-stack products from idea to production.',
    skip: 'Skip to main content',
    navLabel: 'Main navigation',
    nav: {
      products: 'Products',
      process: 'Process',
      skills: 'Skills',
      experience: 'Experience',
      archive: 'Archive',
      contact: 'Contact',
    },
    menu: 'Menu',
    menuClose: 'Close',
    languageLabel: 'Language selector',
    themeLabel: 'Theme selector',
    themes: {gunduz: 'Day', gece: 'Night'},
    hero: {
      role: 'Full-stack Software Engineer',
      title: 'From idea to live product, end to end.',
      subtitle:
        'I build the complete product—from user experience and backend architecture to automation and production deployment.',
      summary:
        'I create reliable, measurable software that reaches real users across Spring Boot, Python/FastAPI, Node.js, React, and React Native ecosystems.',
      primaryCta: 'Explore the live product',
      cvCta: 'Download CV (PDF)',
      secondaryCta: 'GitHub profile',
      location: 'Edirne, Türkiye',
      status: 'Open to remote and hybrid work',
      portraitAlt: 'Anıl Karabulut in front of a white wall',
      closing: 'I would be glad to hear from you.',
      regards: 'Sincerely,',
      enclosures: 'Enclosures',
      enclosure: 'Encl.',
    },
    facts: {
      status: 'Status',
      location: 'Location',
      languages: 'Languages',
      file: 'In short',
    },
    stats: [
      {value: '10', label: 'products and projects'},
      {value: '01', label: 'product live in production'},
      {value: '03', label: 'products built with the autonomous loop'},
    ],
    sections: {
      products: 'Product showcase',
      productsLead: 'Recent work shipped or developed with a product-first focus.',
      process: 'How I work',
      skills: 'Skill areas',
      experience: 'Work experience',
      archive: 'Project archive',
      archiveLead: 'Selected web, mobile, and AI projects from earlier work.',
      education: 'Education',
      languages: 'Languages',
    },
    product: {
      live: 'Live',
      building: 'In development',
      visit: 'Visit live site',
      highlights: 'Highlights',
      stack: 'Stack',
      facts: 'At a glance',
      preview: 'Screenshots',
      shotHint: 'Click for full size.',
      year: 'Year',
      address: 'Address',
      status: 'Status',
    },
    demo: {
      label: 'Layout-preserving translation',
      page: 'Sample document · 03 / 12',
      original: 'Source · EN',
      translated: 'Translation · TR',
      sourceTitle: 'Quarterly performance',
      targetTitle: 'Çeyreklik performans',
      sourceFootnote: 'Annual report · 2025',
      targetFootnote: 'Yıllık rapor · 2025',
      sourceLede: 'Revenue rose in all four quarters, and the strongest gain was recorded in the second quarter.',
      targetLede: 'Gelir dört çeyreğin tamamında yükseldi; en güçlü artış ikinci çeyrekte kaydedildi.',
      sourceCaption: 'FIG. 1 — QUARTERLY REVENUE',
      targetCaption: 'ŞEKİL 1 — ÇEYREKLİK GELİR',
      sourceUnits: ['Q1', 'Q2', 'Q3', 'Q4'],
      targetUnits: ['Ç1', 'Ç2', 'Ç3', 'Ç4'],
      folio: '03 / 12',
      preserved: 'Layout preserved',
      report: 'Page-level report',
      hint: 'Drag the sheet',
      peel: 'Show the translation',
      restore: 'Back to the source',
      description:
        'The source page peels away and the translation is written onto the sheet beneath it line by line: heading, paragraph measure, figure, and folio all stay in place — only the language changes.',
    },
    process: {
      eyebrow: 'AI-assisted autonomous development loop',
      body: 'I begin product development with acceptance criteria that machines can verify. Critical behavior is locked with frozen golden tests, while builds, tests, and quality checks pass through automated gates. Product and architecture decisions are resolved at defined human approval points. TranslateYourPDF, EAA Monitor, and Randevai were all developed with this method.',
      steps: [
        {title: 'Verifiable criteria', note: 'Acceptance conditions are written so a machine can read them.'},
        {title: 'Golden tests', note: 'Critical behavior is frozen; regressions cannot slip through quietly.'},
        {title: 'Automated quality gates', note: 'Build, test, and static analysis are mandatory checkpoints.'},
        {title: 'Human approval', note: 'Product and architecture calls are signed off at defined points.'},
      ],
      matrixTitle: 'The loop in practice',
      matrixLead: 'The concrete mechanism holding the gate on each product:',
      matrix: [
        {
          product: 'TranslateYourPDF',
          gate: 'Frozen PDF fixtures; page-level output diffing and font/ToUnicode preservation are checked.',
        },
        {
          product: 'EAA Monitor',
          gate: 'Playwright + axe-core scans run against a frozen fixture site; the report output is compared to the expected one.',
        },
        {
          product: 'Randevai',
          gate: 'Testcontainers integration tests on real PostgreSQL/pgvector; answers outside the knowledge base are blocked.',
        },
        {
          product: 'This portfolio',
          gate: 'tsc --noEmit and a production build run on GitHub Actions for every push and pull request.',
        },
      ],
    },
    experience: {
      current: 'Active',
    },
    contactLabels: {
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cv: 'Résumé',
      cvValue: 'Download PDF',
      copy: 'Copy',
      copied: 'Copied',
      copyAria: 'Copy the email address',
    },
    education: {
      school: 'Trakya University',
      degree: 'BSc in Computer Engineering',
      location: 'Edirne, Türkiye',
      date: '09/2021 – 06/2025',
      gpa: 'GPA 3.21',
    },
    languages: [
      {name: 'Turkish', level: 'Native'},
      {name: 'English', level: 'C1'},
    ],
    footerNote: 'Built with React, TypeScript and Tailwind. Set in Spectral and Hanken Grotesk.',
    footer: 'All rights reserved.',
  },
} as const;

type Copy = (typeof COPY)[Language];

const PRODUCTS: Product[] = [
  {
    title: 'TranslateYourPDF',
    kicker: {
      tr: 'Düzen koruyan AI PDF çeviri ve belge araçları',
      en: 'Layout-preserving AI PDF translation and document tools',
    },
    description: {
      tr: 'Belgenin görünümünü koruyarak çeviri yapan ve sekiz farklı belge işleme aracını tek akışta sunan üretim platformu.',
      en: 'A production platform that translates documents while preserving their visual structure and brings eight document-processing tools into one workflow.',
    },
    status: 'live',
    year: '2026',
    facts: [
      {tr: 'Tek akışta sekiz belge işleme aracı', en: 'Eight document-processing tools in one workflow'},
      {tr: 'TR / EN arayüz ve üç temalı tasarım sistemi', en: 'TR / EN interface and a three-theme design system'},
      {tr: 'Hetzner üzerinde Docker + Caddy ile self-host', en: 'Self-hosted on Hetzner with Docker + Caddy'},
    ],
    tech: [
      'Python / FastAPI',
      'PyMuPDF',
      'Next.js 15',
      'TypeScript',
      'Tailwind',
      'Docker',
      'Caddy',
      'SQLite',
      'DeepSeek API',
      'Tesseract OCR',
    ],
    highlights: [
      {
        tr: 'Font subset ve ToUnicode verisini koruyan yeniden yerleştirmeyle orijinal sayfa düzenine sadık çeviri',
        en: 'Translation faithful to the original page layout through re-placement that preserves font subsets and ToUnicode data',
      },
      {
        tr: 'Sayfa bazlı hata raporlama, kısmi sonuç ve taranmış belgeler için OCR desteği',
        en: 'Page-level error reporting, partial results, and OCR support for scanned documents',
      },
      {
        tr: 'Magic-link kimlik doğrulama, kredi sistemi, TR/EN arayüz ve yönetim paneli',
        en: 'Magic-link authentication, credit system, TR/EN interface, and an administration panel',
      },
      {
        tr: 'Üç temalı tasarım sistemi ve Hetzner üzerinde Docker + Caddy üretim dağıtımı',
        en: 'Three-theme design system and Docker + Caddy production deployment on Hetzner',
      },
    ],
    liveUrl: 'https://translateyourpdf.com',
  },
  {
    title: 'EAA Monitor',
    kicker: {
      tr: 'AB Erişilebilirlik Yasası uyum izleme SaaS’ı',
      en: 'European Accessibility Act compliance monitoring SaaS',
    },
    description: {
      tr: 'Dijital ürünleri düzenli olarak tarayan, bulguları standartlarla eşleyen ve uyum çıktıları üreten erişilebilirlik izleme platformu.',
      en: 'An accessibility monitoring platform that scans digital products regularly, maps findings to standards, and produces compliance outputs.',
    },
    status: 'building',
    year: '2026',
    facts: [
      {tr: 'WCAG 2.1 A/AA ve EN 301 549 kural eşlemesi', en: 'WCAG 2.1 A/AA and EN 301 549 rule mapping'},
      {tr: 'DE / FR / EN beyan taslağı ve PDF uyum raporu', en: 'DE / FR / EN statement drafts and PDF compliance reports'},
      {
        tr: 'Rapor üretimi dondurulmuş fixture taramasıyla doğrulanır',
        en: 'Report generation is verified against a frozen fixture scan',
      },
    ],
    shots: [
      {
        src: '/eaa1.png',
        alt: {
          tr: 'EAA Monitor açılış sayfası ve müşteri portföyü özeti',
          en: 'EAA Monitor landing page with the client portfolio summary',
        },
        caption: {tr: 'Ajans portföyü ve izleme durumu', en: 'Agency portfolio and monitoring status'},
      },
      {
        src: '/eaa2.png',
        alt: {
          tr: 'EAA Monitor tarafından üretilen erişilebilirlik izleme raporu',
          en: 'Accessibility monitoring report generated by EAA Monitor',
        },
        caption: {tr: 'Fixture taramasından üretilen PDF rapor', en: 'PDF report generated from a fixture scan'},
      },
    ],
    tech: ['Next.js 15', 'Node.js Worker', 'Playwright', 'axe-core', 'PostgreSQL', 'Drizzle', 'pg-boss', 'Docker'],
    highlights: [
      {tr: 'Otomatik erişilebilirlik taraması ve WCAG 2.1 / EN 301 549 eşlemesi', en: 'Automated accessibility scans with WCAG 2.1 / EN 301 549 mapping'},
      {tr: 'PDF uyum raporu ve çok dilli erişilebilirlik beyanı üretimi', en: 'PDF compliance reports and multilingual accessibility statement generation'},
      {tr: 'Zamanlanmış izleme ve değişiklik odaklı uyarılar', en: 'Scheduled monitoring and change-aware alerts'},
    ],
  },
  {
    title: 'Randevai',
    kicker: {
      tr: 'WhatsApp tabanlı AI randevu asistanı',
      en: 'WhatsApp-based AI appointment assistant',
    },
    description: {
      tr: 'İşletme bilgisini anlayan, müşterilerle doğal dilde görüşen ve randevu operasyonunu uçtan uca yöneten çok kiracılı asistan.',
      en: 'A multi-tenant assistant that understands business knowledge, talks to customers naturally, and handles appointment operations end to end.',
    },
    status: 'building',
    year: '2026',
    facts: [
      {
        tr: 'Çok kiracılı: her işletme kendi bilgi bankasıyla izole',
        en: 'Multi-tenant: each business isolated with its own knowledge base',
      },
      {
        tr: 'Bilgi bankası dışında yanıt üretmez, konuşmayı insana devreder',
        en: 'Never answers outside the knowledge base; hands the conversation to a human',
      },
      {
        tr: 'Java 25 / Spring Boot 4 servis, Baileys ile WhatsApp katmanı',
        en: 'Java 25 / Spring Boot 4 service with a Baileys WhatsApp layer',
      },
    ],
    shots: [
      {
        src: '/randevai1.png',
        alt: {
          tr: 'Randevai açılış sayfası ve günün operasyon masası önizlemesi',
          en: 'Randevai landing page with a preview of the daily operations desk',
        },
        caption: {tr: 'Operasyon masası ve karşılama akışı', en: 'Operations desk and intake flow'},
      },
      {
        src: '/randevai2.png',
        alt: {
          tr: 'Randevai asistan konuşması ve insana devir uyarısı',
          en: 'Randevai assistant conversation with the human handoff notice',
        },
        caption: {tr: 'Asistan konuşması ve insana devir anı', en: 'Assistant conversation and the handoff moment'},
      },
    ],
    tech: ['Spring Boot 4', 'Java 25', 'Next.js 16', 'Node.js / Baileys', 'PostgreSQL', 'pgvector', 'OpenAI', 'Testcontainers'],
    highlights: [
      {tr: 'İşletme bilgi bankası için RAG ve OpenAI function calling', en: 'RAG for the business knowledge base and OpenAI function calling'},
      {tr: 'Otomatik randevu oluşturma, çakışma kontrolü ve insana devir', en: 'Automated appointment creation, conflict checks, and human handoff'},
      {tr: 'Multi-tenant izolasyon ve KVKK uyumlu veri silme akışı', en: 'Multi-tenant isolation and KVKK-compliant data deletion'},
    ],
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: {tr: 'Backend', en: 'Backend'},
    items: ['Spring Boot', 'Python / FastAPI', '.NET Core', 'Node.js', 'Go', 'REST API', 'JWT'],
  },
  {
    title: {tr: 'Frontend & Otomasyon', en: 'Frontend & Automation'},
    items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Playwright', 'axe-core'],
  },
  {
    title: {tr: 'Veri & Belge', en: 'Data & Documents'},
    items: ['PostgreSQL', 'pgvector', 'Drizzle', 'SQLite', 'PyMuPDF', 'Tesseract OCR'],
  },
  {
    title: {tr: 'Dağıtım & Mimari', en: 'Delivery & Architecture'},
    items: ['Docker', 'Caddy', 'Kubernetes', 'Testcontainers', 'Clean Architecture', 'RAG'],
  },
];

const EXPERIENCES: Experience[] = [
  {
    title: {tr: 'Mobil Uygulama Geliştirici', en: 'Mobile Application Developer'},
    company: 'Extreme BS',
    date: {tr: '02/2026 – Günümüz', en: '02/2026 – Present'},
    location: {tr: 'Uzaktan', en: 'Remote'},
    description: {
      tr: 'React Native ve Expo ile ERP odaklı mobil ekranlar geliştiriyor, servis entegrasyonlarını ve uygulama akışlarını ürün ihtiyaçlarına göre düzenliyorum.',
      en: 'Building ERP-focused mobile screens with React Native and Expo, while shaping service integrations and app flows around product needs.',
    },
    current: true,
  },
  {
    title: {tr: 'Stajyer Yazılım Geliştirici', en: 'Software Developer Intern'},
    company: 'iQuality',
    date: {tr: '10/2025 – 11/2025', en: '10/2025 – 11/2025'},
    description: {
      tr: 'Spring Boot 3 ile JWT korumalı CRM REST API geliştirdim; PostgreSQL şeması, Flyway migrasyonları, Docker ortamı, ReDoc dokümantasyonu ve Railway dağıtımı hazırladım.',
      en: 'Developed a JWT-secured CRM REST API with Spring Boot 3, including PostgreSQL schema design, Flyway migrations, Docker setup, ReDoc documentation, and Railway deployment.',
    },
  },
  {
    title: {tr: 'Stajyer Mobil Geliştirici', en: 'Mobile Developer Intern'},
    company: 'Extreme BS',
    date: {tr: '08/2025 – 09/2025', en: '08/2025 – 09/2025'},
    description: {
      tr: 'React Native ve TypeScript ile canlı servisleri kullanan mobil uygulama ekranları geliştirdim; Metro, Jest, ESLint, Prettier, Babel ve TypeScript yapılandırmalarında çalıştım.',
      en: 'Built React Native and TypeScript mobile screens on top of live services, and worked with Metro, Jest, ESLint, Prettier, Babel, and TypeScript configuration.',
    },
  },
];

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: {tr: 'React Log Agent', en: 'React Log Agent'},
    date: '2026',
    tech: ['TypeScript', 'React', 'React Native', 'WebSocket'],
    description: {
      tr: 'Web ve mobil uygulama telemetrisini gizlilik odaklı maskeleme ve opt-in runtime ile yerel terminal panelinde birleştiren geliştirici aracı.',
      en: 'A developer tool that unifies web and mobile app telemetry in a local terminal dashboard with privacy-focused redaction and an opt-in runtime.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/dev-logger'}],
  },
  {
    title: {tr: 'Halı Saha Otomasyon Sistemi', en: 'Football Field Automation System'},
    date: '2025',
    tech: ['ASP.NET Core', 'React Native', 'MySQL', 'SignalR'],
    description: {
      tr: 'Saha yönetimi, çevrim içi rezervasyon, takım oluşturma ve gerçek zamanlı sosyal akışları bir araya getiren platform.',
      en: 'A platform combining field management, online reservations, team creation, and real-time social flows.',
    },
    links: [
      {label: 'Backend', url: 'https://github.com/anilkrblt/HalisahaOtomasyonBackend'},
      {label: 'Frontend', url: 'https://github.com/sametakisik/OnlineHalisaham'},
    ],
  },
  {
    title: {tr: 'İnsan ve Hayvan Tespiti', en: 'Human and Animal Detection'},
    date: '2025',
    tech: ['Python', 'OpenCV', 'PyTorch', 'YOLOv8'],
    description: {
      tr: 'İnsanları ve 80 hayvan sınıfını görsellerde tanıyıp konumlandıran, YOLOv8 ve SSD300 tabanlı nesne tespit sistemi.',
      en: 'A YOLOv8 and SSD300-based object detection system that recognizes and localizes humans and 80 animal classes.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/animal_detection'}],
  },
  {
    title: {tr: 'Soru Bankası Sistemi', en: 'Question Bank System'},
    date: '2024',
    tech: ['Node.js', 'Express', 'React', 'MySQL', 'JWT'],
    description: {
      tr: 'Soru çözme, grup sınavları, sonuç analizi ve yönetim paneli akışlarını içeren eğitim platformu.',
      en: 'An education platform for solving questions, group exams, result analysis, and administration workflows.',
    },
    links: [
      {label: 'Backend', url: 'https://github.com/anilkrblt/sorubankasi-backend'},
      {label: 'Frontend', url: 'https://github.com/anilkrblt/sorubankasi-frontend'},
    ],
  },
  {
    title: {tr: 'Derslik & Laboratuvar Yönetimi', en: 'Classroom & Laboratory Management'},
    tech: ['ASP.NET Core', 'React', 'MySQL', 'Clean Architecture'],
    description: {
      tr: 'Eğitim kurumları için sınıf, ders planlama, arıza ve şikâyet süreçlerini yöneten rol tabanlı modüler platform.',
      en: 'A role-based modular platform for education teams to manage classrooms, schedules, incidents, and complaints.',
    },
    links: [
      {label: 'Backend', url: 'https://github.com/anilkrblt/classroom_management_backend'},
      {label: 'Frontend', url: 'https://github.com/anilkrblt/class_management_client'},
    ],
  },
  {
    title: {tr: 'Kitap Öneri Sistemi', en: 'Book Recommendation System'},
    date: '2025',
    tech: ['Python', 'PyTorch', 'Deep Learning'],
    description: {
      tr: 'Book-Crossing veri setinde embedding kullanan, 46M+ parametreli MLP modeliyle 0.34 doğrulama RMSE’sine ulaşan sistem.',
      en: 'A Book-Crossing recommendation system using embeddings, reaching 0.34 validation RMSE with a 46M+ parameter MLP.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/book_recommandation_system'}],
  },
  {
    title: {tr: 'Musica Müzik Uygulaması', en: 'Musica Music App'},
    date: '2023',
    tech: ['Flutter', 'Dart', 'Firebase'],
    description: {
      tr: 'Hesap, çalma listesi, favoriler ve profil yönetimi içeren responsive mobil müzik uygulaması.',
      en: 'A responsive mobile music app with account, playlist, favorites, and profile management.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/musica'}],
  },
];

const LANGUAGE_OPTIONS: {value: Language; label: string}[] = [
  {value: 'tr', label: 'TR'},
  {value: 'en', label: 'EN'},
];

const THEME_OPTIONS: Theme[] = ['gunduz', 'gece'];

const THEME_COLOR: Record<Theme, string> = {gunduz: '#4a1f28', gece: '#1e1226'};

/** Masthead links and the sections they open; the hero is tracked but has no link. */
const NAV_TARGETS = {
  products: 'products',
  process: 'process',
  skills: 'skills',
  experience: 'experience',
  archive: 'archive',
  contact: 'contact',
} as const;
type NavKey = keyof typeof NAV_TARGETS;
const NAV_KEYS = Object.keys(NAV_TARGETS) as NavKey[];
const TRACKED_SECTIONS = ['top', ...Object.values(NAV_TARGETS)];

/** Unhurried, then still: the way a sheet settles on a desk. */
const layEase = [0.22, 1, 0.36, 1] as const;

/** Newest first; the undated project closes the list. */
const ARCHIVE_BY_DATE = [...ARCHIVE_PROJECTS].sort((a, b) => Number(b.date ?? 0) - Number(a.date ?? 0));

/** After the products, the enclosed sections in the order they follow. */
const SECTION_ENCLOSURES = ['process', 'skills', 'experience', 'archive'] as const;

/** A sheet laid on the desk: a small settle, never a fade, so the page is always readable. */
const lay = {
  hidden: {y: 24, rotate: -0.3},
  visible: {y: 0, rotate: 0, transition: {duration: 0.9, ease: layEase}},
};

/** A section's number in the enclosure index, which the product sheets open. */
function enclosureOf(key: (typeof SECTION_ENCLOSURES)[number], copy: Copy) {
  return `${copy.hero.enclosure} ${PRODUCTS.length + SECTION_ENCLOSURES.indexOf(key) + 2}`;
}

function localize(value: LocalizedString, language: Language) {
  return value[language];
}

/** Anchor ids for the product sheets, derived from their names. */
function sheetId(product: Product) {
  return product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/** The demo document, front (source) and back (translation), in the reader's chrome. */
function demoPages(demo: Copy['demo']): {front: PageContent; back: PageContent} {
  return {
    front: {
      label: demo.original,
      title: demo.sourceTitle,
      lede: demo.sourceLede,
      caption: demo.sourceCaption,
      units: demo.sourceUnits,
      footnote: demo.sourceFootnote,
      page: demo.folio,
      variant: 'source',
    },
    back: {
      label: demo.translated,
      title: demo.targetTitle,
      lede: demo.targetLede,
      caption: demo.targetCaption,
      units: demo.targetUnits,
      footnote: demo.targetFootnote,
      page: demo.folio,
      variant: 'target',
    },
  };
}

function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}

/** Which section is under the middle of the viewport, for the masthead's current link. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      {rootMargin: '-45% 0px -50% 0px'},
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('tr');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'gunduz';
    return document.documentElement.dataset.theme === 'gece' ? 'gece' : 'gunduz';
  });
  const copy = COPY[language];
  const active = useActiveSection(TRACKED_SECTIONS);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('ak_theme', theme);
    } catch {
      /* storage unavailable — the in-memory theme still applies */
    }
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = THEME_COLOR[theme];
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.metaTitle;

    const updateMeta = (selector: string, value: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = value;
    };

    updateMeta('meta[name="description"]', copy.metaDescription);
    updateMeta('meta[property="og:title"]', copy.metaTitle);
    updateMeta('meta[property="og:description"]', copy.metaDescription);
    updateMeta('meta[name="twitter:title"]', copy.metaTitle);
    updateMeta('meta[name="twitter:description"]', copy.metaDescription);
  }, [copy.metaDescription, copy.metaTitle, language]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-stock">
        <a
          href="#main-content"
          className="btn fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0"
        >
          {copy.skip}
        </a>

        <Masthead
          copy={copy}
          language={language}
          theme={theme}
          active={active}
          onLanguageChange={setLanguage}
          onThemeChange={setTheme}
        />

        <main id="main-content">
          <Letter copy={copy} language={language} />

          <section id="products" className="desk">
            <SectionHead title={copy.sections.products} lead={copy.sections.productsLead} enclosure={`${copy.hero.enclosure} 2–${PRODUCTS.length + 1}`} />
            <div className="grid grid-cols-[minmax(0,1fr)] gap-5 md:gap-8">
              {PRODUCTS.map((product) => (
                <ProductSheet key={product.title} product={product} language={language} copy={copy} theme={theme} />
              ))}
            </div>
          </section>

          <Process copy={copy} />

          <section id="skills" className="desk">
            <SectionHead title={copy.sections.skills} enclosure={enclosureOf('skills', copy)} />
            <Sheet>
              <div className="rows">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.title.en} className="row grid gap-2 py-5 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-8">
                    <h3 className="form m-0 text-[1rem] font-semibold text-ink">
                      {localize(group.title, language)}
                    </h3>
                    <p className="form m-0 flex flex-wrap gap-y-1 text-small text-body">
                      {group.items.map((item) => (
                        <span key={item} className="term">
                          {item}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </Sheet>
          </section>

          <section id="experience" className="desk">
            <SectionHead title={copy.sections.experience} enclosure={enclosureOf('experience', copy)} />
            <Sheet>
              <div className="rows">
                {EXPERIENCES.map((experience) => (
                  <article
                    key={`${experience.company}-${experience.date.en}`}
                    className="row grid gap-3 py-7 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8"
                  >
                    <p className="form m-0 text-small">
                      <span className="block font-semibold text-ink">{localize(experience.date, language)}</span>
                      {experience.location && (
                        <span className="block text-muted">{localize(experience.location, language)}</span>
                      )}
                    </p>
                    <div>
                      <h3 className="subhead m-0">{localize(experience.title, language)}</h3>
                      <p className="form m-0 mt-1 text-small font-semibold text-muted">{experience.company}</p>
                      <p className="m-0 mt-3 max-w-[66ch] text-pretty">{localize(experience.description, language)}</p>
                    </div>
                    <div className="md:pt-1.5">
                      {experience.current && <span className="status status-live">{copy.experience.current}</span>}
                    </div>
                  </article>
                ))}
              </div>
            </Sheet>
          </section>

          <section id="archive" className="desk">
            <SectionHead
              title={copy.sections.archive}
              lead={copy.sections.archiveLead}
              enclosure={enclosureOf('archive', copy)}
            />
            <Sheet>
              <div className="rows">
                {ARCHIVE_BY_DATE.map((project) => (
                  <article
                    key={project.title.en}
                    className="row grid gap-3 py-6 md:grid-cols-[5rem_minmax(0,1fr)_10rem] md:items-baseline md:gap-6"
                  >
                    <span className="form text-small font-semibold text-muted">{project.date ?? '—'}</span>
                    <div>
                      <h3 className="subhead m-0">{localize(project.title, language)}</h3>
                      <p className="m-0 mt-2 max-w-[66ch] text-pretty">{localize(project.description, language)}</p>
                      <p className="form m-0 mt-3 flex flex-wrap gap-y-1 text-small text-muted">
                        {project.tech.map((tech) => (
                          <span key={tech} className="term">
                            {tech}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                      {project.links.map((link) => (
                        <a
                          key={`${project.title.en}-${link.label}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="form link inline-flex items-center gap-1.5 text-small font-semibold text-ink"
                          aria-label={`${localize(project.title, language)} — ${link.label}`}
                        >
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Sheet>
          </section>
        </main>

        <Contact copy={copy} language={language} />
      </div>
    </MotionConfig>
  );
}

/** Language and theme. Language first: a visitor who cannot read Turkish must find EN before anything else. */
function Switches({
  copy,
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}: {
  copy: Copy;
  language: Language;
  theme: Theme;
  onLanguageChange: (value: Language) => void;
  onThemeChange: (value: Theme) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="switch" role="group" aria-label={copy.languageLabel}>
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onLanguageChange(option.value)}
            aria-pressed={language === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="switch" role="group" aria-label={copy.themeLabel}>
        {THEME_OPTIONS.map((option) => (
          <button key={option} type="button" onClick={() => onThemeChange(option)} aria-pressed={theme === option}>
            {copy.themes[option]}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * The masthead: the name, the six sections, the switches and the CV, laid
 * along the top edge of the page at every scroll depth. On a phone the links
 * and switches fold into a menu; the CV stays out.
 */
function Masthead({
  copy,
  language,
  theme,
  active,
  onLanguageChange,
  onThemeChange,
}: {
  copy: Copy;
  language: Language;
  theme: Theme;
  active: string;
  onLanguageChange: (value: Language) => void;
  onThemeChange: (value: Theme) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = (className: string) =>
    NAV_KEYS.map((key) => (
      <li key={key}>
        <a
          href={`#${NAV_TARGETS[key]}`}
          className={className}
          aria-current={active === NAV_TARGETS[key] ? 'true' : undefined}
          onClick={() => setOpen(false)}
        >
          {copy.nav[key]}
        </a>
      </li>
    ));

  const switches = (
    <Switches
      copy={copy}
      language={language}
      theme={theme}
      onLanguageChange={onLanguageChange}
      onThemeChange={onThemeChange}
    />
  );

  return (
    <header className="masthead on-stock">
      <div className="desk flex h-16 items-center justify-between gap-6">
        <a href="#top" className="min-w-0 truncate text-[1.25rem] font-normal text-on-stock">
          Anıl Karabulut
        </a>

        <nav aria-label={copy.navLabel} className="hidden xl:block">
          <ul className="m-0 flex list-none items-center gap-6 p-0">{links('navlink')}</ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">{switches}</div>
          <a
            href={CV_URL[language]}
            download
            className="btn btn-paper min-h-[2.5rem] px-4 text-small"
            aria-label={copy.hero.cvCta}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            CV
          </a>
          <button
            type="button"
            className="btn btn-ghost min-h-[2.5rem] px-3.5 text-small xl:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            <span className="max-[419px]:sr-only">{open ? copy.menuClose : copy.menu}</span>
          </button>
        </div>
      </div>

      <div id="site-menu" hidden={!open} className="border-t border-stock-rule xl:hidden">
        <div className="desk grid gap-6 pb-7 pt-5">
          <nav aria-label={copy.navLabel}>
            <ul className="m-0 grid list-none gap-1 p-0 sm:grid-cols-2">
              {links('navlink w-full')}
            </ul>
          </nav>
          <div className="lg:hidden">{switches}</div>
        </div>
      </div>
    </header>
  );
}

/**
 * A sheet of the letter. It is laid on the desk once as it scrolls in, always
 * visible, and it holds the watermark: where the pointer is, the sheet is held
 * up to the light.
 */
function Sheet({children, className = ''}: {children: ReactNode; className?: string}) {
  const markRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    const mark = markRef.current;
    if (!mark || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    mark.style.setProperty('--mx', `${event.clientX - box.left}px`);
    mark.style.setProperty('--my', `${event.clientY - box.top}px`);
    setLit(true);
  };

  return (
    <motion.div
      className={`sheet ${className}`}
      variants={lay}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-40px'}}
      onPointerMove={follow}
      onPointerLeave={() => setLit(false)}
    >
      <div ref={markRef} className="watermark" data-lit={lit ? 'true' : 'false'} aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none" stroke="currentColor">
          <circle cx="200" cy="200" r="192" strokeWidth="3" />
          <circle cx="200" cy="200" r="178" strokeWidth="1" />
          <text
            x="200"
            y="262"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="Spectral, Georgia, serif"
            fontSize="176"
            fontWeight="300"
          >
            AK
          </text>
        </svg>
      </div>
      {children}
    </motion.div>
  );
}

/** The close of the letter: the typed name under the regards. */
function Signature({copy, className = ''}: {copy: Copy; className?: string}) {
  return (
    <p className={`signature m-0 ${className}`}>
      <span className="block">{copy.hero.regards}</span>
      <span className="signature-name block">Anıl Karabulut</span>
    </p>
  );
}

/**
 * The paperclip, in its two halves: the outer loop runs behind the print and
 * the inner loop lies on top of it, so the photograph is really held.
 */
function Paperclip({half}: {half: 'back' | 'front'}) {
  return <img className={`clip clip-${half}`} src={`/clip-${half}.png`} alt="" width={66} height={198} aria-hidden="true" />;
}

/**
 * The first sheet is the letter itself: place and date, the name, the
 * introduction and the closing, the photograph clipped on, and the index of
 * what is enclosed. The CV is Enclosure 1 and stays the solid action.
 */
function Letter({copy, language}: {copy: Copy; language: Language}) {
  const today = useMemo(
    () =>
      new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    [language],
  );

  return (
    <section id="top" className="desk pt-3 md:pt-8">
      <Sheet>
        <div className="letter">
          <div className="flex items-center gap-5" style={{gridArea: 'head'}}>
            <motion.img
              src="/monogram.png"
              alt=""
              width={64}
              height={64}
              className="monogram"
              initial={{scale: 1.08}}
              animate={{scale: 1}}
              transition={{duration: 0.7, delay: 0.25, ease: layEase}}
            />
            <p className="form m-0 text-small text-muted">
              {copy.hero.location}
              <br />
              {today}
            </p>
          </div>

          <div style={{gridArea: 'name'}}>
            <h1 className="display m-0">Anıl Karabulut</h1>
            <p className="sentence m-0 mt-3">{copy.hero.title}</p>
          </div>

          <div className="clipped" style={{gridArea: 'photo'}}>
            <Paperclip half="back" />
            <div className="print">
              <img src="/profile.jpg" alt={copy.hero.portraitAlt} width={1056} height={1408} decoding="async" />
            </div>
            <Paperclip half="front" />
          </div>

          <div style={{gridArea: 'body'}}>
            <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <span className="form font-semibold text-ink">{copy.hero.role}</span>
              <span className="status status-live">{copy.hero.status}</span>
            </p>
            <p className="lede m-0 mt-4 max-w-[58ch]">{copy.hero.subtitle}</p>
            <p className="m-0 mt-3 max-w-[58ch] text-pretty text-muted">{copy.hero.summary}</p>
            <p className="m-0 mt-4 max-w-[58ch]">{copy.hero.closing}</p>
            <Signature copy={copy} className="mt-4" />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={CV_URL[language]} download className="btn">
                <Download className="h-4 w-4" aria-hidden="true" />
                {copy.hero.cvCta}
              </a>
              <a href="https://translateyourpdf.com" target="_blank" rel="noreferrer" className="btn btn-ghost">
                {copy.hero.primaryCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="form link mt-4 inline-flex items-center gap-2 text-small font-semibold text-ink"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {copy.hero.secondaryCta}
            </a>
          </div>

          <div style={{gridArea: 'list'}}>
            <h2 className="label m-0 pb-2">{copy.hero.enclosures}</h2>
            <div className="rows">
              <a href={CV_URL[language]} download className="enclosure">
                <span className="text-muted">{copy.hero.enclosure} 1</span>
                <span>{copy.contactLabels.cv}</span>
                <Download className="h-3.5 w-3.5 self-center" aria-hidden="true" />
              </a>
              {PRODUCTS.map((product, index) => (
                <a key={product.title} href={`#${sheetId(product)}`} className="enclosure">
                  <span className="text-muted">
                    {copy.hero.enclosure} {index + 2}
                  </span>
                  <span>{product.title}</span>
                  <StatusMark product={product} copy={copy} />
                </a>
              ))}
              {SECTION_ENCLOSURES.map((key, index) => (
                <a key={key} href={`#${key}`} className="enclosure">
                  <span className="text-muted">
                    {copy.hero.enclosure} {PRODUCTS.length + index + 2}
                  </span>
                  <span>{copy.sections[key]}</span>
                  <ArrowDown className="h-3.5 w-3.5 self-center" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Sheet>
    </section>
  );
}

/** A section's title on the desk, its enclosure number to the right. */
function SectionHead({title, lead, enclosure}: {title: string; lead?: string; enclosure: string}) {
  return (
    <div className="section-head on-stock">
      <h2 className="headline m-0">{title}</h2>
      <span className="enclosure-mark">{enclosure}</span>
      {lead && <p className="section-lead m-0">{lead}</p>}
    </div>
  );
}

function StatusMark({product, copy}: {product: Product; copy: Copy}) {
  const live = product.status === 'live';
  return (
    <span className={`status ${live ? 'status-live' : 'status-building'}`}>
      {live ? copy.product.live : copy.product.building}
    </span>
  );
}

/** One product, one enclosed sheet: name and status, the record, the evidence beside it. */
function ProductSheet({
  product,
  language,
  copy,
  theme,
}: {
  product: Product;
  language: Language;
  copy: Copy;
  theme: Theme;
}) {
  const live = product.status === 'live';
  return (
    <article id={sheetId(product)} className="scroll-mt-24">
      <Sheet>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-rule pb-5">
        <h3 className="sheet-title m-0">
          {product.title}
        </h3>
        <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2">
          <StatusMark product={product} copy={copy} />
          <span className="form text-small font-semibold text-muted">{product.year}</span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <p className="sentence m-0 text-[1.25rem]">{localize(product.kicker, language)}</p>
          <p className="lede m-0 mt-4 max-w-[60ch]">{localize(product.description, language)}</p>

          <h4 className="label m-0 mt-9">{copy.product.facts}</h4>
          <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
            {product.facts.map((fact) => (
              <li key={fact.en} className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-2.5 leading-7">
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 bg-ink" />
                {localize(fact, language)}
              </li>
            ))}
          </ul>

          <h4 className="label m-0 mt-9">{copy.product.highlights}</h4>
          <ul className="rows m-0 mt-3 list-none p-0">
            {product.highlights.map((highlight) => (
              <li key={highlight.en} className="row py-3 leading-7">
                {localize(highlight, language)}
              </li>
            ))}
          </ul>

          <h4 className="label m-0 mt-9">{copy.product.stack}</h4>
          <p className="form m-0 mt-3 flex flex-wrap gap-y-1 text-small text-body">
            {product.tech.map((tech) => (
              <span key={tech} className="term">
                {tech}
              </span>
            ))}
          </p>

          {product.liveUrl && (
            <a href={product.liveUrl} target="_blank" rel="noreferrer" className={`btn mt-10 ${live ? '' : 'btn-ghost'}`}>
              {copy.product.visit}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        {live ? (
          <DocumentDemo demo={copy.demo} theme={theme} />
        ) : (
          product.shots &&
          product.shots.length > 0 && (
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="label m-0">{copy.product.preview}</h4>
                <span className="form text-small text-muted">{copy.product.shotHint}</span>
              </div>
              <div className="mt-4 grid gap-7">
                {product.shots.map((shot) => (
                  <Plate key={shot.src} shot={shot} language={language} title={product.title} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
      </Sheet>
    </article>
  );
}

function Plate({shot, language, title}: {shot: Shot; language: Language; title: string}) {
  return (
    <figure className="m-0">
      <a
        href={shot.src}
        target="_blank"
        rel="noreferrer"
        className="plate"
        aria-label={`${title} — ${localize(shot.caption, language)}`}
      >
        <img src={shot.src} alt={localize(shot.alt, language)} loading="lazy" decoding="async" />
      </a>
      <figcaption className="form mt-2.5 text-small text-muted">{localize(shot.caption, language)}</figcaption>
    </figure>
  );
}

/** The before/after spread: what the demo falls back to, and what it starts as. */
function DemoSpread({demo}: {demo: Copy['demo']}) {
  const pages = useMemo(() => demoPages(demo), [demo]);
  return (
    <div className="grid flex-1 items-center gap-4 py-8 sm:grid-cols-[1fr_auto_1fr]">
      <DemoSheet content={pages.front} alt={`${demo.original} — ${demo.sourceTitle}`} />
      <ArrowUpRight className="mx-auto h-5 w-5 rotate-135 text-on-stock sm:rotate-45" aria-hidden="true" />
      <DemoSheet content={pages.back} alt={`${demo.translated} — ${demo.targetTitle}`} />
    </div>
  );
}

/**
 * A failed chunk fetch or a WebGL context that dies on creation must cost the
 * demo, never the page: the flat spread carries the same meaning.
 */
class SceneBoundary extends Component<{fallback: ReactNode; children: ReactNode}, {failed: boolean}> {
  state = {failed: false};

  static getDerivedStateFromError() {
    return {failed: true};
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * The demo is the product's claim made touchable: the source sheet peels back
 * and the translated sheet under it carries the same measure, the same figure,
 * the same folio. WebGL is an enhancement — without it (or with reduced motion
 * asked for) the flat before/after spread makes the same point.
 */
function DocumentDemo({demo, theme}: {demo: Copy['demo']; theme: Theme}) {
  const reducedMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [peeled, setPeeled] = useState(false);

  const hasWebGL = useMemo(() => {
    try {
      const probe = document.createElement('canvas');
      return Boolean(probe.getContext('webgl2') ?? probe.getContext('webgl'));
    } catch {
      return false;
    }
  }, []);

  const interactive = hasWebGL && !reducedMotion;

  useEffect(() => {
    const node = hostRef.current;
    if (!node || !interactive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setInView(true);
      },
      {rootMargin: '160px'},
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [interactive]);

  useEffect(() => {
    if (!inView) return;
    // Peel once on arrival: the point should land without demanding a gesture.
    const timer = window.setTimeout(() => setPeeled(true), 900);
    return () => window.clearTimeout(timer);
  }, [inView]);

  const pages = useMemo(() => demoPages(demo), [demo]);

  const resting = (
    <div className="flex h-full items-center justify-center">
      <DemoSheet content={pages.front} alt="" />
    </div>
  );

  return (
    <div
      ref={hostRef}
      className="projection on-stock flex min-h-[520px] flex-col justify-between p-5 sm:p-7 lg:self-start"
      aria-label={demo.label}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-stock-rule pb-3">
        <span className="label whitespace-nowrap">{demo.label}</span>
        <span className="label whitespace-nowrap">{demo.page}</span>
      </div>

      {interactive ? (
        <>
          <p className="sr-only">{demo.description}</p>
          <div className="-mx-5 h-[460px] py-2 sm:-mx-7 sm:h-[600px]" aria-hidden="true">
            {inView ? (
              <SceneBoundary fallback={<DemoSpread demo={demo} />}>
                <Suspense fallback={resting}>
                  <PageCurl
                    peeled={peeled}
                    onPeeledChange={setPeeled}
                    front={pages.front}
                    back={pages.back}
                    dim={theme === 'gece' ? 0.86 : 1}
                  />
                </Suspense>
              </SceneBoundary>
            ) : (
              resting
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <span className="label">{demo.hint}</span>
            <button
              type="button"
              onClick={() => setPeeled((value) => !value)}
              className="btn btn-ghost min-h-[2.5rem] px-4 text-small"
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
              {peeled ? demo.restore : demo.peel}
            </button>
          </div>
        </>
      ) : (
        <DemoSpread demo={demo} />
      )}

      <div className="grid gap-2 border-t border-stock-rule pt-4 text-small sm:grid-cols-2">
        <span className="form inline-flex items-center gap-2 font-semibold text-on-stock">
          <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
          {demo.preserved}
        </span>
        <span className="form inline-flex items-center gap-2 text-on-stock-muted sm:justify-end">
          <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
          {demo.report}
        </span>
      </div>
    </div>
  );
}

/** A page of the demo document, printed by the same drawing the WebGL sheets carry. */
function DemoSheet({content, alt}: {content: PageContent; alt: string}) {
  const fontsReady = useFontsReady();
  const src = useMemo(() => {
    void fontsReady;
    return drawPage(content).toDataURL('image/png');
  }, [content, fontsReady]);
  return <img src={src} alt={alt} className="mx-auto block aspect-[3/4] w-full max-w-[200px]" />;
}

/** The method as one numbered row, then the mechanism that holds it on each product. */
function Process({copy}: {copy: Copy}) {
  return (
    <section id="process" className="desk">
      <SectionHead title={copy.sections.process} enclosure={enclosureOf('process', copy)} />
      <Sheet>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <h3 className="subhead m-0">{copy.process.eyebrow}</h3>
          <p className="m-0 max-w-[66ch] text-pretty">{copy.process.body}</p>
        </div>

        <ol className="steps mt-12">
          {copy.process.steps.map((step) => (
            <li key={step.title} className="step">
              <p className="form m-0 font-semibold text-ink">{step.title}</p>
              <p className="m-0 mt-1 text-small text-muted">{step.note}</p>
            </li>
          ))}
        </ol>

        {/* The claim above is abstract; these rows are where it becomes checkable. */}
        <div className="mt-16">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="subhead m-0">{copy.process.matrixTitle}</h3>
            <p className="m-0 text-muted">{copy.process.matrixLead}</p>
          </div>

          <dl className="rows m-0 mt-5">
            {copy.process.matrix.map((row) => {
              const product = PRODUCTS.find((item) => item.title === row.product);
              // The portfolio itself is the page being read, so it is live by definition.
              const live = !product || product.status === 'live';
              return (
                <div
                  key={row.product}
                  className="row grid gap-2 py-4 md:grid-cols-[14rem_minmax(0,1fr)_9.5rem] md:items-baseline md:gap-8"
                >
                  <dt className="form font-semibold text-ink">
                    {product ? (
                      <a href={`#${sheetId(product)}`} className="link">
                        {row.product}
                      </a>
                    ) : (
                      row.product
                    )}
                  </dt>
                  <dd className="m-0 text-body">{row.gate}</dd>
                  <dd className="m-0 md:justify-self-end">
                    <span className={`status ${live ? 'status-live' : 'status-building'}`}>
                      {live ? copy.product.live : copy.product.building}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Sheet>
    </section>
  );
}

function Contact({copy, language}: {copy: Copy; language: Language}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const links = [
    {label: copy.contactLabels.phone, value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`},
    {label: copy.contactLabels.linkedin, value: 'in/anilkarabulut', href: CONTACT.linkedin},
    {label: copy.contactLabels.github, value: 'anilkrblt', href: CONTACT.github},
    {label: copy.contactLabels.cv, value: copy.contactLabels.cvValue, href: CV_URL[language], download: true},
  ];

  return (
    <footer id="contact" className="stock on-stock">
      <div className="desk pb-12 pt-24 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="headline m-0 text-on-stock">{copy.nav.contact}</h2>
            <p className="sentence m-0 mt-5 text-on-stock">{copy.hero.closing}</p>
            <p className="m-0 mt-3">
              <span className="status status-live">{copy.hero.status}</span>
            </p>
            <p className="m-0 mt-4 flex items-center gap-2 text-on-stock-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {copy.hero.location}
            </p>

            <div className="mt-10 border-t border-on-stock">
              <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-stock-rule py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto]">
                <span className="label">{copy.contactLabels.email}</span>
                <a href={`mailto:${CONTACT.email}`} className="form link break-words font-semibold text-on-stock">
                  {CONTACT.email.split('@')[0]}@<wbr />
                  {CONTACT.email.split('@')[1]}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copy.contactLabels.copyAria}
                  className="btn btn-ghost col-start-2 min-h-[2.25rem] justify-self-start px-3.5 text-micro sm:col-start-auto"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span aria-live="polite">{copied ? copy.contactLabels.copied : copy.contactLabels.copy}</span>
                </button>
              </div>

              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  download={item.download ? true : undefined}
                  className="group grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-stock-rule py-4 transition-colors hover:bg-stock-2"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <span className="label">{item.label}</span>
                  <span className="form truncate font-semibold text-on-stock">{item.value}</span>
                  {item.download ? (
                    <Download className="h-4 w-4 text-on-stock-muted" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight
                      className="h-4 w-4 text-on-stock-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-12">
            <div>
              <h3 className="label m-0">{copy.sections.education}</h3>
              <div className="mt-4 border-t border-on-stock pt-4">
                <p className="subhead m-0 text-on-stock">{copy.education.school}</p>
                <p className="m-0 mt-1.5 text-on-stock">{copy.education.degree}</p>
                <p className="form m-0 mt-3 text-small text-on-stock-muted">
                  {copy.education.date} · {copy.education.location} · {copy.education.gpa}
                </p>
              </div>
            </div>

            <div>
              <h3 className="label m-0">{copy.sections.languages}</h3>
              <dl className="m-0 mt-4 border-t border-on-stock">
                {copy.languages.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between border-b border-stock-rule py-3">
                    <dt className="form font-semibold text-on-stock">{item.name}</dt>
                    <dd className="m-0 text-small text-on-stock-muted">{item.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <Signature copy={copy} className="mt-16 text-on-stock" />

        <div className="form mt-10 flex flex-col gap-3 border-t border-stock-rule pt-6 text-small text-on-stock-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            © {new Date().getFullYear()} Anıl Karabulut. {copy.footer}
          </p>
          <p className="m-0">{copy.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
