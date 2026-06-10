import dotenv from 'dotenv'
dotenv.config()

import Fastify from "fastify";
import App from "./App";
import { connectDB } from "./db/db-pool";

const server = Fastify({
  logger: true
});

try {
    await connectDB();
} catch(err) {
    console.log("Database connection problem!");
    process.exit(1);
}

const start = async () => {
  try {
    await server.register(App);

    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start()