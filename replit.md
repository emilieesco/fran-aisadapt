# Français Actif - Plateforme d'Apprentissage du Français

## Overview
Français Actif is a comprehensive web-based educational platform designed to teach French to students in specialized educational support programs. Its core purpose is to provide an interactive learning environment covering French grammar, narrative texts, and writing skills. The platform features interactive exercises, progression tracking, and detailed reporting for teachers. The project aims to enhance French language acquisition through an engaging and adaptive learning experience, fostering improved educational outcomes for students and providing educators with robust tools for monitoring and support.

## User Preferences
I prefer that the agent focuses on completing the project's core functionalities. I want detailed explanations when new features are implemented or significant changes are made. I value an iterative development approach where I can review and provide feedback on incremental progress. Please ensure all communication is clear and concise.

## System Architecture
The application follows a client-server architecture.

**Frontend:**
-   **Framework:** React
-   **Styling:** Tailwind CSS for utility-first styling, complemented by Shadcn UI components for a modern and accessible design.
-   **Routing:** Wouter is used for client-side navigation.
-   **UI/UX Decisions:**
    -   Entirely in French.
    -   Clean interfaces and clear visual hierarchy for accessibility.
    -   Responsive design for mobile, tablet, and desktop.
    -   Full dark mode support.
    -   Immediate feedback for user actions.
    -   Motivational elements include badges, visual progress bars, and encouraging messages.

**Backend:**
-   **Framework:** Express.js
-   **Storage:** `DatabaseStorage` (PostgreSQL) is the primary storage solution, with a `MemStorage` fallback primarily for read-only pedagogical content.
-   **Database ORM:** Drizzle ORM with `pg` for PostgreSQL interactions.

**Database Configuration (Hybrid Storage):**
-   **Persistent Data (PostgreSQL):** User accounts, student responses, course progression, badges, and teacher-student assignments are stored here.
-   **In-Memory Data (Read-only):** Over 95 pedagogical courses, 343+ exercises, and all questions are loaded into memory for fast access.

