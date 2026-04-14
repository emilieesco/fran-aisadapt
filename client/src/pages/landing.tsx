import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen, Users, Target, Award, ArrowRight, Sparkles,
  CheckCircle, MessageCircle, FileText, BarChart2,
  PenLine, Mic, Layers, ChevronRight,
} from "lucide-react";
import teacherIllustration from "@assets/u6899119312_digital_textured_cartoon_illustration_in_the_styl_5b5f7c74-e8b9-4331-959e-96ce7e0b1e08_2_1764043247801.png";

const STATS = [
  { value: "108", label: "cours structurés" },
  { value: "387", label: "exercices interactifs" },
  { value: "2 119", label: "questions au total" },
  { value: "5", label: "types d'exercices" },
];

const STUDENT_FEATURES = [
  { icon: Target, text: "Exercices à choix multiples, texte libre, dictée et textes à trous" },
  { icon: Mic, text: "Dictée interactive avec synthèse vocale (fr-CA)" },
  { icon: Award, text: "Badges et barre de progression pour rester motivé" },
  { icon: MessageCircle, text: "Messagerie directe avec l'enseignant" },
  { icon: PenLine, text: "Corrections et annotations de l'enseignant visibles" },
  { icon: FileText, text: "Dépôt de documents et suivi des travaux" },
];

const TEACHER_FEATURES = [
  { icon: Users, text: "Gestion des élèves avec groupes personnalisables" },
  { icon: BarChart2, text: "Tableau de suivi de la progression par élève et par cours" },
  { icon: PenLine, text: "Annotation et correction des réponses directement dans la plateforme" },
  { icon: FileText, text: "Rapport PDF exportable par élève" },
  { icon: MessageCircle, text: "Messagerie privée et notifications en temps réel" },
  { icon: Layers, text: "Attribution de cours personnalisée par élève" },
];

const SUBJECTS = [
  { icon: BookOpen, label: "Grammaire", desc: "Classes de mots, CD, CI, CP — selon la nouvelle grammaire québécoise", color: "amber" },
  { icon: PenLine, label: "Orthographe", desc: "Règles d'accord, homophones et mots fréquents", color: "orange" },
  { icon: Target, label: "Conjugaison", desc: "Tous les temps essentiels avec exercices de mise en pratique", color: "yellow" },
  { icon: FileText, label: "Textes narratifs", desc: "Compréhension et production selon le schéma narratif en 5 étapes", color: "amber" },
  { icon: Layers, label: "Textes descriptifs", desc: "Structure, organisation et cohérence du texte descriptif", color: "orange" },
  { icon: Mic, label: "Dictée", desc: "Pratique de l'écriture spontanée avec écoute et correction guidée", color: "yellow" },
];

