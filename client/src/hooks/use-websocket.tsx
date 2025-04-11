import { useState, useEffect, useRef, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const maxReconnectAttempts = options.reconnectAttempts || 5;
  const reconnectIntervalMs = options.reconnectInterval || 3000;

  // Inicializa a conexão WebSocket
  const connect = useCallback(() => {
    // Determina o protocolo (ws/wss) baseado na segurança da conexão atual
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    // Fecha qualquer conexão existente
    if (socketRef.current) {
      socketRef.current.close();
    }
    
    // Cria nova conexão WebSocket
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;
    
    // Define os manipuladores de eventos
    socket.onopen = () => {
      console.log('Conexão WebSocket estabelecida');
      setIsConnected(true);
      reconnectCountRef.current = 0;
      if (options.onOpen) options.onOpen();
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
        if (options.onMessage) options.onMessage(data);
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    };
    
    socket.onclose = (event) => {
      console.log('Conexão WebSocket fechada', event.code);
      setIsConnected(false);
      
      if (options.onClose) options.onClose();
      
      // Tenta reconectar se não foi um fechamento limpo e ainda temos tentativas
      if (!event.wasClean && reconnectCountRef.current < maxReconnectAttempts) {
        reconnectCountRef.current += 1;
        setTimeout(connect, reconnectIntervalMs);
      }
    };
    
    socket.onerror = (error) => {
      console.error('Erro WebSocket:', error);
      if (options.onError) options.onError(error);
    };
  }, [
    options.onOpen, 
    options.onMessage, 
    options.onClose, 
    options.onError,
    maxReconnectAttempts,
    reconnectIntervalMs
  ]);
  
  // Envia uma mensagem através da conexão WebSocket
  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  }, []);
  
  // Estabelece a conexão quando o componente é montado
  useEffect(() => {
    connect();
    
    // Limpa a conexão quando o componente é desmontado
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);
  
  return { isConnected, messages, sendMessage, connect };
}