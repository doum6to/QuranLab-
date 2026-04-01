import type { VocabularyItem } from '@/lib/types';

let id = 0;
function v(arabicWord: string, transliteration: string, meaningFr: string, category: string, partOfSpeech?: string): VocabularyItem {
  return { id: `p2-${++id}`, arabicWord, transliteration, meaningFr, category, partOfSpeech };
}

// ---------------------------------------------------------------------------
// Liste 1 — Noms & Attributs d'Allah
// ---------------------------------------------------------------------------
export const liste1_nomsAllah: VocabularyItem[] = [
  v('رَبّ', 'rabb', 'Seigneur', 'noms_allah', 'noun'),
  v('ٱلرَّحۡمَٰن', 'ar-raḥmān', 'Le Tout Miséricordieux', 'noms_allah', 'noun'),
  v('ٱلرَّحِيم', 'ar-raḥīm', 'Le Très Miséricordieux', 'noms_allah', 'noun'),
  v('عَزِيز', 'ʿazīz', 'Le Puissant', 'noms_allah', 'noun'),
  v('حَكِيم', 'ḥakīm', 'Le Sage', 'noms_allah', 'noun'),
  v('غَفُور', 'ghafūr', 'Le Grand Pardonneur', 'noms_allah', 'noun'),
  v('حَلِيم', 'ḥalīm', 'Le Clément', 'noms_allah', 'noun'),
  v('ٱلۡعَظِيم', 'al-ʿaẓīm', 'L\'Immense', 'noms_allah', 'noun'),
  v('ٱلۡعَلِيّ', 'al-ʿaliyy', 'Le Très-Haut', 'noms_allah', 'noun'),
  v('عَلِيم', 'ʿalīm', 'L\'Omniscient', 'noms_allah', 'noun'),
  v('خَبِير', 'khabīr', 'Le Parfaitement Connaisseur', 'noms_allah', 'noun'),
  v('سَمِيع', 'samīʿ', 'L\'Audiant', 'noms_allah', 'noun'),
  v('بَصِير', 'baṣīr', 'Le Clairvoyant', 'noms_allah', 'noun'),
  v('شَكُور', 'shakūr', 'Le Reconnaissant', 'noms_allah', 'noun'),
  v('قَدِير', 'qadīr', 'L\'Omnipotent', 'noms_allah', 'noun'),
  v('وَكِيل', 'wakīl', 'Le Garant', 'noms_allah', 'noun'),
  v('نَصِير', 'naṣīr', 'Le Secoureur', 'noms_allah', 'noun'),
  v('حَمِيد', 'ḥamīd', 'Le Digne de louange', 'noms_allah', 'noun'),
  v('تَوَّاب', 'tawwāb', 'L\'Accueillant au repentir', 'noms_allah', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 2 — Attributs / Adjectifs
// ---------------------------------------------------------------------------
export const liste2_adjectifs: VocabularyItem[] = [
  v('أَوَّل', 'awwal', 'Premier', 'adjectifs', 'adjective'),
  v('ءَاخِر', 'ākhir', 'Dernier', 'adjectifs', 'adjective'),
  v('قَرِيب', 'qarīb', 'Proche', 'adjectifs', 'adjective'),
  v('أَقۡرَب', 'aqrab', 'Plus proche', 'adjectifs', 'adjective'),
  v('بَعِيد', 'baʿīd', 'Loin', 'adjectifs', 'adjective'),
  v('شَدِيد', 'shadīd', 'Dur', 'adjectifs', 'adjective'),
  v('أَشَدّ', 'ashadd', 'Plus dur', 'adjectifs', 'adjective'),
  v('كَبِير', 'kabīr', 'Grand', 'adjectifs', 'adjective'),
  v('أَكۡبَر', 'akbar', 'Plus grand', 'adjectifs', 'adjective'),
  v('كَثِير', 'kathīr', 'Beaucoup', 'adjectifs', 'adjective'),
  v('أَكۡثَر', 'akthar', 'La plupart', 'adjectifs', 'adjective'),
  v('سَرِيع', 'sarīʿ', 'Rapide', 'adjectifs', 'adjective'),
  v('أَسۡرَع', 'asraʿ', 'Le plus rapide', 'adjectifs', 'adjective'),
  v('قَلِيل', 'qalīl', 'Peu / Petit', 'adjectifs', 'adjective'),
  v('كَرِيم', 'karīm', 'Noble / Généreux', 'adjectifs', 'adjective'),
  v('حَفِيظ', 'ḥafīẓ', 'Gardien', 'adjectifs', 'adjective'),
  v('أَحۡسَن', 'aḥsan', 'Meilleur', 'adjectifs', 'adjective'),
  v('أَظۡلَم', 'aẓlam', 'Plus injuste', 'adjectifs', 'adjective'),
  v('أَحَقّ', 'aḥaqq', 'Plus digne', 'adjectifs', 'adjective'),
  v('أَدۡنَىٰ', 'adnā', 'Plus proche / Plus bas', 'adjectifs', 'adjective'),
];

// ---------------------------------------------------------------------------
// Liste 3 — Prophetes & Messagers
// ---------------------------------------------------------------------------
export const liste3_prophetes: VocabularyItem[] = [
  v('رَسُول', 'rasūl', 'Messager', 'prophetes', 'noun'),
  v('رُسُل', 'rusul', 'Messagers', 'prophetes', 'noun'),
  v('نَبِيّ', 'nabiyy', 'Prophète', 'prophetes', 'noun'),
  v('أَنۢبِيَآء', 'anbiyāʾ', 'Prophètes', 'prophetes', 'noun'),
  v('أَمِين', 'amīn', 'Digne de confiance', 'prophetes', 'noun'),
  v('نَذِير', 'nadhīr', 'Avertisseur', 'prophetes', 'noun'),
  v('مُوسَىٰ', 'mūsā', 'Moïse', 'prophetes', 'noun'),
  v('هَٰرُون', 'hārūn', 'Aaron', 'prophetes', 'noun'),
  v('إِبۡرَٰهِۧم', 'ibrāhīm', 'Abraham', 'prophetes', 'noun'),
  v('إِسۡمَٰعِيل', 'ismāʿīl', 'Ismaël', 'prophetes', 'noun'),
  v('نُوح', 'nūḥ', 'Noé', 'prophetes', 'noun'),
  v('يُوسُف', 'yūsuf', 'Joseph', 'prophetes', 'noun'),
  v('لُوط', 'lūṭ', 'Lot', 'prophetes', 'noun'),
  v('عِيسَى ٱبۡنَ مَرۡيَم', 'ʿīsā ibna maryam', 'Jésus fils de Marie', 'prophetes', 'noun'),
  v('ءَادَم', 'ādam', 'Adam', 'prophetes', 'noun'),
  v('سُلَيۡمَٰن', 'sulaymān', 'Salomon', 'prophetes', 'noun'),
  v('إِسۡحَٰق', 'isḥāq', 'Isaac', 'prophetes', 'noun'),
  v('يَعۡقُوب', 'yaʿqūb', 'Jacob', 'prophetes', 'noun'),
  v('دَاوُۥد', 'dāwūd', 'David', 'prophetes', 'noun'),
  v('زَكَرِيَّا', 'zakariyyā', 'Zacharie', 'prophetes', 'noun'),
  v('يَحۡيَىٰ', 'yaḥyā', 'Jean', 'prophetes', 'noun'),
  v('أَيُّوب', 'ayyūb', 'Job', 'prophetes', 'noun'),
  v('يُونُس', 'yūnus', 'Jonas', 'prophetes', 'noun'),
  v('شُعَيۡب', 'shuʿayb', 'Chu\'ayb', 'prophetes', 'noun'),
  v('صَٰلِح', 'ṣāliḥ', 'Sâlih', 'prophetes', 'noun'),
  v('هُود', 'hūd', 'Hûd', 'prophetes', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 4 — Signes & Benedictions
// ---------------------------------------------------------------------------
export const liste4_signes: VocabularyItem[] = [
  v('ءَايَة', 'āya', 'Signe / Verset', 'signes', 'noun'),
  v('ٱلۡقُرۡءَان', 'al-qurʾān', 'Le Coran', 'signes', 'noun'),
  v('ٱلۡإِنجِيل', 'al-injīl', 'L\'Évangile', 'signes', 'noun'),
  v('ٱلتَّوۡرَىٰة', 'at-tawrāh', 'La Torah', 'signes', 'noun'),
  v('أَنۡعَام', 'anʿām', 'Bétail', 'signes', 'noun'),
  v('جَبَل', 'jabal', 'Montagne', 'signes', 'noun'),
  v('بَحۡر', 'baḥr', 'Mer / Fleuve', 'signes', 'noun'),
  v('نَهَر', 'nahar', 'Rivière', 'signes', 'noun'),
  v('شَمۡس', 'shams', 'Soleil', 'signes', 'noun'),
  v('قَمَر', 'qamar', 'Lune', 'signes', 'noun'),
  v('لَيۡل', 'layl', 'Nuit', 'signes', 'noun'),
  v('نَهَار', 'nahār', 'Jour', 'signes', 'noun'),
  v('أَرۡض', 'arḍ', 'Terre', 'signes', 'noun'),
  v('سَمَآء', 'samāʾ', 'Ciel', 'signes', 'noun'),
  v('ءَالَآء', 'ālāʾ', 'Bienfaits', 'signes', 'noun'),
  v('نِعۡمَة', 'niʿma', 'Bienfait / Grâce', 'signes', 'noun'),
  v('فَضۡل', 'faḍl', 'Grâce', 'signes', 'noun'),
  v('مَآء', 'māʾ', 'Eau', 'signes', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 5 — Deen
// ---------------------------------------------------------------------------
export const liste5_deen: VocabularyItem[] = [
  v('دِين', 'dīn', 'Religion', 'deen', 'noun'),
  v('أَمۡر', 'amr', 'Affaire / Commandement', 'deen', 'noun'),
  v('أُمُور', 'umūr', 'Affaires', 'deen', 'noun'),
  v('صَلَوٰة', 'ṣalāh', 'Prière', 'deen', 'noun'),
  v('زَكَوٰة', 'zakāh', 'Aumône / Zakat', 'deen', 'noun'),
  v('حَقّ', 'ḥaqq', 'Vérité', 'deen', 'noun'),
  v('بَٰطِل', 'bāṭil', 'Faux', 'deen', 'noun'),
  v('حَمۡد', 'ḥamd', 'Louange', 'deen', 'noun'),
  v('حِكۡمَة', 'ḥikma', 'Sagesse', 'deen', 'noun'),
  v('تَقۡوَى', 'taqwā', 'Piété', 'deen', 'noun'),
  v('شَهِيد', 'shahīd', 'Témoin / Martyr', 'deen', 'noun'),
  v('مُبِين', 'mubīn', 'Évident / Clair', 'deen', 'noun'),
  v('نُور', 'nūr', 'Lumière', 'deen', 'noun'),
  v('سَلَٰم', 'salām', 'Paix', 'deen', 'noun'),
  v('مُلۡك', 'mulk', 'Royauté / Domination', 'deen', 'noun'),
  v('سُلۡطَٰن', 'sulṭān', 'Preuve / Autorité', 'deen', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 6 — Foi
// ---------------------------------------------------------------------------
export const liste6_foi: VocabularyItem[] = [
  v('إِلَٰه', 'ilāh', 'Dieu / Divinité', 'foi', 'noun'),
  v('وَٰحِد', 'wāḥid', 'Un', 'foi', 'noun'),
  v('أَحَد', 'aḥad', 'Quelqu\'un / Un', 'foi', 'noun'),
  v('شَرِيك', 'sharīk', 'Associé / Partenaire', 'foi', 'noun'),
  v('غَيۡب', 'ghayb', 'L\'Invisible', 'foi', 'noun'),
  v('شَهَٰدَة', 'shahāda', 'L\'Apparent / Témoignage', 'foi', 'noun'),
  v('عَرۡش', 'ʿarsh', 'Trône', 'foi', 'noun'),
  v('كِتَٰب', 'kitāb', 'Livre / Écriture', 'foi', 'noun'),
  v('كَلِمَة', 'kalima', 'Parole', 'foi', 'noun'),
  v('مَلَك', 'malak', 'Ange', 'foi', 'noun'),
  v('عَهۡد', 'ʿahd', 'Alliance / Pacte', 'foi', 'noun'),
  v('مِيثَٰق', 'mīthāq', 'Pacte', 'foi', 'noun'),
  v('إِذۡن', 'idhn', 'Permission', 'foi', 'noun'),
  v('شَيۡطَٰن', 'shayṭān', 'Satan / Diables', 'foi', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 7 — Actes
// ---------------------------------------------------------------------------
export const liste7_actes: VocabularyItem[] = [
  v('عَمَل', 'ʿamal', 'Actes / Actions', 'actes', 'noun'),
  v('حَسَنَة', 'ḥasana', 'Bonne action', 'actes', 'noun'),
  v('سَيِّئَة', 'sayyiʾa', 'Mauvaise action', 'actes', 'noun'),
  v('خَيۡر', 'khayr', 'Bien / Meilleur', 'actes', 'noun'),
  v('شَرّ', 'sharr', 'Mal / Pire', 'actes', 'noun'),
  v('إِثۡم', 'ithm', 'Péché', 'actes', 'noun'),
  v('ذَنۢب', 'dhanb', 'Péché', 'actes', 'noun'),
  v('جُنَاح', 'junāḥ', 'Faute / Grief', 'actes', 'noun'),
  v('حَرَام', 'ḥarām', 'Illicite', 'actes', 'noun'),
  v('حَلَٰل', 'ḥalāl', 'Licite', 'actes', 'noun'),
  v('حَدِيث', 'ḥadīth', 'Récit / Parole', 'actes', 'noun'),
  v('طَيِّب', 'ṭayyib', 'Bonne chose / Pur', 'actes', 'noun'),
  v('أَجۡر', 'ajr', 'Récompense', 'actes', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 8 — Le Dernier Jour
// ---------------------------------------------------------------------------
export const liste8_dernierJour: VocabularyItem[] = [
  v('يَوۡم', 'yawm', 'Jour', 'dernier_jour', 'noun'),
  v('يَوۡمَئِذٍ', 'yawmaʾidhin', 'Ce jour-là', 'dernier_jour', 'noun'),
  v('ٱلۡقِيَٰمَة', 'al-qiyāma', 'Résurrection', 'dernier_jour', 'noun'),
  v('ٱلسَّاعَة', 'as-sāʿa', 'Une Heure', 'dernier_jour', 'noun'),
  v('أَجَل', 'ajal', 'Terme fixé', 'dernier_jour', 'noun'),
  v('مُّسَمًّى', 'musamman', 'Spécifique / Nommé', 'dernier_jour', 'noun'),
  v('حِسَاب', 'ḥisāb', 'Compte', 'dernier_jour', 'noun'),
  v('ٱلۡأٓخِرَة', 'al-ākhira', 'L\'Au-delà', 'dernier_jour', 'noun'),
  v('أَبَدًا', 'abadan', 'Pour toujours', 'dernier_jour', 'noun'),
  v('عَٰقِبَة', 'ʿāqiba', 'Fin / Conséquence', 'dernier_jour', 'noun'),
  v('نَار', 'nār', 'Feu de l\'Enfer', 'dernier_jour', 'noun'),
  v('جَهَنَّم', 'jahannam', 'Enfer', 'dernier_jour', 'noun'),
  v('وَيۡل', 'wayl', 'Malheur à', 'dernier_jour', 'noun'),
  v('عِقَاب', 'ʿiqāb', 'Châtiment', 'dernier_jour', 'noun'),
  v('عَذَاب', 'ʿadhāb', 'Punition', 'dernier_jour', 'noun'),
  v('أَلِيم', 'alīm', 'Douloureux', 'dernier_jour', 'noun'),
  v('جَزَآء', 'jazāʾ', 'Récompense', 'dernier_jour', 'noun'),
  v('ثَوَاب', 'thawāb', 'Récompense', 'dernier_jour', 'noun'),
  v('جَنَّة', 'janna', 'Paradis / Jardins', 'dernier_jour', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 9 — La Vie Presente
// ---------------------------------------------------------------------------
export const liste9_viePresente: VocabularyItem[] = [
  v('ٱلدُّنۡيَا', 'ad-dunyā', 'Ce monde', 'vie_presente', 'noun'),
  v('ٱلۡعَٰلَمِين', 'al-ʿālamīn', 'Les Mondes', 'vie_presente', 'noun'),
  v('أَمۡوَٰل', 'amwāl', 'Richesses', 'vie_presente', 'noun'),
  v('بَيۡت', 'bayt', 'Maison / Kaaba', 'vie_presente', 'noun'),
  v('دَار', 'dār', 'Demeure', 'vie_presente', 'noun'),
  v('مَتَٰع', 'matāʿ', 'Provision', 'vie_presente', 'noun'),
  v('مَكَان', 'makān', 'Endroit', 'vie_presente', 'noun'),
  v('قَرۡيَة', 'qarya', 'Ville / Cité', 'vie_presente', 'noun'),
  v('مَدِينَة', 'madīna', 'Ville', 'vie_presente', 'noun'),
  v('سَبِيل', 'sabīl', 'Chemin / Voie', 'vie_presente', 'noun'),
  v('صِرَٰط', 'ṣirāṭ', 'Voie', 'vie_presente', 'noun'),
  v('مَسۡجِد', 'masjid', 'Mosquée', 'vie_presente', 'noun'),
  v('فِتۡنَة', 'fitna', 'Épreuve', 'vie_presente', 'noun'),
  v('لِقَآء', 'liqāʾ', 'Rencontre', 'vie_presente', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 10 — Proches
// ---------------------------------------------------------------------------
export const liste10_proches: VocabularyItem[] = [
  v('ذِي ٱلۡقُرۡبَىٰ', 'dhī al-qurbā', 'Proches', 'proches', 'noun'),
  v('ٱلۡوَٰلِدَيۡنِ', 'al-wālidayn', 'Parents', 'proches', 'noun'),
  v('أُمّ', 'umm', 'Mère', 'proches', 'noun'),
  v('أَبّ', 'ab', 'Père', 'proches', 'noun'),
  v('أَبَتِ', 'abati', 'Mon père', 'proches', 'noun'),
  v('ءَابَآء', 'ābāʾ', 'Ancêtres', 'proches', 'noun'),
  v('زَوۡج', 'zawj', 'Conjoint / Époux', 'proches', 'noun'),
  v('رَجُل', 'rajul', 'Homme', 'proches', 'noun'),
  v('ٱمۡرَأَة', 'imraʾa', 'Femme / Épouse', 'proches', 'noun'),
  v('ذُرِّيَّة', 'dhurriyya', 'Descendance', 'proches', 'noun'),
  v('وَلَد', 'walad', 'Fils / Enfants', 'proches', 'noun'),
  v('ٱبۡن', 'ibn', 'Fils', 'proches', 'noun'),
  v('إِخۡوَٰن', 'ikhwān', 'Frères', 'proches', 'noun'),
  v('وَلِيّ', 'waliyy', 'Tuteur / Allié', 'proches', 'noun'),
  v('ذَكَر', 'dhakar', 'Mâle', 'proches', 'noun'),
  v('أُنثَىٰ', 'unthā', 'Femelle', 'proches', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 11 — Divers
// ---------------------------------------------------------------------------
export const liste11_divers: VocabularyItem[] = [
  v('وَجۡه', 'wajh', 'Visage', 'divers_partie2', 'noun'),
  v('أَبۡصَٰر', 'abṣār', 'Vue / Yeux', 'divers_partie2', 'noun'),
  v('صَدۡر', 'ṣadr', 'Poitrine / Cœur', 'divers_partie2', 'noun'),
  v('قَلۡب', 'qalb', 'Cœur', 'divers_partie2', 'noun'),
  v('نَفۡس', 'nafs', 'Âme', 'divers_partie2', 'noun'),
  v('رُوح', 'rūḥ', 'Esprit', 'divers_partie2', 'noun'),
  v('قُوَّة', 'quwwa', 'Force', 'divers_partie2', 'noun'),
  v('نَاس', 'nās', 'Gens', 'divers_partie2', 'noun'),
  v('قَوۡم', 'qawm', 'Peuple', 'divers_partie2', 'noun'),
  v('أُمَّة', 'umma', 'Nation / Communauté', 'divers_partie2', 'noun'),
  v('إِنسَٰن', 'insān', 'Être humain', 'divers_partie2', 'noun'),
  v('مَلَأَ', 'malaʾ', 'Notables / Chefs', 'divers_partie2', 'noun'),
  v('عَبۡد', 'ʿabd', 'Serviteur', 'divers_partie2', 'noun'),
  v('عَدُوّ', 'ʿaduww', 'Ennemi', 'divers_partie2', 'noun'),
  v('مُجۡرِمِين', 'mujrimīn', 'Criminels', 'divers_partie2', 'noun'),
  v('فَرِيق', 'farīq', 'Parti / Groupe', 'divers_partie2', 'noun'),
  v('فِئَة', 'fiʾa', 'Groupe', 'divers_partie2', 'noun'),
  v('طَآئِفَة', 'ṭāʾifa', 'Groupe', 'divers_partie2', 'noun'),
];

// ---------------------------------------------------------------------------
// Liste 12 — Pluriels Irreguliers
// ---------------------------------------------------------------------------
export const liste12_plurielsIrreguliers: VocabularyItem[] = [
  v('نَصَٰرَىٰ', 'naṣārā', 'Chrétiens', 'pluriels_irreguliers', 'noun'),
  v('نِسَآء', 'nisāʾ', 'Femmes', 'pluriels_irreguliers', 'noun'),
  v('رِجَال', 'rijāl', 'Hommes', 'pluriels_irreguliers', 'noun'),
  v('عِظَٰم', 'ʿiẓām', 'Os', 'pluriels_irreguliers', 'noun'),
  v('مَوۡتَىٰ', 'mawtā', 'Les morts', 'pluriels_irreguliers', 'noun'),
  v('أَيۡدِي', 'aydī', 'Mains', 'pluriels_irreguliers', 'noun'),
  v('أَعۡيُن', 'aʿyun', 'Yeux', 'pluriels_irreguliers', 'noun'),
  v('أَزۡوَٰج', 'azwāj', 'Conjoints / Épouses', 'pluriels_irreguliers', 'noun'),
  v('أَهۡوَآء', 'ahwāʾ', 'Passions / Désirs', 'pluriels_irreguliers', 'noun'),
  v('أَلۡبَٰب', 'albāb', 'Intelligences', 'pluriels_irreguliers', 'noun'),
  v('أَبۡوَٰب', 'abwāb', 'Portes', 'pluriels_irreguliers', 'noun'),
  v('أَيۡمَٰن', 'aymān', 'Serments', 'pluriels_irreguliers', 'noun'),
];

// ---------------------------------------------------------------------------
// Combined
// ---------------------------------------------------------------------------
export const partie2Vocabulary: VocabularyItem[] = [
  ...liste1_nomsAllah,
  ...liste2_adjectifs,
  ...liste3_prophetes,
  ...liste4_signes,
  ...liste5_deen,
  ...liste6_foi,
  ...liste7_actes,
  ...liste8_dernierJour,
  ...liste9_viePresente,
  ...liste10_proches,
  ...liste11_divers,
  ...liste12_plurielsIrreguliers,
];
