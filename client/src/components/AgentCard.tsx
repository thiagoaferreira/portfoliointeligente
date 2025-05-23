import React from 'react';
import styled from 'styled-components';
import { useChatModal } from './GlobalChatModal';

interface AgentCardProps {
  icon: string;
  title: string;
  description: string;
}

const Card = styled.div`
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  padding: 1.5rem;
  background: rgba(22, 27, 58, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.2);
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(130deg, rgba(139, 92, 246, 0.15), transparent 80%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(107, 70, 193, 0.2);
    border-color: rgba(139, 92, 246, 0.4);
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 1.5rem;
  background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(37, 99, 235, 0.2));
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #c4b5fd;
  transition: transform 0.4s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: #d1d5db;
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.625rem 1.5rem;
  background: linear-gradient(to right, #6b46c1, #2563eb);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  text-align: center;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(transparent, rgba(139, 92, 246, 0.1), transparent);
    opacity: 0;
    transform: rotate(30deg);
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover:after {
    opacity: 1;
    animation: glowAnimation 1.5s infinite;
  }
  
  @keyframes glowAnimation {
    0% { transform: rotate(30deg) translateX(-100%); }
    100% { transform: rotate(30deg) translateX(100%); }
  }
`;

const AgentCard: React.FC<AgentCardProps> = ({ icon, title, description }) => {
  const { openModal } = useChatModal();
  
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(title, icon);
  };
  
  return (
    <Card>
      <IconContainer>
        <Icon>
          <i className={icon}></i>
        </Icon>
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ButtonContainer>
        <Button href="#" onClick={handleOpenModal}>
          TESTAR AGORA
        </Button>
      </ButtonContainer>
    </Card>
  );
};

export default AgentCard;
