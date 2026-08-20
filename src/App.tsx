import {MotionConfig, motion} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  ExternalLink,
  FileText,
  Github,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  MessageCircleMore,
  MonitorCheck,
  Phone,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import {useEffect, useState} from 'react';

type Language = 'tr' | 'en';
type Theme = 'kagit' | 'gece';
type LocalizedString = Record<Language, string>;

type Experience = {
  title: LocalizedString;
  company: string;
  date: LocalizedString;
  location?: LocalizedString;
  description: LocalizedString;
};

type Product = {
  title: string;
  kicker: LocalizedString;
  description: LocalizedString;
  tech: string[];
  highlights: LocalizedString[];
  icon: typeof FileText;
  liveUrl?: string;
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
      contact: 'İletişim',
    },
    themeLabel: 'Tema seçimi',
    themes: {kagit: 'Kağıt', gece: 'Gece'},
    hero: {
      eyebrow: 'Full-stack Yazılım Mühendisi',
      title: 'Fikirden canlı ürüne, uçtan uca.',
      subtitle:
        'Kullanıcı deneyiminden backend mimarisine, otomasyondan üretim dağıtımına kadar ürünün tamamını geliştiriyorum.',
      summary:
        'Spring Boot, Python/FastAPI, Node.js, React ve React Native ekosistemlerinde; güvenilir, ölçülebilir ve gerçek kullanıcıya ulaşan yazılımlar üretiyorum.',
      primaryCta: 'Canlı ürünü incele',
      secondaryCta: 'GitHub profili',
      location: 'Edirne, Türkiye',
      status: 'Uzaktan ve hibrit çalışmaya açık',
      portraitCaption: 'Anıl Karabulut — Edirne, 2026',
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
      colophon: 'Künye',
    },
    product: {
      live: 'Yayında',
      visit: 'Canlı siteyi aç',
      highlights: 'Öne çıkanlar',
      stack: 'Teknoloji',
    },
    demo: {
      label: 'Düzen korumalı çeviri',
      page: 'Sayfa 03 / 12',
      original: 'Kaynak · EN',
      translated: 'Çeviri · TR',
      sourceTitle: 'Quarterly performance',
      targetTitle: 'Çeyreklik performans',
      preserved: 'Düzen korundu',
      report: 'Sayfa bazlı rapor',
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
    },
    contactLabels: {
      email: 'E-posta',
      phone: 'Telefon',
      linkedin: 'LinkedIn',
      github: 'GitHub',
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
    footerNote: 'Bu sayfa React, TypeScript ve Tailwind ile dizilmiştir. Fraunces & IBM Plex Mono.',
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
      contact: 'Contact',
    },
    themeLabel: 'Theme selector',
    themes: {kagit: 'Paper', gece: 'Night'},
    hero: {
      eyebrow: 'Full-stack Software Engineer',
      title: 'From idea to live product, end to end.',
      subtitle:
        'I build the complete product—from user experience and backend architecture to automation and production deployment.',
      summary:
        'I create reliable, measurable software that reaches real users across Spring Boot, Python/FastAPI, Node.js, React, and React Native ecosystems.',
      primaryCta: 'Explore the live product',
      secondaryCta: 'GitHub profile',
      location: 'Edirne, Türkiye',
      status: 'Open to remote and hybrid work',
      portraitCaption: 'Anıl Karabulut — Edirne, 2026',
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
      colophon: 'Colophon',
    },
    product: {
      live: 'Live',
      visit: 'Visit live site',
      highlights: 'Highlights',
      stack: 'Stack',
    },
    demo: {
      label: 'Layout-preserving translation',
      page: 'Page 03 / 12',
      original: 'Source · EN',
      translated: 'Translation · TR',
      sourceTitle: 'Quarterly performance',
      targetTitle: 'Çeyreklik performans',
      preserved: 'Layout preserved',
      report: 'Page-level report',
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
    },
    contactLabels: {
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
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
    footerNote: 'Typeset in React, TypeScript and Tailwind. Fraunces & IBM Plex Mono.',
    footer: 'All rights reserved.',
  },
} as const;

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
    icon: FileText,
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
    tech: ['Next.js 15', 'Node.js Worker', 'Playwright', 'axe-core', 'PostgreSQL', 'Drizzle', 'pg-boss', 'Docker'],
    highlights: [
      {tr: 'Otomatik erişilebilirlik taraması ve WCAG 2.1 / EN 301 549 eşlemesi', en: 'Automated accessibility scans with WCAG 2.1 / EN 301 549 mapping'},
      {tr: 'PDF uyum raporu ve çok dilli erişilebilirlik beyanı üretimi', en: 'PDF compliance reports and multilingual accessibility statement generation'},
      {tr: 'Zamanlanmış izleme ve değişiklik odaklı uyarılar', en: 'Scheduled monitoring and change-aware alerts'},
    ],
    icon: MonitorCheck,
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
    tech: ['Spring Boot 4', 'Java 25', 'Next.js 16', 'Node.js / Baileys', 'PostgreSQL', 'pgvector', 'OpenAI', 'Testcontainers'],
    highlights: [
      {tr: 'İşletme bilgi bankası için RAG ve OpenAI function calling', en: 'RAG for the business knowledge base and OpenAI function calling'},
      {tr: 'Otomatik randevu oluşturma, çakışma kontrolü ve insana devir', en: 'Automated appointment creation, conflict checks, and human handoff'},
      {tr: 'Multi-tenant izolasyon ve KVKK uyumlu veri silme akışı', en: 'Multi-tenant isolation and KVKK-compliant data deletion'},
    ],
    icon: MessageCircleMore,
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

