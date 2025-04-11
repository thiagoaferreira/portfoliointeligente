import React from 'react';
import styled from 'styled-components';
import { useWhatsAppLink } from '../hooks/use-env-config';

const CTASection = styled.section`
  position: relative;
  z-index: 10;
  padding: 5rem 1rem;
  
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 5rem 4rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  position: relative;
`;

const CTACard = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem;
  background: linear-gradient(to bottom right, #1e3a8a, #1a2151);
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  pointer-events: none;
`;

const CTAContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  color: white;
  margin-bottom: 1rem;
  font-family: 'Audiowide', cursive;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  width: 100%;
  padding: 0.875rem 2rem;
  background: linear-gradient(to right, #6b46c1, #2563eb);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  @media (min-width: 640px) {
    width: auto;
  }
  
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

const SecondaryButton = styled.a`
  display: inline-block;
  width: 100%;
  padding: 0.875rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1.125rem;
  transition: background-color 0.3s ease;
  
  @media (min-width: 640px) {
    width: auto;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const GridPattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="100%" height="100%" fill="none" />
        <circle cx="20" cy="20" r="1" fill="#8b5cf6" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

const CTA: React.FC = () => {
  const whatsappLink = useWhatsAppLink();
  
  return (
    <CTASection>
      <SectionContainer>
        <CTACard>
          <PatternOverlay>
            <GridPattern />
          </PatternOverlay>
          
          <CTAContent>
            <Title>Pronto para começar?</Title>
            <Description>
              Quer saber como nossos agentes de IA podem impulsionar seus resultados? 
              Fale agora mesmo com um de nossos especialistas e descubra soluções personalizadas para o seu negócio.
            </Description>
            
            <ButtonContainer>
              <PrimaryButton href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Saiba Mais
              </PrimaryButton>
            </ButtonContainer>
          </CTAContent>
        </CTACard>
      </SectionContainer>
    </CTASection>
  );
};

export default CTA;
