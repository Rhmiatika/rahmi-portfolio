// src/components/ui/SectionHeading.jsx
// Judul seksi berformat: eyebrow kecil + heading utama

export default function SectionHeading({ eyebrow, title, center = false, className = "" }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-maroon leading-tight">
        {title}
      </h2>
    </div>
  );
}
