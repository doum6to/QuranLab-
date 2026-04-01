// ============================================================
// QuranLab — TypeScript Types
// ============================================================

// --- Enums ---

export type SubscriptionTier = 'FREE' | 'PREMIUM';
export type NodeStatus = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

// --- User & Profile ---

export interface Profile {
  id: string;
  name: string;
  email: string;
  streakCount: number;
  totalXp: number;
  lastActive: string;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId?: string;
}

// --- Course Hierarchy ---

export interface Course {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  sections: Section[];
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  nodes: LessonNode[];
}

export interface LessonNode {
  id: string;
  sectionId: string;
  title: string;
  orderIndex: number;
  x: number;
  y: number;
  isFreePreview: boolean;
}

export interface Lesson {
  id: string;
  nodeId: string;
  title: string;
  description: string;
  cards: InteractiveCard[];
}

// --- User Progress ---

export interface UserProgress {
  id: string;
  userId: string;
  nodeId: string;
  status: NodeStatus;
  xpEarned: number;
  completedAt?: string;
}

// ============================================================
// Interactive Cards — Discriminated Union (JSONB polymorphe)
// ============================================================

export type InteractiveCard =
  | ExplanationCard
  | ContextualQCMCard
  | RootSliderCard
  | FlashcardCard
  | MatchCard
  | FillBlankCard;

// Base fields shared by all cards
interface BaseCard {
  id: string;
  order: number;
}

// --- 1. Explanation Card ---
// Texte riche d'introduction/explication (Brilliant-style instruction)
export interface ExplanationCard extends BaseCard {
  type: 'explanation';
  titleFr: string;
  bodyFr: string;
  arabicExample?: string;
  arabicTransliteration?: string;
  arabicMeaningFr?: string;
}

// --- 2. Contextual QCM ---
// Choix multiple avec explication par option (chaque mauvaise reponse a sa propre explication)
export interface ContextualQCMCard extends BaseCard {
  type: 'contextual_qcm';
  questionFr: string;
  arabicContext?: string;
  options: QCMOption[];
  correctOptionId: string;
}

export interface QCMOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanationFr: string;
}

// --- 3. Root Slider ---
// Slider montrant un verbe passer de la Forme I a la Forme X
// avec surbrillance des lettres ajoutees
export interface RootSliderCard extends BaseCard {
  type: 'root_slider';
  rootLetters: string;         // ex: "ع ل م"
  rootMeaningFr: string;       // ex: "savoir"
  forms: VerbForm[];
}

export interface VerbForm {
  formNumber: number;          // 1-10
  formLabel: string;           // "I", "II", ... "X"
  arabic: string;              // ex: "عَلَّمَ"
  transliteration: string;     // ex: "ʿallama"
  meaningFr: string;           // ex: "enseigner"
  pattern: string;             // ex: "فَعَّلَ"
  addedLetters: string;        // ex: "shadda sur ع"
}

// --- 4. Flashcard ---
// Carte retournable arabe <-> francais
export interface FlashcardCard extends BaseCard {
  type: 'flashcard';
  arabic: string;
  transliteration: string;
  meaningFr: string;
  exampleAyah?: string;
  exampleAyahRef?: string;
}

// --- 5. Match Card ---
// Paires a relier (arabe <-> francais)
export interface MatchCard extends BaseCard {
  type: 'match';
  pairs: MatchPair[];
}

export interface MatchPair {
  id: string;
  arabic: string;
  meaningFr: string;
}

// --- 6. Fill Blank ---
// Exercice a trou
export interface FillBlankCard extends BaseCard {
  type: 'fill_blank';
  sentenceFr: string;          // phrase avec ___ pour le trou
  blankAnswer: string;         // reponse attendue
  arabicContext: string;       // texte arabe de reference
  explanationFr: string;       // explication si erreur
}

// ============================================================
// Vocabulary Item — Dictionnaire global
// ============================================================

export interface VocabularyItem {
  id: string;
  arabicWord: string;
  transliteration: string;
  meaningFr: string;
  category: string;            // ex: 'pronoms_demonstratifs', 'noms_allah'
  partOfSpeech?: string;       // ex: 'noun', 'verb', 'particle'
  root?: string;               // racine arabe
  verbForm?: string;           // forme verbale (I-X)
  quranicFrequency?: number;
}
