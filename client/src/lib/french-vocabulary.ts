// ─── Vocabulaire français enrichi pour le prédicteur de mots ─────────────────
// Source combinée pour les exercices à trous (fill_blank).
// ~3 500 mots couvrant grammaire, conjugaison, connecteurs, vocabulaire courant
// et vocabulaire scolaire québécois.

// ── 1. DÉTERMINANTS & PRONOMS ─────────────────────────────────────────────────
const DETERMINANTS: string[] = [
  "le","la","les","l'","un","une","des","du","de","d'","au","aux",
  "ce","cet","cette","ces",
  "mon","ma","mes","ton","ta","tes","son","sa","ses",
  "notre","nos","votre","vos","leur","leurs",
  "quel","quelle","quels","quelles",
  "chaque","certain","certaine","certains","certaines",
  "plusieurs","quelques","tout","toute","tous","toutes",
  "aucun","aucune","nul","nulle","même","mêmes",
  "autre","autres","tel","telle","tels","telles",
  "n'importe quel","n'importe quelle",
];

const PRONOMS: string[] = [
  "je","tu","il","elle","on","nous","vous","ils","elles",
  "me","te","se","lui","y","en","le","la","les","leur",
  "moi","toi","soi","eux",
  "qui","que","quoi","dont","où","lequel","laquelle","lesquels","lesquelles",
  "auquel","duquel","desquels","desquelles",
  "ce qui","ce que","ce dont","ce à quoi",
  "celui","celle","ceux","celles","celui-ci","celle-là","ceux-ci","celles-là",
  "personne","rien","quelqu'un","quelque chose","chacun","chacune",
  "l'un","l'une","l'un l'autre","les uns les autres",
];

// ── 2. PRÉPOSITIONS & CONJONCTIONS ────────────────────────────────────────────
const PREPOSITIONS: string[] = [
  "à","de","en","dans","sur","sous","avec","sans","pour","par","chez",
  "entre","parmi","vers","jusqu'à","depuis","avant","après","pendant",
  "durant","selon","malgré","contre","envers","près","loin",
  "autour","autour de","au-dessus","au-dessous","en face","en dehors",
  "à côté","à travers","au milieu","au bout","au fond","au bord",
  "le long","à partir","à cause","grâce à","à l'aide","en raison",
  "à force","à moins","à condition","au lieu","en dehors",
  "en bas","en haut","à gauche","à droite","devant","derrière",
];

const CONJONCTIONS: string[] = [
  "et","ou","mais","donc","or","ni","car",
  "que","quand","comme","si","lorsque","puisque","parce que",
  "bien que","quoique","afin que","pour que","avant que","après que",
  "à condition que","à moins que","pourvu que","bien que","quoique",
  "tandis que","alors que","pendant que","depuis que","jusqu'à ce que",
  "dès que","aussitôt que","sitôt que","chaque fois que",
  "soit… soit","ou… ou","ni… ni","non seulement… mais aussi",
  "d'une part","d'autre part","d'un côté","de l'autre côté",
];

// ── 3. CONNECTEURS TEXTUELS ───────────────────────────────────────────────────
const CONNECTEURS: string[] = [
  // Séquence
  "d'abord","premièrement","deuxièmement","troisièmement","quatrièmement",
  "ensuite","puis","après","par la suite","finalement","enfin",
  "en premier lieu","en deuxième lieu","en troisième lieu","en dernier lieu",
  "tout d'abord","dans un premier temps","dans un deuxième temps",
  "dans un troisième temps","pour commencer","pour terminer","pour finir",
  "au début","au départ","à la fin","au terme",
  // Addition
  "de plus","en outre","également","aussi","ainsi que",
  "par ailleurs","de même","en plus","et","non seulement",
  "à cela s'ajoute","il faut également","sans compter que",
  "qui plus est","voire","voire même","encore","davantage",
  // Opposition / concession
  "mais","cependant","pourtant","néanmoins","toutefois",
  "or","au contraire","par contre","en revanche","à l'inverse",
  "malgré","malgré tout","quand même","tout de même","en dépit de",
  "bien que","même si","quoique","certes","il est vrai que",
  "d'un côté","de l'autre côté","si d'un côté","si bien que",
  // Cause
  "car","parce que","puisque","étant donné que","vu que","attendu que",
  "en raison de","à cause de","grâce à","sous prétexte que",
  "vu que","considérant que","du fait que","par suite de",
  // Conséquence
  "donc","alors","ainsi","par conséquent","c'est pourquoi","c'est pour cela que",
  "en conséquence","de sorte que","si bien que","tellement que",
  "à tel point que","de manière que","de façon que","il s'ensuit que",
  "résultat","du coup","dès lors",
  // Illustration / exemple
  "par exemple","notamment","en particulier","tel que","comme",
  "ainsi","c'est le cas de","entre autres","à titre d'exemple",
  "c'est notamment","prenons le cas","on peut citer",
  // Reformulation
  "c'est-à-dire","autrement dit","en d'autres termes","soit",
  "à savoir","en fait","en réalité","plus précisément",
  "autrement dit","pour mieux dire","en un mot",
  // Conclusion
  "en conclusion","en résumé","bref","en somme","pour conclure",
  "finalement","en définitive","au total","en guise de conclusion",
  "pour résumer","en bref","tout compte fait","en fin de compte",
  "il ressort que","on peut donc dire","ainsi donc",
  // Comparaison
  "de même","similairement","à l'instar de","comme","tel que",
  "contrairement à","à la différence de","alors que","tandis que",
  "plus que","moins que","autant que","aussi… que","si… que",
];

