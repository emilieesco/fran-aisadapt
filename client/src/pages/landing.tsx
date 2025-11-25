import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Target, Award, ArrowRight, Sparkles } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Français Actif
            </span>
          </div>
          <div className="flex gap-3">
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
        <div className="space-y-8 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Plateforme d'apprentissage innovante</span>
          </div>

          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Maîtrisez le Français avec Plaisir
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Une plateforme complète pour apprendre la grammaire, l'orthographe, la conjugaison et développer vos compétences en lecture et écriture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => setLocation("/auth?mode=register")}
              className="gap-2"
              data-testid="button-get-started"
            >
              Commencer maintenant
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/auth?mode=login")}
              data-testid="button-login-hero"
            >
              Se connecter
            </Button>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 aspect-video flex items-center justify-center">
            <div className="text-center space-y-4">
              <BookOpen className="w-24 h-24 text-blue-400 mx-auto opacity-50" />
              <p className="text-muted-foreground">Votre espace d'apprentissage personnalisé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Pourquoi choisir Français Actif?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une plateforme conçue spécialement pour l'apprentissage du français en adaptation scolaire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 hover-elevate transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Cours Complets</h3>
                <p className="text-sm text-muted-foreground">
                  Grammaire, orthographe, conjugaison - tous les fondamentaux couverts
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="p-6 hover-elevate transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Exercices Pratiques</h3>
                <p className="text-sm text-muted-foreground">
                  Apprenez en pratiquant avec des exercices interactifs et engageants
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 hover-elevate transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Suivi de Progrès</h3>
                <p className="text-sm text-muted-foreground">
                  Visualisez votre progression et célébrez vos succès avec des badges
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 hover-elevate transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Pour Tous</h3>
                <p className="text-sm text-muted-foreground">
                  Plateforme adaptée à tous les niveaux d'apprentissage et de compréhension
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Ce que vous allez apprendre</h2>
          <p className="text-muted-foreground text-lg">
            Des contenus éducatifs structurés et progressifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-8 text-center hover-elevate">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">📚</div>
            <h3 className="text-xl font-bold mb-2">Grammaire</h3>
            <p className="text-muted-foreground">
              Les noms, verbes, adjectifs, pronoms et prépositions expliqués simplement
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">✏️</div>
            <h3 className="text-xl font-bold mb-2">Orthographe</h3>
            <p className="text-muted-foreground">
              Maîtrisez l'écriture correcte des mots et les règles essentielles
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3">🔄</div>
            <h3 className="text-xl font-bold mb-2">Conjugaison</h3>
            <p className="text-muted-foreground">
              Comprenez comment conjuguer les verbes aux différents temps
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-3">📖</div>
            <h3 className="text-xl font-bold mb-2">Lecture</h3>
            <p className="text-muted-foreground">
              Lisez des textes variés et améliorez votre compréhension
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-3">✍️</div>
            <h3 className="text-xl font-bold mb-2">Écriture</h3>
            <p className="text-muted-foreground">
              Développez vos compétences en expression écrite et créativité
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Progrès</h3>
            <p className="text-muted-foreground">
              Suivez votre évolution et identifiez les domaines à améliorer
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 text-white py-20 mb-0">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer votre apprentissage?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous maintenant et accédez à tous les cours, exercices et ressources pour maîtriser le français
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setLocation("/auth?mode=register")}
              data-testid="button-signup-cta"
            >
              Créer mon compte gratuitement
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/auth?mode=login")}
              className="border-white text-white hover:bg-white/20"
              data-testid="button-login-cta"
            >
              J'ai déjà un compte
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-bold">Français Actif</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Votre compagnon d'apprentissage du français pour une réussite garantie
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">À propos</a></li>
                <li><a href="#" className="hover:text-foreground transition">Caractéristiques</a></li>
                <li><a href="#" className="hover:text-foreground transition">Tarification</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Aide</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition">Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Français Actif. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
