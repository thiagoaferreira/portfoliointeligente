# Estágio único super simplificado
FROM node:18-alpine

# Configurações de ambiente
ENV NODE_ENV=production
ENV PORT=5000

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json para aproveitar o cache em camadas
COPY package*.json ./

# Instalar dependências com npm
RUN npm install

# Copiar o restante do código fonte
COPY . .

# Compilar a aplicação
RUN npm run build

# Expor a porta padrão
EXPOSE 5000

# Iniciar a aplicação 
CMD ["npm", "run", "start"]