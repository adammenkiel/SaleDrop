
import type { FastifyPluginAsync } from "fastify";
import { Pool } from "pg";

declare module "fastify" {
  interface FastifyInstance {
    db: Pool;
  }
}
const DBPlugin : FastifyPluginAsync = async (
  fastify
) : Promise<void> => {
  const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
  });
  
  await db.query("SELECT 1");
  fastify.decorate("db", db);

  fastify.addHook("onClose", async () => {
    await db.end();
  });
}

export default DBPlugin;