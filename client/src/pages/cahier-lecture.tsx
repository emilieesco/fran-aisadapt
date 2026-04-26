import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Download, BookOpen, ChevronDown } from "lucide-react";
import { HISTOIRES, type QuestionBloc } from "@shared/histoires";

// ── Couleurs par type de question ─────────────────────────────────────────────
const TYPE_META: Record<QuestionBloc["type"], { label: string; bg: string; border: string; text: string; badge: string }> = {
  comprehension: { label: "Compréhension", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-300 dark:border-blue-700", text: "text-blue-800 dark:text-blue-200", badge: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700" },
  inference:     { label: "Inférence",     bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-300 dark:border-violet-700", text: "text-violet-800 dark:text-violet-200", badge: "bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 border-violet-300 dark:border-violet-700" },
  reaction:      { label: "Réaction",      bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-300 dark:border-emerald-700", text: "text-emerald-800 dark:text-emerald-200", badge: "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700" },
  jugement:      { label: "Jugement critique", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-300 dark:border-red-700", text: "text-red-800 dark:text-red-200", badge: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700" },
  grammaire:     { label: "Grammaire",     bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-300 dark:border-amber-700", text: "text-amber-800 dark:text-amber-200", badge: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700" },
};

// ── Bloc question ─────────────────────────────────────────────────────────────
function BlocQuestion({ bloc, uid }: { bloc: QuestionBloc; uid: string }) {
  const [sel, setSel] = useState("");
  const [rep, setRep] = useState("");
  const m = TYPE_META[bloc.type];

  return (
    <div className={`rounded-lg border-2 ${m.border} ${m.bg} p-4 space-y-3`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md border ${m.badge}`}>
          {m.label}
        </span>
        <span className="text-xs font-medium text-foreground">{bloc.label}</span>
      </div>

      {/* Sélection de la question */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground" htmlFor={`${uid}-sel`}>
          Choisis ta question :
        </label>
        <div className="relative">
          <select
            id={`${uid}-sel`}
            value={sel}
            onChange={e => setSel(e.target.value)}
            className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid={`select-${uid}`}
          >
            <option value="">— Sélectionne une question —</option>
            {bloc.questions.map((q, i) => (
              <option key={i} value={q}>{String.fromCharCode(65 + i)}.  {q}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Affichage de la question sélectionnée */}
      {sel && (
        <div className={`rounded-md px-3 py-2 text-sm italic text-foreground border ${m.border} bg-white/70 dark:bg-black/20`}>
          {sel}
        </div>
      )}

      {/* Zone de réponse */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground" htmlFor={`${uid}-rep`}>
          Ta réponse :
        </label>
        <textarea
          id={`${uid}-rep`}
          value={rep}
          onChange={e => setRep(e.target.value)}
          placeholder="Écris ta réponse ici…"
          rows={6}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          data-testid={`textarea-${uid}`}
        />
        <div className={`text-xs text-right ${rep.length > 0 ? m.text : "text-muted-foreground"}`}>
          {rep.length} caractère{rep.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

// ── Carte histoire ────────────────────────────────────────────────────────────
function CarteHistoire({ histoire }: { histoire: typeof HISTOIRES[0] }) {
  const [open, setOpen] = useState(false);
  const compr  = histoire.questions.filter(q => q.type === "comprehension");
  const inf    = histoire.questions.filter(q => q.type === "inference");
  const react  = histoire.questions.filter(q => q.type === "reaction");
  const jug    = histoire.questions.filter(q => q.type === "jugement");
  const gram   = histoire.questions.filter(q => q.type === "grammaire");

  return (
    <article className="bg-card rounded-xl border shadow-sm overflow-hidden print:shadow-none print:border-gray-300 print:rounded-none print:break-before-page">
      {/* En-tête coloré */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5 print:bg-amber-700">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-white/25 text-white text-xs font-bold px-2.5 py-0.5 rounded-full tracking-wide">
            Histoire {histoire.id} / 10
          </span>
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-xs bg-blue-500/30 text-white px-2 py-0.5 rounded-full">{compr.length}× compréhension</span>
            <span className="text-xs bg-violet-500/30 text-white px-2 py-0.5 rounded-full">{inf.length}× inférence</span>
            <span className="text-xs bg-emerald-500/30 text-white px-2 py-0.5 rounded-full">{react.length}× réaction</span>
            <span className="text-xs bg-red-500/30 text-white px-2 py-0.5 rounded-full">{jug.length}× jugement</span>
            <span className="text-xs bg-amber-400/30 text-white px-2 py-0.5 rounded-full">{gram.length}× grammaire</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">{histoire.titre}</h2>
        <p className="text-amber-100 text-sm mt-1 italic">{histoire.sousTitre}</p>
      </div>

      {/* Texte de l'histoire */}
      <div className="p-6 space-y-5 border-b">
        {histoire.texte.map((para, i) => (
          <p key={i} className="text-sm leading-7 text-foreground">
            {i === 0 && (
              <span className="float-left text-4xl font-bold text-amber-600 mr-1.5 mt-0.5 leading-none">
                {para.charAt(0)}
              </span>
            )}
            {i === 0 ? para.slice(1) : para}
          </p>
        ))}
      </div>

      {/* Bouton toggle questions */}
      <div className="px-6 py-4 print:hidden">
        <Button
          variant="outline"
          onClick={() => setOpen(o => !o)}
          className="w-full gap-2"
          data-testid={`btn-q-${histoire.id}`}
        >
          <BookOpen className="w-4 h-4" />
          {open
            ? "Masquer les questions"
            : `Afficher les ${histoire.questions.length} blocs de questions (${compr.length + inf.length} compréhension/inférence · ${react.length} réaction · ${jug.length} jugement · ${gram.length} grammaire)`}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Questions */}
      <div className={`px-6 pb-8 space-y-5 ${open ? "" : "hidden"} print:block`}>
        <h3 className="text-base font-semibold text-foreground pt-1 border-t print:pt-4">
          Questions — {histoire.titre}
        </h3>
        {histoire.questions.map((bloc, i) => (
          <BlocQuestion key={i} bloc={bloc} uid={`h${histoire.id}-b${i}`} />
        ))}
      </div>
    </article>
  );
}

// ── Génération du HTML téléchargeable ─────────────────────────────────────────
function genererHTML(): string {
  const styles = `
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Georgia,serif;font-size:11pt;color:#1a1a1a;background:#f9f6f1;padding:0}
    .page{max-width:820px;margin:0 auto;padding:2cm 2.5cm}
    h1{font-size:22pt;color:#92400e;text-align:center;margin-bottom:8px}
    .subtitle{text-align:center;color:#666;font-size:10pt;margin-bottom:16px;font-style:italic}
    .infos{display:flex;gap:32px;justify-content:center;margin-bottom:28px;flex-wrap:wrap}
    .infos label{font-size:10pt}.infos input{border:none;border-bottom:1px solid #333;background:transparent;width:160px;font-size:10pt;outline:none}
    .legende{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:32px;background:#fff;border:1px solid #ddd;border-radius:6px;padding:12px}
    .leg-item{padding:6px 8px;border-radius:4px;font-size:8.5pt}
    .leg-c{background:#dbeafe;border:1px solid #93c5fd}.leg-i{background:#ede9fe;border:1px solid #c4b5fd}
    .leg-r{background:#d1fae5;border:1px solid #6ee7b7}.leg-j{background:#fee2e2;border:1px solid #fca5a5}
    .leg-g{background:#fef3c7;border:1px solid #fcd34d}
    .leg-type{font-weight:bold;font-size:8pt;margin-bottom:2px}
    .story{background:#fff;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:40px;break-before:page}
    .story-header{background:linear-gradient(135deg,#92400e,#ea580c);color:#fff;padding:20px 24px;border-radius:6px 6px 0 0}
    .story-num{background:rgba(255,255,255,.2);font-size:8.5pt;font-weight:bold;padding:2px 10px;border-radius:20px;display:inline-block;margin-bottom:8px}
    .story-title{font-size:16pt;font-weight:bold;margin-bottom:4px}
    .story-sub{font-size:9pt;font-style:italic;opacity:.85}
    .story-text{padding:20px 24px;border-bottom:1px solid #e2e8f0;line-height:1.9}
    .story-text p{margin-bottom:14px;font-size:10.5pt}
    .dropcap{float:left;font-size:36pt;font-weight:bold;color:#92400e;line-height:.8;margin-right:4px;margin-top:4px}
    .questions{padding:16px 24px 28px}
    .q-title{font-size:11pt;font-weight:bold;margin-bottom:16px;border-top:1px solid #e2e8f0;padding-top:12px}
    .bloc{border-radius:6px;padding:14px;margin-bottom:14px;border-width:2px;border-style:solid}
    .bloc-c{background:#eff6ff;border-color:#93c5fd}.bloc-i{background:#f5f3ff;border-color:#c4b5fd}
    .bloc-r{background:#ecfdf5;border-color:#6ee7b7}.bloc-j{background:#fef2f2;border-color:#fca5a5}
    .bloc-g{background:#fffbeb;border-color:#fcd34d}
    .badge{font-size:7.5pt;font-weight:bold;padding:2px 8px;border-radius:4px;border-width:1px;border-style:solid;display:inline-block;margin-bottom:4px}
    .badge-c{background:#dbeafe;border-color:#93c5fd;color:#1e40af}
    .badge-i{background:#ede9fe;border-color:#c4b5fd;color:#5b21b6}
    .badge-r{background:#d1fae5;border-color:#6ee7b7;color:#065f46}
    .badge-j{background:#fee2e2;border-color:#fca5a5;color:#991b1b}
    .badge-g{background:#fef3c7;border-color:#fcd34d;color:#92400e}
    .bloc-label{font-size:9.5pt;font-weight:600;margin-bottom:10px;color:#374151}
    .q-label{font-size:8.5pt;color:#666;margin-bottom:4px;font-weight:600}
    select{width:100%;font-size:9.5pt;padding:6px 8px;border:1px solid #d1d5db;border-radius:4px;background:#fff;margin-bottom:8px;-webkit-appearance:auto}
    .selected-q{font-style:italic;font-size:9pt;background:rgba(255,255,255,.7);border:1px solid #e5e7eb;border-radius:4px;padding:6px 8px;margin-bottom:8px;min-height:28px}
    textarea{width:100%;font-size:9.5pt;padding:6px 8px;border:1px solid #d1d5db;border-radius:4px;resize:vertical;font-family:inherit;min-height:100px;background:#fff}
    .charcount{text-align:right;font-size:8pt;color:#9ca3af;margin-top:2px}
    @media print{body{background:#fff}.story{border:1px solid #ccc;break-before:page}.story:first-child{break-before:avoid}}
  `;

  const badges: Record<string, string> = {
    comprehension: "badge-c", inference: "badge-i", reaction: "badge-r", jugement: "badge-j", grammaire: "badge-g",
  };
  const blocs: Record<string, string> = {
    comprehension: "bloc-c", inference: "bloc-i", reaction: "bloc-r", jugement: "bloc-j", grammaire: "bloc-g",
  };
  const labels: Record<string, string> = {
    comprehension: "Compréhension", inference: "Inférence", reaction: "Réaction personnelle", jugement: "Jugement critique", grammaire: "Grammaire",
  };

  const storiesHTML = HISTOIRES.map(h => {
    const [first, ...rest] = h.texte;
    const texteHTML = `
      <p><span class="dropcap">${first.charAt(0)}</span>${first.slice(1).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</p>
      ${rest.map(p => `<p>${p.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</p>`).join("")}
    `;
    const qHTML = h.questions.map((bloc, bi) => {
      const uid = `h${h.id}b${bi}`;
      const opts = bloc.questions.map((q, qi) =>
        `<option value="${q.replace(/"/g,"&quot;")}">${String.fromCharCode(65+qi)}. ${q.replace(/</g,"&lt;")}</option>`
      ).join("");
      return `
        <div class="bloc ${blocs[bloc.type]}">
          <div><span class="badge ${badges[bloc.type]}">${labels[bloc.type]}</span></div>
          <div class="bloc-label">${bloc.label.replace(/</g,"&lt;")}</div>
          <div class="q-label">Choisis ta question :</div>
          <select id="${uid}-sel" onchange="
            var q=document.getElementById('${uid}-qshow');
            q.textContent=this.value;
            q.style.display=this.value?'block':'none';
          ">
            <option value="">— Sélectionne une question —</option>
            ${opts}
          </select>
          <div id="${uid}-qshow" class="selected-q" style="display:none"></div>
          <div class="q-label">Ta réponse :</div>
          <textarea id="${uid}-rep" rows="6" placeholder="Écris ta réponse ici…" oninput="
            document.getElementById('${uid}-cnt').textContent=this.value.length+' caractère'+(this.value.length!==1?'s':'');
          "></textarea>
          <div id="${uid}-cnt" class="charcount">0 caractère</div>
        </div>`;
    }).join("");

    return `
      <div class="story">
        <div class="story-header">
          <div class="story-num">Histoire ${h.id} / 10</div>
          <div class="story-title">${h.titre.replace(/</g,"&lt;")}</div>
          <div class="story-sub">${h.sousTitre.replace(/</g,"&lt;")}</div>
        </div>
        <div class="story-text">${texteHTML}</div>
        <div class="questions">
          <div class="q-title">Questions — ${h.titre.replace(/</g,"&lt;")}</div>
          ${qHTML}
        </div>
      </div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cahier de lecture — 10 histoires narratives</title>
<style>${styles}</style>
</head>
<body>
<div class="page">
  <h1>Cahier de lecture — 10 histoires narratives</h1>
  <div class="subtitle">Schéma narratif québécois &nbsp;·&nbsp; Questions différenciées par dimension &nbsp;·&nbsp; Menus de sélection interactifs</div>
  <div class="infos">
    <label>Nom : <input type="text" placeholder="________________________________" size="28"></label>
    <label>Groupe : <input type="text" placeholder="__________" size="10"></label>
    <label>Date : <input type="text" placeholder="______________" size="14"></label>
  </div>
  <div class="legende">
    <div class="leg-item leg-c"><div class="leg-type">Compréhension</div>Repérer les informations explicites du texte</div>
    <div class="leg-item leg-i"><div class="leg-type">Inférence</div>Déduire ce qui est implicite ou suggéré</div>
    <div class="leg-item leg-r"><div class="leg-type">Réaction</div>Réagir personnellement au texte</div>
    <div class="leg-item leg-j"><div class="leg-type">Jugement critique</div>Évaluer, apprécier, défendre une position</div>
    <div class="leg-item leg-g"><div class="leg-type">Grammaire</div>Analyser la langue et les procédés d'écriture</div>
  </div>
  ${storiesHTML}
</div>
</body>
</html>`;
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function CahierLecture() {
  const [, setLocation] = useLocation();
  const [allOpen, setAllOpen] = useState(false);

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const html = genererHTML();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "cahier-lecture-10-histoires.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 print:bg-white">

      {/* Barre d'outils */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b shadow-sm print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <Button variant="ghost" onClick={() => setLocation("/student-dashboard")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />Retour
          </Button>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" onClick={() => setAllOpen(o => !o)} className="gap-2" data-testid="btn-tout-ouvrir">
              <BookOpen className="w-4 h-4" />
              {allOpen ? "Replier tout" : "Tout déplier"}
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2" data-testid="btn-imprimer">
              <Printer className="w-4 h-4" />Imprimer
            </Button>
            <Button onClick={handleDownload} className="gap-2 bg-amber-600 hover:bg-amber-700" data-testid="btn-telecharger">
              <Download className="w-4 h-4" />Télécharger HTML interactif
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 print:py-4 print:px-6 print:max-w-none">

        {/* En-tête */}
        <div className="text-center space-y-3 pb-4">
          <h1 className="text-3xl font-bold text-amber-700 dark:text-amber-400 print:text-black">
            Cahier de lecture — 10 histoires narratives
          </h1>
          <p className="text-muted-foreground text-sm print:text-gray-600">
            Schéma narratif québécois · Questions différenciées · 5 compréhension · 2 inférence · 1 réaction · 1 jugement · 1–2 grammaire
          </p>
          <div className="flex items-center gap-4 justify-center flex-wrap mt-3">
            {[["Nom :", "w-52"], ["Groupe :", "w-24"], ["Date :", "w-32"]].map(([lbl, w]) => (
              <div key={lbl} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground print:text-black">{lbl}</span>
                <input type="text" placeholder="__________________________"
                  className={`border-b border-input bg-transparent text-sm focus:outline-none focus:border-amber-500 ${w} print:border-black`} />
              </div>
            ))}
          </div>
        </div>

        {/* Légende */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Types de questions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(Object.entries(TYPE_META) as [QuestionBloc["type"], typeof TYPE_META[QuestionBloc["type"]]][]).map(([type, m]) => (
              <div key={type} className={`rounded-lg border-2 ${m.border} ${m.bg} p-3`}>
                <div className={`text-xs font-bold ${m.text} mb-1`}>{m.label}</div>
                <div className="text-xs text-muted-foreground leading-snug">
                  {type === "comprehension" && "Repérer l'information explicite"}
                  {type === "inference" && "Déduire ce qui est implicite"}
                  {type === "reaction" && "Réagir personnellement"}
                  {type === "jugement" && "Évaluer et défendre une position"}
                  {type === "grammaire" && "Analyser la langue et les procédés"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note sur le téléchargement */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3 items-start print:hidden">
          <Download className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Téléchargement interactif disponible</p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              Le bouton <strong>Télécharger HTML interactif</strong> génère un fichier autonome (.html) que tu peux ouvrir dans n'importe quel navigateur, sans connexion internet. Tous les menus déroulants et les zones de réponse fonctionnent localement. Pour sauvegarder en PDF, ouvre le fichier et utilise <em>Fichier → Imprimer → Enregistrer en PDF</em>.
            </p>
          </div>
        </div>

        {/* Histoires */}
        {HISTOIRES.map(h => (
          <CarteHistoire key={h.id} histoire={h} />
        ))}
      </div>

      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          .print\\:hidden { display: none !important; }
          .print\\:block  { display: block !important; }
          select, textarea, input { border: 1px solid #999 !important; background: white !important; }
          textarea { min-height: 100px !important; }
        }
      `}</style>
    </div>
  );
}
