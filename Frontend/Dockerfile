FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20
WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 5173

CMD ["npm", "run", "start"]