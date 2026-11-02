import {MotionConfig, motion, useReducedMotion} from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Database,
  Download,
  ExternalLink,
  Github,
  Layers,
  MapPin,
  Menu,
  Server,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import {Component, Suspense, lazy, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject} from 'react';

import {
  addDrop,
  bloom,
  displace,
  paint,
  pourStrip,
  readColors,
  refine,
  rng,
  stroke,
  type Guard,
  type Shape,
  type StripMotif,
} from './ebru/marbling';
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
  icon: typeof Server;
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
    metaTitle: 'Anıl Karabulut | Full-stack Ürün Geliştirici',
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
      combHint: 'Tekneyi sürükleyerek tarayın, dokunarak boya damlatın.'
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
    archive: {
      stamp: 'Arşivlendi',
    },
    ebru: {
      motifs: {gelgit: 'Gelgit', tarakli: 'Taraklı', battal: 'Battal'},
      computed: 'tarayıcıda hesaplanan ebru',
      seed: 'tohum',
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
    footerNote: 'React, TypeScript ve Tailwind ile kuruldu. Ebru desenleri tarayıcıda hesaplanır. Yazı: Bricolage Grotesque.',
    footer: 'Tüm hakları saklıdır.',
  },
  en: {
    metaTitle: 'Anıl Karabulut | Full-stack Product Engineer',
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
      combHint: 'Drag across the bath to comb it; tap to drop pigment.'
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
    archive: {
      stamp: 'Archived',
    },
    ebru: {
      motifs: {gelgit: 'Gel-git', tarakli: 'Combed', battal: 'Battal stones'},
      computed: 'marbling computed in the browser',
      seed: 'seed',
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
    footerNote: 'Built with React, TypeScript and Tailwind. The marbling is computed in the browser. Set in Bricolage Grotesque.',
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
    icon: Server,
    items: ['Spring Boot', 'Python / FastAPI', '.NET Core', 'Node.js', 'Go', 'REST API', 'JWT'],
  },
  {
    title: {tr: 'Frontend & Otomasyon', en: 'Frontend & Automation'},
    icon: Smartphone,
    items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Playwright', 'axe-core'],
  },
  {
    title: {tr: 'Veri & Belge', en: 'Data & Documents'},
    icon: Database,
    items: ['PostgreSQL', 'pgvector', 'Drizzle', 'SQLite', 'PyMuPDF', 'Tesseract OCR'],
  },
  {
    title: {tr: 'Dağıtım & Mimari', en: 'Delivery & Architecture'},
    icon: ShieldCheck,
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

const THEME_COLOR: Record<Theme, string> = {gunduz: '#eef0ed', gece: '#0b1024'};

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

/** Each sheet's head is a different gesture over the same pigments. */
const SHEET_MOTIF: StripMotif[] = ['gelgit', 'tarakli', 'battal'];

/** The motif set is numbered, so every pattern on the page names its unit. */
const MOTIF_NUMBER: Record<StripMotif, string> = {gelgit: '01', tarakli: '02', battal: '03'};

/** Fast out, then still: the way pigment spreads on the size. */
const spreadEase = [0.16, 1, 0.3, 1] as const;

/** A sheet pulled up out of the bath: its marbled head is revealed top to bottom, once. */
const pull = {
  hidden: {clipPath: 'inset(0% 0% 100% 0%)'},
  visible: {clipPath: 'inset(0% 0% 0% 0%)', transition: {duration: 0.95, ease: spreadEase}},
};

const reveal = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: {once: true, margin: '-80px'},
};

function localize(value: LocalizedString, language: Language) {
  return value[language];
}

function pad(index: number) {
  return String(index).padStart(2, '0');
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
      <div className="min-h-screen overflow-x-clip bg-canvas">
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
          <Hero copy={copy} language={language} theme={theme} />

          <section id="products" className="shell band">
            <SectionHead title={copy.sections.products} lead={copy.sections.productsLead} />
            <div className="grid gap-24 md:gap-32">
              {PRODUCTS.map((product, index) => (
                <ProductSheet
                  key={product.title}
                  product={product}
                  motif={SHEET_MOTIF[index % SHEET_MOTIF.length]}
                  seed={index + 3}
                  language={language}
                  copy={copy}
                  theme={theme}
                />
              ))}
            </div>
          </section>

          <Process copy={copy} theme={theme} />

          <section id="skills" className="shell band">
            <SectionHead
              title={copy.sections.skills}
              seal={<MotifSeal motif="tarakli" seed={22} copy={copy} theme={theme} />}
            />
            <div className="rows">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title.en} className="row grid gap-3 py-6 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-8">
                  <h3 className="m-0 flex items-center gap-3 text-[1.0625rem] font-bold text-ink">
                    <group.icon className="h-[1.1rem] w-[1.1rem] shrink-0 text-muted" aria-hidden="true" />
                    {localize(group.title, language)}
                  </h3>
                  <p className="m-0 flex flex-wrap gap-y-1 text-body">
                    {group.items.map((item) => (
                      <span key={item} className="term">
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="shell band pt-0 md:pt-0">
            <SectionHead
              title={copy.sections.experience}
              seal={<MotifSeal motif="battal" seed={23} copy={copy} theme={theme} />}
            />
            <div className="rows">
              {EXPERIENCES.map((experience) => (
                <article
                  key={`${experience.company}-${experience.date.en}`}
                  className="row grid gap-3 py-8 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8"
                >
                  <p className="m-0 text-small">
                    <span className="block font-semibold text-ink">{localize(experience.date, language)}</span>
                    {experience.location && (
                      <span className="block text-muted">{localize(experience.location, language)}</span>
                    )}
                  </p>
                  <div>
                    <h3 className="subhead m-0">{localize(experience.title, language)}</h3>
                    <p className="m-0 mt-1 font-semibold text-muted">{experience.company}</p>
                    <p className="m-0 mt-3 max-w-[66ch] text-pretty">{localize(experience.description, language)}</p>
                  </div>
                  <div className="md:pt-1.5">
                    {experience.current && <span className="drop drop-live">{copy.experience.current}</span>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="archive" className="shell band pt-0 md:pt-0">
            <SectionHead
              title={copy.sections.archive}
              lead={copy.sections.archiveLead}
              aside={<span className="drop drop-archived">{copy.archive.stamp}</span>}
              seal={<MotifSeal motif="tarakli" seed={24} copy={copy} theme={theme} />}
            />
            <div className="rows">
              {ARCHIVE_PROJECTS.map((project) => (
                <article
                  key={project.title.en}
                  className="row grid gap-3 py-7 md:grid-cols-[5rem_minmax(0,1fr)_11rem] md:items-baseline md:gap-6"
                >
                  <span className="text-small font-semibold text-muted">{project.date ?? '—'}</span>
                  <div>
                    <h3 className="m-0 text-[1.15rem] font-bold leading-snug text-ink">
                      {localize(project.title, language)}
                    </h3>
                    <p className="m-0 mt-2 max-w-[66ch] text-pretty">{localize(project.description, language)}</p>
                    <p className="m-0 mt-3 flex flex-wrap gap-y-1 text-small text-muted">
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
                        className="link inline-flex items-center gap-1.5 text-small font-semibold text-ink"
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
          </section>
        </main>

        <Contact copy={copy} language={language} theme={theme} />
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

/** The mark: a drop ringed by one pigment, the way every sheet starts. */
function DropMark({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="var(--c-stock)" />
      <circle cx="16" cy="16" r="10.5" fill="var(--c-ochre)" />
      <circle cx="16" cy="16" r="8" fill="var(--c-on-stock)" />
      <circle cx="16" cy="16" r="5.5" fill="var(--c-stock)" />
    </svg>
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
    <header className="masthead">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 text-ink">
          <DropMark className="h-8 w-8 shrink-0" />
          <span className="truncate text-[1.05rem] font-bold tracking-[-0.01em]">Anıl Karabulut</span>
        </a>

        <nav aria-label={copy.navLabel} className="hidden xl:block">
          <ul className="m-0 flex list-none items-center gap-6 p-0">{links('navlink')}</ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">{switches}</div>
          <a
            href={CV_URL[language]}
            download
            className="btn min-h-[2.5rem] px-4 text-small"
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

      <div id="site-menu" hidden={!open} className="border-t border-rule-soft xl:hidden">
        <div className="shell grid gap-6 pb-7 pt-5">
          <nav aria-label={copy.navLabel}>
            <ul className="m-0 grid list-none gap-1 p-0 sm:grid-cols-2">
              {links('navlink w-full text-[1.0625rem]')}
            </ul>
          </nav>
          <div className="lg:hidden">{switches}</div>
        </div>
      </div>
    </header>
  );
}

/** The facts a recruiter screens for, set quietly under the hero's actions. */
function Facts({copy}: {copy: Copy}) {
  const languages = copy.languages.map((item) => `${item.name} (${item.level})`).join(' · ');
  const rows: {label: string; value: ReactNode; wide?: boolean}[] = [
    {label: copy.facts.location, value: copy.hero.location},
    {label: copy.facts.languages, value: languages},
    {label: copy.facts.file, value: copy.stats.map((stat) => `${Number(stat.value)} ${stat.label}`).join(' · '), wide: true},
  ];

  return (
    <dl className="m-0 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className={`grid gap-0.5 ${row.wide ? 'sm:col-span-2' : ''}`}>
          <dt className="label">{row.label}</dt>
          <dd className="m-0 text-small text-on-stock">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Hero({copy, language, theme}: {copy: Copy; language: Language; theme: Theme}) {
  const reduced = Boolean(useReducedMotion());
  const hostRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [poured, setPoured] = useState(false);

  return (
    <section id="top" ref={hostRef} className="tray on-stock">
      <Bath hostRef={hostRef} guardRef={portraitRef} reduced={reduced} theme={theme} onPortrait={() => setPoured(true)} />

      {/* Name, then the face, then the rest: a phone meets the portrait before the fold. */}
      <div className="hero-grid shell relative">
        <div style={{gridArea: 'name'}}>
          <h1 className="display m-0 text-on-stock" data-calm>
            Anıl
            <br />
            Karabulut
          </h1>
          <p className="sentence m-0 mt-6 max-w-[22ch] text-on-stock" data-calm>
            {copy.hero.title}
          </p>
        </div>

        <div className="portrait-slot" style={{gridArea: 'portrait'}}>
          <motion.div
            ref={portraitRef}
            className="portrait-drop"
            initial={false}
            animate={poured ? {scale: 1, opacity: 1} : {scale: 0.18, opacity: 0}}
            transition={{duration: 0.75, ease: spreadEase}}
          >
            <img src="/profile.jpg" alt={copy.hero.portraitAlt} width={1056} height={1408} decoding="async" />
          </motion.div>
        </div>

        <div style={{gridArea: 'rest'}}>
          <p className="m-0 flex flex-wrap items-center gap-x-4 gap-y-2" data-calm>
            <span className="text-[1.05rem] font-semibold text-on-stock">{copy.hero.role}</span>
            <span className="drop drop-live">{copy.hero.status}</span>
          </p>
          <p className="lede m-0 mt-4 max-w-[54ch] text-on-stock" data-calm>
            {copy.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-calm>
            <a href={CV_URL[language]} download className="btn btn-paper">
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
            className="link mt-5 inline-flex items-center gap-2 font-semibold text-on-stock"
            data-calm
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {copy.hero.secondaryCta}
          </a>

          <div className="mt-10 border-t border-stock-rule pt-5" data-calm>
            <Facts copy={copy} />
          </div>
        </div>
      </div>

      {!reduced && (
        <p className="comb-hint label m-0" aria-hidden="true">
          {copy.hero.combHint}
        </p>
      )}
    </section>
  );
}

type Rect = {x: number; y: number; w: number; h: number};

type Task = {start: number; duration: number; prev: number; step: (progress: number, prev: number) => void};

/** The colour list the bath paints with: four stones, six pigments, then the bath itself. */
const STONES = 4;
const PIGMENT = {white: STONES, ochre: STONES + 1, turquoise: STONES + 2, rose: STONES + 3, lahor: STONES + 4, deep: STONES + 5};
const BATH = STONES + 6;

/**
 * The nightingale's nest, outer edge to inner, in portrait radii: each drop
 * lands at the centre and pushes the ones before it out into a ring.
 */
const NEST = [
  {edge: 1.7, pigment: PIGMENT.white},
  {edge: 1.64, pigment: PIGMENT.ochre},
  {edge: 1.53, pigment: PIGMENT.deep},
  {edge: 1.48, pigment: PIGMENT.white},
  {edge: 1.42, pigment: PIGMENT.turquoise},
  {edge: 1.33, pigment: PIGMENT.lahor},
  {edge: 1.27, pigment: PIGMENT.rose},
  {edge: 1.17, pigment: PIGMENT.deep},
  {edge: 1.12, pigment: PIGMENT.white},
  {edge: 1.05, pigment: PIGMENT.ochre},
  {edge: 1, pigment: BATH},
];

const ease = (t: number) => 1 - Math.pow(1 - t, 3.2);

/**
 * The hero's bath. On arrival it pours itself: indigo stones scatter across
 * the tray, then the nest drops land one after another on the portrait, the
 * last one becoming the face, and the stylus pulls the rings into petals.
 * Afterwards the visitor can comb it. Text regions marked `data-calm` only
 * ever get tone-on-tone stones, so nothing bright lands under the copy.
 */
function Bath({
  hostRef,
  guardRef,
  reduced,
  theme,
  onPortrait,
}: {
  hostRef: RefObject<HTMLElement | null>;
  guardRef: RefObject<HTMLDivElement | null>;
  reduced: boolean;
  theme: Theme;
  onPortrait: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const repaintRef = useRef<() => void>(() => {});
  const portraitRef = useRef(onPortrait);
  portraitRef.current = onPortrait;

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const slot = guardRef.current;
    const ctx = canvas?.getContext('2d');
    if (!host || !canvas || !slot || !ctx) {
      portraitRef.current();
      return;
    }

    let shapes: Shape[] = [];
    let guard: Guard = {x: 0, y: 0, r: 1};
    let guardOn = false;
    let calm: Rect[] = [];
    let colors: string[] = [];
    let bath = '#1d2a66';
    let tasks: Task[] = [];
    let clock = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let scale = 1;
    let dirty = false;

    const readPalette = () => {
      const style = getComputedStyle(host);
      bath = style.getPropertyValue('--c-stock').trim() || bath;
      const stones = readColors(host, '--bath-stones', ['#22317a', '#19245b', '#273883', '#1f2d6e']);
      const pigments = readColors(host, '--bath-pigments', ['#f1f2ec', '#d9a23a', '#4fa39b', '#d98f87', '#9fb3dc', '#101741']);
      colors = [...stones.slice(0, STONES), ...pigments.slice(0, 6), bath];
    };

    const measure = () => {
      const box = host.getBoundingClientRect();
      width = box.width;
      height = box.height;
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      // The slot's layout box, not the drop's: the drop may still be scaled down.
      const face = slot.offsetParent ? slot : null;
      const rect = (face ?? slot).getBoundingClientRect();
      const size = slot.offsetWidth || rect.width;
      guard = {
        x: rect.left - box.left + rect.width / 2,
        y: rect.top - box.top + rect.height / 2,
        r: size / 2,
      };
      calm = Array.from(host.querySelectorAll('[data-calm]')).map((element) => {
        const r = element.getBoundingClientRect();
        return {x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height};
      });
    };

    const isCalm = (x: number, y: number, margin: number) =>
      calm.some((r) => x > r.x - margin && x < r.x + r.w + margin && y > r.y - margin && y < r.y + r.h + margin);

    const draw = () => paint(ctx, shapes, colors, bath, width, height, scale);
    repaintRef.current = () => {
      readPalette();
      draw();
    };

    const edge = () => Math.max(2.2, width / 520);

    /** Lays a drop now and grows it to radius r over the task's life. */
    const dropTask = (start: number, duration: number, x: number, y: number, r: number, pigment: number, nest = false): Task => ({
      start,
      duration,
      prev: 0,
      step: (progress, prev) => {
        if (prev === 0) addDrop(shapes, x, y, 0.5, pigment, nest || !guardOn ? undefined : guard);
        displace(shapes, x, y, (progress - prev) * (r * r - 0.25), nest || !guardOn ? undefined : guard);
      },
    });

    const pour = (animated: boolean) => {
      shapes = [];
      guardOn = false;
      tasks = [];
      const random = rng(20261102);
      const unit = Math.max(0.6, Math.min(1.2, width / 1440));

      // Stones, away from the nest: tone-on-tone near the copy, a few pigments in the open.
      const stones = Math.round((width * height) / (11000 * unit));
      for (let i = 0; i < stones; i += 1) {
        const x = random() * width;
        const y = random() * height;
        const roll = random();
        if (Math.hypot(x - guard.x, y - guard.y) < guard.r * 2.1) continue;
        const open = !isCalm(x, y, 70 * unit) && roll < 0.16;
        const r = (open ? 9 + roll * 40 : 26 + random() * 46) * unit;
        const pigment = open ? [PIGMENT.ochre, PIGMENT.white, PIGMENT.rose, PIGMENT.turquoise][i % 4] : i % STONES;
        tasks.push(dropTask(random() * 520, 420, x, y, r, pigment));
      }

      // The nest: each drop is the area between its edge and the next one in.
      const nestStart = 180;
      NEST.forEach((ring, index) => {
        const inner = NEST[index + 1]?.edge ?? 0;
        const r = guard.r * Math.sqrt(ring.edge * ring.edge - inner * inner);
        const start = nestStart + index * 80;
        const task = dropTask(start, 380, guard.x, guard.y, r, ring.pigment, true);
        if (ring.pigment === BATH) {
          const step = task.step;
          task.step = (progress, prev) => {
            if (prev === 0) portraitRef.current();
            step(progress, prev);
            if (progress === 1) guardOn = true;
          };
        }
        tasks.push(task);
      });

      // The stylus: five petals pulled out of the rings, then curled into the nest.
      const bloomStart = nestStart + NEST.length * 80 + 260;
      // Pull first, curl after: curling while pulling smears the petals back into rings.
      tasks.push({
        start: bloomStart,
        duration: 650,
        prev: 0,
        step: (progress, prev) => {
          guardOn = true;
          bloom(shapes, guard, 5, (progress - prev) * guard.r * 0.5, 0, -Math.PI / 2);
        },
      });
      tasks.push({
        start: bloomStart + 650,
        duration: 750,
        prev: 0,
        step: (progress, prev) => {
          bloom(shapes, guard, 5, 0, (progress - prev) * 2.1, -Math.PI / 2);
        },
      });

      tasks.sort((a, b) => a.start - b.start);

      if (!animated) {
        for (const task of tasks) {
          task.step(1, 0);
          refine(shapes, edge());
        }
        tasks = [];
        draw();
        return;
      }
      clock = performance.now();
      kick();
    };

    const loop = (now: number) => {
      raf = 0;
      const t = now - clock;
      for (const task of tasks) {
        if (t < task.start) continue;
        const linear = Math.min(1, (t - task.start) / task.duration);
        const progress = linear === 1 ? 1 : ease(linear);
        if (progress !== task.prev) {
          task.step(progress, task.prev);
          task.prev = progress;
          dirty = true;
        }
      }
      tasks = tasks.filter((task) => task.prev < 1);
      if (dirty) {
        refine(shapes, edge());
        draw();
        dirty = false;
      }
      if (tasks.length) kick();
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    readPalette();
    measure();
    pour(!reduced);

    // A resize re-pours the finished bath at once: same seed, new geometry.
    let resizeTimer = 0;
    let lastWidth = width;
    let lastHeight = height;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const box = host.getBoundingClientRect();
        if (Math.abs(box.width - lastWidth) < 2 && Math.abs(box.height - lastHeight) < 40) return;
        lastWidth = box.width;
        lastHeight = box.height;
        measure();
        pour(false);
        portraitRef.current();
      }, 160);
    });
    observer.observe(host);

    if (reduced) {
      return () => {
        observer.disconnect();
        window.clearTimeout(resizeTimer);
      };
    }

    // The stylus: drag to comb, tap to drop. Copy and controls keep their own gestures.
    let drag: {id: number; x: number; y: number; moved: number} | null = null;
    const local = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      return {x: event.clientX - box.left, y: event.clientY - box.top};
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target as Element;
      if (target.closest('a, button, [data-calm], .portrait-drop')) return;
      const point = local(event);
      drag = {id: event.pointerId, x: point.x, y: point.y, moved: 0};
    };
    const onMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const point = local(event);
      const vx = point.x - drag.x;
      const vy = point.y - drag.y;
      drag.moved += Math.hypot(vx, vy);
      stroke(shapes, drag.x, drag.y, vx, vy, 34 * Math.max(0.7, width / 1440), guardOn ? guard : undefined);
      drag.x = point.x;
      drag.y = point.y;
      dirty = true;
      kick();
    };
    const onUp = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const point = local(event);
      if (drag.moved < 6 && Math.hypot(point.x - guard.x, point.y - guard.y) > guard.r * 1.2) {
        const random = Math.random();
        const pigment = isCalm(point.x, point.y, 50)
          ? Math.floor(random * STONES)
          : [PIGMENT.ochre, PIGMENT.white, PIGMENT.rose, PIGMENT.turquoise, PIGMENT.lahor][Math.floor(random * 5)];
        tasks.push({...dropTask(0, 520, point.x, point.y, 16 + random * 22, pigment), start: performance.now() - clock});
        kick();
      }
      drag = null;
    };

    host.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      host.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [hostRef, guardRef, reduced]);

  // A theme change recolours the same pattern; the CSS variables land a frame later.
  useEffect(() => {
    const frame = requestAnimationFrame(() => repaintRef.current());
    return () => cancelAnimationFrame(frame);
  }, [theme]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

/**
 * A sheet's marbled head, poured and combed once, then pulled up out of the
 * bath when it scrolls in. The pattern is computed, so it follows the theme.
 */
function MarbledStrip({
  motif,
  seed,
  theme,
  className = '',
}: {
  motif: StripMotif;
  seed: number;
  theme: Theme;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<{width: number; shapes: Shape[]} | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let frame = 0;

    const render = () => {
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(box.width * scale);
      canvas.height = Math.round(box.height * scale);
      const style = getComputedStyle(canvas);
      const bath = style.getPropertyValue('--c-stock').trim() || '#1d2a66';
      const stones = readColors(canvas, '--bath-stones', ['#22317a', '#19245b', '#273883', '#1f2d6e']);
      const pigments = readColors(canvas, '--bath-pigments', ['#f1f2ec', '#d9a23a', '#4fa39b', '#d98f87', '#9fb3dc', '#101741']);
      // Mostly indigo, with veins of pigment between the stones.
      const palette = [stones[0], pigments[1], stones[2], pigments[0], stones[1], pigments[2], stones[3], pigments[3]];
      if (!shapesRef.current || Math.abs(shapesRef.current.width - box.width) > 2) {
        shapesRef.current = {width: box.width, shapes: pourStrip(box.width, box.height, motif, seed, palette.length)};
      }
      paint(ctx, shapesRef.current.shapes, palette, bath, box.width, box.height, scale);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [motif, seed, theme]);

  return (
    // The wrapper is what scrolls into view; the clip runs on the canvas, so a
    // fully clipped strip can still be seen arriving.
    <motion.div className={`strip ${className}`} {...reveal} aria-hidden="true">
      <motion.canvas ref={ref} variants={pull} />
    </motion.div>
  );
}

/** Where a pattern came from: its unit in the numbered set, and that it was computed here. */
function Provenance({
  motif,
  seed,
  copy,
  className = '',
}: {
  motif: StripMotif;
  seed: number;
  copy: Copy;
  className?: string;
}) {
  return (
    <p className={`label m-0 ${className}`}>
      No. {MOTIF_NUMBER[motif]} · {copy.ebru.motifs[motif]} — {copy.ebru.computed}, {copy.ebru.seed} {seed}
    </p>
  );
}

/** One unit of the motif set, poured small beside a section's title. */
function MotifSeal({motif, seed, copy, theme}: {motif: StripMotif; seed: number; copy: Copy; theme: Theme}) {
  return (
    <span className="flex items-center gap-4 md:flex-row-reverse">
      <MarbledStrip motif={motif} seed={seed} theme={theme} className="h-24 w-24 shrink-0 rounded-full md:h-28 md:w-28" />
      <Provenance motif={motif} seed={seed} copy={copy} className="max-w-[13rem]" />
    </span>
  );
}

/**
 * A section's title, with its lead and its motif unit in the right-hand column,
 * so every head reads the same way: title left, image and words right.
 */
function SectionHead({
  title,
  lead,
  aside,
  seal,
}: {
  title: string;
  lead?: string;
  aside?: ReactNode;
  seal?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <h2 className="headline m-0">{title}</h2>
        {aside}
      </div>
      {(lead || seal) && (
        <div className="grid gap-4 md:justify-items-end md:text-right">
          {seal}
          {lead && <p className="m-0 max-w-md text-pretty text-muted">{lead}</p>}
        </div>
      )}
    </div>
  );
}

function StatusDrop({product, copy}: {product: Product; copy: Copy}) {
  const live = product.status === 'live';
  return (
    <span className={`drop ${live ? 'drop-live' : 'drop-building'}`}>
      {live ? copy.product.live : copy.product.building}
    </span>
  );
}

/**
 * One product, as a sheet pulled from the bath: its marbled head, then its
 * provenance on one line (status, year, what it is), then the record and the
 * evidence beside it.
 */
function ProductSheet({
  product,
  motif,
  seed,
  language,
  copy,
  theme,
}: {
  product: Product;
  motif: StripMotif;
  seed: number;
  language: Language;
  copy: Copy;
  theme: Theme;
}) {
  const live = product.status === 'live';
  return (
    <article id={sheetId(product)} className="scroll-mt-24">
      <MarbledStrip motif={motif} seed={seed} theme={theme} className="h-16 md:h-24" />
      <Provenance motif={motif} seed={seed} copy={copy} className="mt-2 text-right" />

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-rule pb-5">
        <h3 className="m-0 text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-none tracking-[-0.018em] text-ink [font-stretch:92%]">
          {product.title}
        </h3>
        <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2">
          <StatusDrop product={product} copy={copy} />
          <span className="text-small font-semibold text-muted">{product.year}</span>
        </p>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <p className="m-0 font-semibold text-muted">{localize(product.kicker, language)}</p>
          <p className="lede m-0 mt-4 max-w-[60ch]">{localize(product.description, language)}</p>

          <h4 className="label m-0 mt-9">{copy.product.facts}</h4>
          <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
            {product.facts.map((fact) => (
              <li key={fact.en} className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-2.5 text-[1rem] leading-6">
                <span aria-hidden="true" className="mt-[0.45rem] h-2.5 w-2.5 rounded-full bg-ink" />
                {localize(fact, language)}
              </li>
            ))}
          </ul>

          <h4 className="label m-0 mt-9">{copy.product.highlights}</h4>
          <ul className="rows m-0 mt-3 list-none p-0">
            {product.highlights.map((highlight) => (
              <li key={highlight.en} className="row grid grid-cols-[1.1rem_minmax(0,1fr)] gap-2.5 py-3 text-[1rem] leading-6">
                <span aria-hidden="true" className="mt-[0.45rem] h-2.5 w-2.5 rounded-full border-2 border-ink" />
                {localize(highlight, language)}
              </li>
            ))}
          </ul>

          <h4 className="label m-0 mt-9">{copy.product.stack}</h4>
          <p className="m-0 mt-3 flex flex-wrap gap-y-1 text-small text-body">
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
                <span className="text-small text-muted">{copy.product.shotHint}</span>
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
      <figcaption className="mt-2.5 text-small text-muted">{localize(shot.caption, language)}</figcaption>
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
      className="projection on-stock flex min-h-[520px] flex-col justify-between p-5 sm:p-7 lg:sticky lg:top-24 lg:self-start"
      aria-label={demo.label}
    >
      <div className="flex items-center justify-between gap-4 border-b border-stock-rule pb-3">
        <span className="label">{demo.label}</span>
        <span className="label">{demo.page}</span>
      </div>

      {interactive ? (
        <>
          <p className="sr-only">{demo.description}</p>
          <div className="h-[380px] py-2 sm:h-[480px]" aria-hidden="true">
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
        <span className="inline-flex items-center gap-2 font-semibold text-on-stock">
          <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
          {demo.preserved}
        </span>
        <span className="inline-flex items-center gap-2 text-on-stock-muted sm:justify-end">
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

/**
 * The method as one unbroken row. When it scrolls in, a drop walks it once,
 * step by step, and rests on human approval: the point where it ships.
 */
function Process({copy, theme}: {copy: Copy; theme: Theme}) {
  const reduced = useReducedMotion();
  const rowRef = useRef<HTMLOListElement>(null);
  const last = copy.process.steps.length - 1;
  const [now, setNow] = useState(reduced ? last : -1);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (reduced) {
      setNow(last);
      return;
    }
    let timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        timers = copy.process.steps.map((_, index) => window.setTimeout(() => setNow(index), 250 + index * 520));
      },
      {rootMargin: '0px 0px -25% 0px'},
    );
    observer.observe(row);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced, last, copy.process.steps]);

  return (
    <section id="process" className="bg-raised">
      <div className="shell band">
        <SectionHead
          title={copy.sections.process}
          seal={<MotifSeal motif="gelgit" seed={21} copy={copy} theme={theme} />}
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <h3 className="subhead m-0">{copy.process.eyebrow}</h3>
          <p className="m-0 max-w-[64ch] text-pretty">{copy.process.body}</p>
        </div>

        <ol ref={rowRef} className="steps mt-14">
          {copy.process.steps.map((step, index) => (
            <li key={step.title} className="step" data-now={index <= now ? 'true' : 'false'}>
              <span className="step-mark" aria-hidden="true" data-here={index === now ? 'true' : 'false'} />
              <div>
                <p className="m-0 font-bold text-ink">{step.title}</p>
                <p className="m-0 mt-1 text-small text-muted">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* The claim above is abstract; these rows are where it becomes checkable. */}
        <div className="mt-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h3 className="subhead m-0">{copy.process.matrixTitle}</h3>
            <p className="m-0 text-muted">{copy.process.matrixLead}</p>
          </div>

          <dl className="rows m-0 mt-6">
            {copy.process.matrix.map((row) => {
              const product = PRODUCTS.find((item) => item.title === row.product);
              // The portfolio itself is the page being read, so it is live by definition.
              const live = !product || product.status === 'live';
              return (
                <div
                  key={row.product}
                  className="row grid gap-2 py-5 md:grid-cols-[16rem_minmax(0,1fr)_10rem] md:items-baseline md:gap-8"
                >
                  <dt className="font-bold text-ink">
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
                    <span className={`drop ${live ? 'drop-live' : 'drop-building'}`}>
                      {live ? copy.product.live : copy.product.building}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Contact({copy, language, theme}: {copy: Copy; language: Language; theme: Theme}) {
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
      {/* The edge of the sheet, where the bath shows through. */}
      <MarbledStrip motif="gelgit" seed={11} theme={theme} className="h-20 rounded-none md:h-28" />

      <div className="shell band">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="headline m-0 text-on-stock">{copy.nav.contact}</h2>
            <p className="sentence m-0 mt-5">
              <span className="drop drop-live text-[length:inherit]">{copy.hero.status}</span>
            </p>
            <p className="m-0 mt-4 flex items-center gap-2 text-on-stock-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {copy.hero.location}
            </p>

            <div className="mt-10 border-t border-on-stock">
              <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-stock-rule py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto]">
                <span className="label">{copy.contactLabels.email}</span>
                <a href={`mailto:${CONTACT.email}`} className="link break-words font-semibold text-on-stock">
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
                  <span className="truncate font-semibold text-on-stock">{item.value}</span>
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
                <p className="m-0 mt-3 text-small text-on-stock-muted">
                  {copy.education.date} · {copy.education.location} · {copy.education.gpa}
                </p>
              </div>
            </div>

            <div>
              <h3 className="label m-0">{copy.sections.languages}</h3>
              <dl className="m-0 mt-4 border-t border-on-stock">
                {copy.languages.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between border-b border-stock-rule py-3">
                    <dt className="font-semibold text-on-stock">{item.name}</dt>
                    <dd className="m-0 text-small text-on-stock-muted">{item.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-stock-rule pt-6 text-small text-on-stock-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            © {new Date().getFullYear()} Anıl Karabulut. {copy.footer}
          </p>
          <p className="m-0">{copy.footerNote}</p>
        </div>
        <Provenance motif="gelgit" seed={11} copy={copy} className="mt-4" />
      </div>
    </footer>
  );
}
