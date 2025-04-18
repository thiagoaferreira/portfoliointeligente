import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Agent } from '@shared/schema';
import { Edit, Trash2, Plus, Bot } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import styled from 'styled-components';
import { fadeIn, slideUp } from '@/styles/animations';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 2rem;
`;

const AgentsTable = styled(Card)`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.2);
  animation: ${slideUp} 0.5s ease-out;
`;

const ActionButton = styled(Button)`
  padding: 0.5rem;
  height: 2.25rem;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const IconPreview = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  
  i {
    margin-right: 0.5rem;
  }
`;

interface AgentFormData {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

export default function AgentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<AgentFormData>({
    title: '',
    description: '',
    icon: 'fas fa-robot',
  });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Fetching agents
  const { data: agents, isLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
    queryFn: async () => {
      const res = await fetch('/api/agents');
      if (!res.ok) throw new Error('Erro ao buscar agentes');
      return res.json();
    }
  });

  // Creating a new agent
  const createAgentMutation = useMutation({
    mutationFn: async (data: AgentFormData) => {
      const res = await apiRequest('POST', '/api/agents', data);
      if (!res.ok) {
        throw new Error('Erro ao criar agente');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      resetForm();
      setIsDialogOpen(false);
      toast({
        title: 'Agente criado com sucesso',
        description: 'O novo agente foi adicionado à lista.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar agente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Updating an agent
  const updateAgentMutation = useMutation({
    mutationFn: async (data: AgentFormData) => {
      if (!data.id) throw new Error('ID do agente não fornecido');
      const res = await apiRequest('PUT', `/api/agents/${data.id}`, data);
      if (!res.ok) {
        throw new Error('Erro ao atualizar agente');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      resetForm();
      setIsDialogOpen(false);
      toast({
        title: 'Agente atualizado com sucesso',
        description: 'As alterações foram salvas.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar agente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Deleting an agent
  const deleteAgentMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/agents/${id}`);
      if (!res.ok) {
        throw new Error('Erro ao excluir agente');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      toast({
        title: 'Agente excluído com sucesso',
        description: 'O agente foi removido da lista.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir agente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && formData.id) {
      updateAgentMutation.mutate(formData);
    } else {
      createAgentMutation.mutate(formData);
    }
  };

  const handleEdit = (agent: Agent) => {
    setFormData(agent);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este agente? Esta ação não pode ser desfeita.')) {
      deleteAgentMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'fas fa-robot',
    });
    setIsEditing(false);
  };

  const openNewAgentDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle>Gerenciamento de Agentes</PageTitle>
        <Button onClick={openNewAgentDialog}>
          <Plus size={16} className="mr-2" />
          Novo Agente
        </Button>
      </PageHeader>

      <AgentsTable>
        <CardHeader>
          <CardTitle className="text-white">Agentes Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[80px]">Ícone</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="max-w-[300px]">Descrição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents && agents.length > 0 ? (
                  agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.id}</TableCell>
                      <TableCell>
                        <i className={agent.icon}></i>
                      </TableCell>
                      <TableCell>{agent.title}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{agent.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <ActionButton 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(agent)}
                          >
                            <Edit />
                          </ActionButton>
                          <ActionButton 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(agent.id)}
                          >
                            <Trash2 />
                          </ActionButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Bot size={24} className="mx-auto mb-2 opacity-50" />
                      Nenhum agente encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </AgentsTable>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Agente' : 'Novo Agente'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Modifique os dados do agente abaixo.' 
                : 'Preencha os detalhes para criar um novo agente.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Comercial"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ex: Assistente virtual para equipes comerciais e vendas"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="icon">Classe do Ícone (Font Awesome)</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="Ex: fas fa-briefcase"
                required
              />
              <IconPreview>
                <i className={formData.icon}></i>
                <span>Prévia do ícone</span>
              </IconPreview>
            </FormGroup>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createAgentMutation.isPending || updateAgentMutation.isPending}
              >
                {isEditing 
                  ? (updateAgentMutation.isPending ? 'Salvando...' : 'Salvar Alterações') 
                  : (createAgentMutation.isPending ? 'Criando...' : 'Criar Agente')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}