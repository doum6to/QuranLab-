'use client';

interface ArabicTextProps {
  text: string;
  className?: string;
  size?: 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
};

export default function ArabicText({
  text,
  className = '',
  size = 'lg',
}: ArabicTextProps) {
  return (
    <span
      dir="rtl"
      className={`font-arabic text-right leading-[2] ${sizeClasses[size]} ${className}`}
    >
      {text}
    </span>
  );
}
