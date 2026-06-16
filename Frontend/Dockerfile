FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN apt-get update && apt-get install -y curl

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5173

CMD ["./entrypoint.sh"]