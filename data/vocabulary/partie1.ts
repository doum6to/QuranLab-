import type { VocabularyItem } from '@/lib/types';

let id = 0;
function v(arabicWord: string, transliteration: string, meaningFr: string, category: string, partOfSpeech?: string): VocabularyItem {
  return { id: `p1-${++id}`, arabicWord, transliteration, meaningFr, category, partOfSpeech };
}

// ---------------------------------------------------------------------------
// Liste 1 — Pronoms Demonstratifs
// ---------------------------------------------------------------------------
export const liste1_pronomsDemonstratifs: VocabularyItem[] = [
  v('هَٰذَا', 'hādhā', 'Ce / Cet (Masculin)', 'pronoms_demonstratifs', 'pronoun'),
  v('ذَٰلِكَ', 'dhālika', 'Ce / Cet (Masculin, lointain)', 'pronoms_demonstratifs', 'pronoun'),
  v('هَٰذِهِ', 'hādhihi', 'Cette (Féminin)', 'pronoms_demonstratifs', 'pronoun'),
  v('تِلۡكَ', 'tilka', 'Cette (Féminin, lointain)', 'pronoms_demonstratifs', 'pronoun'),
  v('هٰٓؤُلَآءِ', 'hāʾulāʾi', 'Ceux-ci / Celles-ci', 'pronoms_demonstratifs', 'pronoun'),
  v('أُوْلٰٓئِكَ', 'ʾulāʾika', 'Ceux-là / Celles-là', 'pronoms_demonstratifs', 'pronoun'),
  v('ٱلَّذِي', 'alladhī', 'Celui qui (Masculin)', 'pronoms_demonstratifs', 'pronoun'),
  v('ٱلَّتِي', 'allatī', 'Celle qui (Féminin)', 'pronoms_demonstratifs', 'pronoun'),
  v('ٱلَّذِينَ', 'alladhīna', 'Ceux qui (Pluriel masculin)', 'pronoms_demonstratifs', 'pronoun'),
];

// ---------------------------------------------------------------------------
// Liste 2 — Negations & Exceptions
// ---------------------------------------------------------------------------
export const liste2_negations: VocabularyItem[] = [
  v('نَعَمۡ', 'naʿam', 'Oui', 'negations', 'particle'),
  v('بَلَىٰ', 'balā', 'Bien sûr / Si', 'negations', 'particle'),
  v('كَلَّا', 'kallā', 'Absolument pas', 'negations', 'particle'),
  v('إِلَّا', 'illā', 'Sauf / Excepté', 'negations', 'particle'),
  v('أَلَّا', 'allā', 'Afin de ne pas', 'negations', 'particle'),
  v('لَا', 'lā', 'Ne... pas (Présent)', 'negations', 'particle'),
  v('مَا', 'mā', 'Ne... pas (Passé)', 'negations', 'particle'),
  v('لَنۡ', 'lan', 'Ne... jamais', 'negations', 'particle'),
  v('لَمۡ', 'lam', 'N\'a pas', 'negations', 'particle'),
  v('لَيۡسَ', 'laysa', 'N\'est pas', 'negations', 'particle'),
  v('لَسۡتَ', 'lasta', 'Tu n\'es pas', 'negations', 'particle'),
  v('غَيۡر', 'ghayr', 'Autre que / Sans', 'negations', 'particle'),
  v('مِن دُونِ', 'min dūni', 'En dehors de', 'negations', 'particle'),
];

// ---------------------------------------------------------------------------
// Liste 3 — Mots Interrogatifs
// ---------------------------------------------------------------------------
export const liste3_interrogatifs: VocabularyItem[] = [
  v('أَ', 'ʾa', 'Est-ce que', 'interrogatifs', 'particle'),
  v('هَلۡ', 'hal', 'Est-ce que', 'interrogatifs', 'particle'),
  v('مَاذَا', 'mādhā', 'Que / Quoi', 'interrogatifs', 'particle'),
  v('مَا', 'mā', 'Que / Quoi', 'interrogatifs', 'particle'),
  v('لِمَ', 'lima', 'Pourquoi', 'interrogatifs', 'particle'),
  v('مَنۡ', 'man', 'Qui', 'interrogatifs', 'particle'),
  v('مَتَىٰ', 'matā', 'Quand', 'interrogatifs', 'particle'),
  v('أَيۡنَ', 'ʾayna', 'Où', 'interrogatifs', 'particle'),
  v('كَيۡفَ', 'kayfa', 'Comment', 'interrogatifs', 'particle'),
  v('كَمۡ', 'kam', 'Combien', 'interrogatifs', 'particle'),
  v('أَيُّ', 'ʾayyu', 'Quel / Lequel', 'interrogatifs', 'particle'),
  v('أَنَّىٰ', 'ʾannā', 'Comment / D\'où', 'interrogatifs', 'particle'),
];

