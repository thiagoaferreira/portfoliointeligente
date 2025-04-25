/**
 * Este arquivo fornece funções de resolução de caminhos seguras
 * que funcionam tanto em ambiente de desenvolvimento quanto em produção
 */

import path from 'path';
import fs from 'fs';

/**
 * Tenta resolver um caminho de forma segura, testando diferentes abordagens
 * @param basePaths Caminhos base para tentar resolver
 * @param subPath Subcaminho para adicionar ao caminho base
 * @returns O caminho resolvido ou null se não for possível resolver
 */
export function safeResolve(basePaths: string[], subPath: string): string | null {
  // Lista dos caminhos possíveis a serem tentados
  const possiblePaths = basePaths.map(basePath => 
    path.join(basePath, subPath)
  );

  // Adiciona caminhos relativos baseados no diretório atual
  possiblePaths.push(
    path.join(process.cwd(), subPath),
    path.join(process.cwd(), 'dist', subPath),
    path.join(process.cwd(), 'server', subPath),
    path.join(process.cwd(), 'client', subPath)
  );

  // Tenta cada caminho
  for (const pathToTry of possiblePaths) {
    if (fs.existsSync(pathToTry)) {
      console.log(`Caminho encontrado: ${pathToTry}`);
      return pathToTry;
    }
  }

  // Nenhum caminho encontrado
  return null;
}

/**
 * Verifica se está em ambiente de produção
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Retorna o diretório público para servir arquivos estáticos
 * @returns Caminho para o diretório público ou null se não for encontrado
 */
export function getPublicDir(): string | null {
  if (isProduction()) {
    const publicPaths = [
      '/app/dist/public',
      '/app/public',
      '/app/client/dist',
      path.join(process.cwd(), 'dist', 'public'),
      path.join(process.cwd(), 'public')
    ];
    
    // Verifica cada caminho
    for (const pathToTry of publicPaths) {
      if (fs.existsSync(pathToTry)) {
        return pathToTry;
      }
    }
    
    // Fallback - usar o diretório atual
    return process.cwd();
  } else {
    // Em desenvolvimento, usar o caminho padrão
    return null;
  }
}