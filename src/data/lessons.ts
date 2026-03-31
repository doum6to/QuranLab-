import type { Lesson, Partie, Word } from '../types';

let wordId = 1;
function w(arabic: string, transliteration: string, meaningFr: string): Word {
  return { id: wordId++, arabic, transliteration, meaningFr };
}

const lesson1: Lesson = {
  id: 1,
  title: 'Pronoms démonstratifs et relatifs',
  partieId: 1,
  icon: '👆',
  words: [
    w('أُولَٰئِكَ / أُولَٰئِكُم / أُولَاءِ', 'ulāʾika / ulāʾikum / ulāʾa', 'ceux‑là, celles‑là, ces'),
    w('الَّتِي', 'allatī', 'qui, laquelle, celle qui…'),
    w('الَّذِي', 'alladhī', 'qui, lequel, celui qui…'),
    w('الَّذِينَ', 'alladhīna', 'ceux qui, lesquels…'),
    w('اللَّاتِي', 'allātī', 'celles qui…'),
    w('تِلْكَ', 'tilka', 'cette, celle‑là, ces'),
    w('ذَٰلِكَ', 'dhālika', 'ce, cet, celui‑là'),
    w('هَؤُلَاءِ', 'hāulāʾ', 'ceux‑ci, celles‑ci, ces'),
    w('هَٰذَا', 'hādhā', 'ce, cet, celui‑ci'),
    w('هَذَانِ', 'hādhāni', 'ces deux‑là'),
    w('هَذِهِ', 'hādhihi', 'cette, celle‑ci, ceci'),
  ],
};

const lesson2: Lesson = {
  id: 2,
  title: 'Forme négative, affirmative et d\'exclusion',
  partieId: 1,
  icon: '🚫',
  words: [
    w('إِلَّا ٱللَّهَ', 'illā Allah', 'Excepté Allah'),
    w('بَلَى', 'balā', 'Bien sûr, certainement, mais oui !'),
    w('دُونَ', 'dūna', 'Au-dessous de, moins que, sans'),
    w('سِوَى', 'siwā', 'Sauf, excepté, à part'),
    w('غَيْرُ', 'ghayru', 'Autre, sans, sauf, hormis'),
    w('كَلَّا', 'kallā', 'Certainement pas, jamais'),
    w('لَا', 'lā', 'Ne (…) pas'),
    w('لَا إِلَٰهَ', 'lā ilāha', 'Nulle divinité'),
    w('لَمْ', 'lam', 'Ne (…) pas (au passé)'),
    w('لَيْسَ', 'laysa', 'N\'être pas, ne (…) pas'),
    w('مَا', 'mā', 'Ne (…) pas'),
    w('نَعَمْ', 'naʿam', 'Oui (acquiescement)'),
  ],
};

const lesson3: Lesson = {
  id: 3,
  title: 'À qui appartient ? Pronoms connectés',
  partieId: 1,
  icon: '🔗',
  words: [
    w('…كَ', '…ka', 'Ton, ta, te (masculin singulier)'),
    w('…كِ', '…ki', 'Ton, ta, te (féminin singulier)'),
    w('…كُمْ', '…kum', 'Votre, vous (masculin pluriel)'),
    w('…كُمَا', '…kumā', 'Votre, vous (pour deux personnes)'),
    w('…نَا', '…nā', 'Notre, nous'),
    w('…هُ', '…hu', 'Son, le, lui (masculin singulier)'),
    w('…هَا', '…hā', 'Sa, la, lui (féminin singulier)'),
    w('…هُمْ', '…hum', 'Leur, leurs (masculin pluriel)'),
    w('…هُمَا', '…humā', 'Leur, leurs (pour deux personnes)'),
    w('…هُنَّ', '…hunna', 'Leur, leurs (féminin pluriel)'),
    w('…ي / …نِي', '…ī / …nī', 'Mon, ma, me, moi'),
  ],
};

