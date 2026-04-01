import type { VocabularyItem } from '@/lib/types';

let id = 0;
function v(arabicWord: string, transliteration: string, meaningFr: string, category: string, verbForm: string): VocabularyItem {
  return { id: `p3-${++id}`, arabicWord, transliteration, meaningFr, category, partOfSpeech: 'verb', verbForm };
}

// ---------------------------------------------------------------------------
// Forme II
// ---------------------------------------------------------------------------
export const formeII: VocabularyItem[] = [
  v('بَدَّلَ', 'baddala', 'Changer', 'forme_verbale', 'II'),
  v('بَشَّرَ', 'bashshara', 'Annoncer une bonne nouvelle', 'forme_verbale', 'II'),
  v('بَيَّنَ', 'bayyana', 'Clarifier', 'forme_verbale', 'II'),
  v('زَيَّنَ', 'zayyana', 'Embellir', 'forme_verbale', 'II'),
  v('سَبَّحَ', 'sabbaḥa', 'Glorifier', 'forme_verbale', 'II'),
  v('سَخَّرَ', 'sakhkhara', 'Soumettre', 'forme_verbale', 'II'),
  v('صَدَّقَ', 'ṣaddaqa', 'Confirmer', 'forme_verbale', 'II'),
  v('عَذَّبَ', 'ʿadhdhaba', 'Châtier', 'forme_verbale', 'II'),
  v('عَلَّمَ', 'ʿallama', 'Enseigner', 'forme_verbale', 'II'),
  v('قَدَّمَ', 'qaddama', 'Avancer', 'forme_verbale', 'II'),
  v('كَذَّبَ', 'kadhdhaba', 'Traiter de menteur', 'forme_verbale', 'II'),
  v('نَبَّأَ', 'nabbaʾa', 'Informer', 'forme_verbale', 'II'),
  v('نَزَّلَ', 'nazzala', 'Faire descendre', 'forme_verbale', 'II'),
  v('نَجَّىٰ', 'najjā', 'Sauver', 'forme_verbale', 'II'),
  v('وَلَّىٰ', 'wallā', 'Se détourner', 'forme_verbale', 'II'),
];

// ---------------------------------------------------------------------------
// Forme III
// ---------------------------------------------------------------------------
export const formeIII: VocabularyItem[] = [
  v('جَٰهَدَ', 'jāhada', 'Lutter', 'forme_verbale', 'III'),
  v('قَٰتَلَ', 'qātala', 'Combattre', 'forme_verbale', 'III'),
  v('نَادَىٰ', 'nādā', 'Appeler', 'forme_verbale', 'III'),
  v('نَافَقَ', 'nāfaqa', 'Jouer l\'hypocrite', 'forme_verbale', 'III'),
  v('هَاجَرَ', 'hājara', 'Émigrer', 'forme_verbale', 'III'),
];

