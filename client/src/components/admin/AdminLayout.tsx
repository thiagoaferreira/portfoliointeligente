import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import styled from 'styled-components';
import { fadeIn } from '@/styles/animations';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1644 0%, #0f172a 100%);
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 4rem 1.5rem 1.5rem;
  }
`;

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <LayoutContainer>
      <AdminSidebar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
}