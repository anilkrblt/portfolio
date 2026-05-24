import {useEffect, useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Calendar,
  Code2,
  Database,
  Github,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';

type Language = 'tr' | 'en';
type LocalizedString = Record<Language, string>;

type Experience = {
  title: LocalizedString;
  company: string;
  date: LocalizedString;
  location?: LocalizedString;
  description: LocalizedString;
};

type Project = {
  title: LocalizedString;
  date?: string;
  tech: string[];
  description: LocalizedString;
  impact: LocalizedString;
  links: {
    label: string;
    url: string;
  }[];
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
    metaTitle: 'Anıl Karabulut - Full-stack Yazılım Mühendisi',
    metaDescription:
      'Anıl Karabulut; backend, mobil uygulama ve modern web deneyimleri geliştiren full-stack yazılım mühendisi.',
    nav: {
      experience: 'Deneyim',
      projects: 'Projeler',
      skills: 'Yetkinlikler',
      contact: 'İletişim',
    },
    hero: {
      eyebrow: 'Full-stack Yazılım Mühendisi',
      title: 'Anıl Karabulut',
      subtitle:
        'Güvenli API mimarileri, mobil uygulamalar ve ölçeklenebilir full-stack ürünler geliştiriyorum.',
      summary:
        'Trakya Üniversitesi Bilgisayar Mühendisliği mezunuyum. Spring Boot, .NET, Node.js, React Native ve React ekosistemlerinde ürün odaklı, bakımı kolay ve dağıtıma hazır yazılım geliştirmeye odaklanıyorum.',
      primaryCta: 'E-posta gönder',
      secondaryCta: 'GitHub profili',
      location: 'Edirne, Türkiye',
      status: 'Uzaktan ve hibrit çalışma için uygun',
    },
    stats: [
      {value: '7+', label: 'öne çıkan proje'},
      {value: '4', label: 'ana teknoloji alanı'},
      {value: 'C1', label: 'İngilizce seviye'},
    ],
    sections: {
      skills: 'Yetkinlik Alanları',
      experience: 'İş Deneyimi',
      projects: 'Öne Çıkan Projeler',
      education: 'Eğitim',
      languages: 'Diller',
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
      date: '09/2021 - 06/2025',
      gpa: 'GNO: 3.21',
    },
    languages: [
      {name: 'Türkçe', level: 'Anadil'},
      {name: 'İngilizce', level: 'C1 Seviye'},
    ],
    footer: 'Tüm hakları saklıdır.',
  },
  en: {
    metaTitle: 'Anıl Karabulut - Full-stack Software Engineer',
    metaDescription:
      'Anıl Karabulut is a full-stack software engineer building backend systems, mobile apps, and modern web experiences.',
    nav: {
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Full-stack Software Engineer',
      title: 'Anıl Karabulut',
      subtitle:
        'I build secure API architectures, mobile apps, and scalable full-stack products.',
      summary:
        'I am a Computer Engineering graduate from Trakya University, focused on product-minded, maintainable, and deployment-ready software across Spring Boot, .NET, Node.js, React Native, and React.',
      primaryCta: 'Send email',
      secondaryCta: 'GitHub profile',
      location: 'Edirne, Türkiye',
      status: 'Open to remote and hybrid work',
    },
    stats: [
      {value: '7+', label: 'featured projects'},
      {value: '4', label: 'core tech areas'},
      {value: 'C1', label: 'English level'},
    ],
    sections: {
      skills: 'Skill Areas',
      experience: 'Work Experience',
      projects: 'Featured Projects',
      education: 'Education',
      languages: 'Languages',
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
      date: '09/2021 - 06/2025',
      gpa: 'GPA: 3.21',
    },
    languages: [
      {name: 'Turkish', level: 'Native'},
      {name: 'English', level: 'C1 Level'},
    ],
    footer: 'All rights reserved.',
  },
} as const;

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: {tr: 'Backend', en: 'Backend'},
    icon: Server,
    items: ['Spring Boot', '.NET Core', 'Node.js', 'Go', 'REST API', 'JWT'],
  },
  {
    title: {tr: 'Frontend & Mobil', en: 'Frontend & Mobile'},
    icon: Smartphone,
    items: ['React', 'React Native', 'Flutter', 'TypeScript', 'Expo'],
  },
  {
    title: {tr: 'Veri & DevOps', en: 'Data & DevOps'},
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'Docker', 'Kubernetes', 'Flyway'],
  },
  {
    title: {tr: 'Mimari', en: 'Architecture'},
    icon: ShieldCheck,
    items: ['Clean Architecture', 'Onion Architecture', 'Repository Pattern'],
  },
];

