import { db } from "./db";
import { agents, agentPrompts, users } from "@shared/schema";
import { hashPassword } from "./auth";

async function main() {
  console.log("Iniciando migração do banco de dados...");
  
  try {
    // Cria as tabelas no banco de dados
    console.log("Criando tabelas...");
    
    // Tabela de usuários
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✅ Tabela de usuários criada com sucesso");
    
    // Tabela de agentes
    await db.execute(`
      CREATE TABLE IF NOT EXISTS agents (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✅ Tabela de agentes criada com sucesso");
    
    // Tabela de prompts de agentes
    await db.execute(`
      CREATE TABLE IF NOT EXISTS agent_prompts (
        id SERIAL PRIMARY KEY,
        agent_id INTEGER NOT NULL REFERENCES agents(id),
        prompt TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✅ Tabela de prompts de agentes criada com sucesso");
    
    // Verifica se o usuário admin já existe
    const adminResult = await db.execute(`
      SELECT * FROM users WHERE username = 'admin';
    `);
    
    // Se o usuário admin não existir, cria-o
    if (adminResult.rows.length === 0) {
      console.log("Criando usuário admin padrão...");
      
      const hashedPassword = await hashPassword("admin");
      
      await db.execute(`
        INSERT INTO users (username, password, "isAdmin")
        VALUES ('admin', '${hashedPassword}', true);
      `);
      
      console.log("✅ Usuário admin criado com sucesso");
    } else {
      console.log("✅ Usuário admin já existe");
    }
    
    // Insere os agentes padrão da aplicação a partir dos dados existentes
    const agentsData = [
      { title: "Comercial", description: "Assistente virtual para equipes comerciais e vendas", icon: "fas fa-briefcase" },
      { title: "Clínicas", description: "Assistente especializado para clínicas médicas", icon: "fas fa-hospital" },
      { title: "Imobiliário", description: "Assistente para corretores e imobiliárias", icon: "fas fa-home" },
      { title: "Jurídico", description: "Assistente para advogados e escritórios jurídicos", icon: "fas fa-balance-scale" },
      { title: "Financeiro", description: "Assistente para consultores financeiros", icon: "fas fa-chart-line" },
      { title: "Infoprodutos", description: "Assistente para criadores de conteúdo digital", icon: "fas fa-laptop" },
      { title: "Atendimento", description: "Assistente para suporte ao cliente", icon: "fas fa-headset" },
      { title: "Recuperação", description: "Assistente para recuperação de vendas", icon: "fas fa-undo" },
      { title: "RH", description: "Assistente para recursos humanos", icon: "fas fa-users" },
      { title: "Escolas", description: "Assistente para instituições educacionais", icon: "fas fa-graduation-cap" },
      { title: "Terapeutas", description: "Assistente para terapeutas", icon: "fas fa-brain" },
      { title: "Psicólogos", description: "Assistente para psicólogos", icon: "fas fa-heart" }
    ];
    
    // Verifica se os agentes já existem
    const agentsResult = await db.execute(`
      SELECT * FROM agents;
    `);
    
    if (agentsResult.rows.length === 0) {
      console.log("Inserindo agentes padrão...");
      
      for (const agent of agentsData) {
        await db.execute(`
          INSERT INTO agents (title, description, icon)
          VALUES ('${agent.title}', '${agent.description}', '${agent.icon}');
        `);
      }
      
      console.log("✅ Agentes padrão inseridos com sucesso");
    } else {
      console.log("✅ Agentes já existem no banco de dados");
    }
    
    console.log("✅ Migração concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();