# Français Actif - Plateforme d'Apprentissage du Français

## Vue d'ensemble
Application web éducative complète pour l'enseignement du français aux élèves en adaptation scolaire et sociale. Couvre les classes de mots, textes narratifs, et écriture avec un système d'exercices interactifs, suivi de progression, et rapports détaillés pour les enseignants.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI + Wouter
- **Backend**: Express.js + MemStorage
- **Database**: PostgreSQL (via Drizzle ORM)
- **Routing**: Wouter pour navigation côté client

## Fonctionnalités MVP Complètes

### Authentification ✅
- Page de login/inscription (enseignants et élèves)
- Rôles: "teacher" et "student"
- Identifiants de test:
  - Enseignant: `enseignant` / `password123`
  - Élève: `eleve` / `password123`

### Pour les Élèves ✅
- **Dashboard**: Liste de tous les cours assignés avec progression visuelle
- **Cours**: Affichage du contenu éducatif et liste des exercices associés
- **Exercices Interactifs**:
  - Questions à choix multiples (Classes de mots)
  - Questions texte libre (Écriture, Réflexion)
  - Rétroaction immédiate sur les réponses
- **Progression**: Suivi en pourcentage avec barre de progression
- **Badges**: Système de récompenses pour motivation
- **Navigation**: Tabs pour "Mes Cours", "Progression", "Badges"

### Pour les Enseignants ✅
- **Dashboard**: Création et gestion des cours
- **Gestion des Élèves**: Liste avec suivi de progression individuel
- **Création de Cours**: Formulaire rapide avec titre, description, catégorie
- **Rapports Détaillés**: 
  - Statistiques globales par élève
  - Précision moyenne des réponses
  - Cours complétés
  - Progression par catégorie
  - Export CSV des rapports

### Types de Contenu ✅
- **Classes de mots**: Noms, verbes, adjectifs, etc.
- **Textes narratifs**: Analyse de structure (situation initiale, nœud, dénouement)
- **Écriture**: Exercices d'écriture guidée

## Structure des Données

### Tables PostgreSQL
- **users**: Authentification (username, password, firstName, lastName, role)
- **courses**: Contenu éducatif par catégorie
- **exercises**: Exercices associés aux cours
- **questions**: Questions dans les exercices
- **student_responses**: Réponses des élèves avec évaluation
- **student_progress**: Suivi du pourcentage complété par cours
- **student_badges**: Badges gagnés
- **assignments**: Assignation des cours aux élèves

## Routes API Complètes

### Authentification
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion

### Utilisateurs
- `GET /api/users/:id` - Récupérer infos utilisateur

### Cours
- `GET /api/courses` - Tous les cours
- `GET /api/courses/:id` - Détails d'un cours
- `POST /api/courses` - Créer cours (enseignants)
- `GET /api/courses/:id/exercises` - Exercices d'un cours

### Exercices
- `GET /api/exercises/:id` - Détails exercice
- `POST /api/exercises` - Créer exercice
- `GET /api/exercises/:id/questions` - Questions de l'exercice

### Questions
- `POST /api/questions` - Créer question

### Réponses Élèves
- `POST /api/student-responses` - Soumettre réponse

### Progression
- `GET /api/students/:id/courses` - Cours assignés avec progression
- `GET /api/students/:id/badges` - Badges gagnés
- `GET /api/teachers/:id/students` - Élèves d'un enseignant
- `GET /api/teachers/:id/reports` - Rapports détaillés de progression

## Pages

| Route | Rôle | Fonction |
|-------|------|----------|
| `/` | Tous | Authentification (login/register) |
| `/student-dashboard` | Élève | Tableau de bord avec mes cours |
| `/teacher-dashboard` | Enseignant | Gestion des cours et élèves |
| `/teacher-reports` | Enseignant | Rapports détaillés de progression |
| `/course/:id` | Élève | Contenu du cours + liste exercices |
| `/exercise/:id` | Élève | Exercice interactif |

## Design & UX

- **Langue**: Entièrement en français
- **Accessibilité**: Interfaces épurées, hiérarchie visuelle claire
- **Responsivité**: Mobile, tablet, desktop optimisés
- **Dark Mode**: Support complet
- **Rétroaction**: Feedback immédiat sur les actions
- **Motivations**: Badges, progressions visuelles, encouragements

## 50 Leçons Focalisées par Catégorie

