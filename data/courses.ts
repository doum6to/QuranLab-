// ============================================================
// QuranLab — Course > Section > Node Structure
// ============================================================
// Maps the learning path: 3 Courses (Parties), each with Sections,
// each Section containing Nodes (lesson bubbles on the path map).

export interface CourseDefinition {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  sections: SectionDefinition[];
}

export interface SectionDefinition {
  id: string;
  title: string;
  description: string;
  order: number;
  nodes: NodeDefinition[];
}

export interface NodeDefinition {
  id: string;
  title: string;
  orderIndex: number;
  isFreePreview: boolean;
  vocabularyRef?: string; // reference to vocabulary list key
}

// ============================================================
// Partie I — Les Fondements (0 à 50%)
// ============================================================

const partie1: CourseDefinition = {
  id: 'course-partie1',
  title: 'Les Fondements — 0 à 50%',
  description: 'Pronoms, négations, questions, prépositions, particules et connecteurs.',
  color: '#10B981',
  icon: '📗',
  order: 0,
  sections: [
    {
      id: 'sec-p1-pronoms',
      title: 'Pronoms & Démonstratifs',
      description: 'Les pronoms démonstratifs coraniques',
      order: 0,
      nodes: [
        { id: 'node-p1-pronoms-1', title: 'Pronoms Démonstratifs', orderIndex: 0, isFreePreview: true, vocabularyRef: 'liste1_pronomsDemonstratifs' },
      ],
    },
    {
      id: 'sec-p1-negations',
      title: 'Négations & Exceptions',
      description: 'Mots de négation et d\'exception',
      order: 1,
      nodes: [
        { id: 'node-p1-negations-1', title: 'Négations & Exceptions', orderIndex: 0, isFreePreview: true, vocabularyRef: 'liste2_negations' },
      ],
    },
    {
      id: 'sec-p1-questions',
      title: 'Mots Interrogatifs',
      description: 'Les questions dans le Coran',
      order: 2,
      nodes: [
        { id: 'node-p1-questions-1', title: 'Mots Interrogatifs', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste3_interrogatifs' },
      ],
    },
    {
      id: 'sec-p1-prepositions',
      title: 'Prépositions',
      description: 'Prépositions et leur rection',
      order: 3,
      nodes: [
        { id: 'node-p1-prepositions-1', title: 'Prépositions', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste4_prepositions' },
      ],
    },
    {
      id: 'sec-p1-particules',
      title: 'Particules',
      description: 'Particules grammaticales coraniques',
      order: 4,
      nodes: [
        { id: 'node-p1-particules-1', title: 'Particules', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste5_particules' },
      ],
    },
    {
      id: 'sec-p1-connecteurs',
      title: 'Connecteurs',
      description: 'Mots de liaison et conjonctions',
      order: 5,
      nodes: [
        { id: 'node-p1-connecteurs-1', title: 'Connecteurs', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste6_connecteurs' },
      ],
    },
    {
      id: 'sec-p1-divers',
      title: 'Divers Partie I',
      description: 'Mots divers fréquents',
      order: 6,
      nodes: [
        { id: 'node-p1-divers-1', title: 'Divers', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste7_divers' },
      ],
    },
  ],
};

// ============================================================
// Partie II — Les Noms (50 à 80%)
// ============================================================

const partie2: CourseDefinition = {
  id: 'course-partie2',
  title: 'Les Noms — 50 à 80%',
  description: 'Noms d\'Allah, attributs, prophètes, signes, deen, foi, actes, eschatologie, vie présente, proches, divers et pluriels irréguliers.',
  color: '#D4AF37',
  icon: '📙',
  order: 1,
  sections: [
    {
      id: 'sec-p2-allah',
      title: 'Noms d\'Allah',
      description: 'Les noms d\'Allah dans le Coran',
      order: 0,
      nodes: [
        { id: 'node-p2-allah-1', title: 'Noms d\'Allah', orderIndex: 0, isFreePreview: true, vocabularyRef: 'liste1_nomsAllah' },
      ],
    },
    {
      id: 'sec-p2-attributs',
      title: 'Attributs & Adjectifs',
      description: 'Attributs divins et adjectifs coraniques',
      order: 1,
      nodes: [
        { id: 'node-p2-attributs-1', title: 'Attributs & Adjectifs', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste2_adjectifs' },
      ],
    },
    {
      id: 'sec-p2-prophetes',
      title: 'Prophètes & Messagers',
      description: 'Noms des prophètes mentionnés dans le Coran',
      order: 2,
      nodes: [
        { id: 'node-p2-prophetes-1', title: 'Prophètes & Messagers', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste3_prophetes' },
      ],
    },
    {
      id: 'sec-p2-signes',
      title: 'Signes & Création',
      description: 'Signes d\'Allah et la création',
      order: 3,
      nodes: [
        { id: 'node-p2-signes-1', title: 'Signes & Création', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste4_signes' },
      ],
    },
    {
      id: 'sec-p2-deen',
      title: 'Le Deen',
      description: 'Termes religieux fondamentaux',
      order: 4,
      nodes: [
        { id: 'node-p2-deen-1', title: 'Le Deen', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste5_deen' },
      ],
    },
    {
      id: 'sec-p2-foi',
      title: 'Foi & Guidée',
      description: 'Vocabulaire de la foi et de la guidée',
      order: 5,
      nodes: [
        { id: 'node-p2-foi-1', title: 'Foi & Guidée', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste6_foi' },
      ],
    },
    {
      id: 'sec-p2-actes',
      title: 'Actes & Rétribution',
      description: 'Les actes et leur rétribution',
      order: 6,
      nodes: [
        { id: 'node-p2-actes-1', title: 'Actes & Rétribution', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste7_actes' },
      ],
    },
    {
      id: 'sec-p2-dernier-jour',
      title: 'Le Dernier Jour',
      description: 'Vocabulaire eschatologique',
      order: 7,
      nodes: [
        { id: 'node-p2-dernier-jour-1', title: 'Le Dernier Jour', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste8_dernierJour' },
      ],
    },
    {
      id: 'sec-p2-vie-presente',
      title: 'La Vie Présente',
      description: 'Termes liés à la vie d\'ici-bas',
      order: 8,
      nodes: [
        { id: 'node-p2-vie-presente-1', title: 'La Vie Présente', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste9_viePresente' },
      ],
    },
    {
      id: 'sec-p2-proches',
      title: 'Les Proches',
      description: 'Famille et relations',
      order: 9,
      nodes: [
        { id: 'node-p2-proches-1', title: 'Les Proches', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste10_proches' },
      ],
    },
    {
      id: 'sec-p2-divers',
      title: 'Divers Partie II',
      description: 'Noms divers fréquents',
      order: 10,
      nodes: [
        { id: 'node-p2-divers-1', title: 'Divers', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste11_divers' },
      ],
    },
    {
      id: 'sec-p2-pluriels',
      title: 'Pluriels Irréguliers',
      description: 'Pluriels brisés fréquents dans le Coran',
      order: 11,
      nodes: [
        { id: 'node-p2-pluriels-1', title: 'Pluriels Irréguliers', orderIndex: 0, isFreePreview: false, vocabularyRef: 'liste12_plurielsIrreguliers' },
      ],
    },
  ],
};

// ============================================================
// Partie III — Les Verbes (80 à 100%)
// ============================================================

const partie3: CourseDefinition = {
  id: 'course-partie3',
  title: 'Les Verbes — 80 à 100%',
  description: 'Les 10 formes verbales arabes et les verbes irréguliers coraniques.',
  color: '#8B5CF6',
  icon: '📕',
  order: 2,
  sections: [
    {
      id: 'sec-p3-forme1',
      title: 'Forme I — فَعَلَ',
      description: 'La forme de base du verbe arabe',
      order: 0,
      nodes: [
        { id: 'node-p3-forme1-1', title: 'Forme I — فَعَلَ', orderIndex: 0, isFreePreview: true, vocabularyRef: 'forme1' },
      ],
    },
    {
      id: 'sec-p3-forme2',
      title: 'Forme II — فَعَّلَ',
      description: 'Intensification et causalité',
      order: 1,
      nodes: [
        { id: 'node-p3-forme2-1', title: 'Forme II — فَعَّلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme2' },
      ],
    },
    {
      id: 'sec-p3-forme3',
      title: 'Forme III — فَاعَلَ',
      description: 'Tentative et réciprocité',
      order: 2,
      nodes: [
        { id: 'node-p3-forme3-1', title: 'Forme III — فَاعَلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme3' },
      ],
    },
    {
      id: 'sec-p3-forme4',
      title: 'Forme IV — أَفْعَلَ',
      description: 'Causatif',
      order: 3,
      nodes: [
        { id: 'node-p3-forme4-1', title: 'Forme IV — أَفْعَلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme4' },
      ],
    },
    {
      id: 'sec-p3-forme5',
      title: 'Forme V — تَفَعَّلَ',
      description: 'Réflexif de la Forme II',
      order: 4,
      nodes: [
        { id: 'node-p3-forme5-1', title: 'Forme V — تَفَعَّلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme5' },
      ],
    },
    {
      id: 'sec-p3-forme6',
      title: 'Forme VI — تَفَاعَلَ',
      description: 'Réciprocité réflexive',
      order: 5,
      nodes: [
        { id: 'node-p3-forme6-1', title: 'Forme VI — تَفَاعَلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme6' },
      ],
    },
    {
      id: 'sec-p3-forme7',
      title: 'Forme VII — اِنْفَعَلَ',
      description: 'Passif réflexif',
      order: 6,
      nodes: [
        { id: 'node-p3-forme7-1', title: 'Forme VII — اِنْفَعَلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme7' },
      ],
    },
    {
      id: 'sec-p3-forme8',
      title: 'Forme VIII — اِفْتَعَلَ',
      description: 'Réflexif avec infixe -ta-',
      order: 7,
      nodes: [
        { id: 'node-p3-forme8-1', title: 'Forme VIII — اِفْتَعَلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme8' },
      ],
    },
    {
      id: 'sec-p3-forme10',
      title: 'Forme X — اِسْتَفْعَلَ',
      description: 'Demande et recherche',
      order: 8,
      nodes: [
        { id: 'node-p3-forme10-1', title: 'Forme X — اِسْتَفْعَلَ', orderIndex: 0, isFreePreview: false, vocabularyRef: 'forme10' },
      ],
    },
    {
      id: 'sec-p3-irreguliers',
      title: 'Verbes Irréguliers',
      description: 'Verbes irréguliers fréquents dans le Coran',
      order: 9,
      nodes: [
        { id: 'node-p3-irreg-1', title: 'Verbes Irréguliers', orderIndex: 0, isFreePreview: false, vocabularyRef: 'verbesIrreguliers' },
      ],
    },
  ],
};

// ============================================================
// Export all courses
// ============================================================

export const allCourses: CourseDefinition[] = [partie1, partie2, partie3];
