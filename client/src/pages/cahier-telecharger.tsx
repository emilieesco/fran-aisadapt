import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, Check, ArrowLeft } from "lucide-react";
import { HISTOIRES, type QuestionBloc } from "@/data/histoires";
import fleurs from "@assets/u6899119312_digital_textured_cartoon_illustration_in_the_styl__1777161514454.png";

// ── Génération du HTML autonome complet ──────────────────────────────────────
function genererHTML(): string {
  const badges: Record<string, string> = {
    comprehension: "badge-c", inference: "badge-i",
    reaction: "badge-r", jugement: "badge-j", grammaire: "badge-g",
  };
  const blocs: Record<string, string> = {
    comprehension: "bloc-c", inference: "bloc-i",
    reaction: "bloc-r", jugement: "bloc-j", grammaire: "bloc-g",
  };
  const labels: Record<string, string> = {
    comprehension: "Compréhension", inference: "Inférence",
    reaction: "Réaction personnelle", jugement: "Jugement critique", grammaire: "Grammaire",
  };

  const storiesHTML = HISTOIRES.map(h => {
    const esc = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const [first, ...rest] = h.texte;
    const texteHTML = [
      `<p><span class="dropcap">${first.charAt(0)}</span>${esc(first.slice(1))}</p>`,
      ...rest.map(p => `<p>${esc(p)}</p>`)
    ].join("\n");

    const qHTML = h.questions.map((bloc, bi) => {
      const uid = `h${h.id}b${bi}`;
      const opts = bloc.questions.map((q, qi) =>
        `<option value="${esc(q)}">${String.fromCharCode(65+qi)}. ${esc(q)}</option>`
      ).join("");
      return `
<div class="bloc ${blocs[bloc.type]}">
  <div><span class="badge ${badges[bloc.type]}">${labels[bloc.type]}</span></div>
  <div class="bloc-label">${esc(bloc.label)}</div>
  <label class="field-label" for="${uid}-sel">Choisis ta question :</label>
  <select id="${uid}-sel" onchange="
    var d=document.getElementById('${uid}-qshow');
    d.textContent=this.value;
    d.style.display=this.value?'block':'none';
  ">
    <option value="">— Sélectionne une question —</option>
    ${opts}
  </select>
  <div id="${uid}-qshow" class="selected-q" style="display:none"></div>
  <label class="field-label" for="${uid}-rep">Ta réponse :</label>
  <textarea id="${uid}-rep" rows="7" placeholder="Écris ta réponse ici en phrases complètes…"
    oninput="document.getElementById('${uid}-cnt').textContent=this.value.length+'\u00a0car.'"></textarea>
  <div id="${uid}-cnt" class="charcount">0 car.</div>
</div>`;
    }).join("\n");

    return `
<div class="story" id="histoire-${h.id}">
  <div class="story-header">
    <div class="story-num">Histoire ${h.id}\u00a0/\u00a010</div>
    <div class="story-title">${esc(h.titre)}</div>
    <div class="story-sub">${esc(h.sousTitre)}</div>
  </div>
  <div class="story-text">${texteHTML}</div>
  <div class="questions">
    <div class="q-section-title">Questions \u2014 ${esc(h.titre)}</div>
    ${qHTML}
  </div>
</div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cahier de lecture \u2014 Histoires du Qu\u00e9bec</title>
<style>
/* ── Reset ── */
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Georgia,'Times New Roman',serif;font-size:11.5pt;color:#1a1a1a;background:#f5f7f2;line-height:1.7}

/* ── Couverture ── */
.cover{
  min-height:100vh;
  display:flex;flex-direction:column;
  background:#1a3a20;
  position:relative;overflow:hidden;
}
.cover-img{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;object-position:center;
  opacity:.55;
}
.cover-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(10,35,15,.35) 0%,rgba(10,35,15,.65) 55%,rgba(8,28,12,.92) 100%);
}
.cover-top{
  position:relative;z-index:2;
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 40px 40px;text-align:center;
}
.cover-chip{
  display:inline-block;
  border:1.5px solid rgba(255,255,255,.45);
  background:rgba(255,255,255,.12);
  color:#fff;font-size:9.5pt;letter-spacing:.18em;text-transform:uppercase;
  padding:5px 18px;border-radius:30px;margin-bottom:22px;
}
.cover-title{
  font-size:42pt;font-weight:bold;color:#fff;
  text-shadow:0 3px 22px rgba(0,0,0,.55);line-height:1.15;margin-bottom:8px;
}
.cover-title .gold{color:#f6c843}
.cover-sub{
  font-size:13pt;color:rgba(255,255,255,.88);font-style:italic;
  text-shadow:0 1px 10px rgba(0,0,0,.45);margin-bottom:28px;
}
.cover-divider{display:flex;align-items:center;gap:12px;margin-bottom:0}
.cover-divider-line{height:1px;width:60px;background:rgba(255,255,255,.38)}
.cover-dot{width:8px;height:8px;border-radius:50%;background:#f6c843;opacity:.8}

/* ── Cartouche ── */
.cover-bottom{
  position:relative;z-index:2;
  background:rgba(245,247,242,.97);
  padding:36px 48px 40px;
}
.cartouche{
  max-width:700px;margin:0 auto;
  border:2px solid #6aad6a;border-radius:10px;
  background:#fff;padding:28px 36px;
}
.cartouche-title{
  text-align:center;font-size:9pt;font-weight:bold;
  letter-spacing:.15em;text-transform:uppercase;
  color:#2d7a2d;margin-bottom:20px;
}
.field-row{display:flex;align-items:flex-end;gap:12px;margin-bottom:16px}
.field-row label{font-size:10pt;color:#444;min-width:130px;white-space:nowrap}
.field-line{
  flex:1;border:none;border-bottom:1.5px solid #6aad6a;
  font-size:10.5pt;font-family:inherit;outline:none;
  background:transparent;padding:2px 4px;color:#1a1a1a;
}
.field-line:focus{border-bottom-color:#2d7a2d}

/* ── L\xe9gende ── */
.legend{max-width:700px;margin:20px auto 0;display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.leg{border-radius:6px;border-width:1.5px;border-style:solid;padding:8px 10px;font-size:8.5pt}
.leg strong{display:block;font-size:8pt;margin-bottom:3px}
.leg-c{background:#eff6ff;border-color:#93c5fd;color:#1e40af}
.leg-i{background:#f5f3ff;border-color:#c4b5fd;color:#5b21b6}
.leg-r{background:#ecfdf5;border-color:#6ee7b7;color:#065f46}
.leg-j{background:#fef2f2;border-color:#fca5a5;color:#991b1b}
.leg-g{background:#fffbeb;border-color:#fcd34d;color:#78350f}
.consigne{
  max-width:700px;margin:16px auto 0;
  border-left:3.5px solid #6aad6a;padding:8px 16px;
  font-size:9.5pt;color:#444;font-style:italic;line-height:1.7;
}

/* ── Histoire ── */
.story{
  max-width:820px;margin:48px auto;
  background:#fff;border:1px solid #d4e8d4;border-radius:8px;
  overflow:hidden;page-break-before:always;
}
.story:first-of-type{page-break-before:auto}
.story-header{
  background:linear-gradient(135deg,#2d6a2d,#e07b18);
  padding:22px 28px;
}
.story-num{
  display:inline-block;
  background:rgba(255,255,255,.2);color:#fff;
  font-size:8.5pt;font-weight:bold;padding:2px 12px;border-radius:20px;margin-bottom:8px;
}
.story-title{font-size:17pt;font-weight:bold;color:#fff;margin-bottom:4px}
.story-sub{font-size:9.5pt;color:rgba(255,255,255,.85);font-style:italic}
.story-text{padding:22px 28px;border-bottom:1px solid #e5f0e5;line-height:2}
.story-text p{margin-bottom:16px;font-size:11pt;text-align:justify}
.dropcap{float:left;font-size:38pt;font-weight:bold;color:#2d6a2d;line-height:.8;margin-right:5px;margin-top:5px}

/* ── Questions ── */
.questions{padding:18px 28px 32px}
.q-section-title{
  font-size:11.5pt;font-weight:bold;color:#1a3a1a;
  border-top:1.5px solid #d4e8d4;padding-top:14px;margin-bottom:16px;
}
.bloc{border-radius:6px;padding:14px 16px;margin-bottom:14px;border-width:2px;border-style:solid}
.bloc-c{background:#eff6ff;border-color:#93c5fd}
.bloc-i{background:#f5f3ff;border-color:#c4b5fd}
.bloc-r{background:#ecfdf5;border-color:#6ee7b7}
.bloc-j{background:#fef2f2;border-color:#fca5a5}
.bloc-g{background:#fffbeb;border-color:#fcd34d}
.badge{
  font-size:7.5pt;font-weight:bold;padding:2px 9px;
  border-radius:4px;border-width:1px;border-style:solid;display:inline-block;margin-bottom:6px;
}
.badge-c{background:#dbeafe;border-color:#93c5fd;color:#1e40af}
.badge-i{background:#ede9fe;border-color:#c4b5fd;color:#5b21b6}
.badge-r{background:#d1fae5;border-color:#6ee7b7;color:#065f46}
.badge-j{background:#fee2e2;border-color:#fca5a5;color:#991b1b}
.badge-g{background:#fef3c7;border-color:#fcd34d;color:#78350f}
.bloc-label{font-size:9.5pt;font-weight:600;color:#374151;margin-bottom:10px}
.field-label{display:block;font-size:8.5pt;color:#666;font-weight:600;margin-bottom:4px;font-family:Arial,sans-serif}
select{
  width:100%;font-size:10pt;padding:7px 10px;
  border:1.5px solid #d1d5db;border-radius:5px;
  background:#fff;margin-bottom:10px;
  font-family:Georgia,serif;cursor:pointer;
}
select:focus{outline:none;border-color:#6aad6a}
.selected-q{
  font-style:italic;font-size:9.5pt;
  background:rgba(255,255,255,.75);border:1px solid #e5e7eb;
  border-radius:5px;padding:7px 10px;margin-bottom:10px;
  min-height:30px;color:#333;
}
textarea{
  width:100%;font-size:10.5pt;padding:8px 10px;
  border:1.5px solid #d1d5db;border-radius:5px;
  resize:vertical;font-family:Georgia,serif;
  min-height:110px;background:#fff;
  line-height:1.9;
}
textarea:focus{outline:none;border-color:#6aad6a}
.charcount{text-align:right;font-size:8pt;color:#9ca3af;margin-top:4px;font-family:Arial,sans-serif}

/* ── Navigation rapide ── */
.nav-bar{
  position:sticky;top:0;z-index:100;
  background:rgba(245,247,242,.97);backdrop-filter:blur(6px);
  border-bottom:1px solid #d4e8d4;
  padding:10px 28px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;
}
.nav-bar a{
  font-size:8.5pt;color:#2d6a2d;text-decoration:none;
  padding:3px 10px;border:1px solid #6aad6a;border-radius:20px;
  background:#fff;font-family:Arial,sans-serif;
}
.nav-bar a:hover{background:#ecfdf5}
.nav-label{font-size:8.5pt;color:#555;font-family:Arial,sans-serif;margin-right:4px}

/* ── Impression ── */
@media print{
  body{background:#fff;font-size:10.5pt}
  .nav-bar{display:none}
  .story{border:1px solid #bbb;border-radius:0;margin:0;page-break-before:always}
  .cover{page-break-after:always;min-height:100vh}
  select,textarea,.field-line{border-color:#999!important;background:#fff!important}
  textarea{min-height:100px!important}
  @page{margin:1.8cm;size:A4}
}
</style>
</head>
<body>

<!-- ══ COUVERTURE ══════════════════════════════════════════════════════════ -->
<div class="cover">
  <img class="cover-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/1px-Culinary_fruits_front_view.jpg" alt="" style="display:none">
  <!-- fond de couleur en fallback si image non disponible -->
  <div class="cover-overlay"></div>
  <div class="cover-top">
    <div class="cover-chip">Cahier de lecture</div>
    <div class="cover-title">Histoires du<br><span class="gold">Qu\u00e9bec</span></div>
    <div class="cover-sub">Dix r\u00e9cits pour explorer, comprendre et r\u00e9agir</div>
    <div class="cover-divider">
      <div class="cover-divider-line"></div>
      <div class="cover-dot"></div>
      <div class="cover-divider-line"></div>
    </div>
  </div>
  <div class="cover-bottom">
    <div class="cartouche">
      <div class="cartouche-title">Informations de l\u2019\u00e9l\u00e8ve</div>
      <div class="field-row"><label>Nom et pr\u00e9nom :</label><input type="text" class="field-line" placeholder="________________________________"></div>
      <div class="field-row"><label>Groupe\u00a0/ classe :</label><input type="text" class="field-line" placeholder="________________"></div>
      <div class="field-row"><label>Enseignant(e) :</label><input type="text" class="field-line" placeholder="________________________________"></div>
      <div class="field-row"><label>Ann\u00e9e scolaire :</label><input type="text" class="field-line" placeholder="__________"></div>
    </div>
    <div class="legend">
      <div class="leg leg-c"><strong>Compr\u00e9hension</strong>Repérer l\u2019information explicite</div>
      <div class="leg leg-i"><strong>Inf\u00e9rence</strong>D\u00e9duire ce qui est implicite</div>
      <div class="leg leg-r"><strong>R\u00e9action</strong>R\u00e9agir personnellement</div>
      <div class="leg leg-j"><strong>Jugement critique</strong>\u00c9valuer et d\u00e9fendre une position</div>
      <div class="leg leg-g"><strong>Grammaire</strong>Analyser la langue et les proc\u00e9d\u00e9s</div>
    </div>
    <div class="consigne">Pour chaque bloc de questions, choisis la question qui t\u2019inspire dans le menu d\u00e9roulant, puis d\u00e9veloppe ta r\u00e9ponse en phrases compl\u00e8tes. Appuie-toi toujours sur des \u00e9l\u00e9ments pr\u00e9cis du texte.</div>
  </div>
</div>

<!-- ══ BARRE DE NAVIGATION ════════════════════════════════════════════════ -->
<div class="nav-bar">
  <span class="nav-label">Aller \u00e0 :</span>
  ${HISTOIRES.map(h => `<a href="#histoire-${h.id}">H${h.id}\u00a0\u2014 ${h.titre.split(" ").slice(0,3).join(" ")}\u2026</a>`).join("\n  ")}
</div>

<!-- ══ HISTOIRES ══════════════════════════════════════════════════════════ -->
${storiesHTML}

</body>
</html>`;
}

// ── Page minimale ─────────────────────────────────────────────────────────────
export default function CahierTelecharger() {
  const [, setLocation] = useLocation();
  const [done, setDone] = useState(false);

  const telecharger = () => {
    const html = genererHTML();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "cahier-lecture-histoires-du-quebec.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDone(true);
  };

  // Téléchargement automatique au chargement de la page
  useEffect(() => { telecharger(); }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${fleurs})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Voile */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,40,15,.5), rgba(8,30,12,.8))" }} />

      <div className="relative z-10 text-center max-w-md mx-auto px-6 space-y-6">
        {/* Icône */}
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${done ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}>
          {done
            ? <Check className="w-10 h-10 text-white" />
            : <Download className="w-10 h-10 text-white" />
          }
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white drop-shadow">
            {done ? "Téléchargement terminé !" : "Préparation du cahier…"}
          </h1>
          <p className="text-white/80 text-sm leading-relaxed">
            {done
              ? "Ouvre le fichier .html dans ton navigateur. Pour l'enregistrer en PDF, fais Imprimer → Enregistrer en PDF."
              : "Génération du cahier interactif en cours…"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {done && (
            <Button
              onClick={telecharger}
              className="bg-amber-500 hover:bg-amber-600 text-white gap-2 shadow-lg"
              data-testid="btn-retelecharger"
            >
              <Download className="w-4 h-4" />
              Télécharger à nouveau
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setLocation("/student-dashboard")}
            className="bg-white/15 border-white/40 text-white hover:bg-white/25 gap-2"
            data-testid="btn-retour-dl"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au tableau de bord
          </Button>
        </div>

        <p className="text-white/50 text-xs">
          Cahier de lecture — 10 histoires · 11 blocs de questions chacune
        </p>
      </div>
    </div>
  );
}
