# Anıl Karabulut - Kişisel Portfolyo

Bu proje, yetkinliklerimi, iş tecrübelerimi ve projelerimi sergilemek amacıyla geliştirdiğim kişisel portfolyo web sitemdir. Modern web teknolojileri kullanılarak performanslı, duyarlı (responsive) ve şık bir arayüz ile tasarlanmıştır.

##  Kullanılan Teknolojiler

- **Frontend:** React (v19), TypeScript, Vite
- **Stil & Animasyon:** Tailwind CSS (v4), Motion (Framer Motion)
- **İkonlar:** Lucide React
- **Dağıtım (Deployment):** Docker, Nginx

##  Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Geliştirme (Development) Ortamı

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/anilkrblt/portfolio.git (gerekirse linki güncelleyebilirsiniz)
    cd portfolio
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Geliştirici Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
    Tarayıcınızda `http://localhost:3000` (veya konsolda belirtilen port) adresine giderek projeyi görüntüleyebilirsiniz.

##  Docker ile Dağıtım (Deployment)

Projeyi üretim (production) ortamına taşımak veya yerel bilgisayarınızda konteynerize edilmiş bir şekilde çalıştırmak için Docker kullanabilirsiniz.

### Seçenek 1: Sadece Docker Kullanarak

1.  **Docker İmajını Oluşturun:**
    ```bash
    docker build -t anil-portfolio .
    ```

2.  **Konteyneri Çalıştırın:**
    ```bash
    docker run -d -p 8080:80 --name my-portfolio anil-portfolio
    ```
    Tarayıcınızda `http://localhost:8080` adresine giderek siteyi görüntüleyebilirsiniz.

### Seçenek 2: Docker Compose Kullanarak (Önerilen)

Eğer sisteminizde Docker Compose kuruluysa, projeyi tek bir komutla ayağa kaldırabilirsiniz.

1.  **Sistemi Başlatın:**
    ```bash
    docker compose up -d
    ```
    Tarayıcınızda `http://localhost:8080` adresine giderek siteyi görüntüleyebilirsiniz. Konteyneri durdurmak için `docker compose down` komutunu kullanabilirsiniz.

## 📁 Proje Yapısı

- `src/App.tsx`: Tüm portfolyo içeriğinin (Eğitim, Projeler, Yetkinlikler vb.) ve animasyonların bulunduğu ana bileşen.
- `src/index.css`: Tailwind CSS yapılandırması ve küresel stil tanımlamaları.
- `public/`: Statik dosyaların tutulduğu dizin. (Profil fotoğrafı \`profile.jpg\` buraya eklenmelidir).
- `Dockerfile` & `docker-compose.yml`: Üretim ortamı için konteyner konfigürasyon dosyaları. Nginx üzerinden statik (SPA) sunum yapar.

## ✉️ İletişim

Bana aşağıdaki kanallardan ulaşabilirsiniz:
-   **E-posta:** [anil.karabulut.dev@gmail.com](mailto:anil.karabulut.dev@gmail.com)
-   **LinkedIn:** [linkedin.com/in/anilkarabulut](https://linkedin.com/in/anilkarabulut)
-   **GitHub:** [github.com/anilkrblt](https://github.com/anilkrblt)
