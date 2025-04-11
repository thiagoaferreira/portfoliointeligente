import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

// Container estilizado para o player de áudio
const AudioContainer = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  
  .audio-player {
    width: 100%;
    height: 40px;
    margin-bottom: 6px;
    border-radius: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .audio-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    width: 100%;
    padding: 0 5px;
  }
  
  .audio-left {
    display: flex;
    align-items: center;
  }
  
  .audio-icon {
    margin-right: 6px;
  }
  
  .audio-duration {
    font-weight: 500;
  }
`;

interface AudioPlayerProps {
  src: string;
  duration?: string; // Opcional, para exibir a duração do áudio gravado
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, duration }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioDuration, setAudioDuration] = useState<string>(duration || '00:00');
  
  // Função para formatar a duração do áudio
  const formatAudioDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Atualiza a duração quando um áudio é carregado
  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setAudioDuration(formatAudioDuration(audioRef.current.duration));
        }
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Se já estiver carregado, atualize agora
      if (audioRef.current.readyState >= 2) {
        handleLoadedMetadata();
      }
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, [src]);
  
  return (
    <AudioContainer>
      <audio 
        ref={audioRef}
        controls 
        src={src} 
        className="audio-player"
      >
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <div className="audio-info">
        <div className="audio-left">
          <span className="audio-icon">
            <i className="fas fa-microphone"></i>
          </span>
          <span>Áudio</span>
        </div>
        <span className="audio-duration">{audioDuration}</span>
      </div>
    </AudioContainer>
  );
};

export default AudioPlayer;