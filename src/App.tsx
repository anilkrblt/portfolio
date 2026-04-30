import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, ExternalLink, Code2, Database, LayoutTemplate, Smartphone } from 'lucide-react';

const SKILLS = [
  "Spring Boot", ".NET Core", "Node.js", "Go", "React Native", "Flutter",
  "React", "Docker", "Kubernetes", "REST API", "JWT", "PostgreSQL", "MySQL",
  "Clean Architecture", "Onion Architecture", "TypeScript"
];

const EXPERIENCES = [
  {
    title: "Mobile Uygulama Geliştirici",
    company: "Extreme BS",
    date: "02/2026 – Günümüz",
    location: "Uzaktan",
    description: "React Native ve Expo kullanarak modern ERP uygulamaları geliştiriyorum ve geliştirdiğim uygulamaların sunucu entegrasyonunu sağlıyorum.",
  },
  {
    title: "Stajyer",
    company: "iQuality",
    date: "10/2025 – 11/2025",
    description: "Spring Boot 3 ile JWT korumalı CRM REST API'si geliştirdim; müşteri, temsilci ve bilet CRUD uç noktalarını tasarladım. PostgreSQL şemasını ve Flyway migrasyonlarını kurguladım. Docker / Docker Compose ile uygulama ve veritabanını konteynerize edip yerelde çalıştırılabilir bir ortam hazırladım. ReDoc tabanlı canlı API dokümantasyonunu ve Railway dağıtımını yayınladım; Postman koleksiyonu oluşturdum.",
  },
  {
    title: "Stajyer",
    company: "Extreme BS",
    date: "08/2025 – 09/2025",
    description: "React Native ve Typescript kullanarak mevcut servisler üzerinden bir canlı mobil uygulama geliştirdim. Metro bundler, Jest test, ESLint/Prettier, Babel ve TS yapılandırmaları yaptım.",
  }
];

