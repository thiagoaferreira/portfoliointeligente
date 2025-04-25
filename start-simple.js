// Script de inicialização simples que não depende de ES modules
// Útil como último recurso de fallback

console.log("⚠️ Iniciando aplicação em modo de compatibilidade...");

// Biblioteca de sistema para processos
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Variáveis de ambiente
process.env.NODE_ENV = 'production';

// Tenta diferentes abordagens para iniciar o servidor
try {
  console.log("📁 Verificando diretórios e arquivos essenciais...");
  
  // Verifica se os diretórios e arquivos essenciais existem
  const necessaryPaths = [
    'dist',
    'dist/index.js',
    'server',
    'shared'
  ];
  
  for (const p of necessaryPaths) {
    if (!fs.existsSync(p)) {
      console.error(`❌ Diretório ou arquivo não encontrado: ${p}`);
    } else {
      console.log(`✅ Encontrado: ${p}`);
    }
  }
  
  // Tenta iniciar o servidor da maneira mais simples possível
  console.log("🚀 Tentando iniciar o servidor...");
  
  const nodeProcess = spawn('node', ['dist/index.js'], {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: 'inherit'
  });
  
  nodeProcess.on('error', (err) => {
    console.error('❌ Erro ao iniciar o processo Node:', err);
    process.exit(1);
  });
  
  nodeProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ O processo Node saiu com código ${code}`);
      process.exit(code || 1);
    }
  });
  
} catch (error) {
  console.error('❌ Erro fatal durante a inicialização:', error);
  process.exit(1);
}