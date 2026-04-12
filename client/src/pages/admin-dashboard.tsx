import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, LogOut, Users, Key, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function adminHeaders() {
  return { "x-admin-id": localStorage.getItem("userId") || "" };
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [label, setLabel] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"codes" | "users">("codes");

  const { data: codes = [], isLoading: codesLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/invite-codes"],
    queryFn: () =>
      fetch("/api/admin/invite-codes", { headers: adminHeaders() }).then((r) => r.json()),
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    queryFn: () =>
      fetch("/api/admin/users", { headers: adminHeaders() }).then((r) => r.json()),
  });

  const createCode = useMutation({
    mutationFn: () =>
      fetch("/api/admin/invite-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...adminHeaders() },
        body: JSON.stringify({ label }),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invite-codes"] });
      setLabel("");
      toast({ title: "Code créé avec succès" });
    },
  });

  const deleteCode = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admin/invite-codes/${id}`, {
        method: "DELETE",
        headers: adminHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invite-codes"] });
      toast({ title: "Code supprimé" });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: adminHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Utilisateur supprimé" });
    },
  });

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setLocation("/auth");
  };

  const teachers = users.filter((u) => u.role === "teacher");
  const students = users.filter((u) => u.role === "student");
  const unusedCodes = codes.filter((c) => !c.usedBy);
  const usedCodes = codes.filter((c) => c.usedBy);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold">Panneau d'administration</h1>
            <p className="text-sm text-muted-foreground">Français Actif</p>
          </div>
          <Button variant="ghost" onClick={logout} className="gap-2" data-testid="button-logout">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{teachers.length}</p>
              <p className="text-sm text-muted-foreground">Enseignants</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{students.length}</p>
              <p className="text-sm text-muted-foreground">Élèves</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{unusedCodes.length}</p>
              <p className="text-sm text-muted-foreground">Codes disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{usedCodes.length}</p>
              <p className="text-sm text-muted-foreground">Codes utilisés</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "codes" ? "default" : "outline"}
            onClick={() => setActiveTab("codes")}
            data-testid="tab-codes"
            className="gap-2"
          >
            <Key className="w-4 h-4" />
            Codes d'invitation
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            data-testid="tab-users"
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Utilisateurs
          </Button>
        </div>

        {/* Codes d'invitation */}
        {activeTab === "codes" && (
          <div className="space-y-6">
            {/* Créer un code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Générer un code d'invitation enseignant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 items-end">
                  <div className="flex-1 min-w-48">
                    <Label htmlFor="label">Description (optionnelle)</Label>
                    <Input
                      id="label"
                      data-testid="input-invite-label"
                      placeholder="Ex: Pour Marie Tremblay"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => createCode.mutate()}
                    disabled={createCode.isPending}
                    data-testid="button-create-code"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Générer un code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Liste des codes */}
            {codesLoading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : codes.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun code créé pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {codes.map((c) => (
                  <Card key={c.id} data-testid={`card-invite-${c.id}`}>
                    <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <code className="bg-muted px-3 py-1 rounded text-sm font-mono font-bold tracking-wider">
                          {c.code}
                        </code>
                        {c.label && (
                          <span className="text-sm text-muted-foreground">{c.label}</span>
                        )}
                        {c.usedBy ? (
                          <Badge variant="secondary">Utilisé</Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-400">
                            Disponible
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!c.usedBy && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => copyCode(c.id, c.code)}
                            data-testid={`button-copy-${c.id}`}
                            title="Copier le code"
                          >
                            {copiedId === c.id ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteCode.mutate(c.id)}
                          data-testid={`button-delete-code-${c.id}`}
                          title="Supprimer le code"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Utilisateurs */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {usersLoading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : (
              <>
                {/* Enseignants */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">Enseignants ({teachers.length})</h2>
                  {teachers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun enseignant.</p>
                  ) : (
                    <div className="space-y-2">
                      {teachers.map((u) => (
                        <Card key={u.id} data-testid={`card-user-${u.id}`}>
                          <CardContent className="p-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium">{u.firstName} {u.lastName}</p>
                              <p className="text-sm text-muted-foreground">@{u.username}</p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteUser.mutate(u.id)}
                              data-testid={`button-delete-user-${u.id}`}
                              title="Supprimer l'utilisateur"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Élèves */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">Élèves ({students.length})</h2>
                  {students.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun élève.</p>
                  ) : (
                    <div className="space-y-2">
                      {students.map((u) => (
                        <Card key={u.id} data-testid={`card-user-${u.id}`}>
                          <CardContent className="p-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium">{u.firstName} {u.lastName}</p>
                              <p className="text-sm text-muted-foreground">@{u.username}</p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteUser.mutate(u.id)}
                              data-testid={`button-delete-user-${u.id}`}
                              title="Supprimer l'utilisateur"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
