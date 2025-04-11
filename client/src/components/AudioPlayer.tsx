import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

// Container estilizado para o player de áudio
const AudioContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  
  .audio-player {
    width: 100%;
    height: 40px;
    margin-bottom: 4px;
    border-radius: 20px;
  }
  
  .audio-info {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .audio-icon {
    margin-right: 5px;
  }
  
  .audio-duration {
    margin-left: auto;
  }
`;

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioDuration, setAudioDuration] = useState<string>('00:00');
  
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
        <span className="audio-icon">
          <i className="fas fa-microphone"></i>
        </span>
        <span>Áudio</span>
        <span className="audio-duration">{audioDuration}</span>
      </div>
    </AudioContainer>
  );
};

export default AudioPlayer;