'use client';

interface ContinueButtonProps {
  onClick: () => void;
  disabled: boolean;
  label?: string;
}

export default function ContinueButton({
  onClick,
  disabled,
  label = 'Continuer',
}: ContinueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors ${
        disabled
          ? 'bg-disabled text-disabled-text cursor-not-allowed'
          : 'bg-primary text-white active:bg-primary-dark'
      }`}
    >
      {label}
    </button>
  );
}
