// src/utils/validators.js
// Validasi field form kontak (PRD §2.5)

export const validators = {
  nama: (v) => {
    if (!v || !v.trim()) return "Nama wajib diisi.";
    if (v.trim().length < 2) return "Nama minimal 2 karakter.";
    return null;
  },

  email: (v) => {
    if (!v || !v.trim()) return "Email wajib diisi.";
    // RFC-lite check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Format email tidak valid.";
    return null;
  },

  instansi: (_v) => null, // opsional, selalu valid

  pesan: (v) => {
    if (!v || !v.trim()) return "Pesan wajib diisi.";
    if (v.trim().length < 10) return "Pesan minimal 10 karakter.";
    return null;
  },
};

/**
 * validateForm({ nama, email, instansi, pesan })
 * → { isValid: boolean, errors: { nama?, email?, pesan? } }
 */
export function validateForm(fields) {
  const errors = {};
  for (const [key, fn] of Object.entries(validators)) {
    const err = fn(fields[key] ?? "");
    if (err) errors[key] = err;
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
