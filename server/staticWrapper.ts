import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { log } from "./vite";

/**
 * Versão resiliente da função serveStatic que tenta múltiplos caminhos
 * para encontrar os arquivos estáticos da build
 */
export function serveStaticResiliente(app: Express) {
  // Lista de caminhos possíveis para a pasta de build
  const possiblePaths = [
    path.resolve(process.cwd(), "server", "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public"),
    path.resolve(process.cwd(), "../dist/public"),
    path.resolve(process.cwd(), "client/dist"),
    path.resolve(process.cwd(), "build")
  ];

  // Tenta encontrar um caminho válido
  let distPath = null;
  for (const pathToTry of possiblePaths) {
    if (fs.existsSync(pathToTry)) {
      log(`✅ Diretório de build encontrado em: ${pathToTry}`);
      distPath = pathToTry;
      break;
    }
  }

  // Se não encontrou nenhum caminho válido, tenta criar um último fallback
  if (!distPath) {
    log("⚠️ Não foi possível encontrar o diretório de build. Tentando usar o que foi gerado...");
    distPath = path.resolve(process.cwd(), "dist", "public");
    
    // Cria o diretório se não existir
    if (!fs.existsSync(distPath)) {
      try {
        fs.mkdirSync(distPath, { recursive: true });
        
        // Cria um HTML básico como fallback
        const indexPath = path.join(distPath, "index.html");
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>IA Makers Club</title>
            <style>
              body { font-family: Arial, sans-serif; background: #f0f0f0; color: #333; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .container { text-align: center; background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 600px; }
              h1 { color: #5f3dc4; }
              p { margin-bottom: 1.5rem; }
              .loader { border: 5px solid #f3f3f3; border-top: 5px solid #5f3dc4; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 20px auto; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              .btn { background: #5f3dc4; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; text-decoration: none; }
              .btn:hover { background: #4c319e; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>IA Makers Club</h1>
              <p>Estamos carregando a interface da nossa plataforma de agentes de IA.</p>
              <div class="loader"></div>
              <p>Por favor, aguarde enquanto preparamos tudo para você...</p>
              <a href="/" class="btn">Recarregar a página</a>
            </div>
            <script>
              // Recarrega a página automaticamente após 5 segundos
              setTimeout(() => window.location.reload(), 5000);
            </script>
          </body>
          </html>
        `;
        
        fs.writeFileSync(indexPath, htmlContent);
        log(`✅ Arquivo index.html de emergência criado em ${indexPath}`);
      } catch (error) {
        log(`❌ Erro ao criar diretório/arquivo de fallback: ${error}`);
        throw new Error(
          `Não foi possível encontrar ou criar o diretório de build: ${distPath}`
        );
      }
    }
  }

  log(`📂 Servindo arquivos estáticos de: ${distPath}`);
  app.use(express.static(distPath));

  // Verifica se o arquivo index.html existe
  const indexPath = path.join(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    log(`⚠️ Arquivo index.html não encontrado em ${indexPath}`);
    
    throw new Error(
      `Arquivo index.html não encontrado em ${indexPath}. Por favor, execute "npm run build" para criar os arquivos de build.`
    );
  }

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(indexPath);
  });
}