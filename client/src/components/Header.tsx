import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';

const HeaderContainer = styled.header`
  position: relative;
  z-index: 10;
  padding: 1.5rem 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 1.5rem 4rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const LogoText = styled.h1`
  font-size: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
  
  color: white;
  font-family: 'Audiowide', cursive;
  
  span {
    color: #a78bfa;
  }
`;

const Navigation = styled.nav`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

const NavLink = styled.a`
  color: #d1d5db;
  transition: color 0.3s ease;
  
  &:hover {
    color: #c4b5fd;
  }
`;

const ButtonContainer = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const LoginButton = styled.a`
  padding: 0.625rem 1.25rem;
  background: linear-gradient(to right, #6b46c1, #2563eb);
  color: white;
  border-radius: 0.5rem;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(107, 70, 193, 0.2);
  }
`;

const MobileMenuButton = styled.button`
  color: white;
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <LogoIcon>
            <i className="fas fa-brain"></i>
          </LogoIcon>
          <LogoText>Nexus<span>AI</span></LogoText>
        </LogoContainer>
        
        <Navigation>
          <NavLink href="#">Início</NavLink>
          <NavLink href="#agents">Agentes</NavLink>
          <NavLink href="#">Sobre</NavLink>
          <NavLink href="#">Contato</NavLink>
        </Navigation>
        
        <ButtonContainer>
          <LoginButton href="#">Login</LoginButton>
        </ButtonContainer>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className="fas fa-bars"></i>
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