// ---------------------------------------------------------------------------
// Forme IV
// ---------------------------------------------------------------------------
export const formeIV: VocabularyItem[] = [
  v('أَبۡصَرَ', 'abṣara', 'Voir', 'forme_verbale', 'IV'),
  v('أَحۡسَنَ', 'aḥsana', 'Bien agir', 'forme_verbale', 'IV'),
  v('أَخۡرَجَ', 'akhraja', 'Faire sortir', 'forme_verbale', 'IV'),
  v('أَدۡخَلَ', 'adkhala', 'Faire entrer', 'forme_verbale', 'IV'),
  v('أَرۡجَعَ', 'arjaʿa', 'Renvoyer', 'forme_verbale', 'IV'),
  v('أَرۡسَلَ', 'arsala', 'Envoyer', 'forme_verbale', 'IV'),
  v('أَسۡرَفَ', 'asrafa', 'Gaspiller', 'forme_verbale', 'IV'),
  v('أَسۡلَمَ', 'aslama', 'Se soumettre', 'forme_verbale', 'IV'),
  v('أَشۡرَكَ', 'ashraka', 'Associer', 'forme_verbale', 'IV'),
  v('أَصۡبَحَ', 'aṣbaḥa', 'Devenir', 'forme_verbale', 'IV'),
  v('أَصۡلَحَ', 'aṣlaḥa', 'Réparer', 'forme_verbale', 'IV'),
  v('أَعۡرَضَ', 'aʿraḍa', 'Se détourner', 'forme_verbale', 'IV'),
  v('أَغۡرَقَ', 'aghraqa', 'Noyer', 'forme_verbale', 'IV'),
  v('أَفۡسَدَ', 'afsada', 'Semer la corruption', 'forme_verbale', 'IV'),
  v('أَفۡلَحَ', 'aflaḥa', 'Réussir', 'forme_verbale', 'IV'),
  v('أَنۢبَتَ', 'anbata', 'Faire pousser', 'forme_verbale', 'IV'),
  v('أَنذَرَ', 'andhara', 'Avertir', 'forme_verbale', 'IV'),
  v('أَنزَلَ', 'anzala', 'Faire descendre', 'forme_verbale', 'IV'),
  v('أَنشَأَ', 'anshaʾa', 'Créer', 'forme_verbale', 'IV'),
  v('أَنعَمَ', 'anʿama', 'Combler de bienfaits', 'forme_verbale', 'IV'),
  v('أَنفَقَ', 'anfaqa', 'Dépenser', 'forme_verbale', 'IV'),
  v('أَنكَرَ', 'ankara', 'Renier', 'forme_verbale', 'IV'),
  v('أَهۡلَكَ', 'ahlaka', 'Détruire', 'forme_verbale', 'IV'),
  v('أَخۡفَىٰ', 'akhfā', 'Cacher', 'forme_verbale', 'IV'),
  v('أَغۡنَىٰ', 'aghnā', 'Enrichir / Profiter', 'forme_verbale', 'IV'),
  v('أَلۡقَىٰ', 'alqā', 'Lancer', 'forme_verbale', 'IV'),
  v('أَنجَىٰ', 'anjā', 'Sauver', 'forme_verbale', 'IV'),
  v('أَوۡحَىٰ', 'awḥā', 'Révéler', 'forme_verbale', 'IV'),
  v('أَوۡفَىٰ', 'awfā', 'Remplir une promesse', 'forme_verbale', 'IV'),
  v('أَحۡيَا', 'aḥyā', 'Donner la vie', 'forme_verbale', 'IV'),
];

// ---------------------------------------------------------------------------
// Forme V
// ---------------------------------------------------------------------------
export const formeV: VocabularyItem[] = [
  v('تَفَكَّرَ', 'tafakkara', 'Méditer', 'forme_verbale', 'V'),
  v('تَذَكَّرَ', 'tadhakkara', 'Se rappeler', 'forme_verbale', 'V'),
  v('تَوَكَّلَ', 'tawakkala', 'Placer sa confiance', 'forme_verbale', 'V'),
  v('تَبَيَّنَ', 'tabayyana', 'Devenir clair', 'forme_verbale', 'V'),
  v('تَرَبَّصَ', 'tarabbaṣa', 'Patienter', 'forme_verbale', 'V'),
  v('تَوَلَّىٰ', 'tawallā', 'Se détourner', 'forme_verbale', 'V'),
  v('تَوَفَّىٰ', 'tawaffā', 'Reprendre l\'âme', 'forme_verbale', 'V'),
];

// ---------------------------------------------------------------------------
// Forme VI
// ---------------------------------------------------------------------------
export const formeVI: VocabularyItem[] = [
  v('تَبَارَكَ', 'tabāraka', 'Être béni', 'forme_verbale', 'VI'),
  v('تَسَآءَلَ', 'tasāʾala', 'S\'interroger', 'forme_verbale', 'VI'),
];

// ---------------------------------------------------------------------------
// Forme VII
// ---------------------------------------------------------------------------
export const formeVII: VocabularyItem[] = [
  v('ٱنقَلَبَ', 'inqalaba', 'Retourner', 'forme_verbale', 'VII'),
  v('ٱنتَهَى', 'intahā', 'Cesser', 'forme_verbale', 'VII'),
];

// ---------------------------------------------------------------------------
// Forme VIII
// ---------------------------------------------------------------------------
export const formeVIII: VocabularyItem[] = [
  v('ٱخۡتَلَفَ', 'ikhtalafa', 'Diverger', 'forme_verbale', 'VIII'),
  v('ٱتَّبَعَ', 'ittabaʿa', 'Suivre', 'forme_verbale', 'VIII'),
  v('ٱتَّخَذَ', 'ittakhadha', 'Prendre', 'forme_verbale', 'VIII'),
  v('ٱتَّقَى', 'ittaqā', 'Craindre Allah', 'forme_verbale', 'VIII'),
  v('ٱهۡتَدَى', 'ihtadā', 'Être guidé', 'forme_verbale', 'VIII'),
  v('ٱبۡتَغَى', 'ibtaghā', 'Chercher', 'forme_verbale', 'VIII'),
];

