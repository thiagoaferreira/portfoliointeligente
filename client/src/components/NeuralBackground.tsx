import React from 'react';
import styled from 'styled-components';

const NeuronBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.1;
  pointer-events: none;
`;

const NeuralBackground: React.FC = () => {
  return (
    <NeuronBg aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neuron-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b46c1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Network lines */}
        <g stroke="url(#neuron-gradient)" strokeWidth="0.5" opacity="0.6">
          <line x1="100" y1="100" x2="300" y2="200" />
          <line x1="300" y1="200" x2="500" y2="150" />
          <line x1="500" y1="150" x2="700" y2="250" />
          <line x1="100" y1="300" x2="300" y2="400" />
          <line x1="300" y1="400" x2="500" y2="350" />
          <line x1="500" y1="350" x2="700" y2="450" />
          <line x1="100" y1="500" x2="300" y2="600" />
          <line x1="300" y1="600" x2="500" y2="550" />
          <line x1="500" y1="550" x2="700" y2="650" />
          <line x1="300" y1="200" x2="300" y2="400" />
          <line x1="300" y1="400" x2="300" y2="600" />
          <line x1="500" y1="150" x2="500" y2="350" />
          <line x1="500" y1="350" x2="500" y2="550" />
        </g>
        {/* Network nodes */}
        <g fill="url(#neuron-gradient)">
          <circle cx="100" cy="100" r="8" />
          <circle cx="300" cy="200" r="10" />
          <circle cx="500" cy="150" r="8" />
          <circle cx="700" cy="250" r="10" />
          <circle cx="100" cy="300" r="8" />
          <circle cx="300" cy="400" r="10" />
          <circle cx="500" cy="350" r="8" />
          <circle cx="700" cy="450" r="10" />
          <circle cx="100" cy="500" r="8" />
          <circle cx="300" cy="600" r="10" />
          <circle cx="500" cy="550" r="8" />
          <circle cx="700" cy="650" r="10" />
        </g>
      </svg>
    </NeuronBg>
  );
};

export default NeuralBackground;
