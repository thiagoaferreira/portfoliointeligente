import React from 'react';
import styled from 'styled-components';

// Componente que mostra o indicador de digitação
const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: rgba(45, 55, 72, 0.7);
  border-radius: 1rem;
  width: fit-content;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  max-width: 80px;
  
  span {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    display: inline-block;
    margin: 0 2px;
    
    &:nth-child(1) {
      animation: typingBounce 1.3s infinite 0s;
    }
    
    &:nth-child(2) {
      animation: typingBounce 1.3s infinite 0.2s;
    }
    
    &:nth-child(3) {
      animation: typingBounce 1.3s infinite 0.4s;
    }
  }
  
  @keyframes typingBounce {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }
`;

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
`;

// Componente de Indicador de Digitação
const TypingIndicator: React.FC = () => {
  return (
    <MessageWrapper $isUser={false} className="zoom-in-bounce">
      <TypingIndicatorContainer>
        <span></span>
        <span></span>
        <span></span>
      </TypingIndicatorContainer>
    </MessageWrapper>
  );
};

export default TypingIndicator;