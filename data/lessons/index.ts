import type { InteractiveCard, VocabularyItem } from '@/lib/types';
import { allCourses } from '@/data/courses';
import {
  liste1_pronomsDemonstratifs,
  liste2_negations,
  liste3_interrogatifs,
  liste4_prepositions,
  liste5_particules,
  liste6_connecteurs,
  liste7_divers as p1Divers,
  liste1_nomsAllah,
  liste2_adjectifs,
  liste3_prophetes,
  liste4_signes,
  liste5_deen,
  liste6_foi,
  liste7_actes,
  liste8_dernierJour,
  liste9_viePresente,
  liste10_proches,
  liste11_divers as p2Divers,
  liste12_plurielsIrreguliers,
  formeI_reguliers,
  formeI_irreguliers,
  formeII,
  formeIII,
  formeIV,
  formeV,
  formeVI,
  formeVII,
  formeVIII,
  formeIX,
  formeX,
} from '@/data/vocabulary';

// ============================================================
// Vocabulary ref → actual array mapping
// ============================================================

const vocabMap: Record<string, VocabularyItem[]> = {
  liste1_pronomsDemonstratifs,
  liste2_negations,
  liste3_interrogatifs,
  liste4_prepositions,
  liste5_particules,
  liste6_connecteurs,
  liste7_divers: p1Divers,
  liste1_nomsAllah,
  liste2_adjectifs,
  liste3_prophetes,
  liste4_signes,
  liste5_deen,
  liste6_foi,
  liste7_actes,
  liste8_dernierJour,
  liste9_viePresente,
  liste10_proches,
  liste11_divers: p2Divers,
  liste12_plurielsIrreguliers,
  forme1: formeI_reguliers,
  forme2: formeII,
  forme3: formeIII,
  forme4: formeIV,
  forme5: formeV,
  forme6: formeVI,
  forme7: formeVII,
  forme8: formeVIII,
  forme10: formeX,
  verbesIrreguliers: formeI_irreguliers,
};

// ============================================================
// Category descriptions for explanation cards
// ============================================================

