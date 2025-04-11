# NexusAI - Plataforma de Agentes de IA

![NexusAI](https://cdn.xpiria.com.br/xpiria/logo_xpiria.svg)

## 📋 Sobre o Projeto

NexusAI é uma plataforma avançada de agentes de inteligência artificial projetada para fornecer interações intuitivas orientadas por áudio, com foco na experiência do usuário e tecnologias web modernas. Nossa plataforma apresenta assistentes virtuais especializados para diversos setores profissionais, oferecendo soluções personalizadas para diferentes necessidades de negócios.

### ✨ Características Principais

- **Interface Moderna e Responsiva**: Design futurista com animações e elementos interativos.
- **Agentes Especializados**: 12 tipos de agentes para diferentes setores (Comercial, Clínicas, Imobiliário, Jurídico, Financeiro, etc.).
- **Chat Interativo**: Interface de chat integrada para demonstração das capacidades dos agentes.
- **Suporte a Áudio**: Processamento e interação avançada com mensagens de áudio.
- **Integração com WhatsApp**: Funcionalidade de geração de leads via WhatsApp.
- **Configuração Flexível**: Personalização via variáveis de ambiente.
- **Docker Ready**: Containerização com builds otimizados para fácil implantação.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React.js com TypeScript
- **Estilização**: Styled Components e Tailwind CSS
- **UI Components**: shadcn/ui
- **Gerenciamento de Estado**: React Query
- **Roteamento**: Wouter
- **Backend**: Express.js
- **Containerização**: Docker com multi-stage build
- **Configuração**: Variáveis de ambiente com dotenv

## 🛠️ Instalação e Configuração

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no arquivo `.env.example`:

```bash
# URL do logotipo da empresa (formato SVG recomendado)
VITE_LOGO_URL=https://meudominio.com/logo.svg

# URL do webhook para processamento de mensagens de chat
VITE_WEBHOOK_URL=https://meu-webhook.com/api/chat

# Número de telefone para contato via WhatsApp (formato internacional sem + ou espaços)
VITE_WHATSAPP_NUMBER=5511999998888
```

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nexusai.git
cd nexusai
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5000`

### Usando Docker

1. Construa a imagem Docker:
```bash
docker build -t nexusai .
```

2. Execute o container:
```bash
docker run -p 3000:5000 \
  -e VITE_LOGO_URL=https://meudominio.com/logo.svg \
  -e VITE_WEBHOOK_URL=https://meu-webhook.com/api/chat \
  -e VITE_WHATSAPP_NUMBER=5511999998888 \
  nexusai
```

3. Acesse a aplicação em `http://localhost:3000`

### Usando Docker Compose

1. Inicie a aplicação com Docker Compose:
```bash
docker-compose up -d
```

2. Acesse a aplicação em `http://localhost:3000`

## 📦 Deploy

### Deploy no Heroku

1. Crie uma aplicação no Heroku:
```bash
heroku create minha-aplicacao-nexusai
```

2. Adicione o buildpack para Node.js:
```bash
heroku buildpacks:set heroku/nodejs
```

3. Configure as variáveis de ambiente:
```bash
heroku config:set VITE_LOGO_URL=https://meudominio.com/logo.svg
heroku config:set VITE_WEBHOOK_URL=https://meu-webhook.com/api/chat
heroku config:set VITE_WHATSAPP_NUMBER=5511999998888
```

4. Realize o deploy:
```bash
git push heroku main
```

### Deploy no Netlify

1. Faça login no Netlify e crie um novo site a partir do Git.

2. Configure as variáveis de ambiente nas configurações do site:
   - VITE_LOGO_URL
   - VITE_WEBHOOK_URL
   - VITE_WHATSAPP_NUMBER

3. Configure o arquivo `netlify.toml` na raiz do projeto:
```toml
[build]
  command = "npm run build"
  publish = "client/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deploy na Vercel

1. Faça login na Vercel e importe o projeto do Git.

2. Configure as variáveis de ambiente nas configurações do projeto:
   - VITE_LOGO_URL
   - VITE_WEBHOOK_URL
   - VITE_WHATSAPP_NUMBER

3. Configure o arquivo `vercel.json` na raiz do projeto:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "build": {
    "env": {
      "VITE_LOGO_URL": "@vite_logo_url",
      "VITE_WEBHOOK_URL": "@vite_webhook_url",
      "VITE_WHATSAPP_NUMBER": "@vite_whatsapp_number"
    }
  }
}
```

### Deploy no EasyPanel

1. Acesse seu EasyPanel e crie uma nova aplicação.

2. Configure o deploy para usar Docker:
   - Aponte para o repositório Git do projeto
   - Use a imagem Docker do projeto (caso já tenha publicado) ou habilite a construção automática
   
3. Configure as variáveis de ambiente:
   - VITE_LOGO_URL
   - VITE_WEBHOOK_URL
   - VITE_WHATSAPP_NUMBER

4. Configure a porta para 5000 (ou conforme definido no Dockerfile)

5. Inicie o deployment

## 🌐 Webhook para Chat

O sistema de chat está configurado para enviar mensagens para um endpoint webhook externo. As mensagens são enviadas no seguinte formato:

```json
{
  "agent": "nome-do-agente",
  "message": "texto da mensagem",
  "type": "text"
}
```

A resposta esperada do webhook deve seguir o formato:

```json
{
  "messages": [
    {
      "text": "Primeira mensagem de resposta",
      "type": "text"
    },
    {
      "text": "Segunda mensagem de resposta",
      "type": "text"
    }
  ]
}
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📜 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📧 Contato

Para suporte ou dúvidas, entre em contato via WhatsApp:
https://wa.me/5544999998888

---

Desenvolvido com ❤️ pela Comunidade AI Makers Club 🤖