const EXPERIENCES: Experience[] = [
  {
    title: {tr: 'Mobil Uygulama Geliştirici', en: 'Mobile Application Developer'},
    company: 'Extreme BS',
    date: {tr: '02/2026 - Günümüz', en: '02/2026 - Present'},
    location: {tr: 'Uzaktan', en: 'Remote'},
    description: {
      tr: 'React Native ve Expo ile ERP odaklı mobil ekranlar geliştiriyor, servis entegrasyonlarını ve uygulama akışlarını ürün ihtiyaçlarına göre düzenliyorum.',
      en: 'Building ERP-focused mobile screens with React Native and Expo, while shaping service integrations and app flows around product needs.',
    },
  },
  {
    title: {tr: 'Stajyer Yazılım Geliştirici', en: 'Software Developer Intern'},
    company: 'iQuality',
    date: {tr: '10/2025 - 11/2025', en: '10/2025 - 11/2025'},
    description: {
      tr: 'Spring Boot 3 ile JWT korumalı CRM REST API geliştirdim; PostgreSQL şeması, Flyway migrasyonları, Docker ortamı, ReDoc dokümantasyonu ve Railway dağıtımı hazırladım.',
      en: 'Developed a JWT-secured CRM REST API with Spring Boot 3, including PostgreSQL schema design, Flyway migrations, Docker setup, ReDoc documentation, and Railway deployment.',
    },
  },
  {
    title: {tr: 'Stajyer Mobil Geliştirici', en: 'Mobile Developer Intern'},
    company: 'Extreme BS',
    date: {tr: '08/2025 - 09/2025', en: '08/2025 - 09/2025'},
    description: {
      tr: 'React Native ve TypeScript ile canlı servisleri kullanan mobil uygulama ekranları geliştirdim; Metro, Jest, ESLint, Prettier, Babel ve TypeScript yapılandırmalarında çalıştım.',
      en: 'Built React Native and TypeScript mobile screens on top of live services, and worked with Metro, Jest, ESLint, Prettier, Babel, and TypeScript configuration.',
    },
  },
];