// ── 4. ADVERBES ───────────────────────────────────────────────────────────────
const ADVERBES: string[] = [
  // Manière
  "bien","mal","vite","lentement","doucement","fortement","clairement",
  "facilement","difficilement","rapidement","attentivement","correctement",
  "différemment","également","vraiment","complètement","totalement",
  "partiellement","absolument","certainement","évidemment","visiblement",
  "manifestement","précisément","exactement","particulièrement","notamment",
  "généralement","habituellement","normalement","régulièrement","naturellement",
  "simplement","seulement","uniquement","principalement","essentiellement",
  "surtout","surtout","notamment","spécialement","expressément",
  // Temps
  "maintenant","aujourd'hui","hier","demain","bientôt","déjà","encore",
  "toujours","jamais","parfois","souvent","rarement","quelquefois",
  "autrefois","jadis","naguère","récemment","prochainement",
  "tôt","tard","tôt ou tard","immédiatement","aussitôt","bientôt",
  "longtemps","momentanément","temporairement","provisoirement",
  "dorénavant","désormais","dès lors","à présent","en ce moment",
  // Lieu
  "ici","là","là-bas","partout","nulle part","quelque part","ailleurs",
  "dedans","dehors","devant","derrière","dessus","dessous",
  "loin","près","près de","loin de",
  // Quantité
  "très","assez","trop","peu","beaucoup","plus","moins","autant",
  "si","tellement","davantage","environ","à peu près","presque",
  "tout à fait","entièrement","à moitié","en grande partie",
  // Affirmation / négation
  "oui","non","si","peut-être","certes","effectivement","en effet",
  "bien sûr","absolument","exactement","précisément","justement",
  "ne… pas","ne… plus","ne… jamais","ne… rien","ne… personne","ne… que",
  "ne… guère","ne… point","ne… aucun",
];

// ── 5. ADJECTIFS QUALIFICATIFS ────────────────────────────────────────────────
const ADJECTIFS: string[] = [
  // Taille / dimensions
  "grand","grande","grands","grandes","petit","petite","petits","petites",
  "long","longue","longs","longues","court","courte","courts","courtes",
  "haut","haute","hauts","hautes","bas","basse","bas","basses",
  "large","étroit","étroite","profond","profonde","léger","légère",
  "lourd","lourde","gros","grosse","fin","fine","épais","épaisse",
  // Qualité générale
  "bon","bonne","bons","bonnes","mauvais","mauvaise","mauvaises",
  "beau","belle","beaux","belles","joli","jolie","jolis","jolies",
  "laid","laide","laids","laides","magnifique","magnifiques",
  "excellent","excellente","médiocre","affreux","affreuse",
  "parfait","parfaite","parfaits","imparfait","imparfaite",
  // Couleurs
  "rouge","bleu","bleue","vert","verte","jaune","orange","violet","violette",
  "noir","noire","blanc","blanche","gris","grise","rose","brun","brune",
  "beige","doré","dorée","argenté","argentée","coloré","colorée",
  // Caractère / personnalité
  "gentil","gentille","méchant","méchante","courageux","courageuse",
  "timide","peureux","peureuse","curieux","curieuse","intelligent","intelligente",
  "sage","fou","folle","calme","nerveux","nerveuse","sérieux","sérieuse",
  "drôle","amusant","amusante","triste","joyeux","joyeuse","heureux","heureuse",
  "malheureux","malheureuse","généreux","généreuse","égoïste","patient","patiente",
  "impatient","impatiente","confiant","confiante","fier","fière",
  // Temps / état
  "vieux","vieil","vieille","vieux","vieilles","jeune","jeunes",
  "nouveau","nouvel","nouvelle","nouveaux","nouvelles","ancien","ancienne",
  "moderne","contemporain","actuel","actuelle","récent","récente",
  "prochain","prochaine","dernier","dernière","premier","première",
  "futur","future","passé","passée","présent","présente",
  // Autres qualités
  "difficile","facile","possible","impossible","probable","certain","certaine",
  "important","importante","secondaire","principal","principale",
  "simple","complexe","clair","claire","obscur","obscure","précis","précise",
  "vrai","vraie","faux","fausse","réel","réelle","imaginaire",
  "utile","inutile","nécessaire","suffisant","suffisante","insuffisant",
  "nombreux","nombreuse","rare","fréquent","fréquente","commun","commune",
  "naturel","naturelle","artificiel","artificielle","normal","normale",
  "spécial","spéciale","ordinaire","extraordinaire","unique","universel",
  "local","locale","national","nationale","international","internationale",
  "public","publique","privé","privée","gratuit","gratuite","cher","chère",
];

