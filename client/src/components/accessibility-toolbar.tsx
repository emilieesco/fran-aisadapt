import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Volume2, Pause, Minus, Plus, Accessibility, X,
  BookOpen, AlignJustify, Gauge, Lightbulb, Eye,
  ChevronRight,
} from "lucide-react";

// ─── Utilitaire : dispatche un événement pour synchroniser les composants ─────
export function dispatchA11yChange() {
  window.dispatchEvent(new Event("a11y-change"));
}

// ─── Hook : lire / écouter un paramètre d11y depuis le DOM ────────────────────
function useA11yDataset(key: string, defaultValue: string) {
  const [value, setValue] = useState<string>(() => {
    try { return localStorage.getItem(`a11y-${key}`) ?? defaultValue; } catch { return defaultValue; }
  });

  useEffect(() => {
    const apply = () => {
      const stored = (() => { try { return localStorage.getItem(`a11y-${key}`) ?? defaultValue; } catch { return defaultValue; } })();
      setValue(stored);
      if (key === "dyslexia") {
        document.documentElement.dataset.dyslexia = stored;
      } else if (key === "line-spacing") {
        if (stored === "normal") delete document.documentElement.dataset.lineSpacing;
        else document.documentElement.dataset.lineSpacing = stored;
      } else if (key === "font-size") {
        document.documentElement.setAttribute("data-font-size", stored);
      }
    };
    apply();
    window.addEventListener("a11y-change", apply);
    window.addEventListener("storage", apply);
    return () => { window.removeEventListener("a11y-change", apply); window.removeEventListener("storage", apply); };
  }, [key, defaultValue]);

  const set = (v: string) => {
    try { localStorage.setItem(`a11y-${key}`, v); } catch {}
    setValue(v);
    if (key === "dyslexia") {
      document.documentElement.dataset.dyslexia = v;
    } else if (key === "line-spacing") {
      if (v === "normal") delete document.documentElement.dataset.lineSpacing;
      else document.documentElement.dataset.lineSpacing = v;
    } else if (key === "font-size") {
      document.documentElement.setAttribute("data-font-size", v);
    }
    dispatchA11yChange();
  };

  return [value, set] as const;
}

// ─── ReadAloudButton — lit un texte précis à voix haute ──────────────────────
export function ReadAloudButton({
  text, label, variant = "ghost", className = "",
}: {
  text: string; label?: string; variant?: "ghost" | "outline" | "secondary"; className?: string;
}) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    window.speechSynthesis.cancel();
    const rate = parseFloat(localStorage.getItem("a11y-tts-rate") ?? "0.88");
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-CA"; utter.rate = rate; utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  if (label) {
    return (
      <Button type="button" variant={variant} size="sm" onClick={handleClick}
        className={`gap-1.5 ${className}`}
        title={speaking ? "Arrêter la lecture" : "Lire à voix haute"}
        data-testid="button-read-aloud"
      >
        {speaking ? <><Pause className="w-3.5 h-3.5" /><span>{label}</span></> : <><Volume2 className="w-3.5 h-3.5" /><span>{label}</span></>}
      </Button>
    );
  }
  return (
    <Button type="button" variant={variant} size="icon" onClick={handleClick}
      title={speaking ? "Arrêter la lecture" : "Lire à voix haute"}
      className={className} data-testid="button-read-aloud"
    >
      {speaking ? <Pause className="w-4 h-4 text-blue-600 dark:text-blue-400" /> : <Volume2 className="w-4 h-4" />}
    </Button>
  );
}

// ─── WordPredictor — suggestions inline pour fill_blank ──────────────────────
export function WordPredictor({
  value, onChange, suggestions,
}: {
  value: string; onChange: (v: string) => void; suggestions: string[];
}) {
  const [predictorActive, setPredictorActive] = useState(() =>
    localStorage.getItem("a11y-predictor") === "1"
  );

  useEffect(() => {
    const handler = () => setPredictorActive(localStorage.getItem("a11y-predictor") === "1");
    window.addEventListener("a11y-change", handler);
    return () => window.removeEventListener("a11y-change", handler);
  }, []);

  const trimmed = value.trim().toLowerCase();

  const visible: string[] = [];
  if (predictorActive && trimmed.length >= 2) {
    const seen = new Set<string>();
    for (const ans of suggestions) {
      // 1. La réponse complète commence par ce qui est tapé
      if (ans.toLowerCase().startsWith(trimmed) && ans.toLowerCase() !== trimmed) {
        if (!seen.has(ans.toLowerCase())) { seen.add(ans.toLowerCase()); visible.push(ans); }
      }
      // 2. Un mot individuel dans la réponse commence par ce qui est tapé
      for (const word of ans.split(/\s+/)) {
        const wl = word.toLowerCase().replace(/[^a-zàâçéèêëîïôùûüÿœæ0-9'-]/g, "");
        if (wl.length >= 2 && wl.startsWith(trimmed) && wl !== trimmed) {
          if (!seen.has(wl)) { seen.add(wl); visible.push(word.replace(/[.,;:!?]$/, "")); }
        }
      }
      if (visible.length >= 6) break;
    }
  }

  if (!predictorActive) return null;

  return (
    <div className="mt-2 min-h-[1.75rem]" data-testid="word-predictor">
      {visible.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {visible.slice(0, 5).map((word, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(word)}
              className="px-2.5 py-0.5 rounded-md text-sm bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 hover-elevate"
              data-testid={`predictor-suggestion-${word}`}
            >
              <ChevronRight className="w-3 h-3 inline mr-0.5 opacity-60" />
              {word}
            </button>
          ))}
        </div>
      ) : (
        trimmed.length >= 2 && (
          <p className="text-xs text-muted-foreground italic">Aucune suggestion pour &laquo;&nbsp;{value}&nbsp;&raquo;</p>
        )
      )}
    </div>
  );
}

