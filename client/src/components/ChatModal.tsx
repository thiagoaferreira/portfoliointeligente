import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useWebSocket } from '../hooks/use-websocket';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentIcon: string;
}

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
  
  &:hover {
    opacity: 1;
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

const bubbleZoomInBounce = keyframes`
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

// Componente de bolha de mensagem individual com sua própria animação
interface MessageBubbleProps {
  isUser: boolean;
  text: string;
  time: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ isUser, text, time }) => {
  return (
    <BubbleContainer $isUser={isUser}>
      {text}
      <MessageTime>{time}</MessageTime>
    </BubbleContainer>
  );
};

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
  createdAt: number; // timestamp para criar uma key única para cada mensagem
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, agentName, agentIcon }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Olá! Eu sou o assistente virtual para ${agentName}. Como posso ajudar você hoje?`,
      isUser: false,
      time: '09:30',
      createdAt: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(2);
  
  // Configuração WebSocket
  const { isConnected, sendMessage } = useWebSocket({
    onOpen: () => {
      console.log('WebSocket conectado para chat com', agentName);
    },
    onMessage: (data) => {
      // Processa mensagens recebidas pelo WebSocket
      if (data.type === 'agent_response' || data.type === 'system_message') {
        const newMessage: Message = {
          id: messageIdCounter.current++,
          text: data.text,
          isUser: false,
          time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: Date.now()
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }
  });
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Status de conexão
  useEffect(() => {
    if (isOpen) {
      const connectionStatusMessage: Message = {
        id: messageIdCounter.current++,
        text: isConnected 
          ? 'Conectado ao assistente virtual.' 
          : 'Conectando ao assistente virtual...',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now()
      };
      
      // Adiciona mensagem apenas na primeira conexão ou se o modal foi reaberto
      if (messages.length <= 1) {
        setMessages(prev => [...prev, connectionStatusMessage]);
      }
    }
  }, [isOpen, isConnected]);
  
  // Fecha o modal quando o usuário clica fora dele
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const newUserMessage: Message = {
      id: messageIdCounter.current++,
      text: inputValue,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Envia mensagem via WebSocket
    if (isConnected) {
      sendMessage({
        type: 'chat_message',
        text: inputValue,
        agentName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } else {
      // Fallback para caso o WebSocket não esteja conectado
      setTimeout(() => {
        const fallbackResponse: Message = {
          id: messageIdCounter.current++,
          text: `O assistente está temporariamente indisponível. Por favor, tente novamente em instantes.`,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: Date.now()
        };
        setMessages(prev => [...prev, fallbackResponse]);
      }, 1000);
    }
    
    setInputValue('');
  };
  
  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick} onKeyDown={handleKeyDown} className="fade-in">
      <ModalContainer className="zoom-in-bounce">
        <ModalHeader>
          <AgentAvatar>
            <i className={agentIcon}></i>
          </AgentAvatar>
          <AgentInfo>
            <AgentName>{agentName}</AgentName>
            <AgentStatus>Online agora</AgentStatus>
          </AgentInfo>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <ChatArea>
          {messages.map(message => (
            <MessageWrapper 
              key={`${message.id}-${message.createdAt}`}
              $isUser={message.isUser}
              className="zoom-in-bounce"
            >
              <BubbleContainer $isUser={message.isUser}>
                {message.text}
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

export default ChatModal;