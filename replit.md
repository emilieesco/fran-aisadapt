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

## Données de Test Incluses

### Utilisateurs
- Enseignant: Marie Dubois (enseignant/password123)
- Élève: Jean Martin (eleve/password123)

### Cours Disponibles
1. **Identification des noms** (Classes de mots) - 2 exercices
2. **Identification des verbes** (Classes de mots) - 1 exercice
3. **Structure du texte narratif** (Textes narratifs) - 2 exercices

### Exercices
- Exercices à choix multiples pour validation immédiate
- Exercices texte libre pour écriture

## État du Projet

✅ **Phase 1 - Complétée**: Schema + Frontend + Design
✅ **Phase 2 - Complétée**: Backend + API Routes + Storage
✅ **Phase 3 - Complétée**: Database PostgreSQL + Rapports + Données de test
✅ **MVP Features** - TERMINÉ

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
