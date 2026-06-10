import AutoLoad from "@fastify/autoload";
import path from "path";
import { fileURLToPath } from "url";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const App : FastifyPluginAsync = async (
  fastify: FastifyInstance,
  appOptions
) => {
  
  console.log("Plugins are loading...");
  void fastify.register(AutoLoad, {
    dir: path.join(dirname, "plugins"),
    options: appOptions,
    forceESM: true
  });
  console.log("Modules are loading...");
  void fastify.register(AutoLoad, {
    dir: path.join(dirname, "routes"),
    options: appOptions,
    forceESM: true
  });
  console.log("Completed!");
}

export default App;