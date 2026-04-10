import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import StudentDashboard from "@/pages/student-dashboard";
import TeacherDashboard from "@/pages/teacher-dashboard";
import TeacherReports from "@/pages/teacher-reports";
import TeacherCourse from "@/pages/teacher-course";
import StudentResponses from "@/pages/student-responses";
import Course from "@/pages/course";
import Exercise from "@/pages/exercise";
import ReadingNarrative from "@/pages/reading-narrative";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/teacher-dashboard" component={TeacherDashboard} />
      <Route path="/teacher-reports" component={TeacherReports} />
      <Route path="/teacher/course/:id" component={TeacherCourse} />
      <Route path="/student-responses" component={StudentResponses} />
      <Route path="/course/:id" component={Course} />
      <Route path="/exercise/:id" component={Exercise} />
      <Route path="/reading-narrative" component={ReadingNarrative} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
