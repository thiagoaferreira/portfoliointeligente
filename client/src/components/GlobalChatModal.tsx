import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Singleton para gerenciar o estado global do modal
export class ChatModalManager {
  private static instance: ChatModalManager;
  private isOpen: boolean = false;
  private agentName: string = '';
  private agentIcon: string = '';
  private listeners: Function[] = [];

  private constructor() {}

  static getInstance(): ChatModalManager {
    if (!ChatModalManager.instance) {
      ChatModalManager.instance = new ChatModalManager();
    }
    return ChatModalManager.instance;
  }

  openModal(agentName: string, agentIcon: string): void {
    this.isOpen = true;
    this.agentName = agentName;
    this.agentIcon = agentIcon;
    this.notifyListeners();
  }

  closeModal(): void {
    this.isOpen = false;
    this.notifyListeners();
  }

  getState(): { isOpen: boolean; agentName: string; agentIcon: string } {
    return {
      isOpen: this.isOpen,
      agentName: this.agentName,
      agentIcon: this.agentIcon
    };
  }

  subscribe(listener: Function): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

// Hook para usar o gerenciador de modal
export function useChatModal() {
  const [state, setState] = useState<{
    isOpen: boolean;
    agentName: string;
    agentIcon: string;
  }>({
    isOpen: false,
    agentName: '',
    agentIcon: ''
  });

  useEffect(() => {
    const modalManager = ChatModalManager.getInstance();
    setState(modalManager.getState());
    
    const unsubscribe = modalManager.subscribe((newState: any) => {
      setState(newState);
    });
    
    return unsubscribe;
  }, []);

  const openModal = (agentName: string, agentIcon: string) => {
    ChatModalManager.getInstance().openModal(agentName, agentIcon);
  };

  const closeModal = () => {
    ChatModalManager.getInstance().closeModal();
  };

  return {
    ...state,
    openModal,
    closeModal
  };
}

// Componentes UI para o modal
const zoomInBounce = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  background: rgba(22, 27, 58, 0.95);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(139, 92, 246, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(to right, #1e3a8a, #1a2151);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
`;

const AgentAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #6b46c1, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 1rem;
  font-size: 1.25rem;
`;

const AgentInfo = styled.div`
  flex: 1;
`;

const AgentName = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.125rem;
`;

const AgentStatus = styled.p`
  margin: 0;
  color: #a5b4fc;
  font-size: 0.875rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  padding: 8px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  position: relative;
  z-index: 10;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px;
  max-height: 50vh;
  background-image: 
    linear-gradient(rgba(22, 27, 58, 0.95), rgba(22, 27, 58, 0.95)),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L70 30 L50 10 L30 30 Z' fill='%236b46c1' fill-opacity='0.05'/%3E%3C/svg%3E");
`;

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
`;

const BubbleContainer = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: ${props => props.$isUser 
    ? 'linear-gradient(to right, #6b46c1, #2563eb)' 
    : 'rgba(45, 55, 72, 0.7)'};
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 0.5rem solid transparent;
    ${props => props.$isUser 
      ? 'border-left-color: #2563eb; right: -0.75rem; top: 50%; transform: translateY(-50%);'
      : 'border-right-color: rgba(45, 55, 72, 0.7); left: -0.75rem; top: 50%; transform: translateY(-50%);'
    }
  }
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 0.5rem;
  align-self: flex-end;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.7);
  gap: 0.75rem;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
`;

const ChatInput = styled.input`
  flex: 1;
  background: rgba(45, 55, 72, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 1.5rem;
  padding: 0.75rem 1.25rem;
  color: white;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: rgba(139, 92, 246, 0.6);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(to right, #6b46c1, #2563eb);
  border: none;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
  createdAt: number;
  type?: 'audio' | 'image' | 'document' | 'video' | 'text';
}

// Renderizador de conteúdo baseado no tipo da mensagem
interface MessageContentProps {
  message: Message;
}

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  const { text, type } = message;
  
  switch (type) {
    case 'image':
      return (
        <div className="message-content-image">
          <img src={text} alt="Imagem enviada" style={{ maxWidth: '100%', borderRadius: '0.5rem', marginBottom: '0.5rem' }} />
        </div>
      );
    
    case 'audio':
      return (
        <div className="message-content-audio">
          <audio controls src={text} style={{ width: '100%', marginBottom: '0.5rem' }}>
            Seu navegador não suporta o elemento de áudio.
          </audio>
        </div>
      );
    
    case 'video':
      return (
        <div className="message-content-video">
          <video controls src={text} style={{ maxWidth: '100%', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      );
    
    case 'document':
      return (
        <div className="message-content-document">
          <a 
            href={text} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'white', 
              textDecoration: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              marginBottom: '0.5rem'
            }}
          >
            <i className="fas fa-file-alt" style={{ marginRight: '0.5rem' }}></i>
            Abrir documento
          </a>
        </div>
      );
    
    case 'text':
    default:
      return <div className="message-content-text">{text}</div>;
  }
};

// Componente principal GlobalChatModal
const GlobalChatModal: React.FC = () => {
  const { isOpen, agentName, agentIcon, closeModal } = useChatModal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(1);
  
  // Reseta as mensagens e adiciona a mensagem inicial quando o modal é aberto
  useEffect(() => {
    if (isOpen && agentName) {
      setMessages([{
        id: 1,
        text: `Olá! Eu sou o assistente virtual para ${agentName}. Como posso ajudar você hoje?`,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      }]);
      messageIdCounter.current = 2;
    }
  }, [isOpen, agentName]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Função para converter nomes para um formato URL amigável
  const slugifyAgentName = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove múltiplos hífens
      .replace(/^-+|-+$/g, ''); // Remove hífens no início e fim
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const newUserMessage: Message = {
      id: messageIdCounter.current++,
      text: inputValue,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Prepara o formato do payload para o webhook
    const webhookPayload = {
      agent: slugifyAgentName(agentName),
      message: inputValue,
      typeMessage: "text"
    };
    
    // Envia requisição HTTP POST para o webhook
    fetch('https://webhook.dev.testandoaulanapratica.shop/webhook/portfolio_virtual', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })
    .then(response => response.json())
    .then((responseData) => {
      console.log('Webhook response data:', responseData);
      
      // Extrai as mensagens da estrutura aninhada
      let messages: Array<{message: string, typeMessage: 'audio' | 'image' | 'document' | 'video' | 'text'}> = [];
      
      // Tenta acessar cada formato possível de resposta
      if (Array.isArray(responseData) && responseData.length > 0) {
        // Formato: [{messages: [{message, typeMessage}, ...]}]
        if (responseData[0]?.messages && Array.isArray(responseData[0].messages)) {
          messages = responseData[0].messages;
        } 
        // Formato: [{message, typeMessage}, ...]
        else if (responseData[0]?.message && responseData[0]?.typeMessage) {
          messages = responseData;
        }
      }
      
      // Processa cada mensagem da resposta com delay entre elas
      if (messages.length > 0) {
        console.log('Mensagens processadas:', messages);
        
        // Função para adicionar mensagens sequencialmente com delay
        const addMessagesWithDelay = (messages: typeof messages, index: number) => {
          if (index >= messages.length) return;
          
          const item = messages[index];
          const newAgentMessage: Message = {
            id: messageIdCounter.current++,
            text: item.message,
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            createdAt: Date.now(),
            type: item.typeMessage
          };
          
          setMessages(prev => [...prev, newAgentMessage]);
          
          // Agenda a próxima mensagem com delay de 2 segundos
          setTimeout(() => {
            addMessagesWithDelay(messages, index + 1);
          }, 2000);
        };
        
        // Inicia o processo com a primeira mensagem
        addMessagesWithDelay(messages, 0);
      } else {
        // Fallback para quando não há resposta do webhook ou formato é inválido
        console.log('Usando mensagem fallback - formato de resposta não reconhecido');
        const fallbackMessage: Message = {
          id: messageIdCounter.current++,
          text: `Como posso ajudar você com ${agentName}?`,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: Date.now(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      }
    })
    .catch(error => {
      console.error('Erro ao enviar para o webhook:', error);
      // Mensagem de erro caso a requisição falhe
      const errorMessage: Message = {
        id: messageIdCounter.current++,
        text: `Desculpe, estamos com dificuldades técnicas. Por favor, tente novamente mais tarde.`,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    });
    
    setInputValue('');
  };
  
  // Handlers para fechar o modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log("Fechando modal via clique outside");
      closeModal();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      console.log("Fechando modal via ESC");
      closeModal();
    }
  };
  
  const handleCloseButtonClick = (e: React.MouseEvent) => {
    console.log("Fechando modal via botão X");
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  };
  
  return (
    <ModalOverlay 
      $isOpen={isOpen} 
      onClick={handleOverlayClick} 
      onKeyDown={handleKeyDown} 
      className="fade-in"
    >
      <ModalContainer className="zoom-in-bounce" onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <AgentAvatar>
            <i className={agentIcon}></i>
          </AgentAvatar>
          <AgentInfo>
            <AgentName>{agentName}</AgentName>
            <AgentStatus>Online agora</AgentStatus>
          </AgentInfo>
          <CloseButton onClick={handleCloseButtonClick}>×</CloseButton>
        </ModalHeader>
        
        <ChatArea>
          {messages.map(message => (
            <MessageWrapper 
              key={`${message.id}-${message.createdAt}`}
              $isUser={message.isUser}
              className="zoom-in-bounce"
            >
              <BubbleContainer $isUser={message.isUser}>
                <MessageContent message={message} />
                <MessageTime>{message.time}</MessageTime>
              </BubbleContainer>
            </MessageWrapper>
          ))}
          <div ref={messagesEndRef} />
        </ChatArea>
        
        <InputArea>
          <ChatInput
            type="text"
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage}>
            <i className="fas fa-paper-plane"></i>
          </SendButton>
        </InputArea>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GlobalChatModal;