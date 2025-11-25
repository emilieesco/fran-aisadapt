import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
}

const storyDescriptions: { [key: number]: { shortDesc: string; preview: string } } = {
  0: {
    shortDesc: "Léa découvre une clé mystérieuse",
    preview: "Léa avait 11 ans et vivait dans une petite maison ancienne au bord d'une forêt dense. Elle était une fille curieuse qui adorait lire des histoires d'aventure. Chaque jour, elle allait à l'école et revenait faire ses devoirs.\n\nCe matin-là, en explorant le grenier, Léa découvrit une vieille clé rouillée tombée entre deux poutres en bois. La clé avait une forme bizarre, gravée de symboles mystérieux. Léa n'avait jamais vu cette clé avant et elle se demanda: \"À quoi ouvre-t-elle?\"\n\nElle chercha partout dans la maison une serrure qui correspondrait à cette clé. Dans la cave, elle trouva une petite porte en bois qu'elle n'avait jamais remarquée avant. Son cœur battait très vite. Mais soudain, elle entendit un bruit terrible: la porte de la cave claqua et s'enferma!\n\nAprès une heure, Léa trouva une autre porte qui menait à un tunnel souterrain. Elle s'échappa et raconta tout à ses parents. En explorant la maison avec sa famille, ils découvrirent que la maison appartenait à un homme riche du 19e siècle qui y avait caché des pièces de monnaie anciennes.",
  },
  1: {
    shortDesc: "Marc apprend l'importance de la sécurité",
    preview: "Marc était un garçon de 13 ans qui adorait faire du vélo avec ses copains du quartier. Chaque jour après l'école, ils allaient au skate park faire des figures impressionnantes.\n\nMarc avait toujours porté un casque, mais ce jour-là, il l'avait oublié à la maison. En arrivant au parc, ses copains l'appelaient pour faire une course de vélo. Marc hésita mais ses copains plaisantaient: \"Allez Marc, t'es pas un bébé!\"\n\nContre son mieux jugement, Marc accepta. Il pédalait vite, très vite. Soudain, une voiture sortit d'une rue latérale. Marc freina brusquement et chuta violemment du vélo! Il tomba sur le trottoir, la tête la première. Il perdit connaissance.\n\nMarc fut transporté à l'hôpital avec une commotion cérébrale et plusieurs blessures. Il dut rester une semaine. Après sa sortie, Marc devint ambassadeur de la sécurité à vélo dans son école.",
  },
  2: {
    shortDesc: "Sophie poursuit son rêve de danse",
    preview: "Sophie avait 12 ans et vivait dans un petit village. Elle adorait danser mais n'avait jamais eu l'occasion de prendre des cours. Elle regardait des vidéos de danse sur Internet et s'entraînait seule dans sa chambre.\n\nUn jour, en se promenant au village, Sophie vit une affiche: \"Auditions de danse pour l'école d'arts! Gratuit pour tous!\"\n\nSophie était très nerveuse. Elle s'entraîna pendant toute la semaine. Le jour de l'audition, elle monta sur scène. Elle vit tous les regards fixés sur elle. Son cœur battait très fort. Elle oublia ses mouvements. Mais elle prit une profonde respiration et continua de danser avec tout son cœur.\n\nLe directeur de l'école d'arts fut tellement impressionné qu'il l'accepta et lui offrit même une bourse complète!",
  },
  3: {
    shortDesc: "Lucas et Thomas se retrouvent malgré la distance",
    preview: "Lucas et Thomas étaient les meilleurs amis du monde. Ils faisaient tout ensemble: jouer au football, faire leurs devoirs. Ils s'aimaient comme des frères.\n\nUn jour, la famille de Thomas déménagea dans une autre ville. Lucas et Thomas se promettirent de rester en contact, mais avec le temps, les messages devinrent de moins en moins fréquents. Après un an, ils ne communiquaient plus du tout.\n\nLucas commença à se sentir très mal. Il pensait à Thomas tous les jours et avait le cœur brisé. Thomas, de son côté, avait aussi les mêmes sentiments! Mais aucun des deux n'osa faire le premier pas.\n\nUn jour, Lucas reçut une lettre de Thomas. Ils commencèrent à se parler régulièrement. Quelques mois plus tard, Lucas visita Thomas pendant les vacances. Leur amitié était revenue plus forte que jamais!",
  },
  4: {
    shortDesc: "Emma fait une découverte extraordinaire",
    preview: "Emma était une fille de 11 ans qui adorait la science. Elle passait des heures à faire des expériences dans sa chambre. Elle rêvait de devenir scientifique comme sa grand-mère.\n\nUn jour, elle découvrit une vieille expérience de cristaux de sel dans un livre de son grand-mère.\n\nEmma fit l'expérience mais quelque chose d'inattendu se produisit! Les cristaux se développaient d'une manière bizarre qu'elle n'avait jamais vue. Elle pensa d'abord que c'était un échec.\n\nAprès investigation, elle réalisa qu'elle avait créé une nouvelle forme de cristal! Elle présenta son découverte à l'école et gagna le prix de la meilleure expérience scientifique!",
  },
};

export default function ReadingNarrative() {
  const [, setLocation] = useLocation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`/api/reading-narratives?userId=${userId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setExercises(data);
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <p>Chargement des histoires...</p>
      </div>
    );
  }

  const currentExercise = exercises[activeStoryIndex];
  const currentStory = storyDescriptions[activeStoryIndex] || storyDescriptions[0];

  const handleStartExercise = () => {
    if (currentExercise) {
      setLocation(`/exercise/${currentExercise.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/student-dashboard")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              Lecture & Compréhension
            </h1>
            <p className="text-sm text-muted-foreground">Textes Narratifs</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Card className="p-8 bg-white dark:bg-slate-800">
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Choisissez une Histoire</h2>
                <p className="text-muted-foreground">
                  Sélectionnez l'une des 5 histoires ci-dessous et répondez aux questions de compréhension.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeStoryIndex.toString()}
            onValueChange={(val) => setActiveStoryIndex(parseInt(val))}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 gap-2 mb-6 bg-amber-100 dark:bg-slate-700">
              {exercises.map((exercise, index) => (
                <TabsTrigger
                  key={exercise.id}
                  value={index.toString()}
                  className="text-xs sm:text-sm truncate"
                  data-testid={`tab-story-${index}`}
                >
                  Histoire {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Story Content */}
            {exercises.map((exercise, index) => (
              <TabsContent key={exercise.id} value={index.toString()} className="space-y-6">
                <Card className="p-6 bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-amber-900">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-amber-800 dark:text-amber-300 mb-4">{storyDescriptions[index]?.shortDesc}</p>

                  {/* Story Text Preview */}
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-900 mb-6 max-h-96 overflow-y-auto">
                    <p className="text-foreground leading-relaxed text-sm whitespace-pre-wrap">
                      {storyDescriptions[index]?.preview}
                    </p>
                  </div>

                  <Button
                    onClick={handleStartExercise}
                    className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800"
                    size="lg"
                    data-testid={`button-start-exercise-${index}`}
                  >
                    Lire l'histoire complète et répondre aux questions
                  </Button>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