const THEME_OPTIONS: Theme[] = ['kagit', 'gece'];

const rise = {
  hidden: {opacity: 0, y: 14},
  visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: [0.22, 1, 0.36, 1] as const}},
};

const stagger = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {staggerChildren: 0.06}},
};

const reveal = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: {once: true, margin: '-60px'},
};

function localize(value: LocalizedString, language: Language) {
  return value[language];
}

/** Four-spoke radial mark used as the wordmark prefix and as a section marker. */
function SpikeMark({className = 'h-4 w-4'}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 1.5c.35 3.2.9 5.35 1.85 6.65.95 1.3 2.9 2.2 5.9 2.75l3.75.6-3.75.6c-3 .55-4.95 1.45-5.9 2.75-.95 1.3-1.5 3.45-1.85 6.65-.35-3.2-.9-5.35-1.85-6.65-.95-1.3-2.9-2.2-5.9-2.75L.5 11.5l3.75-.6c3-.55 4.95-1.45 5.9-2.75C11.1 6.85 11.65 4.7 12 1.5Z" />
    </svg>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>('tr');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'kagit';
    const current = document.documentElement.dataset.theme;
    return current === 'gece' ? 'gece' : 'kagit';
  });
  const copy = COPY[language];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('ak_theme', theme);
    } catch {
      /* storage unavailable — the in-memory theme still applies */
    }
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'gece' ? '#14120f' : '#f4efe4';
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
        <div className="grain" />

        <a href="#main-content" className="btn btn-primary fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0">
          {copy.skip}
        </a>

        <div className="relative z-10">
          <Masthead
            copy={copy}
            language={language}
            theme={theme}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
          />

          <main id="main-content">
            <Hero copy={copy} />
            <Ledger stats={copy.stats} />

            <section id="products" className="shell band">
              <SectionHead folio="01" title={copy.sections.products} lead={copy.sections.productsLead} />
              <PrimaryProduct product={PRODUCTS[0]} language={language} labels={copy.product} demo={copy.demo} />
              <motion.div variants={stagger} {...reveal} className="mt-4">
                {PRODUCTS.slice(1).map((product, index) => (
                  <ProductEntry
                    key={product.title}
                    product={product}
                    index={index + 2}
                    language={language}
                    labels={copy.product}
                  />
                ))}
              </motion.div>
            </section>

            <Process copy={copy} />

            <section id="skills" className="shell band">
              <SectionHead folio="03" title={copy.sections.skills} />
              <motion.div variants={stagger} {...reveal}>
                {SKILL_GROUPS.map((group) => (
                  <motion.div key={group.title.en} variants={rise} className="entry">
                    <div className="flex items-center gap-3 md:block">
                      <group.icon className="h-5 w-5 text-accent md:mb-3" aria-hidden="true" />
                      <h3 className="subhead">{localize(group.title, language)}</h3>
                    </div>
                    <p className="flex flex-wrap items-baseline">
                      {group.items.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section id="experience" className="bg-surface rule-top rule-bottom">
              <div className="shell band">
                <SectionHead folio="04" title={copy.sections.experience} />
                <motion.div variants={stagger} {...reveal}>
                  {EXPERIENCES.map((experience) => (
                    <motion.article key={`${experience.company}-${experience.date.en}`} variants={rise} className="entry">
                      <div className="meta-plain leading-6">
                        <span className="block text-ink">{localize(experience.date, language)}</span>
                        {experience.location && <span className="block">{localize(experience.location, language)}</span>}
                      </div>
                      <div>
                        <h3 className="subhead">{localize(experience.title, language)}</h3>
                        <p className="meta mt-2 text-accent">{experience.company}</p>
                        <p className="mt-4 max-w-3xl leading-7">{localize(experience.description, language)}</p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>

            <section id="archive" className="shell band">
              <SectionHead folio="05" title={copy.sections.archive} lead={copy.sections.archiveLead} />
              <motion.div variants={stagger} {...reveal} className="border-t-2 border-ink">
                {ARCHIVE_PROJECTS.map((project) => (
                  <motion.article
                    key={project.title.en}
                    variants={rise}
                    className="grid gap-3 border-b border-rule py-6 md:grid-cols-[5rem_minmax(0,1fr)_11rem] md:items-baseline md:gap-6"
                  >
                    <span className="meta-plain text-faint">{project.date ?? '—'}</span>
                    <div>
                      <h3 className="text-lg font-semibold leading-6 text-ink">{localize(project.title, language)}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        {localize(project.description, language)}
                      </p>
                      <p className="mt-3 flex flex-wrap items-baseline">
                        {project.tech.map((tech) => (
                          <span key={tech} className="tag">
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
                          className="index-link"
                          aria-label={`${localize(project.title, language)} — ${link.label}`}
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          </main>

          <Colophon copy={copy} />
        </div>
      </div>
    </MotionConfig>
  );
}

function Masthead({
  copy,
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}: {
  copy: (typeof COPY)[Language];
  language: Language;
  theme: Theme;
  onLanguageChange: (value: Language) => void;
  onThemeChange: (value: Theme) => void;
}) {
  return (
    /* Opaque, not blurred — a printed masthead rule rather than a glass bar. */
    <header className="sticky top-0 z-40 border-b border-rule bg-canvas">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <a href="#top" className="group flex items-center gap-2.5 text-ink" aria-label="Anıl Karabulut">
          <SpikeMark className="h-4 w-4 text-accent transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-display text-base font-medium tracking-tight">Anıl Karabulut</span>
          <span className="meta hidden border-l border-rule pl-2.5 lg:inline">{copy.hero.eyebrow}</span>
        </a>

        <div className="flex items-center gap-3">
          <nav aria-label={copy.navLabel} className="hidden items-center gap-6 lg:flex">
            {(Object.keys(copy.nav) as (keyof typeof copy.nav)[]).map((key) => (
              <a
                key={key}
                href={`#${key === 'contact' ? 'colophon' : key}`}
                className="border-b border-transparent pb-0.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {copy.nav[key]}
              </a>
            ))}
          </nav>

          <div className="toggle-group" role="group" aria-label={copy.navLabel}>
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onLanguageChange(option.value)}
                aria-pressed={language === option.value}
                className="toggle-btn"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="toggle-group" role="group" aria-label={copy.themeLabel}>
            {THEME_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onThemeChange(option)}
                aria-pressed={theme === option}
                className="toggle-btn"
              >
                {copy.themes[option]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({copy}: {copy: (typeof COPY)[Language]}) {
  return (
    <section id="top" className="shell grid gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-10">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7 xl:col-span-7">
        <motion.p variants={rise} className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{copy.hero.location}</span>
          <span className="text-rule-strong">/</span>
          <span>{copy.hero.status}</span>
        </motion.p>

        <motion.h1 variants={rise} className="display mt-7 text-balance">
          {copy.hero.title}
        </motion.h1>

        <motion.p variants={rise} className="lede mt-8 max-w-2xl">
          {copy.hero.subtitle}
        </motion.p>

        <motion.p variants={rise} className="mt-5 max-w-2xl leading-7 text-muted">
          {copy.hero.summary}
        </motion.p>

        <motion.div variants={rise} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="https://translateyourpdf.com" target="_blank" rel="noreferrer" className="btn btn-primary">
            {copy.hero.primaryCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Github className="h-4 w-4" aria-hidden="true" />
            {copy.hero.secondaryCta}
          </a>
        </motion.div>
      </motion.div>

      <motion.figure
        initial={{opacity: 0, y: 18}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, delay: 0.15}}
        className="portrait-frame m-0 self-end lg:col-span-4 lg:col-start-9"
      >
        <div className="border border-rule-strong bg-raised p-2">
          <img src="/profile.jpg" alt="Anıl Karabulut" className="portrait" />
        </div>
        <figcaption className="meta-plain mt-3 flex items-center gap-2 text-faint">
          <SpikeMark className="h-3 w-3" />
          {copy.hero.portraitCaption}
        </figcaption>
      </motion.figure>
    </section>
  );
}

function Ledger({stats}: {stats: (typeof COPY)[Language]['stats']}) {
  return (
    <div className="rule-top rule-bottom bg-surface">
      <dl className="shell grid divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-4 py-6 sm:justify-center sm:px-6">
            <dt className="folio-lg text-accent">{stat.value}</dt>
            <dd className="max-w-[13ch] text-sm leading-5 text-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SectionHead({folio, title, lead}: {folio: string; title: string; lead?: string}) {
  return (
    <div className="section-head">
      <p className="folio">§ {folio}</p>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="headline max-w-xl text-balance">{title}</h2>
        {lead && <p className="max-w-md text-pretty leading-7 text-muted md:text-right">{lead}</p>}
      </div>
    </div>
  );
}

function PrimaryProduct({
  product,
  language,
  labels,
  demo,
}: {
  product: Product;
  language: Language;
  labels: (typeof COPY)[Language]['product'];
  demo: (typeof COPY)[Language]['demo'];
}) {
  return (
    // The hairline mount keeps the ink panel readable in the dark theme too,
    // where panel and canvas sit close in value.
    <motion.article
      variants={rise}
      {...reveal}
      className="panel grid overflow-hidden border border-rule lg:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="p-7 md:p-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--c-panel-accent)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-[var(--c-panel-accent)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-[var(--c-panel-accent)]" />
            </span>
            {labels.live}
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--c-on-panel-muted)]">
            2026
          </span>
        </div>

        <h3 className="mt-6 font-display text-4xl font-normal leading-none tracking-tight text-[var(--c-on-panel)] md:text-5xl">
          {product.title}
        </h3>
        <p className="mt-3 text-[var(--c-panel-accent)]">{localize(product.kicker, language)}</p>
        <p className="mt-6 max-w-xl text-pretty leading-7 text-[var(--c-on-panel-muted)]">
          {localize(product.description, language)}
        </p>

        <h4 className="mt-9 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--c-on-panel-muted)]">
          {labels.highlights}
        </h4>
        <ul className="mt-4 border-t border-[var(--c-panel-rule)]">
          {product.highlights.map((highlight) => (
            <li
              key={highlight.en}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2 border-b border-[var(--c-panel-rule)] py-3 text-sm leading-6 text-[var(--c-on-panel)]"
            >
              <SpikeMark className="mt-1.5 h-3 w-3 text-[var(--c-panel-accent)]" />
              {localize(highlight, language)}
            </li>
          ))}
        </ul>

        <p className="mt-6 flex flex-wrap items-baseline">
          {product.tech.map((tech) => (
            <span key={tech} className="tag text-[var(--c-on-panel-muted)]">
              {tech}
            </span>
          ))}
        </p>

        {product.liveUrl && (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn mt-8 bg-[var(--c-panel-accent)] text-[#1a120c] hover:opacity-90"
          >
            {labels.visit}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <DocumentDemo demo={demo} />
    </motion.article>
  );
}

function DocumentDemo({demo}: {demo: (typeof COPY)[Language]['demo']}) {
  return (
    <div
      className="flex min-h-[420px] flex-col justify-between border-t border-[var(--c-panel-rule)] bg-[var(--c-panel-2)] p-6 sm:p-8 lg:border-l lg:border-t-0"
      aria-label={demo.label}
    >
      <div className="flex items-center justify-between border-b border-[var(--c-panel-rule)] pb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--c-on-panel-muted)]">
        <span>{demo.label}</span>
        <span>{demo.page}</span>
      </div>

      <div className="grid flex-1 items-center gap-4 py-8 sm:grid-cols-[1fr_auto_1fr]">
        <DemoPage label={demo.original} title={demo.sourceTitle} />
        <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[var(--c-panel-accent)] sm:rotate-0" aria-hidden="true" />
        <DemoPage label={demo.translated} title={demo.targetTitle} translated />
      </div>

      <div className="grid gap-2 border-t border-[var(--c-panel-rule)] pt-4 font-mono text-[0.68rem] text-[var(--c-on-panel-muted)] sm:grid-cols-2">
        <span className="text-[var(--c-panel-accent)]">✓ {demo.preserved}</span>
        <span className="sm:text-right">✓ {demo.report}</span>
      </div>
    </div>
  );
}

function DemoPage({label, title, translated = false}: {label: string; title: string; translated?: boolean}) {
  return (
    <div
      className={`mx-auto aspect-[3/4] w-full max-w-[168px] border p-3 ${
        translated ? 'border-[#c9a086] bg-[#fbf8f2]' : 'border-[#4a4032] bg-[#ece4d5]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] font-semibold uppercase tracking-wider text-[#6f6553]">{label}</span>
        <span className="h-1.5 w-1.5 bg-[#9a4a29]" />
      </div>
      <div className="mt-5 font-display text-[10px] font-medium leading-tight text-[#221d16]">{title}</div>
      <div className="mt-2 h-px w-8 bg-[#9a4a29]" />
      <div className="mt-4 space-y-1.5">
        <span className="block h-1 bg-[#bfae8c]" />
        <span className="block h-1 w-5/6 bg-[#cdbfa2]" />
        <span className="block h-1 w-4/6 bg-[#cdbfa2]" />
      </div>
      <div className="mt-5 grid grid-cols-3 items-end gap-1 border-b border-l border-[#bfae8c] px-1 pb-1">
        <span className="h-7 bg-[#c98a5f]" />
        <span className="h-11 bg-[#9a4a29]" />
        <span className="h-8 bg-[#b9762c]" />
      </div>
      <div className="mt-4 space-y-1.5">
        <span className="block h-1 bg-[#cdbfa2]" />
        <span className="block h-1 w-4/5 bg-[#cdbfa2]" />
      </div>
    </div>
  );
}

function ProductEntry({
  product,
  index,
  language,
  labels,
}: {
  product: Product;
  index: number;
  language: Language;
  labels: (typeof COPY)[Language]['product'];
}) {
  return (
    <motion.article variants={rise} className="entry">
      <div className="flex items-center gap-4 md:block">
        <span className="folio-lg">{String(index).padStart(2, '0')}</span>
        <product.icon className="h-5 w-5 text-accent md:mt-4" aria-hidden="true" />
      </div>

      <div>
        <h3 className="headline">{product.title}</h3>
        <p className="mt-2 text-accent">{localize(product.kicker, language)}</p>
        <p className="mt-5 max-w-2xl text-pretty leading-7">{localize(product.description, language)}</p>

        <div className="mt-7 grid gap-x-10 gap-y-6 lg:grid-cols-2">
          <div>
            <h4 className="meta">{labels.highlights}</h4>
            <ul className="mt-3 border-t border-rule">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight.en}
                  className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 border-b border-rule py-2.5 text-sm leading-6"
                >
                  <SpikeMark className="mt-1.5 h-2.5 w-2.5 text-accent" />
                  {localize(highlight, language)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="meta">{labels.stack}</h4>
            <p className="mt-3 flex flex-wrap items-baseline border-t border-rule pt-3">
              {product.tech.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Process({copy}: {copy: (typeof COPY)[Language]}) {
  return (
    <section id="process" className="rule-top rule-bottom bg-surface-strong">
      <div className="shell band">
        <SectionHead folio="02" title={copy.sections.process} />
        <motion.div variants={stagger} {...reveal} className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div variants={rise}>
            <h3 className="subhead tick">{copy.process.eyebrow}</h3>
            <p className="mt-5 text-pretty leading-7 text-body">{copy.process.body}</p>
          </motion.div>

          <motion.ol variants={stagger} className="border-t-2 border-ink">
            {copy.process.steps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={rise}
                className="grid gap-1 border-b border-rule py-5 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-6"
              >
                <span className="meta-plain text-accent">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{step.note}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}

function Colophon({copy}: {copy: (typeof COPY)[Language]}) {
  const items = [
    {icon: Mail, label: copy.contactLabels.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`},
    {icon: Phone, label: copy.contactLabels.phone, value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`},
    {icon: Linkedin, label: copy.contactLabels.linkedin, value: 'in/anilkarabulut', href: CONTACT.linkedin},
    {icon: Github, label: copy.contactLabels.github, value: 'anilkrblt', href: CONTACT.github},
  ];

  return (
    <footer id="colophon" className="panel">
      <div className="shell band">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--c-panel-accent)]">
              § 06 — {copy.sections.colophon}
            </p>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-[var(--c-on-panel)] md:text-5xl">
              {copy.hero.status}
            </h2>
            <p className="mt-6 flex items-center gap-2 font-mono text-sm text-[var(--c-on-panel-muted)]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {copy.hero.location}
            </p>

            <div className="mt-9 border-t border-[var(--c-panel-rule)]">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--c-panel-rule)] py-4 transition-colors hover:bg-[var(--c-panel-2)]"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--c-on-panel-muted)]">
                    {item.label}
                  </span>
                  <span className="truncate text-[var(--c-on-panel)] transition-colors group-hover:text-[var(--c-panel-accent)]">
                    {item.value}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[var(--c-on-panel-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-10">
            <div>
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--c-on-panel-muted)]">
                {copy.sections.education}
              </h3>
              <div className="mt-4 border-t border-[var(--c-panel-rule)] pt-4">
                <p className="font-display text-2xl text-[var(--c-on-panel)]">{copy.education.school}</p>
                <p className="mt-1.5 text-[var(--c-panel-accent)]">{copy.education.degree}</p>
                <p className="mt-3 font-mono text-xs text-[var(--c-on-panel-muted)]">
                  {copy.education.date} · {copy.education.location} · {copy.education.gpa}
                </p>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--c-on-panel-muted)]">
                <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                {copy.sections.languages}
              </h3>
              <dl className="mt-4 border-t border-[var(--c-panel-rule)]">
                {copy.languages.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-baseline justify-between border-b border-[var(--c-panel-rule)] py-3"
                  >
                    <dt className="text-[var(--c-on-panel)]">{item.name}</dt>
                    <dd className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-on-panel-muted)]">
                      {item.level}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--c-panel-rule)] pt-6 font-mono text-xs text-[var(--c-on-panel-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <SpikeMark className="h-3 w-3 text-[var(--c-panel-accent)]" />© {new Date().getFullYear()} Anıl Karabulut. {copy.footer}
          </p>
          <p>{copy.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