const lesson4: Lesson = {
  id: 4,
  title: 'Qui ? Pronoms déconnectés',
  partieId: 1,
  icon: '🙋',
  words: [
    w('أَنَا', 'anā', 'Je / Moi'),
    w('أَنْتَ', 'anta', 'Vous (masculin singulier)'),
    w('أَنْتِ', 'anti', 'Vous (féminin singulier)'),
    w('أَنْتُمْ', 'antum', 'Vous (masculin pluriel)'),
    w('أَنْتُمَا', 'antumā', 'Vous deux'),
    w('نَحْنُ', 'naḥnu', 'Nous'),
    w('هُمْ', 'hum', 'Ils (masculins)'),
    w('هُمَا', 'humā', 'Tous les deux'),
    w('هُنَّ', 'hunna', 'Elles (féminin)'),
    w('هُوَ', 'huwa', 'Il'),
    w('هِيَ', 'hiya', 'Elle'),
  ],
};

const lesson5: Lesson = {
  id: 5,
  title: 'Où ?',
  partieId: 1,
  icon: '📍',
  words: [
    w('أمَام', 'amāma', 'Devant'),
    w('أَيْنَ', 'ayna', 'Où / où que'),
    w('بَيْنَ', 'bayna', 'Entre'),
    w('بَيْنَ أَيْدِي، بَيْنَ يَدَيْ', 'bayna aydī, bayna yaday', 'Entre les mains, proche'),
    w('تَحْت', 'taḥt', 'Sous'),
    w('حَوْل', 'ḥawla', 'Autour'),
    w('حَيْثُ', 'ḥaythu', 'Où, là où, à l\'endroit où, lorsque…'),
    w('خَلْف', 'khalfa', 'Derrière, après, à la suite'),
    w('شِمَال', 'shimāl', 'À gauche'),
    w('فَوْق', 'fawq', 'Au-dessus de'),
    w('وَرَاء', 'warāʾa', 'Derrière'),
    w('يَمِين', 'yamīn', 'À droite / droite (adjectif)'),
  ],
};

const lesson6: Lesson = {
  id: 6,
  title: 'Question / Affirmation',
  partieId: 1,
  icon: '❓',
  words: [
    w('أَ / هَلْ', 'a / hal', 'Est-ce que ?'),
    w('أَنَّى', 'annā', 'D\'où ? / Pourquoi ?'),
    w('أَيُّ', 'ayyu', 'Lequel, laquelle'),
    w('أَيْنَ', 'ayna', 'Où / où que'),
    w('كَمْ', 'kam', 'Combien ? / (… ?)'),
    w('كَيْفَ', 'kayfa', 'Comment ? / (… ?)'),
    w('لِمَ / لِمَاذَا', 'lima / limādhā', 'Pourquoi ?'),
    w('لَوْ لَا', 'law lā', 'Si… pas, sans, si ce n\'est… alors'),
    w('مَا', 'mā', 'Ne (…) pas'),
    w('مَاذَا', 'mādhā', 'Qu\'est-ce que ?'),
    w('مَتَى', 'matā', 'Quand ? / Lorsque'),
    w('مَنْ', 'man', 'Qui ? / Celui qui'),
  ],
};

const lesson7: Lesson = {
  id: 7,
  title: 'Détenteur de et autres mots',
  partieId: 1,
  icon: '👤',
  words: [
    w('ذو (ذا، ذي)', 'dhū (dhā, dhī)', 'Qui a, détenteur de, doué de, doté de'),
    w('ذات', 'dhāt', 'Qui a, détentrice de, douée de, dotée de'),
    w('أولو / أولي', 'ūlū / ūlī', 'Qui ont, détenteurs de, doués de, dotés de'),
    w('أهل', 'ahl', 'Gens de, habitants, peuple, proches'),
    w('آل', 'āl', 'Famille, proches, peuple'),
    w('ألا', 'alā', 'N\'est-ce pas ? N\'est-il pas ? (interro-négatif)'),
    w('نعم', 'ni\'ma', 'Quel excellent !'),
    w('بئس', 'bi\'sa', 'Quel mauvais !'),
    w('بئسما', 'bi\'samā', 'Combien il est mal, il est détestable/mauvais que/de'),
    w('مثل', 'mithl', 'Quelque chose semblable à'),
    w('مثل (pl. أمثال)', 'mathal (pl. amthāl)', 'Nom servant à comparer ou à indiquer une ressemblance'),
    w('ممن (من + من)', 'mimman (min + man)', 'De qui, à qui (provenance), de celui qui (relative)'),
  ],
};