// ---------------------------------------------------------------------------
// Forme IX
// ---------------------------------------------------------------------------
export const formeIX: VocabularyItem[] = [
  v('ٱسۡوَدَّ', 'iswadda', 'Noircir', 'forme_verbale', 'IX'),
  v('ٱبۡيَضَّ', 'ibyaḍḍa', 'Blanchir', 'forme_verbale', 'IX'),
  v('ٱخۡضَرَّ', 'ikhḍarra', 'Verdir', 'forme_verbale', 'IX'),
];

// ---------------------------------------------------------------------------
// Forme X
// ---------------------------------------------------------------------------
export const formeX: VocabularyItem[] = [
  v('ٱسۡتَعۡجَلَ', 'istaʿjala', 'Se hâter', 'forme_verbale', 'X'),
  v('ٱسۡتَغۡفَرَ', 'istaghfara', 'Demander pardon', 'forme_verbale', 'X'),
  v('ٱسۡتَكۡبَرَ', 'istakbara', 'S\'enorgueillir', 'forme_verbale', 'X'),
  v('ٱسۡتَهۡزَأَ', 'istahzaʾa', 'Se moquer', 'forme_verbale', 'X'),
  v('ٱسۡتَجَابَ', 'istajāba', 'Répondre', 'forme_verbale', 'X'),
  v('ٱسۡتَطَاعَ', 'istaṭāʿa', 'Pouvoir', 'forme_verbale', 'X'),
  v('ٱسۡتَقَامَ', 'istaqāma', 'Être droit', 'forme_verbale', 'X'),
];

// ---------------------------------------------------------------------------
// Forme I — Verbes Réguliers
// ---------------------------------------------------------------------------
export const formeI_reguliers: VocabularyItem[] = [
  v('فَتَحَ', 'fataḥa', 'Ouvrir / Juger', 'forme_verbale', 'I'),
  v('بَعَثَ', 'baʿatha', 'Envoyer / Ressusciter', 'forme_verbale', 'I'),
  v('جَعَلَ', 'jaʿala', 'Faire', 'forme_verbale', 'I'),
  v('جَمَعَ', 'jamaʿa', 'Rassembler', 'forme_verbale', 'I'),
  v('رَفَعَ', 'rafaʿa', 'Élever', 'forme_verbale', 'I'),
  v('سَحَرَ', 'saḥara', 'Ensorceler', 'forme_verbale', 'I'),
  v('لَعَنَ', 'laʿana', 'Maudire', 'forme_verbale', 'I'),
  v('نَفَعَ', 'nafaʿa', 'Profiter', 'forme_verbale', 'I'),
  v('ذَهَبَ', 'dhahaba', 'Aller', 'forme_verbale', 'I'),
  v('صَلَحَ', 'ṣalaḥa', 'Réparer', 'forme_verbale', 'I'),
  v('نَصَرَ', 'naṣara', 'Secourir', 'forme_verbale', 'I'),
  v('تَرَكَ', 'taraka', 'Laisser', 'forme_verbale', 'I'),
  v('حَشَرَ', 'ḥashara', 'Rassembler vers', 'forme_verbale', 'I'),
  v('خَلَقَ', 'khalaqa', 'Créer', 'forme_verbale', 'I'),
  v('مَكَرَ', 'makara', 'Comploter', 'forme_verbale', 'I'),
  v('قَتَلَ', 'qatala', 'Tuer', 'forme_verbale', 'I'),
  v('بَلَغَ', 'balagha', 'Atteindre', 'forme_verbale', 'I'),
  v('خَرَجَ', 'kharaja', 'Sortir', 'forme_verbale', 'I'),
  v('خَلَدَ', 'khalada', 'Vivre éternellement', 'forme_verbale', 'I'),
  v('دَخَلَ', 'dakhala', 'Entrer', 'forme_verbale', 'I'),
  v('سَجَدَ', 'sajada', 'Se prosterner', 'forme_verbale', 'I'),
  v('شَعَرَ', 'shaʿara', 'Percevoir', 'forme_verbale', 'I'),
  v('قَعَدَ', 'qaʿada', 'S\'asseoir', 'forme_verbale', 'I'),
  v('ذَكَرَ', 'dhakara', 'Se souvenir', 'forme_verbale', 'I'),
  v('رَزَقَ', 'razaqa', 'Pourvoir', 'forme_verbale', 'I'),
  v('صَدَقَ', 'ṣadaqa', 'Dire la vérité', 'forme_verbale', 'I'),
  v('فَسَقَ', 'fasaqa', 'Transgresser', 'forme_verbale', 'I'),
  v('حَكَمَ', 'ḥakama', 'Juger', 'forme_verbale', 'I'),
  v('شَكَرَ', 'shakara', 'Remercier', 'forme_verbale', 'I'),
  v('كَفَرَ', 'kafara', 'Mécroire', 'forme_verbale', 'I'),
  v('عَبَدَ', 'ʿabada', 'Adorer', 'forme_verbale', 'I'),
  v('كَتَبَ', 'kataba', 'Prescrire / Écrire', 'forme_verbale', 'I'),
  v('نَظَرَ', 'naẓara', 'Regarder', 'forme_verbale', 'I'),
  v('ضَرَبَ', 'ḍaraba', 'Frapper / Proposer', 'forme_verbale', 'I'),
  v('حَمَلَ', 'ḥamala', 'Porter', 'forme_verbale', 'I'),
  v('صَبَرَ', 'ṣabara', 'Endurer', 'forme_verbale', 'I'),
  v('عَقَلَ', 'ʿaqala', 'Comprendre', 'forme_verbale', 'I'),
  v('قَدَرَ', 'qadara', 'Avoir le pouvoir sur', 'forme_verbale', 'I'),
  v('كَسَبَ', 'kasaba', 'Acquérir', 'forme_verbale', 'I'),
  v('ظَلَمَ', 'ẓalama', 'Être injuste', 'forme_verbale', 'I'),
  v('مَلَكَ', 'malaka', 'Posséder', 'forme_verbale', 'I'),
  v('غَفَرَ', 'ghafara', 'Pardonner', 'forme_verbale', 'I'),
  v('عَرَفَ', 'ʿarafa', 'Connaître', 'forme_verbale', 'I'),
  v('كَذَبَ', 'kadhaba', 'Mentir', 'forme_verbale', 'I'),
  v('سَمِعَ', 'samiʿa', 'Entendre', 'forme_verbale', 'I'),
  v('حَسِبَ', 'ḥasiba', 'Penser', 'forme_verbale', 'I'),
  v('حَزِنَ', 'ḥazina', 'S\'attrister', 'forme_verbale', 'I'),
  v('خَسِرَ', 'khasira', 'Perdre', 'forme_verbale', 'I'),
  v('حَفِظَ', 'ḥafiẓa', 'Protéger', 'forme_verbale', 'I'),
  v('عَلِمَ', 'ʿalima', 'Savoir', 'forme_verbale', 'I'),
  v('كَرِهَ', 'kariha', 'Détester', 'forme_verbale', 'I'),
  v('عَمِلَ', 'ʿamila', 'Travailler / Agir', 'forme_verbale', 'I'),
  v('رَحِمَ', 'raḥima', 'Faire miséricorde', 'forme_verbale', 'I'),
  v('شَهِدَ', 'shahida', 'Témoigner', 'forme_verbale', 'I'),
];

