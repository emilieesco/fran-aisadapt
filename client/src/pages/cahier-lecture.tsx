import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Download, BookOpen, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface QuestionBlock {
  dimension: string;
  couleur: string;
  questions: [string, string, string, string];
}
interface Story {
  id: number;
  titre: string;
  sousTitre: string;
  texte: string[];   // paragraphes
  questions: QuestionBlock[];
}

// ── Données : 10 histoires ─────────────────────────────────────────────────────
const HISTOIRES: Story[] = [
  {
    id: 1,
    titre: "Le voyage de Thomas",
    sousTitre: "Un adolescent de 13 ans part seul pour la première fois à Montréal",
    texte: [
      "Thomas Bergeron avait toujours vécu à Sainte-Rose, un petit village tranquille perdu entre les collines des Laurentides. À treize ans, sa vie se résumait à l'école, au hockey le samedi matin et aux sorties en forêt avec son grand-père Marcel. Il connaissait chaque chemin de terre, chaque ruisseau, chaque vieille clôture de bois de son village. Mais la grande ville, avec ses gratte-ciel, ses métros bondés et ses milliers d'inconnus, lui était aussi étrangère qu'une autre planète.",
      "Un matin de mai, sa mère lui tendit une enveloppe bleue. À l'intérieur, un billet de train aller-retour pour Montréal et une note griffonnée à la hâte : « Ton père t'attend à la gare Centrale, quai 7, à 14 h. Bonne chance, mon grand. » Thomas sentit son estomac se nouer. Son père, qu'il n'avait pas vu depuis trois ans, voulait le voir. Seul. Sans sa mère. Pour la première fois de sa vie, Thomas devrait voyager sans adulte à ses côtés. La veille du départ, il ne dormit presque pas, imaginant mille catastrophes : rater son train, se perdre dans le métro, ne plus reconnaître le visage de son père.",
      "Le lendemain matin, sac à dos sur les épaules, Thomas monta dans le car qui l'emmènerait à la gare de Saint-Jérôme. Pendant le trajet, il révisait mentalement le plan du métro qu'il avait imprimé et mémorisé. À la gare, il acheta son billet au guichet automatique, les mains légèrement tremblantes. Le train s'ébranla dans un sifflement. Par la fenêtre, les champs verts et les clochers d'église cédèrent progressivement la place aux banlieues grises, puis aux tours d'acier de Montréal. Thomas était fasciné et terrifié à la fois.",
      "À la gare Centrale, il se retrouva dans un flux ininterrompu de voyageurs pressés. Il faillit paniquer quand son téléphone afficha « réseau indisponible ». Il respira profondément, sortit son plan papier, et suivit les flèches. Quai 7. Son père était là, plus vieux que dans ses souvenirs, les tempes grisonnantes, mais avec le même sourire en coin qui creusait une fossette sur sa joue gauche. Thomas sentit quelque chose se desserrer dans sa poitrine. Ils se regardèrent une longue seconde, puis son père ouvrit les bras.",
      "Ils passèrent l'après-midi à marcher dans le Vieux-Montréal, à manger des crêpes au restaurant du coin, à parler — vraiment parler — pour la première fois depuis des années. Son père lui expliqua pourquoi il était parti, et Thomas, malgré la douleur encore vive, l'écouta sans interrompre. Au retour, dans le train du soir qui filait vers les Laurentides, Thomas regardait les lumières de la ville s'éloigner. Il n'était plus tout à fait le même garçon qu'au matin. Quelque chose avait changé — une petite lumière s'était allumée dans sa poitrine, fragile mais réelle.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "D'où vient Thomas et comment est décrit son village au début de l'histoire ?",
          "Quels sont les trois éléments contenus dans l'enveloppe bleue que sa mère lui remet ?",
          "Quelles sont les deux difficultés concrètes que Thomas rencontre à la gare Centrale ?",
          "Où Thomas et son père passent-ils l'après-midi et de quoi parlent-ils ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Quel est le défi principal que Thomas doit surmonter dans cette histoire ? Explique en tes propres mots.",
          "Comment la description de Montréal change-t-elle au fil du trajet en train ? Que représente ce changement ?",
          "En quoi la phrase finale «quelque chose avait changé» résume-t-elle toute l'histoire ?",
          "Quelle est la structure de cette histoire ? Identifie et explique les cinq étapes du schéma narratif.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi la mère de Thomas lui dit-elle « bonne chance, mon grand » plutôt que « bon voyage » ? Qu'est-ce que cela révèle ?",
          "Que représente symboliquement le plan du métro que Thomas a imprimé et mémorisé ?",
          "À ton avis, pourquoi l'auteur décrit-il les «champs verts et les clochers d'église» qui cèdent la place aux «tours d'acier» ?",
          "Que signifie l'expression « quelque chose se desserrer dans sa poitrine » au moment où Thomas voit son père ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "Si tu étais Thomas, aurais-tu accepté de faire ce voyage seul ? Explique ta réaction en t'appuyant sur le texte.",
          "Quelle phrase ou quel passage t'a le plus touché(e) dans cette histoire ? Pourquoi ?",
          "Thomas choisit d'écouter son père « sans interrompre ». Est-ce la bonne décision selon toi ? Justifie.",
          "Est-ce que cette histoire te rappelle une situation où tu as dû faire face à quelque chose d'inconnu ? Compare.",
        ],
      },
      {
        dimension: "Dimension 4 — Appréciation littéraire",
        couleur: "#b45309",
        questions: [
          "L'auteur compare Montréal à «une autre planète». Explique cette figure de style et son effet sur le lecteur.",
          "Relève deux détails précis dans le texte qui montrent que Thomas a peur, sans que le mot «peur» soit utilisé.",
          "En quoi la «petite lumière allumée dans sa poitrine» est-elle une image efficace pour terminer l'histoire ?",
          "Quel titre aurais-tu donné à cette histoire ? Justifie ton choix en lien avec le thème principal.",
        ],
      },
    ],
  },

  {
    id: 2,
    titre: "La cabane du lac Perdu",
    sousTitre: "Deux amies découvrent un mystère au cœur de la forêt laurentienne",
    texte: [
      "Chaque été depuis qu'elles avaient sept ans, Léa Tremblay et Fatima Diallo passaient deux semaines au chalet de la famille Tremblay, au bord du lac Perdu. Le lac portait bien son nom : caché derrière trois rangs de collines boisées, accessible seulement par un sentier de quatre kilomètres, il n'apparaissait sur aucune carte routière moderne. C'était leur royaume secret, leur espace hors du temps, loin des téléphones, des réseaux sociaux et des règles de la ville.",
      "Ce matin-là, elles avaient décidé d'explorer la rive est du lac, qu'elles n'avaient jamais visitée. La végétation était plus dense de ce côté, les épinettes plus serrées, et une odeur de mousse humide flottait dans l'air. Après une heure de marche, Fatima s'arrêta brusquement. Entre deux épinettes géantes, à peine visible sous un rideau de fougères, se dressait une cabane. Pas une cabane moderne en planches d'épicerie, mais une vraie cabane de bois rond, construite à l'ancienne, avec un toit de bardeaux verts de mousse et une porte en bois sculpté.",
      "Le cœur battant, elles s'approchèrent. La porte était entrouverte. À l'intérieur : un poêle à bois rouillé, une table grossière, deux chaises dépaillées, et sur la table, un cahier rouge recouvert de cuir. Léa le saisit avec précaution. À la première page, une écriture fine et penchée : « Journal de Gérard Lalonde, gardien du lac, 1958–1971. Si tu lis ces lignes, c'est que tu as retrouvé ce que j'ai caché. Suis les indications. » En dessous, une série de symboles étranges — des flèches, des chiffres, des dessins d'arbres.",
      "Les deux filles passèrent le reste de la journée à tenter de déchiffrer les symboles. Gérard Lalonde, elles l'apprirent plus tard en interrogeant le grand-père de Léa, avait été un trappeur légendaire dans la région. Selon la rumeur, il avait trouvé de l'or dans la rivière qui alimentait le lac et l'avait caché avant de mourir dans un accident de chasse en 1971. Personne n'avait jamais retrouvé ni l'or ni la cabane.",
      "Après deux jours de recherches méthodiques, suivant chaque flèche, comptant chaque pas, Léa et Fatima creusèrent sous un vieux pin solitaire à cent pas au nord de la cabane. Leurs pelles frappèrent quelque chose de dur : une boîte en fer-blanc. Dedans, pas d'or. Mais des lettres d'amour, des photos en noir et blanc d'un homme et d'une femme, et une médaille militaire. Le «trésor» de Gérard, c'était sa vie. Ce soir-là, les deux amies s'assirent devant le feu et lurent les lettres à voix haute, pendant des heures, comme si elles donnaient vie à quelqu'un qui n'avait pas voulu être oublié.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Depuis quel âge Léa et Fatima vont-elles au chalet et combien de temps y passent-elles chaque été ?",
          "Quels objets les deux filles trouvent-elles à l'intérieur de la cabane ?",
          "Qui était Gérard Lalonde selon la rumeur, et que lui était-il arrivé en 1971 ?",
          "Que contient la boîte en fer-blanc trouvée sous le vieux pin ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Explique en tes propres mots pourquoi la découverte de la boîte constitue un «trésor» inattendu.",
          "Comment la description de l'endroit (forêt dense, odeur de mousse, cabane ancienne) contribue-t-elle à l'atmosphère de l'histoire ?",
          "Quelle est la leçon principale que cette histoire veut transmettre au lecteur ?",
          "Trace le schéma narratif de cette histoire en identifiant clairement les cinq étapes.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Gérard Lalonde a-t-il caché sa boîte en s'assurant qu'elle serait retrouvée un jour ? Qu'est-ce que cela révèle sur lui ?",
          "Que signifie l'expression «donner vie à quelqu'un qui n'avait pas voulu être oublié» à la fin du texte ?",
          "Pourquoi l'auteur a-t-il choisi de faire du «trésor» des lettres et des photos plutôt que de l'or ?",
          "Que représente symboliquement le lac qui «n'apparaît sur aucune carte routière moderne» ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "As-tu déjà fait une découverte inattendue qui t'a surpris(e) ? Raconte et compare avec celle de Léa et Fatima.",
          "Qu'aurais-tu fait avec la boîte et son contenu si tu l'avais trouvée ? Explique ta décision.",
          "Penses-tu que les deux filles avaient le droit de lire les lettres de Gérard ? Justifie ta réponse.",
          "Quel personnage de cette histoire t'a le plus touché(e) et pourquoi : Léa, Fatima ou Gérard ?",
        ],
      },
    ],
  },

  {
    id: 3,
    titre: "Le cahier rouge de grand-maman Irène",
    sousTitre: "Une jeune fille découvre le secret bien gardé de son arrière-grand-mère",
    texte: [
      "Camille Lévesque avait douze ans et une passion dévorante pour les vieux objets. Sa chambre était un musée miniature : des toupies en bois, des cartes postales jaunies, des boîtes de métal illustrées de réclames publicitaires des années cinquante. Chaque été, elle passait une semaine chez sa grand-mère Berthe à Québec, fouillant méthodiquement les tiroirs et les garde-robes à la recherche de nouveaux trésors.",
      "Un après-midi de juillet, pendant que sa grand-mère faisait la sieste, Camille grimpa au grenier pour la première fois. L'air sentait la poussière et la lavande sèche. Des cartons soigneusement étiquetés s'alignaient le long des murs. Au fond, dans un coin, une vieille malle en cuir portait les initiales « I.M. » en lettres de laiton. Irène Marchand — l'arrière-grand-mère de Camille, morte bien avant sa naissance. La malle n'était pas cadenassée. Camille souleva le couvercle, et un cahier rouge en tomba.",
      "À l'intérieur du cahier, une écriture régulière et précise racontait une histoire que personne dans la famille ne semblait connaître : Irène, à dix-sept ans, en 1943, avait caché dans sa maison un soldat canadien-français blessé, déserteur de la conscription. Elle l'avait soigné pendant six semaines, lui apportant de la soupe chaude et des linges propres en secret, pendant que les soldats de la gendarmerie interrogeaient les voisins. Le soldat s'appelait Émile. À la dernière page du cahier, une seule phrase : « Il est parti un matin de septembre sans se retourner. J'ai compris que certaines histoires ne peuvent jamais être racontées. »",
      "Camille descendit du grenier, les mains tremblantes, le cahier serré contre sa poitrine. Elle trouva sa grand-mère Berthe assise dans la cuisine, buvant son thé. Quand elle posa le cahier sur la table, Berthe pâlit. Elle savait. Elle avait toujours su. « Ta arrière-grand-mère m'a fait promettre de ne jamais parler de ça », dit-elle doucement. « Elle avait peur qu'on juge Émile, même mort. »",
      "Ce soir-là, grand-mère Berthe et Camille lurent le cahier ensemble, page par page, dans la lumière orangée de la lampe de la cuisine. Pour la première fois, Irène n'était plus seulement un nom gravé sur une pierre tombale dans le cimetière de Charlesbourg. Elle était une femme courageuse, amoureuse, secrète. Camille referma le cahier avec soin. Elle savait maintenant qu'elle avait hérité de quelque chose de plus précieux que des objets : elle avait hérité d'une histoire vraie.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Quelle passion Camille a-t-elle et comment se manifeste-t-elle concrètement dans sa vie ?",
          "Qui était Irène Marchand et quel secret son cahier révèle-t-il ?",
          "Pourquoi la grand-mère Berthe n'avait-elle jamais parlé du cahier ? Quelle promesse avait-elle faite ?",
          "Que font Camille et sa grand-mère ensemble le soir de la découverte ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Quelle est l'idée principale de cette histoire ? Formule-la en une phrase complète.",
          "Comment la description du grenier prépare-t-elle la découverte du cahier rouge ?",
          "En quoi la dernière phrase — «elle avait hérité d'une histoire vraie» — donne-t-elle tout son sens à l'histoire ?",
          "Identifie les cinq étapes du schéma narratif et explique comment elles s'articulent dans ce texte.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Irène a-t-elle écrit dans son cahier «certaines histoires ne peuvent jamais être racontées» ? Qu'est-ce que cela dit de son époque ?",
          "Que révèle le fait que la malle en cuir ne soit pas cadenassée ? Irène voulait-elle vraiment garder son secret ?",
          "Pourquoi l'auteur précise-t-il qu'Irène «n'était plus seulement un nom gravé sur une pierre tombale» ?",
          "Comment le contexte historique (1943, conscription, Deuxième Guerre mondiale) éclaire-t-il les choix d'Irène ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "Penses-tu qu'Irène a bien agi en cachant le déserteur ? Donne deux arguments pour justifier ta réponse.",
          "Y a-t-il des secrets dans ta famille ou dans l'histoire de ton pays qui mériteraient d'être connus ? Explique.",
          "Quelle scène de cette histoire t'a le plus ému(e) et pourquoi ?",
          "La phrase «certaines histoires ne peuvent jamais être racontées» est-elle vraie selon toi ? Justifie.",
        ],
      },
    ],
  },

  {
    id: 4,
    titre: "Maya et le robot",
    sousTitre: "Une invention qui tourne mal… et une leçon inattendue",
    texte: [
      "Maya Simard avait onze ans, une boîte à outils toujours dans la main et une certitude absolue : elle serait ingénieure. Depuis l'âge de huit ans, elle démontait les vieux appareils électroniques que son père rapportait du centre de recyclage — radios transistors, machines à coudre, téléphones vintages — et elle en recombinait les pièces pour créer de nouveaux objets. Sa chambre ressemblait davantage à un atelier qu'à une chambre de fille.",
      "En octobre, son école annonça le grand Concours des Inventeurs. Les élèves avaient deux mois pour créer un objet utile. Le gagnant représenterait l'école à la finale régionale. Maya décida immédiatement : elle construirait un robot capable de ramasser les déchets dans la cour de récréation. Elle dessina des plans, commanda des pièces en ligne avec son argent de poche et travailla chaque soir après ses devoirs. Son père l'aidait en lui expliquant les circuits, sa mère l'encourageait en lui apportant du chocolat chaud à vingt-deux heures.",
      "Trois semaines avant le concours, le robot fonctionnait. Il se déplaçait, son bras articulé saisissait les objets, et il distinguait même les déchets des objets personnels grâce à une caméra. Maya était fière, mais une voix dans sa tête lui soufflait que ce n'était pas assez. Elle décida d'ajouter une intelligence artificielle capable de trier les déchets par matière — plastique, papier, métal. Pendant une semaine, elle travailla sans relâche. La nuit précédant le concours, elle brancha les nouveaux circuits.",
      "Le matin du concours, devant les juges et toute l'école, Maya appuya sur le bouton de démarrage. Son robot avança de trois pas, saisit un gobelet en plastique… et s'arrêta. Écran noir. Panne totale. Un silence de mort s'abattit sur le gymnase. Maya sentit les larmes lui monter aux yeux, mais elle les ravala. Elle prit le micro et dit calmement : « Mon robot ne fonctionne pas aujourd'hui. Mais je peux vous expliquer comment il était censé fonctionner, et ce que j'ai appris en le construisant. » Elle parla pendant dix minutes, avec clarté et passion. Le jury lui attribua une mention spéciale pour «l'excellence de la démarche scientifique et l'esprit d'ingénieure».",
      "Ce soir-là, en démontant le robot pour comprendre la panne — un simple fil mal soudé —, Maya sourit. Elle avait voulu aller trop vite. Elle avait voulu être parfaite. Mais devant l'échec, elle avait trouvé quelque chose qu'aucun robot ne pouvait construire : la confiance en sa propre voix.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Quel est le but du concours scolaire et quelle est la récompense pour le gagnant ?",
          "Quelle amélioration Maya décide-t-elle d'apporter à son robot trois semaines avant le concours ?",
          "Que se passe-t-il exactement lors de la présentation devant les juges ?",
          "Qu'est-ce que le jury attribue à Maya et pour quelle raison ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Quelle est la leçon principale que Maya apprend à travers cet échec ? Explique avec tes propres mots.",
          "Comment la description de la chambre de Maya au début de l'histoire prépare-t-elle la suite des événements ?",
          "En quoi la mention spéciale du jury est-elle un meilleur résultat que le premier prix pour Maya ?",
          "Identifie et explique les cinq étapes du schéma narratif dans cette histoire.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Maya «ravala ses larmes» plutôt que de pleurer ? Qu'est-ce que ce geste révèle sur son caractère ?",
          "Que signifie l'expression «aucun robot ne pouvait construire» à la fin ? De quoi s'agit-il vraiment ?",
          "Pourquoi l'auteur précise-t-il que la panne était causée par «un simple fil mal soudé» ? Quel message cela transmet-il ?",
          "Pourquoi Maya a-t-elle voulu ajouter l'intelligence artificielle alors que son robot fonctionnait déjà ? Qu'est-ce que cela révèle ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "As-tu déjà vécu un échec qui s'est transformé en quelque chose de positif ? Raconte et compare avec l'expérience de Maya.",
          "Aurais-tu réagi comme Maya devant l'échec public ? Qu'aurais-tu fait différemment ?",
          "Selon toi, est-il préférable de viser la perfection au risque d'échouer, ou de viser quelque chose de sûr ? Justifie.",
          "Quel personnage secondaire de cette histoire joue le rôle le plus important selon toi : le père, la mère ou le jury ?",
        ],
      },
    ],
  },

  {
    id: 5,
    titre: "Le phoque de la baie",
    sousTitre: "Un village de pêcheurs uni par un animal inattendu",
    texte: [
      "Le village de Sainte-Anne-des-Falaises comptait deux cent dix-huit habitants, une église aux vitres en verre de couleur et un quai de bois qui craquait à chaque marée. Les habitants vivaient du homard, du crabe des neiges et du saumon, comme leurs parents et grands-parents avant eux. C'était un endroit où tout le monde se connaissait, où les querelles duraient parfois dix ans et où les secrets ne survivaient jamais à l'hiver.",
      "Un matin de novembre, Olivier Côté, sept ans, trouva un phoque gris échoué sur la grève. La bête — un adulte d'environ cent cinquante kilos — était vivante, mais une longue estafilade courait sur son flanc gauche, probablement causée par une hélice de bateau. Elle fixait Olivier de ses grands yeux noirs sans chercher à fuir. Olivier courut chercher son père, qui appela le maire, qui appela le médecin vétérinaire du village voisin.",
      "Le sauvetage du phoque divisa le village. Les pêcheurs plus anciens — ceux qui avaient perdu des filets à cause des phoques — voulaient le laisser mourir en paix. «C'est la nature, disait Réjean Bouchard. Faut pas s'en mêler.» Mais les enfants de l'école primaire organisèrent une pétition, et la famille Côté refusa de quitter la grève. Le docteur vétérinaire Nathalie Ouellet arriva dans sa camionnette blanche et examina l'animal. La plaie était infectée, mais traitable.",
      "Pendant six jours, le phoque fut soigné sur la grève même — Nathalie refusa de le transporter pour ne pas l'aggraver. Les enfants lui apportèrent des poissons. Des femmes du village portèrent de la soupe chaude aux membres de la famille Côté qui montaient la garde. Même Réjean Bouchard finit par venir, un soir, pour «voir de quoi ça avait l'air». Il resta deux heures, silencieux, les mains dans les poches.",
      "Le septième jour à l'aurore, le phoque glissa dans l'eau. Il nagea lentement en cercles, comme s'il reconnaissait les visages rassemblés sur le quai, puis disparut dans la brume. On ne le revit jamais. Mais quelque chose s'était passé dans le village pendant ces six jours : des voisins qui ne se parlaient plus depuis des années avaient mangé à la même table. Des querelles vieilles de dix ans s'étaient évaporées. Olivier Côté, lui, savait exactement ce qui s'était passé. Le phoque était venu pour ça.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Comment le village de Sainte-Anne-des-Falaises est-il décrit au début de l'histoire ?",
          "Quelle est la blessure du phoque et quelle en est la cause probable ?",
          "Quelles sont les deux positions qui divisent le village face au phoque ?",
          "Combien de jours le phoque reste-t-il sur la grève et que se passe-t-il le septième jour ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Pourquoi le phoque est-il bien plus qu'un simple animal blessé dans cette histoire ? Explique.",
          "Comment la division du village face au phoque reflète-t-elle un conflit plus profond entre les habitants ?",
          "Quelle est la transformation principale qui se produit dans le village grâce à l'épisode du phoque ?",
          "Identifie et explique les cinq étapes du schéma narratif de cette histoire.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Réjean Bouchard — qui voulait laisser le phoque mourir — vient-il finalement le voir ? Qu'est-ce que cela révèle ?",
          "La dernière phrase est «Le phoque était venu pour ça.» Que veut dire Olivier par là ? Est-ce littéral ou symbolique ?",
          "Pourquoi l'auteur précise-t-il que les querelles du village «ne survivaient jamais à l'hiver» ? En quoi est-ce ironique ?",
          "Que signifie le fait que le phoque nage «en cercles» avant de partir, «comme s'il reconnaissait les visages» ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "Penses-tu que les habitants ont eu raison de soigner le phoque, malgré les objections des pêcheurs ? Justifie.",
          "Connais-tu d'autres situations où un événement inattendu a rapproché des personnes divisées ? Raconte.",
          "Quel personnage de cette histoire t'a le plus impressionné(e) : Olivier, Réjean ou Nathalie ? Pourquoi ?",
          "L'histoire suggère que les animaux peuvent transformer les humains. Es-tu d'accord avec cette idée ? Explique.",
        ],
      },
    ],
  },

  {
    id: 6,
    titre: "Le premier hiver de Sami",
    sousTitre: "Un garçon syrien découvre la neige — et beaucoup plus — au Québec",
    texte: [
      "Sami Haddad avait neuf ans quand il arriva à Québec en janvier, deux ans après avoir quitté Alep avec sa mère et sa sœur cadette Lina. Son père les rejoindrait dans six mois, une fois les papiers réglés. Dans leur appartement du quartier Limoilou — petit mais chaud, avec des radiateurs qui claquaient toute la nuit — sa mère avait épinglé sur le mur une photo de leur ancienne maison. Sami n'y prêtait jamais attention. Il préférait regarder par la fenêtre la neige qui tombait, incrédule.",
      "Le premier jour d'école, Sami ne comprit presque rien. Son français était scolaire, construit sur des livres et des applications, pas sur des conversations. L'accent québécois l'embrouillait complètement. Pendant la récréation, il resta près du mur de briques, les mains dans les poches de son manteau trop léger — sa mère avait eu du mal à trouver un manteau chaud à sa taille à leur arrivée. Un garçon s'approcha. Il s'appelait Noah et il tendait des mitaines rouges. «T'as l'air gelé. Prends-les, j'en ai deux paires.»",
      "Noah devint le guide de Sami dans ce monde incompréhensible. Il lui expliqua les règles non écrites de la cour d'école, comment commander au restaurant sans se tromper d'accent, pourquoi les gens disaient «tabarnouche» et non «tabarnac» à l'école. Il l'emmena patiner sur les plaines d'Abraham un samedi, et Sami tomba vingt-deux fois avant de réussir à glisser trois mètres sans s'écrouler. Il rit aux larmes, quelque chose qu'il n'avait pas fait depuis longtemps.",
      "Mais tout n'était pas simple. Certains soirs, Sami appelait son père par vidéo et éclatait en sanglots. Il avait honte d'avoir ri avec Noah pendant que son père était encore «là-bas». Il avait honte de trouver la neige belle alors que la neige à Alep, il l'associait au froid des abris souterrains. Sa mère le serrait dans ses bras et lui disait : «Être heureux ici, c'est aussi résister.»",
      "Au printemps, Sami fit une présentation en classe sur les Laurentides. Il parla en français, lentement, avec des fautes, mais avec une précision qui impressionna l'enseignante. À la fin, Noah applaudit le premier. Ce soir-là, en rentrant à pied sous un ciel rouge orangé qui ressemblait au coucher de soleil d'Alep, Sami comprit qu'il portait maintenant deux maisons dans sa poitrine. Et que les deux avaient de la place.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "De quel pays vient Sami et dans quelle ville du Québec s'installe-t-il ?",
          "Comment Noah aide-t-il Sami lors de leur première rencontre et ensuite ?",
          "Pourquoi Sami a-t-il honte certains soirs quand il appelle son père ?",
          "Que fait Sami au printemps qui impressionne son enseignante ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Quels sont les deux conflits intérieurs que Sami doit surmonter dans cette histoire ?",
          "Comment la neige est-elle utilisée dans le texte pour montrer le changement intérieur de Sami ?",
          "Que signifie la phrase finale «il portait deux maisons dans sa poitrine» pour comprendre la résolution de l'histoire ?",
          "Identifie les cinq étapes du schéma narratif et explique comment elles structurent ce récit.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Sami «ne prêtait jamais attention» à la photo de leur ancienne maison épinglée au mur ?",
          "Que veut dire la mère de Sami par «être heureux ici, c'est aussi résister» ?",
          "Pourquoi l'auteur précise-t-il que Sami est tombé «vingt-deux fois» avant de glisser trois mètres ? Quel sens symbolique cela a-t-il ?",
          "Que symbolise le coucher de soleil «rouge orangé qui ressemblait au coucher de soleil d'Alep» à la fin de l'histoire ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "Comment aurais-tu accueilli Sami si tu avais été son camarade de classe ? Qu'aurais-tu fait de différent de Noah ?",
          "Sami ressent de la honte d'être heureux au Québec. Est-ce une réaction compréhensible selon toi ? Explique.",
          "As-tu déjà dû t'adapter à un environnement très différent (nouvelle école, nouvelle ville, etc.) ? Comment as-tu réagi ?",
          "Que penses-tu de la façon dont Noah traite Sami ? Qu'est-ce que cela t'apprend sur la façon d'accueillir les autres ?",
        ],
      },
    ],
  },

  {
    id: 7,
    titre: "La rivale de glace",
    sousTitre: "Deux joueuses de hockey face à leur propre vérité",
    texte: [
      "Dans la région du Saguenay, deux équipes de hockey mineur féminin se détestaient depuis cinq ans : les Panthères de Chicoutimi et les Loups de Jonquière. Et dans cette rivalité, deux joueuses incarnaient l'intensité du duel mieux que n'importe qui : Alexia Bouchard, capitaine des Panthères, patineuse technique et froide comme de l'acier, et Kim Tremblay, attaquante des Loups, rapide comme l'éclair et aussi imprévisible que la météo de janvier.",
      "La finale régionale eut lieu un samedi de mars, sous des projecteurs qui faisaient briller la glace comme un miroir. Au vestiaire, Alexia noua ses lacets en silence, concentrée. Elle n'avait qu'un objectif : gagner. Kim, de son côté, plaisantait avec ses coéquipières pour masquer l'anxiété qui lui tordait l'estomac. Elles s'étaient croisées une dizaine de fois cette saison — et chaque rencontre avait laissé des marques, autant physiques que mentales.",
      "Au deuxième tiers, le score était 2-2. Sur une mise en jeu, Alexia et Kim se retrouvèrent face à face. Dans l'élan, leurs bâtons s'emmêlèrent, elles tombèrent toutes les deux sur la glace dans un enchevêtrement de patins et de coudières. L'arbitre siffla. Alors que Kim se relevait, elle tendit la main à Alexia — un geste instinctif, pas prémédité. Alexia hésita une fraction de seconde, puis saisit la main. Un murmure parcourut les gradins.",
      "Les Panthères gagnèrent 3-2 en prolongation, sur un tir parfait d'Alexia. Mais ce dont on parla longtemps après la finale, ce n'était pas ce but. C'était la main tendue. Une photo prise par un parent montrait les deux rivales sur la glace, se regardant dans les yeux au moment précis où leurs mains se serraient. L'image fut publiée dans le journal régional avec la légende : «Plus grands que leur rivalité.»",
      "Dans le vestiaire des Panthères, après la victoire, Alexia relu le message que Kim lui avait envoyé : «Belle game. Tu mérites.» Elle répondit : «Toi aussi. On se revoit l'an prochain ?» Elle posa son téléphone et sourit — un vrai sourire, pas celui de la victoire, mais celui de quelqu'un qui vient de comprendre quelque chose d'important sur elle-même : elle était capable d'admirer son adversaire. Et ça, personne ne pouvait le lui enlever.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Depuis combien de temps dure la rivalité entre les Panthères et les Loups ? Comment chaque équipe est-elle décrite ?",
          "Qu'est-ce qui se passe au deuxième tiers du match entre Alexia et Kim ?",
          "Quel est le résultat final du match et quel geste marque les esprits davantage que ce résultat ?",
          "Quel message Kim envoie-t-elle à Alexia après la partie et comment Alexia répond-elle ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Quel est le vrai sujet de cette histoire : la rivalité sportive ou autre chose ? Explique.",
          "Comment la description des deux joueuses au début établit-elle le contraste central de l'histoire ?",
          "Pourquoi la photo du journal est-elle plus significative que le résultat du match dans cette histoire ?",
          "Identifie et explique les cinq étapes du schéma narratif dans ce texte.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Kim tend-elle la main à Alexia «instinctivement, sans préméditation» ? Qu'est-ce que cela révèle d'elle ?",
          "Qu'est-ce qu'Alexia comprend sur elle-même à la toute fin de l'histoire ? Pourquoi est-ce important ?",
          "La légende du journal dit «Plus grands que leur rivalité.» Que signifie cette expression dans ce contexte ?",
          "Pourquoi l'auteur décrit-il le sourire final d'Alexia comme «un vrai sourire» différent de «celui de la victoire» ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "As-tu déjà eu un(e) rival(e) que tu as fini par respecter ou admirer ? Raconte.",
          "Penses-tu qu'on peut être compétitif(ve) et sportif(ve) en même temps ? Y a-t-il une contradiction ? Explique.",
          "Qu'aurais-tu fait à la place d'Alexia quand Kim lui a tendu la main ?",
          "Quel aspect de cette histoire te semble le plus réaliste et lequel te semble le plus idéalisé ?",
        ],
      },
    ],
  },

  {
    id: 8,
    titre: "La nuit du verglas",
    sousTitre: "Nouvelle Année sans électricité dans une ferme des Cantons-de-l'Est",
    texte: [
      "La famille Arsenault habitait une vieille ferme centenaire à Saint-Isidore-de-Clifton, au pied des collines des Cantons-de-l'Est. Elle se composait de quatre personnes : le père Gaston, agriculteur et homme de peu de mots ; la mère Diane, infirmière et organisatrice née ; Zacharie, seize ans, qui comptait les jours avant de partir étudier à Montréal ; et Émilie, neuf ans, qui ne pouvait s'endormir que si un adulte lui lisait une histoire.",
      "Le 31 décembre, à vingt-deux heures, alors que la famille regardait un film en attendant minuit, l'électricité coupa. Puis les téléphones portables perdirent leur signal. Dehors, une pluie de verglas transformait tout en miroir — les arbres, les fils électriques, le toit de la grange. La radio à piles annonça une panne régionale majeure : minimum quarante-huit heures sans courant. Zacharie tapa du poing sur la table. «Le Nouvel An en plein noir, c'est nul.»",
      "Gaston sortit ses vieilles lampes à huile du sous-sol et bourra le poêle à bois. Diane dressa un inventaire des réserves : conserves, eau embouteillée, bois de chauffage pour deux semaines. Elle avait été infirmière de campagne pendant dix ans — les situations d'urgence, elle connaissait. Zacharie fut envoyé aux nouvelles chez les voisins Blouin, à un kilomètre, sur un chemin verglacé. Il mit une heure pour l'aller-retour, tomba trois fois, et rapporta deux bouteilles de cidre de glace et la nouvelle que les Blouin allaient bien.",
      "À minuit, sans countdown télévisé ni feux d'artifice, la famille Arsenault fit le réveillon à sa façon. Gaston joua de la guitare — quelque chose qu'il n'avait pas fait depuis des années. Diane raconta des histoires de ses hivers d'enfance. Zacharie, étrangement, ne pensa pas une seule fois à Montréal. Et Émilie, pour la première fois de sa vie, ne demanda pas qu'on lui lise une histoire — elle en raconta une elle-même, inventée sur le moment, avec des fées et des ours polaires et un Nouvel An magique.",
      "Le courant revint le 2 janvier à l'aube. Zacharie rouvrit son téléphone : soixante-sept notifications, des messages du Nouvel An de ses amis, des photos de fêtes en ville. Il les regarda, puis le posa. Dans la cuisine, l'odeur du café et de la tarte aux pommes que sa mère réchauffait sur le poêle à bois emplissait la maison. Il se dit que certaines pannes arrivaient au bon moment.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Décris les quatre membres de la famille Arsenault en citant au moins une caractéristique de chacun.",
          "Quelle est l'ampleur de la panne selon la radio et comment chaque membre de la famille réagit-il ?",
          "Qu'est-ce que Zacharie rapporte de sa visite chez les voisins Blouin ?",
          "Comment la famille célèbre-t-elle le Nouvel An sans électricité ? Donne trois éléments précis.",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Comment la panne de courant transforme-t-elle chacun des membres de la famille différemment ?",
          "Quel est le paradoxe au cœur de cette histoire : comment une «panne» peut-elle être un cadeau ?",
          "Quelle est la signification de la dernière phrase de l'histoire — «certaines pannes arrivaient au bon moment» ?",
          "Identifie les cinq étapes du schéma narratif dans cette histoire et explique-les.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Pourquoi Zacharie «ne pensa pas une seule fois à Montréal» pendant le réveillon sans électricité ?",
          "Que révèle le fait que Gaston «n'avait pas joué de guitare depuis des années» ?",
          "Pourquoi Émilie choisit-elle de raconter une histoire plutôt que d'en demander une ? Qu'est-ce que cela symbolise ?",
          "Pourquoi Zacharie pose son téléphone après avoir vu les 67 notifications ? Qu'a-t-il compris ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "As-tu déjà vécu une situation où l'absence de technologie t'a permis de mieux profiter de ta famille ? Raconte.",
          "Penses-tu que notre dépendance aux écrans et aux réseaux sociaux nous fait manquer des moments importants ? Justifie.",
          "Quel membre de la famille Arsenault t'a le plus impressionné(e) et pourquoi ?",
          "Si tu vivais une telle panne, qu'est-ce que tu ressentirais ? Qu'est-ce que cela t'apprendrait sur toi-même ?",
        ],
      },
    ],
  },

  {
    id: 9,
    titre: "L'étrange montre du marché",
    sousTitre: "Un objet mystérieux, un vieux monsieur et une histoire à travers le temps",
    texte: [
      "Éloi Deschamps avait dix ans, dix dollars dans sa poche et la permission d'aller seul au marché aux puces du parc Jarry un samedi matin. C'était sa tradition du mois de septembre : il y cherchait des objets étranges, des livres défraîchis, des gadgets qui ne servaient plus à rien. Sa mère l'appelait «le petit collectionneur de l'inutile», et il prenait ça comme un compliment.",
      "Au fond du marché, sous un parasol rayé rouge et blanc, un vieux monsieur vendait des montres. Pas des montres neuves — des montres anciennes, de toutes les formes et de toutes les tailles, chacune affichant une heure différente. Éloi s'arrêta devant une montre de gousset en argent gravé. Le vieux monsieur, sans qu'Éloi dise un mot, prit la montre et la lui tendit. «Celle-là, dit-il, elle choisit son propriétaire. Elle t'a choisi.»",
      "Éloi paya trois dollars — le vieux ne voulait pas plus — et rentra chez lui. Cette nuit-là, il mit la montre sous son oreiller. Le lendemain matin, il eut un rêve si clair, si précis, qu'il semblait plus réel que la réalité : il voyait un enfant de son âge, en vêtements d'une autre époque, debout dans une cour d'école qu'il ne reconnaissait pas. L'enfant le regardait, et dans sa main, il tenait la même montre. Puis l'image se dissipa.",
      "Intrigué, Éloi fit des recherches. La montre portait sur le fond un nom gravé : «À Julien, avec amour, Papa, 1944.» Avec l'aide de sa bibliothécaire, il retrouva la trace d'un certain Julien Deschamps — un ancêtre éloigné portant son propre nom de famille — qui avait reçu cette montre de son père juste avant que celui-ci parte à la guerre. Le père était revenu. Julien était devenu instituteur. Et la montre, transmise de génération en génération, avait fini dans un marché aux puces.",
      "Éloi porta la montre chez un horloger qui la remit en marche. Ce soir-là, son tic-tac régulier emplissait sa chambre. Éloi la regarda tourner les aiguilles et pensa à Julien qui avait sans doute fait la même chose, soixante-dix ans plus tôt. Il y avait quelque chose de vertigineux dans cette continuité — comme si le temps était moins une ligne droite qu'un grand cercle, et que lui, Éloi, se trouvait exactement au bon point de ce cercle pour tenir la montre.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Combien d'argent Éloi a-t-il et où va-t-il ce samedi matin ? Quelle est sa tradition ?",
          "Comment le vieux monsieur décrit-il la montre quand il la tend à Éloi ?",
          "Que trouve Éloi gravé au fond de la montre et à qui était-elle destinée à l'origine ?",
          "Que fait Éloi avec la montre à la fin de l'histoire ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Quel est le thème central de cette histoire : le temps, la famille, le hasard ou autre chose ? Justifie.",
          "Comment les éléments fantastiques de l'histoire (le rêve, la montre «qui choisit») servent-ils l'histoire ?",
          "Quelle est la signification de la métaphore du temps «comme un grand cercle» à la fin du texte ?",
          "Identifie et explique les cinq étapes du schéma narratif dans ce récit.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Que veut dire le vieux vendeur quand il dit que la montre «choisit son propriétaire» ? Est-ce littéral ou symbolique ?",
          "Pourquoi est-ce significatif que la montre porte le nom de famille «Deschamps», comme Éloi ?",
          "Que représente le rêve de l'enfant en vêtements d'époque ? Pourquoi Éloi le ressent-il comme «plus réel que la réalité» ?",
          "Pourquoi l'auteur décrit-il l'expérience d'Éloi face à la montre comme «vertigineuse» ? Qu'est-ce que ce mot révèle ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "Possèdes-tu un objet qui vient de ta famille et qui a une histoire ? Qu'est-ce que cet objet représente pour toi ?",
          "Crois-tu que certains objets peuvent «choisir» leur propriétaire, ou est-ce pure superstition ? Justifie.",
          "Qu'est-ce que cette histoire t'apprend sur l'importance de connaître l'histoire de sa famille ?",
          "Quel élément de cette histoire t'a le plus touché(e) : le mystère de la montre, le rêve, la découverte historique ou la fin ? Explique.",
        ],
      },
    ],
  },

  {
    id: 10,
    titre: "La traversée du lac Blanc",
    sousTitre: "Un grand-père, sa petite-fille et une leçon qui durera toujours",
    texte: [
      "Chaque hiver depuis que Rosalie avait cinq ans, son grand-père Edmond lui promettait la même chose : «Un jour, ma grande, on traversera le lac Blanc à pied. Mais seulement quand la glace sera prête.» Rosalie avait maintenant treize ans. La glace n'avait jamais été «prête» — soit trop mince en décembre, soit déjà craquelée en mars. Mais cette année, un froid extraordinaire avait solidifié le lac dès les premiers jours de janvier. Edmond, quatre-vingt-deux ans, regardait le lac par la fenêtre avec l'air d'un homme qui n'a plus de temps à perdre.",
      "Ils partirent un dimanche matin, Rosalie en combinaison de ski moderne et Edmond dans son vieux manteau gris de laine qui datait de 1978. Edmond portait une vieille canne de bois pour tester la glace à chaque pas — un geste appris de son propre père. La surface du lac était d'un blanc parfait, strié de longues craquelures bleues qui ressemblaient à des veines. «Ce n'est pas dangereux, ces craquelures ?» demanda Rosalie. «Non, dit Edmond. Ce sont les marques que la glace fait quand elle se consolide. C'est comme ça qu'on sait qu'elle est solide.»",
      "Au milieu du lac, ils s'arrêtèrent. On voyait les deux rives à égale distance. Le silence était total — même le vent s'était tu. Edmond posa sa canne et leva les yeux vers le ciel gris perle. «La dernière fois que j'ai traversé ce lac, j'avais douze ans, avec mon père. Il est mort l'hiver suivant.» Rosalie ne sut quoi dire. Elle prit la main de son grand-père — une main noueuse, tachée, qui avait planté des milliers d'arbres, réparé des centaines de moteurs, tenu des dizaines de mains.",
      "Ils continuèrent. À l'autre rive, ils trouvèrent un vieux banc de bois à moitié enseveli dans la neige, et ils s'assirent pour boire le chocolat chaud que Rosalie portait dans son thermos. Edmond lui raconta le lac : les hivers de son enfance, les expéditions de pêche, la fois où son frère était tombé à l'eau en 1962 et où ils l'avaient sorti de justesse. Il parla pendant une heure, sans s'arrêter, comme s'il déversait toute une vie dans ce récit.",
      "Sur le chemin du retour, Rosalie marchait juste derrière son grand-père, regardant ses pas dans la neige. Elle réalisa soudain quelque chose : dans quelques années, peut-être, elle traverserait ce lac avec son propre enfant. Et elle raconterait cette traversée avec Edmond. Et les craquelures bleues dans la glace, les marques de la consolidation, elle les verrait autrement — non pas comme des fissures, mais comme des liens.",
    ],
    questions: [
      {
        dimension: "Dimension 1 — Compréhension littérale",
        couleur: "#2563eb",
        questions: [
          "Depuis quand Edmond fait-il cette promesse à Rosalie et pourquoi la traversée n'a-t-elle jamais eu lieu avant ?",
          "Comment Edmond teste-t-il la glace pendant la traversée ? D'où tient-il ce geste ?",
          "Que révèle Edmond sur sa propre traversée du lac dans le passé ?",
          "Que font-ils à l'autre rive du lac ? Qu'est-ce qu'Edmond raconte à Rosalie ?",
        ],
      },
      {
        dimension: "Dimension 2 — Compréhension globale",
        couleur: "#7c3aed",
        questions: [
          "Cette histoire parle-t-elle vraiment d'une traversée de lac ? Quel en est le vrai sujet ?",
          "Comment la description de la main d'Edmond au milieu du lac résume-t-elle toute une vie ?",
          "Pourquoi le moment où Edmond et Rosalie s'arrêtent au milieu du lac est-il le cœur de l'histoire ?",
          "Identifie et explique les cinq étapes du schéma narratif dans ce texte.",
        ],
      },
      {
        dimension: "Dimension 3 — Interprétation et inférence",
        couleur: "#059669",
        questions: [
          "Edmond dit que les craquelures bleues «montrent que la glace est solide». Comment cette explication s'applique-t-elle à la vie humaine ?",
          "Pourquoi Edmond a-t-il attendu jusqu'à ses quatre-vingt-deux ans pour faire cette traversée avec Rosalie ?",
          "Que signifie la réflexion de Rosalie à la fin : voir les craquelures «non pas comme des fissures, mais comme des liens» ?",
          "Pourquoi l'auteur décrit-il Edmond comme parlant «comme s'il déversait toute une vie» dans son récit ?",
        ],
      },
      {
        dimension: "Dimension 4 — Réaction et appréciation critique",
        couleur: "#dc2626",
        questions: [
          "As-tu un grand-parent ou un aîné qui t'a transmis quelque chose d'important ? Qu'est-ce que c'est ?",
          "Penses-tu qu'il est important de connaître les histoires des générations passées ? Explique pourquoi.",
          "Quelle image de cette histoire restera dans ta mémoire et pourquoi ?",
          "Si tu devais traverser un lac avec quelqu'un de ta famille, qui choisirais-tu et que voudrais-tu lui dire ou lui demander ?",
        ],
      },
    ],
  },
];

