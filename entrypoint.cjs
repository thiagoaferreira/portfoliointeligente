/**
 * Script de entrada para inicialização em produção
 * Este script trata erros comuns e tenta diferentes abordagens de inicialização
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Configuração de ambiente
process.env.NODE_ENV = 'production';

// Defina a variável __dirname global para compatibilidade
global.__dirname = process.cwd();
global.__filename = __filename;

// Verifica se o diretório dist existe
if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
  console.error('Erro: Diretório dist não encontrado!');
  process.exit(1);
}

// Verifica se o arquivo index.js existe
const indexPath = path.join(process.cwd(), 'dist', 'index.js');
if (!fs.existsSync(indexPath)) {
  console.error(`Erro: Arquivo ${indexPath} não encontrado!`);
  process.exit(1);
}

// Função para executar um comando com logs
function execCommand(command, args, onExit) {
  console.log(`Executando: ${command} ${args.join(' ')}`);
  
  const child = spawn(command, args, { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  child.on('exit', (code) => {
    console.log(`Processo encerrado com código ${code}`);
    if (code !== 0 && onExit) {
      onExit();
    }
  });
  
  return child;
}

// Tenta iniciar o aplicativo com diferentes métodos
console.log('Iniciando aplicativo em modo de produção...');

// Método 1: ESM com resolução experimental
const child1 = execCommand('node', [
  '--experimental-specifier-resolution=node',
  '--experimental-modules',
  '--experimental-json-modules',
  indexPath
], () => {
  console.log('Método 1 falhou, tentando método 2...');
  
  // Método 2: Modo CommonJS padrão
  const child2 = execCommand('node', [indexPath], () => {
    console.log('Método 2 falhou, tentando método 3...');
    
    // Método 3: Usando o módulo ts-node
    execCommand('npx', ['ts-node', 'server/index.ts'], () => {
      console.error('Todos os métodos de inicialização falharam!');
      process.exit(1);
    });
  });
});