import { useState, useEffect } from 'react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Agent, AgentPrompt } from '@shared/schema';
import { Edit, Trash2, Plus, MessageSquare, CheckCircle } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import styled from 'styled-components';
import { fadeIn, slideUp, glowPulse, shimmer, neonPulse, gradientShift, pulseLight } from '@/styles/animations';

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
  font-weight: 600;
  animation: ${neonPulse} 3s infinite ease-in-out;
`;

const PromptsTable = styled(Card)`
  background: linear-gradient(135deg, rgba(25, 30, 45, 0.8) 0%, rgba(45, 55, 72, 0.7) 100%);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(139, 92, 246, 0.15);
  animation: ${slideUp} 0.5s ease-out, ${glowPulse} 4s infinite ease-in-out;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(139, 92, 246, 0), 
      rgba(139, 92, 246, 0.7), 
      rgba(139, 92, 246, 0)
    );
    animation: ${shimmer} 3s infinite linear;
  }
`;

const StyledTableRow = styled(TableRow)`
  position: relative;
  transition: all 0.2s ease;
  background: linear-gradient(90deg, rgba(25, 30, 45, 0.3) 0%, rgba(45, 55, 72, 0.3) 100%);
  border: none;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
  
  &:hover {
    background: linear-gradient(90deg, rgba(25, 30, 45, 0.6) 0%, rgba(45, 55, 72, 0.6) 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
  }
  
  td {
    border-bottom: none;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #8b5cf6, #6366f1);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const StyledTableHead = styled(TableHead)`
  background: linear-gradient(90deg, rgba(30, 35, 50, 0.7) 0%, rgba(50, 60, 80, 0.7) 100%);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.75rem;
`;

const ActionButton = styled(Button)`
  padding: 0.5rem;
  height: 2.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  
  label {
    margin-left: 0.5rem;
  }
`;

const PromptTextArea = styled(Textarea)`
  min-height: 200px;
  font-family: monospace;
`;

const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.25) 100%);
  color: rgb(52, 211, 153);
  border-radius: 1rem;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 500;
  box-shadow: 0 0 15px rgba(52, 211, 153, 0.15);
  border: 1px solid rgba(52, 211, 153, 0.2);
  letter-spacing: 0.5px;
  animation: ${pulseLight} 3s infinite ease-in-out;
  
  svg {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.35rem;
    filter: drop-shadow(0 0 1px rgba(34, 197, 94, 0.5));
  }
`;

const TruncatedText = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface PromptFormData {
  id?: number;
  agentId: number;
  prompt: string;
  isActive: boolean;
}

export default function PromptsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PromptFormData>({
    agentId: 0,
    prompt: '',
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch all agents
  const { data: agents, isLoading: isLoadingAgents } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
    queryFn: async () => {
      const res = await fetch('/api/agents');
      if (!res.ok) throw new Error('Erro ao buscar agentes');
      return res.json();
    }
  });

  // Fetch prompts for selected agent
  const { 
    data: prompts, 
    isLoading: isLoadingPrompts,
    refetch: refetchPrompts
  } = useQuery<AgentPrompt[]>({
    queryKey: ['/api/agents', selectedAgentId, 'prompts'],
    queryFn: async () => {
      if (!selectedAgentId) return [];
      const res = await fetch(`/api/agents/${selectedAgentId}/prompts`);
      if (!res.ok) throw new Error('Erro ao buscar prompts');
      return res.json();
    },
    enabled: !!selectedAgentId
  });

  // Set first agent as selected when agents load if none selected
  useEffect(() => {
    if (agents && agents.length > 0 && !selectedAgentId) {
      setSelectedAgentId(agents[0].id);
    }
  }, [agents, selectedAgentId]);

  // Creating a new prompt
  const createPromptMutation = useMutation({
    mutationFn: async (data: PromptFormData) => {
      const res = await apiRequest('POST', `/api/agents/${data.agentId}/prompts`, {
        prompt: data.prompt,
        isActive: data.isActive
      });
      if (!res.ok) {
        throw new Error('Erro ao criar prompt');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents', selectedAgentId, 'prompts'] });
      resetForm();
      setIsDialogOpen(false);
      toast({
        title: 'Prompt criado com sucesso',
        description: 'O novo prompt foi adicionado ao agente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar prompt',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Updating a prompt
  const updatePromptMutation = useMutation({
    mutationFn: async (data: PromptFormData) => {
      if (!data.id) throw new Error('ID do prompt não fornecido');
      const res = await apiRequest('PUT', `/api/agent-prompts/${data.id}`, {
        prompt: data.prompt,
        isActive: data.isActive
      });
      if (!res.ok) {
        throw new Error('Erro ao atualizar prompt');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents', selectedAgentId, 'prompts'] });
      resetForm();
      setIsDialogOpen(false);
      toast({
        title: 'Prompt atualizado com sucesso',
        description: 'As alterações foram salvas.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar prompt',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Deleting a prompt
  const deletePromptMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/agent-prompts/${id}`);
      if (!res.ok) {
        throw new Error('Erro ao excluir prompt');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents', selectedAgentId, 'prompts'] });
      toast({
        title: 'Prompt excluído com sucesso',
        description: 'O prompt foi removido com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir prompt',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && formData.id) {
      updatePromptMutation.mutate(formData);
    } else {
      createPromptMutation.mutate(formData);
    }
  };

  const handleEdit = (prompt: AgentPrompt) => {
    setFormData({
      id: prompt.id,
      agentId: prompt.agentId,
      prompt: prompt.prompt,
      isActive: prompt.isActive,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este prompt? Esta ação não pode ser desfeita.')) {
      deletePromptMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      agentId: selectedAgentId || 0,
      prompt: '',
      isActive: true,
    });
    setIsEditing(false);
  };

  const openNewPromptDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleAgentChange = (value: string) => {
    const agentId = parseInt(value);
    setSelectedAgentId(agentId);
    setFormData(prev => ({ ...prev, agentId }));
  };

  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle>Gerenciamento de Prompts</PageTitle>
        <Button 
          onClick={openNewPromptDialog}
          disabled={!selectedAgentId}
        >
          <Plus size={16} className="mr-2" />
          Novo Prompt
        </Button>
      </PageHeader>

      <div className="mb-4">
        <Label htmlFor="agentSelect">Selecione um Agente</Label>
        <Select
          value={selectedAgentId?.toString() || ''}
          onValueChange={handleAgentChange}
        >
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Selecione um agente" />
          </SelectTrigger>
          <SelectContent>
            {isLoadingAgents ? (
              <SelectItem value="loading" disabled>Carregando agentes...</SelectItem>
            ) : agents && agents.length > 0 ? (
              agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id.toString()}>
                  {agent.title}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>Nenhum agente disponível</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <PromptsTable>
        <CardHeader>
          <CardTitle className="text-white">
            Prompts do Agente: {agents?.find(a => a.id === selectedAgentId)?.title || ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedAgentId ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <MessageSquare size={48} className="mb-4 opacity-30" />
              <p>Selecione um agente para ver seus prompts</p>
            </div>
          ) : isLoadingPrompts ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <Table className="border-separate border-spacing-y-2">
              <TableHeader>
                <TableRow>
                  <StyledTableHead className="w-[50px]">ID</StyledTableHead>
                  <StyledTableHead>Prompt</StyledTableHead>
                  <StyledTableHead className="w-[100px]">Status</StyledTableHead>
                  <StyledTableHead className="w-[150px] text-right">Ações</StyledTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompts && prompts.length > 0 ? (
                  prompts.map((prompt) => (
                    <StyledTableRow key={prompt.id}>
                      <TableCell className="font-medium">{prompt.id}</TableCell>
                      <TableCell>
                        <TruncatedText 
                          title={prompt.prompt}
                          className="text-gray-300"
                        >
                          {prompt.prompt}
                        </TruncatedText>
                      </TableCell>
                      <TableCell>
                        {prompt.isActive && (
                          <ActiveBadge>
                            <CheckCircle />
                            Ativo
                          </ActiveBadge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <ActionButton 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(prompt)}
                          >
                            <Edit className="text-blue-400" />
                          </ActionButton>
                          <ActionButton 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(prompt.id)}
                          >
                            <Trash2 />
                          </ActionButton>
                        </div>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                      <span className="text-gray-300">Nenhum prompt encontrado para este agente</span>
                    </TableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </PromptsTable>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Prompt' : 'Novo Prompt'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Modifique o prompt do agente abaixo.' 
                : 'Crie um novo prompt para o agente selecionado.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            {!isEditing && (
              <FormGroup>
                <Label htmlFor="agentId">Agente</Label>
                <Select
                  value={formData.agentId.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, agentId: parseInt(value) }))}
                  disabled={isEditing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um agente" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents?.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id.toString()}>
                        {agent.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormGroup>
            )}
            
            <FormGroup>
              <Label htmlFor="prompt">Prompt</Label>
              <PromptTextArea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
                placeholder="Digite o prompt do agente aqui..."
                required
              />
            </FormGroup>
            
            <FormGroup>
              <SwitchContainer>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isActive">Definir como prompt ativo</Label>
              </SwitchContainer>
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
                disabled={createPromptMutation.isPending || updatePromptMutation.isPending}
              >
                {isEditing 
                  ? (updatePromptMutation.isPending ? 'Salvando...' : 'Salvar Alterações') 
                  : (createPromptMutation.isPending ? 'Criando...' : 'Criar Prompt')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}