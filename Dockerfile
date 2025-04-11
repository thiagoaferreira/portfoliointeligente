# Estágio de build
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar todas as dependências incluindo as de desenvolvimento
RUN npm install

# Copiar o restante do código fonte
COPY . .

# Compilar o frontend com npx
RUN npx vite build

# Compilar o backend com npx
RUN npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Estágio de produção
FROM node:18-alpine

# Configurações de ambiente
ENV NODE_ENV=production
ENV PORT=5000
ENV NODE_OPTIONS=--experimental-specifier-resolution=node
# Variável de ambiente para o logo (pode ser sobrescrita durante o deploy)
ENV VITE_LOGO_URL=https://meudominio.com/nomedaimagem.svg
# Variável de ambiente para o webhook (pode ser sobrescrita durante o deploy)
ENV VITE_WEBHOOK_URL=https://webhook.dev.testandoaulanapratica.shop/webhook/portfolio_virtual

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm install --production

# Copiar arquivos compilados do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/server/vite.ts ./server/vite.ts

# Expor a porta padrão
EXPOSE 5000

# Iniciar a aplicação - usando node diretamente para evitar problemas com scripts npm
CMD ["node", "dist/index.js"]