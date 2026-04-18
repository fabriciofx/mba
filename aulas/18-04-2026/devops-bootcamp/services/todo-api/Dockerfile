FROM node:24-alpine AS test
WORKDIR /app

COPY package.json ./
RUN npm install

COPY src ./src
COPY test ./test
RUN npm test

FROM node:24-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY src ./src

EXPOSE 3000
USER node

CMD ["node", "src/index.js"]
