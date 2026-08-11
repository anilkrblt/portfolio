import {MotionConfig, motion} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Calendar,
  Check,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  FileCheck2,
  FileText,
  Github,
  Globe2,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  MessageCircleMore,
  MonitorCheck,
  Phone,
  ScanText,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react';
import {useEffect, useState} from 'react';

type Language = 'tr' | 'en';
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
  primary?: boolean;
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
      process: 'Çalışma yöntemi',
      skills: 'Yetkinlikler',
      experience: 'Deneyim',
      contact: 'İletişim',
    },
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
      cardLabel: 'Ürün geliştirme odağı',
    },
    stats: [
      {value: '10', label: 'ürün ve proje'},
      {value: '1', label: 'yayındaki ürün'},
      {value: '3', label: 'otonom döngüyle geliştirilen ürün'},
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
      visit: 'Canlı siteyi aç',
      highlights: 'Öne çıkanlar',
      product: 'Ürün',
    },
    demo: {
      label: 'Düzen korumalı çeviri önizlemesi',
      page: 'Sayfa 03 / 12',
      original: 'Orijinal · EN',
      translated: 'Çeviri · TR',
      sourceTitle: 'Quarterly performance',
      targetTitle: 'Çeyreklik performans',
      preserved: 'Düzen korundu',
      report: 'Sayfa bazlı rapor',
    },
    process: {
      eyebrow: 'AI destekli otonom geliştirme döngüsü',
      body: 'Ürün geliştirme akışını makine tarafından doğrulanabilir kabul kriterleriyle başlatıyorum. Kritik davranışları donmuş golden testlerle sabitliyor; derleme, test ve kalite kontrollerini otomatik kapılardan geçiriyorum. Ürün ve mimari kararları belirlenmiş insan onay noktalarında netleşiyor. TranslateYourPDF, EAA Monitor ve Randevai bu yöntemle geliştirildi.',
      steps: ['Doğrulanabilir kriterler', 'Golden testler', 'Otomatik kalite kapıları', 'İnsan onayı'],
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
      gpa: 'GNO: 3.21',
    },
    languages: [
      {name: 'Türkçe', level: 'Anadil'},
      {name: 'İngilizce', level: 'C1 Seviye'},
    ],
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
      cardLabel: 'Product engineering focus',
    },
    stats: [
      {value: '10', label: 'products and projects'},
      {value: '1', label: 'product live in production'},
      {value: '3', label: 'products built with the autonomous loop'},
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
      visit: 'Visit live site',
      highlights: 'Highlights',
      product: 'Product',
    },
    demo: {
      label: 'Layout-preserving translation preview',
      page: 'Page 03 / 12',
      original: 'Original · EN',
      translated: 'Translation · TR',
      sourceTitle: 'Quarterly performance',
      targetTitle: 'Çeyreklik performans',
      preserved: 'Layout preserved',
      report: 'Page-level report',
    },
    process: {
      eyebrow: 'AI-assisted autonomous development loop',
      body: 'I begin product development with acceptance criteria that machines can verify. Critical behavior is locked with frozen golden tests, while builds, tests, and quality checks pass through automated gates. Product and architecture decisions are resolved at defined human approval points. TranslateYourPDF, EAA Monitor, and Randevai were all developed with this method.',
      steps: ['Verifiable criteria', 'Golden tests', 'Automated quality gates', 'Human approval'],
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
      gpa: 'GPA: 3.21',
    },
    languages: [
      {name: 'Turkish', level: 'Native'},
      {name: 'English', level: 'C1'},
    ],
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
    primary: true,
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

const languages: {value: Language; label: string}[] = [
  {value: 'tr', label: 'TR'},
  {value: 'en', label: 'EN'},
];

const containerVariants = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {staggerChildren: 0.07}},
};

const itemVariants = {
  hidden: {opacity: 0, y: 18},
  visible: {opacity: 1, y: 0, transition: {duration: 0.42}},
};

function localize(value: LocalizedString, language: Language) {
  return value[language];
}