const categoryDescriptions: Record<string, { title: string; body: string }> = {
  liste1_pronomsDemonstratifs: {
    title: 'Les pronoms demonstratifs',
    body: 'En arabe coranique, les pronoms demonstratifs sont essentiels pour designer des personnes ou des objets proches ou lointains. Contrairement au francais, l\'arabe distingue le genre meme au pluriel. Maitriser ces pronoms vous permettra de comprendre des versets fondamentaux.',
  },
  liste2_negations: {
    title: 'Negations & exceptions',
    body: 'Les particules de negation et d\'exception sont parmi les mots les plus frequents du Coran. « لَا » (non), « مَا » (ne...pas), « إِلَّا » (sauf) — ces petits mots changent completement le sens d\'une phrase.',
  },
  liste3_interrogatifs: {
    title: 'Les mots interrogatifs',
    body: 'Le Coran pose de nombreuses questions rhetoriques pour inviter a la reflexion. Connaitre les mots interrogatifs arabes (qui ? quoi ? ou ? quand ? comment ? pourquoi ?) est essentiel pour comprendre ces passages.',
  },
  liste4_prepositions: {
    title: 'Les prepositions',
    body: 'Les prepositions arabes relient les mots entre eux et precisent les relations spatiales, temporelles et logiques. Elles sont tres frequentes dans le Coran et souvent attachees au mot qui suit.',
  },
  liste5_particules: {
    title: 'Les particules',
    body: 'Les particules grammaticales sont de petits mots qui structurent la phrase arabe. Elles incluent les particules de serment, d\'insistance et de condition. Leur maitrise est cle pour comprendre le style coranique.',
  },
  liste6_connecteurs: {
    title: 'Les connecteurs',
    body: 'Les connecteurs et conjonctions relient les phrases et les idees. En arabe coranique, des mots comme « وَ » (et), « فَ » (alors), « ثُمَّ » (ensuite) rythment le texte sacre et marquent la progression des idees.',
  },
  liste7_divers: {
    title: 'Mots divers frequents',
    body: 'Cette liste regroupe des mots tres frequents dans le Coran qui n\'entrent pas dans les categories precedentes. Ce sont des mots essentiels que vous rencontrerez dans presque chaque page du Coran.',
  },
  liste1_nomsAllah: {
    title: 'Les noms d\'Allah',
    body: 'Les noms et attributs d\'Allah sont au coeur du Coran. Connaitre ces noms sacres permet de mieux comprendre les versets et d\'approfondir sa relation avec le Createur. Chaque nom revele un aspect de Sa grandeur.',
  },
  liste2_adjectifs: {
    title: 'Attributs & adjectifs',
    body: 'Les adjectifs coraniques decrivent les qualites, les etats et les attributs. Ils sont utilises pour qualifier Allah, les croyants, les mecreants et les choses de ce monde.',
  },
  liste3_prophetes: {
    title: 'Prophetes & messagers',
    body: 'Le Coran mentionne 25 prophetes par leur nom. Connaitre ces noms en arabe vous permettra de les reconnaitre immediatement dans le texte coranique et de suivre leurs histoires.',
  },
  liste4_signes: {
    title: 'Signes & creation',
    body: 'Le Coran invite constamment a observer les signes d\'Allah dans la creation. Cette liste couvre le vocabulaire lie au ciel, a la terre, au soleil, a la lune, a l\'eau et a la vie — les signes (ayat) de Dieu.',
  },
  liste5_deen: {
    title: 'Le Deen',
    body: 'Le vocabulaire du Deen (religion) est omnipresent dans le Coran. La priere, le jeune, la zakat, le pelerinage — ces termes fondamentaux sont les piliers de la pratique islamique.',
  },
  liste6_foi: {
    title: 'Foi & guidee',
    body: 'La foi (iman) et la guidee (huda) sont des themes centraux du Coran. Cette liste couvre les mots lies a la croyance, au doute, a la verite, au mensonge, a la lumiere et aux tenebres.',
  },
  liste7_actes: {
    title: 'Actes & retribution',
    body: 'Le Coran parle abondamment des actes humains et de leur retribution. Bien et mal, recompense et chatiment, paradis et enfer — comprendre ce vocabulaire est essentiel.',
  },
  liste8_dernierJour: {
    title: 'Le Dernier Jour',
    body: 'L\'eschatologie occupe une place majeure dans le Coran. Le Jour du Jugement, la resurrection, la balance des actes, le paradis et l\'enfer — cette liste couvre ce vocabulaire crucial.',
  },
  liste9_viePresente: {
    title: 'La vie presente',
    body: 'Le Coran parle de la vie d\'ici-bas (al-hayat al-dunya) pour la mettre en perspective avec l\'au-dela. Cette liste couvre les termes lies a la vie quotidienne, aux biens materiels et aux epreuves.',
  },
  liste10_proches: {
    title: 'Les proches',
    body: 'La famille et les relations sociales ont une grande importance dans le Coran. Pere, mere, enfants, epoux, peuple — ces mots reviennent constamment dans le texte sacre.',
  },
  liste11_divers: {
    title: 'Noms divers',
    body: 'Cette liste regroupe des noms frequents dans le Coran qui completent votre vocabulaire. Ce sont des mots essentiels pour atteindre 80% de comprehension du texte coranique.',
  },
  liste12_plurielsIrreguliers: {
    title: 'Pluriels irreguliers',
    body: 'L\'arabe possede des pluriels brises (irreguliers) qui changent la structure interne du mot. Ces pluriels sont tres frequents dans le Coran et il faut les apprendre par coeur.',
  },
  forme1: {
    title: 'Forme I — فَعَلَ',
    body: 'La Forme I est la forme de base du verbe arabe. C\'est la plus courante et la plus simple. Elle exprime le sens fondamental de la racine. La majorite des verbes coraniques sont en Forme I.',
  },
  forme2: {
    title: 'Forme II — فَعَّلَ',
    body: 'La Forme II se reconnait au doublement (shadda) de la deuxieme radicale. Elle exprime souvent l\'intensification du sens de la Forme I ou la causalite : « savoir » → « enseigner ».',
  },
  forme3: {
    title: 'Forme III — فَاعَلَ',
    body: 'La Forme III ajoute un alif apres la premiere radicale. Elle exprime souvent la tentative ou la reciprocite : « tuer » → « combattre ».',
  },
  forme4: {
    title: 'Forme IV — أَفْعَلَ',
    body: 'La Forme IV ajoute un hamza initial. C\'est la forme causative par excellence : « descendre » → « faire descendre/reveler ». Tres frequente dans le Coran.',
  },
  forme5: {
    title: 'Forme V — تَفَعَّلَ',
    body: 'La Forme V ajoute « ta- » avant la Forme II. Elle est souvent reflexive ou indique que le sujet fait l\'action sur lui-meme : « enseigner » → « apprendre ».',
  },
  forme6: {
    title: 'Forme VI — تَفَاعَلَ',
    body: 'La Forme VI ajoute « ta- » avant la Forme III. Elle exprime la reciprocite : les sujets font l\'action mutuellement.',
  },
  forme7: {
    title: 'Forme VII — اِنْفَعَلَ',
    body: 'La Forme VII ajoute « in- » au debut. C\'est un passif reflexif : « casser » → « se casser ». Assez rare dans le Coran.',
  },
  forme8: {
    title: 'Forme VIII — اِفْتَعَلَ',
    body: 'La Forme VIII insere un « -ta- » apres la premiere radicale. Elle a souvent un sens reflexif ou indique un effort : « gagner » → « s\'efforcer de gagner ».',
  },
  forme10: {
    title: 'Forme X — اِسْتَفْعَلَ',
    body: 'La Forme X ajoute « ista- » au debut. Elle exprime la demande ou la recherche de l\'action de base : « pardonner » → « demander pardon (istighfar) ».',
  },
  verbesIrreguliers: {
    title: 'Verbes irreguliers',
    body: 'Certains verbes arabes ont des comportements irreguliers. Ils contiennent des lettres faibles (hamza, waw, ya) qui causent des changements dans la conjugaison. Ces verbes sont tres frequents dans le Coran.',
  },
};

