import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Target, Award, ArrowRight, Sparkles } from "lucide-react";
import teacherIllustration from "@assets/u6899119312_digital_textured_cartoon_illustration_in_the_styl_5b5f7c74-e8b9-4331-959e-96ce7e0b1e08_2_1764043247801.png";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-200 dark:border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-amber-700 dark:text-amber-400" />
            <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              Français Adaptation scolaire
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
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Plateforme d'apprentissage innovante</span>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 dark:from-amber-400 dark:via-orange-300 dark:to-yellow-300 bg-clip-text text-transparent">
                Maîtrisez le Français avec Plaisir
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
                Une plateforme complète pour apprendre la grammaire, l'orthographe, la conjugaison et développer vos compétences en lecture et écriture.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setLocation("/auth?mode=register")}
                className="gap-2 bg-amber-700 hover:bg-amber-800 text-white"
                data-testid="button-get-started"
              >
                Commencer maintenant
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img 
              src={teacherIllustration} 
              alt="Professeur de français" 
              className="max-w-sm w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-amber-900">Pourquoi choisir Français Adaptation scolaire?</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Une plateforme conçue spécialement pour l'apprentissage du français en adaptation scolaire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 hover-elevate transition-all bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-900/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-400" />
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
          <Card className="p-6 hover-elevate transition-all bg-white dark:bg-slate-800 border-orange-200 dark:border-orange-900/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-700 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Exercices Pratiques</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Apprenez en pratiquant avec des exercices interactifs et engageants
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 hover-elevate transition-all bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-900/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-700 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Suivi de Progrès</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visualisez votre progression et célébrez vos succès avec des badges
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 hover-elevate transition-all bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-900/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Pour Tous</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
          <h2 className="text-4xl font-bold mb-4 text-amber-900">Ce que vous allez apprendre</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Des contenus éducatifs structurés et progressifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-8 text-center hover-elevate bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-900/30">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-bold mb-2 text-amber-900">Grammaire</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Les noms, verbes, adjectifs, pronoms et prépositions expliqués simplement
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate bg-white dark:bg-slate-800 border-orange-200 dark:border-orange-900/30">
            <div className="text-4xl mb-3">✏️</div>
            <h3 className="text-xl font-bold mb-2 text-orange-900">Orthographe</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Maîtrisez l'écriture correcte des mots et les règles essentielles
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-900/30">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="text-xl font-bold mb-2 text-yellow-900">Conjugaison</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprenez comment conjuguer les verbes aux différents temps
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-900/30">
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-xl font-bold mb-2 text-amber-900">Lecture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Lisez des textes variés et améliorez votre compréhension
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate bg-white dark:bg-slate-800 border-orange-200 dark:border-orange-900/30">
            <div className="text-4xl mb-3">✍️</div>
            <h3 className="text-xl font-bold mb-2 text-orange-900">Écriture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Développez vos compétences en expression écrite et créativité
            </p>
          </Card>

          <Card className="p-8 text-center hover-elevate bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-900/30">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2 text-yellow-900">Progrès</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Suivez votre évolution et identifiez les domaines à améliorer
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 dark:from-amber-900 dark:via-orange-900 dark:to-yellow-900 text-white py-20 mb-0">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer votre apprentissage?</h2>
          <p className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous maintenant et accédez à tous les cours, exercices et ressources pour maîtriser le français
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation("/auth?mode=login")}
              className="bg-white text-amber-700 hover:bg-amber-50 font-semibold"
              data-testid="button-login-cta"
            >
              Se connecter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-amber-200 dark:border-amber-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                <span className="text-lg font-bold text-amber-700 dark:text-amber-400">Français Actif</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Votre compagnon d'apprentissage du français pour une réussite garantie
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-amber-900">Plateforme</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-amber-700 transition">À propos</a></li>
                <li><a href="#" className="hover:text-amber-700 transition">Caractéristiques</a></li>
                <li><a href="#" className="hover:text-amber-700 transition">Tarification</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-amber-900">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-amber-700 transition">Aide</a></li>
                <li><a href="#" className="hover:text-amber-700 transition">Contact</a></li>
                <li><a href="#" className="hover:text-amber-700 transition">Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-200 dark:border-amber-900/30 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Français Actif. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
