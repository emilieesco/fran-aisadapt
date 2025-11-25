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
    const grammar11Id = randomUUID();
    const grammar12Id = randomUUID();

    // New orthography courses
    const orthography8Id = randomUUID();
    const orthography9Id = randomUUID();
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

    const grammar11: Course = {
      id: grammar11Id,
      title: "Structure complète de la phrase",
      description: "Sujet, verbe, COD, COI, compléments circonstanciels",
      category: "grammaire",
      content: "<h2>Structure Complète de la Phrase</h2><p>Une phrase bien construite contient généralement: Sujet + Verbe + Compléments.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong> SUJET + VERBE + COMPLÉMENTS</div><h3>1. LE SUJET</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Qui fait l'action?</strong><br>\"Les enfants jouent au parc.\" → Les enfants = sujet<br>\"Je viens.\" → Je = sujet<br>\"Elle étudie.\" → Elle = sujet</div><h3>2. LE VERBE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>L'action ou l'état</strong><br>\"Elle JOUE au tennis.\" → joue = verbe (action)<br>\"Je SUIS fatigué.\" → suis = verbe (état)</div><h3>3. COMPLÉMENTS D'OBJET DIRECT (COD)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Répond à: Quoi? Qui?</strong><br>\"Elle mange une pomme.\" → une pomme = COD<br>\"Il regarde Marie.\" → Marie = COD</div><h3>4. COMPLÉMENTS D'OBJET INDIRECT (COI)</h3><div style='background: #fce7f3; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Répond à: À qui? De quoi?</strong><br>\"Je parle à Marie.\" → à Marie = COI<br>\"Elle pense à toi.\" → à toi = COI</div><h3>5. COMPLÉMENTS CIRCONSTANCIELS</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Lieu (Où?):</strong> \"Je vais à l'école.\"<br><strong>Temps (Quand?):</strong> \"Demain, on part.\"<br><strong>Manière (Comment?):</strong> \"Elle court rapidement.\"<br><strong>Cause (Pourquoi?):</strong> \"Je suis fatigué parce que j'ai travaillé.\"</div>",
      order: 29,
    };

    const grammar12: Course = {
      id: grammar12Id,
      title: "Voix active et voix passive",
      description: "Transformer une phrase active en passive et inversement",
      category: "grammaire",
      content: "<h2>Voix Active et Voix Passive</h2><p>La même action peut s'exprimer de deux façons: voix ACTIVE ou voix PASSIVE.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ DIFFÉRENCE:</strong><br>ACTIVE: Le sujet FAIT l'action<br>PASSIVE: Le sujet REÇOIT l'action</div><h3>1. VOIX ACTIVE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le sujet est l'agent (celui qui fait):</strong><br>\"Le chat attrape la souris.\"<br>→ Sujet (chat) + Verbe (attrape) + COD (souris)</div><h3>2. VOIX PASSIVE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le sujet reçoit l'action:</strong><br>\"La souris est attrapée par le chat.\"<br>→ Sujet (souris) + Être (est attrapée) + Participe Passé (attrapée) + par l'agent (par le chat)</div><h3>3. TRANSFORMATION</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Formule: Être + Participe Passé + par + agent</strong><br>\"Le professeur enseigne les mathématiques.\" (active)<br>→ \"Les mathématiques sont enseignées par le professeur.\" (passive)</div>",
      order: 30,
    };

    const orthography8: Course = {
      id: orthography8Id,
      title: "Pluriels spéciaux",
      description: "Mots en -al, -eau, -au, -ail et leurs pluriels irréguliers",
      category: "orthographe",
      content: "<h2>Pluriels Spéciaux - Cas Particuliers</h2><p>La plupart des noms ajoutent -s au pluriel, mais certains suivent des règles spéciales!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES SPÉCIALES:</strong><br>-al → -aux (généralement)<br>-eau, -au, -eu → -x<br>-ail → -ails ou -aux</div><h3>1. MOTS EN -AL → -AUX</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Un cheval → Des chevaux</strong><br><strong>Un animal → Des animaux</strong><br><strong>Un journal → Des journaux</strong><br><strong>Exceptions:</strong> bal → bals, festival → festivals</div><h3>2. MOTS EN -EAU, -AU, -EU → -X</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Un château → Des châteaux</strong><br><strong>Un bureau → Des bureaux</strong><br><strong>Un jeu → Des jeux</strong><br><strong>Un lieu → Des lieux</strong></div><h3>3. MOTS EN -AIL</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Généralement -ails:</strong><br>• un détail → des détails<br>• un travail → des travaux (exception!)<br>• un vitrail → des vitraux (exception!)</div>",
      order: 31,
    };

    const orthography9: Course = {
      id: orthography9Id,
      title: "Accord du participe passé",
      description: "Quand accorder le participe avec avoir, être, et pronoms",
      category: "orthographe",
      content: "<h2>Accord du Participe Passé - Règles Essentielles</h2><p>Le participe passé ne s'accorde pas toujours! Il y a des règles précises selon l'auxiliaire.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES:</strong><br>AVOIR: accord avec COD si avant le verbe<br>ÊTRE: accord toujours avec le sujet</div><h3>1. AVEC L'AUXILIAIRE ÊTRE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le participe s'accorde toujours avec le sujet:</strong><br>\"Elle est allée.\" (participe allée: féminin)<br>\"Ils sont venus.\" (participe venus: pluriel)<br>\"Elles sont restées.\" (participe restées: féminin pluriel)</div><h3>2. AVEC L'AUXILIAIRE AVOIR</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>S'accorde avec le COD si le COD est AVANT le verbe:</strong><br>\"Elle a mangé une pomme.\" (pas d'accord: COD après)<br>\"La pomme qu'elle a mangée.\" (accord: \"pomme\" est avant)<br>\"Je les ai vus.\" (accord: \"les\" est avant)</div><h3>3. AVEC LES PRONOMS RÉFLÉCHIS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Se lever → Elle s'est levée (accord)</strong><br><strong>Se laver les mains → Elle s'est lavé les mains (pas d'accord)</strong><br>→ Dépend si le pronom est COD ou COI!</div>",
      order: 32,
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
      category: "écriture",
      content: "<h2>Écrire une Description Vivante</h2><p>Une bonne description fait VOIR, SENTIR et VIVRE les choses au lecteur. Elle n'est pas juste une liste de faits, mais une expérience sensorielle!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ CLÉS:</strong><br>Utiliser les 5 sens: vue, son, odeur, goût, toucher<br>Ajouter des comparaisons et métaphores<br>Utiliser des adjectifs précis et expressifs</div><h3>1. LES CINQ SENS</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Vue:</strong> couleurs, formes, lumière, ombres<br>\"Le soleil orange s'enfonce dans l'horizon rose\"<br><strong>Son:</strong> bruits, musiques, silence<br>\"On entendait le doux murmure des vagues\"<br><strong>Odeur:</strong> parfums, senteurs<br>\"Une odeur délicieuse de pain frais sortait du four\"<br><strong>Goût:</strong> saveurs<br>\"Le gâteau avait un goût sucré et vanillé\"<br><strong>Toucher:</strong> textures, températures<br>\"La fourrure du chat était douce et chaude\"</div><h3>2. COMPARAISONS ET MÉTAPHORES</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Comparaison:</strong> \"comme\", \"semblable à\"<br>\"Ses cheveux étaient blonds comme du blé mûr\"<br><strong>Métaphore:</strong> dire que c'EST, sans \"comme\"<br>\"Ses yeux étaient des diamants qui brillaient\"<br>\"Le soleil était une boule de feu\"</div><h3>3. ADJECTIFS PRÉCIS vs VAGUES</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Vague:</strong> \"La maison était belle\"<br><strong>Vivant:</strong> \"La maison blanche aux volets bleu ciel était majestueuse avec son jardin débordant de roses\"<br><strong>Vague:</strong> \"L'enfant était heureux\"<br><strong>Vivant:</strong> \"L'enfant rayonnait de joie, son sourire illuminait tout son visage\"</div><h3>4. EXEMPLE COMPLET</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Mauvais:</strong> \"C'était un beau jardin avec des fleurs\"<br><strong>Excellent:</strong> \"Le jardin était un paradis miniature. Des roses rouges, cramoisies et écarlates grimpaient sur les murs de pierre. Des papillons aux ailes dorées volaient de fleur en fleur. On sentait le parfum sucré des roses mélangé à celui du jasmin. Le sol était doux et frais sous les pieds nus.\"</div>",
      order: 42,
    };

    const writing2: Course = {
      id: writing2Id,
      title: "Écrire un dialogue",
      description: "Format correct et techniques pour écrire des dialogues naturels et réalistes",
      category: "écriture",
      content: "<h2>Écrire un Dialogue - Format et Techniques</h2><p>Un dialogue bien écrit rend une histoire vivante! Il faut respecter le format ET faire parler les personnages de manière réaliste et naturelle.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ RÈGLES FORMAT FRANÇAIS:</strong><br>Tiret (—) au début de chaque réplique<br>Chaque changement de personne = nouvelle ligne<br>Point, virgule AVANT les guillemets fermants</div><h3>1. FORMAT FRANÇAIS DU DIALOGUE</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Correct en français:</strong><br>— Bonjour Marie, comment vas-tu?<br>— Très bien, merci! Et toi?<br>— Je vais très bien aussi. Tu viens au parc?<br><strong>Avec verbes de parole:</strong><br>— Pourquoi ne viens-tu pas? demanda Jean.<br>— Je suis trop occupée, répondit Marie tristement.<br>— C'est dommage, soupira Jean.</div><h3>2. LES VERBES DE PAROLE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Varié:</strong> dit, répond, demande, cria, chuchota, expliqua, déclara, s'exclama, soupira, murmura, avoua, confessa<br><strong>Au lieu de toujours \"dit\":</strong><br>\"La mère cria: — Venez manger!\"<br>\"Il chuchota: — J'ai peur\"<br>\"Elle expliqua: — Voilà comment faire\"</div><h3>3. FAIRE PARLER NATURELLEMENT</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Chaque personnage a une voix:</strong><br>Enfant: \"C'est cool! J'aime bien!\"<br>Adulte cultiver: \"C'est une situation intéressante\"<br>Personnage triste: \"Ah... j'ai perdu mon courage\"<br><strong>Montrer les émotions par le parole:</strong><br>\"— Je t'aime! cria-t-elle joyeusement\"><br>\"— J'ai échoué, murmura-t-il, la voix brisée\"</div><h3>4. EXEMPLE COMPLET DE DIALOGUE</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>— Tu veux aller au cinéma ce soir? demanda Lucas.<br>— Oui! Quel film veux-tu voir? s'exclama Sarah.<br>— Je ne sais pas. Peut-être un film de super-héros?<br>— Bof! C'est trop violent. Et si on regardait une comédie?<br>— D'accord, soupira Lucas. À quelle heure?<br>— À 20h?<br>— Parfait! À ce soir!<br></strong></div>",
      order: 43,
    };

    const writing3: Course = {
      id: writing3Id,
      title: "Écrire une histoire courte",
      description: "Structure d'une histoire courte avec début, milieu et fin satisfaisants",
      category: "écriture",
      content: "<h2>Écrire une Histoire Courte</h2><p>Une histoire courte bien structurée entraîne le lecteur du début à la fin. Elle a besoin d'une structure claire pour captiver l'audience!</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ STRUCTURE:</strong><br>Situation initiale → Problème/Conflit → Climax → Résolution</div><h3>1. SITUATION INITIALE (LE DÉBUT)</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Présente:</strong> personnage principal, lieu, temps, situation normale<br><strong>Exemple:</strong> \"Léa était une fillette de 10 ans qui vivait près d'une grande forêt. Elle aimait explorer la nature après l'école. Un jour, en sortant de classe, elle découvrit quelque chose d'extraordinaire...\"</div><h3>2. LE PROBLÈME OU CONFLIT (LE MILIEU)</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Crée la tension:</strong> obstacle, danger, mystère, question<br><strong>Exemple:</strong> \"Près du grand chêne, Léa trouva une petite porte verte qu'elle n'avait jamais vue avant. Elle était intriguée. Devrait-elle l'ouvrir? Que se passerait-il?\"<br><strong>Types de conflits:</strong> personnage vs nature, personnage vs autre, personnage vs lui-même</div><h3>3. LE CLIMAX (LE MOMENT CRUCIAL)</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Le moment le plus intense:</strong> où l'action principale se produit<br><strong>Exemple:</strong> \"Léa prit une profonde respiration et ouvrit la petite porte. Ce qu'elle vit la stupéfia! C'était un monde magique rempli de créatures lumineuses et de fleurs qui chantaient!\"</div><h3>4. LA RÉSOLUTION (LA FIN)</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Comment se termine l'histoire?</strong> Problème résolu, leçon apprise<br><strong>Exemple:</strong> \"Léa découvrit que ce monde magique existait pour aider les enfants courageux. Elle y retourna chaque jour et devint la gardienne de ce monde secret. Et jamais elle n'oublia sa première adventure extraordinaire.\"</div>",
      order: 44,
    };

    const writing4: Course = {
      id: writing4Id,
      title: "Résumer efficacement",
      description: "Techniques pour extraire l'essentiel et écrire un bon résumé",
      category: "écriture",
      content: "<h2>Résumer Efficacement</h2><p>Résumer n'est pas recopier! C'est EXTRAIRE l'essentiel et le présenter de manière concise et claire.</p><div style='background: #fef08a; border-left: 4px solid #eab308; padding: 12px; margin: 15px 0; border-radius: 4px;'><strong>⭐ FORMULE:</strong><br>Identifiez les idées PRINCIPALES (pas les détails)<br>Écrivez en vos PROPRES mots<br>Respectez l'ordre original du texte</div><h3>1. TROUVER L'ESSENTIEL</h3><div style='background: #dbeafe; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Posez-vous ces questions:</strong><br>Qui sont les personnages IMPORTANTS?<br>Quels sont les FAITS CLÉS?<br>Quel est le DÉBUT, le PROBLÈME et la FIN?<br><strong>IGNOREZ les DÉTAILS:</strong> descriptions longues, anecdotes secondaires, dialogues longs</div><h3>2. RÉDUIRE LE TEXTE</h3><div style='background: #fee2e2; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Original (50 mots):</strong> \"Jean était un garçon de 12 ans qui vivait dans une petite maison au bord de la mer. Il adorait regarder les vagues. Un jour, il trouva une bouteille sur la plage. À l'intérieur, il y avait un message ancien.\"<br><strong>Résumé (15 mots):</strong> \"Jean, 12 ans, trouve une bouteille avec un message ancien sur la plage.\"</div><h3>3. UTILISER SES PROPRES MOTS</h3><div style='background: #f0fdf4; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>Pas bon:</strong> \"Recopier exactement le texte\"<br><strong>Bon:</strong> \"Reformuler avec vos propres mots\"<br><strong>Exemple:</strong><br>Texte: \"L'école était fermée à cause de la neige.\"<br>Résumé: \"La neige a forcé la fermeture de l'école.\"</div><h3>4. STRUCTURE D'UN RÉSUMÉ</h3><div style='background: #f3e8ff; padding: 10px; margin: 10px 0; border-radius: 4px;'><strong>1. Introduction:</strong> \"Ce texte parle de...\"<br><strong>2. Développement:</strong> 3-4 phrases avec les idées principales<br><strong>3. Conclusion:</strong> \"En conclusion... ou Finalement...\"<br><strong>Astuce:</strong> Un bon résumé fait 1/3 ou 1/4 de la longueur du texte original</div>",
      order: 45,
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
    this.courses.set(grammar11Id, grammar11);
    this.courses.set(grammar12Id, grammar12);
    this.courses.set(orthography8Id, orthography8);
    this.courses.set(orthography9Id, orthography9);
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

    // Writing exercises
    const writingExercise1Id = randomUUID();
    const writingExercise1: Exercise = {
      id: writingExercise1Id,
      courseId: writing1Id,
      title: "Pratiquer: Description vivante",
      description: "Écrivez une description avec les 5 sens",
      type: "writing",
      order: 1,
    };

    const writingExercise2Id = randomUUID();
    const writingExercise2: Exercise = {
      id: writingExercise2Id,
      courseId: writing2Id,
      title: "Pratiquer: Dialogue",
      description: "Écrivez un dialogue entre deux personnages",
      type: "writing",
      order: 1,
    };

    const writingExercise3Id = randomUUID();
    const writingExercise3: Exercise = {
      id: writingExercise3Id,
      courseId: writing3Id,
      title: "Pratiquer: Histoire courte",
      description: "Écrivez une histoire courte avec début, milieu et fin",
      type: "writing",
      order: 1,
    };

    const writingExercise4Id = randomUUID();
    const writingExercise4: Exercise = {
      id: writingExercise4Id,
      courseId: writing4Id,
      title: "Pratiquer: Résumé",
      description: "Résumez un texte en 5-7 phrases",
      type: "writing",
      order: 1,
    };

    this.exercises.set(writingExercise1Id, writingExercise1);
    this.exercises.set(writingExercise2Id, writingExercise2);
    this.exercises.set(writingExercise3Id, writingExercise3);
    this.exercises.set(writingExercise4Id, writingExercise4);

    // Reading questions - NARRATIVE TEXTS with 4 dimensions
    // Narratif - Exercice 1: Histoire 1
    const readQ1: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Histoire 1: Le Trésor de la Cave",
      text: "Léa avait 11 ans et vivait dans une petite maison ancienne au bord d'une forêt dense. Elle était une fille curieuse qui adorait lire des histoires d'aventure. Chaque jour, elle allait à l'école et revenait faire ses devoirs.\n\nCe matin-là, en explorant le grenier, Léa découvrit une vieille clé rouillée tombée entre deux poutres en bois. La clé avait une forme bizarre, gravée de symboles mystérieux. Léa n'avait jamais vu cette clé avant et elle se demanda: \"À quoi ouvre-t-elle?\"\n\nElle chercha partout dans la maison une serrure qui correspondrait à cette clé. Dans la cave, derrière les vieux meubles poussiéreux, elle trouva une petite porte en bois qu'elle n'avait jamais remarquée avant. Son cœur battait très vite. Avec beaucoup d'effort, elle tira la porte et vit une pièce secrète pleine de coffres. Mais soudain, elle entendit un bruit terrible: la porte de la cave claqua et s'enferma! Elle était piégée!\n\nAprès une heure, Léa trouva une autre porte qui menait à un tunnel souterrain. Elle suivit le tunnel et arriva derrière le vieux puits du jardin. Elle s'échappa et raconta tout à ses parents. En explorant la maison avec sa famille et un expert, ils découvrirent que la maison appartenait à un homme riche du 19e siècle qui y avait caché des pièces de monnaie anciennes. Léa devint célèbre dans son village comme \"la fille qui a découvert le trésor caché\".\n\nQuel était le métier ou la passion de Léa avant sa découverte?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle était archéologue", "Elle adorait lire des histoires d'aventure", "Elle était détective", "Elle construisait des châteaux"]),
      correctAnswer: "Elle adorait lire des histoires d'aventure",
      order: 1,
    };

    const readQ2: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 2 (Élément déclencheur)",
      text: "Quel objet a déclenché toute l'aventure de Léa?",
      type: "multiple_choice",
      options: JSON.stringify(["Un livre ancien", "Une vieille clé rouillée", "Une lettre mystérieuse", "Un trésor caché"]),
      correctAnswer: "Une vieille clé rouillée",
      order: 2,
    };

    const readQ2b: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 3 (Nœud)",
      text: "Quel problème grave s'est produit quand Léa a trouvé la porte secrète dans la cave?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle s'est blessée", "Elle s'est perdue", "La porte se ferma et elle fut piégée", "Elle vit un fantôme"]),
      correctAnswer: "La porte se ferma et elle fut piégée",
      order: 3,
    };

    const readQ2c: Question = {
      id: randomUUID(),
      exerciseId: readingExercise1Id,
      title: "Question 4 (Dénouement)",
      text: "Comment l'histoire s'est-elle terminée pour Léa?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle s'est perdue à jamais", "Elle s'échappa et découvrit le trésor avec sa famille", "Elle trouva juste des vieux meubles", "Elle ne sortit jamais de la cave"]),
      correctAnswer: "Elle s'échappa et découvrit le trésor avec sa famille",
      order: 4,
    };

    // HISTOIRE 2: Le Jour de l'Accident
    const readQ3: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Histoire 2: Le Jour de l'Accident",
      text: "Marc était un garçon de 13 ans qui vivait dans une grande ville. C'était un garçon sportif et courageux qui adorait faire du vélo avec ses copains du quartier. Chaque jour après l'école, lui et ses amis allaient au skate park faire des figures impressionnantes. Marc avait toujours porté un casque, mais ce jour-là, il l'avait oublié à la maison.\n\nEn arrivant au parc, ses copains l'appelaient pour faire une course de vélo vers le pont à l'autre bout de la ville. Marc hésita: \"Je n'ai pas mon casque!\" cria-t-il. Mais ses copains plaisantaient: \"Allez Marc, t'es pas un bébé!\"\n\nContre son mieux jugement, Marc accepta de participer à la course. Il pédalait vite, très vite. Soudain, une voiture sortit d'une rue latérale. Marc ne la vit pas à temps. Il freina brusquement et chuta violemment du vélo! Il tomba sur le trottoir, la tête la première. Il perdit connaissance. Les passants appelèrent l'ambulance immédiatement.\n\nMarc fut transporté à l'hôpital avec une commotion cérébrale et plusieurs blessures. Il dut rester à l'hôpital pendant une semaine. Il avait beaucoup de chance: sans casque, il aurait pu mourir! Après sa sortie, Marc devint ambassadeur de la sécurité à vélo dans son école. Il racontait à tous les enfants l'importance de porter un casque. Ses copains aussi commencèrent à toujours porter un casque.\n\nPourquoi Marc adorait-il aller au parc?",
      type: "multiple_choice",
      options: JSON.stringify(["Pour faire des devoirs", "Pour faire du vélo et faire des figures", "Pour regarder les autres", "Pour dormir"]),
      correctAnswer: "Pour faire du vélo et faire des figures",
      order: 1,
    };

    const readQ4: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 2 (Élément déclencheur)",
      text: "Quel événement a poussé Marc à participer à la course dangereuse?",
      type: "multiple_choice",
      options: JSON.stringify(["Ses copains l'ont forcé et taquiné", "L'ambulance passait", "Il voulait faire une promenade", "Il n'avait rien à faire"]),
      correctAnswer: "Ses copains l'ont forcé et taquiné",
      order: 2,
    };

    const readQ4b: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 3 (Nœud)",
      text: "Quel accident grave s'est produit pendant la course?",
      type: "multiple_choice",
      options: JSON.stringify(["Marc tomba dans une rivière", "Une voiture sortit d'une rue latérale et il chuta", "Un ami l'a fait tomber", "Son vélo s'est cassé"]),
      correctAnswer: "Une voiture sortit d'une rue latérale et il chuta",
      order: 3,
    };

    const readQ4c: Question = {
      id: randomUUID(),
      exerciseId: readingExercise2Id,
      title: "Question 4 (Dénouement)",
      text: "Qu'a appris Marc de cet accident terrible?",
      type: "multiple_choice",
      options: JSON.stringify(["À conduire une voiture", "L'importance de porter un casque et devint ambassadeur de sécurité", "À courir au lieu de faire du vélo", "Rien du tout"]),
      correctAnswer: "L'importance de porter un casque et devint ambassadeur de sécurité",
      order: 4,
    };

    // HISTOIRE 3: La Fille qui Rêvait de Danser
    const readQ5: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Histoire 3: La Fille qui Rêvait de Danser",
      text: "Sophie avait 12 ans et vivait dans un petit village. Elle adorait danser mais elle n'avait jamais eu l'occasion de prendre des cours de danse. Elle regardait des vidéos de danse sur Internet et s'entraînait seule dans sa chambre. Ses parents n'avaient pas assez d'argent pour lui payer des cours professionnels.\n\nUn jour, en se promenant au village, Sophie vit une affiche: \"Auditions de danse pour l'école d'arts! Gratuit pour tous! Samedi à 14h au centre culturel!\"\n\nSophie était très nerveuse. Elle s'entraîna pendant toute la semaine. Le jour de l'audition, elle monta sur scène. Soudain, elle vit tous les regards fixés sur elle. Son cœur battait très fort. Elle oublia ses mouvements. Elle voulait arrêter et partir, mais elle prit une profonde respiration et continua de danser avec tout son cœur.\n\nLe directeur de l'école d'arts fut tellement impressionné par sa passion qu'il l'accepta dans l'école et lui offrit même une bourse complète! Sophie pouvait danser gratuitement! Elle devint une danseuse talentueuse et plus tard, elle voyagea partout dans le monde pour partager sa passion avec les autres.\n\nPourquoi Sophie ne pouvait-elle pas prendre de cours de danse avant?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle n'aimait pas la danse", "Ses parents n'avaient pas assez d'argent", "Il n'y avait pas de professeur", "Elle était trop occupée"]),
      correctAnswer: "Ses parents n'avaient pas assez d'argent",
      order: 1,
    };

    const readQ6: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 2 (Élément déclencheur)",
      text: "Quel événement a changé la vie de Sophie?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle trouva de l'argent", "Elle vit une affiche pour une audition gratuite", "Elle rencontra une danseuse professionnelle", "Elle reçut un cadeau"]),
      correctAnswer: "Elle vit une affiche pour une audition gratuite",
      order: 2,
    };

    const readQ6b: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 3 (Nœud)",
      text: "Quel problème Sophie affronta-t-elle sur scène?",
      type: "multiple_choice",
      options: JSON.stringify(["La musique était mauvaise", "Elle était très nerveuse, avait peur et voulait partir", "Un enfant l'a interrompue", "La lumière était trop forte"]),
      correctAnswer: "Elle était très nerveuse, avait peur et voulait partir",
      order: 3,
    };

    const readQ6c: Question = {
      id: randomUUID(),
      exerciseId: readingExercise3Id,
      title: "Question 4 (Dénouement)",
      text: "Comment la vie de Sophie changea-t-elle après l'audition?",
      type: "multiple_choice",
      options: JSON.stringify(["Elle arrêta de danser", "Elle fut acceptée et reçut une bourse complète", "Elle partit du village", "Rien ne changea"]),
      correctAnswer: "Elle fut acceptée et reçut une bourse complète",
      order: 4,
    };

    // HISTOIRE 4: L'Amitié Retrouvée
    const readQ7: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Histoire 4: L'Amitié Retrouvée",
      text: "Lucas et Thomas étaient les meilleurs amis du monde. Ils faisaient tout ensemble: jouer au football, faire leurs devoirs, manger le gâteau d'anniversaire ensemble. Ils s'aimaient comme des frères. Ils avaient juré de rester amis pour toujours.\n\nUn jour, la famille de Thomas déménagea dans une autre ville, à plusieurs centaines de kilomètres de distance. Lucas et Thomas se promettirent de rester en contact, mais avec le temps, les messages devinrent de moins en moins fréquents. Après un an, ils ne communiquaient plus du tout.\n\nLucas commença à se sentir très mal. Il pensait à Thomas tous les jours et avait le cœur brisé. Il voulait l'appeler mais avait peur que Thomas l'ait oublié. Thomas, de son côté, avait aussi les mêmes sentiments! Mais aucun des deux n'osa faire le premier pas.\n\nUn jour, Lucas reçut une lettre de Thomas. Thomas avait écrit: \"Mon ami Lucas, je t'ai tellement manqué. Je veux que tu saches que tu restes mon meilleur ami. Je suis désolé de ne pas avoir écrit plus souvent.\" Lucas courut immédiatement chez son ordinateur et écrivit une longue réponse. Ils commencèrent à se parler régulièrement. Quelques mois plus tard, Lucas visita Thomas pendant les vacances. Ils s'embrassèrent et pleurèrent de joie. Leur amitié était revenue plus forte que jamais!\n\nQuelle était la relation entre Lucas et Thomas?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils se détestaient", "Ils étaient des meilleurs amis comme des frères", "Ils étaient voisins", "Ils se connaissaient à peine"]),
      correctAnswer: "Ils étaient des meilleurs amis comme des frères",
      order: 1,
    };

    const readQ8: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 2 (Élément déclencheur)",
      text: "Quel événement a séparé Lucas et Thomas?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils se disputèrent", "La famille de Thomas déménagea loin", "Lucas devint occupé", "Ils allèrent à des écoles différentes"]),
      correctAnswer: "La famille de Thomas déménagea loin",
      order: 2,
    };

    const readQ8b: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 3 (Nœud)",
      text: "Quel était le problème pendant leur séparation?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils s'envoyaient trop de messages", "Ni l'un ni l'autre n'osait faire le premier pas", "Ils trouvaient que c'était trop difficile", "Ils avaient oublié l'un l'autre"]),
      correctAnswer: "Ni l'un ni l'autre n'osait faire le premier pas",
      order: 3,
    };

    const readQ8c: Question = {
      id: randomUUID(),
      exerciseId: readingExercise4Id,
      title: "Question 4 (Dénouement)",
      text: "Comment leur amitié a-t-elle été retrouvée?",
      type: "multiple_choice",
      options: JSON.stringify(["Ils se déplaçaient ensemble", "Thomas écrivit une lettre et Lucas répondit", "Lucas se força à oublier", "Ils trouvèrent un nouveau meilleur ami"]),
      correctAnswer: "Thomas écrivit une lettre et Lucas répondit",
      order: 4,
    };

    // Informatif - Un petit exercice
    const readQ9: Question = {
      id: randomUUID(),
      exerciseId: readingExercise5Id,
      title: "Histoire 5: La Découverte Scientifique",
      text: "Emma était une fille de 11 ans qui adorait la science. Elle passait des heures à faire des expériences dans sa chambre. Elle rêvait de devenir scientifique comme sa grand-mère.\n\nUn jour, elle découvrit une vieille expérience de cristaux de sel dans un livre de son grand-mère scientifique.\n\nEmma fit l'expérience mais quelque chose d'inattendu se produisit! Les cristaux se développaient d'une manière bizarre qu'elle n'avait jamais vue. Elle pensa d'abord que c'était un échec.\n\nAprès investigation, elle réalisa qu'elle avait créé une nouvelle forme de cristal! Elle présenta son découverte à l'école et gagna le prix de la meilleure expérience scientifique!\n\nQu'aimait faire Emma?",
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

    this.questions.set(question4.id, question4);
    this.questions.set(question5.id, question5);
    this.questions.set(readQ1.id, readQ1);
    this.questions.set(readQ2.id, readQ2);
    this.questions.set(readQ2b.id, readQ2b);
    this.questions.set(readQ2c.id, readQ2c);
    this.questions.set(readQ3.id, readQ3);
    this.questions.set(readQ4.id, readQ4);
    this.questions.set(readQ4b.id, readQ4b);
    this.questions.set(readQ4c.id, readQ4c);
    this.questions.set(readQ5.id, readQ5);
    this.questions.set(readQ6.id, readQ6);
    this.questions.set(readQ6b.id, readQ6b);
    this.questions.set(readQ6c.id, readQ6c);
    this.questions.set(readQ7.id, readQ7);
    this.questions.set(readQ8.id, readQ8);
    this.questions.set(readQ8b.id, readQ8b);
    this.questions.set(readQ8c.id, readQ8c);
    this.questions.set(readQ9.id, readQ9);
    this.questions.set(readQ10.id, readQ10);
    this.questions.set(writQ1.id, writQ1);
    this.questions.set(writQ2.id, writQ2);
    this.questions.set(writQ3.id, writQ3);
    this.questions.set(writQ4.id, writQ4);

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

  async getReadingNarrativeExercises(studentId: string): Promise<Exercise[]> {
    // Get all exercises and filter for reading narrative exercises
    const allExercises = Array.from(this.exercises.values());
    const readingExercises = allExercises.filter((ex) => {
      const course = this.courses.get(ex.courseId);
      return course && course.category === "Lecture & Compréhension" && ex.type === "text";
    });
    return readingExercises.slice(0, 5); // Return first 5 reading exercises
  }
}

export const storage = new MemStorage();
