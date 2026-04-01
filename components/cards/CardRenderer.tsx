'use client';

import type { InteractiveCard } from '@/lib/types';
import ExplanationCard from './ExplanationCard';
import ContextualQCM from './ContextualQCM';
import RootSlider from './RootSlider';
import FlashCard from './FlashCard';
import MatchCard from './MatchCard';
import FillBlankCard from './FillBlankCard';

interface CardRendererProps {
  card: InteractiveCard;
  onComplete: () => void;
  onShowExplanation: (isCorrect: boolean, explanationFr: string, correctAnswerText?: string) => void;
}

export default function CardRenderer({
  card,
  onComplete,
  onShowExplanation,
}: CardRendererProps) {
  switch (card.type) {
    case 'explanation':
      return <ExplanationCard card={card} onComplete={onComplete} />;
    case 'contextual_qcm':
      return (
        <ContextualQCM
          card={card}
          onComplete={onComplete}
          onShowExplanation={onShowExplanation}
        />
      );
    case 'root_slider':
      return <RootSlider card={card} onComplete={onComplete} />;
    case 'flashcard':
      return <FlashCard card={card} onComplete={onComplete} />;
    case 'match':
      return <MatchCard card={card} onComplete={onComplete} />;
    case 'fill_blank':
      return (
        <FillBlankCard
          card={card}
          onComplete={onComplete}
          onShowExplanation={onShowExplanation}
        />
      );
  }
}
