import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLogoFromEnv } from '@/hooks/use-env-config';
import { useAuth } from '@/hooks/use-auth';
import styled from 'styled-components';
import { fadeIn, slideUp } from '@/styles/animations';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e1e3a 100%);
  padding: 1rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(139, 92, 246, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: ${slideUp} 0.5s ease-out;
`;

const Logo = styled.img`
  height: 50px;
  margin-bottom: 1rem;
`;

const LoginHeader = styled(CardHeader)`
  text-align: center;
`;

const LoginTitle = styled(CardTitle)`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const LoginDescription = styled.p`
  color: #a5b4fc;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled(Label)`
  color: white;
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled(Input)`
  background: rgba(45, 55, 72, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
  
  &:focus {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.25);
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  background: linear-gradient(to right, #6b46c1, #2563eb);
  
  &:hover {
    background: linear-gradient(to right, #7c3aed, #3b82f6);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const LoginFooter = styled(CardFooter)`
  justify-content: center;
  color: #a5b4fc;
  font-size: 0.875rem;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();
  const logoUrl = useLogoFromEnv();
  const { user, loginMutation } = useAuth();
  const [_, navigate] = useLocation();

  useEffect(() => {
    // Se já estiver logado como admin, redireciona para o dashboard
    if (user?.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await loginMutation.mutateAsync({ username, password });
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo ao painel administrativo.',
      });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Credenciais inválidas');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          {logoUrl && <Logo src={logoUrl} alt="Logo" />}
          <LoginTitle>Painel Administrativo</LoginTitle>
          <LoginDescription>
            Faça login para acessar o painel de controle.
          </LoginDescription>
        </LoginHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormGroup>
              <StyledLabel htmlFor="username">Nome de Usuário</StyledLabel>
              <StyledInput
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loginMutation.isPending}
                placeholder="admin"
              />
            </FormGroup>
            <FormGroup>
              <StyledLabel htmlFor="password">Senha</StyledLabel>
              <StyledInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loginMutation.isPending}
                placeholder="••••••••"
              />
            </FormGroup>
            <LoginButton type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </LoginButton>
          </form>
        </CardContent>
        <LoginFooter>
          Use admin/admin para o primeiro acesso.
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
}