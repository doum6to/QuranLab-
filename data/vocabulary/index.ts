// Re-export all vocabulary data
export {
  liste1_pronomsDemonstratifs,
  liste2_negations,
  liste3_interrogatifs,
  liste4_prepositions,
  liste5_particules,
  liste6_connecteurs,
  liste7_divers,
  partie1Vocabulary,
} from './partie1';

export {
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
  liste11_divers,
  liste12_plurielsIrreguliers,
  partie2Vocabulary,
} from './partie2';

export {
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
  partie3Vocabulary,
} from './partie3';

import { partie1Vocabulary } from './partie1';
import { partie2Vocabulary } from './partie2';
import { partie3Vocabulary } from './partie3';

export const allVocabulary = [
  ...partie1Vocabulary,
  ...partie2Vocabulary,
  ...partie3Vocabulary,
];
