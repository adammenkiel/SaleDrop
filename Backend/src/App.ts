import AutoLoad from "@fastify/autoload";
import path from "path";
import { fileURLToPath } from "url";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import DBPlugin from "./db/db-pool";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const App : FastifyPluginAsync = async (
  fastify: FastifyInstance,
  appOptions
) => {
  console.log("Connecting with db...")
  try {
    fastify.register(DBPlugin);
  } catch(err) {
    console.log("Database connection problem!");
    process.exit(1);
  }
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

export default App;