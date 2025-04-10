export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 1,
    icon: 'fas fa-bolt',
    title: 'Altamente Eficientes',
    description: 'Automatize tarefas que normalmente levariam horas para serem concluídas em apenas minutos, aumentando drasticamente a produtividade.'
  },
  {
    id: 2,
    icon: 'fas fa-sliders-h',
    title: 'Personalizáveis',
    description: 'Adapte cada agente às necessidades específicas do seu negócio, garantindo resultados alinhados com seus objetivos e processos.'
  },
  {
    id: 3,
    icon: 'fas fa-brain',
    title: 'Aprendizado Contínuo',
    description: 'Nossos agentes melhoram continuamente com o uso, adaptando-se às suas necessidades e aprendendo com cada interação.'
  },
  {
    id: 4,
    icon: 'fas fa-shield-alt',
    title: 'Segurança Avançada',
    description: 'Projetados com protocolos de segurança de última geração para proteger seus dados e garantir a conformidade regulatória.'
  },
  {
    id: 5,
    icon: 'fas fa-chart-pie',
    title: 'Análises Detalhadas',
    description: 'Acompanhe o desempenho dos agentes e obtenha insights valiosos sobre processos e resultados através de painéis analíticos intuitivos.'
  },
  {
    id: 6,
    icon: 'fas fa-plug',
    title: 'Integrações Flexíveis',
    description: 'Conecte-se facilmente com suas ferramentas existentes através de APIs intuitivas e integrações nativas com sistemas populares.'
  }
];