// ── 6. VERBES — INFINITIFS ────────────────────────────────────────────────────
const VERBES_INFINITIFS: string[] = [
  // Auxiliaires et modaux
  "être","avoir","aller","faire","dire","vouloir","pouvoir","devoir",
  "savoir","falloir","venir","tenir","prendre","mettre","partir",
  // Verbes courants -ER
  "aimer","aller","arriver","apporter","apprendre","appeler","aider",
  "acheter","accepter","accorder","accuser","agir","augmenter",
  "bouger","briller","blesser","chercher","changer","chanter","choisir",
  "commencer","continuer","compter","comprendre","construire","courir",
  "couvrir","créer","danser","décider","demander","décrire","défendre",
  "dessiner","détester","devenir","donner","dormir","écouter","écrire",
  "empêcher","entrer","envoyer","espérer","essayer","étudier","expliquer",
  "fermer","finir","former","gagner","garder","habiter","imaginer",
  "inviter","jouer","laisser","lire","marcher","manger","monter","montrer",
  "oublier","ouvrir","parler","penser","permettre","porter","poser",
  "préparer","présenter","produire","profiter","proposer","raconter",
  "regarder","rentrer","répondre","rester","retourner","réussir","rire",
  "sauter","sembler","sentir","sortir","suivre","supposer","tomber",
  "toucher","travailler","trouver","utiliser","vivre","voir","voyager",
  "achever","agir","agréer","améliorer","analyser","avancer","avertir",
  "calculer","classer","colorier","comparer","compléter","connecter",
  "copier","corriger","couper","découvrir","définir","déplacer","dessiner",
  "développer","deviner","différencier","discuter","distinguer","diviser",
  "éliminer","employer","encercler","enrichir","énumérer","estimer",
  "identifier","illustrer","inclure","indiquer","inscrire","installer",
  "interpréter","intervenir","justifier","lier","localiser","mesurer",
  "mémoriser","modifier","nommer","observer","obtenir","organiser",
  "reconnaître","relier","remplacer","repérer","résoudre","résumer",
  "souligner","sélectionner","traduire","transformer","transposer",
  "vérifier","visualiser",
];

// ── 7. CONJUGAISON — FORMES VERBALES ─────────────────────────────────────────
const CONJUGAISON_PRESENT: string[] = [
  // ÊTRE
  "suis","es","est","sommes","êtes","sont",
  // AVOIR
  "ai","as","a","avons","avez","ont",
  // ALLER
  "vais","vas","va","allons","allez","vont",
  // FAIRE
  "fais","fait","faisons","faites","font",
  // DIRE
  "dis","dit","disons","dites","disent",
  // VOIR
  "vois","voit","voyons","voyez","voient",
  // PRENDRE
  "prends","prend","prenons","prenez","prennent",
  // VENIR
  "viens","vient","venons","venez","viennent",
  // SAVOIR
  "sais","sait","savons","savez","savent",
  // POUVOIR
  "peux","peut","pouvons","pouvez","peuvent",
  // VOULOIR
  "veux","veut","voulons","voulez","veulent",
  // DEVOIR
  "dois","doit","devons","devez","doivent",
  // METTRE
  "mets","met","mettons","mettez","mettent",
  // PARTIR
  "pars","part","partons","partez","partent",
  // SORTIR
  "sors","sort","sortons","sortez","sortent",
  // FINIR
  "finis","finit","finissons","finissez","finissent",
  // CHOISIR
  "choisis","choisit","choisissons","choisissez","choisissent",
  // RÉUSSIR
  "réussis","réussit","réussissons","réussissez","réussissent",
  // Verbes -ER réguliers (je/tu/il/nous/vous/ils)
  "parle","parles","parlons","parlez","parlent",
  "mange","manges","mangeons","mangez","mangent",
  "joue","joues","jouons","jouez","jouent",
  "chante","chantes","chantons","chantez","chantent",
  "marche","marches","marchons","marchez","marchent",
  "étudie","études","étudions","étudiez","étudient",
  "travaille","travailles","travaillons","travaillez","travaillent",
  "regarde","regardes","regardons","regardez","regardent",
  "aime","aimes","aimons","aimez","aiment",
  "parle","parles","parlons","parlez","parlent",
  "écoute","écoutes","écoutons","écoutez","écoutent",
  "trouve","trouves","trouvons","trouvez","trouvent",
  "donne","donnes","donnons","donnez","donnent",
  "reste","restes","restons","restez","restent",
  "entre","entres","entrons","entrez","entrent",
  "pense","penses","pensons","pensez","pensent",
  "porte","portes","portons","portez","portent",
  "commence","commences","commençons","commencez","commencent",
  "continue","continues","continuons","continuez","continuent",
  "demande","demandes","demandons","demandez","demandent",
  "cherche","cherches","cherchons","cherchez","cherchent",
  "aide","aides","aidons","aidez","aident",
  "lance","lances","lançons","lancez","lancent",
  "utilise","utilises","utilisons","utilisez","utilisent",
  "pédaler","pédale","pédales","pédalons","pédalez","pédalent",
  "jouer","joue","joues","jouons","jouez","jouent",
  "ranger","range","ranges","rangeons","rangez","rangent",
  "chasser","chasse","chasses","chassons","chassez","chassent",
  "téléphoner","téléphone","téléphones","téléphonons","téléphonez","téléphonent",
  "rénover","rénove","rénoves","rénovons","rénovez","rénovent",
];

