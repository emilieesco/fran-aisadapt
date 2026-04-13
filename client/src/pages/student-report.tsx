import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "wouter";

interface StudentInfo {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface CourseEntry {
  id: string;
  title: string;
  category: string;
  progressPercentage: number;
  completed: boolean;
}

interface ResponseEntry {
  id: string;
  answer: string;
  isCorrect: boolean | null;
  teacherComment: string | null;
  question: { id: string; text: string; type: string } | null;
  exercise: { id: string; title: string } | null;
  course: { id: string; title: string; category: string } | null;
}

interface Badge {
  id: string;
  type: string;
}

const CATEGORY_LABEL: Record<string, string> = {
  grammaire: "Grammaire",
  orthographe: "Orthographe",
  conjugaison: "Conjugaison",
  ponctuation: "Ponctuation",
  vocabulaire: "Vocabulaire",
  classes_de_mots: "Classes de mots",
  lecture_reading: "Lecture",
  textes_narratifs: "Textes narratifs",
  textes_descriptifs: "Textes descriptifs",
  dictee: "Dictée",
  ecriture: "Écriture",
};

function groupByCourse(responses: ResponseEntry[]) {
  const map: Record<string, { title: string; category: string; exercises: Record<string, { title: string; responses: ResponseEntry[] }> }> = {};
  for (const r of responses) {
    const cId = r.course?.id ?? "inconnu";
    const cTitle = r.course?.title ?? "Cours inconnu";
    const cCat = r.course?.category ?? "";
    const eId = r.exercise?.id ?? "inconnu";
    const eTitle = r.exercise?.title ?? "Exercice inconnu";
    if (!map[cId]) map[cId] = { title: cTitle, category: cCat, exercises: {} };
    if (!map[cId].exercises[eId]) map[cId].exercises[eId] = { title: eTitle, responses: [] };
    map[cId].exercises[eId].responses.push(r);
  }
  return map;
}

export default function StudentReport() {
  const { studentId } = useParams<{ studentId: string }>();
  const [, setLocation] = useLocation();
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [responses, setResponses] = useState<ResponseEntry[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const printTriggered = useRef(false);

  useEffect(() => {
    const teacherId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    if (!teacherId || role !== "teacher") {
      setLocation("/");
      return;
    }

    const load = async () => {
      try {
        const [studentRes, coursesRes, responsesRes, badgesRes] = await Promise.all([
          fetch(`/api/users/${studentId}`, { credentials: "include" }),
          fetch(`/api/students/${studentId}/courses`, { credentials: "include" }),
          fetch(`/api/teachers/${teacherId}/students/${studentId}/responses`, { credentials: "include" }),
          fetch(`/api/students/${studentId}/badges`, { credentials: "include" }),
        ]);

        if (!studentRes.ok) { setError("Élève introuvable"); setLoading(false); return; }
        const studentData = await studentRes.json();
        setStudent(studentData);

        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (responsesRes.ok) setResponses(await responsesRes.json());
        if (badgesRes.ok) setBadges(await badgesRes.json());
      } catch (e) {
        setError("Erreur de chargement des données");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [studentId, setLocation]);

  useEffect(() => {
    if (!loading && student && !printTriggered.current) {
      printTriggered.current = true;
      setTimeout(() => window.print(), 600);
    }
  }, [loading, student]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Préparation du rapport…</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || "Erreur inconnue"}</p>
      </div>
    );
  }

  const assignedCourses = courses.filter(c => c.progressPercentage > 0 || c.completed);
  const completedCount = courses.filter(c => c.completed).length;
  const inProgressCount = courses.filter(c => c.progressPercentage > 0 && !c.completed).length;
  const totalAnswered = responses.length;
  const correctCount = responses.filter(r => r.isCorrect === true).length;
  const successRate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const annotatedResponses = responses.filter(r => r.teacherComment || r.isCorrect !== null);
  const courseMap = groupByCourse(responses);
  const today = new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-before: always; }
          @page { margin: 1.5cm 2cm; }
        }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #111; background: white; }
      `}</style>

      {/* Bouton retour (masqué à l'impression) */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          style={{ background: "#2563eb", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
        >
          Imprimer / Enregistrer PDF
        </button>
        <button
          onClick={() => window.close()}
          style={{ background: "#6b7280", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}
        >
          Fermer
        </button>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 24px", background: "white" }}>

        {/* ── EN-TÊTE ── */}
        <div style={{ borderBottom: "3px solid #2563eb", paddingBottom: "20px", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1e40af", margin: 0 }}>
                Français Actif
              </h1>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
                Plateforme d'apprentissage du français — Rapport de progression
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Généré le</p>
              <p style={{ fontSize: "14px", fontWeight: 600, margin: "2px 0 0" }}>{today}</p>
            </div>
          </div>

          <div style={{ marginTop: "20px", background: "#eff6ff", borderRadius: "8px", padding: "16px 20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>
              {student.firstName} {student.lastName}
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
              Identifiant : {student.username}
            </p>
          </div>
        </div>

        {/* ── RÉSUMÉ STATISTIQUES ── */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px", fontWeight: 700 }}>
            Vue d'ensemble
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { label: "Cours complétés", value: completedCount, color: "#059669" },
              { label: "Cours en cours", value: inProgressCount, color: "#2563eb" },
              { label: "Réponses soumises", value: totalAnswered, color: "#7c3aed" },
              { label: "Taux de réussite", value: `${successRate}%`, color: successRate >= 70 ? "#059669" : successRate >= 50 ? "#d97706" : "#dc2626" },
            ].map(stat => (
              <div key={stat.label} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "24px", fontWeight: 800, color: stat.color, margin: 0 }}>{stat.value}</p>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROGRESSION PAR COURS ── */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px", fontWeight: 700 }}>
            Progression par cours
          </h3>
          {courses.length === 0 ? (
            <p style={{ color: "#6b7280", fontStyle: "italic", fontSize: "14px" }}>Aucun cours assigné.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "1px solid #e5e7eb" }}>Cours</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "1px solid #e5e7eb" }}>Catégorie</th>
                  <th style={{ textAlign: "center", padding: "8px 10px", borderBottom: "1px solid #e5e7eb", width: "120px" }}>Progression</th>
                  <th style={{ textAlign: "center", padding: "8px 10px", borderBottom: "1px solid #e5e7eb", width: "90px" }}>État</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 10px", fontWeight: 500 }}>{c.title}</td>
                    <td style={{ padding: "8px 10px", color: "#6b7280" }}>{CATEGORY_LABEL[c.category] || c.category}</td>
                    <td style={{ padding: "8px 10px", textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ flex: 1, background: "#e5e7eb", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: c.completed ? "#059669" : "#2563eb", width: `${c.progressPercentage}%` }} />
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "30px" }}>{c.progressPercentage}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "center" }}>
                      {c.completed
                        ? <span style={{ color: "#059669", fontWeight: 600, fontSize: "12px" }}>✓ Complété</span>
                        : c.progressPercentage > 0
                          ? <span style={{ color: "#2563eb", fontSize: "12px" }}>En cours</span>
                          : <span style={{ color: "#9ca3af", fontSize: "12px" }}>Non débuté</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── RÉSULTATS PAR EXERCICE ── */}
        {Object.keys(courseMap).length > 0 && (
          <div style={{ marginBottom: "32px" }} className="page-break">
            <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px", fontWeight: 700 }}>
              Résultats détaillés par exercice
            </h3>
            {Object.entries(courseMap).map(([courseId, courseData]) => {
              const allResponses = Object.values(courseData.exercises).flatMap(e => e.responses);
              const cCorrect = allResponses.filter(r => r.isCorrect === true).length;
              const cTotal = allResponses.filter(r => r.isCorrect !== null).length;
              return (
                <div key={courseId} style={{ marginBottom: "20px" }}>
                  <div style={{ background: "#eff6ff", padding: "8px 12px", borderRadius: "6px 6px 0 0", borderBottom: "2px solid #2563eb" }}>
                    <span style={{ fontWeight: 700, color: "#1e40af" }}>{courseData.title}</span>
                    <span style={{ fontSize: "12px", color: "#6b7280", marginLeft: "12px" }}>
                      {CATEGORY_LABEL[courseData.category] || courseData.category}
                    </span>
                    {cTotal > 0 && (
                      <span style={{ fontSize: "12px", color: "#6b7280", float: "right" }}>
                        {cCorrect}/{cTotal} correct{cTotal > 1 ? "s" : ""} ({Math.round(cCorrect / cTotal * 100)}%)
                      </span>
                    )}
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #e5e7eb" }}>Exercice</th>
                        <th style={{ textAlign: "center", padding: "6px 10px", borderBottom: "1px solid #e5e7eb", width: "70px" }}>Rép.</th>
                        <th style={{ textAlign: "center", padding: "6px 10px", borderBottom: "1px solid #e5e7eb", width: "70px" }}>Corr.</th>
                        <th style={{ textAlign: "center", padding: "6px 10px", borderBottom: "1px solid #e5e7eb", width: "70px" }}>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(courseData.exercises).map(([exId, exData]) => {
                        const total = exData.responses.length;
                        const correct = exData.responses.filter(r => r.isCorrect === true).length;
                        const graded = exData.responses.filter(r => r.isCorrect !== null).length;
                        const score = graded > 0 ? Math.round(correct / graded * 100) : null;
                        return (
                          <tr key={exId} style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "6px 10px" }}>{exData.title}</td>
                            <td style={{ padding: "6px 10px", textAlign: "center", color: "#6b7280" }}>{total}</td>
                            <td style={{ padding: "6px 10px", textAlign: "center", color: "#059669" }}>{correct}</td>
                            <td style={{ padding: "6px 10px", textAlign: "center", fontWeight: 700, color: score === null ? "#9ca3af" : score >= 70 ? "#059669" : score >= 50 ? "#d97706" : "#dc2626" }}>
                              {score !== null ? `${score}%` : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}

        {/* ── ANNOTATIONS ENSEIGNANT ── */}
        {annotatedResponses.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px", fontWeight: 700 }}>
              Annotations et corrections de l'enseignant
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {annotatedResponses.map(r => (
                <div key={r.id} style={{ border: "1px solid #e5e7eb", borderRadius: "6px", padding: "12px 14px", fontSize: "13px" }}>
                  <div style={{ color: "#6b7280", marginBottom: "4px", fontSize: "11px" }}>
                    {r.course?.title ?? ""} › {r.exercise?.title ?? ""}
                  </div>
                  <p style={{ fontWeight: 500, margin: "0 0 6px" }}>{r.question?.text}</p>
                  <div style={{
                    background: r.isCorrect === true ? "#f0fdf4" : r.isCorrect === false ? "#fef2f2" : "#f9fafb",
                    borderRadius: "4px", padding: "6px 10px", marginBottom: r.teacherComment ? "8px" : 0,
                    color: r.isCorrect === true ? "#166534" : r.isCorrect === false ? "#991b1b" : "#374151"
                  }}>
                    <strong>Réponse : </strong>{r.answer}
                    {r.isCorrect === true && " ✓"}
                    {r.isCorrect === false && " ✗"}
                  </div>
                  {r.teacherComment && (
                    <div style={{ background: "#fffbeb", borderLeft: "3px solid #f59e0b", padding: "6px 10px", borderRadius: "0 4px 4px 0", color: "#78350f", fontSize: "12px" }}>
                      <strong>Commentaire : </strong>{r.teacherComment}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BADGES ── */}
        {badges.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px", fontWeight: 700 }}>
              Badges obtenus
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {badges.map(b => (
                <span key={b.id} style={{ border: "1px solid #e5e7eb", borderRadius: "20px", padding: "4px 12px", fontSize: "12px", fontWeight: 600, color: "#1e40af", background: "#eff6ff" }}>
                  {b.type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── PIED DE PAGE ── */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px", marginTop: "40px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9ca3af" }}>
          <span>Français Actif — Rapport confidentiel</span>
          <span>{today}</span>
        </div>
      </div>
    </>
  );
}
