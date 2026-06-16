import dotenv from 'dotenv'
dotenv.config()

import Fastify from "fastify";
import App from "./SaleDrop";

const server = Fastify({
  logger: true
});

const start = async () => {
  try {
    await server.register(App);
    await server.listen({ port: Number(process.env.SERVER_PORT), host: process.env.SERVER_HOST });
    server.log.info(`Server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start()