const CONJUGAISON_PASSE: string[] = [
  // Passé composé — avoir
  "ai été","as été","a été","avons été","avez été","ont été",
  "ai eu","as eu","a eu","avons eu","avez eu","ont eu",
  "ai fait","as fait","a fait","avons fait","avez fait","ont fait",
  "ai dit","as dit","a dit","avons dit","avez dit","ont dit",
  "ai vu","as vu","a vu","avons vu","avez vu","ont vu",
  "ai pris","as pris","a pris","avons pris","avez pris","ont pris",
  "ai mis","as mis","a mis","avons mis","avez mis","ont mis",
  "ai voulu","as voulu","a voulu","avons voulu","avez voulu","ont voulu",
  "ai pu","as pu","a pu","avons pu","avez pu","ont pu",
  "ai dû","as dû","a dû","avons dû","avez dû","ont dû",
  "ai su","as su","a su","avons su","avez su","ont su",
  "ai mangé","a mangé","avons mangé",
  "ai parlé","a parlé","avons parlé",
  "ai aimé","a aimé","avons aimé",
  "ai trouvé","a trouvé","avons trouvé",
  "ai fini","a fini","avons fini",
  "ai choisi","a choisi","avons choisi",
  // Passé composé — être
  "suis allé","est allé","sommes allés","sont allés",
  "suis allée","est allée","sommes allées","sont allées",
  "suis venu","est venu","sommes venus","sont venus",
  "suis venue","est venue","sommes venues","sont venues",
  "suis parti","est parti","sommes partis","sont partis",
  "suis partie","est partie","sommes parties","sont parties",
  "suis arrivé","est arrivé","sommes arrivés","sont arrivés",
  "suis arrivée","est arrivée","sommes arrivées","sont arrivées",
  "suis né","est né","sommes nés","sont nés",
  "suis né","est née","sommes nées","sont nées",
  "suis mort","est mort","sommes morts","sont morts",
  "suis restée","est resté","sommes restés","sont restés",
  // Imparfait
  "étais","était","étions","étiez","étaient",
  "avais","avait","avions","aviez","avaient",
  "allais","allait","allions","alliez","allaient",
  "faisais","faisait","faisions","faisiez","faisaient",
  "disais","disait","disions","disiez","disaient",
  "voyais","voyait","voyions","voyiez","voyaient",
  "prenais","prenait","prenions","preniez","prenaient",
  "pouvais","pouvait","pouvions","pouviez","pouvaient",
  "voulais","voulait","voulions","vouliez","voulaient",
  "savais","savait","savions","saviez","savaient",
  "parlais","parlait","parlions","parliez","parlaient",
  "jouais","jouait","jouions","jouiez","jouaient",
  "marchais","marchait","marchions","marchiez","marchaient",
  "vivais","vivait","vivions","viviez","vivaient",
  "croyais","croyait","croyions","croyiez","croyaient",
  "lisais","lisait","lisions","lisiez","lisaient",
  "écrivais","écrivait","écrivions","écriviez","écrivaient",
  // Passé simple
  "fut","furent","eut","eurent","alla","allèrent",
  "fit","firent","dit","dirent","vit","virent",
  "prit","prirent","mit","mirent","vint","vinrent",
  "tint","tinrent","courut","coururent","mourut","moururent",
  "arriva","arrivèrent","parla","parlèrent","donna","donnèrent",
  "trouva","trouvèrent","regarda","regardèrent","chanta","chantèrent",
  "tomba","tombèrent","entra","entrèrent","marcha","marchèrent",
];

const CONJUGAISON_FUTUR: string[] = [
  "serai","seras","sera","serons","serez","seront",
  "aurai","auras","aura","aurons","aurez","auront",
  "irai","iras","ira","irons","irez","iront",
  "ferai","feras","fera","ferons","ferez","feront",
  "dirai","diras","dira","dirons","direz","diront",
  "verrai","verras","verra","verrons","verrez","verront",
  "prendrai","prendras","prendra","prendrons","prendrez","prendront",
  "viendrai","viendras","viendra","viendrons","viendrez","viendront",
  "pourrai","pourras","pourra","pourrons","pourrez","pourront",
  "voudrai","voudras","voudra","voudrons","voudrez","voudront",
  "saurai","sauras","saura","saurons","saurez","sauront",
  "devrai","devras","devra","devrons","devrez","devront",
  "parlerai","parleras","parlera","parlerons","parlerez","parleront",
  "mangerai","mangeras","mangera","mangerons","mangerez","mangeront",
  "jouerai","joueras","jouera","jouerons","jouerez","joueront",
  "travaillerai","travailleras","travaillera","travaillerons","travaillerez","travailleront",
  "finirai","finiras","finira","finirons","finirez","finiront",
  "choisirai","choisiras","choisira","choisirons","choisirez","choisiront",
];

const CONJUGAISON_CONDITIONNEL: string[] = [
  "serais","serait","serions","seriez","seraient",
  "aurais","aurait","aurions","auriez","auraient",
  "irais","irait","irions","iriez","iraient",
  "ferais","ferait","ferions","feriez","feraient",
  "dirais","dirait","dirions","diriez","diraient",
  "verrais","verrait","verrions","verriez","verraient",
  "prendrais","prendrait","prendrions","prendriez","prendraient",
  "viendrais","viendrait","viendrions","viendriez","viendraient",
  "pourrais","pourrait","pourrions","pourriez","pourraient",
  "voudrais","voudrait","voudrions","voudriez","voudraient",
  "saurais","saurait","saurions","sauriez","sauraient",
  "devrais","devrait","devrions","devriez","devraient",
  "parlerais","parlerait","parlerions","parleriez","parleraient",
];