const PROJECTS: Project[] = [
  {
    title: {tr: 'React Log Agent', en: 'React Log Agent'},
    date: '2026',
    tech: ['TypeScript', 'React', 'React Native', 'Node.js', 'WebSocket', 'npm Workspaces'],
    description: {
      tr: 'React ve React Native uygulamaları için fetch, Axios, route geçişleri ve React Navigation ekran değişimlerini tek bir yerel terminal dashboard’una aktaran geliştirme zamanı telemetri aracı.',
      en: 'A development-time telemetry tool for React and React Native apps that streams fetch, Axios, route transitions, and React Navigation screen changes into one local terminal dashboard.',
    },
    impact: {
      tr: 'Opt-in runtime, WebSocket handshake, adapter cleanup, hassas veri maskeleme ve bağlantı yokken sıfır overhead yaklaşımıyla web ve mobil ortamları aynı paket üzerinden destekler.',
      en: 'Supports web and mobile from the same runtime package with an opt-in model, WebSocket handshake, adapter cleanup, privacy-focused redaction, and zero overhead when disconnected.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/dev-logger'}],
  },
  {
    title: {tr: 'Halısaha Otomasyon Sistemi', en: 'Football Field Automation System'},
    date: '2025',
    tech: ['C#', 'ASP.NET Core', 'React Native', 'MySQL', 'Entity Framework', 'SignalR'],
    description: {
      tr: 'Halısaha işletmeleri için saha yönetimi, çevrim içi rezervasyon, takım oluşturma ve sosyal etkileşim akışlarını bir araya getiren çok yönlü bir platform.',
      en: 'A multi-sided platform for field management, online reservations, team creation, and social interaction flows for football field businesses.',
    },
    impact: {
      tr: 'Onion Architecture ile ölçeklenebilir REST API kuruldu; SignalR ile anlık iletişim modülleri desteklendi.',
      en: 'Implemented a scalable REST API with Onion Architecture and supported real-time communication modules through SignalR.',
    },
    links: [
      {label: 'Backend', url: 'https://github.com/anilkrblt/HalisahaOtomasyonBackend'},
      {label: 'Frontend', url: 'https://github.com/sametakisik/OnlineHalisaham'},
    ],
  },
  {
    title: {
      tr: 'Görüntü İşleme ile İnsan ve Hayvan Tespiti',
      en: 'Human and Animal Detection with Computer Vision',
    },
    date: '2025',
    tech: ['Python', 'OpenCV', 'PyTorch', 'YOLOv8'],
    description: {
      tr: 'İnsan ve 80 farklı hayvan sınıfını görseller üzerinde tanıyıp konumlandıran nesne tespit sistemi.',
      en: 'An object detection system that recognizes and localizes humans and 80 animal classes in images.',
    },
    impact: {
      tr: 'YOLOv8 ve SSD300 mimarileriyle model eğitimi, gerçek zamanlı tespit ve performans analizi yürütüldü.',
      en: 'Handled model training, real-time detection, and performance analysis with YOLOv8 and SSD300 architectures.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/animal_detection'}],
  },
  {
    title: {tr: 'Soru Bankası Sistemi', en: 'Question Bank System'},
    date: '2024',
    tech: ['Node.js', 'Express', 'React', 'MySQL', 'JWT'],
    description: {
      tr: 'Kullanıcıların soru ekleyebildiği, çözebildiği ve grup içi sınavlar oluşturabildiği eğitim platformu.',
      en: 'An education platform where users can add and solve questions, then create exams for groups.',
    },
    impact: {
      tr: 'Kategori yönetimi, sınav oluşturma, sonuç analizi, kullanıcı arayüzü ve admin paneli geliştirildi.',
      en: 'Delivered category management, exam creation, result analysis, user-facing screens, and an admin panel.',
    },
    links: [
      {label: 'Backend', url: 'https://github.com/anilkrblt/sorubankasi-backend'},
      {label: 'Frontend', url: 'https://github.com/anilkrblt/sorubankasi-frontend'},
    ],
  },
  {
    title: {tr: 'Derslik & Laboratuvar Yönetim Sistemi', en: 'Classroom & Laboratory Management System'},
    tech: ['ASP.NET Core', 'React', 'MySQL', 'JWT', 'Clean Architecture'],
    description: {
      tr: 'Eğitim kurumları için sınıf, ders planlama, arıza ve şikayet süreçlerini yöneten modüler platform.',
      en: 'A modular platform for education teams to manage classrooms, schedules, incidents, and complaints.',
    },
    impact: {
      tr: 'Clean Architecture, Repository Pattern, JWT tabanlı rol/izin yapısı ve MySQL optimizasyonları uygulandı.',
      en: 'Applied Clean Architecture, Repository Pattern, JWT-based roles and permissions, and MySQL optimizations.',
    },
    links: [
      {label: 'Backend', url: 'https://github.com/anilkrblt/classroom_management_backend'},
      {label: 'Frontend', url: 'https://github.com/anilkrblt/class_management_client'},
    ],
  },
  {
    title: {
      tr: 'Derin Öğrenme Tabanlı Kitap Öneri Sistemi',
      en: 'Deep Learning Book Recommendation System',
    },
    date: '2025',
    tech: ['Python', 'PyTorch', 'Deep Learning'],
    description: {
      tr: 'Book-Crossing veri seti üzerinde kullanıcı ve kitap embedding temsilleriyle kişiselleştirilmiş öneri sistemi.',
      en: 'A personalized recommendation system using user and book embeddings on the Book-Crossing dataset.',
    },
    impact: {
      tr: '46+ milyon parametreli MLP modelinde Batch Normalization, Dropout ve Early Stopping ile 0.34 RMSE doğrulama skoru elde edildi.',
      en: 'Reached a 0.34 validation RMSE with a 46M+ parameter MLP model using Batch Normalization, Dropout, and Early Stopping.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/book_recommandation_system'}],
  },
  {
    title: {tr: 'Musica Müzik Uygulaması', en: 'Musica Music App'},
    date: '2023',
    tech: ['Flutter', 'Dart', 'Firebase'],
    description: {
      tr: 'Flutter ile geliştirilen, kullanıcı hesabı, çalma listesi, favoriler ve profil yönetimi içeren mobil müzik uygulaması.',
      en: 'A Flutter music app with user accounts, playlists, favorites, and profile management.',
    },
    impact: {
      tr: 'Firebase Authentication ve Firestore entegrasyonlarıyla responsive, kullanıcı odaklı mobil akışlar oluşturuldu.',
      en: 'Created responsive, user-focused mobile flows with Firebase Authentication and Firestore integrations.',
    },
    links: [{label: 'Repo', url: 'https://github.com/anilkrblt/musica'}],
  },
];

