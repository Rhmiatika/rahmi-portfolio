// src/data/profile.js
// Data profil Rahmi Atika — sumber: CV & PRD.md
// JANGAN ubah fakta tanpa dasar dokumen

export const profile = {
  name: "Rahmi Atika",
  title: "Fresh Graduate Teknik Informatika",
  headline:
    "Fresh Graduate Teknik Informatika | Administrative & Digital Archiving Specialist | Data Management",
  tagline: "Merapikan data, mendigitalkan proses.",
  roles: [
    "Informatics Engineer",
    "Digital Archiving Specialist",
    "Data Management",
  ],
  bio: "Fresh Graduate Teknik Informatika dari Sekolah Tinggi Teknologi Terpadu Nurul Fikri dengan keahlian dalam pengarsipan digital, pengelolaan data, serta operasional layanan. Berpengalaman merancang sistem informasi manajemen organisasi (NFSCC HUB) untuk mendigitalisasi dokumen penyuratan, presensi, dan laporan operasional. Memiliki pengalaman praktik kerja lapangan di Telkom Indonesia dalam mengelola administrasi data pelanggan harian dan migrasi data dengan akurasi tinggi. Menguasai Microsoft Office dan Google Workspace, serta memiliki pemahaman dasar dalam pengembangan web dan analisis data.",
  stats: {
    gpa: 3.88,
    certificates: 11, // dihitung dari certificates.json
    projects: 5,      // dihitung dari projects.js
    proker: 8,        // program kerja nasional dikawal (NFSCC) — CV
    dataAccuracy: 100, // akurasi migrasi data Telkom — statis, bukan count-up
  },
  contact: {
    email: "rahmiatika231@gmail.com",
    whatsapp: "https://wa.me/6281386426793",
    linkedin: "https://www.linkedin.com/in/rahmi-atika/",
    cv: "/assets/cv/CV_Rahmi_Atika.pdf",
  },
  photo: "/assets/images/rahmi.webp",
  photoFormal: "/assets/images/rahmi-formal.webp",   // foto studio putih — untuk About card
  photoLanyard: "/assets/images/foto-lanyard.webp",  // foto formal lanyard dari asset/foto lanyard.jpeg


  education: [
    {
      id: "stt-nf",
      institution: "Sekolah Tinggi Teknologi Terpadu Nurul Fikri",
      degree: "S1 Teknik Informatika",
      gpa: "3.88 / 4.00",
      period: "2022–2026",
      location: "Depok",
      thesis:
        "Rancang Bangun Front-End Dashboard Nurul Fikri Student CyberSecurity Community Berbasis Web Menggunakan ReactJS",
      courses: [
        "Basis Data",
        "Visualisasi Data",
        "UI/UX",
        "Manajemen Proyek",
        "Komunikasi Efektif",
        "Integrasi Sistem",
        "Etika Profesi",
      ],
      // Foto wisuda asli dari asset/foto kuliah wisuda
      photo: "/assets/education/wisuda-01.webp",
      gallery: [
        "/assets/education/wisuda-01.webp",
        "/assets/education/wisuda-02.webp",
        "/assets/education/wisuda-03.webp",
      ],
    },
    {
      id: "smkn19",
      institution: "SMK Negeri 19 Jakarta",
      degree: "Multimedia",
      gpa: null,
      period: "2019–2022",
      location: "Jakarta Pusat",
      thesis: null,
      courses: [],
      photo: "/assets/education/smk.webp",
      gallery: [],
    },
  ],

  experience: [
    {
      id: "nfscc",
      org: "Nurul Fikri Student CyberSecurity Community (NFSCC)",
      role: "Humas (Hubungan Masyarakat)",
      period: "2024–2025",
      location: "Depok",
      points: [
        "Inisiator utama komunikasi eksternal dan kolaborasi strategis lintas organisasi kampus, institusi pendidikan, hingga industri (BNCC, Tax Center UINSSC, LINUXENIC Corp, dan TILC SV UGM) yang berhasil memperluas jangkauan organisasi serta meningkatkan engagement rate dan followers media sosial NFSCC secara signifikan.",
        "Mengelola alur komunikasi publik melalui email resmi dan media sosial (korespondensi undangan antar UKM, penyusunan materi Q&A, hingga penulisan konten publikasi), serta berhasil mengawal keberhasilan operasional 8 program kerja nasional (4 workshop & 4 seminar cybersecurity) dan 1 kompetisi Capture The Flag (CTF) ASTRO.",
      ],
    },
    {
      id: "telkom",
      org: "Telkom Indonesia (PKL)",
      role: "Access Data & Management",
      period: "Feb–Apr 2021",
      location: "Jakarta Pusat",
      points: [
        "Mengelola dan melakukan entri 100–200 data pelanggan per hari secara presisi menggunakan template form terstandarisasi, yang berhasil memangkas waktu pemrosesan berkas dan mereduksi beban kerja operasional staf tetap.",
        "Mengeksekusi proses migrasi data dari sistem lama ke sistem baru secara cermat dengan tingkat akurasi 100% tanpa ada data yang hilang atau rusak, serta berkoordinasi aktif memastikan seluruh data pelanggan tersimpan rapi dan terstruktur.",
      ],
    },
  ],
};
