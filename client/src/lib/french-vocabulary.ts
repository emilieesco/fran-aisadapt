// ─── Vocabulaire français pour le prédicteur de mots ─────────────────────────
// Utilisé dans les exercices à trous (fill_blank) pour enrichir les suggestions.
// Mots organisés par thèmes pédagogiques du programme FLE québécois.

const GRAMMAIRE: string[] = [
  // Classes de mots
  "nom", "noms", "pronom", "pronoms", "verbe", "verbes", "adjectif", "adjectifs",
  "adverbe", "adverbes", "déterminant", "déterminants", "préposition", "prépositions",
  "conjonction", "conjonctions", "interjection", "interjections", "article", "articles",
  // Types de noms
  "nom commun", "nom propre", "nom masculin", "nom féminin", "nom singulier", "nom pluriel",
  "masculin", "féminin", "singulier", "pluriel", "variable", "invariable",
  // Types de verbes
  "verbe conjugué", "verbe à l'infinitif", "infinitif", "participe passé", "participe présent",
  "auxiliaire", "auxiliaires", "être", "avoir", "transitif", "intransitif", "attributif",
  // Temps verbaux
  "présent", "passé", "futur", "imparfait", "passé composé", "passé simple",
  "plus-que-parfait", "conditionnel", "subjonctif", "impératif", "futur simple",
  "futur antérieur", "conditionnel présent", "conditionnel passé",
  // Types d'adjectifs
  "adjectif qualificatif", "adjectif possessif", "adjectif démonstratif",
  "adjectif numéral", "adjectif indéfini", "adjectif interrogatif",
  // Déterminants
  "déterminant défini", "déterminant indéfini", "déterminant possessif",
  "déterminant démonstratif", "déterminant numéral", "déterminant indéfini",
  // Fonctions syntaxiques
  "sujet", "prédicat", "complément", "complément direct", "complément indirect",
  "complément de phrase", "attribut", "épithète", "apposition",
  "CD", "CI", "CP", "GN", "GV", "GPrép",
  "groupe nominal", "groupe verbal", "groupe prépositionnel",
  "groupe adjectival", "groupe adverbial",
  // Accord
  "accord", "accords", "s'accorde", "s'accordent", "accordé", "accordée",
  "genre", "nombre", "personne",
  // Ponctuation
  "virgule", "point", "point-virgule", "deux-points", "point d'exclamation",
  "point d'interrogation", "points de suspension", "tiret", "guillemets",
  "parenthèses", "majuscule", "minuscule",
];

const CONJUGAISON: string[] = [
  // Personnes
  "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles",
  // Verbes courants — présent
  "suis", "es", "est", "sommes", "êtes", "sont",
  "ai", "as", "avons", "avez", "ont",
  "vais", "vas", "va", "allons", "allez", "vont",
  "fais", "fait", "faisons", "faites", "font",
  "dis", "dit", "disons", "dites", "disent",
  "vois", "voit", "voyons", "voyez", "voient",
  "prends", "prend", "prenons", "prenez", "prennent",
  "viens", "vient", "venons", "venez", "viennent",
  "sais", "sait", "savons", "savez", "savent",
  "peux", "peut", "pouvons", "pouvez", "peuvent",
  "veux", "veut", "voulons", "voulez", "veulent",
  "dois", "doit", "devons", "devez", "doivent",
  // Participes passés courants
  "été", "eu", "fait", "dit", "vu", "mis", "pris", "venu",
  "allé", "allée", "parti", "partie", "arrivé", "arrivée",
  "trouvé", "trouvée", "donné", "donnée", "pris", "prise",
  // Infinitifs courants
  "aller", "avoir", "être", "faire", "dire", "voir", "vouloir",
  "pouvoir", "devoir", "savoir", "venir", "prendre", "partir",
  "arriver", "trouver", "donner", "mettre", "tenir", "croire",
  "vivre", "connaître", "comprendre", "entendre", "sentir",
  "lire", "écrire", "apprendre", "ouvrir", "finir", "choisir",
];

const TEXTE_NARRATIF: string[] = [
  // Schéma narratif
  "schéma narratif", "situation initiale", "élément perturbateur", "péripéties",
  "dénouement", "situation finale", "résolution", "complication",
  // Personnages
  "personnage", "personnages", "protagoniste", "antagoniste", "narrateur",
  "héros", "héroïne", "personnage principal", "personnage secondaire",
  // Éléments narratifs
  "intrigue", "récit", "histoire", "narration", "narratif",
  "lieu", "lieux", "endroit", "décor", "cadre", "espace",
  "temps", "époque", "moment", "période", "durée",
  "action", "actions", "événement", "événements", "aventure",
  "rebondissement", "coup de théâtre", "tension", "suspense",
  "dialogue", "dialogues", "monologue", "description", "descriptions",
  // Point de vue
  "point de vue", "narrateur omniscient", "narrateur interne",
  "première personne", "troisième personne",
  // Temps narratif
  "passé simple", "imparfait", "plus-que-parfait",
  // Procédés
  "métaphore", "comparaison", "personnification", "hyperbole",
  "énumération", "répétition", "antithèse", "euphémisme",
  "image", "images", "figure de style", "figures de style",
];

