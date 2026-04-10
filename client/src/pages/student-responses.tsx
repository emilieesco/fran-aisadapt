import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle, Clock, Save, MessageSquare } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface EnrichedResponse {
  id: string;
  studentId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean | null;
  teacherComment: string | null;
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

function CommentBox({ response }: { response: EnrichedResponse }) {
  const [comment, setComment] = useState(response.teacherComment ?? "");
  const [saved, setSaved] = useState(!!response.teacherComment);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const teacherId = localStorage.getItem("userId");
  const studentId = new URLSearchParams(window.location.search).get("studentId");

  const mutation = useMutation({
    mutationFn: () =>
      apiRequest("PATCH", `/api/student-responses/${response.id}/comment`, { comment }),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({
        queryKey: [`/api/teachers/${teacherId}/students/${studentId}/responses`],
      });
      toast({ description: "Commentaire enregistré." });
    },
    onError: () => {
      toast({ description: "Erreur lors de l'enregistrement.", variant: "destructive" });
    },
  });

  return (
    <div className="mt-3 space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <MessageSquare className="w-4 h-4 text-blue-600" />
        Commentaire de l'enseignant
        {saved && comment && (
          <span className="text-xs font-normal text-green-600 dark:text-green-400 ml-1">
            · enregistré
          </span>
        )}
      </label>
      <Textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setSaved(false);
        }}
        placeholder="Écrivez votre rétroaction pour cet élève…"
        className="min-h-[90px] text-sm bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 focus-visible:ring-blue-400"
        data-testid={`textarea-comment-${response.id}`}
      />
      <Button
        size="sm"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || (!comment.trim())}
        data-testid={`button-save-comment-${response.id}`}
      >
        <Save className="w-3.5 h-3.5 mr-1.5" />
        {mutation.isPending ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </div>
  );
}

export default function StudentResponses() {
  const [, setLocation] = useLocation();
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

  if (!teacherId || !studentId) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement des réponses…</p>
      </div>
    );
  }

  const groupedResponses: { [key: string]: EnrichedResponse[] } = {};
  responses.forEach((response: EnrichedResponse) => {
    if (!response.course || !response.exercise) return;
    const key = `${response.course.id}|${response.exercise.id}`;
    if (!groupedResponses[key]) groupedResponses[key] = [];
    groupedResponses[key].push(response);
  });

  const pendingCount = (responses as EnrichedResponse[]).filter(
    (r) => r.question?.type === "text" && !r.teacherComment
  ).length;

  const getStatusIcon = (isCorrect: boolean | null) => {
    if (isCorrect === true) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (isCorrect === false) return <XCircle className="w-5 h-5 text-red-600" />;
    return <Clock className="w-5 h-5 text-amber-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/teacher-reports")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              Réponses de l'élève
            </h1>
            <p className="text-sm text-muted-foreground">
              {responses.length} réponse{responses.length !== 1 ? "s" : ""}
              {pendingCount > 0 && (
                <span className="ml-2 text-amber-600 dark:text-amber-400 font-medium">
                  · {pendingCount} texte{pendingCount !== 1 ? "s" : ""} à corriger
                </span>
              )}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {Object.entries(groupedResponses).map(([key, courseResponses]) => {
          const first = courseResponses[0];
          const hasTextResponses = courseResponses.some((r) => r.question?.type === "text");

          return (
            <Card key={key} className="p-6">
              {/* Exercise header */}
              <div className="mb-5 pb-4 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  {first.course.title}
                </p>
                <h2 className="text-base font-bold text-foreground">
                  {first.exercise.title}
                </h2>
                {hasTextResponses && (
                  <span className="inline-flex items-center gap-1 mt-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                    <MessageSquare className="w-3 h-3" />
                    Contient des réponses à corriger
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {courseResponses.map((response, idx) => {
                  const isText = response.question?.type === "text";
                  return (
                    <div
                      key={response.id}
                      className={`rounded-lg p-4 border ${
                        isText
                          ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10"
                          : "border-border bg-muted/20"
                      }`}
                      data-testid={`response-item-${response.id}`}
                    >
                      {/* Question title + status */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-0.5">
                            Question {idx + 1}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {response.question?.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {getStatusIcon(response.isCorrect)}
                          <span className="text-xs font-medium">
                            {response.isCorrect === true
                              ? "Correct"
                              : response.isCorrect === false
                              ? "Incorrect"
                              : "Texte libre"}
                          </span>
                        </div>
                      </div>

                      {/* Student's answer */}
                      <div className="bg-white dark:bg-slate-800 rounded-md p-3 mb-2 border border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          Réponse de l'élève
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                          {response.answer}
                        </p>
                      </div>

                      {/* Teacher comment form — only for text questions */}
                      {isText && <CommentBox response={response} />}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {responses.length === 0 && (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">
              Aucune réponse trouvée pour cet élève.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
}
