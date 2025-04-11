import { useState, useEffect } from 'react';

// Hook para obter o logotipo da variável de ambiente
export const useLogoFromEnv = () => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  
  useEffect(() => {
    const envLogo = import.meta.env.VITE_LOGO_URL;
    const defaultLogo = 'https://static.vecteezy.com/system/resources/previews/009/384/620/original/ai-tech-artificial-intelligence-clipart-design-illustration-free-png.png';
    
    const logoSrc = envLogo || defaultLogo;
    console.log('VITE_LOGO_URL ou URL padrão:', logoSrc);
    setLogoUrl(logoSrc);
  }, []);
  
  return logoUrl;
};

// Hook para obter a URL do webhook da variável de ambiente
export const useWebhookUrl = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  
  useEffect(() => {
    const envWebhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    const defaultWebhookUrl = 'https://webhook.dev.testandoaulanapratica.shop/webhook/portfolio_virtual';
    
    const finalWebhookUrl = envWebhookUrl || defaultWebhookUrl;
    console.log('VITE_WEBHOOK_URL ou URL padrão:', finalWebhookUrl);
    setWebhookUrl(finalWebhookUrl);
  }, []);
  
  return webhookUrl;
};