const PARTICIPES: string[] = [
  // Participes passés courants
  "été","eu","fait","dit","vu","mis","pris","venu","allé","allée",
  "parti","partie","arrivé","arrivée","né","née","mort","morte",
  "devenu","devenue","resté","restée","entré","entrée","sorti","sortie",
  "tombé","tombée","monté","montée","descendu","descendue",
  "trouvé","donné","parlé","mangé","aimé","joué","chanté",
  "marché","travaillé","étudié","regardé","écouté","demandé",
  "choisi","fini","réussi","obéi","établi","saisi","bâti",
  "lu","écrit","ouvert","couvert","offert","souffert",
  "su","voulu","pu","dû","connu","cru","couru","valu",
  "tenu","retenu","appartenu","contenu","obtenu",
  "peint","joint","craint","plaInt","atteint","éteint",
  "conduit","produit","réduit","traduit","introduit","construit",
  "compris","appris","surpris","repris","entrepris",
  "reçu","aperçu","conçu","déçu","perçu",
  // Participes présents courants
  "étant","ayant","allant","faisant","disant","voyant",
  "prenant","venant","pouvant","voulant","sachant",
  "parlant","mangeant","jouant","travaillant","finissant",
  "choisissant","lisant","écrivant","courant","vivant",
];

// ── 8. CLASSES DE MOTS & GRAMMAIRE ───────────────────────────────────────────
const GRAMMAIRE: string[] = [
  // Classes de mots
  "nom","noms","pronom","pronoms","verbe","verbes","adjectif","adjectifs",
  "adverbe","adverbes","déterminant","déterminants","préposition","prépositions",
  "conjonction","conjonctions","interjection","interjections","article","articles",
  "nom commun","nom propre","nom masculin","nom féminin",
  "nom singulier","nom pluriel","nom abstrait","nom concret","nom collectif",
  // Types d'adjectifs
  "adjectif qualificatif","adjectif possessif","adjectif démonstratif",
  "adjectif numéral","adjectif indéfini","adjectif interrogatif","adjectif exclamatif",
  // Déterminants détaillés
  "déterminant défini","déterminant indéfini","déterminant possessif",
  "déterminant démonstratif","déterminant numéral","déterminant partitif",
  "déterminant exclamatif","déterminant interrogatif",
  // Pronoms détaillés
  "pronom personnel","pronom possessif","pronom démonstratif",
  "pronom relatif","pronom interrogatif","pronom indéfini","pronom réfléchi",
  // Types de verbes
  "verbe conjugué","verbe à l'infinitif","infinitif","participe passé","participe présent",
  "auxiliaire","être","avoir","transitif","intransitif","pronominal","impersonnel",
  "verbe d'état","verbe d'action","verbe attributif",
  // Temps et modes
  "présent","passé","futur","imparfait","passé composé","passé simple",
  "plus-que-parfait","conditionnel","subjonctif","impératif",
  "futur simple","futur antérieur","conditionnel présent","conditionnel passé",
  "indicatif","mode indicatif","mode subjonctif","mode impératif","mode conditionnel",
  "mode infinitif","mode participe",
  // Accord
  "accord","accords","s'accorde","s'accordent","accordé","accordée",
  "genre","nombre","personne","masculine","féminine","singulière","plurielle",
  "accord du participe passé","accord de l'adjectif",
  // Fonctions syntaxiques
  "sujet","prédicat","complément","complément direct","complément indirect",
  "complément de phrase","attribut","attribut du sujet","attribut du complément direct",
  "épithète","apposition","modificateur",
  "CD","CI","CP","GN","GV","GPrép","GA","GAdv",
  "groupe nominal","groupe verbal","groupe prépositionnel",
  "groupe adjectival","groupe adverbial",
  // Phrases
  "phrase","phrases","phrase déclarative","phrase interrogative","phrase exclamative",
  "phrase impérative","phrase négative","phrase affirmative",
  "phrase simple","phrase complexe","phrase subordonnée",
  "subordonnée relative","subordonnée complétive","subordonnée circonstancielle",
  "principale","subordonnée","proposition","subordination","coordination",
  "sujet de la phrase","prédicat de la phrase","complément de phrase",
  // Ponctuation
  "virgule","point","point-virgule","deux-points","point d'exclamation",
  "point d'interrogation","points de suspension","tiret","guillemets",
  "parenthèses","majuscule","minuscule","alinéa","paragraphe",
];