// ---------------------------------------------------------------------------
// Forme I — Verbes Irréguliers
// ---------------------------------------------------------------------------
export const formeI_irreguliers: VocabularyItem[] = [
  v('رَدَّ', 'radda', 'Retourner', 'forme_verbale', 'I-irregular'),
  v('صَدَّ', 'ṣadda', 'Détourner', 'forme_verbale', 'I-irregular'),
  v('ضَرَّ', 'ḍarra', 'Nuire', 'forme_verbale', 'I-irregular'),
  v('ظَنَّ', 'ẓanna', 'Penser / Croire', 'forme_verbale', 'I-irregular'),
  v('عَدَّ', 'ʿadda', 'Compter', 'forme_verbale', 'I-irregular'),
  v('مَدَّ', 'madda', 'Prolonger', 'forme_verbale', 'I-irregular'),
  v('ضَلَّ', 'ḍalla', 'S\'égarer', 'forme_verbale', 'I-irregular'),
  v('غَرَّ', 'gharra', 'Tromper', 'forme_verbale', 'I-irregular'),
  v('مَسَّ', 'massa', 'Toucher', 'forme_verbale', 'I-irregular'),
  v('وَدَّ', 'wadda', 'Souhaiter', 'forme_verbale', 'I-irregular'),
  v('سَأَلَ', 'saʾala', 'Demander', 'forme_verbale', 'I-irregular'),
  v('قَرَأَ', 'qaraʾa', 'Lire', 'forme_verbale', 'I-irregular'),
  v('أَخَذَ', 'akhadha', 'Prendre', 'forme_verbale', 'I-irregular'),
  v('أَكَلَ', 'akala', 'Manger', 'forme_verbale', 'I-irregular'),
  v('أَمَرَ', 'amara', 'Ordonner', 'forme_verbale', 'I-irregular'),
  v('أَمِنَ', 'amina', 'Être en sécurité', 'forme_verbale', 'I-irregular'),
  v('رَأَى', 'raʾā', 'Voir', 'forme_verbale', 'I-irregular'),
  v('أَتَىٰ', 'atā', 'Venir', 'forme_verbale', 'I-irregular'),
  v('شَآءَ', 'shāʾa', 'Vouloir', 'forme_verbale', 'I-irregular'),
  v('سَآءَ', 'sāʾa', 'Être mauvais', 'forme_verbale', 'I-irregular'),
  v('جَآءَ', 'jāʾa', 'Venir', 'forme_verbale', 'I-irregular'),
  v('ذَرَ', 'dhara', 'Laisser derrière', 'forme_verbale', 'I-irregular'),
  v('وَضَعَ', 'waḍaʿa', 'Placer', 'forme_verbale', 'I-irregular'),
  v('وَقَعَ', 'waqaʿa', 'Tomber / Arriver', 'forme_verbale', 'I-irregular'),
  v('وَهَبَ', 'wahaba', 'Accorder', 'forme_verbale', 'I-irregular'),
  v('وَجَدَ', 'wajada', 'Trouver', 'forme_verbale', 'I-irregular'),
  v('وَرِثَ', 'waritha', 'Hériter', 'forme_verbale', 'I-irregular'),
  v('وَعَدَ', 'waʿada', 'Promettre', 'forme_verbale', 'I-irregular'),
  v('وَقَىٰ', 'waqā', 'Protéger', 'forme_verbale', 'I-irregular'),
  v('وَسِعَ', 'wasiʿa', 'Contenir', 'forme_verbale', 'I-irregular'),
  v('قَالَ', 'qāla', 'Dire', 'forme_verbale', 'I-irregular'),
  v('كَانَ', 'kāna', 'Être', 'forme_verbale', 'I-irregular'),
  v('تَابَ', 'tāba', 'Se repentir', 'forme_verbale', 'I-irregular'),
  v('فَازَ', 'fāza', 'Atteindre / Réussir', 'forme_verbale', 'I-irregular'),
  v('مَاتَ', 'māta', 'Mourir', 'forme_verbale', 'I-irregular'),
  v('خَافَ', 'khāfa', 'Craindre', 'forme_verbale', 'I-irregular'),
  v('زَادَ', 'zāda', 'Augmenter', 'forme_verbale', 'I-irregular'),
  v('كَادَ', 'kāda', 'Faillir / Comploter', 'forme_verbale', 'I-irregular'),
  v('تَلَا', 'talā', 'Réciter', 'forme_verbale', 'I-irregular'),
  v('دَعَا', 'daʿā', 'Appeler / Invoquer', 'forme_verbale', 'I-irregular'),
  v('عَفَا', 'ʿafā', 'Pardonner', 'forme_verbale', 'I-irregular'),
  v('بَغَىٰ', 'baghā', 'Désirer / Transgresser', 'forme_verbale', 'I-irregular'),
  v('جَرَى', 'jarā', 'Couler', 'forme_verbale', 'I-irregular'),
  v('جَزَى', 'jazā', 'Récompenser', 'forme_verbale', 'I-irregular'),
  v('قَضَىٰ', 'qaḍā', 'Décréter', 'forme_verbale', 'I-irregular'),
  v('كَفَىٰ', 'kafā', 'Suffire', 'forme_verbale', 'I-irregular'),
  v('هَدَى', 'hadā', 'Guider', 'forme_verbale', 'I-irregular'),
  v('خَشِىَ', 'khashiya', 'Craindre', 'forme_verbale', 'I-irregular'),
  v('رَضِىَ', 'raḍiya', 'Être satisfait', 'forme_verbale', 'I-irregular'),
  v('نَسِىَ', 'nasiya', 'Oublier', 'forme_verbale', 'I-irregular'),
];

// ---------------------------------------------------------------------------
// Combined — All Partie III vocabulary
// ---------------------------------------------------------------------------
export const partie3Vocabulary: VocabularyItem[] = [
  ...formeII,
  ...formeIII,
  ...formeIV,
  ...formeV,
  ...formeVI,
  ...formeVII,
  ...formeVIII,
  ...formeIX,
  ...formeX,
  ...formeI_reguliers,
  ...formeI_irreguliers,
];