const TEXTE_DESCRIPTIF: string[] = [
  "texte descriptif", "description", "descriptif",
  "sujet observé", "aspects", "sous-aspects",
  "sens", "vue", "ouïe", "odorat", "goût", "toucher",
  "champ sensoriel", "champs sensoriels",
  "caractéristique", "caractéristiques", "qualité", "qualités",
  "couleur", "couleurs", "forme", "formes", "taille", "grandeur",
  "texture", "odeur", "son", "saveur", "température",
  "comparaison", "métaphore", "analogie",
  "objectif", "subjectif", "neutre",
  "portrait", "paysage", "lieu",
];

const TEXTE_EXPLICATIF: string[] = [
  "texte explicatif", "explication", "explicatif",
  "mise en situation", "développement", "conclusion",
  "cause", "causes", "conséquence", "conséquences", "effet", "effets",
  "processus", "étape", "étapes", "phase", "phases",
  "définition", "exemple", "exemples", "analogie", "comparaison",
  "reformulation", "illustration",
  "phénomène", "phénomènes", "concept", "notion",
  "scientifique", "naturel", "naturelle",
];

const TEXTE_ARGUMENTATIF: string[] = [
  "texte argumentatif", "argumentation", "argumentatif",
  "thèse", "antithèse", "synthèse",
  "argument", "arguments", "argument d'autorité", "contre-argument",
  "réfutation", "concession", "nuance",
  "sujet amené", "sujet posé", "sujet divisé",
  "introduction", "développement", "conclusion",
  "opinion", "opinions", "point de vue",
  "preuve", "preuves", "exemple", "exemples",
  "valeur", "valeurs", "croyance", "société",
];

const CONNECTEURS: string[] = [
  // Séquence / ordre
  "d'abord", "premièrement", "deuxièmement", "troisièmement",
  "ensuite", "puis", "après", "par la suite", "finalement", "enfin",
  "en premier lieu", "en deuxième lieu", "en dernier lieu",
  "au début", "au départ", "à la fin",
  // Addition
  "de plus", "en outre", "également", "aussi", "ainsi que",
  "par ailleurs", "de même", "en plus", "et", "non seulement",
  // Opposition / concession
  "mais", "cependant", "pourtant", "néanmoins", "toutefois",
  "or", "au contraire", "par contre", "en revanche",
  "malgré", "bien que", "même si",
  // Cause
  "car", "parce que", "puisque", "étant donné que", "vu que",
  "en raison de", "à cause de", "grâce à",
  // Conséquence
  "donc", "alors", "ainsi", "par conséquent", "c'est pourquoi",
  "en conséquence", "de sorte que", "si bien que",
  // Illustration / exemple
  "par exemple", "notamment", "en particulier", "tel que", "comme",
  "ainsi", "c'est le cas de",
  // Reformulation
  "c'est-à-dire", "autrement dit", "en d'autres termes",
  "soit", "à savoir",
  // Conclusion
  "en conclusion", "en résumé", "bref", "en somme", "pour conclure",
  "finalement", "en définitive",
];

const ORTHOGRAPHE: string[] = [
  // Homophones
  "a", "à", "ou", "où", "et", "est", "on", "ont",
  "son", "sont", "ce", "se", "sa", "ça", "c'est", "s'est",
  "ces", "ses", "mes", "mais", "peu", "peut", "peux",
  "leur", "leurs", "tout", "tous", "toute", "toutes",
  "quand", "quant", "qu'en",
  "davantage", "d'avantage",
  // Accords courants
  "belle", "beau", "beaux", "belles",
  "nouveau", "nouvel", "nouvelle", "nouveaux", "nouvelles",
  "vieux", "vieil", "vieille", "vieux", "vieilles",
  // Mots invariables courants
  "très", "assez", "trop", "peu", "beaucoup", "souvent",
  "toujours", "jamais", "parfois", "rarement", "déjà",
  "hier", "aujourd'hui", "demain", "maintenant", "bientôt",
];

