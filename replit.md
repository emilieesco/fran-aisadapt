# Français Actif - Plateforme d'Apprentissage du Français

## Vue d'ensemble
Application web éducative complète pour l'enseignement du français aux élèves en adaptation scolaire et sociale. Couvre les classes de mots, textes narratifs, et écriture avec un système d'exercices interactifs et de suivi de progression.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: Express.js + MemStorage (prêt pour PostgreSQL)
- **Routing**: Wouter pour navigation côté client

## Fonctionnalités MVP

### Authentification
- Page de login/inscription (enseignants et élèves)
- Rôles: "teacher" et "student"

### Pour les Élèves
- **Dashboard**: Liste de tous les cours avec progression visuelle
- **Cours**: Affichage du contenu et liste des exercices
- **Exercices**: Questions interactives (choix multiples, texte libre)
- **Progression**: Suivi visuel en pourcentage
- **Badges**: Système de récompenses pour motivation
- **Tabs**: Navigation entre "Mes Cours", "Progression", "Badges"

### Pour les Enseignants
- **Dashboard**: Création et gestion des cours
- **Élèves**: Liste avec suivi de progression individuel
- **Cours**: Création rapide avec titre, description, catégorie
- **Catégories**: "classes_de_mots", "textes_narratifs", "ecriture"

## Structure des Données
- **Users**: Authentification (username, password, firstName, lastName, role)
- **Courses**: Contenu éducatif par catégorie
- **Exercises**: Exercices associés aux cours
- **Questions**: Questions dans les exercices
- **StudentResponses**: Réponses des élèves avec évaluation
- **StudentProgress**: Suivi du pourcentage complété par cours
- **StudentBadges**: Badges gagnés
- **Assignments**: Assignation des cours aux élèves

## Routes API
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

## Pages
- `/` - Page d'authentification
- `/student-dashboard` - Tableau de bord élève
- `/teacher-dashboard` - Tableau de bord enseignant
- `/course/:id` - Détails du cours
- `/exercise/:id` - Exercice interactif

## Design
- Basé sur `design_guidelines.md`
- Polices: Poppins (titres), Inter (corps)
- Schéma de couleurs: Bleu primaire, verts pour succès, rouges pour erreurs
- Layout responsive (mobile, tablet, desktop)
- Dark mode supporté
- Animations légères et feedbacks visuels

## État du Projet
✅ Phase 1 complétée: Schema + Frontend
✅ Phase 2 complétée: Backend + Storage
⏳ Phase 3: À tester - intégration frontend/backend et données de test

## Prochaines Étapes
1. Tester l'application
2. Ajouter données de test (cours, exercices, questions)
3. Affiner les états de chargement/erreur
4. Optimiser le design selon feedback
