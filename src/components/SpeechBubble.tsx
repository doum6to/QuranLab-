interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpeechBubble({ children, className = '' }: SpeechBubbleProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="rounded-2xl px-5 py-4 text-gray-800 text-base leading-relaxed"
        style={{
          backgroundColor: '#FEF9C3',
          border: '1px solid #FDE047',
        }}
      >
        {children}
      </div>
      {/* Tail / pointer at bottom-left */}
      <div
        className="absolute -bottom-2 left-6 w-4 h-4 rotate-45"
        style={{
          backgroundColor: '#FEF9C3',
          borderRight: '1px solid #FDE047',
          borderBottom: '1px solid #FDE047',
        }}
      />
    </div>
  );
}