const MOTS_COURANTS: string[] = [
  // Articles et déterminants
  "le", "la", "les", "un", "une", "des", "du", "de", "d'",
  "ce", "cet", "cette", "ces", "mon", "ma", "mes", "ton", "ta", "tes",
  "son", "sa", "ses", "notre", "nos", "votre", "vos", "leur", "leurs",
  // Prépositions courants
  "dans", "sur", "sous", "avec", "sans", "pour", "par", "chez",
  "entre", "parmi", "vers", "jusqu'à", "depuis", "avant", "après",
  "pendant", "durant", "selon", "malgré", "contre",
  // Adverbes courants
  "bien", "mal", "vite", "lentement", "souvent", "toujours",
  "jamais", "parfois", "peut-être", "vraiment", "surtout",
  "ensemble", "seul", "seule", "seuls", "seules",
  // Adjectifs courants
  "grand", "grande", "grands", "grandes",
  "petit", "petite", "petits", "petites",
  "bon", "bonne", "bons", "bonnes",
  "mauvais", "mauvaise", "mauvaises",
  "beau", "belle", "beaux", "belles",
  "jeune", "jeunes", "vieux", "vieille",
  "nouveau", "nouvelle", "nouveaux", "nouvelles",
  "premier", "première", "dernière", "dernier",
  "même", "mêmes", "autre", "autres",
  "plusieurs", "quelques", "certains", "certaines",
  "chaque", "tout", "toute", "tous", "toutes",
  // Noms courants
  "maison", "famille", "enfant", "enfants", "école", "classe",
  "jour", "jours", "mois", "année", "années", "heure", "heures",
  "homme", "femme", "garçon", "fille", "ami", "amie", "amis",
  "travail", "vie", "monde", "pays", "ville", "rue",
  "livre", "livres", "mot", "mots", "phrase", "phrases",
  "texte", "textes", "paragraphe", "paragraphes",
  "question", "questions", "réponse", "réponses",
  "idée", "idées", "sens", "mot", "mots",
];

const ECRITURE: string[] = [
  // Structure
  "introduction", "développement", "conclusion",
  "paragraphe", "paragraphes", "alinéa",
  "phrase d'accroche", "phrase de clôture",
  "idée principale", "idée secondaire", "idée directrice",
  "sujet", "thème", "propos",
  // Processus d'écriture
  "planification", "rédaction", "révision", "correction",
  "brouillon", "plan", "schéma",
  "cohérence", "cohésion", "clarté",
  // Vocabulaire d'écriture
  "registre", "registre de langue", "langue soutenue",
  "langue standard", "langue familière",
  "tournure de phrase", "style", "ton",
  "vocabulaire précis", "vocabulaire varié",
  "synonyme", "synonymes", "antonyme", "antonymes",
  "champ lexical", "champs lexicaux",
];

const FPT_DOCUMENTS: string[] = [
  // Documents administratifs québécois
  "facture", "relevé", "contrat", "formulaire", "document",
  "montant", "total", "solde", "paiement", "remboursement",
  "salaire", "revenu", "impôt", "déduction", "cotisation",
  "assurance", "emploi", "assurance-emploi", "chômage",
  "retraite", "pension", "RRQ", "RQAP",
  "employeur", "employé", "employée", "travailleur",
  "heures", "semaine", "période", "date",
  "numéro", "code", "référence",
  "Hydro-Québec", "Revenu Québec",
  "brut", "net", "retenue", "retenues",
];

const LECTURE_COMPREHENSION: string[] = [
  "auteur", "auteure", "narrateur", "narratrice",
  "lecteur", "lectrice",
  "titre", "sous-titre", "chapeau",
  "résumé", "synthèse", "analyse",
  "inférence", "déduction", "implicite", "explicite",
  "contexte", "intention", "message",
  "opinion", "fait", "faits",
  "repérage", "information", "informations",
];

// ─── Liste maître combinée et dédupliquée ─────────────────────────────────────
const ALL_WORDS_RAW: string[] = [
  ...MOTS_COURANTS,
  ...CONNECTEURS,
  ...GRAMMAIRE,
  ...CONJUGAISON,
  ...TEXTE_NARRATIF,
  ...TEXTE_DESCRIPTIF,
  ...TEXTE_EXPLICATIF,
  ...TEXTE_ARGUMENTATIF,
  ...ORTHOGRAPHE,
  ...ECRITURE,
  ...FPT_DOCUMENTS,
  ...LECTURE_COMPREHENSION,
];

// Extraire les mots individuels (si un item contient des espaces)
function extractWords(phrases: string[]): string[] {
  const result = new Set<string>();
  for (const phrase of phrases) {
    result.add(phrase);
    for (const word of phrase.split(/\s+/)) {
      const clean = word.replace(/[^a-zA-ZÀ-ÿœæ'-]/g, "");
      if (clean.length >= 2) result.add(clean);
    }
  }
  return Array.from(result);
}

export const FRENCH_VOCABULARY: string[] = extractWords(ALL_WORDS_RAW);
