// src/data/skills.js
// Grup keahlian — sumber: PRD.md §2.4 dan CV
// logo: SVG di /assets/logos/ (dibuat saat Phase 3 jika belum ada → gunakan teks fallback)

export const skillGroups = [
  {
    id: "office",
    label: "Office & Workspace",
    items: [
      { name: "Microsoft Word",       logo: "/assets/logos/word.svg" },
      { name: "Google Docs",          logo: "/assets/logos/gdocs.svg" },
      { name: "Microsoft Excel",      logo: "/assets/logos/excel.svg" },
      { name: "Google Sheets",        logo: "/assets/logos/gsheets.svg" },
      { name: "Microsoft PowerPoint", logo: "/assets/logos/powerpoint.svg" },
      { name: "Google Drive",         logo: "/assets/logos/gdrive.svg" },
    ],
  },
  {
    id: "design",
    label: "Design & Video",
    items: [
      { name: "Canva",  logo: "/assets/logos/canva.svg" },
      { name: "CapCut", logo: "/assets/logos/capcut.svg" },
    ],
  },
  {
    id: "web",
    label: "Web",
    items: [
      { name: "ReactJS", logo: "/assets/logos/react.svg" },
      { name: "PHP",     logo: "/assets/logos/php.svg" },
      { name: "HTML",    logo: "/assets/logos/html.svg" },
      { name: "CSS",     logo: "/assets/logos/css.svg" },
    ],
  },
  {
    id: "data",
    label: "Analisis Data",
    items: [
      { name: "KNIME", logo: "/assets/logos/knime.svg" },
    ],
  },
];

export const softSkills = [
  "Adaptif",
  "Manajemen Waktu",
  "Komunikasi",
  "Kerja Sama Tim",
  "Problem Solving",
];

export const languages = [
  { name: "Indonesia", level: "Aktif" },
  { name: "Inggris",   level: "Basic" },
];