const PROJECTS = [
  {
    title: "Halısaha Otomasyon Sistemi",
    date: "2025",
    tech: ["C#", "ASP.NET Core", "React Native", "MySQL", "Entity Framework", "SignalR"],
    description: "Halısaha işletmecilerinin saha yönetimini, kullanıcıların ise çevrim içi rezervasyon, sosyal etkileşim ve takım oluşturma işlemlerini gerçekleştirebildiği çok yönlü bir platformdur. Onion Architecture prensipleriyle katmanlı, ölçeklenebilir RESTful API altyapısı ve SignalR entegrasyonu ile anlık iletişim modülleri geliştirildi.",
    links: [
      { label: "Backend", url: "https://github.com/anilkrblt/HalisahaOtomasyonBackend" },
      { label: "Frontend", url: "https://github.com/sametakisik/OnlineHalisaham" }
    ]
  },
  {
    title: "Görüntü İşleme ile Hayvan ve İnsan Tespit Projesi",
    date: "2025",
    tech: ["Python", "OpenCV", "PyTorch"],
    description: "80 farklı hayvan türü ve insan sınıfını içeren görsellerde nesneleri tanıyıp konumlandırabilen, yüksek doğruluk oranına sahip bir görüntü işleme sistemidir. YOLOv8 ve SSD300 mimarileri kullanılarak model eğitimi, gerçek zamanlı tespit ve performans analizi süreçleri yürütüldü.",
    links: [
      { label: "Repo", url: "https://github.com/anilkrblt/animal_detection" }
    ]
  },
  {
    title: "Soru Bankası Sistemi",
    date: "2024",
    tech: ["Node.js", "Express", "React", "MySQL", "JWT"],
    description: "Kullanıcıların soru ekleyip çözebildiği, kategori bazlı içerikler sunan ve grup içi sınav imkânı sağlayan kapsamlı bir eğitim platformu. Soru kategorileme, sınav oluşturma ve sonuç analizi gibi modüller geliştirileren React ile kullanıcı arayüzü ve admin paneli tasarlandı.",
    links: [
      { label: "Backend", url: "https://github.com/anilkrblt/sorubankasi-backend" },
      { label: "Frontend", url: "https://github.com/anilkrblt/sorubankasi-frontend" }
    ]
  },
  {
    title: "Derslik & Laboratuvar Yönetim Sistemi",
    tech: ["ASP.NET Core", "React", "MySQL", "JWT", "Clean Arch"],
    description: "ASP.NET Core + React ile modüler eğitim yönetim platformu geliştirdim. Clean Architecture ve Repository Pattern ile RESTful API tasarladım. JWT tabanlı kimlik doğrulama ve rol/izin yönetimini kurdum. Sınıf/ders planlama, şikâyet ve arıza takip modüllerini kodladım. MySQL üzerinde şema ve sorgu optimizasyonu yaptım.",
    date: "",
    links: [
      { label: "Backend", url: "https://github.com/anilkrblt/classroom_management_backend" },
      { label: "Frontend", url: "https://github.com/anilkrblt/class_management_client" }
    ]
  },
  {
    title: "Derin Öğrenme Tabanlı Kitap Öneri Sistemi",
    date: "2025",
    tech: ["Python", "PyTorch", "Deep Learning"],
    description: "PyTorch ile Book-Crossing veri seti üzerinde 46+ milyon parametreli, derin öğrenme tabanlı bir Kitap Öneri Sistemi geliştirdim. Kullanıcı ve kitapları 128 boyutlu embedding temsilcileri ile MLP ağında işledim. Batch Normalization, Dropout ve Early Stopping gibi tekniklerle modeli optimize ederek doğrulama setinde 0.34 RMSE skoruna ulaştım ve kullanıcılara yüksek isabetli 'Top-N' kişiselleştirilmiş öneriler sunan bir altyapı kurdum.",
    links: [
      { label: "Repo", url: "https://github.com/anilkrblt/book_recommandation_system" }
    ]
  },
  {
    title: "Müzik Uygulaması: Musica",
    date: "2023",
    tech: ["Flutter", "Dart", "Firebase"],
    description: "Flutter ile kullanıcı arayüzü geliştirildi. Firebase Authentication ve Firestore entegrasyonu ile çalma listesi, favoriler ve profil yönetimi modülleri hayata geçirildi. Responsive tasarım ve kullanıcı deneyimi iyileştirmeleri yapıldı.",
    links: [
      { label: "Repo", url: "https://github.com/anilkrblt/musica" }
    ]
  }
];