### Grammaire (9 leçons)
1. Les Noms - Identificationet classification
2. Les Verbes - Identification et fonctions
3. Les Adjectifs - Description et modification
4. Les Pronoms - Remplacement des noms
5. Les Prépositions - Utilisation et sens
6. Les Adverbes - Manière, temps, lieu, quantité
7. Les Mots de Liaison - Et, ou, mais, car, donc
8. Phrase Simple - Structure de base
9. Phrase Complexe - Coordination et subordination
10. Genres et classes de noms - Masculin/féminin
11. Structure complète de phrase - Sujet, verbe, COD, COI, CC
12. Voix active et passive - Transformation

### Orthographe (10 leçons)
1. Les règles de base - Majuscules, accents, ponctuation
2. Accords: noms et adjectifs - Genre et nombre
3. Les accords du verbe - Conjugaison correcte
4. Les homophones - Mots qui se prononcent pareils
5. Les pièges courants - Erreurs fréquentes
6. Homophones courants - A/à, ou/où, son/sont, ce/se, mes/mais
7. Autres homophones - Cher/chère, vers/vert, pair/père/paire, court/cour
8. Pluriels spéciaux - Mots en -al, -eau, -au, -ail
9. Accord du participe passé - Avec avoir/être
10. Mots invariables et exceptions - Couleurs, adverbes

### Conjugaison (9 leçons)
1. Les verbes au présent - Groupes 1, 2, 3
2. Le passé composé - Construction et utilisation
3. L'imparfait - Formation et usage
4. Le futur simple - Prédiction et événements
5. Le conditionnel - Hypothèse et politesse
6. Les temps composés - Plus-que-parfait, futur antérieur
7. Temps composés avancés - Conditionnel passé, subjonctif passé
8. Le subjonctif présent - Doute, incertitude, émotion
9. L'imparfait - Comparaison avec passé composé

### Ponctuation (5 leçons)
1. Signes basiques - Point, virgule, ?, !
2. Signes avancés - Tirets, guillemets, parenthèses, apostrophe
3. Espaces et dialogue français - Règles d'espacement
4. Tirets et pointillés avancés - Utilisations stylistiques
5. Virgules dans propositions complexes - Placement correct

### Lecture & Compréhension (8 leçons)
1. Texte descriptif - Techniques de description
2. Texte explicatif - Comment expliquer un phénomène
3. Texte argumentatif - Persuasion et arguments
4. Texte informatif - Informations factuelles
5. Vocabulaire en contexte - Deviner sens des mots
6. Compréhension écrite - Principal vs secondaire
7. Questions de compréhension - Techniques de réponse
8. Analyse de texte - Thème, messages, intentions

## Données de Test Incluses

### Utilisateurs
- Enseignant: Marie Dubois (enseignant/password123)
- Élève: Jean Martin (eleve/password123)

### Exercices
- Exercices à choix multiples pour validation immédiate
- Exercices texte libre pour écriture
- Tous les 50 cours ont des exercices associés

## État du Projet

✅ **Phase 1 - Complétée**: Schema + Frontend + Design
✅ **Phase 2 - Complétée**: Backend + API Routes + Storage
✅ **Phase 3 - Complétée**: Database PostgreSQL + Rapports + Données de test
✅ **MVP Features** - TERMINÉ
✅ **50 Leçons Focalisées** - AJOUTÉES (Janvier 2025)
✅ **73+ Leçons Complètes** - AJOUTÉES 12 LEÇONS CRITIQUES (November 25, 2025):
   - 7 Grammaire: Déterminants, Conjonctions, Interjections, GN, GV, Sujet/Compléments, Types phrases
   - 1 Orthographe: Homophones grammaticaux essentiels
   - 4 Ponctuation: Point/?, Virgule, Deux-points/tirets, Guillemets

## Fonctionnalités Future (Non MVP)

Ces fonctionnalités pourront être ajoutées ultérieurement:
- Exercices adaptatifs avec ajustement de difficulté
- Activités audio pour compréhension orale
- Communication enseignant-élève via messages
- Export multi-formats (PDF, Excel)
- Quiz temporisés
- Remise de devoirs

## Instructions Déploiement

L'application est prête pour la publication:
1. Utilisez la base de données PostgreSQL configurée
2. Toutes les routes API sont fonctionnelles
3. Les données de test sont incluses
4. Les rapports peuvent être téléchargés en CSV

**Identifiants de test**:
- Enseignant: `enseignant` / `password123`
- Élève: `eleve` / `password123`
