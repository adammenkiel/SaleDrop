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
  console.log("Connecting with db...")

  try {
    await fastify.register(DBPlugin);
  } catch(err) {
    console.log("Database connection problem!");
    process.exit(1);
  }

  //JWT
  if(!process.env.JWT_SECRET) {
    console.log("Config problem!");
    process.exit(1);
  }

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!
  })
  await fastify.register(cookie);
  await fastify.register(cors, {
    origin: "http://localhost:5173",
    credentials: true,
  });

  console.log("Completed!");
  console.log("Plugins are loading...");
  void fastify.register(AutoLoad, {
    dir: path.join(dirname, "plugins"),
    options: appOptions,
    forceESM: true
  });
  console.log("Completed!");
  console.log("Modules are loading...");
  void fastify.register(AutoLoad, {
    dir: path.join(dirname, "routes"),
    options: appOptions,
    forceESM: true
  });
  console.log("Completed!");
  
}

export default fp(App);