import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-display font-semibold transition-all duration-200";
  
  const variants = {
    primary: "bg-sahara text-white hover:bg-sunset disabled:bg-warmgray disabled:cursor-not-allowed",
    secondary: "bg-forest text-white hover:bg-forest/90 disabled:bg-warmgray disabled:cursor-not-allowed",
    outline: "border-2 border-sahara text-sahara hover:bg-sahara hover:text-white disabled:border-warmgray disabled:text-warmgray disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

