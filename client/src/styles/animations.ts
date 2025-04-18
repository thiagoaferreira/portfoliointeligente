import { keyframes } from 'styled-components';

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const particle = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-800px) translateX(100px); opacity: 0; }
`;

export const particleDelayed = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-800px) translateX(100px); opacity: 0; }
`;

export const glowEffect = keyframes`
  0% { transform: rotate(30deg) translateX(-100%); }
  100% { transform: rotate(30deg) translateX(100%); }
`;

export const pulseLight = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.5; }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const slideDown = keyframes`
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const slideInLeft = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const slideInRight = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const scale = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

export const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.2);
  }
  100% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
  }
`;

export const borderGlow = keyframes`
  0% {
    border-color: rgba(139, 92, 246, 0.3);
  }
  50% {
    border-color: rgba(139, 92, 246, 0.7);
  }
  100% {
    border-color: rgba(139, 92, 246, 0.3);
  }
`;