function ColorDot({ color }: { color: string }) {
  const map: Record<string, string> = {
    amber: "bg-amber-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
  };
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 ${map[color] ?? "bg-amber-500"}`} />;
}

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-700 dark:text-amber-400 flex-shrink-0" />
            <span className="text-xl font-bold text-amber-700 dark:text-amber-400">
              Français Actif
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setLocation("/auth?mode=login")}
              data-testid="button-login-header"
            >
              Connexion
            </Button>
            <Button
              onClick={() => setLocation("/auth?mode=register")}
              data-testid="button-register-header"
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Conçu pour l'adaptation scolaire au Québec</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 dark:from-amber-400 dark:via-orange-300 dark:to-yellow-300 bg-clip-text text-transparent">
              Maîtrisez le français avec plaisir
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Une plateforme complète pour élèves et enseignants — exercices interactifs,
              suivi de progression, messagerie et rapports, le tout fondé sur la
              <strong className="text-slate-800 dark:text-slate-100"> nouvelle grammaire québécoise</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => setLocation("/auth?mode=login")}
                className="gap-2 bg-amber-700 text-white"
                data-testid="button-get-started"
              >
                Accéder à la plateforme
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById("fonctionnalites")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Voir les fonctionnalités
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={teacherIllustration}
              alt="Enseignante de français"
              className="max-w-sm w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="bg-amber-700 dark:bg-amber-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold mb-1">{s.value}</p>
              <p className="text-amber-100 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ────────────────────────────────────────── */}
      <section id="fonctionnalites" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 text-amber-900 dark:text-amber-300">
            Une plateforme pour chacun
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Des outils adaptés aux besoins des élèves comme des enseignants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Élèves */}
          <Card className="p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-md bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-700 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pour les élèves</h3>
            </div>
            <ul className="space-y-3">
              {STUDENT_FEATURES.map(f => (
                <li key={f.text} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{f.text}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 gap-2"
              variant="outline"
              onClick={() => setLocation("/auth?mode=login")}
            >
              Espace élève <ChevronRight className="w-4 h-4" />
            </Button>
          </Card>

          {/* Enseignants */}
          <Card className="p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pour les enseignants</h3>
            </div>
            <ul className="space-y-3">
              {TEACHER_FEATURES.map(f => (
                <li key={f.text} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{f.text}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 gap-2"
              variant="outline"
              onClick={() => setLocation("/auth?mode=login")}
            >
              Espace enseignant <ChevronRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </section>

      {/* ── MATIÈRES ───────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 text-amber-900 dark:text-amber-300">
              Contenus enseignés
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Des contenus structurés et progressifs, alignés sur le programme québécois
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUBJECTS.map(s => (
              <Card key={s.label} className="p-6 hover-elevate">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center ${
                    s.color === "amber" ? "bg-amber-100 dark:bg-amber-900/30" :
                    s.color === "orange" ? "bg-orange-100 dark:bg-orange-900/30" :
                    "bg-yellow-100 dark:bg-yellow-900/30"
                  }`}>
                    <s.icon className={`w-5 h-5 ${
                      s.color === "amber" ? "text-amber-700 dark:text-amber-400" :
                      s.color === "orange" ? "text-orange-700 dark:text-orange-400" :
                      "text-yellow-700 dark:text-yellow-400"
                    }`} />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    <ColorDot color={s.color} />{s.label}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 dark:from-amber-900 dark:via-orange-900 dark:to-yellow-900 py-20">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-5">
            Prêt à commencer?
          </h2>
          <p className="text-amber-50 text-lg mb-8 max-w-xl mx-auto">
            Rejoignez la plateforme et donnez à vos élèves les outils pour progresser en français, à leur rythme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation("/auth?mode=login")}
              className="bg-white text-amber-700 font-semibold gap-2"
              data-testid="button-login-cta"
            >
              Se connecter <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/auth?mode=register")}
              className="border-white/50 text-white bg-white/10"
              data-testid="button-register-cta"
            >
              Créer un compte
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-white dark:bg-slate-900 border-t border-amber-200 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <span className="font-bold text-amber-700 dark:text-amber-400">Français Actif</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Plateforme d'apprentissage du français pour les programmes d'adaptation scolaire et sociale au Québec.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Plateforme</h3>
              <ul className="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <button onClick={() => setLocation("/auth?mode=login")} className="hover:text-amber-700 dark:hover:text-amber-400 transition">
                    Connexion
                  </button>
                </li>
                <li>
                  <button onClick={() => setLocation("/auth?mode=register")} className="hover:text-amber-700 dark:hover:text-amber-400 transition">
                    Inscription
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("fonctionnalites")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-amber-700 dark:hover:text-amber-400 transition"
                  >
                    Fonctionnalités
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">À propos</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Conçu pour les élèves et enseignants du Québec, en suivant les programmes officiels et la nouvelle grammaire.
              </p>
            </div>
          </div>
          <div className="border-t border-amber-100 dark:border-slate-800 pt-6 text-center text-sm text-slate-400 dark:text-slate-500">
            &copy; 2026 Français Actif. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
