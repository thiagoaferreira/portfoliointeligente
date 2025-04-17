import { db } from "./db";
import { agents, users } from "@shared/schema";
import { hashPassword } from "./auth";

async function main() {
  try {
    console.log("🌱 Inicializando dados iniciais...");
    
    // Verifica se existe um usuário admin
    const existingUsers = await db.select().from(users).where(eq => eq(users.username, "admin"));
    
    if (existingUsers.length === 0) {
      console.log("Criando usuário admin padrão...");
      
      // Hash da senha 'admin'
      const hashedPassword = await hashPassword("admin");
      
      // Insere o usuário admin
      await db.insert(users).values({
        username: "admin",
        password: hashedPassword,
        isAdmin: true,
      });
      
      console.log("✅ Usuário admin criado com sucesso!");
    } else {
      console.log("✅ Usuário admin já existe!");
    }
    
    // Verifica se existem agentes
    const existingAgents = await db.select().from(agents);
    
    if (existingAgents.length === 0) {
      console.log("Criando agentes padrão...");
      
      // Lista de agentes padrão
      const defaultAgents = [
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
      
      // Insere os agentes padrão
      for (const agent of defaultAgents) {
        await db.insert(agents).values(agent);
      }
      
      console.log("✅ Agentes padrão criados com sucesso!");
    } else {
      console.log("✅ Agentes já existem!");
    }
    
    console.log("✅ Inicialização concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante a inicialização:", error);
  }
  
  process.exit(0);
}

main();