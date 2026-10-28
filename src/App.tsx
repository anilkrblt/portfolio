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
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {drawPage, type PageContent} from './three/pageArt';

/**
 * The WebGL demo is the only heavy dependency on the page, so it ships as its
 * own chunk and is only fetched once the product record is actually in view.
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
  /** The role held today; it is stamped active. */
  current?: boolean;
};

/** 'live' is reachable by anyone; 'building' is real but not yet publicly deployed. */
type ProductStatus = 'live' | 'building';

type Shot = {
  src: string;
  /**
   * The hero's exhibit: one whole headline cut from this screenshot and mounted
   * square on the screenshot's own ground, so the frame shows a complete phrase.
   */
  exhibit: string;
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
      portraitCaption: 'Anıl Karabulut — Edirne, 2026',
      stamp: 'Müsait',
      stampNote: 'Uzaktan · Hibrit',
      exhibits: 'Kanıt kareleri',
      portraitTag: 'Portre',
    },
    facts: {
      status: 'Durum',
      location: 'Konum',
      languages: 'Diller',
      file: 'Dosya içeriği',
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
      shotHint: 'Renkli görmek için üzerine gelin, tam boyut için tıklayın.',
      exhibit: 'Ek',
      year: 'Yıl',
      address: 'Adres',
      status: 'Durum',
    },
    demo: {
      label: 'Düzen korumalı çeviri',
      page: 'Sayfa 03 / 12',
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
    footerNote: 'Bu dosya React, TypeScript ve Tailwind ile dizildi. Courier Prime ve Libre Franklin.',
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
      portraitCaption: 'Anıl Karabulut — Edirne, 2026',
      stamp: 'Available',
      stampNote: 'Remote · Hybrid',
      exhibits: 'Exhibit frames',
      portraitTag: 'Portrait',
    },
    facts: {
      status: 'Status',
      location: 'Location',
      languages: 'Languages',
      file: 'File contents',
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
      shotHint: 'Hover to see it in colour; click for full size.',
      exhibit: 'Exhibit',
      year: 'Year',
      address: 'Address',
      status: 'Status',
    },
    demo: {
      label: 'Layout-preserving translation',
      page: 'Page 03 / 12',
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
    footerNote: 'Typed in React, TypeScript and Tailwind. Courier Prime and Libre Franklin.',
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
        exhibit: '/exhibits/eaa1-headline.jpg',
        alt: {
          tr: 'EAA Monitor açılış sayfası ve müşteri portföyü özeti',
          en: 'EAA Monitor landing page with the client portfolio summary',
        },
        caption: {tr: 'Ajans portföyü ve izleme durumu', en: 'Agency portfolio and monitoring status'},
      },
      {
        src: '/eaa2.png',
        exhibit: '/exhibits/eaa2-headline.jpg',
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
        exhibit: '/exhibits/randevai1-headline.jpg',
        alt: {
          tr: 'Randevai açılış sayfası ve günün operasyon masası önizlemesi',
          en: 'Randevai landing page with a preview of the daily operations desk',
        },
        caption: {tr: 'Operasyon masası ve karşılama akışı', en: 'Operations desk and intake flow'},
      },
      {
        src: '/randevai2.png',
        exhibit: '/exhibits/randevai2-headline.jpg',
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

const THEME_COLOR: Record<Theme, string> = {gunduz: '#e4cd95', gece: '#121110'};

/** Rail tabs and the sections they open; the hero is tracked but has no tab. */
const NAV_TARGETS = {
  products: 'products',
  process: 'process',
  skills: 'skills',
  experience: 'experience',
  archive: 'archive',
  contact: 'colophon',
} as const;
type NavKey = keyof typeof NAV_TARGETS;
const NAV_KEYS = Object.keys(NAV_TARGETS) as NavKey[];
const TRACKED_SECTIONS = ['top', ...Object.values(NAV_TARGETS)];

const PORTRAIT_FOCUS = [0.5, 0.42] as const;
const CENTER = [0.5, 0.5] as const;
/** The demo sheet's figure, where the hero frame looks. */
const PAGE_FOCUS = [0.3, 0.62] as const;

/** A cut, not a drift: frames appear the way a title sequence cuts them in. */
const rise = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {duration: 0.18, ease: 'linear' as const}},
};

const stagger = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.08, delayChildren: 0.1}},
};

/** A rubber stamp landing: one hard overshoot, then still. The custom value is its delay. */
const land = {
  hidden: {opacity: 0, scale: 1.7},
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {delay, duration: 0.22, ease: [0.34, 1.56, 0.64, 1] as const},
  }),
};

const reveal = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: {once: true, margin: '-60px'},
};

/** How the reticle travels between exhibits. */
const track = {type: 'tween' as const, duration: 0.34, ease: [0.22, 1, 0.36, 1] as const};

function localize(value: LocalizedString, language: Language) {
  return value[language];
}