const languages: {value: Language; label: string}[] = [
  {value: 'tr', label: 'TR'},
  {value: 'en', label: 'EN'},
];

function localize(value: LocalizedString, language: Language) {
  return value[language];
}

export default function App() {
  const [language, setLanguage] = useState<Language>('tr');
  const copy = COPY[language];

  const containerVariants = useMemo(
    () => ({
      hidden: {opacity: 0},
      visible: {
        opacity: 1,
        transition: {staggerChildren: 0.08},
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: {opacity: 0, y: 18},
      visible: {opacity: 1, y: 0},
    }),
    [],
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.metaTitle;

    const updateMeta = (selector: string, value: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) {
        element.content = value;
      }
    };

    updateMeta('meta[name="description"]', copy.metaDescription);
    updateMeta('meta[property="og:title"]', copy.metaTitle);
    updateMeta('meta[property="og:description"]', copy.metaDescription);
    updateMeta('meta[name="twitter:title"]', copy.metaTitle);
    updateMeta('meta[name="twitter:description"]', copy.metaDescription);
  }, [copy.metaDescription, copy.metaTitle, language]);

  return (
    <div className="min-h-screen bg-[#0d1014] text-slate-300 font-sans selection:bg-teal-500/25 selection:text-teal-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,184,166,0.08),rgba(13,16,20,0)_34%),linear-gradient(135deg,rgba(245,158,11,0.05),rgba(13,16,20,0)_42%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0d1014]/86 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <a href="#top" className="text-sm font-semibold tracking-wide text-slate-100">
            Anıl Karabulut
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#skills" className="transition-colors hover:text-teal-300">
              {copy.nav.skills}
            </a>
            <a href="#experience" className="transition-colors hover:text-teal-300">
              {copy.nav.experience}
            </a>
            <a href="#projects" className="transition-colors hover:text-teal-300">
              {copy.nav.projects}
            </a>
            <a href="#contact" className="transition-colors hover:text-teal-300">
              {copy.nav.contact}
            </a>
          </nav>

          <div
            className="inline-flex rounded-md border border-white/10 bg-white/[0.03] p-1"
            aria-label={language === 'tr' ? 'Dil seçimi' : 'Language selector'}
          >
            {languages.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setLanguage(item.value)}
                className={`min-w-10 rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                  language === item.value
                    ? 'bg-teal-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
                aria-pressed={language === item.value}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="top" className="relative mx-auto max-w-6xl px-5 md:px-8">
        <motion.section
          initial={{opacity: 0, y: -18}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="grid min-h-[calc(100vh-64px)] items-center gap-12 py-14 md:grid-cols-[1fr_320px] md:py-20"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-sm font-medium text-teal-200">
              <Sparkles className="h-4 w-4" />
              {copy.hero.eyebrow}
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-50 md:text-6xl">
              {copy.hero.title}
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-medium leading-tight text-slate-100 md:text-2xl">
              {copy.hero.subtitle}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              {copy.hero.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-300"
              >
                <Mail className="h-4 w-4" />
                {copy.hero.primaryCta}
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-teal-300/70 hover:text-teal-200"
              >
                <Github className="h-4 w-4" />
                {copy.hero.secondaryCta}
              </a>
            </div>

            <dl className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                  <dt className="text-2xl font-bold text-slate-50">{stat.value}</dt>
                  <dd className="mt-1 text-xs leading-5 text-slate-500 md:text-sm">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="justify-self-start md:justify-self-end">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30">
              <div className="overflow-hidden rounded-md bg-slate-900">
                <img
                  src="/profile.jpg"
                  alt="Anıl Karabulut"
                  className="aspect-square w-64 object-cover md:w-72"
                />
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-teal-300" />
                  {copy.hero.location}
                </p>
                <p className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-teal-300" />
                  {copy.hero.status}
                </p>
              </div>
            </div>
          </aside>
        </motion.section>

        <section id="contact" className="grid gap-3 border-y border-white/10 py-5 md:grid-cols-4">
          <ContactLink
            icon={Mail}
            label={copy.contactLabels.email}
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
          />
          <ContactLink
            icon={Phone}
            label={copy.contactLabels.phone}
            value={CONTACT.phone}
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
          />
          <ContactLink
            icon={Linkedin}
            label={copy.contactLabels.linkedin}
            value="linkedin.com/in/anilkarabulut"
            href={CONTACT.linkedin}
          />
          <ContactLink
            icon={Github}
            label={copy.contactLabels.github}
            value="github.com/anilkrblt"
            href={CONTACT.github}
          />
        </section>

        <motion.section
          id="skills"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          className="py-20"
        >
          <SectionHeading icon={Code2} title={copy.sections.skills} />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <motion.article
                  key={group.title.en}
                  variants={itemVariants}
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-teal-300/40"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-md bg-teal-400/10 p-2 text-teal-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-lg font-semibold text-slate-50">{localize(group.title, language)}</h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-white/10 bg-slate-950/50 px-2.5 py-1.5 text-xs font-medium text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          className="py-20"
        >
          <SectionHeading icon={BriefcaseBusiness} title={copy.sections.experience} />

          <div className="space-y-5">
            {EXPERIENCES.map((experience) => (
              <motion.article
                key={`${experience.company}-${experience.date.en}`}
                variants={itemVariants}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-50">{localize(experience.title, language)}</h2>
                    <p className="mt-1 text-base font-medium text-teal-300">{experience.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-500 md:justify-end">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {localize(experience.date, language)}
                    </span>
                    {experience.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {localize(experience.location, language)}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 max-w-4xl leading-7 text-slate-400">
                  {localize(experience.description, language)}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          className="py-20"
        >
          <SectionHeading icon={Database} title={copy.sections.projects} />

          <div className="grid gap-5 lg:grid-cols-2">
            {PROJECTS.map((project) => (
              <motion.article
                key={project.title.en}
                variants={itemVariants}
                className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-teal-300/40 md:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold leading-snug text-slate-50">{localize(project.title, language)}</h2>
                  {project.date && (
                    <span className="rounded border border-white/10 px-2 py-1 text-xs font-semibold text-slate-500">
                      {project.date}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded bg-teal-400/10 px-2.5 py-1 text-xs font-medium text-teal-200">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mt-5 leading-7 text-slate-400">{localize(project.description, language)}</p>
                <p className="mt-3 leading-7 text-slate-300">{localize(project.impact, language)}</p>

                <div className="mt-auto flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  {project.links.map((link) => (
                    <a
                      key={`${project.title.en}-${link.label}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-teal-300/60 hover:text-teal-200"
                      aria-label={`${localize(project.title, language)} ${link.label}`}
                    >
                      <Github className="h-4 w-4" />
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          className="grid gap-5 py-20 md:grid-cols-2"
        >
          <motion.article variants={itemVariants} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
            <SectionHeading compact icon={MapPin} title={copy.sections.education} />
            <h2 className="text-xl font-semibold text-slate-50">{copy.education.school}</h2>
            <p className="mt-2 text-teal-300">{copy.education.degree}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
              <span>{copy.education.location}</span>
              <span>{copy.education.date}</span>
              <span className="rounded bg-slate-950/60 px-2 py-1 text-slate-300">{copy.education.gpa}</span>
            </div>
          </motion.article>

          <motion.article variants={itemVariants} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
            <SectionHeading compact icon={Languages} title={copy.sections.languages} />
            <div className="grid gap-3">
              {copy.languages.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-md border border-white/10 p-4">
                  <span className="font-medium text-slate-100">{item.name}</span>
                  <span className="rounded bg-teal-400/10 px-2 py-1 text-sm font-semibold text-teal-200">
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.article>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Anıl Karabulut. {copy.footer}
      </footer>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  compact = false,
}: {
  icon: typeof Code2;
  title: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${compact ? 'mb-5' : 'mb-8'}`}>
      <span className="rounded-md border border-teal-300/20 bg-teal-400/10 p-2 text-teal-300">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className={`${compact ? 'text-base' : 'text-2xl'} font-semibold text-slate-50`}>{title}</h2>
    </div>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group flex min-w-0 items-center gap-3 rounded-md border border-white/10 bg-white/[0.025] p-4 transition-colors hover:border-teal-300/50"
      aria-label={label}
    >
      <span className="rounded-md bg-slate-950/60 p-2 text-teal-300">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
        <span className="block truncate text-sm font-medium text-slate-200 group-hover:text-teal-200">{value}</span>
      </span>
    </a>
  );
}
