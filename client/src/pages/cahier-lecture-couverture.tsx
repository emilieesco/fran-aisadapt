import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft } from "lucide-react";
import fleurs from "@assets/u6899119312_digital_textured_cartoon_illustration_in_the_styl__1777161514454.png";

export default function CahierLectureCouverture() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col print:block" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Bouton retour — masqué à l'impression */}
      <div className="absolute top-4 left-4 z-20 print:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/student-dashboard")}
          className="bg-white/60 backdrop-blur-sm hover:bg-white/80 text-green-900 gap-1.5"
          data-testid="btn-retour-couverture"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
      </div>

      {/* ── Zone du haut : illustration plein écran ─────────────────────────── */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center min-h-[55vh] print:min-h-[58vh]"
        style={{
          backgroundImage: `url(${fleurs})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Lavis sombre pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,40,20,0.38) 0%, rgba(10,40,20,0.55) 60%, rgba(10,40,20,0.82) 100%)",
          }}
        />

        {/* Contenu centré sur l'image */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto space-y-5 py-12">

          {/* Étiquette supérieure */}
          <div className="inline-block border border-white/50 bg-white/15 backdrop-blur-sm text-white text-xs tracking-widest uppercase px-4 py-1.5 rounded-full">
            Cahier de lecture
          </div>

          {/* Titre principal */}
          <h1
            className="text-5xl font-bold text-white leading-tight drop-shadow-lg"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
          >
            Histoires du
            <br />
            <span className="text-amber-300">Québec</span>
          </h1>

          {/* Sous-titre */}
          <p
            className="text-white/90 text-lg italic"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            Dix récits pour explorer, comprendre et réagir
          </p>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-amber-300/80" />
            <div className="h-px w-16 bg-white/40" />
          </div>

          {/* Bouton accès au cahier */}
          <div className="pt-2 print:hidden">
            <Button
              onClick={() => setLocation("/cahier-lecture")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-base gap-2 shadow-xl"
              data-testid="btn-ouvrir-cahier"
            >
              <BookOpen className="w-5 h-5" />
              Ouvrir le cahier
            </Button>
          </div>
        </div>
      </div>

      {/* ── Zone du bas : fond blanc / crème avec infos ─────────────────────── */}
      <div
        className="bg-gradient-to-b from-[#f0f7f0] to-[#e8f4e8] dark:from-slate-900 dark:to-slate-950 flex-shrink-0 print:bg-white"
        style={{ minHeight: "45vh" }}
      >
        <div className="max-w-2xl mx-auto px-8 py-10 space-y-8">

          {/* Cartouche élève */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-md px-8 py-7 space-y-5 print:border-gray-400 print:shadow-none">
            <h2 className="text-center text-sm font-bold tracking-widest text-green-800 dark:text-green-300 uppercase">
              Informations de l'élève
            </h2>

            {[
              { label: "Nom et prénom", wide: true },
              { label: "Groupe / classe", wide: false },
              { label: "Enseignant(e)", wide: false },
              { label: "Année scolaire", wide: false },
            ].map(({ label, wide }) => (
              <div key={label} className="flex items-end gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap min-w-[130px] print:text-black">
                  {label} :
                </span>
                <div
                  className="border-b-2 border-green-400 dark:border-green-600 flex-1 print:border-gray-500"
                  style={{ minWidth: wide ? 220 : 120, height: 26 }}
                />
              </div>
            ))}
          </div>

          {/* Description / légende des types */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-green-900 dark:text-green-300 print:text-black">
              Ce cahier contient
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { color: "bg-green-100 border-green-300 text-green-800", ico: "10", txt: "histoires narratives québécoises" },
                { color: "bg-blue-100 border-blue-300 text-blue-800", ico: "5×", txt: "questions de compréhension par histoire" },
                { color: "bg-violet-100 border-violet-300 text-violet-800", ico: "2×", txt: "questions d'inférence par histoire" },
                { color: "bg-emerald-100 border-emerald-300 text-emerald-800", ico: "1×", txt: "question de réaction personnelle" },
                { color: "bg-red-100 border-red-300 text-red-800", ico: "1×", txt: "question de jugement critique" },
                { color: "bg-amber-100 border-amber-300 text-amber-800", ico: "2×", txt: "exercices de grammaire et procédés" },
              ].map(({ color, ico, txt }) => (
                <div key={txt} className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 ${color} print:border-gray-300 print:bg-gray-50 print:text-black`}>
                  <span className="font-bold text-base leading-none mt-0.5">{ico}</span>
                  <span className="leading-snug text-xs">{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consigne */}
          <div className="border-l-4 border-green-400 dark:border-green-600 pl-4 text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed print:text-black">
            Pour chaque question, lis attentivement l'histoire, choisis la question qui t'inspire dans le menu déroulant, puis développe ta réponse en répondant en phrases complètes. Appuie toujours ta réponse sur des éléments précis du texte.
          </div>

          {/* Pied de page */}
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-600 pt-4 border-t border-green-100 dark:border-green-900 print:border-gray-300 print:text-gray-400">
            <span>Français — Lecture et écriture</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-green-300" />
              <div className="w-2 h-2 rounded-full bg-amber-300" />
              <div className="w-2 h-2 rounded-full bg-violet-300" />
            </div>
            <span>Schéma narratif québécois</span>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { margin: 0; }
        }
      `}</style>
    </div>
  );
}
