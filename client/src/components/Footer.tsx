import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  position: relative;
  z-index: 10;
  padding: 3rem 1rem;
  background-color: rgba(15, 23, 42, 0.8);
  border-top: 1px solid rgba(139, 92, 246, 0.2);
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem 4rem;
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Column = styled.div``;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(to bottom right, #6b46c1, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LogoText = styled.h3`
  font-size: 1.5rem;
  color: white;
  font-family: 'Audiowide', cursive;
  
  span {
    color: #a78bfa;
  }
`;

const FooterText = styled.p`
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #9ca3af;
  transition: color 0.3s ease;
  
  &:hover {
    color: #c4b5fd;
  }
`;

const ColumnTitle = styled.h4`
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  transition: color 0.3s ease;
  
  &:hover {
    color: #c4b5fd;
  }
`;

const BottomBar = styled.div`
  padding-top: 2rem;
  border-top: 1px solid #374151;
  text-align: center;
  
  @media (min-width: 640px) {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
`;

const Copyright = styled.p`
  color: #6b7280;
`;

const BottomLinks = styled.div`
  margin-top: 1rem;
  
  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

const BottomLink = styled.a`
  color: #6b7280;
  transition: color 0.3s ease;
  margin-right: 1.5rem;
  
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    color: #c4b5fd;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterGrid>
          <Column>
            <LogoContainer>
              <LogoIcon>
                <i className="fas fa-brain"></i>
              </LogoIcon>
              <LogoText>Nexus<span>AI</span></LogoText>
            </LogoContainer>
            <FooterText>
              Transformando empresas através da inteligência artificial avançada e agentes especializados.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#"><i className="fab fa-twitter"></i></SocialLink>
              <SocialLink href="#"><i className="fab fa-linkedin"></i></SocialLink>
              <SocialLink href="#"><i className="fab fa-instagram"></i></SocialLink>
              <SocialLink href="#"><i className="fab fa-github"></i></SocialLink>
            </SocialLinks>
          </Column>
          
          <Column>
            <ColumnTitle>Agentes</ColumnTitle>
            <LinksList>
              <li><FooterLink href="#">Analista de Dados</FooterLink></li>
              <li><FooterLink href="#">Assistente de Atendimento</FooterLink></li>
              <li><FooterLink href="#">Criador de Conteúdo</FooterLink></li>
              <li><FooterLink href="#">Automatizador de Fluxos</FooterLink></li>
              <li><FooterLink href="#">Assistente de Pesquisa</FooterLink></li>
              <li><FooterLink href="#">Gerador de Código</FooterLink></li>
            </LinksList>
          </Column>
          
          <Column>
            <ColumnTitle>Empresa</ColumnTitle>
            <LinksList>
              <li><FooterLink href="#">Sobre Nós</FooterLink></li>
              <li><FooterLink href="#">Carreiras</FooterLink></li>
              <li><FooterLink href="#">Blog</FooterLink></li>
              <li><FooterLink href="#">Notícias</FooterLink></li>
              <li><FooterLink href="#">Contato</FooterLink></li>
            </LinksList>
          </Column>
          
          <Column>
            <ColumnTitle>Recursos</ColumnTitle>
            <LinksList>
              <li><FooterLink href="#">Documentação</FooterLink></li>
              <li><FooterLink href="#">FAQ</FooterLink></li>
              <li><FooterLink href="#">Tutoriais</FooterLink></li>
              <li><FooterLink href="#">Suporte</FooterLink></li>
              <li><FooterLink href="#">API</FooterLink></li>
            </LinksList>
          </Column>
        </FooterGrid>
        
        <BottomBar>
          <Copyright>© 2023 NexusAI. Todos os direitos reservados.</Copyright>
          <BottomLinks>
            <BottomLink href="#">Política de Privacidade</BottomLink>
            <BottomLink href="#">Termos de Uso</BottomLink>
          </BottomLinks>
        </BottomBar>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
