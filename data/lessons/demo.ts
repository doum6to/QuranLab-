import type { InteractiveCard } from '@/lib/types';

export const demoCards: InteractiveCard[] = [
  // 1. Explanation Card
  {
    id: 'demo-1',
    order: 0,
    type: 'explanation',
    titleFr: 'Les pronoms demonstratifs',
    bodyFr:
      'En arabe coranique, les pronoms demonstratifs sont essentiels. Ils permettent de designer des personnes ou des objets proches ou lointains. Contrairement au francais, l\'arabe distingue le genre meme au pluriel.',
    arabicExample: 'هَٰذَا',
    arabicTransliteration: 'hādhā',
    arabicMeaningFr: 'Ceci / Ce (masculin, proche)',
  },

  // 2. Contextual QCM
  {
    id: 'demo-2',
    order: 1,
    type: 'contextual_qcm',
    questionFr: 'Que signifie le mot « ذَٰلِكَ » ?',
    arabicContext: 'ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَ فِيهِ',
    options: [
      {
        id: 'a',
        text: 'Ceci (proche, masculin)',
        isCorrect: false,
        explanationFr:
          '« هَٰذَا » (hādhā) signifie « ceci » (proche). « ذَٰلِكَ » designe quelque chose de lointain.',
      },
      {
        id: 'b',
        text: 'Ce / Cet (lointain, masculin)',
        isCorrect: true,
        explanationFr:
          '« ذَٰلِكَ » (dhālika) est le demonstratif masculin lointain : « ce, cet ». Il designe un objet ou une personne eloignes.',
      },
      {
        id: 'c',
        text: 'Cette (feminin)',
        isCorrect: false,
        explanationFr:
          '« تِلۡكَ » (tilka) est le demonstratif feminin lointain. « ذَٰلِكَ » est masculin.',
      },
      {
        id: 'd',
        text: 'Ceux-la (pluriel)',
        isCorrect: false,
        explanationFr:
          '« أُوْلٰٓئِكَ » (ʾulāʾika) est le demonstratif pluriel lointain. « ذَٰلِكَ » est singulier masculin.',
      },
    ],
    correctOptionId: 'b',
  },

  // 3. Flashcard
  {
    id: 'demo-3',
    order: 2,
    type: 'flashcard',
    arabic: 'بِسۡمِ ٱللَّهِ',
    transliteration: 'bismi llāhi',
    meaningFr: 'Au nom d\'Allah',
  },

  // 4. Root Slider
  {
    id: 'demo-4',
    order: 3,
    type: 'root_slider',
    rootLetters: 'ع ل م',
    rootMeaningFr: 'savoir',
    forms: [
      {
        formNumber: 1,
        formLabel: 'I',
        arabic: 'عَلِمَ',
        transliteration: 'ʿalima',
        meaningFr: 'savoir',
        pattern: 'فَعِلَ',
        addedLetters: '',
      },
      {
        formNumber: 2,
        formLabel: 'II',
        arabic: 'عَلَّمَ',
        transliteration: 'ʿallama',
        meaningFr: 'enseigner',
        pattern: 'فَعَّلَ',
        addedLetters: 'shadda sur la 2e radicale',
      },
      {
        formNumber: 3,
        formLabel: 'III',
        arabic: 'عَالَمَ',
        transliteration: 'ʿālama',
        meaningFr: 'rivaliser en savoir',
        pattern: 'فَاعَلَ',
        addedLetters: 'alif apres la 1ere radicale',
      },
      {
        formNumber: 4,
        formLabel: 'IV',
        arabic: 'أَعْلَمَ',
        transliteration: 'ʾaʿlama',
        meaningFr: 'informer',
        pattern: 'أَفْعَلَ',
        addedLetters: 'hamza initiale',
      },
      {
        formNumber: 5,
        formLabel: 'V',
        arabic: 'تَعَلَّمَ',
        transliteration: 'taʿallama',
        meaningFr: 'apprendre',
        pattern: 'تَفَعَّلَ',
        addedLetters: 'ta- prefixe + shadda',
      },
      {
        formNumber: 6,
        formLabel: 'VI',
        arabic: 'تَعَالَمَ',
        transliteration: 'taʿālama',
        meaningFr: 'pretendre savoir',
        pattern: 'تَفَاعَلَ',
        addedLetters: 'ta- prefixe + alif',
      },
      {
        formNumber: 10,
        formLabel: 'X',
        arabic: 'اِسْتَعْلَمَ',
        transliteration: 'istaʿlama',
        meaningFr: 'se renseigner',
        pattern: 'اِسْتَفْعَلَ',
        addedLetters: 'ista- prefixe',
      },
    ],
  },

  // 5. Match Card
  {
    id: 'demo-5',
    order: 4,
    type: 'match',
    pairs: [
      { id: 'm1', arabic: 'هَٰذَا', meaningFr: 'Ceci (masc.)' },
      { id: 'm2', arabic: 'هَٰذِهِ', meaningFr: 'Celle-ci (fem.)' },
      { id: 'm3', arabic: 'ذَٰلِكَ', meaningFr: 'Celui-la (masc.)' },
      { id: 'm4', arabic: 'تِلۡكَ', meaningFr: 'Celle-la (fem.)' },
    ],
  },

  // 6. Fill Blank
  {
    id: 'demo-6',
    order: 5,
    type: 'fill_blank',
    sentenceFr: 'Le mot « لَا » signifie ___ en francais.',
    blankAnswer: 'non',
    arabicContext: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ',
    explanationFr:
      '« لَا » (lā) est la particule de negation la plus courante en arabe. Elle signifie « non » ou « ne... pas ».',
  },
];

export function getLessonByNodeId(nodeId: string) {
  // Placeholder: returns demo lesson for any nodeId
  // Will be replaced by Supabase query later
  return {
    title: 'Lecon Demo — Pronoms Demonstratifs',
    cards: demoCards,
  };
}
