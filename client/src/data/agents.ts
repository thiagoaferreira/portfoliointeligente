export interface Agent {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    icon: 'fas fa-briefcase',
    title: 'Agente Comercial (SDR)',
    description: 'Automatize prospecção e qualificação de leads. Este agente gerencia o funil de vendas, agenda reuniões e mantém interações personalizadas com potenciais clientes.'
  },
  {
    id: 2,
    icon: 'fas fa-hospital',
    title: 'Agente Clínicas',
    description: 'Otimize o gerenciamento de pacientes e consultas. Este agente organiza agendamentos, envia lembretes e facilita a comunicação entre equipe médica e pacientes.'
  },
  {
    id: 3,
    icon: 'fas fa-home',
    title: 'Agente Imobiliárias',
    description: 'Transforme a experiência de compra e venda de imóveis. Este agente gerencia listagens, organiza visitas e qualifica leads para corretores, aumentando a eficiência do negócio.'
  },
  {
    id: 4,
    icon: 'fas fa-balance-scale',
    title: 'Agente Advocacia',
    description: 'Aumente a produtividade do escritório jurídico. Este agente organiza casos, pesquisa jurisprudência e facilita a comunicação com clientes e documentação.'
  },
  {
    id: 5,
    icon: 'fas fa-chart-line',
    title: 'Agente Financeiro',
    description: 'Otimize análises financeiras e recomendações. Este agente processa dados, gera insights sobre investimentos e ajuda na gestão orçamentária para decisões estratégicas.'
  },
  {
    id: 6,
    icon: 'fas fa-shopping-cart',
    title: 'Agente Vendedor Infoprodutos',
    description: 'Potencialize suas vendas de produtos digitais. Este agente otimiza funis, automatiza sequências de emails e personaliza abordagens conforme comportamento do cliente.'
  },
  {
    id: 7,
    icon: 'fas fa-headset',
    title: 'Agente CS',
    description: 'Eleve o suporte ao cliente a outro nível. Este agente gerencia tickets, oferece respostas rápidas a dúvidas frequentes e ajuda a manter altos níveis de satisfação.'
  },
  {
    id: 8,
    icon: 'fas fa-undo',
    title: 'Agente Recuperador de Vendas',
    description: 'Reduza o abandono de carrinho e recupere clientes. Este agente implementa estratégias personalizadas para reconquistar vendas perdidas e aumentar conversões.'
  },
  {
    id: 9,
    icon: 'fas fa-users',
    title: 'Agente Recrutamento Pessoal (RH)',
    description: 'Simplifique processos de seleção e contratação. Este agente filtra currículos, agenda entrevistas e ajuda a identificar os melhores candidatos para cada posição.'
  },
  {
    id: 10,
    icon: 'fas fa-graduation-cap',
    title: 'Agente para Escolas de Ensino',
    description: 'Modernize a gestão escolar e comunicação. Este agente organiza cronogramas, facilita a comunicação entre professores, alunos e pais, e ajuda na gestão de tarefas.'
  },
  {
    id: 11,
    icon: 'fas fa-pen-fancy',
    title: 'Criador de Conteúdo',
    description: 'Gere conteúdo envolvente para diversos canais. Este agente produz textos, captions e ideias criativas adaptadas à voz da sua marca e às necessidades do seu público.'
  },
  {
    id: 12,
    icon: 'fas fa-hand-holding-heart',
    title: 'Agente Terapeuta',
    description: 'Apoie o trabalho terapêutico com ferramentas inteligentes. Este agente ajuda no agendamento, acompanhamento de pacientes e fornece recursos para diferentes abordagens terapêuticas.'
  },
  {
    id: 13,
    icon: 'fas fa-brain',
    title: 'Agente para Psicólogos',
    description: 'Potencialize a prática psicológica. Este agente facilita a gestão de prontuários, organiza anotações de sessões e ajuda com recursos teóricos específicos para diferentes casos.'
  }
];
