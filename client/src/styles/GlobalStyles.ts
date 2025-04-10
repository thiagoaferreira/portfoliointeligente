import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background-color: #0f172a;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(107, 70, 193, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Audiowide', cursive;
  }
  
  /* Reset some default styles */
  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  }
  
  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  button {
    cursor: pointer;
  }

  /* Keyframes for animations */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes particle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-800px) translateX(100px); opacity: 0; }
  }
  
  @keyframes glowAnimation {
    0% { transform: rotate(30deg) translateX(-100%); }
    100% { transform: rotate(30deg) translateX(100%); }
  }
`;
