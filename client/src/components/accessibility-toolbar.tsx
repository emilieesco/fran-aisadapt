import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, Pause, Minus, Plus, Accessibility, X } from "lucide-react";

// ─── ReadAloudButton ─────────────────────────────────────────────────────────
// Bouton réutilisable dans les exercices pour lire un texte précis à voix haute
export function ReadAloudButton({
  text,
  label,
  variant = "ghost",
  className = "",
}: {
  text: string;
  label?: string;
  variant?: "ghost" | "outline" | "secondary";
  className?: string;
}) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-CA";
    utter.rate = 0.88;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  if (label) {
    return (
      <Button
        type="button"
        variant={variant}
        size="sm"
        onClick={handleClick}
        className={`gap-1.5 ${className}`}
        title={speaking ? "Arrêter la lecture" : "Lire à voix haute"}
        data-testid="button-read-aloud"
      >
        {speaking ? (
          <>
            <Pause className="w-3.5 h-3.5" />
            <span>{label}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5" />
            <span>{label}</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      onClick={handleClick}
      title={speaking ? "Arrêter la lecture" : "Lire à voix haute"}
      className={className}
      data-testid="button-read-aloud"
    >
      {speaking ? (
        <Pause className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </Button>
  );
}

// ─── Niveaux de taille de texte ───────────────────────────────────────────────
const FONT_LEVELS = [
  { label: "Normal", value: "normal" },
  { label: "Grand", value: "large" },
  { label: "Très grand", value: "xl" },
];

// ─── AccessibilityWidget — barre flottante présente sur toute l'application ──
export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontLevel, setFontLevel] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("a11y-font-level");
      return stored ? Math.min(2, Math.max(0, parseInt(stored))) : 0;
    } catch {
      return 0;
    }
  });
  const [speaking, setSpeaking] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  // Appliquer la taille de texte au document
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-font-size",
      FONT_LEVELS[fontLevel].value
    );
    try {
      localStorage.setItem("a11y-font-level", String(fontLevel));
    } catch {}
  }, [fontLevel]);

  // Synchroniser l'état "en train de lire" avec speechSynthesis
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const interval = setInterval(() => {
      if (!window.speechSynthesis.speaking && speaking) {
        setSpeaking(false);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [speaking]);

  // Détecter la sélection de texte
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      setHasSelection(!!sel && sel.toString().trim().length > 0);
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  const readSelection = () => {
    if (!("speechSynthesis" in window)) return;
    const sel = window.getSelection()?.toString().trim();
    if (!sel) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(sel);
    utter.lang = "fr-CA";
    utter.rate = 0.88;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopReading = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <Card className="p-4 w-60 shadow-lg space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm">Accessibilité</h3>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              data-testid="button-accessibility-close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Taille du texte */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Taille du texte
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                disabled={fontLevel === 0}
                onClick={() => setFontLevel((l) => Math.max(0, l - 1))}
                data-testid="button-font-decrease"
                title="Réduire le texte"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="flex-1 text-center text-sm font-medium">
                {FONT_LEVELS[fontLevel].label}
              </span>
              <Button
                size="icon"
                variant="outline"
                disabled={fontLevel === FONT_LEVELS.length - 1}
                onClick={() => setFontLevel((l) => Math.min(FONT_LEVELS.length - 1, l + 1))}
                data-testid="button-font-increase"
                title="Agrandir le texte"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {fontLevel !== 0 && (
              <button
                className="text-xs text-muted-foreground underline w-full text-center"
                onClick={() => setFontLevel(0)}
                data-testid="button-font-reset"
              >
                Revenir à la normale
              </button>
            )}
          </div>

          {/* Lecture à voix haute */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Lecture à voix haute
            </p>
            {speaking ? (
              <Button
                variant="outline"
                size="sm"
                onClick={stopReading}
                className="w-full gap-2"
                data-testid="button-stop-reading"
              >
                <Pause className="w-4 h-4" />
                Arrêter la lecture
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={readSelection}
                disabled={!hasSelection}
                className="w-full gap-2"
                data-testid="button-read-selection"
              >
                <Volume2 className="w-4 h-4" />
                {hasSelection ? "Lire la sélection" : "Sélectionne du texte"}
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              Sélectionne n'importe quel texte à l'écran, puis clique sur ce bouton pour l'entendre.
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