// ---------------------------------------------------------------------------
// Liste 4 — Prepositions
// ---------------------------------------------------------------------------
export const liste4_prepositions: VocabularyItem[] = [
  v('فَوۡقَ', 'fawqa', 'Au-dessus / Sur', 'prepositions', 'preposition'),
  v('تَحۡتَ', 'taḥta', 'Sous / En dessous', 'prepositions', 'preposition'),
  v('يَمِين', 'yamīn', 'Droite', 'prepositions', 'preposition'),
  v('شِمَال', 'shimāl', 'Gauche', 'prepositions', 'preposition'),
  v('بَيۡنَ', 'bayna', 'Entre / Parmi', 'prepositions', 'preposition'),
  v('بَيۡنَ أَيۡدِي', 'bayna ʾaydī', 'Devant', 'prepositions', 'preposition'),
  v('بَيۡنَ يَدَي', 'bayna yaday', 'Devant', 'prepositions', 'preposition'),
  v('خَلۡفَ', 'khalfa', 'Derrière / Successeur', 'prepositions', 'preposition'),
  v('وَرَآءِ', 'warāʾi', 'Derrière / Au-delà', 'prepositions', 'preposition'),
  v('حَوۡلَ', 'ḥawla', 'Autour de', 'prepositions', 'preposition'),
  v('حَيۡثُ', 'ḥaythu', 'Où que', 'prepositions', 'preposition'),
  v('أَيۡنَمَا', 'ʾaynamā', 'Partout où', 'prepositions', 'preposition'),
];

// ---------------------------------------------------------------------------
// Liste 5 — Particules
// ---------------------------------------------------------------------------
export const liste5_particules: VocabularyItem[] = [
  v('بـِ', 'bi', 'Dans / Par / Avec', 'particules', 'particle'),
  v('عَنۡ', 'ʿan', 'Loin de / À propos de', 'particules', 'particle'),
  v('فِي', 'fī', 'Dans / Durant', 'particules', 'particle'),
  v('كَـ', 'ka', 'Comme', 'particules', 'particle'),
  v('لـ', 'li', 'Pour / À', 'particules', 'particle'),
  v('مِنۡ', 'min', 'De / Depuis', 'particules', 'particle'),
  v('إِلَىٰ', 'ʾilā', 'Vers', 'particules', 'particle'),
  v('حَتَّىٰ', 'ḥattā', 'Jusqu\'à', 'particules', 'particle'),
  v('عَلَىٰ', 'ʿalā', 'Sur / Au-dessus', 'particules', 'particle'),
  v('مَعَ', 'maʿa', 'Avec', 'particules', 'particle'),
  v('وَ', 'wa', 'Et / Par', 'particules', 'particle'),
];

