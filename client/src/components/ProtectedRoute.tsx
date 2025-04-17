import { ReactNode } from "react";
import { Route, Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  path: string;
  children: ReactNode;
  adminOnly?: boolean;
};

export function ProtectedRoute({ path, children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {() => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          );
        }

        if (!user) {
          return <Redirect to="/admin/login" />;
        }

        if (adminOnly && !user.isAdmin) {
          return <Redirect to="/" />;
        }

        return <>{children}</>;
      }}
    </Route>
  );
}