// ── 9. ORTHOGRAPHE & HOMOPHONES ───────────────────────────────────────────────
const ORTHOGRAPHE: string[] = [
  // Homophones classiques
  "a","à","ou","où","et","est","on","ont",
  "son","sont","ce","se","sa","ça","c'est","s'est",
  "ces","ses","mes","mais","peu","peut","peux",
  "leur","leurs","tout","tous","toute","toutes",
  "quand","quant","qu'en","quel","quelle","qu'elle",
  "davantage","d'avantage","plutôt","plus tôt",
  "quelque","quelques","quel que","quelque peu",
  "tout à coup","tout d'un coup","quant à","tant qu'à",
  "sens","cent","sans","sang",
  "ver","vers","verre","vert","verre",
  "mer","mère","maire","mair",
  "cour","cours","court","courre",
  "foi","foie","fois","foit",
  "bal","balle","bals","balles",
  "fin","faim","feint",
  "sot","seau","sceau","saut",
  "pain","pin","peint","bain","bein",
  "vain","vin","vingt","vint",
  // Accords complexes
  "tout","toute","tous","toutes","aucun","aucune","certains","certaines",
  "même","mêmes","quelques","quelques-uns","quelques-unes",
  "demi","demie","nu","nue","mi-","semi-",
  "possible","possibles","approuvé","ci-joint","ci-annexé",
  // Mots souvent mal orthographiés
  "alors","beaucoup","aujourd'hui","quelquefois","toujours",
  "maintenant","cependant","parce que","puisque","lorsque",
  "néanmoins","pourtant","d'abord","ensuite","enfin",
  "peut-être","c'est-à-dire","vis-à-vis","au-delà","au-dessus",
  "au-dessous","au-devant","ci-dessus","ci-dessous","ci-contre",
  "jusqu'ici","jusqu'à","quelqu'un","quelque chose","n'importe",
  "etc.","c.-à-d.","p. ex.","p.","fig.","no","numéro",
];

// ── 10. TEXTE NARRATIF ────────────────────────────────────────────────────────
const NARRATIF: string[] = [
  // Schéma narratif
  "schéma narratif","situation initiale","élément perturbateur","péripéties",
  "dénouement","situation finale","résolution","complication","nœud",
  "exposition","climax","chute","épilogue","prologue",
  // Personnages
  "personnage","personnages","protagoniste","antagoniste","narrateur","narratrice",
  "héros","héroïne","personnage principal","personnage secondaire","figurant",
  "antihéros","mentor","rival","allié","complice","témoin",
  // Éléments de l'histoire
  "intrigue","récit","histoire","narration","aventure","conte","roman","nouvelle",
  "lieu","lieux","endroit","décor","cadre","espace","milieu","environnement",
  "temps","époque","moment","période","durée","chronologie",
  "action","actions","événement","événements","rebondissement",
  "coup de théâtre","tension","suspense","surprise","retournement",
  "dialogue","dialogues","monologue","description","descriptions","narration",
  // Point de vue
  "point de vue","narrateur omniscient","narrateur interne","narrateur externe",
  "première personne","troisième personne","focalisation interne","focalisation zéro",
  "je narratif","il narratif",
  // Temps de narration
  "passé simple","imparfait","plus-que-parfait","présent de narration",
  // Procédés littéraires
  "métaphore","comparaison","personnification","hyperbole","litote",
  "énumération","répétition","antithèse","euphémisme","périphrase",
  "allitération","assonance","anaphore","chiasme","oxymore",
  "image","images","figure de style","figures de style","procédé littéraire",
  "symbole","symbolisme","allégorie","ironie","humour","sarcasme",
  // Émotions et sentiments
  "émotion","émotions","sentiment","sentiments","bonheur","tristesse",
  "joie","peur","colère","surprise","dégoût","amour","haine",
  "angoisse","espoir","désespoir","fierté","honte","jalousie",
  "courage","lâcheté","générosité","égoïsme","confiance","méfiance",
];

// ── 11. TEXTES DESCRIPTIF / EXPLICATIF / ARGUMENTATIF ─────────────────────────
const DESCRIPTIF: string[] = [
  "texte descriptif","description","descriptif","portrait","paysage",
  "sujet observé","aspects","sous-aspects","caractéristique","caractéristiques",
  "sens","vue","ouïe","odorat","goût","toucher","champ sensoriel","champs sensoriels",
  "couleur","forme","taille","texture","odeur","son","saveur","température",
  "apparence","aspect","allure","silhouette","contour","relief",
  "objectif","subjectif","neutre","élogieux","péjoratif",
  "comparaison","métaphore","analogie","énumération",
];

const EXPLICATIF: string[] = [
  "texte explicatif","explication","explicatif","informatif",
  "mise en situation","développement","conclusion","introduction",
  "cause","causes","conséquence","conséquences","effet","effets",
  "processus","étape","étapes","phase","phases","progression",
  "définition","exemple","exemples","analogie","comparaison",
  "reformulation","illustration","démonstration","preuve",
  "phénomène","concept","notion","principe","loi","règle",
  "scientifique","naturel","historique","économique","social",
];

const ARGUMENTATIF: string[] = [
  "texte argumentatif","argumentation","argumentatif","opinion","point de vue",
  "thèse","antithèse","synthèse","plan","structure",
  "argument","arguments","argument d'autorité","argument par l'exemple",
  "argument logique","analogie argumentative","appel aux valeurs",
  "contre-argument","réfutation","concession","nuance","restriction",
  "sujet amené","sujet posé","sujet divisé","ouverture",
  "introduction","développement","conclusion","paragraphe",
  "preuve","preuves","données","statistiques","citation","référence",
  "valeur","valeurs","croyance","conviction","idéologie","société","culture",
  "pour","contre","avantage","avantages","inconvénient","inconvénients",
  "d'accord","en désaccord","favorable","défavorable","nuancé",
];