function pad(index: number) {
  return String(index).padStart(2, '0');
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

/**
 * Types a string out one character at a time. The caller keeps the untyped
 * remainder in the layout (invisible), so nothing reflows while it types.
 */
function useTyped(text: string, {delay = 0, speed = 40, enabled = true} = {}) {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let index = 0;
    let timer = window.setTimeout(function tick() {
      index += 1;
      setCount(index);
      if (index < text.length) timer = window.setTimeout(tick, speed);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, delay, speed, enabled]);

  return count;
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

/** Which section is under the middle of the viewport, for the rail's current tab. */
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
      <div className="relative min-h-screen bg-canvas">
        <div className="fiber" aria-hidden="true" />

        <a href="#main-content" className="btn btn-primary fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0">
          {copy.skip}
        </a>

        <div className="file">
          <Rail
            copy={copy}
            language={language}
            theme={theme}
            active={active}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
          />

          {/* Clipped, not scrolled: a stamp waiting to land must never widen the page. */}
          <div className="min-w-0 overflow-x-clip">
            <main id="main-content">
              <Hero copy={copy} language={language} theme={theme} />

              <section id="products" className="shell band">
                <SectionHead title={copy.sections.products} lead={copy.sections.productsLead} />
                <PrimaryRecord product={PRODUCTS[0]} language={language} copy={copy} theme={theme} />
                {PRODUCTS.slice(1).map((product, index) => (
                  <ProductRecord
                    key={product.title}
                    product={product}
                    exhibit={pad(index + 2)}
                    language={language}
                    copy={copy}
                  />
                ))}
              </section>

              <Process copy={copy} />

              <section id="skills" className="shell band">
                <SectionHead title={copy.sections.skills} />
                <div className="rows">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.title.en} className="row grid gap-3 py-5 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-8">
                      <h3 className="flex items-center gap-3 font-bold uppercase tracking-[0.04em] text-ink">
                        <group.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {localize(group.title, language)}
                      </h3>
                      <p className="m-0 flex flex-wrap gap-y-1">
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
                <SectionHead title={copy.sections.experience} />
                <div className="rows">
                  {EXPERIENCES.map((experience) => (
                    <article
                      key={`${experience.company}-${experience.date.en}`}
                      className="row grid gap-3 py-7 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8"
                    >
                      <p className="m-0 text-[0.95rem] leading-6">
                        <span className="block font-bold text-ink">{localize(experience.date, language)}</span>
                        {experience.location && (
                          <span className="block text-muted">{localize(experience.location, language)}</span>
                        )}
                      </p>
                      <div>
                        <h3 className="subhead">{localize(experience.title, language)}</h3>
                        <p className="mt-1.5 font-bold uppercase tracking-[0.06em] text-muted">{experience.company}</p>
                        <p className="mt-3 max-w-[66ch] text-pretty">{localize(experience.description, language)}</p>
                      </div>
                      <div className="md:pt-1">
                        {experience.current && (
                          <Stamp tone="live" rotate={-5} className="text-small">
                            {copy.experience.current}
                          </Stamp>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="archive" className="shell band pt-0 md:pt-0">
                <SectionHead
                  title={copy.sections.archive}
                  lead={copy.sections.archiveLead}
                  stamp={
                    <Stamp tone="gray" rotate={-4} className="text-small">
                      {copy.archive.stamp}
                    </Stamp>
                  }
                />
                <div className="rows">
                  {ARCHIVE_PROJECTS.map((project) => (
                    <article
                      key={project.title.en}
                      className="row grid gap-3 py-6 md:grid-cols-[5rem_minmax(0,1fr)_11rem] md:items-baseline md:gap-6"
                    >
                      <span className="font-bold text-muted">{project.date ?? '—'}</span>
                      <div>
                        <h3 className="text-[1.1rem] font-bold leading-6 text-ink">{localize(project.title, language)}</h3>
                        <p className="mt-2 max-w-[66ch] text-[0.95rem] leading-6 text-body">
                          {localize(project.description, language)}
                        </p>
                        <p className="mt-3 flex flex-wrap gap-y-1 text-small text-muted">
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
                            className="typed-link inline-flex items-center gap-1.5 text-small font-bold"
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

            <Colophon copy={copy} language={language} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

/** The two typed toggles: language and theme. */
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
    <div className="flex flex-wrap gap-3">
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

function Monogram({className = ''}: {className?: string}) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center border-2 border-on-stock font-bold leading-none ${className}`}
    >
      AK
    </span>
  );
}

/**
 * The file rail: on a desk-sized screen it holds the tabs, the facts a
 * recruiter needs and the CV, all within reach at any scroll depth. On a phone
 * it folds into a black bar with a menu.
 */
function Rail({
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

  const tabs = NAV_KEYS.map((key, index) => (
    <li key={key}>
      <a
        href={`#${NAV_TARGETS[key]}`}
        className="tab"
        aria-current={active === NAV_TARGETS[key] ? 'true' : undefined}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden="true">{pad(index + 1)}</span>
        <span>{copy.nav[key]}</span>
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
    <header className="rail on-stock sticky top-0 z-40">
      <div className="flex items-center justify-between gap-4 px-5 py-3 lg:hidden">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <Monogram className="h-9 w-9 text-small" />
          <span className="truncate font-bold uppercase tracking-[0.06em]">Anıl Karabulut</span>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          {/* The CV rides in the bar on a phone, the way it rides in the rail on a desk. */}
          <a
            href={CV_URL[language]}
            download
            className="inline-flex h-10 items-center gap-1.5 bg-on-stock px-3 text-small font-bold uppercase tracking-[0.08em] text-stock"
            aria-label={copy.hero.cvCta}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            CV
          </a>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 border-2 border-on-stock px-2.5 text-small font-bold uppercase tracking-[0.08em]"
            aria-expanded={open}
            aria-controls="file-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            <span className="max-[419px]:sr-only">{open ? copy.menuClose : copy.menu}</span>
          </button>
        </div>
      </div>

      <div id="file-menu" hidden={!open} className="border-t border-stock-rule px-5 pb-6 pt-4 lg:hidden">
        <nav aria-label={copy.navLabel}>
          <ul className="m-0 grid list-none gap-2 p-0">{tabs}</ul>
        </nav>
        <div className="mt-5">{switches}</div>
        <a href={CV_URL[language]} download className="btn btn-file mt-5 w-full">
          <Download className="h-4 w-4" aria-hidden="true" />
          {copy.hero.cvCta}
        </a>
      </div>

      {/* Language first: a visitor who cannot read Turkish must find EN before anything else. */}
      <div className="hidden min-h-full flex-col gap-6 p-6 lg:flex">
        <a href="#top" className="grid gap-2.5 border-2 border-on-stock p-3.5 transition-colors hover:border-stock-alarm">
          <span className="flex items-center gap-3">
            <Monogram className="h-10 w-10 text-[1rem]" />
            <span className="font-bold uppercase leading-tight tracking-[0.04em]">
              Anıl
              <br />
              Karabulut
            </span>
          </span>
          <span className="label">{copy.hero.role}</span>
        </a>

        <div className="grid gap-4">
          {switches}
          <a href={CV_URL[language]} download className="btn btn-file w-full px-4 text-small tracking-[0.03em]">
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            {copy.hero.cvCta}
          </a>
        </div>

        <nav aria-label={copy.navLabel}>
          <ul className="m-0 grid list-none gap-1.5 p-0">{tabs}</ul>
        </nav>

        <DossierFacts copy={copy} />
      </div>
    </header>
  );
}

/** The facts a recruiter screens for, typed onto the file's status form. */
function DossierFacts({copy, className = ''}: {copy: Copy; className?: string}) {
  const languages = copy.languages.map((item) => `${item.name} (${item.level})`).join(' · ');
  const rows: {label: string; value: ReactNode; optional?: boolean}[] = [
    {label: copy.facts.status, value: <span className="fact-alarm font-bold">{copy.hero.status}</span>},
    {label: copy.facts.location, value: copy.hero.location},
    {label: copy.facts.languages, value: languages},
    {
      label: copy.facts.file,
      optional: true,
      value: copy.stats.map((stat) => (
        <span key={stat.label} className="block">
          {stat.value} {stat.label}
        </span>
      )),
    },
  ];

  return (
    <dl className={`m-0 grid gap-3 ${className}`}>
      {rows.map((row) => (
        <div key={row.label} className={`grid gap-0.5 ${row.optional ? 'rail-optional' : ''}`}>
          <dt className="label">{row.label}</dt>
          <dd className="m-0 text-small leading-snug">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Hero({copy, language, theme}: {copy: Copy; language: Language; theme: Theme}) {
  const reduced = useReducedMotion();
  const name = 'ANIL\nKARABULUT';
  const typed = useTyped(name, {enabled: !reduced, delay: 300, speed: 45});

  return (
    <section id="top" className="shell pb-16 pt-10 md:pb-24 md:pt-14 lg:flex lg:min-h-[100dvh] lg:items-center lg:py-12">
      {/* Three blocks, so a phone sees the face before the fold: name, frames, then the rest. */}
      <div className="hero-grid w-full">
        <div style={{gridArea: 'name'}}>
          <h1 className="display m-0 whitespace-pre-line">
            <span className="sr-only">Anıl Karabulut</span>
            <span aria-hidden="true">
              {name.slice(0, typed)}
              <span className="cursor" />
              <span className="invisible">{name.slice(typed)}</span>
            </span>
          </h1>
          <p className="sentence mt-7 lg:mt-8">{copy.hero.title}</p>
        </div>

        <SurveillanceArray copy={copy} language={language} theme={theme} />

        <div style={{gridArea: 'rest'}}>
          <p className="lede m-0 max-w-[58ch]">{copy.hero.subtitle}</p>
          <p className="mt-4 max-w-[58ch] text-[0.95rem] text-muted">{copy.hero.summary}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={CV_URL[language]} download className="btn btn-primary">
              <Download className="h-4 w-4" aria-hidden="true" />
              {copy.hero.cvCta}
            </a>
            <a href="https://translateyourpdf.com" target="_blank" rel="noreferrer" className="btn btn-secondary">
              {copy.hero.primaryCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="typed-link mt-5 inline-flex items-center gap-2 font-bold"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {copy.hero.secondaryCta}
          </a>

          <DossierFacts copy={copy} className="mt-10 border-t-2 border-rule pt-6 sm:grid-cols-2 lg:hidden" />
        </div>
      </div>
    </section>
  );
}

type ArtSource = string | HTMLCanvasElement;

function hexLuminance(color: string) {
  const match = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (!match) return 0;
  const value = parseInt(match[1], 16);
  return (0.2126 * ((value >> 16) & 255) + 0.7152 * ((value >> 8) & 255) + 0.0722 * (value & 255)) / 255;
}

/**
 * Coarse halftone, printed at runtime: the image is sampled once per screen
 * cell and every cell becomes one dot, on a 45° screen. Ink and paper come
 * from the theme, so at night the same exhibit is projected light-on-black.
 */
function Halftone({
  art,
  focus,
  zoom = 1,
  mode = 'tone',
  theme,
  cells,
  minCell,
  maxCell,
}: {
  art: ArtSource;
  focus: readonly [number, number];
  zoom?: number;
  /**
   * 'tone' is the 45° screen with dots sized by darkness, for photographs and
   * figures. 'type' prints a square dot matrix at two levels — a dot whole or
   * not at all — so letterforms stay crisp instead of beating against the
   * screen, and the type is always the inked part, whatever its polarity was.
   */
  mode?: 'tone' | 'type';
  theme: Theme;
  /** Dots across the frame; the cell size follows the frame, within these bounds (css px). */
  cells: number;
  minCell: number;
  maxCell: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | HTMLCanvasElement | null>(
    typeof art === 'string' ? null : art,
  );

  useEffect(() => {
    if (typeof art !== 'string') {
      setImage(art);
      return;
    }
    let alive = true;
    const img = new Image();
    img.decoding = 'async';
    img.src = art;
    img.decode().then(
      () => {
        if (alive) setImage(img);
      },
      () => {
        /* the photograph underneath still shows */
      },
    );
    return () => {
      alive = false;
    };
  }, [art]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !image) return;
    let frame = 0;

    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const style = getComputedStyle(canvas);
      const ink = style.getPropertyValue('--c-dot').trim() || '#141311';
      const paper = style.getPropertyValue('--c-dot-paper').trim() || '#e9d6a6';
      // Light dots on dark paper print the light, not the shadow.
      const positive = hexLuminance(ink) > hexLuminance(paper);

      const cell = Math.min(maxCell, Math.max(minCell, rect.width / cells));
      const step = cell * dpr;
      const cols = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;
      const sample = document.createElement('canvas');
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext('2d', {willReadFrequently: true});
      if (!sctx) return;

      const iw = image instanceof HTMLImageElement ? image.naturalWidth : image.width;
      const ih = image instanceof HTMLImageElement ? image.naturalHeight : image.height;
      const scale = Math.max(width / iw, height / ih) * zoom;
      const dw = iw * scale;
      const dh = ih * scale;
      sctx.imageSmoothingQuality = 'high';
      sctx.drawImage(image, ((width - dw) * focus[0]) / step, ((height - dh) * focus[1]) / step, dw / step, dh / step);
      const {data} = sctx.getImageData(0, 0, cols, rows);

      // Levels first: stretch the frame's own 4th–96th percentile to full range,
      // so glasses, eyes and type survive as dots instead of a mid-grey blur.
      const lum = new Float32Array(cols * rows);
      for (let i = 0; i < lum.length; i += 1) {
        lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
      }
      const sorted = Float32Array.from(lum).sort();
      const lo = sorted[Math.floor(sorted.length * 0.04)];
      const hi = sorted[Math.floor(sorted.length * 0.96)];
      const span = Math.max(0.08, hi - lo);
      // For type, the ground is whatever most of the frame is. Ink is anything
      // clearly off it in either direction, so light type on a dark screen and
      // purple type on white both print — always as dots, on the theme's paper.
      const ground = Math.min(1, Math.max(0, (sorted[Math.floor(sorted.length * 0.5)] - lo) / span));
      const darkGround = ground < 0.5;

      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = ink;
      ctx.beginPath();
      const typeset = mode === 'type';
      const max = step * 0.6;
      for (let y = 0; y < rows; y += 1) {
        const shift = typeset ? 0 : (y % 2) * (step / 2);
        for (let x = 0; x < cols; x += 1) {
          const light = Math.min(1, Math.max(0, (lum[y * cols + x] - lo) / span));
          let radius: number;
          if (typeset) {
            const inked = darkGround ? light > ground + 0.22 : light < ground - 0.22;
            if (!inked) continue;
            radius = step * 0.46;
          } else {
            const pushed = Math.min(1, Math.max(0, (light - 0.5) * 1.25 + 0.5));
            radius = max * Math.sqrt(positive ? pushed : 1 - pushed);
            if (radius < 0.4 * dpr) continue;
          }
          const cx = x * step + step / 2 + shift;
          const cy = y * step + step / 2;
          ctx.moveTo(cx + radius, cy);
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    // A frame later, so a theme change has already reached the CSS variables.
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [image, focus, zoom, mode, cells, minCell, maxCell, theme]);

  return <canvas ref={ref} aria-hidden="true" />;
}

function ReticleMark() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="50" cy="50" r="34" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d="M50 -10V32M50 68v42M-10 50h42M68 50h42" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d="M45 50h10M50 45v10" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** The photograph under a halftone, cropped exactly the way the halftone is. */
function framing(frame: {focus: readonly [number, number]; zoom: number}) {
  const origin = `${frame.focus[0] * 100}% ${frame.focus[1] * 100}%`;
  return {objectPosition: origin, transformOrigin: origin, transform: `scale(${frame.zoom})`};
}

type FrameKey = 'p' | 'a' | 'b' | 'c' | 'd' | 'e';
const FRAME_ORDER: FrameKey[] = ['p', 'a', 'b', 'c', 'd', 'e'];
/** The reticle's opening sweep: across the evidence, then onto the face. */
const SWEEP: FrameKey[] = ['b', 'c', 'a', 'p'];

type Frame = {
  tag: string;
  art: ArtSource;
  image: string;
  focus: readonly [number, number];
  zoom: number;
  mode: 'tone' | 'type';
  caption: string;
  href?: string;
};

/**
 * The title sequence: frames cut in, the reticle sweeps the evidence and
 * settles on the portrait, and the AVAILABLE stamp lands last. Afterwards the
 * reticle follows the reader: any exhibit under the pointer or focus is
 * declassified to its photograph and its caption is typed in.
 */
function SurveillanceArray({copy, language, theme}: {copy: Copy; language: Language; theme: Theme}) {
  const reduced = useReducedMotion();
  const fontsReady = useFontsReady();
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Partial<Record<FrameKey, HTMLElement | null>>>({});

  const page = useMemo(() => {
    void fontsReady;
    const canvas = drawPage(demoPages(copy.demo).front);
    return {canvas, url: canvas.toDataURL('image/png')};
  }, [copy.demo, fontsReady]);

  const frames = useMemo<Record<FrameKey, Frame>>(() => {
    const [, eaa, randevai] = PRODUCTS;
    const exhibit = (index: number) => `${copy.product.exhibit} ${pad(index)}`;
    // Two frames from one record are told apart the way a file tells exhibits apart.
    const shot = (product: Product, shotIndex: number, index: number): Frame => {
      const item = product.shots![shotIndex];
      return {
        tag: `${exhibit(index)}·${shotIndex === 0 ? 'A' : 'B'}`,
        art: item.exhibit,
        image: item.exhibit,
        focus: CENTER,
        zoom: 1,
        mode: 'type',
        caption: `${product.title} — ${localize(item.caption, language)}`,
        href: `#ek-${pad(index)}`,
      };
    };
    return {
      p: {
        tag: copy.hero.portraitTag,
        art: '/profile.jpg',
        image: '/profile.jpg',
        focus: PORTRAIT_FOCUS,
        zoom: 1,
        mode: 'tone',
        caption: copy.hero.portraitCaption,
      },
      a: {
        tag: exhibit(1),
        art: page.canvas,
        image: page.url,
        focus: PAGE_FOCUS,
        zoom: 1.7,
        mode: 'tone',
        caption: `TranslateYourPDF — ${copy.demo.label}`,
        href: '#ek-01',
      },
      b: shot(eaa, 0, 2),
      c: shot(randevai, 1, 3),
      d: shot(eaa, 1, 2),
      e: shot(randevai, 0, 3),
    };
  }, [copy, language, page]);

  const [sweep, setSweep] = useState<FrameKey | null>(reduced ? 'p' : null);
  const [settled, setSettled] = useState(Boolean(reduced));
  const [hovered, setHovered] = useState<FrameKey | null>(null);

  useEffect(() => {
    if (reduced) {
      setSweep('p');
      setSettled(true);
      return;
    }
    const timers = SWEEP.map((key, index) => window.setTimeout(() => setSweep(key), 550 + index * 300));
    timers.push(window.setTimeout(() => setSettled(true), 550 + SWEEP.length * 300));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduced]);

  const focused: FrameKey | null = settled ? (hovered ?? 'p') : sweep;
  const [box, setBox] = useState<{x: number; y: number; size: number} | null>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || !focused) return;
    const measure = () => {
      const element = frameRefs.current[focused];
      if (!element) return;
      const outer = host.getBoundingClientRect();
      const inner = element.getBoundingClientRect();
      const size = Math.min(inner.width, inner.height) * (focused === 'p' ? 0.58 : 0.84);
      setBox({
        x: inner.left - outer.left + inner.width / 2 - size / 2,
        y: inner.top - outer.top + inner.height / 2 - size / 2,
        size,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [focused]);

  const current = frames[focused ?? 'p'];
  const caption = useTyped(current.caption, {enabled: !reduced && settled, speed: 14});

  return (
    <figure
      className="surveillance m-0 w-full max-w-[26rem] md:max-w-[36rem] md:self-center md:justify-self-end"
      style={{gridArea: 'frames'}}
    >
      <motion.div
        ref={hostRef}
        role="group"
        aria-label={copy.hero.exhibits}
        className="relative grid aspect-square w-full gap-2 sm:gap-2.5"
        style={{
          gridTemplateAreas: '"p p a" "p p b" "c d e"',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
        }}
        variants={stagger}
        initial="hidden"
        animate="visible"
        onPointerLeave={() => setHovered(null)}
      >
        {FRAME_ORDER.map((key) => {
          const frame = frames[key];
          const revealed = settled && hovered === key;
          const inside = (
            <>
              <img src={frame.image} alt="" style={framing(frame)} />
              <Halftone
                art={frame.art}
                focus={frame.focus}
                zoom={frame.zoom}
                mode={frame.mode}
                theme={theme}
                {...(key === 'p'
                  ? {cells: 92, minCell: 2.6, maxCell: 4.2}
                  : frame.mode === 'type'
                    ? {cells: 104, minCell: 1.3, maxCell: 1.8}
                    : {cells: 52, minCell: 2.2, maxCell: 3.2})}
              />
              {key !== 'p' && <span className="frame-tag">{frame.tag}</span>}
            </>
          );
          const shared = {
            className: 'frame',
            style: {gridArea: key},
            variants: rise,
            'data-revealed': revealed ? 'true' : 'false',
            onPointerEnter: () => setHovered(key),
          };

          return frame.href ? (
            <motion.a
              key={key}
              {...shared}
              ref={(node: HTMLAnchorElement | null) => {
                frameRefs.current[key] = node;
              }}
              href={frame.href}
              aria-label={`${frame.tag}: ${frame.caption}`}
              onFocus={() => setHovered(key)}
              onBlur={() => setHovered(null)}
            >
              {inside}
            </motion.a>
          ) : (
            <motion.div
              key={key}
              {...shared}
              ref={(node: HTMLDivElement | null) => {
                frameRefs.current[key] = node;
              }}
              role="img"
              aria-label={`${copy.hero.portraitCaption}`}
            >
              {inside}
            </motion.div>
          );
        })}

        {box && (
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-10 text-alarm"
            initial={false}
            animate={{x: box.x, y: box.y, width: box.size, height: box.size}}
            transition={track}
            aria-hidden="true"
          >
            <ReticleMark />
          </motion.div>
        )}

        <motion.div
          className="pointer-events-none absolute -left-[2.5%] top-[3%] z-20"
          variants={land}
          custom={reduced ? 0 : 1.8}
          initial="hidden"
          animate="visible"
        >
          <span className="stamp stamp-live hero-stamp" style={{rotate: '-8deg'}}>
            <span>{copy.hero.stamp}</span>
            <span className="text-[0.46em] tracking-[0.16em]">{copy.hero.stampNote}</span>
          </span>
        </motion.div>
      </motion.div>

      <figcaption className="mt-4 flex min-h-[3rem] items-baseline gap-3 border-t-2 border-rule pt-3 text-small">
        <span className="label shrink-0">{current.tag}</span>
        <span className="text-ink" aria-hidden="true">
          {current.caption.slice(0, caption)}
          <span className="invisible">{current.caption.slice(caption)}</span>
        </span>
        <span className="sr-only">{current.caption}</span>
      </figcaption>
    </figure>
  );
}

function SectionHead({title, lead, stamp}: {title: string; lead?: string; stamp?: ReactNode}) {
  return (
    <div className="section-head">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <h2 className="headline m-0">{title}</h2>
        {stamp}
      </div>
      {lead && <p className="m-0 max-w-md text-pretty text-muted md:justify-self-end md:text-right">{lead}</p>}
    </div>
  );
}

function Stamp({
  children,
  tone,
  rotate = -6,
  className = '',
}: {
  children: ReactNode;
  tone: 'live' | 'ink' | 'gray';
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.span variants={land} custom={0.1} {...reveal} className="inline-block">
      <span className={`stamp stamp-${tone} ${className}`} style={{rotate: `${rotate}deg`}}>
        {children}
      </span>
    </motion.span>
  );
}

function ExhibitTag({children}: {children: ReactNode}) {
  return <span className="label bg-ink px-2.5 py-1 font-bold text-canvas">{children}</span>;
}

/**
 * The record's opening line: exhibit number, the product's name and its status
 * stamp, side by side, so nothing is stacked above the title.
 */
function RecordHeader({product, exhibit, copy}: {product: Product; exhibit: string; copy: Copy}) {
  const live = product.status === 'live';
  return (
    <div className="relative flex flex-wrap items-center gap-x-4 gap-y-3 border-b-2 border-rule pb-5">
      <ExhibitTag>
        {copy.product.exhibit} {exhibit}
      </ExhibitTag>
      <h3 className="m-0 font-typed text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-none text-ink">{product.title}</h3>
      {/* Struck across the rule, the way a status stamp lands on a file. */}
      <span className="absolute bottom-0 right-0 translate-y-1/2">
        <Stamp tone={live ? 'live' : 'ink'} rotate={live ? -6 : -3} className="bg-canvas text-small">
          {live ? copy.product.live : copy.product.building}
        </Stamp>
      </span>
    </div>
  );
}

/** The record's typed body: what it is, the checkable facts, the stack. */
function RecordBody({product, language, copy}: {product: Product; language: Language; copy: Copy}) {
  return (
    <>
      <p className="mt-7 font-bold text-muted">
        {localize(product.kicker, language)} · {product.year}
      </p>
      <p className="lede mt-5 max-w-[60ch]">{localize(product.description, language)}</p>

      <h4 className="label mt-8">{copy.product.facts}</h4>
      <ul className="m-0 mt-3 grid list-none gap-2 p-0">
        {product.facts.map((fact) => (
          <li key={fact.en} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-2 text-[0.95rem] leading-6">
            <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 bg-ink" />
            {localize(fact, language)}
          </li>
        ))}
      </ul>

      <h4 className="label mt-8">{copy.product.highlights}</h4>
      <ol className="rows m-0 mt-3 list-none p-0">
        {product.highlights.map((highlight, index) => (
          <li key={highlight.en} className="row grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2 py-2.5 text-[0.95rem] leading-6">
            <span className="font-bold text-muted">{pad(index + 1)}</span>
            {localize(highlight, language)}
          </li>
        ))}
      </ol>

      <h4 className="label mt-8">{copy.product.stack}</h4>
      <p className="m-0 mt-3 flex flex-wrap gap-y-1 text-small">
        {product.tech.map((tech) => (
          <span key={tech} className="term">
            {tech}
          </span>
        ))}
      </p>
    </>
  );
}

function PrimaryRecord({
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
  return (
    <article id="ek-01" className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      <div>
        <RecordHeader product={product} exhibit="01" copy={copy} />
        <RecordBody product={product} language={language} copy={copy} />
        {product.liveUrl && (
          <a href={product.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-9">
            {copy.product.visit}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <DocumentDemo demo={copy.demo} theme={theme} />
    </article>
  );
}

function Photostat({shot, language, title}: {shot: Shot; language: Language; title: string}) {
  return (
    <figure className="m-0">
      <a
        href={shot.src}
        target="_blank"
        rel="noreferrer"
        className="photostat"
        aria-label={`${title} — ${localize(shot.caption, language)}`}
      >
        <img src={shot.src} alt={localize(shot.alt, language)} loading="lazy" decoding="async" />
      </a>
      <figcaption className="mt-2 text-small text-muted">{localize(shot.caption, language)}</figcaption>
    </figure>
  );
}

function ProductRecord({
  product,
  exhibit,
  language,
  copy,
}: {
  product: Product;
  exhibit: string;
  language: Language;
  copy: Copy;
}) {
  return (
    <article
      id={`ek-${exhibit}`}
      className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
    >
      <div>
        <RecordHeader product={product} exhibit={exhibit} copy={copy} />
        <RecordBody product={product} language={language} copy={copy} />
        {product.liveUrl && (
          <a href={product.liveUrl} target="_blank" rel="noreferrer" className="btn btn-secondary mt-9">
            {copy.product.visit}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      {product.shots && product.shots.length > 0 && (
        <div className="lg:pt-[3.75rem]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-rule pb-3">
            <h4 className="label m-0">{copy.product.preview}</h4>
            <span className="text-small text-muted">{copy.product.shotHint}</span>
          </div>
          <div className="mt-5 grid gap-6">
            {product.shots.map((shot) => (
              <Photostat key={shot.src} shot={shot} language={language} title={product.title} />
            ))}
          </div>
        </div>
      )}
    </article>
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
      className="projection on-stock flex min-h-[520px] flex-col justify-between p-5 sm:p-7 lg:sticky lg:top-6 lg:self-start"
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
              className="btn btn-secondary min-h-[2.5rem] px-4 text-small"
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
        <span className="inline-flex items-center gap-2 font-bold text-on-stock">
          <Check className="h-4 w-4 text-stock-alarm" strokeWidth={3} aria-hidden="true" />
          {demo.preserved}
        </span>
        <span className="inline-flex items-center gap-2 text-on-stock-muted sm:justify-end">
          <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
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

function Process({copy}: {copy: Copy}) {
  return (
    <section id="process" className="border-y-2 border-rule bg-raised">
      <div className="shell band">
        <SectionHead title={copy.sections.process} />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h3 className="subhead">{copy.process.eyebrow}</h3>
            <p className="mt-5 max-w-[62ch] text-pretty">{copy.process.body}</p>
          </div>

          <ol className="rows m-0 list-none p-0">
            {copy.process.steps.map((step) => (
              <li key={step.title} className="row grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 py-4">
                <span className="tickbox mt-0.5" aria-hidden="true">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="m-0 font-bold text-ink">{step.title}</p>
                  <p className="m-0 mt-1 text-[0.95rem] text-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* The claim above is abstract; this table is where it becomes checkable. */}
        <div className="mt-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h3 className="subhead">{copy.process.matrixTitle}</h3>
            <p className="m-0 text-muted">{copy.process.matrixLead}</p>
          </div>

          <dl className="rows m-0 mt-6">
            {copy.process.matrix.map((row) => {
              const index = PRODUCTS.findIndex((product) => product.title === row.product);
              // The portfolio itself is the page being read, so it is live by definition.
              const live = index < 0 || PRODUCTS[index].status === 'live';
              return (
                <div
                  key={row.product}
                  className="row grid gap-2 py-4 md:grid-cols-[18rem_minmax(0,1fr)_9.5rem] md:items-center md:gap-8"
                >
                  <dt className="flex flex-wrap items-center gap-3">
                    {index >= 0 && (
                      <a href={`#ek-${pad(index + 1)}`} className="transition-opacity hover:opacity-80">
                        <ExhibitTag>
                          {copy.product.exhibit} {pad(index + 1)}
                        </ExhibitTag>
                      </a>
                    )}
                    <span className="font-bold uppercase tracking-[0.04em] text-ink">{row.product}</span>
                  </dt>
                  <dd className="m-0 text-body">{row.gate}</dd>
                  <dd className="m-0 md:justify-self-end">
                    {/* On a manila slip: alarm red on the raised band alone falls under AA. */}
                    <Stamp tone={live ? 'live' : 'ink'} rotate={-3} className="bg-canvas text-micro">
                      {live ? copy.product.live : copy.product.building}
                    </Stamp>
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

function Colophon({copy, language}: {copy: Copy; language: Language}) {
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
    <footer id="colophon" className="stock on-stock">
      <div className="shell band">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="headline m-0 text-on-stock">{copy.nav.contact}</h2>
            <p className="sentence mt-5 text-stock-alarm">{copy.hero.status}</p>
            <p className="mt-4 flex items-center gap-2 text-on-stock-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {copy.hero.location}
            </p>

            <div className="mt-10 border-t-2 border-on-stock">
              <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-stock-rule py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto]">
                <span className="label">{copy.contactLabels.email}</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-words font-bold text-on-stock transition-colors hover:text-stock-alarm"
                >
                  {CONTACT.email.split('@')[0]}@<wbr />
                  {CONTACT.email.split('@')[1]}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copy.contactLabels.copyAria}
                  className="col-start-2 inline-flex min-h-[2.25rem] items-center gap-2 justify-self-start border-2 border-on-stock px-2.5 text-micro font-bold uppercase tracking-[0.08em] text-on-stock transition-colors hover:border-stock-alarm hover:text-stock-alarm sm:col-start-auto"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
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
                  <span className="truncate font-bold text-on-stock transition-colors group-hover:text-stock-alarm">
                    {item.value}
                  </span>
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
              <div className="mt-4 border-t-2 border-on-stock pt-4">
                <p className="subhead m-0 text-on-stock">{copy.education.school}</p>
                <p className="m-0 mt-1.5 text-on-stock">{copy.education.degree}</p>
                <p className="m-0 mt-3 text-small text-on-stock-muted">
                  {copy.education.date} · {copy.education.location} · {copy.education.gpa}
                </p>
              </div>
            </div>

            <div>
              <h3 className="label m-0">{copy.sections.languages}</h3>
              <dl className="m-0 mt-4 border-t-2 border-on-stock">
                {copy.languages.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between border-b border-stock-rule py-3">
                    <dt className="font-bold text-on-stock">{item.name}</dt>
                    <dd className="m-0 text-small uppercase tracking-[0.08em] text-on-stock-muted">{item.level}</dd>
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
      </div>
    </footer>
  );
}