// ---------------------------------------------------------------------------
// Liste 6 — Connecteurs
// ---------------------------------------------------------------------------
export const liste6_connecteurs: VocabularyItem[] = [
  v('إِنَّ', 'inna', 'Certes / Vraiment', 'connecteurs', 'particle'),
  v('أَنَّ', 'anna', 'Que', 'connecteurs', 'particle'),
  v('أَنۡ', 'an', 'Que', 'connecteurs', 'particle'),
  v('إِنۡ', 'in', 'Si', 'connecteurs', 'particle'),
  v('لَوۡ', 'law', 'Si (hypothetique)', 'connecteurs', 'particle'),
  v('كَأَنَّ', 'kaʾanna', 'Comme si', 'connecteurs', 'particle'),
  v('لَٰكِن', 'lākin', 'Mais', 'connecteurs', 'particle'),
  v('لَمَّا', 'lammā', 'Quand / Lorsque', 'connecteurs', 'particle'),
  v('إِذۡ', 'idh', 'Lorsque', 'connecteurs', 'particle'),
  v('إِذَا', 'idhā', 'Quand / Si', 'connecteurs', 'particle'),
  v('لَوۡلَا', 'lawlā', 'Si ce n\'était / Pourquoi ne pas', 'connecteurs', 'particle'),
  v('مِن قَبۡل', 'min qabli', 'Avant', 'connecteurs', 'particle'),
  v('مِن بَعۡد', 'min baʿdi', 'Après', 'connecteurs', 'particle'),
  v('ثُمَّ', 'thumma', 'Puis / Ensuite', 'connecteurs', 'particle'),
  v('فَـ', 'fa', 'Alors / Et', 'connecteurs', 'particle'),
];

// ---------------------------------------------------------------------------
// Liste 7 — Divers
// ---------------------------------------------------------------------------
export const liste7_divers: VocabularyItem[] = [
  v('ذُو', 'dhū', 'Doté de (masc. nominatif)', 'divers_partie1', 'particle'),
  v('ذَا', 'dhā', 'Doté de (masc. accusatif)', 'divers_partie1', 'particle'),
  v('ذِي', 'dhī', 'Doté de (masc. génitif)', 'divers_partie1', 'particle'),
  v('ذَات', 'dhāt', 'Dotée de (fém.)', 'divers_partie1', 'particle'),
  v('أُولُوا', 'ʾulū', 'Dotés de (pl. nominatif)', 'divers_partie1', 'particle'),
  v('أُولِي', 'ʾulī', 'Dotés de (pl. génitif)', 'divers_partie1', 'particle'),
  v('أَهۡل', 'ahl', 'Famille / Gens de', 'divers_partie1', 'particle'),
  v('ءَال', 'āl', 'Famille de', 'divers_partie1', 'particle'),
  v('أَلَا', 'alā', 'Oh! / Ne vont-ils pas', 'divers_partie1', 'particle'),
  v('نِعۡمَ', 'niʿma', 'Quel excellent', 'divers_partie1', 'particle'),
  v('بِئۡسَ', 'biʾsa', 'Quel pire', 'divers_partie1', 'particle'),
  v('مِثۡل', 'mithl', 'Pareil à / Comme', 'divers_partie1', 'particle'),
  v('مَثَل', 'mathal', 'Pareil à / Comme', 'divers_partie1', 'particle'),
  v('أَو', 'aw', 'Ou', 'divers_partie1', 'particle'),
  v('أَم', 'am', 'Ou bien / Est-ce que... ou', 'divers_partie1', 'particle'),
  v('بَعۡض', 'baʿḍ', 'Certains / Une partie', 'divers_partie1', 'particle'),
  v('كُلُّ', 'kull', 'Chaque / Tout', 'divers_partie1', 'particle'),
  v('لَعَلَّ', 'laʿalla', 'Peut-être', 'divers_partie1', 'particle'),
  v('عَسَىٰ', 'ʿasā', 'Peut-être', 'divers_partie1', 'particle'),
  v('يَا', 'yā', 'Ô!', 'divers_partie1', 'particle'),
  v('أَيُّهَا', 'ʾayyuhā', 'Ô! (vocatif)', 'divers_partie1', 'particle'),
  v('عِند', 'ʿinda', 'Auprès de / Chez', 'divers_partie1', 'particle'),
  v('لَدَى', 'ladā', 'Auprès de', 'divers_partie1', 'particle'),
  v('لَدُن', 'ladun', 'Auprès de', 'divers_partie1', 'particle'),
];

// ---------------------------------------------------------------------------
// Combined — All Partie 1 vocabulary
// ---------------------------------------------------------------------------
export const partie1Vocabulary: VocabularyItem[] = [
  ...liste1_pronomsDemonstratifs,
  ...liste2_negations,
  ...liste3_interrogatifs,
  ...liste4_prepositions,
  ...liste5_particules,
  ...liste6_connecteurs,
  ...liste7_divers,
];
