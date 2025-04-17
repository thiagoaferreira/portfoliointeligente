import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { setupAuth, hashPassword } from "./auth";
import { setupApiRoutes } from "./api";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configura autenticação
  const { isAdmin, isAuthenticated } = setupAuth(app);
  
  // Configura APIs
  setupApiRoutes(app);
  
  // Inicializador de dados - cria usuário admin padrão se não existir
  try {
    const adminUser = await storage.getUserByUsername("admin");
    if (!adminUser) {
      console.log("Criando usuário admin padrão...");
      await storage.createUser({
        username: "admin",
        password: await hashPassword("admin"),
        isAdmin: true
      });
      console.log("Usuário admin criado com sucesso.");
    }
  } catch (error) {
    console.error("Erro ao inicializar dados:", error);
  }

  const httpServer = createServer(app);
  
  // Configurar o servidor WebSocket em um caminho distinto
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Gerenciar conexões WebSocket
  wss.on('connection', (ws: WebSocket) => {
    console.log('Nova conexão WebSocket estabelecida');
    
    // Evento de mensagem recebida
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Mensagem recebida:', data);
        
        // Processar a mensagem baseado no tipo
        if (data.type === 'chat_message') {
          // Simular resposta do agente para a mensagem
          setTimeout(() => {
            const agentResponse = {
              type: 'agent_response',
              agentName: data.agentName || 'Assistente',
              text: `Resposta para: ${data.text}`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            // Verificar se a conexão ainda está aberta antes de enviar
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify(agentResponse));
            }
          }, 1000); // Delay artificial para simular processamento
        }
      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    });
    
    // Evento de fechamento de conexão
    ws.on('close', () => {
      console.log('Conexão WebSocket fechada');
    });
    
    // Enviar mensagem de boas-vindas
    const welcomeMessage = {
      type: 'system_message',
      text: 'Conexão WebSocket estabelecida. Bem-vindo ao chat!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    ws.send(JSON.stringify(welcomeMessage));
  });

  return httpServer;
}
