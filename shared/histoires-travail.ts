export interface QuestionBlocTravail {
  id: string;
  type: "comprehension" | "inference" | "reaction" | "jugement" | "grammaire";
  consigne: string;
  choix: string[];
}

export interface HistoireTravail {
  id: number;
  titre: string;
  sousTitre: string;
  categorie: string;
  paragraphes: string[];
  questions: {
    blocs: QuestionBlocTravail[];
  };
}

export const histoiresTravail: HistoireTravail[] = [
  {
    id: 1,
    titre: "Ma premi\u00e8re recherche d\u2019emploi",
    sousTitre: "Maxime cherche un emploi d\u2019\u00e9t\u00e9",
    categorie: "emploi",
    paragraphes: [
      "Maxime a 17 ans et il souhaite travailler cet \u00e9t\u00e9 pour la premi\u00e8re fois. Il ne sait pas trop par o\u00f9 commencer. Sa m\u00e8re lui sugg\u00e8re de consulter des sites comme Jobboom et Indeed, o\u00f9 des centaines d\u2019offres d\u2019emploi sont affich\u00e9es chaque semaine. Maxime passe une soir\u00e9e \u00e0 lire des annonces et d\u00e9couvre qu\u2019il faut souvent envoyer un curriculum vit\u00e6, qu\u2019on appelle aussi un CV, ainsi qu\u2019une lettre de motivation.",
      "Le lendemain, Maxime s\u2019installe au bureau de sa chambre et r\u00e9dige son premier CV. Il y inscrit son nom, ses coordonn\u00e9es, sa formation scolaire et ses exp\u00e9riences b\u00e9n\u00e9voles \u2014 il a aid\u00e9 lors de tournois sportifs dans son \u00e9cole. Il mentionne aussi ses comp\u00e9tences : il parle fran\u00e7ais et anglais, il est ponctuel et il aime travailler en \u00e9quipe. Sa s\u0153ur, qui travaille depuis deux ans, relit le document et lui sugg\u00e8re de corriger quelques fautes d\u2019orthographe.",
      "Maxime envoie sa candidature \u00e0 cinq entreprises : une \u00e9picerie, un centre sportif, un camp de jour, une quincaillerie et un caf\u00e9. Il adapte l\u00e9g\u00e8rement sa lettre de motivation pour chaque employeur, en mentionnant pourquoi ce poste pr\u00e9cis l\u2019int\u00e9resse. Deux jours plus tard, le centre sportif lui \u00e9crit pour l\u2019inviter \u00e0 une entrevue la semaine suivante. Maxime est nerveux mais tr\u00e8s motiv\u00e9.",
      "\u00c0 l\u2019entrevue, Maxime arrive cinq minutes \u00e0 l\u2019avance, habill\u00e9 proprement. Il r\u00e9pond calmement aux questions du responsable, qui lui demande pourquoi il veut ce poste et comment il r\u00e9agirait si un client \u00e9tait impoli. \u00c0 la fin, le responsable lui serre la main et lui dit qu\u2019il recevra une r\u00e9ponse sous 48 heures. Deux jours plus tard, Maxime re\u00e7oit un courriel : il est embauch\u00e9 ! Son premier emploi commence dans une semaine.",
    ],
    questions: {
      blocs: [
        {
          id: "t1-c1",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Quels sites Maxime consulte-t-il pour chercher de l\u2019emploi ?",
            "Quelles informations Maxime inscrit-il dans son CV ?",
            "Combien d\u2019entreprises Maxime contacte-t-il ?",
            "Qui relit le CV de Maxime avant qu\u2019il l\u2019envoie ?",
          ],
        },
        {
          id: "t1-c2",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Quelle entreprise contacte Maxime en premier pour une entrevue ?",
            "Comment Maxime se pr\u00e9pare-t-il pour son entrevue ?",
            "Quelle question le responsable pose-t-il \u00e0 Maxime lors de l\u2019entrevue ?",
          ],
        },
        {
          id: "t1-c3",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Qu\u2019est-ce qu\u2019un curriculum vit\u00e6 ?",
            "Pourquoi Maxime adapte-t-il sa lettre de motivation pour chaque employeur ?",
            "Comment Maxime apprend-il qu\u2019il est embauch\u00e9 ?",
          ],
        },
        {
          id: "t1-c4",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Quelles comp\u00e9tences Maxime mentionne-t-il dans son CV ?",
            "Quelle exp\u00e9rience b\u00e9n\u00e9vole Maxime a-t-il ?",
            "Combien de temps Maxime attend-il avant de recevoir une r\u00e9ponse du centre sportif ?",
          ],
        },
        {
          id: "t1-c5",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Pourquoi est-il important de corriger les fautes dans un CV ?",
            "Que signifie \u00eatre ponctuel en milieu de travail ?",
            "Quel comportement Maxime adopte-t-il \u00e0 l\u2019entrevue ?",
          ],
        },
        {
          id: "t1-i1",
          type: "inference",
          consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.",
          choix: [
            "Pourquoi Maxime est-il nerveux avant son entrevue, selon toi ?",
            "Qu\u2019est-ce qui montre que Maxime prend sa recherche d\u2019emploi au s\u00e9rieux ?",
            "Pourquoi est-il important d\u2019adapter sa lettre de motivation \u00e0 chaque employeur ?",
          ],
        },
        {
          id: "t1-i2",
          type: "inference",
          consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.",
          choix: [
            "Que pourrait-il se passer si Maxime avait envoy\u00e9 un CV avec des fautes d\u2019orthographe ?",
            "Pourquoi le responsable pose-t-il une question sur un client impoli ?",
            "Que r\u00e9v\u00e8le le comportement de Maxime \u00e0 l\u2019entrevue sur son caract\u00e8re ?",
          ],
        },
        {
          id: "t1-r1",
          type: "reaction",
          consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.",
          choix: [
            "As-tu d\u00e9j\u00e0 cherch\u00e9 un emploi ou aid\u00e9 quelqu\u2019un \u00e0 le faire ? Raconte ton exp\u00e9rience.",
            "Comment te sentirais-tu \u00e0 la place de Maxime lors de sa premi\u00e8re entrevue ?",
            "Que penses-tu de la fa\u00e7on dont Maxime pr\u00e9pare son CV et sa lettre ?",
          ],
        },
        {
          id: "t1-j1",
          type: "jugement",
          consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.",
          choix: [
            "Est-il important d\u2019avoir de l\u2019exp\u00e9rience b\u00e9n\u00e9vole sur un CV ? Justifie ta r\u00e9ponse.",
            "Penses-tu que les sites d\u2019emploi en ligne sont le meilleur moyen de trouver du travail ? Explique.",
            "Selon toi, qu\u2019est-ce qui est le plus important dans une entrevue d\u2019embauche ?",
          ],
        },
        {
          id: "t1-g1",
          type: "grammaire",
          consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.",
          choix: [
            "Dans la phrase \u00ab Il a aid\u00e9 lors de tournois sportifs \u00bb, quel est le groupe nominal sujet ?",
            "Trouve deux verbes conjugu\u00e9s dans le troisi\u00e8me paragraphe et indique leur temps.",
            "Explique la diff\u00e9rence entre \u00ab leur \u00bb (d\u00e9terminant) et \u00ab leur \u00bb (pronom).",
          ],
        },
        {
          id: "t1-g2",
          type: "grammaire",
          consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.",
          choix: [
            "R\u00e9\u00e9cris cette phrase au pass\u00e9 compos\u00e9 : \u00ab Maxime envoie sa candidature \u00e0 cinq entreprises. \u00bb",
            "Dans le texte, trouve un exemple d\u2019adjectif qualificatif et indique le nom qu\u2019il qualifie.",
            "Quelle est la fonction du mot \u00ab nerveux \u00bb dans \u00ab Maxime est nerveux \u00bb ?",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    titre: "La s\u00e9curit\u00e9, c\u2019est s\u00e9rieux",
    sousTitre: "Camille apprend les r\u00e8gles de s\u00e9curit\u00e9 en entrep\u00f4t",
    categorie: "securite",
    paragraphes: [
      "Camille vient de commencer son nouvel emploi dans un entrep\u00f4t de distribution \u00e0 Laval. D\u00e8s son premier jour, son superviseur, M. Th\u00e9berge, lui remet un livret intitul\u00e9 \u00ab R\u00e8gles de s\u00e9curit\u00e9 \u00bb. Il lui explique que dans cet entrep\u00f4t, la s\u00e9curit\u00e9 est la priorit\u00e9 absolue. Chaque employ\u00e9 doit porter des \u00e9quipements de protection individuelle, qu\u2019on appelle EPI : un casque, des souliers de s\u00e9curit\u00e9 \u00e0 bout d\u2019acier et un gilet r\u00e9fl\u00e9chissant jaune fluo.",
      "M. Th\u00e9berge lui montre ensuite les zones de danger : les all\u00e9es o\u00f9 circulent les chariots \u00e9l\u00e9vateurs, les \u00e9tag\u00e8res de grande hauteur et les zones de d\u00e9chargement des camions. Il lui explique qu\u2019il ne faut jamais s\u2019approcher d\u2019un chariot \u00e9l\u00e9vateur en marche sans \u00e9tablir un contact visuel avec le conducteur. Chaque ann\u00e9e, des dizaines d\u2019accidents surviennent dans des entrep\u00f4ts qu\u00e9b\u00e9cois parce que des travailleurs n\u2019ont pas respect\u00e9 ces r\u00e8gles \u00e9l\u00e9mentaires.",
      "Camille apprend aussi comment signaler un incident ou un danger. Si elle remarque un plancher mouill\u00e9, un c\u00e2ble \u00e9lectrique expos\u00e9 ou une \u00e9tag\u00e8re instable, elle doit imm\u00e9diatement en aviser son superviseur et remplir un formulaire de d\u00e9claration d\u2019incident. La Commission des normes, de l\u2019\u00e9quit\u00e9, de la sant\u00e9 et de la s\u00e9curit\u00e9 du travail, connue sous le nom de CNESST, veille \u00e0 l\u2019application de ces r\u00e8gles dans toutes les entreprises du Qu\u00e9bec.",
      "Au bout de sa premi\u00e8re semaine, Camille voit un coll\u00e8gue tr\u00e9bucher sur un carton mal rang\u00e9 dans une all\u00e9e. Il n\u2019est pas bless\u00e9, mais l\u2019incident aurait pu \u00eatre grave. Camille remplit le formulaire d\u2019incident comme elle l\u2019a appris. M. Th\u00e9berge la f\u00e9licite : son geste permettra de corriger le probl\u00e8me et d\u2019\u00e9viter un accident futur. Camille comprend maintenant que la s\u00e9curit\u00e9 n\u2019est pas seulement une obligation, c\u2019est aussi une responsabilit\u00e9 collective.",
    ],
    questions: {
      blocs: [
        {
          id: "t2-c1",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Quels \u00e9quipements de protection individuelle Camille doit-elle porter ?",
            "O\u00f9 Camille travaille-t-elle et qui est son superviseur ?",
            "Quelles sont les trois zones de danger dans l\u2019entrep\u00f4t ?",
          ],
        },
        {
          id: "t2-c2",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Que doit faire Camille si elle aper\u00e7oit un danger dans l\u2019entrep\u00f4t ?",
            "Quel est le r\u00f4le de la CNESST ?",
            "Que se passe-t-il au bout de la premi\u00e8re semaine de Camille ?",
          ],
        },
        {
          id: "t2-c3",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Pourquoi faut-il \u00e9tablir un contact visuel avec le conducteur d\u2019un chariot \u00e9l\u00e9vateur ?",
            "Qu\u2019est-ce qu\u2019un formulaire de d\u00e9claration d\u2019incident ?",
            "Pourquoi M. Th\u00e9berge f\u00e9licite-t-il Camille \u00e0 la fin ?",
          ],
        },
        {
          id: "t2-c4",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Que signifie le sigle EPI ?",
            "Pourquoi des accidents surviennent-ils encore dans les entrep\u00f4ts ?",
            "Quel document Camille re\u00e7oit-elle le premier jour ?",
          ],
        },
        {
          id: "t2-c5",
          type: "comprehension",
          consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.",
          choix: [
            "Quelle le\u00e7on Camille tire-t-elle de sa premi\u00e8re semaine de travail ?",
            "Pourquoi la s\u00e9curit\u00e9 est-elle une responsabilit\u00e9 collective ?",
            "Donne un exemple de danger mentionn\u00e9 dans le texte.",
          ],
        },
        {
          id: "t2-i1",
          type: "inference",
          consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.",
          choix: [
            "Que pourrait-il arriver si les travailleurs ne portaient pas leurs EPI ?",
            "Pourquoi penses-tu que la CNESST est une organisation importante au Qu\u00e9bec ?",
            "Qu\u2019est-ce qui montre que M. Th\u00e9berge est un bon superviseur ?",
          ],
        },
        {
          id: "t2-i2",
          type: "inference",
          consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.",
          choix: [
            "Pourquoi le carton mal rang\u00e9 repr\u00e9sentait-il un danger r\u00e9el ?",
            "Que r\u00e9v\u00e8le le geste de Camille sur son attitude face \u00e0 la s\u00e9curit\u00e9 ?",
            "En quoi la s\u00e9curit\u00e9 au travail profite-t-elle \u00e0 l\u2019entreprise, pas seulement aux employ\u00e9s ?",
          ],
        },
        {
          id: "t2-r1",
          type: "reaction",
          consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.",
          choix: [
            "As-tu d\u00e9j\u00e0 \u00e9t\u00e9 dans un endroit o\u00f9 des r\u00e8gles de s\u00e9curit\u00e9 s\u2019appliquaient ? D\u00e9cris la situation.",
            "Comment te sentirais-tu si tu voyais un coll\u00e8gue ignorer les r\u00e8gles de s\u00e9curit\u00e9 ?",
            "Pourquoi est-il parfois difficile de respecter les consignes de s\u00e9curit\u00e9 ? Explique.",
          ],
        },
        {
          id: "t2-j1",
          type: "jugement",
          consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.",
          choix: [
            "Penses-tu que les entreprises en font assez pour prot\u00e9ger leurs travailleurs ? Justifie.",
            "Est-il juste de punir un employ\u00e9 qui ne respecte pas les r\u00e8gles de s\u00e9curit\u00e9 ? Explique.",
            "Selon toi, qui est responsable des accidents de travail : l\u2019employeur ou l\u2019employ\u00e9 ?",
          ],
        },
        {
          id: "t2-g1",
          type: "grammaire",
          consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.",
          choix: [
            "Dans \u00ab des souliers de s\u00e9curit\u00e9 \u00e0 bout d\u2019acier \u00bb, quelle est la fonction du groupe \u00ab \u00e0 bout d\u2019acier \u00bb ?",
            "Trouve dans le texte un exemple de subordonn\u00e9e relative et souligne l\u2019ant\u00e9c\u00e9dent.",
            "R\u00e9\u00e9cris cette phrase \u00e0 la voix passive : \u00ab La CNESST surveille les entreprises. \u00bb",
          ],
        },
        {
          id: "t2-g2",
          type: "grammaire",
          consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.",
          choix: [
            "Explique l\u2019accord du participe pass\u00e9 dans : \u00ab Elle l\u2019a appris \u00bb.",
            "Quel est le mode et le temps du verbe dans \u00ab il ne faut jamais s\u2019approcher \u00bb ?",
            "Donne un synonyme du mot \u00ab \u00e9l\u00e9mentaire \u00bb tel qu\u2019utilis\u00e9 dans le texte.",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    titre: "Les t\u00e2ches du commis d\u2019\u00e9picerie",
    sousTitre: "Noah d\u00e9couvre son nouvel emploi \u00e0 l\u2019IGA",
    categorie: "taches",
    paragraphes: [
      "Noah vient d\u2019\u00eatre embauch\u00e9 comme commis d\u2019\u00e9picerie dans un IGA de son quartier \u00e0 Longueuil. Son premier jour de travail est un samedi matin. Sa g\u00e9rante, Mme Fortin, lui pr\u00e9sente d\u2019abord ses coll\u00e8gues, puis lui explique les diff\u00e9rentes t\u00e2ches qu\u2019il devra accomplir au cours de la semaine. Noah sort un petit carnet de sa poche pour prendre des notes, ce qui impressionne sa g\u00e9rante.",
      "La principale t\u00e2che de Noah consiste \u00e0 recevoir les livraisons et \u00e0 faire la mise en rayon : il doit sortir les produits des bo\u00eetes et les placer sur les tablettes en respectant les \u00e9tiquettes de prix et les dates de p\u00e9remption. Les produits les plus anciens doivent toujours \u00eatre plac\u00e9s \u00e0 l\u2019avant pour \u00eatre vendus en premier \u2014 c\u2019est ce qu\u2019on appelle la rotation des stocks. Noah apprend aussi comment utiliser le lecteur de code-barres portatif pour v\u00e9rifier les inventaires.",
      "En apr\u00e8s-midi, Mme Fortin lui demande de servir \u00e0 la caisse. C\u2019est plus difficile que Noah ne l\u2019imaginait : il doit scanner les produits rapidement, rendre la monnaie correctement et r\u00e9pondre aux questions des clients avec le sourire, m\u00eame quand la file d\u2019attente s\u2019allonge. Une cliente lui demande o\u00f9 se trouvent les l\u00e9gumineuses et il ne sait pas. Il appelle poliment un coll\u00e8gue sur la radio interne pour obtenir la r\u00e9ponse.",
      "\u00c0 la fin de sa journ\u00e9e, Noah range son tablier, pointe son d\u00e9part sur la tablette \u00e9lectronique et dit bonsoir \u00e0 ses coll\u00e8gues. Il est fatigu\u00e9 mais satisfait. Il a appris que le m\u00e9tier de commis demande beaucoup d\u2019organisation, de rapidit\u00e9 et de courtoisie. Mme Fortin lui dit qu\u2019il a tr\u00e8s bien fait pour un premier jour et qu\u2019elle a h\u00e2te de le voir progresser.",
    ],
    questions: {
      blocs: [
        { id: "t3-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["O\u00f9 Noah travaille-t-il et qui est sa g\u00e9rante ?", "Que fait Noah pour prendre des notes lors de son premier jour ?", "Quelles sont les t\u00e2ches principales de Noah \u00e0 l\u2019\u00e9picerie ?"] },
        { id: "t3-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Qu\u2019est-ce que la rotation des stocks ?", "Comment Noah r\u00e9pond-il \u00e0 la question de la cliente sur les l\u00e9gumineuses ?", "Quel outil Noah utilise-t-il pour v\u00e9rifier les inventaires ?"] },
        { id: "t3-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi servir \u00e0 la caisse est-il plus difficile que pr\u00e9vu pour Noah ?", "Comment Noah pointe-t-il son d\u00e9part \u00e0 la fin de sa journ\u00e9e ?", "Que lui dit Mme Fortin \u00e0 la fin de la journ\u00e9e ?"] },
        { id: "t3-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quels sont les trois qualit\u00e9s que le m\u00e9tier de commis exige, selon le texte ?", "Que signifie \u00ab date de p\u00e9remption \u00bb ?", "Pourquoi place-t-on les produits les plus anciens \u00e0 l\u2019avant des tablettes ?"] },
        { id: "t3-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Comment Noah se sent-il \u00e0 la fin de sa premi\u00e8re journ\u00e9e ?", "Qu\u2019est-ce qui impressionne Mme Fortin au d\u00e9but de la journ\u00e9e ?", "Donne un exemple de service \u00e0 la client\u00e8le que Noah fournit dans le texte."] },
        { id: "t3-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Que r\u00e9v\u00e8le le geste de Noah de sortir son carnet sur sa fa\u00e7on d\u2019aborder le travail ?", "Pourquoi est-il important de sourire aux clients m\u00eame quand on est fatigu\u00e9 ?", "Que pourrait-il arriver si la rotation des stocks n\u2019\u00e9tait pas respect\u00e9e ?"] },
        { id: "t3-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi Noah appelle-t-il un coll\u00e8gue plut\u00f4t que d\u2019inventer une r\u00e9ponse \u00e0 la cliente ?", "Qu\u2019est-ce que ce premier jour r\u00e9v\u00e8le sur les d\u00e9fis d\u2019un emploi en commerce de d\u00e9tail ?", "En quoi le fait d\u2019\u00eatre bien organis\u00e9 est-il un avantage dans ce type d\u2019emploi ?"] },
        { id: "t3-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["As-tu d\u00e9j\u00e0 travaill\u00e9 ou aid\u00e9 dans un commerce ? D\u00e9cris ce que tu as appris.", "Quel aspect du travail de Noah te semblerait le plus difficile ? Pourquoi ?", "Que penses-tu de l\u2019attitude de Noah lors de son premier jour de travail ?"] },
        { id: "t3-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Selon toi, le m\u00e9tier de commis d\u2019\u00e9picerie est-il sous-estim\u00e9 par la soci\u00e9t\u00e9 ? Explique.", "Penses-tu que les employ\u00e9s en contact avec le public devraient recevoir une formation en communication ? Justifie.", "Est-il normal qu\u2019un employ\u00e9 ne sache pas toujours r\u00e9pondre aux questions des clients ? Explique."] },
        { id: "t3-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab il doit scanner les produits rapidement \u00bb, quelle est la fonction de \u00ab rapidement \u00bb ?", "Quel est le temps et le mode du verbe \u00ab doit \u00bb dans le deuxi\u00e8me paragraphe ?", "Trouve un groupe pr\u00e9positionnel dans le troisi\u00e8me paragraphe et donne sa fonction."] },
        { id: "t3-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["R\u00e9\u00e9cris cette phrase au pluriel : \u00ab Le produit le plus ancien doit \u00eatre plac\u00e9 \u00e0 l\u2019avant. \u00bb", "Quel est le sens du pr\u00e9fixe dans le mot \u00ab p\u00e9remption \u00bb ?", "Dans \u00ab m\u00eame quand la file d\u2019attente s\u2019allonge \u00bb, identifie le type de subordonn\u00e9e."] },
      ],
    },
  },
  {
    id: 4,
    titre: "Les comp\u00e9tences qui font la diff\u00e9rence",
    sousTitre: "Julie d\u00e9veloppe ses habilet\u00e9s professionnelles",
    categorie: "competences",
    paragraphes: [
      "Julie a termin\u00e9 sa formation en secr\u00e9tariat au Centre de formation professionnelle de Drummondville et elle commence son premier emploi dans une PME qui fabrique des pi\u00e8ces industrielles. Son patron, M. Gauthier, lui explique que les comp\u00e9tences techniques \u2014 comme la ma\u00eetrise des logiciels Word, Excel et Outlook \u2014 sont essentielles, mais qu\u2019elles ne suffisent pas \u00e0 elles seules pour r\u00e9ussir au travail.",
      "M. Gauthier lui parle des comp\u00e9tences dites \u00ab douces \u00bb ou \u00ab transversales \u00bb : la capacit\u00e9 \u00e0 communiquer clairement, \u00e0 g\u00e9rer son temps efficacement, \u00e0 s\u2019adapter aux changements et \u00e0 bien travailler en \u00e9quipe. Il lui donne l\u2019exemple d\u2019un ancien employ\u00e9 qui ma\u00eetrisait parfaitement les logiciels, mais qui avait du mal \u00e0 collaborer avec ses coll\u00e8gues. Cela avait cr\u00e9\u00e9 des tensions dans l\u2019\u00e9quipe et, finalement, cet employ\u00e9 avait d\u00fb quitter l\u2019entreprise.",
      "Julie prend ces conseils \u00e0 c\u0153ur. Elle d\u00e9cide de s\u2019inscrire \u00e0 un atelier de communication offert gratuitement par son syndicat et \u00e0 un cours de gestion du stress en ligne sur le site du gouvernement du Qu\u00e9bec. Elle commence aussi \u00e0 tenir un agenda d\u00e9taill\u00e9 pour planifier ses t\u00e2ches quotidiennes : appels \u00e0 retourner, courriels \u00e0 envoyer, documents \u00e0 classer. En quelques semaines, elle se sent beaucoup plus organis\u00e9e et confiante.",
      "Trois mois apr\u00e8s son arriv\u00e9e, M. Gauthier convoque Julie pour une rencontre de suivi. Il lui dit qu\u2019elle progresse tr\u00e8s bien et qu\u2019il remarque son sens de l\u2019organisation et son attitude positive. Il lui propose m\u00eame de participer \u00e0 un comit\u00e9 interne sur l\u2019am\u00e9lioration des processus administratifs. Julie accepte avec enthousiasme : c\u2019est l\u2019occasion parfaite de d\u00e9velopper de nouvelles comp\u00e9tences et de montrer son potentiel.",
    ],
    questions: {
      blocs: [
        { id: "t4-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle formation Julie a-t-elle compl\u00e9t\u00e9e avant de commencer \u00e0 travailler ?", "Quels logiciels Julie ma\u00eetrise-t-elle gr\u00e2ce \u00e0 sa formation ?", "Qui est M. Gauthier et dans quel secteur travaille l\u2019entreprise ?"] },
        { id: "t4-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelles sont les comp\u00e9tences \u00ab douces \u00bb mentionn\u00e9es dans le texte ?", "Pourquoi l\u2019ancien employ\u00e9 a-t-il d\u00fb quitter l\u2019entreprise ?", "Que fait Julie pour am\u00e9liorer ses comp\u00e9tences en communication et en gestion du stress ?"] },
        { id: "t4-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Comment Julie organise-t-elle ses t\u00e2ches quotidiennes ?", "Qu\u2019est-ce qu\u2019une PME ?", "Que propose M. Gauthier \u00e0 Julie lors de la rencontre de suivi ?"] },
        { id: "t4-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Qu\u2019est-ce qu\u2019un comit\u00e9 interne sur l\u2019am\u00e9lioration des processus ?", "Donne deux qualit\u00e9s que M. Gauthier remarque chez Julie apr\u00e8s trois mois.", "O\u00f9 Julie trouve-t-elle son cours de gestion du stress en ligne ?"] },
        { id: "t4-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle est la diff\u00e9rence entre une comp\u00e9tence technique et une comp\u00e9tence transversale ?", "Pourquoi Julie accepte-t-elle de participer au comit\u00e9 interne ?", "Quel changement concret Julie fait-elle pour mieux s\u2019organiser ?"] },
        { id: "t4-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi M. Gauthier parle-t-il des comp\u00e9tences douces d\u00e8s le premier jour de Julie ?", "Que nous apprend l\u2019histoire de l\u2019ancien employ\u00e9 sur les priorit\u00e9s de l\u2019entreprise ?", "En quoi tenir un agenda d\u00e9taill\u00e9 peut-il r\u00e9duire le stress au travail ?"] },
        { id: "t4-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi Julie d\u00e9cide-t-elle de se former m\u00eame en dehors des heures de travail ?", "Que signifie \u00ab avoir du potentiel \u00bb dans un contexte de travail ?", "En quoi les comp\u00e9tences douces sont-elles souvent plus difficiles \u00e0 d\u00e9velopper que les comp\u00e9tences techniques ?"] },
        { id: "t4-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["Quelles comp\u00e9tences douces penses-tu d\u00e9j\u00e0 poss\u00e9der ? Donne des exemples concrets.", "Est-ce qu\u2019une comp\u00e9tence technique ou une comp\u00e9tence transversale te semble plus utile ? Pourquoi ?", "Que penses-tu de la d\u00e9cision de Julie de se former en dehors du travail ?"] },
        { id: "t4-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Penses-tu que les comp\u00e9tences douces devraient \u00eatre enseign\u00e9es \u00e0 l\u2019\u00e9cole ? Justifie.", "Est-il juste qu\u2019un employ\u00e9 soit congi\u00e9di\u00e9 \u00e0 cause de difficult\u00e9s relationnelles ? Explique.", "Selon toi, \u00e0 qui revient la responsabilit\u00e9 de d\u00e9velopper les comp\u00e9tences : \u00e0 l\u2019employ\u00e9 ou \u00e0 l\u2019employeur ?"] },
        { id: "t4-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab qui ma\u00eetrisait parfaitement les logiciels \u00bb, identifie le type de proposition et son ant\u00e9c\u00e9dent.", "Donne la classe grammaticale et la fonction de \u00ab clairement \u00bb dans la phrase o\u00f9 il appara\u00eet.", "R\u00e9\u00e9cris cette phrase en rempla\u00e7ant \u00ab elle \u00bb par \u00ab ils \u00bb : \u00ab Elle d\u00e9cide de s\u2019inscrire \u00e0 un atelier. \u00bb"] },
        { id: "t4-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Explique l\u2019accord de \u00ab douces \u00bb dans \u00ab les comp\u00e9tences douces \u00bb.", "Quel est le sens du mot \u00ab transversal \u00bb dans le domaine professionnel ?", "Dans le dernier paragraphe, trouve un verbe au conditionnel pr\u00e9sent et justifie son emploi."] },
      ],
    },
  },
  {
    id: 5,
    titre: "R\u00e9ussir son entrevue d\u2019embauche",
    sousTitre: "Lucas se pr\u00e9pare pour le grand jour",
    categorie: "emploi",
    paragraphes: [
      "Lucas a d\u00e9croch\u00e9 une entrevue dans une entreprise de r\u00e9novation domiciliaire \u00e0 Qu\u00e9bec. C\u2019est la premi\u00e8re fois qu\u2019il passe une entrevue formelle et il ne sait pas trop \u00e0 quoi s\u2019attendre. Il d\u00e9cide de se pr\u00e9parer s\u00e9rieusement. D\u2019abord, il consulte le site web de l\u2019entreprise pour en apprendre davantage sur ses produits, sa mission et ses valeurs. Il note plusieurs informations dans son carnet.",
      "Lucas demande \u00e0 sa tante, qui travaille en ressources humaines, de lui expliquer comment se d\u00e9roule une entrevue. Elle lui dit que les employeurs posent souvent des questions comme : \u00ab Parlez-moi de vous \u00bb, \u00ab Quelles sont vos forces et vos faiblesses ? \u00bb et \u00ab Pourquoi voulez-vous travailler pour nous ? \u00bb. Sa tante lui conseille de pr\u00e9parer des r\u00e9ponses courtes, honn\u00eates et pr\u00e9cises, et de toujours donner des exemples concrets tir\u00e9s de ses exp\u00e9riences pass\u00e9es.",
      "Le matin de l\u2019entrevue, Lucas se l\u00e8ve t\u00f4t, prend une bonne douche et choisit des v\u00eatements propres et soign\u00e9s. Il imprime deux copies de son CV au cas o\u00f9. Il arrive \u00e0 l\u2019entreprise dix minutes \u00e0 l\u2019avance, salue la r\u00e9ceptionniste poliment et attend calmement dans la salle d\u2019attente. Quand l\u2019intervieweur, Mme Bergeron, vient le chercher, il se l\u00e8ve, lui sourit et lui serre la main fermement.",
      "L\u2019entrevue dure environ 30 minutes. Lucas r\u00e9pond aux questions avec calme, utilise des exemples pr\u00e9cis et pose lui-m\u00eame deux questions \u00e0 Mme Bergeron sur les responsabilit\u00e9s du poste et les possibilit\u00e9s d\u2019avancement. \u00c0 la fin, il remercie l\u2019intervieweuse pour son temps. Le soir m\u00eame, il lui envoie un courriel de remerciement. Une semaine plus tard, il re\u00e7oit une offre d\u2019emploi. Sa pr\u00e9paration a clairement port\u00e9 ses fruits.",
    ],
    questions: {
      blocs: [
        { id: "t5-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle entreprise Lucas veut-il int\u00e9grer et dans quelle ville est-elle situ\u00e9e ?", "Comment Lucas se pr\u00e9pare-t-il avant l\u2019entrevue ?", "Qui aide Lucas \u00e0 se pr\u00e9parer pour son entrevue et quel est son m\u00e9tier ?"] },
        { id: "t5-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Cite trois questions courantes pos\u00e9es en entrevue selon la tante de Lucas.", "Que fait Lucas le matin de l\u2019entrevue pour bien se pr\u00e9parer ?", "Pourquoi Lucas imprime-t-il deux copies de son CV ?"] },
        { id: "t5-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelles questions Lucas pose-t-il \u00e0 Mme Bergeron pendant l\u2019entrevue ?", "Combien de temps dure l\u2019entrevue ?", "Que fait Lucas le soir de l\u2019entrevue pour faire bonne impression ?"] },
        { id: "t5-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quels conseils la tante de Lucas lui donne-t-elle pour r\u00e9pondre aux questions ?", "Comment Lucas se comporte-t-il dans la salle d\u2019attente ?", "Quel geste Lucas fait-il en rencontrant Mme Bergeron pour la premi\u00e8re fois ?"] },
        { id: "t5-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Que signifie l\u2019expression \u00ab sa pr\u00e9paration a port\u00e9 ses fruits \u00bb ?", "Combien de temps apr\u00e8s l\u2019entrevue Lucas re\u00e7oit-il une r\u00e9ponse ?", "Qu\u2019est-ce que Mme Bergeron vient faire dans la salle d\u2019attente ?"] },
        { id: "t5-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi est-il conseill\u00e9 d\u2019arriver en avance \u00e0 une entrevue d\u2019embauche ?", "Que montre le fait que Lucas envoie un courriel de remerciement apr\u00e8s l\u2019entrevue ?", "Pourquoi est-il important de donner des exemples concrets lors d\u2019une entrevue ?"] },
        { id: "t5-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["En quoi le fait de conna\u00eetre l\u2019entreprise \u00e0 l\u2019avance est-il un avantage ?", "Pourquoi une poign\u00e9e de main ferme et un sourire sont-ils importants lors d\u2019une entrevue ?", "Que r\u00e9v\u00e8le le fait de poser des questions \u00e0 l\u2019intervieweuse sur la motivation du candidat ?"] },
        { id: "t5-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["Quelle partie de la pr\u00e9paration de Lucas te semble la plus utile ? Explique pourquoi.", "Comment te sentirais-tu \u00e0 la veille d\u2019une entrevue d\u2019embauche importante ?", "Y a-t-il quelque chose que Lucas aurait pu faire diff\u00e9remment ? Explique ta r\u00e9ponse."] },
        { id: "t5-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Selon toi, la tenue vestimentaire est-elle vraiment importante lors d\u2019une entrevue ? Justifie.", "Penses-tu que les questions pos\u00e9es en entrevue permettent vraiment de conna\u00eetre un candidat ? Explique.", "Est-il juste que l\u2019apparence physique influence l\u2019opinion d\u2019un employeur ? Donne ton avis."] },
        { id: "t5-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab il lui serre la main fermement \u00bb, quelle est la fonction de \u00ab fermement \u00bb ?", "Identifie le temps et le mode du verbe \u00ab porte \u00bb dans \u00ab sa pr\u00e9paration a port\u00e9 ses fruits \u00bb.", "Remplace \u00ab Mme Bergeron \u00bb par un pronom dans la phrase : \u00ab Lucas remercie Mme Bergeron pour son temps. \u00bb"] },
        { id: "t5-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Quel est l\u2019accord du participe pass\u00e9 dans \u00ab une offre d\u2019emploi re\u00e7ue \u00bb ?", "Trouve dans le texte un exemple de discours indirect et r\u00e9\u00e9cris-le en discours direct.", "Explique la virgule dans \u00ab il se l\u00e8ve, lui sourit et lui serre la main \u00bb."] },
      ],
    },
  },
  {
    id: 6,
    titre: "R\u00e9diger un bon curriculum vit\u00e6",
    sousTitre: "Emma cr\u00e9e son premier CV professionnel",
    categorie: "emploi",
    paragraphes: [
      "Emma a 18 ans et elle cherche un emploi \u00e0 temps partiel pour financer ses \u00e9tudes au c\u00e9gep. Sa conseill\u00e8re d\u2019orientation, Mme Lachance, lui explique qu\u2019un bon curriculum vit\u00e6 \u2014 communiment appel\u00e9 CV \u2014 est la premi\u00e8re impression qu\u2019un employeur aura d\u2019elle. Un CV bien structur\u00e9 et sans fautes d\u2019orthographe peut faire la diff\u00e9rence entre recevoir un appel pour une entrevue ou ne jamais avoir de r\u00e9ponse.",
      "Mme Lachance lui explique les sections essentielles d\u2019un CV : les coordonn\u00e9es personnelles (nom, num\u00e9ro de t\u00e9l\u00e9phone, courriel), la formation scolaire en commen\u00e7ant par la plus r\u00e9cente, les exp\u00e9riences de travail ou de b\u00e9n\u00e9volat, les comp\u00e9tences (langues parl\u00e9es, logiciels ma\u00eetris\u00e9s) et enfin les activit\u00e9s parascolaires ou centres d\u2019int\u00e9r\u00eat. Elle lui pr\u00e9cise que le CV doit tenir sur une seule page pour un premier emploi et qu\u2019il faut utiliser une mise en page propre, a\u00e9r\u00e9e et facile \u00e0 lire.",
      "Emma passe deux soir\u00e9es \u00e0 r\u00e9diger son CV. Elle le fait relire par Mme Lachance et par sa meilleure amie, Jade, qui est tr\u00e8s forte en fran\u00e7ais. Ensemble, elles corrigent trois fautes d\u2019accord, ajustent la mise en page et reformulent certaines phrases pour les rendre plus professionnelles. Emma utilise ensuite un mod\u00e8le de CV disponible gratuitement sur le site d\u2019Emploi-Qu\u00e9bec.",
      "Finalement, Emma envoie son CV \u00e0 six employeurs diff\u00e9rents. En moins d\u2019une semaine, elle re\u00e7oit trois appels pour des entrevues. Ses amis lui demandent son secret. Emma leur r\u00e9pond simplement : \u00ab J\u2019ai pris le temps de bien le faire. \u00bb Mme Lachance lui avait dit que les employeurs remarquent toujours les CV soign\u00e9s parmi les dizaines qu\u2019ils re\u00e7oivent chaque semaine. Emma en avait la preuve.",
    ],
    questions: {
      blocs: [
        { id: "t6-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi Emma cherche-t-elle un emploi \u00e0 temps partiel ?", "Qui est Mme Lachance et quel r\u00f4le joue-t-elle dans l\u2019histoire ?", "Qu\u2019est-ce qu\u2019un CV selon Mme Lachance ?"] },
        { id: "t6-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelles sont les cinq sections essentielles d\u2019un CV selon le texte ?", "Combien de pages doit faire le CV d\u2019Emma pour un premier emploi ?", "Qui aide Emma \u00e0 relire et corriger son CV ?"] },
        { id: "t6-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Combien de fautes Emma et Jade corrigent-elles dans le CV ?", "Quel site Emma utilise-t-elle pour trouver un mod\u00e8le de CV ?", "Combien d\u2019employeurs Emma contacte-t-elle et combien lui r\u00e9pondent ?"] },
        { id: "t6-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Qu\u2019est-ce que la mise en page d\u2019un CV doit respecter selon Mme Lachance ?", "Quel est le \u00ab secret \u00bb d\u2019Emma pour obtenir des entrevues ?", "Que signifie l\u2019expression \u00ab faire la diff\u00e9rence \u00bb dans le contexte du CV ?"] },
        { id: "t6-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi commence-t-on la formation scolaire par la plus r\u00e9cente dans un CV ?", "Que comprend la section \u00ab comp\u00e9tences \u00bb dans le CV d\u2019Emma ?", "Combien de temps Emma passe-t-elle \u00e0 r\u00e9diger son CV ?"] },
        { id: "t6-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi un CV avec des fautes d\u2019orthographe peut-il nuire \u00e0 un candidat ?", "Que nous apprend le fait qu\u2019Emma a pris deux soir\u00e9es pour son CV sur son caract\u00e8re ?", "Pourquoi est-il utile de faire relire son CV par quelqu\u2019un d\u2019autre ?"] },
        { id: "t6-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi les activit\u00e9s parascolaires et les centres d\u2019int\u00e9r\u00eat figurent-ils sur un CV ?", "En quoi l\u2019acc\u00e8s gratuit \u00e0 des mod\u00e8les de CV sur Emploi-Qu\u00e9bec est-il un avantage pour les jeunes ?", "Que r\u00e9v\u00e8le la r\u00e9ponse d\u2019Emma \u00e0 ses amis sur son attitude face au travail ?"] },
        { id: "t6-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["As-tu d\u00e9j\u00e0 r\u00e9dig\u00e9 un CV ou aid\u00e9 quelqu\u2019un \u00e0 en cr\u00e9er un ? Raconte ton exp\u00e9rience.", "Quelles informations mettrais-tu en valeur sur ton propre CV ? Explique tes choix.", "Que penses-tu de la d\u00e9marche d\u2019Emma pour trouver un emploi ?"] },
        { id: "t6-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Penses-tu que le CV est encore le meilleur outil pour trouver un emploi en 2024 ? Justifie.", "Est-il juste qu\u2019un employeur \u00e9limine un candidat \u00e0 cause d\u2019une seule faute d\u2019orthographe ? Explique.", "Selon toi, quelle section du CV est la plus importante pour un premier emploi ? Justifie."] },
        { id: "t6-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab un CV bien structur\u00e9 et sans fautes \u00bb, souligne les groupes adjectivaux.", "Identifie le mode et le temps du verbe \u00ab peut faire \u00bb dans la premi\u00e8re phrase.", "R\u00e9\u00e9cris au pass\u00e9 simple : \u00ab Emma passe deux soir\u00e9es \u00e0 r\u00e9diger son CV. \u00bb"] },
        { id: "t6-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Explique l\u2019accord de \u00ab soign\u00e9s \u00bb dans \u00ab les CV soign\u00e9s \u00bb.", "Quel est le r\u00f4le des guillemets dans le quatri\u00e8me paragraphe ?", "Donne un synonyme du mot \u00ab reformuler \u00bb et utilise-le dans une phrase."] },
      ],
    },
  },
  {
    id: 7,
    titre: "Conna\u00eetre ses droits au travail",
    sousTitre: "Kevin d\u00e9couvre la Loi sur les normes du travail",
    categorie: "droits",
    paragraphes: [
      "Kevin a 16 ans et il travaille dans une pizzeria depuis trois mois. Un soir, son employeur lui demande de rester deux heures de plus sans lui payer ces heures suppl\u00e9mentaires. Kevin accepte ce soir-l\u00e0, mais il est troubl\u00e9. Il en parle \u00e0 son oncle, Andr\u00e9, qui est d\u00e9l\u00e9gu\u00e9 syndical dans une usine de Montr\u00e9al. Andr\u00e9 lui dit imm\u00e9diatement : \u00ab Tu as des droits, Kevin. Il faut que tu les connaisses. \u00bb",
      "Andr\u00e9 lui explique la Loi sur les normes du travail du Qu\u00e9bec, qui s\u2019applique \u00e0 presque tous les travailleurs de la province. Cette loi fixe un salaire minimum, qui est r\u00e9guli\u00e8rement mis \u00e0 jour par le gouvernement. Elle pr\u00e9cise aussi que les heures travaill\u00e9es au-del\u00e0 de 40 heures par semaine doivent \u00eatre r\u00e9mun\u00e9r\u00e9es \u00e0 temps et demi. De plus, tout employ\u00e9 a droit \u00e0 une pause de 30 minutes sans salaire apr\u00e8s cinq heures de travail cons\u00e9cutives.",
      "Kevin apprend aussi qu\u2019il a droit \u00e0 des cong\u00e9s pay\u00e9s apr\u00e8s un an de service, \u00e0 un pr\u00e9avis si on veut le congi\u00e9dier et \u00e0 un milieu de travail exempt de harc\u00e8lement. Si son employeur ne respecte pas ces droits, Kevin peut d\u00e9poser une plainte aupr\u00e8s de la CNESST, qui est l\u2019organisme gouvernemental charg\u00e9 de faire respecter la loi. Andr\u00e9 lui remet une brochure d\u2019information disponible en fran\u00e7ais sur le site de la CNESST.",
      "Arm\u00e9 de ces informations, Kevin retourne au travail le lendemain avec une attitude diff\u00e9rente. Il n\u2019a pas \u00e0 \u00eatre agressif, mais il sait maintenant qu\u2019il peut poliment demander \u00e0 son employeur de respecter ses droits. Son employeur, surpris mais professionnel, accepte de lui payer les heures suppl\u00e9mentaires en retard. Kevin comprend qu\u2019informer les jeunes travailleurs de leurs droits est fondamental dans une soci\u00e9t\u00e9 juste.",
    ],
    questions: {
      blocs: [
        { id: "t7-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi Kevin est-il troubl\u00e9 apr\u00e8s son quart de travail ?", "Qui est Andr\u00e9 et quel est son r\u00f4le dans l\u2019histoire ?", "Quel est l\u2019\u00e2ge de Kevin et depuis combien de temps travaille-t-il ?"] },
        { id: "t7-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Que pr\u00e9voit la Loi sur les normes du travail concernant les heures suppl\u00e9mentaires ?", "\u00c0 quelle pause a droit un employ\u00e9 apr\u00e8s cinq heures de travail cons\u00e9cutives ?", "Quel organisme Kevin peut-il contacter si son employeur ne respecte pas ses droits ?"] },
        { id: "t7-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quels autres droits Kevin d\u00e9couvre-t-il dans le troisi\u00e8me paragraphe ?", "Comment Kevin agit-il le lendemain avec son employeur ?", "Quelle est la r\u00e9action de l\u2019employeur face \u00e0 la demande de Kevin ?"] },
        { id: "t7-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Qu\u2019est-ce que la CNESST et quel est son r\u00f4le ?", "Qu\u2019est-ce qu\u2019un d\u00e9l\u00e9gu\u00e9 syndical ?", "Quel document Andr\u00e9 remet-il \u00e0 Kevin pour l\u2019aider ?"] },
        { id: "t7-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle le\u00e7on Kevin tire-t-il de cette exp\u00e9rience ?", "Que signifie \u00eatre r\u00e9mun\u00e9r\u00e9 \u00ab \u00e0 temps et demi \u00bb ?", "Pourquoi Kevin n\u2019a-t-il pas besoin d\u2019\u00eatre agressif pour d\u00e9fendre ses droits ?"] },
        { id: "t7-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi des jeunes travailleurs comme Kevin acceptent-ils parfois de travailler sans \u00eatre pay\u00e9s ?", "Que nous apprend cette histoire sur l\u2019importance de conna\u00eetre ses droits ?", "En quoi le r\u00f4le d\u2019Andr\u00e9 est-il essentiel dans cette histoire ?"] },
        { id: "t7-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi penses-tu que la Loi sur les normes du travail est r\u00e9guli\u00e8rement mise \u00e0 jour ?", "En quoi le comportement de l\u2019employeur \u00e0 la fin r\u00e9v\u00e8le-t-il quelque chose sur sa personnalit\u00e9 ?", "Quels risques un jeune travailleur court-il s\u2019il ne conna\u00eet pas ses droits ?"] },
        { id: "t7-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["As-tu d\u00e9j\u00e0 v\u00e9cu ou entendu parler d\u2019une situation o\u00f9 les droits d\u2019un travailleur n\u2019\u00e9taient pas respect\u00e9s ?", "Comment r\u00e9agirais-tu si un employeur te demandait de faire des heures non pay\u00e9es ?", "Que penses-tu de la fa\u00e7on dont Kevin r\u00e8gle le probl\u00e8me avec son employeur ?"] },
        { id: "t7-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Penses-tu que les employeurs respectent suffisamment les droits des jeunes travailleurs ? Justifie.", "Est-ce que l\u2019\u00e9ducation sur les droits du travail devrait faire partie du curriculum scolaire ? Explique.", "Selon toi, les syndicats sont-ils encore n\u00e9cessaires de nos jours ? Donne ton avis."] },
        { id: "t7-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab tout employ\u00e9 a droit \u00e0 une pause \u00bb, quelle est la fonction du groupe \u00ab \u00e0 une pause \u00bb ?", "R\u00e9\u00e9cris cette phrase au futur simple : \u00ab Kevin retourne au travail le lendemain. \u00bb", "Identifie le type de la subordonn\u00e9e dans \u00ab si son employeur ne respecte pas ces droits \u00bb."] },
        { id: "t7-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Quel est le r\u00f4le des guillemets dans \u00ab Tu as des droits, Kevin. Il faut que tu les connaisses. \u00bb ?", "Explique l\u2019accord du participe pass\u00e9 dans \u00ab arm\u00e9 de ces informations \u00bb.", "Donne l\u2019antonyme de \u00ab congi\u00e9dier \u00bb dans un contexte d\u2019emploi."] },
      ],
    },
  },
  {
    id: 8,
    titre: "Bien communiquer au travail",
    sousTitre: "Am\u00e9lie apprend l\u2019art de la communication professionnelle",
    categorie: "competences",
    paragraphes: [
      "Am\u00e9lie travaille depuis six mois dans un cabinet comptable \u00e0 Sherbrooke. Elle aime son travail, mais elle remarque que certains malentendus avec ses coll\u00e8gues cr\u00e9ent parfois des tensions inutiles. Sa superviseure, Mme Paradis, lui propose de participer \u00e0 un atelier de deux jours sur la communication en milieu de travail. Am\u00e9lie accepte avec enthousiasme, m\u00eame si elle se demande ce qu\u2019un atelier peut lui apporter de concret.",
      "Durant l\u2019atelier, Am\u00e9lie apprend que la communication au travail comprend plusieurs formes : la communication verbale (ce qu\u2019on dit), la communication non verbale (les gestes, le regard, la posture) et la communication \u00e9crite (les courriels, les comptes rendus, les rapports). Elle d\u00e9couvre aussi l\u2019importance de l\u2019\u00e9coute active : plut\u00f4t que de penser \u00e0 sa r\u00e9ponse pendant que l\u2019autre parle, elle doit vraiment \u00e9couter, poser des questions et reformuler pour s\u2019assurer qu\u2019elle a bien compris.",
      "L\u2019animatrice de l\u2019atelier insiste sur la r\u00e9daction des courriels professionnels. Un bon courriel doit avoir un objet clair, une salutation appropri\u00e9e, un message concis et une formule de politesse. Elle donne l\u2019exemple d\u2019un courriel mal r\u00e9dig\u00e9 qui avait caus\u00e9 un conflit entre deux services d\u2019une entreprise parce que le ton semblait agressif, alors que l\u2019auteur voulait simplement \u00eatre efficace.",
      "De retour au bureau, Am\u00e9lie applique ce qu\u2019elle a appris. Elle prend soin de relire ses courriels avant de les envoyer, elle reformule les messages ambigu\u00ebs et elle pose des questions plut\u00f4t que de supposer. En moins d\u2019un mois, Mme Paradis lui fait remarquer que l\u2019ambiance de l\u2019\u00e9quipe s\u2019est nettement am\u00e9lior\u00e9e. Am\u00e9lie r\u00e9alise que bien communiquer, c\u2019est une comp\u00e9tence qui s\u2019apprend et qui se pratique tous les jours.",
    ],
    questions: {
      blocs: [
        { id: "t8-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["O\u00f9 travaille Am\u00e9lie et depuis combien de temps ?", "Pourquoi Mme Paradis propose-t-elle \u00e0 Am\u00e9lie de participer \u00e0 l\u2019atelier ?", "Combien de jours dure l\u2019atelier de communication ?"] },
        { id: "t8-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelles sont les trois formes de communication pr\u00e9sent\u00e9es dans l\u2019atelier ?", "Qu\u2019est-ce que l\u2019\u00e9coute active selon le texte ?", "Quelles sont les composantes d\u2019un bon courriel professionnel ?"] },
        { id: "t8-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quel exemple d\u2019un mauvais courriel l\u2019animatrice donne-t-elle ?", "Qu\u2019est-ce qu\u2019Am\u00e9lie applique de l\u2019atelier \u00e0 son retour au bureau ?", "Comment Mme Paradis r\u00e9agit-elle aux changements d\u2019Am\u00e9lie ?"] },
        { id: "t8-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle est la conclusion qu\u2019Am\u00e9lie tire \u00e0 la fin du texte ?", "Qu\u2019est-ce que la communication non verbale selon le texte ?", "Donne un exemple concret d\u2019\u00e9coute active mentionn\u00e9 dans le texte."] },
        { id: "t8-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi Am\u00e9lie se demande-t-elle ce que l\u2019atelier peut lui apporter ?", "Quel probl\u00e8me dans l\u2019\u00e9quipe a pr\u00e9c\u00e9d\u00e9 la participation d\u2019Am\u00e9lie \u00e0 l\u2019atelier ?", "Qu\u2019est-ce qu\u2019un compte rendu dans un contexte professionnel ?"] },
        { id: "t8-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Comment un simple courriel mal r\u00e9dig\u00e9 peut-il cr\u00e9er un conflit entre coll\u00e8gues ?", "Pourquoi l\u2019\u00e9coute active est-elle difficile \u00e0 pratiquer dans un environnement de travail charg\u00e9 ?", "Que r\u00e9v\u00e8le le changement d\u2019ambiance dans l\u2019\u00e9quipe apr\u00e8s un mois sur l\u2019impact de la communication ?"] },
        { id: "t8-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi est-il important de relire un courriel avant de l\u2019envoyer ?", "En quoi la communication non verbale peut-elle contredire la communication verbale ?", "Selon toi, pourquoi certaines personnes ont-elles du mal \u00e0 communiquer clairement au travail ?"] },
        { id: "t8-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["As-tu d\u00e9j\u00e0 v\u00e9cu un malentendu caus\u00e9 par une mauvaise communication ? Raconte bri\u00e8vement.", "Laquelle des formes de communication (verbale, non verbale, \u00e9crite) te semble la plus difficile \u00e0 ma\u00eetriser ?", "Que penses-tu de l\u2019initiative d\u2019Am\u00e9lie d\u2019appliquer ce qu\u2019elle a appris d\u00e8s son retour au bureau ?"] },
        { id: "t8-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Selon toi, les employeurs devraient-ils investir davantage dans la formation en communication ? Justifie.", "Est-il juste de tenir quelqu\u2019un responsable d\u2019un conflit caus\u00e9 par un courriel mal r\u00e9dig\u00e9 ? Explique.", "Penses-tu que les habilet\u00e9s de communication sont inn\u00e9es ou qu\u2019elles peuvent s\u2019apprendre ? Donne ton avis."] },
        { id: "t8-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab ce qu\u2019elle a bien compris \u00bb, identifie le type de proposition et sa fonction.", "R\u00e9\u00e9cris cette phrase en rempla\u00e7ant \u00ab l\u2019animatrice \u00bb par un pronom : \u00ab L\u2019animatrice insiste sur la r\u00e9daction. \u00bb", "Quel est le temps et le mode du verbe dans \u00ab elle doit vraiment \u00e9couter \u00bb ?"] },
        { id: "t8-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Donne un antonyme de \u00ab concis \u00bb tel qu\u2019utilis\u00e9 pour d\u00e9crire un message.", "Explique l\u2019accord du verbe dans \u00ab l\u2019ambiance de l\u2019\u00e9quipe s\u2019est nettement am\u00e9lior\u00e9e \u00bb.", "Trouve dans le texte un adverbe d\u2019intensit\u00e9 et indique le mot qu\u2019il modifie."] },
      ],
    },
  },
  {
    id: 9,
    titre: "L\u2019esprit d\u2019\u00e9quipe",
    sousTitre: "Une brigade de cuisine apprend \u00e0 collaborer",
    categorie: "competences",
    paragraphes: [
      "Dans la cuisine du restaurant Le Portage, \u00e0 Trois-Rivi\u00e8res, il r\u00e8gne une activit\u00e9 intense chaque soir. Les commandes s\u2019encha\u00eenent, les assiettes doivent sortir parfaitement dress\u00e9es et dans les temps. La brigade est compos\u00e9e de six personnes : le chef Simon, deux cuisiniers, une p\u00e2tissi\u00e8re, un plongeur et une commise nomm\u00e9e Yasmine. Chacun a un r\u00f4le pr\u00e9cis, mais tous d\u00e9pendent les uns des autres pour que le service se passe bien.",
      "Un soir, un des cuisiniers, Marc, est absent pour cause de maladie. Le reste de l\u2019\u00e9quipe doit s\u2019adapter. Simon redistribue les t\u00e2ches calmement et demande \u00e0 Yasmine de prendre en charge la pr\u00e9paration des entr\u00e9es, une t\u00e2che qu\u2019elle n\u2019a pas encore faite seule. Yasmine h\u00e9site, mais ses coll\u00e8gues l\u2019encouragent. La p\u00e2tissi\u00e8re lui montre rapidement les techniques de base, et le plongeur acc\u00e9l\u00e8re la cadence pour s\u2019assurer que les ustensiles propres arrivent \u00e0 temps.",
      "\u00c0 mi-service, une commande se complique : une cliente a une allergie aux noix et la sauce du plat principal en contient. Simon arr\u00eate tout, v\u00e9rifie avec le serveur et pr\u00e9pare lui-m\u00eame une sauce alternative. L\u2019\u00e9quipe travaille en silence, concentr\u00e9e, sans panique. La cliente re\u00e7oit son plat modifi\u00e9 dans les d\u00e9lais normaux et quitte le restaurant satisfaite. Simon f\u00e9licite toute l\u2019\u00e9quipe \u00e0 la fin du service.",
      "Apr\u00e8s le service, autour d\u2019une table, Simon parle \u00e0 son \u00e9quipe : \u00ab Ce soir, vous avez montr\u00e9 ce que c\u2019est vraiment, l\u2019esprit d\u2019\u00e9quipe. Ce n\u2019est pas de ne jamais avoir de probl\u00e8mes. C\u2019est de savoir s\u2019adapter, se soutenir et communiquer quand les probl\u00e8mes arrivent. \u00bb Yasmine rentre chez elle fi\u00e8re d\u2019elle-m\u00eame. Elle sait maintenant qu\u2019elle est capable de bien plus qu\u2019elle ne le croyait.",
    ],
    questions: {
      blocs: [
        { id: "t9-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Dans quelle ville se situe le restaurant Le Portage ?", "Combien de personnes composent la brigade de cuisine ?", "Qui est Yasmine et quel est son r\u00f4le habituel ?"] },
        { id: "t9-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi l\u2019\u00e9quipe doit-elle s\u2019adapter ce soir-l\u00e0 ?", "Quelle nouvelle t\u00e2che Simon confie-t-il \u00e0 Yasmine ?", "Comment les coll\u00e8gues de Yasmine l\u2019aident-ils \u00e0 prendre en charge sa nouvelle t\u00e2che ?"] },
        { id: "t9-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle complication survient \u00e0 mi-service et comment Simon la g\u00e8re-t-il ?", "Comment la cliente r\u00e9agit-elle \u00e0 la fin ?", "Que fait Simon apr\u00e8s le service pour son \u00e9quipe ?"] },
        { id: "t9-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle d\u00e9finition Simon donne-t-il de l\u2019esprit d\u2019\u00e9quipe ?", "Quel r\u00f4le joue le plongeur pour aider Yasmine ?", "Comment Yasmine se sent-elle en rentrant chez elle ?"] },
        { id: "t9-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Pourquoi Simon arr\u00eate-t-il tout en voyant la commande de la cliente allergique ?", "Quel mot d\u00e9crit l\u2019ambiance dans la cuisine quand l\u2019\u00e9quipe g\u00e8re la crise ?", "Quel r\u00f4le le serveur joue-t-il dans l\u2019\u00e9pisode de l\u2019allergie ?"] },
        { id: "t9-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi Simon choisit-il de redistribuer les t\u00e2ches calmement plut\u00f4t que de s\u2019\u00e9nerver ?", "Que r\u00e9v\u00e8le la r\u00e9action de l\u2019\u00e9quipe face \u00e0 l\u2019allergie de la cliente sur leurs valeurs professionnelles ?", "Pourquoi Yasmine est-elle fi\u00e8re d\u2019elle-m\u00eame \u00e0 la fin de la soir\u00e9e ?"] },
        { id: "t9-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["En quoi l\u2019absence d\u2019un seul coll\u00e8gue peut-elle mettre en p\u00e9ril toute une \u00e9quipe ?", "Que signifie \u00ab chacun a un r\u00f4le pr\u00e9cis, mais tous d\u00e9pendent les uns des autres \u00bb dans ce contexte ?", "Quelle qualit\u00e9 de leader Simon d\u00e9montre-t-il tout au long de cette histoire ?"] },
        { id: "t9-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["As-tu d\u00e9j\u00e0 fait partie d\u2019une \u00e9quipe qui a d\u00fb s\u2019adapter rapidement \u00e0 une difficult\u00e9 ? Raconte.", "Quelle qualit\u00e9 de l\u2019\u00e9quipe du restaurant te semble la plus admirable ? Pourquoi ?", "Comment r\u00e9agirais-tu si on te confiait soudainement une t\u00e2che que tu n\u2019as jamais faite seul(e) ?"] },
        { id: "t9-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Selon toi, le chef Simon a-t-il bien g\u00e9r\u00e9 la situation ce soir-l\u00e0 ? Justifie avec des exemples du texte.", "L\u2019esprit d\u2019\u00e9quipe est-il une comp\u00e9tence qui peut s\u2019apprendre, ou c\u2019est inn\u00e9 ? Explique ta position.", "Penses-tu que les restaurants et entreprises de service font face \u00e0 plus de pression que les autres milieux de travail ?"] },
        { id: "t9-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab sans panique \u00bb, quelle est la classe et la fonction du groupe pr\u00e9positionnel ?", "Identifie le mode et le temps de \u00ab r\u00e8gne \u00bb dans la premi\u00e8re phrase.", "R\u00e9\u00e9cris au discours indirect : \u00ab Ce soir, vous avez montr\u00e9 ce que c\u2019est vraiment, l\u2019esprit d\u2019\u00e9quipe. \u00bb"] },
        { id: "t9-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Quel est l\u2019effet des deux points dans : \u00ab Simon parle \u00e0 son \u00e9quipe : \u00abCe soir\u2026\u00bb \u00bb ?", "Donne un synonyme du mot \u00ab brigade \u00bb dans un contexte professionnel.", "Dans \u00ab elle sait maintenant qu\u2019elle est capable \u00bb, quelle est la fonction de la subordonn\u00e9e compl\u00e9tive ?"] },
      ],
    },
  },
  {
    id: 10,
    titre: "Se former pour l\u2019avenir",
    sousTitre: "Gabriel choisit un dipl\u00f4me d\u2019\u00e9tudes professionnelles",
    categorie: "formation",
    paragraphes: [
      "Gabriel a termin\u00e9 sa 4e secondaire et il h\u00e9site sur la suite de son parcours. Ses parents voudraient qu\u2019il aille au c\u00e9gep, mais Gabriel est davantage attir\u00e9 par le monde pratique que par les \u00e9tudes th\u00e9oriques. Son conseiller en orientation, M. C\u00f4t\u00e9, lui parle d\u2019une option m\u00e9connue mais tr\u00e8s prometteuse : le dipl\u00f4me d\u2019\u00e9tudes professionnelles, ou DEP. Un DEP permet d\u2019acqu\u00e9rir une formation technique et pratique dans un domaine pr\u00e9cis, comme la m\u00e9canique automobile, la cuisine, l\u2019\u00e9lectricit\u00e9, la soudure ou les soins de sant\u00e9.",
      "M. C\u00f4t\u00e9 lui explique que les DEP sont offerts dans des centres de formation professionnelle (CFP) r\u00e9partis dans toutes les r\u00e9gions du Qu\u00e9bec. La dur\u00e9e d\u2019un programme varie g\u00e9n\u00e9ralement entre 900 et 1\u202f800 heures, soit de un \u00e0 deux ans. Un DEP m\u00e8ne directement au march\u00e9 du travail et de nombreuses entreprises cherchent activement ce type de main-d\u2019\u0153uvre qualifi\u00e9e. Les dipl\u00f4m\u00e9s d\u2019un DEP ont souvent un taux d\u2019emploi tr\u00e8s \u00e9lev\u00e9 \u2014 parfois plus de 80 % \u2014 dans leur domaine.",
      "Gabriel est particuli\u00e8rement int\u00e9ress\u00e9 par la m\u00e9canique de v\u00e9hicules l\u00e9gers. Il demande \u00e0 visiter le Centre de formation Comp\u00e9tences-2000 de Laval lors d\u2019une journ\u00e9e portes ouvertes. Il voit les ateliers \u00e9quip\u00e9s de voitures, les outils modernes et les enseignants qui ont tous travaill\u00e9 dans le domaine. Il rencontre aussi des \u00e9tudiants qui lui parlent des stages en entreprise inclus dans la formation \u2014 une exp\u00e9rience concr\u00e8te qui permet de se b\u00e2tir un r\u00e9seau et de se faire conna\u00eetre des employeurs.",
      "Gabriel prend sa d\u00e9cision : il s\u2019inscrit au DEP en m\u00e9canique de v\u00e9hicules l\u00e9gers pour le mois de septembre. Il informe ses parents, qui comprennent maintenant que cette voie est tout aussi valable que le c\u00e9gep. M. C\u00f4t\u00e9 lui rappelle qu\u2019il pourra toujours poursuivre ses \u00e9tudes plus tard avec une attestation de sp\u00e9cialisation professionnelle (ASP) ou d\u2019autres formations compl\u00e9mentaires. L\u2019important, c\u2019est de choisir un domaine qu\u2019on aime et dans lequel on est motiv\u00e9 \u00e0 s\u2019am\u00e9liorer.",
    ],
    questions: {
      blocs: [
        { id: "t10-c1", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quel niveau scolaire Gabriel vient-il de terminer ?", "Qui est M. C\u00f4t\u00e9 et quel r\u00f4le joue-t-il dans l\u2019histoire ?", "Qu\u2019est-ce qu\u2019un DEP selon le texte ?"] },
        { id: "t10-c2", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Donne trois exemples de domaines o\u00f9 l\u2019on peut obtenir un DEP.", "Quelle est la dur\u00e9e habituelle d\u2019un programme DEP ?", "Quel est le taux d\u2019emploi souvent observ\u00e9 chez les dipl\u00f4m\u00e9s d\u2019un DEP ?"] },
        { id: "t10-c3", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quel domaine int\u00e9resse particuli\u00e8rement Gabriel ?", "Que Gabriel observe-t-il lors de sa visite au centre de formation ?", "Quel avantage offrent les stages en entreprise inclus dans le DEP ?"] },
        { id: "t10-c4", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Quelle d\u00e9cision Gabriel prend-il \u00e0 la fin du texte ?", "Qu\u2019est-ce qu\u2019une attestation de sp\u00e9cialisation professionnelle (ASP) ?", "Comment r\u00e9agissent les parents de Gabriel \u00e0 sa d\u00e9cision ?"] },
        { id: "t10-c5", type: "comprehension", consigne: "Choisis une question de compr\u00e9hension et \u00e9cris ta r\u00e9ponse compl\u00e8te.", choix: ["Qu\u2019est-ce qu\u2019un centre de formation professionnelle (CFP) ?", "Quel message final M. C\u00f4t\u00e9 donne-t-il \u00e0 Gabriel ?", "Pourquoi Gabriel pr\u00e9f\u00e8re-t-il le DEP aux \u00e9tudes th\u00e9oriques ?"] },
        { id: "t10-i1", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi penses-tu que le DEP est consid\u00e9r\u00e9 comme une \u00ab option m\u00e9connue \u00bb ?", "En quoi le fait d\u2019avoir des enseignants ayant travaill\u00e9 dans le domaine est-il un avantage ?", "Que r\u00e9v\u00e8le la r\u00e9action initiale des parents de Gabriel sur leur vision de la r\u00e9ussite scolaire ?"] },
        { id: "t10-i2", type: "inference", consigne: "Choisis une question d\u2019inf\u00e9rence et d\u00e9veloppe ta r\u00e9ponse en expliquant ton raisonnement.", choix: ["Pourquoi les stages en entreprise sont-ils importants pour trouver un emploi apr\u00e8s le DEP ?", "En quoi le fait de choisir un domaine qu\u2019on aime influence-t-il la r\u00e9ussite professionnelle ?", "Que nous apprend cette histoire sur la diversit\u00e9 des chemins vers une carri\u00e8re satisfaisante ?"] },
        { id: "t10-r1", type: "reaction", consigne: "\u00c9cris ta r\u00e9action personnelle \u00e0 cette histoire. Utilise des exemples pr\u00e9cis du texte.", choix: ["As-tu d\u00e9j\u00e0 r\u00e9fl\u00e9chi \u00e0 ce que tu veux faire apr\u00e8s l\u2019\u00e9cole ? D\u00e9cris tes id\u00e9es ou tes h\u00e9sitations.", "Un DEP te semblerait-il une bonne option pour toi ? Pourquoi ou pourquoi pas ?", "Que penses-tu de la fa\u00e7on dont Gabriel prend sa d\u00e9cision de carri\u00e8re ?"] },
        { id: "t10-j1", type: "jugement", consigne: "Donne ton jugement critique sur un aspect de cette histoire. Justifie ton point de vue.", choix: ["Selon toi, la soci\u00e9t\u00e9 valorise-t-elle suffisamment les m\u00e9tiers techniques et professionnels ? Justifie.", "Penses-tu que les parents ont raison de vouloir que leurs enfants aillent au c\u00e9gep plut\u00f4t qu\u2019au DEP ?", "Est-il plus important de choisir une carri\u00e8re selon ses int\u00e9r\u00eats ou selon les d\u00e9bouch\u00e9s d\u2019emploi ? Explique."] },
        { id: "t10-g1", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab il pourra toujours poursuivre ses \u00e9tudes \u00bb, quel est le mode et le temps du verbe ?", "Identifie la subordonn\u00e9e dans \u00ab c\u2019est de choisir un domaine qu\u2019on aime \u00bb et donne sa fonction.", "R\u00e9\u00e9cris cette phrase au pr\u00e9sent : \u00ab Gabriel a termin\u00e9 sa 4e secondaire. \u00bb"] },
        { id: "t10-g2", type: "grammaire", consigne: "Choisis une question sur la langue et r\u00e9ponds avec soin.", choix: ["Dans \u00ab une formation technique et pratique \u00bb, quelle est la classe et la fonction des adjectifs ?", "Explique l\u2019accord du verbe dans \u00ab de nombreuses entreprises cherchent activement ce type de main-d\u2019\u0153uvre \u00bb.", "Donne un synonyme du mot \u00ab parcours \u00bb tel qu\u2019utilis\u00e9 dans le premier paragraphe."] },
      ],
    },
  },
];
