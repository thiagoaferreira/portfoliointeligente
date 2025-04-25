# NexusAI - Plataforma de Agentes de IA

![NexusAI](https://cdn.xpiria.com.br/xpiria/logo_xpiria.svg)

## 📋 Sobre o Projeto

NexusAI é uma plataforma amigável de assistentes de inteligência artificial que permite interagir de forma fácil e intuitiva através de texto e áudio. Nossa plataforma oferece assistentes virtuais especializados para diferentes setores profissionais, ajudando a resolver problemas específicos de cada área.

### ✨ Principais Recursos

- **Design moderno e fácil de usar**: Interface bonita com animações e elementos interativos
- **Assistentes especializados**: 12 tipos de assistentes para diferentes áreas (Comercial, Saúde, Imobiliário, Jurídico, Financeiro, etc.)
- **Chat interativo**: Converse com os assistentes diretamente na plataforma
- **Mensagens de áudio**: Envie e receba mensagens de áudio facilmente
- **Conexão com WhatsApp**: Receba contatos interessados via WhatsApp
- **Painel administrativo**: Gerencie assistentes e mensagens pelo painel de administração
- **Fácil de configurar**: Configure a aplicação em poucos passos

## 🚀 Tecnologias Utilizadas

- **Frontend**: React.js com TypeScript
- **Design**: Styled Components e Tailwind CSS
- **Componentes visuais**: shadcn/ui
- **Banco de dados**: PostgreSQL
- **Servidor**: Express.js com Node.js
- **Contêineres**: Docker para instalação fácil

## 🔍 Guia de Instalação Passo a Passo

Este guia foi criado para ajudar qualquer pessoa a instalar e configurar o NexusAI, mesmo sem conhecimento técnico avançado.

### 1️⃣ Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (banco de dados)

### 2️⃣ Configuração do Banco de Dados

1. **Instale o PostgreSQL** se ainda não tiver instalado
   - Durante a instalação, defina uma senha para o usuário 'postgres'
   - Anote essa senha, pois você precisará dela mais tarde

2. **Crie um banco de dados** para a aplicação
   - Abra o aplicativo "pgAdmin" que vem com o PostgreSQL
   - Conecte-se ao servidor PostgreSQL
   - Clique com botão direito em "Databases" (Bancos de Dados)
   - Selecione "Create" (Criar) → "Database" (Banco de Dados)
   - Dê o nome "agentsdb" e clique em "Save" (Salvar)

### 3️⃣ Obtendo o Código da Aplicação

1. **Baixe o código-fonte**:
   - Se você tem o Git instalado:
   ```bash
   git clone https://github.com/seu-usuario/nexusai.git
   cd nexusai
   ```
   - Ou baixe como arquivo ZIP e extraia em seu computador

2. **Instale as dependências**:
   Abra uma janela de comando/terminal na pasta do projeto e execute:
   ```bash
   npm install
   ```
   Isso pode levar alguns minutos para completar.

### 4️⃣ Configurando as Variáveis de Ambiente

1. **Crie o arquivo de configuração**:
   - Localize o arquivo `.env.example` na pasta do projeto
   - Faça uma cópia desse arquivo e renomeie para `.env`

2. **Edite o arquivo `.env`** com suas informações:
   ```
   # Configurações visuais e de contato
   VITE_LOGO_URL=https://seusite.com/logo.svg
   VITE_WEBHOOK_URL=https://seuwebhook.com/api/chat
   VITE_WHATSAPP_NUMBER=5511999998888
   
   # Configurações do banco de dados
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=sua_senha_do_postgres
   DB_NAME=agentsdb
   DATABASE_URL=postgresql://postgres:sua_senha_do_postgres@localhost:5432/agentsdb
   
   # Configurações de segurança
   SESSION_SECRET=crie_uma_senha_secreta_longa_aqui
   NODE_ENV=development
   ```
   
   Substitua:
   - `sua_senha_do_postgres` pela senha que você definiu para o PostgreSQL
   - `crie_uma_senha_secreta_longa_aqui` por uma frase ou palavra aleatória

### 5️⃣ Configurando o Banco de Dados

1. **Migração inicial do banco de dados**:
   ```bash
   npm run db:push
   ```
   Este comando criará as tabelas necessárias no banco de dados.

2. **Adicionar usuário administrador**:
   ```bash
   npm run seed:admin
   ```
   Isso criará um usuário administrador com login "admin" e senha "admin".

3. **Adicionar agentes iniciais** (opcional):
   ```bash
   npm run seed:agents
   ```
   Isso adicionará os 12 tipos de agentes no banco de dados.

### 6️⃣ Iniciando a Aplicação

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. **Acesse a aplicação**:
   - Abra seu navegador e acesse `http://localhost:5000`
   - A página inicial deve ser carregada com sucesso

3. **Acesse o painel administrativo**:
   - Vá para `http://localhost:5000/admin`
   - Faça login com:
     - Usuário: `admin`
     - Senha: `admin`
   - Você verá o painel administrativo onde pode gerenciar os agentes

### 7️⃣ Resolvendo Problemas Comuns

- **Problema**: Mensagem "Unable to connect to database"
  - **Solução**: Verifique se o PostgreSQL está em execução e se as credenciais no arquivo `.env` estão corretas

- **Problema**: "Port is already in use"
  - **Solução**: Encerre outros programas que possam estar usando a porta 5000, ou altere a porta no arquivo `server/index.ts`

- **Problema**: Erro ao executar npm install
  - **Solução**: Tente executar `npm cache clean --force` e então `npm install` novamente

## 🌟 Usando a Aplicação

### Área do Cliente

- **Página Inicial**: Exibe todos os agentes disponíveis
- **Chat com Agente**: Clique em qualquer agente para iniciar uma conversa
- **Envio de Áudio**: Clique no botão de microfone para gravar e enviar mensagens de áudio
- **Contato via WhatsApp**: Clique no botão do WhatsApp para entrar em contato pelo aplicativo

### Painel Administrativo

- **Login**: Acesse /admin e use as credenciais (admin/admin)
- **Visão Geral**: Veja estatísticas e atividades recentes
- **Gerenciar Agentes**: Adicione, edite ou remova agentes
- **Configurar Prompts**: Personalize as instruções de cada agente
- **Gerenciar Usuários**: Adicione novos usuários administradores

## 📱 Implantação em Produção

### Usando Docker (Maneira Recomendada)

Esta é a maneira mais confiável de implantar o NexusAI em ambiente de produção:

1. **Configuração das variáveis de ambiente**:
   - Copie o arquivo `.env.example` para `.env` e configure todas as variáveis necessárias
   - Certifique-se de definir `NODE_ENV=production`
   - Para bancos de dados externos (como Neon), certifique-se de que a URL do banco de dados está correta

2. **Build e deploy com Docker Compose**:
   ```bash
   # Constrói os contêineres com as variáveis de ambiente
   docker-compose build --build-arg DATABASE_URL=sua_url_do_banco \
     --build-arg SESSION_SECRET=sua_chave_secreta \
     --build-arg VITE_LOGO_URL=url_do_seu_logo \
     --build-arg VITE_WEBHOOK_URL=url_do_seu_webhook \
     --build-arg VITE_WHATSAPP_NUMBER=seu_numero_whatsapp
   
   # Inicia os serviços em modo destacado
   docker-compose up -d
   ```

3. **Verificação da implementação**:
   ```bash
   # Verificar logs do contêiner
   docker-compose logs -f app
   
   # Verificar status dos contêineres
   docker-compose ps
   ```

### Usando Docker em Serviços de Hospedagem

Para implantar em serviços como Easypanel, Coolify, CapRover, ou outras plataformas:

1. **Configure o banco de dados PostgreSQL**:
   - Use um serviço de banco de dados gerenciado como Neon, ElephantSQL ou Supabase
   - Ou configure um contêiner PostgreSQL na mesma plataforma

2. **Configuração das variáveis de ambiente**:
   Defina todas essas variáveis na plataforma de hospedagem:

   ```
   DATABASE_URL=postgresql://usuario:senha@host:porta/banco
   DB_HOST=seu_host_db
   DB_PORT=5432
   DB_USER=seu_usuario_db
   DB_PASSWORD=sua_senha_db
   DB_NAME=seu_nome_db
   SESSION_SECRET=sua_chave_secreta
   NODE_ENV=production
   VITE_LOGO_URL=url_do_seu_logo
   VITE_WEBHOOK_URL=url_do_seu_webhook
   VITE_WHATSAPP_NUMBER=seu_numero_whatsapp
   ```

3. **Configuração do Dockerfile**:
   - O Dockerfile já está configurado para produção
   - A aplicação verifica automaticamente o banco de dados na inicialização
   - As tabelas e dados iniciais serão criados automaticamente se não existirem

### Solução de Problemas em Produção

Se você encontrar problemas durante a implantação, verifique:

1. **Erro de conexão com o banco de dados**:
   - Verifique se as credenciais do banco de dados estão corretas
   - Certifique-se de que o banco de dados está acessível a partir do contêiner
   - O sistema tentará se reconectar automaticamente várias vezes

2. **Erro "Cannot find package 'vite'"**:
   - Este erro foi resolvido no Dockerfile atual, mas se ocorrer, certifique-se de que:
   - O arquivo Dockerfile está atualizado com as correções mais recentes
   - O ambiente tem o pacote Vite instalado para ambiente de produção

3. **Erro ao inicializar o banco de dados**:
   - Verifique os logs do contêiner para detalhes do erro
   - O sistema mostrará mensagens detalhadas sobre falhas de conexão
   - Pode ser um problema temporário de rede, o sistema tentará reconectar automaticamente

4. **Problemas com WebSocket**:
   - O sistema foi configurado para lidar com problemas comuns de WebSocket
   - Em alguns ambientes, pode ser necessário desabilitar WebSockets para conexões
   - Verifique se seu provedor de hospedagem permite conexões WebSocket

## 📞 Ajuda e Suporte

Precisa de ajuda? Entre em contato:

- **WhatsApp**: [Clique aqui para falar conosco](https://wa.me/5544999998888)
- **Email**: suporte@seudominio.com

---

Desenvolvido com ❤️ pela Comunidade AI Makers Club 🤖