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
        "<h2>Le Texte Narratif - Cours Complet (5 Étapes)</h2><p>Un texte narratif raconte une histoire, un événement, une aventure ou une expérience dans l'ordre où les choses se sont passées. C'est le type de texte le plus courant: contes, romans, anecdotes, etc.</p><h3>1. LES 5 ÉTAPES FONDAMENTALES DU TEXTE NARRATIF</h3><p>Tout texte narratif bien construit suit une structure en cinq étapes essentielles:</p><h4>ÉTAPE 1: LA SITUATION INITIALE (L'exposition)</h4><p>C'est le début du récit. Elle présente le cadre et les personnages avant que l'action commence:</p><ul><li><strong>Les personnages:</strong> Qui sont les personnes dans l'histoire? (le héros, les amis, les ennemis, les alliés...)</li><li><strong>Le lieu:</strong> Où se passe l'histoire? (la maison, l'école, la forêt, la ville, un village imaginaire...)</li><li><strong>Le temps:</strong> Quand se passe l'histoire? (hier, autrefois, une belle journée d'été, un soir d'hiver...)</li><li><strong>La situation normale:</strong> Comment les choses étaient avant que l'action commence? (la vie tranquille, l'école, le travail...)</li></ul><p><strong>Exemple:</strong> \"Sarah était une fille de 15 ans qui vivait dans une petite maison près de la forêt. Elle aimait l'école et passait ses après-midi à lire dans sa chambre. Un jeudi soir, comme tous les jours, elle rentra de l'école. Tout semblait normal...\"</p><h4>ÉTAPE 2: L'ÉLÉMENT DÉCLENCHEUR (L'inciting incident)</h4><p>C'est l'événement qui lance l'action et change tout! Il crée le problème ou la situation nouvelle:</p><ul><li><strong>Un événement surprenant:</strong> Quelque chose d'inattendu et important arrive</li><li><strong>Un problème ou un conflit apparaît:</strong> Une difficulté que le personnage principal doit affronter</li><li><strong>Une invitation ou une opportunité:</strong> Le héros reçoit un appel à l'aventure</li><li><strong>Un changement dramatique:</strong> La situation normale disparaît</li></ul><p><strong>Exemple:</strong> \"Ce jour-là, en rentrant de l'école, Sarah a trouvé une lettre mystérieuse sous sa porte. La lettre était écrite en code secret et portait le sceau d'une ancienne organisation.\"</p><h4>ÉTAPE 3: LE DÉVELOPPEMENT (L'action ascendante)</h4><p>Les événements s'enchaînent! Le héros tente de résoudre le problème, rencontre des obstacles, fait des découvertes:</p><ul><li><strong>Les obstacles:</strong> Le personnage principal rencontre des difficultés et des défis</li><li><strong>Les développements:</strong> Les événements s'accumulent et le suspense augmente</li><li><strong>Les révélations:</strong> Le personnage apprend de nouvelles choses</li><li><strong>Les tentatives:</strong> Le héros essaie de résoudre le problème de différentes façons</li></ul><p><strong>Exemple:</strong> \"Sarah décida de décoder le message. Elle passa trois jours à chercher la clé du code. Finalement, elle découvrit qu'il s'agissait d'un message d'un groupe de détectives qui protégeaient les trésors cachés de la région. Ils lui demandaient d'examiner une maison abandonnée où il y avait peut-être un indice important.\"</p><h4>ÉTAPE 4: LE CLIMAX (Le point culminant)</h4><p>C'est le moment le plus intense et le plus critique! Le point de non-retour:</p><ul><li><strong>Le moment décisif:</strong> Le personnage fait un choix crucial qui change tout</li><li><strong>Le plus grand défi:</strong> Le pire est sur le point d'arriver ou arrive maintenant</li><li><strong>La plus grande tension:</strong> Le lecteur se demande: \"Que va-t-il arriver?\" ou \"Réussira-t-il?\"</li><li><strong>La confrontation finale:</strong> Le héros fait face à son plus grand obstacle</li></ul><p><strong>Exemple:</strong> \"Sarah entra dans la maison abandonnée. Soudain, elle entendit des pas. Quelqu'un la suivait! Elle courut vers le fond de la maison et se cacha derrière une porte. Son cœur battait très vite. Mais découvrit que la personne était un autre membre du groupe de détectives qui cherchait le même trésor qu'elle!\"</p><h4>ÉTAPE 5: LA RÉSOLUTION (Le dénouement)</h4><p>L'histoire se termine! Les conflits se résolvent et nous apprenons les conséquences:</p><ul><li><strong>La solution:</strong> Le problème est finalement résolu</li><li><strong>Les conséquences:</strong> Ce qui s'est vraiment passé et ce que cela signifie</li><li><strong>La leçon ou la morale:</strong> Parfois, on apprend quelque chose de cette histoire</li><li><strong>La fin de l'histoire:</strong> La vie des personnages après l'action principale</li><li><strong>Le retour à la normal (ou une nouvelle normal):</strong> Comment la vie a changé?</li></ul><p><strong>Exemple:</strong> \"Ensemble, Sarah et le détective ont trouvé le trésor caché: une ancienne bibliothèque secrète contenant des manuscrits rares. Le groupe de détectives décida de créer un musée pour protéger ces trésors. Sarah devint la plus jeune directrice de musée de sa région, réalisant ainsi son plus grand rêve!\"</p><h3>2. LES ÉLÉMENTS CLÉS DU TEXTE NARRATIF</h3><h4>A) Les Personnages</h4><ul><li><strong>Personnage principal (Héros):</strong> Celui autour de qui tourne l'histoire et qui change au cours du récit</li><li><strong>Personnages secondaires:</strong> Les amis, la famille, les ennemis, les alliés du héros</li><li><strong>Antagoniste:</strong> La force contraire (peut être une personne, une nature, une maladie...)</li><li><strong>Caractéristiques:</strong> Leur apparence, leur personnalité, leurs traits de caractère, leurs motivations</li></ul><h4>B) Le Cadre (Temps et Lieu)</h4><ul><li><strong>Lieu:</strong> Précis (une ville réelle) ou vague (un monde imaginaire), peut être réel ou imaginaire</li><li><strong>Temps:</strong> Passé, présent, futur; peut être indiqué directement (\"Il était une fois\") ou non</li><li><strong>Contexte:</strong> Les circonstances générales (époque historique, situation sociale, saison...)</li></ul><h4>C) L'Action</h4><ul><li><strong>Les événements:</strong> Ce qui se passe, dans quel ordre (la chaîne de causalité)</li><li><strong>Le rythme:</strong> Rapide et palpitant (action constante), ou lent et réfléchi (peu d'action)</li><li><strong>Le Suspense:</strong> Les moments d'incertitude qui gardent le lecteur intéressé</li></ul><h4>D) La Voix narrative</h4><ul><li><strong>1ère personne:</strong> \"J'ai découvert une grotte cachée...\" (je, nous racontent l'histoire personnellement)</li><li><strong>3e personne:</strong> \"Maxime a découvert une grotte cachée...\" (il, elle, ils racontent l'histoire, plus objectif)</li><li><strong>Narrateur omniscient:</strong> Le narrateur connaît tout, y compris les pensées secrètes de tous les personnages</li><li><strong>Narrateur limité:</strong> Le narrateur ne connaît que ce qu'un seul personnage sait</li></ul><h3>3. LES TEMPS UTILISÉS DANS LE TEXTE NARRATIF</h3><p>Le texte narratif utilise généralement:</p><ul><li><strong>Passé composé:</strong> Pour les événements principaux (\"Mathieu a trouvé le coffre\")</li><li><strong>Imparfait:</strong> Pour les descriptions de fond et les actions habituelles (\"Il faisait beau, les oiseaux chantaient\")</li><li><strong>Présent narratif:</strong> Parfois, pour rendre l'histoire plus vivante et dramatique (\"Mathieu arrive au sommet... Il voit le trésor!\")</li><li><strong>Passé simple:</strong> Dans les textes plus formels ou littéraires (rare en français moderne, \"Il entra dans la pièce\")</li></ul><h3>4. LES TECHNIQUES DE NARRATION</h3><h4>A) Créer du Suspense</h4><ul><li>Poser des questions sans répondre tout de suite (\"Pourquoi la lettre était-elle arrivée?\")</li><li>Utiliser du mystère et de l'incertitude (\"Quelque chose d'étrange se passait...\")</li><li>Ralentir le rythme avant un moment important (descriptions longues avant l'action)</li><li>Accélérer le rythme lors des scènes d'action</li></ul><h4>B) Développer les Personnages</h4><ul><li>Montrer leurs pensées et leurs sentiments (\"Sarah se demandait ce que signifiait la lettre\")</li><li>Les faire évoluer au cours de l'histoire (au début, elle était timide; à la fin, elle était courageuse)</li><li>Montrer comment ils réagissent aux événements différemment</li></ul><h4>C) Créer une Atmosphère</h4><ul><li>Utiliser des descriptions sensorielles (sons, couleurs, odeurs, textures, sensations)</li><li>Établir le ton (joyeux, sombre, drôle, effrayant, mystérieux)</li></ul><h3>5. EXEMPLE COMPLET: LES 5 ÉTAPES D'UNE HISTOIRE</h3><p><strong>\"L'Aventure du Trésor Perdu\"</strong></p><p><strong>ÉTAPE 1 - Situation initiale:</strong> \"Maxime était un jeune garçon de douze ans qui vivait en Bretagne, une région côtière de France. C'était un garçon courageux qui aimait explorer. Sa vie était tranquille: école, devoirs, jeux avec ses amis. Un matin ensoleillé, il se promenait seul sur la plage quand quelque chose a attiré son attention.\"</p><p><strong>ÉTAPE 2 - Élément déclencheur:</strong> \"En cherchant des coquillages, Maxime trouva une vieille bouteille en verre enterrée dans le sable. À l'intérieur, il y avait une lettre jaunie et une vieille carte du trésor! La lettre disait: 'Celui qui trouvera ce message devra suivre les indices sur cette carte. Un trésor ancien t'attend quelque part dans les terres.'\"</p><p><strong>ÉTAPE 3 - Développement:</strong> \"Excité et nerveux, Maxime étudia la carte. Elle montrait un chemin à travers la forêt mystérieuse qui surplombait la plage. Mais ses parents lui avaient toujours dit d'éviter cette forêt dangereuse. Il demanda à son meilleur ami Thomas de l'accompagner. Ensemble, ils rassemblèrent du matériel: une lampe torche, une boussole, un sac à dos. Ils étudia la carte pendant trois jours pour la comprendre. Finalement, ils se sentirent prêts à partir.\"</p><p><strong>ÉTAPE 4 - Climax:</strong> \"Après deux heures de marche difficile dans la forêt dense, Maxime et Thomas trouvèrent l'endroit marqué sur la carte. Mais là, ils découvrirent quelque chose d'inattendu: un ancien pirate nommé Jean-Pierre était déjà là, cherchant aussi le trésor! Jean-Pierre semblait dangereux. Il regarda les garçons avec colère. 'Ce trésor est à moi!' cria-t-il. Maxime dut penser vite. Il réalisa que Jean-Pierre ne pouvait pas lire la carte correctement. Maxime proposa un accord: ils cherchaient le trésor ensemble, et partageraient la découverte.\"</p><p><strong>ÉTAPE 5 - Résolution:</strong> \"À la surprise de Maxime, Jean-Pierre accepta. Ensemble, les trois explorateurs trouvèrent un vieux coffre enterré sous les racines d'un énorme arbre. À l'intérieur: des pièces d'or anciennes, des bijoux précieux, et des documents historiques importants. Jean-Pierre, ému, raconta qu'il cherchait ce trésor depuis 40 ans pour honorer la mémoire de son ancêtre, le vrai pirate. Les trois hommes (car Maxime se sentait maintenant homme) décidèrent de donner le trésor au musée de la région. Maxime devint célèbre comme le plus jeune archéologue de France, et Jean-Pierre trouva enfin la paix.\"</p><h3>6. DIAGRAMME DES 5 ÉTAPES</h3><p><strong>📊 Intensity Graph:</strong></p><p>Situation initiale (calm) ➜ Élément déclencheur (problem!) ➜ Développement (tension rises) ➜ Climax (maximum tension) ➜ Résolution (falling, ending)</p><h3>7. EXERCICES PRATIQUES</h3><p><strong>Exercice 1:</strong> Identifiez les 5 étapes dans une histoire que vous connaissez.</p><p><strong>Exercice 2:</strong> Créez vos propres personnages, situation initiale et élément déclencheur.</p><p><strong>Exercice 3:</strong> Écrivez une courte histoire (200-300 mots) en suivant les 5 étapes narratives.</p><p><strong>Exercice 4:</strong> Trouvez le climax dans une histoire et expliquez pourquoi c'est le moment le plus intense.</p>",
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

    // Additional orthography
    const orthography6Id = randomUUID();

    // Ponctuation courses
    const punctuation1Id = randomUUID();
    const punctuation2Id = randomUUID();

    const course4: Course = {
      id: course4Id,
      title: "Texte descriptif",
      description: "Analysez les descriptions détaillées et les techniques utilisées",
      category: "lecture_reading",
      content:
        "<h2>Le Texte Descriptif - Cours Complet</h2><p>Un texte descriptif \"peint un tableau\" des choses. Son objectif principal est de faire connaître au lecteur comment quelque chose ou quelqu'un ressemble. C'est décrire, c'est-à-dire présenter les détails, les caractéristiques, les propriétés.</p><h3>1. OBJECTIFS DE LA DESCRIPTION</h3><p>Le texte descriptif vise à:</p><ul><li><strong>Faire voir:</strong> Permettre au lecteur d'imaginer clairement la chose décrite</li><li><strong>Faire sentir:</strong> Créer des sensations et des émotions chez le lecteur</li><li><strong>Informer:</strong> Donner des informations détaillées et exactes</li><li><strong>Créer une atmosphère:</strong> Établir une ambiance (gaieté, tristesse, mystère, peur)</li></ul><h3>2. LES TYPES DE DESCRIPTIONS</h3><h4>A) Description d'un Lieu</h4><p>Décrire un paysage, un bâtiment, une ville, une pièce, etc.</p><p><strong>Exemple:</strong> \"Le jardin du château était magnifique. Les roses rouges grimpaient sur les murs de pierre blanche. Des fontaines en marbre blanc jaillissaient au centre des parterres. Les allées étaient bordées de buis taillés en formes d'animaux. On entendait le chant mélodieux des oiseaux dans les grands chênes anciens.\"</p><h4>B) Description d'une Personne</h4><p>Décrire l'apparence physique, le vêtement, l'expression, la personnalité.</p><p><strong>Exemple:</strong> \"Marie avait de longs cheveux noirs qui tombaient jusqu'à ses épaules. Ses yeux bleus brillaient comme des saphirs. Elle souriait toujours, ce qui lui donnait un air bienveillant. Elle portait une robe bleue élégante qui correspondait parfaitement à la couleur de ses yeux. Elle dégageait une présence calme et confiante.\"</p><h4>C) Description d'un Objet</h4><p>Décrire sa forme, sa couleur, sa taille, sa matière, son utilité.</p><p><strong>Exemple:</strong> \"La montre était un chef-d'œuvre. Son boîtier était en or poli qui brillait comme le soleil. Le cadran était blanc avec des chiffres romains en noir. Les aiguilles étaient fines et délicates. Elle émanait une certaine noblesse et une histoire ancienne.\"</p><h4>D) Description d'une Situation</h4><p>Décrire une scène, une moment, une ambiance générale.</p><p><strong>Exemple:</strong> \"La gare était bondée. Les gens couraient dans tous les sens, traînant leurs valises derrière eux. Le bruit des annonces résonnait partout. Les voyageurs regardaient anxieusement les horaires. Une femme âgée cherchait son quai. Un couple amoureux s'étreignait en attendant le départ.\"</p><h3>3. LES TECHNIQUES DE DESCRIPTION</h3><h4>A) L'Ordre Spatial</h4><p>Décrire du haut en bas, de gauche à droite, de proche en loin, etc.</p><p><strong>Exemple du haut en bas:</strong> \"La maison avait un toit de tuiles rouges. Les murs étaient blanchis à la chaux. Les fenêtres avaient des volets verts. La porte principale était en bois marron foncé.\"</p><h4>B) L'Utilisation des Adjectifs</h4><p>Les adjectifs sont les mots clés de la description. Ils qualifient et précisent.</p><p><strong>Adjectifs simples:</strong> grand, petit, rouge, joli, vieux</p><p><strong>Adjectifs composés:</strong> bleu-ciel, rouge-orange, gris-argent</p><p><strong>Adjectifs expressifs:</strong> splendide, magnifique, horrible, dégoûtant, merveilleux</p><h4>C) Les Sens (Sensoriel)</h4><p>Utiliser les 5 sens pour enrichir la description:</p><ul><li><strong>Vue:</strong> couleurs, formes, lumière (\"le soleil doré illuminate les collines\")</li><li><strong>Ouïe:</strong> bruits, sons (\"on entend le murmure de la rivière\")</li><li><strong>Odorat:</strong> odeurs, parfums (\"l'odeur sucrée des fleurs remplissait l'air\")</li><li><strong>Goût:</strong> saveurs (\"le gâteau avait un goût délicieux\")</li><li><strong>Toucher:</strong> textures, température (\"le tissu était doux comme la soie\")</li></ul><p><strong>Exemple complet:</strong> \"Le marché était vivant et coloré. Les étals débordaient de fruits rouges et oranges. On entendait les vendeurs crier leurs prix. L'odeur de miel et de fleurs fraîches remplissait l'air. En goûtant une cerise, j'ai senti sa saveur sucrée et acidulée sur ma langue. En touchant un tissu, j'ai découvert sa douceur exquise.\"</p><h4>D) Les Comparaisons et Métaphores</h4><p><strong>Comparaison (avec 'comme'):</strong> \"Ses cheveux étaient noirs comme la nuit. Sa peau était blanche comme la neige.\"</p><p><strong>Métaphore (sans 'comme'):</strong> \"Ses yeux étaient des diamants. Le soleil était un baume chaud.\"</p><h4>E) Les Énumérations</h4><p>Lister les éléments pour créer une richesse de détails:</p><p><strong>Exemple:</strong> \"Le jardin était rempli de fleurs: des roses rouges, des tulipes jaunes, des chrysanthèmes blancs, des bleuets bleus, des muguets parfumés.\"</p><h3>4. STRUCTURE D'UNE DESCRIPTION</h3><p><strong>Étape 1 - Impression générale:</strong> Donner une première idée (\"c'est un jardin magnifique\")</p><p><strong>Étape 2 - Détails spécifiques:</strong> Ajouter les particularités (couleurs, formes, éléments distinctifs)</p><p><strong>Étape 3 - Émotions et atmosphère:</strong> Transmettre le sentiment qu'on en tire</p><p><strong>Étape 4 - Détails supplémentaires:</strong> Enrichir avec des sensations ou des particularités rares</p><h3>5. EXEMPLE COMPLET DE TEXTE DESCRIPTIF</h3><p><strong>\"La Chambre de Grand-mère\"</strong></p><p>\"La chambre de grand-mère était un havre de paix. Dès qu'on y entrait, on était accueilli par une odeur délicate de lavande et de rose séchée. Les murs étaient peints en rose pâle, et la lumière du soleil traversait les rideaux en dentelle fine, créant des motifs délicats sur le sol en bois ciré. Un grand lit à baldaquin dominait la pièce, couvert d'une courtepointe en velours bleu foncé brodée de motifs floraux. À côté du lit, une petite table de nuit en bois ancien supportait une lampe à abat-jour en porcelaine peinte. Sur les murs, des tableaux anciens montraient des paysages bucoliques: des forêts, des lacs, des champs de blé doré. Dans le coin, un fauteuil recouvert de tissu crème invitait à la lecture. Une petite bibliothèque remplie de livres anciens occupait un mur entier. Tout dans cette pièce respirait la tranquillité, la douceur et l'amour.\"</p><h3>6. VOCABULAIRE DESCRIPTIF UTILE</h3><p><strong>Pour les couleurs:</strong> éclatant, pâle, vif, sombre, lumineux, terne, vibrant</p><p><strong>Pour les formes:</strong> arrondi, pointu, lisse, rugueux, massif, délicat, robuste</p><p><strong>Pour les dimensions:</strong> minuscule, géant, proportionné, disproportionné, compact, spacieux</p><p><strong>Pour les matières:</strong> lisse, rude, mou, dur, fragile, résistant, transparent, opaque</p>",
      order: 4,
    };

    const course5: Course = {
      id: course5Id,
      title: "Texte explicatif",
      description: "Comprenez comment expliquer un phénomène ou un concept",
      category: "lecture_reading",
      content:
        "<h2>Le Texte Explicatif - Cours Complet</h2><p>Un texte explicatif vise à faire comprendre un phénomène, un processus, un concept ou une situation. Son but est d'informer et d'éclairer le lecteur. C'est le type de texte utilisé dans les manuels scolaires, les articles scientifiques, les guides d'instruction.</p><h3>1. CARACTÉRISTIQUES DU TEXTE EXPLICATIF</h3><p>Le texte explicatif:</p><ul><li><strong>Est objectif et factuel:</strong> Basé sur des faits, pas sur des opinions</li><li><strong>Est organisé logiquement:</strong> Les idées suivent un ordre précis</li><li><strong>Utilise une language claire:</strong> Pas d'ambiguïté, chaque mot a un sens précis</li><li><strong>Peut utiliser des exemples:</strong> Pour clarifier les concepts difficiles</li><li><strong>Peut employer des schémas ou des listes:</strong> Pour structurer l'information</li></ul><h3>2. LES ÉTAPES D'UNE EXPLICATION</h3><h4>A) Introduction ou Phénomène à Expliquer</h4><p>Présenter le sujet que vous allez expliquer.</p><p><strong>Exemple:</strong> \"Pourquoi les feuilles changent de couleur en automne?\"</p><h4>B) Cause ou Raison</h4><p>Expliquer pourquoi le phénomène se produit.</p><p><strong>Exemple:</strong> \"À l'automne, le soleil émet moins de lumière et il y a moins d'heures de clarté. Le froid augmente.\"</p><h4>C) Mécanisme ou Processus</h4><p>Expliquer comment le phénomène se produit, pas à pas.</p><p><strong>Exemple:</strong> \"Quand il y a moins de lumière, les plantes cessent de produire la chlorophylle, le pigment vert. D'autres pigments qui étaient cachés apparaissent: jaune, orange, rouge.\"</p><h4>D) Conséquence ou Résultat</h4><p>Montrer les conséquences ou le résultat du phénomène.</p><p><strong>Exemple:</strong> \"C'est pourquoi les feuilles deviennent jaunes, oranges et rouges avant de tomber.\"</p><h3>3. LES CONNECTEURS LOGIQUES</h3><p>Les connecteurs logiques organisent l'explication:</p><ul><li><strong>D'abord, ensuite, puis, enfin:</strong> Pour l'ordre temporel ou logique</li><li><strong>Parce que, car, puisque:</strong> Pour exprimer la cause</li><li><strong>Donc, par conséquent, ainsi:</strong> Pour exprimer la conséquence</li><li><strong>En effet, par exemple, notamment:</strong> Pour ajouter de précisions</li><li><strong>Cependant, mais, toutefois:</strong> Pour nuancer ou opposer</li></ul><h4>Exemple d'utilisation:</h4><p>\"D'abord, les jours raccourcissent en automne. Ensuite, la chlorophylle disparaît. Puis, d'autres pigments apparaissent. Par conséquent, les feuilles changent de couleur.\"</p><h3>4. LES TYPES D'EXPLICATIONS</h3><h4>A) Explication d'un Phénomène Naturel</h4><p><strong>Exemple:</strong> Pourquoi y a-t-il des saisons? Comment fonctionne le cycle de l'eau?</p><h4>B) Explication d'un Processus ou d'une Procédure</h4><p><strong>Exemple:</strong> Comment faire un gâteau? Comment planter une graine?</p><h4>C) Explication d'un Concept ou d'une Notion</h4><p><strong>Exemple:</strong> Qu'est-ce que la photosynthèse? Qu'est-ce que la gravité?</p><h4>D) Explication d'une Situation ou d'un Événement</h4><p><strong>Exemple:</strong> Pourquoi certains animaux hibernent-ils? Pourquoi les dinosaures ont-ils disparu?</p><h3>5. STRUCTURE COMPLÈTE D'UNE EXPLICATION</h3><p><strong>Introduction:</strong> Pose la question ou présente le sujet</p><p><strong>Développement:</strong> Explique les causes et le mécanisme, étape par étape</p><p><strong>Conclusion:</strong> Résume l'explication et ses résultats</p><h3>6. EXEMPLE COMPLET DE TEXTE EXPLICATIF</h3><p><strong>\"Comment fonctionne une montre?\"</strong></p><p><strong>Introduction:</strong> \"Une montre est un instrument qui mesure le temps. Mais comment fonctionne-t-elle vraiment? Cela dépend du type de montre, mais les principes de base sont similaires.\"</p><p><strong>Développement:</strong> \"Dans une montre mécanique, un ressort principal enroule l'énergie. Ce ressort se déroule lentement, ce qui crée le mouvement. Ce mouvement fait tourner plusieurs engrenages (petites roues dentées). Chaque engrenage est de taille différente. Les petits engrenages tournent vite, les grands tournent lentement. Ces engrenages sont connectés à des aiguilles. La petite aiguille (les heures) tourne lentement grâce aux gros engrenages. L'aiguille des minutes tourne plus vite grâce aux engrenages moyens. L'aiguille des secondes tourne très vite grâce aux petits engrenages. Un oscillateur (balancier ou cristal de quartz) maintient la régularité du mouvement.\"</p><p><strong>Conclusion:</strong> \"Grâce à ce système d'engrenages coordonnés et à l'oscillateur régulier, une montre mesure le temps avec précision. Le même principe s'applique à la plupart des montres, qu'elles soient mécaniques ou électroniques.\"</p><h3>7. VOCABULAIRE EXPLICATIF UTILE</h3><p><strong>Pour la cause:</strong> causé par, provient de, dû à, résulte de, vient de</p><p><strong>Pour la conséquence:</strong> entraîne, produit, crée, provoque, génère</p><p><strong>Pour le processus:</strong> d'abord, ensuite, puis, finalement, par suite</p><p><strong>Pour la clarification:</strong> c'est-à-dire, en autres termes, notamment, par exemple</p><p><strong>Pour la nuance:</strong> cependant, bien que, même si, néanmoins, toutefois</p>",
      order: 5,
    };

    const course6: Course = {
      id: course6Id,
      title: "Texte argumentatif",
      description: "Maîtrisez les techniques de persuasion et d'argumentation",
      category: "lecture_reading",
      content:
        "<h2>Le Texte Argumentatif - Cours Complet</h2><p>Un texte argumentatif vise à convaincre, persuader ou influencer le lecteur. L'auteur présente une opinion, une thèse, et utilise des arguments et des preuves pour la soutenir. C'est le type de texte utilisé dans les débats, les publicités, les critiques, les essais politiques.</p><h3>1. ÉLÉMENTS CLÉS DE L'ARGUMENTATION</h3><h4>A) La Thèse (Opinion ou Position)</h4><p>C'est l'idée principale, l'opinion que l'auteur veut défendre.</p><p><strong>Exemples:</strong> \"Les enfants devraient avoir plus de temps pour jouer.\", \"Il est important d'apprendre une langue étrangère.\"</p><h4>B) Les Arguments</h4><p>Ce sont les raisons qui soutiennent la thèse. Chaque argument répond à la question: \"Pourquoi cette thèse est-elle vraie?\"</p><p><strong>Exemple:</strong> Si la thèse est \"Les enfants devraient avoir plus de temps pour jouer\", les arguments pourraient être:<br>- Le jeu développe la créativité<br>- Le jeu améliore la santé physique<br>- Le jeu aide au développement social</p><h4>C) Les Preuves ou Exemples</h4><p>Ce sont les faits, les statistiques, les exemples concrets qui soutiennent les arguments.</p><p><strong>Exemple:</strong> Pour l'argument \"Le jeu développe la créativité\", une preuve serait: \"Les enfants qui jouent à des jeux de rôle créent des histoires, inventent des solutions créatives, et développent leur imagination.\"</p><h4>D) La Conclusion</h4><p>Résumé de la thèse et des arguments principales.</p><h3>2. STRUCTURE D'UN TEXTE ARGUMENTATIF</h3><p><strong>Introduction:</strong></p><ul><li>Présente le sujet</li><li>Énonce clairement la thèse (opinion à défendre)</li><li>Peut poser une question ou une problématique</li></ul><p><strong>Développement (le corps):</strong></p><ul><li>Présente 2-4 arguments principaux</li><li>Chaque argument est suivi de preuves et d'explications</li><li>Peut réfuter les arguments contraires</li></ul><p><strong>Conclusion:</strong></p><ul><li>Restate la thèse</li><li>Résume les arguments principaux</li><li>Peut proposer une action ou une réflexion finale</li></ul><h3>3. LES TYPES D'ARGUMENTS</h3><h4>A) Arguments Logiques (Raison)</h4><p>Basés sur la logique et le bon sens.</p><p><strong>Exemple:</strong> \"Si l'eau gèle à 0°C, alors il neigera quand la température sera inférieure à 0°C en hiver.\"</p><h4>B) Arguments d'Autorité</h4><p>S'appuient sur l'opinion d'experts ou de personnalités respectées.</p><p><strong>Exemple:</strong> \"Selon les scientifiques du monde entier, le changement climatique est réel et dû à l'activité humaine.\"</p><h4>C) Arguments Statistiques ou Factuels</h4><p>Basés sur des données, des chiffres, des faits.</p><p><strong>Exemple:</strong> \"75% des jeunes adultes pensent que l'éducation est importante pour leur succès.\"</p><h4>D) Arguments par Exemple</h4><p>Utilisent des cas concrets, des histoires vraies ou des situations réelles.</p><p><strong>Exemple:</strong> \"Un étudiant qui a étudié régulièrement a réussi son examen mieux qu'un étudiant qui n'a pas étudié.\"</p><h4>E) Arguments Émotionnels</h4><p>Font appel aux sentiments et aux valeurs du lecteur.</p><p><strong>Exemple:</strong> \"Les enfants méritent une enfance heureuse et saine, pas le surmenage scolaire.\"</p><h3>4. LES CONNECTEURS ARGUMENTATIFS</h3><p><strong>Pour introduire un argument:</strong> Premièrement, d'abord, ensuite, de plus, en outre, par ailleurs</p><p><strong>Pour soutenir un argument:</strong> Car, en effet, ainsi, par exemple, notamment, c'est-à-dire</p><p><strong>Pour conclure ou résumer:</strong> Donc, par conséquent, en conclusion, finalement, ainsi</p><p><strong>Pour réfuter ou opposer:</strong> Cependant, mais, bien que, malgré, contrairement à, or</p><p><strong>Pour concéder:</strong> Il est vrai que, certes, d'accord, j'admets que</p><h3>5. TECHNIQUES POUR CONVAINCRE</h3><h4>A) Répondre aux Objections</h4><p>Anticiper les contre-arguments et les réfuter.</p><p><strong>Exemple:</strong> \"Certains disent que le jeu est une perte de temps. Cependant, les recherches montrent que le jeu est essentiel au développement des enfants.\"</p><h4>B) Utiliser des Comparaisons</h4><p>Comparer la situation à d'autres cas similaires.</p><p><strong>Exemple:</strong> \"Tout comme un athlète a besoin d'entraînement, un étudiant a besoin de pratique régulière.\"</p><h4>C) Créer une Progression</h4><p>Commencer par les arguments les plus faibles et terminer par les plus forts.</p><h4>D) Être Honnête et Nuancé</h4><p>Reconnaître la complexité du sujet, utiliser des mots de modération (\"peut-être\", \"souvent\", \"généralement\").</p><h3>6. EXEMPLE COMPLET DE TEXTE ARGUMENTATIF</h3><p><strong>\"Pourquoi les écoles devraient avoir des cours d'art\"</strong></p><p><strong>Introduction:</strong> \"L'art n'est pas un simple divertissement. Les écoles devraient inclure des cours d'art obligatoires dans leurs programmes. L'art développe des compétences essentielles chez les étudiants.\"</p><p><strong>Argument 1 (Créativité):</strong> \"D'abord, l'art développe la créativité. Quand les étudiants peignent, sculptent ou créent de la musique, ils apprennent à penser de manière non conventionnelle. La créativité est une compétence essentielle dans le monde moderne.\"</p><p><strong>Argument 2 (Santé mentale):</strong> \"Deuxièmement, l'art améliore la santé mentale. Créer quelque chose peut réduire le stress et l'anxiété. Les étudiants qui font de l'art reportent des niveaux de satisfaction plus élevés.\"</p><p><strong>Argument 3 (Compétences sociales):</strong> \"Troisièmement, l'art encourage la collaboration et la communication. Les projets artistiques en groupe enseignent aux étudiants à travailler ensemble, à écouter les autres, et à exprimer leurs idées.\"</p><p><strong>Contre-argument et réfutation:</strong> \"Bien que certains disent que l'art n'est pas pratique, les entreprises recherchent actuellement des employés créatifs et innovants. L'art forme des citoyens plus complets.\"</p><p><strong>Conclusion:</strong> \"En conclusion, l'art est une partie vitale de l'éducation. Il développe la créativité, améliore la santé mentale, et construit des compétences sociales. Les écoles qui intègrent l'art voient des étudiants plus engagés, plus heureux, et mieux préparés pour le monde.\"</p><h3>7. VOCABULAIRE ARGUMENTATIF UTILE</h3><p><strong>Pour affirmer:</strong> clairement, précisément, indéniablement, incontestablement</p><p><strong>Pour justifier:</strong> justement, légitimement, pleinement, fortement</p><p><strong>Pour atténuer:</strong> peut-être, sans doute, probablement, semble-t-il</p><p><strong>Pour nuancer:</strong> cependant, toujours, rarement, généralement, souvent</p>",
      order: 6,
    };

    const course7: Course = {
      id: course7Id,
      title: "Texte informatif",
      description: "Identifiez les informations clés et la structure des textes informatifs",
      category: "lecture_reading",
      content:
        "<h2>Le Texte Informatif - Cours Complet</h2><p>Un texte informatif transmet des informations factuelles, objectives et précises sur un sujet spécifique. Son but principal est d'informer le lecteur, pas de le divertir ou de le convaincre. C'est le type de texte utilisé dans les journaux, les encyclopédies, les rapports techniques, les articles informatifs.</p><h3>1. CARACTÉRISTIQUES DU TEXTE INFORMATIF</h3><p>Le texte informatif:</p><ul><li><strong>Est factuel et objectif:</strong> Basé sur des faits vérifiables, pas d'opinions personnelles</li><li><strong>Est précis et complet:</strong> Fournit tous les détails pertinents</li><li><strong>Est organisé et structuré:</strong> Les informations suivent un ordre logique</li><li><strong>Est neutre en ton:</strong> L'auteur garde une distance avec le sujet</li><li><strong>Répond aux questions clés:</strong> Qui? Quoi? Où? Quand? Pourquoi? Comment?</li></ul><h3>2. LES QUESTIONS QUI STRUCTURENT L'INFORMATION</h3><h4>Qui?</h4><p>Identifie les personnes, les groupes ou les organismes impliqués.</p><p><strong>Exemple:</strong> \"Les scientifiques de l'Université de Cambridge ont découvert...\"</p><h4>Quoi?</h4><p>Décrit le sujet ou l'événement principal.</p><p><strong>Exemple:</strong> \"Un nouveau vaccin a été développé pour combattre la grippe.\"</p><h4>Où?</h4><p>Indique le lieu de l'événement ou du sujet.</p><p><strong>Exemple:</strong> \"Cette découverte a été faite en laboratoire en France.\"</p><h4>Quand?</h4><p>Donne les informations temporelles.</p><p><strong>Exemple:</strong> \"Le vaccin a été approuvé en octobre 2023.\"</p><h4>Pourquoi?</h4><p>Explique la raison ou l'importance du sujet.</p><p><strong>Exemple:</strong> \"Ce vaccin est important car il peut aider à prévenir des épidémies.\"</p><h4>Comment?</h4><p>Explique le processus ou la méthode.</p><p><strong>Exemple:</strong> \"Le vaccin fonctionne en renforçant le système immunitaire du corps.\"</p><h3>3. TYPES DE TEXTES INFORMATIFS</h3><h4>A) Article de Journal</h4><p>Rapporte un événement récent ou une nouvelle. Utilise souvent la structure \"pyramide inversée\": l'information la plus importante en premier.</p><p><strong>Exemple:</strong> Un article sur un événement sportif, politique, ou social.</p><h4>B) Article Encyclopédique</h4><p>Fournit une vue d'ensemble complète d'un sujet. Plus long et plus détaillé qu'un article de journal.</p><p><strong>Exemple:</strong> Un article sur la photosynthèse, l'histoire de la France, ou les animaux menacés d'extinction.</p><h4>C) Rapport Technique</h4><p>Présente des informations spécialisées et détaillées, souvent avec des données, des statistiques et des diagrammes.</p><p><strong>Exemple:</strong> Un rapport sur l'impact environnemental d'un projet de construction.</p><h4>D) Guide ou Manuel</h4><p>Donne des instructions ou des informations pratiques pour accomplir une tâche.</p><p><strong>Exemple:</strong> Un guide sur comment planter un jardin, comment réparer un ordinateur.</p><h3>4. STRUCTURE D'UN TEXTE INFORMATIF</h3><p><strong>Introduction:</strong></p><ul><li>Présente le sujet clairement</li><li>Peut poser une question ou un problème</li><li>Donne le contexte nécessaire</li></ul><p><strong>Développement:</strong></p><ul><li>Présente les faits principaux et secondaires</li><li>Peut être organisé par catégories, chronologiquement, ou par importance</li><li>Peut inclure des exemples, des statistiques, des citations</li></ul><p><strong>Conclusion:</strong></p><ul><li>Résume les informations clés</li><li>Peut poser une question pour encourager la réflexion</li><li>Peut suggérer des implications futures</li></ul><h3>5. LES CONNECTEURS INFORMATIFS</h3><p><strong>Pour ajouter des informations:</strong> De plus, en outre, également, par ailleurs, ajoutons que</p><p><strong>Pour énumérer:</strong> Premièrement, deuxièmement, d'abord, ensuite, enfin, notamment</p><p><strong>Pour conclure:</strong> En conclusion, finalement, pour résumer, en somme</p><p><strong>Pour clarifier:</strong> C'est-à-dire, en d'autres termes, autrement dit, soit</p><p><strong>Pour le temps:</strong> Avant, après, pendant, depuis, jusqu'à, alors, ensuite</p><h3>6. EXEMPLE COMPLET DE TEXTE INFORMATIF</h3><p><strong>\"Les Manchots de l'Antarctique\"</strong></p><p><strong>Introduction:</strong> \"Les manchots sont des oiseaux fascinants qui vivent principalement en Antarctique. Contrairement aux autres oiseaux, ils ne peuvent pas voler. Au lieu de cela, ils nagent avec grâce sous l'eau et marchent maladroitement sur la glace.\"</p><p><strong>Développement - Qui:</strong> \"Il existe 17 espèces de manchots dans le monde. L'espèce la plus grande est l'empereur manchot, qui peut mesurer jusqu'à 1,2 mètre de haut et peser 45 kilos. La plus petite espèce est le petit manchot bleu, qui mesure environ 40 centimètres.\"</p><p><strong>Développement - Où:</strong> \"Les manchots vivent principalement dans l'hémisphère sud. Les manchots empereurs et les manchots d'Adélie vivent en Antarctique, tandis que d'autres espèces vivent en Afrique du Sud, en Australie, et en Nouvelle-Zélande.\"</p><p><strong>Développement - Comment (mode de vie):</strong> \"Les manchots passent environ 80% de leur vie dans l'océan, où ils chassent le poisson et les crevettes. Ils sont des nageurs exceptionnels, pouvant plonger jusqu'à 500 mètres de profondeur et voyager plusieurs kilomètres en une seule plongée. À terre, ils se rassemblent en colonies de milliers d'oiseaux pour se reproduire et pour se réchauffer mutuellement.\"</p><p><strong>Développement - Menaces:</strong> \"Actuellement, de nombreuses espèces de manchots sont menacées par le changement climatique, la pollution, la surpêche, et la perte d'habitat. Le réchauffement climatique réduit les réserves de glace où ils vivent et se reproduisent. Selon les scientifiques, les populations de manchots pourraient diminuer de 50% d'ici la fin du siècle si les tendances actuelles se poursuivent.\"</p><p><strong>Conclusion:</strong> \"Les manchots sont des créatures remarquables qui se sont adaptées à l'un des environnements les plus hostiles de la Terre. Cependant, leur survie dépend de nos efforts pour protéger les océans et combattre le changement climatique.\"</p><h3>7. CONSEILS POUR ÉCRIRE UN TEXTE INFORMATIF</h3><p><strong>Vérifiez vos informations:</strong> Assurez-vous que tous les faits sont exacts et actuels</p><p><strong>Utilisez des sources fiables:</strong> Citez vos sources si nécessaire</p><p><strong>Organisez logiquement:</strong> Utilisez des titres, des sous-titres, et des listes pour clarifier</p><p><strong>Soyez concis:</strong> Évitez les digressions et les informations non pertinentes</p><p><strong>Utilisez un vocabulaire approprié:</strong> Expliquez les termes techniques si nécessaire</p><p><strong>Relisez et vérifiez:</strong> Les erreurs d'orthographe ou de grammaire peuvent diminuer la crédibilité</p>",
      order: 7,
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
      description: "Utilisation des adverbes et des mots de liaison",
      category: "grammaire",
      content: "<h2>Les Adverbes</h2><p>Un adverbe modifie un verbe, un adjectif ou un autre adverbe. Les adverbes de manière répondent à COMMENT? Les adverbes de temps à QUAND? Les adverbes de lieu à OÙ? Les adverbes de quantité à COMBIEN?</p>",
      order: 18,
    };

    const grammar7: Course = {
      id: grammar7Id,
      title: "Phrase simple et phrase complexe",
      description: "Distinguer et construire différents types de phrases",
      category: "grammaire",
      content: "<h2>Phrase Simple et Complexe</h2><p>Une phrase simple contient UN SEUL VERBE. Une phrase complexe contient PLUSIEURS VERBES. Les phrases complexes utilisent la coordination (et, ou, mais) ou la subordination (dépendance entre propositions).</p>",
      order: 19,
    };

    const orthography6: Course = {
      id: orthography6Id,
      title: "Homophones et confusions courantes",
      description: "Comprendre et distinguer les mots qui se prononcent pareils",
      category: "orthographe",
      content: "<h2>Homophones</h2><p>Les homophones se prononcent pareils mais s'écrivent différemment. Exemples: a/à, ou/où, son/sont, ce/se. Astuce: Si je peux remplacer par \"avait\" → c'est \"a\". Sinon → c'est \"à\".</p>",
      order: 20,
    };

    const punctuation1: Course = {
      id: punctuation1Id,
      title: "Les signes de ponctuation essentiels",
      description: "Maîtrisez l'utilisation correcte de la ponctuation",
      category: "ponctuation",
      content: "<h2>Les Signes de Ponctuation</h2><p>Le point (.) termine une phrase. Le point d'interrogation (?) termine une question. Le point d'exclamation (!) exprime l'émotion. La virgule (,) sépare les éléments. En français: espace AVANT les signes doubles (:; ! ?).</p>",
      order: 21,
    };

    const punctuation2: Course = {
      id: punctuation2Id,
      title: "Utilisation avancée de la ponctuation",
      description: "Maîtriser les techniques de ponctuation pour un texte élégant",
      category: "ponctuation",
      content: "<h2>Ponctuation Avancée</h2><p>Les deux-points (:) introduisent une explication. Les tirets (–) marquent les dialogues. Les guillemets (\" \") encadrent les citations. Les parenthèses ( ) ajoutent une information supplémentaire. Les pointillés (...) créent du suspense.</p>",
      order: 22,
    };

    const conjugation6: Course = {
      id: conjugation6Id,
      title: "Les temps composés",
      description: "Plus-que-parfait, passé antérieur, et autres temps composés",
      category: "conjugaison",
      content: "<h2>Les Temps Composés</h2><p>Les temps composés = auxiliaire (avoir/être) + participe passé. Plus-que-parfait: action passée avant une autre action passée. Passé antérieur: temps littéraire. Futur antérieur: action future terminée avant une autre.</p>",
      order: 23,
    };

    this.courses.set(course4Id, course4);
    this.courses.set(course5Id, course5);
    this.courses.set(course6Id, course6);
    this.courses.set(course7Id, course7);
    this.courses.set(orthography1Id, orthography1);
    this.courses.set(orthography2Id, orthography2);
    this.courses.set(orthography3Id, orthography3);
    this.courses.set(orthography4Id, orthography4);
    this.courses.set(orthography5Id, orthography5);
    this.courses.set(orthography6Id, orthography6);
    this.courses.set(conjugation1Id, conjugation1);
    this.courses.set(conjugation2Id, conjugation2);
    this.courses.set(conjugation3Id, conjugation3);
    this.courses.set(conjugation4Id, conjugation4);
    this.courses.set(conjugation5Id, conjugation5);
    this.courses.set(conjugation6Id, conjugation6);
    this.courses.set(grammar6Id, grammar6);
    this.courses.set(grammar7Id, grammar7);
    this.courses.set(punctuation1Id, punctuation1);
    this.courses.set(punctuation2Id, punctuation2);

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
