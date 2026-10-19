// src/data/projects.js
// 5 proyek — data hanya dari CV (judul, tahun, ringkasan, tag)
// role, result, links, gallery KOSONG — diisi Rahmi nanti (§8 PRD)

export const projects = [
  {
    slug: "nfscc-hub",
    title: "NFSCC HUB — Website Manajemen Organisasi",
    year: 2026,
    domain: "nfscc-hub.local",
    featured: true,
    badge: "PROYEK UNGGULAN • SKRIPSI S1",
    status: "Status: Lulus Ujian Sidang Skripsi",
    summary:
      "Sistem informasi manajemen terintegrasi berbasis React untuk mendigitalisasi pengarsipan, keuangan, proker, dan penyuratan organisasi.",
    tags: ["React", "Dashboard", "Arsip Digital"],
    cover: "/assets/projects/nfscc-hub/cover.jpg",
    gallery: [
      "/assets/projects/nfscc-hub/gallery-01.jpg",
      "/assets/projects/nfscc-hub/gallery-02.jpg",
      "/assets/projects/nfscc-hub/gallery-03.jpg",
      "/assets/projects/nfscc-hub/gallery-04.jpg",
      "/assets/projects/nfscc-hub/gallery-05.jpg",
      "/assets/projects/nfscc-hub/gallery-06.jpg",
      "/assets/projects/nfscc-hub/gallery-07.jpg",
      "/assets/projects/nfscc-hub/gallery-08.jpg",
      "/assets/projects/nfscc-hub/gallery-09.jpg",
    ],
    role: "",    // TODO: diisi Rahmi
    result: "",  // TODO: diisi Rahmi
    links: { demo: "", repo: "" },
  },
  {
    slug: "kelayakan-kredit",
    title: "Analisis Kelayakan Kredit Nasabah",
    year: 2025,
    domain: "kelayakan-kredit.local",
    badge: "ANALISIS DATA • 2025",
    status: "Akurasi Prediksi 78%",
    summary:
      "Proyek akhir Studi Independen (PT Nurul Fikri Cipta Inovasi / NF Academy). Algoritma SVM via KNIME dengan kerangka CRISP-DM; akurasi prediksi kredit 78%.",
    tags: ["KNIME", "SVM", "CRISP-DM"],
    cover: "/assets/projects/kelayakan-kredit/cover.jpg",
    gallery: [
      "/assets/projects/kelayakan-kredit/gallery-01.jpg",
      "/assets/projects/kelayakan-kredit/gallery-02.jpg",
      "/assets/projects/kelayakan-kredit/gallery-03.jpg",
      "/assets/projects/kelayakan-kredit/gallery-04.jpg",
      "/assets/projects/kelayakan-kredit/gallery-05.jpg",
    ],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
  {
    slug: "digital-forensik",
    title: "Digital Forensik untuk Investigasi Pasca-Kejadian Platform & Web Cybersecurity",
    year: 2024,
    domain: "digital-forensik.local",
    badge: "KEAMANAN • 2024",
    status: "Integritas Hash Teruji",
    summary:
      "Studi Independen (PT Analis Forensik Digital). Investigasi serangan ransomware HRMS dengan FTK Imager & Autopsy, identifikasi eksploit CVE-2022-30190, rekomendasi IDS/WAF.",
    tags: ["FTK Imager", "Autopsy", "IDS/WAF"],
    cover: "/assets/projects/digital-forensik/cover.jpg",
    gallery: [
      "/assets/projects/digital-forensik/gallery-01.jpg",
      "/assets/projects/digital-forensik/gallery-02.jpg",
      "/assets/projects/digital-forensik/gallery-03.jpg",
    ],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
  {
    slug: "atk-lamy",
    title: "E-Commerce ATK-Lamy & Manajemen Stok",
    year: 2023,
    domain: "atk-lamy.local",
    badge: "WEB APP • 2023",
    status: "Modul CRUD Selesai",
    summary:
      "Situs e-commerce Alat Tulis Kantor responsif dengan sistem pencatatan inventaris otomatis untuk audit stok gudang.",
    tags: ["PHP", "MySQL", "Inventory Audit"],
    cover: "/assets/projects/atk-lamy/cover.jpg",
    gallery: [
      "/assets/projects/atk-lamy/gallery-01.jpg",
      "/assets/projects/atk-lamy/gallery-02.jpg",
      "/assets/projects/atk-lamy/gallery-03.jpg",
    ],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
  {
    slug: "sdit-ar-rohim",
    title: "Landing Page Interaktif SDIT Ar-Rohim",
    year: 2022,
    domain: "sdit-arrohim.local",
    badge: "DESAIN WEB • 2022",
    status: "Live Production",
    summary:
      "Landing page interaktif berbasis antarmuka bersih dan responsif untuk mendigitalisasi profil sekolah dan formulir pendaftaran.",
    tags: ["HTML5", "CSS3", "Responsif"],
    cover: "/assets/projects/sdit-ar-rohim/cover.jpg",
    gallery: [
      "/assets/projects/sdit-ar-rohim/gallery-01.jpg",
      "/assets/projects/sdit-ar-rohim/gallery-02.jpg",
      "/assets/projects/sdit-ar-rohim/gallery-03.jpg",
      "/assets/projects/sdit-ar-rohim/gallery-04.jpg",
      "/assets/projects/sdit-ar-rohim/gallery-05.jpg",
      "/assets/projects/sdit-ar-rohim/gallery-06.jpg",
    ],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
];


