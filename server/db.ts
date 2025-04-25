import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do WebSocket para o NeonDB
// Verifica se estamos em produção para desativar WebSockets se necessário
// Para evitar problemas de WebSockets, adicionamos tratamento de erros robusto
const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  console.log('🔧 Ambiente de produção detectado, ajustando configurações de conexão...');
  
  // Em produção, configuramos para evitar problemas de conexão
  // Nota: Algumas configurações podem não estar disponíveis em todas as versões
  try {
    // @ts-ignore - Em algumas versões, estas propriedades existem
    neonConfig.pipelineConnect = false; // Mais estável em alguns ambientes
  } catch (e) {
    console.warn('⚠️ Algumas configurações de conexão podem não estar disponíveis na versão atual.');
  }
} 

// Definir o construtor de WebSocket
neonConfig.webSocketConstructor = ws;

// Tenta obter a DATABASE_URL a partir das variáveis de ambiente
let databaseUrl = process.env.DATABASE_URL;

// Se não encontrar DATABASE_URL, tenta construir a partir de variáveis individuais
if (!databaseUrl) {
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT || '5432';
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  
  if (dbHost && dbUser && dbPassword && dbName) {
    databaseUrl = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
    console.log(`⚡ DATABASE_URL construído a partir de variáveis individuais. Utilizando host: ${dbHost}`);
  } else {
    console.error('⚠️ DATABASE_URL não encontrado e não foi possível construir a partir de variáveis individuais.');
    console.error('Por favor, defina a variável DATABASE_URL ou as variáveis DB_HOST, DB_PORT, DB_USER, DB_PASSWORD e DB_NAME.');
    
    // Em desenvolvimento, podemos definir uma URL para um banco local ou criar uma URL mock
    if (!isProduction) {
      databaseUrl = 'postgres://postgres:postgres@localhost:5432/postgres';
      console.warn('⚠️ Usando uma URL padrão para desenvolvimento local. Isso não funcionará em produção!');
    } else {
      throw new Error(
        "DATABASE_URL deve ser definido no ambiente. Você esqueceu de provisionar um banco de dados?"
      );
    }
  }
}

// Configuração de pool de conexões com opções seguras
export const pool = new Pool({ 
  connectionString: databaseUrl,
  max: 10, // máximo de conexões no pool
  idleTimeoutMillis: 30000, // tempo máximo que uma conexão pode ficar inativa
  connectionTimeoutMillis: 5000, // tempo máximo para estabelecer conexão
});

// Evento para monitorar erros na pool de conexões
pool.on('error', (err) => {
  console.error('❌ Erro inesperado no pool de conexões:', err.message);
});

// Criação da instância Drizzle com tratamento de erro melhorado
export const db = drizzle(pool, { schema });