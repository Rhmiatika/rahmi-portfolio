// src/data/projects.js
// 5 proyek — data hanya dari CV (judul, tahun, ringkasan, tag)
// role, result, links, gallery KOSONG — diisi Rahmi nanti (§8 PRD)

export const projects = [
  {
    slug: "nfscc-hub",
    title: "NFSCC HUB — Website Manajemen Organisasi",
    year: 2026,
    summary:
      "Sistem informasi manajemen terintegrasi berbasis React untuk mendigitalisasi pengarsipan, keuangan, proker, dan penyuratan organisasi.",
    tags: ["React", "Dashboard", "Arsip Digital"],
    cover: "/assets/projects/nfscc-hub/cover.webp",
    gallery: [
      "/assets/projects/nfscc-hub/gallery-01.webp", // dashboard
      "/assets/projects/nfscc-hub/gallery-02.webp", // arsip
      "/assets/projects/nfscc-hub/gallery-03.webp", // keuangan
      "/assets/projects/nfscc-hub/gallery-04.webp", // kegiatan
      "/assets/projects/nfscc-hub/gallery-05.webp", // periode
      "/assets/projects/nfscc-hub/gallery-06.webp", // presensi
      "/assets/projects/nfscc-hub/gallery-07.webp", // proker
      "/assets/projects/nfscc-hub/gallery-08.webp", // template surat
      "/assets/projects/nfscc-hub/gallery-09.webp", // anggota
    ],
    role: "",    // TODO: diisi Rahmi
    result: "",  // TODO: diisi Rahmi
    links: { demo: "", repo: "" },
  },
  {
    slug: "kelayakan-kredit",
    title: "Analisis Kelayakan Kredit Nasabah",
    year: 2025,
    summary:
      "Proyek akhir Studi Independen (PT Nurul Fikri Cipta Inovasi / NF Academy). Algoritma SVM via KNIME dengan kerangka CRISP-DM; akurasi prediksi kredit 78%.",
    tags: ["KNIME", "SVM", "CRISP-DM"],
    cover: "/assets/projects/kelayakan-kredit/cover.webp",
    gallery: [],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
  {
    slug: "digital-forensik",
    title: "Digital Forensik untuk Investigasi Pasca-Kejadian Platform & Web Cybersecurity",
    year: 2024,
    summary:
      "Studi Independen (PT Analis Forensik Digital). Investigasi serangan ransomware HRMS dengan FTK Imager & Autopsy, identifikasi eksploit CVE-2022-30190, rekomendasi IDS/WAF.",
    tags: ["FTK Imager", "Autopsy", "IDS/WAF"],
    cover: "/assets/projects/digital-forensik/cover.webp",
    gallery: [],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
  {
    slug: "atk-lamy",
    title: "E-Commerce ATK-Lamy",
    year: 2023,
    summary:
      "Situs e-commerce Alat Tulis Kantor berbasis PHP dengan antarmuka responsif.",
    tags: ["PHP", "E-Commerce"],
    cover: "/assets/projects/atk-lamy/cover.webp",
    gallery: ["/assets/projects/atk-lamy/gallery-02.webp"],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
  {
    slug: "sdit-ar-rohim",
    title: "Landing Page SDIT Ar-Rohim",
    year: 2022,
    summary:
      "Landing page interaktif berbasis HTML/CSS untuk mendigitalisasi profil dan program sekolah.",
    tags: ["HTML", "CSS"],
    cover: "/assets/projects/sdit-ar-rohim/cover.webp",
    gallery: [],
    role: "",
    result: "",
    links: { demo: "", repo: "" },
  },
];


