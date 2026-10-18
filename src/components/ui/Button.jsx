// src/components/ui/Button.jsx
// Tombol dasar — varian: primary (maroon filled), outline, ghost
// Placeholder untuk fuse button / specular button dari React Bits (Phase 3)

import { forwardRef } from "react";

const variantStyles = {
  primary:
    "bg-maroon text-cream border-2 border-maroon hover:bg-maroon-light hover:border-maroon-light focus-visible:ring-2 focus-visible:ring-gold",
  outline:
    "bg-transparent text-maroon border-2 border-maroon hover:bg-maroon hover:text-cream focus-visible:ring-2 focus-visible:ring-gold",
  ghost:
    "bg-transparent text-maroon border-2 border-transparent hover:border-maroon focus-visible:ring-2 focus-visible:ring-gold",
};

const sizeStyles = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    className = "",
    children,
    disabled = false,
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-all duration-200 cursor-pointer select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none",
        variantStyles[variant] ?? variantStyles.primary,
        sizeStyles[size] ?? sizeStyles.md,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
