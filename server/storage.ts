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
      title: "Identification des noms",
      description: "Apprenez à identifier et classifier les différents types de noms",
      category: "grammaire",
      content:
        "<h3>Les Noms</h3><p>Un nom est un mot qui désigne une personne, un animal, une chose, une idée ou un sentiment.</p><p><strong>Exemples:</strong> chat, maison, liberté, professeur</p><p><strong>Les types de noms:</strong></p><ul><li>Noms communs: désignent des êtres ou des choses de façon générale</li><li>Noms propres: désignent des êtres ou des choses particuliers</li></ul>",
      order: 1,
    };

    const course2: Course = {
      id: course2Id,
      title: "Identification des verbes",
      description: "Maîtrisez l'identification des verbes et leurs conjugaisons",
      category: "grammaire",
      content:
        "<h3>Les Verbes</h3><p>Un verbe est un mot qui exprime une action ou un état.</p><p><strong>Exemples:</strong> manger, courir, être, avoir</p>",
      order: 2,
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
    this.courses.set(course3Id, course3);

    // Create sample exercises
    const exercise1Id = randomUUID();
    const exercise2Id = randomUUID();
    const exercise3Id = randomUUID();
    const exercise4Id = randomUUID();
    const exercise5Id = randomUUID();

    const exercise1: Exercise = {
      id: exercise1Id,
      courseId: course1Id,
      title: "Exercice: Identifier les noms",
      description: "Identifiez les noms dans les phrases suivantes",
      type: "multiple_choice",
      order: 1,
    };

    const exercise2: Exercise = {
      id: exercise2Id,
      courseId: course1Id,
      title: "Exercice: Classer les noms",
      description: "Classifiez les noms en noms communs ou propres",
      type: "multiple_choice",
      order: 2,
    };

    const exercise3: Exercise = {
      id: exercise3Id,
      courseId: course2Id,
      title: "Exercice: Identifier les verbes",
      description: "Trouvez tous les verbes dans les phrases",
      type: "multiple_choice",
      order: 1,
    };

    const exercise4: Exercise = {
      id: exercise4Id,
      courseId: course3Id,
      title: "Exercice: Analyser la structure narrative",
      description: "Identifiez les éléments du texte narratif",
      type: "multiple_choice",
      order: 1,
    };

    const exercise5: Exercise = {
      id: exercise5Id,
      courseId: course3Id,
      title: "Exercice: Écrire un texte narratif",
      description: "Écrivez un court texte narratif sur un événement",
      type: "text",
      order: 2,
    };

    this.exercises.set(exercise1Id, exercise1);
    this.exercises.set(exercise2Id, exercise2);
    this.exercises.set(exercise3Id, exercise3);
    this.exercises.set(exercise4Id, exercise4);
    this.exercises.set(exercise5Id, exercise5);

    // Create sample questions
    const question1: Question = {
      id: randomUUID(),
      exerciseId: exercise1Id,
      title: "Question 1",
      text: 'Quel est le nom dans la phrase: "Le chat noir dort sur le canapé"?',
      type: "multiple_choice",
      options: JSON.stringify(["Le", "chat", "noir", "dort"]),
      correctAnswer: "chat",
      order: 1,
    };

    const question2: Question = {
      id: randomUUID(),
      exerciseId: exercise1Id,
      title: "Question 2",
      text: 'Combien de noms y a-t-il dans la phrase: "La fille et le garçon jouent au parc"?',
      type: "multiple_choice",
      options: JSON.stringify(["1", "2", "3", "4"]),
      correctAnswer: "3",
      order: 2,
    };

    const question3: Question = {
      id: randomUUID(),
      exerciseId: exercise3Id,
      title: "Question 1",
      text: 'Quel est le verbe dans la phrase: "Le professeur enseigne les mathématiques"?',
      type: "multiple_choice",
      options: JSON.stringify(["professeur", "enseigne", "mathématiques", "Les"]),
      correctAnswer: "enseigne",
      order: 1,
    };

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

    this.questions.set(question1.id, question1);
    this.questions.set(question2.id, question2);
    this.questions.set(question3.id, question3);
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
