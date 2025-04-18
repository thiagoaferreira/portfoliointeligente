import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

neonConfig.webSocketConstructor = ws;

// Verifica se DATABASE_URL está definido
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL deve ser definido no arquivo .env. Você esqueceu de provisionar um banco de dados?"
  );
}

// Usa a variável DATABASE_URL do arquivo .env
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

export const db = drizzle(pool, { schema });