// ── 12. ÉCRITURE & PROCESSUS ──────────────────────────────────────────────────
const ECRITURE: string[] = [
  // Structure
  "introduction","développement","conclusion","paragraphe","paragraphes","alinéa",
  "phrase d'accroche","phrase de clôture","idée principale","idée secondaire",
  "idée directrice","sujet","thème","propos","aspect",
  // Processus d'écriture
  "planification","rédaction","révision","correction","relecture",
  "brouillon","plan","schéma","carte d'idées",
  "cohérence","cohésion","clarté","précision","concision",
  // Registres
  "registre","registre de langue","langue soutenue","langue standard","langue familière",
  "langue populaire","argot","niveau de langue","registre littéraire",
  // Style
  "tournure de phrase","style","ton","voix","rythme","fluidité",
  "vocabulaire précis","vocabulaire varié","répétition","synonyme","antonyme",
  "champ lexical","famille de mots","dérivation","composition",
  // Ponctuation et mise en forme
  "virgule","point","deux-points","point-virgule","guillemets",
  "tiret","parenthèses","crochets","italique","gras","souligné",
];

// ── 13. VOCABULAIRE SCOLAIRE & ACADÉMIQUE ────────────────────────────────────
const SCOLAIRE: string[] = [
  // Matières
  "français","mathématiques","sciences","histoire","géographie","arts",
  "éducation physique","anglais","musique","informatique",
  // Activités scolaires
  "lire","écrire","calculer","dessiner","créer","présenter","résumer",
  "analyser","comparer","classer","trier","observer","expérimenter",
  "chercher","trouver","découvrir","expliquer","justifier","argumenter",
  // Objets scolaires
  "livre","cahier","crayon","stylo","règle","gomme","compas","calculatrice",
  "tableau","bureau","pupitre","chaise","cartable","sac à dos",
  // Personnes
  "élève","étudiant","étudiante","enseignant","enseignante","professeur",
  "directeur","directrice","camarade","ami","amie","groupe","classe",
  // Évaluation
  "note","notes","résultat","résultats","succès","réussite","échec",
  "examen","test","quiz","travail","devoir","devoirs","projet","exposé",
  "correction","révision","préparation","effort","progrès",
];

// ── 14. VOCABULAIRE QUOTIDIEN ─────────────────────────────────────────────────
const QUOTIDIEN: string[] = [
  // Corps humain
  "tête","visage","yeux","nez","bouche","oreilles","cheveux","cou",
  "épaules","bras","mains","doigts","jambes","pieds","dos","ventre",
  "cœur","cerveau","poumons","os","peau","sang",
  // Famille
  "famille","père","mère","fils","fille","frère","sœur","cousin","cousine",
  "grand-père","grand-mère","oncle","tante","neveu","nièce","conjoint",
  // Maison
  "maison","appartement","chambre","cuisine","salon","salle de bain",
  "garage","jardin","porte","fenêtre","escalier","mur","plafond","plancher",
  "table","chaise","lit","armoire","canapé","cuisine","réfrigérateur",
  // Nature
  "arbre","arbres","fleur","fleurs","herbe","forêt","montagne","rivière",
  "lac","mer","océan","ciel","soleil","lune","étoile","nuage","pluie",
  "neige","vent","saison","printemps","été","automne","hiver",
  // Nourriture
  "pain","eau","lait","jus","café","thé","soupe","salade","viande",
  "poisson","légume","légumes","fruit","fruits","fromage","dessert",
  "pomme","orange","banane","tomate","carotte","pomme de terre",
  // Couleurs
  "rouge","bleu","vert","jaune","orange","violet","rose","noir","blanc",
  "gris","brun","beige","doré","argenté","turquoise","bordeaux",
  // Nombres et quantités
  "un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix",
  "onze","douze","quinze","vingt","trente","quarante","cinquante",
  "soixante","soixante-dix","quatre-vingts","cent","mille",
  "premier","deuxième","troisième","dernier","suivant","précédent",
  // Temps
  "seconde","minute","heure","jour","semaine","mois","année","siècle",
  "lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche",
  "janvier","février","mars","avril","mai","juin",
  "juillet","août","septembre","octobre","novembre","décembre",
  "matin","après-midi","soir","nuit","midi","minuit",
];

// ── 15. DOCUMENTS ADMINISTRATIFS QUÉBÉCOIS (FPT) ────────────────────────────
const FPT: string[] = [
  "facture","relevé","contrat","formulaire","document","dossier","rapport",
  "montant","total","solde","paiement","remboursement","déboursé",
  "salaire","revenu","revenu imposable","revenu brut","revenu net",
  "impôt","impôts","déduction","cotisation","cotisations",
  "assurance","emploi","assurance-emploi","prestation","prestations",
  "retraite","pension","RRQ","Régime de rentes du Québec",
  "RQAP","Régime québécois d'assurance parentale",
  "AE","assurance emploi","code","période de référence",
  "employeur","employé","employée","travailleur","travailleuse",
  "heures assurables","semaines assurables","rémunération assurable",
  "brut","net","retenue","retenues","avantage imposable",
  "Hydro-Québec","Revenu Québec","tarif","kilowattheure","kWh",
  "consommation","lecture","compteur","abonnement","service",
  "LNT","Loi sur les normes du travail","vacances","congés","préavis",
  "heures supplémentaires","taux horaire","période de paie",
  "numéro d'assurance sociale","NAS","date d'embauche","date de naissance",
  "crédit d'impôt","remboursement","solde dû","solde à payer",
  "compte","numéro de compte","référence","code postal","adresse",
];

