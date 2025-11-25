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
    const course1Id = randomUUID();
    const course2Id = randomUUID();
    const course3Id = randomUUID();

    const course1: Course = {
      id: course1Id,
      title: "Les Noms",
      description: "Apprenez à identifier et classifier les différents types de noms",
      category: "grammaire",
      content:
        "<h2>Les Noms - Cours Complet</h2><p>Un nom est un mot qui désigne une personne, un animal, une chose, une idée ou un sentiment. C'est un élément essentiel de la phrase.</p><h3>1. LES DIFFÉRENTS TYPES DE NOMS</h3><h4>A) Les Noms Communs vs Noms Propres</h4><p><strong>Noms communs</strong> - designent des êtres ou des choses de façon générale. Ils s'écrivent avec une minuscule au début:</p><ul><li>Personnes: enfant, femme, docteur, professeur, ami</li><li>Animaux: chat, chien, oiseau, poisson, lion</li><li>Choses: maison, table, stylo, livre, voiture</li><li>Lieux: école, parc, forêt, mer, montagne</li></ul><p><strong>Exemples:</strong> Le professeur enseigne à l'école. Un chat dort sur la table.</p><p><strong>Noms propres</strong> - designent des êtres ou des choses particuliers. Ils s'écrivent toujours avec une majuscule:</p><ul><li>Personnes: Marie, Jean, Dupont, Einstein, Napoléon</li><li>Lieux: Paris, France, Afrique, océan Atlantique, mont Blanc</li><li>Fêtes/Événements: Noël, Pâques, Halloween, la Révolution française</li><li>Entreprises/Marques: Renault, Microsoft, Toyota</li><li>Jours/Mois: lundi, mars, décembre</li></ul><p><strong>Exemples:</strong> Marie habite à Paris. Noël est une fête importante. Je vais en France.</p><h4>B) Les Noms Concrets vs Noms Abstraits</h4><p><strong>Noms concrets</strong> - désignent des choses qu'on peut voir, toucher, sentir, goûter ou entendre:</p><ul><li>Objets: livre, chaise, téléphone, montre, gâteau</li><li>Êtres vivants: fille, garçon, chien, fleur, arbre</li><li>Matériaux: bois, métal, plastique, papier, verre</li><li>Éléments: eau, feu, air, sable, neige</li></ul><p><strong>Exemples:</strong> Je bois de l'eau. Elle mange une pomme. Le bois de la table est brun.</p><p><strong>Noms abstraits</strong> - désignent des idées, des sentiments, des concepts qu'on ne peut pas voir ou toucher:</p><ul><li>Sentiments: amour, peur, joie, tristesse, colère, courage</li><li>Qualités: beauté, intelligence, honnêteté, générosité</li><li>États: silence, liberté, pauvreté, santé, maladie</li><li>Concepts: justice, paix, guerre, science, art</li></ul><p><strong>Exemples:</strong> L'amour est important. Elle a du courage. La justice doit exister.</p><h3>2. LE GENRE DES NOMS</h3><p>En français, chaque nom a un genre: <strong>masculin</strong> ou <strong>féminin</strong>. Le genre affecte les mots qui accompagnent le nom (articles, adjectifs, participes).</p><h4>Noms Masculins:</h4><ul><li>Articles: le, un, ce, mon, ton, son</li><li>Exemples: <strong>le</strong> chat, <strong>un</strong> garçon, <strong>le</strong> stylo, <strong>le</strong> travail, <strong>le</strong> francais</li></ul><h4>Noms Féminins:</h4><ul><li>Articles: la, une, cette, ma, ta, sa</li><li>Exemples: <strong>la</strong> maison, <strong>une</strong> fille, <strong>la</strong> fleur, <strong>la</strong> science, <strong>la</strong> musique</li></ul><h4>Comment reconnaître le genre?</h4><p>Parfois, la terminaison du nom donne un indice sur le genre:</p><ul><li>Généralement <strong>MASCULINS</strong>: -ment (le jugement), -age (le voyage), -oir (le couloir), -eau (le bureau)</li><li>Généralement <strong>FÉMININS</strong>: -tion (l'action), -sion (la passion), -ure (la nature), -ée (la journée), -ité (la qualité)</li></ul><p><strong>Mais attention!</strong> Il y a des exceptions. Le mieux est d'apprendre le genre avec chaque nouveau mot.</p><h3>3. LE NOMBRE DES NOMS</h3><p>Les noms peuvent être au <strong>singulier</strong> (une seule chose) ou au <strong>pluriel</strong> (plusieurs choses).</p><h4>Formation du pluriel:</h4><ul><li><strong>Règle générale:</strong> Ajouter un -s à la fin du nom<ul><li>Singulier: un chat, la maison, le livre</li><li>Pluriel: des chats, les maisons, les livres</li></ul></li><li><strong>Noms terminés en -au, -eau, -eu:</strong> Ajouter un -x<ul><li>Singulier: un bureau, un château, un jeu</li><li>Pluriel: des bureaux, des châteaux, des jeux</li></ul></li><li><strong>Noms terminés en -al:</strong> Généralement changer -al en -aux<ul><li>Singulier: un animal, un journal, un hôpital</li><li>Pluriel: des animaux, des journaux, des hôpitaux</li></ul></li><li><strong>Noms terminés en -ail:</strong> Généralement ajouter -s (mais certains changent en -aux)<ul><li>Singulier: un travail, un détail</li><li>Pluriel: des travaux, des détails</li></ul></li></ul><p><strong>Exemples d'utilisation:</strong></p><p>- Singulier: J'ai un ami. Cette table est belle. Le travail est important.</p><p>- Pluriel: J'ai trois amis. Ces tables sont belles. Les travaux sont importants.</p><h3>4. ACCORDS IMPORTANTS</h3><p>Quand on utilise un nom, l'article, l'adjectif et parfois le verbe doivent s'accorder avec lui:</p><ul><li><strong>Masculin singulier:</strong> <strong>le</strong> beau chat <strong>est</strong> noir</li><li><strong>Féminin singulier:</strong> <strong>la</strong> belle fille <strong>est</strong> intelligente</li><li><strong>Pluriel:</strong> <strong>les</strong> beaux chats <strong>sont</strong> noirs</li></ul><h3>5. EXERCICES PRATIQUES</h3><p><strong>Exercice 1:</strong> Identifiez le genre (M ou F) de ces noms:</p><ul><li>chat, livre, fille, école, soleil, montagne</li></ul><p><strong>Exercice 2:</strong> Mettez au pluriel:</p><ul><li>un enfant → ?</li><li>une rose → ?</li><li>le bureau → ?</li><li>un détail → ?</li></ul><p><strong>Exercice 3:</strong> Classez comme noms concrets (C) ou abstraits (A):</p><ul><li>amour, chaise, liberté, pomme, courage, voiture</li></ul>",
      order: 1,
    };

    const course2: Course = {
      id: course2Id,
      title: "Les Verbes",
      description: "Maîtrisez l'identification des verbes et leurs fonctions",
      category: "grammaire",
      content:
        "<h2>Les Verbes - Cours Complet</h2><p>Un verbe est un mot qui exprime une action, un état, un processus ou une existence. Le verbe est l'élément central de la phrase qui montre ce qui se passe.</p><h3>1. LES DIFFÉRENTS TYPES DE VERBES</h3><h4>A) Les Verbes d'Action</h4><p>Les verbes d'action expriment ce que quelqu'un ou quelque chose FAIT:</p><ul><li><strong>Mouvements:</strong> courir, marcher, sauter, danser, nager, voler, tomber</li><li><strong>Actes physiques:</strong> frapper, attraper, lancer, porter, pousser, tirer</li><li><strong>Création/Production:</strong> écrire, dessiner, construire, fabriquer, peindre, chanter</li><li><strong>Communication:</strong> parler, crier, chuchoter, expliquer, demander, répondre</li><li><strong>Consommation:</strong> manger, boire, dévorer, goûter, mâcher</li></ul><p><strong>Exemples:</strong></p><ul><li>Le chien <strong>court</strong> dans le parc.</li><li>Elle <strong>écrit</strong> une lettre.</li><li>Nous <strong>mangeons</strong> une pomme.</li><li>Ils <strong>jouent</strong> au football.</li></ul><h4>B) Les Verbes d'État</h4><p>Les verbes d'état expriment comment quelqu'un ou quelque chose EST, DEVIENT ou SEMBLE ÊTRE:</p><ul><li><strong>Être:</strong> être, exister</li><li><strong>Devenir:</strong> devenir, rester, demeurer</li><li><strong>Sembler/Paraître:</strong> sembler, paraître, air</li></ul><p><strong>Exemples:</strong></p><ul><li>Je <strong>suis</strong> heureux.</li><li>Elle <strong>devient</strong> médecin.</li><li>Il <strong>paraît</strong> fatigué.</li><li>Les fleurs <strong>restent</strong> belles.</li></ul><h4>C) Les Verbes Transitifs vs Intransitifs</h4><p><strong>Verbes TRANSITIFS</strong> - exigent un complément d'objet (quelque chose que le verbe affecte):</p><ul><li>manger (manger quoi?), écrire (écrire quoi?), voir (voir qui/quoi?), aimer (aimer qui?)</li></ul><p><strong>Exemples:</strong></p><ul><li>Je <strong>mange</strong> <strong>une pomme</strong>. (l'objet est \"une pomme\")</li><li>Elle <strong>écrit</strong> <strong>une lettre</strong>. (l'objet est \"une lettre\")</li><li>Il <strong>aime</strong> <strong>Marie</strong>. (l'objet est \"Marie\")</li></ul><p><strong>Verbes INTRANSITIFS</strong> - n'exigent pas de complément d'objet:</p><ul><li>courir, dormir, aller, venir, arriver, pleurer, rire</li></ul><p><strong>Exemples:</strong></p><ul><li>Le chien <strong>court</strong>.</li><li>Elle <strong>dort</strong>.</li><li>Il <strong>arrive</strong> maintenant.</li><li>Nous <strong>pleurons</strong>.</li></ul><h3>2. L'INFINITIF - LA FORME DE BASE DU VERBE</h3><p>L'infinitif est la forme de base du verbe. C'est la forme qu'on trouve dans le dictionnaire. Les infinitifs français se terminent généralement par:</p><ul><li><strong>-ER:</strong> manger, marcher, jouer, parler, écouter, regarder</li><li><strong>-IR:</strong> finir, partir, dormir, sortir, servir</li><li><strong>-OIR:</strong> pouvoir, vouloir, devoir, voir, recevoir</li><li><strong>-RE:</strong> faire, dire, prendre, vendre, mettre, attendre</li></ul><p><strong>Exemples d'infinitifs:</strong></p><ul><li>Je veux <strong>manger</strong> une pizza. (infinitif)</li><li>Il faut <strong>étudier</strong> pour réussir. (infinitif)</li><li>Elle aime <strong>danser</strong>. (infinitif)</li></ul><h3>3. LA CONJUGAISON - LES PERSONNES</h3><p>Le verbe change selon la personne (le sujet). Il existe 6 personnes grammaticales:</p><ul><li><strong>1ère personne singulier:</strong> je (moi seul)</li><li><strong>2e personne singulier:</strong> tu (une personne, familier)</li><li><strong>3e personne singulier:</strong> il/elle/on (une personne ou une chose)</li><li><strong>1ère personne pluriel:</strong> nous (moi et d'autres)</li><li><strong>2e personne pluriel:</strong> vous (plusieurs personnes, ou une personne en formel)</li><li><strong>3e personne pluriel:</strong> ils/elles (plusieurs personnes ou choses)</li></ul><p><strong>Exemple avec le verbe \"manger\":</strong></p><ul><li>Je <strong>mange</strong> une pomme.</li><li>Tu <strong>manges</strong> un gâteau.</li><li>Il/Elle <strong>mange</strong> du pain.</li><li>Nous <strong>mangeons</strong> ensemble.</li><li>Vous <strong>mangez</strong> une salade.</li><li>Ils/Elles <strong>mangent</strong> des fruits.</li></ul><h3>4. LES TEMPS - PASSÉ, PRÉSENT, FUTUR</h3><p><strong>Le temps indique QUAND l'action se passe:</strong></p><ul><li><strong>PRÉSENT:</strong> L'action se passe maintenant.<ul><li>Je <strong>parle</strong>. (en ce moment)</li><li>Il <strong>mange</strong>. (maintenant)</li></ul></li><li><strong>PASSÉ COMPOSÉ:</strong> L'action s'est passée avant maintenant.<ul><li>J'<strong>ai parlé</strong>. (hier, la semaine dernière...)</li><li>Il <strong>a mangé</strong>. (hier soir)</li></ul></li><li><strong>FUTUR:</strong> L'action se passera après maintenant.<ul><li>Je <strong>parlerai</strong>. (demain, bientôt...)</li><li>Il <strong>mangera</strong>. (ce soir)</li></ul></li><li><strong>IMPARFAIT:</strong> L'action se passait régulièrement ou sur une période longue dans le passé.<ul><li>Je <strong>parlais</strong>. (j'avais l'habitude de parler)</li><li>Il <strong>mangeait</strong>. (habituellement, autrefois)</li></ul></li></ul><h3>5. LES MODES - INDICATIF, IMPÉRATIF, SUBJONCTIF</h3><p><strong>L'indicatif</strong> - Le mode normal, pour exprimer des faits:</p><ul><li>Je <strong>suis</strong> heureux. (c'est un fait)</li><li>Elle <strong>travaille</strong> à l'école. (c'est un fait)</li></ul><p><strong>L'impératif</strong> - Pour donner des ordres ou des conseils:</p><ul><li><strong>Parle!</strong> (à une personne)</li><li><strong>Parlons!</strong> (à un groupe)</li><li><strong>Parlez!</strong> (poli ou à plusieurs)</li><li><strong>Exemples:</strong> Va à l'école! Étudie bien! Soyez gentils!</li></ul><p><strong>Le subjonctif</strong> - Pour exprimer le doute, le souhait, la nécessité:</p><ul><li>Il faut que tu <strong>étudies</strong>. (nécessité)</li><li>Je souhaite qu'il <strong>réussisse</strong>. (souhait)</li></ul><h3>6. LES TROIS GROUPES DE VERBES</h3><p><strong>1er groupe (verbes en -ER) - Les plus nombreux:</strong> manger, parler, regarder, jouer, écouter, travailler</p><p><strong>2e groupe (verbes en -IR) - Moins nombreux:</strong> finir, partir, dormir, sortir, venir</p><p><strong>3e groupe (autres) - Irréguliers:</strong> faire, aller, avoir, être, mettre, prendre, venir, pouvoir, vouloir, devoir</p><h3>7. EXEMPLES COMPLETS AVEC CONTEXTE</h3><p><strong>\"PARLER\" au présent:</strong> Je parle français → Tu parles français → Il parle français → Nous parlons français → Vous parlez français → Ils parlent français</p><p><strong>\"MANGER\" (exemple régulier ER):</strong></p><ul><li>Présent: je mange, tu manges, il/elle mange, nous mangeons, vous mangez, ils/elles mangent</li><li>Futur: je mangerai, tu mangeras, il/elle mangera, nous mangerons, vous mangerez, ils/elles mangeront</li><li>Imparfait: je mangeais, tu mangeais, il/elle mangeait, nous mangions, vous mangiez, ils/elles mangeaient</li></ul><p><strong>\"ALLER\" (irrégulier):</strong></p><ul><li>Présent: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont</li><li>Futur: j'irai, tu iras, il/elle ira, nous irons, vous irez, ils/elles iront</li></ul>",
      order: 2,
    };

    // New grammar courses
    const course2aId = randomUUID();
    const course2bId = randomUUID();
    const course2cId = randomUUID();

    const course2a: Course = {
      id: course2aId,
      title: "Les Adjectifs",
      description: "Découvrez comment les adjectifs décrivent et modifient les noms",
      category: "grammaire",
      content:
        "<h2>Les Adjectifs - Cours Complet</h2><p>Un adjectif est un mot qui décrit, qualifie ou donne des informations supplémentaires sur un nom. L'adjectif enrichit notre description des choses.</p><h3>1. FONCTION DE L'ADJECTIF</h3><p>L'adjectif ajoute une qualité, une caractéristique, une information ou une propriété à un nom. C'est un \"descripteur\" qui nous aide à mieux imaginer ou comprendre le nom.</p><p><strong>Exemples:</strong></p><ul><li>Un chat → Un <strong>beau</strong> chat (le mot \"beau\" ajoute une qualité)</li><li>Une maison → Une <strong>petite</strong> maison (le mot \"petite\" ajoute une taille)</li><li>Un livre → Un <strong>intéressant</strong> livre (le mot \"intéressant\" donne une opinion)</li><li>Une fille → Une fille <strong>intelligente</strong> (le mot \"intelligente\" décrit son caractère)</li></ul><h3>2. LES CATÉGORIES D'ADJECTIFS</h3><h4>A) Adjectifs de Qualité/Défaut:</h4><ul><li><strong>Positifs:</strong> beau, bon, merveilleux, fantastique, excellent, gentil, honnête, brave</li><li><strong>Négatifs:</strong> mauvais, vilain, horrible, terrible, méchant, lâche, malhonnête</li><li><strong>Exemples:</strong> Un bon enfant. Une mauvaise note. Un merveilleux jour.</li></ul><h4>B) Adjectifs de Taille:</h4><ul><li><strong>Grand, petit, énorme, minuscule, colossal, microscopique, immense, diminutif</strong></li><li><strong>Exemples:</strong> Un grand bâtiment. Une petite souris. Un énorme éléphant.</li></ul><h4>C) Adjectifs de Couleur:</h4><ul><li><strong>Couleurs simples:</strong> rouge, bleu, vert, jaune, noir, blanc, gris, orange, rose, violet, marron, beige</li><li><strong>Couleurs composées:</strong> bleu-ciel, jaune citron, vert foncé, rouge clair</li><li><strong>Exemples:</strong> Un stylo rouge. Un ciel bleu. Une voiture noire. Des fleurs roses.</li></ul><h4>D) Adjectifs d'Âge:</h4><ul><li><strong>jeune, vieux, ancien, nouveau, moderne, contemporain</strong></li><li><strong>Exemples:</strong> Un jeune enfant. Une vieille maison. Un nouveau professeur. Des murs anciens.</li></ul><h4>E) Adjectifs de Forme:</h4><ul><li><strong>rond, carré, triangulaire, rectangulaire, ovale, pointu, plat, courbe</strong></li><li><strong>Exemples:</strong> Une table ronde. Un bâtiment carré. Un objet pointu. Une forme plate.</li></ul><h4>F) Adjectifs de Texture/Matière:</h4><ul><li><strong>lisse, rugueux, doux, dur, mou, souple, rigide, épais, fin</strong></li><li><strong>Exemples:</strong> Un tissu doux. Une surface lisse. Un sol rugueux.</li></ul><h4>G) Adjectifs de Nombre/Quantité:</h4><ul><li><strong>plusieurs, nombreux, quelques, beaucoup de, peu de, certains, tous, chaque</strong></li><li><strong>Exemples:</strong> Plusieurs enfants. Nombreuses questions. Quelques livres.</li></ul><h4>H) Adjectifs Démonstratifs:</h4><ul><li><strong>ce, cet, cette, ces</strong> (montrent quelque chose)</li><li><strong>Exemples:</strong> Ce chat. Cet arbre. Cette maison. Ces enfants.</li></ul><h4>I) Adjectifs Possessifs:</h4><ul><li><strong>mon, ton, son, notre, votre, leur, ma, ta, sa, nos, vos, leurs</strong></li><li><strong>Exemples:</strong> Mon chat. Ta maison. Son livre. Notre école.</li></ul><h3>3. L'ACCORD DE L'ADJECTIF - TRÈS IMPORTANT!</h3><p>L'adjectif s'accorde en genre ET en nombre avec le nom qu'il décrit. Cela signifie que l'adjectif change de forme pour correspondre au nom.</p><h4>Accord en Genre (Masculin/Féminin):</h4><p><strong>Règle générale:</strong> Pour passer du masculin au féminin, on ajoute généralement un -e</p><ul><li>Masculin: petit → Féminin: petite</li><li>Masculin: grand → Féminin: grande</li><li>Masculin: noir → Féminin: noire</li><li>Masculin: rouge → Féminin: rouge (pas de changement!)</li></ul><p><strong>Adjectifs spéciaux:</strong></p><ul><li>Beau: beau (masc.) / belle (fém.) / bel (avant voyelle) → Un beau jour, une belle nuit, un bel arbre</li><li>Nouveau: nouveau (masc.) / nouvelle (fém.) / nouvel (avant voyelle) → Un nouveau livre, une nouvelle maison</li><li>Vieux: vieux (masc.) / vieille (fém.) / vieil (avant voyelle) → Un vieux chat, une vieille dame, un vieil homme</li></ul><h4>Accord en Nombre (Singulier/Pluriel):</h4><p><strong>Règle générale:</strong> Pour passer du singulier au pluriel, on ajoute un -s</p><ul><li>Singulier: petit → Pluriel: petits</li><li>Singulier: grande → Pluriel: grandes</li><li>Singulier: noir → Pluriel: noirs</li></ul><p><strong>Cas spéciaux:</strong></p><ul><li>Adjectifs en -al changent en -aux: un jour normal → des jours normaux</li><li>Adjectifs en -eau changent en -eaux: un beau jour → des beaux jours</li></ul><h4>Exemples complets:</h4><ul><li>Singulier masc: Un chat noir</li><li>Singulier fém: Une maison noire</li><li>Pluriel masc: Des chats noirs</li><li>Pluriel fém: Des maisons noires</li></ul><h3>4. POSITION DE L'ADJECTIF - AVANT OU APRÈS LE NOM?</h3><p><strong>Adjectifs ANTÉPOSÉS (avant le nom):</strong></p><p>Certains adjectifs courts et courants se mettent généralement AVANT le nom:</p><ul><li><strong>Beau, joli, bon, mauvais, grand, petit, nouveau, jeune, vieux, ancien</strong></li><li><strong>Exemples:</strong> Un <strong>beau</strong> jour. Une <strong>petite</strong> maison. Le <strong>bon</strong> étudiant.</li></ul><p><strong>Adjectifs POSTPOSÉS (après le nom):</strong></p><p>La plupart des autres adjectifs se mettent APRÈS le nom:</p><ul><li><strong>Adjectifs de couleur:</strong> Une voiture rouge. Un livre bleu.</li><li><strong>Adjectifs de forme:</strong> Une table ronde. Un objet carré.</li><li><strong>Adjectifs de nationalité:</strong> Un film français. Une chanson italienne.</li><li><strong>Adjectifs de matière:</strong> Une chaise en bois. Un verre en plastique.</li><li><strong>Adjectifs de participe:</strong> Un homme fatigué. Une fille endormie.</li></ul><p><strong>Attention:</strong> Certains adjectifs changent de sens selon leur position:</p><ul><li>Un pauvre homme (pitoyable) vs Un homme pauvre (sans argent)</li><li>Un ancien ministre (un ministre du passé) vs Un meuble ancien (très vieux)</li></ul><h3>5. ACCORDS MULTIPLES DANS UNE PHRASE</h3><p>Quand plusieurs adjectifs décrivent un nom, ils s'accordent tous:</p><ul><li>Un <strong>grand</strong> et <strong>beau</strong> jardin (tous deux s'accordent avec \"jardin\" au masc. singulier)</li><li>De <strong>petites</strong> et <strong>jolies</strong> fleurs (tous deux s'accordent avec \"fleurs\" au fém. pluriel)</li><li>Ces <strong>anciens</strong> et <strong>importants</strong> bâtiments (tous deux au pluriel)</li></ul><h3>6. DEGRÉS DE COMPARAISON</h3><p><strong>Comparatif (pour comparer):</strong></p><ul><li><strong>Plus... que:</strong> Cette maison est plus grande que celle-ci.</li><li><strong>Moins... que:</strong> Le train est moins rapide que l'avion.</li><li><strong>Aussi... que:</strong> Le français est aussi difficile que l'anglais.</li></ul><p><strong>Superlatif (pour désigner le meilleur/pire):</strong></p><ul><li><strong>Le/la plus...</strong> C'est la plus belle fille de la classe.</li><li><strong>Le/la moins...</strong> C'est le moins cher des deux.</li></ul><p><strong>Adjectifs irréguliers:</strong></p><ul><li>Bon: meilleur (comparative), le meilleur (superlative)</li><li>Mauvais: pire (comparative), le pire (superlative)</li></ul><h3>7. EXEMPLES PRATIQUES COMPLETS</h3><p><strong>Description d'une maison:</strong> \"C'est une <strong>grande</strong> et <strong>ancienne</strong> maison <strong>blanche</strong> avec un <strong>beau</strong> jardin <strong>coloré</strong>.\"</p><p><strong>Description d'une personne:</strong> \"C'est une <strong>jeune</strong> fille <strong>petite</strong>, <strong>intelligente</strong> et <strong>gentille</strong> avec des cheveux <strong>noirs</strong>.\"</p><p><strong>Description d'un objet:</strong> \"Un <strong>joli</strong> vase <strong>rond</strong> en céramique <strong>rouge</strong>.\"</p>",
      order: 3,
    };

    const course2b: Course = {
      id: course2bId,
      title: "Les Pronoms",
      description: "Apprenez à utiliser les pronoms pour remplacer les noms",
      category: "grammaire",
      content:
        "<h2>Les Pronoms - Cours Complet</h2><p>Un pronom est un mot qui remplace un nom ou un groupe nominal pour éviter la répétition et rendre la phrase plus naturelle. Les pronoms sont essentiels pour une bonne fluidité du français.</p><h3>1. LES PRONOMS PERSONNELS - SUJETS</h3><p>Les pronoms personnels sujets remplacent le nom du sujet de la phrase (celui qui fait l'action):</p><ul><li><strong>je</strong> - moi seul (1ère personne singulier)</li><li><strong>tu</strong> - une autre personne, familier (2e personne singulier)</li><li><strong>il/elle</strong> - une autre personne ou chose (3e personne singulier)</li><li><strong>on</strong> - on général, quelqu'un (3e personne singulier, informel)</li><li><strong>nous</strong> - moi et d'autres (1ère personne pluriel)</li><li><strong>vous</strong> - plusieurs personnes ou une personne en formel (2e personne pluriel)</li><li><strong>ils/elles</strong> - plusieurs autres personnes ou choses (3e personne pluriel)</li></ul><p><strong>Exemples:</strong></p><ul><li><strong>Je</strong> suis heureux.</li><li><strong>Tu</strong> as un livre.</li><li><strong>Il</strong> habite à Paris. / <strong>Elle</strong> parle français.</li><li><strong>On</strong> va à l'école. (quelqu'un va à l'école, informel)</li><li><strong>Nous</strong> jouons au football.</li><li><strong>Vous</strong> êtes gentils.</li><li><strong>Ils</strong> mangent une pomme. / <strong>Elles</strong> écoutent la musique.</li></ul><h3>2. LES PRONOMS PERSONNELS - COMPLÉMENTS DIRECTS</h3><p>Les pronoms compléments directs reçoivent l'action du verbe directement (pas besoin de préposition):</p><ul><li><strong>me (m')</strong> - moi</li><li><strong>te (t')</strong> - toi</li><li><strong>le, la (l')</strong> - lui/elle ou cela</li><li><strong>nous</strong> - nous</li><li><strong>vous</strong> - vous</li><li><strong>les</strong> - eux/elles</li></ul><p><strong>Exemples:</strong></p><ul><li>Je <strong>le</strong> vois. (Je vois lui/cet enfant)</li><li>Elle <strong>t'</strong>aime. (Elle aime toi)</li><li>Nous <strong>les</strong> regardons. (Nous regardons eux/elles/les enfants)</li><li>Il <strong>m'</strong>appelle. (Il m'appelle moi)</li></ul><h3>3. LES PRONOMS PERSONNELS - COMPLÉMENTS INDIRECTS</h3><p>Les pronoms compléments indirects reçoivent l'action du verbe indirectement (avec préposition \"à\"):</p><ul><li><strong>me (m')</strong> - à moi</li><li><strong>te (t')</strong> - à toi</li><li><strong>lui</strong> - à lui/elle</li><li><strong>nous</strong> - à nous</li><li><strong>vous</strong> - à vous</li><li><strong>leur</strong> - à eux/elles</li></ul><p><strong>Exemples:</strong></p><ul><li>Je <strong>lui</strong> parle. (Je parle à lui/elle)</li><li>Elle <strong>leur</strong> explique. (Elle explique à eux/elles)</li><li>Nous <strong>te</strong> donnons un cadeau. (Nous donnons à toi)</li><li>Il <strong>nous</strong> montre son dessin. (Il montre à nous)</li></ul><h3>4. LES PRONOMS POSSESSIFS</h3><p>Les pronoms possessifs remplacent le possesseur ET l'objet possédé. Ils s'accordent en genre et nombre avec l'objet:</p><ul><li><strong>le mien, la mienne, les miens, les miennes</strong> - à moi</li><li><strong>le tien, la tienne, les tiens, les tiennes</strong> - à toi</li><li><strong>le sien, la sienne, les siens, les siennes</strong> - à lui/elle</li><li><strong>le nôtre, la nôtre, les nôtres</strong> - à nous</li><li><strong>le vôtre, la vôtre, les vôtres</strong> - à vous</li><li><strong>le leur, la leur, les leurs</strong> - à eux/elles</li></ul><p><strong>Exemples:</strong></p><ul><li>Mon chat est noir, <strong>le tien</strong> est blanc. (Ton chat est blanc)</li><li>Voici ma maison et <strong>la sienne</strong>. (Et sa maison à lui/elle)</li><li>Vos livres sont beaux, <strong>les nôtres</strong> aussi. (Et nos livres aussi)</li><li>J'ai mon stylo, tu as <strong>le tien</strong>. (Tu as ton stylo)</li></ul><h3>5. LES PRONOMS DÉMONSTRATIFS</h3><p>Les pronoms démonstratifs désignent ou montrent quelque chose ou quelqu'un:</p><h4>Formes simples:</h4><ul><li><strong>celui, celle, ceux, celles</strong> - (généralement suivi de -ci, -là ou d'une proposition relative)</li><li><strong>ce (c')</strong> - dans les expressions comme \"c'est\", \"ce qui\", \"ce que\"</li><li><strong>cela, ça</strong> - cette chose (informel avec ça)</li></ul><h4>Formes composées:</h4><ul><li><strong>celui-ci, celui-là</strong> - masc. singulier (this/that one)</li><li><strong>celle-ci, celle-là</strong> - fém. singulier</li><li><strong>ceux-ci, ceux-là</strong> - masc. pluriel</li><li><strong>celles-ci, celles-là</strong> - fém. pluriel</li></ul><p><strong>Exemples:</strong></p><ul><li>Je préfère <strong>celui-ci</strong> (ce livre) à <strong>celui-là</strong>. (I prefer this one to that one)</li><li><strong>Cela</strong> est intéressant. (That is interesting)</li><li><strong>C'est</strong> une bonne idée. (It is a good idea)</li><li>Les maisons <strong>celles-ci</strong> sont belles. (These houses are beautiful)</li></ul><h3>6. LES PRONOMS RELATIFS</h3><p>Les pronoms relatifs relient deux phrases en remplaçant un nom déjà mentionné:</p><ul><li><strong>qui</strong> - le sujet de la proposition (personne ou chose)</li><li><strong>que (qu')</strong> - le complément d'objet direct (personne ou chose)</li><li><strong>dont</strong> - indique la possession ou la dépendance</li><li><strong>où</strong> - indique le lieu ou le temps</li></ul><p><strong>Exemples:</strong></p><ul><li>L'enfant <strong>qui</strong> court est heureux. (The child who runs is happy)</li><li>Le livre <strong>que</strong> j'aime est sur la table. (The book that I love is on the table)</li><li>La fille <strong>dont</strong> je parlais est mon amie. (The girl whose I was talking about is my friend)</li><li>La maison <strong>où</strong> j'habite est grande. (The house where I live is big)</li></ul><h3>7. LES PRONOMS INTERROGATIFS</h3><p>Les pronoms interrogatifs posent des questions:</p><ul><li><strong>qui</strong> - qui? (pour les personnes)</li><li><strong>que, quoi</strong> - quoi? (pour les choses)</li><li><strong>quel, quelle, quels, quelles</strong> - lequel/laquelle?</li></ul><p><strong>Exemples:</strong></p><ul><li><strong>Qui</strong> est ton ami? (Who is your friend?)</li><li><strong>Qu'</strong>est-ce que tu fais? (What are you doing?)</li><li><strong>Quoi</strong>? Tu dis quoi? (What? You say what?)</li><li><strong>Quel</strong> est ton nom? (What is your name?)</li><li><strong>Quelle</strong> est ta couleur préférée? (What is your favorite color?)</li></ul><h3>8. LES PRONOMS INDÉFINIS</h3><p>Les pronoms indéfinis désignent une personne ou une chose sans la préciser exactement:</p><ul><li><strong>quelqu'un</strong> - une personne</li><li><strong>personne</strong> - aucune personne (négatif)</li><li><strong>quelque chose</strong> - une chose</li><li><strong>rien</strong> - aucune chose (négatif)</li><li><strong>tout</strong> - tout le monde, tout</li><li><strong>tous, toutes</strong> - tout le monde</li><li><strong>certains, certaines</strong> - certains</li><li><strong>plusieurs</strong> - plusieurs</li><li><strong>un, une, des</strong> - (numéral)</li></ul><p><strong>Exemples:</strong></p><ul><li><strong>Quelqu'un</strong> a frappé à la porte. (Someone knocked on the door)</li><li><strong>Personne</strong> n'a vu le film. (Nobody saw the movie)</li><li><strong>J'ai vu quelque chose</strong> de bizarre. (I saw something strange)</li><li><strong>Rien</strong> n'est impossible. (Nothing is impossible)</li><li><strong>Tout</strong> est bien qui finit bien. (All's well that ends well)</li></ul><h3>9. TABLEAU RÉCAPITULATIF COMPLET</h3><p><strong>PERSONNELS SUJETS:</strong> je, tu, il/elle, on, nous, vous, ils/elles</p><p><strong>PERSONNELS COMPLÉMENTS DIRECTS:</strong> me, te, le, la, nous, vous, les</p><p><strong>PERSONNELS COMPLÉMENTS INDIRECTS:</strong> me, te, lui, nous, vous, leur</p><p><strong>POSSESSIFS:</strong> le mien, le tien, le sien, le nôtre, le vôtre, le leur</p><p><strong>DÉMONSTRATIFS:</strong> celui, celle, ceux, celles, celui-ci, celui-là, ce, cela, ça</p><p><strong>RELATIFS:</strong> qui, que, dont, où</p><p><strong>INTERROGATIFS:</strong> qui, que, quoi, quel</p><p><strong>INDÉFINIS:</strong> quelqu'un, personne, quelque chose, rien, tout, tous, certains, plusieurs</p>",
      order: 4,
    };

    const course2c: Course = {
      id: course2cId,
      title: "Les Prépositions",
      description: "Comprendre les prépositions et leurs utilisations",
      category: "grammaire",
      content:
        "<h2>Les Prépositions - Cours Complet</h2><p>Une préposition est un mot invariable (qui ne change jamais) qui relie deux mots ou groupes de mots et indique une relation entre eux. Les prépositions sont essentielles pour montrer les relations dans la phrase.</p><h3>1. DÉFINITION ET RÔLE DES PRÉPOSITIONS</h3><p>Les prépositions établissent des relations entre:</p><ul><li>Un nom et un verbe: \"Je vais <strong>à</strong> l'école\" (relation entre \"vais\" et \"école\")</li><li>Deux noms: \"La maison <strong>de</strong> Marie\" (relation entre \"maison\" et \"Marie\")</li><li>Un verbe et un autre verbe: \"Elle aime <strong>jouer</strong>\" (relation entre verbes)</li><li>Un adjectif et un nom: \"Fatigué <strong>de</strong> travailler\"</li></ul><p><strong>Caractéristique importante:</strong> Les prépositions sont INVARIABLES - elles ne changent jamais de forme!</p><h3>2. PRÉPOSITIONS DE LIEU (OÙ?)</h3><p>Les prépositions de lieu indiquent la position ou l'endroit:</p><h4>Localisation simple:</h4><ul><li><strong>à</strong> - indique un endroit (ville, événement) → Je vais <strong>à</strong> Paris. Je suis <strong>à</strong> l'école.</li><li><strong>de</strong> - provenance, point de départ → Je viens <strong>de</strong> France. Elle revient <strong>de</strong> l'école.</li><li><strong>en</strong> - pays/continent sans article → Je vais <strong>en</strong> Espagne. Il habite <strong>en</strong> Afrique.</li><li><strong>dans</strong> - à l'intérieur de quelque chose → Le livre est <strong>dans</strong> mon sac. Les oiseaux volent <strong>dans</strong> le ciel.</li><li><strong>sur</strong> - au-dessus de, en contact avec → Le chat dort <strong>sur</strong> le canapé. J'ai mis le livre <strong>sur</strong> la table.</li><li><strong>sous</strong> - au-dessous de → Le chat se cache <strong>sous</strong> le lit. Les racines sont <strong>sous</strong> la terre.</li><li><strong>entre</strong> - au milieu de deux choses → L'école est <strong>entre</strong> la mairie et l'église. Assieds-toi <strong>entre</strong> Marie et Jean.</li></ul><h4>Localisation complexe:</h4><ul><li><strong>devant</strong> - facing, in front of → Je suis <strong>devant</strong> l'école. L'école est <strong>devant</strong> chez moi.</li><li><strong>derrière</strong> - behind → Je suis <strong>derrière</strong> la porte. Le parc est <strong>derrière</strong> la maison.</li><li><strong>à côté de</strong> - next to → Je suis assis <strong>à côté de</strong> toi. La pharmacie est <strong>à côté de</strong> l'école.</li><li><strong>près de</strong> - near → Habites-tu <strong>près de</strong> l'école? Elle est <strong>près de</strong> la gare.</li><li><strong>loin de</strong> - far from → L'école est <strong>loin de</strong> ma maison. Paris est <strong>loin de</strong> ici.</li><li><strong>chez</strong> - at someone's place/home → Je vais <strong>chez</strong> Marie. Elle habite <strong>chez</strong> ses grands-parents.</li><li><strong>jusqu'à</strong> - until, as far as → Je marche <strong>jusqu'à</strong> l'école. Elle a attendu <strong>jusqu'à</strong> minuit.</li><li><strong>à travers</strong> - through → Nous marchons <strong>à travers</strong> le parc. On voit la lumière <strong>à travers</strong> la fenêtre.</li><li><strong>par</strong> - by means of, through → Je passe <strong>par</strong> la rue principale. Elle entre <strong>par</strong> la porte.</li></ul><p><strong>Exemples complets:</strong></p><ul><li>J'habite <strong>à</strong> Paris <strong>près de</strong> la gare.</li><li>Le stylo est <strong>dans</strong> le tiroir <strong>à côté de</strong> l'école.</li><li>Elle vient <strong>de</strong> l'école et elle va <strong>chez</strong> elle.</li></ul><h3>3. PRÉPOSITIONS DE TEMPS (QUAND?)</h3><p>Les prépositions de temps indiquent quand quelque chose se passe:</p><h4>Moment précis:</h4><ul><li><strong>à</strong> - à une heure précise → Le cours commence <strong>à</strong> 9 heures. Je te vois <strong>à</strong> 14h.</li><li><strong>en</strong> - mois, année, saison → Je suis né <strong>en</strong> 2010. Nous allons <strong>en</strong> vacances <strong>en</strong> juillet.</li><li><strong>le</strong> - jour précis → Je viens <strong>le</strong> lundi. L'examen est <strong>le</strong> 15 mai.</li></ul><h4>Durée/Période:</h4><ul><li><strong>pendant</strong> - during, for a period → Il a plu <strong>pendant</strong> une heure. Je travaille <strong>pendant</strong> les vacances.</li><li><strong>depuis</strong> - since, from → J'étudie le français <strong>depuis</strong> 2 ans. Il habite ici <strong>depuis</strong> longtemps.</li><li><strong>de... à...</strong> - from... to... → Je suis à l'école <strong>de</strong> 8h <strong>à</strong> 17h. L'été est <strong>de</strong> juin <strong>à</strong> août.</li></ul><h4>Avant/Après:</h4><ul><li><strong>avant</strong> - before → Arrive <strong>avant</strong> 9h. Je le ferai <strong>avant</strong> demain.</li><li><strong>après</strong> - after → Il arrive <strong>après</strong> moi. <strong>Après</strong> l'école, je fais mes devoirs.</li><li><strong>vers</strong> - around, approximately → Il arrivera <strong>vers</strong> 10h. Nous nous verrons <strong>vers</strong> ce jour.</li></ul><p><strong>Exemples complets:</strong></p><ul><li>Le film commence <strong>à</strong> 20h et finit <strong>vers</strong> 22h.</li><li>Elle étudie <strong>depuis</strong> le matin <strong>jusqu'à</strong> le soir.</li><li>Je serai <strong>en</strong> vacances <strong>de</strong> juillet <strong>à</strong> août.</li><li><strong>Pendant</strong> les vacances, j'aime voyager.</li></ul><h3>4. PRÉPOSITIONS DE CAUSE/RAISON (POURQUOI?)</h3><p>Les prépositions de cause/raison expliquent la raison ou la cause de quelque chose:</p><ul><li><strong>à cause de</strong> - because of (negative reason) → Il est absent <strong>à cause de</strong> la maladie. Nous avons annulé <strong>à cause de</strong> la pluie.</li><li><strong>grâce à</strong> - thanks to (positive reason) → J'ai réussi <strong>grâce à</strong> son aide. Elle a guéri <strong>grâce à</strong> le médecin.</li><li><strong>pour</strong> - for, in order to → Je travaille <strong>pour</strong> gagner de l'argent. Elle étudie <strong>pour</strong> devenir professeur.</li><li><strong>par</strong> - by (agent in passive sentences) → Le gâteau a été fait <strong>par</strong> Marie. Le livre est écrit <strong>par</strong> cet auteur.</li></ul><p><strong>Exemples complets:</strong></p><ul><li>Je ne vais pas à l'école <strong>à cause de</strong> ma maladie.</li><li><strong>Grâce à</strong> son travail, il a réussi l'examen.</li><li>Elle va <strong>pour</strong> voir ses amis.</li></ul><h3>5. PRÉPOSITIONS DE MANIÈRE/MOYEN (COMMENT?)</h3><p>Les prépositions de manière indiquent comment quelque chose se passe:</p><ul><li><strong>avec</strong> - with, by means of → Je viens <strong>avec</strong> mon ami. Elle parle <strong>avec</strong> enthousiasme. Je mange <strong>avec</strong> une fourchette.</li><li><strong>sans</strong> - without → Je pars <strong>sans</strong> mon manteau. Le café <strong>sans</strong> sucre est amer. Il arrive <strong>sans</strong> faire bruit.</li><li><strong>en</strong> - by, in → Je vais à l'école <strong>en</strong> autobus. Il parle <strong>en</strong> français. Elle court <strong>en</strong> criant.</li><li><strong>par</strong> - by, through → J'y vais <strong>par</strong> le train. Il apprend <strong>par</strong> l'expérience.</li><li><strong>comme</strong> - like, as → Elle est <strong>comme</strong> sa mère. Je veux travailler <strong>comme</strong> professeur.</li></ul><p><strong>Exemples complets:</strong></p><ul><li>Je vais à l'école <strong>à pied</strong> ou <strong>en</strong> autobus.</li><li>Elle parle <strong>avec</strong> ses amis <strong>sans</strong> faire bruit.</li><li>Je mange mon gâteau <strong>avec</strong> plaisir.</li></ul><h3>6. PRÉPOSITIONS DE RELATION/POSSESSION</h3><ul><li><strong>de</strong> - of, belonging to → La maison <strong>de</strong> Marie. Le livre <strong>de</strong> l'enfant. C'est <strong>de</strong> qui?</li><li><strong>entre</strong> - between (relationship) → C'est un secret <strong>entre</strong> nous.</li><li><strong>à</strong> - to, belonging to → Ce livre est <strong>à</strong> moi. Cette maison est <strong>à</strong> elle.</li></ul><h3>7. AUTRES PRÉPOSITIONS IMPORTANTES</h3><ul><li><strong>contre</strong> - against → Elle va <strong>contre</strong> ses parents. Le mur <strong>contre</strong> la maison.</li><li><strong>parmi</strong> - among → <strong>Parmi</strong> ces enfants, lequel est ton ami?</li><li><strong>selon</strong> - according to → <strong>Selon</strong> le professeur, c'est difficile. <strong>Selon</strong> moi, c'est facile.</li><li><strong>malgré</strong> - despite, in spite of → <strong>Malgré</strong> la pluie, nous avons joué. <strong>Malgré</strong> ses efforts, il a échoué.</li><li><strong>hormis</strong> - except, besides → Tous les enfants sont venus, <strong>hormis</strong> Marie.</li></ul><h3>8. ATTENTION: PRÉPOSITIONS SUIVIES D'ARTICLES</h3><p>Certaines prépositions se combinent avec les articles (à + le = au, de + le = du, etc.):</p><ul><li><strong>à + le = au</strong> → Je vais <strong>au</strong> parc. (à + le parc)</li><li><strong>à + les = aux</strong> → Elle parle <strong>aux</strong> enfants. (à + les enfants)</li><li><strong>de + le = du</strong> → Il vient <strong>du</strong> Canada. (de + le Canada)</li><li><strong>de + les = des</strong> → C'est le livre <strong>des</strong> enfants. (de + les enfants)</li></ul><h3>9. TABLEAU RÉCAPITULATIF</h3><p><strong>LIEU:</strong> à, de, en, dans, sur, sous, devant, derrière, entre, chez, près de, loin de, à côté de, jusqu'à</p><p><strong>TEMPS:</strong> à, en, le, pendant, depuis, de...à, avant, après, vers</p><p><strong>CAUSE:</strong> à cause de, grâce à, pour, par</p><p><strong>MANIÈRE:</strong> avec, sans, en, par, comme</p><p><strong>AUTRE:</strong> contre, parmi, selon, malgré, hormis</p>",
      order: 5,
    };

    const course3: Course = {
      id: course3Id,
      title: "Structure du texte narratif",
      description: "Comprenez les éléments d'un bon texte narratif",
      category: "textes",
      content:
        "<h3>Le Texte Narratif</h3><p>Un texte narratif raconte une histoire avec:</p><ul><li>Début (situation initiale)</li><li>Nœud (conflit ou événement)</li><li>Dénouement (résolution)</li></ul>",
      order: 3,
    };

    this.courses.set(course1Id, course1);
    this.courses.set(course2Id, course2);
    this.courses.set(course2aId, course2a);
    this.courses.set(course2bId, course2b);
    this.courses.set(course2cId, course2c);
    this.courses.set(course3Id, course3);

    // No grammar exercises in this section - they go in the Exercices tab

    // Create exercises for reading texts
    const exercise4Id = randomUUID();
    const exercise5Id = randomUUID();

    const exercise4: Exercise = {
      id: exercise4Id,
      courseId: course3Id,
      title: "Lecture: Analyser un texte narratif",
      description: "Lisez et analysez un texte narratif",
      type: "reading",
      order: 1,
    };

    const exercise5: Exercise = {
      id: exercise5Id,
      courseId: course3Id,
      title: "Écriture: Créer un texte narratif",
      description: "Écrivez votre propre texte narratif",
      type: "writing",
      order: 2,
    };

    this.exercises.set(exercise4Id, exercise4);
    this.exercises.set(exercise5Id, exercise5);

    const question4: Question = {
      id: randomUUID(),
      exerciseId: exercise4Id,
      title: "Question 1",
      text: 'Dans un texte narratif, quel élément décrit la situation au début?',
      type: "multiple_choice",
      options: JSON.stringify(["La situation initiale", "Le nœud", "Le dénouement", "La conclusion"]),
      correctAnswer: "La situation initiale",
      order: 1,
    };

    // Add more courses for different text types
    const course4Id = randomUUID();
    const course5Id = randomUUID();
    const course6Id = randomUUID();
    const course7Id = randomUUID();
    const course8Id = randomUUID();

    const course4: Course = {
      id: course4Id,
      title: "Texte descriptif",
      description: "Analysez les descriptions détaillées et les techniques utilisées",
      category: "lecture_reading",
      content:
        "<h3>Le Texte Descriptif</h3><p>Un texte descriptif peint un tableau des choses. Il peut décrire un lieu, une personne, un objet ou une situation.</p>",
      order: 4,
    };

    const course5: Course = {
      id: course5Id,
      title: "Texte explicatif",
      description: "Comprenez comment expliquer un phénomène ou un concept",
      category: "lecture_reading",
      content:
        "<h3>Le Texte Explicatif</h3><p>Un texte explicatif explique un phénomène, un concept ou un processus de manière claire et logique.</p>",
      order: 5,
    };

    const course6: Course = {
      id: course6Id,
      title: "Texte argumentatif",
      description: "Maîtrisez les techniques de persuasion et d'argumentation",
      category: "lecture_reading",
      content:
        "<h3>Le Texte Argumentatif</h3><p>Un texte argumentatif vise à convaincre le lecteur en présentant des arguments soutenus par des preuves.</p>",
      order: 6,
    };

    const course7: Course = {
      id: course7Id,
      title: "Texte informatif",
      description: "Identifiez les informations clés et la structure des textes informatifs",
      category: "lecture_reading",
      content:
        "<h3>Le Texte Informatif</h3><p>Un texte informatif transmet des informations factuelles sur un sujet spécifique.</p>",
      order: 7,
    };

    this.courses.set(course4Id, course4);
    this.courses.set(course5Id, course5);
    this.courses.set(course6Id, course6);
    this.courses.set(course7Id, course7);

    const question5: Question = {
      id: randomUUID(),
      exerciseId: exercise5Id,
      title: "Exercice d'écriture",
      text: "Écrivez un court texte narratif (5-10 phrases) sur une aventure, un événement intéressant ou une histoire imaginaire.",
      type: "text",
      correctAnswer: "réponse libre",
      order: 1,
    };

    // Reading exercises for different text types
    // Narratif
    const readingExercise1Id = randomUUID();
    const readingExercise1: Exercise = {
      id: readingExercise1Id,
      courseId: course3Id,
      title: "Lecture: Une journée à la plage",
      description: "Lisez le texte narratif et répondez aux questions",
      type: "text",
      order: 3,
    };

    // Descriptif
    const readingExercise2Id = randomUUID();
    const readingExercise2: Exercise = {
      id: readingExercise2Id,
      courseId: course4Id,
      title: "Lecture: La vieille maison",
      description: "Lisez la description et répondez aux questions",
      type: "text",
      order: 1,
    };

    // Explicatif
    const readingExercise3Id = randomUUID();
    const readingExercise3: Exercise = {
      id: readingExercise3Id,
      courseId: course5Id,
      title: "Lecture: Comment pousse une plante?",
      description: "Lisez le texte explicatif et répondez aux questions",
      type: "text",
      order: 1,
    };

    // Argumentatif
    const readingExercise4Id = randomUUID();
    const readingExercise4: Exercise = {
      id: readingExercise4Id,
      courseId: course6Id,
      title: "Lecture: Pourquoi il faut lire chaque jour",
      description: "Lisez l'argument et répondez aux questions",
      type: "text",
      order: 1,
    };

    // Informatif
    const readingExercise5Id = randomUUID();
    const readingExercise5: Exercise = {
      id: readingExercise5Id,
      courseId: course7Id,
      title: "Lecture: Les animaux de la forêt",
      description: "Lisez l'article informatif et répondez aux questions",
      type: "text",
      order: 1,
    };

    this.exercises.set(readingExercise1Id, readingExercise1);
    this.exercises.set(readingExercise2Id, readingExercise2);
    this.exercises.set(readingExercise3Id, readingExercise3);
    this.exercises.set(readingExercise4Id, readingExercise4);
    this.exercises.set(readingExercise5Id, readingExercise5);

    // Reading questions
    // Narratif
    const readQ1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Texte: Une journée à la plage",
      text: "Ce matin, Marie et son frère Thomas se sont réveillés tôt avec excitation. Leurs parents les emmenaient à la plage! En arrivant, ils ont vu les vagues se crasher sur le sable doré. Thomas a couru vers l'eau tandis que Marie a commencé à construire un château de sable. Après quelques heures, ils sont rentrés à la maison, épuisés mais très heureux de cette belle journée.\n\nQuestion 1: Qui est allé à la plage?",
      type: "multiple_choice",
      options: JSON.stringify(["Marie et Thomas", "Seulement Marie", "Seulement Thomas", "Les parents seuls"]),
      correctAnswer: "Marie et Thomas",
      order: 1,
    };

    const readQ2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 2",
      text: "Que faisait Thomas à la plage?",
      type: "multiple_choice",
      options: JSON.stringify(["Il nageait", "Il courrait vers l'eau", "Il dormait", "Il lisait"]),
      correctAnswer: "Il courrait vers l'eau",
      order: 2,
    };

    // Descriptif
    const readQ3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Texte: La vieille maison",
      text: "La maison était vieille et isolée, perchée au sommet de la colline. Son toit pointu était couvert de tuiles rouges usées par le temps. Les murs de pierre grise, couverts de lierre, racontaient des histoires de plusieurs siècles. Les fenêtres à petits carreaux brillaient faiblement dans la lumière du coucher de soleil. Autour, un jardin sauvage s'étendait avec des fleurs blanches et jaunes.\n\nQuestion 1: De quelle couleur était le toit de la maison?",
      type: "multiple_choice",
      options: JSON.stringify(["Gris", "Rouges", "Blanc", "Jaune"]),
      correctAnswer: "Rouges",
      order: 1,
    };

    const readQ4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 2",
      text: "Quel était l'état du toit?",
      type: "multiple_choice",
      options: JSON.stringify(["Neuf et brillant", "Usé par le temps", "Peint récemment", "Couvert de neige"]),
      correctAnswer: "Usé par le temps",
      order: 2,
    };

    // Explicatif
    const readQ5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Texte: Comment pousse une plante?",
      text: "Une plante a besoin de trois choses essentielles pour pousser: la lumière du soleil, l'eau et un sol riche en nutriments. Tout d'abord, les racines de la plante absorbent l'eau et les minéraux du sol. Ensuite, la plante utilise la lumière du soleil pour créer son propre nourriture par photosynthèse. Finalement, la tige et les feuilles poussent, et la plante grandit. Ce processus peut durer plusieurs semaines ou plusieurs mois selon le type de plante.\n\nQuestion 1: Combien de choses essentielles une plante a-t-elle besoin?",
      type: "multiple_choice",
      options: JSON.stringify(["1", "2", "3", "4"]),
      correctAnswer: "3",
      order: 1,
    };

    const readQ6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 2",
      text: "Quel est le nom du processus par lequel la plante crée sa nourriture?",
      type: "multiple_choice",
      options: JSON.stringify(["L'absorption", "La photosynthèse", "L'évaporation", "La croissance"]),
      correctAnswer: "La photosynthèse",
      order: 2,
    };

    // Argumentatif
    const readQ7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Texte: Pourquoi il faut lire chaque jour",
      text: "Il est très important de lire chaque jour. D'abord, la lecture enrichit notre vocabulaire et améliore notre façon de communiquer. Ensuite, lire stimule notre cerveau et nous aide à mieux comprendre le monde. De plus, la lecture est une excellent moyen de se détendre après une journée stressante. Enfin, les livres nous permettent de voyager dans des mondes imaginaires et de découvrir de nouvelles idées. Pour toutes ces raisons, nous devrions tous faire de la lecture une partie importante de notre routine quotidienne.\n\nQuestion 1: Quel est le premier argument présenté?",
      type: "multiple_choice",
      options: JSON.stringify(["La lecture enrichit notre vocabulaire", "La lecture nous détend", "La lecture stimule le cerveau", "La lecture coûte cher"]),
      correctAnswer: "La lecture enrichit notre vocabulaire",
      order: 1,
    };

    const readQ8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 2",
      text: "Pourquoi la lecture est-elle un bon moyen de se détendre?",
      type: "multiple_choice",
      options: JSON.stringify(["C'est amusant", "C'est gratuit", "Cela nous aide à oublier le stress", "C'est rapide"]),
      correctAnswer: "Cela nous aide à oublier le stress",
      order: 2,
    };

    // Informatif
    const readQ9: Question = {
      id: randomUUID(),
      exerciseId: readingExercise5Id,
      title: "Texte: Les animaux de la forêt",
      text: "La forêt est l'habitat de nombreux animaux fascinants. Les cerfs sont des herbivores élégants qui se nourrissent de feuilles et d'herbe. Les renards, quant à eux, sont des carnivores intelligents qui chassent les petits animaux. Les écureuils grimpent dans les arbres et collectent des noisettes. Les loups vivent en meutes et sont des prédateurs puissants. Les oiseaux de différentes espèces font leurs nids dans les arbres et chantent pour communiquer. Tous ces animaux jouent un rôle important dans l'équilibre de l'écosystème forestier.\n\nQuestion 1: Que mangent les cerfs?",
      type: "multiple_choice",
      options: JSON.stringify(["Des petits animaux", "Des feuilles et de l'herbe", "Des poissons", "Des insectes"]),
      correctAnswer: "Des feuilles et de l'herbe",
      order: 1,
    };

    const readQ10: Question = {
      id: randomUUID(),
      exerciseId: readingExercise5Id,
      title: "Question 2",
      text: "Comment vivent les loups?",
      type: "multiple_choice",
      options: JSON.stringify(["Seuls", "En paires", "En meutes", "En colonies"]),
      correctAnswer: "En meutes",
      order: 2,
    };

    this.questions.set(question4.id, question4);
    this.questions.set(question5.id, question5);
    this.questions.set(readQ1.id, readQ1);
    this.questions.set(readQ2.id, readQ2);
    this.questions.set(readQ3.id, readQ3);
    this.questions.set(readQ4.id, readQ4);
    this.questions.set(readQ5.id, readQ5);
    this.questions.set(readQ6.id, readQ6);
    this.questions.set(readQ7.id, readQ7);
    this.questions.set(readQ8.id, readQ8);
    this.questions.set(readQ9.id, readQ9);
    this.questions.set(readQ10.id, readQ10);

    // Create assignment
    const assignment: Assignment = {
      id: randomUUID(),
      teacherId,
      studentId,
      courseId: course1Id,
    };
    this.assignments.set(assignment.id, assignment);

    // Create initial progress
    const progress: StudentProgress = {
      id: randomUUID(),
      studentId,
      courseId: course1Id,
      progressPercentage: 0,
      completed: false,
    };
    this.progress.set(progress.id, progress);
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

  // Questions
  async getQuestion(id: string): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getQuestionsByExercise(exerciseId: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter((q) => q.exerciseId === exerciseId)
      .sort((a, b) => a.order - b.order);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = randomUUID();
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  // Student Responses
  async createResponse(insertResponse: InsertStudentResponse): Promise<StudentResponse> {
    const id = randomUUID();
    const response: StudentResponse = { ...insertResponse, id };
    this.responses.set(id, response);

    // Update progress
    const question = await this.getQuestion(insertResponse.questionId);
    if (question) {
      const exercise = await this.getExercise(question.exerciseId);
      if (exercise) {
        const courseId = exercise.courseId;
        const exercises = await this.getExercisesByCourse(courseId);
        let totalQuestions = 0;
        let correctAnswers = 0;

        for (const ex of exercises) {
          const qs = await this.getQuestionsByExercise(ex.id);
          totalQuestions += qs.length;
          for (const q of qs) {
            const studentResponse = Array.from(this.responses.values()).find(
              (r) => r.studentId === insertResponse.studentId && r.questionId === q.id
            );
            if (studentResponse?.isCorrect) {
              correctAnswers++;
            }
          }
        }

        const progressPercentage = Math.round((correctAnswers / totalQuestions) * 100);
        await this.updateProgress(insertResponse.studentId, courseId, progressPercentage);
      }
    }

    return response;
  }

  async getResponsesByStudent(studentId: string): Promise<StudentResponse[]> {
    return Array.from(this.responses.values()).filter(
      (r) => r.studentId === studentId
    );
  }

  async getResponsesByQuestion(questionId: string): Promise<StudentResponse[]> {
    return Array.from(this.responses.values()).filter(
      (r) => r.questionId === questionId
    );
  }

  // Student Progress
  async getProgress(
    studentId: string,
    courseId: string
  ): Promise<StudentProgress | undefined> {
    return Array.from(this.progress.values()).find(
      (p) => p.studentId === studentId && p.courseId === courseId
    );
  }

  async updateProgress(
    studentId: string,
    courseId: string,
    progressPercentage: number
  ): Promise<StudentProgress> {
    const existing = await this.getProgress(studentId, courseId);
    if (existing) {
      existing.progressPercentage = progressPercentage;
      if (progressPercentage === 100) {
        existing.completed = true;
      }
      return existing;
    }

    const id = randomUUID();
    const progress: StudentProgress = {
      id,
      studentId,
      courseId,
      progressPercentage,
      completed: progressPercentage === 100,
    };
    this.progress.set(id, progress);
    return progress;
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
}

export const storage = new MemStorage();