// ─── TTS speed levels ─────────────────────────────────────────────────────────
const TTS_LEVELS = [
  { label: "Lente", value: "0.68" },
  { label: "Normale", value: "0.88" },
  { label: "Rapide", value: "1.2" },
];

// ─── Line spacing levels ──────────────────────────────────────────────────────
const SPACING_LEVELS = [
  { label: "Normal", value: "normal" },
  { label: "Grand", value: "large" },
  { label: "Très grand", value: "xl" },
];

// ─── Font size levels ─────────────────────────────────────────────────────────
const FONT_LEVELS = [
  { label: "Normal", value: "normal" },
  { label: "Grand", value: "large" },
  { label: "Très grand", value: "xl" },
];

// ─── Section header ───────────────────────────────────────────────────────────
function Section({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </p>
  );
}

// ─── AccessibilityWidget ──────────────────────────────────────────────────────
export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const [fontValue, setFontValue] = useA11yDataset("font-size", "normal");
  const fontLevel = FONT_LEVELS.findIndex((f) => f.value === fontValue);

  const [dyslexia, setDyslexia] = useA11yDataset("dyslexia", "0");
  const [lineSpacing, setLineSpacing] = useA11yDataset("line-spacing", "normal");

  const [ttsRate, setTtsRate] = useState<string>(() =>
    localStorage.getItem("a11y-tts-rate") ?? "0.88"
  );
  const setTtsRateAndSave = (v: string) => {
    localStorage.setItem("a11y-tts-rate", v);
    setTtsRate(v);
    dispatchA11yChange();
  };

  const [predictorOn, setPredictorOn] = useState(() =>
    localStorage.getItem("a11y-predictor") === "1"
  );
  const togglePredictor = () => {
    const next = !predictorOn;
    localStorage.setItem("a11y-predictor", next ? "1" : "0");
    setPredictorOn(next);
    dispatchA11yChange();
  };

  const [speaking, setSpeaking] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const interval = setInterval(() => {
      if (!window.speechSynthesis.speaking && speaking) setSpeaking(false);
    }, 500);
    return () => clearInterval(interval);
  }, [speaking]);

  useEffect(() => {
    const handleSel = () => {
      const sel = window.getSelection();
      setHasSelection(!!sel && sel.toString().trim().length > 0);
    };
    document.addEventListener("selectionchange", handleSel);
    return () => document.removeEventListener("selectionchange", handleSel);
  }, []);

  const readSelection = () => {
    if (!("speechSynthesis" in window)) return;
    const sel = window.getSelection()?.toString().trim();
    if (!sel) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    window.speechSynthesis.cancel();
    const rate = parseFloat(ttsRate);
    const utter = new SpeechSynthesisUtterance(sel);
    utter.lang = "fr-CA"; utter.rate = rate; utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopReading = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setSpeaking(false); };

  const lineIdx = SPACING_LEVELS.findIndex((s) => s.value === lineSpacing);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <Card className="p-4 w-72 shadow-lg space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-muted-foreground" />
              Accessibilité
            </h3>
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} data-testid="button-accessibility-close">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* ── Mode dyslexie ── */}
          <div className="space-y-2">
            <Section icon={Eye} label="Mode dyslexie" />
            <button
              type="button"
              onClick={() => setDyslexia(dyslexia === "1" ? "0" : "1")}
              data-testid="button-dyslexia-toggle"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                dyslexia === "1"
                  ? "bg-violet-100 dark:bg-violet-900/40 border-violet-400 dark:border-violet-600 text-violet-800 dark:text-violet-200"
                  : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <span>Police Atkinson Hyperlegible</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${dyslexia === "1" ? "bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300" : "bg-secondary text-secondary-foreground"}`}>
                {dyslexia === "1" ? "ON" : "OFF"}
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Police spécialement conçue pour faciliter la lecture. Active aussi l'espacement entre les lettres.
            </p>
          </div>

          {/* ── Taille du texte ── */}
          <div className="space-y-2">
            <Section icon={BookOpen} label="Taille du texte" />
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" disabled={fontLevel === 0}
                onClick={() => setFontValue(FONT_LEVELS[Math.max(0, fontLevel - 1)].value)}
                data-testid="button-font-decrease" title="Réduire">
                <Minus className="w-3 h-3" />
              </Button>
              <span className="flex-1 text-center text-sm font-medium">{FONT_LEVELS[Math.max(0, fontLevel)].label}</span>
              <Button size="icon" variant="outline" disabled={fontLevel >= FONT_LEVELS.length - 1}
                onClick={() => setFontValue(FONT_LEVELS[Math.min(FONT_LEVELS.length - 1, fontLevel + 1)].value)}
                data-testid="button-font-increase" title="Agrandir">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {fontLevel !== 0 && (
              <button className="text-xs text-muted-foreground underline w-full text-center"
                onClick={() => setFontValue("normal")} data-testid="button-font-reset">
                Revenir à la normale
              </button>
            )}
          </div>

          {/* ── Interlignage ── */}
          <div className="space-y-2">
            <Section icon={AlignJustify} label="Interlignage" />
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" disabled={lineIdx === 0}
                onClick={() => setLineSpacing(SPACING_LEVELS[Math.max(0, lineIdx - 1)].value)}
                data-testid="button-spacing-decrease">
                <Minus className="w-3 h-3" />
              </Button>
              <span className="flex-1 text-center text-sm font-medium">{SPACING_LEVELS[Math.max(0, lineIdx)].label}</span>
              <Button size="icon" variant="outline" disabled={lineIdx >= SPACING_LEVELS.length - 1}
                onClick={() => setLineSpacing(SPACING_LEVELS[Math.min(SPACING_LEVELS.length - 1, lineIdx + 1)].value)}
                data-testid="button-spacing-increase">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {lineIdx !== 0 && (
              <button className="text-xs text-muted-foreground underline w-full text-center"
                onClick={() => setLineSpacing("normal")} data-testid="button-spacing-reset">
                Revenir à la normale
              </button>
            )}
          </div>

          {/* ── Vitesse de lecture ── */}
          <div className="space-y-2">
            <Section icon={Gauge} label="Vitesse de lecture" />
            <div className="flex gap-1.5">
              {TTS_LEVELS.map((lvl) => (
                <button key={lvl.value} type="button"
                  onClick={() => setTtsRateAndSave(lvl.value)}
                  data-testid={`button-tts-rate-${lvl.label.toLowerCase()}`}
                  className={`flex-1 text-xs font-medium py-1.5 rounded-md border transition-colors ${
                    ttsRate === lvl.value
                      ? "bg-blue-100 dark:bg-blue-900/40 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Vitesse utilisée pour tous les boutons d'écoute.</p>
          </div>

          {/* ── Lecture à voix haute ── */}
          <div className="space-y-2">
            <Section icon={Volume2} label="Lecture à voix haute" />
            {speaking ? (
              <Button variant="outline" size="sm" onClick={stopReading} className="w-full gap-2" data-testid="button-stop-reading">
                <Pause className="w-4 h-4" />Arrêter la lecture
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={readSelection} disabled={!hasSelection}
                className="w-full gap-2" data-testid="button-read-selection">
                <Volume2 className="w-4 h-4" />
                {hasSelection ? "Lire la sélection" : "Sélectionne du texte d'abord"}
              </Button>
            )}
            <p className="text-xs text-muted-foreground">Sélectionne n'importe quel texte à l'écran, puis clique sur ce bouton.</p>
          </div>

          {/* ── Prédicteur de mots ── */}
          <div className="space-y-2">
            <Section icon={Lightbulb} label="Prédicteur de mots" />
            <button
              type="button"
              onClick={togglePredictor}
              data-testid="button-predictor-toggle"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                predictorOn
                  ? "bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-200"
                  : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <span>Suggestions de mots</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${predictorOn ? "bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300" : "bg-secondary text-secondary-foreground"}`}>
                {predictorOn ? "ON" : "OFF"}
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dans les exercices à trous, propose des mots correspondant à ce que tu écris (après 2 lettres).
            </p>
          </div>
        </Card>
      )}

      {/* Bouton principal */}
      <Button
        size="icon"
        variant={isOpen ? "default" : "outline"}
        onClick={() => setIsOpen((o) => !o)}
        title="Outils d'accessibilité"
        className="rounded-full shadow-lg"
        data-testid="button-accessibility-toggle"
      >
        <Accessibility className="w-5 h-5" />
      </Button>
    </div>
  );
}