export default function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-cyan-900/10 via-transparent to-transparent opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 font-sans">
        
        {/* HERO SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-zinc-800/50"
        >
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 tracking-tight mb-4">
                Anıl Karabulut
              </h1>
              <h2 className="text-xl md:text-2xl text-cyan-400 font-medium mb-6">
                Yazılım Mühendisi
              </h2>
            </div>
            
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-zinc-800/50 relative z-10 bg-zinc-900">
                {/* Note: In deployment, instruct user to place photo as profile.jpg in public/ folder. We will use a placeholder or missing image style if it fails. */}
                <img src="/profile.jpg" alt="Anıl Karabulut" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2352525b' stroke='%233f3f46' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E"; }} />
              </div>
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full z-0 -m-4"></div>
            </div>
          </div>
          
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
            Trakya Üniversitesi Bilgisayar Mühendisliği mezunuyum. Güvenli ve ölçeklenebilir backend çözümleri ile modern mobil uygulamalar üreten, sürekli öğrenen ve problem çözme becerisi yüksek full-stack geliştirici.
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-mono">
            <a href="mailto:anil.karabulut.dev@gmail.com" className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-4 h-4" /> anil.karabulut.dev@gmail.com
            </a>
            <a href="https://linkedin.com/in/anilkarabulut" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-4 h-4" /> linkedin.com/anilkarabulut
            </a>
            <a href="https://github.com/anilkrblt" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors">
              <Github className="w-4 h-4" /> github.com/anilkrblt
            </a>
            <span className="flex items-center gap-2 text-zinc-400">
              <Phone className="w-4 h-4" /> +90 505 818 71 62
            </span>
          </div>
        </motion.header>

        <main className="py-16 gap-24 flex flex-col">
          
          {/* SKILLS SECTION */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-zinc-100 flex items-center gap-2 mb-8">
              <Code2 className="w-6 h-6 text-cyan-500" />
              Teknolojiler & Yetkinlikler
            </motion.h3>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {SKILLS.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300 hover:border-cyan-500/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </motion.section>

          {/* EXPERIENCE SECTION */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-zinc-100 flex items-center gap-2 mb-8">
              <LayoutTemplate className="w-6 h-6 text-cyan-500" />
              İş Tecrübesi
            </motion.h3>
            <div className="space-y-12">
              {EXPERIENCES.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:h-full before:w-[1px] before:bg-zinc-800 last:before:hidden"
                >
                  <div className="absolute left-0 top-1 w-[24px] h-[24px] bg-zinc-950 border border-zinc-700 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-zinc-100">{exp.title}</h4>
                    <span className="flex items-center gap-2 text-sm text-zinc-500 font-mono">
                      <Calendar className="w-4 h-4" />
                      {exp.date}
                    </span>
                  </div>
                  
                  <div className="text-cyan-400 font-medium mb-3 flex items-center gap-2">
                    {exp.company}
                    {exp.location && (
                      <span className="flex items-center gap-1 text-sm text-zinc-500 font-normal">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PROJECTS SECTION */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-zinc-100 flex items-center gap-2 mb-8">
              <Database className="w-6 h-6 text-cyan-500" />
              Öne Çıkan Projeler
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex flex-col xl:flex-row xl:items-baseline justify-between mb-3 gap-1 xl:gap-2">
                    <h4 className="text-lg font-semibold text-zinc-100">
                      {project.title}
                    </h4>
                    {project.date && (
                      <span className="text-sm font-mono text-zinc-500 whitespace-nowrap">
                        {project.date}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                  
                  {project.links && (
                    <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-zinc-800/50">
                      {project.links.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* EDUCATION & LANGUAGES SECTION */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <motion.h3 variants={itemVariants} className="text-xl font-semibold text-zinc-100 mb-6">Eğitim</motion.h3>
              <motion.div variants={itemVariants} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-5">
                <h4 className="text-zinc-100 font-medium tracking-tight mb-1">
                  Trakya Üniversitesi
                </h4>
                <div className="text-cyan-400 text-sm mb-2">Bilgisayar Mühendisliği Lisans Eğitimi</div>
                <div className="flex items-center justify-between text-sm text-zinc-500 font-mono">
                  <span><MapPin className="w-3 h-3 inline mr-1" />Edirne, Türkiye</span>
                  <span>09/2021 – 06/2025</span>
                </div>
                <div className="mt-4 text-sm font-mono text-zinc-400 bg-zinc-800/50 inline-flex px-2 py-1 rounded">
                  GNO: 3.21
                </div>
              </motion.div>
            </div>

            <div>
              <motion.h3 variants={itemVariants} className="text-xl font-semibold text-zinc-100 mb-6">Diller</motion.h3>
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl">
                  <span className="text-zinc-300 font-medium">Türkçe</span>
                  <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">Anadil</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl">
                  <span className="text-zinc-300 font-medium">İngilizce</span>
                  <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">C1 Seviye</span>
                </div>
              </motion.div>
            </div>
          </motion.section>

        </main>

        {/* FOOTER */}
        <footer className="py-8 text-center text-zinc-600 text-sm border-t border-zinc-800/50">
          <p>© {new Date().getFullYear()} Anıl Karabulut. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}