export default function App() {
  const [language, setLanguage] = useState<Language>('tr');
  const copy = COPY[language];

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
      <div className="min-h-screen overflow-hidden bg-[#0b0f12] font-sans text-slate-300 selection:bg-teal-400/25 selection:text-teal-50">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-teal-300 px-4 py-2 font-semibold text-slate-950 transition-transform focus:translate-y-0"
        >
          {copy.skip}
        </a>

        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_8%,rgba(45,212,191,0.11),transparent_28%),radial-gradient(circle_at_90%_34%,rgba(56,189,248,0.055),transparent_30%)]" />

        <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0b0f12]/88 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8 lg:px-10">
            <a href="#top" className="group inline-flex items-center gap-3 text-sm font-semibold text-slate-100" aria-label="Anıl Karabulut">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-teal-300/30 bg-teal-300/10 font-mono text-xs font-bold text-teal-200 transition-colors group-hover:bg-teal-300 group-hover:text-slate-950">
                AK
              </span>
              <span className="hidden sm:inline">Anıl Karabulut</span>
            </a>

            <nav aria-label={copy.navLabel} className="hidden items-center gap-6 text-sm text-slate-400 lg:flex">
              <NavLink href="#products">{copy.nav.products}</NavLink>
              <NavLink href="#process">{copy.nav.process}</NavLink>
              <NavLink href="#skills">{copy.nav.skills}</NavLink>
              <NavLink href="#experience">{copy.nav.experience}</NavLink>
              <NavLink href="#contact">{copy.nav.contact}</NavLink>
            </nav>

            <div
              className="inline-flex rounded-lg border border-white/10 bg-white/[0.035] p-1"
              role="group"
              aria-label={language === 'tr' ? 'Dil seçimi' : 'Language selector'}
            >
              {languages.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setLanguage(item.value)}
                  className={`min-h-9 min-w-10 rounded-md px-3 text-xs font-bold transition-colors ${
                    language === item.value
                      ? 'bg-teal-300 text-slate-950'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`}
                  aria-pressed={language === item.value}
                  aria-label={item.value === 'tr' ? 'Türkçe' : 'English'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main id="main-content">
          <section id="top" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20 lg:px-10 lg:py-32">
            <motion.div initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3.5 py-2 text-sm font-medium text-teal-100">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {copy.hero.eyebrow}
              </div>

              <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">
                {copy.hero.title}
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-xl font-medium leading-8 text-slate-200 md:text-2xl md:leading-9">
                {copy.hero.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-400 md:text-lg md:leading-8">
                {copy.hero.summary}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="https://translateyourpdf.com" target="_blank" rel="noreferrer" className="button-primary">
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                  {copy.hero.primaryCta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="button-secondary">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  {copy.hero.secondaryCta}
                </a>
              </div>

              <dl className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
                {copy.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-4">
                    <dt className="text-2xl font-bold tracking-tight text-white">{stat.value}</dt>
                    <dd className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.aside
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.55, delay: 0.08}}
              className="w-full max-w-sm justify-self-start lg:justify-self-end"
              aria-label={copy.hero.cardLabel}
            >
              <div className="rounded-2xl border border-white/10 bg-[#11171b]/90 p-5 shadow-2xl shadow-black/35">
                <div className="overflow-hidden rounded-xl bg-slate-900">
                  <img src="/profile.jpg" alt="Anıl Karabulut" className="aspect-[4/4.25] w-full object-cover" />
                </div>
                <div className="mt-6 space-y-4 border-t border-white/8 pt-5 text-sm text-slate-300">
                  <p className="flex items-center gap-3">
                    <span className="rounded-lg bg-teal-300/10 p-2 text-teal-200"><MapPin className="h-4 w-4" aria-hidden="true" /></span>
                    {copy.hero.location}
                  </p>
                  <p className="flex items-start gap-3 leading-6">
                    <span className="rounded-lg bg-teal-300/10 p-2 text-teal-200"><BriefcaseBusiness className="h-4 w-4" aria-hidden="true" /></span>
                    <span className="pt-1">{copy.hero.status}</span>
                  </p>
                </div>
              </div>
            </motion.aside>
          </section>

          <div className="border-y border-white/8 bg-white/[0.018]">
            <section id="contact" className="mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:px-10">
              <ContactLink icon={Mail} label={copy.contactLabels.email} value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <ContactLink icon={Phone} label={copy.contactLabels.phone} value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} />
              <ContactLink icon={Linkedin} label={copy.contactLabels.linkedin} value="linkedin.com/in/anilkarabulut" href={CONTACT.linkedin} />
              <ContactLink icon={Github} label={copy.contactLabels.github} value="github.com/anilkrblt" href={CONTACT.github} />
            </section>
          </div>

          <section id="products" className="section-shell section-space">
            <SectionIntro eyebrow="01 / PRODUCT" title={copy.sections.products} lead={copy.sections.productsLead} />

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true, margin: '-80px'}} className="space-y-6">
              <PrimaryProduct product={PRODUCTS[0]} language={language} labels={copy.product} demo={copy.demo} />

              <div className="grid gap-6 lg:grid-cols-2">
                {PRODUCTS.slice(1).map((product) => (
                  <ProductCard key={product.title} product={product} language={language} labels={copy.product} />
                ))}
              </div>
            </motion.div>
          </section>

          <section id="process" className="border-y border-white/8 bg-[#0e1418]">
            <div className="section-shell section-space">
              <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{once: true, margin: '-80px'}} className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <p className="section-kicker">02 / PROCESS</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{copy.sections.process}</h2>
                </div>
                <div className="rounded-2xl border border-teal-300/15 bg-teal-300/[0.045] p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="rounded-xl bg-teal-300/12 p-3 text-teal-200"><Workflow className="h-6 w-6" aria-hidden="true" /></span>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-100">{copy.process.eyebrow}</h3>
                      <p className="mt-4 max-w-3xl text-pretty leading-7 text-slate-300">{copy.process.body}</p>
                    </div>
                  </div>
                  <ol className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {copy.process.steps.map((step, index) => (
                      <li key={step} className="flex items-center gap-3 rounded-lg border border-white/8 bg-black/15 px-3.5 py-3 text-sm text-slate-200">
                        <span className="font-mono text-xs font-bold text-teal-300">0{index + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="skills" className="section-shell section-space">
            <SectionIntro eyebrow="03 / TOOLKIT" title={copy.sections.skills} />
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true, margin: '-80px'}} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {SKILL_GROUPS.map((group) => {
                const Icon = group.icon;
                return (
                  <motion.article key={group.title.en} variants={itemVariants} className="rounded-xl border border-white/9 bg-white/[0.028] p-5 transition-colors hover:border-teal-300/35">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="rounded-lg bg-teal-300/10 p-2.5 text-teal-200"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                      <h3 className="font-semibold text-white">{localize(group.title, language)}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => <span key={skill} className="tech-chip tech-chip-neutral">{skill}</span>)}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </section>

          <section id="experience" className="border-y border-white/8 bg-white/[0.018]">
            <div className="section-shell section-space">
              <SectionIntro eyebrow="04 / EXPERIENCE" title={copy.sections.experience} />
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true, margin: '-80px'}} className="space-y-4">
                {EXPERIENCES.map((experience) => (
                  <motion.article key={`${experience.company}-${experience.date.en}`} variants={itemVariants} className="rounded-xl border border-white/9 bg-[#0d1216] p-5 md:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{localize(experience.title, language)}</h3>
                        <p className="mt-1 font-medium text-teal-300">{experience.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-400 md:justify-end">
                        <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden="true" />{localize(experience.date, language)}</span>
                        {experience.location && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{localize(experience.location, language)}</span>}
                      </div>
                    </div>
                    <p className="mt-4 max-w-4xl leading-7 text-slate-400">{localize(experience.description, language)}</p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>

          <section id="archive" className="section-shell section-space">
            <SectionIntro eyebrow="05 / ARCHIVE" title={copy.sections.archive} lead={copy.sections.archiveLead} />
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true, margin: '-80px'}} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {ARCHIVE_PROJECTS.map((project) => (
                <motion.article key={project.title.en} variants={itemVariants} className="flex h-full flex-col rounded-xl border border-white/8 bg-white/[0.022] p-5 transition-colors hover:border-white/16">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold leading-6 text-slate-100">{localize(project.title, language)}</h3>
                    {project.date && <span className="font-mono text-xs text-slate-500">{project.date}</span>}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{localize(project.description, language)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => <span key={tech} className="rounded bg-white/[0.045] px-2 py-1 text-[11px] font-medium text-slate-400">{tech}</span>)}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    {project.links.map((link) => (
                      <a key={`${project.title.en}-${link.label}`} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-teal-200" aria-label={`${localize(project.title, language)} ${link.label}`}>
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />{link.label}<ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section className="border-t border-white/8 bg-white/[0.018]">
            <div className="section-shell grid gap-5 py-16 md:grid-cols-2 md:py-20">
              <article className="rounded-xl border border-white/9 bg-[#0d1216] p-6">
                <MiniHeading icon={MapPin} title={copy.sections.education} />
                <h3 className="text-xl font-semibold text-white">{copy.education.school}</h3>
                <p className="mt-2 text-teal-300">{copy.education.degree}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{copy.education.location}</span><span>{copy.education.date}</span><span className="rounded bg-white/5 px-2 py-1 text-slate-300">{copy.education.gpa}</span>
                </div>
              </article>
              <article className="rounded-xl border border-white/9 bg-[#0d1216] p-6">
                <MiniHeading icon={Languages} title={copy.sections.languages} />
                <div className="grid gap-3">
                  {copy.languages.map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-lg border border-white/8 px-4 py-3">
                      <span className="font-medium text-slate-100">{item.name}</span>
                      <span className="rounded bg-teal-300/10 px-2 py-1 text-sm font-semibold text-teal-200">{item.level}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/8 px-5 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Anıl Karabulut. {copy.footer}
        </footer>
      </div>
    </MotionConfig>
  );
}

function NavLink({href, children}: {href: string; children: string}) {
  return <a href={href} className="rounded px-1 py-2 transition-colors hover:text-teal-200">{children}</a>;
}

function SectionIntro({eyebrow, title, lead}: {eyebrow: string; title: string; lead?: string}) {
  return (
    <div className="mb-10 md:mb-12">
      <p className="section-kicker">{eyebrow}</p>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
        {lead && <p className="max-w-xl text-pretty leading-7 text-slate-400 md:text-right">{lead}</p>}
      </div>
    </div>
  );
}

function PrimaryProduct({product, language, labels, demo}: {product: Product; language: Language; labels: (typeof COPY)[Language]['product']; demo: (typeof COPY)[Language]['demo']}) {
  const Icon = product.icon;
  return (
    <motion.article variants={itemVariants} className="overflow-hidden rounded-2xl border border-teal-300/22 bg-[linear-gradient(135deg,rgba(45,212,191,0.075),rgba(255,255,255,0.018)_45%)] shadow-2xl shadow-black/20">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-emerald-200">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" /></span>
              {labels.live}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{labels.product} / 2026</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="rounded-xl bg-teal-300/12 p-3 text-teal-200"><Icon className="h-7 w-7" aria-hidden="true" /></span>
            <div><h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{product.title}</h3><p className="mt-1 text-sm font-medium text-teal-200">{localize(product.kicker, language)}</p></div>
          </div>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">{localize(product.description, language)}</p>

          <h4 className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{labels.highlights}</h4>
          <ul className="mt-4 space-y-3">
            {product.highlights.map((highlight) => (
              <li key={highlight.en} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden="true" />{localize(highlight, language)}</li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">{product.tech.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}</div>
          {product.liveUrl && <a href={product.liveUrl} target="_blank" rel="noreferrer" className="button-primary mt-8"><Globe2 className="h-4 w-4" aria-hidden="true" />{labels.visit}<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>}
        </div>

        <DocumentDemo demo={demo} />
      </div>
    </motion.article>
  );
}

function DocumentDemo({demo}: {demo: (typeof COPY)[Language]['demo']}) {
  return (
    <div className="relative min-h-[420px] border-t border-white/8 bg-[#080c0f] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8" aria-label={demo.label}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(45,212,191,0.09),transparent_42%)]" />
      <div className="relative flex h-full flex-col rounded-xl border border-white/10 bg-[#10161a] p-4 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/8 pb-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2"><ScanText className="h-4 w-4 text-teal-300" aria-hidden="true" />{demo.label}</span>
          <span className="font-mono">{demo.page}</span>
        </div>

        <div className="grid flex-1 gap-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <DemoPage label={demo.original} title={demo.sourceTitle} />
          <span className="mx-auto grid h-9 w-9 rotate-90 place-items-center rounded-full border border-teal-300/20 bg-teal-300/10 text-teal-200 sm:rotate-0"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          <DemoPage label={demo.translated} title={demo.targetTitle} translated />
        </div>

        <div className="grid gap-2 border-t border-white/8 pt-3 sm:grid-cols-2">
          <span className="inline-flex items-center gap-2 rounded-md bg-teal-300/8 px-3 py-2 text-xs font-medium text-teal-100"><Check className="h-3.5 w-3.5" aria-hidden="true" />{demo.preserved}</span>
          <span className="inline-flex items-center gap-2 rounded-md bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-300"><FileCheck2 className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />{demo.report}</span>
        </div>
      </div>
    </div>
  );
}

function DemoPage({label, title, translated = false}: {label: string; title: string; translated?: boolean}) {
  return (
    <div className={`mx-auto aspect-[3/4] w-full max-w-[165px] rounded-md border p-3 shadow-xl ${translated ? 'border-teal-300/25 bg-[#f1f5f4]' : 'border-white/10 bg-[#e7e8e5]'}`}>
      <div className="flex items-center justify-between"><span className="font-mono text-[7px] font-bold uppercase tracking-wide text-slate-600">{label}</span><span className="h-2 w-2 rounded-full bg-teal-500" /></div>
      <div className="mt-5 text-[9px] font-bold leading-tight text-slate-800">{title}</div>
      <div className="mt-2 h-0.5 w-8 bg-teal-500" />
      <div className="mt-4 space-y-1.5"><span className="block h-1 rounded bg-slate-400/55" /><span className="block h-1 w-5/6 rounded bg-slate-400/45" /><span className="block h-1 w-4/6 rounded bg-slate-400/45" /></div>
      <div className="mt-5 grid grid-cols-3 items-end gap-1 border-b border-l border-slate-400/50 px-1 pb-1"><span className="h-7 bg-teal-500/55" /><span className="h-11 bg-teal-500/75" /><span className="h-8 bg-teal-500/60" /></div>
      <div className="mt-4 space-y-1.5"><span className="block h-1 rounded bg-slate-400/45" /><span className="block h-1 w-4/5 rounded bg-slate-400/45" /></div>
    </div>
  );
}

function ProductCard({product, language, labels}: {product: Product; language: Language; labels: (typeof COPY)[Language]['product']}) {
  const Icon = product.icon;
  return (
    <motion.article variants={itemVariants} className="flex h-full flex-col rounded-2xl border border-white/9 bg-white/[0.028] p-6 transition-colors hover:border-teal-300/25 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-xl bg-teal-300/10 p-3 text-teal-200"><Icon className="h-6 w-6" aria-hidden="true" /></span>
        <span className="rounded-full border border-white/9 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{labels.product}</span>
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">{product.title}</h3>
      <p className="mt-2 font-medium text-teal-200">{localize(product.kicker, language)}</p>
      <p className="mt-4 leading-7 text-slate-400">{localize(product.description, language)}</p>
      <ul className="mt-6 space-y-3 border-t border-white/8 pt-5">
        {product.highlights.map((highlight) => <li key={highlight.en} className="flex gap-3 text-sm leading-6 text-slate-300"><Check className="mt-1 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />{localize(highlight, language)}</li>)}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-7">{product.tech.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}</div>
    </motion.article>
  );
}

function MiniHeading({icon: Icon, title}: {icon: typeof Code2; title: string}) {
  return <div className="mb-5 flex items-center gap-3"><span className="rounded-lg bg-teal-300/10 p-2 text-teal-200"><Icon className="h-5 w-5" aria-hidden="true" /></span><h2 className="font-semibold text-slate-100">{title}</h2></div>;
}

function ContactLink({icon: Icon, label, value, href}: {icon: typeof Mail; label: string; value: string; href: string}) {
  const external = href.startsWith('http');
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="group flex min-w-0 items-center gap-3 rounded-lg border border-white/8 bg-black/10 p-3.5 transition-colors hover:border-teal-300/35" aria-label={`${label}: ${value}`}>
      <span className="rounded-lg bg-white/[0.04] p-2 text-teal-200"><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span><span className="block truncate text-sm font-medium text-slate-300 group-hover:text-teal-100">{value}</span></span>
    </a>
  );
}