// ── Couleurs de dimension ─────────────────────────────────────────────────────
const DIM_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "#2563eb": { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-300 dark:border-blue-700", text: "text-blue-700 dark:text-blue-300" },
  "#7c3aed": { bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-300 dark:border-violet-700", text: "text-violet-700 dark:text-violet-300" },
  "#059669": { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-300 dark:border-emerald-700", text: "text-emerald-700 dark:text-emerald-300" },
  "#dc2626": { bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-300 dark:border-red-700", text: "text-red-700 dark:text-red-300" },
  "#b45309": { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-300 dark:border-amber-700", text: "text-amber-700 dark:text-amber-300" },
};

// ── Composant question ────────────────────────────────────────────────────────
function QuestionBloc({ bloc, storyId, blocIndex }: { bloc: QuestionBlock; storyId: number; blocIndex: number }) {
  const [selected, setSelected] = useState("");
  const [reponse, setReponse] = useState("");
  const colors = DIM_COLORS[bloc.couleur] ?? DIM_COLORS["#2563eb"];
  const key = `s${storyId}-b${blocIndex}`;

  return (
    <div className={`rounded-lg border-2 ${colors.border} ${colors.bg} p-4 space-y-3`}>
      <div className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold ${colors.text} border ${colors.border} bg-white/60 dark:bg-black/20`}>
        {bloc.dimension}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground" htmlFor={`${key}-select`}>
          Choisis ta question :
        </label>
        <div className="relative">
          <select
            id={`${key}-select`}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid={`select-question-${key}`}
          >
            <option value="">— Sélectionne une question —</option>
            {bloc.questions.map((q, i) => (
              <option key={i} value={q}>{String.fromCharCode(65 + i)}. {q}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {selected && (
        <div className="rounded-md bg-white/80 dark:bg-black/20 border border-input px-3 py-2 text-sm text-foreground italic">
          {selected}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground" htmlFor={`${key}-textarea`}>
          Ta réponse :
        </label>
        <textarea
          id={`${key}-textarea`}
          value={reponse}
          onChange={(e) => setReponse(e.target.value)}
          placeholder="Écris ta réponse ici…"
          rows={5}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          data-testid={`textarea-reponse-${key}`}
        />
        <div className={`text-xs text-right ${reponse.length > 0 ? colors.text : "text-muted-foreground"}`}>
          {reponse.length} caractère{reponse.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

// ── Composant histoire ────────────────────────────────────────────────────────
function HistoireCard({ histoire }: { histoire: Story }) {
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden print:shadow-none print:border-gray-300">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 print:bg-amber-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded">
            Histoire {histoire.id}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white">{histoire.titre}</h2>
        <p className="text-amber-100 text-sm mt-1 italic">{histoire.sousTitre}</p>
      </div>

      {/* Texte */}
      <div className="p-6 space-y-4">
        {histoire.texte.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground first-of-type:first-letter:text-3xl first-of-type:first-letter:font-bold first-of-type:first-letter:float-left first-of-type:first-letter:mr-1 first-of-type:first-letter:mt-0.5 first-of-type:first-letter:text-amber-600">
            {para}
          </p>
        ))}
      </div>

      {/* Bouton questions */}
      <div className="px-6 pb-4 print:hidden">
        <Button
          onClick={() => setShowQuestions(!showQuestions)}
          variant="outline"
          className="w-full gap-2"
          data-testid={`btn-questions-${histoire.id}`}
        >
          <BookOpen className="w-4 h-4" />
          {showQuestions ? "Masquer les questions" : `Afficher les ${histoire.questions.length} blocs de questions`}
          <ChevronDown className={`w-4 h-4 transition-transform ${showQuestions ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Questions */}
      <div className={`px-6 pb-6 space-y-4 ${showQuestions ? "block" : "hidden"} print:block`}>
        <h3 className="text-base font-semibold text-foreground border-t pt-4">Questions — {histoire.titre}</h3>
        {histoire.questions.map((bloc, i) => (
          <QuestionBloc key={i} bloc={bloc} storyId={histoire.id} blocIndex={i} />
        ))}
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function CahierLecture() {
  const [, setLocation] = useLocation();
  const [allOpen, setAllOpen] = useState(false);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 print:bg-white">

      {/* Barre d'outils — masquée à l'impression */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <Button variant="ghost" size="default" onClick={() => setLocation("/student-dashboard")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="default" onClick={() => setAllOpen(!allOpen)} className="gap-2 print:hidden" data-testid="btn-toggle-all">
              <BookOpen className="w-4 h-4" />
              {allOpen ? "Replier tout" : "Tout ouvrir"}
            </Button>
            <Button variant="default" onClick={handlePrint} className="gap-2 bg-amber-600 hover:bg-amber-700" data-testid="btn-print">
              <Printer className="w-4 h-4" />
              Imprimer / PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 print:py-4 print:px-6 print:max-w-none">

        {/* En-tête du cahier */}
        <div className="text-center space-y-2 pb-4 print:pb-8">
          <h1 className="text-3xl font-bold text-amber-700 dark:text-amber-400 print:text-black">
            Cahier de lecture — 10 histoires narratives
          </h1>
          <p className="text-muted-foreground text-sm print:text-gray-600">
            Schéma narratif québécois · Quatre dimensions de lecture · Menus de questions différenciés
          </p>
          {/* Champ nom pour impression */}
          <div className="mt-4 print:block flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground print:text-black">Nom :</span>
                <input
                  type="text"
                  placeholder="__________________________"
                  className="border-b border-input bg-transparent text-sm focus:outline-none focus:border-amber-500 w-48 print:border-black"
                  data-testid="input-nom"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground print:text-black">Groupe :</span>
                <input
                  type="text"
                  placeholder="__________"
                  className="border-b border-input bg-transparent text-sm focus:outline-none focus:border-amber-500 w-24 print:border-black"
                  data-testid="input-groupe"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground print:text-black">Date :</span>
                <input
                  type="text"
                  placeholder="__________"
                  className="border-b border-input bg-transparent text-sm focus:outline-none focus:border-amber-500 w-28 print:border-black"
                  data-testid="input-date"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Légende des dimensions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 print:border-gray-300">
          <h2 className="text-sm font-semibold text-foreground mb-3">Les quatre dimensions de lecture</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { num: "1", label: "Compréhension littérale", desc: "Repérer l'information explicite", color: "#2563eb" },
              { num: "2", label: "Compréhension globale", desc: "Saisir le sens général et la structure", color: "#7c3aed" },
              { num: "3", label: "Interprétation", desc: "Inférer, déduire, interpréter", color: "#059669" },
              { num: "4", label: "Réaction critique", desc: "Réagir, apprécier, juger", color: "#dc2626" },
            ].map((d) => {
              const c = DIM_COLORS[d.color];
              return (
                <div key={d.num} className={`rounded-lg border ${c.border} ${c.bg} p-2.5`}>
                  <div className={`text-xs font-bold ${c.text} mb-0.5`}>Dimension {d.num}</div>
                  <div className="text-xs font-medium text-foreground">{d.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{d.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Les 10 histoires */}
        {HISTOIRES.map((h) => (
          <HistoireCard key={h.id} histoire={h} />
        ))}
      </div>

      {/* CSS d'impression */}
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { font-size: 11pt; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          select, textarea, input { border: 1px solid #ccc !important; background: white !important; }
          textarea { min-height: 120px !important; }
          .rounded-xl, .rounded-lg { border-radius: 4px !important; }
          h2 { page-break-after: avoid; }
          .bg-card { background: white !important; }
        }
      `}</style>
    </div>
  );
}
