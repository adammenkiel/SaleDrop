import AutoLoad from "@fastify/autoload";
import path from "path";
import { fileURLToPath } from "url";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import DBPlugin from "./db/db-pool";
import { Pool } from "pg";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from '@fastify/cors';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const App : FastifyPluginAsync = async (
  fastify: FastifyInstance,
  appOptions
) => {
  //Loading special DB plugin 
  fastify.log.info("Connecting with db...")

  try {
    await fastify.register(DBPlugin);
  } catch(err) {
    fastify.log.info("Database connection problem!");
    process.exit(1);
  }

  //JWT
  if(!process.env.JWT_SECRET) {
    fastify.log.info("Config problem!");
    process.exit(1);
  }

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!
  })
  await fastify.register(cookie);
  await fastify.register(cors, {
    origin: process.env.CORS,
    credentials: true,
  });

  fastify.log.info("Completed!");
  fastify.log.info("Plugins are loading...");
  void fastify.register(AutoLoad, {
    dir: path.join(dirname, "plugins"),
    options: appOptions,
    forceESM: true
  });
  fastify.log.info("Completed!");
  fastify.log.info("Modules are loading...");
  void fastify.register(AutoLoad, {
    dir: path.join(dirname, "routes"),
    options: appOptions,
    forceESM: true
  });
  fastify.log.info("Completed!");
  
}

export default fp(App);