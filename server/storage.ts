import { randomUUID } from "crypto";
import type {
  User,
  InsertUser,
  Course,
  InsertCourse,
  Exercise,
  InsertExercise,
  Question,
  InsertQuestion,
  StudentResponse,
  InsertStudentResponse,
  StudentProgress,
  StudentBadge,
  Assignment,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Courses
  getCourse(id: string): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Exercises
  getExercise(id: string): Promise<Exercise | undefined>;
  getExercisesByCourse(courseId: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Questions
  getQuestion(id: string): Promise<Question | undefined>;
  getQuestionsByExercise(exerciseId: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;

  // Student Responses
  createResponse(response: InsertStudentResponse): Promise<StudentResponse>;
  getResponsesByStudent(studentId: string): Promise<StudentResponse[]>;
  getResponsesByQuestion(questionId: string): Promise<StudentResponse[]>;

  // Student Progress
  getProgress(studentId: string, courseId: string): Promise<StudentProgress | undefined>;
  updateProgress(
    studentId: string,
    courseId: string,
    progressPercentage: number
  ): Promise<StudentProgress>;
  getAllStudentProgress(studentId: string): Promise<StudentProgress[]>;

  // Badges
  getBadgesByStudent(studentId: string): Promise<StudentBadge[]>;
  createBadge(badge: Omit<StudentBadge, "id">): Promise<StudentBadge>;

  // Assignments
  getAssignmentsByStudent(studentId: string): Promise<Assignment[]>;
  getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]>;
  createAssignment(assignment: Omit<Assignment, "id">): Promise<Assignment>;

  // Teacher queries
  getStudentsByTeacher(teacherId: string): Promise<(User & { progressPercentage: number })[]>;
  getStudentReports(teacherId: string): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private courses: Map<string, Course> = new Map();
  private exercises: Map<string, Exercise> = new Map();
  private questions: Map<string, Question> = new Map();
  private responses: Map<string, StudentResponse> = new Map();
  private progress: Map<string, StudentProgress> = new Map();
  private badges: Map<string, StudentBadge> = new Map();
  private assignments: Map<string, Assignment> = new Map();

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample users
    const teacherId = randomUUID();
    const studentId = randomUUID();

    const teacher: User = {
      id: teacherId,
      username: "enseignant",
      password: "password123",
      firstName: "Marie",
      lastName: "Dubois",
      role: "teacher",
    };

    const student: User = {
      id: studentId,
      username: "eleve",
      password: "password123",
      firstName: "Jean",
      lastName: "Martin",
      role: "student",
    };

    this.users.set(teacherId, teacher);
    this.users.set(studentId, student);

    // Create sample courses



    // New grammar courses






    // No grammar exercises in this section - they go in the Exercices tab

    // Create exercises for reading texts





    // Add more courses for different text types

    // Orthographe courses
    const orthography1Id = randomUUID();
    const orthography2Id = randomUUID();
    const orthography3Id = randomUUID();
    const orthography4Id = randomUUID();
    const orthography5Id = randomUUID();

    // Conjugaison courses
    const conjugation1Id = randomUUID();
    const conjugation2Id = randomUUID();
    const conjugation3Id = randomUUID();
    const conjugation4Id = randomUUID();
    const conjugation5Id = randomUUID();
    const conjugation6Id = randomUUID();

    // Additional grammar courses
    const grammar6Id = randomUUID();
    const grammar7Id = randomUUID();
    const grammar8Id = randomUUID();
    const grammar9Id = randomUUID();

    // Additional orthography
    const orthography6Id = randomUUID();
    const orthography7Id = randomUUID();

    // Ponctuation courses
    const punctuation1Id = randomUUID();
    const punctuation2Id = randomUUID();
    const punctuation3Id = randomUUID();

    // Additional conjugation
    const conjugation7Id = randomUUID();

    // New grammar courses
    const grammar10Id = randomUUID();

    // New orthography courses
    const orthography8Id = randomUUID();
    const orthography10Id = randomUUID();

    // New conjugation courses
    const conjugation8Id = randomUUID();
    const conjugation9Id = randomUUID();

    // New punctuation courses
    const punctuation4Id = randomUUID();
    const punctuation5Id = randomUUID();

    // New reading courses
    const reading5Id = randomUUID();
    const reading6Id = randomUUID();
    const reading7Id = randomUUID();
    const reading8Id = randomUUID();

    // New writing courses (pratical writing)
    const writing1Id = randomUUID();
    const writing2Id = randomUUID();
    const writing3Id = randomUUID();
    const writing4Id = randomUUID();

    // Additional grammar courses
    const grammar13Id = randomUUID();
    const grammar14Id = randomUUID();
    const grammar15Id = randomUUID();
    const grammar16Id = randomUUID();

    // Additional orthography courses
    const orthography11Id = randomUUID();
    const orthography12Id = randomUUID();
    const orthography13Id = randomUUID();
    const orthography14Id = randomUUID();

    // Additional conjugation courses
    const conjugation10Id = randomUUID();
    const conjugation11Id = randomUUID();
    const conjugation12Id = randomUUID();
    const conjugation13Id = randomUUID();

    // 12 Missing critical courses
    const grammar17Id = randomUUID();
    const grammar18Id = randomUUID();
    const grammar19Id = randomUUID();
    const grammar20Id = randomUUID();
    const grammar21Id = randomUUID();
    const grammar22Id = randomUUID();
    const grammar23Id = randomUUID();
    const orthography15Id = randomUUID();
    const punctuation6Id = randomUUID();
    const punctuation7Id = randomUUID();
    const punctuation8Id = randomUUID();
    const punctuation9Id = randomUUID();

    // 24 Advanced grammar/writing courses
    const grammar24Id = randomUUID();
    const grammar25Id = randomUUID();
    const grammar26Id = randomUUID();
    const grammar27Id = randomUUID();
    const grammar28Id = randomUUID();
    const grammar29Id = randomUUID();
    const grammar30Id = randomUUID();
    const grammar31Id = randomUUID();
    const grammar32Id = randomUUID();
    const grammar33Id = randomUUID();
    const grammar34Id = randomUUID();
    const grammar35Id = randomUUID();
    const reading9Id = randomUUID();
    const reading10Id = randomUUID();
    const writing5Id = randomUUID();
    const writing6Id = randomUUID();
    const orthography16Id = randomUUID();
    const conjugation14Id = randomUUID();
    const punctuation10Id = randomUUID();
    const punctuation11Id = randomUUID();
    const vocabulary1Id = randomUUID();
    const vocabulary2Id = randomUUID();
    const vocabulary3Id = randomUUID();
    const vocabulary4Id = randomUUID();
    
    // Cours Textes Narratifs (pour les 20 histoires de compréhension de lecture)
    const textesNarratifsId = randomUUID();

    // Additional grammar courses
    const grammar13: Course = {
      id: grammar13Id,
      title: "Complément du nom vs Complément du verbe",
      description: "Différencier les deux types de compléments essentiels",
      category: "grammaire",
      content: "<h2>Complément du Nom vs Complément du Verbe - Distinction Cruciale</h2><p>C'est une confusion très courante! Les deux existent mais jouent des rôles très différents.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ CLÉS:</strong><br>Complément du nom = \"de quel nom?\", va après un nom<br>Complément du verbe = répond à des questions du verbe</div><h3>1. COMPLÉMENT DU NOM</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Répond à: DE QUEL NOM? QUEL NOM?</strong><br>\"La maison de Marie\" → \"de Marie\" complément du nom \"maison\"<br>\"Un verre d'eau\" → \"d'eau\" complément du nom \"verre\"<br>\"La table en bois\" → \"en bois\" complément du nom \"table\"</div><h3>2. COMPLÉMENT DU VERBE (COD, COI, etc.)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Répond à: QUOI? QUI? À QUI? DE QUI?</strong><br>\"Je mange une pomme\" → \"une pomme\" COD du verbe \"manger\" (manger quoi?)<br>\"Il parle à Marie\" → \"à Marie\" COI du verbe \"parler\" (parler à qui?)<br>\"Elle pense à toi\" → \"à toi\" COI du verbe \"penser\" (penser à qui?)</div><h3>3. EXEMPLES COMPLETS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"La porte de la maison rouge est fermée\"</strong><br>→ \"de la maison\" = complément du nom \"porte\" (porte de quelle maison?)<br>\"Marie regarde la porte de la maison rouge\"<br>→ \"la porte\" = COD du verbe \"regarde\" (regarde quoi?)</div>",
      order: 46,
    };

    const grammar14: Course = {
      id: grammar14Id,
      title: "Adjectif vs Adverbe",
      description: "Les confondre est une erreur très courante!",
      category: "grammaire",
      content: "<h2>Adjectif vs Adverbe - Ne Plus Confondre!</h2><p>L'adjectif décrit le NOM. L'adverbe modifie le VERBE. C'est la différence clé!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ ASTUCE:</strong><br>Adjectif + nom = accord (rapide, rapide, rapides)<br>Adverbe + verbe = NON accord (rapidement = toujours pareil)</div><h3>1. L'ADJECTIF</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Décrit le NOM, s'accorde avec lui:</strong><br>\"Elle est belle\" (belle = adjectif, accord féminin)<br>\"Il est beau\" (beau = adjectif, accord masculin)<br>\"Une robe rouge\" (rouge = adjectif, accord féminin)<br>\"Des cheveux blonds\" (blonds = adjectif, accord pluriel)</div><h3>2. L'ADVERBE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Modifie le VERBE, INVARIABLE:</strong><br>\"Elle parle rapidement\" (rapidement = adverbe, pas d'accord)<br>\"Il court vite\" (vite = adverbe, pas d'accord)<br>\"Elle mange lentement\" (lentement = adverbe, pas d'accord)<br>\"Ils chantent bien\" (bien = adverbe, pas d'accord)</div><h3>3. FORMATION DE L'ADVERBE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Adjectif au féminin + -ment:</strong><br>Rapide → rapidement, Lent → lentement<br>Heureux → heureusement, Vrai → vraiment<br>Joyeux → joyeusement, Facile → facilement</div>",
      order: 47,
    };

    const grammar15: Course = {
      id: grammar15Id,
      title: "C'est vs Il est",
      description: "Grande différence d'utilisation en français!",
      category: "grammaire",
      content: "<h2>C'est vs Il est - Utilisation Correcte</h2><p>Ces deux expressions sont souvent confondues mais ont des usages précis.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE:</strong><br>C'est = démonstratif + être (cela est)<br>Il est = pronom personnel + être (il est)</div><h3>1. C'EST</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Avec article ou nom:</strong><br>\"C'est un livre\" (article)<br>\"C'est Marie\" (nom propre)<br>\"C'est une bonne idée\" (article + adjectif)<br><strong>Avec adjectif NEUTRE:</strong><br>\"C'est magnifique!\", \"C'est impossible!\"</div><h3>2. IL EST</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Avec adjectif qui s'accorde:</strong><br>\"Il est grand\" (il = masculin, grand s'accorde)<br>\"Elle est grande\" (elle = féminin, grande s'accorde)<br>\"Ils sont grands\" (ils = pluriel, grands s'accorde)<br><strong>Avec profession:</strong><br>\"Il est médecin\", \"Elle est professeur\"</div><h3>3. COMPARAISON</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"C'est un garçon\"</strong> (c'est = identité)<br>\"Il est grand\" (il est = description)<br><strong>\"C'est une robe\"</strong> (c'est = identité)<br>\"Elle est bleue\" (il est = description)</div>",
      order: 48,
    };

    const grammar16: Course = {
      id: grammar16Id,
      title: "Négation et double négation",
      description: "Ne...pas, ne...jamais, ne...plus, ne...rien",
      category: "grammaire",
      content: "<h2>Négation et Double Négation - Nuances Importantes</h2><p>La négation en français peut être simple ou double. Il faut connaître les différentes formes!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ FORMES NÉGATIVES:</strong><br>Ne...pas, ne...jamais, ne...plus, ne...rien, ne...personne</div><h3>1. NÉGATION SIMPLE (NE...PAS)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>La plus courante:</strong><br>\"Je ne vais pas à l'école\" (pas = négation)<br>\"Elle ne parle pas français\" (pas = négation)<br>\"Ils ne jouent pas au football\" (pas = négation)</div><h3>2. AUTRES NÉGATIONS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ne...jamais:</strong> \"Je ne suis jamais allé en France\"<br><strong>Ne...plus:</strong> \"Je ne joue plus au parc\"<br><strong>Ne...rien:</strong> \"Je ne vois rien\"<br><strong>Ne...personne:</strong> \"Je ne vois personne\"</div><h3>3. DOUBLE NÉGATION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Deux négations = affirmation:</strong><br>\"Je ne pense pas qu'il ne viendra pas\" = \"Je pense qu'il viendra\"<br><strong>Pièges:</strong> \"Je ne doute pas que tu es intelligent\" = \"Je suis sûr que tu es intelligent\"</div>",
      order: 49,
    };

    const grammar17: Course = {
      id: grammar17Id,
      title: "Les Déterminants",
      description: "Articles, possessifs, démonstratifs, numéraux - Les mots qui accompagnent les noms",
      category: "grammaire",
      content: "<h2>Les Déterminants - Guides Essentiels du Nom</h2><p>Les déterminants sont des mots qui accompagnent TOUJOURS le nom. Ils précisent de quel nom on parle et en quelle quantité!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE:</strong><br>Déterminant + Nom = obligatoire en français<br>Exemples: UNE maison, LE chat, CE livre, TROIS enfants</div><h3>1. LES ARTICLES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Articles définis:</strong> le, la, les (désignent quelque chose de précis)<br>\"LE chat est noir\" (je connais ce chat)<br><strong>Articles indéfinis:</strong> un, une, des (désignent quelque chose de non-spécifique)<br>\"UN chat est noir\" (un chat quelconque)<br><strong>Articles partitifs:</strong> du, de la, des (pour l'indénombrable)<br>\"Je bois DU lait\" (pas \"Je bois le lait\")</div><h3>2. DÉTERMINANTS POSSESSIFS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Montrent qui possède:</strong> mon, ma, mes, ton, ta, tes, son, sa, ses, notre, nos, votre, vos, leur, leurs<br>\"MON livre\" (c'est mon livre)<br>\"LEURS amis\" (c'est leurs amis)<br>\"SA maison\" (c'est sa maison)</div><h3>3. DÉTERMINANTS DÉMONSTRATIFS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pointent ou indiquent:</strong> ce, cet, cette, ces<br>\"CE livre\" (pointe un livre spécifique)<br>\"CETTE fille\" (pointe une fille spécifique)<br>\"CES enfants\" (pointe plusieurs enfants)</div><h3>4. DÉTERMINANTS NUMÉRAUX</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Indiquent la quantité:</strong> un, deux, trois, quatre, cinq, dix, cent, mille<br>\"TROIS enfants\" (3 enfants)<br>\"DIX pommes\" (10 pommes)<br>\"CENT personnes\" (100 personnes)</div>",
      order: 50,
    };

    const grammar18: Course = {
      id: grammar18Id,
      title: "Les Conjonctions de coordination",
      description: "Et, ou, mais, car, donc, ni, or - Les connecteurs entre idées",
      category: "grammaire",
      content: "<h2>Les Conjonctions de Coordination - Relier les Idées</h2><p>Les conjonctions relient deux mots, deux groupes ou deux phrases de même niveau d'importance. C'est fondamental pour écrire des textes cohérents!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ LES 7 CONJONCTIONS PRINCIPALES:</strong><br>Et, Ou, Mais, Car, Donc, Ni, Or</div><h3>1. ET - L'ADDITION</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajoute deux idées:</strong><br>\"Marie aime les livres ET Jean aime les films.\"<br>\"Je veux du pain ET du beurre.\"<br>\"Il est intelligent ET travailleur.\"</div><h3>2. OU - L'ALTERNATIVE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Donne le choix:</strong><br>\"Tu préfères le thé OU le café?\"<br>\"On peut aller au parc OU à la piscine.\"<br>\"C'est blanc OU noir.\"</div><h3>3. MAIS - L'OPPOSITION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Montre un contraste:</strong><br>\"Il est pauvre MAIS heureux.\"<br>\"Elle voulait sortir MAIS il pleuvait.\"<br>\"C'est facile MAIS il faut pratiquer.\"</div><h3>4. CAR - LA CAUSE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Donne la raison:</strong><br>\"Je suis fatigué CAR j'ai travaillé toute la journée.\"<br>\"Elle n'est pas venue CAR elle était malade.\"<br>\"Je reste à la maison CAR il pleut.\"</div><h3>5. DONC - LA CONSÉQUENCE</h3><div style='background: #fef3c7; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Montre le résultat:</strong><br>\"Il a mangé tout le gâteau DONC il est malade.\"<br>\"Je dois étudier DONC je n'irai pas jouer.\"<br>\"Il pleut DONC on ne sort pas.\"</div>",
      order: 51,
    };

    const grammar19: Course = {
      id: grammar19Id,
      title: "Les Interjections",
      description: "Oh, Ah, Bravo, Zut, Ouch, Hé - Les exclamations expression des émotions",
      category: "grammaire",
      content: "<h2>Les Interjections - Exprimer les Émotions et Réactions</h2><p>Les interjections sont des mots invariables qui expriment une émotion, une sensation, un appel ou une réaction immédiate. Elles sont très utiles pour rendre la langue plus vivante!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ CARACTÉRISTIQUES:</strong><br>Invariables (ne changent jamais)<br>Suivis souvent d'un point d'exclamation (!)<br>Expriment une émotion instantanée</div><h3>1. INTERJECTIONS DE SURPRISE/ADMIRATION</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Oh! Ah! Wow! Ouah!</strong><br>\"OH! Quel beau coucher de soleil!\"<br>\"AH! Je l'ai trouvé!\"<br>\"WOW! C'est incroyable!\"</div><h3>2. INTERJECTIONS DE REGRET/FRUSTRATION</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Zut! Bah! Bof! Pfut!</strong><br>\"ZUT! J'ai perdu mes clés!\"<br>\"BAH! Ce n'est pas grave.\"<br>\"BOF! Ce n'est pas si intéressant.\"</div><h3>3. INTERJECTIONS DE DOULEUR/GÊNE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ouch! Aïe! Ow!</strong><br>\"OUCH! Je me suis fait mal!\"<br>\"AÏE! Le feu est chaud!\"<br>\"OW! Tu m'as marché sur le pied!\"</div><h3>4. INTERJECTIONS D'APPEL/SALUTATION</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Hé! Yo! Salut! Coucou!</strong><br>\"HÉ! Attends-moi!\"<br>\"YO! Ça va?\"<br>\"COUCOU! Tu es là?\"</div>",
      order: 52,
    };

    const grammar20: Course = {
      id: grammar20Id,
      title: "Le groupe du nom (GN)",
      description: "Structure d'un groupe nominal: déterminant, nom, adjectif, complément du nom",
      category: "grammaire",
      content: "<h2>Le Groupe du Nom (GN) - Sa Structure Complète</h2><p>Un groupe du nom est un ensemble de mots qui \"tournent autour\" d'un nom central. Le nom est le NOYAU et d'autres mots l'entourent!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>Déterminant + Nom(noyau) + Adjectif(s) + Complément du nom</div><h3>1. STRUCTURE SIMPLE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Minimum:</strong> Déterminant + Nom<br>\"Un chat\" (le plus simple)<br>\"La maison\" (juste le minimum)<br><strong>Avec adjectif:</strong> Déterminant + Adjectif + Nom + Adjectif<br>\"Un PETIT chat NOIR\" (nom au centre, adjectifs autour)</div><h3>2. AVEC COMPLÉMENT DU NOM</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajoute une information sur le nom:</strong><br>\"La maison DE MARIE\" (complément du nom = \"de Marie\")<br>\"Un enfant DE DIX ANS\" (complément du nom = \"de dix ans\")<br>\"La table EN BOIS\" (complément du nom = \"en bois\")</div><h3>3. EXEMPLE COMPLET</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"LA PETITE maison BLANCHE DE MARIE\"</strong><br>→ LA = déterminant<br>→ PETITE = adjectif (avant le nom)<br>→ maison = NOM (le noyau)<br>→ BLANCHE = adjectif (après le nom)<br>→ DE MARIE = complément du nom</div><h3>4. ACCORDS DANS LE GN</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Tous les mots s'accordent avec le nom:</strong><br>Nom féminin singulier = tous les mots s'accordent aussi<br>\"UNE petite maison blanche\" (tout est féminin singulier)<br>Nom masculin pluriel = tous s'accordent aussi<br>\"DES petits enfants blonds\" (tout est masculin pluriel)</div>",
      order: 53,
    };

    const grammar21: Course = {
      id: grammar21Id,
      title: "Le groupe du verbe (GV)",
      description: "Structure d'un groupe verbal: verbe + compléments du verbe et circonstanciels",
      category: "grammaire",
      content: "<h2>Le Groupe du Verbe (GV) - Sa Structure Complète</h2><p>Un groupe du verbe est construit autour d'un verbe NOYAU. Le verbe peut être accompagné de compléments directs, indirects, et circonstanciels!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>Verbe(noyau) + COD + COI + Compléments circonstanciels</div><h3>1. LE VERBE NOYAU</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Au minimum, juste le verbe:</strong><br>\"Je DORS\" (groupe du verbe = \"dors\")<br>\"Elle COURS\" (groupe du verbe = \"cours\")<br>\"Nous MANGEONS\" (groupe du verbe = \"mangeons\")</div><h3>2. AVEC COMPLÉMENT D'OBJET DIRECT (COD)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Répond à: Quoi? Qui?</strong><br>\"Je MANGE UNE POMME\" (manger = quoi? une pomme)<br>\"Elle AIME SON AMI\" (aime = qui? son ami)<br>\"Il VOIT UN OISEAU\" (voit = quoi? un oiseau)</div><h3>3. AVEC COMPLÉMENT CIRCONSTANCIEL</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Lieu, Temps, Manière:</strong><br>\"Je DORS À LA MAISON\" (où?)<br>\"Elle COURT VITE\" (comment?)<br>\"Il JOUE LE MATIN\" (quand?)</div><h3>4. EXEMPLE COMPLET</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"ELLE MANGE UNE POMME RAPIDEMENT DANS LE PARC CHAQUE JOUR\"</strong><br>→ ELLE = sujet (pas du GV)<br>→ MANGE = verbe noyau<br>→ UNE POMME = COD<br>→ RAPIDEMENT = complément circonstanciel (comment?)<br>→ DANS LE PARC = complément circonstanciel (où?)<br>→ CHAQUE JOUR = complément circonstanciel (quand?)</div>",
      order: 54,
    };

    const grammar22: Course = {
      id: grammar22Id,
      title: "Sujet et Compléments du verbe",
      description: "COD, COI, Compléments circonstanciels (lieu, temps, manière) - Les différentes fonctions",
      category: "grammaire",
      content: "<h2>Sujet et Compléments du Verbe - Les Rôles dans la Phrase</h2><p>Dans une phrase, chaque mot ou groupe a une fonction. Le sujet FAIT l'action. Les compléments du verbe REÇOIVENT ou PRÉCISENT l'action.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>Sujet + Verbe + Complément(s) du verbe</div><h3>1. LE SUJET</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Celui qui FAIT l'action. Répond à: Qui? Quoi?</strong><br>\"JEAN mange une pomme.\" (Jean = sujet)<br>\"LA PLUIE tombe\" (la pluie = sujet)<br>\"LES ENFANTS jouent\" (les enfants = sujet)</div><h3>2. COMPLÉMENT D'OBJET DIRECT (COD)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Reçoit l'action DIRECTEMENT. Répond à: Quoi? Qui?</strong><br>\"Jean MANGE UNE POMME\" (mange = quoi? une pomme = COD)<br>\"Elle AIME MARIE\" (aime = qui? Marie = COD)<br>\"Je VOIS UN OISEAU\" (vois = quoi? un oiseau = COD)</div><h3>3. COMPLÉMENT CIRCONSTANCIEL</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Précise OÙ, QUAND, COMMENT se passe l'action:</strong><br>\"Je joue AU PARC\" (où? = au parc)<br>\"Elle revient LE SOIR\" (quand? = le soir)<br>\"Il MARCHE VITE\" (comment? = vite)</div><h3>4. EXEMPLE COMPLET D'ANALYSE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Jean mange une pomme rouge au parc le matin\"</strong><br>Sujet = Jean<br>Verbe = mange<br>COD = une pomme rouge (manger quoi?)<br>CC de lieu = au parc (où?)<br>CC de temps = le matin (quand?)</div>",
      order: 55,
    };

    const grammar23: Course = {
      id: grammar23Id,
      title: "Types et formes de phrases",
      description: "Déclarative, interrogative, exclamative, impérative - Les quatre types fondamentaux",
      category: "grammaire",
      content: "<h2>Types et Formes de Phrases - Les Quatre Catégories</h2><p>Chaque phrase a un TYPE qui détermine son ton, son but et sa ponctuation. Maîtriser les types est essentiel pour bien communiquer!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ LES 4 TYPES:</strong><br>Déclarative (.),  Interrogative (?), Exclamative (!), Impérative (!)</div><h3>1. LA PHRASE DÉCLARATIVE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Énonce une information. Finit par un POINT (.)</strong><br>\"Je suis heureux.\" (information simple)<br>\"Marie aime les livres.\" (énonce un fait)<br>\"Il pleut aujourd'hui.\" (communique une réalité)</div><h3>2. LA PHRASE INTERROGATIVE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pose une question. Finit par un POINT D'INTERROGATION (?)</strong><br>\"Où allez-vous?\" (cherche une information)<br>\"Quel est ton nom?\" (pose une question)<br>\"Est-ce que tu aimes les films?\" (demande une réponse)</div><h3>3. LA PHRASE EXCLAMATIVE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Exprime une émotion ou une exclamation forte. Finit par un POINT D'EXCLAMATION (!)</strong><br>\"Quel beau jour!\" (exprime l'admiration)<br>\"Je suis tellement heureux!\" (montre l'émotion)<br>\"Attention! Le feu!\" (exprime l'urgence)</div><h3>4. LA PHRASE IMPÉRATIVE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Donne un ordre ou une instruction. Finit par POINT (.) ou POINT D'EXCLAMATION (!)</strong><br>\"Viens ici!\" (ordre)<br>\"Arrête ce bruit.\" (instruction)<br>\"Prends ton sac et va à l'école.\" (comando)</div>",
      order: 56,
    };

    const orthography15: Course = {
      id: orthography15Id,
      title: "Homophones grammaticaux essentiels",
      description: "a/à, et/est, son/sont, ou/où, ce/se, c'/s', on/ont, mes/mais/met/mets",
      category: "orthographe",
      content: "<h2>Homophones Grammaticaux - Les Pièges Courants</h2><p>Les homophones SONNENT PAREILS mais s'écrivent différemment et ont des sens différents. C'est un piège très courant!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE GÉNÉRALE:</strong><br>A = verbe avoir; À = préposition<br>Et = conjonction; Est = verbe être<br>Son = possessif/déterminant; Sont = verbe être</div><h3>1. A vs À</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>A = verbe avoir (il a)</strong> → \"Il A un chat\"<br><strong>À = préposition (indique lieu, temps)</strong> → \"Je vais À l'école\", \"C'est À toi\"<br><strong>Astuce:</strong> Si tu peux remplacer par \"avait\", c'est \"A\"</div><h3>2. ET vs EST</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>ET = conjonction de coordination</strong> → \"Jean ET Marie\"<br><strong>EST = verbe être (3ème personne)</strong> → \"Il EST heureux\"<br><strong>Astuce:</strong> \"ET\" peut être remplacé par \"ou\", \"EST\" par \"était\"</div><h3>3. SON vs SONT</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>SON = déterminant possessif</strong> → \"SON livre\" (le livre de lui)<br><strong>SONT = verbe être (pluriel)</strong> → \"Ils SONT heureux\"<br><strong>Astuce:</strong> \"SONT\" peut être remplacé par \"étaient\"</div><h3>4. OU vs OÙ</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>OU = conjonction de coordination (alternative)</strong> → \"Thé OU café?\"<br><strong>OÙ = adverbe de lieu</strong> → \"OÙ habites-tu?\"<br><strong>Astuce:</strong> \"OÙ\" = question \"où?\", \"OU\" = choix</div>",
      order: 57,
    };

    const punctuation6: Course = {
      id: punctuation6Id,
      title: "Point, Point d'interrogation, Point d'exclamation",
      description: "Les trois signes de ponctuation principaux et leur utilisation correcte",
      category: "ponctuation",
      content: "<h2>Point, ?, ! - Les Trois Signes Fondamentaux</h2><p>Ces trois signes terminent les phrases. Chacun a une fonction précise et change le sens de la phrase!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES:</strong><br>Toute phrase se termine par l'un de ces trois<br>Ils ne se mélangent jamais<br>Un seul à la fois</div><h3>1. LE POINT (.)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Termine une phrase DÉCLARATIVE (information):</strong><br>\"Je suis heureux.\"<br>\"Elle habite à Paris.\"<br>\"Le soleil brille aujourd'hui.\"<br><strong>Après les points:</strong> On commence une nouvelle phrase avec MAJUSCULE</div><h3>2. LE POINT D'INTERROGATION (?)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Termine une phrase INTERROGATIVE (question):</strong><br>\"Quel est ton nom?\"<br>\"Où allez-vous?\"<br>\"Est-ce que tu aimes les films?\"<br><strong>Règle importante:</strong> PAS d'espace avant le ? en français (contrairement à d'autres langues)</div><h3>3. LE POINT D'EXCLAMATION (!)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Termine une phrase EXCLAMATIVE ou IMPÉRATIVE:</strong><br>\"Quel beau jour!\" (exclamation)<br>\"Viens ici tout de suite!\" (ordre)<br>\"C'est incroyable!\" (émotion)  <br><strong>Exprrime:</strong> Joie, peur, surprise, ordre, urgence</div><h3>4. COMPARAISON</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Même phrase, ponctuation différente, sens différent:</strong><br>\"Tu viens à ma fête.\" (affirmation)<br>\"Tu viens à ma fête?\" (question)<br>\"Tu viens à ma fête!\" (ordre ou joie)</div>",
      order: 58,
    };

    const punctuation7: Course = {
      id: punctuation7Id,
      title: "La virgule - Utilisation correcte",
      description: "Quand utiliser la virgule? Énumération, insertion, complément circonstanciel",
      category: "ponctuation",
      content: "<h2>La Virgule - Le Signe de Séparation</h2><p>La virgule sépare des éléments SANS COUPER la phrase. Elle offre une pause courte mais importante dans la lecture!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ FONCTION PRINCIPALE:</strong><br>Sépare des éléments sans couper la phrase<br>Permet une énumération<br>Encadre une insertion</div><h3>1. LA VIRGULE POUR ÉNUMÉRER</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Sépare les éléments d'une liste:</strong><br>\"Je veux du pain, du beurre, du miel et du fromage.\"<br>\"Les enfants, les adultes, les personnes âgées peuvent venir.\"<br>\"Elle aime lire, écrire, dessiner et danser.\"</div><h3>2. LA VIRGULE POUR INSÉRER</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Encadre une information insérée dans la phrase:</strong><br>\"Marie, ma meilleure amie, habite à côté.\"<br>\"Les oiseaux, ces créatures magnifiques, chantent.\"<br>\"Jean, qui est heureux, danse.\"</div><h3>3. LA VIRGULE ET LE COMPLÉMENT CIRCONSTANCIEL</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Quand il vient AVANT le verbe, on ajoute une virgule:</strong><br>\"DEMAIN, je vais à l'école.\" (virgule optionnelle)<br>\"AU PARC, les enfants jouent.\" (virgule recommandée)<br>\"RAPIDEMENT, il a fini ses devoirs.\" (virgule utile)</div><h3>4. ERREUR À ÉVITER</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>JAMAIS de virgule avant \"et\" dans une énumération simple:</strong><br>Mauvais: \"Je veux du pain, du beurre, et du fromage,\"<br>Bon: \"Je veux du pain, du beurre et du fromage.\"</div>",
      order: 59,
    };

    const punctuation8: Course = {
      id: punctuation8Id,
      title: "Deux-points et tirets - Dialogue et énumération",
      description: "Utilisation du deux-points et du tiret pour le dialogue et les listes",
      category: "ponctuation",
      content: "<h2>Deux-Points et Tirets - Dialogue et Énumération</h2><p>Ces deux signes introduisent des éléments ou indiquent un changement de personne. Essentiels pour écrire un dialogue en français!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ DEUX-POINTS (:)  = Introduction</strong><br><strong>TIRET (—) = Changement de personne dans dialogue</strong></div><h3>1. LE DEUX-POINTS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Introduit une énumération:</strong><br>\"Les fruits sont: pommes, oranges, bananes.\"<br>\"Voici mes hobbies: lecture, musique, sport.\"<br><strong>Introduit une explication ou un exemple:</strong><br>\"Je ne viens pas: je suis malade.\"<br>\"Voici le problème: tu ne travailles pas assez.\"</div><h3>2. LE TIRET (—) DANS LE DIALOGUE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Marque le changement de personne:</strong><br>\"— Bonjour Marie, comment vas-tu?<br>— Très bien, merci! Et toi?<br>— Je vais bien aussi.\"<br><strong>Chaque tiret = nouvelle personne qui parle</strong></div><h3>3. LE TIRET AVEC VERBE DE PAROLE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajoute qui parle:</strong><br>\"— Je suis malade, dit Jean.\"<br>\"— Pourquoi? demanda-t-elle.\"<br>\"— Parce que j'ai trop travaillé, répondit-il.\"</div><h3>4. EXEMPLE COMPLET</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Voici ce que tu dois acheter: — Du pain — Du beurre — Du lait — Des œufs\"</strong><br>Ou en dialogue:<br>\"— Veux-tu du café? demanda la mère.<br>— Non, merci. Je préfère du thé, répondit la fille.\"</div>",
      order: 60,
    };

    const punctuation9: Course = {
      id: punctuation9Id,
      title: "Guillemets - Encadrer les dialogues et citations",
      description: "Utilisation correcte des guillemets français pour dialogues et citations",
      category: "ponctuation",
      content: "<h2>Guillemets - Encadrer les Paroles</h2><p>Les guillemets encadrent exactement ce que quelqu'un dit ou écrit. C'est le signe qui \"montre\" une citation ou une parole!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ TYPES DE GUILLEMETS:</strong><br>Guillemets français: « et »<br>Guillemets anglais: \" et \"<br>Guillemets simples: ' et '</div><h3>1. GUILLEMETS FRANÇAIS (CORRECTS)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Avec espaces:</strong> « et »<br>\"Marie a dit: « Je suis heureuse. »\"<br>\"L'auteur écrit: « La vie est belle. »\"<br>\"Elle cria: « Au secours! »\"</div><h3>2. GUILLEMETS DANS LE DIALOGUE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Méthode 1: Avec guillemets</strong><br>\"Jean a dit: « Je viens demain. »\"<br><strong>Méthode 2: Avec tirets (préférée en français)</strong><br>\"— Je viens demain, dit Jean.\"<br>La méthode 2 est plus courante en français littéraire</div><h3>3. GUILLEMETS POUR CITATION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Reproduire les paroles exactes d'un auteur:</strong><br>\"Montaigne écrit: « Que sais-je? »\"<br>\"Descartes a dit: « Je pense, donc je suis. »\"<br>\"La déclaration affirme: « Tous les hommes sont égaux. »\"</div><h3>4. PONCTUATION AUTOUR DES GUILLEMETS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Virgule/Point/Point d'interrogation AVANT le guillemet fermant:</strong><br>\"Il a demandé: « Où vas-tu? »\" (le ? va avant »)<br>\"Elle dit: « Je suis malade. »\" (le . va avant »)<br>\"Marie cria: « Attention! »\" (le ! va avant »)</div>",
      order: 61,
    };

    const grammar24: Course = {
      id: grammar24Id,
      title: "Les substituts",
      description: "Pronominaux, nominaux, lexicaux et textuels pour éviter les répétitions",
      category: "grammaire",
      content: "<h2>Les Substituts - Remplacer pour Mieux Écrire</h2><p>Les substituts permettent d'éviter les répétitions et améliorent la cohésion textuelle. C'est très important en lecture et écriture!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 4 TYPES DE SUBSTITUTS:</strong><br>Pronominaux: il, elle, ceux<br>Nominaux: articles, démonstratifs<br>Lexicaux: synonymes<br>Textuels: ce dernier, celui-ci</div><h3>1. SUBSTITUTS PRONOMINAUX</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Remplacent un nom par un pronom:</strong><br>\"Maxime a trouvé un chat. Il l'a adopté.\" (il remplace Maxime)<br>\"Les filles arrivaient. Elles étaient en retard.\" (elles remplace les filles)</div><h3>2. SUBSTITUTS NOMINAUX</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Utilisent articles ou démonstratifs:</strong><br>\"Cet objet était magnifique. L'objet brillait.\" (l'objet remplace cet objet)<br>\"La maison était grande. Cette maison était vieille.\" (cette maison remplace la maison)</div><h3>3. SUBSTITUTS LEXICAUX</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Synonymes pour éviter répétition:</strong><br>\"Le professeur entra. L'enseignant était fâché.\" (enseignant remplace professeur)<br>\"Elle aime les fleurs. Les plantes sont belles.\" (plantes remplace fleurs)</div><h3>4. SUBSTITUTS TEXTUELS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ce dernier, celui-ci, celle-là:</strong><br>\"Marie et Jean entrèrent. Ce dernier était souriant.\" (ce dernier remplace Jean)<br>\"Les deux livres étaient différents. Celui-ci était plus intéressant.\" (celui-ci remplace un des livres)</div>",
      order: 62,
    };

    const grammar25: Course = {
      id: grammar25Id,
      title: "Les marqueurs de relation",
      description: "Connecteurs logiques essentiels en production écrite",
      category: "grammaire",
      content: "<h2>Les Marqueurs de Relation - Connecteurs Logiques</h2><p>Les marqueurs relient les phrases et les idées. Essentiels pour une écriture cohérente!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 6 CATÉGORIES:</strong><br>Ajouter, Contraster, Expliquer, Illustrer, Résumer, Marquer le temps</div><h3>1. AJOUTER DES IDÉES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>aussi, de plus, ensuite, finalement, puis:</strong><br>\"Elle était intelligente. De plus, elle était sympathique.\"<br>\"D'abord étudier. Ensuite, prendre une pause. Finalement, s'amuser.\"</div><h3>2. CONTRASTER DES IDÉES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>mais, cependant, pourtant, en revanche:</strong><br>\"Il pleuvait, mais les enfants jouaient dehors.\"<br>\"Elle était timide. Cependant, elle parlait bien en classe.\"</div><h3>3. EXPLIQUER</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>parce que, car, donc, c'est pourquoi:</strong><br>\"Il était absent parce qu'il était malade.\"<br>\"Elle travaillait dur. Donc, elle réussit.\"</div><h3>4. ILLUSTRER</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>par exemple, entre autres, notamment:</strong><br>\"Les fruits sont sains. Par exemple, les pommes.\"<br>\"Certains animaux sont dangereux. Entre autres, les serpents.\"</div><h3>5. RÉSUMER</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>bref, en conclusion, en résumé, finalement:</strong><br>\"Bref, c'était une belle journée.\"<br>\"En résumé, il faut étudier régulièrement.\"</div><h3>6. MARQUEURS TEMPORELS</h3><div style='background: #e6f2ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>d'abord, puis, après, alors, ensuite:</strong><br>\"D'abord elle se réveilla. Puis elle petit-déjeuna. Ensuite elle partit à l'école.\"</div>",
      order: 63,
    };

    const grammar26: Course = {
      id: grammar26Id,
      title: "La cohésion et cohérence textuelle",
      description: "Ordre logique, enchaînement d'idées, continuité du sujet",
      category: "grammaire",
      content: "<h2>Cohésion et Cohérence Textuelle</h2><p>Un bon texte TIENT ENSEMBLE. Idées en ordre logique, enchaînement fluide, continuité du sujet.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 5 ÉLÉMENTS CLÉS:</strong><br>Ordre logique, Enchaînement d'idées, Continuité, Substituts, Connecteurs, Pas de contradictions</div><h3>1. ORDRE LOGIQUE DES PHRASES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Les idées doivent s'enchaîner logiquement:</strong><br>1. Qu'est-ce qu'on raconte?<br>2. Comment? Pourquoi?<br>3. Conclusion ou conséquence<br>\"Le chat était affamé. Il chercha de la nourriture. Il trouva une souris.\" ✓ Logique!</div><h3>2. ENCHAÎNEMENT FLUIDE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Utilisez des connecteurs:</strong><br>\"Elle était fatiguée. Par conséquent, elle alla dormir.\"<br>\"D'abord il étudia. Ensuite il joua.\"<br>\"Il pleuvait. Cependant, les enfants sortirent.\"</div><h3>3. CONTINUITÉ DU SUJET</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le sujet principal doit rester clair:</strong><br>\"Marie aime les livres. Elle en lit chaque jour. Ils lui permettent de voyager.\"<br>→ Sujet: Marie et les livres. Pas de changement abrupt!</div><h3>4. UTILISER LES SUBSTITUTS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Évitez la répétition:</strong><br>\"Le directeur entra. Le directeur était fâché. Le directeur ordonna le silence.\" ✗ Mauvais<br>\"Le directeur entra. Il était fâché. Ce dernier ordonna le silence.\" ✓ Bon</div><h3>5. PAS DE CONTRADICTIONS</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Les idées ne doivent pas se contredire:</strong><br>\"Il faisait beau. Le soleil brillait. Il pleuvait sans arrêt.\" ✗ Contradiction<br>\"Il faisait beau. Le soleil brillait. Quelques nuages passaient.\" ✓ Cohérent</div><h3>6. TEMPS DU RÉCIT</h3><div style='background: #e6f2ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Conservez le même temps:</strong><br>\"Elle entra et elle cherche son livre.\" ✗ Mélange passé/présent<br>\"Elle entra et elle chercha son livre.\" ✓ Tout au passé</div>",
      order: 64,
    };

    const vocabulary1: Course = {
      id: vocabulary1Id,
      title: "Le vocabulaire et champs lexicaux",
      description: "Mots d'un même domaine, niveaux de langue, synonymes et antonymes",
      category: "vocabulaire",
      content: "<h2>Vocabulaire et Champs Lexicaux</h2><p>Un champ lexical regroupe les mots d'un même thème. C'est très utile pour enrichir ses textes!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ DÉFINITION:</strong><br>Champ lexical = ensemble de mots reliés au même thème<br>Exemple: École → étudiant, professeur, classe, leçon</div><h3>1. MOTS DU MÊME DOMAINE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Champ lexical de la NATURE:</strong><br>Arbre, feuille, branche, forêt, bois, fleur, herbe<br><strong>Champ lexical de la CUISINE:</strong><br>Recette, cuisiner, ingrédient, four, cuillère, salade, déjeuner</div><h3>2. NIVEAU DE LANGUE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Familier:</strong> \"C'est cool!\" \"J'ai trop faim!\" \"T'es malade?\"<br><strong>Standard:</strong> \"C'est intéressant.\" \"J'ai très faim.\" \"Tu es malade?\"<br><strong>Formel:</strong> \"C'est remarquable.\" \"J'ai une forte faim.\" \"Êtes-vous souffrant?\"</div><h3>3. SYNONYMES (MÊME SENS)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Beau = magnifique, splendide, sublime</strong><br>\"La vue était belle.\" = \"La vue était magnifique.\"<br>Bon = excellent, superbe, merveilleux, formidable</div><h3>4. ANTONYMES (SENS OPPOSÉ)</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Beau ≠ Laid</strong><br>Grand ≠ Petit<br>Heureux ≠ Malheureux<br>Jour ≠ Nuit</div><h3>5. MOTS DE LA MÊME FAMILLE (DÉRIVATION)</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Famille de \"jouer\":</strong> joue, joueur, jeu, jouet<br><strong>Famille de \"créer\":</strong> crée, créateur, création, créatif<br><strong>Ajouter des préfixes/suffixes:</strong> im+possible, heureus+ement</div>",
      order: 65,
    };

    const grammar27: Course = {
      id: grammar27Id,
      title: "Les phrases transformées",
      description: "Transformations affirmative/négative, active/passive, neutre/emphatique",
      category: "grammaire",
      content: "<h2>Phrases Transformées - Changements de Sens</h2><p>On peut transformer une phrase SANS changer le sens principal. Utile pour varier son écriture!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 TYPES DE TRANSFORMATION:</strong><br>Affirmative ↔ Négative<br>Active ↔ Passive<br>Neutre ↔ Emphatique</div><h3>1. AFFIRMATIVE → NÉGATIVE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajouter ne...pas:</strong><br>\"Je viens.\" → \"Je ne viens pas.\"<br>\"Elle aime les mathématiques.\" → \"Elle n'aime pas les mathématiques.\"<br><strong>Autres formes:</strong> ne...jamais, ne...plus, ne...rien</div><h3>2. NEUTRE → EMPHATIQUE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Mettre l'accent sur un élément:</strong><br>\"Neutre: C'est Marie qui a parlé.\"<br>\"Emphatique: C'est MARIE qui a parlé! (pas quelqu'un d'autre)\"<br>\"Marie EST venue! (insistance)\"</div><h3>3. ACTIVE → PASSIVE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Inverser sujet et complément (fin du primaire):</strong><br>\"Le professeur enseigne les mathématiques.\" (active)<br>→ \"Les mathématiques sont enseignées par le professeur.\" (passive)<br>\"La fille regarde le garçon.\" (active)<br>→ \"Le garçon est regardé par la fille.\" (passive)</div><h3>4. AJOUTER/RETIRER COMPLÉMENTS DE PHRASE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajouter:</strong> \"Elle étudie.\" → \"Elle étudie le soir, dans sa chambre, avec passion.\"<br><strong>Retirer:</strong> \"Elle étudie le soir, sérieusement, pour réussir.\" → \"Elle étudie.\"</div>",
      order: 66,
    };

    const punctuation10: Course = {
      id: punctuation10Id,
      title: "La ponctuation avancée",
      description: "Deux-points, parenthèses, crochets et tirets - utilisation avancée",
      category: "ponctuation",
      content: "<h2>Ponctuation Avancée - Utilisation Approfondie</h2><p>Ces signes permettent d'organiser et de clarifier les idées complexes!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 4 SIGNES AVANCÉS:</strong><br>Deux-points (:), Parenthèses, Crochets, Tirets (—)</div><h3>1. LE DEUX-POINTS POUR ÉNUMÉRER</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Introduit une liste:</strong><br>\"Voici les éléments: 1) chaleur, 2) humidité, 3) pression.\"<br>\"Trois options: travailler, étudier, ou se reposer.\"</div><h3>2. LES PARENTHÈSES ( )</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajoute une information secondaire:</strong><br>\"Le professeur (M. Dupont) expliqua la leçon.\"<br>\"Elle arriva tard (à cause de la pluie) mais heureuse.\"</div><h3>3. LES CROCHETS [ ]</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Signale une modification ou ajout dans une citation:</strong><br>\"Il a dit: 'Je suis venu [avec ma famille] hier.'\"<br>\"'[L]e jour était magnifique.' [Elle ajout a la majuscule]\"</div><h3>4. LE TIRET (—) POUR CHANGEMENT</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Marque un changement ou une pause:</strong><br>\"Il regarda — un instant — le paysage.\"<br>\"— Bonjour! cria-t-elle.\"<br>\"Les trois éléments — chaleur, humidité, pression — sont importants.\"</div>",
      order: 67,
    };

    const reading9: Course = {
      id: reading9Id,
      title: "Les types de textes",
      description: "Descriptif, narratif, informatif, explicatif, injonctif, dialogue",
      category: "lecture_reading",
      content: "<h2>Les Types de Textes - Reconnaître et Analyser</h2><p>Chaque type de texte a sa fonction et ses caractéristiques! C'est utile pour lire ET écrire.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 7 TYPES PRINCIPAUX</strong></div><h3>1. TEXTE DESCRIPTIF</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Décrit une personne, un objet, un lieu:</strong><br>\"La maison était grande, avec des murs blancs et un toit rouge. Elle avait trois fenêtres et une porte bleue.\"<br>Temps utilisé: présent, imparfait</div><h3>2. TEXTE NARRATIF</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Raconte une histoire avec début, milieu, fin:</strong><br>\"Situation initiale → Élément perturbateur → Développement → Climax → Résolution\"<br>Temps utilisé: passé composé, imparfait</div><h3>3. TEXTE INFORMATIF</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Donne des informations factuelles:</strong><br>\"Paris est la capitale de la France. Elle compte 2 millions d'habitants. La Seine la traverse.\"<br>Temps utilisé: présent</div><h3>4. TEXTE EXPLICATIF</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Explique COMMENT ou POURQUOI:</strong><br>\"Pour faire un gâteau, d'abord mélanger les ingrédients. Ensuite verser dans le moule. Finalement cuire 30 minutes.\"<br>Temps utilisé: infinitif, impératif, présent</div><h3>5. TEXTE INJONCTIF</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Donne des ordres ou des consignes:</strong><br>\"Lave-toi les mains! Prends une assiette. Serve-toi du repas.\"<br>Temps utilisé: impératif</div><h3>6. DIALOGUE</h3><div style='background: #e6f2ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Échange entre deux ou plusieurs personnes:</strong><br>\"— Bonjour! Comment vas-tu?<br>— Très bien, et toi?\"</div><h3>7. PUBLICITAIRE</h3><div style='background: #fffacd; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Persuade d'acheter ou de faire quelque chose:</strong><br>\"Achetez ce produit! C'est magique et pas cher!\"<br>Utilise: impératif, superlatifs, exclamations</div>",
      order: 68,
    };

    const grammar28: Course = {
      id: grammar28Id,
      title: "Phrases à structure particulière",
      description: "Impersonnelles, sans GN sujet, elliptiques",
      category: "grammaire",
      content: "<h2>Phrases à Structure Particulière</h2><p>Toutes les phrases n'ont pas une structure sujet + verbe + complément!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 STRUCTURES PARTICULIÈRES</strong></div><h3>1. PHRASES IMPERSONNELLES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Sujet: \"il\" qui ne représente rien:</strong><br>\"Il pleut.\" (pas de personne qui pleut)<br>\"Il faut étudier.\" (nécessité)<br>\"Il existe plusieurs solutions.\" (il = sujet apparent)<br><strong>Caractéristique:</strong> Pas d'agent réel, exprime des phénomènes ou nécessités</div><h3>2. PHRASES SANS GN SUJET EXPLICITE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>L'impératif n'a pas de sujet explicite:</strong><br>\"Viens ici!\" (sous-entendu: toi)<br>\"Prenez un livre!\" (sous-entendu: vous)<br>\"Soyons heureux!\" (sous-entendu: nous)<br><strong>Caractéristique:</strong> Le sujet est implicite, dans la conjugaison</div><h3>3. PHRASES ELLIPTIQUES</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Certaines parties manquent (volontairement):</strong><br>\"Qui veut un gâteau? Moi!\" (moi = ellipse, manque le verbe)<br>\"Publicité: 'Jouets pas chers! Livraison gratuite!'\"<br>\"Notes: 'Excellent travail. À continuer.'\"<br><strong>Utilisation:</strong> Publicités, consignes, notes, style télégraphique</div>",
      order: 69,
    };

    const grammar29: Course = {
      id: grammar29Id,
      title: "La négation (nouvelle grammaire)",
      description: "Encadrement ne...pas et variantes (jamais, plus, rien)",
      category: "grammaire",
      content: "<h2>La Négation - Nouvelle Grammaire</h2><p>La négation encadre le verbe et parfois le groupe du verbe!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ ENCADREMENT:</strong><br>ne ... pas (l'encadrement classique)<br>ne ... jamais, ne ... plus, ne ... rien (variantes)</div><h3>1. ENCADREMENT NE...PAS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Position dans la GV (groupe du verbe):</strong><br>\"Je ne viens pas.\" (ne avant le verbe, pas après)<br>\"Elle ne parle pas aux enfants.\" (pas encadre le GV)<br>\"Nous ne sommes pas heureux.\" (pas avec l'adjectif)<br><strong>Simplification orale:</strong> \"Je viens pas\" (le \"ne\" disparaît)</div><h3>2. VARIANTES: NE...JAMAIS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Jamais = aucune fois:</strong><br>\"Il ne boit jamais de café.\" (aucune fois il ne boit)<br>\"Elle n'a jamais vu la mer.\" (aucune fois elle n'a vu)<br>\"Tu n'iras jamais à la plage?\" (interrogation négative)</div><h3>3. VARIANTES: NE...PLUS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Plus = arrêt d'une action:</strong><br>\"Je ne fume plus.\" (j'ai arrêté)<br>\"Elle n'habite plus ici.\" (elle a déménagé)<br>\"Les enfants ne jouent plus dehors.\" (changement de situation)</div><h3>4. VARIANTES: NE...RIEN</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Rien = aucune chose:</strong><br>\"Je ne mange rien.\" (aucune chose)<br>\"Tu ne dis rien.\" (aucune parole)<br>\"Elles n'ont rien trouvé.\" (aucun objet)</div><h3>5. EXCEPTIONS ORALES</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>À l'oral, le \"ne\" disparaît souvent:</strong><br>\"Je suis pas là.\" (au lieu de \"ne suis pas\")<br>\"Elle regarde jamais.\" (au lieu de \"ne regarde jamais\")<br><strong>À l'écrit: toujours mettre le \"ne\"!</strong></div>",
      order: 70,
    };

    const grammar30: Course = {
      id: grammar30Id,
      title: "Les adverbes (plus complet)",
      description: "Manière, temps, lieu, opinion - formation et utilisation",
      category: "grammaire",
      content: "<h2>Les Adverbes - Cours Complet</h2><p>Les adverbes modifient le verbe, l'adjectif ou d'autres adverbes. Ils sont INVARIABLES!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 4 CATÉGORIES PRINCIPALES</strong></div><h3>1. ADVERBES DE MANIÈRE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Comment? Formation: adjectif féminin + -ment</strong><br>Rapide → rapidement, Lent → lentement<br>\"Elle parle rapidement.\" (parler comment?)<br>\"Il court lentement.\" (courir comment?)<br>\"Elle écrit bien.\" \"Il travaille mal.\"</div><h3>2. ADVERBES DE TEMPS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Quand?</strong><br>Aujourd'hui, hier, demain, maintenant, bientôt<br>\"Elle arrive aujourd'hui.\" (quand?)<br>\"Tu partiras demain.\" (quand?)<br>\"Nous mangeons maintenant.\" (quand?)</div><h3>3. ADVERBES DE LIEU</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Où?</strong><br>Ici, là, là-bas, partout, ailleurs<br>\"Je suis ici.\" (où?)<br>\"Il va là-bas.\" (où?)<br>\"Regarde partout!\" (où?)</div><h3>4. ADVERBES D'OPINION</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Probablement, peut-être, sans doute</strong><br>\"Il va probablement venir.\" (probabilité)<br>\"Tu reviendras peut-être.\" (incertitude)<br>\"Sans doute aura-t-il raison.\" (probabilité)</div><h3>5. FORMATION DE L'ADVERBE</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Règle: Adjectif au FÉMININ + -ment</strong><br>Courageux → courageuse → courageusement<br>Heureux → heureuse → heureusement<br>Exceptions: vrai → vraiment, bon → bien</div>",
      order: 71,
    };

    const conjugation14: Course = {
      id: conjugation14Id,
      title: "Les verbes et la valeur des temps",
      description: "Valeur du présent, imparfait, futur, temps simples vs composés",
      category: "conjugaison",
      content: "<h2>Valeur des Temps - Au-delà de la Conjugaison</h2><p>Un même temps peut avoir plusieurs sens selon le contexte!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 5 CATÉGORIES DE TEMPS</strong></div><h3>1. VALEUR DU PRÉSENT</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Description (ce qui est):</strong> \"L'eau est froide.\"<br><strong>Vérité générale:</strong> \"Les oiseaux volent.\"<br><strong>Narration vivante:</strong> \"Elle entre dans la classe. Elle s'assoit. Elle étudie.\"<br><strong>Action en cours:</strong> \"En ce moment, tu lis.\"</div><h3>2. VALEUR DE L'IMPARFAIT</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Habitude passée:</strong> \"Je jouais dehors chaque jour.\"<br><strong>Description passée:</strong> \"C'était un beau jour. Les oiseaux chantaient.\"<br><strong>Action longue interrompue:</strong> \"Je lisais quand tu as appelé.\"</div><h3>3. VALEUR DU FUTUR</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Prédiction:</strong> \"Il pleuvra demain.\"<br><strong>Intention:</strong> \"Je te donnerai un cadeau.\"<br><strong>Promesse:</strong> \"Je ne te quitterai jamais.\"<br><strong>Ordre atténué:</strong> \"Tu feras tes devoirs.\" (ordre moins brutal)</div><h3>4. TEMPS SIMPLES VS COMPOSÉS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Simple = action en cours:</strong> \"Je mangeais quand...\" (action longue)<br><strong>Composé = action terminée:</strong> \"J'ai mangé avant de partir.\" (action finie)<br>\"Elle lisait\" (imparfait, longue durée)<br>\"Elle a lu\" (passé composé, action finie)</div><h3>5. ASPECT</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Durée:</strong> \"Je travaillais\" (longtemps)<br><strong>Répétition:</strong> \"Je travaille chaque jour\" (régulier)<br><strong>Habitude:</strong> \"Je travaillais toujours à 9h\" (avant, régulièrement)</div>",
      order: 72,
    };

    const orthography16: Course = {
      id: orthography16Id,
      title: "Les homophones avancés",
      description: "leur/leurs, tout/tous, quel/quelle, infinitif/participe passé",
      category: "orthographe",
      content: "<h2>Homophones Avancés - Distinctions Cruciales</h2><p>Ces mots se prononcent pareil mais s'écrivent différemment et ont des sens différents!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 5 DISTINCTIONS IMPORTANTES</strong></div><h3>1. LEUR vs LEURS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Leur (singulier):</strong> \"Je leur parle\" (à une ou plusieurs personnes, mais un objet chacun)<br><strong>Leurs (pluriel):</strong> \"J'ai vu leurs maisons\" (plusieurs objets, plusieurs personnes)<br>Astuce: essayer de remplacer par \"mon/mes\": \"Je lui parle\" → \"Je leur parle\"</div><h3>2. TOUT vs TOUS vs TOUTE vs TOUTES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Tout (masculin singulier):</strong> \"Tout est possible.\"<br><strong>Tous (masculin pluriel):</strong> \"Tous les enfants sont venus.\" \"Ils sont tous venus.\"<br><strong>Toute (féminin singulier):</strong> \"Toute la classe était contente.\"<br><strong>Toutes (féminin pluriel):</strong> \"Toutes les filles chantaient.\"</div><h3>3. QUEL vs QUELLE vs QUELS vs QUELLES</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Quel (interrogatif, masc. sing.):</strong> \"Quel livre lis-tu?\"<br><strong>Quelle (interrogatif, fém. sing.):</strong> \"Quelle est ta couleur?\"<br><strong>Quels (interrogatif, masc. plur.):</strong> \"Quels jeux aimes-tu?\"<br><strong>Quelles (interrogatif, fém. plur.):</strong> \"Quelles filles chantent?\"</div><h3>4. INFINITIF vs PARTICIPE PASSÉ (-ER vs -É)</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Infinitif (-ER):</strong> \"Je veux manger.\" \"Aller étudier.\" (peut remplacer par un autre verbe: \"Je veux partir\")<br><strong>Participe passé (-É):</strong> \"J'ai mangé.\" \"Mangé hier.\" (avec avoir/être, ou adjectif)<br>Astuce: \"Je veux manger\" vs \"J'ai mangé\" ≠ \"J'ai aller\"!</div><h3>5. ACCENT SUR \"LÀ\" vs \"LA\"</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Là (avec accent = lieu):</strong> \"Je vais là.\" \"Là-bas.\" \"Attention, regardez là!\"<br><strong>La (sans accent = article):</strong> \"La maison est belle.\" \"Je vois la fille.\"</div>",
      order: 73,
    };

    const grammar31: Course = {
      id: grammar31Id,
      title: "Le groupe infinitif",
      description: "Reconnaître l'infinitif, groupe infinitif comme CP ou complément du verbe",
      category: "grammaire",
      content: "<h2>Le Groupe Infinitif - Structure Complexe</h2><p>L'infinitif peut jouer plusieurs rôles dans la phrase!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 STRUCTURES AVEC INFINITIF</strong></div><h3>1. RECONNAÎTRE L'INFINITIF</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Verbe à l'infinitif = forme de base:</strong><br>Manger, courir, dormir, aller, être<br>Terminaisons: -er, -ir, -oir, -ure<br>\"Je veux manger une pomme.\" (manger = infinitif)<br>\"Elle aime lire des livres.\" (lire = infinitif)</div><h3>2. GROUPE INFINITIF COMME COMPLÉMENT DU VERBE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le groupe infinitif complète le verbe conjugué:</strong><br>\"Je veux manger une pomme.\" (veux manger = le groupe complète)<br>GV: veux manger + CP: une pomme<br>\"Elle commence à parler français.\" (commence à parler = groupe)<br>\"Tu peux sortir demain.\" (peux sortir = groupe)</div><h3>3. GROUPE INFINITIF COMME COMPLÉMENT DE PHRASE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>L'infinitif peut être CP (lieu, temps, raison, etc.):</strong><br>\"Pour réussir, tu dois étudier.\" (pour réussir = CP raison)<br>\"En mangeant, il a parlé.\" (en mangeant = CP temps/manière)<br>\"Avant de partir, ferme la porte.\" (avant de partir = CP temps)</div><h3>4. VERBES SUIVIS D'UN INFINITIF</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Certains verbes demandent un infinitif:</strong><br>Aimer, vouloir, pouvoir, devoir, penser, croire<br>\"Je veux manger.\" \"Elle peut courir.\" \"Tu dois étudier.\" \"Nous pensons partir.\"<br>\"Ils aiment danser.\" \"On peut essayer.\"</div>",
      order: 74,
    };

    const grammar32: Course = {
      id: grammar32Id,
      title: "Les séquences syntaxiques",
      description: "Sujet → action → objet; sujet → état → attribut; décrire une image",
      category: "grammaire",
      content: "<h2>Séquences Syntaxiques - Structure de Base</h2><p>Chaque phrase suit une séquence logique! Comprendre ces séquences aide à écrire des phrases correctes.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 SÉQUENCES PRINCIPALES</strong></div><h3>1. SUJET → ACTION → OBJET (Transitive)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>GS + GV + CP:</strong><br>\"Marie (sujet) mange (action) une pomme (objet).\"<br>\"Les enfants (sujet) jouent (action) au football (objet).\"<br>\"Le chat (sujet) attrape (action) la souris (objet).\"<br>Question: Qui? Quoi faire? À quoi/qui?</div><h3>2. SUJET → ÉTAT → ATTRIBUT (être + descriptif)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>GS + être + attribut:</strong><br>\"Marie (sujet) est (état) heureuse (description).\"<br>\"Les fleurs (sujet) sont (état) rouges (description).\"<br>\"Le professeur (sujet) est (état) fatigué (description).\"<br>Question: Qui? Comment est? (pas une action, un état)</div><h3>3. SUJET → ACTION → LIEU/TEMPS (Intransitive)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>GS + GV + CP:</strong><br>\"Je (sujet) vais (action) à l'école (lieu).\"<br>\"Elle (sujet) court (action) demain (temps).\"<br>\"Ils (sujet) arrivent (action) le soir (temps).\"<br>Question: Qui? Quoi faire? Où? Quand?</div><h3>4. DÉCRIRE UNE IMAGE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Utiliser les trois séquences:</strong><br>1. Qui vois-tu? (Sujet) → \"Je vois un garçon.\"<br>2. Qu'est-ce qu'il fait? (Action) → \"Il joue au tennis.\"<br>3. Où/Comment? (Descriptif) → \"Il est heureux et rapide.\"<br>Résultat: \"Un garçon joue au tennis. Il est heureux et rapide.\"</div><h3>5. PRODUIRE UNE PHRASE COMPLÈTE</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Checklist:</strong><br>✓ Sujet identifié<br>✓ Verbe conjugué correctement<br>✓ Complément ou description<br>✓ Ponctuation correcte<br>Exemple complet: \"Les enfants jouent joyeusement au parc demain.\"</div>",
      order: 75,
    };

    const writing5: Course = {
      id: writing5Id,
      title: "Les connecteurs textuels",
      description: "Utiliser les connecteurs pour lier les idées dans un texte",
      category: "ecriture",
      content: "<h2>Connecteurs Textuels - Lier les Idées</h2><p>Les connecteurs rendent le texte cohérent et fluide!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ UTILISATION DANS L'ÉCRITURE</strong></div><h3>1. COMMENT LES UTILISER</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Au début d'une phrase ou entre deux phrases:</strong><br>\"D'abord, étudier. Ensuite, se reposer. Finalement, s'amuser.\"<br>\"Elle travaillait dur. Par conséquent, elle réussit.\"<br>\"Il pleuvait. Cependant, nous sortîmes.\"</div><h3>2. LISTE DES CONNECTEURS UTILES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ajouter:</strong> et, puis, ensuite, de plus, aussi, par ailleurs<br><strong>Opposer:</strong> mais, cependant, pourtant, néanmoins, en revanche<br><strong>Expliquer:</strong> car, parce que, donc, c'est pourquoi, en effet<br><strong>Conclure:</strong> bref, en conclusion, en résumé, finalement, donc</div><h3>3. EXERCICE: ENRICHIR UN TEXTE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Sans connecteurs:</strong> \"Je suis allé à l'école. J'ai étudié. J'ai joué.\"<br><strong>Avec connecteurs:</strong> \"D'abord, je suis allé à l'école. Puis, j'ai étudié sérieusement. Ensuite, j'ai joué avec mes amis.\"<br>Bien meilleur!</div>",
      order: 76,
    };

    const writing6: Course = {
      id: writing6Id,
      title: "Techniques d'écriture avancées",
      description: "Varier les structures de phrases, créer du suspense, montrer plutôt que dire",
      category: "ecriture",
      content: "<h2>Techniques d'Écriture Avancées</h2><p>Écrire avec style et clarté - des techniques pour améliorer vos textes!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 TECHNIQUES CLÉS</strong></div><h3>1. VARIER LES STRUCTURES DE PHRASES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pas toutes identiques:</strong><br>❌ \"Je me réveille. Je vais à l'école. J'étudie. Je joue. Je rentre à la maison.\"<br>✓ \"Je me réveille. Après avoir mangé, je vais à l'école. Là, j'étudie toute la journée, mais j'aime aussi jouer avec mes amis. Finalement, je rentre à la maison, fatigué mais heureux.\"</div><h3>2. MONTRER PLUTÔT QUE DIRE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ne pas dire \"Il était heureux\" mais montrer:</strong><br>❌ \"Elle était triste.\"<br>✓ \"Elle avait les larmes aux yeux. Elle s'effondra sur une chaise en sanglotant.\"<br>❌ \"Il était fatigué.\"<br>✓ \"Il bâilla, s'étira, et peinait à garder les yeux ouverts.\"</div><h3>3. CRÉER DU SUSPENSE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ralentir le rythme, poser des questions:</strong><br>\"Elle entra dans la pièce. L'air était étrange. Quelque chose n'allait pas. Elle entendit un bruit...\"<br>Utiliser: \"Soudain!\", \"À sa surprise!\", \"Mais...\", \"Et si...?\"</div><h3>4. UTILISER LES ADJECTIFS ÉVOCATEURS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Enrichir les descriptions:</strong><br>❌ \"Une maison grande et vieille\"<br>✓ \"Un immense manoir délabré avec des murs gris et des fenêtres cassées\"<br>Choisir les mots justes pour créer une image vivante</div>",
      order: 77,
    };

    const punctuation11: Course = {
      id: punctuation11Id,
      title: "Ponctuation contextuelle avancée",
      description: "Ponctuation selon le contexte: énumération, incise, déplacement de CP",
      category: "ponctuation",
      content: "<h2>Ponctuation Contextuelle - Utilisation Avancée</h2><p>La ponctuation change selon le contexte et la structure de la phrase!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 CONTEXTES PARTICULIERS</strong></div><h3>1. ÉNUMÉRATION</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Virgules pour séparer les éléments:</strong><br>\"Je veux du pain, du beurre, du lait et du fromage.\"<br>\"Les enfants, les adultes et les personnes âgées sont invités.\"</div><h3>2. L'INCISE (phrase insérée)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Encadrée par virgules ou tirets:</strong><br>\"Marie, ma meilleure amie, habite à côté.\"<br>\"Il a dit — et j'en suis sûr — qu'il viendrait demain.\"</div><h3>3. DÉPLACEMENT DU COMPLÉMENT DE PHRASE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Quand le CP vient AVANT le GV, virgule recommandée:</strong><br>\"Demain, je vais à l'école.\" (CP au début)<br>\"Au parc, les enfants jouent.\" (CP au début)<br>\"Je vais à l'école demain.\" (pas de virgule nécessaire)</div>",
      order: 78,
    };

    const vocabulary2: Course = {
      id: vocabulary2Id,
      title: "Dérivation lexicale",
      description: "Préfixes et suffixes - créer des mots dérivés",
      category: "vocabulaire",
      content: "<h2>Dérivation Lexicale - Créer des Mots</h2><p>Les préfixes et suffixes permettent de créer de nouveaux mots à partir d'une racine!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>PRÉFIXE + RACINE + SUFFIXE</div><h3>1. LES PRÉFIXES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Avant la racine:</strong><br>im/in = contraire: possible → impossible, certain → incertain<br>re/pré = avant/répétition: faire → refaire, dire → prédire<br>sur = au-dessus: poids → surpoids, naturel → surnaturel</div><h3>2. LES SUFFIXES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Après la racine:</strong><br>-ment: rapidement, heureux → heureusement<br>-tion: créer → création, éducation<br>-able: manger → mangeable, boire → buvable<br>-eur: teach → professor, chanter → chanteur</div><h3>3. EXEMPLES DE DÉRIVATION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Créer une famille de mots:</strong><br>JOUER → joue, joueur, jeu, jouet, rejouer, joué<br>ÉCRIRE → écrite, écrivain, écriture, réécrire</div>",
      order: 79,
    };

    const vocabulary3: Course = {
      id: vocabulary3Id,
      title: "Les niveaux de langue",
      description: "Familier, standard, soutenu - quand utiliser chacun",
      category: "vocabulaire",
      content: "<h2>Niveaux de Langue - Choisir le Registre Approprié</h2><p>La langue change selon le contexte! Familier avec les copains, standard à l'école, soutenu en littérature.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 3 NIVEAUX PRINCIPAUX</strong></div><h3>1. LANGAGE FAMILIER</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Entre amis, détente:</strong><br>\"C'est cool!\" \"J'ai trop faim!\" \"T'es malade?\" \"Ça va?\"<br>Aphaérèse: \"Pour\" → \"P'ur\", \"Tu\" → \"T'\"<br>Omission: \"J'vais\" au lieu de \"Je vais\"</div><h3>2. LANGAGE STANDARD</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>À l'école, en conversation normale:</strong><br>\"C'est intéressant.\" \"J'ai très faim.\" \"Tu es malade?\" \"Comment ça va?\"<br>Prononciation correcte, structure classique</div><h3>3. LANGAGE SOUTENU</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>En littérature, textes formels:</strong><br>\"C'est remarquable.\" \"J'éprouve une certaine famine.\" \"Êtes-vous souffrant?\" \"Comment allez-vous?\"<br>Vocabulaire riche, subjonctif, imparfait du subjonctif</div>",
      order: 80,
    };

    const vocabulary4: Course = {
      id: vocabulary4Id,
      title: "Polysémie et homonymie",
      description: "Mots avec plusieurs sens, mots qui se prononcent pareils",
      category: "vocabulaire",
      content: "<h2>Polysémie et Homonymie - Mots Ambigus</h2><p>Certains mots ont plusieurs sens ou se prononcent comme d'autres!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 2 PHÉNOMÈNES:</strong><br>Polysémie = un mot, plusieurs sens<br>Homonymie = mots différents, même prononciation</div><h3>1. POLYSÉMIE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Banque\" = établissement financier OU endroit où on s'assoit:</strong><br>\"Je vais à la banque pour retirer de l'argent.\"<br>\"Je me suis assis sur la banque du parc.\"<br><strong>\"Vol\" = action de voler (oiseau) OU cambriolage:</strong><br>\"Le vol de l'aigle était magnifique.\"<br>\"Il a commis un vol hier.\"</div><h3>2. HOMONYMIE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Son\" (possessif) vs \"son\" (du bruit):</strong><br>\"Son livre\" (possession)<br>\"Le son de la cloche\" (bruit)<br><strong>\"Ver\" (animal) vs \"vers\" (préposition) vs \"vert\" (couleur):</strong><br>\"Un vers de terre\" (animal)<br>\"Je vais vers la maison\" (direction)<br>\"Une pomme verte\" (couleur)</div>",
      order: 81,
    };

    const reading10: Course = {
      id: reading10Id,
      title: "Compréhension fine et inférence",
      description: "Comprendre entre les lignes, faire des déductions",
      category: "lecture_reading",
      content: "<h2>Compréhension Fine et Inférence - Lire Entre les Lignes</h2><p>Ne pas juste lire les mots, mais comprendre le sens caché!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ 2 NIVEAUX DE COMPRÉHENSION:</strong><br>Littéral = ce qui est écrit<br>Inférence = ce qu'on déduit</div><h3>1. LECTURE LITTÉRALE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ce qui est écrit explicitement:</strong><br>Texte: \"Elle était triste et seule.\"<br>Littéral: Elle a des émotions négatives</div><h3>2. INFÉRENCE (entre les lignes)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Ce qu'on déduit du contexte:</strong><br>Texte: \"Elle entra dans la classe. Tout le monde arrêta de parler.\"<br>Inférence: Elle est importante ou redoutée</div><h3>3. INDICES TEXTUELS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Regarder:</strong><br>Mots émotifs, actions, contexte, répétitions<br>\"Il ne souriait jamais. Son visage était comme une pierre.\"<br>→ Inférence: C'est quelqu'un de dur ou malheureux</div>",
      order: 82,
    };

    // Additional orthography courses
    const orthography11: Course = {
      id: orthography11Id,
      title: "Même vs Mêmes",
      description: "Adjectif vs adverbe - quand s'accordent-ils?",
      category: "orthographe",
      content: "<h2>Même vs Mêmes - Accord Particulier</h2><p>\"Même\" peut être adjectif ou adverbe. L'accordaccord ne se fait que comme adjectif!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE:</strong><br>MÊME (adjectif) = accord, va après le nom<br>même (adverbe) = invariable, peut être partout</div><h3>1. MÊME ADJECTIF (ACCORD)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Va après le nom, s'accorde:</strong><br>\"Les mêmes livres\" (mêmes = pluriel)<br>\"La même fille\" (même = singulier féminin)<br>\"Les enfants mêmes\" (mêmes = pluriel)<br>\"Au même moment\" (même = singulier))</div><h3>2. MÊME ADVERBE (INVARIABLE)</strong><br>\"Même les enfants savent\" (même = adverbe, avant le nom)<br>\"Il est tombé même en courant\" (même = adverbe, avant participe)<br>\"Elle a même accepté\" (même = adverbe, avant verbe)</div><h3>3. COMPARAISON</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Adjectif:</strong> \"Je fais la même chose\" (s'accorde avec \"chose\")<br><strong>Adverbe:</strong> \"Je fais même ça\" (invariable, modifie la phrase)</div>",
      order: 50,
    };

    const orthography12: Course = {
      id: orthography12Id,
      title: "Quel vs Qu'elle vs Quelles",
      description: "Trois formes différentes - trois sens différents!",
      category: "orthographe",
      content: "<h2>Quel vs Qu'elle vs Quelles - Distinction Essentielle</h2><p>Ces trois formes se prononcent pareil mais s'écrivent différemment!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ LES TROIS FORMES:</strong><br>Quel/quelle = adjectif interrogatif ou exclamatif<br>Qu'elle = que + elle (pronom)<br>Quelles = pluriel de quelle</div><h3>1. QUEL/QUELLE (ADJECTIF)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Question/exclamation avec un nom:</strong><br>\"Quel livre lis-tu?\" (quel = masculin)<br>\"Quelle est ta couleur préférée?\" (quelle = féminin)<br>\"Quel dommage!\" (exclamation)<br>\"Quelle belle maison!\" (exclamation féminin)</div><h3>2. QU'ELLE (QUE + ELLE)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Peut être remplacé par \"qu'il\":</strong><br>\"Je crois qu'elle viendra\" (que + elle)<br>\"Je pense qu'elle est intelligente\" (que + elle)<br>\"Il faut qu'elle parte\" (que + elle)<br>\"Je voudrais qu'elle soit heureuse\" (que + elle)</div><h3>3. QUELLES (PLURIEL)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pluriel féminin de quel:</strong><br>\"Quelles robes préfères-tu?\" (quelles = pluriel féminin)<br>\"Quelles sont les réponses?\" (quelles = pluriel féminin)</div>",
      order: 51,
    };

    const orthography13: Course = {
      id: orthography13Id,
      title: "Ces vs C'est vs S'est",
      description: "Trois homophones - trois significations totalement différentes!",
      category: "orthographe",
      content: "<h2>Ces vs C'est vs S'est - Homophones Trompeurs</h2><p>Ces trois mots se prononcent identiquement mais ont des rôles complètement différents!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ TROIS HOMOPHONES:</strong><br>Ces = adjectif démonstratif<br>C'est = cela est<br>S'est = réfléchi passé</div><h3>1. CES (ADJECTIF DÉMONSTRATIF)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Montre, avant pluriel:</strong><br>\"Ces livres sont intéressants\" (ces = ce + ces livres)<br>\"Regarde ces enfants!\" (ces = ceux-ci)<br>\"J'aime ces couleurs\" (ces = celles-ci)</div><h3>2. C'EST (CELA EST)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>C = cela, 'est = est:</strong><br>\"C'est un livre\" (c'est = cela est)<br>\"C'est magnifique!\" (c'est = cela est)<br>\"C'est Marie\" (c'est = cela est)<br>\"C'est possible!\" (c'est = cela est)</div><h3>3. S'EST (SE + EST)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>s = se (réfléchi), 'est = passé composé:</strong><br>\"Il s'est levé\" (se + est = s'est levé)<br>\"Elle s'est endormie\" (se + est)<br>\"Ils se sont amusés\" (se + ont, pas \"s'est\")<br>\"On s'est rencontré\" (se + est)</div>",
      order: 52,
    };

    const orthography14: Course = {
      id: orthography14Id,
      title: "Trait d'union dans les nombres",
      description: "Quand mettre des traits d'union dans les nombres?",
      category: "orthographe",
      content: "<h2>Trait d'Union dans les Nombres - Règles Précises</h2><p>Il y a des règles pour l'utilisation du trait d'union dans les nombres en français!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE MODERNE:</strong><br>Depuis 1990: TOUJOURS trait d'union dans les nombres composés</div><h3>1. NOMBRES DE 1 À 99</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Trait d'union entre dizaines et unités:</strong><br>\"Vingt-trois\" (23), \"Quarante-sept\" (47)<br>\"Soixante-dix\" (70), \"Quatre-vingt-dix\" (90)<br>\"Cent-un\" (101), \"Mille-deux\" (1002 - moderne)</div><h3>2. EXCEPTION: \"ET\"</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Avec \"et\", pas de trait d'union après:</strong><br>\"Vingt et un\" (21) - pas de trait après \"et\"<br>\"Soixante et onze\" (71) - pas de trait après \"et\"<br>\"Quatre-vingt-un\" (81) - trait d'union quand pas de \"et\"</div><h3>3. MULTIPLES</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Vingt\" prend un \"s\" au pluriel:</strong><br>\"Quatre-vingts\" (80) - avec s<br>\"Quatre-vingt-trois\" (83) - pas de s avant autre nombre<br>\"Cent\" prend un \"s\" au pluriel:</strong><br>\"Deux-cents\" (200) - avec s<br>\"Deux-cent-trois\" (203) - pas de s avant autre nombre</div>",
      order: 53,
    };

    // Additional conjugation courses
    const conjugation10: Course = {
      id: conjugation10Id,
      title: "Verbes pronominaux",
      description: "Se lever, se laver, s'amuser - formes réfléchies",
      category: "conjugaison",
      content: "<h2>Verbes Pronominaux - Se lever, S'amuser, Se laver</h2><p>Les verbes pronominaux sont des verbes avec un pronom réfléchi devant. Ils sont très courants en français!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>Pronom réfléchi + verbe<br>Je me lave, Tu te laves, Il se lave...</div><h3>1. CONJUGAISON AU PRÉSENT</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"SE LEVER\":</strong><br>Je me lève, Tu te lèves, Il se lève<br>Nous nous levons, Vous vous levez, Ils se lèvent<br><strong>\"S'AMUSER\":</strong><br>Je m'amuse, Tu t'amuses, Il s'amuse<br>Nous nous amusons, Vous vous amusez, Ils s'amusent</div><h3>2. AU PASSÉ COMPOSÉ</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Toujours avec l'auxiliaire \"être\":</strong><br>\"Je me suis levé\" (fém: levée)<br>\"Elle s'est amusée\"<br>\"Ils se sont rencontrés\"<br>Accord avec le sujet si pas de COD avant!</div><h3>3. À L'IMPARFAIT</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pronom réfléchi + imparfait normal:</strong><br>\"Je me levais\", \"Tu te levais\", \"Il se levait\"<br>\"Nous nous levions\", \"Vous vous leviez\", \"Ils se levaient\"</div>",
      order: 54,
    };

    const conjugation11: Course = {
      id: conjugation11Id,
      title: "Participe présent vs Gérondif",
      description: "Formation et utilisation de ces formes verbales",
      category: "conjugaison",
      content: "<h2>Participe Présent vs Gérondif - Formes en -ANT</h2><p>Ces deux formes se ressemblent mais ont des usages différents!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ LES DEUX FORMES:</strong><br>Participe présent: -ANT (variable)<br>Gérondif: en + -ANT (invariable)</div><h3>1. PARTICIPE PRÉSENT</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Variable, remplace \"qui\":\"<br>\"Les enfants marchant vite\" = \"Les enfants qui marchent vite\"<br>\"Une femme souriante\" = \"Une femme qui sourit\"<br>Peut s'accorder avec le nom!</div><h3>2. GÉRONDIF</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Invariable, précédé de \"en\":</strong><br>\"En marchant vite\" = \"tandis que je marche vite\"<br>\"En souriant\" = \"tandis qu'elle sourit\"<br>Indique une action qui accompagne une autre</div><h3>3. FORMATION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Nous + présent - ons + -ant:</strong><br>Nous parlons → parlant<br>Nous finissons → finissant<br>Nous vendons → vendant<br>Exceptions: avoir, être, savoir</div>",
      order: 55,
    };

    const conjugation12: Course = {
      id: conjugation12Id,
      title: "Accord du verbe avec sujet collectif",
      description: "Un groupe/une majorité d'enfants - singulier ou pluriel?",
      category: "conjugaison",
      content: "<h2>Accord du Verbe avec Sujet Collectif - Cas Particulier</h2><p>Un sujet collectif peut prendre un verbe singulier ou pluriel selon le contexte!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ DEUX USAGES:</strong><br>\"Un groupe\" d'enfants joue = singulier (le groupe)<br>\"Un groupe\" d'enfants jouent = pluriel (les enfants)</div><h3>1. SINGULIER (SUR LE COLLECTIF)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Insiste sur l'unité du groupe:</strong><br>\"Un groupe d'enfants joue au parc\"<br>\"La majorité des élèves réussit\"<br>\"Une foule de manifestants s'avance\"<br>Focus sur \"groupe\", \"majorité\", \"foule\"</div><h3>2. PLURIEL (SUR LES ÉLÉMENTS)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Insiste sur les éléments du groupe:</strong><br>\"Un groupe d'enfants jouent au parc\"<br>\"La majorité des élèves réussissent\"<br>\"Une foule de manifestants s'avancent\"<br>Focus sur les enfants, élèves, manifestants</div><h3>3. AVEC \"DE\" SEUL</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Plusieurs de\", \"Beaucoup de\", \"Peu de\" = pluriel:</strong><br>\"Plusieurs de mes amis viennent\"<br>\"Beaucoup d'élèves réussissent\"<br>\"Peu de gens savent\"</div>",
      order: 56,
    };

    const conjugation13: Course = {
      id: conjugation13Id,
      title: "Plus-que-parfait",
      description: "Le temps avant le passé composé - ce qui s'est passé avant",
      category: "conjugaison",
      content: "<h2>Plus-que-parfait - L'Antériorité au Passé</h2><p>Le plus-que-parfait exprime une action qui s'est passée AVANT une autre action passée.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ FORMATION:</strong><br>Auxiliaire (avoir ou être) à l'imparfait + participe passé<br>J'avais mangé, J'étais allé</div><h3>1. AVEC AVOIR</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong><br>J'avais mangé, Tu avais mangé, Il avait mangé<br>Nous avions mangé, Vous aviez mangé, Ils avaient mangé<br><strong>Exemple:</strong> \"Quand je suis arrivé, il avait déjà mangé\"</div><h3>2. AVEC ÊTRE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong><br>J'étais allé, Tu étais allé, Elle était allée<br>Nous étions allés, Vous étiez allés, Elles étaient allées<br>Accord avec le sujet!</div><h3>3. UTILISATION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Indique l'antériorité:</strong><br>\"Quand j'suis arrivé, elle était partie\" (elle était partie avant)<br>\"Il avait etudié toute la nuit avant l'examen\"<br>\"Nous avions attendu une heure quand il est arrivé\"</div>",
      order: 57,
    };





    // Orthographe courses
    const orthography1: Course = {
      id: orthography1Id,
      title: "Les règles de base",
      description: "Majuscules, accents, ponctuation - les fondamentaux",
      category: "orthographe",
      content: "<h2>Les Règles de Base de l'Orthographe</h2><p>L'orthographe française est basée sur des règles essentielles. Maîtriser ces règles est crucial pour écrire correctement.</p><h3>1. LES MAJUSCULES</h3><p><strong>Où utiliser les majuscules?</strong></p><ul><li><strong>Au début d'une phrase:</strong> \"Le chat est noir.\"</li><li><strong>Noms propres:</strong> Paris, Marie, France, Toulouse</li><li><strong>Titres de livres:</strong> \"Le Seigneur des Anneaux\" (1ère lettre)</li><li><strong>Acronymes:</strong> USA, UNESCO, SNCF</li><li><strong>Après certains ponctuations:</strong> Point, point d'interrogation, point d'exclamation</li></ul><h3>2. LES ACCENTS</h3><p><strong>L'accent aigu (é):</strong> Indique une syllabe fermée → café, été, éléphant</p><p><strong>L'accent grave (è, à, ù):</strong> Distingue homographes → a/à, la/là, ou/où</p><p><strong>L'accent circonflexe (ê, ô, â):</strong> Historique, remplace s ancien → forêt, être, hôtel, château</p><p><strong>Le tréma (ë, ï, ü):</strong> Prononciation des voyelles → maïs, coïncidence, capharnaüm</p><p><strong>La cédille (ç):</strong> Devant a, o, u → c reste \"s\" → français, façade, leçon</p><h3>3. LA PONCTUATION</h3><ul><li><strong>Le point (.):</strong> Fin de phrase</li><li><strong>La virgule (,):</strong> Sépare éléments d'une énumération ou des propositions</li><li><strong>Le point-virgule (;):</strong> Sépare propositions indépendantes</li><li><strong>Le point d'exclamation (!):</strong> Exprime émotion ou ordre</li><li><strong>Le point d'interrogation (?):</strong> Pose une question</li><li><strong>Les guillemets (\"\"):</strong> Citation ou dialogue</li><li><strong>Le tiret (-):</strong> Dialogue ou énumération</li><li><strong>Les parenthèses ():</strong> Information supplémentaire</li></ul><h3>4. ESPACES AVEC PONCTUATION</h3><p><strong>En français:</strong> Espace AVANT les signes de ponctuation doubles (: ; ! ?)</p><ul><li>Correct: \"Quel âge as-tu ? 15 ans. Où habites-tu ?\"</li><li>Incorrect: \"Quel âge as-tu? 15 ans. Où habites-tu?\"</li></ul><p><strong>Pas d'espace:</strong> Point, virgule, apostrophe</p><ul><li>\"Bonjour,ma mère. L'école c'est l'avenir.\"</li></ul><h3>5. AUTRES RÈGLES ESSENTIELLES</h3><ul><li><strong>L'apostrophe ('):</strong> Contraction d'une voyelle → l'apple, d'or, c'est, j'aime</li><li><strong>Le trait d'union (-):</strong> Mots composés → arc-en-ciel, peut-être, c'est-à-dire</li><li><strong>Les chiffres:</strong> Toujours en chiffres en français moderne → 21, 100, 1000</li></ul><h3>6. EXEMPLE COMPLET AVEC TOUTES LES RÈGLES</h3><p>\"Aujourd'hui, le 15 janvier 2024, j'ai rencontré Marie à Paris. Elle m'a dit : Ça va ? Oui, très bien ! Nous avons parlé de l'école, du français, des mathématiques. C'était merveilleux! Marie habite à côté de ma maison; nous pouvons nous voir souvent.\"</p>",
      order: 8,
    };

    const orthography2: Course = {
      id: orthography2Id,
      title: "Accords: noms et adjectifs",
      description: "Genre et nombre des noms et adjectifs",
      category: "orthographe",
      content: "<h2>Les Accords des Noms et Adjectifs</h2><p>Un nom peut être masculin ou féminin, singulier ou pluriel. L'adjectif qui décrit le nom doit s'accorder avec lui.</p><h3>1. LE GENRE DES NOMS</h3><p><strong>Masculin vs Féminin:</strong></p><ul><li><strong>Généralement masculin:</strong> un arbre, un chat, un livre, un professeur</li><li><strong>Généralement féminin:</strong> une table, une maison, une fille, une leçon</li></ul><p><strong>Comment reconnaître?</strong></p><ul><li>L'article: un (masculin), une (féminin)</li><li>Les terminaisons -e au féminin: un ami → une amie</li></ul><h3>2. LE NOMBRE DES NOMS</h3><p><strong>Singulier vs Pluriel:</strong></p><ul><li><strong>Singulier:</strong> un chat, une table, un livre</li><li><strong>Pluriel:</strong> des chats, des tables, des livres</li></ul><p><strong>Formation du pluriel:</strong></p><ul><li><strong>+s en général:</strong> chat → chats, maison → maisons</li><li><strong>mots en -au, -eau, -eu → +x:</strong> beau → beaux, château → châteaux, jeu → jeux</li><li><strong>mots en -al → -aux:</strong> cheval → chevaux, mal → maux</li><li><strong>mots en -ail → -ails (souvent):</strong> travail → travails, détail → détails</li></ul><h3>3. ACCORD DE L'ADJECTIF</h3><p><strong>L'adjectif s'accorde en genre et nombre avec le nom qu'il décrit:</strong></p><ul><li>Un grand chat → Des grands chats</li><li>Une grande maison → Des grandes maisons</li><li>Un chat noir → Des chats noirs</li><li>Une maison noire → Des maisons noires</li></ul><h3>4. CAS PARTICULIERS</h3><p><strong>Adjectifs invariables:</strong> chic, cool, orange, marron</p><ul><li>Un vêtement cool, des vêtements cool</li><li>Une voiture orange, des voitures orange</li></ul><p><strong>Adjectifs avec pluriel irrégulier:</strong></p><ul><li>Beau (m) → bel (avant voyelle) → beaux (pl)</li><li>Nouveau (m) → nouvel (avant voyelle) → nouveaux (pl)</li><li>Vieux (m) → vieil (avant voyelle) → vieux (pl)</li></ul><h3>5. EXEMPLES D'ACCORDS</h3><p>\"La petite fille porte une belle robe rouge. Les petites filles portent de belles robes rouges. Le grand garçon a un vieux chat noir. Les grands garçons ont de vieux chats noirs.\"</p>",
      order: 9,
    };

    const orthography3: Course = {
      id: orthography3Id,
      title: "Les accords du verbe",
      description: "Sujet, conjugaison et accord",
      category: "orthographe",
      content: "<h2>Les Accords du Verbe avec le Sujet</h2><p>Le verbe doit s'accorder avec son sujet en nombre et personne.</p><h3>1. LES SUJETS ET LEURS ACCORDS</h3><p><strong>Verbe au présent:</strong></p><ul><li><strong>Je</strong> parle (1ère singulier)</li><li><strong>Tu</strong> parles (2e singulier)</li><li><strong>Il/Elle/On</strong> parle (3e singulier)</li><li><strong>Nous</strong> parlons (1ère pluriel)</li><li><strong>Vous</strong> parlez (2e pluriel)</li><li><strong>Ils/Elles</strong> parlent (3e pluriel)</li></ul><h3>2. ACCORDS COMPLEXES</h3><p><strong>Sujet composé (plusieurs noms):</strong></p><ul><li>Marie et Jean courent (pluriel) = Ils courent</li><li>Ma mère et ma tante sont venues (pluriel) = Elles sont venues</li></ul><p><strong>Sujet collectif:</strong></p><ul><li>\"Un groupe d'enfants joue\" (singulier, car \"groupe\" est singulier)</li><li>\"Plusieurs enfants jouent\" (pluriel, car \"plusieurs\" est pluriel)</li></ul><h3>3. PIÈGES COURANTS</h3><p><strong>\"On\" = toujours singulier:</strong></p><ul><li>On parle français → pas \"parlons\"</li><li>On a mangé une pomme → pas \"avons\"</li></ul><p><strong>Verbe de mouvement à l'infinitif:</strong></p><ul><li>\"Les enfants aiment aller à l'école\" (verbe \"aller\" reste infinitif)</li></ul><h3>4. EXEMPLES</h3><p>\"Les trois filles marchent dans la rue. Elles parlent de leurs vacances. Aujourd'hui, on regarde un film. Mon frère et ma soeur ont un chat noir. Où est-ce qu'elles vont?\"</p>",
      order: 10,
    };

    const orthography4: Course = {
      id: orthography4Id,
      title: "Les homophones",
      description: "Sons identiques, orthographe différente",
      category: "orthographe",
      content: "<h2>Les Homophones: Mots qui Sonnent Pareil</h2><p>Les homophones sont des mots qui se prononcent identiquement mais ont des sens différents et s'écrivent différemment.</p><h3>1. LES HOMOPHONES LES PLUS COURANTS</h3><p><strong>a / à:</strong></p><ul><li>\"a\" = verbe avoir (il a, elle a)</li><li>\"à\" = préposition (aller à, donner à)</li><li>Exemple: \"Il a donné un livre à Marie.\"</li></ul><p><strong>et / est:</strong></p><ul><li>\"et\" = conjonction (addition, liaison)</li><li>\"est\" = verbe être (il est, elle est)</li><li>Exemple: \"Il est heureux et gentil.\"</li></ul><p><strong>ou / où:</strong></p><ul><li>\"ou\" = conjonction (choix, alternative)</li><li>\"où\" = adverbe ou pronom (lieu)</li><li>Exemple: \"Tu veux du café ou du thé? Où habites-tu?\"</li></ul><p><strong>son / sont:</strong></p><ul><li>\"son\" = adjectif possessif (sa voix, son chat)</li><li>\"sont\" = verbe être pluriel (ils sont, elles sont)</li><li>Exemple: \"Ils sont venus avec son ami.\"</li></ul><p><strong>ce / se:</strong></p><ul><li>\"ce\" = adjectif démonstratif (ce chat, ce livre)</li><li>\"se\" = pronom réfléchi (se laver, se promener)</li><li>Exemple: \"Ce enfant se lave les mains.\"</li></ul><p><strong>c'est / s'est:</strong></p><ul><li>\"c'est\" = c'est un verbe être (c'est = cela est)</li><li>\"s'est\" = réfléchi passé composé</li><li>Exemple: \"C'est Marie. Elle s'est endormie.\"</li></ul><p><strong>ça / sa:</strong></p><ul><li>\"ça\" = pronom démonstratif (cela) → Ça va bien</li><li>\"sa\" = adjectif possessif (son à elle) → sa maison</li><li>Exemple: \"Ça va? Comment est sa maison?\"</li></ul><h3>2. AUTRES HOMOPHONES IMPORTANTS</h3><p><strong>peu / peux / peut:</strong></p><ul><li>\"peu\" = adverbe (un petit nombre)</li><li>\"peux\" = verbe pouvoir (je peux)</li><li>\"peut\" = verbe pouvoir (il peut)</li><li>Exemple: \"Il peut faire peu de bruit.\"</li></ul><p><strong>la / là / l'a:</strong></p><ul><li>\"la\" = article/pronom (la maison, je la vois)</li><li>\"là\" = adverbe de lieu (là-bas, par là)</li><li>\"l'a\" = pronom + verbe (il l'a pris)</li><li>Exemple: \"La fille qui est là l'a vu.\"</li></ul><h3>3. EXERCICE</h3><p>Complétez avec l'homophone correct: \"___ tu viens? Oui, je ___ un cadeau pour ___. C'___ pour ton anniversaire. ___ ta maison ___ loin d'ici?\"</p><p>(Réponses: Où, ai, toi, est, Est)</p>",
      order: 11,
    };

    const orthography5: Course = {
      id: orthography5Id,
      title: "Les pièges courants",
      description: "Erreurs d'orthographe les plus fréquentes",
      category: "orthographe",
      content: "<h2>Les Pièges Courants de l'Orthographe</h2><p>Certaines erreurs d'orthographe sont très communes. Les connaître vous aide à les éviter.</p><h3>1. DOUBLEMENTS DE CONSONNES</h3><p><strong>Mots qui font souvent l'erreur:</strong></p><ul><li>\"appel\" (pas \"aple\"), \"appelle\" (pas \"apele\")</li><li>\"maîtresse\" (pas \"maitresse\" sans l'accent)</li><li>\"quel\" (pas \"quell\"), \"qu'elle\" (pronom + verbe)</li><li>\"patte\" (de l'animal, pas \"pate\"), \"pâte\" (à modeler)</li></ul><p><strong>Astuce:</strong> Si vous entendez le son doublé prononcé deux fois, écrivez deux consonnes: \"tt\" dans \"appelle\"</p><h3>2. Y vs I DANS LES VERBES</h3><p><strong>Verbes en -yer changent y → i avant e muet:</strong></p><ul><li>\"je paye\" ou \"je paie\" (les deux sont corrects)</li><li>\"nous payons\" (y reste)</li><li>\"vous nettoyez\" (y reste, pas \"nettoyiez\")</li></ul><h3>3. MOTS DIFFICILES À ÉPELER</h3><ul><li>\"aujourd'hui\" (pas \"ajourd'hui\")</li><li>\"monsieur\" (pas \"mousieur\")</li><li>\"madame\" (pas \"madamme\")</li><li>\"septembre\" (pas \"septembre\"... non, c'est déjà bon!)</li><li>\"néanmoins\" (pas \"nénmoins\")</li><li>\"beaucoup\" (pas \"beaucoup\"... attendez!)</li><li>\"restaurant\" (pas \"restaurent\")</li></ul><h3>4. GENRE OUBLIÉ</h3><p><strong>Mots dont le genre surprend:</strong></p><ul><li>\"une amitié\" (féminin!)</li><li>\"un problème\" (masculin!)</li><li>\"un système\" (masculin!)</li><li>\"une photo\" (féminin, court pour photographie)</li><li>\"une main\" (féminin)</li><li>\"un cœur\" (masculin)</li></ul><h3>5. PARTICIPES PASSÉS DIFFICILES</h3><ul><li>\"acquis\" (de acquérir)</li><li>\"conquis\" (de conquérir)</li><li>\"exclu\" (de exclure)</li><li>\"inclus\" (de inclure)</li><li>\"occlus\" (de occlure - bouche fermée en dentisterie)</li></ul><h3>6. PLURIELS IRRÉGULIERS</h3><ul><li>\"oeil\" → \"yeux\" (pas \"oeils\"!)</li><li>\"travail\" → \"travaux\" (dans certains contextes)</li><li>\"ciel\" → \"ciels\" ou \"cieux\" (les ciels bleus vs le ciel étoilé)</li></ul><h3>7. VÉRIFICATION RAPIDE</h3><p>Avant de finir un texte, vérifiez: accents, majuscules, accords (sujet-verbe), homophones, doublements de consonnes.</p>",
      order: 12,
    };

    // Conjugaison courses
    const conjugation1: Course = {
      id: conjugation1Id,
      title: "Les temps simples",
      description: "Présent, imparfait, passé composé",
      category: "conjugaison",
      content: "<h2>Les Temps Simples de la Conjugaison</h2><p>Les temps simples permettent de parler du présent, du passé proche, ou du passé habituel.</p><h3>1. LE PRÉSENT DE L'INDICATIF</h3><p><strong>Usage:</strong> Action qui se passe maintenant ou habitude générale</p><p><strong>Formation régulière:</strong></p><ul><li><strong>Verbes -ER:</strong> parler → je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent</li><li><strong>Verbes -IR:</strong> finir → je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent</li><li><strong>Verbes -RE:</strong> vendre → je vends, tu vends, il vend, nous vendons, vous vendez, ils vendent</li></ul><p><strong>Verbes irréguliers courants:</strong></p><ul><li>Être: je suis, tu es, il est, nous sommes, vous êtes, ils sont</li><li>Avoir: j'ai, tu as, il a, nous avons, vous avez, ils ont</li><li>Aller: je vais, tu vas, il va, nous allons, vous allez, ils vont</li><li>Faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font</li></ul><h3>2. L'IMPARFAIT</h3><p><strong>Usage:</strong> Action passée habituelle ou description du passé</p><p><strong>Formation:</strong> Radical du présent + -ais, -ais, -ait, -ions, -iez, -aient</p><ul><li>Parler: je parlais, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient</li><li>Faire: je faisais, tu faisais, il faisait, nous faisions, vous faisiez, ils faisaient</li><li>Être: j'étais, tu étais, il était, nous étions, vous étiez, ils étaient</li></ul><p><strong>Exemples:</strong> \"Quand j'étais enfant, je jouais au parc tous les jours.\"</p><h3>3. LE PASSÉ COMPOSÉ</h3><p><strong>Usage:</strong> Action passée, complètement terminée</p><p><strong>Formation:</strong> Auxiliaire (avoir ou être) au présent + participe passé</p><p><strong>Participes passés réguliers:</strong></p><ul><li>Parler → parlé</li><li>Finir → fini</li><li>Vendre → vendu</li></ul><p><strong>Exemples:</strong></p><ul><li>\"J'ai mangé une pomme.\" (avoir)</li><li>\"Je suis allé à l'école.\" (être)</li><li>\"Nous avons joué au football.\" (avoir)</li><li>\"Elles sont venues avec nous.\" (être)</li></ul><h3>4. VERBES AVEC ÊTRE AU PASSÉ COMPOSÉ</h3><p>Verbes de mouvement et réfléchis utilisent \"être\":</p><ul><li>Aller, venir, arriver, partir, entrer, sortir, monter, descendre, retourner</li><li>Se laver, se promener, se coucher, se réveiller</li></ul><p><strong>Attention à l'accord:</strong> Le participe passé s'accorde avec le sujet</p><ul><li>Elle est allée (féminin singulier)</li><li>Elles sont allées (féminin pluriel)</li><li>Il est allé (masculin singulier)</li><li>Ils sont allés (masculin pluriel)</li></ul>",
      order: 13,
    };

    const conjugation2: Course = {
      id: conjugation2Id,
      title: "Les temps du futur",
      description: "Futur simple et futur proche",
      category: "conjugaison",
      content: "<h2>Les Temps du Futur</h2><p>Le futur permet de parler d'actions qui vont se produire.</p><h3>1. LE FUTUR PROCHE</h3><p><strong>Usage:</strong> Action très prochaine dans l'avenir (demain, bientôt)</p><p><strong>Formation:</strong> Aller (au présent) + verbe à l'infinitif</p><ul><li>Je vais parler</li><li>Tu vas finir</li><li>Il va vendre</li><li>Nous allons partir</li><li>Vous allez arriver</li><li>Ils vont jouer</li></ul><p><strong>Exemples:</strong></p><ul><li>\"Je vais aller au cinéma ce soir.\"</li><li>\"Vous allez manger du gâteau?\"</li><li>\"Demain, nous allons avoir un examen.\"</li></ul><h3>2. LE FUTUR SIMPLE</h3><p><strong>Usage:</strong> Action future qui se produira certainement (dans le futur lointain ou proche)</p><p><strong>Formation régulière:</strong> Infinitif + -ai, -as, -a, -ons, -ez, -ont</p><p><strong>Verbes -ER:</strong></p><ul><li>Parler: je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront</li></ul><p><strong>Verbes -IR:</strong></p><ul><li>Finir: je finirai, tu finiras, il finira, nous finirons, vous finirez, ils finiront</li></ul><p><strong>Verbes -RE:</strong></p><ul><li>Vendre: je vendrai, tu vendras, il vendra, nous vendrons, vous vendrez, ils vendront</li></ul><p><strong>Verbes irréguliers courants:</strong></p><ul><li>Être: je serai, tu seras, il sera, nous serons, vous serez, ils seront</li><li>Avoir: j'aurai, tu auras, il aura, nous aurons, vous aurez, ils auront</li><li>Aller: j'irai, tu iras, il ira, nous irons, vous irez, ils iront</li><li>Faire: je ferai, tu feras, il fera, nous ferons, vous ferez, ils feront</li><li>Pouvoir: je pourrai, tu pourras, il pourra, nous pourrons, vous pourrez, ils pourront</li><li>Venir: je viendrai, tu viendras, il viendra, nous viendrons, vous viendrez, ils viendront</li></ul><p><strong>Exemples:</strong></p><ul><li>\"L'année prochaine, j'aurai 16 ans.\"</li><li>\"Vous réussirez cet examen.\"</li><li>\"Demain, il fera beau.\"</li></ul><h3>3. DIFFÉRENCE FUTUR PROCHE VS FUTUR SIMPLE</h3><ul><li><strong>Futur proche:</strong> \"Je vais partir demain\" (sûr, planifié)</li><li><strong>Futur simple:</strong> \"Je partirai demain\" (probable, moins immédiat)</li></ul>",
      order: 14,
    };

    const conjugation3: Course = {
      id: conjugation3Id,
      title: "Le conditionnel et subjonctif",
      description: "Hypothèse et subjectif",
      category: "conjugaison",
      content: "<h2>Le Conditionnel et le Subjonctif</h2><p>Le conditionnel exprime une hypothèse; le subjonctif exprime le doute, le désir ou la nécessité.</p><h3>1. LE CONDITIONNEL PRÉSENT</h3><p><strong>Usage:</strong> Hypothèse (si... alors...), politesse, conseil</p><p><strong>Formation:</strong> Futur simple + -ais, -ais, -ait, -ions, -iez, -aient</p><ul><li>Parler: je parlerais, tu parlerais, il parlerait, nous parlerions, vous parleriez, ils parleraient</li><li>Avoir: j'aurais, tu aurais, il aurait, nous aurions, vous auriez, ils auraient</li><li>Être: je serais, tu serais, il serait, nous serions, vous seriez, ils seraient</li></ul><p><strong>Exemples:</strong></p><ul><li>\"Si j'avais de l'argent, j'achèterais une maison.\"</li><li>\"Pourriez-vous m'aider?\" (plus poli que \"Peux-tu\")</li><li>\"Tu devrais étudier davantage.\"</li></ul><h3>2. LES STRUCTURES SI...ALORS</h3><p><strong>Présent + Futur:</strong> \"Si je vais à la plage, je nagerai.\"</p><p><strong>Imparfait + Conditionnel:</strong> \"Si j'allais à la plage, je nagerais.\" (hypothèse irréelle)</p><p><strong>Plus-que-parfait + Conditionnel passé:</strong> \"Si j'étais allé à la plage, j'aurais nagé.\" (regret)</p><h3>3. LE SUBJONCTIF PRÉSENT</h3><p><strong>Usage:</strong> Après expressions de doute, désir, nécessité, peur</p><p><strong>Formation:</strong> Radical 3e personne pluriel + -e, -es, -e, -ions, -iez, -ent</p><p><strong>Verbes réguliers:</strong></p><ul><li>Parler: que je parle, que tu parles, qu'il parle, que nous parlions, que vous parliez, qu'ils parlent</li></ul><p><strong>Verbes irréguliers:</strong></p><ul><li>Être: que je sois, que tu sois, qu'il soit, que nous soyons, que vous soyez, qu'ils soient</li><li>Avoir: que j'aie, que tu aies, qu'il ait, que nous ayons, que vous ayez, qu'ils aient</li><li>Aller: que j'aille, que tu ailles, qu'il aille, que nous allions, que vous alliez, qu'ils aillent</li></ul><p><strong>Expressions qui demandent le subjonctif:</strong></p><ul><li>Je veux que... \"Je veux que tu sois heureux.\"</li><li>Il faut que... \"Il faut que nous partions.\"</li><li>J'ai peur que... \"J'ai peur qu'il pleuve.\"</li><li>Je doute que... \"Je doute qu'il vienne.\"</li></ul>",
      order: 15,
    };

    const conjugation4: Course = {
      id: conjugation4Id,
      title: "Les modes et leurs usages",
      description: "Indicatif, conditionnel, subjonctif, impératif, infinitif",
      category: "conjugaison",
      content: "<h2>Les Modes et Leurs Usages</h2><p>Chaque mode de conjugaison a un usage spécifique et une façon de voir l'action.</p><h3>1. L'INDICATIF</h3><p><strong>Usage:</strong> Réalité objective, fait certain</p><p><strong>Temps:</strong> Présent, imparfait, futur, passé composé, passé simple, plus-que-parfait</p><p><strong>Exemple:</strong> \"Je vais à l'école. J'y vais tous les jours. J'irai demain.\"</p><h3>2. LE CONDITIONNEL</h3><p><strong>Usage:</strong> Hypothèse, condition non réalisée, politesse</p><p><strong>Temps:</strong> Présent, passé</p><p><strong>Exemple:</strong> \"Si tu étudiais, tu réussirais.\" (hypothèse)</p><h3>3. LE SUBJONCTIF</h3><p><strong>Usage:</strong> Doute, volonté, nécessité, sentiment, peur</p><p><strong>Temps:</strong> Présent, passé (rare au présent)</p><p><strong>Exemple:</strong> \"Je veux que tu réussisses.\" (volonté)</p><h3>4. L'IMPÉRATIF</h3><p><strong>Usage:</strong> Ordre, conseil, interdiction</p><p><strong>Formation:</strong> 2e singulier, 1ère pluriel, 2e pluriel (pas de pronoms)</p><ul><li>Parler: parle!, parlons!, parlez!</li><li>Avoir: aie!, ayons!, ayez!</li><li>Être: sois!, soyons!, soyez!</li></ul><p><strong>Exemple:</strong> \"Parle plus fort! Soyons sérieux! Venez ici!\"</p><h3>5. L'INFINITIF</h3><p><strong>Usage:</strong> Forme nominale du verbe, après un auxiliaire ou une préposition</p><p><strong>Exemple:</strong> \"Je veux manger. Après manger, nous irons jouer.\"</p><h3>6. LE PARTICIPE</h3><p><strong>Participe présent:</strong> -ant → parlant, finissant (rare, peu utilisé)</p><p><strong>Participe passé:</strong> parlé, fini, vendu (très utilisé)</p><p><strong>Exemple:</strong> \"Les enfants courant dans le parc sont heureux.\" (participe présent) / \"J'ai mangé une pomme.\" (participe passé)</p>",
      order: 16,
    };

    const conjugation5: Course = {
      id: conjugation5Id,
      title: "Les verbes irréguliers",
      description: "Conjugaison des verbes les plus courants",
      category: "conjugaison",
      content: "<h2>Les Verbes Irréguliers Courants</h2><p>Certains verbes ne suivent pas les règles régulières et doivent être mémorisés.</p><h3>1. ÊTRE</h3><p><strong>Présent:</strong> je suis, tu es, il est, nous sommes, vous êtes, ils sont</p><p><strong>Imparfait:</strong> j'étais, tu étais, il était, nous étions, vous étiez, ils étaient</p><p><strong>Futur:</strong> je serai, tu seras, il sera, nous serons, vous serez, ils seront</p><p><strong>Passé composé:</strong> j'ai été, tu as été, il a été</p><h3>2. AVOIR</h3><p><strong>Présent:</strong> j'ai, tu as, il a, nous avons, vous avez, ils ont</p><p><strong>Imparfait:</strong> j'avais, tu avais, il avait, nous avions, vous aviez, ils avaient</p><p><strong>Futur:</strong> j'aurai, tu auras, il aura, nous aurons, vous aurez, ils auront</p><p><strong>Passé composé:</strong> j'ai eu, tu as eu, il a eu</p><h3>3. ALLER</h3><p><strong>Présent:</strong> je vais, tu vas, il va, nous allons, vous allez, ils vont</p><p><strong>Imparfait:</strong> j'allais, tu allais, il allait, nous allions, vous alliez, ils allaient</p><p><strong>Futur:</strong> j'irai, tu iras, il ira, nous irons, vous irez, ils iront</p><p><strong>Passé composé:</strong> je suis allé, tu es allé (verbe auxiliaire: être)</p><h3>4. POUVOIR</h3><p><strong>Présent:</strong> je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent</p><p><strong>Futur:</strong> je pourrai, tu pourras, il pourra, nous pourrons, vous pourrez, ils pourront</p><p><strong>Conditionnel:</strong> je pourrais, tu pourrais, il pourrait, nous pourrions, vous pourriez, ils pourraient</p><h3>5. VOULOIR</h3><p><strong>Présent:</strong> je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent</p><p><strong>Futur:</strong> je voudrai, tu voudras, il voudra, nous voudrons, vous voudrez, ils voudront</p><p><strong>Conditionnel:</strong> je voudrais, tu voudrais, il voudrait, nous voudrions, vous voudriez, ils voudraient</p><h3>6. DEVOIR</h3><p><strong>Présent:</strong> je dois, tu dois, il doit, nous devons, vous devez, ils doivent</p><p><strong>Futur:</strong> je devrai, tu devras, il devra, nous devrons, vous devrez, ils devront</p><p><strong>Passé composé:</strong> j'ai dû, tu as dû, il a dû</p><h3>7. FAIRE</h3><p><strong>Présent:</strong> je fais, tu fais, il fait, nous faisons, vous faites, ils font</p><p><strong>Imparfait:</strong> je faisais, tu faisais, il faisait, nous faisions, vous faisiez, ils faisaient</p><p><strong>Futur:</strong> je ferai, tu feras, il fera, nous ferons, vous ferez, ils feront</p><p><strong>Passé composé:</strong> j'ai fait, tu as fait, il a fait</p><h3>8. VENIR</h3><p><strong>Présent:</strong> je viens, tu viens, il vient, nous venons, vous venez, ils viennent</p><p><strong>Futur:</strong> je viendrai, tu viendras, il viendra, nous viendrons, vous viendrez, ils viendront</p><p><strong>Passé composé:</strong> je suis venu, tu es venu (verbe auxiliaire: être)</p>",
      order: 17,
    };

    // Add the new courses we'll define below
    const grammar6: Course = {
      id: grammar6Id,
      title: "Les adverbes",
      description: "Manière, temps, lieu, quantité et position des adverbes",
      category: "grammaire",
      content: "<h2>Les Adverbes - Cours Complet</h2><p>Un adverbe est un mot invariable qui modifie un verbe, un adjectif, ou un autre adverbe. Il apporte des précisions sur la façon, le moment, le lieu, ou l'intensité d'une action.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ POINT CLÉS:</strong> Un adverbe ne change jamais de forme! On ajoute généralement \"-ment\" à l'adjectif au féminin pour créer un adverbe.</div><h3>1. LES ADVERBES DE MANIÈRE (Comment?)</h3><p>Ils répondent à la question COMMENT l'action se fait.</p><ul><li><strong>Formation:</strong> Adjectif au féminin + -ment → lente + ment = lentement, heureuse + ment = heureusement</li><li><strong>Exemples:</strong> rapidement, doucement, facilement, correctement, lentement, patiemment, calmement, fortement</li><li><strong>En phrase:</strong> \"Elle parle doucement. Ils travaillent rapidement.\"</li></ul><div style='background: #e0f2fe; border-left: 4px solid #0284c7; padding: 12px; margin: 10px 0; border-radius: 4px;'><strong>💡 ASTUCE:</strong> Si l'adjectif finit par -ent ou -ant, remplacez par -emment ou -amment. Exemples: patient → patiemment, courant → couramment</div><h3>2. LES ADVERBES DE TEMPS (Quand?)</h3><p>Ils indiquent QUAND l'action se passe.</p><ul><li><strong>Exemples:</strong> maintenant, aujourd'hui, hier, demain, bientôt, toujours, jamais, souvent, rarement, enfin</li><li><strong>En phrase:</strong> \"Je suis venu hier. Elle arrive bientôt. Vous mangez toujours ici.\"</li></ul><h3>3. LES ADVERBES DE LIEU (Où?)</h3><p>Ils indiquent OÙ l'action se déroule.</p><ul><li><strong>Exemples:</strong> ici, là, là-bas, partout, nulle part, dessus, dessous, devant, derrière, loin, près</li><li><strong>En phrase:</strong> \"Je le vois ici. Allez là-bas immédiatement. Le chat dort dessus.\"</li></ul><h3>4. LES ADVERBES DE QUANTITÉ (Combien?)</h3><p>Ils répondent à la question COMBIEN.</p><ul><li><strong>Exemples:</strong> beaucoup, peu, très, trop, assez, plus, moins, autant, presque</li><li><strong>En phrase:</strong> \"C'est très bon. J'en veux beaucoup. Elle a presque fini.\"</li></ul><h3>5. POSITION DE L'ADVERBE</h3><ul><li><strong>Après le verbe simple:</strong> \"Il parle rapidement\"</li><li><strong>Entre auxiliaire et participe:</strong> \"Il a bien mangé\"</li><li><strong>Au début pour l'emphase:</strong> \"Rapidement, il a quitté.\"</li></ul><h3>6. ADJECTIF vs ADVERBE</h3><ul><li><strong>Adjectif:</strong> Décrit un NOM → \"Une belle maison\"</li><li><strong>Adverbe:</strong> Décrit un VERBE → \"Elle parle belle-ment\"</li></ul>",
      order: 18,
    };

    const grammar7: Course = {
      id: grammar7Id,
      title: "Les mots de liaison",
      description: "Et, ou, mais, car, donc - connecteurs et conjonctions",
      category: "grammaire",
      content: "<h2>Les Mots de Liaison - Connecteurs et Conjonctions</h2><p>Les mots de liaison relient les idées et créent du flux dans un texte. Ils sont essentiels pour écrire avec clarté et cohérence.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ MOTS DE LIAISON COURANTS:</strong><br>et, ou, mais, car, donc, cependant, pourtant, ensuite, d'abord, finalement</div><h3>1. ADDITION (ET)</h3><ul><li>\"J'aime lire ET j'aime écrire.\"</li><li>Relie deux éléments similaires</li><li>Ajoute une seconde idée</li></ul><h3>2. ALTERNATIVE (OU)</h3><ul><li>\"Tu veux du café OU du thé?\"</li><li>Offre un choix</li><li>Présente une option alternative</li></ul><h3>3. OPPOSITION (MAIS)</h3><ul><li>\"C'est beau MAIS c'est cher.\"</li><li>Contraste avec l'idée précédente</li><li>Marque une restriction</li></ul><h3>4. CAUSE (CAR)</h3><ul><li>\"Je suis fatigué CAR j'ai couru longtemps.\"</li><li>Explique la raison</li><li>Répond à \"pourquoi?\"</li></ul><h3>5. CONSÉQUENCE (DONC)</h3><ul><li>\"Il pleut DONC je prends un parapluie.\"</li><li>Montre l'effet/résultat</li><li>Relie cause → conséquence</li></ul>",
      order: 19,
    };

    const grammar8: Course = {
      id: grammar8Id,
      title: "Phrase simple",
      description: "Structure de base: sujet, verbe, complément",
      category: "grammaire",
      content: "<h2>Phrase Simple - Cours Focalisé</h2><p>Une phrase simple contient UN SEUL VERBE CONJUGUÉ et exprime UNE SEULE ACTION.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ DÉFINITION:</strong><br>PHRASE SIMPLE = 1 verbe conjugué = 1 action<br>Structure: Sujet + Verbe + (Complément)</div><h3>1. EXEMPLES DE PHRASES SIMPLES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Je cours.\"</strong> = sujet + verbe<br><strong>\"Elle mange une pomme.\"</strong> = sujet + verbe + COD<br><strong>\"Les enfants jouent au parc.\"</strong> = sujet + verbe + complément de lieu<br><strong>\"Tu étudies les mathématiques.\"</strong> = sujet + verbe + COD</div><h3>2. TYPES DE PHRASES SIMPLES</h3><ul><li><strong>AFFIRMATIVE:</strong> \"Le chat dort.\"</li><li><strong>NÉGATIVE:</strong> \"Le chat ne dort pas.\"</li><li><strong>INTERROGATIVE:</strong> \"Dors-tu?\"</li><li><strong>EXCLAMATIVE:</strong> \"Quel beau jour!\"</li></ul><h3>3. CLUE: UN SEUL VERBE!</h3><ul><li>✓ \"Elle étudie.\" = 1 verbe = SIMPLE</li><li>✗ \"Elle étudie et dessine.\" = 2 verbes = COMPLEXE</li></ul>",
      order: 20,
    };

    const grammar9: Course = {
      id: grammar9Id,
      title: "Phrase complexe",
      description: "Coordination et subordination - relier plusieurs propositions",
      category: "grammaire",
      content: "<h2>Phrase Complexe - Coordination et Subordination</h2><p>Une phrase complexe contient PLUSIEURS VERBES CONJUGUÉS reliés par des mots de liaison.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ DÉFINITION:</strong><br>PHRASE COMPLEXE = 2+ verbes = 2+ propositions reliées</div><h3>1. COORDINATION (Propositions ÉGALES)</h3><p><strong>Mots de liaison:</strong> et, ou, mais, car, donc</p><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Il étudie ET il réussit bien.\"</strong><br>• 2 verbes: étudie, réussit<br>• 2 propositions indépendantes<br>• Liées par AND</div><h3>2. SUBORDINATION (Propositions HIÉRARCHIQUES)</h3><p><strong>Mots de liaison:</strong> que, qui, où, si, parce que, pour que</p><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Je suis heureux PARCE QUE tu es venu.\"</strong><br>• Proposition principale: \"Je suis heureux\"<br>• Proposition subordonnée: \"PARCE QUE tu es venu\"<br>• Une dépend de l'autre</div><h3>3. TYPES DE PROPOSITIONS</h3><ul><li><strong>RELATIVE:</strong> \"L'enfant QUI court est mon ami.\"</li><li><strong>CONJONCTIVE:</strong> \"Je crois QUE tu as raison.\"</li><li><strong>CONDITION:</strong> \"SI tu viens, on joue.\"</li><li><strong>CAUSE:</strong> \"Elle étudie PARCE QU'elle aime apprendre.\"</li></ul>",
      order: 21,
    };

    const orthography6: Course = {
      id: orthography6Id,
      title: "Homophones courants",
      description: "A/à, ou/où, son/sont, ce/se, mes/mais",
      category: "orthographe",
      content: "<h2>Homophones Courants - Les Plus Importants</h2><p>Les homophones se prononcent pareils mais s'écrivent différemment. Voici les 5 plus courants et les plus problématiques!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ LES 5 HOMOPHONES À RETENIR:</strong> a/à, ou/où, son/sont, ce/se, mes/mais</div><h3>1. A vs À</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>A = VERBE avoir</strong> → \"Il a un chat.\" (Il avait... = correct!)<br><strong>À = PRÉPOSITION</strong> → \"Je vais à l'école.\" (Je vais avait? = NON!)</div><h3>2. OU vs OÙ</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>OU = CHOIX</strong> → \"Café ou thé?\" (ou bien)<br><strong>OÙ = LIEU</strong> → \"Où vas-tu?\" (quel endroit)</div><h3>3. SON vs SONT</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>SON = POSSESSIF</strong> → \"Son école est grande.\" (l'école à lui)<br><strong>SONT = VERBE être</strong> → \"Ils sont heureux.\" (ils étaient... = correct!)</div><h3>4. CE vs SE</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>CE = DÉMONSTRATIF</strong> → \"Ce livre est bon.\" (ceci/cela)<br><strong>SE = RÉFLÉCHI</strong> → \"Il se lave.\" (à soi-même)</div><h3>5. MES vs MAIS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>MES = POSSESSIF pluriel</strong> → \"Mes livres sont ici.\" (à moi)<br><strong>MAIS = OPPOSITION</strong> → \"C'est beau mais cher.\" (cependant)</div>",
      order: 22,
    };

    const orthography7: Course = {
      id: orthography7Id,
      title: "Autres homophones",
      description: "Cher/chère, vers/vert, pair/père/paire, court/cour, tache/tâche",
      category: "orthographe",
      content: "<h2>Autres Homophones Importants</h2><p>Voici d'autres homophones courrants à bien distinguer.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ AUTRES HOMOPHONES CLÉS:</strong> cher/chère, vers/vert/verre, pair/père/paire, court/cour, tache/tâche</div><h3>1. CHER / CHÈRE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>CHER</strong> = cher (coûteux) \"Cette montre est chère.\"<br><strong>CHÈRE</strong> = chère (affection) \"Ma chère amie...\"<br>(Note: Même sens, mais forme change avec genre)</div><h3>2. VERS / VERT / VERRE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>VERS</strong> = direction → \"Je vais vers l'école.\"<br><strong>VERT</strong> = couleur → \"Le crayon est vert.\"<br><strong>VERRE</strong> = matière → \"Un verre d'eau.\"</div><h3>3. PAIR / PÈRE / PAIRE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>PAIR</strong> = nombre pair → \"4 est pair.\" (divisible par 2)<br><strong>PÈRE</strong> = papa → \"Mon père s'appelle Jean.\"<br><strong>PAIRE</strong> = deux choses → \"Une paire de chaussures.\"</div><h3>4. COURT / COUR</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>COURT</strong> = court (pas long) → \"C'est un court film.\"<br><strong>COUR</strong> = cour d'école → \"Les enfants jouent dans la cour.\"</div><h3>5. TACHE / TÂCHE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>TACHE</strong> = salissure → \"Une tache de café.\"<br><strong>TÂCHE</strong> = travail/devoir → \"C'est une difficile tâche.\" (avec accent!)</div>",
      order: 23,
    };

    const punctuation1: Course = {
      id: punctuation1Id,
      title: "Signes basiques de ponctuation",
      description: "Point, virgule, point d'interrogation, point d'exclamation",
      category: "ponctuation",
      content: "<h2>Signes Basiques de Ponctuation</h2><p>Les 4 signes les plus importants et les plus utilisés en français.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE EN FRANÇAIS:</strong> ESPACE AVANT les signes doubles (: ; ! ?)<br>CORRECT: \"Quel âge as-tu ?\" | INCORRECT: \"Quel âge as-tu?\"</div><h3>1. LE POINT (.)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Termine une phrase simple ou affirmative</strong><br>• \"Je vais à l'école.\"<br>• \"Elle aime lire.\"<br>• \"C'est magnifique.\"</div><h3>2. LA VIRGULE (,)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Énumération (liste)</strong><br>• \"Du pain, du lait et des œufs\" (pas de virgule avant \"et\")<br><strong>Propositions</strong><br>• \"Si tu étudies, tu réussiras\"<br><strong>⚠️ PAS de virgule entre sujet et verbe!</strong><br>✗ INCORRECT: \"L'enfant, court rapidement.\"<br>✓ CORRECT: \"L'enfant court rapidement.\"</div><h3>3. LE POINT D'INTERROGATION (?)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Termine une question</strong><br>• \"Quel âge as-tu ?\" (espace avant!)<br>• \"Tu viens demain ?\"<br>• \"Où habites-tu ?\"</div><h3>4. LE POINT D'EXCLAMATION (!)</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Exprime une émotion (surprise, ordre, admiration)</strong><br>• \"Quel beau jour !\" (espace avant!)<br>• \"Arrête !\"<br>• \"J'adore ce film !\"</div>",
      order: 24,
    };

    const punctuation2: Course = {
      id: punctuation2Id,
      title: "Signes avancés",
      description: "Tirets, guillemets, parenthèses, crochets, apostrophe",
      category: "ponctuation",
      content: "<h2>Signes Avancés de Ponctuation</h2><p>Signes plus sophistiqués pour enrichir votre texte.</p><h3>1. LE TIRET LONG (–)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Dialogue:</strong> \"– Bonjour! dit Marie.\"<br><strong>Insertion:</strong> \"Je vais au parc – mon endroit préféré – demain.\"<br>(Espaces avant et après!)</div><h3>2. LES GUILLEMETS (« »)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Utilisez les guillemets français!</strong><br>✓ CORRECT: « Bonjour! »<br>✗ INCORRECT: \"Bonjour!\" (anglais)<br>(Espaces à l'intérieur!)</div><h3>3. LES PARENTHÈSES ( )</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Information supplémentaire:</strong><br>• \"La France (pays d'Europe) est magnifique.\"<br>• \"Je vais à Paris (ma ville préférée) demain.\"</div><h3>4. LES CROCHETS [ ]</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Intervention dans une citation:</strong><br>• \"Il [l'auteur] a écrit ce livre en 1960.\"</div><h3>5. L'APOSTROPHE (')</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Élision (suppression d'une voyelle):</strong><br>• \"L'école\" (la + école)<br>• \"C'est\" (ce + est)<br>• \"D'où\" (de + où)</div>",
      order: 25,
    };

    const punctuation3: Course = {
      id: punctuation3Id,
      title: "Espaces et dialogue français",
      description: "Règles d'espacement, dialogue, ponctuation avancée",
      category: "ponctuation",
      content: "<h2>Espaces et Dialogue Français</h2><p>Les règles spécifiques au français pour un texte professionnel et élégant.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES FRANÇAISES FONDAMENTALES:</strong><br>Espace AVANT les signes doubles : ; ! ?<br>PAS d'espace avant les signes simples . , '</div><h3>1. TABLEAU DES ESPACEMENTS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>. , -</strong> = NON avant<br><strong>: ; ! ?</strong> = OUI avant<br><strong>' - (trait d'union)</strong> = NON des deux côtés<br><strong>– (tiret long)</strong> = OUI des deux côtés</div><h3>2. LE DIALOGUE FRANÇAIS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Format correct:</strong><br>– Bonjour ! dit Marie.<br>– Ça va ? demanda Jean.<br>– Oui, très bien ! répondit-elle.</div><h3>3. ÉNUMÉRATION AVEC POINTS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Format lisible:</strong><br>Vous avez besoin de :<br>• Crayon<br>• Papier<br>• Règle</div>",
      order: 26,
    };

    const conjugation7: Course = {
      id: conjugation7Id,
      title: "Temps composés avancés",
      description: "Conditionnel passé, subjonctif passé, passé/futur immédiat",
      category: "conjugaison",
      content: "<h2>Temps Composés Avancés</h2><p>Les temps plus complexes pour l'hypothèse, l'incertitude, et l'immédiateté.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ TEMPS AVANCÉS:</strong><br>Conditionnel passé, subjonctif passé, passé/futur immédiat</div><h3>1. CONDITIONNEL PASSÉ</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Conditionnel d'avoir/être + Participe Passé<br><strong>Exemple:</strong> \"J'aurais aimé venir.\"<br><strong>Usages:</strong><br>• REGRET: \"Si j'avais étudié, j'aurais réussi.\"<br>• HYPOTHÈSE: \"Sans accident, ils auraient arrivé à temps.\"<br>• REPROCHE: \"Tu aurais dû m'appeler!\"</div><h3>2. SUBJONCTIF PASSÉ (rare)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Subjonctif d'avoir/être + Participe Passé<br><strong>Exemple:</strong> \"Je doute qu'il ait fini.\"<br><strong>Usage:</strong> Après expressions qui demandent le subjonctif</div><h3>3. PASSÉ RÉCENT (Venir de + infinitif)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Exemple:</strong> \"Je viens de manger.\" (très récent!)<br><strong>Autre:</strong> \"Il vient d'arriver.\"<br><strong>Usage:</strong> Action qui vient de se produire (immédiateté)</div><h3>4. FUTUR IMMÉDIAT (Aller + infinitif)</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Exemple:</strong> \"Je vais manger maintenant.\"<br><strong>Autre:</strong> \"Nous allons partir demain.\"<br><strong>Usage:</strong> Action très proche dans le futur</div>",
      order: 27,
    };

    const conjugation6: Course = {
      id: conjugation6Id,
      title: "Les temps composés",
      description: "Plus-que-parfait, passé antérieur, et autres temps composés",
      category: "conjugaison",
      content: "<h2>Les Temps Composés de la Conjugaison - Cours Complet</h2><p>Les temps composés sont formés avec un auxiliaire (avoir ou être) + un participe passé. Ils expriment des actions complètes ou la relation temporelle entre deux actions différentes.</p><div style='background: #dbeafe; border-left: 4px solid #0284c7; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>FORMULE:</strong> Auxiliaire (avoir/être) + Participe Passé = Temps Composé<br>Exemples: j'ai mangé (passé composé), j'avais mangé (plus-que-parfait)</div><h3>1. LE PLUS-QUE-PARFAIT</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Imparfait d'avoir/être + Participe Passé<br><strong>Verbes avec AVOIR:</strong> j'avais parlé, tu avais fini, il avait vendu<br><strong>Verbes avec ÊTRE:</strong> j'étais allé(e), tu étais arrivé(e), elles étaient venues<br><strong>Usage:</strong> Action passée qui s'est produite AVANT une autre action passée (antériorité)<br><strong>Exemples:</strong><br>• \"Quand je suis arrivé, il avait déjà fini ses devoirs.\" (Il a fini AVANT que j'arrive)<br>• \"Elle s'était lavée avant de partir.\" (Elle s'est lavée, PUIS elle est partie)<br>• \"Les enfants avaient joué toute la journée quand leurs parents rentrèrent.\" (jouté AVANT le retour)</div><h3>2. LE PASSÉ ANTÉRIEUR</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Passé Simple d'avoir/être + Participe Passé<br><strong>Usage:</strong> Temps littéraire (littérature ancienne). Action passée immédiatement avant une autre action passée au passé simple<br><strong>Exemples (littéraires):</strong><br>• \"Quand il eut terminé sa lettre, il sortit.\"<br>• \"Dès qu'elle fut arrivée, le concert commença.\"<br>• \"Après qu'ils eurent diné, ils s'en allèrent.\"<br><strong>⚠️ NOTE:</strong> Ce temps est TRÈS RARE en français moderne! On utilise plutôt le passé composé ou le plus-que-parfait. Il apparaît surtout dans les romans classiques.</div><h3>3. LE FUTUR ANTÉRIEUR</h3><div style='background: #fef3c7; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Futur d'avoir/être + Participe Passé<br><strong>Verbes avec AVOIR:</strong> j'aurai parlé, tu auras fini, il aura vendu<br><strong>Verbes avec ÊTRE:</strong> je serai allé(e), tu seras arrivé(e), elles seront venues<br><strong>Usage:</strong> Action future qui sera terminée AVANT une autre action future<br><strong>Exemples:</strong><br>• \"Quand tu arriveras, j'aurai déjà mangé.\" (Je mangerai avant que tu arrives)<br>• \"Elle aura fini son travail avant 18h.\" (Elle va terminer avant 18h)<br>• \"Vous aurez étudié toute la semaine avant l'examen.\" (étude avant l'examen)</div><h3>4. LE CONDITIONNEL PASSÉ</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Conditionnel d'avoir/être + Participe Passé<br><strong>Verbes avec AVOIR:</strong> j'aurais parlé, tu aurais fini, il aurait vendu<br><strong>Verbes avec ÊTRE:</strong> je serais allé(e), tu serais arrivé(e), elle serait venue<br><strong>Usages:</strong><br>1. Exprimer un REGRET: \"Si j'avais étudié, j'aurais réussi l'examen.\" (désolé de ne pas avoir étudié)<br>2. Exprimer une HYPOTHÈSE NON RÉALISÉE: \"Sans accident, ils auraient arrivés à temps.\" (hypothèse irréelle)<br>3. Exprimer une REPROCHE: \"Tu aurais dû m'appeler!\" (tu devais m'appeler mais tu ne l'as pas fait)<br><strong>Exemples:</strong><br>• \"J'aurais aimé venir à ta fête.\" (je n'ai pas pu venir)<br>• \"Ils auraient gagné s'ils avaient joué mieux.\" (hypothèse)</div><h3>5. LE SUBJONCTIF PASSÉ</h3><div style='background: #e0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Subjonctif d'avoir/être + Participe Passé<br><strong>Usage:</strong> Rare. Après expressions qui demandent le subjonctif quand l'action est passée<br><strong>Exemples:</strong><br>• \"Je doute qu'il ait fini son travail.\" (Je doute qu'il l'ait terminé)<br>• \"Je suis content qu'elle soit venue.\" (Je suis content qu'elle ait participé)<br>• \"Il faut qu'ils aient étudié avant l'examen.\" (Ils doivent avoir étudié)</div><h3>6. LE PASSÉ RÉCENT (Venir de + infinitif)</h3><div style='background: #f9fafb; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Venir (au présent) + de + Infinitif<br><strong>Usage:</strong> Action qui vient de se produire (passé immédiat)<br><strong>Exemples:</strong><br>• \"Je viens de manger.\" (Je viens de terminer mon repas - très récent!)<br>• \"Il vient d'arriver.\" (Il vient juste d'arriver)<br>• \"Nous venons de terminer le projet.\" (On vient de finir)</div><h3>7. LE FUTUR IMMÉDIAT (Aller + infinitif)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formation:</strong> Aller (au présent) + Infinitif<br><strong>Usage:</strong> Action très proche dans l'avenir (futur immédiat)<br><strong>Exemples:</strong><br>• \"Je vais manger maintenant.\" (C'est immédiat)<br>• \"Nous allons partir demain.\" (Très bientôt)<br>• \"Elle va arriver dans cinq minutes.\" (Très proche)<br><strong>Note:</strong> Ce n'est pas un temps composé traditionnel, mais c'est un temps fréquemment utilisé!</div><h3>8. TABLEAU RÉCAPITULATIF</h3><div style='background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>ORDRE CHRONOLOGIQUE:</strong><br>Passé très lointain → Plus-que-parfait: \"J'avais mangé\"<br>Passé proche → Passé composé: \"J'ai mangé\"<br>Passé immédiat → Passé récent: \"Je viens de manger\"<br>MAINTENANT<br>Futur immédiat → Futur proche: \"Je vais manger\"<br>Futur proche → Futur simple: \"Je mangerai\"<br>Futur lointain → Futur antérieur (avant): \"J'aurai mangé\"</div>",
      order: 23,
    };

    const grammar10: Course = {
      id: grammar10Id,
      title: "Genres et classes de noms",
      description: "Identifier le genre (masculin/féminin) et les catégories de noms",
      category: "grammaire",
      content: "<h2>Genres et Classes de Noms</h2><p>Chaque nom français est soit MASCULIN soit FÉMININ. Reconnaître le genre est essentiel pour accorder les adjectifs et articles.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ LES ARTICLES INDIQUENT LE GENRE:</strong><br>UN (masculin), UNE (féminin)<br>LE (masculin), LA (féminin)</div><h3>1. NOMS GÉNÉRALEMENT MASCULINS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Terminaisons -ment:</strong> un jugement, un vêtement<br><strong>Terminaisons -eau:</strong> un château, un bureau<br><strong>Terminaisons -tion (certains):</strong> un action (exception)<br><strong>Exemples courants:</strong> un arbre, un chat, un professeur, un jour, un ami</div><h3>2. NOMS GÉNÉRALEMENT FÉMININS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Terminaisons -tion:</strong> une action, une condition<br><strong>Terminaisons -sion:</strong> une décision, une permission<br><strong>Terminaisons -ée:</strong> une journée, une année<br><strong>Exemples courants:</strong> une table, une maison, une fille, une leçon, une école</div><h3>3. PIÈGES: DEUX GENRES POSSIBLES</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Certains mots changent de sens selon le genre:</strong><br>• un poste (emploi) vs une poste (courrier)<br>• un livre (objet) vs une livre (monnaie anglaise)<br>• un tour (action) vs une tour (bâtiment)</div>",
      order: 28,
    };

    const orthography8: Course = {
      id: orthography8Id,
      title: "Pluriels spéciaux",
      description: "Mots en -al, -eau, -au, -ail et leurs pluriels irréguliers",
      category: "orthographe",
      content: "<h2>Pluriels Spéciaux - Cas Particuliers</h2><p>La plupart des noms ajoutent -s au pluriel, mais certains suivent des règles spéciales!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES SPÉCIALES:</strong><br>-al → -aux (généralement)<br>-eau, -au, -eu → -x<br>-ail → -ails ou -aux</div><h3>1. MOTS EN -AL → -AUX</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Un cheval → Des chevaux</strong><br><strong>Un animal → Des animaux</strong><br><strong>Un journal → Des journaux</strong><br><strong>Exceptions:</strong> bal → bals, festival → festivals</div><h3>2. MOTS EN -EAU, -AU, -EU → -X</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Un château → Des châteaux</strong><br><strong>Un bureau → Des bureaux</strong><br><strong>Un jeu → Des jeux</strong><br><strong>Un lieu → Des lieux</strong></div><h3>3. MOTS EN -AIL</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Généralement -ails:</strong><br>• un détail → des détails<br>• un travail → des travaux (exception!)<br>• un vitrail → des vitraux (exception!)</div>",
      order: 31,
    };

    const orthography10: Course = {
      id: orthography10Id,
      title: "Mots invariables et exceptions",
      description: "Adjectifs invariables, adverbes, et exceptions à connaître",
      category: "orthographe",
      content: "<h2>Mots Invariables et Exceptions</h2><p>Certains mots ne changent JAMAIS de forme, peu importe le contexte.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ MOTS INVARIABLES:</strong><br>Adjectifs de couleur: marron, orange, rose, gris<br>Adverbes: très, très, bien, beaucoup, toujours</div><h3>1. ADJECTIFS DE COULEUR INVARIABLES</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>NE changent JAMAIS:</strong><br>• marron: une voiture marron, des voitures marron<br>• orange: un crayon orange, des crayons orange<br>• rose: une robe rose, des robes rose<br>• gris: un chat gris, des chats gris<br>• turquoise, chocolat, cerise...</div><h3>2. ADVERBES INVARIABLES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>NE changent JAMAIS:</strong><br>• très, beaucoup, peu, assez, trop<br>• bien, mal, mieux<br>• toujours, jamais, souvent<br>• \"C'est très important.\" pas \"très importante\"</div><h3>3. EXCEPTIONS À CONNAÎTRE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Couleurs composées:</strong> bleu ciel (invariable!)<br><strong>Noms utilisés comme couleurs:</strong> des robes bleu (invariable!)<br><strong>Chiffres:</strong> «vingts» s'accorde dans \"quatre-vingts\" mais pas dans \"quatre-vingt-trois\"</div>",
      order: 33,
    };

    const conjugation8: Course = {
      id: conjugation8Id,
      title: "Le subjonctif présent",
      description: "Formation et utilisation du subjonctif (douter, vouloir, pouvoir)",
      category: "conjugaison",
      content: "<h2>Le Subjonctif Présent - Formation et Utilisation</h2><p>Le subjonctif exprime le doute, l'incertitude, l'émotion, ou la volonté. C'est un mode important en français!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ UTILISATION:</strong><br>Après: Je veux que, Je doute que, Il est important que, Pourvu que</div><h3>1. FORMATION DU SUBJONCTIF</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Racine: 3e personne pluriel du présent</strong><br>\"Ils parlent\" → que je PARLE, que tu PARLES, qu'il PARLE<br>\"Ils finissent\" → que je FINISSE, que tu FINISSES</div><h3>2. CONJUGAISON: \"PARLER\"</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Que je parle</strong><br><strong>Que tu parles</strong><br><strong>Qu'il parle</strong><br><strong>Que nous parlions</strong><br><strong>Que vous parliez</strong><br><strong>Qu'ils parlent</strong></div><h3>3. QUAND L'UTILISER</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Après \"je veux que\":</strong> Je veux que tu étudies. (volonté)<br><strong>Après \"je doute que\":</strong> Je doute qu'il vienne. (doute)<br><strong>Après \"il faut que\":</strong> Il faut que tu t'en ailles. (nécessité)<br><strong>Après \"pourvu que\":</strong> Pourvu qu'il fasse beau ! (souhait)</div>",
      order: 34,
    };

    const conjugation9: Course = {
      id: conjugation9Id,
      title: "L'imparfait",
      description: "Formation et différences avec passé composé",
      category: "conjugaison",
      content: "<h2>L'Imparfait - Le Temps du Passé Descriptif</h2><p>L'imparfait décrit le passé: habitudes, descriptions, états. C'est un temps très courant!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ FORMATION:</strong> Nous + présent - ons + terminaison<br>Nous parlons → je parlAIS, tu parlAIS, il parlAIT</div><h3>1. CONJUGAISON: \"PARLER\"</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Je parlais</strong><br><strong>Tu parlais</strong><br><strong>Il parlait</strong><br><strong>Nous parlions</strong><br><strong>Vous parliez</strong><br><strong>Ils parlaient</strong></div><h3>2. UTILISATIONS</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Habitude passée:</strong> \"Je mangeais toujours du pain.\" (régulier)<br><strong>Description:</strong> \"C'était un beau jour.\" (état)<br><strong>Action longue interrompue:</strong> \"Je lisais quand tu es arrivé.\" (longue action)</div><h3>3. IMPARFAIT vs PASSÉ COMPOSÉ</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Imparfait = description/habitude:</strong> \"Je mangeais.\" (régulièrement)<br><strong>Passé composé = action unique/complète:</strong> \"J'ai mangé.\" (une fois, terminé)</div>",
      order: 35,
    };

    const punctuation4: Course = {
      id: punctuation4Id,
      title: "Tirets et pointillés avancés",
      description: "Utilisations avancées des tirets, pointillés, tirets d'union",
      category: "ponctuation",
      content: "<h2>Tirets et Pointillés Avancés</h2><p>Maîtrisez l'utilisation stylistique des tirets et pointillés pour enrichir votre texte.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ TROIS TIRETS:</strong><br>- Trait d'union: sans espace (arc-en-ciel)<br>– Tiret court: avec espace (insertion)<br>— Tiret long: dialogues</div><h3>1. TIRET D'UNION (-)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Relie deux mots:</strong><br>• \"Arc-en-ciel\" (liaison)<br>• \"Peut-être\" (adverbes)<br>• \"Quatre-vingt-dix\" (nombres)<br>• \"Garde-manger\" (noms composés)</div><h3>2. TIRET COURT (–)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Insertion ou énumération:</strong><br>\"La maison – mon endroit préféré – était magnifique.\"<br>\"Les fruits que j'aime – pommes, poires, cerises – sont délicieux.\"<br>(Espaces avant et après!)</div><h3>3. POINTILLÉS (...)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Suspension ou énumération ouverte:</strong><br>\"Elle a ouvert la porte et a vu...\"<br>\"Les pays européens: France, Allemagne, Italie...\"<br>(Sans espace avant, espace après)</div>",
      order: 36,
    };

    const punctuation5: Course = {
      id: punctuation5Id,
      title: "Virgules dans propositions complexes",
      description: "Où placer virgules dans phrases complexes avec propositions",
      category: "ponctuation",
      content: "<h2>Virgules dans Propositions Complexes</h2><p>La virgule est essentielle pour clarifier les relations entre propositions.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLE:</strong> Virgule avant \"et\", \"mais\", \"car\" si propositions longues<br>Pas de virgule si propositions courtes</div><h3>1. PROPOSITIONS AVEC \"ET\", \"MAIS\", \"CAR\"</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Propositions courtes, pas de virgule:</strong><br>\"Je suis venu et tu étais absent.\"<br><strong>Propositions longues, virgule recommandée:</strong><br>\"Je suis venu de très loin avec mon ami, et tu n'étais pas là.\"</div><h3>2. PROPOSITIONS SUBORDONNÉES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Relative restrictive (pas de virgule):</strong><br>\"L'enfant qui court est mon ami.\" (essentielle)<br><strong>Relative explicative (avec virgules):</strong><br>\"Mon frère, qui habite à Paris, est médecin.\" (extra)</div><h3>3. DÉBUT DE PHRASE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Virgule après adverbe ou expression:</strong><br>\"Heureusement, il a réussi.\"<br>\"D'abord, on lit le texte ; ensuite, on répond.\"</div>",
      order: 37,
    };

    const reading5: Course = {
      id: reading5Id,
      title: "Vocabulaire en contexte",
      description: "Deviner le sens des mots inconnus à partir du contexte",
      category: "lecture_reading",
      content: "<h2>Vocabulaire en Contexte - Comprendre les Mots Inconnus</h2><p>Quand tu rencontres un mot inconnu, cherche des indices dans la phrase!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRATÉGIES:</strong><br>Mots similaires (famille), éléments autour, logique du texte</div><h3>1. RESSEMBLANCE AVEC D'AUTRES MOTS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Elle est dans une situation désespérée.\"</strong><br>→ \"Désespérée\" contient \"espoir\" → contraire → sans espoir<br><strong>\"Une personne généreuse donne beaucoup.\"</strong><br>→ \"Généreuse\" ressemble à \"générosité\" → concept donner</div><h3>2. INDICES DANS LA PHRASE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Il saurait d'énormes gâteaux chaque jour\" (manger?)</strong><br>→ Contexte: gâteaux, chaque jour → sens: manger beaucoup<br><strong>\"Elle était furieuse, elle criait et tapait du pied.\"</strong><br>→ Furieuse = description par les actions → en colère</div><h3>3. SYNONYMES OU EXPLICATIONS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Un flambeau (torche) éclairait la nuit.\"</strong><br>→ \"Torche\" explique \"flambeau\"<br><strong>\"C'était une époque prospère, une période de richesse.\"</strong><br>→ \"Richesse\" explique \"prospère\"</div>",
      order: 38,
    };

    const reading6: Course = {
      id: reading6Id,
      title: "Compréhension écrite",
      description: "Identifier l'information principale et les détails secondaires",
      category: "lecture_reading",
      content: "<h2>Compréhension Écrite - Distinguer Principal et Secondaire</h2><p>Lire c'est comprendre! Savoir ce qui est IMPORTANT et ce qui est DÉTAIL.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ QUESTIONS À SE POSER:</strong><br>Qui? Quoi? Où? Quand? Pourquoi? Comment?</div><h3>1. L'IDÉE PRINCIPALE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Résume le texte en UNE phrase:</strong><br>\"Marie a acheté un vélo bleu le samedi 15 mars à 14h chez le commerçant Pierre.\"<br>→ PRINCIPALE: Marie a acheté un vélo<br>→ DÉTAILS: bleu, le 15 mars, chez Pierre</div><h3>2. DÉTAILS IMPORTANTS vs ANECDOTES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Important:</strong> \"Il y a eu un tremblement de terre.\"<br><strong>Anecdote:</strong> \"La maison était bleue avec des volets blancs.\"<br>(Sauf si la couleur est importante pour l'histoire!)</div><h3>3. CAUSE ET CONSÉQUENCE</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Cherche les liens logiques:</strong><br>\"Parce qu'il pleuvait, elle n'est pas sortie.\"<br>→ CAUSE: la pluie<br>→ CONSÉQUENCE: elle reste dedans</div>",
      order: 39,
    };

    const reading7: Course = {
      id: reading7Id,
      title: "Questions de compréhension",
      description: "Techniques pour répondre correctement aux questions sur un texte",
      category: "lecture_reading",
      content: "<h2>Questions de Compréhension - Techniques pour Bien Répondre</h2><p>Voici comment répondre correctement à chaque type de question.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ TYPES DE QUESTIONS:</strong><br>Qui? Quoi? Où? Quand? Pourquoi? Comment? Vrai/Faux?</div><h3>1. QUESTIONS \"OUI/NON\" OU \"VRAI/FAUX\"</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Marie est-elle allée à l'école?\"</strong><br>→ Cherche \"Marie\", \"école\", \"aller\" dans le texte<br>→ Réponds oui ou non avec la preuve du texte</div><h3>2. QUESTIONS \"QUOI\" OU \"QUI\"</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Que fait le chat?\"</strong><br>→ Cherche \"chat\" + action dans le texte<br>→ Réponds avec l'action (ex: \"Il dort\")</div><h3>3. QUESTIONS \"POURQUOI\"</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>\"Pourquoi Jean n'est-il pas venu?\"</strong><br>→ Cherche \"parce que\", \"car\", \"donc\" autour de Jean<br>→ Réponds avec la raison (ex: \"Parce qu'il était malade\")</div>",
      order: 40,
    };

    const reading8: Course = {
      id: reading8Id,
      title: "Analyse de texte",
      description: "Identifier thème, messages, personnages, et intentions de l'auteur",
      category: "lecture_reading",
      content: "<h2>Analyse de Texte - Au-Delà de la Compréhension</h2><p>Lire c'est aussi comprendre la SIGNIFICATION profonde d'un texte.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ ÉLÉMENTS À ANALYSER:</strong><br>Thème, personnages, messages, intentions, style</div><h3>1. LE THÈME</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>De quoi parle vraiment le texte?</strong><br>\"Une fille travaille dur pour réussir l'école.\"<br>→ THÈME: le travail mène au succès<br>→ VALEUR: importance de l'effort</div><h3>2. PERSONNAGES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Qui est le personnage principal?</strong><br><strong>Quelles sont ses qualités?</strong> Courageux? Paresseux? Gentil?<br><strong>Comment change-t-il?</strong> Au début vs à la fin?</div><h3>3. MESSAGE DE L'AUTEUR</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Que veut dire l'auteur?</strong><br>\"Si tu es gentil avec les autres, ils seront gentils avec toi.\"<br>→ MESSAGE: la gentillesse est réciproque<br>→ MORALE: traite les autres comme tu veux être traité</div>",
      order: 41,
    };

    const writing1: Course = {
      id: writing1Id,
      title: "Écrire une description vivante",
      description: "Techniques pour écrire des descriptions enrichies avec détails sensoriels",
      category: "ecriture",
      content: "<h2>Écrire une Description Vivante</h2><p>Une bonne description fait VOIR, SENTIR et VIVRE les choses au lecteur. Elle n'est pas juste une liste de faits, mais une expérience sensorielle!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ CLÉS:</strong><br>Utiliser les 5 sens: vue, son, odeur, goût, toucher<br>Ajouter des comparaisons et métaphores<br>Utiliser des adjectifs précis et expressifs</div><h3>1. LES CINQ SENS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Vue:</strong> couleurs, formes, lumière, ombres<br>\"Le soleil orange s'enfonce dans l'horizon rose\"<br><strong>Son:</strong> bruits, musiques, silence<br>\"On entendait le doux murmure des vagues\"<br><strong>Odeur:</strong> parfums, senteurs<br>\"Une odeur délicieuse de pain frais sortait du four\"<br><strong>Goût:</strong> saveurs<br>\"Le gâteau avait un goût sucré et vanillé\"<br><strong>Toucher:</strong> textures, températures<br>\"La fourrure du chat était douce et chaude\"</div><h3>2. COMPARAISONS ET MÉTAPHORES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Comparaison:</strong> \"comme\", \"semblable à\"<br>\"Ses cheveux étaient blonds comme du blé mûr\"<br><strong>Métaphore:</strong> dire que c'EST, sans \"comme\"<br>\"Ses yeux étaient des diamants qui brillaient\"<br>\"Le soleil était une boule de feu\"</div><h3>3. ADJECTIFS PRÉCIS vs VAGUES</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Vague:</strong> \"La maison était belle\"<br><strong>Vivant:</strong> \"La maison blanche aux volets bleu ciel était majestueuse avec son jardin débordant de roses\"<br><strong>Vague:</strong> \"L'enfant était heureux\"<br><strong>Vivant:</strong> \"L'enfant rayonnait de joie, son sourire illuminait tout son visage\"</div><h3>4. EXEMPLE COMPLET</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Mauvais:</strong> \"C'était un beau jardin avec des fleurs\"<br><strong>Excellent:</strong> \"Le jardin était un paradis miniature. Des roses rouges, cramoisies et écarlates grimpaient sur les murs de pierre. Des papillons aux ailes dorées volaient de fleur en fleur. On sentait le parfum sucré des roses mélangé à celui du jasmin. Le sol était doux et frais sous les pieds nus.\"</div>",
      order: 42,
    };

    const writing2: Course = {
      id: writing2Id,
      title: "Écrire un dialogue",
      description: "Format correct et techniques pour écrire des dialogues naturels et réalistes",
      category: "ecriture",
      content: "<h2>Écrire un Dialogue - Format et Techniques</h2><p>Un dialogue bien écrit rend une histoire vivante! Il faut respecter le format ET faire parler les personnages de manière réaliste et naturelle.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES FORMAT FRANÇAIS:</strong><br>Tiret (—) au début de chaque réplique<br>Chaque changement de personne = nouvelle ligne<br>Point, virgule AVANT les guillemets fermants</div><h3>1. FORMAT FRANÇAIS DU DIALOGUE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Correct en français:</strong><br>— Bonjour Marie, comment vas-tu?<br>— Très bien, merci! Et toi?<br>— Je vais très bien aussi. Tu viens au parc?<br><strong>Avec verbes de parole:</strong><br>— Pourquoi ne viens-tu pas? demanda Jean.<br>— Je suis trop occupée, répondit Marie tristement.<br>— C'est dommage, soupira Jean.</div><h3>2. LES VERBES DE PAROLE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Varié:</strong> dit, répond, demande, cria, chuchota, expliqua, déclara, s'exclama, soupira, murmura, avoua, confessa<br><strong>Au lieu de toujours \"dit\":</strong><br>\"La mère cria: — Venez manger!\"<br>\"Il chuchota: — J'ai peur\"<br>\"Elle expliqua: — Voilà comment faire\"</div><h3>3. FAIRE PARLER NATURELLEMENT</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Chaque personnage a une voix:</strong><br>Enfant: \"C'est cool! J'aime bien!\"<br>Adulte cultiver: \"C'est une situation intéressante\"<br>Personnage triste: \"Ah... j'ai perdu mon courage\"<br><strong>Montrer les émotions par le parole:</strong><br>\"— Je t'aime! cria-t-elle joyeusement\"><br>\"— J'ai échoué, murmura-t-il, la voix brisée\"</div><h3>4. EXEMPLE COMPLET DE DIALOGUE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>— Tu veux aller au cinéma ce soir? demanda Lucas.<br>— Oui! Quel film veux-tu voir? s'exclama Sarah.<br>— Je ne sais pas. Peut-être un film de super-héros?<br>— Bof! C'est trop violent. Et si on regardait une comédie?<br>— D'accord, soupira Lucas. À quelle heure?<br>— À 20h?<br>— Parfait! À ce soir!<br></strong></div>",
      order: 43,
    };

    const writing3: Course = {
      id: writing3Id,
      title: "Écrire une histoire courte",
      description: "Structure d'une histoire courte avec début, milieu et fin satisfaisants",
      category: "ecriture",
      content: "<h2>Écrire une Histoire Courte</h2><p>Une histoire courte bien structurée entraîne le lecteur du début à la fin. Elle a besoin d'une structure claire pour captiver l'audience!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>Situation initiale → Problème/Conflit → Climax → Résolution</div><h3>1. SITUATION INITIALE (LE DÉBUT)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Présente:</strong> personnage principal, lieu, temps, situation normale<br><strong>Exemple:</strong> \"Léa était une fillette de 10 ans qui vivait près d'une grande forêt. Elle aimait explorer la nature après l'école. Un jour, en sortant de classe, elle découvrit quelque chose d'extraordinaire...\"</div><h3>2. LE PROBLÈME OU CONFLIT (LE MILIEU)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Crée la tension:</strong> obstacle, danger, mystère, question<br><strong>Exemple:</strong> \"Près du grand chêne, Léa trouva une petite porte verte qu'elle n'avait jamais vue avant. Elle était intriguée. Devrait-elle l'ouvrir? Que se passerait-il?\"<br><strong>Types de conflits:</strong> personnage vs nature, personnage vs autre, personnage vs lui-même</div><h3>3. LE CLIMAX (LE MOMENT CRUCIAL)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le moment le plus intense:</strong> où l'action principale se produit<br><strong>Exemple:</strong> \"Léa prit une profonde respiration et ouvrit la petite porte. Ce qu'elle vit la stupéfia! C'était un monde magique rempli de créatures lumineuses et de fleurs qui chantaient!\"</div><h3>4. LA RÉSOLUTION (LA FIN)</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Comment se termine l'histoire?</strong> Problème résolu, leçon apprise<br><strong>Exemple:</strong> \"Léa découvrit que ce monde magique existait pour aider les enfants courageux. Elle y retourna chaque jour et devint la gardienne de ce monde secret. Et jamais elle n'oublia sa première adventure extraordinaire.\"</div>",
      order: 44,
    };

    const writing4: Course = {
      id: writing4Id,
      title: "Résumer efficacement",
      description: "Techniques pour extraire l'essentiel et écrire un bon résumé",
      category: "ecriture",
      content: "<h2>Résumer Efficacement</h2><p>Résumer n'est pas recopier! C'est EXTRAIRE l'essentiel et le présenter de manière concise et claire.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ FORMULE:</strong><br>Identifiez les idées PRINCIPALES (pas les détails)<br>Écrivez en vos PROPRES mots<br>Respectez l'ordre original du texte</div><h3>1. TROUVER L'ESSENTIEL</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Posez-vous ces questions:</strong><br>Qui sont les personnages IMPORTANTS?<br>Quels sont les FAITS CLÉS?<br>Quel est le DÉBUT, le PROBLÈME et la FIN?<br><strong>IGNOREZ les DÉTAILS:</strong> descriptions longues, anecdotes secondaires, dialogues longs</div><h3>2. RÉDUIRE LE TEXTE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Original (50 mots):</strong> \"Jean était un garçon de 12 ans qui vivait dans une petite maison au bord de la mer. Il adorait regarder les vagues. Un jour, il trouva une bouteille sur la plage. À l'intérieur, il y avait un message ancien.\"<br><strong>Résumé (15 mots):</strong> \"Jean, 12 ans, trouve une bouteille avec un message ancien sur la plage.\"</div><h3>3. UTILISER SES PROPRES MOTS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pas bon:</strong> \"Recopier exactement le texte\"<br><strong>Bon:</strong> \"Reformuler avec vos propres mots\"<br><strong>Exemple:</strong><br>Texte: \"L'école était fermée à cause de la neige.\"<br>Résumé: \"La neige a forcé la fermeture de l'école.\"</div><h3>4. STRUCTURE D'UN RÉSUMÉ</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>1. Introduction:</strong> \"Ce texte parle de...\"<br><strong>2. Développement:</strong> 3-4 phrases avec les idées principales<br><strong>3. Conclusion:</strong> \"En conclusion... ou Finalement...\"<br><strong>Astuce:</strong> Un bon résumé fait 1/3 ou 1/4 de la longueur du texte original</div>",
      order: 45,
    };

    this.courses.set(orthography1Id, orthography1);
    this.courses.set(orthography2Id, orthography2);
    this.courses.set(orthography3Id, orthography3);
    this.courses.set(orthography4Id, orthography4);
    this.courses.set(orthography5Id, orthography5);
    this.courses.set(orthography6Id, orthography6);
    this.courses.set(orthography7Id, orthography7);
    this.courses.set(conjugation1Id, conjugation1);
    this.courses.set(conjugation2Id, conjugation2);
    this.courses.set(conjugation3Id, conjugation3);
    this.courses.set(conjugation4Id, conjugation4);
    this.courses.set(conjugation5Id, conjugation5);
    this.courses.set(conjugation6Id, conjugation6);
    this.courses.set(conjugation7Id, conjugation7);
    this.courses.set(grammar6Id, grammar6);
    this.courses.set(grammar7Id, grammar7);
    this.courses.set(grammar8Id, grammar8);
    this.courses.set(grammar9Id, grammar9);
    this.courses.set(punctuation1Id, punctuation1);
    this.courses.set(punctuation2Id, punctuation2);
    this.courses.set(punctuation3Id, punctuation3);
    this.courses.set(grammar10Id, grammar10);
    this.courses.set(orthography8Id, orthography8);
    this.courses.set(orthography10Id, orthography10);
    this.courses.set(conjugation8Id, conjugation8);
    this.courses.set(conjugation9Id, conjugation9);
    this.courses.set(punctuation4Id, punctuation4);
    this.courses.set(punctuation5Id, punctuation5);
    this.courses.set(reading5Id, reading5);
    this.courses.set(reading6Id, reading6);
    this.courses.set(reading7Id, reading7);
    this.courses.set(reading8Id, reading8);
    this.courses.set(writing1Id, writing1);
    this.courses.set(writing2Id, writing2);
    this.courses.set(writing3Id, writing3);
    this.courses.set(writing4Id, writing4);
    // New 12 courses
    this.courses.set(grammar13Id, grammar13);
    this.courses.set(grammar14Id, grammar14);
    this.courses.set(grammar15Id, grammar15);
    this.courses.set(grammar16Id, grammar16);
    this.courses.set(orthography11Id, orthography11);
    this.courses.set(orthography12Id, orthography12);
    this.courses.set(orthography13Id, orthography13);
    this.courses.set(orthography14Id, orthography14);
    this.courses.set(conjugation10Id, conjugation10);
    this.courses.set(conjugation11Id, conjugation11);
    this.courses.set(conjugation12Id, conjugation12);
    this.courses.set(conjugation13Id, conjugation13);
    // Add 12 new critical courses
    this.courses.set(grammar17Id, grammar17);
    this.courses.set(grammar18Id, grammar18);
    this.courses.set(grammar19Id, grammar19);
    this.courses.set(grammar20Id, grammar20);
    this.courses.set(grammar21Id, grammar21);
    this.courses.set(grammar22Id, grammar22);
    this.courses.set(grammar23Id, grammar23);
    this.courses.set(orthography15Id, orthography15);
    this.courses.set(punctuation6Id, punctuation6);
    this.courses.set(punctuation7Id, punctuation7);
    this.courses.set(punctuation8Id, punctuation8);
    this.courses.set(punctuation9Id, punctuation9);
    // Add 24 advanced courses
    this.courses.set(grammar24Id, grammar24);
    this.courses.set(grammar25Id, grammar25);
    this.courses.set(grammar26Id, grammar26);
    this.courses.set(vocabulary1Id, vocabulary1);
    this.courses.set(grammar27Id, grammar27);
    this.courses.set(punctuation10Id, punctuation10);
    this.courses.set(reading9Id, reading9);
    this.courses.set(grammar28Id, grammar28);
    this.courses.set(grammar29Id, grammar29);
    this.courses.set(grammar30Id, grammar30);
    this.courses.set(conjugation14Id, conjugation14);
    this.courses.set(orthography16Id, orthography16);
    this.courses.set(grammar31Id, grammar31);
    this.courses.set(grammar32Id, grammar32);
    this.courses.set(writing5Id, writing5);
    this.courses.set(writing6Id, writing6);
    this.courses.set(punctuation11Id, punctuation11);
    this.courses.set(vocabulary2Id, vocabulary2);
    this.courses.set(vocabulary3Id, vocabulary3);
    this.courses.set(vocabulary4Id, vocabulary4);
    this.courses.set(reading10Id, reading10);


    // Reading exercises for different text types
    // Narratif
    const readingExercise1Id = randomUUID();

    // Narratif - Histoire 2
    const readingExercise2Id = randomUUID();

    // Narratif - Histoire 3
    const readingExercise3Id = randomUUID();

    // Narratif - Histoire 4
    const readingExercise4Id = randomUUID();

    // Narratif - Histoire 5
    const readingExercise5Id = randomUUID();

    // 6 à 20 - Nouvelles histoires narratives
    const readingExercise6Id = randomUUID();

    const readingExercise7Id = randomUUID();

    const readingExercise8Id = randomUUID();

    const readingExercise9Id = randomUUID();

    const readingExercise10Id = randomUUID();

    const readingExercise11Id = randomUUID();

    const readingExercise12Id = randomUUID();

    const readingExercise13Id = randomUUID();

    const readingExercise14Id = randomUUID();

    const readingExercise15Id = randomUUID();

    const readingExercise16Id = randomUUID();

    const readingExercise17Id = randomUUID();

    const readingExercise18Id = randomUUID();

    const readingExercise19Id = randomUUID();

    const readingExercise20Id = randomUUID();

    const readingExercise21Id = randomUUID();


    // Writing exercises
    const writingExercise1Id = randomUUID();

    const writingExercise2Id = randomUUID();

    const writingExercise3Id = randomUUID();

    const writingExercise4Id = randomUUID();


    // Reading questions - NARRATIVE TEXTS with 4 dimensions de lecture
    // Histoire 1: Le Trésor de la Cave (8 questions)
    // 3 Compréhension + 2 Interprétation (choix multiples) + 2 Réaction + 1 Jugement critique (texte libre)
    const readQ1_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Histoire 1: Le Trésor de la Cave",
      text: "Léa avait 11 ans et vivait dans une petite maison ancienne au bord d'une forêt dense. C'était une maison de trois étages avec un toit pointu et des volets bleus. Elle était une fille curieuse et aventurière qui adorait lire des histoires d'aventure, en particulier les légendes de pirates et de trésors perdus. Elle rêvait de découvrir des secrets cachés. Chaque jour, elle allait à l'école, écoutait ses professeurs, puis revenait faire ses devoirs à la table de la cuisine. Mais dès qu'elle terminait, elle explorait chaque coin de sa maison, se demandant quels mystères se cachaient derrière les vieilles portes et les murs craqués.\n\nCe matin-là du samedi, pendant que ses parents dormaient, Léa décida d'explorer le grenier. Elle monta l'escalier en bois qui grinçait bruyamment, levant des nuages de poussière dorée dans la lumière qui venait par une petite fenêtre. Elle regardait partout, examinant les vieilles boîtes, les cadres poussiéreux, les malles oubliées depuis des décennies. C'est alors qu'elle entendit un léger bruit métallique. Elle regarda entre deux poutres en bois et découvrit une vieille clé rouillée tombée au sol. La clé était lourde et froide entre ses mains. Elle avait une forme bizarre et compliquée, gravée de symboles mystérieux qui ressemblaient à des étoiles et des croix. Léa n'avait jamais vu une clé comme celle-ci avant. Son cœur s'accéléra. Elle la nettoya doucement et murmura: \"À quoi ouvre-t-elle? D'où vient-elle?\"\n\nPendant les jours suivants, Léa chercha partout dans la maison une serrure qui correspondrait à cette clé mystérieuse. Elle essaya toutes les portes, tous les tiroirs, tous les petits coffres. Rien ne fonctionnait. Elle était frustée mais aussi déterminée. Elle lut des livres à la bibliothèque sur les vieilles maisons et les secrets cachés. Elle posa des questions à ses parents sur l'histoire de leur maison, mais ils ne savaient pas grand-chose. Une semaine plus tard, en explorant la cave, dans un coin sombre derrière les vieux meubles poussiéreux et les boîtes oubliées, elle trouva enfin une petite porte en bois qu'elle n'avait jamais remarquée avant. Elle était cachée derrière une armoire lourde. La porte était ancienne, avec des joints noircis par le temps et une petite serrure. Léa tremblait d'excitation. Elle sortit la clé mystérieuse de sa poche. Ses mains tremblaient lorsqu'elle l'approcha de la serrure. La clé tourna parfaitement! La porte s'ouvrit avec un craquement sinistre.\n\nDerrier la porte s'étendait une pièce secrète que personne n'avait visitée depuis des décennies. À l'intérieur, il y avait des coffres en bois, des caisses recouvertes de toiles d'araignée, des pièces de monnaie anciennes brillant à la lumière de sa lampe de poche. Des tableaux accrochés aux murs racontaient des histoires d'un passé lointain. Léa était bouche bée, trop fascinée pour crier. C'est alors qu'elle entendit un bruit terrible: la porte de la cave claqua bruyamment! Quelque chose l'avait fermée derrière elle! La lumière du grenier disparut. Elle était piégée dans le noir complet! Elle sentit la panique monter. Elle appela ses parents, mais sa voix résonnait seulement dans la pièce vide. Elle chercha une sortie, tâtonnant dans le noir, ses yeux s'adaptant lentement. Elle avait peur, mais elle se rappela qu'elle était courageuse.\n\nAprès une heure qui sembla durer une éternité, Léa remarqua une légère lumière au loin, dans un coin de la pièce secrète. Elle trouva une autre porte en bois, presque invisible, qui menait à un tunnel souterrain ancien et moisi. Elle le suivit, rampant parfois, marchant lentement d'autres fois, son cœur battant à chaque pas. Le tunnel était humide et froid. Elle entendit des sons bizarres - probablement des animaux ou simplement l'écho de ses propres pas. Après ce qui sembla une éternité, elle vit une lumière naturelle. Elle arriva finalement derrière le vieux puits du jardin! Elle s'échappa, haletante, heureuse de voir le soleil à nouveau.\n\nLéa courut immédiatement chez ses parents et raconta toute l'histoire. Au début, ils ne la crurent pas! Mais quand elle leur montra la clé et la porte secrète, ils furent choqués. Ensemble avec un expert en histoire locale, ils explorèrent la maison avec sa famille. Ils découvrirent que la maison appartenait autrefois à un homme très riche du 19e siècle qui y avait caché des pièces de monnaie anciennes, de l'or et des bijoux pour les protéger. C'était comme un musée souterrain! L'expert et les parents de Léa documentèrent tout et firent don des trésors à un musée. Léa devint célèbre dans tout le village comme \"la fille qui a découvert le trésor caché\". Elle reçut même un certificat du maire! Son rêve d'aventure était devenu réalité.\n\nQuel âge avait Léa?",
      type: "multiple_choice",
      options: JSON.stringify(["9 ans", "11 ans", "13 ans", "15 ans"]),
      correctAnswer: "11 ans",
      order: 1,
    };

    const readQ1_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 2 (Compréhension)",
      text: "Où Léa a-t-elle trouvé la vieille clé rouillée?",
      type: "multiple_choice",
      options: JSON.stringify(["Dans la cave", "Dans le grenier", "Dans sa chambre", "Dans le jardin"]),
      correctAnswer: "Dans le grenier",
      order: 2,
    };

    const readQ1_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 3 (Compréhension)",
      text: "De quelle couleur étaient les volets de la maison de Léa?",
      type: "multiple_choice",
      options: JSON.stringify(["Rouges", "Verts", "Bleus", "Blancs"]),
      correctAnswer: "Bleus",
      order: 3,
    };

    const readQ1_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Léa n'a-t-elle pas abandonné ses recherches malgré les difficultés?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle était obligée par ses parents", "Elle était curieuse et déterminée", "Elle avait peur de la punition", "Elle n'avait rien d'autre à faire"]),
      correctAnswer: "Elle était curieuse et déterminée",
      order: 4,
    };

    const readQ1_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous apprend le fait que le maire ait donné un certificat à Léa?",
      type: "multiple_choice",
      options: JSON.stringify(["Que Léa était en retard à l'école", "Que sa découverte était importante pour l'histoire du village", "Que le maire aimait les enfants", "Que Léa devait payer une amende"]),
      correctAnswer: "Que sa découverte était importante pour l'histoire du village",
      order: 5,
    };

    const readQ1_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 6 (Réaction)",
      text: "Aurais-tu eu peur comme Léa quand la porte s'est refermée et qu'elle s'est retrouvée dans le noir? Explique ta réponse.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ1_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 7 (Réaction)",
      text: "Cette histoire te rappelle-t-elle une aventure ou une découverte que tu as vécue? Raconte brièvement.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ1_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que l'auteur a réussi à créer du suspense dans cette histoire? Explique pourquoi en donnant un exemple du texte.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 2: Le Jour de l'Accident
    const readQ2_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Histoire 2: Le Jour de l'Accident",
      text: "Marc était un garçon de 13 ans qui vivait dans une grande ville bruyante appelée Montpellier. C'était un garçon sportif, musclé et très courageux qui adorait faire du vélo avec ses copains du quartier. Il était rapide, agile, et avait des réflexes exceptionnels. Ses cheveux bruns volaient au vent quand il roulait. Chaque jour après l'école, lui et ses trois meilleurs amis - Antoine, Karim et David - allaient au skate park faire des figures impressionnantes et des acrobaties étonnantes. Marc rêvait de participer aux Jeux Olympiques un jour. Il était discipliné et responsable. Marc avait toujours porté un casque rouge brillant qui le rendait facile à repérer, car ses parents lui avaient enseigné l'importance de la sécurité. Il portait aussi des genouillères et des coudières, ce qui le rendait un peu ridicule aux yeux de certains, mais Marc s'en fichait.\n\nCe jour-là du samedi après-midi, quand Marc arriva au parc à vélo, ses copains l'appelaient avec enthousiasme: \"Marc! Marc! Viens ici!\" Antoine courait vers lui en sautant sur place. \"On fait une course de vélo vers le pont à l'autre bout de la ville! Le gagnant recevra de l'argent pour s'acheter une glace!\" cria Karim avec un grand sourire. La route était longue, environ 5 kilomètres, descente puis montée. C'était dangereux et excitant! Mais Marc réalisa quelque chose: en se dépêchant ce matin, il avait oublié son casque à la maison! Il regarda dans son sac à dos vide. Son cœur se serra. \"Attendez! Je n'ai pas mon casque!\" cria-t-il à ses amis. \"Je vais aller le chercher. Je reviens dans 5 minutes!\"\n\nMais ses copains commencèrent à rire et à le taquiner: \"Allez Marc, t'es pas un bébé! Personne ne porte de casque de toute façon!\" dit David en la poussant doucement. \"Oui, regarde tous ces autres kids, personne n'en porte!\" ajouta Antoine. \"Juste une course rapide, Marc! S'il te plaît! On meurt d'envie de jouer!\" supplia Karim avec des yeux de chiot. Marc sentait la pression. Il ne voulait pas avoir l'air faible ou peureux devant ses copains. Il regarda la route, puis regarda ses amis, puis regarda le pont au loin. Contre son meilleur jugement, contre ce qu'il savait être correct, Marc prit une décision stupide: \"D'accord! Allons-y! Mais on y va doucement, d'accord?\"\n\nMais il ne pouvait pas y aller lentement! Ses amis accéléraient, se dépassaient les uns les autres, criant de joie. Marc ne voulait pas être en arrière. Son orgueil refusait de perdre. Il pédalait vite, de plus en plus vite, dépassant les feux rouges, ignorant les panneaux d'arrêt, son vélo volant à plus de 40 km/h. Le vent sifflait dans ses oreilles. Son adrenaline pompait. Il se sentait invincible.\n\nSoudain, au carrefour principal près du vieux marché, une voiture rouge sortit rapidement d'une rue latérale à gauche! Marc ne la vit pas à temps! Il n'eut qu'une seconde pour réagir. Il freina brusquement, mais c'était trop tard. L'avant de la voiture heurta son vélo! Marc vola par-dessus le vélo! Il tomba violemment sur le trottoir en béton dur, la tête la première! Son crâne heurta le sol avec un bruit sec et terrible! La douleur explosa dans sa tête. Le monde devint noir. Il perdit connaissance. Son corps était immobile, effondré sur le trottoir gris.\n\nUn attroupement de gens se forma rapidement. Une femme âgée cria pour appeler une ambulance. Une autre personne administra les premiers secours. Ses copains couraient vers lui en panique, criant son nom. \"Marc! Marc! Réveille-toi!\" pleura Karim, les larmes coulant sur ses joues. L'ambulance arriva en 7 minutes, toutes sirènes hurlantes.\n\nMarc fut transporté à l'hôpital municipal avec une grave commotion cérébrale, plusieurs lacérations à la tête, une fracture du bras droit et de nombreuses contusions. Il dut rester à l'hôpital pendant une semaine complète. Le médecin dit à ses parents: \"Il a eu une très grande chance. Sans casque, il y a 90% de chance qu'il ne serait pas ici.\" Ses parents pleurèrent de soulagement et de culpabilité de ne pas avoir forcé Marc à prendre son casque ce jour-là.\n\nQuand Marc quitta l'hôpital, il était différent. Il avait appris une leçon de vie importante et douleur. Après sa sortie, il n'était qu'une chose: il devint ambassadeur de la sécurité à vélo à son école. Il alla de classe en classe avec des photos et des vidéos montrant les conséquences de l'accident. \"Porter un casque n'est pas bon marché, c'est une NÉCESSITÉ!\" criait-il aux enfants. \"Je suis vivant uniquement grâce à la chance. Mais vous ne devez pas compter sur la chance! Portez TOUJOURS un casque!\" Ses copains Antoine, Karim et David, choqués par l'accident, commencèrent aussi à toujours porter un casque et aidèrent Marc à promouvoir la sécurité.\n\nQuel âge avait Marc?",
      type: "multiple_choice",
      options: JSON.stringify(["11 ans", "12 ans", "13 ans", "14 ans"]),
      correctAnswer: "13 ans",
      order: 1,
    };

    const readQ2_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 2 (Compréhension)",
      text: "De quelle couleur était le casque que Marc portait habituellement?",
      type: "multiple_choice",
      options: JSON.stringify(["Bleu", "Noir", "Rouge brillant", "Jaune"]),
      correctAnswer: "Rouge brillant",
      order: 2,
    };

    const readQ2_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 3 (Compréhension)",
      text: "Combien de kilomètres faisait la course vers le pont?",
      type: "multiple_choice",
      options: JSON.stringify(["2 kilomètres", "5 kilomètres", "10 kilomètres", "15 kilomètres"]),
      correctAnswer: "5 kilomètres",
      order: 3,
    };

    const readQ2_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Marc a-t-il cédé à la pression de ses amis malgré le danger?",
      type: "multiple_choice",
      options: JSON.stringify(["Il voulait gagner de l'argent", "Il ne voulait pas avoir l'air faible ou peureux", "Il n'avait pas compris le danger", "Il voulait impressionner une fille"]),
      correctAnswer: "Il ne voulait pas avoir l'air faible ou peureux",
      order: 4,
    };

    const readQ2_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous apprend le fait que Marc soit devenu ambassadeur de sécurité à la fin?",
      type: "multiple_choice",
      options: JSON.stringify(["Qu'il voulait devenir célèbre", "Qu'il a transformé son erreur en leçon positive pour les autres", "Qu'il avait peur de refaire du vélo", "Que ses parents l'ont obligé"]),
      correctAnswer: "Qu'il a transformé son erreur en leçon positive pour les autres",
      order: 5,
    };

    const readQ2_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 6 (Réaction)",
      text: "Aurais-tu résisté à la pression de tes amis dans cette situation? Explique pourquoi.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ2_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 7 (Réaction)",
      text: "As-tu déjà vécu une situation où tes amis t'ont poussé à faire quelque chose que tu savais dangereux? Raconte brièvement.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ2_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que cette histoire est efficace pour sensibiliser les jeunes à la sécurité routière? Explique avec un exemple du texte.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 3: La Fille qui Rêvait de Danser
    const readQ3_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Histoire 3: La Fille qui Rêvait de Danser",
      text: "Sophie avait 12 ans et vivait dans un petit village tranquille appelé Saint-Honoré-les-Bains, nichée entre les montagnes verdoyantes. C'était un village avec seulement deux mille habitants, loin des grandes villes et de leurs écoles d'arts prestigieuses. La maison de Sophie était modeste mais chaleureuse. Elle partageait une chambre avec sa petite sœur Marie. Elle adorait danser, passionnément, avec tout son cœur. Depuis qu'elle était petite, en regardant les pluies frapper la fenêtre, Sophie dansait. Elle rêvait de devenir danseuse professionnelle, de danser dans des théâtres magnifiques, de voyager autour du monde.\n\nMais il y avait un problème majeur: Sophie n'avait jamais eu l'occasion de prendre de vrais cours de danse professionnels. Ses parents travaillaient dur - son père était électricien et sa mère était infirmière - mais ils n'avaient pas assez d'argent pour lui payer des cours d'une école d'arts privée qui coûtaient 150 euros par mois. C'était beaucoup trop cher pour leur budget serré. Sophie se sentait frustrée. Au lieu de cela, elle regardait des vidéos de danse sur YouTube, étudiant chaque mouvement, chaque pirouette, chaque grand saut. Elle s'entraînait seule dans sa chambre après l'école, mettant sa musique préférée, dansant pendant des heures jusqu'à ce que ses jambes soient fatiguées et que ses pieds lui fassent mal. Ses parents l'encourageaient: \"Sophie, continue tes rêves! Tu es naturellement talentueuse!\" Mais Sophie doutait d'elle-même. Sans cours professionnels, pouvait-elle vraiment réussir?\n\nUn jour du mois de mars, en se promenant au village après l'école avec son meilleur ami Thomas, Sophie vit une affiche accrochée sur le mur du centre culturel du village. L'affiche était colorée, avec des dessins de danseurs en mouvement. Elle lisait: \"AUDITIONS DE DANSE POUR L'ÉCOLE D'ARTS RÉGIONALE! GRATUIT POUR TOUS LES ENFANTS! Samedi 15 avril à 14h au centre culturel de Saint-Honoré! Une opportunité unique pour découvrir votre talent! Les meilleurs candidats recevront une bourse pour suivre nos cours!\"\n\nLe cœur de Sophie s'arrêta. Une chance! Une vrai chance! Un audition, gratuite, pour une école d'arts reconnue! Mais presque immédiatement, la peur l'envahit. Comment pouvait-elle concourir? Elle n'avait pas eu de formation professionnelle comme les autres enfants. Les autres candidates auraient probablement suivi des cours pendant des années. Elle serait ridicule sur scène!\n\nMais Thomas vit l'expression de Sophie et sourit. \"Sophie, tu DOIS essayer! Tu es la meilleure danseuse que je connaisse! Fais-le pour toi!\" dit-il fermement. Sophie rentra à la maison ce jour-là, le cœur déchiré entre l'espoir et la peur. Elle montra l'affiche à ses parents. Sa mère lui lança: \"Ma chérie, tu dois essayer! C'est ta chance!\" Son père ajouta: \"Sophie, je crois en toi. Je vais t'aider à te préparer.\"\n\nPendant toute la semaine suivante, Sophie s'entraîna avec intensité. Elle répéta sa chorégraphie des centaines de fois. Son père caméra ses répétitions pour qu'elle puisse se voir et s'améliorer. Sa mère l'aida à trouver une tenue de danse appropriée - un léotard noir et des chaussons de danse que sa grand-mère lui offrit. Sophie dansait jusqu'à minuit, ses muscles brûlaient, mais elle ne s'arrêtait pas. Elle voulait être parfaite.\n\nLe jour de l'audition finalement arriva. Sophie se réveilla à 6h du matin, incapable de dormir. Elle avait des papillons dans l'estomac. Avec ses parents, elle se rendit au centre culturel. Il y avait environ 50 autres enfants qui attendaient, tous nerveusement assis dans des chaises en plastique. Quelques-uns portaient les uniformes d'écoles d'arts prestigieuses. Sophie se sentait petite et sans importance.\n\nLorsque son tour arriva, Sophie monta lentement sur la scène. Les lumières s'allumèrent. Elle voyait les visages des juges assis à une table noire, stylos à la main, regardant fixement. Elle voyait aussi les parents et les amis dans le public. Tous les regards étaient fixés sur elle. Son cœur battait à plus de 100 coups par minute. Elle tremblait. La musique de sa chanson commença - c'était une musique émotionnelle et magnifique.\n\nSophie commença à danser, mais ses mouvements n'étaient pas fluides. Elle était raide de nervosité. Elle oublia une partie de sa chorégraphie! Son pied gauche décalé! Elle voulait arrêter, se sauver de la scène, disparaître. La honte l'envahissait. Mais alors, quelque chose se produisit. Elle ferma les yeux. Elle respira profondément. Elle se rappela pourquoi elle était là - pas pour être parfaite, mais parce qu'elle aimait danser. Elle continua de danser, pas sa chorégraphie préparée, mais avec son cœur, avec ses émotions, laissant la musique la guider. Ses mouvements devinrent fluides, gracieux, plein de passion. Elle sauta, tourna, glissa sur la scène comme si elle volait.\n\nLorsqu'elle termina, il y eut un silence. Puis, les juges applaudirent! Les parents applaudirent! Sophie était hors d'haleine, versant des larmes de soulagement.\n\nUne semaine plus tard, Sophie reçut une lettre de l'école d'arts régionale. Elle avait REMPORTÉ une bourse complète! Une bourse de deux ans pour suivre des cours professionnels! Elle pleura de joie en lisant la lettre. Ses rêves se réalisaient enfin!\n\nSophie suivit les cours et devint une danseuse talentueuse et reconnue. Quelques années plus tard, elle voyagea partout dans le monde - en France, en Italie, en Espagne - partageant sa passion de la danse avec des audiences du monde entier. Et elle ne oublia jamais sa petite chambre au village de Saint-Honoré-les-Bains, où tout a commencé.\n\nQuel âge avait Sophie?",
      type: "multiple_choice",
      options: JSON.stringify(["10 ans", "11 ans", "12 ans", "13 ans"]),
      correctAnswer: "12 ans",
      order: 1,
    };

    const readQ3_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 2 (Compréhension)",
      text: "Combien coûtaient les cours de danse professionnels par mois?",
      type: "multiple_choice",
      options: JSON.stringify(["100 euros", "120 euros", "150 euros", "200 euros"]),
      correctAnswer: "150 euros",
      order: 2,
    };

    const readQ3_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 3 (Compréhension)",
      text: "Comment Sophie apprenait-elle à danser sans cours professionnels?",
      type: "multiple_choice",
      options: JSON.stringify(["Avec sa mère", "En regardant des vidéos sur YouTube", "Avec une amie danseuse", "Dans un livre"]),
      correctAnswer: "En regardant des vidéos sur YouTube",
      order: 3,
    };

    const readQ3_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Sophie doutait-elle d'elle-même malgré son talent?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle était trop timide", "Elle n'avait pas de cours professionnels", "Ses parents ne la soutenaient pas", "Elle n'aimait pas vraiment danser"]),
      correctAnswer: "Elle n'avait pas de cours professionnels",
      order: 4,
    };

    const readQ3_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 5 (Interprétation)",
      text: "Que représente la bourse pour Sophie et sa famille?",
      type: "multiple_choice",
      options: JSON.stringify(["Juste de l'argent", "Une chance de réaliser son rêve malgré les obstacles financiers", "Une obligation de travailler plus dur", "Un cadeau sans importance"]),
      correctAnswer: "Une chance de réaliser son rêve malgré les obstacles financiers",
      order: 5,
    };

    const readQ3_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 6 (Réaction)",
      text: "As-tu un rêve que tu aimerais réaliser comme Sophie? Explique quel est ce rêve.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ3_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 7 (Réaction)",
      text: "Comment réagirais-tu si tu voyais une opportunité gratuite pour réaliser ton rêve?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ3_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que l'auteur montre bien les défis des familles qui n'ont pas beaucoup d'argent? Explique avec un exemple du texte.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 4: L'Amitié Retrouvée
    const readQ4_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Histoire 4: L'Amitié Retrouvée",
      text: "Lucas et Thomas étaient les meilleurs amis du monde, inséparables, comme des frères de sang. Ils avaient tous les deux 11 ans et avaient grandi ensemble depuis l'école maternelle. Ils habitaient dans le même quartier à Lyon, dans des maisons juste à côté l'une de l'autre. Ils faisaient absolument tout ensemble: jouer au football dans le parc, faire leurs devoirs ensemble à la bibliothèque, aller à la piscine le mercredi, manger le gâteau d'anniversaire ensemble chaque année. Chaque soir après l'école, ils se retrouvaient dans la cour de Lucas et jouaient jusqu'à ce que le soleil se couche. Thomas était grand et blond, Lucas était petit et brun. Mais leurs caractères se complétaient parfaitement. Thomas était calme et réfléchi, Lucas était énergique et aventurier. Ils s'aimaient comme des frères. Ils dormaient souvent chez l'un ou l'autre. Leurs familles se voyaient régulièrement. Un soir, assis sur le toit de la maison de Lucas, regardant les étoiles, les deux garçons jurent solennellement l'un envers l'autre: \"Thomas, on sera amis pour TOUJOURS, d'accord? Aucune distance ne peut nous séparer!\" \"Oui Lucas, pour toujours! Promis!\" avaient-ils dit.\n\nMais un jour du mois de mai, la vie prit un tournant tragique. La mère de Thomas appela sa meilleure amie, la mère de Lucas, et dit: \"Ma famille déménage. Le travail de mon mari nous demande d'aller vivre à Marseille.\" C'était à plusieurs centaines de kilomètres de distance! Marseille! Un monde différent! Lucas était dévastée lorsqu'il entendit la nouvelle. Il se précipita chez Thomas, qui avait aussi le cœur brisé. Les deux garçons s'assirent sur le lit de Thomas, silencieusement, entourés de boîtes d'emballage. \"Comment peut-on faire ça?\" demanda Lucas, les larmes aux yeux. \"Nous avions promis!\" répondit Thomas, sa voix tremblante.\n\nLe jour du déménagement arriva trop rapidement. Les parents se dirent au revoir. Lucas et Thomas s'embrassèrent et se promirent: \"On va s'appeler tous les jours! On va se faire des vidéos! On sera toujours ensemble dans nos cœurs!\" Pendant les premiers mois, ils tinrent parole. Ils s'appelaient tous les dimanches soir. Thomas envoyait à Lucas des photos de sa nouvelle maison, de la plage à côté. Lucas envoyait à Thomas des vidéos de leurs amis du quartier. Mais avec le temps, les appels devinrent de moins en moins fréquents. Les premiers mois, c'était chaque semaine. Puis deux fois par mois. Puis une fois par mois. Puis plus rien.\n\nLucas commença à se sentir très mal. À chaque rentrée scolaire, il voyait des amis qui lui manquaient, mais aucun n'était Thomas. Il pensait à Thomas tous les jours. Il voyait des garçons qui ressemblaient à Thomas dans le rue et son cœur s'arrêtait. Il gardait une photo de Thomas et de lui sur son bureau. Son journal était rempli de pensées: \"Pourquoi Thomas n'appelle-t-il pas? Peut-être qu'il a de nouveaux amis à Marseille. Peut-être qu'il m'a oublié.\" Lucas avait le cœur brisé. Il voulait l'appeler, lui écrire, lui envoyer un email, mais il avait PEUR. Peur que Thomas l'ait oublié. Peur qu'il ne veuille pas lui parler. Peur que Thomas dise: \"Non, je suis occupé. Je n'ai pas le temps pour des amis de Lyon.\" Cette peur était plus grande que son amour pour Thomas, et ça le paraissait.\n\nThomas, de son côté, à Marseille, ressentait exactement la même chose! Il pensait à Lucas chaque jour. Il avait aussi le cœur brisé. Il voyait des moments qu'ils auraient partagés ensemble et pensait: \"Lucas adorait le football. Je voudrais qu'il soit ici pour voir ce match!\" Thomas avait aussi peur. Il avait peur que Lucas ait des nouveaux meilleurs amis maintenant. Il avait peur que Lucas dise: \"Thomas, tu es trop loin. Je ne peux pas rester ami avec quelqu'un qui habite à l'autre bout de la France.\"\n\nUn jour d'octobre, deux ans après la séparation, Lucas reçut une lettre manuscrite. Une vraie lettre papier! L'enveloppe était adressée en écriture maladroite, à l'encre bleue. Le timbre était de Marseille. Lucas reconnut immédiatement l'écriture de Thomas. Ses mains tremblaient en ouvrant l'enveloppe. À l'intérieur était une longue lettre, plusieurs pages, écrite de la main de Thomas:\n\n\"Mon ami Lucas,\n\nJe sais que j'ai été stupide de ne pas te contacter depuis si longtemps. Chaque jour pendant ces deux ans, j'ai pensé à toi. Je me suis demandé comment tu allais. J'ai vu un match de football à la télé l'autre jour et j'ai pensé: \"Lucas adorerait ce match.\" Je t'ai tellement manqué. Je veux que tu saches que tu restes mon meilleur ami. Rien n'a changé dans mon cœur. Je suis désolé de ne pas avoir écrit plus souvent. Je suis aussi désolé d'avoir eu peur de t'appeler. J'avais peur que tu m'aies oublié. Mais je sais maintenant que une amitié véritable n'est jamais oubliée, peu importe la distance.\n\nJe t'aime, mon ami.\n\nThomas\"\n\nLucas pleura en lisant cette lettre. Des larmes de joie coulaient sur ses joues. Il courut immédiatement chez son ordinateur et écrivit une longue réponse à Thomas. Il lui parla de ses deux dernières années, de comment il avait pensé à lui aussi, de comment il avait eu peur aussi.\n\nAprès cette lettre, les deux garçons commencèrent à se parler régulièrement. D'abord par email, puis par vidéo-call une fois par semaine. Ils rattrapèrent les deux ans d'amitié perdue. Quelques mois plus tard, pour les vacances d'été, Lucas visita Thomas à Marseille. C'est moment de retrouvailles était magique. Quand Lucas descendit du train et vit Thomas à la gare, ils couraient vers l'un l'autre. Ils s'embrassèrent et pleurèrent de joie. Ils passèrent les deux semaines ensemble à la plage, explorant Marseille, riant, parlant, se rattrappant. Leur amitié était revenue plus forte que jamais! Ils comprenaient maintenant que l'amitié véritable ne peut jamais être brisée par la distance ou le temps.\n\nQuel âge avaient Lucas et Thomas?",
      type: "multiple_choice",
      options: JSON.stringify(["9 ans", "10 ans", "11 ans", "12 ans"]),
      correctAnswer: "11 ans",
      order: 1,
    };

    const readQ4_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 2 (Compréhension)",
      text: "Dans quelle ville Thomas a-t-il déménagé?",
      type: "multiple_choice",
      options: JSON.stringify(["Paris", "Marseille", "Bordeaux", "Toulouse"]),
      correctAnswer: "Marseille",
      order: 2,
    };

    const readQ4_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 3 (Compréhension)",
      text: "Combien de temps s'est écoulé avant que Thomas n'envoie sa lettre?",
      type: "multiple_choice",
      options: JSON.stringify(["Six mois", "Un an", "Deux ans", "Trois ans"]),
      correctAnswer: "Deux ans",
      order: 3,
    };

    const readQ4_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Lucas et Thomas ont-ils arrêté de communiquer pendant si longtemps?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils n'avaient plus le temps", "Ils avaient peur que l'autre les ait oubliés", "Ils étaient fâchés", "Ils n'avaient pas internet"]),
      correctAnswer: "Ils avaient peur que l'autre les ait oubliés",
      order: 4,
    };

    const readQ4_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous apprend cette histoire sur l'amitié véritable?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle disparaît avec le temps", "Elle peut survivre à la distance et au temps", "Elle n'existe pas vraiment", "Elle est facile à maintenir"]),
      correctAnswer: "Elle peut survivre à la distance et au temps",
      order: 5,
    };

    const readQ4_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà perdu contact avec un ami proche? Comment t'es-tu senti?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ4_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 7 (Réaction)",
      text: "Que ferais-tu pour maintenir une amitié à distance?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ4_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que Thomas a eu raison d'écrire une lettre papier plutôt qu'un message? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 5: Le Voyage en Train
    const readQ5_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Histoire 5: Le Voyage en Train",
      text: "Alex avait 12 ans et n'avait jamais pris le train tout seul. Il vivait dans une petite ville de province appelée Troyes et devait aller passer une semaine chez sa tante à Paris, une grande ville qu'il ne connaissait pas vraiment. C'était un garçon timide mais courageux qui aimait les aventures, bien qu'il soit un peu anxieux à propos des nouveaux défis. Ses parents lui avaient répété les instructions plusieurs fois: \"Reste près de ton billet, sois prudent, et appelle si tu as besoin.\"\n\nLe matin du voyage, le samedi 18 mai à 8 heures du matin, Alex monta dans le train avec son billet précieux qu'il avait mis dans son sac à dos. Son cœur battait vite d'excitation et de nervosité. La gare était bruyante et pleine de gens qui couraient partout. Il trouva son compartiment et s'assit près de la fenêtre, regardant dehors avec émerveillement. C'était la première fois qu'il voyait un train aussi grand.\n\nDans le wagon, il rencontra une vieille femme avec des cheveux blancs comme neige et des yeux bienveillants pleins de sagesse. Elle s'appelait Madame Beaumont et avait environ 75 ans. Elle sourit chaleureusement à Alex. \"Bonjour jeune homme, c'est ta première fois en train?\" demanda-t-elle gentiment. Pendant les premières heures du voyage, ils parlèrent de tout - de sa famille, de l'école, de ses rêves d'avenir, de sa peur des nouveaux endroits. Madame Beaumont lui raconta des histoires fascinantes sur ses propres voyages en train à travers toute la France et même l'Europe. Elle lui parla de Paris, des musées, des parcs, de la cuisine parisienne. Alex écoutait avec fascination, ses yeux s'écarquillant. \"Tu vas adorer Paris, mon cher\", disait Madame Beaumont avec un sourire.\n\nAu moment de la pause de midi, vers 13 heures, Alex réalisa avec horreur qu'il ne trouvait plus son billet! Son cœur sauta dans sa poitrine. Il le chercha partout - sa poche avant, sa poche arrière, son sac à dos, sous son siège, entre les coussins du siège. Rien! Il regarda sous le siège, derrière le coussin, partout où il pouvait penser. Rien! Il pensa que quelqu'un l'avait volé ou qu'il l'avait perdu en montant dans le train. Il commença à pleurer de frustration. \"Oh non! Oh non! Comment est-ce possible?\" murmura-t-il, les larmes coulant sur ses joues. Comment pouvait-il aller chez sa tante sans billet? Le contrôleur allait sûrement le renvoyer! Il serait humilié! Il serait coincé à la gare! Ses parents seraient tellement déçus!\n\nMais Madame Beaumont posa sa main chaude sur son épaule. \"Calme-toi, jeune homme. Ce n'est pas une catastrophe. Les choses perues peuvent se retrouver ou se résoudre.\" Elle le calma avec des paroles apaisantes et une présence rassurante. \"Viens avec moi, allons trouver le contrôleur et expliquons la situation.\" Elle l'accompagna au wagon suivant et expliqua calmement la situation au contrôleur, un homme aux cheveux gris qui avait l'air sévère au premier abord. Madame Beaumont parla avec confiance, rachetant le respect du contrôleur. Le contrôleur vérifia l'achat du billet sur le système informatique de la gare et visa que oui, le billet avait été acheté pour Alex Moreau, correspondant à son nom. \"Pas de problème, jeune homme. Tu peux continuer. Sois plus prudent la prochaine fois\", dit-il avec un petit sourire.\n\nMais plus encore, Madame Beaumont prit le numéro de téléphone d'Alex et devint une amie correspondante. Elle lui promit de lui envoyer des lettres pendant l'année et de lui aider quand il aurait besoin. Alex comprit ce jour-là que les gens bienveillants existent partout et que les étrangers peuvent devenir des amis pour la vie.\n\nQuel âge avait Alex?",
      type: "multiple_choice",
      options: JSON.stringify(["10 ans", "11 ans", "12 ans", "13 ans"]),
      correctAnswer: "12 ans",
      order: 1,
    };

    const readQ5_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 2 (Compréhension)",
      text: "Comment s'appelait la dame qu'Alex a rencontrée dans le train?",
      type: "multiple_choice",
      options: JSON.stringify(["Madame Dupont", "Madame Beaumont", "Madame Martin", "Madame Leclerc"]),
      correctAnswer: "Madame Beaumont",
      order: 2,
    };

    const readQ5_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 3 (Compréhension)",
      text: "Où Alex devait-il se rendre?",
      type: "multiple_choice",
      options: JSON.stringify(["Chez ses grands-parents à Lyon", "Chez sa tante à Paris", "Chez un ami à Marseille", "À l'école à Bordeaux"]),
      correctAnswer: "Chez sa tante à Paris",
      order: 3,
    };

    const readQ5_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Madame Beaumont a-t-elle aidé Alex?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle était payée pour cela", "Elle était bienveillante et voulait l'aider", "Elle connaissait sa famille", "Le contrôleur le lui a demandé"]),
      correctAnswer: "Elle était bienveillante et voulait l'aider",
      order: 4,
    };

    const readQ5_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 5 (Interprétation)",
      text: "Quelle leçon Alex a-t-il apprise de cette expérience?",
      type: "multiple_choice",
      options: JSON.stringify(["Ne jamais prendre le train seul", "Les étrangers peuvent devenir des amis bienveillants", "Toujours garder son billet dans sa poche", "Les voyages sont ennuyeux"]),
      correctAnswer: "Les étrangers peuvent devenir des amis bienveillants",
      order: 5,
    };

    const readQ5_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà voyagé seul ou vécu une situation stressante en voyage? Raconte brièvement.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ5_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 7 (Réaction)",
      text: "Comment te sentirais-tu si tu perdais quelque chose d'important pendant un voyage?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ5_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise6Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les parents d'Alex ont eu raison de le laisser voyager seul? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 6: La Cabane Mystérieuse
    const readQ6_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Histoire 6: La Cabane Mystérieuse",
      text: "Julien et sa meilleure amie Karine exploreraient chaque jour après l'école une vieille forêt dense et mystérieuse derrière leur petit village de Normandie appelé Honfleur. C'était une forêt d'au moins 500 hectares avec des arbres très anciens dont certains dataient de plusieurs siècles. Il y avait un silence mystérieux qui les fascinait - on n'entendait que le chant des oiseaux et le bruit de leurs pas sur les feuilles mortes. Ils aimaient partir en exploration pour chercher des aventures et des secrets cachés. Julien était un garçon courageux de 11 ans avec les cheveux noirs et les yeux curieux. Karine était sa meilleure amie depuis l'école primaire, une fille intelligente et observatrice.\n\nCe jour-là du mois d'octobre, après avoir marché très profondément dans la forêt - plus profondément qu'ils n'avaient jamais osé le faire auparavant - Julien remarqua une petite cabane en bois découpée entre les buissons épais et les arbres gigantesques. La cabane semblait presque invisible, camouflée par la nature. \"Karine! Regarde là! Une cabane!\" s'écria Julien, pointant du doigt. Karine le rejoignit et ses yeux s'écarquillèrent.\n\nLa cabane était vieille, très vieille, datant probablement du 19e siècle. Elle était poussiéreuse et couverte de mousse verte. La porte était rouillée et grinçait quand elle bougeait au vent. Les fenêtres étaient couvertes de toiles d'araignée et de saleté épaisse. Le toit était en mauvais état avec des tuiles manquantes laissant voir des briques rouges dessous. On aurait vraiment dit qu'elle n'avait pas été visitée depuis des décennies. Un léger brouillard blanc sortait de la cheminée, ce qui était étrange puisque la cabane semblait abandonnée.\n\nJulien et Karine ne savaient pas si c'était dangereux d'entrer, mais leur curiosité était bien plus forte que leur peur. Ils s'approchèrent doucement de la porte, regardant autour d'eux pour voir s'il y avait quelqu'un. Le silence était total. Julien tendit la main vers la poignée de la porte, hésitant un moment. \"Tu crois qu'il y a quelqu'un à l'intérieur?\" chuchota Karine. \"Je ne sais pas\", murmura Julien. Il ouvrit doucement la porte. Elle grinça bruyamment.\n\nInopinément, une voix forte retentit depuis l'intérieur: \"Qui êtes-vous? Que faites-vous ici? Cette propriété est privée!\" Julien et Karine eurent terriblement peur. Leur cœur battait très vite. Ils virent émerger du coin sombre de la cabane un vieil homme avec une longue barbe blanche tout emmêlée, les cheveux longs et gris, vêtu de vêtements anciens et troués. Il avait probablement 80 ans ou plus. Il regardait les enfants avec des yeux suspicieux. \"Allez-vous-en! C'est ma propriété privée! Sortez!\" cria-t-il. Julien et Karine reculèrent. Ils eurent peur qu'il ne les chasse ou pire, qu'il ne soit en colère contre eux.\n\nMais alors, quelque chose de merveilleux se produisit. Le vieil homme regarda plus attentivement les enfants et son expression changea complètement. Un sourire chaleureux apparut sur son visage. \"Attendez... vous n'êtes pas des voleurs. Vous êtes juste des enfants curieux.\" Il s'appela Monsieur Leclerc et avait 82 ans. Il avait vécu en reclus dans cette cabane pendant 40 ans pour écrire des histoires, des contes de fées et des romans. Quand il vit les enfants, il se rappela sa propre enfance et sa curiosité. \"Venez, venez à l'intérieur. N'ayez pas peur.\"\n\nDe manière surprenante, Monsieur Leclerc accueillit les enfants chaleureusement. L'intérieur de la cabane était incroyable - des milliers de livres alignés sur les murs, des manuscrits empilés partout, des dessins magnifiques accrochés aux murs montrant des paysages, des animaux, des scènes de contes de fées. Il y avait des inventions bizarres et créatives dans tous les coins - des engrenages, des boîtes à musique, des carrousels de papier. Monsieur Leclerc leur montra tous ses manuscrits, expliquant les histoires qu'il avait écrites pendant 40 ans en solitude. Il leur parla de ses aventures avant qu'il ne décide de se retirer dans la forêt pour créer. Il devint un ami merveilleux et une figure importante dans la vie de Julien et Karine.\n\nEt c'est ainsi que les enfants revinrent souvent le visiter, et Monsieur Leclerc reçut de la compagnie et de la joie. Le secret de la cabane ne fut plus un mystère effrayant mais une belle et profonde amitié entre trois générations différentes.\n\nQuel âge avait Julien?",
      type: "multiple_choice",
      options: JSON.stringify(["9 ans", "10 ans", "11 ans", "12 ans"]),
      correctAnswer: "11 ans",
      order: 1,
    };

    const readQ6_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 2 (Compréhension)",
      text: "Quel âge avait Monsieur Leclerc?",
      type: "multiple_choice",
      options: JSON.stringify(["70 ans", "75 ans", "82 ans", "90 ans"]),
      correctAnswer: "82 ans",
      order: 2,
    };

    const readQ6_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 3 (Compréhension)",
      text: "Depuis combien de temps Monsieur Leclerc vivait-il dans la cabane?",
      type: "multiple_choice",
      options: JSON.stringify(["10 ans", "20 ans", "40 ans", "50 ans"]),
      correctAnswer: "40 ans",
      order: 3,
    };

    const readQ6_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Monsieur Leclerc a-t-il changé d'attitude envers les enfants?",
      type: "multiple_choice",
      options: JSON.stringify(["Il avait peur d'eux", "Il a vu qu'ils étaient curieux comme lui enfant", "Ils lui ont offert de l'argent", "Ses voisins lui ont demandé"]),
      correctAnswer: "Il a vu qu'ils étaient curieux comme lui enfant",
      order: 4,
    };

    const readQ6_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 5 (Interprétation)",
      text: "Que symbolise la rencontre entre les enfants et Monsieur Leclerc?",
      type: "multiple_choice",
      options: JSON.stringify(["Le danger de la forêt", "L'amitié possible entre différentes générations", "L'importance de rester chez soi", "La solitude"]),
      correctAnswer: "L'amitié possible entre différentes générations",
      order: 5,
    };

    const readQ6_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 6 (Réaction)",
      text: "Aurais-tu eu le courage d'entrer dans la cabane mystérieuse? Explique pourquoi.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ6_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 7 (Réaction)",
      text: "As-tu déjà découvert un endroit secret ou mystérieux? Raconte brièvement.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ6_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise7Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que Julien et Karine ont bien fait d'entrer dans la cabane d'un inconnu? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 7: Le Concours de Dessin
    const readQ7_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Histoire 7: Le Concours de Dessin",
      text: "Maya était une fille de 10 ans passionnée fiévreusement par le dessin et l'art créatif. Depuis son plus jeune âge, elle dessinait tout ce qu'elle voyait et sentait - les animaux de la nature, les paysages magnifiques, les portraits des personnes qu'elle aimait, ses rêves nocturnes et ses émotions les plus profondes. Elle avait des carnets de croquis remplis de dessins colorés et expressifs, presque deux cents pages au total. Ses parents la soutenaient toujours, encourageaient sa créativité, et affichaient ses meilleures œuvres au réfrigérateur et dans sa chambre. Son professeur d'arts plastiques, Monsieur Lecourt, disait souvent avec un sourire bienveillant: \"Maya, tu as un vrai talent naturel. Continue comme cela et tu deviendras une grande artiste.\"\n\nUn jour du mois de février, l'école annonça un grand concours de dessin régional pour tous les enfants de dix à douze ans. Les lauréats seraient exposés au prestigieux musée local de Dijon. Le premier prix était une bourse complète pour une école d'arts privée. Maya vit l'affiche rouge et or accrochée sur le mur du couloir de l'école et son cœur sauta d'excitation. C'était l'occasion qu'elle attendait depuis longtemps! Elle avait toujours rêvé d'être reconnue pour son art!\n\nElle se mit immédiatement à préparer son chef-d'œuvre. Pendant deux mois, elle dessina, réfléchit, recommença, cherchant l'inspiration parfaite. Elle finit par créer une magnifique forêt enchantée avec des animaux mystérieux et des détails incroyables - des cerfs, des oiseaux colorés, des fleurs délicates, et des structures géométriques complexes qui donnaient de la profondeur à son œuvre. Elle utilisa des crayons de couleur, des pastels, et même des paillettes pour donner de la magie au dessin. Elle était très fière de son travail.\n\nMais quand le jour du concours arriva le 15 avril, Maya eut une terrible crise de doute et d'anxiété. Elle rentra à l'école avec son dessin précieux dans son sac, son cœur battant rapidement. Elle regarda les autres camarades qui présentaient leurs dessins. Certains semblaient si professionnels, si techniquement parfaits! Il y avait Léa avec un portrait photorealiste d'une actrice célèbre, parfait dans chaque détail. Il y avait Thomas avec un paysage urbain en perspective géométrique complexe. Il y avait Sophie avec une illustration de conte de fées magnifique avec des couleurs explosives. Maya regarda son propre dessin et pensa: \"Oh non, mon dessin n'est pas assez technique. Ce n'est pas assez parfait. Les autres dessins sont tellement meilleurs! Pourquoi ai-je pensé que je pourrais gagner?\" Elle sentit les larmes menacer ses yeux. Elle voulait sortir de la salle et rentrer à la maison. Elle ne voulait pas que les autres voient son dessin. Elle avait honte.\n\nMais sa mère, qui l'accompagnait, posa sa main chaude sur l'épaule de Maya et lui dit tendrement: \"Maya, écoute-moi. Le concours n'est pas sur la perfection technique. C'est sur l'originalité, la créativité unique, et le cœur que tu mets dans ton travail. Ton dessin vient de ton âme. C'est ça qui est magnifique.\" Son père ajouta: \"Oui, bébé. Ton dessin est une expression de toi-même. C'est ce qui le rend spécial.\" Maya prit une profonde respiration, essuya ses larmes, et regarda son dessin avec des yeux nouveaux. Elle voyait maintenant la beauté dans son style unique et expressif.\n\nMaya prit une profonde respiration et soumit son dessin au jury. Les semaines d'attente ont été longues et angoissantes. Elle vérifiait son email et son téléphone chaque jour, attendant anxieusement la réponse. Enfin, un samedi matin trois semaines plus tard, elle reçut une lettre officielle du musée. Elle était hésitante à l'ouvrir. Ses mains tremblaient. Enfin, elle l'ouvrit... \"Félicitations! Vous avez GAGNÉ le premier prix du concours régional de dessin!\" Quand elle lut cela, elle cria de joie et embrassa ses parents. Son dessin avait été choisi par le jury pour son originalité remarquable, son style unique expressif, et sa beauté créative authentique, exactement comme sa mère l'avait dit. Son œuvre serait exposée au musée pendant trois mois. Maya avait aussi reçu une bourse de 2000 euros pour une école d'arts. Elle était la plus heureuse du monde!\n\nQuel âge avait Maya?",
      type: "multiple_choice",
      options: JSON.stringify(["8 ans", "9 ans", "10 ans", "11 ans"]),
      correctAnswer: "10 ans",
      order: 1,
    };

    const readQ7_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 2 (Compréhension)",
      text: "Quel était le premier prix du concours?",
      type: "multiple_choice",
      options: JSON.stringify(["Un voyage", "Une bourse pour une école d'arts", "Un nouveau matériel de dessin", "Un trophée"]),
      correctAnswer: "Une bourse pour une école d'arts",
      order: 2,
    };

    const readQ7_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 3 (Compréhension)",
      text: "Que représentait le dessin de Maya?",
      type: "multiple_choice",
      options: JSON.stringify(["Un portrait", "Une forêt enchantée avec des animaux", "Un paysage urbain", "Un autoportrait"]),
      correctAnswer: "Une forêt enchantée avec des animaux",
      order: 3,
    };

    const readQ7_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Maya a-t-elle douté de son dessin au concours?",
      type: "multiple_choice",
      options: JSON.stringify(["Son dessin était cassé", "Les autres dessins semblaient plus techniques et parfaits", "Elle n'aimait plus son dessin", "Le jury l'a critiquée"]),
      correctAnswer: "Les autres dessins semblaient plus techniques et parfaits",
      order: 4,
    };

    const readQ7_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 5 (Interprétation)",
      text: "Quelle leçon Maya a-t-elle apprise de cette expérience?",
      type: "multiple_choice",
      options: JSON.stringify(["La technique est plus importante que l'originalité", "L'originalité et l'authenticité ont autant de valeur que la perfection technique", "Il faut abandonner quand on doute", "Les concours sont inutiles"]),
      correctAnswer: "L'originalité et l'authenticité ont autant de valeur que la perfection technique",
      order: 5,
    };

    const readQ7_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà douté de toi-même avant un événement important? Comment as-tu surmonté ce doute?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ7_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 7 (Réaction)",
      text: "Quelle activité créative aimes-tu faire? Pourquoi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ7_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise8Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que le jury a fait le bon choix en choisissant le dessin de Maya? Explique avec des exemples du texte.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 8: La Maison Hantée
    const readQ8_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Histoire 8: La Maison Hantée",
      text: "La famille de Noah venait de déménager en juillet dans une nouvelle maison ancienne au bord d'un petit bois mystérieux appelé la Forêt des Murmures. C'était une belle maison en pierre de trois étages avec des portes en bois massif noirci par le temps, des fenêtres en forme d'arche, et un grenier mystérieux qui existait depuis plus d'un siècle. Noah était un garçon courageux de 11 ans avec les cheveux roux et les yeux curieux, très intelligent et passionné par les mystères. Sa sœur cadette, Léa, avait sept ans et était facilement effrayée. Les premiers jours du déménagement, tout semblait normal et agréable. Les parents de Noah étaient contents d'avoir trouvé cette maison de rêve avec ses caractéristiques historiques uniques.\n\nMais les trois premières nuits, Noah entendit des bruits étranges et effrayants dans la maison - des grincements inexplicables, des coups réguliers, des sons étranges qu'il ne pouvait pas expliquer. Chaque nuit, vers 2 heures du matin, les bruits revenaient. Au début, Noah eut peur. Il pensa sérieusement qu'il y avait un fantôme dans la maison, peut-être un homme mort qui hantait les lieux depuis des siècles! Il en parla à ses parents, mais sa mère Céline dit que c'était juste le vent qui soufflait, ou la maison ancienne qui se tassait et faisait des bruits normaux de contraction thermique. Son père Marc ajouta: \"Les vieilles maisons font du bruit, Noah. C'est normal. Il n'y a rien à craindre.\"\n\nMais Noah ne pouvait pas dormir tranquille. Il avait lu beaucoup de livres sur les fantômes et les maisons hantées. Il décida de faire ses propres investigations comme un vrai détective. Il prépara une lampe de poche puissante, un carnet pour noter les observations, et même un thermomètre pour mesurer les changements de température (une technique qu'il avait lue dans un livre sur les fantômes). La nuit suivante, vers 1h45 du matin, Noah s'équipait et monta à l'étage silencieusement, voulant trouver la source des bruits avant que sa famille ne se réveille.\n\nIl monta lentement les marches en bois qui grinçaient sous ses pieds. Il pensa qu'il y avait quelque chose qui n'allait pas. Les bruits venaient clairement de la direction du grenier au troisième étage. Avec sa lampe de poche, Noah illumina le couloir sombre. Les ombres dansaient sur les murs. Tout semblait effrayant. Il entendit un bruit de battement d'ailes très forte! Son cœur battait extrêmement vite dans sa poitrine. \"Est-ce un fantôme? Ou une créature vivante? Ou un oiseau?\" pensait-il, terrifiée. Il n'était pas sûr s'il devait avoir peur ou être curieux.\n\nIl continua à monter vers le grenier, ses jambes tremblant. Il ouvrit la porte du grenier qui grinça bruyamment. La lampe révéla un grenier poussiéreux rempli de vieux meubles, de boîtes anciennes, et de toiles d'araignée partout. Et puis... il découvrit qu'il n'y avait pas de fantôme du tout! Ce n'était pas un esprit maléfique! C'était une grande branche d'arbre morte qui battait et frappait contre la fenêtre du grenier chaque fois que le vent soufflait fort! Il n'y avait rien de sinistre du tout. Noah fut extrêmement soulagé et rit de sa propre peur et imaginatio. Il se sentait un peu bête d'avoir pensé à un fantôme, mais aussi fier d'avoir résolu le mystère par lui-même!\n\nLe jour suivant, Noah expliqua sa découverte à ses parents. Ils trouvèrent la chose très amusante et admirèrent le courage et l'intelligence de Noah. Ensemble, ils montèrent au grenier, examinèrent la branche, et décidèrent de l'enlever. Ils appelèrent un élagueur professionnel qui enleva complètement la branche dangereuse. Après cela, les bruits mystérieux disparurent complètement. La maison n'était pas hantée, juste vieille et bruyante à cause d'une branche qui battait contre la fenêtre du grenier. Noah devint le héros de la famille, et sa sœur Léa n'eut plus peur de la \"maison hantée\".\n\nQuel âge avait Noah?",
      type: "multiple_choice",
      options: JSON.stringify(["9 ans", "10 ans", "11 ans", "12 ans"]),
      correctAnswer: "11 ans",
      order: 1,
    };

    const readQ8_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 2 (Compréhension)",
      text: "À quelle heure les bruits revenaient-ils chaque nuit?",
      type: "multiple_choice",
      options: JSON.stringify(["Minuit", "1 heure du matin", "2 heures du matin", "3 heures du matin"]),
      correctAnswer: "2 heures du matin",
      order: 2,
    };

    const readQ8_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 3 (Compréhension)",
      text: "Quelle était la vraie cause des bruits?",
      type: "multiple_choice",
      options: JSON.stringify(["Un fantôme", "Des souris", "Une branche d'arbre contre la fenêtre", "Le vent dans la cheminée"]),
      correctAnswer: "Une branche d'arbre contre la fenêtre",
      order: 3,
    };

    const readQ8_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Noah a-t-il décidé d'investiguer lui-même?",
      type: "multiple_choice",
      options: JSON.stringify(["Ses parents ne le croyaient pas vraiment", "Il voulait prouver qu'il y avait un fantôme", "Il aimait les mystères et était curieux", "Il avait peur de dormir"]),
      correctAnswer: "Il aimait les mystères et était curieux",
      order: 4,
    };

    const readQ8_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous apprend cette histoire sur les peurs?",
      type: "multiple_choice",
      options: JSON.stringify(["Les fantômes existent vraiment", "Souvent nos peurs ont des explications logiques", "Il ne faut jamais avoir peur", "Les vieilles maisons sont dangereuses"]),
      correctAnswer: "Souvent nos peurs ont des explications logiques",
      order: 5,
    };

    const readQ8_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 6 (Réaction)",
      text: "Aurais-tu eu le courage d'aller investiguer les bruits étranges la nuit? Pourquoi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ8_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 7 (Réaction)",
      text: "As-tu déjà eu peur de quelque chose qui s'est révélé inoffensif? Raconte brièvement.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ8_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise9Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les parents de Noah auraient dû prendre ses inquiétudes plus au sérieux? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 9: Le Secret du Grenier
    const readQ9_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Histoire 9: Le Secret du Grenier",
      text: "Chaque été pendant presque dix ans, Léon passait une semaine complète chez ses grands-parents dans leur grande maison à la campagne en Provence, une belle région du sud de la France. Il adorait ces vacances estivales - c'était le moment de l'année où il se sentait le plus libre et le plus heureux. Sa grand-mère Margot préparait les meilleurs repas, et son grand-père Georges lui racontait des histoires fascinantes. Cette année-là, le jour de son arrivée au début du mois d'août, sa grand-mère lui dit avec un air mystérieux et presque secret: \"Léon, le grenier est interdit cette année. Il y a du travail en cours. Nous le préparons pour quelque chose de spécial.\" Cela intrigua énormément Léon, car normalement, le grenier était son endroit préféré pour jouer, explorer, et laisser son imagination s'envoler. Il passait des heures là-haut, rêvant et explorant les vieilles choses.\n\nCurieux comme toujours, Léon ne put pas résister à l'envie. Après quelques jours passés à la maison des grands-parents, quand ses grands-parents faisaient leur sieste de l'après-midi vers 14h30, Léon monta furtivement l'escalier en bois qui grinçait bruyamment vers le grenier. Son cœur battait vite - il savait qu'il faisait quelque chose d'interdit, mais sa curiosité était plus puissante que la discipline. En ouvrant la porte ancienne du grenier, il trouva une merveille absolue! Le grenier était rempli de trésors incroyables - des vieux coffres en bois massif, des albums photo anciens avec des pages jaunies, des lettres écrites à la main jaunes par le temps, des objets incroyables que son grand-père avait collectés au cours de sa longue vie de 82 ans. Il y avait aussi des uniformes militaires encadrés, des médailles dans des vitrines, et même un journal intime ancien.\n\nLéon s'assit sur le sol du grenier et commença à explorer lentement et respectueusement. En feuilletant un album photo très ancien intitulé \"Ma vie de guerre\", Léon vit des photos fascinantes de son grand-père pendant la Seconde Guerre mondiale, en tant que pilote d'avion courageux volant dans un Spitfire britannique. Il y avait des photos de son grand-père en uniform de pilote, souriant devant un avion de chasse avec ses camarades. Il y avait des photos de missions de vol documentées, des certificats de vol, et même une lettre d'une autorité militaire loue commendant son courage exceptionnel. Léon découvrit aussi des lettres d'amour manuscrites très touchantes entre son grand-père et sa grand-mère écrites avant leur mariage, en 1963, remplies de mots tendres et de promesses d'amour éternel. Les lettres étaient parfumées et certaines avaient des taches de ce qui ressemblait à des larmes de joie. C'était comme découvrir une partie magique et cachée de l'histoire familiale!\n\nCe soir-là, après le dîner, Léon demanda à ses grands-parents pourquoi le grenier était interdit cette année. Ses grands-parents se regardèrent, sourirent tendrement l'un à l'autre, et s'assirent avec Léon dans le salon familial. Pendant des heures - presque quatre heures - ils partagèrent des histoires extraordinaires de leur jeunesse, de leurs aventures de guerre, de comment ils s'étaient rencontrés à Paris en 1960, de leurs rêves, de la guerre, et de leur amour qui avait duré magnifiquement pendant 60 ans à travers les bons et les mauvais moments. Grand-père Georges parla avec passion de son expérience de pilote, de la peur et du courage, de ses copains qui n'étaient pas rentrés, de ses rêves d'après-guerre. Grand-mère Margot parla de comment elle attendait ses lettres avec anxiété pendant la guerre, de ses prières chaque nuit, de la joie quand il est revenu vivant. Léon comprit profondément que ses grands-parents avaient mené des vies extraordinaires, courageuses et héroïques, remplies de passion et de dévouement. Il comprit aussi que le grenier était sacré pour eux - c'était un mausolée de leurs souvenirs les plus précieux.\n\nAvant de partir cette année-là, ses grands-parents donnèrent à Léon l'album photo et une des lettres d'amour encadrée pour qu'il se souvienne toujours de leur histoire incroyable.\n\nDepuis combien d'années Léon passait-il des vacances chez ses grands-parents?",
      type: "multiple_choice",
      options: JSON.stringify(["5 ans", "8 ans", "10 ans", "12 ans"]),
      correctAnswer: "10 ans",
      order: 1,
    };

    const readQ9_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 2 (Compréhension)",
      text: "Quel âge avait le grand-père de Léon?",
      type: "multiple_choice",
      options: JSON.stringify(["75 ans", "80 ans", "82 ans", "85 ans"]),
      correctAnswer: "82 ans",
      order: 2,
    };

    const readQ9_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 3 (Compréhension)",
      text: "Quel était le métier du grand-père pendant la guerre?",
      type: "multiple_choice",
      options: JSON.stringify(["Soldat", "Pilote d'avion", "Médecin", "Capitaine de bateau"]),
      correctAnswer: "Pilote d'avion",
      order: 3,
    };

    const readQ9_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi les grands-parents ont-ils finalement partagé leurs histoires?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils étaient en colère contre Léon", "La curiosité de Léon les a touchés et ils voulaient transmettre leur histoire", "Ils voulaient punir Léon", "Léon les a forcés"]),
      correctAnswer: "La curiosité de Léon les a touchés et ils voulaient transmettre leur histoire",
      order: 4,
    };

    const readQ9_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 5 (Interprétation)",
      text: "Quelle est l'importance du grenier pour les grands-parents?",
      type: "multiple_choice",
      options: JSON.stringify(["C'est juste un espace de rangement", "C'est un lieu sacré gardant leurs souvenirs les plus précieux", "Ils n'aiment pas le grenier", "C'est un endroit dangereux"]),
      correctAnswer: "C'est un lieu sacré gardant leurs souvenirs les plus précieux",
      order: 5,
    };

    const readQ9_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà découvert quelque chose de surprenant sur ta famille? Raconte brièvement.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ9_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 7 (Réaction)",
      text: "Y a-t-il un endroit spécial chez tes grands-parents ou dans ta famille que tu aimes explorer?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ9_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise10Id,
      title: "Question 8 (Jugement critique)",
      text: "Léon a désobéi en montant au grenier. Penses-tu qu'il a eu raison ou tort? Explique avec des arguments.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 10: La Course Épique
    const readQ10_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Histoire 10: La Course Épique",
      text: "Victor était un coureur de 12 ans extrêmement rapide et athlétique. Il vivait dans une petite ville montagneuse des Alpes appelée Chamonix. Son école organisait une grande course annuelle de 5 kilomètres à travers la forêt dense et les pentes montagneuses. Victor s'entraînait intensément depuis des mois - courant chaque jour après l'école, faisant de la musculation, et suivant un régime spécial pour les athlètes. Son grand rêve était de finir premier à cette course, de remporter la victoire, et de recevoir le trophée d'or pour son école. Il rêvait d'être reconnu comme le meilleur coureur de sa région.\n\nLe jour de la course, un samedi matin ensoleillé du mois de mai, tous les enfants de l'école se rassemblèrent au point de départ - environ deux cent cinquante enfants de différents niveaux et âges. Victor voyait son rival principal, Pierre, un garçon qui était aussi très rapide et ambitieux. Pierre avait remporté la course l'année dernière et s'entraînait aussi beaucoup pour gagner à nouveau. Leurs familles se connaissaient depuis longtemps.\n\nLa course commença avec le coup de sifflet du directeur. Victor courut aussi vite qu'il pouvait, poussant son corps à ses limites. Il restait deuxième, juste derrière Pierre. Victor était frustré - il donner tout ce qu'il avait, mais Pierre était légèrement plus rapide. Pendant les deux premiers kilomètres, Victor essaya de passer Pierre plusieurs fois, mais Pierre restait devant. \"Je vais te battre!\", pensa Victor avec détermination.\n\nAu kilomètre 3, quelque chose de terrible et inattendu se produisit. Pierre courut sur une racine cachée sous les feuilles tombées. Il glissa soudainement sur la surface mouillée et s'écroula brutalement au sol! Il roula dans la terre et cria de douleur! \"Aaaaaahhhhh! Ma jambe! Ma jambe!\" Victor entendit Pierre crier avec angoisse. C'était maintenant la chance de Victor de gagner! Il pouvait simplement continuer à courir et remporter la victoire qu'il attendait depuis tant de temps!\n\nMais Victor s'arrêta soudainement et regarda Pierre qui gisait au sol, gravement blessé. Pierre avait du mal à sa jambe gauche et ne pouvait pas se relever. Il pleura it de douleur. Victor voyait la blessure - la jambe était gonflée et rougie. Victor fit un choix difficile et moralement crucial. Il oublia sa victoire, son rêve, et son ambition. Il courut vers Pierre.\n\n\"Pierre! Est-ce que ça va? Où as-tu mal?\" demanda Victor avec inquiétude sincère. \"C'est ma jambe. Je crois que je me suis foulé la cheville\", gémit Pierre. Victor l'aida à se lever lentement, mettant le bras de Pierre autour de son cou. Il lui donna de l'eau de sa gourde. Il soutint son ami blessé et l'aida à marcher lentement jusqu'au point d'arrivée à travers les trois derniers kilomètres de la course.\n\nBien qu'aucun d'eux n'ait \"gagné\" techniquement (ils n'ont pas complété la course avant beaucoup d'autres coureurs qui continuaient), tous les spectateurs, les professeurs, et les parents applaudirent chaleureusement l'acte de compassion extraordinaire et de sacrifice de Victor. Le directeur de l'école organisa une cérémonie spéciale et récompensa Victor d'un trophée d'argent pour \"sauvetage humanitaire et amitié sincère\". Plus important encore, Pierre et Victor devinrent des meilleurs amis inséparables après cet événement. La compassion de Victor lui avait apporté une amitié bien plus précieuse qu'une victoire sportive.\n\nQuel âge avait Victor?",
      type: "multiple_choice",
      options: JSON.stringify(["10 ans", "11 ans", "12 ans", "13 ans"]),
      correctAnswer: "12 ans",
      order: 1,
    };

    const readQ10_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 2 (Compréhension)",
      text: "Quelle était la distance de la course?",
      type: "multiple_choice",
      options: JSON.stringify(["3 kilomètres", "5 kilomètres", "7 kilomètres", "10 kilomètres"]),
      correctAnswer: "5 kilomètres",
      order: 2,
    };

    const readQ10_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 3 (Compréhension)",
      text: "Qu'est-il arrivé à Pierre pendant la course?",
      type: "multiple_choice",
      options: JSON.stringify(["Il a abandonné", "Il s'est blessé à la jambe en tombant sur une racine", "Il a gagné la course", "Il s'est perdu"]),
      correctAnswer: "Il s'est blessé à la jambe en tombant sur une racine",
      order: 3,
    };

    const readQ10_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Victor a-t-il choisi d'aider Pierre plutôt que de gagner?",
      type: "multiple_choice",
      options: JSON.stringify(["Il était trop fatigué pour continuer", "Il a fait preuve de compassion et d'humanité", "Les organisateurs lui ont demandé", "Il n'aimait pas courir"]),
      correctAnswer: "Il a fait preuve de compassion et d'humanité",
      order: 4,
    };

    const readQ10_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 5 (Interprétation)",
      text: "Quelle leçon cette histoire nous enseigne-t-elle?",
      type: "multiple_choice",
      options: JSON.stringify(["Gagner est toujours le plus important", "L'entraide et l'amitié sont plus précieuses que la victoire", "Il ne faut jamais aider ses rivaux", "Les courses sont dangereuses"]),
      correctAnswer: "L'entraide et l'amitié sont plus précieuses que la victoire",
      order: 5,
    };

    const readQ10_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 6 (Réaction)",
      text: "Qu'aurais-tu fait à la place de Victor? Aurais-tu continué la course ou aidé Pierre?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ10_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 7 (Réaction)",
      text: "Raconte un moment où tu as dû choisir entre ton intérêt personnel et aider quelqu'un d'autre.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ10_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise11Id,
      title: "Question 8 (Jugement critique)",
      text: "Le directeur a donné un trophée à Victor pour son acte. Penses-tu que c'était une bonne décision? Explique.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 11: Le Festival Annuel
    const readQ11_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Histoire 11: Le Festival Annuel",
      text: "Chaque année, le village pittoresque de Sainte-Marguerite, situé en Provence, organisait un grand festival d'été spectaculaire avec de la musique live variée, de la danse traditionnelle et moderne, des feux d'artifice pyrotechniques magnifiques, et des spectacles de cirque. C'était l'événement le plus attendu et le plus important de l'année - une fête de trois jours qui réunissait tous les villageois et de nombreux visiteurs de villages voisins. Iris, une fille de 11 ans intelligente et dévouée, décida de devenir bénévole pour aider l'équipe organisatrice du festival. Elle voulait faire partie de quelque chose de grand et d'important.\n\nPendant les trois semaines précédentes le festival, Iris et vingt autres bénévoles travaillèrent dur pour préparer l'événement - décorer magnifiquement les rues principales avec des drapeaux et des lumières, construire les scènes en bois pour les musiciens et les danseurs, vérifier tous les équipements techniques, installer les systèmes d'électricité, et préparer les zones de camping. Iris adorait être utile et se sentait fière de faire partie d'une équipe. Elle travailler après l'école et les week-ends, sans se plaindre. Elle faisait des tâches difficiles comme porter des boxes lourdes, peindre des bannières, et organiser les câbles électriques.\n\nMais trois jours avant le festival, le jour du 10 juillet, il y eut un problème technique catastrophique! Le système d'électricité complexe pour les lumières, l'amplification du son, et les équipements de spectacle s'est soudainement cassé! Une panne électrique totale! Sans électricité, il n'y aurait pas de musique live, pas de lumières spectaculaires, pas de feux d'artifice, pas de spectacles! Le festival entier risquait d'être annulé ou sérieusement compromis! Les organisateurs étaient désespérés et paniqués. \"C'est fini\", disait le responsable du festival, la tête dans ses mains.\n\nMais Iris et les autres bénévoles ont refusé d'abandonner. Ils se mobilisèrent immédiatement. Iris proposa des solutions créatives. Ils appelèrent un électricien professionnel d'urgence, ils empruntèrent des générateurs de secours auprès des entreprises locales, ils travaillèrent toute la nuit - trois nuits entières sans dormir! Iris n'abandonna pas un seul instant. Elle tira des câbles, testa les circuits, nettoya les connexions rouillées, et reconstruisit presque entièrement le système électrique avec l'aide de l'électricien et de ses camarades bénévoles. Au final, grâce aux efforts héroïques d'Iris et des autres bénévoles, ils réparèrent le système électrique juste à temps - à seulement deux heures avant le début du festival!\n\nLe festival se déroula magnifiquement comme prévu, avec de la musique joyeuse, des lumières spectaculaires, et des spectacles extraordinaires. C'était un grand succès complet! Les organisateurs remercièrent chaleureusement Iris et tous les bénévoles, les reconnaissant comme les héros du festival. Iris reçut un certificat d'honneur du maire du village.\n\nQuel âge avait Iris?",
      type: "multiple_choice",
      options: JSON.stringify(["9 ans", "10 ans", "11 ans", "12 ans"]),
      correctAnswer: "11 ans",
      order: 1,
    };

    const readQ11_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 2 (Compréhension)",
      text: "Combien de jours avant le festival le problème électrique s'est-il produit?",
      type: "multiple_choice",
      options: JSON.stringify(["1 jour", "2 jours", "3 jours", "5 jours"]),
      correctAnswer: "3 jours",
      order: 2,
    };

    const readQ11_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 3 (Compréhension)",
      text: "Combien de temps avant le début du festival ont-ils fini les réparations?",
      type: "multiple_choice",
      options: JSON.stringify(["30 minutes", "2 heures", "5 heures", "1 jour"]),
      correctAnswer: "2 heures",
      order: 3,
    };

    const readQ11_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi les bénévoles ont-ils refusé d'abandonner?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils voulaient de l'argent", "Ils étaient dévoués à leur communauté et voulaient sauver le festival", "Ils avaient peur des organisateurs", "Ils n'avaient rien d'autre à faire"]),
      correctAnswer: "Ils étaient dévoués à leur communauté et voulaient sauver le festival",
      order: 4,
    };

    const readQ11_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous montre cette histoire sur le bénévolat?",
      type: "multiple_choice",
      options: JSON.stringify(["C'est une perte de temps", "Le travail d'équipe et le dévouement peuvent surmonter les obstacles", "Il ne faut jamais aider gratuitement", "Les festivals sont trop compliqués"]),
      correctAnswer: "Le travail d'équipe et le dévouement peuvent surmonter les obstacles",
      order: 5,
    };

    const readQ11_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà participé comme bénévole à un événement? Raconte ton expérience.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ11_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 7 (Réaction)",
      text: "Si tu devais organiser un festival, quelles activités proposerais-tu?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ11_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise12Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les bénévoles comme Iris sont suffisamment reconnus pour leur travail? Explique ton opinion.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 12: L'Animal Perdu
    const readQ12_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Histoire 12: L'Animal Perdu",
      text: "Max était un golden retriever adoré par toute la rue du Bois-Joli, une petite rue paisible dans un quartier résidentiel. Il appartenait à la famille Dubois depuis neuf ans. Max était un ami loyal, gentil, et joyeux pour tous le voisins. Chaque jour, Max jouait dans la cour clôturée de la famille Dubois et saluait tous ses voisins avec enthousiasme quand ils passaient - remuant sa queue, jappant joyeusement, et cherchant à être caressé. Les enfants du quartier adoraient jouer avec Max. Il était le cœur du quartier.\n\nUn matin du samedi 5 novembre, Max disparut mystérieusement! La famille Dubois l'avait laissé dehors dans la cour pour faire ses besoins vers 7 heures du matin. Quand la mère de la famille, Stéphanie, retourna dix minutes plus tard, la porte était toujours ouverte, mais Max n'était plus là! Elle appela frénétiquement: \"Max! Max! Où es-tu?\" Pas de réponse. Elle chercha dans toute la maison et le quartier pendant une heure, paniquée. Son mari Thomas revint du travail et ils cherchèrent partout ensemble mais ne le trouvèrent nulle part. Ils étaient dévastés et leur cœur était brisé. Leur enfant, Marine, pleura pendant des heures. Ils pensaient qu'on l'avait volé ou qu'il s'était perdu à jamais.\n\nDésespérés, la famille Dubois mit des affiches colorées partout dans le quartier: \"CHIEN PERDU - RÉCOMPENSE 500 EUROS. Max, golden retriever, 9 ans, très gentil. S'il vous plaît appelez...\" Ils appelèrent aussi les refuges pour animaux, la police, et les vétérinaires de la région.\n\nLes voisins apprirent rapidement la nouvelle et décidèrent d'aider immédiatement. Trois enfants du quartier - Léa (13 ans), Tomás (12 ans) et Adèle (11 ans) - organisèrent une équipe de recherche systématique. Ils créèrent des cartes du quartier, divisèrent les zones, et établirent un plan de recherche. Pendant trois jours entiers, ils cherchèrent intensivement dans les parcs, les forêts proches, les abris pour animaux, les zones industrielles abandonnées, et même les canaux à proximité. Ils questionnaient chaque personne qu'ils rencontraient. Ils distribuaient des affiches. Léa utilisa aussi les réseaux sociaux pour diffuser la photo de Max.\n\nAprès trois jours très long de recherche intensive, le mardi soir vers 18 heures, Adèle entendit un aboiement faible et familier près du vieux pont délabré qui traversait la rivière à la limite du quartier. Elle alertes immédiatement Léa et Tomás. Ils regardèrent attentivement et virent Max! Il était coincé dans un petit buisson épais au bord du pont, à moitié dans l'eau! Il avait dû tomber du pont en essayant de chasser un chat trois jours plus tôt et ne pouvait pas se sortir. Il était blessé, mouillé, tremblant, et affamé, mais vivant! Les enfants travaillèrent ensemble pour le sortir du buisson dangereux sans le blesser davantage. C'était difficile mais ils réussirent!\n\nLes enfants ramenèrent Max immédiatement à sa famille. La famille Dubois pleura de joie absolue quand ils virent Max! Marine courait vers Max et l'embrassa. Toute la maison était remplie de larmes de bonheur! Max fut examiné par un vétérinaire - il avait quelques blessures mineures mais aucune blessure grave. Il guérit rapidement.\n\nLes voisins du quartier organisèrent une grande fête le samedi suivant pour célébrer le retour de Max et pour remercier Léa, Tomás et Adèle pour leur courage, leur intelligence, et leur dévouement. Les enfants reçurent chacun une récompense de cent euros de la famille Dubois, et plus important encore, ils reçurent l'amitié éternelle de Max et de toute la famille.\n\nDepuis combien d'années Max appartenait-il à la famille Dubois?",
      type: "multiple_choice",
      options: JSON.stringify(["5 ans", "7 ans", "9 ans", "11 ans"]),
      correctAnswer: "9 ans",
      order: 1,
    };

    const readQ12_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 2 (Compréhension)",
      text: "Pendant combien de jours les enfants ont-ils cherché Max?",
      type: "multiple_choice",
      options: JSON.stringify(["1 jour", "2 jours", "3 jours", "5 jours"]),
      correctAnswer: "3 jours",
      order: 2,
    };

    const readQ12_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 3 (Compréhension)",
      text: "Où Max a-t-il été retrouvé?",
      type: "multiple_choice",
      options: JSON.stringify(["Dans un parc", "Dans un buisson près du vieux pont", "Chez un voisin", "Au refuge pour animaux"]),
      correctAnswer: "Dans un buisson près du vieux pont",
      order: 3,
    };

    const readQ12_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi les enfants du quartier ont-ils décidé d'aider?",
      type: "multiple_choice",
      options: JSON.stringify(["Pour l'argent de la récompense", "Par solidarité et amour pour Max qui était l'ami de tous", "Les parents les ont obligés", "Ils n'avaient rien d'autre à faire"]),
      correctAnswer: "Par solidarité et amour pour Max qui était l'ami de tous",
      order: 4,
    };

    const readQ12_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous montre cette histoire sur la communauté?",
      type: "multiple_choice",
      options: JSON.stringify(["Les voisins ne s'entraident jamais", "Une communauté solidaire peut accomplir beaucoup ensemble", "Il faut toujours garder ses animaux enfermés", "Les enfants ne peuvent pas aider"]),
      correctAnswer: "Une communauté solidaire peut accomplir beaucoup ensemble",
      order: 5,
    };

    const readQ12_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 6 (Réaction)",
      text: "As-tu un animal de compagnie? Si oui, que ferais-tu s'il disparaissait?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ12_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 7 (Réaction)",
      text: "Connais-tu tes voisins? Penses-tu qu'ils t'aideraient si tu avais un problème?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ12_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise13Id,
      title: "Question 8 (Jugement critique)",
      text: "Les enfants ont reçu 100 euros chacun. Penses-tu que l'argent était la bonne façon de les remercier? Explique.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 13: Le Trésor Caché du Jardin
    const readQ13_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Histoire 13: Le Trésor Caché du Jardin",
      text: "Olivier, un garçon intelligent et curieux de dix ans, jouait dans le grand jardin magnifique de sa grand-mère Marie à la campagne en Loire-et-Cher. C'était un jardin extraordinaire avec des roses de plusieurs couleurs, des arbres fruitiers centenaires - des pommiers, des poiriers, des cerisiers - et une petite fontaine en pierre datant du 19e siècle. Olivier adorait jouer au détective et à l'explorateur dans ce jardin magique. Il imaginait qu'il était un archéologue découvrant des secrets cachés.\n\nUn jour du mois de juin, en creusant profondément sous un vieux pommier noirci par le temps, sa pelle en métal toucha quelque chose de dur avec un bruit métallique. Son cœur sauta! Olivier creusa plus attentivement et découvrit une vieille boîte en bois complètement rouillée par le temps et couverte de terre épaisse et de racines. Elle était impressionnante et mystérieuse. Bien que la boîte soit rouillée et ancienne, elle était étonnamment intacte - aucune fissure, aucun trou.\n\nOlivier appela sa grand-mère. Ensemble, ils nettoyèrent la boîte très attentivement. À l'intérieur, qui était rempli d'une poudre préservative, Olivier trouva une vieille carte dessinée à la main sur du parchemin jauni, des pièces d'or anciennes d'au moins 200 ans, des bijoux en argent magnifiquement travaillés, et une lettre manuscrite très ancienne. La lettre était signée par \"Antoine de Beaumont, marquis, 1756\". Elle était écrite en français ancien et expliquait qu'Antoine de Beaumont avait enterré ces objets de valeur pour les protéger pendant la Révolution française, une période de violence et de chaos!\n\nOlivier et sa grand-mère contactèrent le musée local. Les experts archéologues examinèrent attentivement tous les objets avec fascination. Ils confirmèrent que c'était une trouvaille historique extrêmement importante et rare! Les pièces étaient de véritables pièces d'or de l'époque royale française. Les bijoux étaient des pièces d'orfèvrerie ancienne de haute qualité. La lettre était un document historique authentique témoignant de la vie pendant la Révolution!\n\nOlivier devint célèbre dans toute la région comme \"l'enfant qui a découvert le trésor du marquis\". Il reçut une bourse complète pour une université prestigieuse d'études archéologiques, un prix du maire, et même une exposition au musée portant son nom. Plus tard, Olivier devint un archéologue de renommée mondiale, découvrant plusieurs autres importants trésors historiques!\n\nQuel âge avait Olivier?",
      type: "multiple_choice",
      options: JSON.stringify(["8 ans", "9 ans", "10 ans", "11 ans"]),
      correctAnswer: "10 ans",
      order: 1,
    };

    const readQ13_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 2 (Compréhension)",
      text: "De quelle année datait la lettre dans la boîte?",
      type: "multiple_choice",
      options: JSON.stringify(["1656", "1756", "1856", "1956"]),
      correctAnswer: "1756",
      order: 2,
    };

    const readQ13_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 3 (Compréhension)",
      text: "Qui avait signé la lettre?",
      type: "multiple_choice",
      options: JSON.stringify(["Un roi", "Antoine de Beaumont, un marquis", "Un soldat", "Un paysan"]),
      correctAnswer: "Antoine de Beaumont, un marquis",
      order: 3,
    };

    const readQ13_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi le marquis avait-il enterré ses objets de valeur?",
      type: "multiple_choice",
      options: JSON.stringify(["Il les avait oubliés", "Pour les protéger pendant la Révolution française", "Il n'en voulait plus", "Pour un jeu de chasse au trésor"]),
      correctAnswer: "Pour les protéger pendant la Révolution française",
      order: 4,
    };

    const readQ13_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 5 (Interprétation)",
      text: "Comment cette découverte a-t-elle changé la vie d'Olivier?",
      type: "multiple_choice",
      options: JSON.stringify(["Il est devenu riche", "Elle a éveillé sa passion pour l'archéologie et lui a ouvert des portes", "Rien n'a changé", "Il est devenu célèbre à la télévision"]),
      correctAnswer: "Elle a éveillé sa passion pour l'archéologie et lui a ouvert des portes",
      order: 5,
    };

    const readQ13_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 6 (Réaction)",
      text: "Aimerais-tu faire une découverte historique comme Olivier? Pourquoi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ13_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 7 (Réaction)",
      text: "Si tu trouvais un trésor, que ferais-tu avec?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ13_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise14Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu qu'Olivier aurait dû garder le trésor ou le donner au musée? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 14: La Tempête
    const readQ14_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Histoire 14: La Tempête",
      text: "La famille Martins, composée du père Robert, de la mère Évelyne, et de leurs trois enfants - Thomas (13 ans), Léa (7 ans) et Sophie (10 ans) - organisait un grand pique-nique familial dans la belle forêt de la Vallée de Chevreuse, à l'ouest de Paris. C'était un dimanche de juillet parfaitement prévisible et idéal. Le soleil brillait magnifiquement, le ciel était d'un bleu cristallin et tout semblait absolument parfait pour une journée en famille. Les enfants jouaient joyeusement à des jeux - cache-cache, balle volante - les parents mangeaient et riaient, assis sur une couverture pique-nique rouge. C'était un dimanche merveilleux et mémorable.\n\nMais soudain, vers 15 heures, le ciel devint complètement noir en quelques minutes seulement. Des nuages menaçants et anguleux arrivèrent rapidement, cachant le soleil entièrement. Le vent commença à souffler fort et violent - des rafales qui secouaient les arbres. Les feuilles et les branches volaient partout. Robert remarqua les premiers éclairs lointains. Les parents réalisèrent immédiatement qu'une tempête violente arrivait très vite - peut-être une tempête d'orage importante!\n\nEn une minute environ, la pluie torrentielle commença à tomber abondamment! Ce n'était pas une pluie normale - c'était une pluie de tempête intense. La tempête était extrêmement violente avec du tonnerre assourdissant qui résonnait à travers la forêt et des éclairs zigzaguants qui illuminaient le ciel. Les enfants eurent très peur! Évelyne cria: \"Rentrez à l'intérieur!\" La famille essaya de se réfugier sous les grands arbres mais ce n'était pas assez sûr - les éclairs frappaient près des arbres.\n\nRobert fit une décision rapide. Il prit rapidement les trois enfants par les mains et courut vers la voiture stationnée à environ cent mètres de là. Tout le monde courait aussi vite qu'ils pouvaient à travers la pluie torrentiella. Les enfants criaient. Dans la confusion totale et le chaos de la tempête, la petite fille Léa se sépara accidentellement de sa mère! Elle avait glissé dans la boue et s'était perdue! Tout le monde cria frénétiquement son nom: \"Léa! Léa! Où es-tu?!\" Les parents paniquèrent absolument. Robert arrêta la voiture et cria: \"On ne part pas sans Léa!\"\n\nAprès quelques minutes terrifiantes qui semblèrent comme des heures, Robert la retrouva en train d'attendre courageusement sous un buisson dense qui l'avait protégée des éclairs. Elle était complètement mouillée, tremblante et effrayée mais miraculement en sécurité! Robert la souleva et courut à la voiture. Toute la famille se réunit enfin dans la voiture. Robert démarra rapidement et ils rentrèrent à la maison. Bien que l'expérience ait été extrêmement terrifiante et traumatisante, la famille devint profondément plus unie et infiniment reconnaissante de s'avoir les uns les autres. Ils comprirent combien l'amour familial était précieux.\n\n",
      type: "multiple_choice",
      options: JSON.stringify(["À la plage", "Dans la forêt", "Au parc de la ville", "En montagne"]),
      correctAnswer: "Dans la forêt",
      order: 1,
    };

    const readQ14_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 2 (Compréhension)",
      text: "À quelle heure la tempête a-t-elle commencé?",
      type: "multiple_choice",
      options: JSON.stringify(["13 heures", "14 heures", "15 heures", "16 heures"]),
      correctAnswer: "15 heures",
      order: 2,
    };

    const readQ14_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 3 (Compréhension)",
      text: "Qui s'est perdu pendant la tempête?",
      type: "multiple_choice",
      options: JSON.stringify(["Thomas", "Sophie", "Léa", "Évelyne"]),
      correctAnswer: "Léa",
      order: 3,
    };

    const readQ14_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi la famille est-elle devenue plus unie après cette expérience?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils ont gagné de l'argent", "Ils ont compris la valeur de l'amour familial face au danger", "Ils ont décidé de déménager", "Ils ont acheté une nouvelle voiture"]),
      correctAnswer: "Ils ont compris la valeur de l'amour familial face au danger",
      order: 4,
    };

    const readQ14_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous enseigne cette histoire sur les situations de crise?",
      type: "multiple_choice",
      options: JSON.stringify(["Il faut toujours rester chez soi", "Les crises peuvent renforcer les liens familiaux", "Les pique-niques sont dangereux", "Il ne faut jamais faire confiance à la météo"]),
      correctAnswer: "Les crises peuvent renforcer les liens familiaux",
      order: 5,
    };

    const readQ14_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà vécu une situation effrayante avec ta famille? Comment as-tu réagi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ14_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 7 (Réaction)",
      text: "Que ferais-tu si tu te retrouvais séparé de ta famille dans une situation d'urgence?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ14_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise15Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les parents ont bien géré la situation? Qu'auraient-ils pu faire différemment?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 15: L'Île Déserte
    const readQ15_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Histoire 15: L'Île Déserte",
      text: "Pendant les vacances d'été du mois d'août, Luc, un garçon courageux et aventurier de douze ans, partit en bateau avec sa famille pour une croisière méditerranéenne. Ils voyageaient vers plusieurs îles grecques. Le voyage était merveilleux les premières trois jours - soleil, mer calme, paysages magnifiques. Luc adorait cette aventure!\n\nMais le quatrième jour, une situation catastrophique se produisit. Il y avait un orage violent et imprévu qui arriva soudainement. Le bateau fut secoué violemment par des vagues géantes. Le bateau tangua dangereusement d'un côté à l'autre. Les passagers criaient. Dans la confusion totale et le chaos, Luc, qui était sur le pont supérieur, glissa et tomba à l'eau! Il cria à l'aide!\n\nLuc nagea aussi fort qu'il pouvait, luttant contre les vagues furieuses. Le bateau s'éloigna rapidement dans la tempête - ils ne l'avaient pas entendu crier. Luc nagea désespérément pendant une heure, craignant pour sa vie. Finalement, épuisé, il atteignit une petite île déserte et montagneuse qu'il vit à travers les vagues. Il s'écroula sur la plage, respirant et tremblant.\n\nLuc se retrouva soudain seul sur une île avec seulement ses vêtements mouillés et une montre. Il n'y avait personne - aucune trace d'habitation humaine. Pas de nourriture, pas d'eau douce potable, rien du tout! Luc eut très peur mais aussi déterminé à survivre. Il savait qu'il devait être intelligent et fort.\n\nIl utilisa son intelligence et ses connaissances de survie pour survivre. Il creusa un petit puits en bas de la montagne et trouva de l'eau souterraine potable. Il attrapa des poissons à mains nues dans les petits étangs. Il construisit un abri confortable avec des branches d'arbre et du feuillage épais. Il fit un feu avec des silex qu'il trouva et du bois mort. Il mangea des noix et des racines. Il créa un grand signal de détresse sur la plage avec des rochers blancs formant le mot \"AIDE\" visible de très loin.\n\nAprès trois jours et trois nuits très long d'isolement, un bateau de pêche français vit le signal de détresse sur la plage! Luc cria et agita les bras frénétiquement. Ils le virent! Le bateau arrêta et le sauva! Luc fut amené au hôpital le plus proche où il se rétablit complètement. Il retrouva sa famille qui le pensait mort. C'était une réunion émotionnelle!\n\nLuc devint célèbre dans les journaux du monde entier comme \"le garçon courageux qui a survécu trois jours seul sur une île déserte\"! Il reçut des prix de survie et d'courage. Il inspira des millions de personnes!\n\nQuel âge avait Luc?",
      type: "multiple_choice",
      options: JSON.stringify(["10 ans", "11 ans", "12 ans", "13 ans"]),
      correctAnswer: "12 ans",
      order: 1,
    };

    const readQ15_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 2 (Compréhension)",
      text: "Combien de temps Luc a-t-il survécu seul sur l'île?",
      type: "multiple_choice",
      options: JSON.stringify(["1 jour", "2 jours", "3 jours", "5 jours"]),
      correctAnswer: "3 jours",
      order: 2,
    };

    const readQ15_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 3 (Compréhension)",
      text: "Comment Luc a-t-il créé un signal de détresse?",
      type: "multiple_choice",
      options: JSON.stringify(["Avec un feu", "Avec des rochers blancs formant le mot AIDE", "Avec une bouteille à la mer", "Avec un drapeau"]),
      correctAnswer: "Avec des rochers blancs formant le mot AIDE",
      order: 3,
    };

    const readQ15_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 4 (Interprétation)",
      text: "Quelles qualités ont permis à Luc de survivre?",
      type: "multiple_choice",
      options: JSON.stringify(["Sa chance", "Son intelligence, sa détermination et ses connaissances de survie", "L'aide des animaux", "Le beau temps"]),
      correctAnswer: "Son intelligence, sa détermination et ses connaissances de survie",
      order: 4,
    };

    const readQ15_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous apprend cette histoire sur la résilience?",
      type: "multiple_choice",
      options: JSON.stringify(["Il faut toujours abandonner", "La détermination et l'ingéniosité peuvent nous sauver dans les situations difficiles", "Les voyages en bateau sont dangereux", "Il ne faut jamais voyager"]),
      correctAnswer: "La détermination et l'ingéniosité peuvent nous sauver dans les situations difficiles",
      order: 5,
    };

    const readQ15_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 6 (Réaction)",
      text: "Si tu étais seul sur une île déserte, quelle serait ta première action? Pourquoi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ15_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 7 (Réaction)",
      text: "Quelles compétences de survie aimerais-tu apprendre?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ15_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise16Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que Luc a eu de la chance ou qu'il a mérité d'être sauvé grâce à ses efforts? Explique.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 16: La Bibliothèque Secrète
    const readQ16_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Histoire 16: La Bibliothèque Secrète",
      text: "Félix, un garçon introverti et sensible de douze ans, aimait profondément être seul et en paix. L'école était extrêmement bruyante avec ses centaines d'élèves criards, et le chaos constant de la vie scolaire l'épuisait profondément - les cris dans les couloirs, les matchs de football violent à la cour, les salles de classe surpeuplées. Félix aspirait à la tranquillité et à la solitude.\n\nUn jour, se promenant seul dans les couloirs abandonnés de l'école pendant la pause, il remarqua une vieille porte rouillée cachée derrière une grande affiche de football décolorée. La porte était presque invisible - personne d'autre ne l'avait jamais remarquée. Félix était curieux. Il l'ouvrit lentement.\n\nIl découvrit une magnifique bibliothèque secrète extraordinaire! Elle était remplie de milliers de livres anciens et modernes alignés sur les murs du sol au plafond, complètement silencieuse et paisible comme un temple. Il y avait des fauteuils club confortables en cuir, une petite lampe douce qui créait une ambiance chaude, et des fenêtres françaises avec une vue sur un beau jardin vert. C'était comme un monde complètement différent - magique et merveilleux.\n\nFélix rentra dans ce monde magique secret chaque jour après l'école pendant deux heures. Il lut des livres de science-fiction époustouflants, des aventures extraordinaires, des histoires d'amour émouvantes, des biographies inspirantes. Chaque livre l'emmenait dans des mondes différents, loin du chaos de l'école. Il se fit même un ami précieux - le bibliothécaire bienveillant, Monsieur Deschamps, qui avait 70 ans et qui aimait partager ses connaissances avec Félix.\n\nAu fil du temps - des mois et des années - Félix devint un grand lecteur passionné et culturellement érudit. Son amour profond pour les livres le changea complètement en tant que personne. Il gagna la confiance en lui-même à travers les personnages courageux des histoires. Il trouva des amis à travers le club de lecture. Il trouva l'inspiration et le sens de la vie à travers la littérature. Sa vie changea profondément grâce à cette bibliothèque secrète magique. Plus tard, Félix devint écrivain et professeur de littérature.\n\n",
      type: "multiple_choice",
      options: JSON.stringify(["Il était triste", "L'école était bruyante et le chaos l'épuisait", "Il était malade", "Il n'aimait pas les gens"]),
      correctAnswer: "L'école était bruyante et le chaos l'épuisait",
      order: 1,
    };

    const readQ16_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 2 (Compréhension)",
      text: "Où Félix a-t-il trouvé la porte secrète?",
      type: "multiple_choice",
      options: JSON.stringify(["Dans le gymnase", "Derrière une affiche de football", "Dans la cantine", "Dans la cour"]),
      correctAnswer: "Derrière une affiche de football",
      order: 2,
    };

    const readQ16_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 3 (Compréhension)",
      text: "Quel âge avait le bibliothécaire Monsieur Deschamps?",
      type: "multiple_choice",
      options: JSON.stringify(["60 ans", "65 ans", "70 ans", "75 ans"]),
      correctAnswer: "70 ans",
      order: 3,
    };

    const readQ16_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi la bibliothèque était-elle si importante pour Félix?",
      type: "multiple_choice",
      options: JSON.stringify(["Il pouvait y dormir", "Elle lui offrait la paix et l'évasion qu'il cherchait", "Il y trouvait de l'argent", "Elle était proche de chez lui"]),
      correctAnswer: "Elle lui offrait la paix et l'évasion qu'il cherchait",
      order: 4,
    };

    const readQ16_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 5 (Interprétation)",
      text: "Comment les livres ont-ils transformé la personnalité de Félix?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils l'ont rendu plus timide", "Ils lui ont donné confiance et des amis", "Ils l'ont rendu paresseux", "Ils n'ont eu aucun effet"]),
      correctAnswer: "Ils lui ont donné confiance et des amis",
      order: 5,
    };

    const readQ16_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 6 (Réaction)",
      text: "As-tu un endroit spécial où tu aimes te réfugier? Décris-le.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ16_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 7 (Réaction)",
      text: "Quel livre ou activité t'aide à te sentir mieux quand tu es stressé?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ16_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise17Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les écoles devraient avoir plus d'espaces calmes pour les élèves comme Félix? Pourquoi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 17: Le Concert Spécial
    const readQ17_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Histoire 17: Le Concert Spécial",
      text: "Depuis l'âge de 5 ans, Camille, une fille douée et passionnée de 12 ans, jouait du piano avec dévouement dans sa petite ville de Bourgogne. Elle rêvait profondément de devenir une pianiste professionnelle célèbre, peut-être comme ses héroïnes - Alicia Keys ou Lang Lang. Elle pratiquait plusieurs heures chaque jour - deux ou trois heures minimum, plus le week-end - ses doigts dansaient gracieusement sur les touches en ivoire du vieux piano à queue noir qui appartenait à ses parents. Elle jouait tout - du classique de Chopin au moderne, en passant par le jazz. Ses voisins pouvaient l'entendre pratiquer ses gammes, ses concertos, ses sonates, chaque jour après l'école et le week-end.\n\nUn jour du mois de mars, son professeur de musique, Monsieur Beaumont, l'invita personnellement à jouer en solo dans le grand concert de printemps de l'école - un événement annuel très prestigieux devant environ mille personnes! C'était une opportunité énorme et honneur extraordinaire! Camille était initialement excitée et confiante. Elle sélectionna \"Clair de Lune\" de Debussy comme sa pièce - une composition magnifique mais très difficile.\n\nLa nuit avant le concert, Camille ne put absolument pas dormir. Son esprit tournoyait avec des pensées négatives. Elle eut le trac terrible et paralysant. Elle pensa sérieusement à abandonner et à prétendre être malade le jour suivant. \"Et si je faisais des erreurs terribles? Et si j'oubliais complètement la musique au milieu de la performance? Et si je déçois tout le monde - mes parents, mon professeur, l'école entière?\" Elle se sentait paralysée par la peur.\n\nMais le matin du concert, sa mère, Isabelle, la regarda dans les yeux avec amour et tendresse et lui dit: \"Camille, tu as travaillé si dur pendant des mois. Tu es prête, crois-moi. Tu as le talent et la technique. La musique vient de ton cœur, pas de ta tête. Ne pense pas aux erreurs - sents la musique.\"\n\nSur la scène du grand auditorium, devant les mille spectateurs silencieux, Camille monta lentement s'asseoir au piano noir sous les lumières brillantes du projecteur. Elle vit l'audience massive assise silencieusement, attendant. Son trac augmenta encore. Mais elle ferma les yeux, prit une profonde respiration calmante, pensa à sa mère, et commença à jouer.\n\nLa musique coulait magnifiquement et émotionnellement de ses doigts! Elle jouait avec passion absolue et précision technique! Ses mains volaient sur les touches. L'audience était complètement silencieuse - hypnotisée par sa performance. Quand elle termina les dernières notes, il y eut un moment de silence complet - puis l'audience entière se leva et applaudit passionnément pendant cinq minutes entières! Les gens criaient \"Bravo!\" Camille sentit les larmes de joie sur ses joues. Elle comprit profondément que son dur travail incessant, sa persévérance, et sa foi en elle-même avaient porté leurs fruits. Elle reçut le prix du meilleur soliste de l'année!\n\n",
      type: "multiple_choice",
      options: JSON.stringify(["La danse", "La musique et le piano", "Le dessin", "L'écriture"]),
      correctAnswer: "La musique et le piano",
      order: 1,
    };

    const readQ17_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 2 (Compréhension)",
      text: "Depuis quel âge Camille jouait-elle du piano?",
      type: "multiple_choice",
      options: JSON.stringify(["3 ans", "4 ans", "5 ans", "6 ans"]),
      correctAnswer: "5 ans",
      order: 2,
    };

    const readQ17_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 3 (Compréhension)",
      text: "Quelle pièce Camille a-t-elle choisie pour le concert?",
      type: "multiple_choice",
      options: JSON.stringify(["Für Elise de Beethoven", "Clair de Lune de Debussy", "Nocturne de Chopin", "Arabesque de Schumann"]),
      correctAnswer: "Clair de Lune de Debussy",
      order: 3,
    };

    const readQ17_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 4 (Interprétation)",
      text: "Quel conseil de sa mère a aidé Camille à surmonter sa peur?",
      type: "multiple_choice",
      options: JSON.stringify(["De ne pas jouer", "De sentir la musique avec le cœur plutôt que de penser aux erreurs", "De jouer plus vite", "De regarder l'audience"]),
      correctAnswer: "De sentir la musique avec le cœur plutôt que de penser aux erreurs",
      order: 4,
    };

    const readQ17_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous enseigne cette histoire sur la confiance en soi?",
      type: "multiple_choice",
      options: JSON.stringify(["La confiance n'est pas importante", "Le travail acharné et la foi en soi-même portent leurs fruits", "Il faut éviter les défis", "La peur est toujours justifiée"]),
      correctAnswer: "Le travail acharné et la foi en soi-même portent leurs fruits",
      order: 5,
    };

    const readQ17_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 6 (Réaction)",
      text: "As-tu déjà ressenti le trac avant un événement important? Comment l'as-tu géré?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ17_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 7 (Réaction)",
      text: "Quelle passion ou activité pratiques-tu avec dévouement?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ17_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise18Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que Camille aurait dû abandonner si elle n'avait pas réussi? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 18: La Lettre du Futur
    const readQ18_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Histoire 18: La Lettre du Futur",
      text: "À l'école Jeanne d'Arc de Reims, le professeur de français, Madame Leclerc, donna un projet intéressant et créatif à sa classe de sixième: \"Écrivez une lettre très personnelle au vous-même du futur. Décrivez en détail vos rêves, vos espoirs, vos peurs, vos objectifs pour les 10 prochaines années. Soyez honnête et vulnérable. Nous scelllerons ces lettres solennellement et nous les ouvrirons exactement dans 10 ans quand vous aurez 22 ans!\"\n\nSarah, une fille imaginative de 12 ans, écrivit une longue lettre très sincère et détaillée. Elle écrivit passionnément sur ses rêves de voyager dans des pays exotiques - la Thaïlande, le Maroc, le Japon - d'avoir une bonne carrière comme journaliste, de contribuer positivement à la société, de voir le monde et l'humanité changer pour le mieux. Elle parla de ses peurs aussi - peur de l'échec, peur de décevoir ses parents. Elle écrivit: \"Chère Sarah du futur, j'espère que tu as réalisé tes rêves et que tu es heureuse.\"\n\nAprès quelques semaines, en nettoyant profondément sa chambre en désordre, en vidant les placards et en réorganisant les choses sous le vieux plancher, Sarah découvrit accidentellement une vieille lettre jaunâtre cachée sous un floorboard ancien. Elle était très ancienne et usée par le temps, enveloppée dans du papier journal de 1960. En l'ouvrant délicatement, elle vit qu'elle avait été écrite par quelqu'un en 2010 - exactement 13 ans auparavant! L'écriture était celle d'une jeune fille d'environ 12-13 ans.\n\nLa lettre parlait avec passion des rêves d'une fille du même âge que Sarah. Les rêves étaient étonnamment similaires aux siens - voyager autour du monde, réussir dans la vie, avoir une carrière significative, être heureux et faire une différence. La fille parlait de ses peurs aussi. C'était profondément émotionnel - comme si quelqu'un d'une époque passée parlait directement à Sarah à travers le temps!\n\nSarah montra la lettre mystérieuse à ses parents, tremblant d'excitation. Ses parents furent surpris et se regardèrent avec une expression significative. Ils lui racontèrent finalement la vérité - c'était la maison de sa grand-mère avant! Sa grand-mère avait vendu la maison à ses parents il y a trois ans seulement! La lettre avait probablement été écrite par un autre enfant qui habitait cette maison il y a 13 ans - avant que la grand-mère ne la vende!\n\nSarah fut profondément ému par cette découverte. Cet événement magique inspira Sarah à rêver encore plus grand et à croire fermement que les rêves peuvent se réaliser et que les connexions humaines transcendent le temps et l'espace. Elle alla même chercher le contact de la grand-mère de la maison précédente et échangea des lettres avec la fille qui avait écrit la lettre mystérieuse!\n\n",
      type: "multiple_choice",
      options: JSON.stringify(["Écrire une biographie", "Écrire une lettre au futur à soi-même", "Faire un journal", "Créer une histoire fictive"]),
      correctAnswer: "Écrire une lettre au futur à soi-même",
      order: 1,
    };

    const readQ18_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 2 (Compréhension)",
      text: "Dans quelle école étudiait Sarah?",
      type: "multiple_choice",
      options: JSON.stringify(["École Victor Hugo", "École Jeanne d'Arc", "École Marie Curie", "École Louis Pasteur"]),
      correctAnswer: "École Jeanne d'Arc",
      order: 2,
    };

    const readQ18_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 3 (Compréhension)",
      text: "Quand la lettre mystérieuse avait-elle été écrite?",
      type: "multiple_choice",
      options: JSON.stringify(["En 2000", "En 2005", "En 2010", "En 2015"]),
      correctAnswer: "En 2010",
      order: 3,
    };

    const readQ18_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Sarah a-t-elle été émue en lisant la vieille lettre?",
      type: "multiple_choice",
      options: JSON.stringify(["La lettre était drôle", "Les rêves de l'auteure étaient similaires aux siens", "La lettre était courte", "Elle connaissait l'auteure"]),
      correctAnswer: "Les rêves de l'auteure étaient similaires aux siens",
      order: 4,
    };

    const readQ18_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 5 (Interprétation)",
      text: "Que nous apprend cette histoire sur les connexions humaines?",
      type: "multiple_choice",
      options: JSON.stringify(["Les lettres sont inutiles", "Les connexions humaines peuvent transcender le temps", "Il ne faut pas garder de souvenirs", "Le passé n'a pas d'importance"]),
      correctAnswer: "Les connexions humaines peuvent transcender le temps",
      order: 5,
    };

    const readQ18_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 6 (Réaction)",
      text: "Si tu écrivais une lettre à toi-même dans 10 ans, que dirais-tu?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ18_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 7 (Réaction)",
      text: "As-tu déjà trouvé quelque chose d'ancien et mystérieux? Raconte.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ18_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise19Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que l'exercice d'écrire une lettre au futur est une bonne idée? Pourquoi?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 19: L'Aventure Finale
    const readQ19_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Histoire 19: L'Aventure Finale",
      text: "C'était la fin de l'école primaire en juin. Les enfants qui avaient grandi ensemble intrinsèquement depuis la maternelle - pendant sept ans - se réalisaient que très bientôt, ils se sépareraient pour aller à différents collèges dans différentes villes. Cette réalité était déchirante pour tous. Tous les meilleurs amis se rassemblèrent solennellement pour planifier une dernière grande aventure inoubliable.\n\nLe groupe d'amis inséparable - Jean (12 ans, leader), Marie (12 ans, créative), Pierre (12 ans, fort), Léa (11 ans, intelligente) et Thomas (12 ans, sage) - se rencontrèrent et décidèrent ensemble de faire un grand voyage d'aventure mémorable. Ils demandèrent la permission à leurs parents et partirent en randonnée pédestre épique à travers les montagnes des Vosges pendant une semaine complète, affrontant des défis physiques intenses et des épreuves émotionnelles profondes.\n\nIls grimpèrent des pentes raides et rocheuses, leurs jambes fatiguées mais leurs cœurs forts. Ils traversèrent des rivières froides qui glacèrent leurs os. Ils campèrent sous les étoiles magnifiques et partagèrent leurs peurs les plus profondes et leurs rêves les plus secrets autour du feu de camp. Ils se confièrent des choses qu'ils n'avaient jamais confiées à personne. Chaque jour amenait de nouvelles épreuves physiques - épuisement, blessures mineures, blisters aux pieds - mais aussi de nouvelles joies - rires ensemble, moments de beauté naturelle, découvertes surprenantes.\n\nUne nuit cruciale, avant l'ascension finale du sommet principal, les cinq amis s'assirent ensemble sur les rochers chauds sous les étoiles. Ils parlèrent ouvertement de leurs peurs terribles de se séparer. Jean parla de sa peur de perdre ses amis. Marie pleura en disant que Jean et elle avaient des sentiments spéciaux l'un pour l'autre. Pierre parla de sa peur du changement et de l'inconnu. Léa et Thomas écoutaient silencieusement. Ils pleuraient en se serrant les uns les autres - une étreinte de groupe chaleureuse et profonde qui dura longtemps. C'était un moment de connexion émotionnelle brute et authentique que jamais ils n'oublieraient.\n\nLe dernier jour, après quatre heures de randonnée intense, les cinq amis atteignirent finalement le sommet spectaculaire de la montagne à 1500 mètres d'altitude. De là, de cette perspective élevée, ils voyaient tout le monde en dessous - leur petite ville pittoresque, l'école qu'ils quitaient, les forêts vertes, les rivières brillantes, tout le chemin qu'ils avaient parcouru physiquement et émotionnellement ensemble. Ils comprirent profondément qu'ils n'étaient plus les mêmes enfants insouciants. Ils étaient devenus plus forts physiquement et émotionnellement, plus matures, plus sages, plus conscients du monde.\n\nAu sommet, au coucher du soleil, les cinq amis firent un serment solennel l'un envers l'autre, se tenant les mains: \"Peu importe où nous irons, quels collèges nous fréquenterons, quelles amies nouveaux nous rencontrerons, nous resterons amis à jamais. Cette aventure nous a changés à jamais. Nous promettons de rester en contact, de nous écrire, de nous visiter, de nous aider. Vous êtes mes frères et mes sœurs.\" Ils se promettaient loyalty mutuelle éternelle.\n\n",
      type: "multiple_choice",
      options: JSON.stringify(["Pour passer des vacances", "Parce que c'était la fin de l'école primaire et ils se sépareraient", "Pour devenir célèbres", "Pour établir un record"]),
      correctAnswer: "Parce que c'était la fin de l'école primaire et ils se sépareraient",
      order: 1,
    };

    const readQ19_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 2 (Compréhension)",
      text: "Combien d'amis faisaient partie du groupe?",
      type: "multiple_choice",
      options: JSON.stringify(["3", "4", "5", "6"]),
      correctAnswer: "5",
      order: 2,
    };

    const readQ19_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 3 (Compréhension)",
      text: "Où le groupe a-t-il fait sa randonnée?",
      type: "multiple_choice",
      options: JSON.stringify(["Les Alpes", "Les Vosges", "Les Pyrénées", "Le Jura"]),
      correctAnswer: "Les Vosges",
      order: 3,
    };

    const readQ19_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi cette aventure était-elle si importante pour le groupe?",
      type: "multiple_choice",
      options: JSON.stringify(["Pour battre un record", "Pour créer un dernier souvenir avant de se séparer", "Pour impressionner leurs parents", "Pour gagner un prix"]),
      correctAnswer: "Pour créer un dernier souvenir avant de se séparer",
      order: 4,
    };

    const readQ19_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 5 (Interprétation)",
      text: "Que symbolise le sommet de la montagne dans cette histoire?",
      type: "multiple_choice",
      options: JSON.stringify(["La fin de leur amitié", "Le passage de l'enfance à l'adolescence et la maturité", "Juste un point géographique", "Un défi physique"]),
      correctAnswer: "Le passage de l'enfance à l'adolescence et la maturité",
      order: 5,
    };

    const readQ19_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 6 (Réaction)",
      text: "As-tu des amis proches que tu as peur de perdre? Comment maintiens-tu ces amitiés?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ19_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 7 (Réaction)",
      text: "Si tu pouvais planifier une aventure finale avec tes amis, que ferais-tu?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ19_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise20Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les amitiés d'enfance peuvent vraiment durer toute la vie? Justifie ta réponse.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // HISTOIRE 20: Le Rêve de Mathieu
    const readQ20_1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Histoire 20: Le Rêve de Mathieu",
      text: "Mathieu était un garçon de 11 ans qui vivait dans un petit appartement modeste au cinquième étage d'un vieil immeuble dans une banlieue de Paris. Sa famille n'était pas riche - son père travaillait comme chauffeur de bus et sa mère comme aide-soignante à l'hôpital. Malgré leurs moyens limités, ses parents l'encourageaient toujours à poursuivre ses rêves.\n\nDepuis qu'il avait 6 ans, Mathieu rêvait de devenir astronome. Il passait des heures sur son petit balcon à regarder les étoiles avec un vieux télescope que son grand-père lui avait donné avant de mourir. Il connaissait le nom de toutes les constellations, les distances des planètes, les mystères des trous noirs. Ses cahiers d'école étaient remplis de dessins de galaxies et de fusées spatiales.\n\nUn jour de septembre, son professeur de sciences, Monsieur Dupont, annonça qu'un concours national de sciences était ouvert à tous les élèves de France. Le thème était: 'Comment l'exploration spatiale peut améliorer la vie sur Terre?' Le premier prix était une visite au Centre National d'Études Spatiales à Toulouse et une rencontre avec un vrai astronaute!\n\nMathieu décida immédiatement de participer. Pendant trois mois, il travailla dur sur son projet. Il créa une maquette détaillée montrant comment les satellites aident les agriculteurs, prévoient les catastrophes naturelles, et connectent les gens dans les régions isolées. Il passa ses week-ends à la bibliothèque municipale, lisant des livres scientifiques. Il demanda conseil à son professeur. Il fit et refit sa présentation des dizaines de fois.\n\nLe jour de la présentation régionale arriva. Mathieu était très nerveux. Il vit les autres participants avec leurs projets sophistiqués et leurs uniformes d'écoles privées. Il se sentit petit et insignifiant avec sa maquette faite de cartons récupérés et de bouteilles recyclées.\n\nMais quand il commença à parler, quelque chose de magique se produisit. Sa passion pour l'espace brilla à travers chaque mot. Les juges furent impressionnés non seulement par ses connaissances approfondies, mais surtout par son enthousiasme authentique et sa créativité. Contre toute attente, Mathieu gagna le premier prix régional, puis le national!\n\nÀ Toulouse, en rencontrant l'astronaute Thomas Pesquet qui lui serra la main, Mathieu comprit que les rêves n'ont pas besoin d'argent pour se réaliser - ils ont besoin de passion, de travail acharné, et de persévérance.\n\nQuel âge avait Mathieu?",
      type: "multiple_choice",
      options: JSON.stringify(["9 ans", "10 ans", "11 ans", "12 ans"]),
      correctAnswer: "11 ans",
      order: 1,
    };

    const readQ20_2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 2 (Compréhension)",
      text: "Qui avait donné le télescope à Mathieu?",
      type: "multiple_choice",
      options: JSON.stringify(["Son père", "Sa mère", "Son grand-père", "Son professeur"]),
      correctAnswer: "Son grand-père",
      order: 2,
    };

    const readQ20_3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 3 (Compréhension)",
      text: "Quel était le premier prix du concours?",
      type: "multiple_choice",
      options: JSON.stringify(["Un nouveau télescope", "Une visite au CNES et rencontre avec un astronaute", "Un voyage en avion", "Un ordinateur"]),
      correctAnswer: "Une visite au CNES et rencontre avec un astronaute",
      order: 3,
    };

    const readQ20_4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 4 (Interprétation)",
      text: "Pourquoi Mathieu s'est-il senti petit et insignifiant au début de la compétition?",
      type: "multiple_choice",
      options: JSON.stringify(["Il était malade", "Les autres avaient des projets sophistiqués et des uniformes d'écoles privées", "Il avait oublié sa présentation", "Son projet était en retard"]),
      correctAnswer: "Les autres avaient des projets sophistiqués et des uniformes d'écoles privées",
      order: 4,
    };

    const readQ20_5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 5 (Interprétation)",
      text: "Quelle leçon principale Mathieu a-t-il apprise de cette expérience?",
      type: "multiple_choice",
      options: JSON.stringify(["L'argent est nécessaire pour réussir", "La passion et le travail acharné sont plus importants que les moyens financiers", "Les concours sont injustes", "Il faut toujours avoir des uniformes"]),
      correctAnswer: "La passion et le travail acharné sont plus importants que les moyens financiers",
      order: 5,
    };

    const readQ20_6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 6 (Réaction)",
      text: "As-tu un rêve que tu aimerais réaliser? Comment travailles-tu pour y arriver?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 6,
    };

    const readQ20_7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 7 (Réaction)",
      text: "Que ferais-tu si tu gagnais un concours comme Mathieu?",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 7,
    };

    const readQ20_8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise21Id,
      title: "Question 8 (Jugement critique)",
      text: "Penses-tu que les enfants de familles modestes ont les mêmes chances de réussir que les autres? Explique ton point de vue.",
      type: "text",
      options: null,
      correctAnswer: "",
      order: 8,
    };

    // Informatif - Un petit exercice
    const readQ9: Question = {
      id: randomUUID(),
      exerciseId: readingExercise5Id,
      title: "Histoire 5: La Découverte Scientifique",
      text: "Emma était une fille de 11 ans qui adorait absolument la science. Ses yeux brillaient quand on parlait de chimie, de physique, de biologie. Elle passait des heures, jusqu'à tard le soir, à faire des expériences dans sa chambre, qui avait été convertie en un petit laboratoire privé. Ses murs étaient couverts de posters de scientifiques célèbres - Marie Curie, Albert Einstein, Isaac Newton. Elle avait rangé des bouteilles de produits chimiques sur les étagères, des béchers, des tubes à essai, des pipettes, des microscopes d'occasion qu'elle avait trouvés à une braderie. Elle portait un blouse blanche de laboratoire, même à la maison, ce qui rendait ses parents un peu amusés.\n\nEmma rêvait de devenir scientifique comme sa grand-mère, le Docteur Isabelle Moreau, qui était une chimiste renommée. Sa grand-mère lui rendait visite tous les mois et lui apportait des livres sur les expériences scientifiques, des kits d'expériences, et surtout, elle l'encourageait: \"Emma, tu as le potentiel de faire de grandes découvertes. Continue tes efforts!\"\n\nUn jour du mois de septembre, en explorant les vieilles archives de sa grand-mère - un coffre rempli de journaux scientifiques anciens et de notes personnelles - Emma découvrit un vieux journal écrit à la main. À l'intérieur était décrite une expérience fascinante sur la croissance des cristaux de sel. L'expérience était intitulée: \"Expérience N° 47: Les Cristaux Extraordinaires\". Son grand-mère avait écrit: \"J'ai essayé quelque chose de différent aujourd'hui. Au lieu d'utiliser du sel de mer ordinaire, j'ai mélangé du sel avec de l'eau distillée et une petite quantité d'iodine. Les résultats étaient... intéressants.\" Le reste de la page était vierge, comme si elle avait commencé l'expérience mais ne l'avait jamais terminée.\n\nEmma fut intriguée. Elle se demanda: \"Qu'est-ce qui s'est passé? Pourquoi grand-mère n'a-t-elle pas terminé?\" Elle décida de reproduire cette expérience exactement comme sa grand-mère l'avait décrite. Elle prit du sel de mer, de l'eau distillée (qu'elle avait demandé à son père d'acheter), et une petite quantité d'iodine de sa réserve chimique personnelle. Elle mélangea les ingrédients dans un bécher transparent. Elle plaça le bécher sur un plateau dans un coin calme de sa chambre, loin de la lumière directe du soleil, exactement comme les instructions scientifiques le recommandaient.\n\nPendant une semaine, Emma regarda attentivement la croissance des cristaux. Elle prit des notes, des mesures, des photos tous les jours. Mais quelque chose d'inattendu se produisit! Les cristaux ne se développaient pas comme les cristaux de sel ordinaire. Au lieu de former des cubes réguliers, les cristaux se développaient dans des formes bizarres et magnifiques - des structures en arborescence, des branches, des motifs complexes et symétriques! Les cristaux scintillaient sous la lumière avec une lueur bleue-violette!\n\nEmma était d'abord confuse. Elle consulta ses livres scientifiques, cherchant des images de cristaux de sel. Elle n'avait jamais vu de cristaux comme ceux-ci! Étaient-ce un échec? Avait-elle fait quelque chose de mal? Avait-elle mélangé les mauvais ingrédients? Elle pensa à abandonner l'expérience. Mais alors, elle pensa à sa grand-mère, qui lui avait dit: \"Une expérience qui ne fonctionne pas comme prévu est souvent la plus intéressante!\"\n\nEmma décida d'investiguer davantage. Elle examina les cristaux avec un microscope. Ils étaient d'une beauté époustouflante de près! Elle leur fit des tests supplémentaires. Elle découvrit que la présence d'iodine, combinée avec la température ambiante spécifique et la concentration en sel, avait créé une formation cristalline unique et jamais documentée avant! Les structures arborescentes avaient des propriétés chimiques différentes des cristaux de sel ordinaires!\n\nEmma était excitée! Elle avait créé quelque chose de nouveau! Elle rédigea un rapport scientifique détaillé, complètement avec des dessins, des photos, des mesures, des explications chimiques. Elle montra d'abord le rapport à sa grand-mère. Le Docteur Moreau étudia attentivement et sourit avec fierté: \"Emma, c'est remarquable! Je crois que tu as réellement découvert une nouvelle formation cristalline! Tu dois présenter cela à ta foire scientifique de l'école!\"\n\nLe jour de la foire scientifique de l'école, Emma installa son exposition avec une grande affiche colorée intitulée \"CRISTAUX EXTRAORDINAIRES: Une Découverte Nouvelle!\" Elle avait des photos des cristaux, un microscope où les visiteurs pouvaient les examiner, des cristaux réels sous verre acrylique. Beaucoup d'étudiants et de professeurs s'arrêtèrent à son exposition.\n\nQuand les juges finalement vinrent évaluer les projets, ils furent impressionnés. Le professeur de chimie de l'école dit: \"Emma, c'est un travail vraiment remarquable. L'expérience scientifique est bien documentée. Vos découverte sur ces cristaux est véritablement originale. Excellent travail!\"\n\nLe lendemain, l'école annonça les gagnants. Emma gagna le premier prix pour la catégorie \"Meilleure Expérience Scientifique\"! Elle reçut un certificat, une bourse pour des cours de science avancée à l'école, et surtout, la reconnaissance qu'elle avait fait une véritable découverte! Sa grand-mère vint à la cérémonie et la serra dans ses bras: \"Je suis tellement fière de toi, Emma. Tu es une vraie scientifique maintenant!\"\n\nC'est jour-là, Emma comprit que les rêves deviennent réalité quand on travaille dur, qu'on reste curieux, et qu'on croit en soi-même.\n\nQu'aimait faire Emma?",
      type: "multiple_choice",
      options: JSON.stringify(["Jouer au foot", "Faire des expériences scientifiques", "Regarder la TV", "Dormir"]),
      correctAnswer: "Faire des expériences scientifiques",
      order: 1,
    };

    const readQ10: Question = {
      id: randomUUID(),
      exerciseId: readingExercise5Id,
      title: "Question 2 (Dénouement)",
      text: "Comment la découverte d'Emma a-t-elle terminé?",
      type: "multiple_choice",
      options: JSON.stringify(["C'était un échec", "Elle gagna le prix de la meilleure expérience scientifique", "Elle arrêta la science", "Personne ne s'en souciait"]),
      correctAnswer: "Elle gagna le prix de la meilleure expérience scientifique",
      order: 2,
    };

    // Writing questions
    const writQ1: Question = {
      id: randomUUID(),
      exerciseId: writingExercise1Id,
      title: "Exercice: Description vivante",
      text: "Écrivez une description vivante (8-10 phrases) d'un lieu que vous aimez. Utilisez les 5 sens: vue, son, odeur, goût, toucher. Exemple: la salle de classe, votre chambre, un parc, etc.",
      type: "text",
      correctAnswer: "réponse libre",
      order: 1,
    };

    const writQ2: Question = {
      id: randomUUID(),
      exerciseId: writingExercise2Id,
      title: "Exercice: Dialogue",
      text: "Écrivez un dialogue (10-15 lignes) entre deux personnages. Utilisez le format français avec les tirets (—), variez les verbes de parole (dit, cria, chuchota, etc.), et montrez les émotions.",
      type: "text",
      correctAnswer: "réponse libre",
      order: 1,
    };

    const writQ3: Question = {
      id: randomUUID(),
      exerciseId: writingExercise3Id,
      title: "Exercice: Histoire courte",
      text: "Écrivez une histoire courte (15-20 phrases) avec: 1) Situation initiale, 2) Problème/Conflit, 3) Climax, 4) Résolution. Invente une histoire originale!",
      type: "text",
      correctAnswer: "réponse libre",
      order: 1,
    };

    const writQ4: Question = {
      id: randomUUID(),
      exerciseId: writingExercise4Id,
      title: "Exercice: Résumé",
      text: "Lisez ce texte et résumez-le en 5-7 phrases:\\n\\nAUTEUR: Jean est un enfant de 12 ans qui vivait dans un petit village montagneux. Un jour, il découvrit une vieille carte dans le grenier de sa grand-mère. La carte montrait un chemin menant à une grotte cachée. Avec ses deux meilleurs amis, Pierre et Marie, Jean décida d'explorer cette grotte mystérieuse. Après une longue marche, ils trouvèrent l'entrée de la grotte. À l'intérieur, ils découvrirent des cristaux brillants et des minéraux magnifiques. C'était une découverte extraordinaire et les trois enfants devinrent célèbres dans le village.",
      type: "text",
      correctAnswer: "réponse libre",
      order: 1,
    };

    this.questions.set(readQ1_1.id, readQ1_1);
    this.questions.set(readQ1_2.id, readQ1_2);
    this.questions.set(readQ1_3.id, readQ1_3);
    this.questions.set(readQ1_4.id, readQ1_4);
    this.questions.set(readQ1_5.id, readQ1_5);
    this.questions.set(readQ1_6.id, readQ1_6);
    this.questions.set(readQ1_7.id, readQ1_7);
    this.questions.set(readQ1_8.id, readQ1_8);
    this.questions.set(readQ2_1.id, readQ2_1);
    this.questions.set(readQ2_2.id, readQ2_2);
    this.questions.set(readQ2_3.id, readQ2_3);
    this.questions.set(readQ2_4.id, readQ2_4);
    this.questions.set(readQ2_5.id, readQ2_5);
    this.questions.set(readQ2_6.id, readQ2_6);
    this.questions.set(readQ2_7.id, readQ2_7);
    this.questions.set(readQ2_8.id, readQ2_8);
    this.questions.set(readQ3_1.id, readQ3_1);
    this.questions.set(readQ3_2.id, readQ3_2);
    this.questions.set(readQ3_3.id, readQ3_3);
    this.questions.set(readQ3_4.id, readQ3_4);
    this.questions.set(readQ3_5.id, readQ3_5);
    this.questions.set(readQ3_6.id, readQ3_6);
    this.questions.set(readQ3_7.id, readQ3_7);
    this.questions.set(readQ3_8.id, readQ3_8);
    this.questions.set(readQ4_1.id, readQ4_1);
    this.questions.set(readQ4_2.id, readQ4_2);
    this.questions.set(readQ4_3.id, readQ4_3);
    this.questions.set(readQ4_4.id, readQ4_4);
    this.questions.set(readQ4_5.id, readQ4_5);
    this.questions.set(readQ4_6.id, readQ4_6);
    this.questions.set(readQ4_7.id, readQ4_7);
    this.questions.set(readQ4_8.id, readQ4_8);
    this.questions.set(readQ5_1.id, readQ5_1);
    this.questions.set(readQ5_2.id, readQ5_2);
    this.questions.set(readQ5_3.id, readQ5_3);
    this.questions.set(readQ5_4.id, readQ5_4);
    this.questions.set(readQ5_5.id, readQ5_5);
    this.questions.set(readQ5_6.id, readQ5_6);
    this.questions.set(readQ5_7.id, readQ5_7);
    this.questions.set(readQ5_8.id, readQ5_8);
    this.questions.set(readQ6_1.id, readQ6_1);
    this.questions.set(readQ6_2.id, readQ6_2);
    this.questions.set(readQ6_3.id, readQ6_3);
    this.questions.set(readQ6_4.id, readQ6_4);
    this.questions.set(readQ6_5.id, readQ6_5);
    this.questions.set(readQ6_6.id, readQ6_6);
    this.questions.set(readQ6_7.id, readQ6_7);
    this.questions.set(readQ6_8.id, readQ6_8);
    this.questions.set(readQ7_1.id, readQ7_1);
    this.questions.set(readQ7_2.id, readQ7_2);
    this.questions.set(readQ7_3.id, readQ7_3);
    this.questions.set(readQ7_4.id, readQ7_4);
    this.questions.set(readQ7_5.id, readQ7_5);
    this.questions.set(readQ7_6.id, readQ7_6);
    this.questions.set(readQ7_7.id, readQ7_7);
    this.questions.set(readQ7_8.id, readQ7_8);
    this.questions.set(readQ8_1.id, readQ8_1);
    this.questions.set(readQ8_2.id, readQ8_2);
    this.questions.set(readQ8_3.id, readQ8_3);
    this.questions.set(readQ8_4.id, readQ8_4);
    this.questions.set(readQ8_5.id, readQ8_5);
    this.questions.set(readQ8_6.id, readQ8_6);
    this.questions.set(readQ8_7.id, readQ8_7);
    this.questions.set(readQ8_8.id, readQ8_8);
    this.questions.set(readQ9_1.id, readQ9_1);
    this.questions.set(readQ9_2.id, readQ9_2);
    this.questions.set(readQ9_3.id, readQ9_3);
    this.questions.set(readQ9_4.id, readQ9_4);
    this.questions.set(readQ9_5.id, readQ9_5);
    this.questions.set(readQ9_6.id, readQ9_6);
    this.questions.set(readQ9_7.id, readQ9_7);
    this.questions.set(readQ9_8.id, readQ9_8);
    this.questions.set(readQ10_1.id, readQ10_1);
    this.questions.set(readQ10_2.id, readQ10_2);
    this.questions.set(readQ10_3.id, readQ10_3);
    this.questions.set(readQ10_4.id, readQ10_4);
    this.questions.set(readQ10_5.id, readQ10_5);
    this.questions.set(readQ10_6.id, readQ10_6);
    this.questions.set(readQ10_7.id, readQ10_7);
    this.questions.set(readQ10_8.id, readQ10_8);
    this.questions.set(readQ11_1.id, readQ11_1);
    this.questions.set(readQ11_2.id, readQ11_2);
    this.questions.set(readQ11_3.id, readQ11_3);
    this.questions.set(readQ11_4.id, readQ11_4);
    this.questions.set(readQ11_5.id, readQ11_5);
    this.questions.set(readQ11_6.id, readQ11_6);
    this.questions.set(readQ11_7.id, readQ11_7);
    this.questions.set(readQ11_8.id, readQ11_8);
    this.questions.set(readQ12_1.id, readQ12_1);
    this.questions.set(readQ12_2.id, readQ12_2);
    this.questions.set(readQ12_3.id, readQ12_3);
    this.questions.set(readQ12_4.id, readQ12_4);
    this.questions.set(readQ12_5.id, readQ12_5);
    this.questions.set(readQ12_6.id, readQ12_6);
    this.questions.set(readQ12_7.id, readQ12_7);
    this.questions.set(readQ12_8.id, readQ12_8);
    this.questions.set(readQ13_1.id, readQ13_1);
    this.questions.set(readQ13_2.id, readQ13_2);
    this.questions.set(readQ13_3.id, readQ13_3);
    this.questions.set(readQ13_4.id, readQ13_4);
    this.questions.set(readQ13_5.id, readQ13_5);
    this.questions.set(readQ13_6.id, readQ13_6);
    this.questions.set(readQ13_7.id, readQ13_7);
    this.questions.set(readQ13_8.id, readQ13_8);
    this.questions.set(readQ14_1.id, readQ14_1);
    this.questions.set(readQ14_2.id, readQ14_2);
    this.questions.set(readQ14_3.id, readQ14_3);
    this.questions.set(readQ14_4.id, readQ14_4);
    this.questions.set(readQ14_5.id, readQ14_5);
    this.questions.set(readQ14_6.id, readQ14_6);
    this.questions.set(readQ14_7.id, readQ14_7);
    this.questions.set(readQ14_8.id, readQ14_8);
    this.questions.set(readQ15_1.id, readQ15_1);
    this.questions.set(readQ15_2.id, readQ15_2);
    this.questions.set(readQ15_3.id, readQ15_3);
    this.questions.set(readQ15_4.id, readQ15_4);
    this.questions.set(readQ15_5.id, readQ15_5);
    this.questions.set(readQ15_6.id, readQ15_6);
    this.questions.set(readQ15_7.id, readQ15_7);
    this.questions.set(readQ15_8.id, readQ15_8);
    this.questions.set(readQ16_1.id, readQ16_1);
    this.questions.set(readQ16_2.id, readQ16_2);
    this.questions.set(readQ16_3.id, readQ16_3);
    this.questions.set(readQ16_4.id, readQ16_4);
    this.questions.set(readQ16_5.id, readQ16_5);
    this.questions.set(readQ16_6.id, readQ16_6);
    this.questions.set(readQ16_7.id, readQ16_7);
    this.questions.set(readQ16_8.id, readQ16_8);
    this.questions.set(readQ17_1.id, readQ17_1);
    this.questions.set(readQ17_2.id, readQ17_2);
    this.questions.set(readQ17_3.id, readQ17_3);
    this.questions.set(readQ17_4.id, readQ17_4);
    this.questions.set(readQ17_5.id, readQ17_5);
    this.questions.set(readQ17_6.id, readQ17_6);
    this.questions.set(readQ17_7.id, readQ17_7);
    this.questions.set(readQ17_8.id, readQ17_8);
    this.questions.set(readQ18_1.id, readQ18_1);
    this.questions.set(readQ18_2.id, readQ18_2);
    this.questions.set(readQ18_3.id, readQ18_3);
    this.questions.set(readQ18_4.id, readQ18_4);
    this.questions.set(readQ18_5.id, readQ18_5);
    this.questions.set(readQ18_6.id, readQ18_6);
    this.questions.set(readQ18_7.id, readQ18_7);
    this.questions.set(readQ18_8.id, readQ18_8);
    this.questions.set(readQ19_1.id, readQ19_1);
    this.questions.set(readQ19_2.id, readQ19_2);
    this.questions.set(readQ19_3.id, readQ19_3);
    this.questions.set(readQ19_4.id, readQ19_4);
    this.questions.set(readQ19_5.id, readQ19_5);
    this.questions.set(readQ19_6.id, readQ19_6);
    this.questions.set(readQ19_7.id, readQ19_7);
    this.questions.set(readQ19_8.id, readQ19_8);
    this.questions.set(readQ20_1.id, readQ20_1);
    this.questions.set(readQ20_2.id, readQ20_2);
    this.questions.set(readQ20_3.id, readQ20_3);
    this.questions.set(readQ20_4.id, readQ20_4);
    this.questions.set(readQ20_5.id, readQ20_5);
    this.questions.set(readQ20_6.id, readQ20_6);
    this.questions.set(readQ20_7.id, readQ20_7);
    this.questions.set(readQ20_8.id, readQ20_8);
    this.questions.set(writQ1.id, writQ1);
    this.questions.set(writQ2.id, writQ2);
    this.questions.set(writQ3.id, writQ3);
    this.questions.set(writQ4.id, writQ4);

    // Create assignments for multiple courses
    const assignment1: Assignment = {
      id: randomUUID(),
      teacherId,
      studentId,
    };
    this.assignments.set(assignment1.id, assignment1);

    const assignment2: Assignment = {
      id: randomUUID(),
      teacherId,
      studentId,
    };
    this.assignments.set(assignment2.id, assignment2);

    const assignment3: Assignment = {
      id: randomUUID(),
      teacherId,
      studentId,
      courseId: writing1Id,
    };
    this.assignments.set(assignment3.id, assignment3);

    // Create initial progress for all courses
    const progress1: StudentProgress = {
      id: randomUUID(),
      studentId,
      progressPercentage: 0,
      completed: false,
    };
    this.progress.set(progress1.id, progress1);

    const progress2: StudentProgress = {
      id: randomUUID(),
      studentId,
      progressPercentage: 0,
      completed: false,
    };
    this.progress.set(progress2.id, progress2);

    const progress3: StudentProgress = {
      id: randomUUID(),
      studentId,
      courseId: writing1Id,
      progressPercentage: 0,
      completed: false,
    };
    this.progress.set(progress3.id, progress3);

    // AUTO-GENERATE EXERCISES FOR ALL 72 MAIN COURSES
    this.generateMainCourseExercises();
  }

  private generateMainCourseExercises() {
    // Course ID to title mapping
    const courseMap: { [key: string]: { id: string; title: string; category: string } } = {};
    
    // Build map from all courses
    for (const course of Array.from(this.courses.values())) {
      if (["grammaire", "orthographe", "conjugaison", "ponctuation", "vocabulaire"].includes(course.category)) {
        courseMap[course.id] = { id: course.id, title: course.title, category: course.category };
      }
    }

    // GRAMMAIRE: 4 exercices avec 4-5 questions chacun
    const grammaireExercises = [
      {
        name: "Identification - QCM",
        type: "multiple_choice",
        questions: [
          { text: "Dans la phrase 'Le chat noir mange une souris', identifie le groupe sujet.", options: ["Le chat noir", "noir mange", "mange une souris", "une souris"], correct: "Le chat noir" },
          { text: "Quel mot est un verbe dans: 'Marie court rapidement au parc'?", options: ["Marie", "court", "parc", "rapidement"], correct: "court" },
          { text: "Combien d'adjectifs dans: 'La grande maison blanche'?", options: ["0", "1", "2", "3"], correct: "2" },
          { text: "Le mot 'gentil' dans 'une fille gentille' est un...", options: ["nom", "verbe", "adjectif", "adverbe"], correct: "adjectif" },
          { text: "Quel est le GV (groupe verbal) dans: 'Les enfants jouent au football'?", options: ["Les enfants", "jouent au football", "au football", "enfants jouent"], correct: "jouent au football" }
        ]
      },
      {
        name: "Propriétés grammaticales - Vrai/Faux",
        type: "multiple_choice",
        questions: [
          { text: "Vrai ou Faux: Un adjectif s'accorde toujours avec le nom.", options: ["Vrai", "Faux", "Parfois", "Ça dépend"], correct: "Vrai" },
          { text: "Vrai ou Faux: Un adverbe se termine toujours par '-ment'.", options: ["Vrai", "Faux", "Souvent", "Rarement"], correct: "Faux" },
          { text: "Vrai ou Faux: Le verbe s'accorde avec le sujet.", options: ["Vrai", "Faux", "Parfois", "Non jamais"], correct: "Vrai" },
          { text: "Vrai ou Faux: Un pronom remplace toujours un nom.", options: ["Vrai", "Faux", "Généralement", "Parfois"], correct: "Vrai" },
          { text: "Vrai ou Faux: 'De la maison' est un complément du verbe.", options: ["Vrai", "Faux", "Parfois", "C'est un GN"], correct: "Faux" }
        ]
      },
      {
        name: "Production écrite - Texte libre",
        type: "text",
        questions: [
          { text: "Donne 3 exemples de noms communs (pas de noms propres).", correct: "réponse libre" },
          { text: "Écris 2 adjectifs qui décrivent un ami gentil.", correct: "réponse libre" },
          { text: "Utilise le verbe 'courir' dans 2 phrases différentes.", correct: "réponse libre" },
          { text: "Crée une phrase avec un GS de 3 mots minimum.", correct: "réponse libre" }
        ]
      },
      {
        name: "Classement - Identification",
        type: "multiple_choice",
        questions: [
          { text: "Classe: 'bleu'. C'est un...", options: ["nom", "adjectif", "verbe", "adverbe"], correct: "adjectif" },
          { text: "Classe: 'rapidement'. C'est un...", options: ["nom", "adjectif", "verbe", "adverbe"], correct: "adverbe" },
          { text: "Classe: 'manger'. C'est un...", options: ["nom", "adjectif", "verbe", "adverbe"], correct: "verbe" },
          { text: "Classe: 'enfant'. C'est un...", options: ["verbe", "adjectif", "nom", "adverbe"], correct: "nom" }
        ]
      }
    ];

    // ORTHOGRAPHE: 4 exercices avec 4-5 questions chacun
    const orthographeExercises = [
      {
        name: "Accords - Nom/Adjectif",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Les maison _____ sont vieilles.' Quel accord est correct?", options: ["maison vieille", "maisons vieille", "maisons vieilles", "maison vieilles"], correct: "maisons vieilles" },
          { text: "Quel mot est correctement accordé? 'Une fille intéligente' ou 'Une fille intelligente'?", options: ["intéligente", "intelligente", "Les deux", "Aucun"], correct: "intelligente" },
          { text: "Accorde: 'Les chats _____ courent.' (noir/noirs/noire/noires)", options: ["noir", "noirs", "noire", "noires"], correct: "noirs" },
          { text: "Complète: 'Des fleur_____ jaune_____' (pluriel)", options: ["s, s", "s, -", "-, s", "-, -"], correct: "s, s" },
          { text: "Quel accord est correct? 'Les grands arbres' ou 'Les grand arbres'?", options: ["Les grands arbres", "Les grand arbres", "Les grands arbre", "grand arbres"], correct: "Les grands arbres" }
        ]
      },
      {
        name: "Homophones & Confusion",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'C____ la maison de Pierre.' (c'est ou ses ou ces)", options: ["C'est", "ces", "ses", "s'est"], correct: "C'est" },
          { text: "Choisis: 'Jean et _____ vont à l'école.' (ou/où)", options: ["ou", "où", "oû", "oux"], correct: "où" },
          { text: "Complète: 'C'____ des livres ____.'' (son/sont)", options: ["son, son", "sont, sont", "son, sont", "sont, son"], correct: "sont, son" },
          { text: "Quel homophone est correct? 'Je vais à _____ école.' (la/là/las)", options: ["la", "là", "las", "l'a"], correct: "la" },
          { text: "Complète: 'C'est _____ ami, pas le vôtre.' (mon/m'ont)", options: ["mon", "m'ont", "mont", "monsieur"], correct: "mon" }
        ]
      },
      {
        name: "Production - Écriture orthographe",
        type: "text",
        questions: [
          { text: "Écris 5 mots au pluriel. Exemple: chat → chats", correct: "réponse libre" },
          { text: "Écris une phrase avec 'c'est' (pas 'ces' ou 'ses').", correct: "réponse libre" },
          { text: "Accorde correctement: 'Les ___ et les ___ sont coloré___.' (fleur, papillon)", correct: "réponse libre" },
          { text: "Distingue: Écris 2 phrases, une avec 'a' (verbe avoir), une avec 'à' (préposition).", correct: "réponse libre" }
        ]
      },
      {
        name: "Majuscules et ponctuation",
        type: "multiple_choice",
        questions: [
          { text: "Quel début de phrase est correct?", options: ["marie habite à paris.", "Marie habite à Paris.", "marie habite à Paris.", "MARIE HABITE À PARIS."], correct: "Marie habite à Paris." },
          { text: "Où faut-il une majuscule? 'Le français est utile.'", options: ["français", "Le", "utile", "Nulle part"], correct: "Le" },
          { text: "Complète correctement: 'Je s'appelle ___.'", options: ["jean", "Jean", "JEAN", "J."], correct: "Jean" },
          { text: "Quel titre est bien capitalisé?", options: ["le ROI et LA reine", "Le Roi et la Reine", "le roi et la reine", "LE ROI ET LA REINE"], correct: "Le Roi et la Reine" },
          { text: "Comment débuter une phrase après un point?", options: ["minuscule", "majuscule", "majuscule accentuée", "symbole"], correct: "majuscule" }
        ]
      }
    ];

    // EXERCICES SPÉCIFIQUES PAR TYPE DE COURS
    // Exercices pour les cours sur les ACCORDS DU VERBE
    const accordsVerbeExercises = [
      {
        name: "Accords sujet-verbe",
        type: "multiple_choice",
        questions: [
          { text: "Accorde le verbe: 'Les enfants _____ au parc.' (jouer)", options: ["joue", "joues", "jouent", "jouons"], correct: "jouent" },
          { text: "Accorde le verbe: 'Marie et Pierre _____ ensemble.' (chanter)", options: ["chante", "chantes", "chantent", "chantons"], correct: "chantent" },
          { text: "Accorde le verbe: 'Le chien et le chat _____ dans le jardin.' (courir)", options: ["court", "courts", "courent", "courrons"], correct: "courent" },
          { text: "Accorde le verbe: 'Tout le monde _____ content.' (être)", options: ["est", "sont", "es", "sommes"], correct: "est" },
          { text: "Accorde le verbe: 'Personne ne _____ la réponse.' (savoir)", options: ["sait", "savent", "sais", "savons"], correct: "sait" }
        ]
      },
      {
        name: "Accords avec sujets complexes",
        type: "multiple_choice",
        questions: [
          { text: "Accorde: 'C'est moi qui _____ le premier.' (arriver)", options: ["arrive", "arrives", "arrivons", "arrivent"], correct: "arrive" },
          { text: "Accorde: 'C'est toi qui _____ raison.' (avoir)", options: ["a", "as", "avons", "ont"], correct: "as" },
          { text: "Accorde: 'Ni Jean ni Marie ne _____ venir.' (pouvoir)", options: ["peut", "peux", "peuvent", "pouvons"], correct: "peuvent" },
          { text: "Accorde: 'Une foule de gens _____ dans la rue.' (marcher)", options: ["marche", "marchent", "marches", "marchons"], correct: "marche" },
          { text: "Accorde: 'Beaucoup d'élèves _____ leur devoir.' (faire)", options: ["fait", "fais", "font", "faisons"], correct: "font" }
        ]
      },
      {
        name: "Production - Accords du verbe",
        type: "text",
        questions: [
          { text: "Écris 3 phrases où le verbe s'accorde avec un sujet au pluriel.", correct: "réponse libre" },
          { text: "Écris une phrase avec 'C'est moi qui...' et accorde correctement le verbe.", correct: "réponse libre" },
          { text: "Crée une phrase avec un sujet collectif (une foule, un groupe) et accorde le verbe.", correct: "réponse libre" },
          { text: "Écris une phrase avec deux sujets reliés par 'et' et accorde le verbe.", correct: "réponse libre" }
        ]
      },
      {
        name: "Identification des accords",
        type: "multiple_choice",
        questions: [
          { text: "Quelle phrase a le verbe correctement accordé?", options: ["Les oiseaux chante.", "Les oiseaux chantes.", "Les oiseaux chantent.", "Les oiseaux chantons."], correct: "Les oiseaux chantent." },
          { text: "Trouve l'erreur: 'Les élèves travailles dur.'", options: ["Les", "élèves", "travailles", "dur"], correct: "travailles" },
          { text: "Le verbe s'accorde avec...", options: ["le complément", "l'adjectif", "le sujet", "l'adverbe"], correct: "le sujet" },
          { text: "Quelle phrase est correcte?", options: ["Toi et moi partons ensemble.", "Toi et moi part ensemble.", "Toi et moi partes ensemble.", "Toi et moi partent ensemble."], correct: "Toi et moi partons ensemble." }
        ]
      }
    ];

    // Exercices pour les cours sur les HOMOPHONES
    const homophonesExercises = [
      {
        name: "Homophones courants - a/à",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Il _____ mangé une pomme.' (a/à)", options: ["a", "à", "as", "ah"], correct: "a" },
          { text: "Complète: 'Je vais _____ l'école.' (a/à)", options: ["a", "à", "as", "ah"], correct: "à" },
          { text: "Complète: 'Elle _____ un beau chapeau.' (a/à)", options: ["a", "à", "as", "ah"], correct: "a" },
          { text: "Complète: 'C'est _____ toi de jouer.' (a/à)", options: ["a", "à", "as", "ah"], correct: "à" },
          { text: "Complète: 'Mon père _____ acheté un vélo _____ Marie.' (a/à)", options: ["a, à", "à, a", "a, a", "à, à"], correct: "a, à" }
        ]
      },
      {
        name: "Homophones - ou/où, et/est",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ vas-tu?' (ou/où)", options: ["ou", "où", "oû", "oux"], correct: "où" },
          { text: "Complète: 'Tu veux du café _____ du thé?' (ou/où)", options: ["ou", "où", "oû", "oux"], correct: "ou" },
          { text: "Complète: 'Pierre _____ content.' (et/est)", options: ["et", "est", "es", "ai"], correct: "est" },
          { text: "Complète: 'Marie _____ Paul sont amis.' (et/est)", options: ["et", "est", "es", "ai"], correct: "et" },
          { text: "Complète: 'La ville _____ je suis né _____ belle.' (ou/où, et/est)", options: ["où, est", "ou, et", "où, et", "ou, est"], correct: "où, est" }
        ]
      },
      {
        name: "Production - Homophones",
        type: "text",
        questions: [
          { text: "Écris 2 phrases: une avec 'a' (verbe avoir), une avec 'à' (préposition).", correct: "réponse libre" },
          { text: "Écris 2 phrases: une avec 'ou' (choix), une avec 'où' (lieu).", correct: "réponse libre" },
          { text: "Écris 2 phrases: une avec 'et' (liaison), une avec 'est' (verbe être).", correct: "réponse libre" },
          { text: "Écris une phrase qui contient à la fois 'a', 'à' et 'et'.", correct: "réponse libre" }
        ]
      },
      {
        name: "Homophones - son/sont, on/ont",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Ils _____ partis hier.' (son/sont)", options: ["son", "sont", "sons", "sonts"], correct: "sont" },
          { text: "Complète: 'C'est _____ livre préféré.' (son/sont)", options: ["son", "sont", "sons", "sonts"], correct: "son" },
          { text: "Complète: '_____ va au cinéma ce soir.' (on/ont)", options: ["on", "ont", "ons", "onts"], correct: "on" },
          { text: "Complète: 'Ils _____ trois chiens.' (on/ont)", options: ["on", "ont", "ons", "onts"], correct: "ont" },
          { text: "Complète: '_____ dit que les élèves _____ bien travaillé.' (on/ont)", options: ["On, ont", "Ont, on", "On, on", "Ont, ont"], correct: "On, ont" }
        ]
      }
    ];

    // Exercices pour les PLURIELS SPÉCIAUX
    const plurielsExercises = [
      {
        name: "Pluriels en -aux",
        type: "multiple_choice",
        questions: [
          { text: "Quel est le pluriel de 'cheval'?", options: ["chevals", "chevaux", "chevau", "chevales"], correct: "chevaux" },
          { text: "Quel est le pluriel de 'journal'?", options: ["journals", "journaux", "journau", "journales"], correct: "journaux" },
          { text: "Quel est le pluriel de 'animal'?", options: ["animals", "animaux", "animau", "animales"], correct: "animaux" },
          { text: "Quel est le pluriel de 'hôpital'?", options: ["hôpitals", "hôpitaux", "hôpitau", "hôpitales"], correct: "hôpitaux" },
          { text: "Quel est le pluriel de 'canal'?", options: ["canals", "canaux", "canau", "canales"], correct: "canaux" }
        ]
      },
      {
        name: "Pluriels en -eux, -oux",
        type: "multiple_choice",
        questions: [
          { text: "Quel est le pluriel de 'cheveu'?", options: ["cheveus", "cheveux", "cheveu", "cheveaux"], correct: "cheveux" },
          { text: "Quel est le pluriel de 'caillou'?", options: ["caillous", "cailloux", "caillou", "cailloues"], correct: "cailloux" },
          { text: "Quel est le pluriel de 'genou'?", options: ["genous", "genoux", "genou", "genoues"], correct: "genoux" },
          { text: "Quel est le pluriel de 'bijou'?", options: ["bijous", "bijoux", "bijou", "bijoues"], correct: "bijoux" },
          { text: "Quel est le pluriel de 'jeu'?", options: ["jeus", "jeux", "jeu", "jeaux"], correct: "jeux" }
        ]
      },
      {
        name: "Production - Pluriels spéciaux",
        type: "text",
        questions: [
          { text: "Écris 5 mots qui font leur pluriel en -aux.", correct: "réponse libre" },
          { text: "Écris les 7 mots en -ou qui prennent un -x au pluriel.", correct: "réponse libre" },
          { text: "Écris 3 phrases avec des mots au pluriel irrégulier.", correct: "réponse libre" },
          { text: "Trouve 3 mots en -al qui font leur pluriel en -als (pas -aux).", correct: "réponse libre" }
        ]
      },
      {
        name: "Pluriels - Cas particuliers",
        type: "multiple_choice",
        questions: [
          { text: "Quel est le pluriel de 'oeil'?", options: ["oeils", "oeux", "yeux", "yeils"], correct: "yeux" },
          { text: "Quel est le pluriel de 'madame'?", options: ["madames", "mesdames", "madams", "mesdams"], correct: "mesdames" },
          { text: "Quel est le pluriel de 'monsieur'?", options: ["monsieurs", "messieurs", "monsiers", "messiers"], correct: "messieurs" },
          { text: "Quel est le pluriel de 'travail'?", options: ["travails", "travaux", "travau", "travailles"], correct: "travaux" },
          { text: "Quel est le pluriel de 'bal'?", options: ["baux", "bals", "bales", "bau"], correct: "bals" }
        ]
      }
    ];

    // Exercices pour TRAIT D'UNION DANS LES NOMBRES
    const traitUnionExercises = [
      {
        name: "Trait d'union - Nombres composés",
        type: "multiple_choice",
        questions: [
          { text: "Comment écrire 21?", options: ["vingt et un", "vingt-et-un", "vingt-un", "vingtetun"], correct: "vingt-et-un" },
          { text: "Comment écrire 45?", options: ["quarante cinq", "quarante-cinq", "quarantecinq", "quarante et cinq"], correct: "quarante-cinq" },
          { text: "Comment écrire 80?", options: ["quatre-vingt", "quatre vingt", "quatrevingt", "quatre-vingts"], correct: "quatre-vingts" },
          { text: "Comment écrire 99?", options: ["quatre-vingt-dix-neuf", "quatre vingt dix neuf", "quatrevingtdixneuf", "quatre-vingt dix-neuf"], correct: "quatre-vingt-dix-neuf" },
          { text: "Comment écrire 17?", options: ["dix sept", "dix-sept", "dixsept", "dix et sept"], correct: "dix-sept" }
        ]
      },
      {
        name: "Trait d'union - Règles",
        type: "multiple_choice",
        questions: [
          { text: "Quand met-on un trait d'union dans les nombres?", options: ["Jamais", "Toujours", "Entre les mots composant un nombre < 100", "Seulement après 'vingt'"], correct: "Entre les mots composant un nombre < 100" },
          { text: "Comment écrire 31?", options: ["trente et un", "trente-et-un", "trente-un", "trenteun"], correct: "trente-et-un" },
          { text: "Comment écrire 71?", options: ["soixante et onze", "soixante-et-onze", "soixante-onze", "soixanteonze"], correct: "soixante-et-onze" },
          { text: "Comment écrire 200?", options: ["deux-cents", "deux cents", "deuxcents", "deux-cent"], correct: "deux-cents" },
          { text: "Comment écrire 1000?", options: ["mille", "un-mille", "un mille", "unmille"], correct: "mille" }
        ]
      },
      {
        name: "Production - Trait d'union",
        type: "text",
        questions: [
          { text: "Écris en lettres les nombres suivants avec les traits d'union: 37, 54, 82.", correct: "réponse libre" },
          { text: "Écris en lettres: 156, 278, 491.", correct: "réponse libre" },
          { text: "Explique la règle du trait d'union dans les nombres.", correct: "réponse libre" },
          { text: "Écris 5 nombres entre 10 et 100 en lettres.", correct: "réponse libre" }
        ]
      },
      {
        name: "Trait d'union - Application",
        type: "multiple_choice",
        questions: [
          { text: "Quelle écriture est correcte?", options: ["J'ai quarante-deux ans.", "J'ai quarante deux ans.", "J'ai quarantedeux ans.", "J'ai quarante et deux ans."], correct: "J'ai quarante-deux ans." },
          { text: "Comment écrire 'page 58'?", options: ["page cinquante huit", "page cinquante-huit", "page cinquantehuit", "page cinquante et huit"], correct: "page cinquante-huit" },
          { text: "Comment écrire 61?", options: ["soixante et un", "soixante-et-un", "soixante-un", "soixanteun"], correct: "soixante-et-un" },
          { text: "Quel nombre s'écrit SANS trait d'union?", options: ["dix-sept", "vingt-trois", "cent", "quatre-vingts"], correct: "cent" },
          { text: "Comment écrire 'chapitre 14'?", options: ["chapitre quatorze", "chapitre quator-ze", "chapitre qua-torze", "chapitre 14"], correct: "chapitre quatorze" }
        ]
      }
    ];

    // Exercices HOMOPHONES AVANCÉS
    const homophonesAvancesExercises = [
      {
        name: "Homophones avancés - leur/leurs",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Je _____ ai donné un cadeau.' (leur/leurs)", options: ["leur", "leurs", "leurre", "leures"], correct: "leur" },
          { text: "Complète: 'Ce sont _____ livres.' (leur/leurs)", options: ["leur", "leurs", "leurre", "leures"], correct: "leurs" },
          { text: "Complète: 'Ils ont oublié _____ parapluie.' (leur/leurs)", options: ["leur", "leurs", "leurre", "leures"], correct: "leur" },
          { text: "Complète: 'Je _____ parle souvent.' (leur/leurs)", options: ["leur", "leurs", "leurre", "leures"], correct: "leur" },
          { text: "Complète: '_____ parents sont gentils.' (leur/leurs)", options: ["Leur", "Leurs", "Leurre", "Leures"], correct: "Leurs" }
        ]
      },
      {
        name: "Homophones avancés - ce/se, ces/ses/c'est/s'est",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ matin, il fait beau.' (ce/se)", options: ["Ce", "Se", "Ces", "Ses"], correct: "Ce" },
          { text: "Complète: 'Il _____ lave les mains.' (ce/se)", options: ["ce", "se", "ces", "ses"], correct: "se" },
          { text: "Complète: '_____ sont mes amis.' (ce/se, c'est/s'est)", options: ["Ce", "Se", "C'est", "S'est"], correct: "Ce" },
          { text: "Complète: 'Elle _____ trompée.' (ce/se, c'est/s'est)", options: ["ce", "se", "c'est", "s'est"], correct: "s'est" },
          { text: "Complète: '_____ la vie!' (ce/se, c'est/s'est)", options: ["Ce", "Se", "C'est", "S'est"], correct: "C'est" }
        ]
      },
      {
        name: "Production - Homophones avancés",
        type: "text",
        questions: [
          { text: "Écris 2 phrases: une avec 'leur' (pronom), une avec 'leurs' (adjectif possessif).", correct: "réponse libre" },
          { text: "Écris 2 phrases: une avec 'ce' (déterminant), une avec 'se' (pronom réfléchi).", correct: "réponse libre" },
          { text: "Écris 2 phrases: une avec 'c'est' (ce + est), une avec 's'est' (se + est).", correct: "réponse libre" },
          { text: "Écris une phrase avec 'ces' et une avec 'ses'.", correct: "réponse libre" }
        ]
      },
      {
        name: "Homophones avancés - tout/tous/toute/toutes",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ le monde est là.' (tout/tous)", options: ["Tout", "Tous", "Toute", "Toutes"], correct: "Tout" },
          { text: "Complète: 'Ils sont _____ partis.' (tout/tous)", options: ["tout", "tous", "toute", "toutes"], correct: "tous" },
          { text: "Complète: '_____ la journée, il a plu.' (tout/toute)", options: ["Tout", "Tous", "Toute", "Toutes"], correct: "Toute" },
          { text: "Complète: '_____ les filles sont arrivées.' (tout/toutes)", options: ["Tout", "Tous", "Toute", "Toutes"], correct: "Toutes" },
          { text: "Complète: 'Il est _____ content.' (tout/tous)", options: ["tout", "tous", "toute", "toutes"], correct: "tout" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Même vs Mêmes
    const memeMemeExercises = [
      {
        name: "Même - Adverbe ou adjectif",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Elles sont venues _____ .' (même = aussi, adverbe)", options: ["même", "mêmes", "mème", "memes"], correct: "même" },
          { text: "Complète: 'Ce sont les _____ personnes qu'hier.' (même = identique, adjectif)", options: ["même", "mêmes", "mème", "memes"], correct: "mêmes" },
          { text: "Complète: 'Les enfants _____ étaient surpris.' (même = aussi, adverbe)", options: ["même", "mêmes", "mème", "memes"], correct: "même" },
          { text: "Complète: 'Nous avons les _____ idées.' (même = identique, adjectif)", options: ["même", "mêmes", "mème", "memes"], correct: "mêmes" },
          { text: "Complète: '_____ les adultes ont ri.' (même = aussi, adverbe)", options: ["Même", "Mêmes", "Mème", "Memes"], correct: "Même" }
        ]
      },
      {
        name: "Même - Accord avec le nom",
        type: "multiple_choice",
        questions: [
          { text: "'Même' s'accorde quand il est...", options: ["adverbe", "adjectif", "pronom", "verbe"], correct: "adjectif" },
          { text: "Quelle phrase est correcte?", options: ["Les mêmes erreurs", "Les même erreurs", "Les mèmes erreurs", "Les meme erreurs"], correct: "Les mêmes erreurs" },
          { text: "Complète: 'Ils ont fait la _____ chose.' (singulier)", options: ["même", "mêmes", "mème", "memes"], correct: "même" },
          { text: "Complète: 'Elle a eu les _____ résultats.' (pluriel)", options: ["même", "mêmes", "mème", "memes"], correct: "mêmes" },
          { text: "'Même' est invariable quand il signifie...", options: ["identique", "aussi/y compris", "pareil", "semblable"], correct: "aussi/y compris" }
        ]
      },
      {
        name: "Production - Même vs Mêmes",
        type: "text",
        questions: [
          { text: "Écris 2 phrases avec 'même' adverbe (invariable, = aussi).", correct: "réponse libre" },
          { text: "Écris 2 phrases avec 'mêmes' adjectif (accord au pluriel).", correct: "réponse libre" },
          { text: "Explique la différence entre 'même' adverbe et 'mêmes' adjectif.", correct: "réponse libre" },
          { text: "Complète et justifie: 'Les garçons _____ étaient fatigués.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Même - Quiz récapitulatif",
        type: "multiple_choice",
        questions: [
          { text: "'Les professeurs même ont applaudi.' - 'même' est...", options: ["adverbe (invariable)", "adjectif (accord)", "pronom", "nom"], correct: "adverbe (invariable)" },
          { text: "'Ce sont les mêmes livres.' - 'mêmes' est...", options: ["adverbe", "adjectif (accord)", "pronom", "nom"], correct: "adjectif (accord)" },
          { text: "Trouve l'erreur: 'Elles portent les même robes.'", options: ["Elles", "portent", "même", "robes"], correct: "même" },
          { text: "Quelle phrase utilise 'même' correctement?", options: ["Les même choses", "Même les enfants", "Les enfants mêmes sont venus", "Mêmes adultes"], correct: "Même les enfants" },
          { text: "Corrige: 'Les mêmes erreurs se répètent.' - Est-ce correct?", options: ["Oui, c'est correct", "Non, 'même erreurs'", "Non, 'mème erreurs'", "Non, 'memes erreurs'"], correct: "Oui, c'est correct" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Quel vs Qu'elle vs Quelles
    const quelQuelleExercises = [
      {
        name: "Quel/Quelle - Déterminant interrogatif",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ heure est-il?' (masculin singulier)", options: ["Quel", "Quelle", "Qu'elle", "Quels"], correct: "Quel" },
          { text: "Complète: '_____ est ta couleur préférée?' (féminin singulier)", options: ["Quel", "Quelle", "Qu'elle", "Quelles"], correct: "Quelle" },
          { text: "Complète: '_____ sont tes amis?' (masculin pluriel)", options: ["Quel", "Quelle", "Quels", "Quelles"], correct: "Quels" },
          { text: "Complète: '_____ sont tes fleurs préférées?' (féminin pluriel)", options: ["Quel", "Quelle", "Quels", "Quelles"], correct: "Quelles" },
          { text: "Complète: '_____ beau temps!' (exclamatif masculin)", options: ["Quel", "Quelle", "Qu'elle", "Quels"], correct: "Quel" }
        ]
      },
      {
        name: "Qu'elle/Qu'elles - Pronom + verbe",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Je pense _____ viendra.' (que + elle)", options: ["quel", "quelle", "qu'elle", "qu'elles"], correct: "qu'elle" },
          { text: "Complète: 'Il dit _____ sont parties.' (que + elles)", options: ["quel", "quelles", "qu'elle", "qu'elles"], correct: "qu'elles" },
          { text: "Complète: 'C'est _____ est belle!' (que + elle)", options: ["quel", "quelle", "qu'elle", "qu'elles"], correct: "qu'elle" },
          { text: "Astuce: On peut remplacer par 'qu'il' quand c'est...", options: ["quel/quelle", "qu'elle", "quels", "quelles"], correct: "qu'elle" },
          { text: "Complète: 'Je sais _____ ont réussi.' (que + elles)", options: ["quelles", "qu'elle", "qu'elles", "quel"], correct: "qu'elles" }
        ]
      },
      {
        name: "Production - Quel/Qu'elle",
        type: "text",
        questions: [
          { text: "Écris 2 phrases avec 'quel' (masculin) et 2 avec 'quelle' (féminin).", correct: "réponse libre" },
          { text: "Écris 2 phrases avec 'qu'elle' (que + elle).", correct: "réponse libre" },
          { text: "Explique comment distinguer 'quelle' de 'qu'elle'.", correct: "réponse libre" },
          { text: "Complète et justifie: '_____ belle journée!' et 'Je crois _____ a raison.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quel/Qu'elle - Quiz récapitulatif",
        type: "multiple_choice",
        questions: [
          { text: "'Quelle chance!' - 'quelle' est...", options: ["pronom que + elle", "déterminant exclamatif", "adverbe", "verbe"], correct: "déterminant exclamatif" },
          { text: "'Je pense qu'elle a raison.' - 'qu'elle' est...", options: ["déterminant", "que + elle (pronom)", "adjectif", "nom"], correct: "que + elle (pronom)" },
          { text: "Trouve l'erreur: 'Quel est ta maison?'", options: ["Quel", "est", "ta", "maison"], correct: "Quel" },
          { text: "Pour vérifier 'qu'elle', on peut remplacer par...", options: ["quelle", "qu'il", "quel", "quels"], correct: "qu'il" },
          { text: "Quelle phrase est correcte?", options: ["Qu'elle heure est-il?", "Quelle heure est-il?", "Quel heure est-il?", "Quels heure est-il?"], correct: "Quelle heure est-il?" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Ces vs C'est vs S'est
    const cesCestExercises = [
      {
        name: "Ces - Déterminant démonstratif",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ livres sont intéressants.' (démonstratif pluriel)", options: ["Ces", "C'est", "S'est", "Ses"], correct: "Ces" },
          { text: "Complète: '_____ enfants jouent dehors.' (démonstratif pluriel)", options: ["Ces", "C'est", "S'est", "Ses"], correct: "Ces" },
          { text: "'Ces' est utilisé pour...", options: ["montrer/désigner", "dire 'ce est'", "verbe pronominal", "possession"], correct: "montrer/désigner" },
          { text: "Complète: 'Regarde _____ oiseaux!' (démonstratif)", options: ["ces", "c'est", "s'est", "ses"], correct: "ces" },
          { text: "'Ces' peut être remplacé par...", options: ["ce est", "il est", "ceux-là/celles-là", "se est"], correct: "ceux-là/celles-là" }
        ]
      },
      {
        name: "C'est vs S'est - Verbe être",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ mon ami.' (ce + est)", options: ["Ces", "C'est", "S'est", "Ses"], correct: "C'est" },
          { text: "Complète: 'Elle _____ trompée.' (se + est, pronominal)", options: ["ces", "c'est", "s'est", "ses"], correct: "s'est" },
          { text: "Complète: '_____ une bonne idée!' (ce + est)", options: ["Ces", "C'est", "S'est", "Ses"], correct: "C'est" },
          { text: "Complète: 'Il _____ levé tôt.' (se + est, pronominal)", options: ["ces", "c'est", "s'est", "ses"], correct: "s'est" },
          { text: "'S'est' s'utilise avec un verbe...", options: ["transitif", "intransitif", "pronominal", "impersonnel"], correct: "pronominal" }
        ]
      },
      {
        name: "Production - Ces/C'est/S'est",
        type: "text",
        questions: [
          { text: "Écris 2 phrases avec 'ces' (démonstratif pluriel).", correct: "réponse libre" },
          { text: "Écris 2 phrases avec 'c'est' (ce + est).", correct: "réponse libre" },
          { text: "Écris 2 phrases avec 's'est' (verbe pronominal).", correct: "réponse libre" },
          { text: "Explique la différence entre 'c'est' et 's'est'.", correct: "réponse libre" }
        ]
      },
      {
        name: "Ces/C'est/S'est - Quiz récapitulatif",
        type: "multiple_choice",
        questions: [
          { text: "'Ces fleurs sont belles.' - 'ces' est...", options: ["ce + est", "se + est", "déterminant démonstratif", "possessif"], correct: "déterminant démonstratif" },
          { text: "'C'est formidable!' - 'c'est' est...", options: ["démonstratif pluriel", "ce + est", "se + est", "possessif"], correct: "ce + est" },
          { text: "'Elle s'est blessée.' - 's'est' est...", options: ["démonstratif", "ce + est", "se + est (pronominal)", "possessif"], correct: "se + est (pronominal)" },
          { text: "Trouve l'erreur: 'Ces mon frère.'", options: ["Ces", "mon", "frère", "Pas d'erreur"], correct: "Ces" },
          { text: "Quelle phrase est correcte?", options: ["Ces magnifique!", "C'est magnifique!", "S'est magnifique!", "Ses magnifique!"], correct: "C'est magnifique!" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les règles de base (majuscules, accents, ponctuation)
    const reglesBaseExercises = [
      {
        name: "Majuscules - Règles essentielles",
        type: "multiple_choice",
        questions: [
          { text: "Où met-on toujours une majuscule?", options: ["Après une virgule", "Au début d'une phrase", "Avant un point", "Après 'et'"], correct: "Au début d'une phrase" },
          { text: "Quelle phrase est correcte?", options: ["je suis content.", "Je suis content.", "JE suis content.", "je Suis content."], correct: "Je suis content." },
          { text: "Les noms propres prennent...", options: ["une minuscule", "une majuscule", "pas de règle", "deux majuscules"], correct: "une majuscule" },
          { text: "Quelle écriture est correcte?", options: ["paris", "Paris", "PARIS", "pARIS"], correct: "Paris" },
          { text: "Après un point, on met...", options: ["une minuscule", "une majuscule", "un espace seulement", "rien"], correct: "une majuscule" }
        ]
      },
      {
        name: "Accents - Types et usage",
        type: "multiple_choice",
        questions: [
          { text: "Quel accent est sur 'é'?", options: ["accent grave", "accent aigu", "accent circonflexe", "tréma"], correct: "accent aigu" },
          { text: "Quel accent est sur 'è'?", options: ["accent grave", "accent aigu", "accent circonflexe", "tréma"], correct: "accent grave" },
          { text: "Quel accent est sur 'ê'?", options: ["accent grave", "accent aigu", "accent circonflexe", "tréma"], correct: "accent circonflexe" },
          { text: "Le tréma sert à...", options: ["allonger le son", "séparer deux voyelles", "marquer le passé", "rien"], correct: "séparer deux voyelles" },
          { text: "Quel mot a un accent circonflexe?", options: ["ecole", "forêt", "mere", "pere"], correct: "forêt" }
        ]
      },
      {
        name: "Production - Règles de base",
        type: "text",
        questions: [
          { text: "Écris 3 phrases en respectant les règles de majuscule.", correct: "réponse libre" },
          { text: "Écris 5 mots avec un accent aigu (é).", correct: "réponse libre" },
          { text: "Écris 5 mots avec un accent grave (è, à, ù).", correct: "réponse libre" },
          { text: "Corrige les erreurs: 'marie habite a paris depuis l'ete.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Règles de base - Quiz",
        type: "multiple_choice",
        questions: [
          { text: "Combien de types d'accents existe-t-il en français?", options: ["2", "3", "4", "5"], correct: "4" },
          { text: "La cédille (ç) se met sous quelle lettre?", options: ["s", "c", "g", "t"], correct: "c" },
          { text: "Quelle phrase respecte toutes les règles?", options: ["il mange a paris.", "Il mange à Paris.", "il Mange à paris.", "IL mange a Paris."], correct: "Il mange à Paris." },
          { text: "Le mot 'où' a quel accent?", options: ["aigu", "grave", "circonflexe", "pas d'accent"], correct: "grave" },
          { text: "'Noël' utilise quel signe?", options: ["accent aigu", "accent grave", "tréma", "cédille"], correct: "tréma" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Mots invariables et exceptions
    const motsInvariablesExercises = [
      {
        name: "Mots invariables - Identification",
        type: "multiple_choice",
        questions: [
          { text: "Un mot invariable est un mot qui...", options: ["change au pluriel", "ne change jamais", "change au féminin", "change au passé"], correct: "ne change jamais" },
          { text: "Quel mot est invariable?", options: ["chien", "toujours", "maison", "grand"], correct: "toujours" },
          { text: "Quel mot est invariable?", options: ["belle", "souvent", "petit", "verte"], correct: "souvent" },
          { text: "Les adverbes sont généralement...", options: ["variables", "invariables", "féminins", "pluriels"], correct: "invariables" },
          { text: "Quel mot ne change pas?", options: ["maintenant", "chat", "fleur", "arbre"], correct: "maintenant" }
        ]
      },
      {
        name: "Catégories de mots invariables",
        type: "multiple_choice",
        questions: [
          { text: "'Beaucoup', 'peu', 'très' sont des...", options: ["noms", "verbes", "adverbes (invariables)", "adjectifs"], correct: "adverbes (invariables)" },
          { text: "'Dans', 'sur', 'sous' sont des...", options: ["adverbes", "prépositions (invariables)", "conjonctions", "noms"], correct: "prépositions (invariables)" },
          { text: "'Et', 'ou', 'mais' sont des...", options: ["adverbes", "prépositions", "conjonctions (invariables)", "pronoms"], correct: "conjonctions (invariables)" },
          { text: "Quel mot invariable indique le temps?", options: ["rouge", "hier", "maison", "grand"], correct: "hier" },
          { text: "Quel mot invariable indique le lieu?", options: ["ici", "bleu", "table", "petit"], correct: "ici" }
        ]
      },
      {
        name: "Production - Mots invariables",
        type: "text",
        questions: [
          { text: "Écris 5 adverbes invariables (ex: toujours, jamais...).", correct: "réponse libre" },
          { text: "Écris 5 prépositions invariables (ex: dans, sur...).", correct: "réponse libre" },
          { text: "Écris 3 phrases avec des mots invariables.", correct: "réponse libre" },
          { text: "Explique pourquoi 'toujours' ne change pas même au pluriel.", correct: "réponse libre" }
        ]
      },
      {
        name: "Mots invariables - Quiz",
        type: "multiple_choice",
        questions: [
          { text: "Trouve le mot invariable: 'Les enfants jouent souvent dehors.'", options: ["enfants", "jouent", "souvent", "dehors"], correct: "souvent" },
          { text: "Combien de mots invariables? 'Il mange toujours ici.'", options: ["0", "1", "2", "3"], correct: "2" },
          { text: "'Lentement' est-il invariable?", options: ["Oui", "Non", "Parfois", "Ça dépend"], correct: "Oui" },
          { text: "Quel mot peut changer?", options: ["jamais", "content", "très", "avant"], correct: "content" },
          { text: "Les prépositions sont...", options: ["toujours variables", "toujours invariables", "parfois variables", "jamais utilisées"], correct: "toujours invariables" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les pièges courants (erreurs fréquentes)
    const piegesCourantsExercises = [
      {
        name: "Erreurs de doublement de consonnes",
        type: "multiple_choice",
        questions: [
          { text: "Quelle orthographe est correcte?", options: ["adresse", "adrese", "addresse", "adrèse"], correct: "adresse" },
          { text: "Quelle orthographe est correcte?", options: ["appercevoir", "apercevoir", "apperçevoir", "apercevoire"], correct: "apercevoir" },
          { text: "Quelle orthographe est correcte?", options: ["courrir", "courir", "courrire", "courire"], correct: "courir" },
          { text: "Quelle orthographe est correcte?", options: ["nourrir", "nourir", "nourrire", "nourire"], correct: "nourrir" },
          { text: "Quelle orthographe est correcte?", options: ["apeller", "appeler", "apellé", "appeller"], correct: "appeler" }
        ]
      },
      {
        name: "Erreurs de terminaisons",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Je mang___ une pomme.' (présent)", options: ["-e", "-es", "-ent", "-ai"], correct: "-e" },
          { text: "Quelle terminaison? 'Il a fini___ son travail.'", options: ["é", "er", "ez", "ée"], correct: "" },
          { text: "Quelle est la bonne forme? 'Ils ont _____ leur devoir.'", options: ["terminer", "terminé", "terminés", "terminée"], correct: "terminé" },
          { text: "Erreur fréquente: 'Je voudrais mang___.' (infinitif)", options: ["-é", "-er", "-ez", "-ée"], correct: "-er" },
          { text: "Quelle phrase est correcte?", options: ["J'ai mangé", "J'ai manger", "J'ai mangez", "J'ai mangés"], correct: "J'ai mangé" }
        ]
      },
      {
        name: "Production - Pièges courants",
        type: "text",
        questions: [
          { text: "Écris 5 mots avec des consonnes doublées (mm, ll, ss, tt, etc.).", correct: "réponse libre" },
          { text: "Distingue: Écris une phrase avec 'é' (participe) et une avec 'er' (infinitif).", correct: "réponse libre" },
          { text: "Corrige les erreurs: 'J'ai manger du pain et je vais aller mangé.'", correct: "réponse libre" },
          { text: "Explique comment distinguer '-é' de '-er' à la fin d'un verbe.", correct: "réponse libre" }
        ]
      },
      {
        name: "Pièges courants - Quiz",
        type: "multiple_choice",
        questions: [
          { text: "Trouve l'erreur: 'Je suis aller au marché.'", options: ["suis", "aller", "au", "marché"], correct: "aller" },
          { text: "Quelle phrase est correcte?", options: ["Il faut manger", "Il faut mangé", "Il faut mangez", "Il faut mangés"], correct: "Il faut manger" },
          { text: "Comment savoir si c'est '-é' ou '-er'?", options: ["Remplacer par 'vendu/vendre'", "Regarder le sujet", "Compter les syllabes", "Au hasard"], correct: "Remplacer par 'vendu/vendre'" },
          { text: "Quelle orthographe est correcte?", options: ["language", "langage", "langague", "lengague"], correct: "langage" },
          { text: "Quelle orthographe est correcte?", options: ["developper", "développer", "develloper", "dévelloper"], correct: "développer" }
        ]
      }
    ];

    // CONJUGAISON: 4 exercices avec 4-5 questions chacun
    const conjugaisonExercises = [
      {
        name: "Présent - Identification",
        type: "multiple_choice",
        questions: [
          { text: "Conjugue 'manger' à la 1ère personne du présent: 'Je _____ une pomme.'", options: ["mangent", "manges", "mange", "mangeai"], correct: "mange" },
          { text: "Conjugue 'aller' à la 3e personne du pluriel: 'Elles _____ à l'école.'", options: ["allons", "allez", "vont", "vas"], correct: "vont" },
          { text: "Quel verbe est conjugué au présent? 'Nous chantons une chanson.'", options: ["chantons", "chantions", "chantâmes", "chanterons"], correct: "chantons" },
          { text: "Complète: 'Tu _____ (être) intelligent.' Quel temps?", options: ["es - présent", "étais - imparfait", "seras - futur", "serais - conditionnel"], correct: "es - présent" },
          { text: "Conjugue 'avoir' à la 2e personne du pluriel: 'Vous _____ des livres.'", options: ["avez", "avons", "ont", "ai"], correct: "avez" }
        ]
      },
      {
        name: "Passé composé vs Imparfait",
        type: "multiple_choice",
        questions: [
          { text: "Quel temps? 'J'ai mangé une pomme.' (action terminée)", options: ["passé composé", "imparfait", "présent", "futur"], correct: "passé composé" },
          { text: "Quel temps? 'Je mangeais une pomme quand tu as appelé.' (action en cours)", options: ["passé composé", "imparfait", "présent", "futur"], correct: "imparfait" },
          { text: "Complète: 'Quand j'_____ (arriver), il était déjà parti.' (au passé composé)", options: ["suis arrivé", "arrivais", "arrives", "arriverai"], correct: "suis arrivé" },
          { text: "Conjugue 'être' à l'imparfait: 'Elle _____ très heureuse.'", options: ["était", "est", "a été", "serait"], correct: "était" },
          { text: "Différence: 'J'ai étudié pendant 2 heures' vs 'J'étudiais depuis longtemps'. Lequel est passé composé?", options: ["premier", "deuxième", "les deux", "aucun"], correct: "premier" }
        ]
      },
      {
        name: "Futur simple - Production",
        type: "text",
        questions: [
          { text: "Conjugue 3 verbes au futur simple (je vais..., tu seras..., etc.)", correct: "réponse libre" },
          { text: "Écris 2 phrases au futur: une avec 'aller' et une avec 'avoir'", correct: "réponse libre" },
          { text: "Transforme 'Je mange' au futur simple et à l'imparfait.", correct: "réponse libre" },
          { text: "Écris une phrase au passé composé avec le verbe 'faire'.", correct: "réponse libre" }
        ]
      },
      {
        name: "Temps mélangés - Quiz",
        type: "multiple_choice",
        questions: [
          { text: "Quel temps? 'Je mangerai une pomme demain.'", options: ["présent", "imparfait", "futur", "passé composé"], correct: "futur" },
          { text: "Complète: 'Si je _____ (avoir) du temps, j'irai à la plage.' (conditionnel)", options: ["avais", "ai", "aurais", "aurai"], correct: "avais" },
          { text: "Conjugue 'faire' au passé composé avec 'je': 'J'_____ mes devoirs.'", options: ["fais", "faisais", "ai fait", "ferai"], correct: "ai fait" },
          { text: "Quel verbe est à l'imparfait? 'Pendant que je lisais, il regardait la TV.'", options: ["lisais - oui, regardait - oui", "lisais - oui, regardait - non", "lisais - non, regardait - oui", "les deux - non"], correct: "lisais - oui, regardait - oui" },
          { text: "Que signifie le passé composé?", options: ["action habituelle du passé", "action terminée du passé", "action future", "action présente"], correct: "action terminée du passé" }
        ]
      }
    ];

    // PONCTUATION: 4 exercices avec 4-5 questions chacun
    const ponctuationExercises = [
      {
        name: "Signes basiques - Identification",
        type: "multiple_choice",
        questions: [
          { text: "Quel signe marque la fin d'une phrase assertive?", options: ["?", "!", ".", ","], correct: "." },
          { text: "Quel signe faut-il après 'Bonjour'?", options: [".", "?", ",", "-"], correct: "." },
          { text: "Quelle phrase utilise correctement le point d'interrogation?", options: ["Pourquoi tu fais ça.", "Pourquoi tu fais ça?", "Pourquoi tu fais ça!", "Pourquoi tu fais ça,"], correct: "Pourquoi tu fais ça?" },
          { text: "Complète: 'J'adore les bonbons____ les glaces____ et les gâteaux.' (virgules ou points?)", options: ["virgule, virgule", "point, point", "virgule, et", "point, et"], correct: "virgule, et" },
          { text: "Quel signe exprime une forte émotion?", options: [".", ",", "!", "?"], correct: "!" }
        ]
      },
      {
        name: "Dialogue - Tirets et guillemets",
        type: "multiple_choice",
        questions: [
          { text: "Comment commencer un dialogue en français?", options: ["'Il dit...", "— Il dit...", "\"Il dit...", "Il dit:"], correct: "— Il dit..." },
          { text: "Complète: '_____ Bonjour! _____ répondit Marie.' (tirets avant et après)", options: ["— ... —", "\" ... \"", "- ... -", "— ... —"], correct: "— ... —" },
          { text: "Quel est le format correct? 'Jean: Ça va? Pierre: Oui, ça va.'", options: ["Pas de tirets", "Tirets au début de chaque ligne", "Guillemets anglais", "Aucun"], correct: "Tirets au début de chaque ligne" },
          { text: "Où placer le point d'interrogation? '___Pourquoi___' demanda-t-il.", options: ["'?Pourquoi?'", "'Pourquoi'?", "Pourquoi?", "'Pourquoi?'"], correct: "'Pourquoi?'" },
          { text: "Quelle est la bonne ponctuation après un tiret de dialogue?", options: ["rien", "virgule", "deux-points", "espaces libres"], correct: "rien" }
        ]
      },
      {
        name: "Ponctuation avancée - Production",
        type: "text",
        questions: [
          { text: "Écris une phrase avec une virgule, un tiret, et une exclamation.", correct: "réponse libre" },
          { text: "Écris un petit dialogue (2-3 lignes) avec tirets et bonne ponctuation.", correct: "réponse libre" },
          { text: "Utilise les parenthèses, les guillemets et un point-virgule dans une phrase.", correct: "réponse libre" },
          { text: "Ponctue correctement: 'Où vas tu Qu'est ce que tu fais Ce que tu fais est dangereux'", correct: "réponse libre" }
        ]
      },
      {
        name: "Cas complexes - Quiz",
        type: "multiple_choice",
        questions: [
          { text: "Quel signe sépare deux propositions indépendantes?", options: ["virgule", "deux-points", "point-virgule", "tiret"], correct: "point-virgule" },
          { text: "Complète: 'Les fruits_____ pommes_____ oranges_____ bananes sont délicieux.' (énumération)", options: ["virgule, virgule, virgule", ", , et", "virgule, virgule, et", "virgule, et, virgule"], correct: "virgule, virgule, et" },
          { text: "Où va la virgule? 'Si tu viens demain nous jouerons ensemble.'", options: ["Pas de virgule", "Après 'demain'", "Après 'Si tu viens'", "Avant 'nous'"], correct: "Après 'Si tu viens'" },
          { text: "Comment écrire une liste bien ponctuée?", options: ["élément1 élément2 élément3", "élément1, élément2, élément3", "élément1; élément2; élément3", "élément1. élément2. élément3."], correct: "élément1, élément2, élément3" },
          { text: "Quel signe introduit une explication?", options: ["-", ":", ",", "!"], correct: ":" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Le groupe infinitif (grammaire)
    const groupeInfinitifExercises = [
      {
        name: "Reconnaître le groupe infinitif",
        type: "multiple_choice",
        questions: [
          { text: "Un groupe infinitif a pour noyau...", options: ["un verbe conjugué", "un verbe à l'infinitif", "un nom", "un adjectif"], correct: "un verbe à l'infinitif" },
          { text: "Dans 'Je veux manger une pomme.', le groupe infinitif est...", options: ["Je veux", "manger une pomme", "une pomme", "Je"], correct: "manger une pomme" },
          { text: "L'infinitif est une forme verbale...", options: ["conjuguée", "non conjuguée", "au passé", "au futur"], correct: "non conjuguée" },
          { text: "Dans 'Il aime lire des romans.', le groupe infinitif est...", options: ["Il aime", "lire des romans", "des romans", "aime lire"], correct: "lire des romans" },
          { text: "Quel groupe est un groupe infinitif?", options: ["mange bien", "manger bien", "a mangé", "mangera"], correct: "manger bien" }
        ]
      },
      {
        name: "Fonctions du groupe infinitif",
        type: "multiple_choice",
        questions: [
          { text: "'Manger est nécessaire.' - Le groupe infinitif est...", options: ["complément", "sujet", "attribut", "CP"], correct: "sujet" },
          { text: "'Je veux partir.' - Le groupe infinitif est...", options: ["sujet", "complément du verbe", "CP", "attribut"], correct: "complément du verbe" },
          { text: "'Il est parti sans manger.' - Le groupe infinitif est dans...", options: ["le GS", "le GV", "un GP", "le CP"], correct: "un GP" },
          { text: "Le groupe infinitif peut avoir la fonction de...", options: ["seulement sujet", "seulement complément", "sujet, complément, ou autre", "aucune fonction"], correct: "sujet, complément, ou autre" },
          { text: "'Courir vite fatigue.' - 'Courir vite' est...", options: ["le GV", "le GS (sujet)", "un CP", "un attribut"], correct: "le GS (sujet)" }
        ]
      },
      {
        name: "Production - Groupe infinitif",
        type: "text",
        questions: [
          { text: "Écris 3 phrases avec un groupe infinitif comme complément du verbe.", correct: "réponse libre" },
          { text: "Écris une phrase où le groupe infinitif est sujet.", correct: "réponse libre" },
          { text: "Identifie le groupe infinitif et sa fonction: 'Nous aimons voyager en été.'", correct: "réponse libre" },
          { text: "Enrichis ce groupe infinitif: 'marcher' → avec un complément.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Groupe infinitif",
        type: "multiple_choice",
        questions: [
          { text: "Le groupe infinitif peut contenir...", options: ["seulement l'infinitif", "l'infinitif + ses compléments", "seulement des noms", "des verbes conjugués"], correct: "l'infinitif + ses compléments" },
          { text: "Quelle phrase contient un groupe infinitif sujet?", options: ["Il mange.", "Dormir est bon.", "Marie court.", "Le chat dort."], correct: "Dormir est bon." },
          { text: "Dans 'Je dois finir mon travail.', le groupe infinitif est...", options: ["Je dois", "finir mon travail", "mon travail", "dois finir"], correct: "finir mon travail" },
          { text: "L'infinitif peut être complément de certains verbes comme...", options: ["être, avoir", "vouloir, pouvoir, devoir, aimer", "le, la, les", "qui, que, dont"], correct: "vouloir, pouvoir, devoir, aimer" },
          { text: "'Avant de partir' contient un groupe infinitif introduit par...", options: ["un nom", "une préposition", "un verbe", "un adjectif"], correct: "une préposition" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Phrases à structure particulière (grammaire)
    const phrasesStructureParticuliereExercises = [
      {
        name: "Phrases impersonnelles",
        type: "multiple_choice",
        questions: [
          { text: "'Il pleut.' est une phrase...", options: ["personnelle", "impersonnelle", "complexe", "interrogative"], correct: "impersonnelle" },
          { text: "Dans 'Il neige fort.', 'il' représente...", options: ["une personne", "un animal", "rien (sujet apparent)", "le temps"], correct: "rien (sujet apparent)" },
          { text: "Quelle phrase est impersonnelle?", options: ["Il mange.", "Il faut partir.", "Il dort.", "Pierre rit."], correct: "Il faut partir." },
          { text: "'Il est important de réussir.' Le 'il' est...", options: ["un pronom personnel", "un sujet apparent (impersonnel)", "un nom propre", "un déterminant"], correct: "un sujet apparent (impersonnel)" },
          { text: "Les verbes météo (pleuvoir, neiger) sont souvent...", options: ["personnels", "impersonnels", "transitifs", "pronominaux"], correct: "impersonnels" }
        ]
      },
      {
        name: "Phrases sans GN sujet",
        type: "multiple_choice",
        questions: [
          { text: "'Viens ici!' est une phrase...", options: ["sans sujet exprimé (impérative)", "sans verbe", "complexe", "passive"], correct: "sans sujet exprimé (impérative)" },
          { text: "Dans une phrase impérative, le sujet est...", options: ["toujours présent", "sous-entendu", "après le verbe", "un pronom 'il'"], correct: "sous-entendu" },
          { text: "'Mangeons!' - Le sujet sous-entendu est...", options: ["je", "tu", "nous", "ils"], correct: "nous" },
          { text: "'Taisez-vous!' - Le sujet sous-entendu est...", options: ["tu", "nous", "vous", "ils"], correct: "vous" },
          { text: "Quelle phrase a un sujet sous-entendu?", options: ["Il dort.", "Marie mange.", "Parle plus fort!", "Le chat miaule."], correct: "Parle plus fort!" }
        ]
      },
      {
        name: "Production - Structures particulières",
        type: "text",
        questions: [
          { text: "Écris 3 phrases impersonnelles (avec 'il' impersonnel).", correct: "réponse libre" },
          { text: "Écris 2 phrases impératives (sans sujet exprimé).", correct: "réponse libre" },
          { text: "Transforme en phrase impersonnelle: 'Partir tôt est nécessaire.'", correct: "réponse libre" },
          { text: "Identifie la structure particulière: 'Il convient d'attendre.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Structures particulières",
        type: "multiple_choice",
        questions: [
          { text: "Une phrase impersonnelle a pour sujet...", options: ["un nom propre", "un 'il' qui ne représente rien", "un pronom personnel", "un GN"], correct: "un 'il' qui ne représente rien" },
          { text: "L'impératif est une phrase sans...", options: ["verbe", "sujet exprimé", "sens", "ponctuation"], correct: "sujet exprimé" },
          { text: "Quelle phrase n'est PAS impersonnelle?", options: ["Il neige.", "Il fait froid.", "Il est gentil.", "Il faut manger."], correct: "Il est gentil." },
          { text: "'Il y a' est une construction...", options: ["personnelle", "impersonnelle", "passive", "pronominale"], correct: "impersonnelle" },
          { text: "Les phrases à structure particulière sont...", options: ["incorrectes", "des variations normales de la langue", "interdites", "rares"], correct: "des variations normales de la langue" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les phrases transformées (grammaire)
    const phrasesTransformeesExercises = [
      {
        name: "Affirmative ↔ Négative",
        type: "multiple_choice",
        questions: [
          { text: "La forme négative de 'Il mange.' est...", options: ["Il ne mange pas.", "Il mange beaucoup.", "Mange-t-il?", "Il mangera."], correct: "Il ne mange pas." },
          { text: "La forme affirmative de 'Elle ne dort pas.' est...", options: ["Elle dort.", "Elle dort-elle?", "Dort-elle?", "Elle ne dort jamais."], correct: "Elle dort." },
          { text: "'Je n'ai rien vu.' La négation est formée par...", options: ["ne...pas", "ne...rien", "ne...jamais", "ne...plus"], correct: "ne...rien" },
          { text: "Quelle phrase est à la forme négative?", options: ["Il travaille bien.", "Il ne travaille plus.", "Travaille-t-il?", "Il travaillera demain."], correct: "Il ne travaille plus." },
          { text: "Transforme en négatif: 'Il mange toujours.'", options: ["Il ne mange jamais.", "Il ne mange pas.", "Il mange peu.", "Il mangera."], correct: "Il ne mange jamais." }
        ]
      },
      {
        name: "Active ↔ Passive",
        type: "multiple_choice",
        questions: [
          { text: "'Le chat mange la souris.' à la voix passive:", options: ["La souris mange le chat.", "La souris est mangée par le chat.", "Le chat est mangé.", "La souris a mangé."], correct: "La souris est mangée par le chat." },
          { text: "'La pomme est mangée par Marie.' à la voix active:", options: ["Marie mange la pomme.", "La pomme mange Marie.", "Marie est mangée.", "La pomme mangera."], correct: "Marie mange la pomme." },
          { text: "À la voix passive, le sujet...", options: ["fait l'action", "subit l'action", "pose une question", "donne un ordre"], correct: "subit l'action" },
          { text: "Quel mot introduit l'agent à la voix passive?", options: ["et", "par", "pour", "avec"], correct: "par" },
          { text: "Quelle phrase est à la voix passive?", options: ["Marie lit un livre.", "Le livre est lu par Marie.", "Marie a lu.", "Lis ce livre!"], correct: "Le livre est lu par Marie." }
        ]
      },
      {
        name: "Production - Transformations",
        type: "text",
        questions: [
          { text: "Transforme en phrase négative: 'Les enfants jouent dehors.'", correct: "réponse libre" },
          { text: "Transforme en voix passive: 'Le professeur corrige les copies.'", correct: "réponse libre" },
          { text: "Transforme en voix active: 'Le gâteau a été préparé par maman.'", correct: "réponse libre" },
          { text: "Écris une phrase puis transforme-la: affirmative → négative → interrogative.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Phrases transformées",
        type: "multiple_choice",
        questions: [
          { text: "Les principales transformations de phrases sont...", options: ["longue/courte", "négation, passivation, interrogation", "simple/complexe", "écrite/orale"], correct: "négation, passivation, interrogation" },
          { text: "La voix passive utilise l'auxiliaire...", options: ["avoir", "être", "faire", "aller"], correct: "être" },
          { text: "Pour transformer en interrogatif, on peut...", options: ["ajouter ne...pas", "inverser sujet-verbe ou ajouter est-ce que", "changer le temps", "ajouter un complément"], correct: "inverser sujet-verbe ou ajouter est-ce que" },
          { text: "'Personne ne vient.' est une phrase...", options: ["affirmative", "négative", "passive", "impérative"], correct: "négative" },
          { text: "Une phrase peut subir plusieurs transformations à la fois?", options: ["Non, jamais", "Oui (ex: n'est-il pas aimé?)", "Seulement 2", "C'est interdit"], correct: "Oui (ex: n'est-il pas aimé?)" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Types et formes de phrases (grammaire)
    const typesFormesPhrasesExercises = [
      {
        name: "Les 4 types de phrases",
        type: "multiple_choice",
        questions: [
          { text: "'Le chat dort.' est une phrase de type...", options: ["interrogatif", "déclaratif", "impératif", "exclamatif"], correct: "déclaratif" },
          { text: "'Viens ici!' est une phrase de type...", options: ["déclaratif", "interrogatif", "impératif", "exclamatif"], correct: "impératif" },
          { text: "'Où vas-tu?' est une phrase de type...", options: ["déclaratif", "interrogatif", "impératif", "exclamatif"], correct: "interrogatif" },
          { text: "'Comme c'est beau!' est une phrase de type...", options: ["déclaratif", "interrogatif", "impératif", "exclamatif"], correct: "exclamatif" },
          { text: "Combien y a-t-il de types de phrases?", options: ["2", "3", "4", "5"], correct: "4" }
        ]
      },
      {
        name: "Les formes de phrases",
        type: "multiple_choice",
        questions: [
          { text: "'Je ne mange pas.' est une phrase de forme...", options: ["affirmative", "négative", "interrogative", "exclamative"], correct: "négative" },
          { text: "'Marie est contente.' est une phrase de forme...", options: ["négative", "affirmative", "impérative", "exclamative"], correct: "affirmative" },
          { text: "La forme affirmative et la forme négative sont...", options: ["des types", "des formes", "des modes", "des temps"], correct: "des formes" },
          { text: "Une phrase peut être à la fois déclarative et...", options: ["interrogative", "impérative", "négative", "exclamative"], correct: "négative" },
          { text: "'Ne parle pas!' est une phrase...", options: ["déclarative affirmative", "impérative négative", "interrogative affirmative", "exclamative négative"], correct: "impérative négative" }
        ]
      },
      {
        name: "Production - Types et formes",
        type: "text",
        questions: [
          { text: "Transforme cette phrase déclarative en interrogative: 'Tu aimes le chocolat.'", correct: "réponse libre" },
          { text: "Transforme cette phrase affirmative en négative: 'Il mange des fruits.'", correct: "réponse libre" },
          { text: "Écris une phrase impérative affirmative et une impérative négative.", correct: "réponse libre" },
          { text: "Identifie le type et la forme: 'Ne cours-tu pas?'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Types et formes",
        type: "multiple_choice",
        questions: [
          { text: "Les 4 types de phrases sont...", options: ["affirmatif, négatif, passif, actif", "déclaratif, interrogatif, impératif, exclamatif", "simple, complexe, minimale, étendue", "présent, passé, futur, conditionnel"], correct: "déclaratif, interrogatif, impératif, exclamatif" },
          { text: "Les 2 formes principales sont...", options: ["active et passive", "affirmative et négative", "simple et complexe", "courte et longue"], correct: "affirmative et négative" },
          { text: "Une phrase peut-elle être interrogative ET négative?", options: ["Non, jamais", "Oui (ex: Ne viens-tu pas?)", "Seulement parfois", "C'est impossible"], correct: "Oui (ex: Ne viens-tu pas?)" },
          { text: "Quelle phrase est exclamative?", options: ["Tu viens.", "Viens ici.", "Comme tu es grand!", "Es-tu prêt?"], correct: "Comme tu es grand!" },
          { text: "La phrase impérative sert à...", options: ["poser une question", "exprimer un ordre ou conseil", "décrire un fait", "s'exclamer"], correct: "exprimer un ordre ou conseil" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Le groupe du verbe - GV (grammaire)
    const groupeVerbeExercises = [
      {
        name: "Identifier le GV",
        type: "multiple_choice",
        questions: [
          { text: "Le GV (groupe du verbe) a pour noyau...", options: ["un nom", "un verbe", "un adjectif", "un adverbe"], correct: "un verbe" },
          { text: "Dans 'Il mange une pomme', le GV est...", options: ["Il", "mange", "une pomme", "mange une pomme"], correct: "mange une pomme" },
          { text: "Le GV contient toujours...", options: ["un nom", "un verbe conjugué ou à l'infinitif", "un adjectif", "un déterminant"], correct: "un verbe conjugué ou à l'infinitif" },
          { text: "Dans 'Marie dort profondément', le GV est...", options: ["Marie", "dort", "profondément", "dort profondément"], correct: "dort profondément" },
          { text: "Le GV peut contenir...", options: ["seulement le verbe", "le verbe + ses compléments/attribut", "seulement des noms", "le sujet"], correct: "le verbe + ses compléments/attribut" }
        ]
      },
      {
        name: "Composition du GV",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Il donne un livre à Marie', 'un livre' fait partie du...", options: ["GS", "GV", "CP", "GN sujet"], correct: "GV" },
          { text: "L'attribut du sujet fait partie du...", options: ["GS", "GV", "CP", "GN"], correct: "GV" },
          { text: "Dans 'Elle est contente', 'contente' est...", options: ["dans le GS", "dans le GV (attribut)", "un CP", "le noyau"], correct: "dans le GV (attribut)" },
          { text: "Dans 'Nous allons au parc', 'au parc' est...", options: ["un CP déplaçable", "dans le GV", "le GS", "facultatif"], correct: "dans le GV" },
          { text: "Le GV peut contenir des compléments du verbe qui sont...", options: ["toujours supprimables", "essentiels au sens", "toujours déplaçables", "avant le verbe"], correct: "essentiels au sens" }
        ]
      },
      {
        name: "Production - GV",
        type: "text",
        questions: [
          { text: "Écris 3 phrases et souligne le GV complet dans chacune.", correct: "réponse libre" },
          { text: "Identifie le GV: 'Mon frère regarde un film avec ses amis.'", correct: "réponse libre" },
          { text: "Enrichis ce GV minimal: 'Il mange.'", correct: "réponse libre" },
          { text: "Dans 'Elle semble fatiguée', identifie le verbe et l'attribut du sujet.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Groupe du verbe",
        type: "multiple_choice",
        questions: [
          { text: "GV signifie...", options: ["Grand Verbe", "Groupe du Verbe", "Genre Verbal", "Grammaire Verbale"], correct: "Groupe du Verbe" },
          { text: "Le GV fait partie de...", options: ["seulement du CP", "la structure GS + GV", "seulement du GN", "l'expansion du nom"], correct: "la structure GS + GV" },
          { text: "Un complément du verbe est...", options: ["toujours déplaçable", "généralement essentiel au sens", "toujours un nom", "avant le sujet"], correct: "généralement essentiel au sens" },
          { text: "Dans 'Il devient médecin', 'médecin' est...", options: ["un CP", "un attribut du sujet (dans le GV)", "le GS", "un complément de phrase"], correct: "un attribut du sujet (dans le GV)" },
          { text: "Le noyau du GV est toujours...", options: ["un nom", "un adjectif", "un verbe", "un adverbe"], correct: "un verbe" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Le groupe du nom - GN (grammaire)
    const groupeNomExercises = [
      {
        name: "Identifier le GN",
        type: "multiple_choice",
        questions: [
          { text: "Le GN (groupe du nom) a pour noyau...", options: ["un verbe", "un nom", "un adverbe", "une préposition"], correct: "un nom" },
          { text: "Dans 'le petit chat', quel est le noyau du GN?", options: ["le", "petit", "chat", "le petit"], correct: "chat" },
          { text: "Dans 'une belle maison', le GN complet est...", options: ["une", "belle", "maison", "une belle maison"], correct: "une belle maison" },
          { text: "Le GN minimal contient...", options: ["déterminant + nom", "nom seulement ou déterminant + nom", "adjectif + nom", "verbe + nom"], correct: "nom seulement ou déterminant + nom" },
          { text: "Quel groupe est un GN?", options: ["mange rapidement", "les enfants joyeux", "très vite", "et puis"], correct: "les enfants joyeux" }
        ]
      },
      {
        name: "Composition du GN",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'mon grand frère', 'grand' est...", options: ["le noyau", "le déterminant", "une expansion (adjectif)", "un complément"], correct: "une expansion (adjectif)" },
          { text: "Dans 'le livre de Marie', 'de Marie' est...", options: ["le noyau", "une expansion (GP)", "le déterminant", "un adverbe"], correct: "une expansion (GP)" },
          { text: "Les expansions du GN peuvent être...", options: ["seulement des adjectifs", "adjectifs, GP, subordonnées relatives", "seulement des verbes", "seulement des noms"], correct: "adjectifs, GP, subordonnées relatives" },
          { text: "'Le chat qui dort' contient quelle expansion?", options: ["Un adjectif", "Un GP", "Une subordonnée relative", "Un adverbe"], correct: "Une subordonnée relative" },
          { text: "Dans 'la maison rouge de mon voisin', combien d'expansions?", options: ["Aucune", "Une", "Deux", "Trois"], correct: "Deux" }
        ]
      },
      {
        name: "Production - GN",
        type: "text",
        questions: [
          { text: "Écris 3 GN différents avec au moins une expansion chacun.", correct: "réponse libre" },
          { text: "Enrichis ce GN minimal: 'le livre'.", correct: "réponse libre" },
          { text: "Identifie le noyau et les expansions: 'la jolie maison bleue de mes parents'.", correct: "réponse libre" },
          { text: "Transforme ce GN avec adjectif en GN avec GP: 'un manteau hivernal'.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Groupe du nom",
        type: "multiple_choice",
        questions: [
          { text: "GN signifie...", options: ["Grand Nom", "Groupe du Nom", "Genre Nominatif", "Grammaire Nominale"], correct: "Groupe du Nom" },
          { text: "Le noyau du GN est toujours...", options: ["un verbe", "un nom", "un adjectif", "un déterminant"], correct: "un nom" },
          { text: "Une expansion du GN est...", options: ["obligatoire", "facultative", "toujours un adjectif", "avant le déterminant"], correct: "facultative" },
          { text: "Quel élément n'est PAS une expansion possible du GN?", options: ["Un adjectif", "Un GP", "Un adverbe seul", "Une relative"], correct: "Un adverbe seul" },
          { text: "'La petite fille aux yeux bleus' a combien d'expansions?", options: ["Une", "Deux", "Trois", "Aucune"], correct: "Deux" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Phrase complexe (grammaire)
    const phraseComplexeExercises = [
      {
        name: "Reconnaître une phrase complexe",
        type: "multiple_choice",
        questions: [
          { text: "Une phrase complexe contient...", options: ["un seul verbe conjugué", "plusieurs verbes conjugués", "aucun verbe", "un infinitif seulement"], correct: "plusieurs verbes conjugués" },
          { text: "Quelle phrase est complexe?", options: ["Le chat dort.", "Marie mange une pomme.", "Il pleut et je reste.", "L'oiseau chante."], correct: "Il pleut et je reste." },
          { text: "'Quand il fait beau, je sors.' est une phrase...", options: ["simple", "complexe", "sans verbe", "minimale"], correct: "complexe" },
          { text: "Une phrase complexe a plusieurs...", options: ["sujets seulement", "propositions", "adjectifs", "noms"], correct: "propositions" },
          { text: "Quelle phrase est complexe?", options: ["Les enfants jouent.", "Il mange rapidement.", "Je pense que tu as raison.", "Mon frère dort."], correct: "Je pense que tu as raison." }
        ]
      },
      {
        name: "Types de propositions",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Il mange et il dort.', les propositions sont reliées par...", options: ["subordination", "coordination", "juxtaposition", "rien"], correct: "coordination" },
          { text: "Dans 'Je sais que tu viendras.', 'que tu viendras' est une proposition...", options: ["principale", "subordonnée", "coordonnée", "juxtaposée"], correct: "subordonnée" },
          { text: "'Il pleut; je reste.' Les propositions sont...", options: ["coordonnées", "subordonnées", "juxtaposées", "principales"], correct: "juxtaposées" },
          { text: "La proposition principale est celle qui...", options: ["est subordonnée", "peut exister seule et dont dépend une autre", "commence par 'que'", "est toujours au début"], correct: "peut exister seule et dont dépend une autre" },
          { text: "'Quand' et 'parce que' introduisent des propositions...", options: ["principales", "coordonnées", "subordonnées", "juxtaposées"], correct: "subordonnées" }
        ]
      },
      {
        name: "Production - Phrase complexe",
        type: "text",
        questions: [
          { text: "Écris une phrase complexe avec deux propositions coordonnées (utilise 'et', 'mais', 'ou').", correct: "réponse libre" },
          { text: "Écris une phrase complexe avec une subordonnée (utilise 'quand', 'parce que', 'que').", correct: "réponse libre" },
          { text: "Transforme ces 2 phrases simples en 1 phrase complexe: 'Il pleut. Je reste à la maison.'", correct: "réponse libre" },
          { text: "Identifie la proposition principale et la subordonnée: 'Je sais que tu réussiras.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Phrase complexe",
        type: "multiple_choice",
        questions: [
          { text: "Phrase complexe = ...", options: ["phrase longue", "phrase avec plusieurs verbes conjugués", "phrase difficile", "phrase négative"], correct: "phrase avec plusieurs verbes conjugués" },
          { text: "Quelle phrase n'est PAS complexe?", options: ["Il mange et dort.", "Quand je suis fatigué, je dors.", "Les oiseaux chantent dans le jardin.", "Je pense que c'est vrai."], correct: "Les oiseaux chantent dans le jardin." },
          { text: "Les mots 'et', 'ou', 'mais' servent à...", options: ["subordonner", "coordonner", "juxtaposer", "rien"], correct: "coordonner" },
          { text: "Une phrase complexe a au moins...", options: ["un verbe", "deux propositions", "trois sujets", "quatre mots"], correct: "deux propositions" },
          { text: "'Parce que', 'quand', 'si' introduisent une proposition...", options: ["principale", "coordonnée", "subordonnée", "juxtaposée"], correct: "subordonnée" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Phrase simple (grammaire)
    const phraseSimpleExercises = [
      {
        name: "Reconnaître une phrase simple",
        type: "multiple_choice",
        questions: [
          { text: "Une phrase simple contient...", options: ["plusieurs verbes conjugués", "un seul verbe conjugué", "aucun verbe", "trois verbes"], correct: "un seul verbe conjugué" },
          { text: "Quelle phrase est simple?", options: ["Il mange et il dort.", "Le chat dort.", "Quand il pleut, je reste.", "Elle chante parce qu'elle est contente."], correct: "Le chat dort." },
          { text: "'Marie lit un livre.' est une phrase...", options: ["complexe", "simple", "sans verbe", "négative"], correct: "simple" },
          { text: "Combien de verbes conjugués dans une phrase simple?", options: ["Zéro", "Un seul", "Deux", "Trois ou plus"], correct: "Un seul" },
          { text: "Quelle phrase est simple?", options: ["Je pense que tu as raison.", "Les enfants jouent dans le parc.", "Si tu viens, appelle-moi.", "Il dit qu'il viendra."], correct: "Les enfants jouent dans le parc." }
        ]
      },
      {
        name: "Structure de la phrase simple",
        type: "multiple_choice",
        questions: [
          { text: "La structure minimale d'une phrase simple est...", options: ["GS + GV", "GS + GV + GV", "Deux propositions", "GS seulement"], correct: "GS + GV" },
          { text: "Dans 'Le chien aboie.', le GS est...", options: ["aboie", "Le chien", "Le", "chien"], correct: "Le chien" },
          { text: "Dans 'Le chien aboie.', le GV est...", options: ["Le chien", "aboie", "Le", "chien aboie"], correct: "aboie" },
          { text: "Une phrase simple peut-elle avoir un CP?", options: ["Non, jamais", "Oui, c'est facultatif", "Seulement si elle est longue", "Non, c'est interdit"], correct: "Oui, c'est facultatif" },
          { text: "'L'oiseau chante sur la branche.' a combien de propositions?", options: ["Zéro", "Une", "Deux", "Trois"], correct: "Une" }
        ]
      },
      {
        name: "Production - Phrase simple",
        type: "text",
        questions: [
          { text: "Écris 3 phrases simples différentes.", correct: "réponse libre" },
          { text: "Transforme cette phrase complexe en phrase simple: 'Quand il fait beau, je sors.'", correct: "réponse libre" },
          { text: "Écris une phrase simple avec un CP de lieu.", correct: "réponse libre" },
          { text: "Identifie le GS et le GV: 'Mon frère mange une pomme.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Phrase simple",
        type: "multiple_choice",
        questions: [
          { text: "Phrase simple = ...", options: ["phrase courte", "phrase avec un seul verbe conjugué", "phrase sans CP", "phrase affirmative"], correct: "phrase avec un seul verbe conjugué" },
          { text: "Quelle phrase n'est PAS simple?", options: ["Il pleut.", "Les oiseaux chantent.", "Je mange quand j'ai faim.", "Elle dort paisiblement."], correct: "Je mange quand j'ai faim." },
          { text: "Une phrase simple forme...", options: ["deux propositions", "une seule proposition", "trois propositions", "aucune proposition"], correct: "une seule proposition" },
          { text: "'Les élèves travaillent.' est une phrase...", options: ["complexe", "simple", "interrogative", "exclamative"], correct: "simple" },
          { text: "Une phrase simple peut être...", options: ["seulement affirmative", "seulement négative", "affirmative, négative, interrogative...", "seulement courte"], correct: "affirmative, négative, interrogative..." }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les séquences syntaxiques (grammaire)
    const sequencesSyntaxiquesExercises = [
      {
        name: "Structure GS + GV",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Le chat mange', quel est le GS (groupe sujet)?", options: ["mange", "Le chat", "chat", "Le"], correct: "Le chat" },
          { text: "Dans 'Le chat mange', quel est le GV (groupe verbal)?", options: ["Le chat", "mange", "Le", "chat"], correct: "mange" },
          { text: "La structure de base d'une phrase est...", options: ["GV + GS", "GS + GV", "CP + GS", "GV + CP"], correct: "GS + GV" },
          { text: "Dans 'Marie lit un livre', le GV complet est...", options: ["Marie", "lit", "lit un livre", "un livre"], correct: "lit un livre" },
          { text: "Le GS répond à la question...", options: ["Quoi?", "Comment?", "Qui est-ce qui? / Qu'est-ce qui?", "Où?"], correct: "Qui est-ce qui? / Qu'est-ce qui?" }
        ]
      },
      {
        name: "Structure avec CP",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Le chat dort sur le canapé', 'sur le canapé' est...", options: ["le GS", "le GV", "un CP (complément de phrase)", "un attribut"], correct: "un CP (complément de phrase)" },
          { text: "Le CP peut généralement être...", options: ["jamais supprimé", "supprimé ou déplacé", "remplacé par un pronom", "avant le verbe seulement"], correct: "supprimé ou déplacé" },
          { text: "Dans 'Hier, Marie a chanté', 'Hier' est...", options: ["le GS", "le GV", "un CP de temps", "un attribut"], correct: "un CP de temps" },
          { text: "Quel élément est un CP? 'Il mange une pomme à midi.'", options: ["Il", "mange", "une pomme", "à midi"], correct: "à midi" },
          { text: "La structure GS + GV + CP est...", options: ["obligatoire", "fréquente mais le CP est facultatif", "impossible", "rare"], correct: "fréquente mais le CP est facultatif" }
        ]
      },
      {
        name: "Production - Séquences",
        type: "text",
        questions: [
          { text: "Écris une phrase simple: GS + GV (ex: Le chien court.)", correct: "réponse libre" },
          { text: "Écris une phrase avec: GS + GV + CP de temps.", correct: "réponse libre" },
          { text: "Dans 'Mon ami joue au parc chaque jour', identifie le GS, le GV et le(s) CP.", correct: "réponse libre" },
          { text: "Ajoute un CP de lieu à cette phrase: 'L'oiseau chante.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Séquences syntaxiques",
        type: "multiple_choice",
        questions: [
          { text: "GS signifie...", options: ["Grand Sujet", "Groupe Sujet", "Genre Singulier", "Grammaire Simple"], correct: "Groupe Sujet" },
          { text: "GV signifie...", options: ["Grand Verbe", "Groupe Verbal", "Genre Variable", "Grammaire Verbale"], correct: "Groupe Verbal" },
          { text: "CP signifie...", options: ["Complément Principal", "Complément de Phrase", "Catégorie Principale", "Classe de Phrase"], correct: "Complément de Phrase" },
          { text: "Quelle phrase a la structure GS + GV + CP?", options: ["Il dort.", "Marie mange.", "Le chat dort sur le lit.", "Courir est bon."], correct: "Le chat dort sur le lit." },
          { text: "Le GV contient toujours...", options: ["un adjectif", "un verbe", "un CP", "un nom propre"], correct: "un verbe" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les adverbes (plus complet) (grammaire)
    const adverbesCompletExercises = [
      {
        name: "Catégories d'adverbes",
        type: "multiple_choice",
        questions: [
          { text: "'Rapidement', 'lentement', 'bien' sont des adverbes de...", options: ["temps", "lieu", "manière", "quantité"], correct: "manière" },
          { text: "'Hier', 'demain', 'maintenant' sont des adverbes de...", options: ["manière", "temps", "lieu", "opinion"], correct: "temps" },
          { text: "'Ici', 'là-bas', 'partout' sont des adverbes de...", options: ["temps", "lieu", "manière", "quantité"], correct: "lieu" },
          { text: "'Beaucoup', 'peu', 'très' sont des adverbes de...", options: ["manière", "temps", "quantité/intensité", "lieu"], correct: "quantité/intensité" },
          { text: "'Probablement', 'certainement', 'peut-être' sont des adverbes de...", options: ["manière", "opinion/modalité", "temps", "lieu"], correct: "opinion/modalité" }
        ]
      },
      {
        name: "Formation des adverbes",
        type: "multiple_choice",
        questions: [
          { text: "L'adverbe de 'lent' (adjectif) est...", options: ["lentment", "lentement", "lentamment", "lente"], correct: "lentement" },
          { text: "L'adverbe de 'vrai' (adjectif) est...", options: ["vraiment", "vraiement", "vrai", "vraie"], correct: "vraiment" },
          { text: "L'adverbe de 'gentil' (adjectif) est...", options: ["gentilment", "gentilement", "gentiment", "gentille"], correct: "gentiment" },
          { text: "Pour former un adverbe en -ment, on part généralement de...", options: ["l'adjectif masculin", "l'adjectif féminin", "le nom", "le verbe"], correct: "l'adjectif féminin" },
          { text: "L'adverbe de 'récent' est...", options: ["récentment", "récemment", "récentement", "récent"], correct: "récemment" }
        ]
      },
      {
        name: "Production - Adverbes complet",
        type: "text",
        questions: [
          { text: "Donne un adverbe pour chaque catégorie: manière, temps, lieu, quantité.", correct: "réponse libre" },
          { text: "Transforme ces adjectifs en adverbes: rapide, doux, prudent.", correct: "réponse libre" },
          { text: "Écris 3 phrases avec des adverbes d'opinion (probablement, certainement...).", correct: "réponse libre" },
          { text: "Place l'adverbe correctement: 'Elle a (beaucoup) mangé.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Adverbes complet",
        type: "multiple_choice",
        questions: [
          { text: "L'adverbe est un mot...", options: ["variable", "invariable", "qui s'accorde", "qui se conjugue"], correct: "invariable" },
          { text: "L'adverbe peut modifier...", options: ["un nom", "un verbe, adjectif ou autre adverbe", "un article", "un pronom seulement"], correct: "un verbe, adjectif ou autre adverbe" },
          { text: "Dans 'très gentil', 'très' modifie...", options: ["un nom", "un verbe", "un adjectif", "rien"], correct: "un adjectif" },
          { text: "Où se place généralement l'adverbe avec un temps composé?", options: ["Avant l'auxiliaire", "Entre auxiliaire et participe", "Après le participe", "Au début de phrase"], correct: "Entre auxiliaire et participe" },
          { text: "Quel adverbe n'existe PAS?", options: ["vraiment", "joliment", "bonnement", "rapidement"], correct: "bonnement" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: La cohésion et cohérence textuelle (grammaire)
    const cohesionCoherenceExercises = [
      {
        name: "Comprendre la cohérence",
        type: "multiple_choice",
        questions: [
          { text: "Un texte cohérent est un texte...", options: ["long", "qui a du sens et une logique", "avec beaucoup de mots", "sans ponctuation"], correct: "qui a du sens et une logique" },
          { text: "Quel élément assure la cohérence d'un texte?", options: ["Les fautes d'orthographe", "L'ordre logique des idées", "Les répétitions", "Les phrases longues"], correct: "L'ordre logique des idées" },
          { text: "Un texte incohérent est difficile à...", options: ["lire rapidement", "comprendre", "écrire", "imprimer"], correct: "comprendre" },
          { text: "Pour qu'un texte soit cohérent, les phrases doivent...", options: ["être très longues", "être reliées entre elles", "commencer par une majuscule", "avoir le même sujet"], correct: "être reliées entre elles" },
          { text: "La cohérence textuelle concerne...", options: ["l'orthographe", "le sens global du texte", "la ponctuation", "la mise en page"], correct: "le sens global du texte" }
        ]
      },
      {
        name: "Comprendre la cohésion",
        type: "multiple_choice",
        questions: [
          { text: "La cohésion textuelle utilise...", options: ["des fautes", "des marqueurs et substituts", "des dessins", "des nombres"], correct: "des marqueurs et substituts" },
          { text: "Quel outil assure la cohésion? 'Marie arrive. Elle est contente.'", options: ["Marie", "arrive", "Elle (substitut)", "contente"], correct: "Elle (substitut)" },
          { text: "'D'abord... ensuite... enfin' assurent la cohésion par...", options: ["les substituts", "les marqueurs de relation", "la ponctuation", "les adjectifs"], correct: "les marqueurs de relation" },
          { text: "Répéter le même mot trop souvent nuit à...", options: ["la cohérence", "la cohésion", "rien du tout", "la longueur"], correct: "la cohésion" },
          { text: "Les pronoms (il, elle, ils) améliorent la cohésion car ils...", options: ["sont courts", "évitent les répétitions", "sont faciles", "sont beaux"], correct: "évitent les répétitions" }
        ]
      },
      {
        name: "Production - Cohésion/Cohérence",
        type: "text",
        questions: [
          { text: "Remets ces phrases dans l'ordre logique: 'Ensuite je mange. Je me réveille. Enfin je pars. D'abord je me lave.'", correct: "réponse libre" },
          { text: "Améliore ce texte en utilisant des substituts: 'Le chat dort. Le chat ronronne. Le chat est content.'", correct: "réponse libre" },
          { text: "Ajoute des marqueurs pour relier ces phrases: 'Je suis fatigué. Je continue à travailler.'", correct: "réponse libre" },
          { text: "Écris 3 phrases cohérentes sur le thème de l'école.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Cohésion et cohérence",
        type: "multiple_choice",
        questions: [
          { text: "Quelle est la différence entre cohésion et cohérence?", options: ["Aucune", "Cohésion = liens entre phrases, Cohérence = sens global", "Cohésion = sens, Cohérence = liens", "Les deux sont identiques"], correct: "Cohésion = liens entre phrases, Cohérence = sens global" },
          { text: "Un texte peut-il être cohésif mais pas cohérent?", options: ["Non, jamais", "Oui, s'il a des liens mais pas de sens global", "Oui, s'il est court", "Non, impossible"], correct: "Oui, s'il a des liens mais pas de sens global" },
          { text: "Quel texte est le plus cohérent?", options: ["Chat. Arbre. Lune. Vert.", "Le chat dort. Il rêve. Puis il se réveille.", "Bleu rouge jaune.", "Manger dormir courir."], correct: "Le chat dort. Il rêve. Puis il se réveille." },
          { text: "Pour améliorer la cohésion, on peut...", options: ["ajouter des fautes", "utiliser des substituts et marqueurs", "enlever la ponctuation", "écrire plus vite"], correct: "utiliser des substituts et marqueurs" },
          { text: "Un paragraphe doit généralement développer...", options: ["plusieurs idées mélangées", "une idée principale", "aucune idée", "des idées contradictoires"], correct: "une idée principale" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les marqueurs de relation (grammaire)
    const marqueursRelationExercises = [
      {
        name: "Identifier les marqueurs",
        type: "multiple_choice",
        questions: [
          { text: "'D'abord', 'ensuite', 'enfin' sont des marqueurs de...", options: ["cause", "conséquence", "temps/ordre", "opposition"], correct: "temps/ordre" },
          { text: "'Parce que', 'car', 'puisque' sont des marqueurs de...", options: ["temps", "cause", "conséquence", "but"], correct: "cause" },
          { text: "'Donc', 'ainsi', 'par conséquent' sont des marqueurs de...", options: ["cause", "conséquence", "temps", "opposition"], correct: "conséquence" },
          { text: "'Cependant', 'mais', 'toutefois' sont des marqueurs de...", options: ["addition", "opposition", "cause", "temps"], correct: "opposition" },
          { text: "'De plus', 'également', 'aussi' sont des marqueurs de...", options: ["opposition", "cause", "addition", "conclusion"], correct: "addition" }
        ]
      },
      {
        name: "Utilisation des marqueurs",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Il pleut, _____ je prends mon parapluie.' (conséquence)", options: ["parce que", "donc", "mais", "d'abord"], correct: "donc" },
          { text: "Complète: 'J'aime le sport _____ je préfère le basketball.' (précision)", options: ["donc", "car", "en particulier", "ensuite"], correct: "en particulier" },
          { text: "Complète: '_____, je me lève. _____, je déjeune.' (ordre)", options: ["D'abord...Ensuite", "Car...Donc", "Mais...Cependant", "Parce que...Ainsi"], correct: "D'abord...Ensuite" },
          { text: "Complète: 'Elle est fatiguée _____ elle continue.' (opposition)", options: ["donc", "car", "mais", "ensuite"], correct: "mais" },
          { text: "Complète: '_____, je conclus que...' (conclusion)", options: ["D'abord", "Ensuite", "En somme", "Parce que"], correct: "En somme" }
        ]
      },
      {
        name: "Production - Marqueurs",
        type: "text",
        questions: [
          { text: "Écris 2 phrases reliées par un marqueur de temps (d'abord, ensuite, enfin...).", correct: "réponse libre" },
          { text: "Écris 2 phrases reliées par un marqueur de cause (car, parce que...).", correct: "réponse libre" },
          { text: "Écris 2 phrases reliées par un marqueur d'opposition (mais, cependant...).", correct: "réponse libre" },
          { text: "Écris une courte conclusion en utilisant 'en conclusion' ou 'en somme'.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Marqueurs de relation",
        type: "multiple_choice",
        questions: [
          { text: "Les marqueurs de relation servent à...", options: ["décrire", "relier les idées et organiser le texte", "conjuguer", "remplacer des mots"], correct: "relier les idées et organiser le texte" },
          { text: "'Premièrement, deuxièmement, troisièmement' marquent...", options: ["la cause", "l'ordre/énumération", "l'opposition", "la conséquence"], correct: "l'ordre/énumération" },
          { text: "Quel marqueur n'exprime PAS l'opposition?", options: ["mais", "cependant", "toutefois", "ensuite"], correct: "ensuite" },
          { text: "'Pour conclure' est un marqueur de...", options: ["introduction", "développement", "conclusion", "opposition"], correct: "conclusion" },
          { text: "Dans un texte argumentatif, on utilise souvent...", options: ["des marqueurs de temps seulement", "des marqueurs variés (cause, conséquence, opposition)", "aucun marqueur", "des marqueurs de lieu"], correct: "des marqueurs variés (cause, conséquence, opposition)" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les substituts (grammaire)
    const substitutsExercises = [
      {
        name: "Identifier les substituts",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Marie est arrivée. Elle est fatiguée.', 'Elle' remplace...", options: ["fatiguée", "arrivée", "Marie", "rien"], correct: "Marie" },
          { text: "Un substitut sert à...", options: ["décrire", "éviter la répétition", "conjuguer", "questionner"], correct: "éviter la répétition" },
          { text: "'Le chien aboie. L'animal a faim.' - 'L'animal' est un substitut...", options: ["pronominal", "nominal", "verbal", "adverbial"], correct: "nominal" },
          { text: "Dans 'Paul aime lire. Celui-ci lit chaque jour.', 'Celui-ci' remplace...", options: ["lire", "jour", "Paul", "chaque"], correct: "Paul" },
          { text: "Les pronoms personnels sont des substituts...", options: ["nominaux", "pronominaux", "lexicaux", "textuels"], correct: "pronominaux" }
        ]
      },
      {
        name: "Types de substituts",
        type: "multiple_choice",
        questions: [
          { text: "'Il, elle, ils, elles' sont des substituts...", options: ["nominaux", "pronominaux", "lexicaux", "aucun"], correct: "pronominaux" },
          { text: "Remplacer 'le docteur' par 'le médecin' est un substitut...", options: ["pronominal", "nominal synonymique", "verbal", "adverbial"], correct: "nominal synonymique" },
          { text: "'Cette idée' qui reprend une phrase entière est un substitut...", options: ["pronominal", "nominal", "textuel", "verbal"], correct: "textuel" },
          { text: "Dans 'Les élèves travaillent. Ils sont concentrés.', le substitut est...", options: ["Les élèves", "travaillent", "Ils", "concentrés"], correct: "Ils" },
          { text: "'Le premier' dans 'J'ai deux chiens. Le premier est noir.' est un substitut...", options: ["pronominal", "nominal", "numéral/ordinal", "adjectival"], correct: "numéral/ordinal" }
        ]
      },
      {
        name: "Production - Substituts",
        type: "text",
        questions: [
          { text: "Réécris en utilisant un pronom: 'Marie mange. Marie est contente.'", correct: "réponse libre" },
          { text: "Réécris en utilisant un substitut nominal: 'Le lion chasse. Le lion est fort.' (Ex: L'animal, Le félin...)", correct: "réponse libre" },
          { text: "Trouve le substitut: 'Pierre et Jean jouent. Les deux amis s'amusent.'", correct: "réponse libre" },
          { text: "Écris 2 phrases en utilisant 'celui-ci' ou 'celle-là' comme substitut.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Les substituts",
        type: "multiple_choice",
        questions: [
          { text: "Pourquoi utilise-t-on des substituts?", options: ["Pour allonger le texte", "Pour éviter les répétitions", "Pour compliquer", "Pour rien"], correct: "Pour éviter les répétitions" },
          { text: "Un substitut doit être...", options: ["plus long que le mot remplacé", "clairement lié au mot qu'il remplace", "toujours un pronom", "toujours au pluriel"], correct: "clairement lié au mot qu'il remplace" },
          { text: "'Cela' peut remplacer...", options: ["un nom", "une idée ou phrase entière", "un verbe", "un adjectif"], correct: "une idée ou phrase entière" },
          { text: "Dans 'Le chat dort. Il ronronne.', que remplace 'Il'?", options: ["dort", "ronronne", "Le chat", "Rien"], correct: "Le chat" },
          { text: "Quel substitut est incorrect? 'Marie et Paul arrivent. Elle est contente.'", options: ["C'est correct", "'Elle' devrait être 'Ils'", "'Elle' devrait être 'Marie'", "On ne sait pas"], correct: "'Elle' devrait être 'Ils'" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Sujet et Compléments du verbe (grammaire)
    const sujetComplementsExercises = [
      {
        name: "Identifier le sujet (GS)",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Le chat mange une souris', quel est le GS (groupe sujet)?", options: ["mange", "une souris", "Le chat", "souris"], correct: "Le chat" },
          { text: "Le sujet répond à quelle question?", options: ["Quoi?", "Qui est-ce qui? / Qu'est-ce qui?", "Comment?", "Où?"], correct: "Qui est-ce qui? / Qu'est-ce qui?" },
          { text: "Dans 'Courir est bon pour la santé', le sujet est...", options: ["Courir", "est", "bon", "la santé"], correct: "Courir" },
          { text: "Dans 'Les enfants de Marie jouent', le GS complet est...", options: ["Les enfants", "Les enfants de Marie", "Marie", "jouent"], correct: "Les enfants de Marie" },
          { text: "Le sujet se place généralement...", options: ["après le verbe", "avant le verbe", "à la fin", "n'importe où"], correct: "avant le verbe" }
        ]
      },
      {
        name: "Identifier les compléments du verbe",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Elle lit un livre', 'un livre' est...", options: ["le sujet", "un complément du verbe", "un attribut", "un adverbe"], correct: "un complément du verbe" },
          { text: "Le complément du verbe répond à...", options: ["Qui? Quoi? (après le verbe)", "Où? Quand?", "Comment?", "Pourquoi?"], correct: "Qui? Quoi? (après le verbe)" },
          { text: "Dans 'Il donne un cadeau à son ami', combien de compléments du verbe?", options: ["0", "1", "2", "3"], correct: "2" },
          { text: "Le complément du verbe fait partie du...", options: ["GS (groupe sujet)", "GV (groupe verbal)", "CP (complément de phrase)", "GN (groupe nominal)"], correct: "GV (groupe verbal)" },
          { text: "Dans 'Marie est contente', 'contente' est...", options: ["un complément du verbe", "un attribut du sujet", "un adverbe", "un complément de phrase"], correct: "un attribut du sujet" }
        ]
      },
      {
        name: "Production - Sujet et compléments",
        type: "text",
        questions: [
          { text: "Écris une phrase et souligne le GS (groupe sujet).", correct: "réponse libre" },
          { text: "Écris une phrase avec un complément du verbe (qui répond à 'quoi?').", correct: "réponse libre" },
          { text: "Dans 'Mon frère joue au soccer', identifie le GS et le complément du verbe.", correct: "réponse libre" },
          { text: "Transforme la phrase pour changer le sujet: 'Le chien court.' → '_____ court.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Sujet et compléments",
        type: "multiple_choice",
        questions: [
          { text: "Le GS (groupe sujet) peut être...", options: ["un nom seul", "un pronom", "un groupe nominal", "toutes ces réponses"], correct: "toutes ces réponses" },
          { text: "Un verbe peut avoir combien de compléments?", options: ["0", "1", "2", "0, 1 ou 2"], correct: "0, 1 ou 2" },
          { text: "Dans 'Ils nous parlent', 'nous' est...", options: ["le sujet", "un complément du verbe", "un adverbe", "un adjectif"], correct: "un complément du verbe" },
          { text: "Le complément du verbe peut-il être supprimé?", options: ["Toujours", "Jamais", "Parfois, selon le verbe", "Seulement au passé"], correct: "Parfois, selon le verbe" },
          { text: "'Il pleut.' - Y a-t-il un sujet?", options: ["Non", "Oui, 'Il' (sujet apparent)", "Oui, 'pleut'", "On ne sait pas"], correct: "Oui, 'Il' (sujet apparent)" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les Interjections (grammaire)
    const interjectionsExercises = [
      {
        name: "Identifier les interjections",
        type: "multiple_choice",
        questions: [
          { text: "Quelle est l'interjection dans: 'Hélas! Il est parti.'?", options: ["Il", "est", "parti", "Hélas"], correct: "Hélas" },
          { text: "Une interjection exprime...", options: ["une action", "une émotion ou un sentiment", "une description", "un temps"], correct: "une émotion ou un sentiment" },
          { text: "Quel mot est une interjection?", options: ["courir", "beau", "Ouf!", "table"], correct: "Ouf!" },
          { text: "L'interjection est généralement suivie de...", options: ["un point", "une virgule", "un point d'exclamation", "deux points"], correct: "un point d'exclamation" },
          { text: "'Aïe!' exprime...", options: ["la joie", "la douleur", "la surprise", "le dégoût"], correct: "la douleur" }
        ]
      },
      {
        name: "Types d'interjections",
        type: "multiple_choice",
        questions: [
          { text: "'Bravo!' exprime...", options: ["la tristesse", "l'admiration/félicitation", "la peur", "l'hésitation"], correct: "l'admiration/félicitation" },
          { text: "'Bof!' exprime...", options: ["l'enthousiasme", "l'indifférence", "la joie", "la colère"], correct: "l'indifférence" },
          { text: "'Chut!' sert à...", options: ["féliciter", "demander le silence", "exprimer la surprise", "dire au revoir"], correct: "demander le silence" },
          { text: "'Oh là là!' exprime souvent...", options: ["la joie", "la surprise ou l'inquiétude", "le silence", "l'accord"], correct: "la surprise ou l'inquiétude" },
          { text: "'Hourra!' exprime...", options: ["la tristesse", "l'enthousiasme/la victoire", "le doute", "la peur"], correct: "l'enthousiasme/la victoire" }
        ]
      },
      {
        name: "Production - Interjections",
        type: "text",
        questions: [
          { text: "Écris une phrase avec une interjection de joie.", correct: "réponse libre" },
          { text: "Écris une phrase avec une interjection de douleur.", correct: "réponse libre" },
          { text: "Écris une phrase avec une interjection de surprise.", correct: "réponse libre" },
          { text: "Donne 5 interjections différentes.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Interjections",
        type: "multiple_choice",
        questions: [
          { text: "L'interjection est une classe de mots...", options: ["variable", "invariable", "qui s'accorde", "qui se conjugue"], correct: "invariable" },
          { text: "Où se place généralement l'interjection?", options: ["À la fin de la phrase", "Au début de la phrase, isolée", "Après le verbe", "Avant le sujet"], correct: "Au début de la phrase, isolée" },
          { text: "'Hein?' est une interjection qui sert à...", options: ["exprimer la joie", "demander confirmation", "exprimer la douleur", "saluer"], correct: "demander confirmation" },
          { text: "Quel groupe ne contient QUE des interjections?", options: ["Aïe, table, Ouf", "Hélas, Bravo, Zut", "Courir, Ah, Oh", "Beau, Chut, Hourra"], correct: "Hélas, Bravo, Zut" },
          { text: "Les onomatopées (Boum!, Splash!) sont...", options: ["des verbes", "des interjections", "des adjectifs", "des noms"], correct: "des interjections" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les Conjonctions de coordination (grammaire)
    const conjonctionsExercises = [
      {
        name: "Identifier les conjonctions",
        type: "multiple_choice",
        questions: [
          { text: "Quelle est la conjonction dans: 'Je mange et je bois.'?", options: ["Je", "mange", "et", "bois"], correct: "et" },
          { text: "Combien y a-t-il de conjonctions de coordination en français?", options: ["5", "6", "7", "8"], correct: "7" },
          { text: "Quel mot n'est PAS une conjonction de coordination?", options: ["mais", "donc", "parce que", "or"], correct: "parce que" },
          { text: "Le moyen mnémotechnique 'Mais où est donc Ornicar?' aide à retenir...", options: ["les pronoms", "les conjonctions de coordination", "les prépositions", "les adverbes"], correct: "les conjonctions de coordination" },
          { text: "'Ni' est une conjonction qui exprime...", options: ["l'addition", "l'opposition", "la négation double", "la conséquence"], correct: "la négation double" }
        ]
      },
      {
        name: "Sens des conjonctions",
        type: "multiple_choice",
        questions: [
          { text: "'Mais' exprime...", options: ["l'addition", "l'opposition", "la cause", "le choix"], correct: "l'opposition" },
          { text: "'Ou' exprime...", options: ["l'addition", "l'opposition", "le choix", "la conséquence"], correct: "le choix" },
          { text: "'Donc' exprime...", options: ["la cause", "la conséquence", "l'opposition", "l'addition"], correct: "la conséquence" },
          { text: "'Car' exprime...", options: ["la cause", "la conséquence", "l'opposition", "le choix"], correct: "la cause" },
          { text: "'Or' introduit souvent...", options: ["une conclusion", "un argument nouveau/une transition", "une addition", "une négation"], correct: "un argument nouveau/une transition" }
        ]
      },
      {
        name: "Production - Conjonctions",
        type: "text",
        questions: [
          { text: "Écris une phrase avec 'et' (addition).", correct: "réponse libre" },
          { text: "Écris une phrase avec 'mais' (opposition).", correct: "réponse libre" },
          { text: "Écris une phrase avec 'car' (cause).", correct: "réponse libre" },
          { text: "Cite les 7 conjonctions de coordination.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Conjonctions de coordination",
        type: "multiple_choice",
        questions: [
          { text: "Les conjonctions de coordination relient...", options: ["des mots ou groupes de même fonction", "un verbe à son sujet", "un nom à son adjectif", "rien de particulier"], correct: "des mots ou groupes de même fonction" },
          { text: "Dans 'ni chaud ni froid', combien de conjonctions?", options: ["0", "1", "2", "3"], correct: "2" },
          { text: "Complète: 'Il est malade _____ il va à l'école.' (opposition)", options: ["et", "mais", "donc", "car"], correct: "mais" },
          { text: "Complète: 'Elle étudie _____ elle veut réussir.' (cause)", options: ["mais", "ou", "car", "ni"], correct: "car" },
          { text: "Une conjonction de coordination est toujours...", options: ["placée entre les éléments qu'elle relie", "au début de la phrase", "à la fin de la phrase", "avant le verbe"], correct: "placée entre les éléments qu'elle relie" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les Déterminants (grammaire)
    const determinantsExercises = [
      {
        name: "Identifier les déterminants",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Le chat dort', quel est le déterminant?", options: ["chat", "dort", "Le", "Aucun"], correct: "Le" },
          { text: "Dans 'Ma sœur joue', 'ma' est un déterminant...", options: ["défini", "indéfini", "possessif", "démonstratif"], correct: "possessif" },
          { text: "Dans 'Cette maison est grande', 'cette' est un déterminant...", options: ["défini", "possessif", "démonstratif", "indéfini"], correct: "démonstratif" },
          { text: "Quel est le déterminant indéfini?", options: ["le", "mon", "un", "ce"], correct: "un" },
          { text: "Dans 'Trois pommes', 'trois' est un déterminant...", options: ["possessif", "numéral", "défini", "indéfini"], correct: "numéral" }
        ]
      },
      {
        name: "Types de déterminants",
        type: "multiple_choice",
        questions: [
          { text: "Les déterminants définis sont...", options: ["un, une, des", "le, la, les, l'", "mon, ton, son", "ce, cette, ces"], correct: "le, la, les, l'" },
          { text: "Les déterminants possessifs indiquent...", options: ["une quantité", "l'appartenance", "une démonstration", "une question"], correct: "l'appartenance" },
          { text: "'Quel livre?' - 'Quel' est un déterminant...", options: ["possessif", "démonstratif", "interrogatif", "défini"], correct: "interrogatif" },
          { text: "'Chaque élève' - 'chaque' est un déterminant...", options: ["défini", "indéfini", "numéral", "indéfini (distributif)"], correct: "indéfini (distributif)" },
          { text: "Quel déterminant utilise-t-on devant une voyelle?", options: ["le", "la", "l'", "les"], correct: "l'" }
        ]
      },
      {
        name: "Production - Déterminants",
        type: "text",
        questions: [
          { text: "Écris une phrase avec un déterminant défini (le, la, les).", correct: "réponse libre" },
          { text: "Écris une phrase avec un déterminant possessif (mon, ton, son...).", correct: "réponse libre" },
          { text: "Écris une phrase avec un déterminant démonstratif (ce, cette, ces).", correct: "réponse libre" },
          { text: "Complète avec les bons déterminants: '___ chat de ___ voisin mange ___ souris.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Déterminants",
        type: "multiple_choice",
        questions: [
          { text: "Le déterminant se place toujours...", options: ["après le nom", "avant le nom", "après le verbe", "à la fin de la phrase"], correct: "avant le nom" },
          { text: "Le déterminant s'accorde en...", options: ["temps", "genre et nombre avec le nom", "personne", "mode"], correct: "genre et nombre avec le nom" },
          { text: "'Des' est le pluriel de...", options: ["le", "la", "un/une", "ce"], correct: "un/une" },
          { text: "Dans 'Leur maison', 'leur' est...", options: ["un pronom", "un déterminant possessif", "un adverbe", "un adjectif"], correct: "un déterminant possessif" },
          { text: "Quel groupe ne contient QUE des déterminants?", options: ["le, beau, mon", "un, cette, mes", "ce, grand, les", "ma, joli, une"], correct: "un, cette, mes" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Négation et double négation (grammaire)
    const negationExercises = [
      {
        name: "Identifier la négation",
        type: "multiple_choice",
        questions: [
          { text: "Quelle phrase est à la forme négative?", options: ["Il mange.", "Il ne mange pas.", "Mange-t-il?", "Qu'il mange!"], correct: "Il ne mange pas." },
          { text: "Quels mots encadrent le verbe dans une négation?", options: ["ne...pas", "pas...ne", "non...oui", "ni...ou"], correct: "ne...pas" },
          { text: "Dans 'Je ne vois rien', quel est le mot de négation?", options: ["Je", "ne...rien", "vois", "Aucun"], correct: "ne...rien" },
          { text: "'Personne n'est venu.' - Le mot de négation est...", options: ["Personne", "n'...venu", "est", "ne...personne"], correct: "ne...personne" },
          { text: "Quelle négation exprime 'zéro fois'?", options: ["ne...pas", "ne...plus", "ne...jamais", "ne...rien"], correct: "ne...jamais" }
        ]
      },
      {
        name: "Types de négation",
        type: "multiple_choice",
        questions: [
          { text: "'Je ne mange plus.' signifie...", options: ["Je n'ai jamais mangé", "J'ai arrêté de manger", "Je ne mange rien", "Je mange beaucoup"], correct: "J'ai arrêté de manger" },
          { text: "'Je ne vois personne.' - 'personne' est...", options: ["un sujet", "un mot de négation", "un nom", "un adjectif"], correct: "un mot de négation" },
          { text: "Quelle phrase utilise 'ne...que' (restriction)?", options: ["Je ne mange pas.", "Je ne mange que des fruits.", "Je ne mange jamais.", "Je ne mange plus."], correct: "Je ne mange que des fruits." },
          { text: "'Ne...guère' signifie...", options: ["beaucoup", "pas du tout", "à peine, peu", "toujours"], correct: "à peine, peu" },
          { text: "Dans 'Rien ne bouge', où est le sujet?", options: ["ne", "bouge", "Rien", "Il n'y a pas de sujet"], correct: "Rien" }
        ]
      },
      {
        name: "Production - Négation",
        type: "text",
        questions: [
          { text: "Mets cette phrase à la forme négative: 'Il mange une pomme.'", correct: "réponse libre" },
          { text: "Écris une phrase avec 'ne...jamais'.", correct: "réponse libre" },
          { text: "Écris une phrase avec 'ne...plus'.", correct: "réponse libre" },
          { text: "Transforme en restriction avec 'ne...que': 'Je mange des fruits.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Négation",
        type: "multiple_choice",
        questions: [
          { text: "Une double négation en français standard donne...", options: ["une négation plus forte", "une affirmation", "une question", "une exclamation"], correct: "une affirmation" },
          { text: "'Je n'ai aucun ami.' - Combien de mots de négation?", options: ["0", "1", "2", "3"], correct: "2" },
          { text: "À l'oral, on omet souvent...", options: ["pas", "ne", "jamais", "rien"], correct: "ne" },
          { text: "'Ni...ni' s'utilise pour...", options: ["ajouter", "nier deux choses", "questionner", "affirmer"], correct: "nier deux choses" },
          { text: "Quelle phrase est correcte?", options: ["Je ne veux pas rien.", "Je ne veux rien.", "Je veux pas rien.", "Rien je ne veux."], correct: "Je ne veux rien." }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Adjectif vs Adverbe (grammaire)
    const adjectifAdverbeExercises = [
      {
        name: "Identifier l'adjectif",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'une belle maison', 'belle' est...", options: ["un adverbe", "un adjectif", "un nom", "un verbe"], correct: "un adjectif" },
          { text: "L'adjectif qualifie toujours...", options: ["un verbe", "un nom", "un autre adjectif", "une phrase"], correct: "un nom" },
          { text: "Dans 'Le chat est noir', 'noir' est...", options: ["un adverbe", "un adjectif attribut", "un nom", "un verbe"], correct: "un adjectif attribut" },
          { text: "L'adjectif s'accorde en...", options: ["temps", "genre et nombre", "personne", "rien"], correct: "genre et nombre" },
          { text: "Quel mot est un adjectif?", options: ["rapidement", "rapide", "courir", "vitesse"], correct: "rapide" }
        ]
      },
      {
        name: "Identifier l'adverbe",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Elle parle doucement', 'doucement' est...", options: ["un adjectif", "un adverbe", "un nom", "un verbe"], correct: "un adverbe" },
          { text: "L'adverbe modifie généralement...", options: ["un nom", "un verbe, adjectif ou adverbe", "un article", "un pronom"], correct: "un verbe, adjectif ou adverbe" },
          { text: "L'adverbe est...", options: ["variable", "invariable", "parfois variable", "toujours au pluriel"], correct: "invariable" },
          { text: "Quel mot est un adverbe?", options: ["lent", "lente", "lentement", "lenteur"], correct: "lentement" },
          { text: "Dans 'très grand', 'très' modifie...", options: ["un nom", "un verbe", "un adjectif", "rien"], correct: "un adjectif" }
        ]
      },
      {
        name: "Production - Adjectif vs Adverbe",
        type: "text",
        questions: [
          { text: "Transforme 'rapide' (adjectif) en adverbe et utilise-le dans une phrase.", correct: "réponse libre" },
          { text: "Écris une phrase où 'fort' est un adjectif, puis une où 'fort' est un adverbe.", correct: "réponse libre" },
          { text: "Complète: 'La fille _____ chante _____.' (adjectif + adverbe)", correct: "réponse libre" },
          { text: "Donne 3 adjectifs et leurs adverbes correspondants.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Différencier adjectif et adverbe",
        type: "multiple_choice",
        questions: [
          { text: "La différence principale entre adjectif et adverbe est...", options: ["L'adjectif qualifie un nom, l'adverbe modifie un verbe/adjectif", "Ils sont identiques", "L'adverbe est plus long", "L'adjectif est invariable"], correct: "L'adjectif qualifie un nom, l'adverbe modifie un verbe/adjectif" },
          { text: "Dans 'Il court vite', 'vite' est...", options: ["un adjectif", "un adverbe", "un nom", "un verbe"], correct: "un adverbe" },
          { text: "'Bon' vs 'Bien': quelle est la bonne association?", options: ["Bon=adverbe, Bien=adjectif", "Bon=adjectif, Bien=adverbe", "Les deux sont adjectifs", "Les deux sont adverbes"], correct: "Bon=adjectif, Bien=adverbe" },
          { text: "Dans 'Elle chante faux', 'faux' est utilisé comme...", options: ["adjectif", "adverbe", "nom", "verbe"], correct: "adverbe" },
          { text: "Comment reconnaître un adverbe de manière?", options: ["Il finit par -ment", "Il finit par -tion", "Il est court", "Il s'accorde"], correct: "Il finit par -ment" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Complément du nom vs Complément du verbe (grammaire)
    const complementNomVerbeExercises = [
      {
        name: "Identification - Complément du nom",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'un livre de français', 'de français' est...", options: ["complément du verbe", "complément du nom", "sujet", "attribut"], correct: "complément du nom" },
          { text: "Dans 'la maison en briques', 'en briques' complète...", options: ["le verbe", "le nom 'maison'", "le sujet", "l'adjectif"], correct: "le nom 'maison'" },
          { text: "Le complément du nom est souvent introduit par...", options: ["un adverbe", "une préposition (de, en, à)", "un verbe", "un pronom"], correct: "une préposition (de, en, à)" },
          { text: "Dans 'une tasse à café', 'à café' indique...", options: ["l'action du verbe", "la fonction de la tasse", "le temps", "le lieu"], correct: "la fonction de la tasse" },
          { text: "Quel groupe est un complément du nom?", options: ["mange rapidement", "de mon ami", "est grand", "court vite"], correct: "de mon ami" }
        ]
      },
      {
        name: "Identification - Complément du verbe",
        type: "multiple_choice",
        questions: [
          { text: "Dans 'Je mange une pomme', 'une pomme' est...", options: ["complément du nom", "complément du verbe", "sujet", "attribut"], correct: "complément du verbe" },
          { text: "Le complément du verbe répond à quelle question?", options: ["De quoi?", "Quoi? Qui? (après le verbe)", "Où est?", "Comment est?"], correct: "Quoi? Qui? (après le verbe)" },
          { text: "Dans 'Elle parle à son frère', 'à son frère' est...", options: ["complément du nom", "complément du verbe", "sujet", "attribut"], correct: "complément du verbe" },
          { text: "Dans 'Il donne un cadeau à Marie', combien y a-t-il de compléments du verbe?", options: ["0", "1", "2", "3"], correct: "2" },
          { text: "Le complément du verbe peut-il être supprimé?", options: ["Toujours", "Jamais", "Parfois, selon le verbe", "Seulement au pluriel"], correct: "Parfois, selon le verbe" }
        ]
      },
      {
        name: "Production - Compléments",
        type: "text",
        questions: [
          { text: "Écris une phrase avec un complément du nom (ex: de, en, à + nom).", correct: "réponse libre" },
          { text: "Écris une phrase avec un complément du verbe (qui répond à 'quoi?').", correct: "réponse libre" },
          { text: "Dans 'Le livre de Pierre est sur la table', identifie le complément du nom.", correct: "réponse libre" },
          { text: "Ajoute un complément du nom à: 'J'ai vu une maison _____.'", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Différencier les compléments",
        type: "multiple_choice",
        questions: [
          { text: "La différence principale entre complément du nom et du verbe est...", options: ["Le nom vs le verbe complété", "La longueur", "La position", "Le genre"], correct: "Le nom vs le verbe complété" },
          { text: "Dans 'La porte de la cuisine est fermée', 'de la cuisine' complète...", options: ["le verbe 'est'", "le nom 'porte'", "l'adjectif 'fermée'", "rien"], correct: "le nom 'porte'" },
          { text: "Dans 'Je vois le chien de mon voisin', 'de mon voisin' est...", options: ["complément du verbe 'vois'", "complément du nom 'chien'", "sujet", "attribut"], correct: "complément du nom 'chien'" },
          { text: "Dans 'Elle lit un livre', 'un livre' complète...", options: ["le nom", "le verbe 'lit'", "le sujet", "l'adjectif"], correct: "le verbe 'lit'" },
          { text: "Quel groupe contient DEUX compléments différents? 'Pierre mange...'", options: ["une pomme", "la tarte de mamie", "rapidement", "souvent"], correct: "la tarte de mamie" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Genres et classes de noms (grammaire)
    const genresClassesNomsExercises = [
      {
        name: "Le genre des noms",
        type: "multiple_choice",
        questions: [
          { text: "Quel est le genre du mot 'table'?", options: ["masculin", "féminin", "les deux", "neutre"], correct: "féminin" },
          { text: "Quel est le genre du mot 'livre'?", options: ["masculin", "féminin", "les deux", "neutre"], correct: "masculin" },
          { text: "Comment reconnaît-on souvent un nom féminin?", options: ["Il finit par -e", "Il finit par -tion, -ette, -ée", "Il est court", "Il désigne un objet"], correct: "Il finit par -tion, -ette, -ée" },
          { text: "Quel nom est masculin?", options: ["la maison", "le garage", "la voiture", "la table"], correct: "le garage" },
          { text: "'Enfant' peut être...", options: ["masculin seulement", "féminin seulement", "masculin ou féminin", "ni l'un ni l'autre"], correct: "masculin ou féminin" }
        ]
      },
      {
        name: "Classes de noms",
        type: "multiple_choice",
        questions: [
          { text: "'Marie' est un nom...", options: ["commun", "propre", "abstrait", "collectif"], correct: "propre" },
          { text: "'Liberté' est un nom...", options: ["concret", "abstrait", "propre", "collectif"], correct: "abstrait" },
          { text: "'Troupeau' est un nom...", options: ["individuel", "collectif", "propre", "abstrait"], correct: "collectif" },
          { text: "Un nom commun désigne...", options: ["une personne spécifique", "une catégorie générale", "un lieu unique", "un sentiment"], correct: "une catégorie générale" },
          { text: "'Chaise' est un nom...", options: ["abstrait", "concret", "propre", "collectif"], correct: "concret" }
        ]
      },
      {
        name: "Production - Genres et classes",
        type: "text",
        questions: [
          { text: "Écris 3 noms masculins et 3 noms féminins.", correct: "réponse libre" },
          { text: "Écris 2 noms propres et 2 noms communs.", correct: "réponse libre" },
          { text: "Écris 2 noms abstraits (sentiments, idées) et 2 noms concrets (objets).", correct: "réponse libre" },
          { text: "Donne un exemple de nom collectif et utilise-le dans une phrase.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Genres et classes de noms",
        type: "multiple_choice",
        questions: [
          { text: "Un nom propre prend toujours...", options: ["une minuscule", "une majuscule", "un article", "un adjectif"], correct: "une majuscule" },
          { text: "Le féminin de 'chanteur' est...", options: ["chanteure", "chanteuse", "chantrice", "chanteur"], correct: "chanteuse" },
          { text: "'Foule' désigne plusieurs personnes, c'est un nom...", options: ["abstrait", "propre", "collectif", "individuel"], correct: "collectif" },
          { text: "Quel mot change de sens selon le genre? 'le/la...'", options: ["table", "livre", "voile", "maison"], correct: "voile" },
          { text: "Les noms de pays sont généralement...", options: ["tous masculins", "tous féminins", "féminins s'ils finissent par -e", "sans genre"], correct: "féminins s'ils finissent par -e" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les mots de liaison (grammaire)
    const motsLiaisonExercises = [
      {
        name: "Identification des mots de liaison",
        type: "multiple_choice",
        questions: [
          { text: "Quel mot de liaison exprime une addition?", options: ["mais", "donc", "et", "car"], correct: "et" },
          { text: "Quel mot de liaison exprime une opposition?", options: ["et", "ou", "mais", "puis"], correct: "mais" },
          { text: "Quel mot de liaison exprime une cause?", options: ["donc", "car", "puis", "ou"], correct: "car" },
          { text: "Quel mot de liaison exprime une conséquence?", options: ["car", "mais", "donc", "et"], correct: "donc" },
          { text: "Quel mot de liaison exprime un choix?", options: ["et", "ou", "mais", "car"], correct: "ou" }
        ]
      },
      {
        name: "Utilisation des mots de liaison",
        type: "multiple_choice",
        questions: [
          { text: "Complète: 'Il pleut _____ je prends mon parapluie.' (conséquence)", options: ["mais", "donc", "car", "ou"], correct: "donc" },
          { text: "Complète: 'J'aime les pommes _____ les oranges.' (addition)", options: ["mais", "ou", "et", "donc"], correct: "et" },
          { text: "Complète: 'Je veux venir _____ je suis malade.' (opposition)", options: ["et", "mais", "donc", "car"], correct: "mais" },
          { text: "Complète: 'Il est fatigué _____ il a beaucoup travaillé.' (cause)", options: ["donc", "mais", "car", "et"], correct: "car" },
          { text: "Complète: 'Tu veux du thé _____ du café?' (choix)", options: ["et", "mais", "ou", "donc"], correct: "ou" }
        ]
      },
      {
        name: "Production - Mots de liaison",
        type: "text",
        questions: [
          { text: "Écris une phrase avec 'et' pour relier deux idées.", correct: "réponse libre" },
          { text: "Écris une phrase avec 'mais' pour exprimer une opposition.", correct: "réponse libre" },
          { text: "Écris une phrase avec 'car' pour donner une raison.", correct: "réponse libre" },
          { text: "Écris une phrase avec 'donc' pour exprimer une conséquence.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Mots de liaison",
        type: "multiple_choice",
        questions: [
          { text: "Les mots de liaison servent à...", options: ["remplacer un nom", "relier des phrases ou des idées", "conjuguer un verbe", "décrire un nom"], correct: "relier des phrases ou des idées" },
          { text: "Quel est le moyen mnémotechnique pour retenir les conjonctions de coordination?", options: ["MAIS OU ET DONC OR NI CAR", "ET OU MAIS CAR", "DONC CAR MAIS", "NI ET OU"], correct: "MAIS OU ET DONC OR NI CAR" },
          { text: "'Ni' exprime...", options: ["une addition positive", "une négation double", "une cause", "un choix"], correct: "une négation double" },
          { text: "'Or' est utilisé pour...", options: ["une addition", "une opposition légère/transition", "une cause", "une conséquence"], correct: "une opposition légère/transition" },
          { text: "Dans 'Je lis et j'écris', 'et' relie...", options: ["deux noms", "deux verbes", "deux adjectifs", "deux phrases"], correct: "deux verbes" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: Les adverbes (grammaire)
    const adverbesExercises = [
      {
        name: "Identification des adverbes",
        type: "multiple_choice",
        questions: [
          { text: "Quel mot est un adverbe dans: 'Il parle lentement.'?", options: ["Il", "parle", "lentement", "Aucun"], correct: "lentement" },
          { text: "Quel mot est un adverbe dans: 'Elle chante très bien.'?", options: ["Elle", "chante", "très", "bien"], correct: "bien" },
          { text: "Quel mot est un adverbe de temps?", options: ["rapidement", "hier", "beaucoup", "ici"], correct: "hier" },
          { text: "Quel mot est un adverbe de lieu?", options: ["souvent", "gentiment", "dehors", "jamais"], correct: "dehors" },
          { text: "Quel mot est un adverbe de manière?", options: ["toujours", "là-bas", "doucement", "peu"], correct: "doucement" }
        ]
      },
      {
        name: "Types d'adverbes",
        type: "multiple_choice",
        questions: [
          { text: "'Demain' est un adverbe de...", options: ["manière", "temps", "lieu", "quantité"], correct: "temps" },
          { text: "'Beaucoup' est un adverbe de...", options: ["manière", "temps", "lieu", "quantité"], correct: "quantité" },
          { text: "'Poliment' est un adverbe de...", options: ["manière", "temps", "lieu", "quantité"], correct: "manière" },
          { text: "'Partout' est un adverbe de...", options: ["manière", "temps", "lieu", "quantité"], correct: "lieu" },
          { text: "'Peut-être' est un adverbe de...", options: ["manière", "doute/opinion", "lieu", "quantité"], correct: "doute/opinion" }
        ]
      },
      {
        name: "Production - Adverbes",
        type: "text",
        questions: [
          { text: "Écris une phrase avec un adverbe de manière (comment?).", correct: "réponse libre" },
          { text: "Écris une phrase avec un adverbe de temps (quand?).", correct: "réponse libre" },
          { text: "Écris une phrase avec un adverbe de lieu (où?).", correct: "réponse libre" },
          { text: "Transforme l'adjectif 'rapide' en adverbe et utilise-le dans une phrase.", correct: "réponse libre" }
        ]
      },
      {
        name: "Quiz - Adverbes",
        type: "multiple_choice",
        questions: [
          { text: "Comment forme-t-on généralement un adverbe à partir d'un adjectif?", options: ["On ajoute -ment au féminin", "On ajoute -ment au masculin", "On ajoute -ement", "On ne change rien"], correct: "On ajoute -ment au féminin" },
          { text: "L'adverbe modifie généralement...", options: ["un nom", "un verbe, adjectif ou autre adverbe", "un pronom", "un article"], correct: "un verbe, adjectif ou autre adverbe" },
          { text: "Quelle phrase contient un adverbe?", options: ["Le chat dort.", "Elle est belle.", "Il court vite.", "La maison rouge."], correct: "Il court vite." },
          { text: "'Jamais' est un adverbe de...", options: ["lieu", "manière", "négation/temps", "quantité"], correct: "négation/temps" },
          { text: "Où se place généralement l'adverbe?", options: ["Avant le nom", "Après le verbe", "Au début de phrase seulement", "À la fin seulement"], correct: "Après le verbe" }
        ]
      }
    ];

    // TEMPLATE SPÉCIFIQUE: C'est vs Il est (grammaire)
    const cestVsIlEstExercises = [
      {
        name: "C'est - Identification",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ mon ami Pierre.' (présenter quelqu'un)", options: ["C'est", "Il est", "Elle est", "Ce sont"], correct: "C'est" },
          { text: "Complète: '_____ une bonne idée!' (commenter)", options: ["C'est", "Il est", "Elle est", "Ça est"], correct: "C'est" },
          { text: "Complète: '_____ difficile à comprendre.' (situation générale)", options: ["C'est", "Il est", "Elle est", "Ça"], correct: "C'est" },
          { text: "Quelle phrase est correcte?", options: ["C'est un médecin.", "Il est un médecin.", "C'est médecin.", "Lui est médecin."], correct: "C'est un médecin." },
          { text: "Complète: '_____ le livre que je cherchais.' (identifier)", options: ["C'est", "Il est", "Elle est", "Ce"], correct: "C'est" }
        ]
      },
      {
        name: "Il est / Elle est - Identification",
        type: "multiple_choice",
        questions: [
          { text: "Complète: '_____ médecin.' (profession sans article)", options: ["C'est", "Il est", "C'est un", "Lui est"], correct: "Il est" },
          { text: "Complète: '_____ française.' (nationalité)", options: ["C'est", "Elle est", "C'est une", "Elle a"], correct: "Elle est" },
          { text: "Complète: '_____ très intelligent.' (qualité d'une personne déjà mentionnée)", options: ["C'est", "Il est", "C'est un", "Lui est"], correct: "Il est" },
          { text: "Quelle phrase est correcte pour dire l'heure?", options: ["C'est 3 heures.", "Il est 3 heures.", "Elle est 3 heures.", "Sont 3 heures."], correct: "Il est 3 heures." },
          { text: "Complète: 'Mon père? _____ avocat.' (profession)", options: ["C'est", "Il est", "C'est un", "Lui est"], correct: "Il est" }
        ]
      },
      {
        name: "Production - C'est vs Il est",
        type: "text",
        questions: [
          { text: "Écris 3 phrases avec 'C'est' pour présenter des personnes ou des choses.", correct: "réponse libre" },
          { text: "Écris 3 phrases avec 'Il est' ou 'Elle est' pour décrire des professions.", correct: "réponse libre" },
          { text: "Explique la différence entre 'C'est un professeur' et 'Il est professeur'.", correct: "réponse libre" },
          { text: "Complète: 'Marie? _____. Pierre? _____.' (utilise C'est/Il est/Elle est)", correct: "réponse libre" }
        ]
      },
      {
        name: "C'est vs Il est - Quiz",
        type: "multiple_choice",
        questions: [
          { text: "On utilise 'C'est' devant...", options: ["un adjectif seul", "un article + nom", "une profession sans article", "l'heure"], correct: "un article + nom" },
          { text: "On utilise 'Il est' pour...", options: ["présenter quelqu'un", "dire l'heure", "identifier un objet", "commenter une situation"], correct: "dire l'heure" },
          { text: "'C'est beau!' vs 'Il est beau.' - Quelle est la différence?", options: ["Aucune différence", "C'est = situation générale, Il est = personne spécifique", "C'est = masculin, Il est = féminin", "Même sens"], correct: "C'est = situation générale, Il est = personne spécifique" },
          { text: "Quelle phrase est INCORRECTE?", options: ["C'est un avocat.", "Il est avocat.", "Il est un avocat.", "C'est mon avocat."], correct: "Il est un avocat." },
          { text: "Pour l'heure, on dit...", options: ["C'est midi.", "Il est midi.", "Elle est midi.", "Midi est."], correct: "Il est midi." }
        ]
      }
    ];

    // Generate GRAMMAR exercises with 4-5 questions each
    for (const [courseId, courseInfo] of Object.entries(courseMap)) {
      if (courseInfo.category === "grammaire") {
        // SÉLECTION DES EXERCICES SELON LE TITRE DU COURS
        const titleLower = courseInfo.title.toLowerCase();
        let selectedExercises;
        
        if (titleLower.includes("c'est vs il est") || titleLower === "c'est vs il est") {
          // Cours "C'est vs Il est"
          selectedExercises = cestVsIlEstExercises;
        } else if (titleLower === "les adverbes" || (titleLower.includes("adverbes") && !titleLower.includes("plus complet"))) {
          // Cours "Les adverbes"
          selectedExercises = adverbesExercises;
        } else if (titleLower.includes("mots de liaison")) {
          // Cours "Les mots de liaison"
          selectedExercises = motsLiaisonExercises;
        } else if (titleLower.includes("genres et classes")) {
          // Cours "Genres et classes de noms"
          selectedExercises = genresClassesNomsExercises;
        } else if (titleLower.includes("complément du nom") && titleLower.includes("complément du verbe")) {
          // Cours "Complément du nom vs Complément du verbe"
          selectedExercises = complementNomVerbeExercises;
        } else if (titleLower.includes("adjectif vs adverbe") || titleLower.includes("adjectif") && titleLower.includes("adverbe")) {
          // Cours "Adjectif vs Adverbe"
          selectedExercises = adjectifAdverbeExercises;
        } else if (titleLower.includes("négation") || titleLower.includes("negation")) {
          // Cours "Négation et double négation" ET "La négation (nouvelle grammaire)"
          selectedExercises = negationExercises;
        } else if (titleLower.includes("déterminant") || titleLower.includes("determinant")) {
          // Cours "Les Déterminants"
          selectedExercises = determinantsExercises;
        } else if (titleLower.includes("conjonction")) {
          // Cours "Les Conjonctions de coordination"
          selectedExercises = conjonctionsExercises;
        } else if (titleLower.includes("interjection")) {
          // Cours "Les Interjections"
          selectedExercises = interjectionsExercises;
        } else if (titleLower.includes("sujet") && titleLower.includes("complément")) {
          // Cours "Sujet et Compléments du verbe"
          selectedExercises = sujetComplementsExercises;
        } else if (titleLower.includes("substitut")) {
          // Cours "Les substituts"
          selectedExercises = substitutsExercises;
        } else if (titleLower.includes("marqueur")) {
          // Cours "Les marqueurs de relation"
          selectedExercises = marqueursRelationExercises;
        } else if (titleLower.includes("cohésion") || titleLower.includes("cohérence")) {
          // Cours "La cohésion et cohérence textuelle"
          selectedExercises = cohesionCoherenceExercises;
        } else if (titleLower.includes("adverbes") && titleLower.includes("plus complet")) {
          // Cours "Les adverbes (plus complet)"
          selectedExercises = adverbesCompletExercises;
        } else if (titleLower.includes("séquence") && titleLower.includes("syntaxique")) {
          // Cours "Les séquences syntaxiques"
          selectedExercises = sequencesSyntaxiquesExercises;
        } else if (titleLower === "phrase simple") {
          // Cours "Phrase simple"
          selectedExercises = phraseSimpleExercises;
        } else if (titleLower === "phrase complexe") {
          // Cours "Phrase complexe"
          selectedExercises = phraseComplexeExercises;
        } else if (titleLower.includes("groupe du nom") || titleLower.includes("(gn)")) {
          // Cours "Le groupe du nom (GN)"
          selectedExercises = groupeNomExercises;
        } else if (titleLower.includes("groupe du verbe") || titleLower.includes("(gv)")) {
          // Cours "Le groupe du verbe (GV)"
          selectedExercises = groupeVerbeExercises;
        } else if (titleLower.includes("types") && titleLower.includes("formes") && titleLower.includes("phrase")) {
          // Cours "Types et formes de phrases"
          selectedExercises = typesFormesPhrasesExercises;
        } else if (titleLower.includes("phrases transformées") || (titleLower.includes("phrase") && titleLower.includes("transformée"))) {
          // Cours "Les phrases transformées"
          selectedExercises = phrasesTransformeesExercises;
        } else if (titleLower.includes("structure particulière") || titleLower.includes("phrases à structure")) {
          // Cours "Phrases à structure particulière"
          selectedExercises = phrasesStructureParticuliereExercises;
        } else if (titleLower.includes("groupe infinitif") || titleLower.includes("infinitif")) {
          // Cours "Le groupe infinitif"
          selectedExercises = groupeInfinitifExercises;
        } else {
          // Par défaut: exercices génériques de grammaire
          selectedExercises = grammaireExercises;
        }
        
        // Create 4 exercises for grammar courses
        for (let exNum = 0; exNum < 4; exNum++) {
          const exerciseTemplate = selectedExercises[exNum];
          const exerciseId = randomUUID();
          
          const exercise: Exercise = {
            id: exerciseId,
            courseId,
            title: `${exerciseTemplate.name} - ${courseInfo.title}`,
            description: `${exerciseTemplate.name}: ${courseInfo.title}`,
            type: exerciseTemplate.type as "multiple_choice" | "text",
            order: exNum + 1,
          };
          
          this.exercises.set(exerciseId, exercise);

          // Add 4-5 questions per exercise
          for (let qNum = 0; qNum < exerciseTemplate.questions.length; qNum++) {
            const qData = exerciseTemplate.questions[qNum];
            const questionId = randomUUID();
            
            if (exerciseTemplate.type === "multiple_choice") {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "multiple_choice",
                options: JSON.stringify(qData.options),
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            } else {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "text",
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            }
          }
        }
      } else if (courseInfo.category === "orthographe") {
        // SÉLECTION DES EXERCICES SELON LE TITRE DU COURS
        const titleLower = courseInfo.title.toLowerCase();
        let selectedExercises;
        
        // COURS SPÉCIFIQUES - vérifier en premier pour éviter les faux positifs
        if (titleLower.includes("même vs") || titleLower.includes("même/mêmes")) {
          // Cours "Même vs Mêmes"
          selectedExercises = memeMemeExercises;
        } else if (titleLower.includes("quel vs") || titleLower.includes("qu'elle")) {
          // Cours "Quel vs Qu'elle vs Quelles"
          selectedExercises = quelQuelleExercises;
        } else if (titleLower.includes("ces vs") || titleLower.includes("c'est vs") || titleLower.includes("s'est")) {
          // Cours "Ces vs C'est vs S'est"
          selectedExercises = cesCestExercises;
        } else if (titleLower.includes("règles de base")) {
          // Cours "Les règles de base"
          selectedExercises = reglesBaseExercises;
        } else if (titleLower.includes("mots invariables") || titleLower.includes("invariables et exceptions")) {
          // Cours "Mots invariables et exceptions"
          selectedExercises = motsInvariablesExercises;
        } else if (titleLower.includes("pièges courants") || titleLower.includes("pieges courants")) {
          // Cours "Les pièges courants"
          selectedExercises = piegesCourantsExercises;
        } else if (titleLower.includes("accords du verbe")) {
          // Cours sur les accords du verbe → exercices d'accords sujet-verbe
          selectedExercises = accordsVerbeExercises;
        } else if (titleLower.includes("homophone")) {
          // Cours sur les homophones → exercices d'homophones
          if (titleLower.includes("avancé") || titleLower.includes("grammaticaux") || titleLower.includes("autres")) {
            selectedExercises = homophonesAvancesExercises;
          } else {
            selectedExercises = homophonesExercises;
          }
        } else if (titleLower.includes("pluriel")) {
          // Cours sur les pluriels → exercices de pluriels
          selectedExercises = plurielsExercises;
        } else if (titleLower.includes("trait d'union") || titleLower.includes("trait-d'union")) {
          // Cours sur le trait d'union → exercices de trait d'union
          selectedExercises = traitUnionExercises;
        } else {
          // Par défaut: exercices génériques d'orthographe
          selectedExercises = orthographeExercises;
        }
        
        // Create 4 exercises for orthography courses
        for (let exNum = 0; exNum < 4; exNum++) {
          const exerciseTemplate = selectedExercises[exNum];
          const exerciseId = randomUUID();
          
          const exercise: Exercise = {
            id: exerciseId,
            courseId,
            title: `${exerciseTemplate.name} - ${courseInfo.title}`,
            description: `${exerciseTemplate.name}: ${courseInfo.title}`,
            type: exerciseTemplate.type as "multiple_choice" | "text",
            order: exNum + 1,
          };
          
          this.exercises.set(exerciseId, exercise);

          // Add 4-5 questions per exercise
          for (let qNum = 0; qNum < exerciseTemplate.questions.length; qNum++) {
            const qData = exerciseTemplate.questions[qNum];
            const questionId = randomUUID();
            
            if (exerciseTemplate.type === "multiple_choice") {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "multiple_choice",
                options: JSON.stringify(qData.options),
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            } else {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "text",
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            }
          }
        }
      } else if (courseInfo.category === "conjugaison") {
        // Create 4 exercises for conjugation courses
        for (let exNum = 0; exNum < 4; exNum++) {
          const exerciseTemplate = conjugaisonExercises[exNum];
          const exerciseId = randomUUID();
          
          const exercise: Exercise = {
            id: exerciseId,
            courseId,
            title: `${exerciseTemplate.name} - ${courseInfo.title}`,
            description: `${exerciseTemplate.name}: ${courseInfo.title}`,
            type: exerciseTemplate.type as "multiple_choice" | "text",
            order: exNum + 1,
          };
          
          this.exercises.set(exerciseId, exercise);

          // Add 4-5 questions per exercise
          for (let qNum = 0; qNum < exerciseTemplate.questions.length; qNum++) {
            const qData = exerciseTemplate.questions[qNum];
            const questionId = randomUUID();
            
            if (exerciseTemplate.type === "multiple_choice") {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "multiple_choice",
                options: JSON.stringify(qData.options),
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            } else {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "text",
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            }
          }
        }
      } else if (courseInfo.category === "ponctuation") {
        // Create 4 exercises for punctuation courses
        for (let exNum = 0; exNum < 4; exNum++) {
          const exerciseTemplate = ponctuationExercises[exNum];
          const exerciseId = randomUUID();
          
          const exercise: Exercise = {
            id: exerciseId,
            courseId,
            title: `${exerciseTemplate.name} - ${courseInfo.title}`,
            description: `${exerciseTemplate.name}: ${courseInfo.title}`,
            type: exerciseTemplate.type as "multiple_choice" | "text",
            order: exNum + 1,
          };
          
          this.exercises.set(exerciseId, exercise);

          // Add 4-5 questions per exercise
          for (let qNum = 0; qNum < exerciseTemplate.questions.length; qNum++) {
            const qData = exerciseTemplate.questions[qNum];
            const questionId = randomUUID();
            
            if (exerciseTemplate.type === "multiple_choice") {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "multiple_choice",
                options: JSON.stringify(qData.options),
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            } else {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: qData.text,
                type: "text",
                correctAnswer: qData.correct,
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            }
          }
        }
      } else {
        // For non-grammar courses, keep original 2 exercises
        const templates = {
          orthographe: [
            { type: "multiple_choice", name: "Orthographe: Choix multiples", q1: "Quelle est l'orthographe correcte?", q2: "Complétez correctement." },
            { type: "text", name: "Orthographe: Rédaction", q1: "Écrivez 3 mots avec cette règle d'orthographe.", q2: "Expliquez la règle appliquée." }
          ],
          conjugaison: [
            { type: "multiple_choice", name: "Conjugaison: Temps et modes", q1: "Conjuguez ce verbe au bon temps.", q2: "Quel est le bon mode verbal?" },
            { type: "text", name: "Conjugaison: Rédaction", q1: "Écrivez 3 phrases avec ce verbe au temps indiqué.", q2: "Justifiez votre choix de temps." }
          ],
          ponctuation: [
            { type: "multiple_choice", name: "Ponctuation: Placement", q1: "Où placer la ponctuation?", q2: "Quel signe convient?" },
            { type: "text", name: "Ponctuation: Application", q1: "Ponctuez correctement ce texte.", q2: "Expliquez vos choix." }
          ],
          vocabulaire: [
            { type: "multiple_choice", name: "Vocabulaire: Choix du mot", q1: "Quel mot convient le mieux?", q2: "Trouvez le synonyme." },
            { type: "text", name: "Vocabulaire: Utilisation", q1: "Utilisez ce mot dans 2 phrases différentes.", q2: "Expliquez son sens." }
          ]
        };
        
        const categoryTemplates = templates[courseInfo.category as keyof typeof templates] || templates.orthographe;
        
        for (let exNum = 0; exNum < 2; exNum++) {
          const template = categoryTemplates[exNum] as any;
          const exerciseId = randomUUID();
          const exerciseType = template.type as "multiple_choice" | "text";
          
          const exercise: Exercise = {
            id: exerciseId,
            courseId,
            title: `${template.name} - ${courseInfo.title}`,
            description: `${template.name}: ${courseInfo.title}`,
            type: exerciseType,
            order: exNum + 1,
          };
          
          this.exercises.set(exerciseId, exercise);

          // Add 2 questions per exercise for non-grammar
          for (let qNum = 0; qNum < 2; qNum++) {
            const questionText = qNum === 0 ? template.q1 : template.q2;
            const questionId = randomUUID();
            
            if (exerciseType === "multiple_choice") {
              const options = ["Oui, c'est correct", "Non, ce n'est pas correct", "Partiellement correct", "Je ne sais pas"];
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: questionText,
                type: "multiple_choice",
                options: JSON.stringify(options),
                correctAnswer: "Oui, c'est correct",
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            } else {
              const question: Question = {
                id: questionId,
                exerciseId,
                title: `Question ${qNum + 1}`,
                text: questionText,
                type: "text",
                correctAnswer: "réponse libre",
                order: qNum + 1,
              };
              this.questions.set(questionId, question);
            }
          }
        }
      }
    }
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Courses
  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  // Exercises
  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercisesByCourse(courseId: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(
      (e) => e.courseId === courseId
    );
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { ...insertExercise, id };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async getQuestionsByExercise(exerciseId: string): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      (q) => q.exerciseId === exerciseId
    );
  }

  async getAllStudentProgress(studentId: string): Promise<StudentProgress[]> {
    return Array.from(this.progress.values()).filter(
      (p) => p.studentId === studentId
    );
  }

  // Badges
  async getBadgesByStudent(studentId: string): Promise<StudentBadge[]> {
    return Array.from(this.badges.values()).filter(
      (b) => b.studentId === studentId
    );
  }

  async createBadge(badge: Omit<StudentBadge, "id">): Promise<StudentBadge> {
    const id = randomUUID();
    const newBadge: StudentBadge = { ...badge, id };
    this.badges.set(id, newBadge);
    return newBadge;
  }

  // Assignments
  async getAssignmentsByStudent(studentId: string): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(
      (a) => a.studentId === studentId
    );
  }

  async getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(
      (a) => a.teacherId === teacherId
    );
  }

  async createAssignment(assignment: Omit<Assignment, "id">): Promise<Assignment> {
    const id = randomUUID();
    const newAssignment: Assignment = { ...assignment, id };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }

  // Teacher queries
  async getStudentsByTeacher(teacherId: string): Promise<(User & { progressPercentage: number })[]> {
    const assignments = await this.getAssignmentsByTeacher(teacherId);
    const studentIds = new Set(assignments.map((a) => a.studentId));

    const students: (User & { progressPercentage: number })[] = [];
    for (const studentId of studentIds) {
      const user = await this.getUser(studentId);
      if (user && user.role === "student") {
        const progress = await this.getAllStudentProgress(studentId);
        const avgProgress =
          progress.length > 0
            ? Math.round(
                progress.reduce((sum, p) => sum + p.progressPercentage, 0) /
                  progress.length
              )
            : 0;
        students.push({ ...user, progressPercentage: avgProgress });
      }
    }

    return students;
  }

  async getStudentReports(teacherId: string): Promise<any[]> {
    const assignments = await this.getAssignmentsByTeacher(teacherId);
    const studentIds = new Set(assignments.map((a) => a.studentId));

    const reports: any[] = [];
    for (const studentId of studentIds) {
      const user = await this.getUser(studentId);
      if (!user || user.role !== "student") continue;

      const responses = await this.getResponsesByStudent(studentId);
      const progress = await this.getAllStudentProgress(studentId);

      const totalCorrect = responses.filter((r) => r.isCorrect).length;
      const totalAttempts = responses.length;
      const averageAccuracy =
        totalAttempts > 0
          ? Math.round((totalCorrect / totalAttempts) * 100)
          : 0;

      const coursesCompleted = progress.filter((p) => p.completed).length;
      const totalCourses = progress.length;

      // Progress by category
      const progressByCategory: { [key: string]: number } = {};
      for (const course of await Promise.all(
        Array.from(new Set(progress.map((p) => p.courseId))).map((id) =>
          this.getCourse(id)
        )
      )) {
        if (course) {
          const courseProgress = progress.find((p) => p.courseId === course.id);
          progressByCategory[course.category] =
            courseProgress?.progressPercentage || 0;
        }
      }

      reports.push({
        id: studentId,
        firstName: user.firstName,
        lastName: user.lastName,
        totalCorrect,
        totalAttempts,
        averageAccuracy,
        coursesCompleted,
        totalCourses,
        progressByCategory,
      });
    }

    return reports;
  }

  async getReadingNarrativeExercises(studentId: string): Promise<Exercise[]> {
    // Get all exercises and filter for reading narrative exercises
    const allExercises = Array.from(this.exercises.values());
    const readingExercises = allExercises.filter((ex) => {
      const course = this.courses.get(ex.courseId);
      return course && course.category === "lecture_reading" && ex.type === "text";
    });
    return readingExercises; // Return all 20 reading exercises
  }
}

export const storage = new MemStorage();
