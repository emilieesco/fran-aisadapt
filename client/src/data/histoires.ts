// ── Types ─────────────────────────────────────────────────────────────────────
export interface QuestionBloc {
  type: "comprehension" | "inference" | "reaction" | "jugement" | "grammaire";
  label: string;
  questions: [string, string, string, string];
}

export interface Histoire {
  id: number;
  titre: string;
  sousTitre: string;
  texte: string[];
  questions: QuestionBloc[];
}

// ── 10 Histoires ──────────────────────────────────────────────────────────────
export const HISTOIRES: Histoire[] = [
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    titre: "Le voyage de Thomas",
    sousTitre: "Un adolescent de 13 ans part seul pour la première fois à Montréal",
    texte: [
      "Thomas Bergeron avait toujours vécu à Sainte-Rose, un petit village tranquille perdu entre les collines boisées des Laurentides. À treize ans, sa vie se résumait à quelques certitudes simples : l'école le lundi au vendredi, le hockey le samedi matin avec ses amis Félix et Jordan, les sorties en forêt le dimanche avec son grand-père Marcel, qui lui apprenait le nom des arbres, la direction du vent et la façon de lire les nuages. Il connaissait chaque chemin de terre, chaque ruisseau boueux, chaque vieille clôture de cèdre de son village. Mais la grande ville, avec ses gratte-ciel de verre, ses métros bondés qui sentaient le métal et la transpiration, et ses milliers d'inconnus qui marchaient sans jamais se regarder, lui était aussi étrangère qu'une autre planète.",
      "Un matin de mai, sa mère lui tendit une enveloppe bleue sans rien dire. À l'intérieur, un billet de train aller-retour pour Montréal et une note griffonnée à la hâte, d'une écriture qu'il ne reconnut pas tout de suite — l'écriture de son père : « Ton père t'attend à la gare Centrale, quai 7, à 14 h. Bonne chance, mon grand. » Thomas sentit son estomac se nouer comme un poing fermé. Son père, qu'il n'avait pas vu depuis trois ans, voulait le voir. Seul. Sans sa mère comme intermédiaire. Pour la première fois de sa vie, Thomas devrait voyager sans adulte à ses côtés, traverser une ville inconnue, et retrouver un homme qui ressemblait dans ses souvenirs à quelqu'un à la fois aimé et distant. La veille du départ, il ne dormit presque pas, imaginant mille catastrophes : rater la correspondance, se perdre dans le dédale du métro, ne plus reconnaître le visage de son père parmi la foule du quai.",
      "Le lendemain matin, sac à dos gonflé sur les épaules, Thomas monta dans le car régional qui l'emmènerait à la gare de Saint-Jérôme. Il s'était réveillé à cinq heures, avait mangé ses céréales en silence pendant que sa mère lui préparait un sandwich au jambon pour le voyage. Ni l'un ni l'autre ne parla beaucoup. Pendant le trajet en car, il révisait mentalement le plan du métro qu'il avait imprimé la veille et mémorisé ligne par ligne, station par station, comme un général qui étudie un champ de bataille. À la gare de Saint-Jérôme, il acheta son billet au guichet automatique, les mains légèrement tremblantes, puis attendit sur le quai en regardant les rails briller dans la lumière du matin. Le train s'ébranla dans un grand sifflement de vapeur. Par la fenêtre, les champs verts et les clochers d'église des Laurentides cédèrent progressivement la place aux banlieues grises, aux entrepôts aux murs tagués, puis aux tours d'acier et de béton de Montréal qui perçaient le ciel bleu pâle. Thomas était fasciné et terrorisé à la fois.",
      "À la gare Centrale, il se retrouva dans un flux ininterrompu de voyageurs pressés qui ne regardaient personne. Le bruit était assourdissant — des voix dans toutes les langues, des annonces incompréhensibles par les haut-parleurs, des valises à roulettes qui claquaient sur le sol de marbre. Il faillit paniquer quand son téléphone afficha « réseau indisponible ». Il s'immobilisa, respira profondément comme son grand-père Marcel le lui avait appris, puis sortit son plan papier de la poche avant de son sac. Il suivit les flèches bleues jusqu'au quai 7. Son père était là, debout près d'un pilier, plus vieux que dans ses souvenirs — les tempes grisonnantes, quelques rides nouvelles autour des yeux — mais avec le même sourire en coin qui creusait une fossette sur sa joue gauche. Thomas sentit quelque chose se desserrer dans sa poitrine, comme si un nœud qu'il portait depuis trois ans venait de lâcher. Ils se regardèrent une longue seconde silencieuse, puis son père ouvrit les bras.",
      "Ils passèrent l'après-midi à marcher dans le Vieux-Montréal, sous les façades de pierre grise des vieux entrepôts reconvertis en galeries d'art et en restaurants. Son père lui montra le fleuve Saint-Laurent qui brillait au soleil, immense et calme comme une mer intérieure. Ils mangèrent des crêpes au sirop d'érable dans un petit café du Plateau et parlèrent — vraiment parlèrent — pour la première fois depuis des années. Son père expliqua son départ, ses regrets, ce qu'il avait fait et ce qu'il n'aurait pas dû faire. Thomas l'écouta sans interrompre, même quand les larmes lui montèrent aux yeux et qu'il dut fixer le fond de sa tasse pour ne pas pleurer. Ce n'était pas tout pardonné. Ce n'était pas tout guéri. Mais quelque chose s'était ouvert, une porte minuscule dans un mur très épais.",
      "Au retour, dans le train du soir qui filait à travers la campagne laurentienne plongée dans le rose du crépuscule, Thomas posa sa tête contre la vitre froide. Il pensa à son grand-père Marcel, qui lui disait toujours que la forêt n'avait peur de rien — ni du vent ni de l'hiver — parce qu'elle savait qu'elle repousserait toujours. Il regarda les lumières du village de Sainte-Rose apparaître au loin, petites et chaudes dans le soir tombant. Il n'était plus tout à fait le même garçon qu'au matin. Quelque chose avait changé — une petite lumière s'était allumée dans sa poitrine, fragile, mais bien réelle, et il avait l'intention de la garder.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Informations explicites sur Thomas",
        questions: [
          "D'où vient Thomas, quel âge a-t-il, et quelles sont les trois activités qui structurent sa vie hebdomadaire ?",
          "Quels sont les trois éléments contenus dans l'enveloppe bleue que sa mère lui remet sans un mot ?",
          "Comment Thomas se prépare-t-il pour son voyage ? Nomme deux actions concrètes qu'il pose la veille et le matin du départ.",
          "Que font Thomas et son père durant l'après-midi à Montréal ? Donne trois activités précises mentionnées dans le texte.",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Événements et personnages",
        questions: [
          "Pourquoi Thomas a-t-il du mal à dormir la veille du voyage ? Donne deux raisons tirées du texte.",
          "Quel problème technique Thomas rencontre-t-il à la gare Centrale et comment le surmonte-t-il ?",
          "Comment le père de Thomas est-il physiquement décrit au moment de leurs retrouvailles ? Donne deux détails précis.",
          "Que dit le grand-père Marcel à Thomas sur la forêt ? Comment Thomas utilise-t-il cette sagesse à la fin de l'histoire ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif et structure",
        questions: [
          "Identifie la situation initiale : où Thomas vit-il, avec qui, et quelle est sa relation avec la ville de Montréal ?",
          "Quel est l'élément perturbateur de cette histoire ? Décris-le précisément en citant le texte.",
          "Quels sont les deux moments de péripéties dans cette histoire ? Explique ce que Thomas ressent à chacun.",
          "Comment se terminent le dénouement et la situation finale ? Qu'est-ce qui a changé chez Thomas ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire en contexte",
        questions: [
          "Dans la phrase «son estomac se nouer comme un poing fermé», que ressent Thomas ? Explique avec tes propres mots.",
          "Que signifie l'expression «dédale du métro» dans ce contexte ? Quel autre mot pourrait la remplacer ?",
          "Explique le sens du mot «assourdissant» (paragraphe 4) en t'appuyant sur le contexte du passage.",
          "Que veut dire «une porte minuscule dans un mur très épais» à la fin du 5e paragraphe ? Explique cette métaphore.",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Intention et sens global",
        questions: [
          "Quel est le défi principal que Thomas doit surmonter dans cette histoire ? Explique en tes propres mots.",
          "Comment le voyage de Thomas est-il aussi bien un voyage physique qu'un voyage intérieur ?",
          "Quelle est la relation entre Thomas et son grand-père Marcel ? Quel rôle ce personnage joue-t-il dans l'histoire ?",
          "En quoi la phrase «il n'était plus tout à fait le même garçon qu'au matin» résume-t-elle toute l'histoire ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Pourquoi la mère de Thomas lui dit «bonne chance, mon grand» plutôt que simplement «bon voyage» ? Qu'est-ce que cela révèle sur la situation ?",
          "La note dans l'enveloppe est écrite «d'une écriture que Thomas ne reconnut pas tout de suite». Que cela suggère-t-il sur la relation père-fils ?",
          "Pourquoi Thomas «fixa le fond de sa tasse pour ne pas pleurer» quand son père lui explique son départ ?",
          "Que révèle l'expression «comme si un nœud qu'il portait depuis trois ans venait de lâcher» sur ce que Thomas ressentait depuis le départ de son père ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences implicites",
        questions: [
          "Pourquoi l'auteur décrit-il le paysage qui change (champs verts → tours de béton) dans le train ? Quel sens symbolique cela a-t-il pour Thomas ?",
          "La conversation entre Thomas et son père «n'était pas tout pardonné, pas tout guéri». Que peut-on déduire sur l'avenir de leur relation ?",
          "Pourquoi Thomas utilise-t-il les mots de son grand-père sur la forêt à la toute fin de l'histoire ? Qu'est-ce que cela suggère ?",
          "Que peut-on déduire sur le caractère de Thomas à partir du fait qu'il a imprimé et mémorisé le plan du métro ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "Si tu étais Thomas, aurais-tu accepté de faire ce voyage seul pour retrouver un père absent depuis trois ans ? Explique ta réaction.",
          "As-tu déjà vécu une situation où tu as dû affronter quelque chose d'inconnu ou de difficile seul(e) ? Compare avec l'expérience de Thomas.",
          "Quelle scène de cette histoire t'a le plus ému(e) ou marqué(e) ? Explique pourquoi en citant le texte.",
          "Comment aurais-tu réagi à la place de Thomas quand son téléphone n'avait plus de réseau à la gare Centrale ?",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Thomas écoute son père «sans interrompre» malgré la douleur. Est-ce la bonne décision selon toi ? Donne deux arguments pour justifier ta position.",
          "Est-il réaliste qu'une seule rencontre change autant un adolescent, comme l'histoire le suggère ? Justifie ton opinion.",
          "La mère de Thomas lui permet de faire ce voyage seul à 13 ans. Penses-tu que c'est une bonne décision parentale ? Explique.",
          "Cette histoire donne-t-elle selon toi une image positive ou négative de la relation père-fils ? Soutiens ta réponse avec des éléments précis du texte.",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Temps verbaux et accords",
        questions: [
          "Relève un verbe à l'imparfait et un verbe au passé composé dans le 3e paragraphe. Explique pourquoi chacun de ces temps est utilisé.",
          "Dans la phrase «Les champs verts et les clochers cédèrent progressivement la place aux tours d'acier», identifie le temps verbal utilisé et justifie son emploi dans un texte narratif.",
          "Trouve deux adjectifs dans le 4e paragraphe et indique leur genre, leur nombre et le nom qu'ils accompagnent (épithète) ou le verbe d'état (attribut).",
          "Réécris la phrase suivante en changeant le sujet «Thomas» par «Thomas et Félix» et effectue tous les accords nécessaires : «Thomas sentit quelque chose se desserrer dans sa poitrine.»",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Figures de style et procédés",
        questions: [
          "L'auteur écrit «son estomac se nouer comme un poing fermé». Identifie la figure de style et explique son effet sur le lecteur.",
          "Relève une métaphore dans le dernier paragraphe et explique ce qu'elle représente dans le contexte de l'histoire.",
          "Dans «le flux ininterrompu de voyageurs pressés» (paragraphe 4), identifie la classe grammaticale de chaque mot et précise la fonction du groupe nominal.",
          "L'auteur utilise plusieurs comparaisons dans le texte. Trouve-en deux et explique pourquoi elles sont efficaces pour décrire les émotions de Thomas.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    titre: "La cabane du lac Perdu",
    sousTitre: "Deux amies découvrent un mystère au cœur des Laurentides",
    texte: [
      "Chaque été depuis qu'elles avaient sept ans, Léa Tremblay et Fatima Diallo passaient deux semaines entières au chalet de la famille Tremblay, au bord du lac Perdu. Le lac portait bien son nom : caché derrière trois rangs de collines boisées, accessible seulement par un sentier de randonnée de quatre kilomètres que les chevreuils empruntaient plus souvent que les humains, il n'apparaissait sur aucune carte routière moderne. Les familles qui y avaient des chalets depuis des générations jalousaient ce secret comme un trésor — pas de bar-laitier au bout du chemin, pas de marina bruyante, pas de jet-ski le dimanche matin. Seulement le vent dans les épinettes, le cri des huards à l'aurore et l'eau si claire qu'on voyait les roches du fond à cinq mètres de profondeur.",
      "Ce matin-là — un mercredi de juillet, la septième journée du séjour, celle qui tombe toujours dans un creux d'ennui —, Léa et Fatima avaient décidé d'explorer la rive est du lac, qu'elles n'avaient jamais visitée. La végétation était plus dense de ce côté, les épinettes plus serrées et plus sombres, et une odeur de mousse humide et de champignons flottait dans l'air comme une haleine de terre. Elles avancèrent en file indienne sur un sentier à peine tracé, en prenant garde aux branches basses et aux pierres glissantes couvertes de lichen. Après une heure de marche, Fatima s'arrêta si brusquement que Léa lui rentra dedans. Entre deux épinettes géantes aux troncs couverts de résine, à peine visible sous un rideau épais de fougères qui lui arrivaient à la ceinture, se dressait une cabane. Pas une cabane moderne en planches achetées à l'épicerie du coin, mais une vraie cabane de bois rond construite à l'ancienne, avec un toit de bardeaux de cèdre verts de mousse, une fenêtre à vitre épaisse comme un fond de bouteille, et une porte en bois sculpté dont les panneaux représentaient des animaux de la forêt.",
      "Le cœur battant à tout rompre, les deux filles s'approchèrent pas à pas. La porte était entrouverte d'un centimètre, comme si quelqu'un l'avait poussée et n'était plus revenu. À l'intérieur régnait une pénombre froide et odorante — suie, cuir et tabac séché. Un poêle à bois rouillé trônait dans le coin gauche. Une table de pin grossière, deux chaises au siège tressé d'osier effrangé, des crochets vides au mur. Et sur la table, posé bien en évidence comme si on l'avait déposé exprès pour être trouvé, un cahier relié de cuir rouge foncé. Léa le saisit avec précaution, comme on saisit quelque chose de vivant. À la première page, une écriture fine et penchée, à l'encre brune un peu fanée : « Journal de Gérard Lalonde, gardien du lac, 1958–1971. Si tu lis ces lignes, c'est que tu as retrouvé ce que j'ai caché. Suis les indications. Bonne chance. » En dessous, une longue série de symboles : des flèches orientées selon les points cardinaux, des chiffres associés à des dessins d'arbres et de roches, une carte dessinée à main levée dont le nord était marqué d'une étoile à cinq branches.",
      "Les deux filles passèrent le reste de la journée dans la cabane à tenter de déchiffrer les symboles, couchées sur le ventre sur le plancher de bois, les cahiers de Gérard déployés autour d'elles. Le soir, au chalet, elles interrogèrent le grand-père de Léa, Paul-Étienne, quatre-vingt-un ans, qui fumait sa pipe dans la berçante du balcon en regardant le lac virer au mauve dans le couchant. Il parla longtemps, la voix lente et appliquée de celui qui veut ne rien oublier : Gérard Lalonde avait été le trappeur le plus respecté de la région dans les années 1950 et 1960. Un homme seul, sans famille connue, qui construisait lui-même ses pièges et tannait lui-même ses peaux. Selon une rumeur tenace que tout le monde avait fini par prendre pour vraie, il avait trouvé de la pyrite dans la rivière qui alimentait le lac et l'avait vendue pour une somme considérable à un géologue américain de passage. Personne n'avait su ce qu'il avait fait de cet argent. Il était mort à soixante ans dans un accident de chasse, en novembre 1971, et personne n'avait jamais retrouvé ni sa cabane ni ses affaires.",
      "Les deux jours suivants, Léa et Fatima travaillèrent en secret, comme deux archéologues sur un chantier. Elles construisirent un tableau de décodage, associant chaque symbole à sa signification probable, puis partirent dans la forêt avec une boussole empruntée à Paul-Étienne. Elles comptèrent les pas, vérifièrent les orientations, cherchèrent les roches et les arbres particuliers dessinés sur la carte. Deux fausses pistes, un genou écorché, une heure perdue à cause d'un nuage qui avait caché le soleil et brouillé leurs repères. Finalement, au pied d'un vieux pin à l'écorce en écailles de tortue, à exactement cent trente et un pas au nord-nord-est de la cabane, leurs pelles frappèrent quelque chose de dur et de creux, à trente centimètres de profondeur.",
      "La boîte était en fer-blanc, hermétiquement fermée par un fil de laiton. À l'intérieur, soigneusement enveloppés dans de la toile cirée jaunie, pas d'or, pas de pièces de monnaie, pas de billets. Une liasse de lettres attachées par un ruban de coton bleu délavé. Des photographies en noir et blanc, les bords dentelés, représentant un homme jeune et une femme souriante devant ce qui ressemblait au chalet de Paul-Étienne. Une médaille militaire dans son écrin de velours bordeaux. Et, au fond, un morceau de papier plié en quatre sur lequel Gérard avait écrit : « Ce sont les seules choses qui comptent. Le reste, c'est du bois et de la pierre. » Ce soir-là, Léa et Fatima s'installèrent devant le feu de foyer avec Paul-Étienne et lurent les lettres à voix haute, une par une. L'homme des lettres était touchant, drôle, tendre — un homme différent de la légende solitaire que le village avait fabriquée. Avant de s'endormir, Fatima écrivit dans son propre journal : « On est venues chercher un trésor. On a trouvé quelqu'un. »",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Description des lieux et personnages",
        questions: [
          "Comment le lac Perdu est-il décrit au début ? Pourquoi porte-t-il ce nom et pourquoi ses habitants le jalousent-ils ?",
          "Pourquoi Léa et Fatima décident-elles d'explorer la rive est ce mercredi-là ?",
          "Décris la cabane que les deux filles découvrent : matériaux, état, objets à l'intérieur.",
          "Qui est Gérard Lalonde selon Paul-Étienne ? Donne trois informations précises sur lui.",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Événements et déroulement",
        questions: [
          "Comment Léa et Fatima déchiffrent-elles les symboles du cahier rouge ? Décris leur méthode de travail.",
          "Quelles difficultés rencontrent-elles dans leur recherche dans la forêt ? Nomme-en trois.",
          "Que contient la boîte en fer-blanc trouvée sous le pin ? Liste tous les objets mentionnés.",
          "Que révèle la note de Gérard au fond de la boîte sur ce qu'il considérait comme important dans la vie ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Quelle est la situation initiale de cette histoire ? Décris le lieu, les personnages et leur routine estivale.",
          "Quel est l'élément perturbateur ? À quel moment précis Fatima et Léa le découvrent-elles ?",
          "Quelles sont les péripéties de l'histoire ? Résume les étapes de la recherche du trésor.",
          "Décris le dénouement et la situation finale. En quoi diffèrent-ils de ce que les filles espéraient trouver ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire en contexte",
        questions: [
          "Que signifie l'expression «jalousaient ce secret comme un trésor» (paragraphe 1) ? Que révèle-t-elle sur les habitants du lac ?",
          "Expliquez le sens du mot «pénombre» (paragraphe 3) en vous appuyant sur le contexte.",
          "Que veut dire «deux archéologues sur un chantier» (paragraphe 5) ? Pourquoi l'auteur utilise-t-il cette comparaison ?",
          "Que signifie la phrase «on a trouvé quelqu'un» écrite par Fatima dans son journal ? En quoi est-ce différent d'un trésor matériel ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global et thèmes",
        questions: [
          "Quel est le vrai «trésor» dans cette histoire ? Explique en t'appuyant sur au moins deux éléments du texte.",
          "Quel rôle joue Paul-Étienne dans l'histoire ? En quoi est-il important pour la résolution du mystère ?",
          "Pourquoi les deux filles gardent-elles leur enquête secrète ? Qu'est-ce que cela révèle sur leur caractère ?",
          "Quelle est la leçon principale que cette histoire veut transmettre ? Formule-la en une phrase complète.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Pourquoi le cahier de Gérard est-il posé «bien en évidence, comme si on l'avait déposé exprès pour être trouvé» ? Gérard voulait-il vraiment garder son secret ?",
          "Que peut-on déduire sur la vie amoureuse de Gérard à partir des lettres et des photographies trouvées ?",
          "Pourquoi Gérard a-t-il écrit «le reste, c'est du bois et de la pierre» ? Que révèle cette phrase sur ses valeurs ?",
          "Que suggère le fait que la porte de la cabane soit «entrouverte d'un centimètre, comme si quelqu'un l'avait poussée et n'était plus revenu» ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Pourquoi la rumeur sur la «pyrite vendue à un géologue américain» était-elle peut-être exagérée ou inventée ?",
          "Que peut-on déduire sur la raison pour laquelle Gérard n'a jamais montré la cabane à personne de son vivant ?",
          "Pourquoi l'auteur précise-t-il que les lettres révèlent «un homme différent de la légende solitaire que le village avait fabriquée» ?",
          "Fatima écrit «on est venues chercher un trésor, on a trouvé quelqu'un». Quelles sont les conséquences de cette découverte sur leur façon de voir la vie ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu déjà fait une découverte inattendue qui t'a surpris(e) ou ému(e) ? Raconte et compare avec celle de Léa et Fatima.",
          "Si tu avais trouvé cette boîte, qu'aurais-tu fait avec son contenu ? Aurais-tu essayé de retrouver des descendants de Gérard ?",
          "Quel personnage de cette histoire t'a le plus touché(e) : Léa, Fatima, Paul-Étienne ou Gérard ? Justifie.",
          "Qu'est-ce que tu aurais ressenti en lisant les lettres de Gérard à voix haute devant le feu ?",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Les deux filles avaient-elles le droit d'ouvrir la boîte et de lire les lettres privées de quelqu'un de mort ? Justifie ta réponse.",
          "Est-il moralement correct de chercher un «trésor» dans la propriété d'une personne décédée sans en avoir l'autorisation ? Défends ta position.",
          "Penses-tu que la réaction de Fatima («on a trouvé quelqu'un») est la bonne façon de voir les choses ? Qu'aurais-tu écrit dans ton journal à sa place ?",
          "La fin de l'histoire est-elle satisfaisante selon toi ? Manque-t-il quelque chose ? Explique ton point de vue.",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Analyse grammaticale",
        questions: [
          "Dans la phrase «Une liasse de lettres attachées par un ruban de coton bleu délavé», identifie le groupe nominal noyau et tous ses expansions (modificateurs).",
          "Conjugue le verbe «trouver» à toutes les personnes du passé simple de l'indicatif. Puis, trouve un exemple de passé simple dans le texte et justifie son emploi.",
          "Identifie deux compléments de phrase dans les paragraphes 2 et 3. Pour chacun, indique ce qu'il exprime (temps, lieu, manière, cause).",
          "Dans «elles construisirent un tableau de décodage, associant chaque symbole à sa signification probable», quel est le rôle du participe présent «associant» ? À quoi se rapporte-t-il ?",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    titre: "Le cahier rouge d'Irène",
    sousTitre: "Une jeune fille découvre le secret bien gardé de son arrière-grand-mère",
    texte: [
      "Camille Lévesque avait douze ans et une passion dévorante pour les vieux objets. Sa chambre était un musée miniature et un peu anarchique : des toupies en bois côtoyaient des cartes postales jaunies représentant des villes qui n'existaient plus sous ce nom, des boîtes de métal illustrées de réclames publicitaires des années cinquante voisinaient des bobines de fil rouillées et des clés de serrures dont personne ne retrouverait jamais la porte. Sa mère disait qu'elle aurait dû naître cent ans plus tôt. Son père disait qu'elle était la seule personne qu'il connaissait capable de passer deux heures dans un vide-grenier sans se plaindre. Les deux avaient raison.",
      "Chaque été depuis l'âge de huit ans, Camille passait une semaine chez sa grand-mère Berthe dans le Vieux-Québec. La maison sentait la lavande et les crêpes du dimanche, et Camille en connaissait chaque recoin — sauf un : le grenier. Sa grand-mère avait toujours dit que le grenier était «plein de vieilleries inutiles» et fermé à clé «pour ne pas qu'on s'y perde». Mais Camille avait remarqué que Berthe montait parfois à l'étage avec le trousseau de clés, et redescendait les yeux légèrement rouges, comme après avoir pleuré, en disant que c'était la poussière.",
      "Un après-midi de juillet, pendant que sa grand-mère faisait sa sieste rituelle d'une heure, Camille trouva le trousseau de clés oublié sur le comptoir de la cuisine. La vieille clé de cuivre, celle qu'elle n'avait jamais vue servir à rien, correspondait exactement à la serrure en forme de cœur de la porte du grenier. À l'intérieur, l'air sentait la poussière et la lavande sèche. Des cartons soigneusement étiquetés de l'écriture de sa grand-mère s'alignaient le long des murs — «vêtements laine», «vaisselle Noël», «photos années 70». Mais au fond, dans un coin que la lumière de la lucarne n'atteignait presque pas, une vieille malle en cuir brun portait les initiales «I.M.» en lettres de laiton vert-de-grisé. Irène Marchand — l'arrière-grand-mère de Camille, morte en 1989, bien avant sa naissance. La malle n'était pas cadenassée. Camille souleva le couvercle en retenant son souffle. Sur le dessus, posé à plat, un cahier relié de cuir rouge foncé, dont les pages étaient retenues par un élastique usé à la corde.",
      "À l'intérieur du cahier, une écriture régulière et précise que Camille reconnut immédiatement — l'écriture agrandie des cahiers d'écolière, posée, appliquée — racontait une histoire que personne dans la famille ne semblait connaître. En 1943, Irène Marchand, dix-sept ans, avait caché dans sa maison un déserteur de la conscription. L'homme s'appelait Émile Chartrand. Il avait vingt ans, venait de Charlevoix et avait refusé de partir «mourir de l'autre bord» pour une guerre qu'il ne comprenait pas. Il s'était présenté à sa porte par une nuit de novembre, trempé et fiévreux, avec une lettre de recommandation de son cousin, qui était le voisin d'Irène. Elle l'avait caché dans le caveau à légumes pendant six semaines, lui apportant de la soupe chaude, du pain et des linges propres, pendant que des policiers de la gendarmerie passaient interroger les voisins deux fois par semaine. À la dernière page du cahier, une seule phrase, écrite en plus petits caractères : «Il est parti un matin de septembre 1944 sans se retourner. Je ne sais pas s'il est encore en vie. J'ai compris ce jour-là que certaines histoires ne peuvent jamais être racontées.»",
      "Camille descendit du grenier les mains tremblantes, le cahier serré contre sa poitrine comme un trésor fragile. Elle trouva sa grand-mère Berthe assise dans la cuisine, buvant son thé dans la tasse bleue à petites fleurs blanches qu'elle utilisait depuis toujours. Quand Camille posa le cahier rouge sur la table entre elles deux, Berthe pâlit — un pâlissement lent, comme si une lumière s'éteignait. Puis elle ferma les yeux et prit une longue inspiration. «Ta arrière-grand-mère me l'avait montré une fois, dit-elle enfin, très doucement. Elle m'avait fait promettre de ne jamais en parler. Elle avait peur qu'on juge Émile, même mort. Et elle avait peur, aussi, qu'on juge la façon dont elle avait ressenti les choses.» Camille comprit alors que «les choses» signifiaient davantage que ce qu'elle avait d'abord pensé.",
      "Ce soir-là, grand-mère Berthe et Camille lurent le cahier ensemble, page par page, dans la lumière orangée de la lampe de la cuisine. Berthe s'arrêtait parfois, posait son doigt sur une ligne, se souvenait d'un détail qu'Irène lui avait confié en passant, des décennies plus tôt, sans vraiment le dire. Dehors, le clocher de l'église sonnait les heures dans la nuit douce. Pour la première fois, Irène n'était plus seulement un prénom gravé sur une pierre tombale dans le cimetière de Charlesbourg, une photo en noir et blanc au mur du couloir, un sourire figé derrière une vitre encadrée d'or. Elle était une femme courageuse, amoureuse peut-être, certainement secrète — une femme qui avait fait un choix risqué par conviction, et qui l'avait gardé enfoui pendant quarante-six ans. Camille referma le cahier avec précaution et le tint contre elle. Elle savait maintenant qu'elle avait hérité de quelque chose que personne ne lui avait jamais transmis sciemment — et que c'était justement pour ça que ça comptait.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Personnages et lieux",
        questions: [
          "Décris la chambre de Camille : qu'est-ce que cela révèle sur sa personnalité ?",
          "Comment Camille accède-t-elle au grenier de sa grand-mère Berthe ? Décris les étapes.",
          "Qui était Émile Chartrand et pourquoi était-il caché chez Irène ?",
          "Comment grand-mère Berthe réagit-elle quand Camille pose le cahier rouge sur la table ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Contenu du cahier et événements historiques",
        questions: [
          "Que raconte le cahier d'Irène ? Résume en tes propres mots ce qu'Irène a fait en 1943.",
          "Combien de temps Émile a-t-il été caché chez Irène ? Dans quel endroit précis ?",
          "Que révèle la dernière phrase du cahier sur les sentiments d'Irène après le départ d'Émile ?",
          "Que signifie la promesse qu'Irène avait fait faire à Berthe selon ce que Berthe explique à Camille ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Décris la situation initiale : qui est Camille, où va-t-elle chaque été, et quel mystère pressentait-elle ?",
          "Quel est l'élément perturbateur et dans quelles circonstances Camille le découvre-t-elle ?",
          "Quelles sont les péripéties de l'histoire ? Identifie au moins deux moments de tension ou de surprise.",
          "En quoi la situation finale est-elle différente pour Camille par rapport à la situation initiale ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et sens",
        questions: [
          "Que signifie «mourir de l'autre bord» (paragraphe 4) dans le contexte de la Deuxième Guerre mondiale ?",
          "Expliquez l'expression «vert-de-grisé» à propos des lettres de laiton. À quoi cela fait-il référence ?",
          "Que signifie «les choses» quand Berthe dit «la façon dont elle avait ressenti les choses» ?",
          "Expliquez le sens de la dernière phrase : «c'était justement pour ça que ça comptait.»",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Pourquoi Camille avait-elle remarqué que Berthe montait parfois au grenier et «redescendait les yeux légèrement rouges» ?",
          "En quoi la passion de Camille pour les vieux objets est-elle significative pour l'intrigue de cette histoire ?",
          "Quel rôle joue grand-mère Berthe entre Camille et Irène ? Comment remplit-elle ce rôle à la fin ?",
          "Quelle est selon toi l'idée principale de cette histoire ? Formule-la en une phrase.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Non-dits et sous-entendus",
        questions: [
          "Que peuvent signifier «les choses» qu'Irène «avait ressenties» selon Berthe ? Qu'est-ce que le texte laisse entendre sur les sentiments d'Irène pour Émile ?",
          "Pourquoi la malle n'était-elle «pas cadenassée» ? Qu'est-ce que cela suggère sur le désir secret d'Irène ?",
          "Que révèle le fait qu'Irène ait gardé le cahier rouge toute sa vie sans le détruire ?",
          "Pourquoi Camille «comprit alors que ‹les choses› signifiaient davantage que ce qu'elle avait d'abord pensé» ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Contexte historique et causes",
        questions: [
          "Pourquoi la conscription était-elle si controversée au Québec en 1943 ? Qu'est-ce que le comportement d'Irène révèle sur l'opinion de certains Québécois de l'époque ?",
          "Pourquoi Irène avait-elle peur qu'on juge Émile «même mort» ? Qu'est-ce que cela nous apprend sur les valeurs de l'époque ?",
          "Que peut-on déduire sur la vie d'Irène après le départ d'Émile, à partir des indices dans le texte ?",
          "Pourquoi Berthe «pâlit lentement» plutôt que de crier ou de se fâcher ? Qu'est-ce que cela révèle sur ses propres sentiments face à ce secret ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "Si tu avais trouvé ce cahier, aurais-tu posé des questions à ta grand-mère ou l'aurais-tu remis en place sans en parler ? Explique.",
          "Qu'est-ce que cette histoire t'apprend sur l'importance de connaître l'histoire de ta propre famille ?",
          "Quelle scène de cette histoire t'a le plus touché(e) ou marqué(e) et pourquoi ?",
          "As-tu un objet, une lettre ou une histoire dans ta propre famille qui ressemble à ce que Camille a découvert ? Raconte.",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Irène a-t-elle eu raison de cacher un déserteur au risque de mettre sa famille en danger ? Donne deux arguments pour et deux contre.",
          "Berthe a-t-elle eu raison de garder ce secret pendant des décennies, comme elle l'avait promis à Irène ? Justifie.",
          "La phrase «certaines histoires ne peuvent jamais être racontées» est-elle une vérité ou une erreur selon toi ? Explique.",
          "Penses-tu que la décision d'Émile de déserter était courageuse ou lâche ? Justifie ton point de vue en t'appuyant sur le contexte historique.",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Classes de mots et fonctions",
        questions: [
          "Dans la phrase «Une vieille malle en cuir brun portait les initiales ‹I.M.› en lettres de laiton», identifie le sujet, le verbe, le complément direct et les groupes prépositionnels.",
          "Relève deux adjectifs dans le paragraphe 1 et pour chacun, indique son genre, son nombre et s'il est épithète ou attribut.",
          "Trouve un pronom relatif dans le texte, recopie la phrase qui le contient et explique son antécédent.",
          "Conjugue le verbe «cacher» au plus-que-parfait de l'indicatif à toutes les personnes. Trouve ensuite un exemple de plus-que-parfait dans le texte et justifie son emploi.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    titre: "Maya et le robot",
    sousTitre: "Une jeune inventrice apprend la leçon la plus difficile de l'ingénierie",
    texte: [
      "Maya Simard avait onze ans, une boîte à outils rouge framboise toujours posée à côté de son bureau, et une certitude absolue gravée quelque part au fond d'elle-même comme une inscription dans le roc : elle serait ingénieure. Pas médecin, pas avocate, pas professeure — ingénieure. Sa chambre ressemblait davantage à un atelier qu'à la chambre d'une enfant de onze ans : des fils électriques enroulés en spirales parfaites pendaient à des crochets au mur, des circuits imprimés récupérés sur des appareils défunts s'amoncelaient dans des boîtes à chaussures étiquetées par catégorie, et un établi bricolé avec des planches de contreplaqué et deux tréteaux occupait tout le mur sous la fenêtre. Sa mère avait renoncé depuis longtemps à lui imposer un «espace de jeu» ordinaire.",
      "En octobre, l'école annonça la première édition du Grand Concours des Inventeurs. Les règles étaient simples : chaque élève de cinquième et sixième année avait deux mois pour créer un objet utile, le documenter et le présenter devant un jury. Le gagnant représenterait l'école au concours régional de Saguenay-Lac-Saint-Jean, en mars. Le prix régional : une bourse de mille dollars et un stage d'une semaine dans une firme d'ingénierie de Chicoutimi. Maya décida en trente secondes. Elle construirait un robot capable de ramasser les déchets dans la cour de récréation. Elle n'avait pas de plan précis, pas encore, mais elle avait des idées, de l'énergie et une boîte à outils rouge framboise.",
      "Les deux premières semaines, Maya travailla sur la structure mécanique du robot : un châssis en aluminium récupéré sur un vieux déambulateur, deux roues motrices sur moteurs à courant continu, et un bras articulé qu'elle fabriqua elle-même avec des tiges filetées et des pièces imprimées en 3D par le technicien de l'école. Son père, ingénieur électrique, l'aidait le soir à comprendre les schémas de circuits. Sa mère lui apportait du chocolat chaud à vingt-deux heures et ne lui posait pas de questions. Au bout de trois semaines, le robot fonctionnait : il se déplaçait selon des commandes pré-enregistrées, son bras saisissait des gobelets et des bouteilles avec une précision correcte, et une caméra lui permettait de distinguer un déchet d'un objet personnel — un exploit que Maya était fière d'avoir résolu avec un simple algorithme de différence de couleur.",
      "Trois semaines avant le concours, tout fonctionnait. Mais une voix dans la tête de Maya — la voix de l'ambition, ou peut-être de l'impatience — lui murmurait que ce n'était pas assez. Elle voulait que son robot trie les déchets par matière : plastique, papier, métal, déchets organiques. Elle voulait lui apprendre à reconnaître des formes, pas seulement des couleurs. Pendant une semaine intense, elle travailla sans relâche, réécrivant le code, remplaçant la caméra principale par un module plus performant commandé en ligne avec son argent d'anniversaire, ajoutant deux capteurs de masse sous le bras articulé. Quelques soirs, elle dormit moins de cinq heures. La nuit précédant le concours, à minuit passé, elle brancha les derniers circuits dans un état second — fatiguée, fébrile, certaine que tout fonctionnerait.",
      "Le matin du concours, dans le gymnase transformé en salle d'exposition, Maya installa son robot avec soin sous les yeux des juges et de toute l'école. Elle avait préparé un panneau d'explications et un document de treize pages sur sa démarche. À dix heures, l'heure des démonstrations, elle prit une grande inspiration et appuya sur le bouton de démarrage. Le robot avança de trois pas. Son bras se déploya. Il saisit le gobelet en plastique placé devant lui. Puis le petit écran afficha «Erreur de connexion — capteur 2». L'algorithme de tri se planta. L'écran devint noir. Un silence de mort tomba sur le gymnase. Maya fixa la machine, les mâchoires serrées. Elle sentit les larmes lui chatouiller les yeux, mais quelque chose en elle — quelque chose de solide, de calme — refusa de céder.",
      "Elle prit le micro, respira, et dit : «Mon robot ne fonctionne pas aujourd'hui. Mais je peux vous expliquer exactement comment il est censé fonctionner, pourquoi il ne fonctionne pas, et ce que j'ai appris en le construisant.» Elle parla pendant douze minutes avec une clarté et une rigueur qui impressionnèrent les juges. Elle expliqua son erreur — avoir voulu en faire trop trop vite, avoir modifié un système qui fonctionnait sans assez tester les nouvelles composantes. Le jury lui attribua une mention spéciale pour «excellence de la démarche scientifique et esprit d'ingénieure». Ce soir-là, en démontant soigneusement le robot pour localiser la panne — un mauvais soudage sur le connecteur du capteur 2, une erreur qu'elle aurait détectée en cinq minutes avec un test simple —, Maya comprit que la vraie leçon d'ingénierie n'était pas dans les circuits ni dans le code. Elle était dans la modestie face à la complexité, et dans le courage de continuer malgré l'échec.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Personnage et contexte",
        questions: [
          "Comment la chambre de Maya est-elle décrite ? Que révèle cette description sur son caractère ?",
          "En quoi consiste le Grand Concours des Inventeurs ? Décris les règles et les prix en jeu.",
          "Quelles modifications Maya apporte-t-elle à son robot trois semaines avant le concours ? Pourquoi le fait-elle ?",
          "Qu'est-ce que le jury attribue à Maya et pour quelle(s) raison(s) précise(s) ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Déroulement et événements",
        questions: [
          "Quelles étapes Maya suit-elle pour construire son robot durant les deux premières semaines ?",
          "Que se passe-t-il exactement lors de la démonstration devant les juges ? Décris l'enchaînement des événements.",
          "Quel discours Maya fait-elle devant le jury après la panne ? Résume les points qu'elle aborde.",
          "Quelle est la cause technique de la panne que Maya découvre en démontant le robot le soir du concours ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Quelle est la situation initiale ? Décris Maya, son environnement et ses ambitions de départ.",
          "Quel est l'élément perturbateur dans cette histoire ? À quel moment précis la tension commence-t-elle à monter ?",
          "Identifie les péripéties. Quels obstacles Maya rencontre-t-elle dans sa construction et le jour du concours ?",
          "Quel est le dénouement ? En quoi est-il différent d'une victoire traditionnelle mais finalement positif ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire technique et expressif",
        questions: [
          "Que signifie l'expression «dans un état second» (paragraphe 4) ? Qu'est-ce que cela révèle sur les conditions de travail de Maya cette nuit-là ?",
          "Expliquez le sens de «la voix de l'ambition, ou peut-être de l'impatience» dans le contexte du paragraphe 4.",
          "Que veut dire «quelque chose de solide, de calme refusa de céder» au paragraphe 5 ? À quoi cela fait-il référence ?",
          "Expliquez l'expression «modestie face à la complexité» dans la conclusion. En quoi est-ce une leçon d'ingénierie ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global et thèmes",
        questions: [
          "Quelle est la leçon principale que Maya apprend à travers cet échec ? Explique en tes propres mots.",
          "En quoi la «mention spéciale» est-elle finalement plus précieuse qu'un premier prix pour Maya ?",
          "Quel rôle jouent les parents de Maya dans cette histoire ? Sont-ils essentiels au récit ? Justifie.",
          "Quel est le vrai sujet de cette histoire : l'ingénierie, l'échec, l'ambition ou la croissance personnelle ? Justifie.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Pourquoi Maya a-t-elle décidé d'améliorer son robot alors qu'il fonctionnait déjà correctement ? Que cela révèle-t-il sur son caractère ?",
          "La mention spéciale est décernée pour «l'esprit d'ingénieure». Que le jury a-t-il reconnu dans le comportement de Maya qui dépasse la réussite technique ?",
          "Pourquoi Maya «refusa de céder» aux larmes devant le jury ? Qu'est-ce que cela dit d'elle ?",
          "Que peut-on déduire sur l'avenir de Maya à partir de la façon dont elle réagit à l'échec ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Quelle est la vraie cause de l'échec du robot, au-delà du «mauvais soudage» technique ? Qu'est-ce que Maya aurait dû faire différemment ?",
          "Pourquoi l'auteur précise-t-il que Maya dormait «moins de cinq heures» certains soirs ? Quelle conséquence cela a-t-il sur sa performance ?",
          "Si le robot avait fonctionné parfaitement, Maya aurait-elle appris la même leçon ? Justifie ta réponse.",
          "Que peut-on déduire de la réaction du public («un silence de mort») face à la panne du robot de Maya ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu déjà vécu un échec public ou une erreur devant d'autres personnes ? Comment as-tu réagi ? Compare avec Maya.",
          "Qu'aurais-tu fait à la place de Maya après la panne : aurais-tu pleuré, quitté la salle ou parlé au micro comme elle l'a fait ?",
          "Quelle phrase ou quel moment de cette histoire t'a le plus marqué(e) ? Pourquoi ?",
          "Connais-tu quelqu'un dans ta vie (famille, ami, personnage célèbre) qui a transformé un échec en réussite ? Raconte.",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Maya a-t-elle bien fait de vouloir améliorer son robot, sachant les risques que cela comportait ? Donne deux arguments pour et deux arguments contre sa décision.",
          "Est-il préférable, selon toi, de viser l'excellence au risque d'échouer, ou de viser quelque chose de sûr pour réussir ? Justifie avec des exemples.",
          "La mention spéciale est-elle une vraie récompense selon toi, ou une façon polie de consoler quelqu'un qui a échoué ? Justifie ta position.",
          "Cette histoire dit que la «modestie face à la complexité» est une vraie qualité d'ingénieur(e). Es-tu d'accord ? Explique en te basant sur des exemples de la vie réelle.",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Subordonnées et pronoms",
        questions: [
          "Dans «elle construirait un robot capable de ramasser les déchets dans la cour de récréation», quel est le mode et le temps du verbe «construirait» ? Pourquoi ce temps est-il utilisé ici ?",
          "Repère une proposition subordonnée relative dans le texte, recopie-la et identifie son antécédent et la fonction du pronom relatif.",
          "Dans la phrase «elle avait préparé un panneau d'explications et un document de treize pages sur sa démarche», identifie le sujet, le verbe, et les deux compléments directs.",
          "Transforme la phrase suivante de la voix active à la voix passive : «Le jury attribua à Maya une mention spéciale.» Assure-toi de conserver le même temps verbal.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    titre: "Le phoque de la baie",
    sousTitre: "Un village de pêcheurs divisé par un animal inattendu",
    texte: [
      "Le village de Sainte-Anne-des-Falaises comptait deux cent dix-huit habitants, une église aux vitraux de verre coloré qui jetaient des arcs-en-ciel sur les bancs de bois les dimanches ensoleillés, un quai de bois blanchi par le sel et le vent qui craquait à chaque marée haute, et un café à l'enseigne jaunie où tout le monde se retrouvait le matin pour boire un café trop fort et commenter le temps. Les habitants vivaient du homard, du crabe des neiges et du saumon sauvage, comme leurs parents et leurs grands-parents avant eux, depuis que le premier Arsenault avait planté son pieu sur cette côte en 1823. C'était un endroit où tout le monde se connaissait depuis l'enfance, où les querelles duraient parfois dix ans et finissaient rarement autrement que par un souper qui réconciliait tout le monde, et où les secrets ne survivaient jamais à un deuxième hiver.",
      "Un matin de novembre, froid et gris comme une pierre mouillée, le petit Olivier Côté, sept ans, trouva un phoque gris échoué sur la grève de galets entre la pointe aux Épinettes et le quai. La bête mesurait environ deux mètres et pesait, estima le père d'Olivier, dans les cent cinquante kilos — un adulte en pleine santé, normalement, mais une longue estafilade sanglante courait sur son flanc gauche depuis l'aisselle jusqu'à la nageoire caudale, probablement causée par une hélice de bateau de pêche. L'animal était vivant, sa poitrine se soulevant lentement, mais il fixait Olivier de ses grands yeux noirs ronds sans chercher à s'enfuir — comme s'il savait qu'il n'en avait ni la force ni l'utilité. Olivier ne cria pas, ne recula pas. Il s'agenouilla dans les galets froids et dit doucement, comme à un ami : «T'inquiète pas. Je vais aller chercher du monde.»",
      "Le sauvetage du phoque divisa le village plus rapidement qu'aucune querelle politique de mémoire récente. Les pêcheurs de la vieille garde — ceux qui avaient perdu des filets déchirés, des casiers renversés et des stocks de poissons dévorés au fil des années — voulaient laisser la bête mourir en paix sur la grève, de la manière la plus douce possible. «C'est la nature, répétait Réjean Bouchard, soixante-deux ans, les bras croisés sur sa veste de laine. On s'en mêle pas.» Mais les enfants de l'école primaire rédigèrent une pétition signée de soixante et onze noms en vingt minutes chrono. La famille Côté refusa de quitter les abords de la grève. Et la docteure vétérinaire du village de Saint-Eugène, Nathalie Ouellet, arriva en camionnette blanche deux heures après le premier appel téléphonique, avec des antibiotiques, des bandages hydrocolloïdes et la conviction tranquille de quelqu'un qui ne s'est jamais posé la question de savoir si ça valait la peine d'essayer.",
      "Pendant six jours, le phoque fut soigné sur place — Nathalie refusa de le transporter dans une structure de réhabilitation, jugeant que le déplacement risquait d'aggraver ses blessures et d'augmenter son stress. Les enfants du village se relayèrent pour lui apporter du poisson frais dans des seaux. Des femmes portèrent de la soupe chaude et du café aux membres de la famille Côté qui montaient la garde sur la grève par roulement de deux heures, même la nuit, sous des lampes de chantier branchées à un groupe électrogène. Des couvertures de laine furent drappées sur le flanc exposé du phoque aux heures les plus froides. Et le troisième soir, à la surprise générale, Réjean Bouchard apparut sur la grève, les mains dans les poches de son manteau gris, et s'installa en silence à l'écart du groupe. Il ne dit rien. Il resta deux heures. Il repartit sans un mot. Le lendemain, il revint avec un thermos de café et une couverture de plus.",
      "Le matin du septième jour, alors qu'un soleil pâle tentait de percer le brouillard côtier, le phoque tourna la tête, regarda les gens rassemblés autour de lui, puis se traîna lentement vers l'eau. Il nageait d'abord maladroitement, comme quelqu'un qui réapprend à marcher, puis de plus en plus fluidement, déployant ses nageoires et plongeant entre deux vagues. Il nagea en cercles larges devant le quai pendant plusieurs minutes — certains jurèrent qu'il les regardait l'un après l'autre —, puis disparut dans le brouillard vers le large. On ne le revit jamais. Mais quelque chose s'était passé dans le village pendant ces six jours. Des voisins qui ne s'étaient pas parlé depuis deux ans avaient partagé un thermos sur la grève. Réjean Bouchard avait serré la main du père d'Olivier sans explication. L'institutrice avait retrouvé dans ses archives les dessins de phoques que les enfants avaient faits en maternelle, et les avait affichés dans la fenêtre du café. Olivier Côté, lui, savait exactement ce qui s'était passé. Il ne l'aurait pas su expliquer en mots, mais il le savait.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Village et personnages",
        questions: [
          "Comment le village de Sainte-Anne-des-Falaises est-il décrit dans le premier paragraphe ? Relève trois caractéristiques.",
          "Comment Olivier découvre-t-il le phoque ? Décris la blessure de l'animal et l'attitude d'Olivier.",
          "Quelles sont les deux positions opposées des habitants face au phoque blessé ? Qui représente chaque camp ?",
          "Comment Réjean Bouchard évolue-t-il au cours des six jours ? Décris son changement de comportement.",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Soins et déroulement",
        questions: [
          "Pourquoi Nathalie Ouellet décide-t-elle de soigner le phoque sur place plutôt que de le transporter ?",
          "Décris les soins apportés au phoque pendant les six jours. Qui participe et comment ?",
          "Que se passe-t-il le matin du septième jour ? Décris le départ du phoque dans le détail.",
          "Quels changements concrets observe-t-on dans le village après les six jours d'aide au phoque ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Décris la situation initiale : comment le village fonctionne-t-il avant l'arrivée du phoque ?",
          "Quel est l'élément perturbateur ? En quoi le phoque blessé crée-t-il une crise dans le village ?",
          "Identifie au moins deux péripéties dans cette histoire. Qu'est-ce qui aggrave ou complique la situation ?",
          "Quel est le dénouement et la situation finale ? Qu'est-ce qui a changé de manière permanente ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et sens",
        questions: [
          "Que signifie «la conviction tranquille de quelqu'un qui ne s'est jamais posé la question de savoir si ça valait la peine d'essayer» à propos de Nathalie ?",
          "Qu'est-ce qu'une «estafilade» (paragraphe 2) ? Cherche et explique ce mot en l'utilisant dans une nouvelle phrase.",
          "Expliquez le sens de «la vieille garde» (paragraphe 3) appliqué aux pêcheurs du village.",
          "Que signifie «il le savait» à la dernière phrase ? Qu'est-ce qu'Olivier a compris sans pouvoir le formuler ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Pourquoi le phoque est-il bien plus qu'un simple animal blessé dans cette histoire ? Explique en tes propres mots.",
          "Quelle est la transformation principale qui s'opère dans le village pendant les six jours ?",
          "Le titre «Le phoque de la baie» met l'accent sur l'animal plutôt que sur les humains. Penses-tu que c'est le bon titre ? Justifie.",
          "Quelle est la leçon centrale que cette histoire veut transmettre ? Formule-la en une phrase.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Sous-entendus",
        questions: [
          "Pourquoi Réjean revient-il le deuxième soir avec un thermos de café et une couverture, sans jamais expliquer ce changement ?",
          "Que suggère le fait que le phoque «nage en cercles» devant le quai avant de partir ? L'auteur veut-il nous faire croire quelque chose ?",
          "Olivier «savait exactement ce qui s'était passé» sans pouvoir l'expliquer en mots. Qu'est-ce qu'il avait compris selon toi ?",
          "Pourquoi l'institutrice retrouve-t-elle et affiche les dessins de phoques que les enfants avaient faits en maternelle ? Que signifie ce geste ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Pourquoi les pêcheurs de la «vieille garde» s'opposaient-ils au sauvetage du phoque ? Quels intérêts défendaient-ils ?",
          "Quel est le lien entre le phoque blessé et la guérison des relations humaines dans le village ? Comment l'un entraîne-t-il l'autre ?",
          "Pourquoi l'auteur précise-t-il que les querelles du village «ne survivaient jamais à un deuxième hiver» ? En quoi est-ce lié au phoque ?",
          "Si le phoque était mort le premier jour, qu'est-ce qui ne se serait pas produit dans le village ? Quelles conséquences cela aurait-il eu ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu déjà vu ou participé à un acte de solidarité dans ta communauté ou ta famille ? Compare avec ce qui se passe dans le village.",
          "Si tu avais été Réjean Bouchard, aurais-tu fini par aller sur la grève pour aider ? Explique ce qui t'aurait convaincu.",
          "Quelle scène de cette histoire t'a le plus ému(e) ? Pourquoi ? Cite le texte pour appuyer ta réponse.",
          "Penses-tu que les animaux peuvent vraiment changer les humains ? Donne un exemple de ta propre expérience ou de quelque chose que tu as lu ou vu.",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Les pêcheurs qui voulaient «laisser la nature suivre son cours» avaient-ils tort ou raison ? Donne deux arguments solides pour leur position.",
          "Est-il juste de mobiliser tout un village autour d'un seul animal pendant six jours, au détriment d'autres priorités ? Justifie.",
          "Nathalie Ouellet prend la décision de soigner le phoque sur place sans consulter le village. Est-ce la bonne décision ? Était-elle la bonne personne pour la prendre ?",
          "La fin ouverte de l'histoire (on ne sait pas si le phoque survit à long terme) est-elle satisfaisante selon toi ? Pourquoi l'auteur a-t-il fait ce choix ?",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Accord et ponctuation",
        questions: [
          "Relève la phrase «Les pêcheurs de la vieille garde voulaient laisser la bête mourir en paix.» Identifie le sujet, le verbe principal, l'infinitif et les compléments.",
          "Dans le paragraphe 4, repère tous les verbes conjugués et classe-les par temps (imparfait, passé simple, plus-que-parfait). Justifie l'emploi de deux d'entre eux.",
          "Explique le rôle du tiret dans la phrase «Les enfants du village se relayèrent pour lui apporter du poisson frais — dans des seaux —.» Quel autre signe de ponctuation aurait pu être utilisé ?",
          "Réécris le paragraphe 2 au présent de l'indicatif (les 3 premières phrases seulement). Indique tous les changements de formes verbales que tu as effectués.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    titre: "Le premier hiver de Sami",
    sousTitre: "Un garçon syrien découvre la neige — et beaucoup plus — dans le quartier Limoilou",
    texte: [
      "Sami Haddad avait neuf ans quand il arriva à Québec le 14 janvier, par un froid de moins vingt-trois degrés qui lui mordit immédiatement les joues et les oreilles avec une brutalité qu'il n'avait jamais imaginée. En Syrie, même les hivers à Alep ne descendaient pas en dessous de cinq degrés. Il n'avait pas de mots pour décrire ce froid-là — pas dans son arabe natal, pas dans son français encore maladroit. C'était un froid qui entrait dans les poumons comme de l'acier, qui transformait la vapeur de la bouche en nuage visible, qui faisait craquer le sol sous les pieds comme si la terre elle-même était en train de se briser. Sa mère, Fatimah, serra son manteau trop mince autour d'elle et dit en arabe : «On va apprendre.» C'était sa réponse à tout, depuis deux ans.",
      "Leur appartement à Limoilou, dans un triplex de briques rouges, était petit — deux chambres, une cuisine aux murs jaunes et des radiateurs à eau chaude qui claquaient toute la nuit comme des coups de marteau —, mais chaud et propre, meublé par des bénévoles de l'organisme d'accueil. Sa mère avait épinglé sur le mur du salon, en face du canapé, une photo agrandie de leur maison à Alep — pas la maison détruite qu'ils avaient quittée, mais une photo de dix ans plus tôt, quand les rosiers grimpants couvraient encore la façade de rouge et de blanc. Sami passait parfois devant cette photo sans la regarder. Ce n'était pas qu'il voulait oublier. C'est qu'il ne savait pas encore comment porter les deux.",
      "Le premier jour d'école, dans une classe de quatrième année de l'école primaire Saint-François, Sami s'assit au troisième rang et ne comprit presque rien. Son français livresque, construit sur des applications et des manuels scolaires jordaniens traduits, ne lui était d'aucun secours face à l'accent du Québec, aux expressions idiomatiques, au rythme rapide des échanges entre enfants. À la récréation, il resta collé au mur de briques, les mains dans les poches d'un manteau trouvé la veille dans un bac de dons qui était encore légèrement trop grand pour lui. Un garçon s'approcha. Il s'appelait Noah Lapierre, avait les cheveux en bataille et une cicatrice en forme de virgule sur le menton. Il dit : «T'as l'air gelé. Prends-les, j'en ai deux paires.» Et il lui tendit des mitaines de laine rouge.",
      "Noah devint le guide de Sami dans ce monde incompréhensible, avec la patience naturelle de quelqu'un qui n'a jamais eu besoin d'y penser. Il lui expliqua les règles non écrites de la cour d'école, les codes sociaux qui n'existaient dans aucun manuel, comment prononcer le «r» québécois qui montait au fond de la gorge et qui ne ressemblait à rien de ce que Sami avait appris. Il l'emmena patiner sur les plaines d'Abraham un samedi de février, sous un ciel d'un bleu irréel, et Sami tomba vingt-deux fois — il les compta, après coup, avec une précision toute mathématique — avant de réussir à glisser cinq mètres sans s'écrouler. Il rit jusqu'aux larmes, quelque chose qu'il n'avait pas fait depuis si longtemps qu'il en avait oublié la sensation exacte. Noah l'aida à se relever à chaque fois, sans commentaire, sans pitié, avec la même main tendue.",
      "Mais certains soirs, après le dîner, quand sa mère mettait son tablier et que l'appartement sentait le zaatar et le pain plat chaud, Sami appelait son père par vidéo. Son père était encore là-bas, dans une ville frontalière turque, en attente de ses propres papiers. L'écran pixelisait son visage. Parfois la connexion coupait au milieu d'une phrase. Et Sami, parfois, éclatait en sanglots pendant que son père lui disait de sourire — «souri, habib» —, et il avait honte de cette tristesse parce qu'il avait aussi ri sur les plaines d'Abraham avec Noah, et il ne savait pas comment ces deux réalités pouvaient coexister dans la même poitrine sans se blesser mutuellement. Sa mère lui disait, en lui appuyant la main sur la tête : «Être heureux ici, c'est aussi une façon de résister.»",
      "Au printemps, quand le verglas fondit et que les premières touffes d'herbe jaune réapparurent entre les trottoirs, Sami fit sa première présentation orale en classe. Il parla des Laurentides, qu'il n'avait jamais vues mais qu'il avait étudiées dans des livres empruntés à la bibliothèque du quartier. Il parla lentement, avec des fautes, en s'arrêtant parfois pour chercher le bon mot dans la longue liste intérieure de son vocabulaire français qui s'était allongée chaque semaine depuis janvier. Son enseignante, Madame Bédard, nota dans son carnet après la classe : «Précision remarquable, courage admirable.» Noah applaudit le premier. Ce soir-là, en rentrant à pied sous un ciel rouge orangé qui ressemblait étrangement au coucher de soleil qu'il regardait depuis sa chambre à Alep quand il avait sept ans, Sami comprit qu'il portait maintenant deux maisons dans sa poitrine. Et que les deux, finalement, avaient de la place.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Personnages et contexte",
        questions: [
          "D'où vient Sami, quel âge a-t-il, et dans quelle ville et quel quartier arrive-t-il ?",
          "Comment l'appartement de Sami et sa mère est-il décrit ? Quels objets y révèlent leur histoire ?",
          "Comment Noah aide-t-il Sami lors de leur première rencontre et dans les semaines qui suivent ? Donne trois exemples concrets.",
          "Que fait Sami au printemps et comment son enseignante Madame Bédard réagit-elle ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Conflits et émotions",
        questions: [
          "Pourquoi Sami a-t-il honte de pleurer quand il appelle son père par vidéo ?",
          "Quel est le conflit intérieur que Sami vit entre sa vie à Québec et sa vie passée ?",
          "Que signifie la phrase de sa mère «être heureux ici, c'est aussi une façon de résister» ?",
          "Comment la situation du père de Sami est-elle différente de celle de Sami et de sa mère ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Décris la situation initiale : qui est Sami, d'où vient-il, et dans quel état arrive-t-il à Québec ?",
          "Quels sont les éléments perturbateurs que Sami doit affronter dans les premières semaines ?",
          "Identifie au moins deux péripéties importantes dans l'histoire de Sami au Québec.",
          "Quel est le dénouement de l'histoire ? En quoi la situation finale représente-t-elle une réconciliation ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et expressions",
        questions: [
          "Expliquez l'expression «un froid qui entrait dans les poumons comme de l'acier» (paragraphe 1). Identifiez la figure de style.",
          "Que signifie «son français livresque» (paragraphe 3) ? En quoi est-il différent du français québécois ?",
          "Qu'est-ce qu'une «expression idiomatique» ? Donne un exemple tiré de ton quotidien.",
          "Expliquez l'expression «deux maisons dans sa poitrine» à la fin. Qu'est-ce que les deux maisons représentent ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Quel est le défi principal que Sami doit surmonter dans cette histoire ? Est-ce uniquement un défi linguistique ?",
          "Quel rôle joue Noah dans l'intégration de Sami ? Aurait-il pu y arriver sans lui ?",
          "Comment la neige et le froid québécois sont-ils utilisés pour symboliser l'expérience d'adaptation de Sami ?",
          "Quelle est l'idée principale de cette histoire ? En une phrase, formule le message que l'auteur veut transmettre.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Pourquoi Sami «passe devant la photo d'Alep sans la regarder» ? Est-ce qu'il veut oublier sa maison d'origine ?",
          "Que peut-on déduire du personnage de Noah à partir du fait qu'il tend des mitaines sans qu'on lui demande ?",
          "La connexion vidéo qui «pixelise le visage» du père et «coupe au milieu d'une phrase» — quelle réalité symbolise-t-elle ?",
          "Pourquoi Sami compte-t-il ses chutes en patinant «avec une précision toute mathématique» ? Qu'est-ce que cela révèle sur lui ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Pourquoi la mère de Sami répond-elle toujours «on va apprendre» face aux difficultés ? Qu'est-ce que cela révèle sur son caractère ?",
          "Quelles seraient les conséquences pour Sami si Noah n'avait pas tendu les mitaines et ne l'avait pas pris sous son aile ?",
          "Que peut-on déduire de l'avenir de Sami à partir de la façon dont son enseignante note «courage admirable» ?",
          "Pourquoi le coucher de soleil de Québec «ressemble étrangement» à celui d'Alep ? Qu'est-ce que ce détail signifie pour l'identité de Sami ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu déjà eu à t'adapter à un environnement très différent (nouvelle école, nouveau pays, nouveau groupe) ? Comment as-tu vécu cette expérience ?",
          "Comment aurais-tu accueilli Sami dans ta classe ? Qu'aurais-tu fait de différent ou de semblable à Noah ?",
          "Que ressens-tu face au conflit intérieur de Sami entre être heureux à Québec et se souvenir d'Alep ?",
          "Quelle scène de cette histoire t'a le plus touché(e) ? Pourquoi ? Appuie-toi sur le texte.",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "La mère de Sami dit «être heureux ici, c'est aussi une façon de résister.» Es-tu d'accord avec cette idée ? Justifie ton point de vue.",
          "Penses-tu que l'intégration des réfugiés dans les écoles québécoises est bien faite ? Que manque-t-il ou que faudrait-il améliorer selon toi ?",
          "Noah représente l'accueil spontané et informel. Est-ce suffisant, ou faudrait-il des programmes structurés d'accueil à l'école ? Explique.",
          "Cette histoire idéalise-t-elle l'intégration, selon toi ? Quelles difficultés réelles ne sont pas représentées ?",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Figures de style et syntaxe",
        questions: [
          "Relevez la comparaison dans «un froid qui entrait dans les poumons comme de l'acier». Transformez-la en métaphore en réécrivant la phrase.",
          "Dans la phrase «sa mère lui appuyant la main sur la tête», identifiez le groupe participial. À quoi se rapporte-t-il ? Quelle est sa fonction ?",
          "Repérez deux exemples d'énumération dans le texte. Pour chaque exemple, expliquez l'effet créé.",
          "Transformez les deux phrases suivantes en une seule phrase complexe avec une subordonnée de cause : «Noah l'aida à se relever.» + «Noah ne fit aucun commentaire.»",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    titre: "La rivale de glace",
    sousTitre: "Deux joueuses de hockey face à leur propre vérité",
    texte: [
      "Dans la région du Saguenay-Lac-Saint-Jean, deux équipes de hockey mineur féminin se vouaient une rivalité féroce depuis cinq saisons : les Panthères de Chicoutimi, connues pour leur jeu technique et leur discipline défensive, et les Loups de Jonquière, redoutées pour leur vitesse et leur agressivité offensive. Et dans cette rivalité, deux joueuses incarnaient mieux que n'importe qui l'intensité du duel entre les deux villes : Alexia Bouchard, dix-deux ans, capitaine des Panthères, patineuse technique et économe de ses gestes comme une horlogère, froide comme de l'acier sous les projecteurs ; et Kim Tremblay, aussi douze ans, attaquante des Loups, rapide comme le vent sur une glace libre, imprévisible et souvent irrésistible, qui marquait ses meilleurs buts dans les moments de plus grande pression.",
      "La finale régionale eut lieu un samedi de mars, à l'aréna Jean-Béliveau de Chicoutimi, sous des projecteurs qui faisaient briller la glace comme un miroir poli. Les gradins étaient pleins — parents, grands-parents, professeurs, entraîneurs des équipes adverses — et le bruit était constant, un fond sonore de voix, de sifflets et de claquements de batons contre les bandes. Dans le vestiaire des Panthères, Alexia noua ses lacets en silence, les gestes précis et mécaniques. Elle visualisait le match, comme son entraîneur lui avait appris — les angles de tir, les positions défensives, les situations de mise en jeu. Elle n'avait qu'un objectif : gagner. Kim, dans le vestiaire d'en face, plaisantait à voix haute avec ses coéquipières pour dissiper l'anxiété qui lui tordait l'estomac. Elles jouaient différemment, elles se préparaient différemment. Elles s'étaient affrontées onze fois cette saison. Chaque rencontre avait laissé des marques.",
      "Le match fut à la hauteur de l'affiche. Premier tiers : 1-1. Deuxième tiers : 2-1 pour les Loups, puis 2-2 sur un tir au but parfait d'Alexia, une patineuse contre la gardienne, bâton revers, coin supérieur droit — le genre de but qu'on reprend en boucle sur un téléphone pendant une semaine. Au début du troisième tiers, sur une mise en jeu en zone neutre, Alexia et Kim se retrouvèrent face à face. Leurs bâtons s'emmêlèrent dans un croisement maladroit, leurs lames se rapprochèrent trop, et elles tombèrent toutes les deux sur la glace dans un enchevêtrement de coudières et de jambières. L'arbitre siffla l'arrêt du jeu. Alors que Kim se relevait la première, elle tendit la main à Alexia. Pas parce qu'elle y avait pensé. Pas parce qu'elle cherchait un geste noble. Parce que c'est ce que ses mains décidèrent, avant que son cerveau ait le temps d'intervenir. Alexia hésita — une fraction de seconde, juste assez longtemps pour que les deux filles se regardent vraiment dans les yeux —, puis saisit la main.",
      "Le murmure qui parcourut les gradins fut bref mais net, comme un accord de guitare dans le silence. Un parent photographia l'instant depuis la section des Loups, avec un téléphone tenu au-dessus des têtes. La photo — les deux filles sur la glace, se regardant dans les yeux, leurs gants se touchant — fut partagée quatre cents fois dans les deux heures suivantes. Les Panthères gagnèrent le match 3-2 en prolongation, sur un tir en angle d'Alexia, soixante-deux secondes après la remise en jeu. C'était le but de la victoire. Mais dans les couloirs de l'aréna, après la partie, les adultes parlaient plus de la photo que du but.",
      "Dans le vestiaire des Panthères, la victoire avait le goût habituel — soulagement, joie, épuisement —, mais quelque chose était différent. Alexia sortit son téléphone et vit le message de Kim, reçu dix minutes plus tôt : «Belle game. Tu mérites la victoire. À l'an prochain.» Alexia regarda le message longtemps. Elle avait imaginé, avant ce match, cent façons de réagir si Kim lui écrivait. Dans aucune d'elles elle n'avait imaginé ce qu'elle ressentait vraiment : du respect. Pas de la satisfaction d'avoir gagné contre une rivale, mais du respect, net et simple, pour quelqu'un qui jouait aussi bien qu'elle et d'une manière complètement différente. Elle répondit : «Merci. Toi aussi. La prochaine fois, tu gagnes peut-être.» Elle posa son téléphone, noua ses lacets dans son sac, et sourit — un vrai sourire, pas celui de la victoire, mais celui de quelqu'un qui vient de comprendre quelque chose de nouveau sur elle-même.",
      "Le lendemain, le journal régional publia la photo avec la légende : «Plus grandes que leur rivalité.» Alexia découpla l'article et le colla dans son cahier d'entraîneuse — parce qu'Alexia avait décidé, ce soir-là dans le vestiaire, qu'elle serait entraîneuse quand elle aurait fini de jouer. Elle voulait apprendre à des filles plus jeunes ce qu'elle avait appris ce soir — pas seulement le revers en coin supérieur droit, mais la main tendue sur la glace, et ce que ça fait à l'intérieur quand on la saisit.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Personnages et contexte",
        questions: [
          "Comment les deux équipes et les deux joueuses sont-elles décrites au début de l'histoire ? Donne deux caractéristiques de chaque joueuse.",
          "Décris l'atmosphère de l'aréna le soir de la finale. Quels détails montrent l'importance de l'événement ?",
          "Que se passe-t-il lors de la chute des deux joueuses au troisième tiers ? Décris le geste de Kim et la réaction d'Alexia.",
          "Quel message Kim envoie-t-elle à Alexia après la partie et comment Alexia y répond-elle ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Déroulement du match",
        questions: [
          "Quel est le score à chaque tiers du match ? Décris le but d'Alexia au deuxième tiers avec les détails techniques mentionnés.",
          "Comment les deux joueuses se préparent-elles différemment dans leur vestiaire respectif ?",
          "Que se passe-t-il après la photo ? Comment se propage-t-elle et comment les gens en parlent-ils ?",
          "Quelle décision Alexia prend-elle dans le vestiaire après la victoire, concernant son avenir ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Quelle est la situation initiale de cette histoire ? Décris la rivalité entre les deux équipes et les deux joueuses.",
          "Quel est l'élément perturbateur ? Est-il d'ordre sportif ou d'un autre ordre ?",
          "Identifie les péripéties sportives et les péripéties émotionnelles dans cette histoire.",
          "Quel est le vrai dénouement de cette histoire — le but en prolongation ou quelque chose d'autre ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et sens",
        questions: [
          "Expliquez la comparaison «patineuse technique et économe de ses gestes comme une horlogère». Qu'est-ce que cela dit du style de jeu d'Alexia ?",
          "Que signifie l'expression «à la hauteur de l'affiche» (paragraphe 3) dans le contexte d'un match de hockey ?",
          "Expliquez «le murmure qui parcourut les gradins fut bref mais net, comme un accord de guitare dans le silence». Identifiez la figure de style.",
          "Que veut dire «un vrai sourire, pas celui de la victoire» à la fin ? Quelle différence l'auteur fait-il entre ces deux types de sourires ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Quel est le vrai sujet de cette histoire : le hockey, la rivalité, l'amitié, le respect ou la croissance personnelle ? Justifie.",
          "Pourquoi la photo est-elle plus importante que le but de la victoire dans le récit de cette histoire ?",
          "Que comprend Alexia sur elle-même à la fin ? Comment a-t-elle changé par rapport au début de l'histoire ?",
          "Quelle est la leçon principale que cette histoire veut transmettre ? Formule-la en une phrase.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Kim tend la main «avant que son cerveau ait le temps d'intervenir». Que cela révèle-t-il sur ce qu'elle ressent vraiment envers Alexia ?",
          "Alexia hésite «une fraction de seconde» avant de saisir la main. Que se passe-t-il dans cette hésitation ?",
          "Pourquoi Alexia décide-t-elle de devenir entraîneuse après ce match ? Qu'est-ce que cela révèle sur ce que le match lui a appris ?",
          "Que suggère le fait que les adultes «parlaient plus de la photo que du but» après la partie ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Qu'est-ce qui a changé dans la relation entre Alexia et Kim à la fin de cette histoire ? Comment la main tendue a-t-elle produit ce changement ?",
          "Si Kim n'avait pas tendu la main, quel aurait été le dénouement de l'histoire, selon toi ? Expliquez.",
          "Pourquoi le journal publie-t-il la légende «Plus grandes que leur rivalité» ? Qu'est-ce que cela dit sur les valeurs sociales ?",
          "Que peut-on déduire sur la prochaine saison de hockey entre les deux équipes, à partir du message d'Alexia à Kim ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu déjà eu un(e) rival(e) dans un sport, un jeu ou toute autre activité ? Comment ta relation avec cette personne a-t-elle évolué ?",
          "Comment aurais-tu réagi à la place d'Alexia quand Kim lui a tendu la main ?",
          "Penses-tu qu'on peut être à la fois très compétitif(ve) et respectueux(se) de ses adversaires ? Ces deux choses sont-elles compatibles ?",
          "Quel personnage de cette histoire t'a le plus impressionné(e) et pourquoi : Alexia, Kim, ou un autre ?",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "La rivalité sportive intense — comme celle entre les Panthères et les Loups — est-elle saine ou nuisible pour les jeunes athlètes ? Justifie ta réponse.",
          "La légende du journal «Plus grandes que leur rivalité» valorise-t-elle un comportement sportif juste ? Y a-t-il d'autres façons d'interpréter ce geste ?",
          "Alexia décide de devenir entraîneuse pour transmettre «la main tendue sur la glace». Est-ce une motivation valable pour choisir une carrière ? Explique.",
          "Cette histoire présente une vision idéalisée du sport féminin. Est-ce une représentation juste de la réalité du sport amateur ? Justifie ta réponse.",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Syntaxe et types de phrases",
        questions: [
          "Transformez la phrase déclarative «Les Panthères gagnèrent le match 3-2 en prolongation» en phrase interrogative (deux façons différentes) et en phrase exclamative.",
          "Identifiez la phrase «Les deux joueuses incarnaient mieux que n'importe qui l'intensité du duel». Repérez le sujet, le verbe et l'adverbe comparatif. Réécrivez-la au superlatif.",
          "Relevez deux exemples de ponctuation expressive (point d'exclamation, tiret, deux-points) dans le texte. Pour chacun, expliquez son effet stylistique.",
          "Dans «Alexia hésita — une fraction de seconde, juste assez longtemps pour que les deux filles se regardent vraiment dans les yeux —», quel est le rôle des tirets ? Identifiez le type de proposition enchâssée.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    titre: "La nuit du verglas",
    sousTitre: "Nouvel An sans électricité dans une ferme des Cantons-de-l'Est",
    texte: [
      "La ferme Arsenault, à Saint-Isidore-de-Clifton dans les Cantons-de-l'Est, était une vieille maison de pierres des champs aux murs épais d'un mètre, couverte d'un toit à deux versants que les hivers successifs avaient incurvé légèrement vers le centre, comme un dos qui s'incline sous un poids qu'il porte depuis longtemps. La famille qui l'habitait se composait de quatre personnes profondément différentes les unes des autres : Gaston, le père, agriculteur de cinquante-deux ans qui ne parlait que si c'était nécessaire et qui réparait tout lui-même avec du fil de fer et de la patience ; Diane, la mère, infirmière de campagne depuis vingt ans, organisatrice née qui gardait en tête, en permanence, au moins trois scénarios d'urgence pour chaque situation de la vie ; Zacharie, seize ans, qui lisait des romans de science-fiction en cachette des heures que ses parents auraient voulu le voir passer à aider à la ferme, et qui comptait les jours avant de partir étudier le génie informatique à Montréal ; et Émilie, neuf ans, qui ne pouvait s'endormir que si un adulte lui lisait une histoire, et qui avait une collection de quatre-vingt-deux cailloux triés par couleur dans des boîtes à œufs.",
      "Le 31 décembre, à vingt-deux heures précises, alors que la famille regardait le compte à rebours télévisé depuis le salon, l'électricité coupa d'un seul coup — les lampes, le téléviseur, le radiateur électrique de la salle de bain. Puis les téléphones portables perdirent leur signal, l'un après l'autre, en quelques minutes. Dehors, on entendait le craquement des arbres sous le poids du verglas, un son comme des coups de fusil dans la forêt noire. Une pluie verglaçante depuis la veille avait recouvert toute la région d'une couche de glace de deux centimètres — les fils électriques, les branches, le toit de la grange, les rampes de l'escalier extérieur. La radio à piles FM, que Diane avait récupérée sous l'évier de la cuisine en moins de trente secondes, annonça : panne d'Hydro-Québec sur soixante-dix mille foyers, durée estimée de quarante-huit à soixante-douze heures, températures prévues de moins vingt. Zacharie tapa du poing sur la table. «Je vais manquer le compte à rebours. C'est nul.»",
      "Gaston alluma les lampes à huile — quatre lampes à contrepoids qu'il gardait depuis l'époque de son père, huile incluse dans un bidon d'acier —, puis enfourna du bois dans le poêle à bois du salon, dont le conduit avait été ramoné en octobre comme tous les ans. La chaleur se diffusa lentement, orange et odorante, emplissant la pièce d'une lumière qui n'avait rien à voir avec l'électricité — quelque chose de vivant, de mouvant, de légèrement hypnotique. Diane dressa un inventaire de papier et de crayon à la lumière d'une lampe frontale : eau embouteillée pour six jours, conserves pour deux semaines, bois de chauffage pour dix jours dans le hangar, médicaments. Elle avait été infirmière de campagne dans deux villages sans médecin pendant dix ans. Les situations d'urgence avaient une grammaire qu'elle connaissait par cœur. Elle envoya Zacharie vérifier l'état des voisins Blouin, à un kilomètre par le chemin forestier verglacé, avec des crampons sur les bottes et une lampe de poche.",
      "Zacharie mit cinquante-cinq minutes pour faire le trajet aller-retour. Il tomba quatre fois sur la route verglacée comme un miroir, se rattrapa chaque fois aux branches basses des épinettes, et revint avec les informations : les Blouin allaient bien, avaient de l'huile et du bois, et envoyaient deux bouteilles de leur cidre de glace maison pour le réveillon. Il les posa sur la table de la cuisine avec l'air de quelqu'un qui vient de traverser l'Arctique — les joues rouges, la veste givrée, les yeux brillants d'une fierté qu'il ne savait pas encore nommer. Il ne dit pas à ses parents qu'il avait eu peur sur le chemin du retour, en entendant un grand craquement au-dessus de lui, et qu'il s'était aplati dans la neige pendant trente secondes en attendant de savoir si c'était un arbre ou juste une branche.",
      "À minuit moins cinq, sans compte à rebours télévisé ni feux d'artifice visibles à travers les fenêtres givrées, la famille Arsenault fit le réveillon à sa manière. Gaston ouvrit l'étui de guitare qui dormait derrière le canapé depuis au moins huit ans, accorda l'instrument à l'oreille, et joua trois vieilles chansons de sa mère — Vive la Canadienne, La Complainte du phoque en Alaska et une troisième dont il avait oublié le nom mais pas les accords. Diane raconta comment elle avait passé le grand verglas de 1998 à accoucher une femme à la chandelle pendant dix-huit heures, et tout le monde l'écouta sans interrompre. Émilie, pour la première fois de sa vie, ne demanda pas qu'on lui lise une histoire. Elle en raconta une elle-même, inventée de toutes pièces, avec des personnages absurdes et une logique interne parfaitement cohérente, pendant vingt minutes, sans s'arrêter. Et Zacharie, qui avait prévu d'envoyer des messages à ses amis de Montréal dès le premier signal retourné, pensa à peine à son téléphone.",
      "Le courant revint le 2 janvier à six heures du matin, en même temps que le soleil. Zacharie rouvrit son téléphone : soixante-neuf notifications — bonne année, photos de fêtes en appartement, vidéos de feux d'artifice depuis les toits. Il les regarda toutes, soigneusement, puis posa le téléphone sur la table et descendit. Dans la cuisine, Gaston faisait chauffer du café sur le poêle à bois — il préférait comme ça, disait-il. Diane préparait des crêpes. Émilie alignait ses cailloux sur la table pour raconter à son père l'histoire qu'elle avait inventée la nuit du 31. Le verglas fondait sur le toit dans un bruit de ruisseau. Zacharie s'assit, prit une tasse, et dit : «L'an prochain, on pourrait faire le réveillon sans allumer la télé.» Gaston leva les yeux de son café et sourit — un vrai sourire, discret, le genre qu'on voit rarement sur le visage d'un homme de cinquante-deux ans qui parle peu.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Famille et contexte",
        questions: [
          "Comment chacun des quatre membres de la famille Arsenault est-il décrit ? Donne une caractéristique spécifique pour chacun.",
          "Quelle est l'étendue de la panne selon la radio et comment chaque membre réagit-il immédiatement ?",
          "Comment Gaston prépare-t-il la maison pour la nuit sans électricité ? Décris ses actions dans l'ordre.",
          "Que rapporte Zacharie de sa visite chez les voisins Blouin ? Que ne dit-il pas à ses parents ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Réveillon et transformation",
        questions: [
          "Comment la famille célèbre-t-elle le Nouvel An sans électricité ? Donne trois éléments concrets.",
          "Quelle histoire Diane raconte-t-elle à sa famille pendant le réveillon ? Pourquoi tout le monde l'écoute-t-il sans interrompre ?",
          "Qu'est-ce qu'Émilie fait pour la première fois de sa vie pendant le réveillon ? Qu'est-ce que cela signifie ?",
          "Quelle décision Zacharie annonce-t-il le 2 janvier matin et comment son père réagit-il ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Décris la situation initiale : qui est la famille Arsenault et comment chaque membre vit-il avant la panne ?",
          "Quel est l'élément perturbateur ? À quel moment précis de la soirée survient-il ?",
          "Quelles sont les péripéties ? Identifie au moins deux moments de tension ou de défi pour la famille.",
          "Décris le dénouement et la situation finale. En quoi la famille a-t-elle changé par rapport au début ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et sens",
        questions: [
          "Que signifie «les situations d'urgence avaient une grammaire qu'elle connaissait par cœur» à propos de Diane ? Identifiez la figure de style.",
          "Expliquez «une fierté qu'il ne savait pas encore nommer» à propos de Zacharie au retour de chez les Blouin.",
          "Que veut dire l'expression «une lumière qui avait quelque chose de vivant» (paragraphe 3) à propos des lampes à huile ?",
          "Expliquez le sens du «vrai sourire, discret, le genre qu'on voit rarement sur le visage d'un homme de cinquante-deux ans qui parle peu.»",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Quel est le paradoxe au cœur de cette histoire : comment une panne de courant peut-elle être un cadeau ?",
          "Comment chaque membre de la famille Arsenault est-il transformé par la nuit du verglas ?",
          "Quelle est la signification de la proposition de Zacharie («l'an prochain, on pourrait faire le réveillon sans allumer la télé») pour l'ensemble de l'histoire ?",
          "Quelle est l'idée principale de cette histoire ? Formule-la en une phrase complète.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Pourquoi Zacharie ne dit-il pas à ses parents qu'il a eu peur sur le chemin du retour des Blouin ?",
          "Pourquoi Gaston «préfère» faire chauffer son café sur le poêle à bois, après le retour du courant ? Que cela révèle-t-il sur son évolution ?",
          "Pourquoi Émilie choisit-elle de raconter une histoire plutôt que d'en demander une ? Qu'est-ce que cela symbolise dans son développement ?",
          "Que révèle le sourire final de Gaston sur sa relation avec sa famille et sur ce que la nuit du verglas a changé pour lui ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Pourquoi Zacharie, qui comptait les jours pour partir à Montréal, pense-t-il «à peine à son téléphone» cette nuit-là ?",
          "Quelles seraient les conséquences si la panne avait duré dix jours plutôt que deux ? Que peut-on déduire de la préparation de Diane ?",
          "Pourquoi l'auteur précise-t-il que la guitare «dormait depuis au moins huit ans» ? Qu'est-ce que cela nous dit sur Gaston avant la panne ?",
          "Que peut-on prédire pour la famille Arsenault dans le futur, à partir de la proposition de Zacharie le 2 janvier ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu déjà vécu une panne de courant ou une situation où la technologie était inaccessible ? Comment as-tu réagi ?",
          "Penses-tu que les écrans et les réseaux sociaux empêchent les familles de vraiment se parler ? Appuie-toi sur des exemples concrets.",
          "Quel membre de la famille Arsenault te ressemble le plus et pourquoi ?",
          "Que ferais-tu personnellement si tu vivais une telle panne le soir du Nouvel An avec ta famille ?",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "L'histoire suggère que la panne de courant a été bénéfique pour la famille. Est-ce une vision romantique de la réalité ou une leçon valable ? Justifie.",
          "Zacharie propose de faire le réveillon sans télé l'an prochain. Est-ce réaliste à long terme ou une décision prise sous l'émotion du moment ?",
          "La décision de Diane d'envoyer Zacharie seul sur un chemin verglacé de nuit est-elle prudente ou irresponsable ? Justifie.",
          "Notre dépendance aux écrans est-elle un problème grave ou simplement une évolution normale de la société ? Défends ta position.",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Groupes du nom et expansions",
        questions: [
          "Dans «une vieille maison de pierres des champs aux murs épais d'un mètre, couverte d'un toit à deux versants», identifiez le nom noyau du GN et toutes ses expansions (adjectif, complément du nom, participe passé).",
          "Repérez deux GN complexes dans le paragraphe 4 et pour chacun, faites l'analyse complète de ses constituants.",
          "Dans la phrase «Gaston ouvrit l'étui de guitare qui dormait derrière le canapé depuis au moins huit ans», quelle est la nature et la fonction de «qui dormait derrière le canapé depuis au moins huit ans» ?",
          "Écrivez trois phrases en intégrant des compléments du nom de types différents (adjectif, GN prépositionnel, subordonnée relative).",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 9,
    titre: "L'étrange montre du marché",
    sousTitre: "Un objet mystérieux, un vieux monsieur, et une histoire à travers le temps",
    texte: [
      "Éloi Deschamps avait dix ans, dix dollars et cinquante cents dans sa poche et la permission d'aller seul au marché aux puces du parc Jarry, un samedi matin de septembre qui avait la douceur tiède d'un dernier cadeau de l'été. C'était sa tradition du début d'automne, depuis que son grand-père Rémi lui avait appris à «regarder les objets qui ont eu une vie» — c'était son expression, et Éloi l'avait adoptée sans se demander si elle était vraiment logique, parce que lui, il savait exactement ce qu'elle voulait dire. Sa mère l'appelait «le petit collectionneur de l'inutile», et il prenait ça comme le compliment le plus précis qu'on lui eût jamais fait.",
      "Au fond du marché, sous un parasol à rayures rouge et blanc passé par le soleil, un vieil homme était assis derrière une table couverte de montres. Pas des montres neuves ou des contrefaçons — des vraies vieilles montres, de toutes les formes et de toutes les tailles, chacune affichant une heure différente, comme si elles venaient de fuseaux horaires divergents ou de différentes époques. Des montres de gousset en argent ciselé, des montres bracelet en bakélite jaunie, des montres à remonter avec des aiguilles comme de petites falaises sur le cadran. Le vieil homme avait des cheveux blancs très fins et des yeux qui semblaient regarder quelque chose que personne d'autre ne voyait dans la pièce. Éloi s'arrêta sans raison particulière devant une montre de gousset en argent gravé de fougères entrelacées. Le vieil homme, sans qu'Éloi dise un mot, la prit et la lui tendit à deux mains, comme on offre quelque chose d'important. «Celle-là, dit-il, elle choisit son propriétaire. Et elle t'a choisi. Trois dollars, si tu veux.»",
      "Éloi paya les trois dollars — le vieux monsieur refusa les quatre autres que le garçon voulait rajouter «pour la valeur de l'objet» — et rentra chez lui. Cette nuit-là, il mit la montre sur sa table de chevet. Il l'entendit tic-tacer — bizarre, puisque la montre semblait arrêtée quand il l'avait achetée, et il n'avait pas remonté le mécanisme. Il s'endormit en la regardant. Le lendemain matin, il eut un rêve si précis, si détaillé, qu'il lui sembla plus réel que la réalité : un garçon de son âge exact, habillé d'une chemise à col cassé et de bretelles, debout dans une cour d'école en pierres grises, sous un ciel de novembre. Le garçon le regardait directement, sans surprise, comme s'il l'attendait. Dans sa main droite, il tenait la même montre. Quand le rêve se dissipa, Éloi resta longtemps allongé à fixer le plafond.",
      "Le fond de la montre portait une inscription gravée au burin, en lettres minuscules : «À Julien, avec tout mon amour. Ton père, 12 novembre 1944.» Éloi passa la semaine suivante à la bibliothèque du quartier, avec l'aide de la bibliothécaire, Madame Aubert, qui avait la patience des gens passionnés par leur travail. Ils remontèrent la piste dans les archives numérisées de l'état civil québécois, dans les registres paroissiaux et dans un annuaire généalogique en ligne. Il existait bien un Julien Deschamps — Julien Arthur Deschamps, né en 1933 à Saint-Hyacinthe — portant le même nom de famille qu'Éloi, que Madame Aubert identifia finalement comme un cousin au quatrième degré de son arrière-grand-père. Son père, Alphonse Deschamps, était parti dans la marine marchande pendant la guerre et lui avait offert cette montre avant de prendre la mer. Alphonse était revenu en 1945. Julien était devenu instituteur dans une école de campagne. Et la montre avait suivi sa route — vendue à un antiquaire après la mort de Julien, revendue à un autre, puis à un troisième, et finalement posée sur la table d'un vieil homme à rayures rouge et blanc au parc Jarry.",
      "Éloi porta la montre chez un horloger de la rue Saint-Denis, un vieux monsieur originaire de Genève qui portait une loupe enchâssée dans l'orbite de son œil droit comme un accessoire de science-fiction. L'horloger démonta le mécanisme, nettoya les rouages, remplaça deux pivots usés et remit la montre en marche pour quarante-cinq dollars — qu'Éloi paya avec ses économies de deux mois. Ce soir-là, dans sa chambre, le tic-tac régulier et léger de la montre emplissait le silence. Éloi la tint dans sa paume et regarda les aiguilles tourner. Il pensa à Julien, dix ans comme lui, qui avait sans doute fait exactement la même chose soixante-douze ans plus tôt — tenir la montre dans sa paume, regarder les aiguilles, penser à son père parti sur la mer. Il y avait quelque chose de vertigineux dans cette continuité — comme si le temps était une boucle, et que certains objets servaient de fil entre deux points distants de la boucle.",
      "Le lendemain, Éloi écrivit une lettre à la vieille adresse que Madame Aubert avait trouvée — l'adresse de la petite-fille de Julien, qui vivait à Trois-Rivières. Il ne savait pas si la lettre arriverait. Il ne savait pas si la petite-fille répondrait. Mais il avait l'impression, en collant l'enveloppe, que c'était ce qu'il fallait faire — que la montre l'avait choisi non pas pour la garder, mais pour fermer la boucle.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Personnage et découverte",
        questions: [
          "Qui est Éloi, quel âge a-t-il, et quelle est sa passion ? Comment son grand-père a-t-il influencé cette passion ?",
          "Décris la table du vieil homme au marché. Qu'est-ce qui rend sa marchandise unique ?",
          "Que dit le vieil homme à Éloi avant même qu'il parle, et combien coûte la montre ?",
          "Que fait Éloi avec la montre après l'avoir achetée ? Décris le rêve qu'il fait.",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Recherche et histoire de la montre",
        questions: [
          "Quelle inscription Éloi trouve-t-il au fond de la montre ?",
          "Comment Éloi et Madame Aubert retrouvent-ils la trace de Julien Deschamps ? Décris les étapes de leur recherche.",
          "Quelle est l'histoire d'Alphonse Deschamps, le père de Julien ? Qu'est-il arrivé à la montre après la mort de Julien ?",
          "Que fait Éloi avec la montre à la fin de l'histoire ? Quelle lettre écrit-il et pourquoi ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Décris la situation initiale : qui est Éloi, où va-t-il, et dans quel état d'esprit est-il ?",
          "Quel est l'élément perturbateur dans cette histoire ?",
          "Identifie les péripéties : quelles étapes Éloi traverse-t-il dans sa quête pour comprendre l'origine de la montre ?",
          "Quel est le dénouement et la situation finale ? Qu'est-ce qu'Éloi a compris et décidé ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et sens",
        questions: [
          "Que signifie «regarder les objets qui ont eu une vie» dans le contexte du marché aux puces ? Qu'est-ce que cela veut dire concrètement ?",
          "Expliquez l'expression «vertigineux» (paragraphe 5) dans le contexte de la réflexion d'Éloi sur la montre et le temps.",
          "Que veut dire «fermer la boucle» dans la dernière phrase ? Quelle image le mot «boucle» évoque-t-il ?",
          "Que signifie le fait que le vieil homme refuse les quatre dollars supplémentaires qu'Éloi veut payer «pour la valeur de l'objet» ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Quel est le vrai thème de cette histoire : la famille, le temps, le mystère, la transmission ou autre chose ? Justifie.",
          "Quelle est la signification du fait que Julien et Éloi portent le même nom de famille ?",
          "Pourquoi Éloi décide-t-il d'écrire une lettre à la petite-fille de Julien plutôt que de garder la montre pour lui ?",
          "Quelle est la leçon principale de cette histoire ? Formule-la en une phrase complète.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Que veut dire le vieil homme quand il dit que la montre «choisit son propriétaire» ? Est-ce littéral ou symbolique ?",
          "La montre tic-tace la nuit alors qu'elle semblait arrêtée. L'auteur veut-il nous faire croire à quelque chose de surnaturel ? Qu'est-ce que cela symbolise ?",
          "Pourquoi Éloi reste-t-il «longtemps allongé à fixer le plafond» après son rêve ? Que s'est-il passé en lui ?",
          "Pourquoi l'auteur précise-t-il qu'Éloi a l'impression que la montre «l'a choisi non pas pour la garder, mais pour fermer la boucle» ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Causes et conséquences",
        questions: [
          "Pourquoi Alphonse a-t-il offert cette montre à son fils Julien avant de partir en mer ? Que représentait-elle pour eux deux ?",
          "Que peut-on déduire de la réponse de Madame Aubert à la curiosité d'Éloi : elle a «la patience des gens passionnés par leur travail» ?",
          "Si Éloi n'avait pas écrit à la petite-fille de Julien, qu'est-ce qui resterait «fermé» selon la logique de l'histoire ?",
          "Pourquoi l'horloger genevois remet-il la montre en marche pour 45 dollars, un montant important pour un enfant ? Qu'est-ce que cela dit sur la valeur qu'Éloi attribue à cet objet ?",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "Possèdes-tu un objet de famille qui a une histoire ? Raconte d'où il vient et ce qu'il représente pour toi.",
          "Si tu avais trouvé cette montre, aurais-tu fait les mêmes recherches qu'Éloi ou l'aurais-tu simplement gardée ? Explique.",
          "Que ressens-tu face à l'idée que certains objets peuvent «relier» des personnes à travers le temps et les générations ?",
          "As-tu déjà fait une découverte (objet, photo, lettre, lieu) qui t'a fait penser à des gens que tu n'as pas connus ? Raconte.",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Éloi dépense deux mois d'économies pour faire réparer la montre. Est-ce une décision raisonnable pour un enfant de dix ans ? Justifie.",
          "L'auteur utilise des éléments légèrement surnaturels (la montre qui tic-tace seule, le rêve précis). Est-ce un choix narratif efficace ou cela nuit-il au réalisme de l'histoire ?",
          "Éloi décide d'écrire à la petite-fille de Julien. Est-ce la bonne décision ? Que risque-t-il ? Que peut-il gagner ?",
          "Cette histoire suggère que connaître l'histoire de sa famille est important. Es-tu d'accord ? Pourquoi cette connaissance serait-elle précieuse ou non ?",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Subordonnées relatives et conjonctives",
        questions: [
          "Dans «Éloi passa la semaine suivante à la bibliothèque du quartier, avec l'aide de la bibliothécaire, Madame Aubert, qui avait la patience des gens passionnés par leur travail», identifiez la subordonnée relative et son antécédent. Quelle est sa fonction ?",
          "Repérez deux propositions subordonnées conjonctives dans le texte (commençant par «que», «parce que», «si», etc.) et identifiez leur type (complétive, circonstancielle de cause, de condition, etc.).",
          "Réécrivez la phrase «Il pensa à Julien, dix ans comme lui, qui avait tenu la montre dans sa paume» en remplaçant la subordonnée relative par un groupe participial.",
          "Construisez deux phrases complexes en utilisant des pronoms relatifs différents (qui, que, dont, où, lequel) en rapport avec le thème de la montre.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 10,
    titre: "La traversée du lac Blanc",
    sousTitre: "Un grand-père de 82 ans, sa petite-fille et une promesse tenue enfin",
    texte: [
      "Chaque hiver depuis que Rosalie avait cinq ans, son grand-père Edmond lui faisait la même promesse : «Un jour, ma grande, on traversera le lac Blanc ensemble à pied. Mais seulement quand la glace sera vraiment prête.» Rosalie avait maintenant treize ans. La glace n'avait jamais été «vraiment prête». En décembre, Edmond disait que c'était trop tôt — «une glace de décembre, c'est encore jeune, ça crache». En mars, c'était trop tard — «la glace de mars, elle a déjà trop vécu, elle retourne à l'eau». Les fenêtres parfaites étaient rares, et quelque chose l'en avait toujours empêché — un hiver doux, une semaine de pluie, un genou opéré qui mettait du temps à guérir, un rhume traînant. Mais cette année, un froid extraordinaire avait solidifié le lac Blanc dès les premiers jours de janvier, sans interruption, sans redoux, et Edmond, quatre-vingt-deux ans, regardait le lac depuis la fenêtre de sa cuisine chaque matin avec l'air d'un homme qui sait qu'il ne peut plus se permettre de remettre à l'année suivante.",
      "Ils partirent un dimanche matin de la mi-janvier, par un froid sec et clair de moins dix-huit degrés, sous un ciel sans nuage qui avait la couleur exacte d'une coquille d'œuf bleu. Rosalie portait sa combinaison de ski imperméable et ses bottes thermiques. Edmond, lui, portait son manteau de laine gris qui datait de 1978 — il refusa la doudoune que Rosalie lui proposait avec des arguments pratiques bien préparés, parce que «la laine, elle respire». Il avait aussi sa canne de frêne blanc, qu'il tenait à deux mains pour tester la glace à chaque pas, un geste appris de son père, qui l'avait appris de son propre père, qui avait traversé ce même lac avec un cheval et une sleigh dans les années 1910. La surface du lac était d'un blanc parfait strié de longues fissures bleues translucides qui couraient de la rive gauche à la rive droite comme des veines sur le dos d'une main.",
      "Après vingt minutes de marche, ils atteignirent le milieu du lac. De là, les deux rives étaient à égale distance — un fait géographique ordinaire, mais qui donnait, à pieds sur la glace, une sensation étrange d'équilibre entre deux mondes. Le silence était absolu. Même les mésanges avaient cessé de pépier. Le vent s'était tu. Rosalie entendait le battement de son propre cœur, et le craquement léger de la canne d'Edmond à chaque pas. «Ces fissures bleues là», dit-elle en montrant les longues veines translucides, «elles ne sont pas dangereuses ?» Edmond s'arrêta, posa sa canne, et regarda le lac. «Non, dit-il. Ce sont les marques que la glace fait quand elle se consolide. C'est elle qui travaille, qui se resserre, qui s'afferme. Plus y'a de fissures de ce genre, plus la glace est solide. C'est à ça qu'on reconnaît quelque chose de vrai.» Il dit ça simplement, sans chercher à faire de philosophie, et Rosalie entendit quand même autre chose que de la glaciologie.",
      "Au milieu du lac, Edmond posa sa canne contre sa jambe et leva les yeux vers le ciel pâle. Il parla sans regarder Rosalie, d'une voix calme et lente qui ne cherchait pas à impressionner. «La dernière fois que j'ai traversé ce lac, j'avais douze ans. Mon père m'avait emmené. On avait marché dans l'autre sens — de la rive nord à la rive sud. On avait pris une heure. Et puis mon père est mort l'hiver suivant. Une pneumonie, en mars.» Rosalie ne sut quoi répondre. Elle prit la main de son grand-père — une main noueuse, aux articulations larges, tachée par les années de travail dehors, une main qui avait planté des milliers d'arbres, réparé des centaines de moteurs, tenu d'autres mains dans d'autres hivers. Elle la tint sans rien dire. Et Edmond continua de marcher.",
      "À l'autre rive, ils trouvèrent un vieux banc de bois à moitié enseveli dans la neige, et ils s'assirent. Rosalie sortit le thermos de chocolat chaud qu'elle avait préparé en secret le matin, et les deux tasses dépareillées qu'elle avait glissées dans son sac. Edmond souffla sur le chocolat, puis parla pendant une heure sans s'arrêter — le lac dans les années cinquante, les expéditions de pêche blanche avec sa femme Jeannette avant qu'elle soit malade, la fois où son frère Roger avait brisé la glace près de la rive nord en mars 1963 et où ils l'avaient sorti en l'agrippant par les bras pendant que Roger criait qu'il avait froid comme si ça pouvait aider, les anguilles qu'ils pêchaient dans la vase au fond et que Jeannette cuisinait avec des oignons et du beurre, les brochets qui sautaient hors de l'eau en juillet et que le grand-père d'Edmond attrapait à la main les premiers étés, quand le lac était encore sauvage. Il parla de tout ça comme si la glace dessous eux gardait la mémoire de ces moments, et que marcher dessus les libérait.",
      "Sur le chemin du retour, Rosalie marchait légèrement en arrière d'Edmond, regardant ses pas dans la neige, les petits trous nets que sa canne perçait à intervalles réguliers. Elle réalisa soudain quelque chose qui n'avait pas de nom encore mais qui se formait dans sa poitrine comme une certitude : dans quinze ans, peut-être, ou vingt, elle traverserait ce lac avec son propre enfant. Et elle lui parlerait d'Edmond. Et elle lui montrerait les fissures bleues et lui dirait ce qu'Edmond lui avait dit — que les marques de la consolidation ne sont pas des blessures, qu'elles sont la preuve que quelque chose tient. Et elle comprit qu'elle tenait déjà quelque chose — quelque chose d'assez solide pour traverser plusieurs hivers.",
    ],
    questions: [
      {
        type: "comprehension",
        label: "Compréhension 1 — Personnages et contexte",
        questions: [
          "Depuis combien d'années Edmond fait-il cette promesse à Rosalie ? Pourquoi la traversée n'a-t-elle jamais eu lieu avant ?",
          "Comment Edmond et Rosalie sont-ils habillés pour la traversée ? Qu'est-ce que leurs vêtements révèlent sur leur personnalité ?",
          "Qu'est-ce qu'Edmond explique à Rosalie sur les fissures bleues dans la glace au milieu du lac ?",
          "Qu'est-ce qu'Edmond raconte à Rosalie une fois assis sur le banc à l'autre rive ? Donne trois sujets précis qu'il aborde.",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 2 — Événements et déroulement",
        questions: [
          "Dans quel contexte climatique particulier la traversée a-t-elle enfin lieu cette année ?",
          "Décris l'atmosphère au milieu du lac (sons, couleurs, sensations). Cite des éléments précis du texte.",
          "Qu'est-ce qu'Edmond révèle sur la dernière fois qu'il a traversé ce lac ? Quel âge avait-il et que s'est-il passé après ?",
          "Que fait Rosalie à l'autre rive qui était préparé en secret ? Quel geste fait-elle au milieu du lac ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 3 — Schéma narratif",
        questions: [
          "Décris la situation initiale : quelle est la promesse d'Edmond, et depuis combien de temps est-elle reportée ?",
          "Quel est l'élément perturbateur — ou plutôt, quel est l'élément déclencheur qui permet enfin la traversée ?",
          "Identifie les moments de tension ou de révélation dans cette histoire. Y a-t-il des «péripéties» au sens classique ?",
          "Quel est le dénouement ? Quel est le sens de la réflexion de Rosalie sur le chemin du retour ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 4 — Vocabulaire et images",
        questions: [
          "Expliquez la comparaison «un ciel sans nuage qui avait la couleur exacte d'une coquille d'œuf bleu» (paragraphe 2). Que dit cette image sur le type de journée ?",
          "Que signifie «une glace de décembre, c'est encore jeune, ça crache» ? Qu'est-ce que cela révèle sur le rapport d'Edmond avec la nature ?",
          "Expliquez l'expression «il parla de tout ça comme si la glace gardait la mémoire de ces moments, et que marcher dessus les libérait.»",
          "Que veut dire Rosalie quand elle pense qu'elle «tient déjà quelque chose d'assez solide pour traverser plusieurs hivers» ?",
        ],
      },
      {
        type: "comprehension",
        label: "Compréhension 5 — Sens global",
        questions: [
          "Cette histoire parle-t-elle vraiment d'une traversée de lac ou d'autre chose ? Quel en est le vrai sujet ?",
          "Quel rôle jouent les souvenirs d'Edmond dans l'histoire ? En quoi sont-ils essentiels à la résolution du récit ?",
          "Pourquoi Edmond a-t-il attendu jusqu'à ses quatre-vingt-deux ans pour faire cette traversée avec Rosalie ?",
          "Quelle est la leçon principale transmise dans cette histoire ? Formule-la en une phrase complète.",
        ],
      },
      {
        type: "inference",
        label: "Inférence 1 — Ce qui est suggéré",
        questions: [
          "Pourquoi Edmond regarde le lac «avec l'air d'un homme qui sait qu'il ne peut plus se permettre de remettre à l'année suivante» ?",
          "Que signifie la leçon sur les fissures — «c'est à ça qu'on reconnaît quelque chose de vrai» — appliquée à la vie humaine ?",
          "Rosalie «entendit quand même autre chose que de la glaciologie». Qu'a-t-elle compris dans les paroles d'Edmond ?",
          "Pourquoi Rosalie prend-elle la main d'Edmond «sans rien dire» après qu'il lui a parlé de la mort de son père ?",
        ],
      },
      {
        type: "inference",
        label: "Inférence 2 — Transmission et temps",
        questions: [
          "La canne d'Edmond vient de son père, qui la tenait de son père. Que symbolise cet objet dans le contexte de cette histoire ?",
          "Pourquoi Rosalie imagine-t-elle déjà traverser ce lac avec son propre enfant dans le futur ? Que cela révèle-t-il sur ce que la traversée lui a transmis ?",
          "Que peut-on déduire sur la santé d'Edmond à partir du fait qu'il «ne peut plus se permettre de remettre» la traversée ?",
          "Qu'est-ce que le lac représente dans l'histoire : un simple plan d'eau, un lieu de mémoire, un lien entre les générations, ou autre chose ? Justifie.",
        ],
      },
      {
        type: "reaction",
        label: "Réaction personnelle",
        questions: [
          "As-tu un grand-parent ou un aîné qui t'a transmis quelque chose d'important (un savoir, un geste, une façon de voir le monde) ? Raconte.",
          "Qu'aurais-tu ressenti en traversant ce lac en silence avec ton grand-père ou ta grand-mère en hiver ?",
          "Quelle image ou quelle phrase de cette histoire restera dans ta mémoire ? Pourquoi ?",
          "Y a-t-il quelqu'un dans ta vie avec qui tu voudrais partager un moment semblable à cette traversée ? Qui et pourquoi ?",
        ],
      },
      {
        type: "jugement",
        label: "Jugement critique",
        questions: [
          "Edmond a attendu treize ans pour tenir sa promesse à Rosalie. Est-ce qu'il a bien fait d'attendre aussi longtemps ? Justifie ta réponse.",
          "La leçon sur les fissures («plus y'a de fissures de ce genre, plus la glace est solide») s'applique-t-elle vraiment à la vie humaine ? Donne un exemple personnel ou historique pour soutenir ta position.",
          "Certains pourraient dire que cette histoire est trop lente ou qu'il ne s'y passe presque rien. Êtes-vous d'accord ? Qu'est-ce qui fait qu'une histoire peut être captivante même sans action dramatique ?",
          "Penses-tu que les adultes transmettent suffisamment leur histoire et leur mémoire aux jeunes aujourd'hui ? Qu'est-ce qui favorise ou nuit à cette transmission ?",
        ],
      },
      {
        type: "grammaire",
        label: "Grammaire — Temps verbaux narratifs",
        questions: [
          "Dans le paragraphe 4, relevez tous les verbes conjugués. Classez-les par temps et mode. Expliquez pourquoi le passé simple et l'imparfait alternent dans ce paragraphe.",
          "La phrase «La dernière fois que j'ai traversé ce lac, j'avais douze ans» utilise le passé composé alors qu'on attendrait un passé simple dans un récit. Pourquoi ? Quel effet cela produit-il (langage parlé vs. narratif) ?",
          "Dans «ils l'avaient sorti en l'agrippant par les bras pendant que Roger criait», identifiez les temps verbaux, les modes, et expliquez l'enchaînement temporel entre les trois verbes.",
          "Réécrivez les deux premières phrases du paragraphe 2 au présent de narration. Quels changements cela produit-il sur le rythme et l'effet du passage ?",
        ],
      },
    ],
  },
];