// ============================================================
// Helper: generate lesson cards from vocabulary items
// ============================================================

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

function generateLesson(
  nodeId: string,
  vocabRef: string,
  items: VocabularyItem[]
): InteractiveCard[] {
  const cards: InteractiveCard[] = [];
  let order = 0;

  const desc = categoryDescriptions[vocabRef] ?? {
    title: 'Vocabulaire',
    body: 'Apprenez de nouveaux mots coraniques.',
  };

  // 1. Explanation card (intro)
  const firstItem = items[0];
  cards.push({
    id: `${nodeId}-${order}`,
    order: order++,
    type: 'explanation',
    titleFr: desc.title,
    bodyFr: desc.body,
    arabicExample: firstItem?.arabicWord,
    arabicTransliteration: firstItem?.transliteration,
    arabicMeaningFr: firstItem?.meaningFr,
  });

  // Split items into chunks for flashcards
  const chunk1 = items.slice(0, Math.min(4, items.length));
  const chunk2 = items.slice(4, Math.min(8, items.length));
  const chunk3 = items.slice(8, Math.min(12, items.length));
  const remaining = items.slice(12);

  // 2. Flashcards — first batch
  for (const item of chunk1) {
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'flashcard',
      arabic: item.arabicWord,
      transliteration: item.transliteration,
      meaningFr: item.meaningFr,
    });
  }

  // 3. QCM #1 — about a word from chunk1
  if (chunk1.length >= 2) {
    const correctItem = chunk1[1];
    const distractors = items
      .filter((i) => i.id !== correctItem.id)
      .slice(0, 3);
    const allOptions = [
      {
        id: 'correct',
        text: correctItem.meaningFr,
        isCorrect: true,
        explanationFr: `« ${correctItem.arabicWord} » (${correctItem.transliteration}) signifie bien « ${correctItem.meaningFr} ».`,
      },
      ...distractors.map((d, i) => ({
        id: `wrong-${i}`,
        text: d.meaningFr,
        isCorrect: false,
        explanationFr: `« ${d.meaningFr} » correspond a « ${d.arabicWord} » (${d.transliteration}), pas a « ${correctItem.arabicWord} ».`,
      })),
    ].sort(() => Math.random() - 0.5);

    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'contextual_qcm',
      questionFr: `Que signifie « ${correctItem.arabicWord} » ?`,
      arabicContext: correctItem.arabicWord,
      options: allOptions,
      correctOptionId: 'correct',
    });
  }

  // 4. Flashcards — second batch
  for (const item of chunk2) {
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'flashcard',
      arabic: item.arabicWord,
      transliteration: item.transliteration,
      meaningFr: item.meaningFr,
    });
  }

  // 5. Match card — 4 pairs from items seen so far
  const matchItems = pickRandom([...chunk1, ...chunk2], 4);
  if (matchItems.length >= 2) {
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'match',
      pairs: matchItems.map((item, i) => ({
        id: `mp-${i}`,
        arabic: item.arabicWord,
        meaningFr: item.meaningFr,
      })),
    });
  }

  // 6. Fill blank
  if (items.length >= 3) {
    const fbItem = items[2];
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'fill_blank',
      sentenceFr: `Le mot « ${fbItem.arabicWord} » se traduit par ___ en francais.`,
      blankAnswer: fbItem.meaningFr.split('/')[0].trim().split('(')[0].trim().toLowerCase(),
      arabicContext: fbItem.arabicWord,
      explanationFr: `« ${fbItem.arabicWord} » (${fbItem.transliteration}) signifie « ${fbItem.meaningFr} ».`,
    });
  }

  // 7. Flashcards — third batch
  for (const item of chunk3) {
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'flashcard',
      arabic: item.arabicWord,
      transliteration: item.transliteration,
      meaningFr: item.meaningFr,
    });
  }

  // 8. QCM #2 — about a different word
  if (chunk2.length >= 1 && items.length >= 4) {
    const correctItem = chunk2[0] ?? items[3];
    const distractors = items
      .filter((i) => i.id !== correctItem.id)
      .slice(0, 3);
    const allOptions = [
      {
        id: 'correct',
        text: correctItem.meaningFr,
        isCorrect: true,
        explanationFr: `Exact ! « ${correctItem.arabicWord} » signifie « ${correctItem.meaningFr} ».`,
      },
      ...distractors.map((d, i) => ({
        id: `wrong-${i}`,
        text: d.meaningFr,
        isCorrect: false,
        explanationFr: `Non, « ${d.meaningFr} » correspond a « ${d.arabicWord} », pas a « ${correctItem.arabicWord} ».`,
      })),
    ].sort(() => Math.random() - 0.5);

    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'contextual_qcm',
      questionFr: `Quel est le sens de « ${correctItem.arabicWord} » (${correctItem.transliteration}) ?`,
      arabicContext: correctItem.arabicWord,
      options: allOptions,
      correctOptionId: 'correct',
    });
  }

  // 9. Remaining flashcards
  for (const item of remaining.slice(0, 6)) {
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'flashcard',
      arabic: item.arabicWord,
      transliteration: item.transliteration,
      meaningFr: item.meaningFr,
    });
  }

  // 10. Final match card with remaining items
  const finalMatchItems = pickRandom(remaining.length >= 4 ? remaining : items, 4);
  if (finalMatchItems.length >= 2) {
    cards.push({
      id: `${nodeId}-${order}`,
      order: order++,
      type: 'match',
      pairs: finalMatchItems.map((item, i) => ({
        id: `fmp-${i}`,
        arabic: item.arabicWord,
        meaningFr: item.meaningFr,
      })),
    });
  }

  return cards;
}

// ============================================================
// Build lesson map for every node in every course
// ============================================================

interface LessonData {
  title: string;
  cards: InteractiveCard[];
}

const lessonMap: Record<string, LessonData> = {};

for (const course of allCourses) {
  for (const section of course.sections) {
    for (const node of section.nodes) {
      const ref = node.vocabularyRef;
      if (!ref) continue;

      const items = vocabMap[ref];
      if (!items || items.length === 0) continue;

      lessonMap[node.id] = {
        title: node.title,
        cards: generateLesson(node.id, ref, items),
      };
    }
  }
}

// ============================================================
// Public API
// ============================================================

export function getLessonByNodeId(nodeId: string): LessonData | null {
  return lessonMap[nodeId] ?? null;
}

export function getAllNodeIds(): string[] {
  return Object.keys(lessonMap);
}

export function getLessonCardCount(nodeId: string): number {
  return lessonMap[nodeId]?.cards.length ?? 0;
}
