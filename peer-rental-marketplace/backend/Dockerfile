FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src
COPY server.js ./

RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
