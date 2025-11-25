import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (mode === "register") {
      setIsLogin(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = isLogin
        ? { username, password }
        : { username, password, firstName, lastName, role };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Erreur lors de l'authentification");
        return;
      }

      const data = await res.json();
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userRole", data.role);

      setLocation(data.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Back Button */}
      <div className="pt-4 px-4">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="gap-2"
          data-testid="button-back-auth"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Button>
      </div>

      {/* Auth Form */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2 text-blue-600 dark:text-blue-400">
              {isLogin ? "Connexion" : "Inscription"}
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              {isLogin
                ? "Connectez-vous à votre compte"
                : "Créez votre compte gratuitement"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  data-testid="input-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  data-testid="input-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nom de famille</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom de famille"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Rôle</Label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as "teacher" | "student")}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                    >
                      <option value="student">Élève</option>
                      <option value="teacher">Enseignant</option>
                    </select>
                  </div>
                </>
              )}

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}

              <Button
                type="submit"
                className="w-full"
                data-testid="button-submit"
              >
                {isLogin ? "Se connecter" : "S'inscrire"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin
                  ? "Pas encore de compte? "
                  : "Vous avez déjà un compte? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  data-testid="button-toggle-mode"
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
