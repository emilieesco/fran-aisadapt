# Guidelines de Design - Application Éducative en Français

## Approche de Design

**System Sélectionné**: Material Design adapté pour l'éducation
- Justification: Interface claire et structurée essentielle pour élèves en adaptation scolaire
- Hiérarchie visuelle forte pour faciliter la navigation
- Composants cohérents et prévisibles pour réduire la charge cognitive

## Principes de Design Fondamentaux

1. **Clarté avant tout**: Interfaces épurées, une tâche principale par écran
2. **Rétroaction immédiate**: Validation visuelle instantanée des actions
3. **Progression visible**: Indicateurs de progrès omniprésents
4. **Encouragement positif**: Célébration des réussites avec badges/animations légères

## Typographie

**Famille de Police**: 
- Titres: Poppins (600, 700) - lisible, moderne, amicale
- Corps de texte: Inter (400, 500) - excellente lisibilité à l'écran
- Interface: Inter (500, 600)

**Hiérarchie**:
- H1: text-4xl/text-5xl font-bold (Titres de pages)
- H2: text-2xl/text-3xl font-semibold (Sections principales)
- H3: text-xl font-semibold (Sous-sections)
- Corps: text-base/text-lg (Contenu principal - taille plus grande pour accessibilité)
- Labels: text-sm font-medium (Éléments d'interface)

## Système d'Espacement

**Unités Tailwind**: 2, 4, 6, 8, 12, 16, 20
- Espacement intra-composant: p-4, p-6
- Espacement entre composants: mb-6, mb-8
- Marges de section: py-12, py-16
- Grilles/cartes: gap-4, gap-6

## Structure de Layout

**Container Principal**: max-w-7xl mx-auto px-4 md:px-6 lg:px-8

**Navigation Enseignant**:
- Sidebar fixe (desktop): w-64, navigation verticale avec icônes + labels
- Top bar (mobile): Navigation hamburger repliable
- Sections: Tableau de bord, Élèves, Activités, Rapports, Paramètres

**Navigation Élève**:
- Interface simplifiée avec grandes cartes cliquables
- Navigation principale horizontale avec icônes colorées
- Sections: Mes Activités, Mes Badges, Mes Progrès

## Bibliothèque de Composants

### Navigation
**Sidebar Enseignant**:
- Items de menu: flex items-center gap-3, p-3, rounded-lg
- État actif: Fond subtil, bordure gauche accentuée
- Icônes: Heroicons (24px)

**Cards de Navigation Élève**:
- Grandes cartes (min-h-48): Icône + Titre + Description courte
- Grid responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Effet hover: slight elevation, scale-105

### Cartes d'Activité
**Structure**:
- Header: Icône de catégorie + Titre + Badge de difficulté
- Body: Description concise (2-3 lignes max)
- Footer: Progression + Bouton d'action
- Dimensions: p-6, rounded-xl, shadow-md

**Types**:
- Classes de mots: Icône livre/grammaire
- Textes narratifs: Icône document/lecture
- Écriture: Icône crayon/stylo

### Système de Badges/Récompenses
- Forme circulaire: w-16 h-16 md:w-20 md:h-20
- Animation d'apparition: fade-in + bounce subtil
- Grid display: grid-cols-3 md:grid-cols-4 gap-4

### Formulaires
**Champs de saisie**:
- Hauteur: h-12 (plus grands pour faciliter l'interaction)
- Padding: px-4
- Border radius: rounded-lg
- Focus: ring-2 (focus visible clair)

**Boutons**:
- Primaire: px-6 py-3, rounded-lg, font-medium
- Secondaire: px-6 py-3, rounded-lg, border-2
- Tailles: Large pour actions principales, medium pour actions secondaires

### Indicateurs de Progrès
**Barres de progression**:
- Hauteur: h-3, rounded-full
- Container: Fond subtil, barre remplie avec animation
- Pourcentage affiché: text-sm font-semibold

**Stats/Métriques**:
- Cards compactes: p-4, centré
- Nombre: text-3xl font-bold
- Label: text-sm

### Zones d'Exercices Interactifs
**Zone de Question**:
- Container: p-8, rounded-xl, fond distinct
- Énoncé: text-lg font-medium, mb-6
- Options multiples: gap-3, boutons large height (min-h-12)

**Feedback Visuel**:
- Correct: Bordure/fond vert subtil + icône checkmark
- Incorrect: Bordure/fond rouge subtil + icône X
- Animation: fade-in rapide (200ms)

### Dashboard Enseignant
**Vue d'ensemble**:
- Grid de statistiques: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Liste d'élèves: Table responsive avec avatars + statuts
- Activités récentes: Timeline verticale avec icônes

**Création d'Activités**:
- Multi-step form avec indicateur de progression
- Preview panel (desktop): Split screen 50/50
- Sections claires avec titres et descriptions

## Images

**Hero Section - Page d'Accueil**:
- Image illustrative: Élèves en classe collaborant (illustration moderne, inclusive)
- Dimensions: Full width, h-96 md:h-[32rem]
- Overlay subtil pour contraste texte
- Boutons CTA: Fond légèrement flou (backdrop-blur-sm)

**Illustrations dans Activités**:
- Petites illustrations décoratives pour chaque module
- Position: Coin supérieur droit des cards ou headers de section
- Style: Illustrations plates, amicales, éducatives

**Avatars Élèves**:
- Placeholders colorés avec initiales si pas de photo
- Taille: w-10 h-10 (listes), w-24 h-24 (profils)
- Border radius: rounded-full

## Animations

**Minimales et Purposeful**:
- Transitions de page: fade 150ms
- Feedback correct/incorrect: bounce subtle 300ms
- Badges débloqués: scale + sparkle effect 500ms
- Hover cards: scale-102 transition 200ms
- **Aucune animation scroll** - distraction inutile

## Accessibilité

- Contraste minimum: WCAG AA (4.5:1 pour texte)
- Focus indicators: Toujours visibles (ring-2)
- Taille cliquable minimum: 44x44px
- Labels explicites sur tous les champs
- Navigation au clavier complète
- Aria-labels en français pour lecteurs d'écran

## Responsive Breakpoints

- Mobile: < 768px (Stack tout en colonnes simples)
- Tablet: 768px - 1024px (Grid 2 colonnes)
- Desktop: > 1024px (Full layouts, sidebar visible)

## Zones Critiques UX

1. **Clarté de l'objectif**: Chaque activité doit montrer immédiatement ce qui est attendu
2. **Feedback constant**: L'élève doit toujours savoir où il en est
3. **Simplicité enseignant**: Créer une activité en 3 étapes max
4. **Célébration**: Animations positives lors des réussites (badges, sons courts)