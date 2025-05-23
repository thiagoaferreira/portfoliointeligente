import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import GlobalChatModal from "./components/GlobalChatModal";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/use-auth";

// Admin pages
import AdminIndexPage from "./pages/admin/index";
import LoginPage from "./pages/admin/login-page";
import DashboardPage from "./pages/admin/dashboard-page";
import AgentsPage from "./pages/admin/agents-page";
import PromptsPage from "./pages/admin/prompts-page";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={LoginPage} />
      
      {/* Admin root redirects to dashboard or login */}
      <Route path="/admin" component={AdminIndexPage} />
      
      {/* Protected admin routes */}
      <ProtectedRoute path="/admin/dashboard" adminOnly>
        <DashboardPage />
      </ProtectedRoute>
      
      <ProtectedRoute path="/admin/agents" adminOnly>
        <AgentsPage />
      </ProtectedRoute>
      
      <ProtectedRoute path="/admin/prompts" adminOnly>
        <PromptsPage />
      </ProtectedRoute>
      
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <GlobalChatModal />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
