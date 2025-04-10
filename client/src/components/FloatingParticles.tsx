import React from 'react';
import styled, { keyframes } from 'styled-components';

const particleAnimation = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-800px) translateX(100px); opacity: 0; }
`;

const particleDelayedAnimation = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-800px) translateX(100px); opacity: 0; }
`;

const Particle = styled.div`
  position: absolute;
  background-color: rgba(139, 92, 246, 0.4);
  border-radius: 50%;
  pointer-events: none;
`;

const Particle1 = styled(Particle)`
  width: 0.25rem;
  height: 0.25rem;
  top: 25%;
  left: 25%;
  animation: ${particleAnimation} 20s linear infinite;
`;

const Particle2 = styled(Particle)`
  width: 0.5rem;
  height: 0.5rem;
  top: 33%;
  left: 50%;
  animation: ${particleDelayedAnimation} 25s linear 2s infinite;
`;

const Particle3 = styled(Particle)`
  width: 0.25rem;
  height: 0.25rem;
  top: 66%;
  left: 33%;
  animation: ${particleAnimation} 20s linear infinite;
`;

const Particle4 = styled(Particle)`
  width: 0.375rem;
  height: 0.375rem;
  top: 50%;
  left: 75%;
  animation: ${particleDelayedAnimation} 25s linear 2s infinite;
`;

const Particle5 = styled(Particle)`
  width: 0.25rem;
  height: 0.25rem;
  top: 75%;
  left: 20%;
  animation: ${particleAnimation} 20s linear infinite;
`;

const FloatingParticles: React.FC = () => {
  return (
    <>
      <Particle1 aria-hidden="true" />
      <Particle2 aria-hidden="true" />
      <Particle3 aria-hidden="true" />
      <Particle4 aria-hidden="true" />
      <Particle5 aria-hidden="true" />
    </>
  );
};

export default FloatingParticles;