const lesson8: Lesson = {
  id: 8,
  title: 'Quand ? (temps et conjonctions)',
  partieId: 1,
  icon: '⏰',
  words: [
    w('قبل', 'qabla', 'Avant'),
    w('بعد', 'ba\'da', 'Après'),
    w('حين', 'ḥīna', 'Temps, période, au moment où, lorsque'),
    w('إذ', 'idh', '(passé) : lorsque'),
    w('إذا', 'idhā', '(futur) : quand, lorsque'),
    w('أيان', 'ayyāna', '(futur) : quand ?'),
    w('ثم , ف', 'thumma, fa', 'Puis, ensuite, donc, alors'),
    w('بل', 'bal', 'Bien plus, au contraire, mais'),
    w('عند , لدى , لدن', '\'inda, ladā, ladun', 'Auprès de, avec, chez'),
    w('إن … إلا', 'in... illā', 'Ce n\'est que / ce n\'est rien d\'autre que'),
    w('ما … إلا', 'mā... illā', 'Ce n\'est que / ce n\'est rien d\'autre que'),
    w('ألا (أن + لا)', 'allā (an + lā)', 'Ne pas, pour ne pas…'),
  ],
};

const lesson9: Lesson = {
  id: 9,
  title: 'Prépositions et particules',
  partieId: 1,
  icon: '🔤',
  words: [
    w('ب', 'bi', 'Avec, grâce à, à cause de, à l\'aide de'),
    w('عن', '\'an', 'À propos de'),
    w('في', 'fī', 'Dans'),
    w('ك', 'ka', 'Comme, semblable à, tel'),
    w('ل , ل', 'li, la', 'Pour (que), afin de'),
    w('من', 'min', 'De (origine), en provenance de, à partir'),
    w('إلى', 'ilā', 'Vers, en direction de'),
    w('ت (تالله)', 'ta (tāllāhi)', 'Par (formule de serment)'),
    w('حتى', 'ḥattā', 'Jusqu\'à ce que'),
    w('على', '\'alā', 'Sur, dessus'),
    w('مع', 'ma\'a', 'Avec'),
    w('و', 'wa', 'Et'),
  ],
};

const lesson10: Lesson = {
  id: 10,
  title: 'Préfixes verbaux et particules',
  partieId: 1,
  icon: '⚙️',
  words: [
    w('قد (+ verbe au passé)', 'qad', 'Exprime la réalisation d\'une action déjà accomplie'),
    w('س (+ verbe au présent)', 'sa', 'Indique un futur proche'),
    w('سوف (+ verbe au présent)', 'sawfa', 'Indique un futur plus lointain'),
    w('ل + verbe + ن', 'la + verbe + nna', 'Exprime un futur certain'),
    w('لقد (+ verbe)', 'laqad', 'En effet, certes'),
    w('ل', 'la', 'En effet, certainement'),
    w('ل , ل (+ verbe)', 'li, l (lil\'amr)', 'Particule Lâm pour l\'impératif ou le subjonctif'),
    w('ال', 'al', 'Article défini : le, la, les'),
    w('أم', 'am', 'Ou / ou bien'),
    w('أو', 'aw', 'Ou / ou bien'),
    w('بعض', 'ba\'ḍ', 'Quelques, certains, un peu de, une partie de'),
    w('كل', 'kull', 'Tout, la totalité'),
  ],
};

export const parties: Partie[] = [
  {
    id: 1,
    title: 'Les fondations',
    description: 'Comprends 42% des mots du Coran',
    coverage: 42,
    locked: false,
    lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8, lesson9, lesson10],
  },
  {
    id: 2,
    title: 'Approfondissement',
    description: 'Comprends 62% des mots du Coran',
    coverage: 62,
    locked: true,
    lessons: [],
  },
  {
    id: 3,
    title: 'Maîtrise',
    description: 'Comprends 85% des mots du Coran',
    coverage: 85,
    locked: true,
    lessons: [],
  },
];

export function getAllLessons(): Lesson[] {
  return parties.flatMap((p) => p.lessons);
}

export function getAllWords(): Word[] {
  return getAllLessons().flatMap((l) => l.words);
}

export function getLessonById(id: number): Lesson | undefined {
  return getAllLessons().find((l) => l.id === id);
}

export function getPartieById(id: number): Partie | undefined {
  return parties.find((p) => p.id === id);
}