// ── 16. MOTS DE LECTURE ET COMPRÉHENSION ─────────────────────────────────────
const LECTURE: string[] = [
  "auteur","auteure","auteurs","auteures","narrateur","narratrice",
  "lecteur","lectrice","lecteurs","lectrices","personnage",
  "titre","sous-titre","chapeau","légende","note","annotation",
  "résumé","synthèse","analyse","commentaire","critique",
  "inférence","déduction","implicite","explicite","sous-entendu",
  "contexte","contexte historique","contexte social",
  "intention","intention de l'auteur","message","idée","thèse",
  "opinion","fait","faits","jugement","interprétation",
  "repérage","information","informations","données",
  "genre","sous-genre","type de texte",
  "roman","nouvelle","conte","poème","fable","légende","mythe",
  "article","éditorial","lettre","journal","courriel","rapport",
  "bande dessinée","affiche","publicité","texte publicitaire",
  "fond","forme","structure","organisation","mise en page",
];

// ── 17. MARQUEURS DE RELATION ─────────────────────────────────────────────────
const MARQUEURS: string[] = [
  // Déjà couverts dans CONNECTEURS, ajout de formes moins courantes
  "à cet égard","en ce sens","sous cet angle","de ce fait","à cet effet",
  "il est à noter que","il convient de","il faut mentionner",
  "comme en témoigne","comme le montre","comme on peut le voir",
  "on remarque que","on observe que","on constate que","on note que",
  "il apparaît que","il semble que","il est probable que",
  "pour sa part","quant à lui","quant à elle","pour ce qui est de",
  "en ce qui concerne","relativement à","par rapport à","face à",
  "compte tenu de","en fonction de","selon","d'après","pour",
  "à l'exception de","hormis","outre","en dehors de","mis à part",
  "en particulier","en général","globalement","dans l'ensemble",
  "à titre personnel","personnellement","selon moi","à mon avis",
  "à notre avis","selon nous","d'après nous","il me semble que",
  "il nous semble que","j'estime que","nous estimons que",
  "je crois que","nous croyons que","je pense que","je trouve que",
];

// ── 18. MOTS QUÉBÉCOIS & EXPRESSIONS ─────────────────────────────────────────
const QUEBECOIS: string[] = [
  "dépanneur","CLSC","cégep","polyvalente","commission scolaire",
  "autoroute","rang","rang de terre","croix de chemin",
  "calumet","parka","mitaines","bottes","tuque","catalogue",
  "souper","dîner","déjeuner","réveillon","cabane à sucre",
  "tire sur la neige","sucre d'érable","sirop d'érable","fève au lard",
  "poutine","pogos","crétons","tourtière","ragoût",
  "hockey","ringuette","ballon chasseur","soccer","natation",
  "Montréal","Québec","Gatineau","Laval","Longueuil","Saguenay",
  "Laurentides","Estrie","Mauricie","Abitibi","Gaspésie",
  "fleuve Saint-Laurent","rivière des Outaouais","lac Saint-Jean",
  "hôtel de ville","mairie","arrondissement","quartier","rue","boulevard",
  "métro","autobus","traversier","train","avion","vélo","voiture",
  "citoyen","citoyenne","municipalité","gouvernement","loi","règlement",
];

// ── LISTE MAÎTRE COMBINÉE ET DÉDUPLIQUÉE ─────────────────────────────────────
const ALL_PHRASES: string[] = [
  ...DETERMINANTS, ...PRONOMS, ...PREPOSITIONS, ...CONJONCTIONS,
  ...CONNECTEURS, ...ADVERBES, ...ADJECTIFS,
  ...VERBES_INFINITIFS,
  ...CONJUGAISON_PRESENT, ...CONJUGAISON_PASSE, ...CONJUGAISON_FUTUR,
  ...CONJUGAISON_CONDITIONNEL, ...PARTICIPES,
  ...GRAMMAIRE, ...ORTHOGRAPHE,
  ...NARRATIF, ...DESCRIPTIF, ...EXPLICATIF, ...ARGUMENTATIF,
  ...ECRITURE, ...SCOLAIRE, ...QUOTIDIEN, ...FPT, ...LECTURE,
  ...MARQUEURS, ...QUEBECOIS,
];

// Extraire les expressions ET les mots individuels
function extractAll(phrases: string[]): string[] {
  const result = new Set<string>();
  for (const phrase of phrases) {
    const clean = phrase.trim();
    if (clean.length >= 2) result.add(clean);
    // Ajouter aussi chaque mot individuel pour le matching partiel
    for (const word of clean.split(/[\s\-\/]+/)) {
      const w = word.replace(/[^a-zA-ZÀ-ÿœæ']/g, "");
      if (w.length >= 2) result.add(w);
    }
  }
  return Array.from(result);
}

export const FRENCH_VOCABULARY: string[] = extractAll(ALL_PHRASES);