**Core Features:**
-   **Authentication:** Login/registration for teachers and students with role-based access.
-   **Student Dashboard:** Displays assigned courses with visual progress, interactive exercises (multiple-choice, free-text, dictation, fill-in-the-blank), progression tracking, and badge system.
-   **Teacher Dashboard:** Manages courses and students, tracks individual student progress, creates courses, and generates detailed progress reports (including CSV export).
-   **Content Types:** Covers grammar, orthography, conjugation, punctuation, reading comprehension, and writing, with specific modules for word classes, narrative texts, descriptive texts, and dictation.
-   **Adaptive Learning:** Exercise flow adapts based on student performance, offering repetition for low scores and progressing to the next exercise for higher scores.
-   **Interactive Dictation:** Features Web Speech API (fr-CA) with listen/re-listen/slow-play options and real-time word-by-word correction.
-   **Enriched Exercise Summaries:** Provides colored scores, adaptive motivational messages, and detailed question-by-question review with correct answers.
-   **Messagerie privée:** Tables `messages` + `notifications` en PostgreSQL; routes API complètes; interface chat élève↔enseignant; cloche de notifications dans les deux tableaux de bord; notification auto lors de correction de document.
-   **Annotation d'exercices:** L'enseignant peut annoter chaque réponse d'élève (commentaire textuel + notation Correct/Incorrect pour texte libre) via un panneau latéral dans l'onglet Élèves. Les annotations sont visibles par l'élève dans l'onglet Progrès (section "Corrections de l'enseignant").
-   **Groupes d'élèves:** Tables `student_groups` + `group_members` en PostgreSQL (Railway). Routes API CRUD complètes (8 endpoints). Interface enseignant : 5e onglet "Groupes" avec création/modification/suppression de groupes, sélecteur de couleur, gestion des membres (ajouter/retirer) via panneau interactif.
-   **Exercices de classement (`sorting`):** Nouveau type d'exercice interactif — l'élève clique sur un mot pour le sélectionner puis clique sur la colonne cible pour le placer. Correction immédiate item par item après soumission. 4 cours ajoutés : classes de mots (3 niveaux), groupes syntaxiques GN/GV/GPrép, fonctions syntaxiques Sujet/CD/CI/CP, homophones à/a et son/sont.
-   **Exercices Vrai ou Faux (`true_false`):** Nouveau type d'exercice — une affirmation grammaticale s'affiche, l'élève choisit Vrai ou Faux via deux grands boutons colorés. Après soumission : bouton correct en vert, mauvais choix en rouge, et explication détaillée affichée. 4 cours ajoutés : classes de mots (8 affirmations), conjugaison (8 affirmations), orthographe et accord (8 affirmations), ponctuation et syntaxe (8 affirmations).
-   **Exercices Mise en ordre (`ordering`):** Nouveau type d'exercice — l'élève remet des éléments dans le bon ordre à l'aide de flèches haut/bas. Correction item par item après soumission, avec affichage du bon ordre pour les erreurs. Badge indigo "Mise en ordre". 4 cours ajoutés : schéma narratif (5 étapes), processus d'écriture (5 étapes), temps verbaux chronologiques (6 temps), structure d'un paragraphe argumentatif (4 parties).
-   **Cartes à tâches (`flashcard`):** Nouveau type d'exercice interactif — carte retournable avec animation CSS 3D. Recto : terme/question. Verso : définition complète avec exemples. Auto-évaluation : "Je savais !" (vert) / "À revoir" (orange). Option de retravailler uniquement les cartes à revoir. Score = % de cartes sues. Indicateur de progression en pastilles colorées. 3 paquets : Classes de mots (12 cartes, grammaire), Marqueurs de relation (10 cartes par catégorie logique, ecriture), Temps verbaux (8 cartes : formation + emploi, conjugaison). Cours 153–155.
-   **FPT — Documents québécois (cours 50–54) :** 5 nouveaux cours documentaires réalistes avec le personnage de Léa Tremblay : facture Hydro-Québec (tarif D, kWh, redevance), relevé d'emploi RE (Code A, heures assurables, AE), contrat de travail (LNT, salaire, vacances, préavis), talon de paye (brut/net, RRQ, AE, RQAP, impôt), avis de cotisation Revenu Québec (revenu imposable, crédits, remboursement). 8 questions QCM chacun.
-   **Texte descriptif — série complète (cours 85–96) :** Structure (sujet/aspects/sous-aspects), marqueurs de relation, procédés (métaphore, comparaison, personnification, énumération, champs sensoriels), Vrai/Faux, Mise en ordre, lectures analytiques (Plateau-Mont-Royal, portrait Mme Simard, automne québécois, marché Atwater), blancs à remplir (parc La Fontaine), choisir la meilleure formulation, construire un paragraphe. Catégories : ecriture et lecture_descriptif.
-   **Texte explicatif — série complète (cours 97–99, 103–106) :** Structure (mise en situation / explication cause-effet ou processus / conclusion), marqueurs de cause-conséquence-séquence-illustration, procédés (définition, exemple, comparaison, analogie, reformulation), Vrai/Faux (8 affirmations), lectures analytiques (aurores boréales, sirop d'érable), compléter un texte explicatif (cycle de l'eau, blancs à remplir). Catégories : ecriture et lecture_informatif.
-   **Texte argumentatif — série complète (cours 107–109, 117–120) :** Structure (thèse, arguments, contre-arguments, réfutation, conclusion; sujet amené/posé/divisé), marqueurs d'addition-opposition-concession-renforcement-conclusion, procédés (argument d'autorité, argument par l'exemple, argument logique, analogie argumentative, appel aux valeurs), Vrai/Faux (8 affirmations), lectures analytiques (transport en commun gratuit, réseaux sociaux et adolescents), compléter un texte argumentatif (travail étudiant). Catégories : ecriture et lecture_argumentatif.

## External Dependencies
-   **PostgreSQL (via Railway):** Primary relational database for persistent user and progress data.
-   **Drizzle ORM:** Used for type-safe interaction with PostgreSQL.
-   **pg:** PostgreSQL client for Node.js.
-   **React:** Frontend library.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **Shadcn UI:** UI component library.
-   **Wouter:** Lightweight React hook-based router.
-   **Express.js:** Web application framework for Node.js.
-   **Web Speech API:** Utilized for text-to-speech functionality in dictation exercises (specifically `fr-CA` locale).