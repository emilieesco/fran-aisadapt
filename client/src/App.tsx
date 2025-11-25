import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import StudentDashboard from "@/pages/student-dashboard";
import TeacherDashboard from "@/pages/teacher-dashboard";
import TeacherReports from "@/pages/teacher-reports";
import Course from "@/pages/course";
import Exercise from "@/pages/exercise";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/teacher-dashboard" component={TeacherDashboard} />
      <Route path="/teacher-reports" component={TeacherReports} />
      <Route path="/course/:id" component={Course} />
      <Route path="/exercise/:id" component={Exercise} />
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
