import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, TrendingUp } from "lucide-react";

interface StudentReport {
  id: string;
  firstName: string;
  lastName: string;
  totalCorrect: number;
  totalAttempts: number;
  averageAccuracy: number;
  coursesCompleted: number;
  totalCourses: number;
  progressByCategory: {
    [key: string]: number;
  };
}

export default function TeacherReports() {
  const [, setLocation] = useLocation();
  const [reports, setReports] = useState<StudentReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLocation("/");
          return;
        }

        const res = await fetch(`/api/teachers/${userId}/reports`, {
          credentials: "include",
        });

        if (res.ok) {
          setReports(await res.json());
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [setLocation]);

  const handleDownloadReport = (studentId: string, studentName: string) => {
    const student = reports.find((r) => r.id === studentId);
    if (!student) return;

    const csv = `
Rapport de Progression - ${studentName}
Date: ${new Date().toLocaleDateString("fr-FR")}

Statistiques Globales:
Réponses Correctes: ${student.totalCorrect}/${student.totalAttempts}
Précision Moyenne: ${student.averageAccuracy}%
Cours Complétés: ${student.coursesCompleted}/${student.totalCourses}

Progression par Catégorie:
${Object.entries(student.progressByCategory)
  .map(([category, progress]) => `${category}: ${progress}%`)
  .join("\n")}
    `.trim();

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `rapport_${studentName.replace(/\s/g, "_")}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chargement des rapports...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/teacher-dashboard")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              Rapports de Progression
            </h1>
            <p className="text-sm text-muted-foreground">
              Suivi détaillé de vos élèves
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {reports.map((report) => (
            <Card key={report.id} className="p-6" data-testid={`card-report-${report.id}`}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {report.firstName} {report.lastName}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDownloadReport(
                        report.id,
                        `${report.firstName} ${report.lastName}`
                      )
                    }
                    data-testid={`button-download-${report.id}`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger CSV
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Précision</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {report.averageAccuracy}%
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Réponses Correctes</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {report.totalCorrect}/{report.totalAttempts}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Cours Complétés</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {report.coursesCompleted}/{report.totalCourses}
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Taux de Complétion</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {Math.round(
                        (report.coursesCompleted / report.totalCourses) * 100
                      )}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Progression par Catégorie
                </h3>
                <div className="space-y-3">
                  {Object.entries(report.progressByCategory).map(
                    ([category, progress]) => (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{category}</span>
                          <span className="text-muted-foreground">{progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
