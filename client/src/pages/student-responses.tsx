import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";

interface EnrichedResponse {
  id: string;
  studentId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean | null;
  createdAt: string;
  question: {
    id: string;
    title: string;
    text: string;
    type: string;
  };
  exercise: {
    id: string;
    title: string;
  };
  course: {
    id: string;
    title: string;
    category: string;
  };
}

export default function StudentResponses() {
  const [, setLocation] = useLocation();
  const [studentName, setStudentName] = useState("");
  const studentId = new URLSearchParams(window.location.search).get("studentId");
  const teacherId = localStorage.getItem("userId");

  const { data: responses = [], isLoading } = useQuery({
    queryKey: [`/api/teachers/${teacherId}/students/${studentId}/responses`],
    enabled: !!teacherId && !!studentId,
  });

  useEffect(() => {
    if (!teacherId || !studentId) {
      setLocation("/teacher-dashboard");
    }
  }, [teacherId, studentId, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chargement des réponses...</p>
      </div>
    );
  }

  // Group responses by course/exercise
  const groupedResponses: { [key: string]: EnrichedResponse[] } = {};
  responses.forEach((response: EnrichedResponse) => {
    const key = `${response.course.id}|${response.exercise.id}`;
    if (!groupedResponses[key]) {
      groupedResponses[key] = [];
    }
    groupedResponses[key].push(response);
  });

  const getStatusIcon = (isCorrect: boolean | null) => {
    if (isCorrect === true) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (isCorrect === false) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    } else {
      return <Clock className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/teacher-reports")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              Réponses de l'Élève
            </h1>
            <p className="text-sm text-muted-foreground">
              Toutes les réponses soumises
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {Object.entries(groupedResponses).map(([key, courseResponses]) => {
            const firstResponse = courseResponses[0];
            if (!firstResponse.course || !firstResponse.exercise) {
              return null;
            }

            return (
              <Card key={key} className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-foreground mb-2">
                    {firstResponse.course.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {firstResponse.exercise.title}
                  </p>
                </div>

                <div className="space-y-4">
                  {courseResponses.map((response, idx) => (
                    <div
                      key={response.id}
                      className="border border-border rounded-lg p-4 bg-muted/20"
                      data-testid={`response-item-${response.id}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-semibold text-foreground">
                            Question {idx + 1}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {response.question.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(response.isCorrect)}
                          <span className="text-sm font-medium">
                            {response.isCorrect === true
                              ? "Correct"
                              : response.isCorrect === false
                                ? "Incorrect"
                                : "En attente"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 rounded p-3 mb-3">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Réponse de l'élève:
                        </p>
                        <p className="text-foreground whitespace-pre-wrap">
                          {response.answer}
                        </p>
                      </div>

                      {response.question.type === "multiple_choice" && (
                        <div className="text-xs text-muted-foreground">
                          <p>Type: Question à choix multiples</p>
                        </div>
                      )}

                      {response.question.type === "text" && (
                        <div className="text-xs text-muted-foreground">
                          <p>Type: Réponse texte libre</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}

          {responses.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Aucune réponse trouvée pour cet élève.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
