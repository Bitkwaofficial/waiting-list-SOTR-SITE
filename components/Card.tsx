import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-sand p-6 rounded-2xl border border-ubuntu/20 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

