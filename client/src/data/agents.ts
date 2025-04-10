export interface Agent {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    icon: 'fas fa-chart-line',
    title: 'Analista de Dados',
    description: 'Transforme dados brutos em insights valiosos. Este agente automatiza análises complexas, identifica padrões e gera relatórios detalhados para tomada de decisões estratégicas.'
  },
  {
    id: 2,
    icon: 'fas fa-headset',
    title: 'Assistente de Atendimento',
    description: 'Automatize o atendimento ao cliente com respostas rápidas e precisas. Este agente gerencia consultas, soluciona problemas e escalona casos complexos, mantendo seus clientes satisfeitos.'
  },
  {
    id: 3,
    icon: 'fas fa-pen-fancy',
    title: 'Criador de Conteúdo',
    description: 'Gere conteúdo envolvente para diversos canais. Este agente produz textos, captions e ideias criativas adaptadas à voz da sua marca e às necessidades do seu público.'
  },
  {
    id: 4,
    icon: 'fas fa-cogs',
    title: 'Automatizador de Fluxos',
    description: 'Simplifique processos complexos e elimine tarefas repetitivas. Este agente conecta sistemas, coordena etapas de trabalho e otimiza operações para maior produtividade.'
  },
  {
    id: 5,
    icon: 'fas fa-search',
    title: 'Assistente de Pesquisa',
    description: 'Acelere pesquisas de mercado e análise da concorrência. Este agente coleta, organiza e sintetiza informações de diversas fontes para embasar suas estratégias e decisões.'
  },
  {
    id: 6,
    icon: 'fas fa-code',
    title: 'Gerador de Código',
    description: 'Desenvolva soluções técnicas com mais rapidez. Este agente gera, corrige e otimiza código para diversas linguagens de programação, acelerando seus projetos de desenvolvimento.'
  }
];
