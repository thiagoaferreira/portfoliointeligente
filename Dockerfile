# Estágio de construção
FROM node:20-alpine AS build

# Configurações de ambiente
ENV NODE_ENV=production

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o código fonte da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM node:20-alpine AS production

# Diretório de trabalho
WORKDIR /app

# Variáveis de ambiente
ENV NODE_ENV=production

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --production

# Copiar o código compilado do estágio de construção
COPY --from=build /app/dist ./dist
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/server ./server

# Expor a porta que o servidor usa
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "server/index.js"]